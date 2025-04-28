import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import MedCard from '../components/MedCard';
import MovieCard from '../components/MovieCard';
import { Text } from 'react-native';


export default function VideoScreen({ route, navigation }) {
  const { video: data, datas: MedCardData, movieData: MovieCardData } = route.params;

  // Initialize the video player
  const player = useVideoPlayer(data.video, player => {
    player.loop = true;
    player.play();
    player.muted = false; 
    player.volume = 1.0; 
  });

  // Track playing state
  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.videoContainer}>
          {/* Video component with player */}
          <VideoView 
            style={styles.video} 
            player={player} 
            allowsFullscreen 
            allowsPictureInPicture 
          />
        </View>

        <Text style={styles.videoTitle}>{data.title}</Text>

        <Text style={styles.text}>Continue Watching</Text>
      
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {MedCardData.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.push("VideoTab", {
                  video: item,
                  datas: MedCardData,
                  movieData: MovieCardData,
                });
              }}
              style={{ marginLeft:  index > 0 ? 0 : 8 }}
            >
              <MedCard image={item.image} />
            </TouchableOpacity>
          ))}
        </ScrollView>


      
        <Text style={styles.likeText}>Top Picks For You</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {MovieCardData.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.push("EpisodeTab", {
                  data: item,
                  datas: MedCardData,
                  movieData: MovieCardData,
                });
              }}
              style={{ marginLeft:  index > 0 ? 0 : 8 }}
            >
              <MovieCard image={item.image} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
  },
  videoContainer: {
    width: '96%',
    height: 201,
    backgroundColor: 'green',
    borderRadius: 4,
    overflow: 'hidden',
    marginLeft: 8,
    marginRight: 10,
    marginTop: 15,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  videoTitle: {
    marginTop: 18,
    marginLeft: 15,
    color: 'black',
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: '600',
  },
  text: {
    marginTop: 20,
    marginLeft: 16,
    marginBottom: 20,
    color: 'grey',
    fontSize: 15,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  likeText: {
    marginTop: 20,
    marginLeft: 15,
    marginBottom: 20,
    color: 'grey',
    fontSize: 15,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  controlsContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
