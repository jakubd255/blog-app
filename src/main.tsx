import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./styles/index.css";
import {ThemeProvider} from "@/theme";
import {CookiesProvider} from "react-cookie";
import AuthProvider from "./provider/AuthProvider.tsx";




ReactDOM.createRoot(document.getElementById("root")!).render(
    <CookiesProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <AuthProvider>
                <App/>
            </AuthProvider>
        </ThemeProvider>
    </CookiesProvider>
);