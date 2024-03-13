import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class MyCheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: this.props.checked };
  }

  componentDidUpdate(prevProps) {
    if (this.props.checked !== prevProps.checked) {
      this.setState({ checked: this.props.checked });
    }
  }

  toggleCheckbox = () => {
    this.setState({ checked: !this.state.checked }, () => {
      this.props.handleChange(this.props.label, this.state.checked);
    });
  };

  render() {
    return (
      <TouchableOpacity style={styles.checkboxContainer} onPress={this.toggleCheckbox}>
        <View style={[styles.checkbox, this.state.checked ? styles.checked : null]}>
          {this.state.checked && (
            <Ionicons name="md-checkmark" size={15} color="white" />
          )}
        </View>
        <Text style={styles.checkboxText}>{this.props.label}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#add8e6',
  },
  checkboxText: {
    fontSize: 18,
  },
});

export default MyCheckBox;
