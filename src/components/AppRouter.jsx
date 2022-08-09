import React, {useContext, useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {privateRouters, publicRouters} from "../router";
import {AuthContext} from "../context";

const AppRouter = () => {
    const {isLogin, setIsLogin} = useContext(AuthContext);
    useEffect(() => {
        localStorage.getItem('isLogin') === 'true' ? setIsLogin(true) : setIsLogin(false);
    }, [])

    return (
        isLogin === true ?
            <Routes>
                {
                    privateRouters.map(route =>
                        <Route
                            path={route.path}
                            element={route.component}
                            key={route.path}
                        />
                    )
                }
            </Routes>
            :
            <Routes>
                {
                    publicRouters.map(route =>
                        <Route
                            path={route.path}
                            element={<route.component setIsLogin={setIsLogin} isLogin={isLogin}/>}
                            key={route.path}
                        />
                    )
                }
            </Routes>
    );
};

export default AppRouter;