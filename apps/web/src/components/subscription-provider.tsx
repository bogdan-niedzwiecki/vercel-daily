"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

type SubscriptionContextValue = {
  isSubscribed: boolean;
  isSubmitting: boolean;
  toggleSubscription: () => Promise<void>;
};

const SubscriptionContext = createContext<SubscriptionContextValue | null>(
  null,
);

type SubscriptionProviderProps = {
  initialSubscribed: boolean;
  children: ReactNode;
};

export function SubscriptionProvider({
  initialSubscribed,
  children,
}: SubscriptionProviderProps) {
  const router = useRouter();
  const [isSubscribed, setIsSubscribed] = useState(initialSubscribed);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsSubscribed(initialSubscribed);
  }, [initialSubscribed]);

  const toggleSubscription = useCallback(async () => {
    if (isSubmitting) {
      return;
    }

    const method = isSubscribed ? "DELETE" : "POST";

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/subscription", {
        method,
        credentials: "same-origin",
      });

      if (!response.ok) {
        return;
      }

      setIsSubscribed((value) => !value);
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubscribed, isSubmitting, router]);

  const value = useMemo(
    () => ({
      isSubscribed,
      isSubmitting,
      toggleSubscription,
    }),
    [isSubscribed, isSubmitting, toggleSubscription],
  );

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);

  if (!context) {
    throw new Error("useSubscription must be used within SubscriptionProvider");
  }

  return context;
}
