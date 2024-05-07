import React from 'react'
import './globals.scss'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

/* Our app sits here to not cause any conflicts with payload's root layout  */
const Layout: React.FC<{ children: React.ReactNode }> = ({ children: children }) => {
  const children2 = children as any
  return (
    <html className={inter.className}>
      <body>{children2}</body>
    </html>
  )
}

export default Layout
