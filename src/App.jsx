import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/layout';
import Home from './pages/home';

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>} >
      <Route index path='/' element={<Home />} />
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
