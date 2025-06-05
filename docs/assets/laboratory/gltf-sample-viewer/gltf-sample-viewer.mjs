// EnvironmentLight

const ibl_files = [
   "ABeautifulGame",
   "AlphaBlendModeTest",
   "AnimatedCube",
   "AnimationPointerUVs",
   "Anisotropy",
   "AntiqueCamera",
   "AttenuationTest",
   "BarramundiFish",
   "Bee",
   "BlackDragon",
   "Bonsai",
   "BoomBox",
   "Box With Spaces",
   "BrainStem",
   "CarbonFibre",
   "CarConcept",
   "Cesium",
   "ChairDamaskPurplegold",
   "Chronograph",
   "Clearcoat",
   "ClearCoat",
   "CommercialRefrigerator",
   "Compare",
   "Corset",
   "Cube",
   "Dispersion",
   "DragonAttenuation",
   "EmissiveStrengthTest",
   "Engine",
   "EnvironmentTest",
   "Glam",
   "GlassBrokenWindow",
   "GlassHurricaneCandleHolder",
   "GlassVaseFlowers",
   "GunBot",
   "Helmet",
   "IORTestGrid",
   "Iridescence",
   "Iridescent",
   "Lantern",
   "MandarinOrange",
   "MaterialsVariantsShoe",
   "MeshPrimitiveModes",
   "MetalRoughSpheres",
   "Morph",
   "MosquitoInAmber",
   "NegativeScaleTest",
   "NeilArmstrong",
   "NormalTangentMirrorTest",
   "NormalTangentTest",
   "OrientationTest",
   "PotOfCoals",
   "PrimitiveModeNormalsTest",
   "ReciprocatingSaw",
   "RecursiveSkeletons",
   "ScatteringSkull",
   "Sheen",
   "SimpleInstancing",
   "SpecGlossVsMetalRough",
   "Specular",
   "Sponza",
   "StainedGlassLamp",
   "SunglassesKhronos",
   "Suzanne",
   "Telephone",
   "TextureEncodingTest",
   "TextureTransformMultiTest",
   "ToyCar",
   "Transmission",
   "Walking Alien",
   "WaterBottle",
   "WebP",
   "YetiWarrior",
];

// KHR_lights_punctual
const no_headlight = [
   "DiffuseTransmissionPlant",
   "DirectionalLight",
   "GlamVelvetSofa",
   "IridescenceSuzanne",
   "LightsPunctualLamp",
];

// SAMPLES_BEGIN

const models = [
   "https://create3000.github.io/media/glTF/Animated Bee/Animated Bee.glb",
   "https://create3000.github.io/media/glTF/BlackDragon/BlackDragon.glb",
   "https://create3000.github.io/media/glTF/Bonsai 1/Bonsai 1.gltf",
   "https://create3000.github.io/media/glTF/Bus Stop 1/Bus Stop 1.gltf",
   "https://create3000.github.io/media/glTF/FurInstancing/FurInstancing.glb",
   "https://create3000.github.io/media/glTF/GunBot/GunBot.glb",
   "https://create3000.github.io/media/glTF/NeilArmstrong/NeilArmstrong.glb",
   "https://create3000.github.io/media/glTF/Telephone/Telephone.gltf",
   "https://create3000.github.io/media/glTF/Walking Alien/Walking Alien.gltf",
   "https://create3000.github.io/media/glTF/WebP/WebP.gltf",
   "https://create3000.github.io/media/glTF/YetiWarrior/YetiWarrior.gltf",
];

