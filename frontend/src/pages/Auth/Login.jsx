import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { FiX } from 'react-icons/fi';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UseContext } from '../../context/UseContext';


const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {updateUser}= React.useContext(UseContext);


  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill all the fields');
      return;
    }
    setError('');

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,

      });
      const { token } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        updateUser(response.data);
              navigate('/dashboard');

      }


     
    } catch {
      setError('Login failed');
    }
  };

  return (
     <>

      <h3 className="text-2xl font-bold mb-2 text-gray-900">Welcome Back</h3>
      <p className="mb-6 text-gray-600">Please enter your credentials to login</p>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <Input
          type="email"
          label="Email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          label="Password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button
          type="submit"
          className="bg-amber-500 text-white py-2 rounded hover:bg-amber-600 transition"
        >
          Login
        </button>
      </form>

      <div className="mt-4 text-sm text-center">
        Don't have an account?{' '}
        <button
          onClick={() => setCurrentPage('signup')}
          className="text-amber-600 hover:underline font-medium"
        >
          Sign Up
        </button>
      </div>
      </>
  );
};

export default Login;
