import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function ProtectedRoute({ children }) {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsValid(false);
      return;
    }

    const verifyToken = async () => {
      try {
        await axios.get("http://localhost:5001/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsValid(true);
      } catch (error) {
        console.log("Token verification failed");

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setIsValid(false);
      }
    };

    verifyToken();
  }, []);

  // Checking token
  if (isValid === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Checking authentication...</p>
      </div>
    );
  }

  // Not authenticated
  if (!isValid) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated
  return children;
}

export default ProtectedRoute;