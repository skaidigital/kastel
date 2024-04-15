// global.d.ts
interface Lipscore {
  init: (config: { apiKey: string }) => void;
}

interface Window {
  stockistRebuildWidget?: () => void;
  lipscore?: Lipscore;
}