const glTF = [
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/ABeautifulGame/glTF/ABeautifulGame.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AlphaBlendModeTest/glTF/AlphaBlendModeTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AnimatedColorsCube/glTF/AnimatedColorsCube.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AnimatedCube/glTF/AnimatedCube.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AnimatedMorphCube/glTF/AnimatedMorphCube.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AnimatedTriangle/glTF/AnimatedTriangle.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AnimationPointerUVs/glTF/AnimationPointerUVs.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AnisotropyBarnLamp/glTF/AnisotropyBarnLamp.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AnisotropyDiscTest/glTF/AnisotropyDiscTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AnisotropyRotationTest/glTF/AnisotropyRotationTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AnisotropyStrengthTest/glTF/AnisotropyStrengthTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AntiqueCamera/glTF/AntiqueCamera.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AttenuationTest/glTF/AttenuationTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Avocado/glTF/Avocado.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BarramundiFish/glTF/BarramundiFish.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoomBox/glTF/BoomBox.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoomBoxWithAxes/glTF/BoomBoxWithAxes.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Box With Spaces/glTF/Box With Spaces.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Box/glTF/Box.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoxAnimated/glTF/BoxAnimated.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoxInterleaved/glTF/BoxInterleaved.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoxTextured/glTF/BoxTextured.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoxTexturedNonPowerOfTwo/glTF/BoxTexturedNonPowerOfTwo.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoxVertexColors/glTF/BoxVertexColors.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BrainStem/glTF/BrainStem.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Cameras/glTF/Cameras.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CarConcept/glTF/CarConcept.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CarbonFibre/glTF/CarbonFibre.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CesiumMan/glTF/CesiumMan.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CesiumMilkTruck/glTF/CesiumMilkTruck.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/ChairDamaskPurplegold/glTF/ChairDamaskPurplegold.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/ChronographWatch/glTF/ChronographWatch.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/ClearCoatCarPaint/glTF/ClearCoatCarPaint.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/ClearCoatTest/glTF/ClearCoatTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/ClearcoatWicker/glTF/ClearcoatWicker.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CommercialRefrigerator/glTF/CommercialRefrigerator.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CompareAlphaCoverage/glTF/CompareAlphaCoverage.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CompareAmbientOcclusion/glTF/CompareAmbientOcclusion.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CompareAnisotropy/glTF/CompareAnisotropy.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CompareBaseColor/glTF/CompareBaseColor.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CompareClearcoat/glTF/CompareClearcoat.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CompareDispersion/glTF/CompareDispersion.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CompareEmissiveStrength/glTF/CompareEmissiveStrength.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CompareIor/glTF/CompareIor.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CompareIridescence/glTF/CompareIridescence.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CompareMetallic/glTF/CompareMetallic.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CompareNormal/glTF/CompareNormal.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CompareRoughness/glTF/CompareRoughness.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CompareSheen/glTF/CompareSheen.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CompareSpecular/glTF/CompareSpecular.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CompareTransmission/glTF/CompareTransmission.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CompareVolume/glTF/CompareVolume.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Corset/glTF/Corset.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Cube/glTF/Cube.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/DamagedHelmet/glTF/DamagedHelmet.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/DiffuseTransmissionPlant/glTF/DiffuseTransmissionPlant.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/DiffuseTransmissionTeacup/glTF/DiffuseTransmissionTeacup.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/DiffuseTransmissionTest/glTF/DiffuseTransmissionTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/DirectionalLight/glTF/DirectionalLight.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/DispersionTest/glTF/DispersionTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/DragonAttenuation/glTF/DragonAttenuation.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/DragonDispersion/glTF/DragonDispersion.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Duck/glTF/Duck.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/EmissiveStrengthTest/glTF/EmissiveStrengthTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/EnvironmentTest/glTF/EnvironmentTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/FlightHelmet/glTF/FlightHelmet.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Fox/glTF/Fox.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/GlamVelvetSofa/glTF/GlamVelvetSofa.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/GlassBrokenWindow/glTF/GlassBrokenWindow.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/GlassHurricaneCandleHolder/glTF/GlassHurricaneCandleHolder.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/GlassVaseFlowers/glTF/GlassVaseFlowers.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/IORTestGrid/glTF/IORTestGrid.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/InterpolationTest/glTF/InterpolationTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/IridescenceAbalone/glTF/IridescenceAbalone.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/IridescenceDielectricSpheres/glTF/IridescenceDielectricSpheres.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/IridescenceLamp/glTF/IridescenceLamp.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/IridescenceMetallicSpheres/glTF/IridescenceMetallicSpheres.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/IridescenceSuzanne/glTF/IridescenceSuzanne.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/IridescentDishWithOlives/glTF/IridescentDishWithOlives.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Lantern/glTF/Lantern.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/LightsPunctualLamp/glTF/LightsPunctualLamp.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MandarinOrange/glTF/MandarinOrange.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MaterialsVariantsShoe/glTF/MaterialsVariantsShoe.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MeshPrimitiveModes/glTF/MeshPrimitiveModes.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MetalRoughSpheres/glTF/MetalRoughSpheres.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MetalRoughSpheresNoTextures/glTF/MetalRoughSpheresNoTextures.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MorphPrimitivesTest/glTF/MorphPrimitivesTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MorphStressTest/glTF/MorphStressTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MosquitoInAmber/glTF/MosquitoInAmber.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MultiUVTest/glTF/MultiUVTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MultipleScenes/glTF/MultipleScenes.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/NegativeScaleTest/glTF/NegativeScaleTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/NormalTangentMirrorTest/glTF/NormalTangentMirrorTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/NormalTangentTest/glTF/NormalTangentTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/OrientationTest/glTF/OrientationTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/PointLightIntensityTest/glTF/PointLightIntensityTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/PotOfCoals/glTF/PotOfCoals.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/PotOfCoalsAnimationPointer/glTF/PotOfCoalsAnimationPointer.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/PrimitiveModeNormalsTest/glTF/PrimitiveModeNormalsTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/RecursiveSkeletons/glTF/RecursiveSkeletons.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/RiggedFigure/glTF/RiggedFigure.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/RiggedSimple/glTF/RiggedSimple.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/ScatteringSkull/glTF/ScatteringSkull.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SciFiHelmet/glTF/SciFiHelmet.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SheenChair/glTF/SheenChair.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SheenCloth/glTF/SheenCloth.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SheenTestGrid/glTF/SheenTestGrid.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SheenWoodLeatherSofa/glTF/SheenWoodLeatherSofa.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SimpleInstancing/glTF/SimpleInstancing.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SimpleMaterial/glTF/SimpleMaterial.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SimpleMeshes/glTF/SimpleMeshes.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SimpleMorph/glTF/SimpleMorph.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SimpleSkin/glTF/SimpleSkin.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SimpleSparseAccessor/glTF/SimpleSparseAccessor.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SimpleTexture/glTF/SimpleTexture.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SpecGlossVsMetalRough/glTF/SpecGlossVsMetalRough.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SpecularSilkPouf/glTF/SpecularSilkPouf.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SpecularTest/glTF/SpecularTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Sponza/glTF/Sponza.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/StainedGlassLamp/glTF/StainedGlassLamp.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SunglassesKhronos/glTF/SunglassesKhronos.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Suzanne/glTF/Suzanne.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TextureCoordinateTest/glTF/TextureCoordinateTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TextureEncodingTest/glTF/TextureEncodingTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TextureLinearInterpolationTest/glTF/TextureLinearInterpolationTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TextureSettingsTest/glTF/TextureSettingsTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TextureTransformMultiTest/glTF/TextureTransformMultiTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TextureTransformTest/glTF/TextureTransformTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/ToyCar/glTF/ToyCar.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TransmissionOrderTest/glTF/TransmissionOrderTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TransmissionRoughnessTest/glTF/TransmissionRoughnessTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TransmissionTest/glTF/TransmissionTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TransmissionThinwallTestGrid/glTF/TransmissionThinwallTestGrid.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Triangle/glTF/Triangle.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TriangleWithoutIndices/glTF/TriangleWithoutIndices.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TwoSidedPlane/glTF/TwoSidedPlane.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Unicode❤♻Test/glTF/Unicode❤♻Test.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/UnlitTest/glTF/UnlitTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/VertexColorTest/glTF/VertexColorTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/VirtualCity/glTF/VirtualCity.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/WaterBottle/glTF/WaterBottle.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/XmpMetadataRoundedCube/glTF/XmpMetadataRoundedCube.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/2CylinderEngine/glTF/2CylinderEngine.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ABeautifulGame/glTF/ABeautifulGame.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AlphaBlendModeTest/glTF/AlphaBlendModeTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AnimatedCube/glTF/AnimatedCube.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AnimatedMorphCube/glTF/AnimatedMorphCube.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AnimatedMorphSphere/glTF/AnimatedMorphSphere.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AnimatedTriangle/glTF/AnimatedTriangle.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AntiqueCamera/glTF/AntiqueCamera.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AttenuationTest/glTF/AttenuationTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF/Avocado.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BarramundiFish/glTF/BarramundiFish.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoomBox/glTF/BoomBox.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoomBoxWithAxes/glTF/BoomBoxWithAxes.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Box With Spaces/glTF/Box With Spaces.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Box/glTF/Box.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxAnimated/glTF/BoxAnimated.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxInterleaved/glTF/BoxInterleaved.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxTextured/glTF/BoxTextured.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxTexturedNonPowerOfTwo/glTF/BoxTexturedNonPowerOfTwo.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxVertexColors/glTF/BoxVertexColors.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BrainStem/glTF/BrainStem.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Buggy/glTF/Buggy.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Cameras/glTF/Cameras.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CarbonFibre/glTF/CarbonFibre.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMan/glTF/CesiumMan.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMilkTruck/glTF/CesiumMilkTruck.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ClearCoatCarPaint/glTF/ClearCoatCarPaint.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ClearCoatTest/glTF/ClearCoatTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ClearcoatRing/glTF/ClearcoatRing.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ClearcoatSphere/glTF/ClearcoatSphere.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ClearcoatWicker/glTF/ClearcoatWicker.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Corset/glTF/Corset.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Cube/glTF/Cube.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF/DamagedHelmet.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DirectionalLight/glTF/DirectionalLight.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DragonAttenuation/glTF/DragonAttenuation.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF/Duck.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/EmissiveStrengthTest/glTF/EmissiveStrengthTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/EnvironmentTest/glTF/EnvironmentTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/FlightHelmet/glTF/FlightHelmet.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Fox/glTF/Fox.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/GearboxAssy/glTF/GearboxAssy.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/GlamVelvetSofa/glTF/GlamVelvetSofa.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/InterpolationTest/glTF/InterpolationTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/IridescenceDielectricSpheres/glTF/IridescenceDielectricSpheres.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/IridescenceLamp/glTF/IridescenceLamp.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/IridescenceMetallicSpheres/glTF/IridescenceMetallicSpheres.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/IridescenceSuzanne/glTF/IridescenceSuzanne.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/IridescentDishWithOlives/glTF/IridescentDishWithOlives.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Lantern/glTF/Lantern.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/LightsPunctualLamp/glTF/LightsPunctualLamp.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF/MaterialsVariantsShoe.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MeshPrimitiveModes/glTF/MeshPrimitiveModes.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MetalRoughSpheres/glTF/MetalRoughSpheres.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MetalRoughSpheresNoTextures/glTF/MetalRoughSpheresNoTextures.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MorphPrimitivesTest/glTF/MorphPrimitivesTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MorphStressTest/glTF/MorphStressTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MosquitoInAmber/glTF/MosquitoInAmber.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MultiUVTest/glTF/MultiUVTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MultipleScenes/glTF/MultipleScenes.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/NegativeScaleTest/glTF/NegativeScaleTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/NormalTangentMirrorTest/glTF/NormalTangentMirrorTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/NormalTangentTest/glTF/NormalTangentTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/OrientationTest/glTF/OrientationTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/PrimitiveModeNormalsTest/glTF/PrimitiveModeNormalsTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ReciprocatingSaw/glTF/ReciprocatingSaw.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/RecursiveSkeletons/glTF/RecursiveSkeletons.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/RiggedFigure/glTF/RiggedFigure.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/RiggedSimple/glTF/RiggedSimple.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SciFiHelmet/glTF/SciFiHelmet.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SheenChair/glTF/SheenChair.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SheenCloth/glTF/SheenCloth.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SheenDamask/glTF/SheenDamask.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SheenHighHeel/glTF/SheenHighHeel.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SimpleInstancing/glTF/SimpleInstancing.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SimpleMeshes/glTF/SimpleMeshes.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SimpleMorph/glTF/SimpleMorph.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SimpleSkin/glTF/SimpleSkin.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SimpleSparseAccessor/glTF/SimpleSparseAccessor.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SpecGlossVsMetalRough/glTF/SpecGlossVsMetalRough.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SpecularTest/glTF/SpecularTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Sponza/glTF/Sponza.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/StainedGlassLamp/glTF/StainedGlassLamp.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Suzanne/glTF/Suzanne.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SuzanneMorphSparse/glTF/SuzanneMorphSparse.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TextureCoordinateTest/glTF/TextureCoordinateTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TextureEncodingTest/glTF/TextureEncodingTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TextureLinearInterpolationTest/glTF/TextureLinearInterpolationTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TextureSettingsTest/glTF/TextureSettingsTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TextureTransformMultiTest/glTF/TextureTransformMultiTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TextureTransformTest/glTF/TextureTransformTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ToyCar/glTF/ToyCar.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TransmissionRoughnessTest/glTF/TransmissionRoughnessTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TransmissionSuzanne/glTF/TransmissionSuzanne.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TransmissionTest/glTF/TransmissionTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Triangle/glTF/Triangle.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TriangleWithoutIndices/glTF/TriangleWithoutIndices.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TwoSidedPlane/glTF/TwoSidedPlane.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Unicode❤♻Test/glTF/Unicode❤♻Test.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/UnlitTest/glTF/UnlitTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/VC/glTF/VC.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/VertexColorTest/glTF/VertexColorTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/WaterBottle/glTF/WaterBottle.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/XmpMetadataRoundedCube/glTF/xmp.gltf",
];

