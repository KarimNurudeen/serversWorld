'use client'

import { useState } from 'react'
import { Settings2, X, RotateCcw, Check, ChevronUp, ChevronDown } from 'lucide-react'
import { useAppearance } from '@/context/AppearanceContext'
import type { AppearanceSettings } from '@/types/appearance'

// ── Presets ────────────────────────────────────────────────────────────────
const ACCENT_PRESETS = [
  { label: 'White',   value: '#ffffff', dark: '#e5e5e5' },
  { label: 'Blue',    value: '#3b82f6', dark: '#2563eb' },
  { label: 'Orange',  value: '#f97316', dark: '#ea580c' },
  { label: 'Green',   value: '#22c55e', dark: '#16a34a' },
  { label: 'Purple',  value: '#a855f7', dark: '#9333ea' },
  { label: 'Red',     value: '#ef4444', dark: '#dc2626' },
  { label: 'Teal',    value: '#14b8a6', dark: '#0d9488' },
  { label: 'Gold',    value: '#eab308', dark: '#ca8a04' },
]

const HEADING_FONTS: { label: string; value: string }[] = [
  { label: 'Noto Sans JP',      value: "'Noto Sans JP', sans-serif" },
  { label: 'Space Grotesk',     value: "'Space Grotesk', sans-serif" },
  { label: 'Inter',             value: "'Inter', sans-serif" },
  { label: 'Poppins',           value: "'Poppins', sans-serif" },
  { label: 'DM Sans',           value: "'DM Sans', sans-serif" },
  { label: 'Raleway',           value: "'Raleway', sans-serif" },
  { label: 'Montserrat',        value: "'Montserrat', sans-serif" },
  { label: 'Playfair Display',  value: "'Playfair Display', serif" },
  { label: 'Roboto',            value: "'Roboto', sans-serif" },
  { label: 'Lato',              value: "'Lato', sans-serif" },
]

const BODY_FONTS = HEADING_FONTS

const SECTION_LABELS: Record<string, string> = {
  whyChooseUs:  'Why Choose Us',
  services:     'Services',
  visualBreak:  'Visual Break',
  portfolio:    'Portfolio',
  products:     'Products',
  testimonials: 'Testimonials',
  blog:         'Blog',
  newsletter:   'Newsletter',
}

const SECTION_SHOW_KEY: Record<string, keyof AppearanceSettings> = {
  whyChooseUs:  'showWhyChooseUs',
  services:     'showServices',
  visualBreak:  'showVisualBreak',
  portfolio:    'showPortfolio',
  products:     'showProducts',
  testimonials: 'showTestimonials',
  blog:         'showBlog',
  newsletter:   'showNewsletter',
}

const SECTION_HEADING_KEY: Record<string, keyof AppearanceSettings> = {
  whyChooseUs:  'whyChooseUsHeading',
  services:     'servicesHeading',
  portfolio:    'portfolioHeading',
  products:     'productsHeading',
  testimonials: 'testimonialsHeading',
  blog:         'blogHeading',
}

// ── Tabs ───────────────────────────────────────────────────────────────────
const TABS = ['brand', 'colors', 'type', 'layout', 'nav', 'content', 'sections', 'footer'] as const
type Tab = typeof TABS[number]

const TAB_LABELS: Record<Tab, string> = {
  brand:    'Brand',
  colors:   'Colors',
  type:     'Type',
  layout:   'Layout',
  nav:      'Navbar',
  content:  'Content',
  sections: 'Sections',
  footer:   'Footer',
}

// ── Sub-components ─────────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">{children}</p>
}

