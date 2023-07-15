import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        {/* Sign In & Up */}
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<Signin />} />

        {/* Home */}
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