const glb = [
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AlphaBlendModeTest/glTF-Binary/AlphaBlendModeTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AnimatedColorsCube/glTF-Binary/AnimatedColorsCube.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AnimatedMorphCube/glTF-Binary/AnimatedMorphCube.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AnimationPointerUVs/glTF-Binary/AnimationPointerUVs.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AnisotropyBarnLamp/glTF-Binary/AnisotropyBarnLamp.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AnisotropyDiscTest/glTF-Binary/AnisotropyDiscTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AnisotropyRotationTest/glTF-Binary/AnisotropyRotationTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AnisotropyStrengthTest/glTF-Binary/AnisotropyStrengthTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AntiqueCamera/glTF-Binary/AntiqueCamera.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AttenuationTest/glTF-Binary/AttenuationTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Avocado/glTF-Binary/Avocado.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BarramundiFish/glTF-Binary/BarramundiFish.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoomBox/glTF-Binary/BoomBox.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Box/glTF-Binary/Box.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoxAnimated/glTF-Binary/BoxAnimated.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoxInterleaved/glTF-Binary/BoxInterleaved.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoxTextured/glTF-Binary/BoxTextured.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoxTexturedNonPowerOfTwo/glTF-Binary/BoxTexturedNonPowerOfTwo.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoxVertexColors/glTF-Binary/BoxVertexColors.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BrainStem/glTF-Binary/BrainStem.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CarbonFibre/glTF-Binary/CarbonFibre.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CesiumMan/glTF-Binary/CesiumMan.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CesiumMilkTruck/glTF-Binary/CesiumMilkTruck.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/ChairDamaskPurplegold/glTF-Binary/ChairDamaskPurplegold.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/ChronographWatch/glTF-Binary/ChronographWatch.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/ClearCoatCarPaint/glTF-Binary/ClearCoatCarPaint.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/ClearCoatTest/glTF-Binary/ClearCoatTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/ClearcoatWicker/glTF-Binary/ClearcoatWicker.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CommercialRefrigerator/glTF-Binary/CommercialRefrigerator.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CompareAlphaCoverage/glTF-Binary/CompareAlphaCoverage.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CompareAmbientOcclusion/glTF-Binary/CompareAmbientOcclusion.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CompareAnisotropy/glTF-Binary/CompareAnisotropy.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CompareBaseColor/glTF-Binary/CompareBaseColor.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CompareClearcoat/glTF-Binary/CompareClearcoat.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CompareDispersion/glTF-Binary/CompareDispersion.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CompareEmissiveStrength/glTF-Binary/CompareEmissiveStrength.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CompareIor/glTF-Binary/CompareIor.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CompareIridescence/glTF-Binary/CompareIridescence.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CompareMetallic/glTF-Binary/CompareMetallic.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CompareNormal/glTF-Binary/CompareNormal.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CompareRoughness/glTF-Binary/CompareRoughness.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CompareSheen/glTF-Binary/CompareSheen.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CompareSpecular/glTF-Binary/CompareSpecular.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CompareTransmission/glTF-Binary/CompareTransmission.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CompareVolume/glTF-Binary/CompareVolume.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Corset/glTF-Binary/Corset.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/DamagedHelmet/glTF-Binary/DamagedHelmet.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/DiffuseTransmissionPlant/glTF-Binary/DiffuseTransmissionPlant.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/DiffuseTransmissionTeacup/glTF-Binary/DiffuseTransmissionTeacup.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/DiffuseTransmissionTest/glTF-Binary/DiffuseTransmissionTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/DirectionalLight/glTF-Binary/DirectionalLight.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/DispersionTest/glTF-Binary/DispersionTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/DragonAttenuation/glTF-Binary/DragonAttenuation.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/DragonDispersion/glTF-Binary/DragonDispersion.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Duck/glTF-Binary/Duck.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/EmissiveStrengthTest/glTF-Binary/EmissiveStrengthTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Fox/glTF-Binary/Fox.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/GlamVelvetSofa/glTF-Binary/GlamVelvetSofa.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/GlassBrokenWindow/glTF-Binary/GlassBrokenWindow.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/GlassHurricaneCandleHolder/glTF-Binary/GlassHurricaneCandleHolder.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/GlassVaseFlowers/glTF-Binary/GlassVaseFlowers.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/IORTestGrid/glTF-Binary/IORTestGrid.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/InterpolationTest/glTF-Binary/InterpolationTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/IridescenceAbalone/glTF-Binary/IridescenceAbalone.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/IridescenceLamp/glTF-Binary/IridescenceLamp.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/IridescenceSuzanne/glTF-Binary/IridescenceSuzanne.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/IridescentDishWithOlives/glTF-Binary/IridescentDishWithOlives.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Lantern/glTF-Binary/Lantern.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/LightsPunctualLamp/glTF-Binary/LightsPunctualLamp.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MetalRoughSpheres/glTF-Binary/MetalRoughSpheres.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MetalRoughSpheresNoTextures/glTF-Binary/MetalRoughSpheresNoTextures.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MorphPrimitivesTest/glTF-Binary/MorphPrimitivesTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MorphStressTest/glTF-Binary/MorphStressTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MosquitoInAmber/glTF-Binary/MosquitoInAmber.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MultiUVTest/glTF-Binary/MultiUVTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/NegativeScaleTest/glTF-Binary/NegativeScaleTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/NodePerformanceTest/glTF-Binary/NodePerformanceTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/NormalTangentMirrorTest/glTF-Binary/NormalTangentMirrorTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/NormalTangentTest/glTF-Binary/NormalTangentTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/OrientationTest/glTF-Binary/OrientationTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/PlaysetLightTest/glTF-Binary/PlaysetLightTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/PointLightIntensityTest/glTF-Binary/PointLightIntensityTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/PotOfCoals/glTF-Binary/PotOfCoals.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/PotOfCoalsAnimationPointer/glTF-Binary/PotOfCoalsAnimationPointer.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/RecursiveSkeletons/glTF-Binary/RecursiveSkeletons.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/RiggedFigure/glTF-Binary/RiggedFigure.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/RiggedSimple/glTF-Binary/RiggedSimple.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/ScatteringSkull/glTF-Binary/ScatteringSkull.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SheenChair/glTF-Binary/SheenChair.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SheenTestGrid/glTF-Binary/SheenTestGrid.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SheenWoodLeatherSofa/glTF-Binary/SheenWoodLeatherSofa.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SimpleInstancing/glTF-Binary/SimpleInstancing.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SpecGlossVsMetalRough/glTF-Binary/SpecGlossVsMetalRough.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SpecularSilkPouf/glTF-Binary/SpecularSilkPouf.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SpecularTest/glTF-Binary/SpecularTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SunglassesKhronos/glTF-Binary/SunglassesKhronos.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TextureCoordinateTest/glTF-Binary/TextureCoordinateTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TextureEncodingTest/glTF-Binary/TextureEncodingTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TextureLinearInterpolationTest/glTF-Binary/TextureLinearInterpolationTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TextureSettingsTest/glTF-Binary/TextureSettingsTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TextureTransformMultiTest/glTF-Binary/TextureTransformMultiTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/ToyCar/glTF-Binary/ToyCar.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TransmissionOrderTest/glTF-Binary/TransmissionOrderTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TransmissionRoughnessTest/glTF-Binary/TransmissionRoughnessTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TransmissionTest/glTF-Binary/TransmissionTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TransmissionThinwallTestGrid/glTF-Binary/TransmissionThinwallTestGrid.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Unicode❤♻Test/glTF-Binary/Unicode❤♻Test.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/UnlitTest/glTF-Binary/UnlitTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/VertexColorTest/glTF-Binary/VertexColorTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/VirtualCity/glTF-Binary/VirtualCity.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/WaterBottle/glTF-Binary/WaterBottle.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/XmpMetadataRoundedCube/glTF-Binary/XmpMetadataRoundedCube.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/2CylinderEngine/glTF-Binary/2CylinderEngine.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AlphaBlendModeTest/glTF-Binary/AlphaBlendModeTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AnimatedMorphCube/glTF-Binary/AnimatedMorphCube.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AnimatedMorphSphere/glTF-Binary/AnimatedMorphSphere.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AntiqueCamera/glTF-Binary/AntiqueCamera.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AttenuationTest/glTF-Binary/AttenuationTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF-Binary/Avocado.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BarramundiFish/glTF-Binary/BarramundiFish.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoomBox/glTF-Binary/BoomBox.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Box/glTF-Binary/Box.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxAnimated/glTF-Binary/BoxAnimated.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxInterleaved/glTF-Binary/BoxInterleaved.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxTextured/glTF-Binary/BoxTextured.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxTexturedNonPowerOfTwo/glTF-Binary/BoxTexturedNonPowerOfTwo.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxVertexColors/glTF-Binary/BoxVertexColors.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BrainStem/glTF-Binary/BrainStem.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Buggy/glTF-Binary/Buggy.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CarbonFibre/glTF-Binary/CarbonFibre.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMan/glTF-Binary/CesiumMan.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMilkTruck/glTF-Binary/CesiumMilkTruck.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ClearCoatCarPaint/glTF-Binary/ClearCoatCarPaint.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ClearCoatTest/glTF-Binary/ClearCoatTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ClearcoatWicker/glTF-Binary/ClearcoatWicker.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Corset/glTF-Binary/Corset.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DirectionalLight/glTF-Binary/DirectionalLight.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DragonAttenuation/glTF-Binary/DragonAttenuation.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/EmissiveStrengthTest/glTF-Binary/EmissiveStrengthTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Fox/glTF-Binary/Fox.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/GearboxAssy/glTF-Binary/GearboxAssy.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/GlamVelvetSofa/glTF-Binary/GlamVelvetSofa.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/InterpolationTest/glTF-Binary/InterpolationTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/IridescenceLamp/glTF-Binary/IridescenceLamp.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/IridescenceSuzanne/glTF-Binary/IridescenceSuzanne.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/IridescentDishWithOlives/glTF-Binary/IridescentDishWithOlives.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Lantern/glTF-Binary/Lantern.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/LightsPunctualLamp/glTF-Binary/LightsPunctualLamp.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MetalRoughSpheres/glTF-Binary/MetalRoughSpheres.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MetalRoughSpheresNoTextures/glTF-Binary/MetalRoughSpheresNoTextures.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MorphPrimitivesTest/glTF-Binary/MorphPrimitivesTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MorphStressTest/glTF-Binary/MorphStressTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MosquitoInAmber/glTF-Binary/MosquitoInAmber.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MultiUVTest/glTF-Binary/MultiUVTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/NegativeScaleTest/glTF-Binary/NegativeScaleTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/NormalTangentMirrorTest/glTF-Binary/NormalTangentMirrorTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/NormalTangentTest/glTF-Binary/NormalTangentTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/OrientationTest/glTF-Binary/OrientationTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ReciprocatingSaw/glTF-Binary/ReciprocatingSaw.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/RecursiveSkeletons/glTF-Binary/RecursiveSkeletons.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/RiggedFigure/glTF-Binary/RiggedFigure.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/RiggedSimple/glTF-Binary/RiggedSimple.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SheenChair/glTF-Binary/SheenChair.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SimpleInstancing/glTF-Binary/SimpleInstancing.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SpecGlossVsMetalRough/glTF-Binary/SpecGlossVsMetalRough.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SpecularTest/glTF-Binary/SpecularTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SuzanneMorphSparse/glTF-Binary/SuzanneMorphSparse.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TextureCoordinateTest/glTF-Binary/TextureCoordinateTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TextureEncodingTest/glTF-Binary/TextureEncodingTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TextureLinearInterpolationTest/glTF-Binary/TextureLinearInterpolationTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TextureSettingsTest/glTF-Binary/TextureSettingsTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TextureTransformMultiTest/glTF-Binary/TextureTransformMultiTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ToyCar/glTF-Binary/ToyCar.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TransmissionRoughnessTest/glTF-Binary/TransmissionRoughnessTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TransmissionTest/glTF-Binary/TransmissionTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Unicode❤♻Test/glTF-Binary/Unicode❤♻Test.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/UnlitTest/glTF-Binary/UnlitTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/VC/glTF-Binary/VC.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/VertexColorTest/glTF-Binary/VertexColorTest.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/WaterBottle/glTF-Binary/WaterBottle.glb",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/XmpMetadataRoundedCube/glTF-Binary/xmp.glb",
];

