import type { DemoId } from '../components/demos/types';

export type Project = {
  title: string;
  category: string;
  theme: {
    page: string;
    header: string;
    hero: string;
    live: string;
    panel: string;
    text: string;
    muted: string;
    border: string;
    accent: string;
    accentText: string;
    accentSoft: string;
    heroText: string;
  };
  description: string;
  story: string;
  role: string;
  focus: string;
  highlights: string[];
  contributions: string[];
  challenge: string;
  takeaway: string;
  tech: string[];
  demo: DemoId;
  github?: string;
  image?: string;
  imageAlt?: string;
  imageBackground?: 'dark';
};

export const projects: Project[] = [
  {
    title: 'Baskit',
    category: 'Mobile grocery service',
    theme: {
      page: '#ffffff', header: '#ffffff', hero: '#16803f', live: '#ffffff', panel: '#ffffff', text: '#143b25', muted: '#54705d', border: '#cce7d2', accent: '#16803f', accentText: '#ffffff', accentSoft: '#ffffff', heroText: '#ffffff',
    },
    description: 'Baskit is a fast and convenient service that lets busy users create a grocery list, generate a code, and have a trusted Tagabili shop and prepare their items for easy pickup at a branch.',
    story: 'The goal was to make the jump from grocery list to branch pickup feel quick and uncomplicated.',
    role: 'Full-stack developer, Mobile app designer',
    focus: 'Grocery-list creation and branch pickup flow',
    highlights: ['Build a grocery list in moments.', 'Generate a pickup code for a trusted shopper.', 'Keep branch pickup clear and convenient.'],
    contributions: ['Designed the mobile grocery-list experience.', 'Built the list and pickup-code flow.', 'Worked across the app and supporting backend.'],
    challenge: 'Keeping list creation and the shopper handoff simple enough to understand at a glance.',
    takeaway: 'A clear pickup code gives both sides of the handoff one shared reference point.',
    tech: ['Jetpack Compose', 'PHP', 'Kotlin'],
    demo: 'baskit',
    github: 'https://github.com/krsrcio/Baskit',
    image: '/baskit_logo.png',
    imageAlt: 'Baskit application logo',
  },
  {
    title: 'PetPal',
    category: '2D virtual-pet game',
    theme: {
      page: '#ffffff', header: '#ffffff', hero: '#df5a52', live: '#ffffff', panel: '#ffffff', text: '#482e20', muted: '#886557', border: '#f0d7b4', accent: '#df5a52', accentText: '#ffffff', accentSoft: '#ffffff', heroText: '#ffffff',
    },
    description: 'PetPal is a fun and interactive 2D 8-bit mobile game where players adopt their own virtual pet, take care of it by feeding, grooming, playing, and keeping their pet happy and healthy.',
    story: 'PetPal is about the small routines that make a virtual pet feel like a companion.',
    role: 'Full-stack developer, Game designer',
    focus: 'Virtual-pet care gameplay and player interaction',
    highlights: ['Adopt and care for a virtual companion.', 'Feed, groom, and play to improve pet stats.', 'Use simple, expressive 8-bit interactions.'],
    contributions: ['Designed the main pet-care loop.', 'Built the game interactions and supporting systems.', 'Shaped the 8-bit player experience.'],
    challenge: 'Making the care loop feel rewarding without overwhelming the player with systems.',
    takeaway: 'Small, visible changes to a pet’s needs make each interaction feel meaningful.',
    tech: ['Unity', 'MySQL', 'C#'],
    demo: 'petpal',
    github: 'https://github.com/krsrcio/Petpal',
    image: '/petpal.png',
    imageAlt: 'PetPal virtual logo',
  },
  {
    title: 'DermaScan',
    category: 'Skin-journal mobile app',
    theme: {
      page: '#ffffff', header: '#ffffff', hero: '#006b70', live: '#ffffff', panel: '#ffffff', text: '#006b70', muted: '#006b70', border: '#006b70', accent: '#006b70', accentText: '#ffffff', accentSoft: '#ffffff', heroText: '#ffffff',
    },
    description: 'DermaScan is a mobile application that allows users to take photos of their skin and get an analysis of potential skin conditions using AI-powered image recognition.',
    story: 'DermaScan turns a photo check-in into a clearer personal record that users can revisit over time.',
    role: 'Mobile app developer, Database manager',
    focus: 'AI-assisted skin analysis from user-captured photos',
    highlights: ['Capture and organize skin-photo entries.', 'Use image recognition to support personal monitoring.', 'Keep a clear journal of scan activity.'],
    contributions: ['Built the mobile app experience.', 'Managed the project database.', 'Focused on a clear photo-to-journal flow.'],
    challenge: 'Presenting image-assisted feedback clearly while keeping the experience grounded as a personal journal.',
    takeaway: 'Clear language and a well-organized history are as important as the scan itself.',
    tech: ['React Native', 'Python', 'TensorFlow', 'Flutter'],
    demo: 'dermascan',
    github: 'https://github.com/krsrcio/dermascan',
    image: '/DermaScan.png',
    imageAlt: 'DermaScan application logo',
  },
  {
    title: 'Echoes of the Lighthouse',
    category: '3D island exploration game',
    theme: {
      page: '#ffffff', header: '#ffffff', hero: '#173d77', live: '#ffffff', panel: '#ffffff', text: '#173d77', muted: '#5b7192', border: '#cfdae7', accent: '#173d77', accentText: '#ffffff', accentSoft: '#ffffff', heroText: '#ffffff',
    },
    description: 'Echoes of the Lighthouse is a 3D adventure game where players walk across a mysterious island, explore its landmarks, and uncover the secrets surrounding its lighthouse.',
    story: 'The island is meant to invite slow exploration, letting the lighthouse and the landscape tell the story together.',
    role: 'Front-end developer',
    focus: '3D island exploration, environmental storytelling, and atmosphere',
    highlights: ['Walk across a mysterious island at your own pace.', 'Explore landmarks around the lighthouse.', 'Uncover the island’s story through environmental discovery.'],
    contributions: ['Worked on the game’s front-end experience.', 'Helped support island exploration and interaction.', 'Contributed to the project’s atmospheric presentation.'],
    challenge: 'Giving players a sense of direction while still leaving room for quiet, self-led exploration.',
    takeaway: 'Landmarks and atmosphere can guide a player without turning exploration into a checklist.',
    tech: ['Unity', 'C#'],
    demo: 'lighthouse',
    github: 'https://github.com/krsrcio/echoes-of-the-lighthouse',
    image: '/eofL.png',
    imageAlt: 'Echoes of the Lighthouse game logo',
    imageBackground: 'dark',
  },
  {
    title: 'RxGuard',
    category: 'Medication management platform',
    theme: {
      page: '#ffffff', header: '#ffffff', hero: '#1d5fa9', live: '#ffffff', panel: '#ffffff', text: '#163764', muted: '#5d7190', border: '#cddff2', accent: '#1d5fa9', accentText: '#ffffff', accentSoft: '#ffffff', heroText: '#ffffff',
    },
    description: 'RxGuard supports medication reminders and adherence tracking for patients, with dedicated web views that help physicians and pharmacists review care and prescription activity.',
    story: 'RxGuard brings a patient’s daily routine and the care team’s web workflows into one clearer medication experience.',
    role: 'Front-end developer',
    focus: 'Medication reminders and adherence tracking',
    highlights: ['Patients can view reminders and check off daily doses.', 'Physicians can review adherence and follow-up needs.', 'Pharmacists have a focused prescription-review workflow.'],
    contributions: ['Built the front-end experience.', 'Designed role-based patient and care-team views.', 'Focused on clear reminders and adherence information.'],
    challenge: 'Making the same medication information useful for patients, physicians, and pharmacists in different contexts.',
    takeaway: 'Role-specific views keep each person focused on the decisions they need to make.',
    tech: ['Next.js', 'Firebase', 'Redux', 'PostgreSQL', 'Prisma'],
    demo: 'rxguard',
    github: 'https://github.com/krsrcio/rxguard',
    image: '/RXGUARD.png',
    imageAlt: 'RxGuard application logo',
  },
];

export function getProjectByDemo(demo: DemoId) {
  return projects.find((project) => project.demo === demo);
}
