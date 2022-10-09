import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Compare from "./Food/Compare";
import Food from "./Food/Food";
import SearchFoods from "./Food/SearchFoods";
import Navigation from "./Navigation";
import SearchProviders from "./Providers/SearchProviders";
import Foods from "./user/Foods";
import Profile from "./user/Profile";
import Providers from "./user/Providers";
import RequireUser from "./user/RequireUser";
import SignForm from "./user/SignForm";

function App() {

  return (
    <Router>
      <Navigation/>
      <Routes>
        <Route path="/signin" element={<SignForm/>}/>
        <Route path="/profile" element={<RequireUser><Profile/></RequireUser>}/>
        <Route path="/foods" element={<RequireUser><Foods/></RequireUser>}/>
        <Route path="/providers" element={<RequireUser><Providers/></RequireUser>}/>
        <Route path="/searchFoods" element={<SearchFoods/>}/>
        <Route path="/searchProviders" element={<SearchProviders/>}/>
        <Route path="/food/:_id" element={<Food/>}/>
        <Route path="/compare" element={<Compare/>}/>
      </Routes>
    </Router>
  );
}

export default App;