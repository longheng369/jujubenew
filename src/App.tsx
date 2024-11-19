import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Staff from './pages/Staff'
import Selling from './pages/Selling'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='staff' element={<Staff/>}/>
          <Route path='selling' element={<Selling/>} />
          <Route path='*' element={<NotFound/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
