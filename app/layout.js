import "./globals.css";

export const metadata = {
  title: "Portfolio",
  description: "Immersive portfolio experience",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
