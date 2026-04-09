import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { AppearanceProvider } from '@/context/AppearanceContext'
import CustomizerPanel from '@/components/ui/CustomizerPanel'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppearanceProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <CustomizerPanel />
    </AppearanceProvider>
  )
}
