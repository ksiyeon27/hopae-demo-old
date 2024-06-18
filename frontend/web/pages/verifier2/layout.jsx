import { Yeseva_One } from 'next/font/google'
import { DM_Serif_Display } from 'next/font/google'
// import './styles.css'

const yeseva_one = Yeseva_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-yeseva_one',
})
const dm_serif_display = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm_serif_display',
})

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={yeseva_one.variable + ' ' + dm_serif_display.variable}>
        {children}
      </body>
    </html>
  )
}