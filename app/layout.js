import "./globals.css";
import { Archivo } from "next/font/google";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata = {
  title: "M Yudha Pamungkas",
  description: "I’m a Front-end Web Developer focused on building modern, responsive, and functional web experiences with React and Next.js. I enjoy turning ideas and designs into clean, intuitive interfaces while continuously improving my skills and exploring better ways to build for the web.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={archivo.variable}>{children}</body>
    </html>
  );
}
