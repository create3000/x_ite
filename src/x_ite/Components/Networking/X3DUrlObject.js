import Fields       from "../../Fields.js";
import X3DNode      from "../Core/X3DNode.js";
import X3DConstants from "../../Base/X3DConstants.js";

const
   _cache                   = Symbol (),
   _autoRefreshStartTime    = Symbol (),
   _autoRefreshCompleteTime = Symbol (),
   _autoRefreshId           = Symbol ();

function X3DUrlObject (executionContext)
{
   this .addType (X3DConstants .X3DUrlObject);

   this .addChildObjects (X3DConstants .outputOnly, "loadState", new Fields .SFInt32 (X3DConstants .NOT_STARTED_STATE),
                          X3DConstants .outputOnly, "loadData",  new Fields .SFTime ());

   this [_cache]                = true;
   this [_autoRefreshStartTime] = Date .now ();
}

Object .assign (X3DUrlObject .prototype,
{
   initialize ()
   {
      this .getLive () .addInterest ("set_live__", this);

      this ._load                 .addInterest ("set_load__",        this);
      this ._url                  .addInterest ("set_url__",         this);
      this ._loadData             .addInterest ("loadData",          this);
      this ._autoRefresh          .addInterest ("set_autoRefresh__", this);
      this ._autoRefreshTimeLimit .addInterest ("set_autoRefresh__", this);
   },
   getAllowEmptyUrl ()
   {
      return false;
   },
   setLoadState (value, notify = true)
   {
      this ._loadState = value;

      switch (value)
      {
         case X3DConstants .COMPLETE_STATE:
         case X3DConstants .FAILED_STATE:
         {
            this [_autoRefreshCompleteTime] = Date .now ();
            this .setAutoRefreshTimer (Math .max (this ._autoRefresh .getValue (), 0));
            break;
         }
      }

      if (!notify)
         return;

      switch (value)
      {
         case X3DConstants .NOT_STARTED_STATE:
            break;
         case X3DConstants .IN_PROGRESS_STATE:
         {
            this .getScene () .addLoadingObject (this);
            break;
         }
         case X3DConstants .COMPLETE_STATE:
         case X3DConstants .FAILED_STATE:
         {
            this .getScene () .removeLoadingObject (this);
            break;
         }
      }
   },
   checkLoadState ()
   {
      return this ._loadState .getValue ();
   },
   getLoadState ()
   {
      return this ._loadState;
   },
   setCache (value)
   {
      this [_cache] = value;
   },
   getCache ()
   {
      return this [_cache] && this .getBrowser () .getBrowserOption ("Cache");
   },
   async requestImmediateLoad (cache = true)
   {
      switch (this .checkLoadState ())
      {
         case X3DConstants .IN_PROGRESS_STATE:
         {
            await this .loading ();
            return;
         }
         case X3DConstants .COMPLETE_STATE:
         {
            return;
         }
         case X3DConstants .FAILED_STATE:
         {
            throw new Error (`Failed loading ${this .getTypeName ()}.`);
         }
      }

      const browser = this .getBrowser ();

      if (!browser .getBrowserOption ("LoadUrlObjects") && this .getExecutionContext () !== browser .getPrivateScene ())
         return;

      if (!this ._load .getValue ())
         throw new Error (`${this .getTypeName ()}.load is false.`);

      if (this ._url .length === 0 && !this .getAllowEmptyUrl ())
      {
         this .unloadData ();
         return;
      }

      this .setCache (cache);
      this .setLoadState (X3DConstants .IN_PROGRESS_STATE);

      if (this .isInitialized ())
         // Buffer prevents double load of the scene if load and url field are set at the same time.
         this ._loadData = this .getBrowser () .getCurrentTime ();
      else
         this .loadData ();

      await this .loading ();
   },
   loading ()
   {
      return new Promise ((resolve, reject) =>
      {
         const _loading = Symbol ();

         this ._loadState .addFieldCallback (_loading, () =>
         {
            switch (this .checkLoadState ())
            {
               case X3DConstants .COMPLETE_STATE:
               {
                  this ._loadState .removeFieldCallback (_loading);
                  resolve ();
                  break;
               }
               case X3DConstants .FAILED_STATE:
               {
                  this ._loadState .removeFieldCallback (_loading);
                  reject (new Error (`Failed loading ${this .getTypeName ()}.`));
                  break;
               }
            }
         });
      });
   },
   loadNow ()
   {
      this .setLoadState (X3DConstants .NOT_STARTED_STATE);

      return this .requestImmediateLoad ();
   },
   loadData ()
   { },
   requestUnload ()
   {
      const loadState = this .checkLoadState ();

      if (loadState === X3DConstants .NOT_STARTED_STATE || loadState === X3DConstants .FAILED_STATE)
         return;

      this .setLoadState (X3DConstants .NOT_STARTED_STATE);
      this .unloadData ();
   },
   unloadNow ()
   {
      this .requestUnload ();
   },
   unloadData ()
   { },
   setAutoRefreshTimer (autoRefreshInterval)
   {
      clearTimeout (this [_autoRefreshId]);

      if (this ._autoRefresh .getValue () <= 0)
         return;

      const autoRefreshTimeLimit = this ._autoRefreshTimeLimit .getValue ();

      if (autoRefreshTimeLimit > 0)
      {
         if ((Date .now () - this [_autoRefreshStartTime]) / 1000 > autoRefreshTimeLimit - autoRefreshInterval)
            return;
      }

      this [_autoRefreshId] = setTimeout (this .performAutoRefresh .bind (this), autoRefreshInterval * 1000);
   },
   performAutoRefresh ()
   {
      this .setLoadState (X3DConstants .NOT_STARTED_STATE);
      this .requestImmediateLoad (false) .catch (Function .prototype);
   },
   set_live__ ()
   {
      if (this .getLive () .getValue ())
         this .set_autoRefresh__ ();
      else
         clearTimeout (this [_autoRefreshId]);
   },
   set_load__ ()
   {
      if (this ._load .getValue ())
         this .requestImmediateLoad () .catch (Function .prototype);
      else
         this .requestUnload ();
   },
   set_url__ ()
   {
      if (!this ._load .getValue ())
         return;

      this .setLoadState (X3DConstants .NOT_STARTED_STATE);
      this .requestImmediateLoad () .catch (Function .prototype);
   },
   set_autoRefresh__ ()
   {
      if (this .checkLoadState () !== X3DConstants .COMPLETE_STATE)
         return;

      const
         elapsedTime = (Date .now () - this [_autoRefreshCompleteTime]) / 1000,
         autoRefresh = Math .max (this ._autoRefresh .getValue (), 0);

      let autoRefreshInterval = autoRefresh - elapsedTime;

      if (autoRefreshInterval < 0)
         autoRefreshInterval = Math .ceil (elapsedTime / autoRefresh) * autoRefresh - elapsedTime;

      this .setAutoRefreshTimer (autoRefreshInterval);
   },
   dispose () { },
});

Object .defineProperties (X3DUrlObject, X3DNode .getStaticProperties ("X3DUrlObject", "Networking", 1));

export default X3DUrlObject;
