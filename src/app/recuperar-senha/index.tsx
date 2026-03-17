import { router } from "expo-router";
import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EsqueciSenha() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          {/* Logo IESGO */}
          <Image
            source={require("../../../assets/images/logo-iesgo.png")}
            style={styles.logoIesgo}
            resizeMode="contain"
          />

          <Text
            style={styles.titulo}
            onPress={() => router.push("/login" as any)}
          >
            Esqueci minha senha
          </Text>
          <Text style={styles.subtitulo}>
            Digite seu e-mail para receber um link de redefinição
          </Text>

          {/* Campo E-mail */}
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="seu@email.com"
            keyboardType="email-address"
            placeholderTextColor="#999"
            autoCapitalize="none"
          />

          {/* Botão Enviar */}
          <TouchableOpacity style={styles.botao}>
            <Text style={styles.botaoTexto}>Enviar link de redefinição</Text>
          </TouchableOpacity>

          {/* Botão Voltar */}
          <TouchableOpacity style={styles.botaoVoltar}>
            <Text
              style={styles.voltarTexto}
              onPress={() => router.push("/login" as any)}
            >
              Voltar para o login
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
    backgroundColor: "#F0F4F8",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#FFF",
    width: "100%",
    maxWidth: 400,
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  logoIesgo: {
    width: 160,
    height: 60,
    marginBottom: 10,
  },
  titulo: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    color: "#000",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitulo: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  label: {
    alignSelf: "flex-start",
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: "#000",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    height: 52,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 30,
    fontFamily: "Inter_400Regular",
    backgroundColor: "#F8FAFC",
  },
  botao: {
    backgroundColor: "#001F54",
    width: "100%",
    height: 55,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    elevation: 3,
  },
  botaoTexto: {
    color: "#FFF",
    fontFamily: "Inter_700Bold",
    fontSize: 15,
  },
  botaoVoltar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  voltarTexto: {
    color: "#001F54",
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    marginLeft: 8,
  },
});
