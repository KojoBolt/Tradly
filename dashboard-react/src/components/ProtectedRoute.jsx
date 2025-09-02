// // ProtectedRoute.jsx
// import { Navigate } from "react-router-dom";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { getAuth } from "firebase/auth";

// const ProtectedRoute = ({ children }) => {
//   const auth = getAuth();
//   const [user, loading] = useAuthState(auth);

//   if (loading) return <p>Loading...</p>;

//   return user ? children : <Navigate to="/login" replace />;
// };

// // export default ProtectedRoute;
