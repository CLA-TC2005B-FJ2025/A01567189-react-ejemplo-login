import React, { createContext, useState, useCallback } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = useCallback(async (username, password) => {
    try {
      const response = await fetch('https://urban-capybara-wr5gg96pr56r2gj5j-5000.app.github.dev/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setUser(username);
        return true;
      } else {
        const data = await response.json();
        console.error('Inicio con error:', data.error);
        return false;
      }
    } catch (error) {
      console.error('Error durante inicio:', error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
