import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import {Button, Form} from "react-bootstrap";
import TicketTypeService from "../../API/TicketTypeService";
import "../../i18n"
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";

const TicketTypeAddForm = (props) => {
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
        await TicketTypeService.add(data);
        props.updateItemsListAfterAction();
        reset();
    }

    return (
        <div>
            <center>{t('ticketTypeAddFrom.title')}</center>
            <Form onSubmit={handleSubmit(addItem)}>
                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('ticketTypeAddFrom.enterTicketTypeName')}
                    </Form.Text>
                    <Form.Control
                        id="name"
                        type="text"
                        placeholder={t('ticketTypeAddFrom.enterTicketTypeName')}
                        {...register("name", {
                            required: 'ticketTypeAddFrom.required',
                            pattern: {
                                value: /^[a-zA-ZА-Яа-я0-9,.:;()!?\s-"]{1,100}$/,
                                message: "ticketTypeAddFrom.PatternName"
                            },
                            minLength: {
                                value: 1,
                                message: "ticketTypeAddFrom.MinLength1"
                            },
                            maxLength: {
                                value: 100,
                                message: "ticketTypeAddFrom.MaxLength100"
                            }
                        })}
                    />
                    <Form.Text className="text-muted">
                        {errors?.name && <p>{t(errors?.name?.message) || "Error!"}</p>}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('ticketTypeAddFrom.actionRule')}
                    </Form.Text>
                    <Form.Control
                        id="action"
                        type="text"
                        placeholder={t('ticketTypeAddFrom.actionRule')}
                        {...register("action", {
                            required: 'ticketTypeAddFrom.required',
                            min: {
                                value: -1,
                                message: "ticketTypeAddFrom.MinMinus1"
                            },
                            max: {
                                value: 1,
                                message: "ticketTypeAddFrom.Max1"
                            }

                        })}
                    />
                    <Form.Text className="text-muted">
                        {errors?.action && <p>{t(errors?.action?.message) || "Error!"}</p>}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('ticketTypeAddFrom.priorityRule')}
                    </Form.Text>
                    <Form.Control
                        id="priority"
                        type="text"
                        placeholder={t('ticketTypeAddFrom.priorityRule')}
                        {...register("priority", {
                            required: 'ticketTypeAddFrom.required',
                            min: {
                                value: 1,
                                message: "ticketTypeAddFrom.Min1"
                            },
                            max: {
                                value: 100,
                                message: "ticketTypeAddFrom.Max100"
                            }
                        })}
                    />
                    <Form.Text className="text-muted">
                        {errors?.priority && <p>{t(errors?.priority?.message) || "Error!"}</p>}
                    </Form.Text>
                </Form.Group>

                <div style={{textAlign: 'right'}}>
                    <Button
                        variant="primary"
                        onClick={handleSubmit(addItem)}
                        disabled={!isValid}
                    >
                        {t('ticketTypeAddFrom.addButton')}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default TicketTypeAddForm;