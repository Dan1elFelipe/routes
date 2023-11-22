import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

import { Landing, Home, Dashboard,  Analytics, Admin } from './pages';
import { Counter } from './pages/Page'
import { AppDos } from './pages/Video'
import { Musica } from './pages/Musica'

import {ProtectedRoute} from "./components/Protect";
import { createConnection } from './pages/chat';

import { useState, useEffect } from 'react';

const serverUrl = 'https://localhost:1234';

export const App = () => {
  const [roomId, setRoomId] = useState('general');
  const [user, setUser] = useState(null);
  const [connection, setConnection] = useState(null);

  const login = () => {
    setUser({
      id: 1,
      name: "Jhon",
      permissions: ['analize'],
      roles: ['']
    });

    // Crear conexión al servidor de chat al iniciar sesión
    const newConnection = createConnection(serverUrl, roomId);
    setConnection(newConnection);
    newConnection.connect();
  };

  const logout = () => {
    // Desconectar del servidor de chat al cerrar sesión
    if (connection) {
      connection.disconnect();
      setConnection(null);
    }

    setUser(null);
  };

  useEffect(() => {
    if (user) {
      console.log('🔒 Usuario ' + user.name + ' ha iniciado sesión.');
    } else {
      console.log('🔓 Usuario ha cerrado sesión.');
    }
  }, [user]);

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
