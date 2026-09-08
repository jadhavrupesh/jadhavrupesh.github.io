export default function PixelComicStrip() {
  const panels = [
    { src: '/jules/comic-computer.png', alt: 'Writing software', label: 'Writing apps' },
    { src: '/jules/comic-bike.png', alt: 'Bike riding', label: 'Bike riding' },
    { src: '/jules/comic-book.png', alt: 'Reading a book', label: 'Reading docs' },
    { src: '/jules/comic-tennis.png', alt: 'Playing tennis', label: 'Playing tennis' },
  ];

  return (
    <section className="pixel-comic-section" aria-label="Lifestyle comic strip">
      <p className="pixel-comic-heading">
        More time for the apps you <span className="jules-underline-cyan">want</span> to ship, and everything else.
      </p>
      <div className="pixel-comic-grid">
        {panels.map((panel, idx) => (
          <div className="pixel-comic-card rounded-pixel-sm" key={idx}>
            <img
              src={panel.src}
              alt={panel.alt}
              width={220}
              height={220}
              loading="eager"
              className="pixelated-img"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
