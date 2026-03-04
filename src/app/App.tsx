
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Navigation } from './components/Navigation';
// import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { VisitCounter } from './components/VisitCounter';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      {/* <Experience /> */}
      <Contact />
      <VisitCounter />
    </div>
  );
}
