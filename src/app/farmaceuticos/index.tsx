import { useRouter } from "expo-router";
import { Plus, Search } from "lucide-react-native";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../_components/Colors";
import Header from "../_components/Header";
import ItemLista from "../_components/ItemLista";
import ModalExclusao from "../_components/ModalExclusao";
import { useApp } from "../_interfaces/AppContext";

export default function FarmaceuticosScreen() {
  const { farmaceuticos, deleteFarmaceutico } = useApp();
  const [busca, setBusca] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const router = useRouter();

  const handleEditClick = (id: string) => {
    router.push({ pathname: "/farmaceuticos/editar", params: { id } });
  };

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setModalVisible(true);
  };

  const confirmarExclusao = () => {
    if (itemToDelete) {
      deleteFarmaceutico(itemToDelete);
    }
    setModalVisible(false);
    setItemToDelete(null);
  };

  const filteredFarmaceuticos = farmaceuticos.filter(
    (f) =>
      f.nome.toLowerCase().includes(busca.toLowerCase()) ||
      f.especialidade.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.content}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Farmacêuticos</Text>
          <Text style={styles.pageSubtitle}>
            Gerencie os farmacêuticos cadastrados
          </Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/farmaceuticos/cadastro")}
        >
          <Plus size={20} color={Colors.white} />
          <Text style={styles.addButtonText}>Cadastrar farmacêutico</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Lista de farmacêuticos</Text>

          <View style={styles.searchContainer}>
            <Search
              size={20}
              color={Colors.textSecondary}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquisar farmacêuticos"
              placeholderTextColor={Colors.textSecondary}
              value={busca}
              onChangeText={setBusca}
            />
          </View>

          <FlatList
            data={filteredFarmaceuticos}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={
              <Text
                style={{
                  textAlign: "center",
                  color: Colors.textSecondary,
                  marginTop: 20,
                }}
              >
                Nenhum farmacêutico encontrado.
              </Text>
            }
            renderItem={({ item, index }) => (
              <ItemLista
                data={[
                  { label: "Nome", value: item.nome },
                  { label: "E-mail", value: item.email || "" },
                  { label: "Telefone", value: item.telefone },
                  { label: "Especialidade", value: item.especialidade },
                ]}
                isLast={index === filteredFarmaceuticos.length - 1}
                onEdit={() => handleEditClick(item.id)}
                onDelete={() => handleDeleteClick(item.id)}
              />
            )}
          />
        </View>

        <ModalExclusao
          visible={modalVisible}
          tipo="farmacêutico"
          onCancel={() => setModalVisible(false)}
          onConfirm={confirmarExclusao}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { flex: 1, padding: 20 },
  pageHeader: { marginBottom: 24 },
  pageTitle: { fontSize: 24, fontWeight: "bold", color: Colors.text },
  pageSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
    fontWeight: "500",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#002470ff",
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 24,
  },
  addButtonText: { color: Colors.white, fontWeight: "bold", marginLeft: 8 },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 16,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: "100%", fontSize: 14, color: Colors.text },
  listContainer: { paddingBottom: 20 },
});
