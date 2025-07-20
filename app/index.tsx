import AudioItem from '@/components/AudioItem';
import SearchModal from '@/components/SearchModal';
import VideoPlayer from '@/components/VideoPlayer';
import { Colors } from '@/constants/Colors';
import { YouTubeVideo } from '@/types';
import { fetchVideos } from "@/utils/api";
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const IndexScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(true);
  const [query, setQuery] = useState('Latest indian bollywod songs');
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (song?: string) => {
    try {
      setLoading(true);
      const searchingSong = song || query;
      const { videos: fetchedVideos } = await fetchVideos(searchingSong);
      setVideos(fetchedVideos);
      setSelectedVideo(null);
    } catch (error) {
      console.error("❌ Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitSearch = (song: string) => {
    setModalVisible(false);
    fetchData(song);
  };

  const openSearchModal = () => {
    setQuery('');
    setModalVisible(true);
  };

  const keyExtractor = (item: YouTubeVideo) => item.id;

  const handleTrackPress = useCallback((track: YouTubeVideo) => {
    setSelectedVideo(track);
  }, []);

  const renderItem: ListRenderItem<YouTubeVideo> = useCallback(({ item }) => (
    <AudioItem
      video={item}
      onPress={() => handleTrackPress(item)}
      isActive={selectedVideo?.id === item.id}
    />
  ), [selectedVideo]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.header}>Das Music App</Text>
          <Text style={styles.subtitle}>Discover and play your favorite tracks.</Text>
        </View>
        <TouchableOpacity onPress={openSearchModal} style={styles.searchButton}>
          <Ionicons name="search" size={30} color={Colors.button.textPrimary} />
        </TouchableOpacity>
      </View>

      {selectedVideo && (
        <VideoPlayer
          video={selectedVideo}
          playing
          onEnd={() => setSelectedVideo(null)}
        />
      )}

      <TouchableOpacity onPress={() => setVisible(!visible)} style={styles.musicListHide}>
        <Ionicons name="list" size={50} color={Colors.button.primaryBackground} />
      </TouchableOpacity>

      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : !loading && videos.length === 0 ? (
        <Text style={styles.emptyText}>No videos found.</Text>
      ) : (
        visible && (
          <View style={styles.listContainer}>
            <FlatList
              data={videos}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              initialNumToRender={5}
              removeClippedSubviews={true}
            />
          </View>
        )
      )}

      <SearchModal
        visible={modalVisible}
        query={query}
        setQuery={setQuery}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmitSearch}
      />
    </View>
  );
};

export default IndexScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background.app,
    flex: 1,
    paddingHorizontal: 10,
  },
  headerRow: {
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  header: {
    zIndex: 10,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'left',
    color: Colors.heading.primary,
  },
  subtitle: {
    fontSize: 13,
    zIndex: 10,
    textAlign: 'left',
    marginBottom: 5,
    color: Colors.text.subtle,
  },
  searchButton: {
    padding: 10,
    zIndex: 10,
  },
  musicListHide: {
    zIndex: 10,
    position: "absolute",
    bottom: 30,
    right: 30,
    padding: 5,
    backgroundColor: "white",
    borderRadius: 50,
  },
  listContainer: {
    position: "absolute",
    top: 100,
    left: 10,
    width: "100%",
    height: "100%",
    zIndex: 9,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    color: Colors.text.subtle,
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: Colors.text.subtle,
    fontSize: 16,
  }
});
