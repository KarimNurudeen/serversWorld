import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { AppearanceProvider } from '@/context/AppearanceContext'
import { AuthProvider } from '@/context/AuthContext'
import CustomizerPanel from '@/components/ui/CustomizerPanel'
import SignUpModal from '@/components/ui/SignUpModal'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppearanceProvider>
      <AuthProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CustomizerPanel />
        <SignUpModal />
      </AuthProvider>
    </AppearanceProvider>
  )
}
