import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import Header from "@/components/header";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Europa$",
//   description: "Your AI-powered money genius",
  
// };
export const metadata = {
  title: "Europas - Finance App",
  description: "Track your finances easily.",
  manifest: "/manifest.json",
  icons: {
    icon: "/192.png",
    apple: "/icon1.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <ClerkProvider >
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
     <Header></Header>
        <main className="min-h-screen">{children}</main>
           <Toaster />
        {/* <footer className="bg-blue-500 text-white p-4 mt-8 py-12 ">
          <div   className="container mx-auto text-center px-4 text-2xl">
            <p>
              Made by Aether 
            </p>
          </div>
        </footer> */}
        <footer className="bg-white border-t border-gray-200 text-gray-700 py-12 mt-12">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-2xl md:text-3xl font-semibold mb-2">
      Made with ❤️ by <span className="text-blue-600 font-bold">Aether</span>
    </h2>
    <p className="text-sm text-gray-500">
      © {new Date().getFullYear()} Aether. All rights reserved.
    </p>

    <div className="mt-6 flex justify-center gap-6">
      <a
        href="https://github.com"
        className="text-gray-500 hover:text-blue-600 transition-colors"
        aria-label="GitHub"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.53-3.88-1.53-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.11-.75.41-1.27.75-1.56-2.56-.3-5.26-1.28-5.26-5.7 0-1.26.45-2.3 1.2-3.11-.12-.3-.52-1.5.11-3.13 0 0 .98-.31 3.2 1.18a11.06 11.06 0 0 1 2.92-.39c.99 0 1.99.13 2.92.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.63.23 2.83.11 3.13.75.81 1.2 1.85 1.2 3.11 0 4.43-2.7 5.4-5.28 5.69.42.36.8 1.08.8 2.18 0 1.58-.01 2.86-.01 3.24 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5z" />
        </svg>
      </a>

      <a
        href="https://twitter.com"
        className="text-gray-500 hover:text-blue-500 transition-colors"
        aria-label="Twitter"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M24 4.56c-.89.39-1.84.66-2.84.78a4.93 4.93 0 0 0 2.16-2.72 9.78 9.78 0 0 1-3.12 1.2A4.92 4.92 0 0 0 16.62 3c-2.72 0-4.92 2.21-4.92 4.93 0 .39.04.77.12 1.14-4.09-.21-7.72-2.16-10.15-5.13a4.9 4.9 0 0 0-.66 2.48c0 1.71.87 3.22 2.2 4.1a4.9 4.9 0 0 1-2.23-.61v.06c0 2.39 1.7 4.38 3.95 4.83a4.93 4.93 0 0 1-2.22.08c.63 1.95 2.44 3.37 4.6 3.41a9.86 9.86 0 0 1-6.1 2.11c-.4 0-.79-.02-1.17-.07a13.93 13.93 0 0 0 7.55 2.21c9.05 0 14.01-7.5 14.01-14v-.64c.96-.7 1.8-1.57 2.46-2.56z" />
        </svg>
      </a>
    </div>
  </div>
</footer>

        
      </body>
    </html>
     </ClerkProvider>
  );
}
