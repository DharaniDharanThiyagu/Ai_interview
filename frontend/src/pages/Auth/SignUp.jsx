import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { UseContext } from '../../context/UseContext';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import uploadImage from '../../utils/uploadimage';
const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {updateUser}=useContext(UseContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (!fullName || !email || !password) {
      setError('Please fill all required fields');
      return;
    }

    try {
      let profileImageUrl = '';
      if (profilePic) {
        const imgUploadRes=await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl||"";

      }
      const response=await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        name: fullName,
        email,
        password,
        profileImageUrl
      })
      const {token}=response.data;
      if(token){
        localStorage.setItem('token', token);
        updateUser(response.data);
        navigate('/dashboard');
      }


      console.log('Signup submitted', { fullName, email, password, profilePic });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Signup failed');
    }
  };

  return (
    <>
      <h3 className="text-2xl font-bold mb-2 text-gray-900">Create an Account</h3>
      <p className="mb-6 text-gray-600">Sign up to get started</p>

      <form onSubmit={handleSignup} className="flex flex-col gap-4">
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

        <Input
          type="text"
          label="Full Name"
          value={fullName}
          placeholder="John Doe"
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          type="email"
          label="Email"
          value={email}
          placeholder="email@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          label="Password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-amber-500 text-white py-2 rounded hover:bg-amber-600 transition"
        >
          Sign Up
        </button>
      </form>

      <div className="mt-4 text-sm text-center">
        Already have an account?{' '}
        <button
          type="button"
          onClick={() => setCurrentPage('login')}
          className="text-amber-600 hover:underline font-medium"
        >
          Log In
        </button>
      </div>
    </>
  );
};

export default SignUp;
