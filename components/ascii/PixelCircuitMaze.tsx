import { Link } from 'react-router-dom';
import PixelWaveCanvas from './PixelWaveCanvas';

export default function PixelCircuitMaze() {
  return (
    <div className="w-full md:p-0 relative max-w-screen-lg md:overflow-visible overflow-x-hidden mx-auto my-10 max-w-screen-xl">
      <PixelWaveCanvas
        className="pb-2 !m-0"
        enableFish={false}
        animateVariants={true}
        variantChance={0.15}
        basePatternIndex={3}
        maxPixelSize={7}
        waveAmplitude={2.5}
        waveFrequency={2}
        waveVerticalOffset={4.3}
        enableWaveTop={true}
        dotColor="#36087b"
      >
        <section
          className="flex flex-row items-center justify-center min-h-[22vh] py-8"
          aria-label="Bottom call to action"
        >
          <div className="relative z-10 flex flex-col gap-4 items-center justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm md:text-base font-bold transition-all bg-[#784fcf] text-purple-50 hover:bg-[#8860e8] hover:shadow-[0_0_12px_rgba(120,79,207,0.5)] focus:outline-none cursor-pointer pixel-cta-btn"
            >
              Hire Me — Let&apos;s Build Together
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm md:text-base font-bold transition-all bg-[#fdf4ff] !text-[#701a75] hover:bg-white hover:shadow-[0_0_12px_rgba(253,244,255,0.6)] focus:outline-none cursor-pointer pixel-cta-btn"
            >
              See My Projects ↗
            </Link>
          </div>
        </section>
      </PixelWaveCanvas>
    </div>
  );
}
