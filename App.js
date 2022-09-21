import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput, Image } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useEffect, useState } from 'react';

export default function App() {
  
  const[amount, setAmount]=useState('');
  const [selectedCurrency, setSelectedCurrency] = useState();
  const [result, setResult] = useState('');
  const[data, setData] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  const saveData = (data) =>{
    setCurrencies(Object.keys(data.rates))
    setData(data.rates);
  }

  useEffect(() => {
    fetch("https://api.apilayer.com/exchangerates_data/latest?", {
    headers: {'apikey':'b7nJMGXaCtNBwkYbTjID2Yv7o2AFDDsR'}
    })
    .then(response=> response.json())
    .then(data => saveData(data))
    .catch(error =>{
      Alert.alert('Error occurred', error);
    });
    
}, [])
 
  const convert = () =>{
    let keys =Object.keys(data);
    let values = Object.values(data);

    for (let i = 0; i < keys.length; i++) {
      if(selectedCurrency===keys[i]){
        setResult((parseFloat(amount) * parseFloat(values[i])).toFixed(2) + ' e')
      };
      
    }
  }
  
  return (
    <View style={styles.container}>

    <View>
    <Image source={require('./euro.jpg')} style={{margin:'auto', width: 150, height: 150}}/>
      <Text style={{fontWeight:'bold', fontSize:22, marginLeft:'auto', marginRight:'auto', marginBottom:30}}>{result}</Text>
    </View>

    <View>
      <TextInput style={styles.input} keyboardType='number-pad' onChangeText={amount =>setAmount(amount)} value={amount}/>
      <Picker
        selectedValue={selectedCurrency}
        style={{width:100, height:50, borderBottomWidth:1, borderColor:'black', borderStyle:'solid'}}
        onValueChange={(itemValue, itemIndex) =>
        setSelectedCurrency(itemValue)
      }>
        {currencies.map(item=>
             <Picker.Item key={item.toString()} label={item} value={item} />)}
        
      </Picker>
      </View>

      <Button onPress={convert} title='CONVERT'/>

      


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    width:100,
    marginBottom:20,
    borderColor:'gray',
    borderWidth:1
  }
});
