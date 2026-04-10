"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import type { ReactNode } from "react";
import { SubscribeIcon } from "./subscribe-icon";

type SubscribeButtonProps = {
  children?: ReactNode;
  initialSubscribed?: boolean;
};

export function SubscribeButton({
  children,
  initialSubscribed = false,
}: SubscribeButtonProps) {
  const router = useRouter();
  const [isSubscribed, setIsSubscribed] = useState(initialSubscribed);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsSubscribed(initialSubscribed);
  }, [initialSubscribed]);

  function handleClick() {
    startTransition(async () => {
      const method = isSubscribed ? "DELETE" : "POST";

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
      } catch {
        return;
      }
    });
  }

  const label = isSubscribed ? "Unsubscribe" : (children ?? "Subscribe");

  return (
    <button
      type="button"
      aria-pressed={isSubscribed}
      disabled={isPending}
      onClick={handleClick}
      className="pill-control inline-flex cursor-pointer items-center justify-center"
    >
      {label}
      <SubscribeIcon />
    </button>
  );
}
