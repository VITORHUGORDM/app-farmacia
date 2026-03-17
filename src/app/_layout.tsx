import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import Navbar from "./_components/Navbar";
import NavbarProvider, { useNavbar } from "./_components/NavbarContext";
import ToastContainer from "./_components/Notification";
import { AppProvider } from "./_interfaces/AppContext";

import { NotificationProvider } from "./_components/NotificationContext";

function AppContent() {
  const { isOpen, close } = useNavbar();

  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }} />
      <Navbar visible={isOpen} onClose={close} />
      <ToastContainer />
    </View>
  );
}

export default function RootLayout() {
  return (
    <NotificationProvider>
      <AppProvider>
        <NavbarProvider>
          <AppContent />
        </NavbarProvider>
      </AppProvider>
    </NotificationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
