import React from 'react';
import {Button, Form} from "react-bootstrap";
import PhoneTypeService from "../../API/PhoneTypeService";
import "../../i18n"
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";

const PhoneTypeAddFrom = (props) => {
    const {t} = useTranslation();
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

    async function addPhoneType(data) {
        await PhoneTypeService.add(data);
        props.updatePhoneTypeList();
        reset();
    }

    return (
        <div>
            <center>{t('phoneTypeAddFrom.title')}</center>
            <Form onSubmit={handleSubmit(addPhoneType)}>
                <Form.Group className="mb-3">

                    <Form.Text className="text-muted">
                        {t('phoneTypeAddFrom.enterPhoneTypeName')}
                    </Form.Text>

                    <Form.Control
                        id="name"
                        type="text"
                        placeholder={t('phoneTypeAddFrom.enterPhoneTypeName')}
                        {...register("name", {
                            required: "phoneTypeAddFrom.required",
                            pattern: {
                                value: /^[a-zA-ZА-Яа-я0-9\s]{1,55}$/,
                                message: "phoneTypeAddFrom.PatternName"
                            },
                            minLength: {
                                value: 1,
                                message: "phoneTypeAddFrom.MinLength1"
                            },
                            maxLength: {
                                value: 55,
                                message: "phoneTypeAddFrom.MaxLength55"
                            }
                        })}
                    />
                    <Form.Text className="text-muted">
                        {errors?.name && <p>{t(errors?.name?.message) || "Error!"}</p>}
                    </Form.Text>
                </Form.Group>
                <div style={{textAlign: 'right'}}>
                    <Button
                        onClick={handleSubmit(addPhoneType)}
                        disabled={!isValid}
                    >
                        {t('phoneTypeAddFrom.addButton')}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default PhoneTypeAddFrom;