const quantized = [
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AnimatedMorphCube/glTF-Quantized/AnimatedMorphCube.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Avocado/glTF-Quantized/Avocado.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Duck/glTF-Quantized/Duck.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Lantern/glTF-Quantized/Lantern.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AnimatedMorphCube/glTF-Quantized/AnimatedMorphCube.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF-Quantized/Avocado.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Quantized/Duck.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Lantern/glTF-Quantized/Lantern.gltf",
];

const draco = [
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Avocado/glTF-Draco/Avocado.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BarramundiFish/glTF-Draco/BarramundiFish.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoomBox/glTF-Draco/BoomBox.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Box/glTF-Draco/Box.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BrainStem/glTF-Draco/BrainStem.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CarConcept/glTF-KTX-BasisU-Draco/CarConcept.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CesiumMan/glTF-Draco/CesiumMan.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CesiumMilkTruck/glTF-Draco/CesiumMilkTruck.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Corset/glTF-Draco/Corset.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Duck/glTF-Draco/Duck.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Lantern/glTF-Draco/Lantern.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MorphPrimitivesTest/glTF-Draco/MorphPrimitivesTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/RiggedFigure/glTF-Draco/RiggedFigure.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/RiggedSimple/glTF-Draco/RiggedSimple.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SunglassesKhronos/glTF-Draco/SunglassesKhronos.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/VirtualCity/glTF-Draco/VirtualCity.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/WaterBottle/glTF-Draco/WaterBottle.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/2CylinderEngine/glTF-Draco/2CylinderEngine.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Avocado/glTF-Draco/Avocado.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BarramundiFish/glTF-Draco/BarramundiFish.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoomBox/glTF-Draco/BoomBox.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Box/glTF-Draco/Box.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BrainStem/glTF-Draco/BrainStem.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Buggy/glTF-Draco/Buggy.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMan/glTF-Draco/CesiumMan.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMilkTruck/glTF-Draco/CesiumMilkTruck.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Corset/glTF-Draco/Corset.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Draco/Duck.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/GearboxAssy/glTF-Draco/GearboxAssy.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Lantern/glTF-Draco/Lantern.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MorphPrimitivesTest/glTF-Draco/MorphPrimitivesTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ReciprocatingSaw/glTF-Draco/ReciprocatingSaw.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/RiggedFigure/glTF-Draco/RiggedFigure.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/RiggedSimple/glTF-Draco/RiggedSimple.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/VC/glTF-Draco/VC.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/WaterBottle/glTF-Draco/WaterBottle.gltf",
];

