import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HousePriceAI — House Price Predictor",
  description:
    "Estimate the value of any home in seconds with a machine learning regression model.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white antialiased">{children}</body>
    </html>
  );
}
