import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import {Button, Form} from "react-bootstrap";
import LtdService from "../../API/LtdService";
import "../../i18n"
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";


const LtdAddFrom = (props) => {
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

    async function addItem(data) {
        await LtdService.add(data);
        props.updateItemsListAfterAction();
        reset();
    }

    return (
        <div>
            <center>{t('ltdAddFrom.title')}</center>
            <Form onSubmit={handleSubmit(addItem)}>
                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('ltdAddFrom.enterFullName')}
                    </Form.Text>
                    <Form.Control
                        id="nameFull"
                        type="text"
                        placeholder={t('ltdAddFrom.enterFullName')}
                        {...register("nameFull", {
                            required: "ltdAddFrom.required",
                            pattern: {
                                value: /^[a-zA-ZА-Яа-я0-9,.:;!?\s-\"]{1,255}$/,
                                message: "ltdAddFrom.PatternFullName"
                            },
                            minLength: {
                                value: 1,
                                message: "ltdAddFrom.MinLengthFullName1"
                            },
                            maxLength: {
                                value: 255,
                                message: "ltdAddFrom.MaxLengthFullName255"
                            }
                        })}
                    />
                    <Form.Text className="text-muted">
                        {errors?.nameFull && <p>{t(errors?.nameFull?.message) || "Error!"}</p>}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('ltdAddFrom.enterShortName')}
                    </Form.Text>
                    <Form.Control
                        id="nameShort"
                        type="text"
                        placeholder={t('ltdAddFrom.enterShortName')}
                        {...register("nameShort", {
                            required: "ltdAddFrom.required",
                            pattern: {
                                value: /^[a-zA-ZА-Яа-я0-9,.:;!?\s-\"]{1,255}$/,
                                message: "ltdAddFrom.PatternShortName"
                            },
                            minLength: {
                                value: 1,
                                message: "ltdAddFrom.MinLengthShortName1"
                            },
                            maxLength: {
                                value: 255,
                                message: "ltdAddFrom.MaxLengthShortName255"
                            }
                        })}
                    />
                    <Form.Text className="text-muted">
                        {errors?.nameShort && <p>{t(errors?.nameShort?.message) || "Error!"}</p>}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('ltdAddFrom.enterLtdAddress')}
                    </Form.Text>
                    <Form.Control
                        id="address"
                        type="text"
                        placeholder={t('ltdAddFrom.enterLtdAddress')}
                        {...register("address", {
                            required: "ltdAddFrom.required",
                            pattern: {
                                value: /^[a-zA-ZА-Яа-я0-9,.:;!?\s-\"]{1,255}$/,
                                message: "ltdAddFrom.PatternAddress"
                            },
                            minLength: {
                                value: 1,
                                message: "ltdAddFrom.MinLengthAddress1"
                            },
                            maxLength: {
                                value: 255,
                                message: "ltdAddFrom.MaxLengthAddress255"
                            }
                        })}
                    />
                    <Form.Text className="text-muted">
                        {errors?.address && <p>{t(errors?.address?.message) || "Error!"}</p>}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('ltdAddFrom.enterLtdUnp')}
                    </Form.Text>
                    <Form.Control
                        id="unp"
                        type="text"
                        placeholder={t('ltdAddFrom.enterLtdUnp')}
                        {...register("unp", {
                            required: "ltdAddFrom.required",
                            pattern: {
                                value: /^[a-zA-ZА-Яа-я0-9.:\s-]{1,45}$/,
                                message: "ltdAddFrom.PatternUnp"
                            },
                            minLength: {
                                value: 1,
                                message: "ltdAddFrom.MinLengthUnp1"
                            },
                            maxLength: {
                                value: 255,
                                message: "ltdAddFrom.MaxLengthUnp45"
                            }
                        })}
                    />
                    <Form.Text className="text-muted">
                        {errors?.unp && <p>{t(errors?.unp?.message) || "Error!"}</p>}
                    </Form.Text>
                </Form.Group>

                <div style={{textAlign: 'right'}}>
                    <Button
                        variant="primary"
                        disabled={!isValid}
                        onClick={handleSubmit(addItem)}>
                        {t('ltdAddFrom.addButton')}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default LtdAddFrom;