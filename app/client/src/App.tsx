import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './pages'
import Chat from './pages/chat'
import PrivateRoute from './components/private-route'
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}  />
        <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>}  />
      </Routes>
    </Router>
  )
}
