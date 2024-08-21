import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AuthLayout from './components/AuthLayout';
import WelcomePage from './pages/WelcomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/welcome' element={<WelcomePage/>}/>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
