
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


const ViewerProfile = ({ user }) => {
  const [ads, setAds] = useState([]);
  const [userEmails, setUserEmails] = useState({});
  const navigate=useNavigate();
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) {
          // Handle unauthenticated user
          return;
        }
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const res = await axios.get('http://localhost:5000/api/ad', config);
        setAds(res.data);
      } catch (error) {
        console.error(error);
        // Handle errors
      }
    };
    const fetchUserEmails = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users');
        const emailsMap = {};
        res.data.forEach(user => {
          emailsMap[user._id] = user.email;
        });
        setUserEmails(emailsMap);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserEmails();

    fetchAds();
  }, []);

  const handleDeleteAd = async (adId) => {
    setAds(ads.filter(ad => ad._id !== adId));
  };

  const findEmail = (userId) => {
    return userEmails[userId] || 'Unknown';
  };

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/');
  };
  return (
    <div style={{background: 'linear-gradient(to bottom, #87CEEB, #FFFFFF)'}}>
    <div className="container " style={{paddingTop:"60px"}} >
    <div className="card ">
      <div className="card-header bg-primary">
        <h2 className="card-title "style={{ color: 'white' }}>Viewer Profile</h2>
      </div>
      <div className="card-body">
        <p className="card-text">ID: {user._id}</p>
        <p className="card-text">Email: {user.email}</p>
        <strong><p>Ads for you:</p></strong>
        <div className="ad-container d-flex flex-row overflow-auto">
          {ads.map(ad => (
            <div key={ad._id} className="card ad-card mx-2">
              {ad.imageUrl && <img src={ad.imageUrl} alt="Ad" className="card-img-top" style={{ maxHeight: '200px', objectFit: 'cover' }} />}
              <div className="card-body">
                <p className="card-text">{ad.content}</p>
                <p className="card-text">Ad made by :{findEmail(ad.createdBy)}</p>
               <div > <button className="btn btn-warning"  style={{marginBottom:"10px"}} onClick={() => handleDeleteAd(ad._id) }>Delete</button>
              </div>
              </div>
            </div>
          ))}
        </div>
        <br></br>
        <button className="btn btn-danger" style={{marginLeft:"10px"}} onClick={handleLogout}>Logout</button>
      </div>
     
    </div>
  </div>
  </div>
  );
};

export default ViewerProfile;

