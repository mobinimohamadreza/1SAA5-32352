import Providers from '@/Module/Providers/Component/Providers'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fa" dir={"rtl"}>
        <body>
        <Providers>{children}</Providers>
        </body>
        </html>
    )
}
