import { Nunito } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";

import "./globals.css";
import ClientOnly from "@/components/ClientOnly";
import RegisterModal from "@/components/modal/RegisterModal";
import ToasterProvider from "@/app/providers/ToasterProvider";

export const metadata = {
  title: "Airbnb Clone",
  description: "This is an Airbnb clone",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <Navbar />
        </ClientOnly>

        {children}
      </body>
    </html>
  );
}
