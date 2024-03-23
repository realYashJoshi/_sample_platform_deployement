// SignUp.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button,Container,Row,Col } from 'react-bootstrap';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const SignUp = () => {
  const [userData, setUserData] = useState({ email: '', password: '', type: '' });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const validateEmail = (email) => {
    // Regular expression to validate email format
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(userData.email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/auth/signup', userData);
      navigate('/signin');
    } catch (error) {
      console.error(error);
    }
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div  style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center',background: 'linear-gradient(to bottom, #87CEEB, #FFFFFF)' }}>
    <Container >
    <Row className="justify-content-center">
      <Col xs={10} sm={8} md={6}>
      <div  className="border border-black p-4 mt-5" style={{borderRadius:"20px",padding:"20px"}}>
        <h2 className="mb-4 text-center">Sign Up</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" value={userData.email} onChange={handleChange} required />
            <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
          <Form.Label>Password</Form.Label>
              <div className="position-relative">
                <Form.Control type={showPassword ? "text" : "password"} placeholder="Password" name="password" value={userData.password} onChange={handleChange} required />
                <span className="position-absolute top-50 end-0 translate-middle-y">
                  {showPassword ? <AiOutlineEyeInvisible onClick={toggleShowPassword} style={{marginRight:'10px'}}/> : <AiOutlineEye onClick={toggleShowPassword} style={{marginRight:'10px'}}/>}
                </span>
              </div>
            </Form.Group>

          <Form.Group controlId="formBasicType">
            <Form.Label>User Type</Form.Label>
            <Form.Control as="select" name="type" value={userData.type} onChange={handleChange} required>
              <option value="">Select User Type</option>
              <option value="viewer">Viewer</option>
              <option value="business">Business</option>
            </Form.Control>
          </Form.Group>
          <br></br>
          <Button variant="primary" type="submit" className="w-100">
            Sign Up
          </Button>
        </Form>
        </div>
      </Col>
    </Row>
  </Container>
  </div>
  );
};

export default SignUp;
