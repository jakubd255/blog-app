import {useCookies} from "react-cookie";
import Layout from "./components/Layout";
import AccountPage from "./pages/AccountPage";
import AdminPage from "./pages/admin/AdminPage";
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/HomePage";
import PostFormPage from "./pages/PostFormPage";
import PostPage from "./pages/PostPage";
import UsersProvider from "./provider/UsersProvider";
import "./styles/App.css";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostsProvider from "./provider/PostsProvider";
import PostsAdminPage from "./pages/admin/PostsAdminPage";
import ReadactorPage from "./pages/redactor/RedactorPage";
import RegisterPage from "./pages/auth/RegisterPage";
import UsersAdminPage from "./pages/admin/UsersAdminPage";



const App: React.FC = () => {
    const [cookie] = useCookies(["is-logged"]);

    return(
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="posts/:id" element={<PostPage/>}/>
                    <Route path="post-form" element={<PostFormPage/>}/>
                    <Route path="log-in" element={<LoginPage/>}/>
                    <Route path="register" element={<RegisterPage/>}/>
                    <Route path="user/:id" element={<UserPage/>}/>
                    {cookie["is-logged"] ? (
                        <>
                            <Route path="account" element={<AccountPage/>}/>
                            <Route path="admin" element={<AdminPage/>}>
                                <Route path="posts" element={<PostsProvider><PostsAdminPage/></PostsProvider>}/>
                                <Route path="users" element={<UsersProvider><UsersAdminPage/></UsersProvider>}/>
                            </Route>
                            <Route path="redactor" element={<PostsProvider><ReadactorPage/></PostsProvider>}/>
                        </>
                    ) : null}
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;