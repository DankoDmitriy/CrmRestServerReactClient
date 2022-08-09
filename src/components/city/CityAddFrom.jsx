import React from 'react';
import {Button, Form} from "react-bootstrap";
import CityService from "../../API/CityService";
import "../../i18n"
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";


const CityAddFrom = (props) => {
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

    async function addCity(data) {
        await CityService.addCity(data);
        props.updateCityList();
        reset();
    }

    return (
        <div>
            <center>{t('cityAddFrom.title')}</center>
            <Form onSubmit={handleSubmit(addCity)}>
                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('cityAddFrom.enterCityName')}
                    </Form.Text>

                    <Form.Control
                        id="name"
                        type="text"
                        placeholder={t('cityAddFrom.enterCityName')}
                        {...register("name", {
                            required: "cityAddFrom.required",
                            pattern: {
                                value: /^[a-zA-ZА-Яа-я0-9\s]{1,65}$/,
                                message: "cityAddFrom.PatternName"
                            },
                            minLength: {
                                value: 1,
                                message: "cityAddFrom.MinLength1"
                            },
                            maxLength: {
                                value: 65,
                                message: "cityAddFrom.MaxLength65"
                            }
                        })}
                    />
                    <Form.Text className="text-muted">
                        {errors?.name && <p>{t(errors?.name?.message) || "Error!"}</p>}
                    </Form.Text>
                </Form.Group>

                <div style={{textAlign: 'right'}}>
                    <Button
                        onClick={handleSubmit(addCity)}
                        disabled={!isValid}
                    >
                        {t('cityAddFrom.addButton')}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default CityAddFrom;