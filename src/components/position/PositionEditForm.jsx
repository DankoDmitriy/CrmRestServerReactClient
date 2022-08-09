import React, {useEffect, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import DepartmentService from "../../API/DepartmentService";
import PositionService from "../../API/PositionService";
import "../../i18n"
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";

const PositionEditForm = (props) => {
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
            description: props.item.description,
            subordinationLevel: props.item.subordinationLevel,
            status: props.item.status,
            department: {id: props.item.department.id}
        }
    });

    const [departments, setDepartments] = useState([]);
    useEffect(() => {
        fetchItem();
    }, [])

    async function fetchItem() {
        const response = await DepartmentService.getAll(0, 1500);
        setDepartments(response.data.content);
    }

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
        await PositionService.update(data.id, data);
        props.updateItemsListAfterAction();
        props.setEditItemWindowVisibleFlag(false);
    }

    return (
        <div>
            <center>{t('positionEditFrom.title')}</center>
            <Form onSubmit={handleSubmit(editItem)}>
                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('positionEditFrom.enterPositionName')}
                    </Form.Text>
                    <Form.Control
                        id="name"
                        type="text"
                        placeholder={t('positionEditFrom.enterPositionName')}
                        {...register("name", {
                            required: "positionEditFrom.required",
                            pattern: {
                                value: /^[a-zA-ZА-Яа-я0-9\s]{1,255}$/,
                                message: "positionEditFrom.PatternPositionName"
                            },
                            minLength: {
                                value: 1,
                                message: "positionEditFrom.MinLengthPositionName1"
                            },
                            maxLength: {
                                value: 255,
                                message: "positionEditFrom.MaxLengthPositionName255"
                            }
                        })}
                    />
                    <Form.Text className="text-muted">
                        {errors?.name && <p>{t(errors?.name?.message) || "Error!"}</p>}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('positionEditFrom.enterDescription')}
                    </Form.Text>
                    <Form.Control
                        id="description"
                        type="text"
                        placeholder={t('positionEditFrom.enterDescription')}
                        {...register("description", {
                            required: "positionEditFrom.required",
                            pattern: {
                                value: /^[a-zA-ZА-Яа-я0-9\s]{1,255}$/,
                                message: "positionEditFrom.PatternDescription"
                            },
                            minLength: {
                                value: 1,
                                message: "positionEditFrom.MinLengthDescription1"
                            },
                            maxLength: {
                                value: 255,
                                message: "positionEditFrom.MaxLengthDescription255"
                            }
                        })}
                    />
                    <Form.Text className="text-muted">
                        {errors?.description && <p>{t(errors?.description?.message) || "Error!"}</p>}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('positionEditFrom.enterSubordinationLevel')}
                    </Form.Text>
                    <Form.Control
                        id="subordinationLevel"
                        type="text"
                        placeholder={t('positionEditFrom.enterSubordinationLevel')}
                        {...register("subordinationLevel", {
                            required: "positionEditFrom.required",
                            pattern: {
                                value: /^[\d]{1,3}$/
                            },
                            min: {
                                value: 1,
                                message: "positionEditFrom.MinSubordinationLevel1"
                            },
                            max: {
                                value: 100,
                                message: "positionEditFrom.MaxSubordinationLevel100"
                            }
                        })}
                    />

                    <Form.Text className="text-muted">
                        {errors?.subordinationLevel && <p>{t(errors?.subordinationLevel?.message) || "Error!"}</p>}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('positionEditFrom.selectDepartment')}
                    </Form.Text>

                    <Form.Select
                        name="department.id"
                        {...register("department.id", {
                            required: "positionEditFrom.required"
                        })}
                    >
                        {departments.map((department, index) =>
                            <option key={index}
                                    selected={(department.id === props.item.department.id) && props.item.department.id}
                                    value={department.id}>{department.name}</option>
                        )}
                    </Form.Select>
                    <Form.Text className="text-muted">
                        {errors?.departmentId && <p>{t(errors?.departmentId?.message) || "Error!"}</p>}
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
                        {t('positionEditFrom.editButton')}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default PositionEditForm;