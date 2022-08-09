import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import LtdService from "../../API/LtdService";
import "../../i18n"
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";

const LtdEditForm = (props) => {
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
            nameFull: props.item.nameFull,
            nameShort: props.item.nameShort,
            address: props.item.address,
            unp: props.item.unp
        }
    });

    const [activeItem, setActiveItem] = useState(props.item.status === 'ACTIVE');

    async function editItem(data) {
        if (activeItem) {
            data.status = 'ACTIVE';
        } else {
            data.status = 'NOT_ACTIVE';
        }
        await LtdService.update(data.id, data);
        props.updateItemsListAfterAction();
        props.setEditItemWindowVisibleFlag(false);
    }

    const checkBoxAction = () => {
        setActiveItem(!activeItem);
    }


    return (
        <div>
            <center>{t('ltdEditFrom.title')}</center>
            <Form onSubmit={handleSubmit(editItem)}>
                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('ltdEditFrom.enterFullName')}
                    </Form.Text>
                    <Form.Control
                        id="nameFull"
                        type="text"
                        placeholder={t('ltdEditFrom.enterFullName')}
                        {...register("nameFull", {
                            required: "ltdEditFrom.required",
                            pattern: {
                                value: /^[a-zA-ZА-Яа-я0-9,.:;!?\s-\"]{1,255}$/,
                                message: "ltdEditFrom.PatternFullName"
                            },
                            minLength: {
                                value: 1,
                                message: "ltdEditFrom.MinLengthFullName1"
                            },
                            maxLength: {
                                value: 255,
                                message: "ltdEditFrom.MaxLengthFullName255"
                            }
                        })}
                    />
                    <Form.Text className="text-muted">
                        {errors?.nameFull && <p>{t(errors?.nameFull?.message) || "Error!"}</p>}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('ltdEditFrom.enterShortName')}
                    </Form.Text>
                    <Form.Control
                        id="nameShort"
                        type="text"
                        placeholder={t('ltdEditFrom.enterShortName')}
                        {...register("nameShort", {
                            required: "ltdEditFrom.required",
                            pattern: {
                                value: /^[a-zA-ZА-Яа-я0-9,.:;!?\s-\"]{1,255}$/,
                                message: "ltdEditFrom.PatternShortName"
                            },
                            minLength: {
                                value: 1,
                                message: "ltdEditFrom.MinLengthShortName1"
                            },
                            maxLength: {
                                value: 255,
                                message: "ltdEditFrom.MaxLengthShortName255"
                            }
                        })}
                    />
                    <Form.Text className="text-muted">
                        {errors?.nameShort && <p>{t(errors?.nameShort?.message) || "Error!"}</p>}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('ltdEditFrom.enterLtdAddress')}
                    </Form.Text>
                    <Form.Control
                        id="address"
                        type="text"
                        placeholder={t('ltdEditFrom.enterLtdAddress')}
                        {...register("address", {
                            required: "ltdEditFrom.required",
                            pattern: {
                                value: /^[a-zA-ZА-Яа-я0-9,.:;!?\s-\"]{1,255}$/,
                                message: "ltdEditFrom.PatternAddress"
                            },
                            minLength: {
                                value: 1,
                                message: "ltdEditFrom.MinLengthAddress1"
                            },
                            maxLength: {
                                value: 255,
                                message: "ltdEditFrom.MaxLengthAddress255"
                            }
                        })}
                    />
                    <Form.Text className="text-muted">
                        {errors?.address && <p>{t(errors?.address?.message) || "Error!"}</p>}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('ltdEditFrom.enterLtdUnp')}
                    </Form.Text>
                    <Form.Control
                        id="unp"
                        type="text"
                        placeholder={t('ltdEditFrom.enterLtdUnp')}
                        {...register("unp", {
                            required: "ltdEditFrom.required",
                            pattern: {
                                value: /^[a-zA-ZА-Яа-я0-9.:\s-]{1,45}$/,
                                message: "ltdEditFrom.PatternUnp"
                            },
                            minLength: {
                                value: 1,
                                message: "ltdEditFrom.MinLengthUnp1"
                            },
                            maxLength: {
                                value: 255,
                                message: "ltdEditFrom.MaxLengthUnp45"
                            }
                        })}
                    />
                    <Form.Text className="text-muted">
                        {errors?.unp && <p>{t(errors?.unp?.message) || "Error!"}</p>}
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
                        disabled={!isValid}
                        onClick={handleSubmit(editItem)}>
                        {t('ltdEditFrom.editButton')}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default LtdEditForm;