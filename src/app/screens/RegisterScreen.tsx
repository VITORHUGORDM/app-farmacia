import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../componentes/Button";
import { Colors } from "../componentes/Colors";
import { Header } from "../componentes/Header";
import { Input } from "../componentes/Input";

export function RegisterScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Header title="IESGO Farmacia" />

        <Text style={styles.subtitle}>Crie sua conta para começar</Text>

        <Input label="Nome completo" placeholder="Digite seu nome" />

        <Input label="E-mail" placeholder="seu@email.com" />

        <Input label="Senha" placeholder="Crie uma senha" secureTextEntry />

        <Input
          label="Confirmar senha"
          placeholder="Confirme sua senha"
          secureTextEntry
        />

        <Button title="Cadastrar" onPress={() => null} />

        <Text style={styles.login}>
          Já tem uma conta? <Text style={styles.link}>Fazer login</Text>
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
    color: Colors.text,
    marginBottom: 20,
  },

  login: {
    textAlign: "center",
    marginTop: 16,
  },

  link: {
    color: Colors.primary,
    fontWeight: "bold",
  },
});