const embedded = [
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AlphaBlendModeTest/glTF-Embedded/AlphaBlendModeTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AnimatedTriangle/glTF-Embedded/AnimatedTriangle.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Box/glTF-Embedded/Box.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoxAnimated/glTF-Embedded/BoxAnimated.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoxInterleaved/glTF-Embedded/BoxInterleaved.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoxTextured/glTF-Embedded/BoxTextured.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoxTexturedNonPowerOfTwo/glTF-Embedded/BoxTexturedNonPowerOfTwo.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BoxVertexColors/glTF-Embedded/BoxVertexColors.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/BrainStem/glTF-Embedded/BrainStem.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Cameras/glTF-Embedded/Cameras.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CesiumMan/glTF-Embedded/CesiumMan.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CesiumMilkTruck/glTF-Embedded/CesiumMilkTruck.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/DamagedHelmet/glTF-Embedded/DamagedHelmet.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Duck/glTF-Embedded/Duck.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MeshPrimitiveModes/glTF-Embedded/MeshPrimitiveModes.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MetalRoughSpheres/glTF-Embedded/MetalRoughSpheres.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MultiUVTest/glTF-Embedded/MultiUVTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/MultipleScenes/glTF-Embedded/MultipleScenes.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/OrientationTest/glTF-Embedded/OrientationTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/RiggedFigure/glTF-Embedded/RiggedFigure.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/RiggedSimple/glTF-Embedded/RiggedSimple.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SimpleMaterial/glTF-Embedded/SimpleMaterial.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SimpleMeshes/glTF-Embedded/SimpleMeshes.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SimpleMorph/glTF-Embedded/SimpleMorph.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SimpleSkin/glTF-Embedded/SimpleSkin.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SimpleSparseAccessor/glTF-Embedded/SimpleSparseAccessor.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SimpleTexture/glTF-Embedded/SimpleTexture.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TextureCoordinateTest/glTF-Embedded/TextureCoordinateTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TextureSettingsTest/glTF-Embedded/TextureSettingsTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/Triangle/glTF-Embedded/Triangle.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/TriangleWithoutIndices/glTF-Embedded/TriangleWithoutIndices.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/VertexColorTest/glTF-Embedded/VertexColorTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/VirtualCity/glTF-Embedded/VirtualCity.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/2CylinderEngine/glTF-Embedded/2CylinderEngine.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AlphaBlendModeTest/glTF-Embedded/AlphaBlendModeTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/AnimatedTriangle/glTF-Embedded/AnimatedTriangle.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Box/glTF-Embedded/Box.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxAnimated/glTF-Embedded/BoxAnimated.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxInterleaved/glTF-Embedded/BoxInterleaved.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxTextured/glTF-Embedded/BoxTextured.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxTexturedNonPowerOfTwo/glTF-Embedded/BoxTexturedNonPowerOfTwo.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxVertexColors/glTF-Embedded/BoxVertexColors.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BrainStem/glTF-Embedded/BrainStem.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Buggy/glTF-Embedded/Buggy.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Cameras/glTF-Embedded/Cameras.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMan/glTF-Embedded/CesiumMan.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/CesiumMilkTruck/glTF-Embedded/CesiumMilkTruck.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Embedded/DamagedHelmet.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Embedded/Duck.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/GearboxAssy/glTF-Embedded/GearboxAssy.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MeshPrimitiveModes/glTF-Embedded/MeshPrimitiveModes.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MetalRoughSpheres/glTF-Embedded/MetalRoughSpheres.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MultiUVTest/glTF-Embedded/MultiUVTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/MultipleScenes/glTF-Embedded/MultipleScenes.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/NormalTangentMirrorTest/glTF-Embedded/NormalTangentMirrorTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/NormalTangentTest/glTF-Embedded/NormalTangentTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/OrientationTest/glTF-Embedded/OrientationTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/ReciprocatingSaw/glTF-Embedded/ReciprocatingSaw.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/RiggedFigure/glTF-Embedded/RiggedFigure.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/RiggedSimple/glTF-Embedded/RiggedSimple.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SimpleMeshes/glTF-Embedded/SimpleMeshes.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SimpleMorph/glTF-Embedded/SimpleMorph.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SimpleSkin/glTF-Embedded/SimpleSkin.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SimpleSparseAccessor/glTF-Embedded/SimpleSparseAccessor.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TextureCoordinateTest/glTF-Embedded/TextureCoordinateTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TextureSettingsTest/glTF-Embedded/TextureSettingsTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Triangle/glTF-Embedded/Triangle.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/TriangleWithoutIndices/glTF-Embedded/TriangleWithoutIndices.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/VC/glTF-Embedded/VC.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/VertexColorTest/glTF-Embedded/VertexColorTest.gltf",
];

