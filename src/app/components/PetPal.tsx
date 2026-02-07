import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Gamepad2, Heart, Sparkles, Users } from "lucide-react";

const features = [
  {
    title: "Pet Name Customization",
    description: "Players personalize their experience by naming their pet.",
    icon: Sparkles,
  },
  {
    title: "Basic Care",
    description:
      "Feed, bathe, and let your pet rest to keep it healthy and happy.",
    icon: Heart,
  },
  {
    title: "Mini-Game Rewards",
    description:
      "Play a mini-game to keep the pet entertained and earn coins.",
    icon: Gamepad2,
  },
  {
    title: "Pet Interaction",
    description: "Enjoy playtime and simple activities with toys.",
    icon: Users,
  },
];

const teamMembers = [
  "Castres, Kristine D.",
  "Lappay, Terrence P.",
  "Moyano, Dirk Stephen J.",
  "Po, Jorose T.",
  "Rosario, James Laurence D.",
];

export function PetPal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="petpal"
      ref={ref}
      className="min-h-screen flex items-center px-6 py-24 bg-neutral-950 text-white"
    >
      <div className="max-w-6xl mx-auto w-full space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center"
        >
          <div className="space-y-6">
            <p className="text-sm tracking-[0.3em] uppercase text-neutral-400">
              Mobile Game Concept
            </p>
            <h2
              className="text-4xl md:text-6xl tracking-tight"
              style={{ fontWeight: 700 }}
            >
              Pet Pal
            </h2>
            <p className="text-lg text-neutral-300 leading-relaxed">
              An interactive 2D 8-bit mobile game where players adopt and care
              for a virtual pet.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-neutral-300">
              <span className="border border-neutral-700 px-3 py-1.5 uppercase tracking-wider">
                BSIT2 - BLK #2
              </span>
              <span className="border border-neutral-700 px-3 py-1.5 uppercase tracking-wider">
                October 2024
              </span>
            </div>
          </div>

          <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6">
            <div className="flex items-center gap-6">
              <img
                src="public/petpal.png"
                alt="Pet Pal logo"
                className="w-32 h-32 object-contain"
                loading="lazy"
              />
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
                  Team Members
                </p>
                <ul className="mt-3 space-y-1 text-neutral-300 text-sm">
                  {teamMembers.map((member) => (
                    <li key={member}>{member}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start"
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl md:text-3xl tracking-tight mb-4">
                Overview
              </h3>
              <p className="text-neutral-300 leading-relaxed">
                &quot;Pet Pal&quot; is an interactive 2D 8-bit mobile game where
                players adopt and care for a virtual pet. Players nurture their
                pet by feeding, grooming, playing, and ensuring its overall
                well-being. The game blends fun, responsibility, and creativity
                for children and casual gamers.
              </p>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl tracking-tight mb-4">
                Objectives
              </h3>
              <ul className="space-y-3 text-neutral-300 leading-relaxed">
                <li>
                  Provide an engaging experience where players develop a bond
                  with their virtual pet.
                </li>
                <li>
                  Create a simple, visually appealing environment with
                  intuitive controls for all age groups.
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6">
            <img
              src="public/petpal1.png"
              alt="Pet Pal gameplay screen"
              className="w-full rounded-xl border border-neutral-800 object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <h3 className="text-2xl md:text-3xl tracking-tight">
            Key Features
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="border border-neutral-800 bg-neutral-900/40 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Icon size={20} className="text-neutral-200" />
                    <h4 className="text-lg tracking-tight">
                      {feature.title}
                    </h4>
                  </div>
                  <p className="text-neutral-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
