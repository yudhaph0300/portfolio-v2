"use client"
import "./AboutSection.css"

const services = [
   "Brand Direction",
   "Advanced Tech",
   "Performance Marketing",
   "System Integration",
]

const highlights = [
   "Align brand, product, and growth into one clear direction.",
   "Turn complex teams and tools into a simpler operating system.",
   "Build experiences that feel premium, fast, and easy to scale.",
]

export default function AboutSection() {
   return (
      <section className="about__container" id="about" aria-labelledby="about-title">
         <div className="about__grid" aria-hidden="true" />

         <div className="about__eyebrow-row">
            <p className="about__eyebrow">Our Services</p>
            <p className="about__eyebrow about__eyebrow--right">Est. 2008</p>
         </div>

         <div className="about__hero">
            <h2 className="about__title" id="about-title">
               We help eCommerce brands move as one system, not as separate services.
            </h2>

            <div className="about__intro">
               <p>
                  Strategy, design, technology, and growth should work together from the first decision to the last
                  checkout flow.
               </p>

               <p>
                  This section is intentionally structured to hold stronger brand copy later, while keeping the same
                  visual rhythm as the reference.
               </p>
            </div>
         </div>

         <div className="about__content">
            <div className="about__services" aria-label="Services">
               {services.map((service) => (
                  <article key={service} className="about__card">
                     <h3>{service}</h3>
                     <p>
                        Placeholder copy for now. Replace this with a sharper one-line explanation of the service or
                        capability.
                     </p>
                  </article>
               ))}
            </div>

            <aside className="about__side">
               <p className="about__side-kicker">Why this works</p>

               <div className="about__side-copy">
                  {highlights.map((item) => (
                     <p key={item}>{item}</p>
                  ))}
               </div>
            </aside>
         </div>
      </section>
   );
}
