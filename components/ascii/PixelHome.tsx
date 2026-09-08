import PixelHeroLogo from './PixelHeroLogo';
import PixelCodeEditor from './PixelCodeEditor';
import PixelCenterpiece from './PixelCenterpiece';
import PixelFeaturedProjects from './PixelFeaturedProjects';
import PixelPlans from './PixelPlans';
import PixelCircuitMaze from './PixelCircuitMaze';

export default function PixelHome() {
  return (
    <>
      {/* 1. Jules-style Monospace ASCII Hero Section */}
      <section className="w-full md:p-0 relative max-w-screen-lg md:overflow-visible overflow-x-hidden mx-auto pt-3 pb-2 md:pt-6 md:pb-3" aria-labelledby="pixel-title">
        <PixelHeroLogo />
      </section>

      {/* 2. Interactive Code Editor with Task Card, Diff View, Thought Bubble & Mascot */}
      <section className="w-full md:p-0 relative max-w-screen-lg md:overflow-visible overflow-x-hidden mx-auto relative">
        <PixelCodeEditor />
      </section>

      {/* 3. Core Engineering Pillars & Capabilities */}
      <PixelCenterpiece />

      {/* 4. Featured Mobile & Multiplatform Production Projects */}
      <PixelFeaturedProjects />

      {/* 5. How We Can Collaborate - Engagement Models */}
      <PixelPlans />

      {/* 7. Bottom Clean CTA Section */}
      <PixelCircuitMaze />
    </>
  );
}
