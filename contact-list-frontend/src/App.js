import './App.css';
import ContactDetails from './components/ContactDetails';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import Register from './Pages/Register';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Pages/Home';
import LandingPage from './components/LandingPage';

function App() {
  return (
      <Router>
          {/* <Navbar/> */}
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Register/>}/>
            <Route path='/logout' element={<Logout/>}/>
            <Route path="/" element={<LandingPage />}/>
            <Route path='/user'element={<PrivateRoute/>}>
                <Route path='contacts' element={<Home/>}/>
                <Route path='contacts/:id' element={<ContactDetails />}/>
            </Route>
          </Routes>
        </Router>
    
  );
}

export default App;
