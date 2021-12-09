import React from 'react';
import {AsyncStorage,  Text, View, TextInput, StyleSheet, Button, Alert} from 'react-native';
import useForm from '../hooks/useForm'

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:15
    },
    input:{
        height:40,
        borderColor:'#ccc',
        borderWidth:1,
        alignSelf:'stretch',
        marginBottom:10,
        paddingHorizontal:5
    },
    title:{
        fontSize:24,
        marginBottom:10
    },
    boton:{
        marginBottom: 30,
        
    }
})


export default ({navigation})=>{
   
    const initialState = {
        email:'',
        password:''
    }

    const onSubmit = values =>{
        fetch ('https://serverless-theta-mauve.vercel.app/api/auth/login',{
            method:'POST',
            headers:{
                'Content-Type':'Application/json'
            },
            body:JSON.stringify(values)
        })
        .then(x=>x.text()).then(x=>{
            try{
                return JSON.parse(x)
            }
            catch {
                throw x
            }
        }).then(x=>{
            AsyncStorage.setItem('token', x.token)
            navigation.navigate('Meals')
        })
        .catch(e=>Alert.alert('Error', e))
     }

    const {subscribe, inputs, handleSubmit}= useForm (initialState, onSubmit)  // custom hook

    return (
        <View style = {styles.container}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <TextInput 
            value={inputs.email}
            onChangeText ={subscribe('email')}
            placeholder= 'E-mail'
            style={styles.input}
            autoCapitalize='none'
        />
        <TextInput
            value={inputs.password}
            onChangeText ={subscribe('password')}
            placeholder= 'Contraseña'
            style={styles.input}
            secureTextEntry={true}
            autoCapitalize='none'
        />
        <Button style ={styles.boton} title='Login'  onPress ={handleSubmit}  />
        <Button style ={styles.boton} title='Registrarse'  onPress ={()=>{navigation.navigate('Register')}} />
        </View>

    )
}