const ibl = [
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/EnvironmentTest/glTF-IBL/EnvironmentTest.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/EnvironmentTest/glTF-IBL/EnvironmentTest.gltf",
];

const webp = [
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CarConcept/glTF-WEBP/CarConcept.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/ChronographWatch/glTF-WEBP/ChronographWatch.gltf",
];

const ktx = [
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/AnisotropyBarnLamp/glTF-KTX-BasisU/AnisotropyBarnLamp.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/ChronographWatch/glTF-KTX-BasisU/ChronographWatch.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/StainedGlassLamp/glTF-KTX-BasisU/StainedGlassLamp.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/FlightHelmet/glTF-KTX-BasisU/FlightHelmet.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/StainedGlassLamp/glTF-KTX-BasisU/StainedGlassLamp.gltf",
];

const jpg = [
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/CarConcept/glTF-JPG/CarConcept.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/StainedGlassLamp/glTF-JPG-PNG/StainedGlassLamp.gltf",
   "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/StainedGlassLamp/glTF-JPG-PNG/StainedGlassLamp.gltf",
];

// SAMPLES_END

$.try = function (callback)
{
   try { return callback (); } catch { }
};

class SampleViewer
{
   constructor (browser)
   {
      browser .setBrowserOption ("ColorSpace", "LINEAR");

      this .browser      = browser;
      this .localStorage = this .browser .getLocalStorage () .addNameSpace ("glTFSampleViewer.");

      this .localStorage .setDefaultValues ({
         scrollTop: 0,
         ibl: "helipad:1",
         toneMapping: "KHR_PBR_NEUTRAL",
         background: false,
      });

      this .createList ("glTF Random Models",           models);
      this .createList ("glTF Sample Models",           glTF);
      this .createList ("glb Sample Models",            glb);
      this .createList ("glTF Quantized Sample Models", quantized);
      this .createList ("glTF Draco Sample Models",     draco);
      this .createList ("glTF Embedded Sample Models",  embedded);
      this .createList ("glTF IBL Sample Models",       ibl);
      this .createList ("glTF WebP Sample Models",      webp);
      this .createList ("glTF KTX2 Sample Models",      ktx);
      this .createList ("glTF JPG/PNG Sample Models",   jpg);

      $(".viewer-column2") .on ("scroll", () =>
      {
         this .localStorage .scrollTop = $(".viewer-column2") .scrollTop ();
      })
      .scrollTop (this .localStorage .scrollTop);

      $("#ibl") .on ("change", () =>
      {
         this .setEnvironmentLight (!!$("#ibl") .val (), $("#ibl") .val () || undefined);
      });

      $("[for=headlight]") .on ("click", () =>
      {
         this .setHeadlight (!$("#headlight") .hasClass ("selected"));
      });

      $("#exposure") .on ("change input", () =>
      {
         this .setExposure ($("#exposure") .val ());
      });

      $("[for=exposure] .reset") .on ("click", () =>
      {
         $("#exposure") .val (1);
         this .setExposure (1);
      });

      $("#tone-mapping") .on ("change", () =>
      {
         this .setToneMapping ($("#tone-mapping") .val ());
      });

      $("[for=summer]") .on ("click", () =>
      {
         this .setBackground (!$("#summer") .hasClass ("selected"));
      });

      // Handle color scheme change.

      const colorScheme = window .matchMedia ("(prefers-color-scheme: dark)");

      colorScheme .addEventListener ("change", event => this .changeColorScheme (event));

      this .changeColorScheme (colorScheme);

      // Handle viewpoint change.

      browser .getField ("activeViewpoint") .addFieldCallback ("change", () =>
      {
         const
            description = browser .activeViewpoint ?.description ?? "",
            index       = [... $("#viewpoints option")] .findIndex (o => $(o) .text () === description);

         $("#viewpoints select") .val (index);
      });

      // Handle url parameter.

      this .browser .addBrowserCallback ("init", X3D .X3DConstants .INITIALIZED_EVENT, () =>
      {
         this .browser .removeBrowserCallback ("init", X3D .X3DConstants .INITIALIZED_EVENT);

         const url = new URL (location) .searchParams .get ("url");

         if (!url)
            return;

         const a = Array .from ($(".viewer-column2") .find ("a"))
             .find (a => $(a) .attr ("href") .includes (url));

         if (a)
            $(a) .trigger ("click");
         else
            this .loadURL (url);
      });
   }

