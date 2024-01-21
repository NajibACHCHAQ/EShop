import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Navbar } from './components/navbar/Navbar'
import { Footer } from './components/footer/Footer'
import CartProvider from '@/providers/CartProvider'
import { Toaster } from 'react-hot-toast'
import { toast } from 'react-hot-toast';




const poppins = Poppins({ subsets: ['latin'],weight:
['100','200','300','400','500','600','700','800','900'] })

export const metadata: Metadata = {
  title: 'E-Shop',
  description: 'By ANCreative',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const notify = () => toast('Voici votre toast.');
  return (
    <html lang="fr">
      <body className={`${poppins.className} text-slate-700`}>
         <Toaster toastOptions={{
          style:{background:'rgb(51 65 85',color:"#fff",}
        }}/> 
        
        <CartProvider>
        <div className='flex flex-col min-h-screen'>
          <Navbar/>
          <main className='flex-grow'>{children}</main>
          <Footer/> 
        </div>
        </CartProvider>
      </body>
    </html>
  )
}
