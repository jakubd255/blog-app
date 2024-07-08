import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./styles/index.css";
import {ThemeProvider} from "@/theme";
import {CookiesProvider} from "react-cookie";




ReactDOM.createRoot(document.getElementById("root")!).render(
    <CookiesProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <App/>
        </ThemeProvider>
    </CookiesProvider>
);