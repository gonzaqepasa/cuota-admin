import type { AppProps } from "next/app";
import React from "react";

export default function Layout({ children }: any) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
