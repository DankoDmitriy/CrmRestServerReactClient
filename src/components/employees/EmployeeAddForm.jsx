import React, {useEffect, useState} from 'react';
import DepartmentService from "../../API/DepartmentService";
import CityService from "../../API/CityService";
import PositionService from "../../API/PositionService";
import EmployeeService from "../../API/EmployeeService";
import "../../i18n"
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {Form} from "react-bootstrap";

const EmployeeAddForm = (props) => {
    const {t} = useTranslation();
    const {
        register,
        formState: {
            errors, // In this object save all errors.
            isValid // This is valid form status.
        },
        handleSubmit, // Method used when we send form
        reset,  // Method for reset form after submit.
        watch
    } = useForm({
        mode: "onBlur"
    });

    const depId = watch('department.id');
    useEffect(() => {
        dependentPositionSelectByDepartmentSelect(depId);
    }, [depId])

    const [departments, setDepartments] = useState([]);
    const [allPositions, setAllPositions] = useState([]);
    const [positionsByDepartmentId, setPositionsByDepartmentId] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        fetchItem();
    }, [positionsByDepartmentId])

    async function fetchItem() {
        //Loading data for dynamic form
        const responseDepartments = await DepartmentService.getAllByStatus(0, 1500);
        setDepartments(responseDepartments.data.content);

        const responseCities = await CityService.getAll(0, 1500);
        setCities(responseCities.data.content);

        const responsePositions = await PositionService.getAllByStatus(0, 1500);
        setAllPositions(responsePositions.data.content);
    }

    const dependentPositionSelectByDepartmentSelect = (id) => {
        setPositionsByDepartmentId([]);
        let result = allPositions.filter(function (position) {
            return position.department.id == id;
        });
        setPositionsByDepartmentId(result);
    }

    async function addItem(data) {
        const response = await EmployeeService.add(data);
        props.updateItemsListAfterAction();
        reset();
    }

    return (
        <form onSubmit={handleSubmit(addItem)}>

            <div className="form-group">
                <div className="row">
                    <div className="col">
                        <label>{t('employeeAddForm.lastName')}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            placeholder={t('employeeAddForm.enterLastName')}
                            {...register("lastName", {
                                required: "employeeAddForm.required",
                                pattern: {
                                    value: /^[a-zA-ZА-Яа-я0-9\s]{1,45}$/,
                                    message: "employeeAddForm.PatternLastName"
                                },
                                minLength: {
                                    value: 1,
                                    message: "employeeAddForm.MinLengthLastName"
                                },
                                maxLength: {
                                    value: 45,
                                    message: "employeeAddForm.MaxLengthLastName"
                                }
                            })}
                        />
                        <Form.Text className="text-muted">
                            {errors?.lastName && <p>{t(errors?.lastName?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                    <div className="col">
                        <label>{t('employeeAddForm.firstName')}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            placeholder={t('employeeAddForm.enterFirstName')}
                            {...register("firstName", {
                                required: "employeeAddForm.required",
                                pattern: {
                                    value: /^[a-zA-ZА-Яа-я0-9\s]{1,45}$/,
                                    message: "employeeAddForm.PatternFirstName"
                                },
                                minLength: {
                                    value: 1,
                                    message: "employeeAddForm.MinLengthFirstName"
                                },
                                maxLength: {
                                    value: 45,
                                    message: "employeeAddForm.MaxLengthFirstName"
                                }
                            })}
                        />
                        <Form.Text className="text-muted">
                            {errors?.firstName && <p>{t(errors?.firstName?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                    <div className="col">
                        <label>{t('employeeAddForm.patronymic')}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="patronymic"
                            placeholder={t('employeeAddForm.enterPatronymic')}
                            {...register("patronymic", {
                                pattern: {
                                    value: /^[a-zA-ZА-Яа-я0-9\s]{1,45}$/,
                                    message: "employeeAddForm.PatternPatronymic"
                                },
                                minLength: {
                                    value: 1,
                                    message: "employeeAddForm.MinLengthPatronymic"
                                },
                                maxLength: {
                                    value: 45,
                                    message: "employeeAddForm.MaxLengthPatronymic"
                                }
                            })}
                        />
                        <Form.Text className="text-muted">
                            {errors?.patronymic && <p>{t(errors?.patronymic?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                </div>
            </div>

            <div className="form-group">
                <div className="row">
                    <div className="col">
                        <label>{t('employeeAddForm.birthday')}</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            id="birthday"
                            {...register("birthday", {
                                required: "employeeAddForm.required"
                            })}
                        />
                        <Form.Text className="text-muted">
                            {errors?.birthday && <p>{t(errors?.birthday?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                    <div className="col">
                        <label>{t('employeeAddForm.firstDayOfContract')}</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            id="contractStart"
                            {...register("contractStart", {
                                required: "employeeAddForm.required"
                            })}
                        />
                        <Form.Text className="text-muted">
                            {errors?.contractStart && <p>{t(errors?.contractStart?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                    <div className="col">
                        <label>{t('employeeAddForm.lastDayOfContract')}</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            id="contractFinish"
                            {...register("contractFinish", {
                                required: "employeeAddForm.required"
                            })}
                        />
                        <Form.Text className="text-muted">
                            {errors?.contractFinish && <p>{t(errors?.contractFinish?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="row">

                    <div className="col">
                        <label>{t('employeeAddForm.city')}</label>
                        <select
                            className="form-control"
                            name="city.id"
                            {
                                ...register("city.id", {
                                    required: "employeeAddForm.required"
                                })
                            }
                        >
                            <option value="">{t('employeeAddForm.selectCity')}</option>
                            {cities.map((city, index) =>
                                <option key={index} value={city.id}>{city.name}</option>
                            )}
                        </select>
                        <Form.Text className="text-muted">
                            {errors?.city?.id && <p>{t(errors?.city?.id?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                    <div className="col">
                        <label>{t('employeeAddForm.department')}</label>
                        <select
                            className="form-control"
                            name="department.id"
                            onChange={event => dependentPositionSelectByDepartmentSelect(event)}
                            {
                                ...register("department.id", {
                                    required: "employeeAddForm.required"
                                })
                            }
                        >
                            <option value="">{t('employeeAddForm.selectDepartment')}</option>
                            {departments.map((department, index) =>
                                <option key={index} value={department.id}>{department.name}</option>
                            )}
                        </select>
                        <Form.Text className="text-muted">
                            {errors?.department?.id && <p>{t(errors?.department?.id?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                    <div className="col">
                        <label>{t('employeeAddForm.position')}</label>
                        <select
                            className="form-control"
                            name="position.id"
                            {
                                ...register("position.id", {
                                    required: "employeeAddForm.required"
                                })
                            }
                        >
                            <option value="">{t('employeeAddForm.selectPosition')}
                            </option>
                            {positionsByDepartmentId.map((position, index) =>
                                <option key={index} value={position.id}>{position.name}</option>
                            )}
                        </select>
                        <Form.Text className="text-muted">
                            {errors?.position?.id && <p>{t(errors?.position?.id?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col">
                        <label>{t('employeeAddForm.email')}</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder={t('employeeAddForm.enterEmail')}
                            {...register("email", {
                                required: "employeeAddForm.required",
                                pattern: {
                                    value: /^[\S+@\S+\\.\S+]{5,255}$/,
                                    message: "employeeAddForm.PatternEmail"
                                },
                                minLength: {
                                    value: 5,
                                    message: "employeeAddForm.MinLengthEmail"
                                },
                                maxLength: {
                                    value: 255,
                                    message: "employeeAddForm.MaxLengthEmail"
                                }
                            })}
                        />
                        <Form.Text className="text-muted">
                            {errors?.email && <p>{t(errors?.email?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                    <div className="col">
                        <label>{t('employeeAddForm.comment')}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="comment"
                            placeholder={t('employeeAddForm.enterComment')}
                            {...register("comment", {
                                pattern: {
                                    value: /^[a-zA-ZА-Яа-я0-9\s]{0,255}$/,
                                    message: "employeeAddForm.PatternComment"
                                },
                                minLength: {
                                    value: 0,
                                    message: "employeeAddForm.MinLengthComment"
                                },
                                maxLength: {
                                    value: 255,
                                    message: "employeeAddForm.MaxLengthComment"
                                }
                            })}
                        />
                        <Form.Text className="text-muted">
                            {errors?.comment && <p>{t(errors?.comment?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                    <div className="col">
                        <label>{t('employeeAddForm.proxy')}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="dov"
                            placeholder={t('employeeAddForm.enterProxy')}
                            {...register("dov", {
                                pattern: {
                                    value: /^[a-zA-ZА-Яа-я0-9\s-]{0,70}$/,
                                    message: "employeeAddForm.PatternProxy"
                                },
                                minLength: {
                                    value: 0,
                                    message: "employeeAddForm.MinLengthProxy"
                                },
                                maxLength: {
                                    value: 70,
                                    message: "employeeAddForm.MaxLengthProxy"
                                }
                            })}
                        />
                        <Form.Text className="text-muted">
                            {errors?.dov && <p>{t(errors?.dov?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="row">

                    <div className="col">
                        <label>{t('employeeAddForm.enterUserName')}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="userName"
                            placeholder={t('employeeAddForm.enterUserName')}
                            {...register("userName", {
                                required: "employeeAddForm.required",
                                pattern: {
                                    value: /^[a-zA-Z0-9]{1,255}$/,
                                    message: "employeeAddForm.PatternUserName"
                                },
                                minLength: {
                                    value: 1,
                                    message: "employeeAddForm.MinLengthUserName"
                                },
                                maxLength: {
                                    value: 255,
                                    message: "employeeAddForm.MaxLengthUserName"
                                }
                            })}
                        />
                        <Form.Text className="text-muted">
                            {errors?.userName && <p>{t(errors?.userName?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>

                    <div className="col"></div>

                    <div className="col">
                        <br/>
                        <button className="btn btn-primary"
                                disabled={!isValid}
                                variant="primary"
                                onClick={handleSubmit(addItem)}>
                            {t('employeeAddForm.addButton')}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default EmployeeAddForm;