import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Maxi Zoo Cheat Sheet Generator",
  description: "Maak automatisch een printklare Maxi Zoo cheat sheet uit een folder-PDF."
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="nl"><body>{children}</body></html>;
}
