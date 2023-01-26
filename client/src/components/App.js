import {BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";
import Compare from "./Food/Compare";
import Food from "./Food/Food";
import SearchFoods from "./Food/SearchFoods";
import Navigation from "./Navigation";
import Foods from "./user/Foods";
import Profile from "./user/Profile";
import Providers from "./user/Providers";
import RequireUser from "./user/RequireUser";
import SignForm from "./user/SignForm";

function App() {

  return (
    <Wrapper>
      <Router>
        <Navigation/>
        <Routes>
          <Route path="/" element={<Navigate to="/profile" /> }/>
          <Route path="/signin" element={<SignForm/>}/>
          <Route path="/profile" element={<RequireUser><Profile/></RequireUser>}/>
          <Route path="/editFood" element={<RequireUser><Foods/></RequireUser>}/>
          <Route path="/editProvider" element={<RequireUser><Providers/></RequireUser>}/>
          <Route path="/searchFoods" element={<SearchFoods/>}/>
          <Route path="/food/:_id" element={<Food/>}/>
          <Route path="/compare" element={<Compare/>}/>
        </Routes>
      </Router>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  max-width: 1400px;
  padding: 0 100px;
  margin: 0 auto;
`