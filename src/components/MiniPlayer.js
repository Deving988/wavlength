import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TrackPlayer, { usePlaybackState, useActiveTrack, State } from 'react-native-track-player';

import { colors, spacing, typography } from '../constants/theme';

export default function MiniPlayer() {
  const navigation = useNavigation();
  const track = useActiveTrack();
  const playbackState = usePlaybackState();

  if (!track) return null;

  const isPlaying = playbackState.state === State.Playing;

  const togglePlayback = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.85} onPress={() => navigation.navigate('Player')}>
      <View style={styles.artwork}>
        <Text style={{ fontSize: 16 }}>🎵</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {track.title || 'Unknown title'}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {track.artist || 'Unknown artist'}
        </Text>
      </View>
      <TouchableOpacity
        onPress={togglePlayback}
        style={styles.playButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={styles.playIcon}>{isPlaying ? '❚❚' : '►'}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: spacing.sm,
    right: spacing.sm,
    bottom: 66,
    height: 58,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  artwork: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: { flex: 1, marginLeft: spacing.sm },
  title: { ...typography.body, color: colors.textPrimary, fontWeight: '600' },
  artist: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
  playButton: { paddingHorizontal: spacing.sm },
  playIcon: { color: colors.accent, fontSize: 18 },
});
