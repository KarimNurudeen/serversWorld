'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'

export interface AuthUser {
  name: string
  email: string
}

interface AuthContextValue {
  user: AuthUser | null
  authModalOpen: boolean
  authModalTab: 'signup' | 'login'
  openAuthModal: (tab?: 'signup' | 'login') => void
  closeAuthModal: () => void
  signup: (name: string, email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const STORAGE_KEY = 'swn_user'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authModalTab, setAuthModalTab] = useState<'signup' | 'login'>('signup')

  // Rehydrate from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setUser(JSON.parse(stored))
    } catch { /* ignore */ }
  }, [])

  const openAuthModal = useCallback((tab: 'signup' | 'login' = 'signup') => {
    setAuthModalTab(tab)
    setAuthModalOpen(true)
  }, [])

  const closeAuthModal = useCallback(() => setAuthModalOpen(false), [])

  const signup = useCallback(async (name: string, email: string, _password: string) => {
    // UI-only: store user without real auth
    await new Promise((r) => setTimeout(r, 700))
    const newUser: AuthUser = { name: name.trim(), email: email.trim().toLowerCase() }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser))
    setUser(newUser)
  }, [])

  const login = useCallback(async (email: string, _password: string) => {
    // UI-only: accept any email that matches a stored account
    await new Promise((r) => setTimeout(r, 700))
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const storedUser: AuthUser = JSON.parse(stored)
        if (storedUser.email === email.trim().toLowerCase()) {
          setUser(storedUser)
          return true
        }
      }
    } catch { /* ignore */ }
    return false
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, authModalOpen, authModalTab, openAuthModal, closeAuthModal, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
