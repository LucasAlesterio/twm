import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
//import api from '../../services/api';
import styles from './styles';

export default function Search(){

    return(
        <View style={styles.container}>
            <Text style={styles.text} >Search</Text>
        </View>
    );
}