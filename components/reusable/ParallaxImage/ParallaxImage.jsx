'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function ParallaxImage({ src, alt, sizes, priority = false, className = '', imageClassName = '' }) {
   const ref = useRef(null);
   const prefersReducedMotion = useReducedMotion();
   const { scrollYProgress } = useScroll({
      target: ref,
      offset: ['start end', 'end start'],
   });
   const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);

   return (
      <motion.div
         ref={ref}
         className={className}
         style={{ y: prefersReducedMotion ? 0 : y }}
      >
         <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className={imageClassName}
         />
      </motion.div>
   );
}