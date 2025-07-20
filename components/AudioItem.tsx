import React, { useEffect, useRef } from "react";
import {
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    View,
    Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { YouTubeVideo } from "@/types";
import { formatDuration, formatPublishedDate } from "@/utils/time";




interface AudioItemProps {
    video: YouTubeVideo;
    onPress?: () => void;
    isActive?: boolean;
}

const AudioItem: React.FC<AudioItemProps> = ({ video, onPress, isActive }) => {
    const animValues = useRef([
        new Animated.Value(1),
        new Animated.Value(1),
        new Animated.Value(1),
    ]).current;

    useEffect(() => {
        let loopAnim: Animated.CompositeAnimation | null = null;

        if (isActive) {
            const animate = () => {
                const animations = animValues.map((value) =>
                    Animated.sequence([
                        Animated.timing(value, {
                            toValue: 0.3 + Math.random(),
                            duration: 300,
                            useNativeDriver: true,
                        }),
                        Animated.timing(value, {
                            toValue: 1,
                            duration: 300,
                            useNativeDriver: true,
                        }),
                    ])
                );
                loopAnim = Animated.loop(Animated.stagger(100, animations));
                loopAnim.start();
            };
            animate();
        }

        return () => {
            if (loopAnim) loopAnim.stop();
            animValues.forEach((v) => v.stopAnimation());
        };
    }, [isActive]);

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, isActive && styles.activeContainer]}
            activeOpacity={0.9}
        >
            <Image source={{ uri: video?.thumbnail }} style={styles.thumbnail} />

            <View style={styles.details}>
                <Text style={[styles.title, isActive && styles.activeTitle]} numberOfLines={1}>
                    {video?.title ?? "Untitled"}
                </Text>

                <Text style={styles.channel} numberOfLines={1}>
                    {video?.channelTitle ?? "Unknown Channel"}
                </Text>

                <View style={styles.metaRow}>
                    <Ionicons name="time-outline" size={14} color={Colors.icon.default} />
                    <Text style={styles.metaText}>{formatPublishedDate(video.publishedAt)}</Text>

                    <Ionicons name="eye-outline" size={14} color={Colors.icon.default} />
                    <Text style={styles.metaText}>{video.views}</Text>

                    <Ionicons name="thumbs-up-outline" size={14} color={Colors.icon.default} />
                    <Text style={styles.metaText}>{video.likes}</Text>

                    <Ionicons name="chatbubble-ellipses-outline" size={14} color={Colors.icon.default} />
                    <Text style={styles.metaText}>{video.comments}</Text>

                    <Ionicons name="musical-notes-outline" size={14} color={Colors.icon.default} />
                    <Text style={styles.metaText}>{formatDuration(video.duration)}</Text>
                </View>
            </View>

            {isActive && (
                <View style={styles.equalizer}>
                    {animValues.map((value, index) => (
                        <Animated.View
                            key={index}
                            style={[
                                styles.equalizerBar,
                                {
                                    transform: [{ scaleY: value }],
                                    backgroundColor: Colors.icon.active,
                                },
                            ]}
                        />
                    ))}
                </View>
            )}
        </TouchableOpacity>
    );
};

export default AudioItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    activeContainer: {
    },
    thumbnail: {
        width: 55,
        height: 55,
        borderRadius: 10,
        marginRight: 14,
        backgroundColor: Colors.background.modal,
    },
    details: {
        flex: 1,
        justifyContent: "center",
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: Colors.text.body,
    },
    activeTitle: {
        color: Colors.button.primaryBackground,
    },
    channel: {
        fontSize: 12,
        color: Colors.text.subtle,
        marginTop: 1,
    },
    metaRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        marginTop: 1,
        gap: 2,
    },
    metaText: {
        fontSize: 11,
        color: Colors.text.subtle,
        marginRight: 8,
    },
    equalizer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: 18,
        height: 20,
        marginLeft: 2,
    },
    equalizerBar: {
        width: 3,
        height: "100%",
        borderRadius: 1.5,
        backgroundColor: Colors.icon.active,
    },
});
