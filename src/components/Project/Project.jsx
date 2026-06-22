import "./Project.css"

export default function Project() {
   return (
      <div className="project__container">
         <div className="project__grid" />
         <h2 className="project__title">
            Selected Projects
         </h2>
         <div className="project__content">
            <article className="project__card">
               <div className="project__card-image">
                  <img src="/assets/images/project/dummy.png" alt="Project 1" />
               </div>
               <div className="project__card-body">
                  <h3 className="project__card-title">Project Title 1</h3>
                  <p className="project__card-description">
                     Brief description of the first project and the technologies used.
                  </p>
                  <div className="project__card-tags">
                     <span className="project__tag">React</span>
                     <span className="project__tag">Tailwind</span>
                  </div>
               </div>
            </article>

            <article className="project__card">
               <div className="project__card-image">
                  <img src="/assets/images/project/dummy.png" alt="Project 2" />
               </div>
               <div className="project__card-body">
                  <h3 className="project__card-title">Project Title 2</h3>
                  <p className="project__card-description">
                     Brief description of the second project and the technologies used.
                  </p>
                  <div className="project__card-tags">
                     <span className="project__tag">Vue</span>
                     <span className="project__tag">CSS</span>
                  </div>
               </div>
            </article>
         </div>
      </div>
   )
}
