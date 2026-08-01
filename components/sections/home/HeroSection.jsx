import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

function SplitText({ text, className, delay = 0, visible = true }) {
   const words = text.split(" ");

   return (
      <span className={className} aria-label={text}>
         {words.map((word, index) => (
            <span
               key={`${word}-${index}`}
               className="heroWord"
               style={{
                  display: "inline-block",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(12px)",
                  transition: "opacity 0.45s ease, transform 0.45s ease",
                  transitionDelay: `${delay + index * 0.14}s`,
                  marginRight: index < words.length - 1 ? "0.25em" : 0,
               }}
            >
               {word}
            </span>
         ))}
      </span>
   );
}

export default function HeroSection({
   sectionRef,
   viewportRef,
   canvasRef,
   heroOpacity,
   mediaParallaxTransform,
   overlayParallaxTransform,
   firstTextOpacity,
   firstTextTransform,
   secondTextOpacity,
   secondTextTransform,
   styles,
}) {
   const heroTextBlockRef = useRef(null);
   const xTo = useRef(null);
   const yTo = useRef(null);
   const rotationTo = useRef(null);
   const scaleTo = useRef(null);
   const [showFirstText, setShowFirstText] = useState(false);

   useEffect(() => {
      const node = heroTextBlockRef.current;

      if (!node) {
         return undefined;
      }

      xTo.current = gsap.quickTo(node, "x", { duration: 0.65, ease: "power3.out" });
      yTo.current = gsap.quickTo(node, "y", { duration: 0.65, ease: "power3.out" });
      rotationTo.current = gsap.quickTo(node, "rotation", { duration: 0.65, ease: "power3.out" });
      scaleTo.current = gsap.quickTo(node, "scale", { duration: 0.65, ease: "power3.out" });

      const timer = window.setTimeout(() => {
         setShowFirstText(true);
      }, 900);

      return () => {
         window.clearTimeout(timer);
         xTo.current?.kill();
         yTo.current?.kill();
         rotationTo.current?.kill();
         scaleTo.current?.kill();
      };
   }, []);

   const handleTextMove = (event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
      const offsetY = (event.clientY - rect.top) / rect.height - 0.5;

      xTo.current?.(offsetX * 14);
      yTo.current?.(-offsetY * 10);
      rotationTo.current?.(offsetX * 3);
      scaleTo.current?.(1.01);
   };

   const handleTextLeave = () => {
      xTo.current?.(0);
      yTo.current?.(0);
      rotationTo.current?.(0);
      scaleTo.current?.(1);
   };

   return (
      <section id="hero" className={styles.heroSection} ref={sectionRef}>
         <div className={styles.heroViewport} ref={viewportRef}>
            <div className={styles.canvasStage}>
               <canvas
                  ref={canvasRef}
                  className={styles.canvas}
                  style={{ transform: mediaParallaxTransform }}
               />
               <div className={styles.overlay} style={{ transform: overlayParallaxTransform }} />

               <div className={styles.heroContent} style={{ opacity: heroOpacity }}>
                  <div
                     ref={heroTextBlockRef}
                     className={styles.heroTextBlock}
                     onMouseMove={handleTextMove}
                     onMouseLeave={handleTextLeave}
                  >
                     <div
                        className={styles.textSection}
                        style={{ opacity: firstTextOpacity, transform: firstTextTransform }}
                     >
                        <h1 className={styles.primaryHeadline}>
                           <SplitText
                              text="Mohammad Yudha Pamungkas"
                              className={styles.primaryHeadlineInner}
                              delay={0.45}
                              visible={showFirstText && firstTextOpacity > 0.2}
                           />
                        </h1>
                        <p className={styles.secondaryHeadline}>
                           <SplitText
                              text="Web Developer"
                              className={styles.secondaryHeadlineInner}
                              delay={0.7}
                              visible={showFirstText && firstTextOpacity > 0.2}
                           />
                        </p>
                     </div>

                     <div
                        className={styles.textSection}
                        style={{ opacity: secondTextOpacity, transform: secondTextTransform }}
                     >
                        <h2 className={styles.primaryHeadline}>
                           <SplitText text="Building Immersive Web Experience" className={styles.primaryHeadlineInner} delay={0.08} visible={secondTextOpacity > 0.2} />
                        </h2>
                        <p className={styles.secondaryHeadline}>
                           <SplitText text="Frontend Engineer" className={styles.secondaryHeadlineInner} delay={0.25} visible={secondTextOpacity > 0.2} />
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}
