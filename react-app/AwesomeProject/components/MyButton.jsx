import React from 'react';
import { Alert, TouchableOpacity, Text } from 'react-native';

const MyButton = ({ label, person }) => {
    return (
        <TouchableOpacity onPress={() => Alert.alert('Bonsoir', person.name)}>
            <Text>{label}</Text>
        </TouchableOpacity>
    );
};


/*class MyButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { label, person } = this.props;

        return (
            <TouchableOpacity onPress={() => Alert.alert('Bonsoir', person.name)}>
                <Text>{label}</Text>
            </TouchableOpacity>
        );
    }
}*/
export default MyButton;