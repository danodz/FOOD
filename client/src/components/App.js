import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Account from "./user/Account";
import Signout from "./user/Signout";

function App() {

  return (
    <Router>
      <Signout/>
      <Routes>
        <Route path="/" element={<Link to="/account">account</Link>}/>
        <Route path="/account" element={<Account/>}/>
      </Routes>
    </Router>
  );
}

export default App;