import React, { useState } from "react";

const Side = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isSidebarActive, setSidebarActive] = useState(false);

  const handleMenuClick = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  const handleSubMenuClick = (e) => {
    e.stopPropagation();
  };

  const toggleSidebar = () => {
    setSidebarActive(!isSidebarActive);
  };

  return (
    <div
      className={`flex min-h-screen w-full items-center bg-gray-200 ${isSidebarActive ? "sidebar-active" : ""}`}
    >
      <div
        className={`relative flex h-screen w-64 flex-col gap-5 rounded-3xl bg-white p-6 transition-all duration-300 ${isSidebarActive ? "w-24" : ""}`}
      >
        <div
          className="absolute right-[-14px] top-[3.5%] flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border-2 border-gray-200 bg-white text-gray-500 transition-all duration-300 hover:text-black"
          onClick={toggleSidebar}
        >
          <i
            className={`ph-bold ph-caret-left ${isSidebarActive ? "rotate-180 transform" : ""}`}
          ></i>
        </div>
        <div className="flex gap-5 border-b border-gray-100 pb-5">
          <div className="h-11 w-11 overflow-hidden rounded-full">
            <img src="user.jpg" alt="" className="w-full object-cover" />
          </div>
          {!isSidebarActive && (
            <div className="flex flex-col">
              <p className="mb-2 text-xs font-medium uppercase text-gray-500">
                web developer
              </p>
              <p className="text-sm font-medium">John Doe</p>
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="mb-5">
            <p className="mb-2 text-xs font-medium uppercase text-gray-500">
              Main
            </p>
            <ul>
              <li
                className={`relative mb-1 list-none ${activeMenu === 0 ? "active" : ""}`}
                onClick={() => handleMenuClick(0)}
              >
                <a
                  href="#"
                  className="flex items-center gap-2 rounded-lg p-3 text-sm font-medium text-gray-500 transition-all duration-300 hover:bg-gray-100"
                >
                  <i className="icon ph-bold ph-house-simple"></i>
                  <span className="flex-1">Dashboard</span>
                </a>
              </li>
              <li
                className={`relative mb-1 list-none ${activeMenu === 1 ? "active" : ""}`}
                onClick={() => handleMenuClick(1)}
              >
                <a
                  href="#"
                  className="flex items-center gap-2 rounded-lg p-3 text-sm font-medium text-gray-500 transition-all duration-300 hover:bg-gray-100"
                >
                  <i className="icon ph-bold ph-user"></i>
                  <span className="flex-1">Audience</span>
                  <i
                    className={`arrow ph-bold ph-caret-down transition-transform duration-300 ${activeMenu === 1 ? "rotate-180 transform" : ""}`}
                  ></i>
                </a>
                <ul
                  className={`ml-5 mt-1 border-l border-gray-100 pl-5 ${activeMenu === 1 ? "block" : "hidden"}`}
                  onClick={handleSubMenuClick}
                >
                  <li className="mb-1 list-none">
                    <a
                      href="#"
                      className="flex items-center gap-2 rounded-lg p-2 text-xs font-medium text-gray-500 transition-all duration-300 hover:bg-gray-100"
                    >
                      <span>Users</span>
                    </a>
                  </li>
                  <li className="mb-1 list-none">
                    <a
                      href="#"
                      className="flex items-center gap-2 rounded-lg p-2 text-xs font-medium text-gray-500 transition-all duration-300 hover:bg-gray-100"
                    >
                      <span>Subscribers</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li
                className={`relative mb-1 list-none ${activeMenu === 2 ? "active" : ""}`}
                onClick={() => handleMenuClick(2)}
              >
                <a
                  href="#"
                  className="flex items-center gap-2 rounded-lg p-3 text-sm font-medium text-gray-500 transition-all duration-300 hover:bg-gray-100"
                >
                  <i className="icon ph-bold ph-file-text"></i>
                  <span className="flex-1">Posts</span>
                </a>
              </li>
              <li
                className={`relative mb-1 list-none ${activeMenu === 3 ? "active" : ""}`}
                onClick={() => handleMenuClick(3)}
              >
                <a
                  href="#"
                  className="flex items-center gap-2 rounded-lg p-3 text-sm font-medium text-gray-500 transition-all duration-300 hover:bg-gray-100"
                >
                  <i className="icon ph-bold ph-calendar-blank"></i>
                  <span className="flex-1">Schedules</span>
                </a>
              </li>
              <li
                className={`relative mb-1 list-none ${activeMenu === 4 ? "active" : ""}`}
                onClick={() => handleMenuClick(4)}
              >
                <a
                  href="#"
                  className="flex items-center gap-2 rounded-lg p-3 text-sm font-medium text-gray-500 transition-all duration-300 hover:bg-gray-100"
                >
                  <i className="icon ph-bold ph-chart-bar"></i>
                  <span className="flex-1">Income</span>
                  <i
                    className={`arrow ph-bold ph-caret-down transition-transform duration-300 ${activeMenu === 4 ? "rotate-180 transform" : ""}`}
                  ></i>
                </a>
                <ul
                  className={`ml-5 mt-1 border-l border-gray-100 pl-5 ${activeMenu === 4 ? "block" : "hidden"}`}
                  onClick={handleSubMenuClick}
                >
                  <li className="mb-1 list-none">
                    <a
                      href="#"
                      className="flex items-center gap-2 rounded-lg p-2 text-xs font-medium text-gray-500 transition-all duration-300 hover:bg-gray-100"
                    >
                      <span>Earnings</span>
                    </a>
                  </li>
                  <li className="mb-1 list-none">
                    <a
                      href="#"
                      className="flex items-center gap-2 rounded-lg p-2 text-xs font-medium text-gray-500 transition-all duration-300 hover:bg-gray-100"
                    >
                      <span>Funds</span>
                    </a>
                  </li>
                  <li className="mb-1 list-none">
                    <a
                      href="#"
                      className="flex items-center gap-2 rounded-lg p-2 text-xs font-medium text-gray-500 transition-all duration-300 hover:bg-gray-100"
                    >
                      <span>Declines</span>
                    </a>
                  </li>
                  <li className="mb-1 list-none">
                    <a
                      href="#"
                      className="flex items-center gap-2 rounded-lg p-2 text-xs font-medium text-gray-500 transition-all duration-300 hover:bg-gray-100"
                    >
                      <span>Payouts</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="mb-5">
            <p className="mb-2 text-xs font-medium uppercase text-gray-500">
              Settings
            </p>
            <ul>
              <li className="relative mb-1 list-none">
                <a
                  href="#"
                  className="flex items-center gap-2 rounded-lg p-3 text-sm font-medium text-gray-500 transition-all duration-300 hover:bg-gray-100"
                >
                  <i className="icon ph-bold ph-gear"></i>
                  <span className="flex-1">Settings</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mb-5">
          <p className="mb-2 text-xs font-medium uppercase text-gray-500">
            Account
          </p>
          <ul>
            <li className="relative mb-1 list-none">
              <a
                href="#"
                className="flex items-center gap-2 rounded-lg p-3 text-sm font-medium text-gray-500 transition-all duration-300 hover:bg-gray-100"
              >
                <i className="icon ph-bold ph-info"></i>
                <span className="flex-1">Help</span>
              </a>
            </li>
            <li className="relative mb-1 list-none">
              <a
                href="#"
                className="flex items-center gap-2 rounded-lg p-3 text-sm font-medium text-gray-500 transition-all duration-300 hover:bg-gray-100"
              >
                <i className="icon ph-bold ph-sign-out"></i>
                <span className="flex-1">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto text-center text-3xl text-white">
        <h1>
          Fully Responsive <br /> Sidebar by OSC
        </h1>
      </div>
    </div>
  );
};

export default Side;
