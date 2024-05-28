// global.d.ts
interface Window {
  stockistRebuildWidget?: () => void;
  lipscoreInit?: () => void;
  reInitWidgets: (force: boolean) => void;
}
