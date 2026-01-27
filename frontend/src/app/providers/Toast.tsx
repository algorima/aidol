"use client";

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";

export interface ToastMessage {
  id: string;
  type:
    | "info"
    | "success"
    | "error"
    | "warning"
    | "primary"
    | "secondary"
    | "accent"
    | "neutral";
  message: string;
  duration?: number;
}

export interface ToastContextType {
  showToast: (
    message: string,
    type?: ToastMessage["type"],
    duration?: number,
  ) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps): JSX.Element {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const timerRefs = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  const hideToast = useCallback((id: string) => {
    const timer = timerRefs.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timerRefs.current.delete(id);
    }

    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (
      message: string,
      type: ToastMessage["type"] = "info",
      duration: number = 4000,
    ) => {
      const id = `toast_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      const newToast: ToastMessage = { id, message, type, duration };

      setToasts((prev) => [newToast, ...prev]);

      if (duration > 0) {
        const timer = setTimeout(() => {
          hideToast(id);
        }, duration);

        timerRefs.current.set(id, timer);
      }
    },
    [hideToast],
  );

  useEffect(() => {
    const currentTimerRefs = timerRefs.current;
    return () => {
      currentTimerRefs.forEach((timer) => {
        clearTimeout(timer);
      });
      currentTimerRefs.clear();
    };
  }, []);

  const value = useMemo(
    () => ({ showToast, hideToast }),
    [showToast, hideToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onHide={hideToast} />
    </ToastContext.Provider>
  );
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onHide: (id: string) => void;
}

function ToastContainer({ toasts, onHide }: ToastContainerProps): JSX.Element {
  return (
    <div className="toast toast-end toast-top">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onHide={onHide} />
        ))}
      </AnimatePresence>
    </div>
  );
}

export interface ToastItemProps {
  toast: ToastMessage;
  onHide: (id: string) => void;
}

export function ToastItem({ toast, onHide }: ToastItemProps): JSX.Element {
  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return (
          <CheckCircleIcon
            className="size-6 shrink-0"
            role="img"
            aria-label="Success"
          />
        );
      case "error":
        return (
          <ExclamationCircleIcon
            className="size-6 shrink-0"
            role="img"
            aria-label="Error"
          />
        );
      case "warning":
        return (
          <ExclamationTriangleIcon
            className="size-6 shrink-0"
            role="img"
            aria-label="Warning"
          />
        );
      case "primary":
      case "secondary":
      case "accent":
      case "neutral":
        return (
          <InformationCircleIcon
            className="size-6 shrink-0"
            role="img"
            aria-label={toast.type}
          />
        );
      case "info":
      default:
        return (
          <InformationCircleIcon
            className="size-6 shrink-0"
            role="img"
            aria-label="Info"
          />
        );
    }
  };

  const getAlertClass = () => {
    switch (toast.type) {
      case "success":
        return "alert-success";
      case "error":
        return "alert-error";
      case "warning":
        return "alert-warning";
      case "primary":
        return "bg-primary text-primary-content";
      case "secondary":
        return "bg-secondary text-secondary-content";
      case "accent":
        return "bg-accent text-accent-content";
      case "neutral":
        return "bg-neutral text-neutral-content";
      case "info":
      default:
        return "alert-info";
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 300, scale: 0.3 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.5, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={clsx("alert max-w-100 min-w-75 shadow-lg", getAlertClass())}
      role="alert"
    >
      {getIcon()}
      <span className="flex-1">{toast.message}</span>
      <button
        onClick={() => onHide(toast.id)}
        className="btn btn-circle btn-ghost btn-sm"
        aria-label="Close toast"
      >
        <XMarkIcon className="size-4" />
      </button>
    </motion.div>
  );
}
