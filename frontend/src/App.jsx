import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import WatchPage from "./pages/WatchPage";
import SearchPage from "./pages/SearchPage";
import SearchHistoryPage from "./pages/SearchHistoryPage";
import NotFoundPage from "./pages/404";
import Bookmark from "./pages/home/Bookmark";

function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore();

  useEffect(() => {
    authCheck(); // Call authCheck when the app loads
  }, [authCheck]);

  // Loading state while checking auth
  if (isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route
          path="/bookmarks"
          element={user ? <Bookmark /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signUp"
          element={user ? <Navigate to="/" /> : <SignUp />}
        />

        {/* Protected routes */}
        <Route
          path="/watch/:id"
          element={user ? <WatchPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/search"
          element={user ? <SearchPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/history"
          element={user ? <SearchHistoryPage /> : <Navigate to="/login" />}
        />

        {/* Catch-all route for 404 */}
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>

      {/* Footer always visible */}
      <Footer />

      {/* Toast notifications */}
      <Toaster />
    </>
  );
}

export default App;
