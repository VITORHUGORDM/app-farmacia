import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface Toast {
  id: string;
  type: "success" | "error";
  message: string;
}

interface NotificationContextType {
  showNotification: (type: "success" | "error", message: string) => void;
  toasts: Toast[];
  hideToast: (id: string) => void;
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showNotification = useCallback(
    (type: "success" | "error", message: string) => {
      const id = Math.random().toString(36).substr(2, 9);
      const toast: Toast = { id, type, message };
      setToasts((prev) => [...prev, toast]);

      // Auto remove after 3s if not dismissed
      setTimeout(() => hideToast(id), 3000);
    },
    [],
  );

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <NotificationContext.Provider
      value={{ showNotification, toasts, hideToast }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default function NotificationContextRoute() {
  return null;
}
