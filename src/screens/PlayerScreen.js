import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import TrackPlayer, { usePlaybackState, useProgress, useActiveTrack, State } from 'react-native-track-player';
import { useNavigation } from '@react-navigation/native';

import { colors, spacing, typography } from '../constants/theme';
import { formatTime } from '../utils/formatTime';

export default function PlayerScreen() {
  const navigation = useNavigation();
  const track = useActiveTrack();
  const playbackState = usePlaybackState();
  const progress = useProgress(250);

  const isPlaying = playbackState.state === State.Playing;

  const togglePlayback = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  if (!track) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.emptyText}>Nothing playing yet</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: spacing.lg, alignSelf: 'center' }}>
          <Text style={{ color: colors.accent }}>Go back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.collapseButton}>
        <Text style={styles.collapseIcon}>⌄</Text>
      </TouchableOpacity>

      <View style={styles.artworkWrap}>
        <View style={styles.artworkPlaceholder}>
          <Text style={{ fontSize: 64 }}>🎵</Text>
        </View>
      </View>

      <View style={styles.meta}>
        <Text style={styles.title} numberOfLines={1}>
          {track.title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {track.artist || 'Unknown artist'}
        </Text>
      </View>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={progress.duration || 1}
        value={progress.position}
        minimumTrackTintColor={colors.accent}
        maximumTrackTintColor={colors.border}
        thumbTintColor={colors.accent}
        onSlidingComplete={(value) => TrackPlayer.seekTo(value)}
      />
      <View style={styles.timeRow}>
        <Text style={styles.timeText}>{formatTime(progress.position)}</Text>
        <Text style={styles.timeText}>{formatTime(progress.duration)}</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={() => TrackPlayer.skipToPrevious()}>
          <Text style={styles.controlIcon}>⏮</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlayback} style={styles.playButton}>
          <Text style={styles.playIcon}>{isPlaying ? '❚❚' : '►'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => TrackPlayer.skipToNext()}>
          <Text style={styles.controlIcon}>⏭</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: spacing.lg },
  collapseButton: { alignSelf: 'center', paddingVertical: spacing.sm },
  collapseIcon: { color: colors.textSecondary, fontSize: 28 },
  artworkWrap: { alignItems: 'center', marginTop: spacing.lg },
  artworkPlaceholder: {
    width: 280,
    height: 280,
    borderRadius: 16,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  meta: { marginTop: spacing.xl, alignItems: 'center' },
  title: { ...typography.title, color: colors.textPrimary, fontSize: 22 },
  artist: { ...typography.body, color: colors.textSecondary, marginTop: spacing.xs },
  slider: { width: '100%', height: 40, marginTop: spacing.lg },
  timeRow: { flexDirection: 'row', justifyContent: 'space-between' },
  timeText: { ...typography.caption, color: colors.textSecondary },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
    gap: 40,
  },
  controlIcon: { fontSize: 28, color: colors.textPrimary },
  playButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: { fontSize: 26, color: '#1A1204' },
  emptyText: { ...typography.body, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xl },
});
