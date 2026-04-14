import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Terms of Service' }

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-divider">
        <div className="page-container py-16">
          <p className="section-label mb-4">LEGAL</p>
          <h1 className="text-headline-md font-primary font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-secondary-text text-body-md font-secondary">
            Last updated: January 1, 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="page-container py-16">
        <div className="max-w-3xl space-y-12">

          <section>
            <h2 className="font-primary font-semibold text-title-lg text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-secondary-text text-body-md font-secondary leading-relaxed">
              By accessing or using any service provided by Servers World Network (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.
            </p>
          </section>

          <div className="divider-line" />

          <section>
            <h2 className="font-primary font-semibold text-title-lg text-white mb-4">2. Services</h2>
            <p className="text-secondary-text text-body-md font-secondary leading-relaxed mb-4">
              Servers World Network provides technology services including but not limited to:
            </p>
            <ul className="space-y-2 text-secondary-text text-body-md font-secondary">
              {[
                'Custom software development and engineering',
                'Cloud infrastructure design and management',
                'AI and data solutions',
                'Digital marketing and growth services',
                'Security consulting and implementation',
                'Software products, templates, and digital goods',
                'Training and support services',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-white/40 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-secondary-text text-body-md font-secondary leading-relaxed mt-4">
              Specific deliverables, timelines, and pricing are defined in individual project agreements or product listings.
            </p>
          </section>

          <div className="divider-line" />

          <section>
            <h2 className="font-primary font-semibold text-title-lg text-white mb-4">3. User Responsibilities</h2>
            <p className="text-secondary-text text-body-md font-secondary leading-relaxed mb-4">
              By using our services you agree to:
            </p>
            <ul className="space-y-2 text-secondary-text text-body-md font-secondary">
              {[
                'Provide accurate and complete information when requested',
                'Use our services only for lawful purposes',
                'Not attempt to reverse-engineer, copy, or redistribute our proprietary software or systems',
                'Not use our services to transmit harmful, offensive, or illegal content',
                'Maintain the confidentiality of any credentials or access we provide',
                'Notify us promptly of any suspected security breach',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-white/40 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <div className="divider-line" />

          <section>
            <h2 className="font-primary font-semibold text-title-lg text-white mb-4">4. Payments & Refunds</h2>
            <ul className="space-y-3">
              {[
                { title: 'Project Services', desc: 'Payment terms are defined in individual project agreements. Deposits are non-refundable once work has commenced.' },
                { title: 'Digital Products', desc: 'Due to the nature of digital goods, all sales are final once a download or access has been provided, unless the product is materially defective.' },
                { title: 'Subscriptions', desc: 'Subscription plans may be cancelled at any time. Refunds for unused periods are at our discretion.' },
                { title: 'Disputes', desc: 'Payment disputes must be raised within 14 days of the transaction. Contact hello@serversworld.net to initiate a review.' },
              ].map((item) => (
                <li key={item.title} className="border border-divider p-5 list-none">
                  <p className="font-primary font-semibold text-body-md text-white mb-1">{item.title}</p>
                  <p className="text-secondary-text text-body-sm font-secondary leading-relaxed">{item.desc}</p>
                </li>
              ))}
            </ul>
          </section>

          <div className="divider-line" />

          <section>
            <h2 className="font-primary font-semibold text-title-lg text-white mb-4">5. Intellectual Property</h2>
            <p className="text-secondary-text text-body-md font-secondary leading-relaxed mb-4">
              All content on this website — including text, graphics, logos, code, and design — is the property of Servers World Network unless otherwise stated, and is protected by applicable intellectual property laws.
            </p>
            <p className="text-secondary-text text-body-md font-secondary leading-relaxed">
              For custom development projects, IP ownership is transferred to the client upon final payment as specified in the project agreement. Third-party libraries and open-source components remain subject to their respective licences.
            </p>
          </section>

          <div className="divider-line" />

          <section>
            <h2 className="font-primary font-semibold text-title-lg text-white mb-4">6. Confidentiality</h2>
            <p className="text-secondary-text text-body-md font-secondary leading-relaxed">
              Both parties agree to maintain the confidentiality of any proprietary or sensitive information shared during the course of a project. This obligation survives the termination of any service agreement. Non-disclosure agreements are available upon request for sensitive engagements.
            </p>
          </section>

          <div className="divider-line" />

          <section>
            <h2 className="font-primary font-semibold text-title-lg text-white mb-4">7. Limitation of Liability</h2>
            <p className="text-secondary-text text-body-md font-secondary leading-relaxed">
              To the maximum extent permitted by law, Servers World Network shall not be liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use our services. Our total liability for any claim shall not exceed the amount paid by you for the specific service giving rise to the claim in the preceding 90 days.
            </p>
          </section>

          <div className="divider-line" />

          <section>
            <h2 className="font-primary font-semibold text-title-lg text-white mb-4">8. Warranties</h2>
            <p className="text-secondary-text text-body-md font-secondary leading-relaxed">
              Our services are provided &ldquo;as is&rdquo; without warranties of any kind, express or implied, except as expressly stated in a written project agreement. We do not warrant that services will be uninterrupted, error-free, or that defects will be corrected within any specific timeframe.
            </p>
          </section>

          <div className="divider-line" />

          <section>
            <h2 className="font-primary font-semibold text-title-lg text-white mb-4">9. Termination</h2>
            <p className="text-secondary-text text-body-md font-secondary leading-relaxed">
              Either party may terminate a service engagement with written notice as specified in the relevant project agreement. We reserve the right to suspend or terminate access to our services immediately if you breach these Terms, without liability to you.
            </p>
          </section>

          <div className="divider-line" />

          <section>
            <h2 className="font-primary font-semibold text-title-lg text-white mb-4">10. Governing Law</h2>
            <p className="text-secondary-text text-body-md font-secondary leading-relaxed">
              These Terms are governed by the laws of the Federal Republic of Nigeria. Any disputes arising from these Terms shall first be attempted to be resolved through good-faith negotiation. If unresolved, disputes shall be submitted to the jurisdiction of Nigerian courts, unless otherwise agreed in writing.
            </p>
          </section>

          <div className="divider-line" />

          <section>
            <h2 className="font-primary font-semibold text-title-lg text-white mb-4">11. Changes to Terms</h2>
            <p className="text-secondary-text text-body-md font-secondary leading-relaxed">
              We may update these Terms at any time. We will notify users of material changes by posting a notice on our website. Continued use of our services after the effective date of changes constitutes acceptance of the updated Terms.
            </p>
          </section>

          <div className="divider-line" />

          <section>
            <h2 className="font-primary font-semibold text-title-lg text-white mb-4">12. Contact</h2>
            <p className="text-secondary-text text-body-md font-secondary leading-relaxed">
              For questions or concerns about these Terms, please contact:
            </p>
            <div className="mt-4 border border-divider p-6 space-y-2">
              <p className="text-white font-primary font-semibold text-body-md">Servers World Network</p>
              <p className="text-secondary-text text-body-sm font-secondary">Nigeria · Pan-Africa · Global</p>
              <a href="mailto:hello@serversworld.net" className="block text-white text-body-sm font-secondary hover:underline">
                hello@serversworld.net
              </a>
            </div>
          </section>

        </div>
      </div>

      {/* Footer CTA */}
      <div className="border-t border-divider bg-surface/20">
        <div className="page-container py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-secondary-text text-body-sm font-secondary">
            Also see our{' '}
            <Link href="/privacy" className="text-white underline underline-offset-2 hover:no-underline">
              Privacy Policy
            </Link>
            .
          </p>
          <Link href="/contact" className="btn-outline text-sm">CONTACT US</Link>
        </div>
      </div>
    </div>
  )
}
