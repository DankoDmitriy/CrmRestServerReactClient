import React from 'react';
import {Button, Form} from "react-bootstrap";
import PhoneTypeService from "../../API/PhoneTypeService";
import "../../i18n"
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";

const PhoneTypeEditForm = (props) => {
    const {t} = useTranslation();
    const {
        register,
        formState: {
            errors,
            isValid
        },
        handleSubmit
    } = useForm(
        {
            mode: "onBlur",
            defaultValues: {
                id: props.phoneType.id,
                name: props.phoneType.name
            }
        });

    async function editPhoneType(data) {
        await PhoneTypeService.update(data.id, data);
        props.updatePhoneTypeList();
        props.setEditPhoneTypeWindowVisibleFlag(false);
    }

    return (
        <div>
            <center>{t('phoneTypeEditFrom.title')}</center>
            <Form onSubmit={handleSubmit(editPhoneType)}>
                <Form.Group className="mb-3">

                    <Form.Text className="text-muted">
                        {t('phoneTypeEditFrom.enterPhoneTypeName')}
                    </Form.Text>

                    <Form.Control
                        id="name"
                        type="text"
                        placeholder={t('phoneTypeEditFrom.enterPhoneTypeName')}
                        {...register("name", {
                            required: "phoneTypeEditFrom.required",
                            pattern: {
                                value: /^[a-zA-ZА-Яа-я0-9\s]{1,55}$/,
                                message: "phoneTypeEditFrom.PatternName"
                            },
                            minLength: {
                                value: 1,
                                message: "phoneTypeEditFrom.MinLength1"
                            },
                            maxLength: {
                                value: 55,
                                message: "phoneTypeEditFrom.MaxLength55"
                            }
                        })}
                    />
                    <Form.Text className="text-muted">
                        {errors?.name && <p>{t(errors?.name?.message) || "Error!"}</p>}
                    </Form.Text>
                </Form.Group>
                <div style={{textAlign: 'right'}}>
                    <Button
                        onClick={handleSubmit(editPhoneType)}
                        disabled={!isValid}
                    >
                        {t('phoneTypeEditFrom.editButton')}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default PhoneTypeEditForm;