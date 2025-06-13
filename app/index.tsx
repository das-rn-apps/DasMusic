import AudioItem from '@/components/AudioItem';
import SearchModal from '@/components/SearchModal';
import VideoPlayer from '@/components/VideoPlayer';
import { Colors } from '@/constants/Colors';
import { YouTubeVideo } from '@/types';
import { fetchVideos } from "@/utils/api";
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
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
  const [query, setQuery] = useState('Latest indian bollywod songs');
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);

  const fetchData = async (song?: string) => {
    try {
      const searchingSong = song || query
      const { videos: fetchedVideos } = await fetchVideos(searchingSong);
      setVideos(fetchedVideos);
      setSelectedVideo(null);
    } catch (error) {
      console.error("❌ Error fetching videos:", error);
    }
  };

  // 🔹 Handle search submission
  const handleSubmitSearch = (song: string) => {
    setModalVisible(false);
    fetchData(song);
  };

  // 🔹 Open modal and clear previous query
  const openSearchModal = () => {
    setQuery('');
    setModalVisible(true);
  };

  // 🔹 Unique key extractor for FlatList
  const keyExtractor = (item: YouTubeVideo) => item.id;


  // 🔹 Handle selecting a video
  const handleTrackPress = (track: YouTubeVideo) => {
    setSelectedVideo(track);
  };

  // 🔹 Render each audio item
  const renderItem: ListRenderItem<YouTubeVideo> = ({ item }) => (
    <AudioItem
      video={item}
      onPress={() => handleTrackPress(item)}
      isActive={selectedVideo?.id === item.id}
    />
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {/* 🔸 Header with title and search */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.header}>Das Music App</Text>
          <Text style={styles.subtitle}>Discover and play your favorite tracks.</Text>
        </View>
        <TouchableOpacity onPress={openSearchModal} style={styles.searchButton}>
          <Ionicons name="search" size={30} color={Colors.button.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* 🔸 Video Player */}

      {selectedVideo && (
        <VideoPlayer
          video={selectedVideo}
          playing
          onEnd={() => setSelectedVideo(null)}
        />
      )}

      {/* 🔸 Audio List */}
      <View style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 9 }}>
        <FlatList
          data={videos}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </View>


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
    paddingHorizontal: 10
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
    textAlign: 'left',
    marginBottom: 5,
    color: Colors.text.subtle,
  },
  searchButton: {
    padding: 10,
    zIndex: 10,
  }
});
