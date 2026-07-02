import * as MediaLibrary from 'expo-media-library';

// Pulls real audio files from the phone's own storage — this is the
// "my files" source. No account, no API key, no internet required.
export async function requestAndLoadLocalTracks() {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status !== 'granted') {
    return { granted: false, tracks: [] };
  }

  const media = await MediaLibrary.getAssetsAsync({
    mediaType: MediaLibrary.MediaType.audio,
    first: 500,
    sortBy: [[MediaLibrary.SortBy.creationTime, false]],
  });

  const tracks = media.assets.map((asset) => ({
    id: asset.id,
    url: asset.uri,
    title: asset.filename ? asset.filename.replace(/\.[^/.]+$/, '') : 'Unknown title',
    artist: 'On this device',
    duration: asset.duration,
  }));

  return { granted: true, tracks };
}
