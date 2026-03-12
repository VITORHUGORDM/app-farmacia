import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
// Importação da fonte Inter
import { Inter_400Regular, Inter_700Bold, useFonts } from '@expo-google-fonts/inter';

export default function Cadastro() {
  // Carregamento das fontes
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        <View style={styles.card}>
          {/* Logo IESGO */}
          <Image 
            source={require('../../assets/images/logo-iesgo.png')} 
            style={styles.logoIesgo}
            resizeMode="contain"
          />

          <Text style={styles.titulo}>Farmacia</Text>
          <Text style={styles.subtitulo}>Crie sua conta para começar</Text>

          {/* Campo Nome */}
          <Text style={styles.label}>Nome completo</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Digite seu nome"
            placeholderTextColor="#999"
          />

          {/* Campo E-mail */}
          <Text style={styles.label}>E-mail</Text>
          <TextInput 
            style={styles.input} 
            placeholder="seu@email.com"
            keyboardType="email-address"
            placeholderTextColor="#999"
          />

          {/* Campo Senha */}
          <Text style={styles.label}>Senha</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Crie uma senha" 
            secureTextEntry={true}
            placeholderTextColor="#999"
          />

          {/* Campo Confirmar Senha */}
          <Text style={styles.label}>Confirmar senha</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Confirme sua senha" 
            secureTextEntry={true}
            placeholderTextColor="#999"
          />

          {/* Botão Cadastrar */}
          <TouchableOpacity style={styles.botao}>
            <Text style={styles.botaoTexto}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.footerText}>
              Já tem uma conta? <Text style={styles.fazerLogin}>Fazer login</Text>
            </Text>
          </TouchableOpacity>
        </View>

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
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#FFF',
    width: '100%',
    maxWidth: 400,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    // Efeito de sombra
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  logoIesgo: {
    width: 160,
    height: 50,
    marginBottom: 5,
  },
  titulo: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: '#000',
    marginBottom: 5,
  },
  subtitulo: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 25,
  },
  label: {
    alignSelf: 'flex-start',
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
    color: '#000',
    marginBottom: 8,
    marginTop: 5,
  },
  input: {
    width: '100%',
    height: 52,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontFamily: 'Inter_400Regular',
    backgroundColor: '#F8FAFC',
  },
  botao: {
    backgroundColor: '#001F54',
    width: '100%',
    height: 55,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#001F54',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  botaoTexto: {
    color: '#FFF',
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
  },
  footerText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666',
  },
  fazerLogin: {
    color: '#001F54',
    fontFamily: 'Inter_700Bold',
  }
});