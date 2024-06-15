import { Libre_Franklin } from 'next/font/google'
import { Judson } from 'next/font/google'
// import './styles.css'

const libre_franklin = Libre_Franklin({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-libre_franklin',
})
const judson = Judson({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-judson',
  weight: '400',
})

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={libre_franklin.variable + ' ' + judson.variable}>
        {children}
      </body>
    </html>
  )
}