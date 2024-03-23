
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const BusinessProfile = ({ user }) => {
//   const [adContent, setAdContent] = useState('');
//   const [users, setUsers] = useState([]);
//   const [selectedUsers, setSelectedUsers] = useState([]);

//   useEffect(() => {
//     // Fetch list of all users from MongoDB
//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/users');
//         setUsers(res.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleUserSelect = (userId) => {
//     const updatedSelectedUsers = selectedUsers.includes(userId)
//       ? selectedUsers.filter(id => id !== userId)
//       : [...selectedUsers, userId];
//     setSelectedUsers(updatedSelectedUsers);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Submit ad with selected users
//     try {
//       await axios.post('http://localhost:5000/api/business/create-ad', {
//         adContent,
//         targets: selectedUsers,
//         createdBy: user._id, 
//       });
//       // Reset form fields
//       setAdContent('');
//       setSelectedUsers([]);
//     } catch (error) {
//       console.error(error);
//     }
//     console.log(selectedUsers);
//   };

//   return (
//     <div className="container mt-4">
//       <div className="card">
//         <div className="card-header bg-warning">
//           <h2 className="card-title">Business Profile</h2>
//         </div>
//         <div className="card-body">
//           <p className="card-text">ID: {user._id}</p>
//           <p className="card-text">Email: {user.email}</p>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label htmlFor="adContent" className="form-label">Ad Content</label>
//               <input type="text" className="form-control" id="adContent" value={adContent} onChange={(e) => setAdContent(e.target.value)} />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Select Users</label>
//               {users.map(user => (
//                 <div key={user._id} className="form-check">
//                   <input
//                     type="checkbox"
//                     className="form-check-input"
//                     id={user._id}
//                     checked={selectedUsers.includes(user._id)}
//                     onChange={() => handleUserSelect(user._id)}
//                   />
//                   <label className="form-check-label" htmlFor={user._id}>{user.email}</label>
//                 </div>
//               ))}
//             </div>
//             <button type="submit" className="btn btn-primary">Create Ad</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BusinessProfile;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BusinessProfile = ({ user }) => {
  const [adContent, setAdContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users');
        const viewerArray=res.data.filter((u) => (u.type!=='business'));
        
        setUsers(viewerArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelect = (userId) => {
    const updatedSelectedUsers = selectedUsers.includes(userId)
      ? selectedUsers.filter(id => id !== userId)
      : [...selectedUsers, userId];
    setSelectedUsers(updatedSelectedUsers);
  };

  const handleImageUpload = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    
    if (file.type === "image/jpeg" || file.type === "image/png"||file.type==="image/jpg") {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "chat-app"); // Your Cloudinary upload preset
      data.append("cloud_name", "dwflnxe8b"); // Your Cloudinary cloud name
      
      try {
        const response = await fetch("https://api.cloudinary.com/v1_1/dwflnxe8b/image/upload", {
          method: "POST",
          body: data,
        });
        const responseData = await response.json();
        setImageUrl(responseData.url);
        setLoading(false);
        console.log(responseData.url);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    } else {
      // Handle invalid file type
      setLoading(false);
      console.log("Invalid file type");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/business/create-ad', {
        adContent,
        imageUrl,
        targets: selectedUsers,
        createdBy: user._id
      });
      toast.success('Ad created and sent successfully!');
      setAdContent('');
      setImageUrl('');
      setSelectedUsers([]);
    } catch (error) {
      console.error(error);
    }
  };
  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/');
  };

  return (
    <div style={{background: 'linear-gradient(to bottom, #87CEEB, #FFFFFF)'}}>
    <div className="container " style={{paddingTop:"60px"}} >
      <div className="card">
        <div className="card-header bg-warning">
          <h2 className="card-title" style={{color:"white"}}>Business Profile</h2>
        </div>
        <div className="card-body">
          <p className="card-text">ID: {user._id}</p>
          <p className="card-text">Email: {user.email}</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="adContent" className="form-label">Ad Content</label>
              <input type="text" className="form-control" id="adContent" value={adContent} onChange={(e) => setAdContent(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Image</label>
              <input type="file" className="form-control" id="image" onChange={handleImageUpload} />
            </div>
            {loading && <p>Loading...</p>}
            {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />}
            <div className="mb-3">
              <label className="form-label">Select Target Viewers!</label>
              {users.map(user => (
                <div key={user._id} className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={user._id}
                    checked={selectedUsers.includes(user._id)}
                    onChange={() => handleUserSelect(user._id)}
                  />
                  <label className="form-check-label" htmlFor={user._id}>{user.email}</label>
                </div>
              ))}
            </div>
            <button type="submit" className="btn btn-primary">Create Ad</button>
            <br></br> <br></br>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </form>
          
        </div>
      </div>
    </div>
    
    </div>
  );
};

export default BusinessProfile;

