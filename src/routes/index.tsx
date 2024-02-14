import React from 'react'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import { LeadsList } from '@/pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LeadsList />
  }
])

const Routes: React.FC = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default Routes
