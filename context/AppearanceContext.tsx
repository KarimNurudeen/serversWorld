'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { AppearanceSettings, defaultAppearance } from '@/types/appearance'

const STORAGE_KEY = 'swn_appearance'

// Map font-family CSS values → Google Fonts URL params
const GFONT_MAP: Record<string, string> = {
  "'Noto Sans JP', sans-serif":     'Noto+Sans+JP:wght@400;600;700;800',
  "'Space Grotesk', sans-serif":    'Space+Grotesk:wght@400;500;600;700',
  "'Inter', sans-serif":            'Inter:wght@400;500;600;700',
  "'Poppins', sans-serif":          'Poppins:wght@400;500;600;700',
  "'DM Sans', sans-serif":          'DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700',
  "'Raleway', sans-serif":          'Raleway:wght@400;500;600;700',
  "'Montserrat', sans-serif":       'Montserrat:wght@400;500;600;700',
  "'Playfair Display', serif":      'Playfair+Display:wght@400;600;700',
  "'Roboto', sans-serif":           'Roboto:wght@400;500;700',
  "'Lato', sans-serif":             'Lato:wght@400;700',
}

function ensureFontLoaded(fontFamily: string) {
  const slug = GFONT_MAP[fontFamily]
  if (!slug) return
  const id = `gfont-${slug.split(':')[0]}`
  if (document.getElementById(id)) return
  const link = document.createElement('link')
  link.id = id
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?family=${slug}&display=swap`
  document.head.appendChild(link)
}

interface AppearanceContextValue {
  settings: AppearanceSettings
  update: (patch: Partial<AppearanceSettings>) => void
  reset: () => void
}

const AppearanceContext = createContext<AppearanceContextValue>({
  settings: defaultAppearance,
  update: () => {},
  reset: () => {},
})

export function AppearanceProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AppearanceSettings>(defaultAppearance)
  const [mounted, setMounted] = useState(false)

  // Load persisted settings on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setSettings({ ...defaultAppearance, ...JSON.parse(stored) })
    } catch {}
    setMounted(true)
  }, [])

  // Persist + inject all CSS variables whenever settings change
  useEffect(() => {
    if (!mounted) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))

    const root = document.documentElement

    // ── Colors ─────────────────────────────────────────────────────
    root.style.setProperty('--accent',                 settings.accentColor)
    root.style.setProperty('--accent-dark',            settings.accentColorDark)
    root.style.setProperty('--navbar-bg',              settings.navbarBg)
    root.style.setProperty('--color-background',       settings.backgroundColor)
    root.style.setProperty('--color-surface',          settings.surfaceColor)
    root.style.setProperty('--color-primary-text',     settings.primaryTextColor)
    root.style.setProperty('--color-secondary-text',   settings.secondaryTextColor)

    // ── Typography ─────────────────────────────────────────────────
    ensureFontLoaded(settings.headingFont)
    ensureFontLoaded(settings.bodyFont)
    root.style.setProperty('--font-heading', settings.headingFont)
    root.style.setProperty('--font-body',    settings.bodyFont)

    const scaleMap: Record<AppearanceSettings['fontSizeScale'], string> = {
      compact: '0.9', normal: '1', large: '1.1',
    }
    root.style.setProperty('--font-scale', scaleMap[settings.fontSizeScale])

    // ── Layout ─────────────────────────────────────────────────────
    const pyMap: Record<AppearanceSettings['sectionSpacing'], string> = {
      tight: '4rem', normal: '6rem', spacious: '8rem',
    }
    root.style.setProperty('--section-py', pyMap[settings.sectionSpacing])

    const maxWMap: Record<AppearanceSettings['pageWidth'], string> = {
      contained: '80rem', wide: '90rem', full: '100%',
    }
    root.style.setProperty('--page-max-width', maxWMap[settings.pageWidth])

    const radiusMap: Record<AppearanceSettings['buttonRadius'], string> = {
      none: '0px', sm: '4px', md: '8px', full: '9999px',
    }
    root.style.setProperty('--btn-radius', radiusMap[settings.buttonRadius])

    // ── Animations ─────────────────────────────────────────────────
    const durMap: Record<AppearanceSettings['transitionSpeed'], string> = {
      fast: '100ms', normal: '200ms', slow: '400ms',
    }
    root.style.setProperty('--transition-duration', durMap[settings.transitionSpeed])
    root.style.setProperty('--animations-enabled', settings.enableAnimations ? '1' : '0')

    // Disable all transitions when animations are off
    if (!settings.enableAnimations) {
      root.style.setProperty('--transition-duration', '0ms')
    }
  }, [settings, mounted])

  const update = (patch: Partial<AppearanceSettings>) =>
    setSettings(prev => ({ ...prev, ...patch }))

  const reset = () => {
    setSettings(defaultAppearance)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <AppearanceContext.Provider value={{ settings, update, reset }}>
      {children}
    </AppearanceContext.Provider>
  )
}

export function useAppearance() {
  return useContext(AppearanceContext)
}
