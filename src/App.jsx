import React from 'react'
import Router from './Router/Router'
import AuthProvider from './context/AuthProvider'

const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}

export default App