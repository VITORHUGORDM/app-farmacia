import { AlertCircle, CheckCircle, X } from "lucide-react-native";
import React from "react";
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useNotification } from "../_components/NotificationContext";
import { Colors } from "./Colors";

const { height: screenHeight } = Dimensions.get("window");
const TOAST_HEIGHT = 80;

interface ToastProps {
  message: string;
  type: "success" | "error";
  onHide: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onHide }) => {
  const translateY = useSharedValue(-TOAST_HEIGHT);

  const show = () => {
    "worklet";
    translateY.value = withTiming(0, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });
  };

  const hide = () => {
    "worklet";
    translateY.value = withTiming(
      -TOAST_HEIGHT,
      {
        duration: 300,
        easing: Easing.in(Easing.ease),
      },
      () => {
        runOnJS(onHide)();
      },
    );
  };

  React.useEffect(() => {
    show();
    const timer = setTimeout(() => hide(), 3000);
    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const Icon = type === "success" ? CheckCircle : AlertCircle;

  return (
    <Animated.View
      style={[
        styles.toast,
        animatedStyle,
        type === "success" ? styles.success : styles.error,
      ]}
    >
      <View style={styles.icon}>
        <Icon size={24} color={Colors.white} />
      </View>
      <View style={styles.content}>
        <Text style={styles.message}>{message}</Text>
      </View>
      <TouchableOpacity onPress={hide} style={styles.closeButton}>
        <X size={20} color={Colors.white} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const ToastContainer: React.FC = () => {
  const { toasts, hideToast } = useNotification();

  return (
    <View style={styles.container}>
      {toasts.map((toast, index) => (
        <View
          key={toast.id}
          style={{ zIndex: 1000 - index, width: "100%", alignItems: "center" }}
        >
          <Toast {...toast} onHide={() => hideToast(toast.id)} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: StatusBar.currentHeight || 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    alignItems: "center",
    paddingTop: 20,
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    maxWidth: "90%",
  },
  success: {
    backgroundColor: Colors.success,
  },
  error: {
    backgroundColor: Colors.danger || "#ef4444",
  },
  icon: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  message: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  closeButton: {
    padding: 4,
  },
});

export default ToastContainer;
