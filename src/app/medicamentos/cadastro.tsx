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

export default function CadastroMedicamentoScreen() {
  const router = useRouter();
  const { addMedicamento } = useApp();

  const [nome, setNome] = useState("");
  const [dosagem, setDosagem] = useState("");
  const [tipo, setTipo] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleCadastrar = () => {
    if (!nome || !quantidade) {
      Alert.alert("Erro", "Preencha pelo menos Nome, Fabricante e Quantidade");
      return;
    }

    addMedicamento({
      nome,
      dosagem,
      tipo,
      quantidade,
      descricao,
    });

    router.push("/medicamentos");
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
            onPress={() => router.push("/medicamentos")}
            style={styles.backButton}
          >
            <ArrowLeft size={24} color={Colors.text} />
          </TouchableOpacity>
          <View>
            <Text style={styles.pageTitle}>Cadastrar medicamento</Text>
            <Text style={styles.pageSubtitle}>
              Preencha os dados do novo medicamento
            </Text>
          </View>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.formSectionTitle}>
            Informações do medicamento
          </Text>

          <FormInput
            label="Nome do medicamento"
            placeholder="Ex: Paracetamol 500mg"
            value={nome}
            onChangeText={setNome}
          />

          <FormInput
            label="Dosagem"
            placeholder="Ex: 500mg"
            value={dosagem}
            onChangeText={setDosagem}
          />

          <FormInput
            label="Tipo"
            placeholder="Selecione o tipo"
            value={tipo}
            onChangeText={setTipo}
          />

          <FormInput
            label="Quantidade em estoque"
            placeholder="0"
            keyboardType="numeric"
            value={quantidade}
            onChangeText={setQuantidade}
          />

          <FormInput
            label="Descrição"
            placeholder="Descreva o medicamento e suas indicações"
            multiline
            style={{ height: 80, textAlignVertical: "top", paddingTop: 12 }}
            value={descricao}
            onChangeText={setDescricao}
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
              onPress={() => router.push("/medicamentos")}
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
