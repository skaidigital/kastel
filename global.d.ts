// global.d.ts
interface Window {
  stockistRebuildWidget?: () => void
  // lipscoreInit?: () => void;
  // reInitWidgets: (force: boolean) => any;
  lipscore?: {
    init: (options: { apiKey: string }) => void
    reInitWidgets: (force: boolean) => any
  }
}
