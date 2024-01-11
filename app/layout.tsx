import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Navbar } from './components/navbar/Navbar'
import { Footer } from './components/footer/Footer'

const poppins = Poppins({ subsets: ['latin'],weight:
['100','200','300','400','500','600','700','800','900'] })

export const metadata: Metadata = {
  title: 'E-Shop',
  description: 'By ANCreative',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${poppins.className} text-slate-700`}>
        <div className='flex flex-col min-h-screen'>
          <Navbar/>
          <main className='flex-grow'>{children}</main>
          <Footer/> 
        </div>
      </body>
    </html>
  )
}
