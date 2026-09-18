import { BaskitDemo } from './BaskitDemo';
import { DermaScanDemo } from './DermaScanDemo';
import { LighthouseDemo } from './LighthouseDemo';
import { PetPalDemo } from './PetPalDemo';
import { RxGuardDemo } from './RxGuardDemo';
import type { DemoId } from './types';

type ProjectDemoProps = {
  demo: DemoId;
};

export function ProjectDemo({ demo }: ProjectDemoProps) {
  switch (demo) {
    case 'baskit': return <BaskitDemo />;
    case 'petpal': return <PetPalDemo />;
    case 'dermascan': return <DermaScanDemo />;
    case 'lighthouse': return <LighthouseDemo />;
    case 'rxguard': return <RxGuardDemo />;
  }
}
