import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DSensorNode        from "../Core/X3DSensorNode.js";
import X3DBoundedObject     from "../Grouping/X3DBoundedObject.js";
import X3DConstants         from "../../Base/X3DConstants.js";

/**
 * THIS NODE IS NOT SUPPORTED.
 */

function TransmitterPdu (executionContext)
{
   X3DSensorNode    .call (this, executionContext);
   X3DBoundedObject .call (this, executionContext);

   this .addType (X3DConstants .TransmitterPdu);

   // Legacy

   if (executionContext .getSpecificationVersion () <= 3.3)
   {
      this ._applicationID = 1;
   }
}

Object .assign (Object .setPrototypeOf (TransmitterPdu .prototype, X3DSensorNode .prototype),
   X3DBoundedObject .prototype,
{
   initialize ()
   {
      X3DSensorNode    .prototype .initialize .call (this);
      X3DBoundedObject .prototype .initialize .call (this);
   },
   dispose ()
   {
      X3DBoundedObject .prototype .dispose .call (this);
      X3DSensorNode    .prototype .dispose .call (this);
   },
});

Object .defineProperties (TransmitterPdu,
{
   ... X3DNode .getStaticProperties ("TransmitterPdu", "DIS", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",                           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",                        new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",                            new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",                        new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",                           new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",                         new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",                            new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",                           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "address",                            new Fields .SFString ("localhost")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "antennaLocation",                    new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "antennaPatternLength",               new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "antennaPatternType",                 new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "applicationID",                      new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "cryptoKeyID",                        new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "cryptoSystem",                       new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "entityID",                           new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "frequency",                          new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "inputSource",                        new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "lengthOfModulationParameters",       new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "modulationTypeDetail",               new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "modulationTypeMajor",                new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "modulationTypeSpreadSpectrum",       new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "modulationTypeSystem",               new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "multicastRelayHost",                 new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "multicastRelayPort",                 new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "networkMode",                        new Fields .SFString ("standAlone")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "port",                               new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "power",                              new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "radioEntityTypeCategory",            new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "radioEntityTypeCountry",             new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "radioEntityTypeDomain",              new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "radioEntityTypeKind",                new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "radioEntityTypeNomenclature",        new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "radioEntityTypeNomenclatureVersion", new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "radioID",                            new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "readInterval",                       new Fields .SFTime (0.1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "relativeAntennaLocation",            new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "rtpHeaderExpected",                  new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "siteID",                             new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "transmitFrequencyBandwidth",         new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "transmitState",                      new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "whichGeometry",                      new Fields .SFInt32 (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "writeInterval",                      new Fields .SFTime (1)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isNetworkReader",                    new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isNetworkWriter",                    new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isRtpHeaderHeard",                   new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isStandAlone",                       new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "timestamp",                          new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "geoCoords",                          new Fields .SFVec3d ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem",                          new Fields .MFString ("GD", "WE")),
      ]),
      enumerable: true,
   },
});

export default TransmitterPdu;
