import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className="hero hero--primary">
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div style={{display: 'flex', gap: '1rem', justifyContent: 'center'}}>
          <Link className="button button--secondary button--lg" to="/docs/intro">
            Read the docs
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/docs/runbooks/high-error-rate">
            Jump to a runbook
          </Link>
        </div>
      </div>
    </header>
  );
}

const features = [
  {
    title: 'Design',
    to: '/docs/design/architecture',
    description: (
      <>
        System architecture, the order lifecycle, and the design decisions
        (ADRs) behind the Acme Order Service — with an interactive order
        state stepper.
      </>
    ),
  },
  {
    title: 'SOPs',
    to: '/docs/sops/deploy-release',
    description: (
      <>
        Standard operating procedures: deploying a release through the
        canary pipeline and rotating API gateway credentials without
        dropping traffic.
      </>
    ),
  },
  {
    title: 'Runbooks',
    to: '/docs/runbooks/high-error-rate',
    description: (
      <>
        Incident response for the high-error-rate alert: fast-path
        mitigation, diagnostics with highlighted commands, and a decision
        flowchart.
      </>
    ),
  },
];

function HomepageFeatures() {
  return (
    <section className="container padding--xl" style={{maxWidth: '960px'}}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
        }}>
        {features.map((feature) => (
          <Link
            key={feature.title}
            to={feature.to}
            style={{
              display: 'block',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid rgba(0,0,0,0.12)',
              background: 'var(--ifm-card-background-color, rgba(0,0,0,0.02))',
              color: 'inherit',
              textDecoration: 'none',
            }}>
            <h3 style={{marginTop: 0}}>{feature.title}</h3>
            <p>{feature.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
