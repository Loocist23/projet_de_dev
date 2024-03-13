import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import useMyTextInput from './useMyTextInput';
import MySearchBar from './MySearchBar';

const CustomInput = () => {
    const [state, setState] = useState({
        keyword: '',
        fontSize: 14,
    });

    const [error, setError] = useState('');
    const [timer, setTimer] = useState(null);
    
    useEffect(() => {
        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(() => {
            if (state.keyword !== 'Bonsoir') {
                setError(`Erreur: ${Math.floor(Math.random() * 10)}`);
            } else {
                setError('');
            }
        }, 1000);

        setTimer(newTimer);

        return () => clearTimeout(newTimer);
    }, [state.keyword]);

    const handleSetState = (key, value) => {
        setState(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };

    const increaseFontSize = () => {
        handleSetState('fontSize', state.fontSize + 1);
    };

    const decreaseFontSize = () => {
        handleSetState('fontSize', state.fontSize - 1);
    };

    const [keyword, handleChange] = useMyTextInput('', (newValue) => {
        console.log("L'utilisateur a fini de taper :", newValue);
    });

    return (
        <View>
            <MySearchBar />
            <View style={styles.inputContainer}>
            <TextInput
                style={[styles.input, { fontSize: state.fontSize }]}
                value={keyword}
                onChangeText={handleChange}
            />
            <TouchableOpacity onPress={decreaseFontSize} style={styles.button}>
                <Text>-</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={increaseFontSize} style={styles.button}>
                <Text>+</Text>
            </TouchableOpacity>
            </View>
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        margin: 10,
    },
    input: {
        flex: 1,
        padding: 10,
    },
    button: {
        fontSize: 25,
        padding: 10,
    },
    error: {
        color: 'red',
        paddingTop: 10,
    },
    button: {
        padding: 10,
    },
    // Vous pouvez ajouter d'autres styles ici si nécessaire
});

export default CustomInput;
