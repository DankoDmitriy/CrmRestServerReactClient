import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import TicketTypeService from "../../API/TicketTypeService";
import "../../i18n"
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";

const TicketTypeEditForm = (props) => {
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
            id: props.item.id,
            name: props.item.name,
            action: props.item.action,
            priority: props.item.priority,
            status: props.item.status
        }
    });

    const [activeItem, setActiveItem] = useState(props.item.status === 'ACTIVE');

    const checkBoxAction = () => {
        setActiveItem(!activeItem);
    }

    async function editItem(data) {
        if (activeItem) {
            data.status = 'ACTIVE';
        } else {
            data.status = 'NOT_ACTIVE';
        }
        await TicketTypeService.update(data.id, data);
        props.updateItemsListAfterAction();
        props.setEditItemWindowVisibleFlag(false);
    }

    return (
        <div>
            <center>{t('ticketTypeEditFrom.title')}</center>
            <Form onSubmit={handleSubmit(editItem)}>
                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('ticketTypeEditFrom.enterTicketTypeName')}
                    </Form.Text>
                    <Form.Control
                        id="name"
                        type="text"
                        placeholder={t('ticketTypeEditFrom.enterTicketTypeName')}
                        {...register("name", {
                            required: 'ticketTypeEditFrom.required',
                            pattern: {
                                value: /^[a-zA-ZА-Яа-я0-9,.:;()!?\s-"]{1,100}$/,
                                message: "ticketTypeEditFrom.PatternName"
                            },
                            minLength: {
                                value: 1,
                                message: "ticketTypeEditFrom.MinLength1"
                            },
                            maxLength: {
                                value: 100,
                                message: "ticketTypeEditFrom.MaxLength100"
                            }
                        })}
                    />
                    <Form.Text className="text-muted">
                        {errors?.name && <p>{t(errors?.name?.message) || "Error!"}</p>}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('ticketTypeEditFrom.actionRule')}
                    </Form.Text>
                    <Form.Control
                        id="action"
                        type="text"
                        placeholder={t('ticketTypeEditFrom.actionRule')}
                        {...register("action", {
                            required: 'ticketTypeEditFrom.required',
                            min: {
                                value: -1,
                                message: "ticketTypeEditFrom.MinMinus1"
                            },
                            max: {
                                value: 1,
                                message: "ticketTypeEditFrom.Max1"
                            }

                        })}
                    />
                    <Form.Text className="text-muted">
                        {errors?.action && <p>{t(errors?.action?.message) || "Error!"}</p>}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('ticketTypeEditFrom.priorityRule')}
                    </Form.Text>
                    <Form.Control
                        id="priority"
                        type="text"
                        placeholder={t('ticketTypeEditFrom.priorityRule')}
                        {...register("priority", {
                            required: 'ticketTypeEditFrom.required',
                            min: {
                                value: 1,
                                message: "ticketTypeEditFrom.Min1"
                            },
                            max: {
                                value: 100,
                                message: "ticketTypeEditFrom.Max100"
                            }
                        })}
                    />
                    <Form.Text className="text-muted">
                        {errors?.priority && <p>{t(errors?.priority?.message) || "Error!"}</p>}
                    </Form.Text>

                    <Form.Check
                        type="checkbox"
                        label="Activate"
                        id="status"
                        {...register("status")}
                        checked={activeItem}
                        onChange={checkBoxAction}
                    />

                </Form.Group>

                <div style={{textAlign: 'right'}}>
                    <Button
                        variant="primary"
                        onClick={handleSubmit(editItem)}
                        disabled={!isValid}
                    >
                        {t('ticketTypeEditFrom.editButton')}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default TicketTypeEditForm;