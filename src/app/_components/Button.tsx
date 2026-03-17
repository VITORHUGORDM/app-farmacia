import React from "react";
import { ButtonProps, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "../_components/Colors";

export default function Button(prop: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={prop.onPress}>
      <Text style={styles.text}>{prop.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    marginVertical: 12,
    height: 40,
    width: 300,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "bold",
  },
});
