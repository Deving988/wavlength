import React, { useState, useMemo } from 'react';
import { Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TrackPlayer from 'react-native-track-player';
import { useNavigation } from '@react-navigation/native';

import { colors, spacing, typography } from '../constants/theme';
import { useLibraryStore } from '../store/useLibraryStore';
import TrackRow from '../components/TrackRow';

export default function LibraryScreen() {
  const navigation = useNavigation();
  const { localTracks } = useLibraryStore();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return localTracks;
    const q = query.toLowerCase();
    return localTracks.filter((t) => t.title.toLowerCase().includes(q));
  }, [localTracks, query]);

  const playTrack = async (index) => {
    await TrackPlayer.reset();
    await TrackPlayer.add(
      filtered.map((t) => ({ id: t.id, url: t.url, title: t.title, artist: t.artist, duration: t.duration }))
    );
    await TrackPlayer.skip(index);
    await TrackPlayer.play();
    navigation.navigate('Player');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.header}>Your Library</Text>
      <TextInput
        style={styles.search}
        placeholder="Filter your music"
        placeholderTextColor={colors.textSecondary}
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <TrackRow track={item} onPress={() => playTrack(index)} />}
        contentContainerStyle={{ paddingBottom: 140 }}
        ListEmptyComponent={<Text style={styles.emptyText}>Nothing here yet.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingTop: spacing.md },
  header: { ...typography.display, color: colors.textPrimary, paddingHorizontal: spacing.md, marginBottom: spacing.sm },
  search: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    color: colors.textPrimary,
  },
  emptyText: { ...typography.body, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xl },
});
