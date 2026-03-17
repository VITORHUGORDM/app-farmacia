import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../_components/Colors";
import { InputProps } from "../_interfaces/AppContext";

export default function Input({ label, ...props }: InputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        style={styles.input}
        placeholderTextColor={Colors.white}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    width: 300,
  },

  label: {
    marginBottom: 4,
    fontSize: 14,
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
  },
});
