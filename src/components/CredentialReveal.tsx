import type { ReactNode } from "react";
import { AnimatedContent } from "./AnimatedContent";
import "./CredentialGallery.css";

export function CredentialReveal({ children, index }: { children: ReactNode; index: number }) {
  return <AnimatedContent className="credential-reveal" distance={28} delay={index % 2 * 0.06}>{children}</AnimatedContent>;
}
