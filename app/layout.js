import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/ui/NavBar'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <NavBar />
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}


