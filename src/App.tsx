import Layout from "./components/Layout";
import LoginPage from "./pages/admin/LoginPage";
import HomePage from "./pages/HomePage";
import PostFormPage from "./pages/PostFormPage";
import PostPage from "./pages/PostPage";
import "./styles/App.css";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";



const App: React.FC = () => {
    return(
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/posts/:id" element={<PostPage/>}/>
                    <Route path="/post-form" element={<PostFormPage/>}/>
                    <Route path="/posts" element={<Navigate to="/"/>}/>
                    <Route path="/log-in" element={<LoginPage/>}/>
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;