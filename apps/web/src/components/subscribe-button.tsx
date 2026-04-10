"use client";

import type { ReactNode } from "react";
import { SubscribeIcon } from "./subscribe-icon";
import { useSubscription } from "./subscription-provider";

type SubscribeButtonProps = {
  children?: ReactNode;
};

export function SubscribeButton({ children }: SubscribeButtonProps) {
  const { isSubscribed, isSubmitting, toggleSubscription } = useSubscription();

  async function handleClick() {
    await toggleSubscription();
  }

  const label = isSubscribed ? "Unsubscribe" : (children ?? "Subscribe");

  return (
    <button
      type="button"
      aria-pressed={isSubscribed}
      disabled={isSubmitting}
      onClick={handleClick}
      className="pill-control inline-flex cursor-pointer items-center justify-center"
    >
      {label}
      <SubscribeIcon />
    </button>
  );
}
