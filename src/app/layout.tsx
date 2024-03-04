import "../styles/globals.css";
import { Metadata } from "next";
import { Roboto } from "next/font/google";

export const metadata: Metadata = {
  title: "Indomito Training",
  description: "Bienvenido a Indomito Training ",
  openGraph: {
    title: "Indomito Training",
    description: "Pagina oficial de Indomito Training",
  },
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className}`}>{children}</body>
    </html>
  );
}
