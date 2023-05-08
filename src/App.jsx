import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import './App.css'
import Home from './pages/home'
import Detail from './pages/detail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home /> } />
        <Route path='/pokemon/:name' element={<Detail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
