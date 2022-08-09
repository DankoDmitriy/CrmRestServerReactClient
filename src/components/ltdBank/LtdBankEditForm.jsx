import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import LtdBankService from "../../API/LtdBankService";
import "../../i18n"
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";

const LtdBankEditForm = (props) => {
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
            requisites: props.item.requisites,
            status: props.item.status,
            ltd: {id: props.ltdId}
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
        await LtdBankService.update(data.id, data);
        props.updatePageAfterAction();
        props.setEditItemBankWindowVisibleFlag(false);
    }

    return (
        <div>
            <center>
                {t('ltdBankEditFrom.title')}
            </center>
            <Form onSubmit={handleSubmit(editItem)}>
                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('ltdBankEditFrom.enterRequisites')}
                    </Form.Text>
                    <Form.Control
                        id="requisites"
                        type="text"
                        as="textarea" rows={5}
                        placeholder={t('ltdBankEditFrom.enterRequisites')}
                        {...register("requisites", {
                            required: "ltdBankEditFrom.required",
                            pattern: {
                                value: /^[a-zA-ZА-Яа-я0-9,.:;!?\\s-]{1,500}$/,
                                message: "ltdBankEditFrom.PatternRequisites"
                            },
                            minLength: {
                                value: 1,
                                message: "ltdBankEditFrom.MinLengthRequisites1"
                            },
                            maxLength: {
                                value: 500,
                                message: "ltdBankEditFrom.MaxLengthRequisites500"
                            }
                        })}
                    />
                    <Form.Text className="text-muted">
                        {errors?.requisites && <p>{t(errors?.requisites?.message) || "Error!"}</p>}
                    </Form.Text>

                    <Form.Check
                        type="checkbox"
                        label="Activate"
                        id="status"
                        placeholder={t('carEditForm.enterNumber')}
                        {...register("status")}
                        checked={activeItem}
                        onChange={checkBoxAction}
                    />
                </Form.Group>

                <div style={{textAlign: 'right'}}>
                    <Button
                        variant="primary"
                        disabled={!isValid}
                        onClick={handleSubmit(editItem)}>
                        {t('ltdBankEditFrom.editButton')}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default LtdBankEditForm;