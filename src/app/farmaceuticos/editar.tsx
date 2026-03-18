import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React, { useEffect, useState } from "react";
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

const validarEmail = (valor: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);

export default function EditarFarmaceuticoScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { farmaceuticos, updateFarmaceutico } = useApp();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [especialidade, setEspecialidade] = useState("");

  useEffect(() => {
    if (id) {
      const farmaceutico = farmaceuticos.find((f) => f.id === id);
      if (farmaceutico) {
        setNome(farmaceutico.nome);
        setEmail(farmaceutico.email || "");
        setTelefone(farmaceutico.telefone);
        setEspecialidade(farmaceutico.especialidade);
      } else {
        Alert.alert("Erro", "Farmacêutico não encontrado");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleAtualizar = () => {
    if (!nome || !especialidade) {
      Alert.alert("Erro", "Preencha pelo menos Nome e Especialidade");
      return;
    }

    if (email && !validarEmail(email)) {
      Alert.alert("Erro", "E-mail inválido. Use o formato exemplo@dominio.com");
      return;
    }

    if (id && typeof id === "string") {
      updateFarmaceutico(id, {
        nome,
        email,
        telefone,
        especialidade,
      });
      router.push("/farmaceuticos");
    }
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
            onPress={() => router.push("/farmaceuticos")}
            style={styles.backButton}
          >
            <ArrowLeft size={24} color={Colors.text} />
          </TouchableOpacity>
          <View>
            <Text style={styles.pageTitle}>Editar farmacêutico</Text>
            <Text style={styles.pageSubtitle}>
              Atualize as informações do farmacêutico
            </Text>
          </View>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.formSectionTitle}>
            Informações do farmacêutico
          </Text>

          <FormInput
            label="Nome completo"
            placeholder="Digite o nome completo"
            value={nome}
            onChangeText={setNome}
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
            label="Especialidade"
            placeholder="Ex: Farmácia Clínica"
            value={especialidade}
            onChangeText={setEspecialidade}
          />

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAtualizar}
            >
              <Text style={styles.submitButtonText}>Atualizar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => router.push("/farmaceuticos")}
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
