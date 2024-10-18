import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import axios from 'axios';

const LoginScreen = () => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [message, setMessage] = useState('');

  const handleLogin = () => {
    setLoading(true);
    setMessage('');
    
    axios.post('http://192.168.56.1/backend/login.php', {
      user: user,
      email: email,
      password: password,
    })
    .then(response => {
      setLoading(false);
      if (response.data.success) {
        setMessage('Login exitoso');
        animateMessage();
      } else {
        setMessage('Error en el login. Verifica tus datos.');
      }
    })
    .catch(error => {
      setLoading(false);
      setMessage('Error en la conexión con el servidor');
      console.error(error);
    });
  };


  const animateMessage = () => {
    Animated.timing(fadeAnim, {
      toValue: 1, 
      duration: 1000, 
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={user}
        onChangeText={setUser}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      )}

      {message ? (
        <Animated.View style={{ ...styles.message, opacity: fadeAnim }}>
          <Text style={styles.messageText}>{message}</Text>
        </Animated.View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f7',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  button: {
    width: '80%',
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#d1f5d3',
    width: '80%',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 16,
    color: '#2e7d32',
  },
});

export default LoginScreen;