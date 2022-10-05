import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Food from "./Food/Food";
import SearchFoods from "./Food/SearchFoods";
import SearchProviders from "./Providers/SearchProviders";
import Account from "./user/Account";
import Signout from "./user/Signout";

function App() {

  return (
    <Router>
      <Signout/>
      <Routes>
        <Route path="/" element={<Link to="/account">account</Link>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/account/:section" element={<Account/>}/>
        <Route path="/searchFoods/:page" element={<SearchFoods/>}/>
        <Route path="/searchProviders/:page" element={<SearchProviders/>}/>
        <Route path="/food/:_id" element={<Food/>}/>
      </Routes>
    </Router>
  );
}

export default App;