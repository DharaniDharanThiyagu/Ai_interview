import React, {  useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { UseContext } from '../../context/UseContext';
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import RoleInfoHeader from '../../pages/InterviewPrep/components/RoleInfoHeader';
import axiosInstance from '../../utils/axiosInstance';
import QuestionCard from '../../components/Cards/QuestionCard';
import { API_PATHS } from '../../utils/apiPaths';
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import { LuCircleAlert, LuListCollapse } from 'react-icons/lu';
import AIResponsePreview from './components/AIReponsePreview';
import Drawer from '../../components/Loader/Drawer';
import SkeletonLoader from '../../components/Loader/SkeletonLoader';
import { AiOutlinePlus, AiOutlineLoading3Quarters } from "react-icons/ai";

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [aiError, setAiError] = useState('');
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Session load
  const [isUpdateLoading, setIsUpdateLoading] = useState(false); // Action load

  // ✅ Fetch session details
  const fetchSessionDetailsById = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const { data } = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));
      if (data?.session) {
        setSessionData(data.session);
      } else {
        setErrorMsg('No session data found.');
      }
    } catch (error) {
      toast.error('Failed to load session details');
      setErrorMsg('Failed to load session details.');
    } finally {
      setIsLoading(false);
    }
  }, [sessionId]);

  // ✅ Generate AI explanation for a question
  const generateConceptExplanation = async (question) => {
   
    try {
       setOpenLearnMoreDrawer(true);
    setAiError('');
    setExplanation(null)
    setIsUpdateLoading(true);
      const { data } = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION, { question });
      if (data) {
        setExplanation(data);
        console.log('AI Explanation:', data);
        console.log(explanation);
        
        
      }
    } catch {
      toast.error('Failed to generate explanation');
      setAiError('Failed to generate explanation.');
      
    } finally {
      setIsUpdateLoading(false);
    }
  };

  // ✅ Toggle pin status without full re-fetch
  const toggleQuestionPinStatus = async (questionId) => {
    setIsUpdateLoading(true);
    try {
      const { data } = await axiosInstance.post(API_PATHS.QUESTION.PIN(questionId));
      if (data?.question) {
        setSessionData((prev) => ({
          ...prev,
          questions: prev.questions.map((q) =>
            q._id === questionId ? { ...q, isPinned: !q.isPinned } : q
          ),
        }));
      }
    } catch {
      toast.error('Failed to update pin status');
    } finally {
      setIsUpdateLoading(false);
    }
  };

  // ✅ Add more questions
  const uploadMoreQuestions = async () => {
    setIsUpdateLoading(true);
    try {
      const { data } = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS,{
        role:sessionData?.role,
        experience:sessionData?.experience,
        topicsToFocus:sessionData?.topicsToFocus,
        numberOfQuestions:20
      });
      console.log(data);
      const resPonse=await axiosInstance.post(API_PATHS.QUESTION.ADD_TO_SESSION,{
        sessionId,
        questions:data
      })
      if (resPonse.data) {
        toast.success("Add More Questions!! ")
        fetchSessionDetailsById()
        
      }



      

    } catch(err) {
      toast.error('Failed to upload more questions');
      console.log(err.message);
      
    } finally {
      setIsUpdateLoading(false);
    }
  };

  // ✅ Initial load
  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    } else {
      setErrorMsg('Session ID is missing');
      setIsLoading(false);
      
    }
  }, [sessionId, fetchSessionDetailsById]);
  
  
  return (
    <DashboardLayout>
      {isLoading ? (
        <div className="flex justify-center py-10">
          <SpinnerLoader />
        </div>
      ) : errorMsg ? (
        <div className="text-red-500 text-center py-5">{errorMsg}</div>
      ) : (
        <>
          <RoleInfoHeader
            role={sessionData?.role || ''}
            experience={sessionData?.experience || ''}
            topicsToFocus={sessionData?.topicsToFocus || ''}
            description={sessionData?.description || ''}
            questions={sessionData?.questions?.length || '-'}
            lastUpdated={
              sessionData?.updatedAt
                ? moment(sessionData.updatedAt).format('DD MMM YYYY')
                : '-'
            }
          />

          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Interview Q & A</h2>

            </div>

            <div
              className={`col-span-12 ${
                openLearnMoreDrawer ? 'md:col-span-7' : 'md:col-span-8'
              }`}
            >
              <AnimatePresence>
                {sessionData?.questions?.length > 0 ? (
                  sessionData.questions.map((data, index) => (
                    <motion.div
                      key={data?._id || index}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <QuestionCard
                        question={data?.question}
                        answer={data?.answer}
                        onLearnMore={() =>
                          generateConceptExplanation(data.question)
                        }
                        isPinned={data?.isPinned}
                        onTogglePin={() =>
                          toggleQuestionPinStatus(data._id)
                        }
                        
                      />
                      {!isLoading && sessionData?.questions?.length === index + 1 && (
                        <div className="flex items-center justify-center mt-5">
                          <button className="flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded text-nowrap cursor-pointer" onClick={uploadMoreQuestions} disabled={isLoading||isUpdateLoading}>
{isUpdateLoading?(
  <SpinnerLoader/>):(
    <LuListCollapse className=''/>
  )}{""}Load More
                          </button>


                        </div>
                      )}
                    </motion.div>
                  ))
                ) : (
                  <div className="text-gray-500 text-center py-5">
                    No questions available for this session.
                  </div>
                )}


              </AnimatePresence>
            </div>

            {/* ✅ AI Explanation Drawer */}
            <Drawer
              isOpen={openLearnMoreDrawer}
              onClose={() => setOpenLearnMoreDrawer(false)}
                             title={explanation?.title}
            >
              {aiError && (
                <p className="flex gap-2 text-sm text-amber-600 font-medium">
                  <LuCircleAlert className="mt-1" />
                  {aiError}
                </p>
              )}

              {isUpdateLoading ? (
                <SkeletonLoader />
              ) : explanation && explanation.explanation ? (
                
                <AIResponsePreview content={explanation.explanation} />
              ) : (
                !aiError && <p className="text-gray-500">No explanation available.</p>
              )}
            </Drawer>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default InterviewPrep;
