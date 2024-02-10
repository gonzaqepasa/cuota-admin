// 1. import `NextUIProvider` component
"use client";
import { NextUIProvider } from "@nextui-org/react";

function ProviderNextUi({ children }: { children: React.ReactNode }) {
  // 2. Wrap NextUIProvider at the root of your app
  return <NextUIProvider>{children}</NextUIProvider>;
}

export default ProviderNextUi;
