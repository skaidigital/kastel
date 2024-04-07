// import dynamic from "next/dynamic";
// import Head from "next/head";
// import React, { Suspense, useEffect, useRef, useState } from "react";

// const HLSPlayer = dynamic(() => import("@/components/HLSPlayer"), {
//   suspense: true,
// });

// const Parent = () => {
//   const [video, setVideo] = useState<HTMLVideoElement | null>(null); // use callback state instead of ref due to hydration of SSR stream

//   useEffect(() => {
//     // On render of video element -> set video poster to avoid flash (can also run transparent gif on video as poster & skip this step)
//     const mediaQueryList = window.matchMedia("(max-width: 600px)");

//     if (mediaQueryList.matches) {
//       video.poster = THUMBNAIL_MOBILE;
//     } else {
//       video.poster = THUMBNAIL_DESKTOP;
//     }
//   }, [video]);

//   return (
//     <>
//       <Head>
//         <link rel="preconnect" href="https://stream.mux.com" /> {/* Preconnect to your HLS service of choice */}
//         {/* Preload thumbnails based on device width */}
//         <link
//           rel="preload"
//           href={THUMBNAIL_MOBILE}
//           as="image"
//           type="image/jpeg"
//           media="(max-width: 600px)"
//         />
//         <link
//           rel="preload"
//           href={THUMBNAIL_DESKTOP}
//           as="image"
//           type="image/jpeg"
//           media="(min-width: 601px)"
//         />
//       </Head>
//         <div className="w-full aspect-video relative">
//           <Suspense fallback={<VideoFallback />}> {/* Render video fallback with preloaded poster */}
//             <HLSPlayer
//               className="rounded-lg w-full aspect-video object-contain relative z-10 video"
//               playsInline
//               controls
//               manifest={MANIFEST}
//               poster={THUMBNAIL_MOBILE}
//               ref={setVideo}
//             />
//           </Suspense>
//         </div>
//       </>
//   );
// };

// export default Parent;

// // Auto switch video url using native CSS (server rendered also) to correct preloaded poster
// const VideoFallback = () => {
//   return (
//     <>
//       <div className="video-fallback rounded-lg w-full aspect-video object-contain relative z-10" />
//       <style jsx>
//         {`
//           @media screen and (max-width: 600px) {
//             .video-fallback {
//               background-image: url(${THUMBNAIL_MOBILE});
//               background-size: cover;
//               background-position: center;
//             }
//           }
//           @media screen and (min-width: 601px) {
//             .video-fallback {
//               background-image: url(${THUMBNAIL_DESKTOP});
//               background-size: cover;
//               background-position: center;
//             }
//           }
//         `}
//       </style>
//     </>
//   );
// };
