// import { Inter } from "next/font/google";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from 'react-hot-toast'
import { cn } from "@/lib/utils";

// const inter = Inter({ subsets: ["latin"] });
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function MainLayout({ children }) {
  return (
    <html lang="en">
      {/* <body className={inter.className}> */}
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Toaster position="bottom-right" />
        {children}
      </body>
    </html>
  );
}