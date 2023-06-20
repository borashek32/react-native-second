import {Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native"
import {useEffect, useState} from "react"
import {auth} from "../firebase"
import {NavigationProp} from "@react-navigation/native"


// nat@inbox.ru
// 123123123

type LoginScreenProps = {
  navigation: NavigationProp<any, 'Login'>;
}

export const LoginScreen = ({navigation}: LoginScreenProps) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user
        console.log('Registered successfully');
      })
      .catch(error => Alert.alert('Error', error.message));
  }

  const handleLogIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user
        Alert.alert('Logged in successfully');
        navigation.navigate('Home')
      })
      .catch(error => Alert.alert('Error', error.message));
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('Home')
      }
    })

    return unsubscribe
  }, [])

  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      style={styles.container}
    >
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder={'Email'}
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />

        <TextInput
          placeholder={'Password'}
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonsWrapper}>
        <TouchableOpacity
          onPress={handleLogIn}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutlined]}
        >
          <Text style={[styles.buttonText, styles.buttonTextOutlined]}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  },
  input: {
    padding: 5,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'solid',
    width: 350,
    height: 40,
  },
  buttonsWrapper: {
    display: "flex",
    flexDirection: 'column',
    gap: 10
  },
  button: {
    backgroundColor: '#0D6EFD',
    borderRadius: 20,
    width: 250,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonOutlined: {
    backgroundColor: '#fff',
    color: '#0D6EFD',
    borderWidth: 1,
    borderColor: '#0D6EFD'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  },
  buttonTextOutlined: {
    color: '#0D6EFD'
  }
})