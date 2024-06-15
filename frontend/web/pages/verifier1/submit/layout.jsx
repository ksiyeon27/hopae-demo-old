import { DM_Sans } from 'next/font/google';
// import './styles.css';

const dm_sans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm_sans',
})

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={dm_sans.variable}>
        {children}
      </body>
    </html>
  )
}