export default function PixelPipeline() {
  return (
    <section className="pixel-pipeline-section" aria-label="Development Pipeline Steps">
      {/* Divider 1 */}
      <div className="pixel-dither-strip pattern-dot-three" aria-hidden="true" />

      {/* Step 1 */}
      <div className="pixel-step-row">
        <div className="pixel-step-info">
          <div className="pixel-step-badge bg-fuchsia-600">1</div>
          <div className="pixel-step-text">
            <h3>Scope, architecture & module plan.</h3>
            <p>Define target platforms, state management strategy, and Clean Architecture layer boundaries.</p>
          </div>
        </div>
        <div className="pixel-step-interactive rounded-pixel-sm">
          <div className="pixel-dots-bar">
            <span className="dot-fuchsia" />
            <span className="dot-amber" />
            <span className="dot-cyan" />
          </div>
          <div className="pixel-select-row">
            <div className="pixel-select-box">
              <span>@rupesh/flutter-core</span>
              <span className="pixel-arrow-down">▼</span>
            </div>
            <div className="pixel-select-box">
              <span>main</span>
              <span className="pixel-arrow-down">▼</span>
            </div>
          </div>
          <div className="pixel-prompt-box">
            <span>Implement offline-first BLoC repository with Clean Architecture layers</span>
          </div>
        </div>
      </div>

      {/* Divider 2 */}
      <div className="pixel-dither-strip pattern-dot-three" aria-hidden="true" />

      {/* Step 2 */}
      <div className="pixel-step-row">
        <div className="pixel-step-info">
          <div className="pixel-step-badge bg-amber-500">2</div>
          <div className="pixel-step-text">
            <h3>Feature build & code review.</h3>
            <p>Each feature is built in decoupled domain, data, and presentation layers — with PR review standards enforced.</p>
          </div>
        </div>
        <div className="pixel-step-interactive pixel-step-plan">
          <div className="pixel-plan-bubble-wrapper">
            <img
              src="/jules/jules-avatar-profile.png"
              alt="Rupesh Jadhav"
              width={48}
              height={48}
              className="pixel-avatar-peeking pixelated-img"
            />
            <div className="pixel-pipeline-plan-card rounded-pixel-sm">
              <strong className="text-purple-950 font-bold block mb-1">Architecture Plan:</strong>
              <p className="text-purple-900 text-xs leading-relaxed">
                Refactor data layer into modular repository with local Room cache and Dio interceptor.
              </p>
              <div className="pixel-plan-badge rounded-pixel-sm">
                <span>Update 14 files</span>
                <span className="text-[10px]">▼</span>
              </div>
            </div>
          </div>
          <div className="pixel-user-reply-row">
            <div className="pixel-user-reply rounded-pixel-sm">
              <span>Architecture approved — ship to staging!</span>
            </div>
            <img
              src="/jules/you-avatar.png"
              alt="Client / Product Owner"
              width={40}
              height={40}
              className="pixelated-img rounded"
            />
          </div>
        </div>
      </div>

      {/* Divider 3 */}
      <div className="pixel-dither-strip pattern-dot-three" aria-hidden="true" />

      {/* Step 3 */}
      <div className="pixel-step-row">
        <div className="pixel-step-info">
          <div className="pixel-step-badge bg-cyan-500">3</div>
          <div className="pixel-step-text">
            <h3>Test, profile & VAPT checks.</h3>
            <p>Unit, widget & integration tests pass green. DevTools profiling ensures 60fps. VAPT fixes applied.</p>
          </div>
        </div>
        <div className="pixel-step-interactive pixel-diff-viewer rounded-pixel-sm">
          <div className="pixel-diff-line line-dim">
            <span className="diff-ln">9</span>
            <code>dependencies:</code>
          </div>
          <div className="pixel-diff-line line-dim">
            <span className="diff-ln">10</span>
            <code>  flutter:</code>
          </div>
          <div className="pixel-diff-line line-dim">
            <span className="diff-ln">11</span>
            <code>    sdk: flutter</code>
          </div>
          <div className="pixel-diff-line line-del">
            <span className="diff-ln">12 -</span>
            <code>  provider: ^6.1.2</code>
          </div>
          <div className="pixel-diff-line line-add">
            <span className="diff-ln">12 +</span>
            <code>  flutter_bloc: ^8.1.4</code>
          </div>
          <div className="pixel-diff-line line-add">
            <span className="diff-ln">13 +</span>
            <code>  freezed_annotation: ^2.4.4</code>
          </div>
          <div className="pixel-diff-line line-dim">
            <span className="diff-ln">14</span>
            <code>  dio: ^5.8.0</code>
          </div>
        </div>
      </div>

      {/* Divider 4 */}
      <div className="pixel-dither-strip pattern-dot-three" aria-hidden="true" />

      {/* Step 4 */}
      <div className="pixel-step-row">
        <div className="pixel-step-info">
          <div className="pixel-step-badge bg-purple-600">4</div>
          <div className="pixel-step-text">
            <h3>CI/CD pipeline & store release.</h3>
            <p>Codemagic automates builds, signs binaries, writes release notes, and pushes to Google Play & TestFlight.</p>
          </div>
        </div>
        <div className="pixel-step-interactive pixel-publish-card rounded-pixel-sm">
          <button className="pixel-publish-btn rounded-pixel-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>Publish Release to Stores</span>
          </button>
        </div>
      </div>
    </section>
  );
}
