import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./auth/firebase";

import LiquidCanvas from "./components/LiquidCanvas";
import { FishCursor } from "./components/FishCursor";
import Login from "./pages/Login";
import Notes from "./pages/Notes";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <>
      <LiquidCanvas />
      <FishCursor />

      <div className="center-wrapper">
        {user ? <Notes user={user} /> : <Login />}
      </div>
    </>
  );
}
