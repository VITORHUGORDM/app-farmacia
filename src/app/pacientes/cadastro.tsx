import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../_components/Colors";
import FormInput from "../_components/FormInput";
import Header from "../_components/Header";
import { useApp } from "../_interfaces/AppContext";

const formatarCpf = (valor: string) => {
  const numeros = valor.replace(/\D/g, "").slice(0, 11);
  return numeros
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

const formatarTelefone = (valor: string) => {
  const numeros = valor.replace(/\D/g, "").slice(0, 11);
  if (numeros.length <= 10) {
    return numeros
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }
  return numeros
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
};

const formatarData = (valor: string) => {
  const numeros = valor.replace(/\D/g, "").slice(0, 8);
  return numeros
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2");
};

const validarEmail = (valor: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);

export default function CadastroPacienteScreen() {
  const router = useRouter();
  const { addPaciente } = useApp();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");

  const handleCadastrar = () => {
    if (!nome || !cpf || !dataNascimento) {
      Alert.alert("Erro", "Preencha pelo menos Nome, CPF e Data de Nascimento");
      return;
    }

    if (email && !validarEmail(email)) {
      Alert.alert("Erro", "E-mail inválido. Use o formato exemplo@dominio.com");
      return;
    }

    addPaciente({
      nome,
      cpf,
      dataNascimento,
      email,
      telefone,
      endereco,
    });

    router.push("/pacientes");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pageHeader}>
          <TouchableOpacity
            onPress={() => router.push("/pacientes")}
            style={styles.backButton}
          >
            <ArrowLeft size={24} color={Colors.text} />
          </TouchableOpacity>
          <View>
            <Text style={styles.pageTitle}>Cadastrar pacientes</Text>
            <Text style={styles.pageSubtitle}>
              Preencha os dados do novo paciente
            </Text>
          </View>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.formSectionTitle}>Informações do paciente</Text>

          <FormInput
            label="Nome completo"
            placeholder="Digite o nome completo"
            value={nome}
            onChangeText={setNome}
          />

          <FormInput
            label="CPF"
            placeholder="000.000.000-00"
            keyboardType="numeric"
            value={cpf}
            onChangeText={(v) => setCpf(formatarCpf(v))}
          />

          <FormInput
            label="Data de nascimento"
            placeholder="dd/mm/aaaa"
            keyboardType="numeric"
            value={dataNascimento}
            onChangeText={(v) => setDataNascimento(formatarData(v))}
          />

          <FormInput
            label="E-mail"
            placeholder="email@exemplo.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <FormInput
            label="Telefone"
            placeholder="(11) 98765-4321"
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={(v) => setTelefone(formatarTelefone(v))}
          />

          <FormInput
            label="Endereço completo"
            placeholder="Rua, número, bairro, cidade, estado"
            value={endereco}
            onChangeText={setEndereco}
          />

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleCadastrar}
            >
              <Text style={styles.submitButtonText}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => router.push("/pacientes")}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { padding: 20, paddingBottom: 40 },
  pageHeader: { flexDirection: "row", alignItems: "center", marginBottom: 24 },
  backButton: { marginRight: 16 },
  pageTitle: { fontSize: 20, fontWeight: "bold", color: Colors.text },
  pageSubtitle: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  formCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  formSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 20,
  },
  buttonsContainer: { marginTop: 8, gap: 12 },
  submitButton: {
    backgroundColor: "#0A1833",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: { color: Colors.white, fontSize: 16, fontWeight: "bold" },
  cancelButton: {
    backgroundColor: Colors.white,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cancelButtonText: { color: Colors.text, fontSize: 16, fontWeight: "bold" },
});
