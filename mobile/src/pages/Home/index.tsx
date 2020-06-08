import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, ImageBackground, Image, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton, TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

const Home = () =>{

    const navigation = useNavigation();
    const [uf, setUf] = useState('');
    const [city, setCity] = useState('');

    function handleNavigateToPoints(){
        navigation.navigate('Points', {
            uf,
            city,
        });
    }
    return(
        <KeyboardAvoidingView style={{flex:1}} behavior={ Platform.OS === 'ios' ? 'padding': undefined}>
            <ImageBackground source={require('../../assets/home-background.png')} imageStyle={{width:274, height:368}} style={styles.container}>
                <View style={styles.main} >
                    <Image source={require('../../assets/logo.png')} />
                    <View>
                        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
                        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
                    </View>
                </View>
                <View style={styles.footer}>
                        <TextInput placeholder="Digite a UF" style={styles.input} value={uf} onChangeText={text=>setUf(text)} maxLength={2} autoCapitalize="characters" autoCorrect={false} />
                    <TextInput placeholder="Digite a cidade" style={styles.input} value={city} onChangeText={text=>setCity(text)} autoCorrect={false}  />
                    <RectButton style={styles.button} onPress={handleNavigateToPoints}>
                        <View style={styles.buttonIcon}>
                            <Icon name="arrow-right" size={24} color="#FFF"/>
                        </View>
                            <Text  style={styles.buttonText} >Entrar</Text>
                    </RectButton>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    )
}

export default Home;