import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DMaterialNode      from "./X3DMaterialNode.js";
import Material             from "./Material.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";

/**
 * THIS NODE IS DEPRECIATED SINCE X3D VERSION 4.0.
 */

function TwoSidedMaterial (executionContext)
{
   console .warn ("TwoSidedMaterial is depreciated, please use Appearance backMaterial field instead.");

   X3DMaterialNode .call (this, executionContext);

   this .addType (X3DConstants .TwoSidedMaterial);

   this .diffuseColorArray  = new Float32Array (3);
   this .specularColorArray = new Float32Array (3);
   this .emissiveColorArray = new Float32Array (3);

   this .backDiffuseColorArray  = new Float32Array (3);
   this .backSpecularColorArray = new Float32Array (3);
   this .backEmissiveColorArray = new Float32Array (3);
}

Object .assign (Object .setPrototypeOf (TwoSidedMaterial .prototype, X3DMaterialNode .prototype),
{
   initialize ()
   {
      X3DMaterialNode . prototype .initialize .call (this);

      this ._ambientIntensity .addInterest ("set_ambientIntensity__", this);
      this ._diffuseColor     .addInterest ("set_diffuseColor__",     this);
      this ._specularColor    .addInterest ("set_specularColor__",    this);
      this ._emissiveColor    .addInterest ("set_emissiveColor__",    this);
      this ._shininess        .addInterest ("set_shininess__",        this);
      this ._transparency     .addInterest ("set_transparency__",     this);

      this ._backAmbientIntensity .addInterest ("set_backAmbientIntensity__", this);
      this ._backDiffuseColor     .addInterest ("set_backDiffuseColor__",     this);
      this ._backSpecularColor    .addInterest ("set_backSpecularColor__",    this);
      this ._backEmissiveColor    .addInterest ("set_backEmissiveColor__",    this);
      this ._backShininess        .addInterest ("set_backShininess__",        this);
      this ._backTransparency     .addInterest ("set_backTransparency__",     this);

      this ._separateBackColor .addInterest ("set_transparent__", this);
      this ._transparency      .addInterest ("set_transparent__", this);
      this ._backTransparency  .addInterest ("set_transparent__", this);

      this .set_ambientIntensity__ ();
      this .set_diffuseColor__ ();
      this .set_specularColor__ ();
      this .set_emissiveColor__ ();
      this .set_shininess__ ();
      this .set_transparency__ ();

      this .set_backAmbientIntensity__ ();
      this .set_backDiffuseColor__ ();
      this .set_backSpecularColor__ ();
      this .set_backEmissiveColor__ ();
      this .set_backShininess__ ();
      this .set_backTransparency__ ();

      this .set_transparent__ ();
   },
   set_ambientIntensity__ ()
   {
      this .ambientIntensity = Math .max (this ._ambientIntensity .getValue (), 0);
   },
   set_diffuseColor__ ()
   {
      this .diffuseColorArray .set (this ._diffuseColor .getValue ());
   },
   set_specularColor__ ()
   {
      this .specularColorArray .set (this ._specularColor .getValue ());
   },
   set_emissiveColor__ ()
   {
      this .emissiveColorArray .set (this ._emissiveColor .getValue ());
   },
   set_shininess__ ()
   {
      this .shininess = Algorithm .clamp (this ._shininess .getValue (), 0, 1);
   },
   set_transparency__ ()
   {
      this .transparency = Algorithm .clamp (this ._transparency .getValue (), 0, 1);
   },
   /*
    * Back Material
    */
   set_backAmbientIntensity__ ()
   {
      this .backAmbientIntensity = Math .max (this ._backAmbientIntensity .getValue (), 0);
   },
   set_backDiffuseColor__ ()
   {
      this .backDiffuseColorArray .set (this ._backDiffuseColor .getValue ());
   },
   set_backSpecularColor__ ()
   {
      this .backSpecularColorArray .set (this ._backSpecularColor .getValue ());
   },
   set_backEmissiveColor__ ()
   {
      this .backEmissiveColorArray .set (this ._backEmissiveColor .getValue ());
   },
   set_backShininess__ ()
   {
      this .backShininess = Algorithm .clamp (this ._backShininess .getValue (), 0, 1);
   },
   set_backTransparency__ ()
   {
      this .backTransparency = Algorithm .clamp (this ._backTransparency .getValue (), 0, 1);
   },
   set_transparent__ ()
   {
      this .setTransparent (this ._transparency .getValue () || (this ._separateBackColor .getValue () && this ._backTransparency .getValue ()));
   },
   getMaterialKey: Material .prototype .getMaterialKey,
   getBaseTexture: Material .prototype .getBaseTexture,
   createShader: Material .prototype .createShader,
   setShaderUniforms (gl, shaderObject, textureTransformMapping, textureCoordinateMapping, front)
   {
      if (!front && this ._separateBackColor .getValue ())
      {
         gl .uniform1f  (shaderObject .x3d_AmbientIntensity, this .backAmbientIntensity);
         gl .uniform3fv (shaderObject .x3d_DiffuseColor,     this .backDiffuseColorArray);
         gl .uniform3fv (shaderObject .x3d_SpecularColor,    this .backSpecularColorArray);
         gl .uniform3fv (shaderObject .x3d_EmissiveColor,    this .backEmissiveColorArray);
         gl .uniform1f  (shaderObject .x3d_Shininess,        this .backShininess);
         gl .uniform1f  (shaderObject .x3d_Transparency,     this .backTransparency);
      }
      else
      {
         gl .uniform1f  (shaderObject .x3d_AmbientIntensity, this .ambientIntensity);
         gl .uniform3fv (shaderObject .x3d_DiffuseColor,     this .diffuseColorArray);
         gl .uniform3fv (shaderObject .x3d_SpecularColor,    this .specularColorArray);
         gl .uniform3fv (shaderObject .x3d_EmissiveColor,    this .emissiveColorArray);
         gl .uniform1f  (shaderObject .x3d_Shininess,        this .shininess);
         gl .uniform1f  (shaderObject .x3d_Transparency,     this .transparency);
      }
   },
});

Object .defineProperties (TwoSidedMaterial,
{
   ... X3DNode .getStaticProperties ("TwoSidedMaterial", "Shape", 4, "material", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "separateBackColor",    new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "ambientIntensity",     new Fields .SFFloat (0.2)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "diffuseColor",         new Fields .SFColor (0.8, 0.8, 0.8)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "specularColor",        new Fields .SFColor ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "emissiveColor",        new Fields .SFColor ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "shininess",            new Fields .SFFloat (0.2)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "transparency",         new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "backAmbientIntensity", new Fields .SFFloat (0.2)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "backDiffuseColor",     new Fields .SFColor (0.8, 0.8, 0.8)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "backSpecularColor",    new Fields .SFColor ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "backEmissiveColor",    new Fields .SFColor ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "backShininess",        new Fields .SFFloat (0.2)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "backTransparency",     new Fields .SFFloat ()),
      ]),
      enumerable: true,
   },
});

export default TwoSidedMaterial;
