import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Replace with your backend URL

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};
export const verifyOtp = async (otpData) => {
  const response = await axios.post(`${API_URL}/verifyOTP`, otpData);
  return response.data;
};
export const sendOtp = async (otpData) => {
  const response = await axios.post(`${API_URL}/sendOTP`, otpData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  console.log(response);

  if (response.data.token) {
    const user = {
      token: response.data.token,
      userInfo: response.data.userInfo, // Adjust based on your backend response structure
    };
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } else {
    throw new Error('Login failed');
  }
};

export const logout = () => {
  localStorage.removeItem('user');
};
