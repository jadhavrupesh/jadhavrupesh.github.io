import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BootSequence } from './components/ascii/BootSequence';
import RetroShell from './components/layout/RetroShell';
import HomePage from './pages/HomePage';
import ExperiencePage from './pages/ExperiencePage';
import SkillsPage from './pages/SkillsPage';
import GamePage from './pages/GamePage';
import MusicPage from './pages/MusicPage';
import ContactPage from './pages/ContactPage';

const App: React.FC = () => {
    const [booted, setBooted] = useState(false);

    return (
        <>
            {!booted && <BootSequence onComplete={() => setBooted(true)} />}
            {booted && (
                <Router>
                    <Routes>
                        <Route element={<RetroShell />}>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/experience" element={<ExperiencePage />} />
                            <Route path="/skills" element={<SkillsPage />} />
                            <Route path="/game" element={<GamePage />} />
                            <Route path="/music" element={<MusicPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                        </Route>
                    </Routes>
                </Router>
            )}
        </>
    );
};

export default App;
