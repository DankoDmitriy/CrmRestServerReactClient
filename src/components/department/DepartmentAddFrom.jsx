import React from 'react';
import {Button, Form} from "react-bootstrap";
import DepartmentService from "../../API/DepartmentService";
import "../../i18n"
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";

const DepartmentAddFrom = (props) => {
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
        await DepartmentService.add(data);
        props.updateItemsListAfterAction();
        reset();
    }

    return (
        <div>
            <center>{t('departmentAddFrom.title')}</center>
            <Form onSubmit={handleSubmit(addItem)}>
                <Form.Group className="mb-3">

                    <Form.Text className="text-muted">
                        {t('departmentAddFrom.enterDepartmentName')}
                    </Form.Text>

                    <Form.Control
                        id="name"
                        type="text"
                        placeholder={t('departmentAddFrom.enterDepartmentName')}
                        {...register("name", {
                            required: 'departmentAddFrom.required',
                            pattern: {
                                value: /^[a-zA-ZА-Яа-я0-9\s]{1,45}$/,
                                message: 'departmentAddFrom.PatternName'
                            },
                            minLength: {
                                value: 1,
                                message: 'departmentAddFrom.MinLength1'
                            },
                            maxLength: {
                                value: 45,
                                message: 'departmentAddFrom.MaxLength45'
                            }
                        })}
                    />

                    <Form.Text className="text-muted">
                        {errors?.name && <p>{t(errors?.name?.message) || "Error!"}</p>}
                    </Form.Text>

                </Form.Group>
                <div style={{textAlign: 'right'}}>
                    <Button
                        disabled={!isValid}
                        onClick={handleSubmit(addItem)}>
                        {t('departmentAddFrom.addButton')}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default DepartmentAddFrom;