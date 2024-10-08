import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './components/auth/Auth.jsx'
import { CartProvider } from './components/auth/Cart.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
<AuthProvider>
<CartProvider>
 <BrowserRouter>
    <App/>
</BrowserRouter>
</CartProvider>
</AuthProvider>
)  