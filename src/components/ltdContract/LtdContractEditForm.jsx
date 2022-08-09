import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import LtdContractService from "../../API/LtdContractService";
import "../../i18n"
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";

const LtdContractEditForm = (props) => {
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
            contractStart: props.item.contractStart,
            number: props.item.number,
            other: props.item.other,
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
        await LtdContractService.update(data.id, data);
        props.updatePageAfterAction();
        props.setEditItemContractWindowVisibleFlag(false);
    }

    return (
        <div>
            <center>
                {t('ltdContractEditForm.title')}
            </center>
            <Form onSubmit={handleSubmit(editItem)}>
                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('ltdContractEditForm.enterContractNumber')}
                    </Form.Text>
                    <Form.Control
                        id="number"
                        type="text"
                        placeholder={t('ltdContractEditForm.enterContractNumber')}
                        {...register("number", {
                            required: "ltdContractEditForm.required",
                            pattern: {
                                value: /^[a-zA-ZА-Яа-я0-9,.:;!?\s-]{1,100}$/,
                                message: "ltdContractEditForm.PatternContractNumber"
                            },
                            minLength: {
                                value: 1,
                                message: "ltdContractEditForm.MinLengthContractNumber1"
                            },
                            maxLength: {
                                value: 100,
                                message: "ltdContractEditForm.MaxLengthContractNumber100"
                            }
                        })}
                    />
                    <Form.Text className="text-muted">
                        {errors?.number && <p>{t(errors?.number?.message) || "Error!"}</p>}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('ltdContractEditForm.enterContractDateStart')}
                    </Form.Text>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="contractStart"
                        {...register("contractStart", {
                            required: "ltdContractEditForm.required"
                        })}
                    />
                    <Form.Text className="text-muted">
                        {errors?.contractStart && <p>{t(errors?.contractStart?.message) || "Error!"}</p>}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('ltdContractEditForm.enterOtherInformation')}
                    </Form.Text>
                    <Form.Control
                        id="other"
                        type="text"
                        as="textarea" rows={5}
                        placeholder={t('ltdContractEditForm.enterOtherInformation')}
                        {...register("other", {
                            required: "ltdContractAddForm.required",
                            pattern: {
                                value: /^[a-zA-ZА-Яа-я0-9,.:;!?\s-]{1,255}$/,
                                message: "ltdContractEditForm.PatternContractOtherInformation"
                            },
                            minLength: {
                                value: 1,
                                message: "ltdContractEditForm.MinLengthOtherInformation1"
                            },
                            maxLength: {
                                value: 255,
                                message: "ltdContractEditForm.MaxLengthOtherInformation255"
                            }
                        })}
                    />
                    <Form.Text className="text-muted">
                        {errors?.other && <p>{t(errors?.other?.message) || "Error!"}</p>}
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
                        {t('ltdContractEditForm.editButton')}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default LtdContractEditForm;