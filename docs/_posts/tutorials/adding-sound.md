---
title: Adding Sound
date: 2022-11-28
nav: tutorials-textures-lights-and-environment
categories: [Tutorials]
tags: [Sound]
---
## Motivation

- Sounds can be triggered by viewer actions
  - Clicks, horn honks, door latch noises
- Sounds can be continuous in the background
  - Wind, crowd noises, elevator music
- Sounds emit from a location, in a direction, within an area

## Creating sounds

Sounds have two components:

- A sound source providing a sound signal
  - Like a stereo component
- A sound emitter converts a signal to virtual sound
  - Like a stereo speaker

## Syntax: AudioClip

An [AudioClip](/x_ite/components/sound/audioclip/) node creates a digital sound source:

- *url* - a sound file URL
- *pitch* - playback speed
- playback controls, like a [TimeSensor](/x_ite/components/time/timesensor/) node

### XML Encoding

```xml
<Sound>
  <AudioClip
      url='"myfile.mp3"'
      pitch='1.0'
      startTime='0.0'
      stopTime='0.0'
      loop='false'/>
</Sound>
```

### Classic Encoding

```js
Sound {
  source AudioClip {
    url "myfile.mp3"
    pitch 1.0
    startTime 0.0
    stopTime  0.0
    loop FALSE
  }
}
```

## Syntax: MovieTexture

A [MovieTexture](/x_ite/components/texturing/movietexture/) node creates a movie sound source:

- *url* - a texture movie file URL
- *speed* - playback speed
- playback controls, like a [TimeSensor](/x_ite/components/time/timesensor/) node

### XML Encoding

```xml
<Sound>
  <MovieTexture containerField='source'
      url='"movie.mp4"'
      speed='1.0'
      startTime='0.0'
      stopTime='0.0'
      loop='false'/>
</Sound>
```

### Classic Encoding

```js
Sound {
  source MovieTexture {
    url "movie.mp4"
    speed 1.0
    startTime 0.0
    stopTime  0.0
    loop FALSE
  }
}
```

## Selecting sound source types

Supported by the [AudioClip](/x_ite/components/sound/audioclip/) node:

- MP3 or WAV - digital sound files
  Good for sound effects

Supported by the [MovieTexture](/x_ite/components/texturing/movietexture/) node:

- MP4 - movie file with sound
  Good for virtual TVs

## Syntax: Sound

A [Sound](/x_ite/components/sound/sound/) node describes a sound emitter:

- *source* - [AudioClip](/x_ite/components/sound/audioclip/) or [MovieTexture](/x_ite/components/texturing/movietexture/) node
- *location* and *direction* - emitter placement

### XML Encoding

```xml
<Sound
    location='0.0 0.0 0.0'
    direction='0.0 0.0 1.0'>
  <AudioClip ... />
</Sound>
```

### Classic Encoding

```js
Sound {
  source AudioClip { ... }
  location  0.0 0.0 0.0
  direction 0.0 0.0 1.0
}
```

A [Sound](/x_ite/components/sound/sound/) node describes a sound emitter:

- *intensity* - volume
- *spatialize* - use spatialize processing
- *priority* - prioritize the sound

### XML Encoding

```xml
<Sound
    ...
    intensity='1.0'
    spatialize='true'
    priority='0.0'>
</Sound>
```

### Classic Encoding

```js
Sound {
  ...
  intensity 1.0
  spatialize TRUE
  priority 0.0
}
```

A [Sound](/x_ite/components/sound/sound/) node describes a sound emitter:

- *minFront, minBack* - inner ellipsoid
- *maxFront, maxBack* - outer ellipsoid

## Setting the sound range

- The sound range fields specify two ellipsoids
  - *minFront* and *minBack* control an inner ellipsoid
  - *maxFront* and *maxBack* control an outer ellipsoid
- Sound has a constant volume inside the inner ellipsoid
- Sound drops to zero volume from the inner to the outer ellipsoid

