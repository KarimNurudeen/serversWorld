import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { notFound } from 'next/navigation'
import { projects } from '@/lib/data'
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

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-divider">
        <div className="page-container py-4 flex items-center gap-2 text-body-sm font-secondary text-secondary-text">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/portfolio" className="hover:text-white">Portfolio</Link>
          <span>/</span>
          <span className="text-white">{project.title}</span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="border-b border-divider">
        <div className="page-container py-8">
          <div className="border border-divider overflow-hidden aspect-video max-h-[500px]">
            <Image
              src={project.coverImage}
              alt={project.title}
              width={1400}
              height={700}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="border-b border-divider">
        <div className="page-container py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <span className="text-label-sm font-primary font-bold uppercase tracking-widest text-secondary-text block mb-4">
              {project.category.replace('_', ' ')}
            </span>
            <h1 className="text-headline-lg font-primary font-bold text-white mb-5">{project.title}</h1>
            <p className="text-secondary-text text-body-lg font-secondary leading-relaxed mb-8">{project.shortDescription}</p>
            {project.description && (
              <p className="text-secondary-text text-body-md font-secondary leading-relaxed">{project.description}</p>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="border border-divider p-6 space-y-4">
              <div>
                <p className="text-label-sm font-primary font-bold uppercase tracking-wider text-secondary-text mb-1">Client</p>
                <p className="text-white font-secondary text-body-md">{project.client}</p>
              </div>
              {project.completedAt && (
                <div>
                  <p className="text-label-sm font-primary font-bold uppercase tracking-wider text-secondary-text mb-1">Completed</p>
                  <p className="text-white font-secondary text-body-md">
                    {new Date(project.completedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
              )}
              {project.tags.length > 0 && (
                <div>
                  <p className="text-label-sm font-primary font-bold uppercase tracking-wider text-secondary-text mb-2">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-label-sm font-primary font-bold uppercase tracking-wider text-secondary-text border border-divider px-2 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline flex items-center justify-center gap-2 w-full"
                >
                  VISIT LIVE SITE
                </a>
              )}
            </div>

            {/* Results */}
            {project.results && project.results.length > 0 && (
              <div className="border border-divider p-6">
                <h3 className="font-primary font-semibold text-body-md text-white mb-4">Project Results</h3>
                <div className="space-y-4">
                  {project.results.map((r, i) => (
                    <div key={i}>
                      <p className="text-headline-md font-primary font-bold text-white">{r.metric}</p>
                      <p className="text-secondary-text text-body-sm font-secondary">{r.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-divider bg-surface/20">
        <div className="page-container py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link href="/portfolio" className="flex items-center gap-2 text-secondary-text hover:text-white transition-colors font-secondary">
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
