// src/app/layout.tsx
import { Navbar } from "@/components/ui/navbar-1";
import "./globals.css";
import { Bricolage_Grotesque } from 'next/font/google'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-bricolage'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`h-full ${bricolage.variable}`}
      suppressHydrationWarning
    >
      <body className="h-full antialiased font-sans">
        <div className="flex items-center justify-center"><Navbar/></div>
        {children}
      </body>
    </html>
  );
}







