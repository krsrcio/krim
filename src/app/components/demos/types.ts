export const demoIds = ['baskit', 'petpal', 'dermascan', 'lighthouse', 'rxguard'] as const;

export type DemoId = (typeof demoIds)[number];

export const demoLabels: Record<DemoId, string> = {
  baskit: 'Baskit',
  petpal: 'PetPal',
  dermascan: 'DermaScan',
  lighthouse: 'Echoes of the Lighthouse',
  rxguard: 'RxGuard',
};
