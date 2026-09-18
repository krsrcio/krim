
import { useEffect, useState } from 'react';

import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Navigation } from './components/Navigation';
import { SmoothScroll } from './components/SmoothScroll';
import { Contact } from './components/Contact';
import { ProjectShowcase } from './components/ProjectShowcase';
import { demoIds, type DemoId } from './components/demos/types';

function getDemoFromHash(hash: string): DemoId | null {
  const match = hash.match(/^#\/projects\/([^/]+)\/?$/);
  const candidate = match?.[1] as DemoId | undefined;
  return candidate && demoIds.includes(candidate) ? candidate : null;
}

export default function App() {
  const [activeDemo, setActiveDemo] = useState(() => getDemoFromHash(window.location.hash));

  useEffect(() => {
    function syncRoute() {
      const nextDemo = getDemoFromHash(window.location.hash);
      const isReturningToPortfolio = activeDemo !== null && nextDemo === null;

      setActiveDemo(nextDemo);

      if (nextDemo) {
        window.scrollTo(0, 0);
      } else if (isReturningToPortfolio) {
        window.requestAnimationFrame(() => {
          document.getElementById(`project-${activeDemo}`)?.scrollIntoView({ block: 'start' });
        });
      }
    }

    window.addEventListener('hashchange', syncRoute);
    return () => window.removeEventListener('hashchange', syncRoute);
  }, [activeDemo]);

  if (activeDemo) return <ProjectShowcase demo={activeDemo} />;

  return (
    <SmoothScroll>
      <div id="top" className="min-h-screen bg-white">
        <Navigation />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
      </div>
    </SmoothScroll>
  );
}
