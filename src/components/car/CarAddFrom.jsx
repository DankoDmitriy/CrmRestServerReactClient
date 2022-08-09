import 'bootstrap/dist/css/bootstrap.min.css';

import React, {useEffect, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import CarService from "../../API/CarService";
import CityService from "../../API/CityService";
import "../../i18n"
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";

const CarAddFrom = (props) => {
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

    const [cities, setCities] = useState([]);

    useEffect(() => {
        fetchItem();
    }, [])

    async function fetchItem() {
        const response = await CityService.getAll(0, 1500);
        setCities(response.data.content);
    }

    async function addItem(data) {
        await CarService.add(data);
        props.updateItemsListAfterAction();
        reset();
    }

    return (
        <div>
            <center>{t('carAddFrom.title')}</center>
            <Form onSubmit={handleSubmit(addItem)}>
                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('carAddFrom.enterNumber')}
                    </Form.Text>

                    <Form.Control
                        id="number"
                        type="text"
                        placeholder={t('carAddFrom.enterNumber')}
                        {...register("number", {
                            required: "carAddFrom.required",
                            pattern: {
                                value: /^[a-zA-Z0-9\s-]{9,45}$/,
                                message: "carAddFrom.PatternNumber"
                            },
                            minLength: {
                                value: 9,
                                message: "carAddFrom.MinLength9"
                            },
                            maxLength: {
                                value: 45,
                                message: "carAddFrom.MaxLength45"
                            }
                        })}
                    />
                    <Form.Text className="text-muted">
                        {errors?.number && <p>{t(errors?.number?.message) || "Error!"}</p>}
                    </Form.Text>

                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('carAddFrom.enterDescription')}
                    </Form.Text>
                    <Form.Control
                        id="other"
                        type="text"
                        placeholder={t('carAddFrom.enterDescription')}
                        {...register("other", {
                            pattern: {
                                value: /^[a-zA-ZА-Яа-я0-9,.:;!?\s-]{0,255}$/,
                                message: "carAddFrom.PatternOther"
                            },
                            minLength: {
                                value: 0,
                                message: "carAddFrom.MinLength0"
                            },
                            maxLength: {
                                value: 255,
                                message: "carAddFrom.MaxLength255"
                            }
                        })}
                    />
                    <Form.Text className="text-muted">
                        {errors?.other && <p>{t(errors?.other?.message) || "Error!"}</p>}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('carAddFrom.selectCity')}
                    </Form.Text>

                    <Form.Select
                        name="city.id"
                        {
                            ...register("city.id", {
                                required: "carAddFrom.required"
                            })
                        }
                    >
                        <option value="">{t('carAddFrom.selectCity')}</option>
                        {cities.map((city, index) =>
                            <option key={index} value={city.id}>{city.name}</option>
                        )}
                    </Form.Select>
                    <Form.Text className="text-muted">
                        {errors?.cityId && <p>{t(errors?.cityId?.message) || "Error!"}</p>}
                    </Form.Text>
                </Form.Group>

                <div style={{textAlign: 'right'}}>
                    <Button
                        variant="primary"
                        onClick={handleSubmit(addItem)}
                        disabled={!isValid}
                    >
                        {t('carAddFrom.addButton')}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default CarAddFrom;