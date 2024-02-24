import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function App() {

  const [city, setCity] = useState('');
  const [weatherData, setweatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {

    const API_KEY = '74eb5112678e4140b8a30131242402'

    try {
      const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=yes&alerts=no`)
      const data = await res.json();
      setweatherData(data);
      setError(null);
    }
    catch (e) {
      console.error(e)
      setError('Error fetching weather data');
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Welcome to WeatherApp ⛅</Text>
        <TextInput
          style={styles.textInput}
          placeholder='Enter your location'
          value={city}
          onChangeText={(text) => {
            setCity(text);
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={fetchWeatherData}>
          <Text style={styles.buttonText}>Get Weather</Text>
        </TouchableOpacity>
      </View>
      {error && (<Text>{error}</Text>)}
      {weatherData && (
        <View style={styles.resultBox}>
          <Text style={styles.weatherTxt}>City 🏙️: {weatherData.location.name}</Text>
          <Text style={styles.weatherTxt}>Temperature 🌡️: {weatherData.current.temp_c}</Text>
          <Text style={styles.weatherTxt}>Description ⛅: {weatherData.current.condition.text}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#94a5bf',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#3F51B5',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#FFFFFF',
    opacity: 0.7,
    borderRadius: 5,
    padding: 20,
    marginBottom: 60,
  },
  title:
  {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3F51B5',
  },
  textInput:
  {
    height: 40,
    width:'100%',
    padding: 5,
    borderWidth: 1,
    borderColor: '#3F51B5',
    borderRadius: 5,
    marginBottom: 20,
  },
  button:
  {
    backgroundColor: '#3F51B5',
    width: '100%',
    height: 50,
    borderRadius: 5,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  weatherTxt:
  {
    fontSize: 16,
    color: '#3F51B5',
  },
  resultBox: {
    borderWidth: 1,
    borderColor: '#3F51B5',
    padding: 20,
    borderRadius: 5,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    opacity: 0.7,
    marginBottom: 350,
  },
});