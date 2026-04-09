import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type NavPillLinkProps = {
  href: ComponentProps<typeof Link>["href"];
  children: ReactNode;
};

export function NavPillLink({ href, children }: NavPillLinkProps) {
  return (
    <Link href={href} className="pill-control">
      {children}
    </Link>
  );
}
