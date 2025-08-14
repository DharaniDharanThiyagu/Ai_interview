import React, { useContext } from 'react';
import Navbar from '../Layouts/Navbar';
import { UseContext } from '../../context/UseContext';

const DashboardLayout = ({ children }) => {
  const { user } = useContext(UseContext);

  return (
    <div>
      <Navbar />
      {user && <div>{children}</div>}
    </div>
  );
};

export default DashboardLayout;
 