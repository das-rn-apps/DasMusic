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

    // Handle animated equalizer when isActive
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

        // Cleanup
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
            {/* Thumbnail */}
            <Image
                source={{ uri: video?.thumbnail }}
                style={styles.thumbnail}
            />

            {/* Details */}
            <View style={styles.details}>
                <Text
                    style={[styles.title, isActive && styles.activeTitle]}
                    numberOfLines={1}
                >
                    {video?.title ?? "Untitled"}
                </Text>

                {/* Metadata Row */}
                <Text style={styles.channel} numberOfLines={1}>
                    {video?.channelTitle ?? "Unknown Channel"}
                </Text>
            </View>

            {/* Animated Equalizer */}
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
        fontSize: 13,
        color: Colors.text.subtle,
        marginTop: 2,
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
