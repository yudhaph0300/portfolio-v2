import AboutSection from "@/components/AboutSection/AboutSection"
import HeroBanner from "@/components/HeroBanner/HeroBanner"
import Navbar from "@/components/Navbar/Navbar"
import Project from "@/components/Project/Project"

export default function Page() {
  return (
    <>
      <Navbar />
      <HeroBanner />
      <AboutSection/>
      <Project/>
    </>
  )
}
