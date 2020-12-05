import React, { useState, useEffect } from 'react';
import styles from './styles';
import api from '../../service/api';
import colors from '../../global.json';
import Select from '../../components/Select';
import { Feather } from '@expo/vector-icons'; 
import Button from '../../components/button';
import FieldText from '../../components/fieldText';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import InputImageLink from '../../components/inputImageLink';

export default function AddLink(){
    const [name,setName] = useState({value:'',error:false,textError:''});
    const [link,setLink] = useState({value:'',error:false,textError:''});
    const [photo, setPhoto] = useState('');
    const [type,setType] = useState('');
    const [typeList,setTypeList] = useState([]);
    //const [links,setLinks] = useState([]);

    async function loadTypes(){
        try{
            const token = await AsyncStorage.getItem('token');
            const response = await api.get('/types',{headers:{Authorization:token}});
            if(response.data){
                setTypeList(response.data.types);
                if(response.data.error){
                    if(response.data.token){
                        Alert.alert('Necessário logar novamente!')
                        navigate('Landing');
                        return null;
                    }
                }
            }
        }catch{
            alert('Erro no servidor');
        }
    }
    
    function setNewType(e){
        if(e !== type){
            setType(e);
        }
    }

    useEffect(()=>{
        loadTypes();
    },[]);

    return(
        <SafeAreaView style={styles.container} edges={['right','left','top']}>
            <ScrollView contentContainerStyle={{alignItems:'center'}}>
                <Text style={styles.text}>Cadastro de Link</Text>
                <InputImageLink setImg={(img)=>setPhoto(img)}/>
                <View style={styles.infos}>
                    <FieldText
                    value={name.value}
                    placeholder="Nome"
                    setText={(text)=>setName({value:text,error:false,textError:''})}
                    error = {name.error}
                    textError={name.textError}
                    />
                    <FieldText
                    value={link.value}
                    placeholder="Link"
                    setText={(text)=>setLink({value:text,error:false,textError:''})}
                    error = {link.error}
                    textError={link.textError}
                    />
                    <View style={{width:'90%'}}>
                        <Select
                        type
                        setValue={(v)=>setNewType(v)}
                        value={type}
                        placeholder="Tipo"
                        valueDefault={null}
                        items={(typeList) || []}/>
                    </View>
                </View>
                <View style={styles.box}>
                    <TextInput
                    style={styles.description}
                    placeholder="Descrição"
                    placeholderTextColor = {colors.cinzaClaro+60}
                    multiline={true}
                    numberOfLines={6}/>
                </View>
                <View style={styles.box}>
                    <View style={styles.tag}>
                        <TextInput 
                        style={styles.tagText} 
                        placeholder="Tags"
                        placeholderTextColor={colors.cinzaClaro+60}/>
                        <RectButton><Feather name="plus-circle" size={30} color="#C2C2C2" /></RectButton>
                    </View>
                    <ScrollView>

                    </ScrollView>
                </View>
                <Button style={{marginVertical: 20}} title="Cadastrar"/>
            </ScrollView>
        </SafeAreaView>
    );
}