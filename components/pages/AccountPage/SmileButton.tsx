'use client';

export function SmileButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      onClick={async () => {
        if (window.SmileUI) {
          await window.SmileUI.openPanel({
            deep_link: 'home'
          }).catch((error: any) => {
            console.error('Failed to open smile link', error);
          });

          window.SmileUI.ready().then(() =>
            window.SmileUI.openPanel({ deep_link: 'home' }).catch((error: any) => {
              console.error('Failed to open smile link', error);
            })
          );
        } else {
          console.error('Failed to open smile link');
        }
      }}

      // onClick={async () => {
      //   if (window.SmileUI) {
      //     await window.SmileUI.openPanel({
      //       deep_link: 'home'
      //     }).catch((error: any) => {
      //       console.error('Failed to open smile link', error);
      //     });

      //     window.SmileUI.ready().then(() =>
      //       window.SmileUI.openPanel({ deep_link: 'home' }).catch((error: any) => {
      //         console.error('Failed to open smile link', error);
      //       })
      //     );
      //   } else {
      //     console.error('Failed to open smile link');
      //   }
      // }}
    >
      {children}
    </button>
  );
}
