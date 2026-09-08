import { useState } from 'react';
import PixelWaveCanvas from './PixelWaveCanvas';
import { FeatureIcon1, FeatureIcon2, FeatureIcon3, RocketDeployIcon } from './JulesIcons';

type HoveredZone = 'tl' | 'tr' | 'bl' | 'br' | null;

const FISH_COLORS = ['#52e7fb', '#f472b6', '#a78bfa'];

export default function PixelCenterpiece() {
  const [hoveredCard, setHoveredCard] = useState<HoveredZone>(null);
  const [showBrain, setShowBrain] = useState(false);

  const features = [
    {
      id: 'tl' as const,
      title: 'Clean Architecture',
      description: 'Flutter & Android codebases structured with MVVM, domain/data/presentation layers, DI, and zero-regression state management.',
      icon: <FeatureIcon1 className="w-10 h-10 md:w-8 text-fuchsia-400" />,
    },
    {
      id: 'tr' as const,
      title: 'Cross-Platform & Native',
      description: 'Pixel-perfect 60fps experiences across iOS, Android & web — using Flutter and Kotlin Multiplatform (KMP) from a single codebase.',
      icon: <FeatureIcon3 className="w-10 h-10 md:w-8 text-amber-400" />,
    },
    {
      id: 'bl' as const,
      title: 'Security & Performance',
      description: 'Token management, VAPT hardening, DevTools profiling, and frame-drop optimization for banking & enterprise-grade apps.',
      icon: <FeatureIcon2 className="w-10 h-10 md:w-8 text-cyan-400" />,
    },
    {
      id: 'br' as const,
      title: 'CI/CD & Store Delivery',
      description: 'Automated Codemagic & GitHub Actions pipelines with Fastlane for frictionless Google Play & App Store deployment.',
      icon: <RocketDeployIcon className="w-10 h-10 md:w-8 text-purple-400" />,
    },
  ];

  return (
    <div className="w-full my-5 md:my-0">
      {/* Section Header */}
      <div className="text-center mb-4 md:mb-6">
        <p className="text-[10px] tracking-[2px] text-cyan-400 font-bold mb-1 uppercase font-mono">
          What I Bring to Your Team
        </p>
        <p className="text-sm md:text-lg text-purple-100 font-mono">
          Senior mobile expertise in <span className="font-bold text-white">Flutter, Kotlin & KMP</span>.
        </p>
      </div>

      <PixelWaveCanvas
        className="relative w-full h-full pb-20 overflow-hidden"
        enableWaveTop={true}
        waveAmplitude={2}
        waveFrequency={2}
        waveVerticalOffset={4}
        maxPixelSize={6}
        numFish={6}
        fishColors={FISH_COLORS}
        enableFish={true}
        animateVariants={true}
        variantChance={0.12}
        basePatternIndex={0}
        dotColor="#36087b"
      >
        <div className="w-full md:p-0 relative max-w-screen-lg md:overflow-visible overflow-x-hidden mx-auto relative content flex flex-col items-center justify-center text-amber-50 max-w-screen-xl !overflow-hidden h-full p-2 min-h-[50vh]">
          {/* Central Squid Mascot - Exact Jules Proportions (640px wide, centered, head rises into top gap) */}
          <div className="md:absolute top-20 left-1/2 -translate-x-1/2 w-full h-auto md:max-w-[50%] max-w-[65%] flex items-center justify-center z-10">
            {/* Brain Lore Trigger */}
            <span
              className="hidden brain-trigger md:block w-30 h-42 absolute left-[50%] top-[20%] -translate-y-1/2 cursor-pointer z-30"
              onMouseEnter={() => setShowBrain(true)}
              onMouseLeave={() => setShowBrain(false)}
              onClick={() => setShowBrain(prev => !prev)}
              aria-label="Secret brain lore"
            />
            <div
              className={`brain-label w-full h-full !absolute left-[25%] top-[40%] -translate-y-1/2 transition-all duration-300 pointer-events-none md:max-w-[300px] z-50 ${
                showBrain
                  ? 'opacity-100 scale-100 rotate-0'
                  : 'opacity-0 scale-75 rotate-12'
              }`}
            >
              <div className="p-5 bg-[#1e053a] text-purple-100 font-mono text-xs pixel-bubble-thought">
                <p>
                  Brought to life with <span className="font-bold text-cyan-400">Flutter, Kotlin & precision</span>.
                </p>
              </div>
            </div>

            <img
              src="/jules/squid.png"
              width="640"
              height="640"
              alt="Squid"
              className="h-full w-full order-first aspect-square md:order-none pixelated-img drop-shadow-[0_0_35px_rgba(120,79,207,0.35)]"
            />
          </div>

          {/* 4 Cards Container - Exact Jules 2x2 Frame Structure (md:mt-[280px] margin-top) */}
          <div className="flex flex-row flex-wrap justify-between w-full p-4 md:mt-[280px] z-20">
            {/* Top Row: Left & Right */}
            <div className="md:flex md:flex-row justify-between w-full">
              {/* Card TL */}
              <div
                className={`w-full md:mb-4 bubble-tl md:max-w-[300px] relative z-12 transition-transform duration-200 ${
                  hoveredCard === 'tl' ? '-translate-y-1' : ''
                }`}
                onMouseEnter={() => setHoveredCard('tl')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`p-6 bg-[#160630] text-purple-200 cap-bubble text-sm md:text-base items-center md:items-start flex flex-row gap-6 md:flex-col md:gap-2 transition-all duration-200 ${
                    hoveredCard === 'tl' ? 'scale-102 ring-cyan-400' : ''
                  }`}
                >
                  {features[0].icon}
                  <div className="w-full flex flex-col gap-2">
                    <strong className="text-purple-50 font-black">{features[0].title}</strong>
                    <p className="text-purple-200 text-xs md:text-sm md:font-medium leading-relaxed">
                      {features[0].description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card TR */}
              <div
                className={`w-full md:mb-4 bubble-tr md:max-w-[300px] relative z-12 transition-transform duration-200 ${
                  hoveredCard === 'tr' ? '-translate-y-1' : ''
                }`}
                onMouseEnter={() => setHoveredCard('tr')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`p-6 bg-[#160630] text-purple-200 cap-bubble text-sm md:text-base items-center md:items-start flex flex-row gap-6 md:flex-col md:gap-2 transition-all duration-200 ${
                    hoveredCard === 'tr' ? 'scale-102 ring-cyan-400' : ''
                  }`}
                >
                  {features[1].icon}
                  <div className="w-full flex flex-col gap-2">
                    <strong className="text-purple-50 font-black">{features[1].title}</strong>
                    <p className="text-purple-200 text-xs md:text-sm md:font-medium leading-relaxed">
                      {features[1].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: Left & Right */}
            <div className="md:flex md:flex-row justify-between gap-4 w-full">
              {/* Card BL */}
              <div
                className={`w-full md:mb-4 bubble-bl md:max-w-[300px] relative z-12 transition-transform duration-200 ${
                  hoveredCard === 'bl' ? '-translate-y-1' : ''
                }`}
                onMouseEnter={() => setHoveredCard('bl')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`p-6 bg-[#160630] text-purple-200 cap-bubble text-sm md:text-base items-center md:items-start flex flex-row gap-6 md:flex-col md:gap-2 transition-all duration-200 ${
                    hoveredCard === 'bl' ? 'scale-102 ring-cyan-400' : ''
                  }`}
                >
                  {features[2].icon}
                  <div className="w-full flex flex-col gap-2">
                    <strong className="text-purple-50 font-black">{features[2].title}</strong>
                    <p className="text-purple-200 text-xs md:text-sm md:font-medium leading-relaxed">
                      {features[2].description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card BR */}
              <div
                className={`w-full md:mb-4 bubble-br md:max-w-[300px] relative z-12 transition-transform duration-200 ${
                  hoveredCard === 'br' ? '-translate-y-1' : ''
                }`}
                onMouseEnter={() => setHoveredCard('br')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`p-6 bg-[#160630] text-purple-200 cap-bubble text-sm md:text-base items-center md:items-start flex flex-row gap-6 md:flex-col md:gap-2 transition-all duration-200 ${
                    hoveredCard === 'br' ? 'scale-102 ring-cyan-400' : ''
                  }`}
                >
                  {features[3].icon}
                  <div className="w-full flex flex-col gap-2">
                    <strong className="text-purple-50 font-black">{features[3].title}</strong>
                    <p className="text-purple-200 text-xs md:text-sm md:font-medium leading-relaxed">
                      {features[3].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PixelWaveCanvas>
    </div>
  );
}
