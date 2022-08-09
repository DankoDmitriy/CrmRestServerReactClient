import 'bootstrap/dist/css/bootstrap.min.css';

import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import LtdBankService from "../../API/LtdBankService";
import "../../i18n"
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";

const LtdBankAddForm = (props) => {
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
        await LtdBankService.add(data);
        props.updateItemsListAfterAction();
        props.setAddItemBankWindowVisibleFlag(false);
        reset();
    }

    return (
        <div>
            <center>
                {t('ltdBankAddFrom.title')}
                <br/>
                {props.ltd.nameShort}
            </center>
            <Form onSubmit={handleSubmit(addItem)}>
                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('ltdBankAddFrom.enterRequisites')}
                    </Form.Text>
                    <Form.Control
                        id="requisites"
                        type="text"
                        as="textarea" rows={5}
                        placeholder={t('ltdBankAddFrom.enterRequisites')}
                        {...register("requisites", {
                            required: "ltdBankAddFrom.required",
                            pattern: {
                                value: /^[a-zA-ZА-Яа-я0-9,.:;!?\\s-]{1,500}$/,
                                message: "ltdBankAddFrom.PatternRequisites"
                            },
                            minLength: {
                                value: 1,
                                message: "ltdBankAddFrom.MinLengthRequisites1"
                            },
                            maxLength: {
                                value: 500,
                                message: "ltdBankAddFrom.MaxLengthRequisites500"
                            }
                        })}
                    />
                </Form.Group>
                <Form.Text className="text-muted">
                    {errors?.requisites && <p>{t(errors?.requisites?.message) || "Error!"}</p>}
                </Form.Text>
                <div style={{textAlign: 'right'}}>
                    <Button
                        variant="primary"
                        disabled={!isValid}
                        onClick={handleSubmit(addItem)}>
                        {t('ltdBankAddFrom.addButton')}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default LtdBankAddForm;