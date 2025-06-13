import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import YouTubeIframe from "react-native-youtube-iframe";
import { YouTubeVideo } from "@/types";

interface VideoPlayerProps {
    video: YouTubeVideo;
    playing: boolean;
    onEnd: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, playing, onEnd }) => {
    const { height } = Dimensions.get("window");

    const videoId = video?.id;
    if (!videoId) {
        console.warn("Video ID is missing. Cannot render YouTube player.");
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Unable to load video.</Text>
            </View>
        );
    }

    return (
        <View style={styles.fullscreen}>
            <YouTubeIframe
                height={height * 1.2}
                width={height * 2.4}
                play={playing}
                videoId={videoId}
                onChangeState={(state: string) => {
                    if (state === "ended") {
                        onEnd();
                    }
                }}
                initialPlayerParams={{
                    loop: false,
                    controls: true,
                }}
            />
        </View>
    );
};

export default VideoPlayer;

const styles = StyleSheet.create({
    fullscreen: {
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2,
        marginTop: -300,
    },
    errorContainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#f8d7da",
        marginVertical: 10,
    },
    errorText: {
        color: "#721c24",
        fontSize: 16,
    },
});
