import React from 'react'
import { Link } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <header>
    <nav>
        <h3>Welcome to Tuscan Sun</h3>
        <h3><Link to='/'>Home</Link></h3>
    </nav>
  </header>
)

export default Header
