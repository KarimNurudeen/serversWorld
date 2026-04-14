import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { notFound } from 'next/navigation'
import { projects } from '@/lib/data'
import ProjectGallery from '@/components/ui/ProjectGallery'
import type { Metadata } from 'next'

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) return { title: 'Project Not Found' }
  return { title: project.title, description: project.shortDescription }
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) notFound()

  const galleryImages = project.gallery?.length ? project.gallery : [project.coverImage]

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-divider">
        <div className="page-container py-4 flex items-center gap-2 text-body-sm font-secondary text-secondary-text">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
          <span>/</span>
          <span className="text-white">{project.title}</span>
        </div>
      </div>

      {/* ── Full-width split: gallery bleeds left, content stays right ── */}
      <div className="border-b border-divider">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_1fr_260px] min-h-[560px]">

          {/* Col 1 — Gallery: full bleed to left screen edge */}
          <div className="lg:border-r border-divider flex flex-col overflow-hidden min-h-[400px]">
            <ProjectGallery images={galleryImages} title={project.title} />
          </div>

          {/* Col 2 — Description */}
          <div className="lg:border-r border-divider py-10 px-8 lg:px-10 border-t lg:border-t-0">
            <span className="text-label-sm font-primary font-bold uppercase tracking-widest text-secondary-text block mb-4">
              {project.category.replace('_', ' ')}
            </span>
            <h1 className="text-headline-sm font-primary font-bold text-white mb-3 leading-tight">
              {project.title}
            </h1>
            <p className="text-secondary-text text-body-md font-secondary leading-relaxed mb-8">
              {project.shortDescription}
            </p>

            {project.challenge && (
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px flex-1 bg-divider" />
                  <p className="text-label-sm font-primary font-bold uppercase tracking-widest text-secondary-text shrink-0">
                    The Challenge
                  </p>
                  <div className="h-px flex-1 bg-divider" />
                </div>
                <p className="text-secondary-text text-body-sm font-secondary leading-relaxed">
                  {project.challenge}
                </p>
              </div>
            )}

            {project.description && (
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px flex-1 bg-divider" />
                  <p className="text-label-sm font-primary font-bold uppercase tracking-widest text-secondary-text shrink-0">
                    Our Approach
                  </p>
                  <div className="h-px flex-1 bg-divider" />
                </div>
                <p className="text-secondary-text text-body-sm font-secondary leading-relaxed">
                  {project.description}
                </p>
              </div>
            )}
          </div>

          {/* Col 3 — Sidebar */}
          <div className="py-10 px-8 border-t lg:border-t-0 space-y-5">
            <div className="border border-divider divide-y divide-divider">
              <div className="p-4">
                <p className="text-label-sm font-primary font-bold uppercase tracking-wider text-secondary-text mb-1">Client</p>
                <p className="text-white font-secondary text-body-md">{project.client}</p>
              </div>
              {project.completedAt && (
                <div className="p-4">
                  <p className="text-label-sm font-primary font-bold uppercase tracking-wider text-secondary-text mb-1">Completed</p>
                  <p className="text-white font-secondary text-body-sm">
                    {new Date(project.completedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
              )}
              <div className="p-4">
                <p className="text-label-sm font-primary font-bold uppercase tracking-wider text-secondary-text mb-1">Category</p>
                <p className="text-white font-secondary text-body-sm capitalize">
                  {project.category.replace('_', ' ')}
                </p>
              </div>
            </div>

            {project.tags.length > 0 && (
              <div className="border border-divider p-4">
                <p className="text-label-sm font-primary font-bold uppercase tracking-wider text-secondary-text mb-3">Tech Stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-label-sm font-primary font-bold uppercase tracking-wider text-secondary-text border border-divider px-2 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.results && project.results.length > 0 && (
              <div className="border border-divider p-4">
                <p className="text-label-sm font-primary font-bold uppercase tracking-wider text-secondary-text mb-3">Results</p>
                <div className="divide-y divide-divider">
                  {project.results.map((r, i) => (
                    <div key={i} className="py-3 first:pt-0 last:pb-0">
                      <p className="text-title-lg font-primary font-bold text-white">{r.metric}</p>
                      <p className="text-secondary-text text-body-sm font-secondary">{r.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="btn-outline flex items-center justify-center gap-2 w-full">
                VISIT LIVE SITE <ArrowRight size={13} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-divider bg-surface/20">
        <div className="page-container py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link href="/portfolio" className="flex items-center gap-2 text-secondary-text hover:text-white transition-colors font-secondary text-body-md">
            <ArrowLeft size={14} /> Back to Portfolio
          </Link>
          <Link href="/contact" className="btn-primary">
            START YOUR PROJECT <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