   async changeColorScheme (event)
   {
      const defaultBackground = await this .getDefaultBackground ();

      let theme = !!event .matches;

      if ($("html") .attr ("data-mode") === "light")
         theme = 0;

      if ($("html") .attr ("data-mode") === "dark")
         theme = 1;

      defaultBackground .skyColor = theme ? [0, 0, 0] : [1, 1, 1];
   }

   get scene ()
   {
      return this .browser .currentScene;
   }

   createList (description, filenames)
   {
      const column = $(".viewer-column2");

      $("<div></div>") .append ($("<strong></strong>") .text (description)) .appendTo (column);

      const
         list = $("<ul></ul>") .appendTo (column),
         map  = new Map ();

      for (const filename of filenames)
      {
         const
            match = filename .match (/([^\/]+)\.\w+$/),
            name  = this .makeName (match [1]);

         map .set (name, filename);
      }

      for (const [name, filename] of [... map] .sort ((a, b) => a [0] .localeCompare (b [0])))
      {
         const link = $("<a></a>")
            .text (name)
            .attr ("href", filename)
            .appendTo ($("<li></li>") .appendTo (list))
            .on ("click", () =>
            {
               column .find ("a") .removeClass ("bold");
               link .addClass ("bold");

               this .loadURL (filename);
               return false;
            });
      }
   }

   makeName (string)
   {
      return string
         .replace (/-(?:WebP|KTX)/ig, "")
         .replace (/([A-Z]+)/g, " $1")
         .replace (/([A-Z]+)([A-Z])/g, "$1 $2")
         .replace (/\s+/g, " ")
         .trim ();
   }

   async loadURL (filename)
   {
      $("#scenes, #viewpoints, #material-variants, #animations") .hide ();

      await this .browser .loadURL (new X3D .MFString (filename));

      this .viewAll ();
      this .setEnvironmentLight (ibl_files .some (name => filename .includes (name)));
      this .setHeadlight (!no_headlight .some (name => filename .includes (name)));
      this .setToneMapping (this .localStorage .toneMapping);
      this .setBackground (this .localStorage .background);
      this .addScenes ();
      this .addViewpoints ();
      this .addMaterialVariants ();
      this .addAnimations ();
   }

   async viewAll ()
   {
      await this .browser .nextFrame ();

      if (!this .browser .activeViewpoint ?.description)
         this .browser .viewAll (0);
   }

   async setEnvironmentLight (on, ibl = this .localStorage .ibl)
   {
      this .localStorage .ibl = ibl;

      $("#ibl") .val (on ? ibl : "");

      if (!on)
      {
         if (!this .environmentLight)
            return;
      }

      const
         environmentLight   = await this .getEnvironmentLight (),
         [image, intensity] = ibl .split (":");

      environmentLight .on        = on;
      environmentLight .intensity = parseFloat (intensity);

      const
         url         = new URL (`images/${image}`, import .meta .url),
         diffuseURL  = new X3D .MFString (`${url}-diffuse.avif`,  `${url}-diffuse.jpg`),
         specularURL = new X3D .MFString (`${url}-specular.avif`, `${url}-specular.jpg`);

      if (!environmentLight .diffuseTexture .url .equals (diffuseURL))
         environmentLight .diffuseTexture .url = diffuseURL;

      if (!environmentLight .specularTexture .url .equals (specularURL))
         environmentLight .specularTexture .url = specularURL;

      this .scene .addRootNode (environmentLight);
   }

   async getEnvironmentLight ()
   {
      if (this .environmentLight)
         return this .environmentLight;

      this .scene .addComponent (this .browser .getComponent ("CubeMapTexturing"));

      await this .browser .loadComponents (this .scene);

      const
         environmentLight  = this .scene .createNode ("EnvironmentLight"),
         diffuseTexture    = this .scene .createNode ("ImageCubeMapTexture"),
         specularTexture   = this .scene .createNode ("ImageCubeMapTexture"),
         textureProperties = this .scene .createNode ("TextureProperties");

      textureProperties .generateMipMaps     = true;
      textureProperties .minificationFilter  = "NICEST";
      textureProperties .magnificationFilter = "NICEST";

      diffuseTexture  .textureProperties = textureProperties;
      specularTexture .textureProperties = textureProperties;

      environmentLight .intensity       = 1;
      environmentLight .color           = new X3D .SFColor (1, 1, 1);
      environmentLight .diffuseTexture  = diffuseTexture;
      environmentLight .specularTexture = specularTexture;

      return this .environmentLight = environmentLight;
   }

   async setHeadlight (on)
   {
      if (on)
      {
         $("#headlight") .removeClass ("fa-xmark") .addClass ("fa-check");
         $("#headlight, [for=headlight]") .addClass ("selected");
      }
      else
      {
         $("#headlight") .removeClass ("fa-check") .addClass ("fa-xmark");
         $("#headlight, [for=headlight]") .removeClass ("selected");
      }

      const navigationInfo = await this .getNavigationInfo ();

      navigationInfo .set_bind  = true;
      navigationInfo .headlight = on;

      this .scene .addRootNode (navigationInfo);
   }

