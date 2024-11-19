import React, { useState } from 'react';
import { HiOutlineBars3BottomLeft } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div>
      {/* Navigation Bar */}
      <div className="navigation bg-gray-100 grid grid-cols-3">
        {/* Hamburger Icon (visible on small screens) */}
        <div className="sm:hidden">
          <div className="hover:bg-gray-300 inline-block p-2" onClick={toggleSidebar}>
            <HiOutlineBars3BottomLeft className="text-black text-[1.75rem]" />
          </div>
        </div>

        {/* Title */}
        <Link to='/' className="flex items-center justify-center font-[500] text-black text-xl">
          រដ្ឋាលក់ពុទ្រា
        </Link>

        {/* Empty Div for Layout */}
        <div></div>
      </div>

      {/* Sidebar and Overlay */}
      <div
        className={`fixed inset-0 z-10 bg-gray-800 bg-opacity-50 duration-200 transition-opacity sm:hidden ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeSidebar} // Closes sidebar when clicking outside
      >
        {/* Sidebar */}
        <div
          className={`fixed left-0 top-0 h-screen bg-white w-64 transition-all duration-200 transform text-black ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the sidebar
        >
          <div className="p-4">
            <button className='w-full' onClick={()=> setIsSidebarOpen(false)}>
              <Link to='/' className="text-xl font-semibold border-b border-gray-400 pb-4 mb-2 w-full block text-start">រដ្ឋាលក់ពុទ្រា</Link>
            </button>
            <ul>
              <li className="text-xl hover:bg-gray-200 rounded-md" onClick={()=> setIsSidebarOpen(false)}>
                <Link to='/' className='py-2 px-3 w-full block'>Home</Link>
              </li>
              <li className="text-xl hover:bg-gray-200 rounded-md" onClick={()=> setIsSidebarOpen(false)}>
                <Link to='/staff' className='py-2 px-3 w-full block'>Staff</Link>
              </li>
              <li className="text-xl hover:bg-gray-200 rounded-md" onClick={()=> setIsSidebarOpen(false)}>
                <Link to='/selling' className='py-2 px-3 w-full block'>Selling</Link>
              </li>
              <li className="text-xl hover:bg-gray-200 rounded-md" onClick={()=> setIsSidebarOpen(false)}>
                <Link to='/report' className='py-2 px-3 w-full block'>Report</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
