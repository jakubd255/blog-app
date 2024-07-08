import Layout from "./components/Layout";
import AdminPage from "./pages/admin/AdminPage";
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
                    <Route path="/log-in" element={<LoginPage/>}/>
                    <Route path="/admin" element={<AdminPage/>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;