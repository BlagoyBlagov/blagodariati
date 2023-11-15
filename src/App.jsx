import { Route, Routes, } from "react-router-dom";
import Home from "./components/Home";
import HeaderNav from "./components/Layout/HeaderNav";
import Footer from "./components/Layout/Footer";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";

function App() {
    return (
        <>
            <HeaderNav />
            <main className="container">
                
                <Routes>
                    <Route path="/" element={<Home />} ></Route>
                    <Route path="/register" element={<Register />} ></Route>
                    <Route path="/login" element={<Login />} ></Route>
                </Routes>

            </main>
            <Footer />
        </>
    );
}

export default App;