"use client"

import { useEffect, useState } from "react"
import { Parallax } from "react-scroll-parallax"
import "./HeroBanner.css"

const slides = [
   {
      image: "/assets/images/hero/bg-hero-1.jpg",
      position: "50% 45%",
      eyebrow: "Creative Direction",
   },
   {
      image: "/assets/images/hero/bg-hero-2.jpg",
      position: "60% 50%",
      eyebrow: "Frontend Engineering",
   },
   {
      image: "/assets/images/hero/bg-hero-3.jpg",
      position: "40% 55%",
      eyebrow: "Digital Experiences",
   },
]

export default function HeroBanner() {
   const [activeIndex, setActiveIndex] = useState(0)

   useEffect(() => {
      const intervalId = setInterval(() => {
         setActiveIndex((prev) => (prev + 1) % slides.length)
      }, 5500)

      return () => clearInterval(intervalId)
   }, [])

   return (
      <section className="hero__container" aria-label="Hero carousel">
         <Parallax speed={-18} className="hero__media" aria-hidden="true">
            {slides.map((slide, index) => (
               <div
                  key={`${slide.eyebrow}-${index}`}
                  className={`hero__bg ${index === activeIndex ? "is-active" : ""}`}
                  style={{
                     backgroundImage: `url(${slide.image})`,
                     backgroundPosition: slide.position,
                  }}
               />
            ))}
         </Parallax>

         <div className="hero__overlay"></div>
         <div key={activeIndex} className="hero__overlay--animation"></div>
         <div className="hero__grid"></div>

         <div className="hero__content">
            <Parallax speed={10} className="hero__content-parallax">
               <h1 className="hero__title">
                  MOHAMMAD<br />
                  YUDHA<br />
                  PAMUNGKAS
               </h1>

               <p className="hero__eyebrow">{slides[activeIndex].eyebrow}</p>
            </Parallax>
         </div>

         <div className="hero__progress" aria-hidden="true">
            <span key={activeIndex} className="hero__progress-bar"></span>
         </div>
      </section>
   )
}
