import 'bootstrap/dist/css/bootstrap.min.css';

import React, {useEffect, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import PositionService from "../../API/PositionService";
import DepartmentService from "../../API/DepartmentService";
import "../../i18n"
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";

const PositionAddFrom = (props) => {
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

    const [departments, setDepartments] = useState([]);
    useEffect(() => {
        fetchItem();
    }, [])

    async function fetchItem() {
        const response = await DepartmentService.getAllByStatus(0, 1500);
        setDepartments(response.data.content);
    }

    async function addItem(data) {
        await PositionService.add(data);
        props.updateItemsListAfterAction();
        reset();
    }

    return (
        <div>
            <center>{t('positionAddFrom.title')}</center>
            <Form onSubmit={handleSubmit(addItem)}>
                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('positionAddFrom.enterPositionName')}
                    </Form.Text>
                    <Form.Control
                        id="name"
                        type="text"
                        placeholder={t('positionAddFrom.enterPositionName')}
                        {...register("name", {
                            required: "positionAddFrom.required",
                            pattern: {
                                value: /^[a-zA-ZА-Яа-я0-9\s]{1,255}$/,
                                message: "positionAddFrom.PatternPositionName"
                            },
                            minLength: {
                                value: 1,
                                message: "positionAddFrom.MinLengthPositionName1"
                            },
                            maxLength: {
                                value: 255,
                                message: "positionAddFrom.MaxLengthPositionName255"
                            }
                        })}
                    />
                    <Form.Text className="text-muted">
                        {errors?.name && <p>{t(errors?.name?.message) || "Error!"}</p>}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('positionAddFrom.enterDescription')}
                    </Form.Text>
                    <Form.Control
                        id="description"
                        type="text"
                        placeholder={t('positionAddFrom.enterDescription')}
                        {...register("description", {
                            required: "positionAddFrom.required",
                            pattern: {
                                value: /^[a-zA-ZА-Яа-я0-9\s]{1,255}$/,
                                message: "positionAddFrom.PatternDescription"
                            },
                            minLength: {
                                value: 1,
                                message: "positionAddFrom.MinLengthDescription1"
                            },
                            maxLength: {
                                value: 255,
                                message: "positionAddFrom.MaxLengthDescription255"
                            }
                        })}
                    />
                    <Form.Text className="text-muted">
                        {errors?.description && <p>{t(errors?.description?.message) || "Error!"}</p>}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('positionAddFrom.enterSubordinationLevel')}
                    </Form.Text>
                    <Form.Control
                        id="subordinationLevel"
                        type="text"
                        placeholder={t('positionAddFrom.enterSubordinationLevel')}
                        {...register("subordinationLevel", {
                            required: "positionAddFrom.required",
                            pattern: {
                                value: /^[\d]{1,3}$/
                            },
                            min: {
                                value: 1,
                                message: "positionAddFrom.MinSubordinationLevel1"
                            },
                            max: {
                                value: 100,
                                message: "positionAddFrom.MaxSubordinationLevel100"
                            }
                        })}
                    />

                    <Form.Text className="text-muted">
                        {errors?.subordinationLevel && <p>{t(errors?.subordinationLevel?.message) || "Error!"}</p>}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('positionAddFrom.selectDepartment')}
                    </Form.Text>

                    <Form.Select
                        name="department.id"
                        {...register("department.id", {
                            required: "positionAddFrom.required"
                        })}
                    >
                        <option value="">{t('positionAddFrom.selectDepartment')}</option>
                        {departments.map((department, index) =>
                            <option key={index} value={department.id}>{department.name}</option>
                        )}
                    </Form.Select>
                    <Form.Text className="text-muted">
                        {errors?.departmentId && <p>{t(errors?.departmentId?.message) || "Error!"}</p>}
                    </Form.Text>

                </Form.Group>

                <div style={{textAlign: 'right'}}>
                    <Button
                        variant="primary"
                        onClick={handleSubmit(addItem)}
                        disabled={!isValid}
                    >
                        {t('positionAddFrom.addButton')}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default PositionAddFrom;