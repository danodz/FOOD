import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Account from "./user/Account";
import Profile from "./user/Profile";
import Signout from "./user/Signout";

function App() {

  return (
    <Router>
      <Signout/>
      <Routes>
        <Route path="/" element={<h1>HOME</h1>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </Router>
  );
}

export default App;