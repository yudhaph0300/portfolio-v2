'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import Image from 'next/image';
import styles from './TiltedCard.module.css';

const springValues = { damping: 30, stiffness: 100, mass: 2 };

export default function TiltedCard({ logo, title, description, date }) {
   const ref = useRef(null);
   const x = useMotionValue(0);
   const y = useMotionValue(0);
   const rotateX = useSpring(useMotionValue(0), springValues);
   const rotateY = useSpring(useMotionValue(0), springValues);
   const scale = useSpring(1, springValues);
   const opacity = useSpring(0);

   const handleMouse = (event) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const offsetX = event.clientX - rect.left - rect.width / 2;
      const offsetY = event.clientY - rect.top - rect.height / 2;
      rotateX.set((offsetY / (rect.height / 2)) * -10);
      rotateY.set((offsetX / (rect.width / 2)) * 10);
      x.set(event.clientX - rect.left);
      y.set(event.clientY - rect.top);
   };

   return (
      <figure
         ref={ref}
         className={styles.figure}
         onMouseMove={handleMouse}
         onMouseEnter={() => { scale.set(1.04); opacity.set(1); }}
         onMouseLeave={() => { scale.set(1); opacity.set(0); rotateX.set(0); rotateY.set(0); }}
      >
         <motion.div className={styles.inner} style={{ rotateX, rotateY, scale }}>
            <div className={styles.cardContent}>
               <div className={styles.cardHeader}>
                  <Image src={logo} alt="" width={48} height={48} className={styles.logo} />
                  <span className={styles.date}>{date}</span>
               </div>
               <div className={styles.cardBody}>
                  <h3>{title}</h3>
                  <p>{description}</p>
               </div>
            </div>
         </motion.div>
         <motion.figcaption className={styles.caption} style={{ x, y, opacity }}>
            {title}
         </motion.figcaption>
      </figure>
   );
}