function Divider() {
  return <div className="border-t border-white/5 my-1" />
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-10 h-5 rounded-full transition-colors shrink-0 ${value ? 'bg-green-500' : 'bg-white/20'}`}
    >
      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${value ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </button>
  )
}

function Segment<T extends string>({
  options, value, onChange,
}: {
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="flex gap-1.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider border transition-colors ${
            value === opt.value
              ? 'border-white bg-white text-gray-950'
              : 'border-white/15 text-white/50 hover:border-white/40 hover:text-white'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

function ColorRow({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-xs text-white/60">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-mono text-white/40">{value}</span>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-7 h-7 cursor-pointer rounded border border-white/20 bg-transparent"
        />
      </div>
    </div>
  )
}

function TextInput({
  label, value, onChange, placeholder, textarea,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  textarea?: boolean
}) {
  const cls = 'w-full bg-white/5 border border-white/10 px-3 py-2 text-white text-xs placeholder-white/25 focus:outline-none focus:border-white/30 resize-none'
  return (
    <div className="mb-3">
      <p className="text-[10px] text-white/40 mb-1">{label}</p>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className={cls}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cls}
        />
      )}
    </div>
  )
}

function FontSelect({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="mb-4">
      <p className="text-[10px] text-white/40 mb-1.5">{label}</p>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 px-3 py-2.5 text-white text-xs focus:outline-none focus:border-white/30 cursor-pointer"
        style={{ fontFamily: value }}
      >
        {(label.includes('Heading') ? HEADING_FONTS : BODY_FONTS).map((f) => (
          <option key={f.value} value={f.value} style={{ fontFamily: f.value, background: '#111' }}>
            {f.label}
          </option>
        ))}
      </select>
    </div>
  )
}

// ── Main Panel ─────────────────────────────────────────────────────────────
export default function CustomizerPanel() {
  const { settings, update, reset } = useAppearance()
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<Tab>('brand')

  const moveSection = (idx: number, dir: -1 | 1) => {
    const next = [...settings.sectionOrder]
    const to = idx + dir
    if (to < 0 || to >= next.length) return
    ;[next[idx], next[to]] = [next[to], next[idx]]
    update({ sectionOrder: next })
  }

  return (
    <>
      {/* ── Floating trigger ─────────────────────────────── */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Customize appearance"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 shadow-2xl font-bold text-sm"
        style={{ backgroundColor: 'var(--accent)', color: '#0a0f1e', borderRadius: 'var(--btn-radius)' }}
      >
        <Settings2 size={16} className="transition-transform duration-300 group-hover:rotate-45" />
        <span className="text-xs font-bold uppercase tracking-wider hidden sm:block">Customise</span>
      </button>

      {/* ── Backdrop ─────────────────────────────────────── */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Slide-in panel ───────────────────────────────── */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 z-50 bg-gray-950 border-l border-white/10 flex flex-col shadow-2xl transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
          <div>
            <p className="font-bold text-white text-sm">Customise</p>
            <p className="text-white/40 text-[11px]">Changes apply instantly</p>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={reset} title="Reset to defaults" className="p-2 text-white/40 hover:text-white transition-colors">
              <RotateCcw size={13} />
            </button>
            <button onClick={() => setOpen(false)} className="p-2 text-white/40 hover:text-white transition-colors">
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex border-b border-white/10 overflow-x-auto shrink-0 scrollbar-none">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`shrink-0 px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${
                tab === t
                  ? 'text-white border-b-2 border-white'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              {TAB_LABELS[t]}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">

          {/* ── BRAND ──────────────────────────────────────── */}
          {tab === 'brand' && (
            <>
              <TextInput
                label="Site Name"
                value={settings.siteName}
                onChange={(v) => update({ siteName: v })}
                placeholder="Servers World Network"
              />
              <TextInput
                label="Logo Text"
                value={settings.logoText}
                onChange={(v) => update({ logoText: v })}
                placeholder="Servers World"
              />
              <Divider />
              <Label>Accent Color</Label>
              <div className="grid grid-cols-4 gap-2">
                {ACCENT_PRESETS.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => update({ accentColor: p.value, accentColorDark: p.dark })}
                    title={p.label}
                    className={`flex flex-col items-center gap-1.5 py-2.5 border transition-colors ${
                      settings.accentColor === p.value
                        ? 'border-white bg-white/10'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <span
                      className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center"
                      style={{ backgroundColor: p.value }}
                    >
                      {settings.accentColor === p.value && (
                        <Check size={12} className={p.value === '#ffffff' ? 'text-black' : 'text-white'} />
                      )}
                    </span>
                    <span className="text-[10px] text-white/50">{p.label}</span>
                  </button>
                ))}
              </div>
              <div className="mt-2">
                <ColorRow
                  label="Custom Accent"
                  value={settings.accentColor}
                  onChange={(v) => update({ accentColor: v })}
                />
              </div>
            </>
          )}

          {/* ── COLORS ─────────────────────────────────────── */}
          {tab === 'colors' && (
            <>
              <Label>Background</Label>
              <ColorRow label="Page Background"   value={settings.backgroundColor}    onChange={(v) => update({ backgroundColor: v })} />
              <ColorRow label="Surface / Cards"   value={settings.surfaceColor}       onChange={(v) => update({ surfaceColor: v })} />
              <Divider />
              <Label>Text</Label>
              <ColorRow label="Primary Text"      value={settings.primaryTextColor}   onChange={(v) => update({ primaryTextColor: v })} />
              <ColorRow label="Secondary Text"    value={settings.secondaryTextColor} onChange={(v) => update({ secondaryTextColor: v })} />
              <Divider />
              <Label>Navbar</Label>
              <ColorRow label="Navbar Background" value={settings.navbarBg}           onChange={(v) => update({ navbarBg: v })} />
            </>
          )}

          {/* ── TYPOGRAPHY ─────────────────────────────────── */}
          {tab === 'type' && (
            <>
              <FontSelect
                label="Heading Font"
                value={settings.headingFont}
                onChange={(v) => update({ headingFont: v })}
              />
              <FontSelect
                label="Body Font"
                value={settings.bodyFont}
                onChange={(v) => update({ bodyFont: v })}
              />
              <Divider />
              <Label>Font Size Scale</Label>
              <Segment
                options={[
                  { value: 'compact', label: 'Compact' },
                  { value: 'normal',  label: 'Normal' },
                  { value: 'large',   label: 'Large' },
                ]}
                value={settings.fontSizeScale}
                onChange={(v) => update({ fontSizeScale: v })}
              />
              <p className="text-[10px] text-white/30 mt-1">Scales the base font size site-wide</p>
            </>
          )}

          {/* ── LAYOUT ─────────────────────────────────────── */}
          {tab === 'layout' && (
            <>
              <Label>Page Width</Label>
              <Segment
                options={[
                  { value: 'contained', label: 'Contained' },
                  { value: 'wide',      label: 'Wide' },
                  { value: 'full',      label: 'Full' },
                ]}
                value={settings.pageWidth}
                onChange={(v) => update({ pageWidth: v })}
              />

              <Label>Section Spacing</Label>
              <Segment
                options={[
                  { value: 'tight',    label: 'Tight' },
                  { value: 'normal',   label: 'Normal' },
                  { value: 'spacious', label: 'Spacious' },
                ]}
                value={settings.sectionSpacing}
                onChange={(v) => update({ sectionSpacing: v })}
              />

              <Label>Card Style</Label>
              <Segment
                options={[
                  { value: 'bordered',  label: 'Bordered' },
                  { value: 'shadowed',  label: 'Shadowed' },
                  { value: 'flat',      label: 'Flat' },
                ]}
                value={settings.cardStyle}
                onChange={(v) => update({ cardStyle: v })}
              />

              <Label>Button Style</Label>
              <Segment
                options={[
                  { value: 'filled',  label: 'Filled' },
                  { value: 'outline', label: 'Outline' },
                  { value: 'ghost',   label: 'Ghost' },
                ]}
                value={settings.buttonStyle}
                onChange={(v) => update({ buttonStyle: v })}
              />

              <Label>Button Radius</Label>
              <Segment
                options={[
                  { value: 'none', label: 'None' },
                  { value: 'sm',   label: 'SM' },
                  { value: 'md',   label: 'MD' },
                  { value: 'full', label: 'Full' },
                ]}
                value={settings.buttonRadius}
                onChange={(v) => update({ buttonRadius: v })}
              />
            </>
          )}

          {/* ── NAVBAR ─────────────────────────────────────── */}
          {tab === 'nav' && (
            <>
              <Label>Navbar Style</Label>
              <Segment
                options={[
                  { value: 'solid',       label: 'Solid' },
                  { value: 'glass',       label: 'Glass' },
                  { value: 'transparent', label: 'Transp.' },
                ]}
                value={settings.navbarStyle}
                onChange={(v) => update({ navbarStyle: v })}
              />

              <Divider />

              <Label>Visible Nav Links</Label>
              <div className="space-y-0">
                {([
                  { key: 'navShowServices',  label: 'Services' },
                  { key: 'navShowProducts',  label: 'Products' },
                  { key: 'navShowPortfolio', label: 'Portfolio' },
                  { key: 'navShowBlog',      label: 'Blog' },
                  { key: 'navShowAbout',     label: 'About' },
                  { key: 'navShowContact',   label: 'Contact' },
                ] as { key: keyof AppearanceSettings; label: string }[]).map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
                    <span className="text-sm text-white/70">{label}</span>
                    <Toggle
                      value={settings[key] as boolean}
                      onChange={(v) => update({ [key]: v })}
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── CONTENT ────────────────────────────────────── */}
          {tab === 'content' && (
            <>
              <Label>Hero Section</Label>
              <TextInput label="Headline"       value={settings.heroHeadline} onChange={(v) => update({ heroHeadline: v })} textarea placeholder="ARCHITECTING THE DIGITAL FUTURE" />
              <TextInput label="Sub-text"       value={settings.heroSubtext}  onChange={(v) => update({ heroSubtext: v })}  textarea placeholder="Your tagline here..." />
              <TextInput label="CTA 1 Label"    value={settings.heroCta1Label} onChange={(v) => update({ heroCta1Label: v })} placeholder="Contact Us" />
              <TextInput label="CTA 1 URL"      value={settings.heroCta1Href}  onChange={(v) => update({ heroCta1Href: v })}  placeholder="/contact" />
              <TextInput label="CTA 2 Label"    value={settings.heroCta2Label} onChange={(v) => update({ heroCta2Label: v })} placeholder="View Portfolio" />
              <TextInput label="CTA 2 URL"      value={settings.heroCta2Href}  onChange={(v) => update({ heroCta2Href: v })}  placeholder="/portfolio" />
              <TextInput label="Hero Image URL" value={settings.heroImageUrl}  onChange={(v) => update({ heroImageUrl: v })}  placeholder="https://..." />

              <Divider />
              <Label>Section Headings</Label>
              {([
                { key: 'whyChooseUsHeading',  label: 'Why Choose Us' },
                { key: 'servicesHeading',     label: 'Services' },
                { key: 'portfolioHeading',    label: 'Portfolio' },
                { key: 'productsHeading',     label: 'Products' },
                { key: 'testimonialsHeading', label: 'Testimonials' },
                { key: 'blogHeading',         label: 'Blog' },
              ] as { key: keyof AppearanceSettings; label: string }[]).map(({ key, label }) => (
                <TextInput
                  key={key}
                  label={label}
                  value={settings[key] as string}
                  onChange={(v) => update({ [key]: v })}
                />
              ))}
            </>
          )}

          {/* ── SECTIONS ───────────────────────────────────── */}
          {tab === 'sections' && (
            <>
              <Label>Section Order & Visibility</Label>
              <p className="text-[10px] text-white/30 -mt-1 mb-3">Use arrows to reorder. Toggle to show/hide.</p>
              <div className="space-y-0">
                {settings.sectionOrder.map((key, idx) => {
                  const showKey = SECTION_SHOW_KEY[key]
                  const headingKey = SECTION_HEADING_KEY[key]
                  return (
                    <div key={key} className="border-b border-white/5 last:border-0 py-2.5">
                      <div className="flex items-center gap-2">
                        {/* Order controls */}
                        <div className="flex flex-col gap-px shrink-0">
                          <button
                            onClick={() => moveSection(idx, -1)}
                            disabled={idx === 0}
                            className="p-0.5 text-white/30 hover:text-white disabled:opacity-20 transition-colors"
                          >
                            <ChevronUp size={12} />
                          </button>
                          <button
                            onClick={() => moveSection(idx, 1)}
                            disabled={idx === settings.sectionOrder.length - 1}
                            className="p-0.5 text-white/30 hover:text-white disabled:opacity-20 transition-colors"
                          >
                            <ChevronDown size={12} />
                          </button>
                        </div>

                        {/* Section name */}
                        <span className="flex-1 text-sm text-white/70">{SECTION_LABELS[key]}</span>

                        {/* Visibility */}
                        {showKey && (
                          <Toggle
                            value={settings[showKey] as boolean}
                            onChange={(v) => update({ [showKey]: v })}
                          />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}

          {/* ── FOOTER ─────────────────────────────────────── */}
          {tab === 'footer' && (
            <>
              <Label>Footer</Label>
              <TextInput
                label="Tagline"
                value={settings.footerTagline}
                onChange={(v) => update({ footerTagline: v })}
                placeholder="Architecting the digital future..."
              />
              <div className="flex items-center justify-between py-2 mb-4">
                <span className="text-sm text-white/70">Show Social Links</span>
                <Toggle value={settings.showSocialLinks} onChange={(v) => update({ showSocialLinks: v })} />
              </div>

              <Divider />
              <Label>Animations & Effects</Label>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-white/70">Enable Animations</span>
                <Toggle value={settings.enableAnimations} onChange={(v) => update({ enableAnimations: v })} />
              </div>

              <div className="mt-3">
                <Label>Transition Speed</Label>
                <Segment
                  options={[
                    { value: 'fast',   label: 'Fast' },
                    { value: 'normal', label: 'Normal' },
                    { value: 'slow',   label: 'Slow' },
                  ]}
                  value={settings.transitionSpeed}
                  onChange={(v) => update({ transitionSpeed: v })}
                />
              </div>
            </>
          )}

        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-white/10 shrink-0">
          <p className="text-[10px] text-white/25 text-center">Preferences saved to your browser</p>
        </div>
      </aside>
    </>
  )
}
