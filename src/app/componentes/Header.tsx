import { Menu } from "lucide-react-native";
import React from "react";
import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../componentes/Colors";
import { HeaderProps } from "../interfaces/Interface";

export function Header(prop: HeaderProps) {
  return (
    <View style={styles.header}>
      {prop.logoImage ? (
        <Image
          source={{ uri: prop.logoImage }}
          style={styles.logoImage}
          resizeMode="contain"
        />
      ) : (
        <Text style={styles.logoText}>{prop.title || "IESGO"}</Text>
      )}
      <TouchableOpacity style={styles.menuButton} onPress={() => null}>
        <Menu size={28} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingTop:
      Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 16 : 16,
    paddingBottom: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  logoImage: {
    width: 120,
    height: 40,
  },
  logoText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  menuButton: {
    padding: 8,
    marginRight: -8,
  },
});
