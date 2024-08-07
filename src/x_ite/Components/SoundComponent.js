/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/

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
