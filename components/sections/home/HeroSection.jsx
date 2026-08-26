"use client"

import Particles from "@/components/reusable/Particles/Particles"
import WarpText from "@/components/reusable/WarpText/WarpText"

function HeroSection() {
   return (
      <section
         aria-label="Hero"
         style={{ width: '100%', height: '100svh', position: 'relative', background: '#050505' }}
      >
         <Particles
            particleColors={["#ffffff"]}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover
            alphaParticles={false}
            disableRotation={false}
            pixelRatio={1}
         />
         <div
            style={{
               position: 'absolute',
               inset: 0,
               zIndex: 1,
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               justifyContent: 'center',
               padding: '1.5rem',
               pointerEvents: 'none',
            }}
         >
            <WarpText
               text={'Mohammad\nYudha\nPamungkas'}
               color="#f8f5ff"
               warpStrength={0.08}
               warpScale={1.7}
               speed={0.55}
               pointerInfluence={0.42}
               pointerStrength={0.38}
               refraction={0.018}
               ripple
               fontSize={116}
               fontWeight={800}
               style={{ height: '420px', pointerEvents: 'auto' }}
               fontFamily="inherit"
               letterSpacing={-0.06}
               lineHeight={0.9}
            />
            <p
               style={{
                  margin: '-0.75rem 0 0',
                  color: '#f8f5ff',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  letterSpacing: '0.28em',
                  lineHeight: 1,
                  textTransform: 'uppercase',
               }}
            >
               Web Developer
            </p>
         </div>
      </section>
   )
}

export default HeroSection