// SignIn.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { useNavigate } from 'react-router-dom';
// import { Form, Button, Container, Row, Col } from 'react-bootstrap';

// const SignIn = () => {
//   const [userData, setUserData] = useState({ email: '', password: '' });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post('http://localhost:5000/api/auth/signin', userData);
//       if(!data)navigate('/signin')
//       Cookies.set('token', data.token, { expires: 10, secure: true }); // Set cookie with token
      
//       navigate('/profile');
//     console.log("user signed in successfully",data);
//     } catch (error) {
//       console.error(error);
//       alert("Wrong Credentials");
//     }
//   };

//   return (
//     <Container className="mt-5">
//       <Row className="justify-content-center">
//         <Col xs={12} md={6}>
//           <h2 className="mb-4 text-center">Sign In</h2>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="formBasicEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control type="email" placeholder="Enter email" name="email" value={userData.email} onChange={handleChange} required />
//             </Form.Group>

//             <Form.Group controlId="formBasicPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control type="password" placeholder="Password" name="password" value={userData.password} onChange={handleChange} required />
//             </Form.Group>
//              <br></br>
//             <Button variant="primary" type="submit" className="w-100">
//               Sign In
//             </Button>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default SignIn;
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const SignIn = () => {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/signin', userData);
      if(!data) navigate('/signin')
      Cookies.set('token', data.token, { expires: 10, secure: true }); // Set cookie with token
      navigate('/profile');
      console.log("user signed in successfully", data);
    } catch (error) {
      console.error(error);
      alert("Wrong Credentials");
    }
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleGuestSignIn = (email, password) => {
    setUserData({ email, password });
  };

  return (
    <div  style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center',background: 'linear-gradient(to bottom, #87CEEB, #FFFFFF)' }}>
      
      <Container>
        <Row className="justify-content-center">
          <Col xs={10} sm={8} md={6}>
            
            <div  className="border border-black p-4 mt-5" style={{borderRadius:"20px",padding:"20px"}}>
              
              <h2 className="mb-4 text-center">Sign In</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" name="email" value={userData.email} onChange={handleChange} required />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <div className="position-relative">
                <Form.Control type={showPassword ? "text" : "password"} placeholder="Password" name="password" value={userData.password} onChange={handleChange} required />
                <span className="position-absolute top-50 end-0 translate-middle-y">
                  {showPassword ? <AiOutlineEyeInvisible onClick={toggleShowPassword} /> : <AiOutlineEye onClick={toggleShowPassword} style={{marginRight:'10px'}}/>}
                </span>
              </div>
            </Form.Group>
                <br />
                <Button variant="primary" type="submit" className="w-100">
                  Sign In
                </Button>
                <Button variant="warning" onClick={() => handleGuestSignIn('guest-viewer@example.com', 'guest123')} className="w-100 mt-2">
                Sign In as Guest Viewer
              </Button>
              <Button variant="warning" onClick={() => handleGuestSignIn('guest-business@example.com', 'guest123')} className="w-100 mt-2">
                Sign In as Guest Business
              </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignIn;

