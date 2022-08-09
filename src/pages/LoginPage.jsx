import React, {useState} from 'react';
import AuthService from "../service/AuthService";
import jwtDecode from "jwt-decode";
import {Navigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import "../i18n"

const LoginPage = ({setIsLogin, isLogin}) => {
    const {t} = useTranslation();
    const [loginData, setLoginData] = useState(
        {
            //FIXME - DEL DEFAULT VALUE
            username: "userName",
            password: "password"
        }
    );

    const {
        register,
        formState: {
            errors,
            isValid
        },
        handleSubmit,
        reset
    } = useForm({
        mode: "onBlur"
    });

    async function login(data) {
        setLoginData({username: data.username, password: data.password})
        const response = await AuthService.login(loginData)
        const decodeToken = jwtDecode(response.data.token);

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('userId', decodeToken.id);
        localStorage.setItem('roles', decodeToken.roles);
        localStorage.setItem('isLogin', 'true');
        setIsLogin(true);
        reset()
    }

    if (isLogin) {
        return <Navigate to='/' replace={true}/>
    }

    return (
        <div className="container">
            <div className="row" style={{marginTop: 100, marginBottom: 10}}>
                <div className="col-sm"></div>
                <div className="col-sm">
                    <form onSubmit={handleSubmit(login)}>
                        <div className="form-outline mb-4">
                            {t('loginForm.userName')}
                            <input
                                type="text"
                                id="login"
                                {...register("login", {
                                    required: "Field is required.",
                                    pattern: {
                                        value: /^[a-zA-Z0-9]{8,16}$/,
                                        message: "loginForm.patternUserName"
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "loginForm.minLength8"
                                    },
                                    maxLength: {
                                        value: 16,
                                        message: "loginForm.maxLength16"
                                    },
                                })}
                                className="form-control"
                                placeholder={t('loginForm.userName')}
                            />
                            <div id="loginError" className="form-text">
                                {errors?.login && <p>{t(errors?.login?.message) || "Error!"}</p>}
                            </div>
                        </div>

                        <div className="form-outline mb-4">
                            <input
                                type="password"
                                id="password"
                                {...register("password", {
                                    required: "Field is required.",
                                    pattern: {
                                        value: /^[a-zA-ZА0-9,.:;!?]{8,16}$/,
                                        message: "loginForm.patternPassword"
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "loginForm.minLength8"
                                    },
                                    maxLength: {
                                        value: 16,
                                        message: "loginForm.maxLength16"
                                    },
                                })}
                                className="form-control"
                                placeholder={t('loginForm.password')}
                            />
                            <div id="passwordError" className="form-text">
                                {errors?.password && <p>{t(errors?.password?.message) || "Error!"}</p>}
                            </div>
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary btn-block mb-4"
                            onClick={handleSubmit(login)}
                            disabled={!isValid}
                        >
                            {t('loginForm.signIn')}
                        </button>
                    </form>
                </div>
                <div className="col-sm"></div>
            </div>
        </div>
    );
};

export default LoginPage;