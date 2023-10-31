import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import router from './utils/router/router.config';
import ContextProvider from './utils/ctx/global.ctx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
      <RouterProvider router={router}/>
  </ContextProvider>
)
