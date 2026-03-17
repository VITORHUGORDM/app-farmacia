import { Edit2, Trash2 } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "./Colors";

export interface ItemData {
  label: string;
  value: string;
  isStatus?: boolean;
}

interface ItemListaProps {
  data: ItemData[];
  onEdit?: () => void;
  onDelete?: () => void;
  isLast?: boolean;
}

export default function ItemLista({
  data,
  onEdit,
  onDelete,
  isLast = false,
}: ItemListaProps) {
  return (
    <View style={[styles.container, !isLast && styles.bottomBorder]}>
      <View style={styles.contentContainer}>
        {data.map((item, index) => (
          <Text key={index} style={styles.textLine}>
            <Text style={styles.label}>{item.label}: </Text>
            <Text style={[styles.value, item.isStatus && styles.statusText]}>
              {item.value}
            </Text>
          </Text>
        ))}
      </View>

      <View style={styles.actionsContainer}>
        {onEdit && (
          <TouchableOpacity
            style={[styles.actionButton, onDelete && { marginRight: 16 }]}
            onPress={onEdit}
          >
            <Edit2 size={22} color={Colors.text} />
          </TouchableOpacity>
        )}
        {onDelete && (
          <TouchableOpacity style={styles.actionButton} onPress={onDelete}>
            <Trash2 size={22} color={Colors.danger} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    paddingRight: 16,
  },
  textLine: {
    fontSize: 12,
    marginBottom: 4,
    color: Colors.text,
  },
  label: {
    fontWeight: "bold",
  },
  value: {
    fontWeight: "bold",
  },
  statusText: {
    color: "#10B981", // green for Disponível
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    padding: 4,
  },
});
