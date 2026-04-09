interface StatItem { value: string; label: string }

const stats: StatItem[] = [
  { value: '500+', label: 'PROJECTS COMPLETED' },
  { value: '99.9%', label: 'UPTIME GUARANTEE' },
  { value: '120+', label: 'GLOBAL PARTNERS' },
  { value: '24/7', label: 'EXPERT SUPPORT' },
]

export default function StatsBar() {
  const items = stats

  return (
    <div className="bg-surface/50 border-y border-divider">
      <div className="page-container">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-divider">
          {items.map((stat, i) => (
            <div key={i} className="px-6 py-8 text-center">
              <p className="text-headline-md font-primary font-bold text-white mb-1">{stat.value}</p>
              <p className="text-label-sm font-primary font-bold uppercase tracking-widest text-secondary-text">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
