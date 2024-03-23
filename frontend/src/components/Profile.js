import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ViewerProfile from './ViewerProfile';
import BusinessProfile from './BusinessProfile';
const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = Cookies.get('token');
        const { data } = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        console.log(data);
        setUser(data);
      } catch (error) {
        navigate('/signin')
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div>
    {user && user.type === 'viewer' ? (
      <ViewerProfile user={user} />
    ) : user && user.type === 'business' ? (
      <BusinessProfile user={user} />
    ) : (
      <p>Loading...</p>
    )}
  </div>
    
  );
};

export default Profile;
