import React from 'react';
import MyNavBar from "../components/navBar/MyNavBar";
import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import "../i18n"

const TestPage = () => {
    const {t} = useTranslation();

    const {
        register,
        formState: {
            errors, // In this object save all errors.
            isValid // This is valid form status.
        },
        handleSubmit, // Method used when we send form
        reset  // Method for reset form after submit.
    } = useForm({
        mode: "onBlur"
    });

    const onSubmit = (data) => {
        alert(JSON.stringify(data));
        reset(); // Here we reset all form values after submit.
    }
    return (
        <div>
            <MyNavBar/>
            Test Page
            <div className="container">
                <div className="row" style={{marginTop: 100, marginBottom: 10}}>
                    <div className="col-sm"></div>
                    <div className="col-sm">
                        <form onSubmit={handleSubmit(onSubmit)}>
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
                                    {/*{errors?.login && <p>{errors?.login?.message || "Error!"}</p>}*/}
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
                                    {/*{errors?.login && <p>{errors?.login?.message || "Error!"}</p>}*/}
                                    {errors?.password && <p>{t(errors?.password?.message) || "Error!"}</p>}
                                </div>
                            </div>
                            <button
                                type="button"
                                className="btn btn-primary btn-block mb-4"
                                onClick={handleSubmit(onSubmit)}
                                disabled={!isValid}
                            >
                                {t('loginForm.signIn')}
                            </button>
                        </form>
                    </div>
                    <div className="col-sm"></div>
                </div>
            </div>
        </div>
    );
};

export default TestPage;