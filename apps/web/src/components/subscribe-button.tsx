import type { ReactElement, ReactNode } from "react";

type SubscribeButtonProps = {
  icon?: ReactElement;
  children?: ReactNode;
};

export function SubscribeButton({
  icon,
  children,
}: SubscribeButtonProps) {
  return (
    <button
      type="button"
      className="pill-control inline-flex cursor-pointer items-center justify-center"
    >
      {children}
      {icon}
    </button>
  );
}
