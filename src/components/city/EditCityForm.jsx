import React from 'react';
import {Button, Form} from "react-bootstrap";
import CityService from "../../API/CityService";
import "../../i18n"
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";

const EditCityForm = (props) => {
    const {t} = useTranslation();

    const {
        register,
        formState: {
            errors, // In this object save all errors.
            isValid // This is valid form status.
        },
        handleSubmit // Method used when we send form
    } = useForm({
        mode: "onBlur",
        defaultValues: {
            id: props.city.id,
            name: props.city.name
        }
    });

    async function editCity(data) {
        await CityService.update(data.id, data);
        props.updateCityList();
        props.setEditCityWindowVisibleFlag(false);
    }

    return (
        <div>
            <center>{t('editCityFrom.title')}</center>
            <Form onSubmit={handleSubmit(editCity)}>
                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('editCityFrom.enterCityName')}
                    </Form.Text>

                    <Form.Control
                        id="name"
                        type="text"
                        placeholder={t('editCityFrom.enterCityName')}
                        {...register("name", {
                            required: "editCityFrom.required",
                            pattern: {
                                value: /^[a-zA-ZА-Яа-я0-9\s]{1,65}$/,
                                message: "editCityFrom.PatternName"
                            },
                            minLength: {
                                value: 1,
                                message: "editCityFrom.MinLength1"
                            },
                            maxLength: {
                                value: 65,
                                message: "editCityFrom.MaxLength65"
                            }
                        })}
                    />
                    <Form.Text className="text-muted">
                        {errors?.name && <p>{t(errors?.name?.message) || "Error!"}</p>}
                    </Form.Text>
                </Form.Group>

                <div style={{textAlign: 'right'}}>
                    <Button
                        onClick={handleSubmit(editCity)}
                        disabled={!isValid}
                    >
                        {t('editCityFrom.editButton')}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default EditCityForm;