import { BrowserRouter as Router} from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login'; // Import the Login component
import Signup from './components/Signup/Signup';
import Contact from './components/Contact/Contact';
import Home from './components/Home/Home';
import { useAuth } from './contexts/AuthContext'; // Import the useAuth hook


function App() {
  const { isAuthenticated, login } = useAuth();
  // Check for the presence of the authentication token in localStorage
  const authToken = localStorage.getItem('authToken');
  // If the token is present, perform a silent login
  if (authToken && !isAuthenticated) {
    login();
  }
  return (
    <Router>
      
        <Navbar />
        <Switch>
          {/* <Route exact path="/login"  component={Login} /> */}

          <Route exact path="/login"><Login /></Route>
          <Route exact path="/signup"><Signup /></Route>
          <Route exact path="/contact"><Contact/></Route>
          <Route exact path="/"><Home /></Route>
        </Switch>
        <Footer />
      
    </Router>
  );
}

export default App;
