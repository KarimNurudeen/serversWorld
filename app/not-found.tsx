import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-8">
      <div className="text-9xl font-primary font-black text-white/5 select-none mb-8">404</div>
      <h1 className="text-headline-md font-primary font-bold text-white mb-4">Page Not Found</h1>
      <p className="text-secondary-text text-body-lg font-secondary mb-10 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
      </p>
      <Link href="/" className="btn-primary flex items-center gap-2">
        <ArrowLeft size={14} /> BACK TO HOME
      </Link>
    </div>
  )
}
