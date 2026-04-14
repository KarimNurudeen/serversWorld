'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Check, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function SignUpModal() {
  const { user, authModalOpen, authModalTab, closeAuthModal, signup, login } = useAuth()

  const [tab, setTab]           = useState<'signup' | 'login'>(authModalTab)
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd]   = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [done, setDone]         = useState(false)
  const firstRef = useRef<HTMLInputElement>(null)

  useEffect(() => { setTab(authModalTab) }, [authModalTab])

  useEffect(() => {
    if (authModalOpen) setTimeout(() => firstRef.current?.focus(), 80)
  }, [authModalOpen])

  useEffect(() => {
    if (!authModalOpen) return
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  })

  useEffect(() => {
    document.body.style.overflow = authModalOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [authModalOpen])

  const reset = () => {
    setName(''); setEmail(''); setPassword('')
    setError(''); setDone(false); setLoading(false); setShowPwd(false)
  }

  const handleClose = () => { closeAuthModal(); setTimeout(reset, 250) }
  const switchTab = (t: 'signup' | 'login') => { setTab(t); setError(''); setDone(false) }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (tab === 'signup') {
        await signup(name, email, password)
        setDone(true)
      } else {
        const ok = await login(email, password)
        ok ? setDone(true) : setError('No account found with that email. Please sign up first.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!authModalOpen) return null

  const firstName = name.split(' ')[0] || user?.name?.split(' ')[0] || 'there'

  const inputCls = 'w-full bg-background border border-divider px-5 py-4 text-white text-body-md font-secondary placeholder-secondary-text/40 focus:outline-none focus:border-white/50 transition-colors'

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
    >
      <div className="relative w-full max-w-3xl bg-background border border-divider shadow-2xl flex overflow-hidden min-h-[540px]">

        {/* ── Left branding panel ── */}
        <div className="hidden md:flex flex-col justify-between w-[42%] shrink-0 bg-surface border-r border-divider p-10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center border border-white/80">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="2" width="9" height="9" />
                <rect x="13" y="2" width="9" height="9" />
                <rect x="2" y="13" width="9" height="9" />
                <rect x="13" y="13" width="9" height="9" opacity="0.4" />
              </svg>
            </div>
            <span className="font-primary font-extrabold text-label-lg tracking-wide text-white uppercase">
              SWN
            </span>
          </div>

          {/* Mid copy */}
          <div>
            <p className="section-label mb-4">COMMUNITY</p>
            <h2 className="font-primary font-bold text-title-xl text-white leading-tight mb-4">
              {tab === 'signup' ? 'Join Our\nCommunity.' : 'Welcome\nBack.'}
            </h2>
            <p className="text-secondary-text text-body-md font-secondary leading-relaxed">
              {tab === 'signup'
                ? 'Create a free account to comment on articles, share insights, and stay connected with the SWN community.'
                : 'Sign in to access your account, join discussions, and engage with our growing community.'}
            </p>
          </div>

          {/* Bottom perks */}
          <div className="space-y-3">
            {['Comment on blog posts', 'Stay updated with our newsletter', 'Be part of the SWN community'].map((perk) => (
              <div key={perk} className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 bg-white/40 rounded-full shrink-0" />
                <p className="text-secondary-text text-body-sm font-secondary">{perk}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right form panel ── */}
        <div className="flex-1 flex flex-col">
          {/* Close */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 text-secondary-text hover:text-white transition-colors p-1 z-10"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {done ? (
            /* Success */
            <div className="flex-1 flex flex-col items-center justify-center px-10 py-14 text-center">
              <div className="flex h-16 w-16 items-center justify-center border border-white/30 bg-white/10 mb-6">
                <Check size={28} className="text-white" />
              </div>
              <p className="font-primary font-bold text-headline-sm text-white mb-3">
                {tab === 'signup' ? `Welcome, ${firstName}!` : `Good to see you, ${firstName}!`}
              </p>
              <p className="text-secondary-text text-body-lg font-secondary leading-relaxed mb-10 max-w-xs">
                {tab === 'signup'
                  ? 'Your account is ready. You can now comment on blog posts.'
                  : "You're signed in. Head back to the article to leave a comment."}
              </p>
              <button onClick={handleClose} className="btn-primary w-full justify-center py-4 text-sm">
                {tab === 'signup' ? 'GET STARTED' : 'CONTINUE'}
              </button>
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div className="flex border-b border-divider shrink-0">
                {(['login', 'signup'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => switchTab(t)}
                    className={`flex-1 py-5 font-primary font-bold text-label-md uppercase tracking-widest transition-colors ${
                      tab === t
                        ? 'text-white border-b-2 border-white -mb-px'
                        : 'text-secondary-text hover:text-white'
                    }`}
                  >
                    {t === 'login' ? 'Sign In' : 'Sign Up'}
                  </button>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col px-10 py-8 gap-5">
                <p className="text-secondary-text text-body-md font-secondary">
                  {tab === 'signup'
                    ? 'Create a free account to join the community.'
                    : 'Welcome back — sign in to your account.'}
                </p>

                <div className="flex flex-col gap-4 flex-1">
                  {tab === 'signup' && (
                    <div>
                      <label className="text-[11px] font-primary font-bold uppercase tracking-wider text-secondary-text block mb-2">
                        Full Name <span className="text-white/30">*</span>
                      </label>
                      <input
                        ref={firstRef}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ada Okafor"
                        required
                        autoComplete="name"
                        className={inputCls}
                      />
                    </div>
                  )}

                  <div>
                    <label className="text-[11px] font-primary font-bold uppercase tracking-wider text-secondary-text block mb-2">
                      Email Address <span className="text-white/30">*</span>
                    </label>
                    <input
                      ref={tab === 'login' ? firstRef : undefined}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      required
                      autoComplete="email"
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-primary font-bold uppercase tracking-wider text-secondary-text block mb-2">
                      Password <span className="text-white/30">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPwd ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={tab === 'signup' ? 'Min 8 characters' : '••••••••'}
                        required
                        minLength={tab === 'signup' ? 8 : undefined}
                        autoComplete={tab === 'signup' ? 'new-password' : 'current-password'}
                        className={`${inputCls} pr-14`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPwd((v) => !v)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-text hover:text-white transition-colors"
                        aria-label={showPwd ? 'Hide password' : 'Show password'}
                      >
                        {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <p className="text-red-400 text-body-sm font-secondary border border-red-400/30 bg-red-400/10 px-5 py-3">
                      {error}
                    </p>
                  )}
                </div>

                <div className="space-y-4 mt-auto">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center py-4 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {loading ? 'PLEASE WAIT…' : tab === 'signup' ? 'CREATE ACCOUNT' : 'SIGN IN'}
                  </button>

                  <p className="text-center text-secondary-text text-body-sm font-secondary">
                    {tab === 'signup' ? (
                      <>Already have an account?{' '}
                        <button type="button" onClick={() => switchTab('login')} className="text-white hover:underline font-semibold">Sign in</button>
                      </>
                    ) : (
                      <>Don&apos;t have an account?{' '}
                        <button type="button" onClick={() => switchTab('signup')} className="text-white hover:underline font-semibold">Sign up free</button>
                      </>
                    )}
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
