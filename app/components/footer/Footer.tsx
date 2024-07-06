import React from 'react'
import { Container } from '../Container'
import Link from 'next/link'
import { FooterList } from './FooterList'
import {MdFacebook} from 'react-icons/md'
import {AiFillInstagram, AiFillTwitterCircle, AiFillYoutube} from 'react-icons/ai'

export const Footer = () => {
  return (
    <footer className=' flex flex-row bg-slate-700 text-slate-200 text-sm mt-16'>
      <Container>
        <div className='flex flex-col md:flex-row justify-between pt-16 pb-8'>
          <FooterList>
            <h3 className='text-base font-bold mb-2'>Catégories</h3>
            <Link href="#">SmartPhone</Link>
            <Link href="#">PC Portable</Link>
            <Link href="#">PC</Link>
            <Link href="#">Montres</Link>
            <Link href="#">TV</Link>
            <Link href="#">Accessoires</Link>
          </FooterList>
        
          <FooterList>
            <h3 className='text-base font-bold mb-2'>Service Client</h3>
            <Link href="#">Nous contacter</Link>
            <Link href="#">Expedition</Link>
            <Link href="#">Echanges & Retours</Link>
            <Link href="#">FAQ</Link>
          </FooterList>

          <div className='w-full md:w-1/3 mb-6 md:bb-0'>
          <h3 className='text-base font-bold mb-2'>A propos</h3>
            <p className='mb-2'>Votre destination ultime pour les produits high-tech au meilleur prix. Nous sommes passionnés par la technologie et déterminés à offrir à nos clients les dernières innovations à des prix imbattables. Chez TechBargains, nous croyons que chacun mérite d'avoir accès aux produits technologiques les plus avancés sans se ruiner.
            </p>
            <p>&copy; {new Date().getFullYear() }
             E-Shop. All rights reserved</p>
          </div>
          <FooterList>
          <h3 className='text-base font-bold mb-2'>Suivez nous</h3>
            <div className='flex gap-2'>
            <Link href="#">
              <MdFacebook size={32}/>
            </Link>
            <Link href="#">
              <AiFillTwitterCircle size={32}/>
            </Link>
            <Link href="#">
              <AiFillYoutube size={32}/>
            </Link>
            <Link href="#">
              <AiFillInstagram size={32}/>
            </Link>
            </div>
          </FooterList>
          </div>
          </Container>

    </footer>
  )
}
