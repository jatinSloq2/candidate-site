import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AnalyzeResume from "./pages/AnalyzeResume";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ResumeById from "./pages/ResumeById";
import UploadResume from "./pages/UploadResume";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  if (isLoggedIn) {
    return children;
  } else {
    window.location.href = "https://auth.jatinsinghdev.tech";
    return null;
  }

}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* Protected */}
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/analyze" element={<ProtectedRoute><AnalyzeResume /></ProtectedRoute>} />
        <Route path="/resume/:id" element={<ProtectedRoute><ResumeById /></ProtectedRoute>} />
        <Route path="/upload" element={<ProtectedRoute><UploadResume /></ProtectedRoute>} />
        <Route path="*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

      </Routes>
    </Router>
  );
}

export default App;
