import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Admin from './Admin'

function App() {
  return (
    <Router>
      <Route path="/:path*">
        <Admin />
      </Route>
    </Router>
  )
}

export default App
