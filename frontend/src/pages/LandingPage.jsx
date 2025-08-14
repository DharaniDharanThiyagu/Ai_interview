import React, { useState } from 'react';
import { LuSparkles } from 'react-icons/lu';
import Hero_Img from '../assets/hero_image.png';
import { APP_FEATURES } from '../utils/data';
import Modal from '../components/Modal';
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';
import { UseContext } from '../context/UseContext';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';
const LandingPage = () => {
  const {user}= React.useContext(UseContext);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (user) {
      window.location.href = '/dashboard';
      return;
    }

    setOpenAuthModal(true);
  };

  return (
    <>
      <div className="w-full min-h-screen bg-[#fffcef] relative overflow-x-hidden font-sans">
        {/* Background Blur */}
        <div className="w-[500px] h-[500px] bg-amber-300/20 blur-[120px] absolute top-[-100px] left-[-100px] z-0" />

        {/* Content Wrapper */}
        <div className="container mx-auto px-4 pt-10 pb-24 relative z-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-16">
            <div className="text-2xl font-bold text-gray-900">InterviewAI</div>
        {user?(<ProfileInfoCard/>):(    <button
              onClick={() => setOpenAuthModal(true)}
              className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800 transition"
            >
              Login / Sign Up
            </button>
            )}
          </header>

          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Text Section */}
            <div className="md:w-1/2 space-y-6 text-center md:text-left">
              <p className="text-lg font-semibold text-amber-700 uppercase tracking-wider flex items-center justify-center md:justify-start gap-2">
                <LuSparkles className="w-5 h-5" />
                AI Powered
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                Ace Interviews with <br />
                <span className="text-amber-600">AI-Powered</span> Learning
              </h1>
              <p className="text-gray-700 text-lg max-w-md mx-auto md:mx-0">
                Get role-specific questions, explore detailed answers, dive into concepts, and organize everything your way. From preparation to mastery — your complete AI interview toolkit is here.
              </p>
              <button
                onClick={handleCTA}
                className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-md font-semibold transition"
              >
                Get Started
              </button>
            </div>

            {/* Image Section */}
            <div className="md:w-1/2 mb-12 md:mb-0">
              <img
                src={Hero_Img}
                alt="AI Interview Illustration"
                className="w-full max-w-md mx-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 pt-10 pb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            Why Choose <span className="text-amber-600">InterviewAI?</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {APP_FEATURES.map((feature) => (
              <div
                key={feature.id}
                className="bg-[#fffef8] shadow-xs rounded-xl p-6 text-center border hover:shadow-amber-100 transition border-amber-100"
              >
                <h3 className="text-base font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-gray-600">
          <div className="text-center md:text-left text-sm">
            &copy; {new Date().getFullYear()} InterviewAI. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
            <a href="/privacy-policy" className="hover:text-gray-900">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-gray-900">Terms of Service</a>
            <a href="/contact" className="hover:text-gray-900">Contact</a>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {openAuthModal && (
        <Modal
          isOpen={openAuthModal}
          onClose={() => {
            setOpenAuthModal(false);
            setCurrentPage("login");
          }}
          hideHeader
        >
          <div>
            {currentPage === "login" && (
              <Login setCurrentPage={setCurrentPage} />
            )}
            {currentPage === "signup" && (
              <SignUp setCurrentPage={setCurrentPage} />
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default LandingPage;
