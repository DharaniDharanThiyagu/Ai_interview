import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import axiosInstance from '.././../utils/axiosInstance';
import { API_PATHS } from '.././../utils/apiPaths';

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: '',
    experience: '',
    topicsToFocus: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();
    const { role, experience, topicsToFocus } = formData;

    if (!role || !experience || !topicsToFocus) {
      setError('Please fill all the fields');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        role,
        experience,
        topicsToFocus,
        numberOfQuestions: 20
      });

      const generatedQuestions = aiResponse.data || [];
      console.log(generatedQuestions);
      

      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generatedQuestions
      });

      if (response.data?.session?._id) {
        navigate(`/interview-prep/${response.data.session._id}`);
      }
    } catch (error) {
      console.error(error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 min-h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-2">Start a New Interview Journey</h3>
        <p className="text-sm text-gray-500 mb-4">
          Fill out the form below to create a new interview preparation session.
        </p>
        <form onSubmit={handleCreateSession} className="space-y-4">
          <Input
            label="Role"
            type="text"
            placeholder="Enter the role you are preparing for"
            value={formData.role}
            onChange={(e) => handleChange('role', e.target.value)}
            required
          />
          <Input
            label="Experience (in years)"
            type="number"
            placeholder="Enter your experience level"
            value={formData.experience}
            onChange={(e) => handleChange('experience', e.target.value)}
            required
          />
          <Input
            label="Topics to Focus"
            placeholder="Enter topics you want to focus on"
            value={formData.topicsToFocus}
            onChange={(e) => handleChange('topicsToFocus', e.target.value)}
            required
          />
          <Input
            label="Description"
            type="textarea"
            placeholder="Enter a brief description of your preparation goals"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="btn-primary bg-orange-500 text-white py-2 px-4 rounded w-full flex items-center justify-center gap-2 hover:bg-orange-600 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <SpinnerLoader />
                <span>Loading...</span>
              </>
            ) : (
              'Create Session'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSessionForm;
