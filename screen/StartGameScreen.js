import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button, Keyboard, TouchableWithoutFeedback } from 'react-native'
import Card from '../components/Card';
import Color from '../constants/color';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
const StartGameScreen = (props) => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelecetedNumber] = useState();
    const numberInputHandler = (text) => {
        setEnteredValue(text.replace(/[^0-9]/g, ''));
    };
    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };
    const confirmInputHandler = () => {
        const chooseNumber = parseInt(enteredValue);
        if (isNaN(chooseNumber) || chooseNumber <= 0 || chooseNumber > 99) {
            setEnteredValue('');
            return;

        }
        setConfirmed(true);
        setSelecetedNumber(chooseNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    };

    let confirmedOutput;
    if (confirmed) {
        confirmedOutput =
            <Card style={styles.summaryContainer}>
                <Text>Your Selected</Text>
                <NumberContainer>
                    {selectedNumber}
                </NumberContainer>
                <Button title='START GAME' onPress={() => props.onStartGame(selectedNumber)} />
            </Card>;
    }
    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a New Game !</Text>
                <Card style={styles.inputContainer}>
                    <Text>Select a Number</Text>
                    <Input style={styles.input}
                        blurOnSubmit
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType='number-pad'
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />

                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title='Reset' color={Color.accent} onPress={resetInputHandler} />
                        </View>
                        <View style={styles.button}>
                            <Button title='Confirm' color={Color.secondary} onPress={confirmInputHandler} />
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',

    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily:'open-sans-bold'
    },
    button: {
        width: 100
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen
