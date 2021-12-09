import React from 'react';
import {Alert, Text, View, TextInput, StyleSheet, Button} from 'react-native';
import useForm from '../hooks/useForm';

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
    const initialState ={
        email:'',
        password:''
    }

    const onSubmit = (values)=>{
        fetch ('https://serverless-theta-mauve.vercel.app/api/auth/register',{
            method:'POST',
            headers:{
                'Content-Type':'Application/json'
            },
            body:JSON.stringify(values)
        })
        .then(x=>x.text())
        .then(x=>{
            if (x==='Usuario creado con éxito'){
                return Alert.alert('Éxito',x,
                [{text:'ir al inicio', onPress:()=>navigation.navigate('Login')}])
            }
            Alert.alert(
                'Error',
                x
            )
        })
    }

    const {subscribe, handleSubmit, inputs} = useForm(initialState, onSubmit)
    console.log(inputs)
    return (
        <View style = {styles.container}>
        <Text style={styles.title}>Registro de usuario</Text>
        <TextInput
            value = {inputs.email}
            onChangeText={subscribe('email')}
            placeholder= 'E-mail'
            style={styles.input}
            autoCapitalize = 'none'
         />
        <TextInput
            value={inputs.password}
            onChangeText={subscribe('password')}
            placeholder= 'Contraseña'
            style={styles.input}
            secureTextEntry ={true}
            autoCapitalize = 'none'
         />
        <Button   style ={styles.boton} title='Enviar'  onPress ={handleSubmit} />
        <Button  style ={styles.boton} title='Volver a inicio'  onPress ={()=>{navigation.navigate('Login')}} />
        </View>

    )
}