"use client"
import Link from "next/link"
import "./Navbar.css"

export default function Navbar() {
  return (
  <header className="navbar__container">
    <Link className="navbar__brand" href="/" aria-label="Home">
      <img src="/assets/images/logo.png" alt="Mohammad Yudha Pamungkas logo" />
    </Link>

    <nav className="navbar__menu" aria-label="Main navigation">
      <a className="navbar__link" href="#about">About</a>
      <a className="navbar__link" href="#experience">Experience</a>
      <a className="navbar__link" href="#project">Project</a>
    </nav>
  </header>
  )
}
