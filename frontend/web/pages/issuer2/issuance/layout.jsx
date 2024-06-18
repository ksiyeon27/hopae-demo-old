import { Arimo } from 'next/font/google'
import { Rubik } from 'next/font/google'
// import './styles.css'

const arimo = Arimo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-arimo',
})
const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik',
})

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={arimo.variable + ' ' + rubik.variable}>
        {children}
      </body>
    </html>
  )
}