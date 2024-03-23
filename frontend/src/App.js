// App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import styled from 'styled-components';
// import SignUp from './authPages/SignUp';
// import SignIn from './authPages/SignIn';
// import Profile from './components/Profile'
// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
// `;

// const Content = styled.div`
//   text-align: center;
// `;

// const Button = styled(Link)`
//   margin: 0 10px;
//   padding: 10px 20px;
//   font-size: 16px;
//   text-decoration: none;
//   color: #fff;
//   background-color: #007bff;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/profile" element={<Profile />} />
//       </Routes>
//     </Router>
//   );
// }

// const Home = () => {
//   return (
//     <Container>
//       <Content>
//         <h1>Welcome!</h1>
//         <p>Are you a new user?</p>
//         <Button to="/signup">Sign Up</Button>
//         <br></br>
//         <br></br>
//         <p>Already a user?</p>
//         <Button to="/signin">Sign In</Button>
//       </Content>
//     </Container>
//   );
// };

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import SignUp from './authPages/SignUp';
import SignIn from './authPages/SignIn';
import Profile from './components/Profile'
import logo from './images/logo.png'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom, #87ceeb, #ffffff);
`;

const Content = styled.div`
  text-align: center;
`;

const Logo = styled.img`
  width: 150px;
  margin-bottom: 20px;
  border-radius:60px;
`;

const Button = styled(Link)`
  margin: 10px;
  padding: 10px 30px;
  font-size: 18px;
  text-decoration: none;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Description = styled.p`
  font-size: 20px;
  color: #333;
  margin-bottom: 30px;
`;

function App() {
  return (
    <Router>
      <Routes>
           <Route path="/" element={<Home />} />
       <Route path="/signup" element={<SignUp />} />      
         <Route path="/signin" element={<SignIn />} />
       <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

const Home = () => {
  return (
    
    <Container>
      <Content>
        <Logo src={logo} alt="Company Logo" />
        <h1>Welcome to Our Platform!</h1>
        <Description>We provide a seamless experience for both viewers and businesses to connect through our advertisement platform.</Description>
        <div>
          <p>Are you a new user?</p>
          <Button to="/signup">Sign Up</Button>
          <Button to="/signin">Sign In</Button>
        </div>
      </Content>
      
    </Container>
    
    
  );
};

export default App;

