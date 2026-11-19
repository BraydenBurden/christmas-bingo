import "./globals.css";

export const metadata = {
  title: "Christmas Movie Trope Bingo",
  description:
    "The ultimate Christmas movie bingo game. Spot the clichés, mark your squares, and get bingo!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
