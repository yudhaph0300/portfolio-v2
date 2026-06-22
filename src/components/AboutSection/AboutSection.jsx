"use client"
import { useState } from "react"
import "./AboutSection.css"

const services = [
   {
      title: "VueJS",
      description: "Building reactive interfaces with reusable components and clean state management.",
      image: "/assets/images/about/vue.jpg",
   },
   {
      title: "ReactJS",
      description: "Creating fast, scalable, and maintainable frontend architecture for modern products.",
      image: "/assets/images/about/react.jpg",
   },
   {
      title: "Laravel",
      description: "Developing robust backend integrations that support secure and smooth user experiences.",
      image: "/assets/images/about/laravel.jpg",
   },
   {
      title: "User Experience",
      description: "Designing intuitive interaction flows with strong focus on usability and accessibility.",
      image: "/assets/images/about/ux.jpg",
   },
]

const highlights = [
   "Passionate about continuous learning, I actively explore new technologies and best practices.",
   "I thrive in collaborative environments where ideas and innovation come together.",
   "I aim to contribute to impactful solutions that solve problems and provide lasting value.",
]

export default function AboutSection() {
   const [activeService, setActiveService] = useState(null)

   return (
      <section
         className="about__container"
         id="about"
         aria-labelledby="about-title"
         style={{ "--about-bg-image": activeService ? `url(${activeService.image})` : "none" }}
      >
         <div className="about__grid" aria-hidden="true" />



         <div className="about__intro">
            <h2 className="about__title" id="about-title">
               I am Mohammad Yudha Pamungkas, a Front-end Web Developer with over 2 years of experience and a Computer Science degree from Universitas Brawijaya. I specialize in building dynamic, functional, and visually appealing web interfaces using VueJS, ReactJS, and Laravel.
            </h2>


         </div>

         <div className="about__content">
            <div className="about__services" aria-label="Services">
               {services.map((service) => {
                  const isActive = activeService?.title === service.title

                  return (
                     <article
                        key={service.title}
                        className={`about__card${isActive ? " is-active" : ""}`}
                        onMouseEnter={() => setActiveService(service)}
                        onMouseLeave={() => setActiveService(null)}
                        onFocus={() => setActiveService(service)}
                        onBlur={() => setActiveService(null)}
                        tabIndex={0}
                     >
                        <h3>{service.title}</h3>
                        <p className="about__card-copy">{service.description}</p>
                     </article>
                  )
               })}
            </div>

            <aside className="about__side">
               <p className="about__side-kicker">Professional Focus</p>

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
