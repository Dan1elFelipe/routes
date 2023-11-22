import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

import { Landing, Home, Dashboard,  Analytics, Admin } from './pages';
import { Counter } from './pages/Page'
import { AppDos } from './pages/Video'
import { Musica } from './pages/Musica'

import {ProtectedRoute} from "./components/Protect";

import { useState } from 'react';

export const App = () => {

  const [user, setUser] = useState(null)

  const login = () => {
    setUser({
      id: 1,
      name: "Jhon",
      permissions: ['analize'],
      roles: ['']
    })
  }

  const logout = () => setUser(null)

  return(
    <BrowserRouter>

    <Navigation/>

    {
      user ? (
        <button onClick={logout}>Logout</button>        
      ): (
        <button onClick={login}>Login</button>
      )
    }

      <Routes>
        <Route index element={<Landing/>}/>
        <Route path='/landing' element={<Landing/>}/>

        <Route element={<ProtectedRoute isAllowed={!!user}/>}>
          <Route path='/home' element={<Home/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/ejemplo' element={<Counter/>}/>
          <Route path='/video' element={<AppDos/>}/>
          <Route path='/musica' element={<Musica/>}/>
        </Route>

        <Route path='/analytics' element={
          <ProtectedRoute 
            isAllowed={!!user && user.permissions.includes('analize')}
            redirectTo='/home'>
              
            <Analytics/>
          </ProtectedRoute>
        }/>
        <Route path='/admin' element={
          <ProtectedRoute 
            isAllowed={!!user && user.roles.includes('admin')}
            redirectTo='/home'  
          >
            <Admin/>
          </ProtectedRoute>
        }/>
      </Routes>

    </BrowserRouter>
  )
} 


export const Navigation = () => {
  return <nav>
      <ul>
        <li>
          <Link to="/landing">Landing</Link>
        </li>
        <li>
          <Link to="/home">home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/ejemplo">Ejemplo</Link>
        </li>
        <li>
          <Link to="/video">El Tal</Link>
        </li>
        <li>
          <Link to="/musica">Musica</Link>
        </li>
        <li>
          <Link to="/analytics">Analytics</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
      </ul>
  </nav>
}
