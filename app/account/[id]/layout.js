import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <>
      <div>Header or Sidebar if needed</div>
      <div className="container mx-auto my-32">{children}</div>
    </>
  );
};

export default MainLayout;
