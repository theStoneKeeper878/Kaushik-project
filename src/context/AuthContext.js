import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 🔥 Load role from localStorage when app starts
    const storedRole = localStorage.getItem('role');
    if (storedRole) setRole(storedRole);
  }, []);

  const login = (userRole) => {
    setRole(userRole);
    localStorage.setItem('role', userRole);
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
