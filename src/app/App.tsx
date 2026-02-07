
import { useEffect, useState } from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { PetPal } from './components/PetPal';
import { Navigation } from './components/Navigation';
// import { Experience } from './components/Experience';
import { Contact } from './components/Contact';

export default function App() {
  const [showPetPal, setShowPetPal] = useState(false);

  useEffect(() => {
    if (!showPetPal) {
      return;
    }

    const scrollToPetPal = () => {
      const section = document.getElementById('petpal');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        return true;
      }
      return false;
    };

    if (scrollToPetPal()) {
      return;
    }

    const timeout = window.setTimeout(scrollToPetPal, 60);
    return () => window.clearTimeout(timeout);
  }, [showPetPal]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation showPetPal={showPetPal} />
      <Hero />
      <About />
      <Skills />
      <Projects onOpenPetPal={() => setShowPetPal(true)} />
      {showPetPal ? <PetPal /> : null}
      {/* <Experience /> */}
      <Contact />
    </div>
  );
}
