import { Link } from 'react-router-dom';

export default function PixelPlans() {
  const tiers = [
    {
      title: 'Flutter Dev',
      badgeImg: '/jules/plan-01.png',
      tag: 'FEATURE WORK',
      subtitle: 'Need a Flutter developer to ship new features fast, with solid UI and clean code?',
      points: [
        'Flutter & native Android feature development',
        'Pixel-perfect Figma-to-Flutter UI',
        'REST & GraphQL backend integration',
        'BLoC / Riverpod state management',
      ],
    },
    {
      title: 'Senior Architect',
      badgeImg: '/jules/plan-02.gif',
      tag: 'ARCHITECTURE',
      subtitle: 'Need your app re-architected, migrated to KMP, or hardened for banking-grade security?',
      points: [
        'Clean Architecture & multi-module setup',
        'Kotlin Multiplatform (KMP) migration',
        'VAPT hardening & security review',
        'DevTools profiling & 60fps optimization',
      ],
    },
    {
      title: 'Lead & Deliver',
      badgeImg: '/jules/plan-03.gif',
      tag: 'END-TO-END',
      subtitle: 'Want the full package — from architecture to App Store — with CI/CD and mentoring?',
      points: [
        'Full app lifecycle: scope → release',
        'Codemagic & GitHub Actions CI/CD',
        'Unit, widget & integration test coverage',
        'Tech mentoring & PR review standards',
      ],
    },
  ];

  return (
    <section id="plans" className="pixel-plans-section" aria-label="Engagement models and collaboration">
      <div className="pixel-plans-header">
        <p className="pixel-plans-tag">HOW WE CAN COLLABORATE</p>
        <h2>Choose the model that fits your team.</h2>
        <p className="pixel-plans-sub">
          From targeted feature execution to high-scale architecture consulting and complete App Store delivery across FinTech, Banking, Hospitality & Logistics.
        </p>
      </div>

      <div className="pixel-plans-grid">
        {tiers.map((tier, idx) => (
          <div className="pixel-plan-card rounded-pixel-sm" key={idx}>
            <div className="pixel-plan-card-top">
              <div className="pixel-plan-title-row">
                <h3 className="text-white font-bold text-lg">{tier.title}</h3>
                <img
                  src={tier.badgeImg}
                  alt="Level indicator"
                  width={51}
                  height={20}
                  className="pixelated-img"
                />
              </div>
              <span className="pixel-plan-pill">{tier.tag}</span>
              <p className="pixel-plan-desc">{tier.subtitle}</p>
            </div>
            <ul className="pixel-plan-points">
              {tier.points.map((pt, pIdx) => (
                <li key={pIdx}>
                  <span className="bullet-dot" aria-hidden="true">■</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="pixel-plan-cta rounded-pixel-sm">
              Let&apos;s Connect ↗
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
