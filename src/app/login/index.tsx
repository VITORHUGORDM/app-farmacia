import { useRouter } from "expo-router";
import { Lock, Mail } from "lucide-react-native";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../_components/Colors";
import { useNotification } from "../_components/NotificationContext";

export default function LoginScreen() {
  const router = useRouter();
  const { showNotification } = useNotification();

  const handleEntrar = () => {
    showNotification("success", "Usuario logado com sucesso");
    // Navega para o dashboard dentro do grupo do drawer
    router.replace("/home" as any);
  };
  const handleForgotPassword = () => {
    router.replace("/recuperar-senha" as any);
  };
  const handleRegister = () => {
    router.replace("/cadastro" as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.formContainer}>
          <View style={styles.logoContainer}>
            {/* Logo IESGO */}
            <Image
              source={require("../../../assets/images/logo-iesgo.png")}
              style={styles.logoIesgo}
              resizeMode="contain"
            />
            <Text style={styles.subtitle}>FARMÁCIA</Text>
          </View>
          <Text style={styles.welcomeText}>Bem-vindo!</Text>
          <Text style={styles.instructionText}>
            Faça login para acessar o painel
          </Text>

          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <Mail
                size={20}
                color={Colors.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor={Colors.textSecondary}
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <Lock
                size={20}
                color={Colors.textSecondary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor={Colors.textSecondary}
                secureTextEntry
              />
            </View>
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text
              style={styles.forgotPasswordText}
              onPress={handleForgotPassword}
            >
              Esqueci minha senha
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleEntrar}>
            <Text style={styles.loginButtonText}>ENTRAR</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Não tem uma conta? </Text>
            <Text style={styles.registerLink} onPress={handleRegister}>
              Cadastre-se
            </Text>
          </View>
        </View>
        <View style={styles.logoContainer}>
          {/* Logo LADS */}
          <Image
            source={require("../../../assets/images/logo-lads.png")}
            style={styles.logoLads}
            resizeMode="contain"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  logoText: {
    fontSize: 42,
    fontWeight: "bold",
    color: Colors.primary,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.textSecondary,
    fontWeight: "600",
    marginTop: 0,
  },
  formContainer: {
    backgroundColor: Colors.white,
    padding: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: Colors.text,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  registerText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  registerLink: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "bold",
  },
  logoIesgo: {
    width: 200,
    height: 80,
    marginBottom: 0,
    marginTop: 0,
  },
  logoLads: {
    width: 160,
    height: 60,
    marginBottom: 10,
    marginTop: 20,
  },
});
