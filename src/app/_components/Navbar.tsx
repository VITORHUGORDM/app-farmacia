import { usePathname, useRouter } from "expo-router";
import {
  ClipboardList,
  Home,
  LogOut,
  Pill,
  Stethoscope,
  Users,
} from "lucide-react-native";
import React from "react";
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Colors } from "./Colors";

interface NavbarProps {
  visible: boolean;
  onClose: () => void;
}

const SCREEN_WIDTH = Dimensions.get("window").width;
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.72;

const menuItems = [
  { label: "Dashboard", icon: Home, route: "/home" },
  { label: "Farmacêuticos", icon: Stethoscope, route: "/farmaceuticos" },
  { label: "Pacientes", icon: Users, route: "/pacientes" },
  { label: "Medicamentos", icon: Pill, route: "/medicamentos" },
  { label: "Tratamentos", icon: ClipboardList, route: "/tratamentos" },
];

export default function Navbar({ visible, onClose }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const slideAnim = React.useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 280,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 280,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -SIDEBAR_WIDTH,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleNavigate = (route: string) => {
    onClose();
    setTimeout(() => {
      router.push(route as any);
    }, 200);
  };

  const handleSair = () => {
    onClose();
    setTimeout(() => {
      router.replace("/login" as any);
    }, 200);
  };

  const isActive = (route: string) => {
    return pathname === route || pathname.startsWith(route + "/");
  };

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      {/* Fundo escuro */}
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />
      </TouchableWithoutFeedback>

      {/* Sidebar */}
      <Animated.View
        style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}
      >
        {/* Header do Sidebar */}
        <View style={styles.sidebarHeader}>
          <Image
            source={require("../../../assets/images/logo-iesgobranca.png")}
            style={styles.logoImage}
          />
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => {
            const active = isActive(item.route);
            const IconComponent = item.icon;
            return (
              <TouchableOpacity
                key={index}
                style={[styles.menuItem, active && styles.menuItemActive]}
                onPress={() => handleNavigate(item.route)}
                activeOpacity={0.7}
              >
                <IconComponent
                  size={20}
                  color={active ? Colors.white : "rgba(255,255,255,0.7)"}
                />
                <Text
                  style={[
                    styles.menuItemText,
                    active && styles.menuItemTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Sair */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleSair}
            activeOpacity={0.9}
          >
            <LogOut size={30} color="#EF4444" />
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
    elevation: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: SIDEBAR_WIDTH,
    backgroundColor: Colors.primary,
    paddingTop:
      Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 16 : 60,
    justifyContent: "space-between",
  },
  sidebarHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  logoImage: {
    width: 140,
    height: 40,
    resizeMode: "contain",
  },
  closeButton: {
    padding: 4,
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 4,
  },
  menuItemActive: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  menuItemText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 15,
    fontWeight: "500",
    marginLeft: 14,
  },
  menuItemTextActive: {
    color: Colors.white,
    fontWeight: "700",
  },
  bottomSection: {
    paddingHorizontal: 12,
    paddingBottom: 40,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  logoutText: {
    color: "#EF4444",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 14,
  },
});
