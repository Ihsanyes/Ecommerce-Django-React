import axios from "axios";

const API_URL = "http://127.0.0.1:8000/"; // Replace with your actual API URL

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
    const response = await axios.post(`${API_URL}send-otp/`, { email, phone});
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
    const response = await axios.post(`${API_URL}login-otp/`,{email});
    console.log("response", response.data)
  }catch(error){
    console.error("Error sending OTP:", error.response.data);
    let errorMessage = error.response.data.error || "An error occurred";
    alert(errorMessage)
    throw error; // Rethrow the error to handle it in the calling function
  }
}

export const verifyOtp = async (email, otp) =>{
    console.log("email", email)
    console.log("otp", otp)
  try{
    const response = await axios.post(`${API_URL}verify-otp/`, { email, otp });
    if (response.data.access){
        setToken(response.data.access, response.data.refresh)
    }
    return response;
  }catch(error){
    console.error("Error verifying OTP:", error.response.data);
    let errorMessage = error.response.data.error || "An error occurred";
    alert(errorMessage)
    return error; // Rethrow the error to handle it in the calling function
  }
  };

export const logout =()=>{
    clearTokens();
    window.location.href = '/login'; // Redirect to login page after logout
  
}

export const getAccessToken = () => localStorage.getItem('access_token');
export const getRefreshToken = () => localStorage.getItem('refresh_token');
export const isAuthenticated = () => !!getAccessToken();
