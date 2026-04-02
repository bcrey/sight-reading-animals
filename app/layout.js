import "./globals.css";

export const metadata = {
  title: "Word Reader — Sight Words Game",
  description: "A fun sight words reading game for kids with animal rewards!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
