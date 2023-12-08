import { Route, Routes, } from "react-router-dom";

import { AuthProvider } from './contexts/authContext';

import HeaderNav from "./components/Layout/HeaderNav";
import Footer from "./components/Layout/Footer";

import Home from "./components/Home";

import Profile from "./components/Profile/Profile";

import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Logout from "./components/Auth/Logout";

import CreatePost from "./components/Posts/CreatePost";
import Details from "./components/Posts/Details";
import EditPost from "./components/Posts/EditPost";
import AllPosts from "./components/Posts/AllPosts";
import PageNotFound from "./components/PageNotFound";


function App() {

    return (
        <>
            <AuthProvider>
                <HeaderNav />
                <main className="container">
                    
                    <Routes>
                        <Route path="/" element={<Home />} ></Route>
                        <Route path="/all" element={<AllPosts />} ></Route>

                        <Route path="/register" element={<Register />} ></Route>
                        <Route path="/login" element={<Login />} ></Route>
                        <Route path="/logout" element={<Logout />} />

                        <Route path="/profile/:userId" element={<Profile />} ></Route>

                        <Route path="/create" element={<CreatePost />} ></Route>
                        <Route path="/details/:postId" element={<Details />} ></Route>
                        <Route path="/details/:postId/edit" element={<EditPost />} ></Route>

                        <Route path="/404" element={<PageNotFound />} ></Route>
                        <Route path="*" element={<PageNotFound />} ></Route>
                    </Routes>

                </main>
                <Footer />
            </AuthProvider>
        </>
    );
}

export default App;