import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { colors, spacing, typography } from '../constants/theme';
import { formatTime } from '../utils/formatTime';

export default function TrackRow({ track, onPress, isActive }) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.artwork, isActive && styles.artworkActive]}>
        <Text style={{ fontSize: 16 }}>{isActive ? '🔊' : '🎵'}</Text>
      </View>
      <View style={styles.info}>
        <Text style={[styles.title, isActive && styles.titleActive]} numberOfLines={1}>
          {track.title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {track.artist || 'Unknown artist'}
        </Text>
      </View>
      {!!track.duration && <Text style={styles.duration}>{formatTime(track.duration)}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm, paddingHorizontal: spacing.md },
  artwork: {
    width: 44,
    height: 44,
    borderRadius: 6,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  artworkActive: { backgroundColor: colors.accent + '33' },
  info: { flex: 1, marginLeft: spacing.sm },
  title: { ...typography.body, color: colors.textPrimary },
  titleActive: { color: colors.accent, fontWeight: '600' },
  artist: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
  duration: { ...typography.caption, color: colors.textSecondary, marginLeft: spacing.sm },
});
