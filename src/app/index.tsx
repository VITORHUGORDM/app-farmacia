import { StyleSheet, View } from "react-native";
import { Button } from "./componentes/Button";
import { Header } from "./componentes/Header";
import { Input } from "./componentes/Input";
import { Menu } from "./componentes/Menu";

export default function App() {
  return (
    <View style={styles.container}>
      <Header title="Farmácia IESGO" />
      <h1>Componentes farmacia</h1>
      <p>Button:</p>
      <Button title="Clique aqui" onPress={() => alert("Botão clicado!")} />
      <p>Input:</p>
      <Input placeholder="Digite algo..." />
      <Menu></Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
