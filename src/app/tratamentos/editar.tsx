import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, ChevronDown } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
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

const formatarData = (valor: string) => {
  const numeros = valor.replace(/\D/g, "").slice(0, 8);
  return numeros
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2");
};

function SelectField({
  label,
  placeholder,
  value,
  options,
  onSelect,
  required,
}: {
  label: string;
  placeholder: string;
  value: string;
  options: { label: string; value: string }[];
  onSelect: (val: string) => void;
  required?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <View style={selectStyles.wrapper}>
      <Text style={selectStyles.label}>
        {label}
        {required ? " *" : ""}
      </Text>
      <TouchableOpacity
        style={selectStyles.trigger}
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
      >
        <Text
          style={[selectStyles.triggerText, !value && selectStyles.placeholder]}
        >
          {value || placeholder}
        </Text>
        <ChevronDown size={18} color={Colors.textSecondary} />
      </TouchableOpacity>
      <Modal visible={visible} transparent animationType="fade">
        <Pressable
          style={selectStyles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={selectStyles.modal}>
            <Text style={selectStyles.modalTitle}>{label}</Text>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    selectStyles.option,
                    item.value === value && selectStyles.optionSelected,
                  ]}
                  onPress={() => {
                    onSelect(item.value);
                    setVisible(false);
                  }}
                >
                  <Text
                    style={[
                      selectStyles.optionText,
                      item.value === value && selectStyles.optionTextSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={selectStyles.emptyText}>
                  Nenhum item cadastrado
                </Text>
              }
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

export default function EditarTratamentoScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const {
    tratamentos,
    updateTratamento,
    pacientes,
    medicamentos,
    farmaceuticos,
  } = useApp();

  const [paciente, setPaciente] = useState("");
  const [medicamento, setMedicamento] = useState("");
  const [farmaceutico, setFarmaceutico] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataTermino, setDataTermino] = useState("");
  const [posologia, setPosologia] = useState("");
  const [observacoes, setObservacoes] = useState("");

  useEffect(() => {
    if (id) {
      const tratamento = tratamentos.find((t) => t.id === id);
      if (tratamento) {
        setPaciente(tratamento.paciente);
        setMedicamento(tratamento.medicamento);
        setFarmaceutico(tratamento.farmaceutico || "");
        setDataInicio(tratamento.dataInicio || "");
        setDataTermino(tratamento.dataTermino || "");
        setPosologia(tratamento.posologia);
        setObservacoes(tratamento.observacoes || "");
      } else {
        Alert.alert("Erro", "Tratamento não encontrado");
        router.back();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleAtualizar = () => {
    if (!paciente || !medicamento || !dataInicio) {
      Alert.alert(
        "Erro",
        "Preencha pelo menos Paciente, Medicamento e Data de Início",
      );
      return;
    }

    // Format the display period from dataInicio and dataTermino
    const periodo = dataTermino
      ? `${dataInicio} - ${dataTermino}`
      : `A partir de ${dataInicio}`;

    if (id && typeof id === "string") {
      updateTratamento(id, {
        paciente,
        medicamento,
        farmaceutico,
        dataInicio,
        dataTermino,
        posologia,
        periodo, // Keep updated periodo
        observacoes,
      });
      router.push("/tratamentos");
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
            onPress={() => router.push("/tratamentos")}
            style={styles.backButton}
          >
            <ArrowLeft size={24} color={Colors.text} />
          </TouchableOpacity>
          <View>
            <Text style={styles.pageTitle}>Editar tratamento</Text>
            <Text style={styles.pageSubtitle}>
              Preencha os dados do novo tratamento
            </Text>
          </View>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.formSectionTitle}>Informações do tratamento</Text>

          <SelectField
            label="Paciente"
            placeholder="Selecione o paciente"
            value={paciente}
            options={pacientes.map((p) => ({ label: p.nome, value: p.nome }))}
            onSelect={setPaciente}
            required
          />

          <SelectField
            label="Medicamento"
            placeholder="Selecione o medicamento"
            value={medicamento}
            options={medicamentos.map((m) => ({
              label: m.nome,
              value: m.nome,
            }))}
            onSelect={setMedicamento}
            required
          />

          <SelectField
            label="Farmacêutico responsável"
            placeholder="Selecione o farmacêutico"
            value={farmaceutico}
            options={farmaceuticos.map((f) => ({
              label: f.nome,
              value: f.nome,
            }))}
            onSelect={setFarmaceutico}
          />

          <FormInput
            label="Data de início"
            placeholder="dd/mm/aaaa"
            keyboardType="numeric"
            value={dataInicio}
            onChangeText={(v) => setDataInicio(formatarData(v))}
          />

          <FormInput
            label="Data de término"
            placeholder="dd/mm/aaaa"
            keyboardType="numeric"
            value={dataTermino}
            onChangeText={(v) => setDataTermino(formatarData(v))}
          />

          <FormInput
            label="Instruções de posologia"
            placeholder="Ex: 1 comprimido a cada 8 horas"
            value={posologia}
            onChangeText={setPosologia}
          />

          <FormInput
            label="Observações"
            placeholder="Informações adicionais sobre o tratamento"
            multiline
            style={{ height: 80, textAlignVertical: "top", paddingTop: 12 }}
            value={observacoes}
            onChangeText={setObservacoes}
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
              onPress={() => router.push("/tratamentos")}
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

const selectStyles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 6,
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: Colors.white,
  },
  triggerText: { fontSize: 14, color: Colors.text, flex: 1 },
  placeholder: { color: Colors.textSecondary },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 24,
  },
  modal: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    maxHeight: 360,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 12,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  optionSelected: { backgroundColor: Colors.primary + "18" },
  optionText: { fontSize: 14, color: Colors.text },
  optionTextSelected: { color: Colors.primary, fontWeight: "600" },
  emptyText: { textAlign: "center", color: Colors.textSecondary, padding: 16 },
});
