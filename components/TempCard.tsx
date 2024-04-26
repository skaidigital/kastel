// function Card({ index }: { index: number }) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     container: containerRef
//   });
//   // const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
//   const opacity = useTransform(
//     scrollYProgress,
//     // Map x from these values:
//     [0, 1],
//     // Into these values:
//     [1, 1]
//   );

//   useMotionValueEvent(scrollYProgress, 'animationStart', () => {
//     console.log('animation started on x');
//   });
//   useMotionValueEvent(scrollYProgress, 'change', (latest) => {
//     console.log('x changed to', latest);
//   });

//   console.log(scrollYProgress);

//   const randomColor = Math.floor(Math.random() * 16777215).toString(16);
//   const colorString = `#${randomColor}`;

//   const anotherRandomColor = Math.floor(Math.random() * 16777215).toString(16);
//   const anotherColorString = `#${anotherRandomColor}`;

//   return (
//     <div ref={containerRef} className="justify-centers sticky top-0 flex h-screen items-center">
//       <div
//         style={{ backgroundColor: colorString }}
//         className="relative flex h-full w-full origin-bottom flex-col"
//       >
//         <motion.div
//           style={{ backgroundColor: anotherColorString, opacity }}
//           className="relative h-full w-[33%] overflow-hidden bg-black"
//         >
//           <div className="h-full w-full">card</div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }
