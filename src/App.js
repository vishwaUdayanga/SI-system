import { Routes, Route, BrowserRouter } from 'react-router-dom'
import SignIn from './main-pages/SignIn'
import SignUp from './main-pages/SignUp'
import EmailVerify from './main-pages/EmailVerify'
import StudentCourses from './main-pages/StudentCourses'
import Birthday from './main-pages/Birthday'
import Announcement from './main-pages/Announcement'
import './styles/general-style.css'
import './styles/color-palette.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/student-courses' element={<StudentCourses />} />
        <Route path="/student/:id/verify/:token" element={<EmailVerify />} />
        <Route path="/birthdays" element={<Birthday />} />
        <Route path="/announcement" element={<Announcement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
