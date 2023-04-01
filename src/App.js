import { Routes, Route, BrowserRouter } from 'react-router-dom'
import SignIn from './main-pages/SignIn'
import SignUp from './main-pages/SignUp'
import './styles/general-style.css'
import './styles/color-palette.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
