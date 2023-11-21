import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authSerice from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoding] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authSerice.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoding(false))
  }, [])

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          TODO:  <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
