import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TrackPlayer from 'react-native-track-player';
import { useNavigation } from '@react-navigation/native';

import { colors, spacing, typography } from '../constants/theme';
import { useLibraryStore } from '../store/useLibraryStore';
import { requestAndLoadLocalTracks } from '../services/localLibrary';
import TrackRow from '../components/TrackRow';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { localTracks, setLocalTracks, hasPermission, setHasPermission } = useLibraryStore();
  const [loading, setLoading] = useState(false);

  const loadLibrary = useCallback(async () => {
    setLoading(true);
    const { granted, tracks } = await requestAndLoadLocalTracks();
    setHasPermission(granted);
    setLocalTracks(tracks);
    setLoading(false);
  }, [setHasPermission, setLocalTracks]);

  useEffect(() => {
    loadLibrary();
  }, [loadLibrary]);

  const playTrack = async (index) => {
    await TrackPlayer.reset();
    await TrackPlayer.add(
      localTracks.map((t) => ({ id: t.id, url: t.url, title: t.title, artist: t.artist, duration: t.duration }))
    );
    await TrackPlayer.skip(index);
    await TrackPlayer.play();
    navigation.navigate('Player');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.header}>Good to see you</Text>
      <Text style={styles.subheader}>Recently added on this device</Text>

      {!hasPermission && !loading && (
        <View style={styles.permissionBox}>
          <Text style={styles.permissionText}>Allow access to your music files to start listening.</Text>
          <TouchableOpacity style={styles.permissionButton} onPress={loadLibrary}>
            <Text style={styles.permissionButtonText}>Allow access</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={localTracks.slice(0, 20)}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <TrackRow track={item} onPress={() => playTrack(index)} />}
        contentContainerStyle={{ paddingBottom: 140 }}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadLibrary} tintColor={colors.accent} />}
        ListEmptyComponent={
          !loading && hasPermission ? (
            <Text style={styles.emptyText}>No audio files found on this device yet.</Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingTop: spacing.md },
  header: { ...typography.display, color: colors.textPrimary, paddingHorizontal: spacing.md },
  subheader: {
    ...typography.body,
    color: colors.textSecondary,
    paddingHorizontal: spacing.md,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  permissionBox: { margin: spacing.md, padding: spacing.md, backgroundColor: colors.surface, borderRadius: 12 },
  permissionText: { ...typography.body, color: colors.textPrimary, marginBottom: spacing.sm },
  permissionButton: { backgroundColor: colors.accent, paddingVertical: 10, borderRadius: 24, alignItems: 'center' },
  permissionButtonText: { color: '#1A1204', fontWeight: '700' },
  emptyText: { ...typography.body, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xl },
});
