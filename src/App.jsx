import { Route, Routes, } from "react-router-dom";
import Home from "./components/Home";
import HeaderNav from "./components/Layout/HeaderNav";
import Footer from "./components/Layout/Footer";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Profile from "./components/Profile/Profile";

function App() {
    return (
        <>
            <HeaderNav />
            <main className="container">
                
                <Routes>
                    <Route path="/" element={<Home />} ></Route>
                    <Route path="/register" element={<Register />} ></Route>
                    <Route path="/login" element={<Login />} ></Route>

                    <Route path="/profile/:userId" element={<Profile />} ></Route>
                </Routes>

            </main>
            <Footer />
        </>
    );
}

export default App;