## Creating triggered sounds

[AudioClip](/x_ite/components/sound/audioclip/) node:

- *loop* **FALSE**
- Set *startTime* from a sensor node

[Sound](/x_ite/components/sound/sound/) node:

- *spatialize* **TRUE**
- *minFront* etc. with small values
- *priority* 1.0

## A sample using triggered sound

### XML Encoding

```xml
<Group>
  <Shape>
    <Appearance>
      <Material
          diffuseColor='1 1 1'/>
    </Appearance>
    <Box
        size='0.23 0.1 1.5'/>
  </Shape>
  <TouchSensor DEF='C4'/>
  <Sound
      maxBack='100'
      maxFront='100'>
    <AudioClip DEF='PitchC4'
        url='"tone1.mp3"'/>
  </Sound>
</Group>
<ROUTE fromNode='C4' fromField='touchTime' toNode='PitchC4' toField='set_startTime'/>
```

### Classic Encoding

```js
Group {
  children [
    Shape {
      appearance Appearance {
        material Material {
          diffuseColor 1.0 1.0 1.0
        }
      }
      geometry Box {
        size 0.23 0.1 1.5
      }
    }
    DEF C4 TouchSensor { }
    Sound {
      maxFront 100.0
      maxBack 100.0
      source DEF PitchC4 AudioClip {
        url "tone1.mp3"
        pitch 1.0
      }
    }
  ]
}
ROUTE C4.touchTime TO PitchC4.set_startTime
```

### Example

<x3d-canvas src="https://create3000.github.io/media/tutorials/scenes/sound/sound.x3dv" update="auto">
  <img src="https://create3000.github.io/media/tutorials/scenes/sound/screenshot.png" alt="Sound"/>
</x3d-canvas>

- [Download ZIP Archive](https://create3000.github.io/media/tutorials/scenes/sound/sound.zip)
- [View Source in Playground](/x_ite/playground/?url=https://create3000.github.io/media/tutorials/scenes/sound/sound.x3dv)
{: .example-links }

## Creating continuous localized sounds

[AudioClip](/x_ite/components/sound/audioclip/) node:

- *loop* **TRUE**
- *startTime* 0.0 (default)
- *stopTime* 0.0 (default)

[Sound](/x_ite/components/sound/sound/) node:

- *spatialize* **TRUE** (default)
- *minFront* etc. with medium values
- *priority* 0.0 (default)

## A sample using continuous localized sound

### XML Encoding

```xml
<Sound
    minBack='5'
    minFront='5'>
  <AudioClip
      url='"willow1.mp3"'
      loop='true'
      startTime='1'/>
</Sound>
<Transform
    translation='0 -1.65 0'>
  <Inline
      url='"sndmark.wrl"'/>
</Transform>
```

### Classic Encoding

```js
Sound {
  minFront 5.0
  minBack  5.0
  maxFront 10.0
  maxBack  10.0
  source AudioClip {
    url "willow1.mp3"
    loop TRUE
    startTime 1.0
    stopTime 0.0
  }
}
Transform {
  translation 0.0 -1.65 0.0
  children [
    Inline {
      url "sndmark.wrl"
    }
  ]
}
```

## Creating continuous background sounds

[AudioClip](/x_ite/components/sound/audioclip/) node:

- *loop* **TRUE**
- *startTime* 0.0 (default)
- *stopTime* 0.0 (default)

[Sound](/x_ite/components/sound/sound/) node:

- *spatialize* **FALSE** (default)
- *minFront* etc. with large values
- *priority* 0.0 (default)

## Summary

An [AudioClip](/x_ite/components/sound/audioclip/) node or a [MovieTexture](/x_ite/components/texturing/movietexture/) node describe a sound source:

- A URL gives the sound file
- Looping, start time, and stop time control playback

A [Sound](/x_ite/components/sound/sound/) node describes a sound emitter:

- A source node provides the sound
- Range fields describe the sound volume
