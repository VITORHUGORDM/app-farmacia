import { Inter_400Regular, Inter_700Bold, useFonts } from '@expo-google-fonts/inter';
import React from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  let [fontsLoaded] = useFonts({ Inter_400Regular, Inter_700Bold });

  if (!fontsLoaded) return null;

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          {/* Logo Superior */}
          <Image 
            source={require('../../assets/images/logo-iesgo.png')}
            style={styles.logoIesgo}
            resizeMode="contain"
          />

          <Text style={styles.titulo}>Farmacia</Text>
          <Text style={styles.subtitulo}>Entre na sua conta</Text>

          <Text style={styles.label}>E-mail</Text>
          <TextInput 
            style={styles.input} 
            placeholder="seu@email.com"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Digite sua senha" 
            secureTextEntry={true}
            placeholderTextColor="#999"
          />

          <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
            <Text style={styles.esqueciSenha}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botao}>
            <Text style={styles.botaoTexto}>Entrar</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Não tem uma conta? <Text style={styles.cadastreSe}>Cadastre-se</Text>
          </Text>
        </View>

        {/* Logo Inferior */}
        <Image 
          source={require('../../assets/images/logo-lads.png')} 
          style={styles.logoLads}
          resizeMode="contain"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFF',
    width: '100%',
    maxWidth: 400,
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  logoIesgo: {
    width: 180,
    height: 60,
    marginBottom: 10,
  },
  titulo: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: '#000',
  },
  subtitulo: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontFamily: 'Inter_400Regular',
    backgroundColor: '#FFF',
  },
  esqueciSenha: {
    color: '#001F54',
    fontFamily: 'Inter_700Bold',
    fontSize: 12,
    marginBottom: 20,
  },
  botao: {
    backgroundColor: '#001F54',
    width: '100%',
    height: 55,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 3,
  },
  botaoTexto: {
    color: '#FFF',
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
  },
  footerText: {
    color: '#999',
    fontSize: 13,
  },
  cadastreSe: {
    color: '#001F54',
    fontFamily: 'Inter_700Bold',
  },
  logoLads: {
    width: 200,
    height: 80,
    marginTop: 30,
  }
});