
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Navigation } from './components/Navigation';
import { SmoothScroll } from './components/SmoothScroll';
// import { Experience } from './components/Experience';
import { Contact } from './components/Contact';

export default function App() {
  return (
    <SmoothScroll>
      <div id="top" className="min-h-screen bg-white">
        <Navigation />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          {/* <Experience /> */}
          <Contact />
        </main>
      </div>
    </SmoothScroll>
  );
}
