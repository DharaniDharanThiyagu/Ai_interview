import React, { useState, useEffect } from 'react';
import { LuPlus } from 'react-icons/lu';
import { CARD_BG } from '../../utils/data';
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import SummaryCard from '../../components/Cards/SummaryCard';
import moment from 'moment';
import Modal from '../../components/Modal';
import CreateSessionForm from './CreateSessionForm';

const Dashboard = () => {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [session, setSession] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null
  });

  /** Fetch All Sessions **/
  const fetchAllSessions = async () => {
    try {
    
      
      
      
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);

      setSession(response.data || []);
      console.log(setSession);
      
    } catch (error) {
      console.error("Error fetching sessions:", error?.response?.data?.message || error.message);
    }
  };

  /** Delete a Session **/
  const deleteSession = async (sessionData) => {
    if (!sessionData?._id) return;
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData._id));
      setOpenDeleteAlert({ open: false, data: null });
      fetchAllSessions(); // refresh list after delete
    } catch (error) {
      console.error("Error deleting session:", error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-10">
          {session?.length > 0 ? (
            session.map((data, index) => (
              <SummaryCard
                key={data?._id}
                colors={CARD_BG[index % CARD_BG.length]}
                role={data?.role || ""}
                topicsToFocus={data?.topicsToFocus || ""}
                experience={data?.experience || "-"}
                questions={data?.questions?.length || "-"}
                description={data?.description || ""}
                lastUpdated={
                  data?.updatedAt
                    ? moment(data?.updatedAt).format("DD MMM YYYY")
                    : ""
                }
                onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                onDelete={() =>
                  setOpenDeleteAlert({
                    open: true,
                    data: data
                  })
                }
              />
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">No sessions found</p>
          )}
        </div>
      </div>

      {/* Add New Button */}
      <button
        className="h-12 md:h-12 flex items-center justify-center gap-3 bg-gradient-to-r from-[#ff9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-orange-300 fixed bottom-10 md:bottom-20 right-10 md:right-10"
        onClick={() => setOpenCreateModal(true)}
      >
        <LuPlus className="text-2xl text-white" />
        Add New
      </button>

      {/* Create Session Modal */}
      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        fetchAllSessions={fetchAllSessions}
        hideHeader
      >
        <CreateSessionForm />
      </Modal>

      {/* Delete Confirmation Modal */}
      {openDeleteAlert.open && (
        <Modal
          isOpen={openDeleteAlert.open}
          onClose={() => setOpenDeleteAlert({ open: false, data: null })}
          hideHeader
        >
          <div className="p-6 text-center">
            <h2 className="text-lg font-semibold mb-4">Delete Session?</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <strong>{openDeleteAlert.data?.role}</strong> session?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                onClick={() => setOpenDeleteAlert({ open: false, data: null })}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={() => deleteSession(openDeleteAlert.data)}
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
