import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {useState} from "react";
import {AuthContext} from "./context";

function App() {
    const [isLogin, setIsLogin] = useState(false);

    return (
        <AuthContext.Provider value={{
            isLogin,
            setIsLogin: setIsLogin
        }}>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
