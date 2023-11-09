import Home from "./components/Home";
import HeaderNav from "./components/Layout/HeaderNav";

function App() {
    return (
        <>
            <HeaderNav />
            <main className="container">
                <Home />
            </main>
        </>
    );
}

export default App;