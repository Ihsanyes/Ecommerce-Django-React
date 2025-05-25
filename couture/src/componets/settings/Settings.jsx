import React, { useState,useEffect} from 'react';
// import { createContext } from 'react';
import './Settings.css';
import axiosInstance from '../auth/Axios_instance';

// export const ProfileContext = createContext();

const ProfileInfo = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [originalProfile, setOriginalProfile] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [editMode, setEditMode] = useState({
    name: false,
    email: false,
    phone: false
  });

  const userFetch = async()=>{
      try{

          const response= await axiosInstance.get(`current_user/`)
                          // console.log(response.data)
                          setProfile(response.data)
                          setOriginalProfile(response.data)
                      }catch(error){
                      }
                  }
  useEffect(()=>{
      userFetch()
  },[])

  const updateUser = async()=>{
    try{
      const response= await axiosInstance.put(`update_user/`,profile)
      console.log(response.data)
    }catch(error){
      console.log(error)
    }
  }

  // console.log('Profile Info:', profile);
  console.log('Edit Mode:', editMode);

  const handleEditToggle = (field) => {
    const wasEditing = editMode[field];
    const updatedEditMode = { ...editMode, [field]: !editMode[field] };
    setEditMode(updatedEditMode);

    // If the field was being edited and now it's turned off, trigger update
    if (wasEditing && profile[field]!== originalProfile[field]) {
      updateUser(); // Save immediately after editing
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="profile-container">
      {/* <div className="avatar-container">
        <div className="avatar"></div>
        <EditIcon onClick={() => alert('Change Photo Clicked')} />
      </div> */}
      <h2>Profile</h2>
      {['name', 'email', 'phone'].map((field) => (
        <div key={field} className="field-group">
          <label className="field-label">
            {field === 'name'
              ? 'Name'
              : field === 'email'
              ? 'Email'
              : 'Phone Number'}
          </label>
          <div className="input-wrapper">
            {editMode[field] ? (
                <input
                  type="text"
                  name={field}
                  value={profile[field]}
                  onChange={handleChange}
                  className="field-input"
                  autoFocus
                />
            ) : (
              <div className="field-text">{profile[field]}</div>
            )}
            <EditIcon onClick={() => handleEditToggle(field)} />
          </div>
        </div>
      ))}

    </div>
  );
};

const EditIcon = ({ onClick }) => (
  <svg
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    height="20"
    viewBox="0 0 24 24"
    width="20"
    className="edit-icon"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path
      fill="gray"
      d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 
      7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 
      0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
    />
  </svg>
);

export default ProfileInfo;
