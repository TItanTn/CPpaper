import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import SignIn from './views/SignIn'
import PaperPage from './views/PaperPage'
import './index.css'
import { SnackbarProvider } from 'notistack';
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/PaperInventory/:Username",
    element: <App />,
  },
  {
    path: "/PaperInventory/:Username/:paperID",
    element: <PaperPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
      <RouterProvider router={router} />
    </SnackbarProvider>
  </React.StrictMode>
)