   async getNavigationInfo ()
   {
      if (this .navigationInfo)
         return this .navigationInfo;

      const navigationInfo = this .scene .createNode ("NavigationInfo");

      return this .navigationInfo = navigationInfo;
   }

   setExposure (value)
   {
      this .browser .setBrowserOption ("Exposure", value);
   }

   setToneMapping (value)
   {
      $("#tone-mapping") .val (value);

      this .localStorage .toneMapping = value;

      this .browser .setBrowserOption ("ToneMapping", value);
   }

   async setBackground (on)
   {
      this .localStorage .background = on;

      if (on)
      {
         $("#summer") .removeClass ("fa-xmark") .addClass ("fa-check");
         $("#summer, [for=summer]") .addClass ("selected");
      }
      else
      {
         $("#summer") .removeClass ("fa-check") .addClass ("fa-xmark");
         $("#summer, [for=summer]") .removeClass ("selected");
      }

      const
         defaultBackground = await this .getDefaultBackground (),
         background        = await this .getBackground ();

      defaultBackground .set_bind = !on;
      background        .set_bind = on;

      this .scene .addRootNode (defaultBackground);
      this .scene .addRootNode (background);
   }

   async getDefaultBackground ()
   {
      return this .defaultBackground ??= this .scene .createNode ("Background");
   }

   async getBackground ()
   {
      if (this .background)
         return this .background;

      const background = this .scene .createNode ("Background");

      background .skyAngle    = [0.8, 1.3, 1.4, 1.5708];
      background .skyColor    = [0.21, 0.31, 0.59, 0.33, 0.45, 0.7, 0.57, 0.66, 0.85, 0.6, 0.73, 0.89, 0.7, 0.83, 0.98] .map (v => Math .pow (v, 2.2));
      background .groundAngle = [0.659972, 1.2, 1.39912, 1.5708];
      background .groundColor = [0.105712, 0.156051, 0.297, 0.187629, 0.255857, 0.398, 0.33604, 0.405546, 0.542, 0.3612, 0.469145, 0.602, 0.39471, 0.522059, 0.669] .map (v => Math .pow (v, 2.2));

      return this .background = background;
   }

   addScenes ()
   {
      const scenes = $.try (() => this .scene .getExportedNode ("Scenes"));

      if (!scenes)
         return;

      $("#scenes") .empty ();
      $("<b></b>") .text ("Scenes") .appendTo ($("#scenes"));

      for (let i = 0; i < scenes .children .length; ++ i)
      {
         const onclick = () =>
         {
            $("#scenes i") .each ((_, element) =>
            {
               $(element) .removeClass (["fa-circle-dot", "selected"]) .addClass ("fa-circle");
               $(`[for=${$(element) .attr ("id")}]`) .removeClass ("selected");
            });

            $(`#scene${i}`) .toggleClass (["fa-circle", "fa-circle-dot", "selected"]);
            $(`[for=scene${i}]`) .toggleClass ("selected");

            scenes .whichChoice = i;
         };

         const button = $("<button></button>")
            .addClass ("check")
            .attr ("for", `scene${i}`)
            .text (`Scene ${i}`)
            .on ("click", onclick)
            .appendTo ($("#scenes"));

         $("<i></i>")
            .addClass (["fa-regular", "fa-circle"])
            .attr ("id", `scene${i}`)
            .prependTo (button);
      }

      $("#scenes") .show () .find ("button") .first () .trigger ("click");
   }

   addViewpoints ()
   {
      const viewpoints = $.try (() => this .scene .getExportedNode ("Viewpoints"));

      if (!viewpoints)
         return;

      $("#viewpoints") .empty ();
      $("<b></b>") .text ("Viewpoints") .appendTo ($("#viewpoints"));

      const select = $("<select></select>")
         .addClass ("select")
         .on ("change", () =>
         {
            viewpoints .children [select .val ()] .set_bind = true;
         })
         .appendTo ($("#viewpoints"));

      for (const [i, viewpoint] of viewpoints .children .entries ())
      {
         $("<option></option>")
            .prop ("selected", viewpoint .isBound)
            .text (viewpoint .description)
            .val (i)
            .appendTo (select);

         viewpoint .getField ("isBound") .addFieldCallback ("bind", () => select .val (i));
      }

      $("#viewpoints") .show ();
   }

   addMaterialVariants ()
   {
      const switchNode = $.try (() => this .scene .getExportedNode ("MaterialVariants"));

      if (!switchNode)
         return;

      $("#material-variants") .empty ();
      $("<b></b>") .text ("Material Variants") .appendTo ($("#material-variants"));

      const select = $("<select></select>")
         .addClass ("select")
         .on ("change", () =>
         {
            switchNode .whichChoice = select .val ();
         })
         .appendTo ($("#material-variants"));

      $("<option></option>")
         .prop ("selected", true)
         .val (switchNode .getValue () .getMetaData ("MaterialVariants/names") .length)
         .text ("None")
         .appendTo (select);

      for (const [i, name] of switchNode .getValue () .getMetaData ("MaterialVariants/names") .entries ())
      {
         $("<option></option>")
            .val (i)
            .text (name)
            .appendTo (select);
      }

      $("#material-variants") .show ();
   }

   addAnimations ()
   {
      const animations = $.try (() => this .scene .getExportedNode ("Animations"));

      if (!animations)
         return;

      $("#animations") .empty ();
      $("<b></b>") .text ("Animations") .appendTo ($("#animations"));

      for (const [i, group] of animations .children .entries ())
      {
         const timeSensor = group .children [0];

         const onclick = () =>
         {
            $(`#animation${i}`) .toggleClass (["fa-circle", "fa-circle-dot", "selected"]);
            $(`[for=animation${i}]`) .toggleClass ("selected");

            for (const group of animations .children)
               group .children [0] .stopTime = Date .now () / 1000;

            if (!$(`#animation${i}`) .hasClass ( "fa-circle-dot"))
               return;

            $("#animations i") .each ((_, element) =>
            {
               if (element === $(`#animation${i}`) .get (0))
                  return;

               $(element) .removeClass (["fa-circle-dot", "selected"]) .addClass ("fa-circle");
               $(`[for=${$(element) .attr ("id")}]`) .removeClass ("selected");
            });

            timeSensor .loop      = true;
            timeSensor .startTime = Date .now () / 1000;
         };

         const button = $("<button></button>")
            .addClass ("check")
            .attr ("for", `animation${i}`)
            .text (group .children [0] .description)
            .on ("click", onclick)
            .appendTo ($("#animations"));

         $("<i></i>")
            .addClass (["fa-regular", "fa-circle"])
            .attr ("id", `animation${i}`)
            .prependTo (button);
      }

      $("#animations") .show () .find ("button") .first () .trigger ("click");
   }
}

const viewer = new SampleViewer (X3D .getBrowser ());
