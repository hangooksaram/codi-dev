"use client";

import AuthContainer from "@/components/Container/AuthContainer";
import { useEffect } from "react";

export default function AuthTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthContainer>{children}</AuthContainer>;
}
