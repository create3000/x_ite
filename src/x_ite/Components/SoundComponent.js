import Analyser                from "./Sound/Analyser.js";
import AudioClip               from "./Sound/AudioClip.js";
import AudioDestination        from "./Sound/AudioDestination.js";
import BiquadFilter            from "./Sound/BiquadFilter.js";
import BufferAudioSource       from "./Sound/BufferAudioSource.js";
import ChannelMerger           from "./Sound/ChannelMerger.js";
import ChannelSelector         from "./Sound/ChannelSelector.js";
import ChannelSplitter         from "./Sound/ChannelSplitter.js";
import Convolver               from "./Sound/Convolver.js";
import Delay                   from "./Sound/Delay.js";
import DynamicsCompressor      from "./Sound/DynamicsCompressor.js";
import Gain                    from "./Sound/Gain.js";
import ListenerPointSource     from "./Sound/ListenerPointSource.js";
import MicrophoneSource        from "./Sound/MicrophoneSource.js";
import OscillatorSource        from "./Sound/OscillatorSource.js";
import PeriodicWave            from "./Sound/PeriodicWave.js";
import Sound                   from "./Sound/Sound.js";
import SpatialSound            from "./Sound/SpatialSound.js";
import StreamAudioDestination  from "./Sound/StreamAudioDestination.js";
import StreamAudioSource       from "./Sound/StreamAudioSource.js";
import WaveShaper              from "./Sound/WaveShaper.js";
import X3DSoundChannelNode     from "./Sound/X3DSoundChannelNode.js";
import X3DSoundDestinationNode from "./Sound/X3DSoundDestinationNode.js";
import X3DSoundNode            from "./Sound/X3DSoundNode.js";
import X3DSoundProcessingNode  from "./Sound/X3DSoundProcessingNode.js";
import X3DSoundSourceNode      from "./Sound/X3DSoundSourceNode.js";

export default {
   name: "Sound",
   concreteNodes:
   [
      Analyser,
      AudioClip,
      AudioDestination,
      BiquadFilter,
      BufferAudioSource,
      ChannelMerger,
      ChannelSelector,
      ChannelSplitter,
      Convolver,
      Delay,
      DynamicsCompressor,
      Gain,
      ListenerPointSource,
      MicrophoneSource,
      OscillatorSource,
      PeriodicWave,
      Sound,
      SpatialSound,
      StreamAudioDestination,
      StreamAudioSource,
      WaveShaper,
   ],
   abstractNodes:
   [
      X3DSoundChannelNode,
      X3DSoundDestinationNode,
      X3DSoundNode,
      X3DSoundProcessingNode,
      X3DSoundSourceNode,
   ],
};
