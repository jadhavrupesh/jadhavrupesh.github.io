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
      <section className="w-full md:p-0 relative max-w-screen-lg md:overflow-visible overflow-x-hidden mx-auto md:min-h-[30vh]" aria-labelledby="pixel-title">
        <PixelHeroLogo />
      </section>

      {/* 2. Interactive Code Editor with Task Card, Diff View, Thought Bubble & Mascot */}
      <section className="w-full md:p-0 relative max-w-screen-lg md:overflow-visible overflow-x-hidden mx-auto -mt-4 relative min-h-[37vh] md:min-h-[65vh]">
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
