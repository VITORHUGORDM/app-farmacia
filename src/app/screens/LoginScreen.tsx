import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../componentes/Button";
import { Colors } from "../componentes/Colors";
import { Header } from "../componentes/Header";
import { Input } from "../componentes/Input";

export function LoginScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Header title="IESGO Farmacia" />

        <Text style={styles.subtitle}>Entre na sua conta</Text>

        <Input label="E-mail" placeholder="seu@email.com" />

        <Input label="Senha" placeholder="Digite sua senha" secureTextEntry />

        <Text style={styles.forgot}>Esqueci minha senha</Text>

        <Button title="Entrar" onPress={() => null} />

        <Text style={styles.register}>
          Não tem uma conta? <Text style={styles.link}>Cadastre-se</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c7d2df",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "85%",
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },

  subtitle: {
    textAlign: "center",
    color: Colors.white,
    marginBottom: 20,
  },

  forgot: {
    textAlign: "right",
    color: Colors.primary,
    marginTop: 6,
    marginBottom: 14,
    fontSize: 13,
  },

  register: {
    textAlign: "center",
    marginTop: 16,
  },

  link: {
    color: Colors.primary,
    fontWeight: "bold",
  },
});
