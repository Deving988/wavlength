import TrackPlayer, { Capability, AppKilledPlaybackBehavior } from 'react-native-track-player';

let isSetup = false;

export async function setupPlayer() {
  if (isSetup) return true;

  try {
    await TrackPlayer.setupPlayer({
      autoHandleInterruptions: true,
    });

    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior: AppKilledPlaybackBehavior.PausePlayback,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
        Capability.Stop,
      ],
      compactCapabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext],
      progressUpdateEventInterval: 2,
    });

    isSetup = true;
    return true;
  } catch (error) {
    console.log('TrackPlayer setup error:', error);
    isSetup = false;
    return false;
  }
}
