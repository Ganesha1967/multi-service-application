// import React, { useContext, useEffect, useState } from "react";
// import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../utils/data";
// import { UserContext } from "../../context/userContext";
// import { useNavigate } from "react-router-dom";

// const SideMenu = ({ activeMenu }) => {
//   const { user, clearUser } = useContext(UserContext);
//   const [sideMenuData, setSideMenuData] = useState([]);

//   const navigate = useNavigate();

//   const handleClick = (route) => {
//     if (route === "logout") {
//       handleLogout();
//       return;
//     }

//     navigate(route);
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     clearUser();
//     navigate("/login");
//   };

//   useEffect(() => {
//     if (user) {
//       setSideMenuData(user?.role === 'admin' ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA)
//     }
//     return () => {};
//   }, [user]);

//   return <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 sticky top-[61px] z-20">
//     <div className="flex flex-col items-center justify-center mb-7 pt-5">
//       <div className="relative">
//         <img
//           src={user?.profileImageUrl || ""}
//           alt="Profile Image"
//           className="w-20 h-20 bg-slate-400 rounded-full"
//         />
//       </div>

//       {user?.role === "admin" && (
//         <div className="text-[10px] font-medium text-white bg-primary px-3 py-0.5 rounded mt-1">
//           Admin
//         </div>
//       )}

//       <h5 className="text-gray-950 font-medium leading-6 mt-3">
//         {user?.name || ""}
//       </h5>

//       <p className="text-[12px] text-gray-500">{user?.email || ""}</p>
//     </div>

//     {sideMenuData.map((item, index) => (
//       <button
//         key={`menu_${index}`}
//         className={`w-full flex items-center gap-4 text-[15px] ${
//           activeMenu == item.label
//             ? "text-primary bg-linear-to-r from-blue-50/40 to-blue-100/50 border-r-3"
//             : ""
//         } py-3 px-6 mb-3 cursor-pointer`}
//         onClick={() => handleClick(item.path)}
//       >
//         <item.icon className="text-xl" />
//         {item.label}
//       </button>
//     ))}
//   </div>;
// };

// export default SideMenu;

import React, { useContext, useEffect, useState } from 'react';
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from '../../utils/data';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import { LuLogOut } from 'react-icons/lu'; // Иконка для выхода (если используете react-icons)

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === 'logout') {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/login');
  };

  useEffect(() => {
    if (user) {
      setSideMenuData(
        user?.role === 'admin' ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA
      );
    }
  }, [user]);

  // Генерация инициалов для заглушки аватарки
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-100 sticky top-[61px] z-20 flex flex-col shadow-sm">
      {/* --- Блок профиля --- */}
      <div className="flex flex-col items-center justify-center pt-8 pb-6 px-4 border-b border-gray-50/80">
        <div className="relative group">
          <div className="w-20 h-20 rounded-full ring-2 ring-primary/20 p-1 transition-all group-hover:ring-primary/40">
            {user?.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt="Profile"
                className="w-full h-full rounded-full object-cover shadow-inner"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center text-xl font-bold shadow-inner">
                {getInitials(user?.name)}
              </div>
            )}
          </div>
        </div>

        {user?.role === 'admin' && (
          <div className="text-[10px] font-bold tracking-wider uppercase text-white bg-indigo-500 px-3 py-1 rounded-full mt-3 shadow-sm shadow-indigo-500/30">
            Admin
          </div>
        )}

        <h5 className="text-gray-900 font-semibold text-lg leading-6 mt-3 truncate w-full text-center">
          {user?.name || 'Guest'}
        </h5>
        <p className="text-[12px] text-gray-500 truncate w-full text-center">
          {user?.email || 'no-email@example.com'}
        </p>
      </div>

      {/* --- Блок навигации --- */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {sideMenuData.map((item, index) => {
          const isActive = activeMenu === item.label;
          return (
            <button
              key={`menu_${index}`}
              className={`w-full flex items-center gap-4 text-[15px] font-medium px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer group
                ${
                  isActive
                    ? 'bg-primary/5 text-primary shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              onClick={() => handleClick(item.path)}
            >
              <item.icon
                className={`text-xl transition-colors ${
                  isActive
                    ? 'text-primary'
                    : 'text-gray-400 group-hover:text-gray-600'
                }`}
              />
              <span className="flex-1 text-left">{item.label}</span>

              {/* Индикатор активной страницы (полоска справа) */}
              {isActive && (
                <div className="w-1 h-6 bg-primary rounded-full shadow-sm shadow-primary/50"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* --- Блок выхода ---
      <div className="p-4 border-t border-gray-100 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 text-[15px] font-medium text-red-500 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors cursor-pointer"
        >
          <LuLogOut className="text-xl" />
          Logout
        </button>
      </div> */}
    </div>
  );
};

export default SideMenu;
