import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Food from "./Food/Food";
import Search from "./Food/Search";
import Account from "./user/Account";
import Signout from "./user/Signout";

function App() {

  return (
    <Router>
      <Signout/>
      <Routes>
        <Route path="/" element={<Link to="/account">account</Link>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/searchFoods" element={<Search/>}/>
        <Route path="/food/:_id" element={<Food/>}/>
      </Routes>
    </Router>
  );
}

export default App;