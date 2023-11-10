import { Route, Routes, } from "react-router-dom";
import Home from "./components/Home";
import HeaderNav from "./components/Layout/HeaderNav";

function App() {
    return (
        <>
            <HeaderNav />
            <main className="container">
                
                <Routes>
                    <Route path="/" element={<Home />} ></Route>
                </Routes>
                
            </main>
        </>
    );
}

export default App;