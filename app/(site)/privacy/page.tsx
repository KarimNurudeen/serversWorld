import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Privacy Policy' }

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-divider">
        <div className="page-container py-16">
          <p className="section-label mb-4">LEGAL</p>
          <h1 className="text-headline-md font-primary font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-secondary-text text-body-md font-secondary">
            Last updated: January 1, 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="page-container py-16">
        <div className="max-w-3xl space-y-12">

          <section>
            <h2 className="font-primary font-semibold text-title-lg text-white mb-4">1. Introduction</h2>
            <p className="text-secondary-text text-body-md font-secondary leading-relaxed">
              Servers World Network (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our website and services.
            </p>
          </section>

          <div className="divider-line" />

          <section>
            <h2 className="font-primary font-semibold text-title-lg text-white mb-4">2. Information We Collect</h2>
            <p className="text-secondary-text text-body-md font-secondary leading-relaxed mb-4">
              We may collect the following categories of information:
            </p>
            <ul className="space-y-3">
              {[
                { title: 'Contact Information', desc: 'Name, email address, phone number, and company name when you fill out forms or contact us.' },
                { title: 'Usage Data', desc: 'Pages visited, time spent, referring URLs, browser type, and device information collected automatically.' },
                { title: 'Communications', desc: 'Content of messages you send us via contact forms, email, or other channels.' },
                { title: 'Payment Information', desc: 'Billing details processed securely through our payment provider. We do not store card numbers.' },
              ].map((item) => (
                <li key={item.title} className="border border-divider p-5">
                  <p className="font-primary font-semibold text-body-md text-white mb-1">{item.title}</p>
                  <p className="text-secondary-text text-body-sm font-secondary leading-relaxed">{item.desc}</p>
                </li>
              ))}
            </ul>
          </section>

          <div className="divider-line" />

          <section>
            <h2 className="font-primary font-semibold text-title-lg text-white mb-4">3. How We Use Your Information</h2>
            <p className="text-secondary-text text-body-md font-secondary leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="space-y-2 text-secondary-text text-body-md font-secondary">
              {[
                'Deliver and improve our services',
                'Respond to inquiries and provide customer support',
                'Send service updates, newsletters, and promotional communications (with your consent)',
                'Process transactions and send related information',
                'Analyse usage patterns to enhance user experience',
                'Comply with legal obligations',
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
            <h2 className="font-primary font-semibold text-title-lg text-white mb-4">4. Sharing of Information</h2>
            <p className="text-secondary-text text-body-md font-secondary leading-relaxed">
              We do not sell your personal data. We may share your information with trusted third-party service providers (hosting, analytics, payment processors) solely to operate our business, under confidentiality obligations. We may also disclose information when required by law or to protect our legal rights.
            </p>
          </section>

          <div className="divider-line" />

          <section>
            <h2 className="font-primary font-semibold text-title-lg text-white mb-4">5. Cookies</h2>
            <p className="text-secondary-text text-body-md font-secondary leading-relaxed">
              We use cookies and similar tracking technologies to enhance your experience. Essential cookies are required for the site to function. Analytics cookies help us understand usage patterns. You can control cookie preferences through your browser settings; note that disabling certain cookies may affect site functionality.
            </p>
          </section>

          <div className="divider-line" />

          <section>
            <h2 className="font-primary font-semibold text-title-lg text-white mb-4">6. Data Retention</h2>
            <p className="text-secondary-text text-body-md font-secondary leading-relaxed">
              We retain personal data only as long as necessary to fulfil the purposes outlined in this policy, or as required by law. Contact inquiries are retained for up to 3 years. Newsletter subscriptions are retained until you unsubscribe.
            </p>
          </section>

          <div className="divider-line" />

          <section>
            <h2 className="font-primary font-semibold text-title-lg text-white mb-4">7. Your Rights</h2>
            <p className="text-secondary-text text-body-md font-secondary leading-relaxed mb-4">
              Depending on your jurisdiction, you may have the right to:
            </p>
            <ul className="space-y-2 text-secondary-text text-body-md font-secondary">
              {[
                'Access the personal data we hold about you',
                'Request correction of inaccurate data',
                'Request deletion of your data',
                'Object to or restrict certain processing',
                'Data portability',
                'Withdraw consent at any time',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-white/40 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-secondary-text text-body-md font-secondary leading-relaxed mt-4">
              To exercise these rights, contact us at{' '}
              <a href="mailto:hello@serversworld.net" className="text-white underline underline-offset-2 hover:no-underline">
                hello@serversworld.net
              </a>
              .
            </p>
          </section>

          <div className="divider-line" />

          <section>
            <h2 className="font-primary font-semibold text-title-lg text-white mb-4">8. Security</h2>
            <p className="text-secondary-text text-body-md font-secondary leading-relaxed">
              We implement industry-standard security measures including encryption in transit (HTTPS), access controls, and regular security reviews. No method of transmission over the internet is 100% secure; we cannot guarantee absolute security but are committed to protecting your data.
            </p>
          </section>

          <div className="divider-line" />

          <section>
            <h2 className="font-primary font-semibold text-title-lg text-white mb-4">9. Changes to This Policy</h2>
            <p className="text-secondary-text text-body-md font-secondary leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated date. Continued use of our services after changes constitutes acceptance.
            </p>
          </section>

          <div className="divider-line" />

          <section>
            <h2 className="font-primary font-semibold text-title-lg text-white mb-4">10. Contact Us</h2>
            <p className="text-secondary-text text-body-md font-secondary leading-relaxed">
              If you have any questions about this Privacy Policy, please reach out:
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
            <Link href="/terms" className="text-white underline underline-offset-2 hover:no-underline">
              Terms of Service
            </Link>
            .
          </p>
          <Link href="/contact" className="btn-outline text-sm">CONTACT US</Link>
        </div>
      </div>
    </div>
  )
}
