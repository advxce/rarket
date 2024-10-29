
import './App.css';
import Products from "./components/products/Products";
import NavBar from "./components/NavBar/NavBar";
import {BrowserRouter as Router} from "react-router-dom";
import AppRoutes from "./router/Rotes";

function App() {

  return (
    <Router className="App">

        <NavBar/>
        <AppRoutes/>
    </Router>
  );
}

export default App;
