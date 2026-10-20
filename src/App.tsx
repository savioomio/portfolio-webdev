import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Links } from './pages/Links'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/links" element={<Links />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App