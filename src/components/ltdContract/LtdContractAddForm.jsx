import 'bootstrap/dist/css/bootstrap.min.css';

import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import LtdContractService from "../../API/LtdContractService";
import "../../i18n"
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";

const LtdContractAddForm = (props) => {
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
        mode: "onBlur",
        defaultValues: {
            ltd: {id: props.ltd.id}
        }
    });

    async function addItem(data) {
            await LtdContractService.add(data);
            props.updateItemsListAfterAction();
            props.setAddItemContractWindowVisibleFlag(false);
            reset();
    }

    return (
        <div>
            <center>
                {t('ltdContractAddForm.title')}
                <br/>
                {props.ltd.nameShort}
            </center>
            <Form onSubmit={handleSubmit(addItem)}>
                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('ltdContractAddForm.enterContractNumber')}
                    </Form.Text>
                    <Form.Control
                        id="number"
                        type="text"
                        placeholder={t('ltdContractAddForm.enterContractNumber')}
                        {...register("number", {
                            required: "ltdContractAddForm.required",
                            pattern: {
                                value: /^[a-zA-ZА-Яа-я0-9,.:;!?\s-]{1,100}$/,
                                message: "ltdContractAddForm.PatternContractNumber"
                            },
                            minLength: {
                                value: 1,
                                message: "ltdContractAddForm.MinLengthContractNumber1"
                            },
                            maxLength: {
                                value: 100,
                                message: "ltdContractAddForm.MaxLengthContractNumber100"
                            }
                        })}
                    />
                    <Form.Text className="text-muted">
                        {errors?.number && <p>{t(errors?.number?.message) || "Error!"}</p>}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('ltdContractAddForm.enterContractDateStart')}
                    </Form.Text>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="contractStart"
                        {...register("contractStart",{
                            required: "ltdContractAddForm.required"
                        })}
                    />
                    <Form.Text className="text-muted">
                        {errors?.contractStart && <p>{t(errors?.contractStart?.message) || "Error!"}</p>}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Text className="text-muted">
                        {t('ltdContractAddForm.enterOtherInformation')}
                    </Form.Text>
                    <Form.Control
                        id="other"
                        type="text"
                        as="textarea" rows={5}
                        placeholder={t('ltdContractAddForm.enterOtherInformation')}
                        {...register("other", {
                            required: "ltdContractAddForm.required",
                            pattern: {
                                value: /^[a-zA-ZА-Яа-я0-9,.:;!?\s-]{1,255}$/,
                                message: "ltdContractAddForm.PatternContractOtherInformation"
                            },
                            minLength: {
                                value: 1,
                                message: "ltdContractAddForm.MinLengthOtherInformation1"
                            },
                            maxLength: {
                                value: 255,
                                message: "ltdContractAddForm.MaxLengthOtherInformation255"
                            }
                        })}
                    />
                    <Form.Text className="text-muted">
                        {errors?.other && <p>{t(errors?.other?.message) || "Error!"}</p>}
                    </Form.Text>
                </Form.Group>

                <div style={{textAlign: 'right'}}>
                    <Button
                        variant="primary"
                        disabled={!isValid}
                        onClick={handleSubmit(addItem)}>
                        {t('ltdContractAddForm.addButton')}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default LtdContractAddForm;