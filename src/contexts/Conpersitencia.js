import React, { createContext, useState, useCallback, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Intenta obtener el usuario del localStorage al cargar el componente
    const storedUser = localStorage.getItem('user');
    return storedUser ? storedUser : null;
  });

  const login = useCallback(async (username, password) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setUser(username);
        // Guarda el usuario en localStorage al iniciar sesión
        localStorage.setItem('user', username);
        return true;
      } else {
        const data = await response.json();
        console.error('Error en inicio:', data.error);
        return false;
      }
    } catch (error) {
      console.error('Error durante inicio:', error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    // Elimina el usuario del localStorage al cerrar sesión
    localStorage.removeItem('user');
  }, []);

  // Efecto para limpiar el estado del usuario al desmontar el componente (opcional)
  useEffect(() => {
    return () => {
      // Puedes agregar lógica adicional de limpieza aquí si es necesario
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};