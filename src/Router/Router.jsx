import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
import PrivateRoute from '../components/PrivateRoute'
import PublicRoute from '../components/PublicRoute'
import Layout from '../Layout/Layout'
import { AnimatePresence } from 'framer-motion'

const Router = () => {
  return (
    <BrowserRouter >
      <AnimatePresence mode='wait'>
        <Routes>
          <Route path="/"
            element={
              <Layout />
            } >
            <Route index element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

          </Route>
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  )
}

export default Router