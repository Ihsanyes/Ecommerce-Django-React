// import axios from "axios";
// import { API_URL } from "../../Api_urls";
import axiosInstance from "./Axios_instance";
// import { useNavigate } from "react-router-dom";


const setToken = (accessToken, refreshToken)=>{
    console.log("accessToken", accessToken)
    console.log("refreshToken", refreshToken)
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
}

const clearTokens = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

export const register = async (email, phone) => {
  try{
    const response = await axiosInstance.post('send-otp/', { email, phone});
    // const response = await axios.post(`${API_URL}send-otp/`, { email, phone});
    console.log("response", response.data)
    return response;
  }catch (error) {
    console.error("Error sending OTP:", error.response.data);
    let errorMessage = error.response.data.error || "An error occurred";
    alert(errorMessage)
    throw error; // Rethrow the error to handle it in the calling function
  };}

export const alreadyRegister =async(email)=>{
  try{
    const response = await axiosInstance.post('login-otp/',{email});
    console.log("response", response.data)
  }catch(error){
    console.error("Error sending OTP:", error.response.data);
    let errorMessage = error.response.data.error || "An error occurred";
    alert(errorMessage)
    throw error; // Rethrow the error to handle it in the calling function
  }
}

export const verifyOtp = async (email, otp) =>{
  // const navigate = useNavigate()

    console.log("email", email)
    console.log("otp", otp)
  try{
    const response = await axiosInstance.post('verify-otp/', { email, otp });
    if (response.data.access){
        setToken(response.data.access, response.data.refresh)
    }
    return response;
  }catch(error){
    console.error("Error verifying OTP:", error.response.data);
    let errorMessage = error.response.data.error || "An error occurred";
    alert(errorMessage)
    // navigate('')
    return error; // Rethrow the error to handle it in the calling function
  }
  };

export const logout =()=>{
    clearTokens();
    window.location.href = '/login'; // Redirect to login page after logout
  
}
export const autoLogout =()=>{
    clearTokens();
    // window.location.href = '/login'; // Redirect to login page after logout
  
}

export const getAccessToken = () => localStorage.getItem('access_token');
export const getRefreshToken = () => localStorage.getItem('refresh_token');
export const isAuthenticated = () => !!getAccessToken();
