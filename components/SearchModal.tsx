import { Colors } from '@/constants/Colors';
import { suggestions } from '@/utils/suggestions';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

interface SearchModalProps {
    visible: boolean;
    query: string;
    setQuery: (text: string) => void;
    onClose: () => void;
    onSubmit: (song: string) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({
    visible,
    query,
    setQuery,
    onClose,
    onSubmit,
}) => {
    const handleSuggestionPress = async (suggestion: string) => {
        setQuery(suggestion);
        onSubmit(suggestion);
    };

    return (
        <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent>
            <View style={styles.modalContainer}>
                <Text style={styles.modalHeader}>Search Musics</Text>

                <TextInput
                    value={query}
                    placeholder="Type a song or artist..."
                    placeholderTextColor={Colors.text.placeholder}
                    style={styles.searchInput}
                    onSubmitEditing={() => onSubmit(query)}
                    onChangeText={setQuery}
                    returnKeyType="search"
                />

                {suggestions.length > 0 && (
                    <FlatList
                        data={suggestions}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleSuggestionPress(item)} style={styles.suggestionItem}>
                                <Text style={styles.suggestionText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                )}

                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Ionicons name="close" size={30} color={Colors.icon.default} />
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default SearchModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        margin: 20,
        padding: 20,
        borderRadius: 10,
        backgroundColor: Colors.background.modal,
    },
    modalHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.text.artist,
        marginBottom: 15,
    },
    searchInput: {
        backgroundColor: Colors.background.card,
        padding: 12,
        borderRadius: 10,
        fontSize: 20,
        color: Colors.text.artist,
        marginBottom: 10,
    },
    suggestionItem: {
        paddingVertical: 7,
        borderBottomColor: Colors.divider,
        borderBottomWidth: 1,
    },
    suggestionText: {
        color: Colors.text.artist,
        fontSize: 15,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});
