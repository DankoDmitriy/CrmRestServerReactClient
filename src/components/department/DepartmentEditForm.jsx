import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import DepartmentService from "../../API/DepartmentService";
import "../../i18n"
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";

const DepartmentEditForm = (props) => {
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
        await DepartmentService.update(data.id, data);
        props.updateItemsListAfterAction();
        props.setEditItemWindowVisibleFlag(false);
    }

    return (
        <div>
            <center>{t('departmentEditFrom.title')}</center>
            <Form onSubmit={handleSubmit(editItem)}>
                <Form.Group className="mb-3">

                    <Form.Text className="text-muted">
                        {t('departmentEditFrom.enterDepartmentName')}
                    </Form.Text>

                    <Form.Control
                        id="name"
                        type="text"
                        placeholder={t('departmentEditFrom.enterDepartmentName')}
                        {...register("name", {
                            required: 'departmentEditFrom.required',
                            pattern: {
                                value: /^[a-zA-ZА-Яа-я0-9\s]{1,45}$/,
                                message: 'departmentEditFrom.PatternName'
                            },
                            minLength: {
                                value: 1,
                                message: 'departmentEditFrom.MinLength1'
                            },
                            maxLength: {
                                value: 45,
                                message: 'departmentEditFrom.MaxLength45'
                            }
                        })}
                    />

                    <Form.Text className="text-muted">
                        {errors?.name && <p>{t(errors?.name?.message) || "Error!"}</p>}
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
                        disabled={!isValid}
                        onClick={handleSubmit(editItem)}>
                        {t('departmentEditFrom.editButton')}
                    </Button>
                </div>
            </Form>
        </div>
    );

};

export default DepartmentEditForm;