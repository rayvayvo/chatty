

    import React from 'react'

const NavBar = (props) => (
  <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <span className="userCounter">{props.active}: Users Online</span>
  </nav>
)
export default NavBar
