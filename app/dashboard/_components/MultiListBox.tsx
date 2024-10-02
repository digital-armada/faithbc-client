"use client";

import React, { useRef, useState } from "react";

const MultiSelect = ({ allUsers: users, commUsers, onSelectionChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState(commUsers);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleUser = (user) => {
    setSelectedUsers((prevSelected) => {
      const newSelected = prevSelected.some((u) => u.id === user.id)
        ? prevSelected.filter((u) => u.id !== user.id)
        : [...prevSelected, user];

      // Call the callback function with the new selection
      onSelectionChange(newSelected);

      return newSelected;
    });
  };

  return (
    <div className="relative min-h-96 w-full">
      <input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClick={() => setIsOpen(true)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 100)}
        placeholder="Search users..."
        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* SELECTED USERS */}
      <div className="absolute mt-2 flex w-full flex-col gap-2">
        {selectedUsers.map((user) => (
          <span
            key={user.id}
            className="flex w-full items-center justify-between bg-blue-100 px-2 py-1 text-sm font-medium text-blue-800"
          >
            {user.name}
            <button
              onClick={() => toggleUser(user)}
              className="ml-1 text-2xl text-blue-600 hover:text-blue-800 focus:outline-none"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      {/* THE FLOATING MENU USER SELECTOR */}
      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="flex cursor-pointer items-center justify-between px-4 py-2 hover:bg-gray-100"
              onClick={() => toggleUser(user)}
              onMouseDown={(e) => e.preventDefault()}
            >
              <span>{user.name}</span>
              {selectedUsers.some((u) => u.id === user.id) && (
                <svg
                  className="h-5 w-5 text-green-500"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;

// import { useMemo, useRef, useState } from "react";
//
// export default function MultiSelect({ allUsers, commUsers }) {
//   const [query, setQuery] = useState("");
//   const [selected, setSelected] = useState(commUsers);
//   const [menuOpen, setMenuOpen] = useState(true);
//
//   const inputRef = useRef(null);
//
//   const usersList = useMemo(() => {
//     return allUsers?.map((user) => ({
//       name: user?.name,
//     }));
//   }, [allUsers]);
//
//   const filteredUsers = useMemo(() => {
//     return usersList.filter(
//       (user) =>
//         user.name.toLowerCase().includes(query.toLowerCase().trim()) &&
//         !selected.some((selectedUser) => selectedUser.name === user.name),
//     );
//   }, [query, selected, usersList]);
//
//   const isDisabled =
//     !query.trim() ||
//     selected.some(
//       (item) => item.name.toLowerCase().trim() === query.toLowerCase().trim(),
//     );
//
//   const addUser = (user) => {
//     setSelected((prev) => [...prev, user]);
//     setQuery("");
//     inputRef.current?.focus();
//     setMenuOpen(true);
//   };
//
//   return (
//     <div className="relative grid place-items-center bg-[#eef1f8]">
//       <div className="card flex w-full items-center justify-between gap-2.5 p-3">
//         <Icons.Search />
//         <input
//           ref={inputRef}
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value.trimStart())}
//           placeholder="Search or Create tags"
//           className="flex-1 bg-transparent px-2 py-1 text-sm caret-rose-600"
//           onFocus={() => setMenuOpen(true)}
//           onBlur={() => setTimeout(() => setMenuOpen(false), 200)}
// onKeyDown={(e) => {
//   if (e.key === "Enter" && !isDisabled && filteredUsers.length > 0) {
//     addUser(filteredUsers[0]);
//   }
// }}
//         />
//       </div>
//
//       {/* THE POPUP MENU SELECTOR */}
//       {menuOpen && (
//         <div className="card scrollbar-thin scrollbar-track-slate-50 scrollbar-thumb-slate-200 absolute mt-2 flex w-full justify-start overflow-y-auto bg-gray-300 p-1">
//           <ul className="w-full">
//             {filteredUsers.length > 0 ? (
//               filteredUsers.map((user) => (
//                 <li
//                   key={user.name}
//                   className="w-full cursor-pointer p-2 hover:bg-rose-50 hover:text-rose-500"
//                   onMouseDown={(e) => e.preventDefault()}
//                   onClick={() => addUser(user)}
//                 >
//                   {user.name}
//                 </li>
//               ))
//             ) : (
//               <li className="p-2 text-gray-500">No options available</li>
//             )}
//           </ul>
//         </div>
//       )}
//
//       {/* SELECTED MENU */}
//       <div className="h-96 w-full text-sm">
//         {selected.length > 0 && (
//           <div className="mb-2 flex flex-wrap gap-1 bg-white p-2 text-xs">
//             {selected.map((user) => (
//               <div
//                 key={user.name}
//                 className="flex w-full items-center justify-between gap-2 border border-gray-400 bg-gray-50 px-3 py-1.5 text-gray-500"
//               >
//                 {user.name}
//                 <div
//                   onMouseDown={(e) => e.preventDefault()}
//                   onClick={() =>
//                     setSelected(selected.filter((i) => i.name !== user.name))
//                   }
//                 >
//                   <Icons.Close />
//                 </div>
//               </div>
//             ))}
//             <div className="w-full text-right">
//               <span
//                 className="cursor-pointer text-gray-400"
//                 onClick={() => {
//                   setSelected([]);
//                   inputRef.current?.focus();
//                 }}
//               >
//                 Clear all
//               </span>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
//
// export class Icons {
//   static Search() {
//     return (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke-width="1.5"
//         stroke="currentColor"
//         className="h-5 w-5 text-rose-500"
//       >
//         <path
//           stroke-linecap="round"
//           stroke-linejoin="round"
//           d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
//         />
//       </svg>
//     );
//   }
//   static Close() {
//     return (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke-width="1.5"
//         stroke="currentColor"
//         className="h-4 w-4 cursor-pointer text-gray-400 hover:text-gray-600"
//       >
//         <path
//           stroke-linecap="round"
//           stroke-linejoin="round"
//           d="M6 18L18 6M6 6l12 12"
//         />
//       </svg>
//     );
//   }
// }
