import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../componentes/Colors";
import { MenuProps } from "../interfaces/Interface";

export function Menu({
  onDashboardPress,
  onFarmaceuticosPress,
  onPacientesPress,
  onMedicamentosPress,
  onTratamentosPress,
}: MenuProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item} onPress={onDashboardPress}>
        <Text style={styles.text}>Dashboard</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={onFarmaceuticosPress}>
        <Text style={styles.text}>Farmaceuticos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={onPacientesPress}>
        <Text style={styles.text}>Pacientes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={onMedicamentosPress}>
        <Text style={styles.text}>Medicamentos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={onTratamentosPress}>
        <Text style={styles.text}>Tratamentos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    padding: 16,
    width: 250,
    height: "100%",
  },

  item: {
    paddingVertical: 10,
  },

  text: {
    color: Colors.white,
    fontSize: 16,
  },
});
