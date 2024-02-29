import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import useMyTextInput from './useMyTextInput'; // Assurez-vous que le chemin est correct

const MySearchBar = () => {
    const [searchQuery, handleSearchChange] = useMyTextInput('', () => {
        Alert.alert('Recherche terminée', `Vous avez recherché : ${searchQuery}`);
    });

    const resetSearch = () => {
        handleSearchChange('');
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={handleSearchChange}
                value={searchQuery}
                placeholder="Tapez pour rechercher..."
            />
            <TouchableOpacity onPress={resetSearch} style={styles.resetButton}>
                <Text style={styles.resetButtonText}>X</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
    },
    input: {
        flex: 1,
    },
    resetButton: {
        marginLeft: 10,
    },
    resetButtonText: {
        color: 'black',
        fontSize: 16,
    },
    // Vous pouvez ajouter d'autres styles si nécessaire
});

export default MySearchBar;
