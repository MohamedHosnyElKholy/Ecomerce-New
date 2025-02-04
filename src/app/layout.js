import localFont from "next/font/local";
import "./globals.css";
import Nav from "./_components/Nav/Nav.jsx";
import ReduxProvider from "./feature/ReduxProvider";
import Footer from "./_components/Footer/Footer";
import { Toaster } from "react-hot-toast";

// تحميل الخطوط المحلية
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>{/* يمكنك إضافة meta tags هنا إذا لزم الأمر */}</head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-r from-gray-900 to-black min-h-screen text-white flex flex-col justify-between`}
      >
        <ReduxProvider>
          <Nav />
          <main className="flex-grow">{children}</main>{" "}
          {/* إضافة flex-grow لتوسيع main */}
          <Footer />
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
