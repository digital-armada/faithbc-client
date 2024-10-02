"use client";
import { updateUserRole } from "@/data/actions/auth-actions";
import { useState, useEffect } from "react";

const Dropdown = ({ currentRole, roles, onRoleChange }) => {
  const [selectedRole, setSelectedRole] = useState(currentRole);

  useEffect(() => {
    setSelectedRole(currentRole);
  }, [currentRole]);

  const handleChange = (newRoleName) => {
    setSelectedRole(newRoleName);
    const selectedRole = roles.find((role) => role.name === newRoleName);
    onRoleChange(selectedRole.id);
  };

  return (
    <select
      value={selectedRole?.name}
      name="status"
      aria-label="Project status"
      className="cursor-pointer px-1 py-2"
      onChange={(e) => handleChange(e.target.value)}
    >
      {roles.map((role) => (
        <option key={role.id} value={role.name}>
          {role.name}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
