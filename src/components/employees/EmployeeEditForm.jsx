import React, {useEffect, useState} from 'react';
import DepartmentService from "../../API/DepartmentService";
import PositionService from "../../API/PositionService";
import {Form} from "react-bootstrap";
import CityService from "../../API/CityService";
import EmployeeService from "../../API/EmployeeService";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";

const EmployeeEditForm = (props) => {
    const {t} = useTranslation();
    const {
        register,
        formState: {
            errors,
            isValid
        },
        handleSubmit,
        watch
    } = useForm({
        mode: "onBlur",
        defaultValues: {
            id: props.item.id,
            firstName: props.item.firstName,
            lastName: props.item.lastName,
            patronymic: props.item.patronymic,
            dov: props.item.dov,
            birthday: props.item.birthday,
            contractStart: props.item.contractStart,
            contractFinish: props.item.contractFinish,
            email: props.item.email,
            comment: props.item.comment,
            userName: props.item.userName,
            department: {id: props.item.department.id},
            position: {id: props.item.position.id},
            city: {id: props.item.city.id},
            status: props.item.status
        }
    });

    const depId = watch('department.id');
    const [departments, setDepartments] = useState([]);
    const [allPositions, setAllPositions] = useState([]);
    const [positionsByDepartmentId, setPositionsByDepartmentId] = useState([]);
    const [cities, setCities] = useState([]);
    const [activeItem, setActiveItem] = useState(props.item.status === 'ACTIVE');

    useEffect(() => {
        fetchItem();
    }, [])

    async function fetchItem() {
        const responseDepartments = await DepartmentService.getAllByStatus(0, 1500);
        setDepartments(responseDepartments.data.content);

        const responseCities = await CityService.getAll(0, 1500);
        setCities(responseCities.data.content);

        const responsePositions = await PositionService.getAllByStatus(0, 1500);
        setAllPositions(responsePositions.data.content);
    }

    useEffect(() => {
        dependentPositionSelectByDepartmentSelect(depId);
    }, [depId])

    useEffect(() => {
        dependentPositionSelectByDepartmentSelect(depId);
    }, [allPositions])

    const dependentPositionSelectByDepartmentSelect = (id) => {
        let result = allPositions.filter(function (position) {
            return position.department.id == id;
        });
        setPositionsByDepartmentId(result);
    }

    async function editItem(data) {
        if (activeItem) {
            data.status = 'ACTIVE';
        } else {
            data.status = 'NOT_ACTIVE';
        }
        await EmployeeService.update(data.id, data);
        props.updateItemsListAfterAction();
        props.setEditItemWindowVisibleFlag(false);
    }

    const checkBoxAction = () => {
        setActiveItem(!activeItem);
    }

    return (
        <form onSubmit={handleSubmit(editItem)}>

            <div className="form-group">
                <div className="row">
                    <div className="col">
                        <label>{t('employeeEditForm.lastName')}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            placeholder={t('employeeEditForm.enterLastName')}
                            {...register("lastName", {
                                required: "employeeEditForm.required",
                                pattern: {
                                    value: /^[a-zA-ZА-Яа-я0-9\s]{1,45}$/,
                                    message: "employeeEditForm.PatternLastName"
                                },
                                minLength: {
                                    value: 1,
                                    message: "employeeEditForm.MinLengthLastName"
                                },
                                maxLength: {
                                    value: 45,
                                    message: "employeeEditForm.MaxLengthLastName"
                                }
                            })}
                        />
                        <Form.Text className="text-muted">
                            {errors?.lastName && <p>{t(errors?.lastName?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                    <div className="col">
                        <label>{t('employeeEditForm.firstName')}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            placeholder={t('employeeEditForm.enterFirstName')}
                            {...register("firstName", {
                                required: "employeeEditForm.required",
                                pattern: {
                                    value: /^[a-zA-ZА-Яа-я0-9\s]{1,45}$/,
                                    message: "employeeEditForm.PatternFirstName"
                                },
                                minLength: {
                                    value: 1,
                                    message: "employeeEditForm.MinLengthFirstName"
                                },
                                maxLength: {
                                    value: 45,
                                    message: "employeeEditForm.MaxLengthFirstName"
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
                            placeholder={t('employeeEditForm.enterPatronymic')}
                            {...register("patronymic", {
                                pattern: {
                                    value: /^[a-zA-ZА-Яа-я0-9\s]{1,45}$/,
                                    message: "employeeEditForm.PatternPatronymic"
                                },
                                minLength: {
                                    value: 1,
                                    message: "employeeEditForm.MinLengthPatronymic"
                                },
                                maxLength: {
                                    value: 45,
                                    message: "employeeEditForm.MaxLengthPatronymic"
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
                        <label>{t('employeeEditForm.birthday')}</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            id="birthday"
                            {...register("birthday", {
                                required: "employeeEditForm.required"
                            })}
                        />
                        <Form.Text className="text-muted">
                            {errors?.birthday && <p>{t(errors?.birthday?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                    <div className="col">
                        <label>{t('employeeEditForm.firstDayOfContract')}</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            id="contractStart"
                            {...register("contractStart", {
                                required: "employeeEditForm.required"
                            })}
                        />
                        <Form.Text className="text-muted">
                            {errors?.contractStart && <p>{t(errors?.contractStart?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                    <div className="col">
                        <label>{t('employeeEditForm.lastDayOfContract')}</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            id="contractFinish"
                            {...register("contractFinish", {
                                required: "employeeEditForm.required"
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
                        <label>{t('employeeEditForm.city')}</label>
                        <select
                            className="form-control"
                            name="city.id"
                            {
                                ...register("city.id", {
                                    required: "employeeEditForm.required"
                                })
                            }
                        >
                            {cities.map((city, index) =>
                                <option key={index}
                                        selected={(city.id === props.item.city.id) && props.item.city.id}
                                        value={city.id}>{city.name}</option>
                            )}
                        </select>
                        <Form.Text className="text-muted">
                            {errors?.city?.id && <p>{t(errors?.city?.id?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                    <div className="col">
                        <label>{t('employeeEditForm.department')}</label>
                        <select
                            className="form-control"
                            name="department.id"
                            // onChange={event => dependentPositionSelectByDepartmentSelect(event)}
                            {
                                ...register("department.id", {
                                    required: "employeeEditForm.required"
                                })
                            }
                        >
                            {departments.map((department, index) =>
                                <option key={index}
                                        selected={(department.id === props.item.department.id) && props.item.department.id}
                                        value={department.id}>{department.name}</option>
                            )}
                        </select>
                        <Form.Text className="text-muted">
                            {errors?.department?.id && <p>{t(errors?.department?.id?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                    <div className="col">
                        <label>{t('employeeEditForm.position')}</label>
                        <select
                            className="form-control"
                            name="position.id"
                            {
                                ...register("position.id", {
                                    required: "employeeEditForm.required"
                                })
                            }

                        >
                            <option value="">{t('employeeEditForm.selectPosition')}
                            </option>
                            {positionsByDepartmentId.map((position, index) =>
                                <option key={index}
                                        selected={(position.id === props.item.position.id) && props.item.position.id}
                                        value={position.id}>{position.name}</option>
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
                        <label>{t('employeeEditForm.email')}</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder={t('employeeEditForm.enterEmail')}
                            {...register("email", {
                                required: "employeeEditForm.required",
                                pattern: {
                                    value: /^[\S+@\S+\\.\S+]{5,255}$/,
                                    message: "employeeEditForm.PatternEmail"
                                },
                                minLength: {
                                    value: 5,
                                    message: "employeeEditForm.MinLengthEmail"
                                },
                                maxLength: {
                                    value: 255,
                                    message: "employeeEditForm.MaxLengthEmail"
                                }
                            })}
                        />
                        <Form.Text className="text-muted">
                            {errors?.email && <p>{t(errors?.email?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                    <div className="col">
                        <label>{t('employeeEditForm.comment')}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="comment"
                            placeholder={t('employeeEditForm.enterComment')}
                            {...register("comment", {
                                pattern: {
                                    value: /^[a-zA-ZА-Яа-я0-9\s]{0,255}$/,
                                    message: "employeeEditForm.PatternComment"
                                },
                                minLength: {
                                    value: 0,
                                    message: "employeeEditForm.MinLengthComment"
                                },
                                maxLength: {
                                    value: 255,
                                    message: "employeeEditForm.MaxLengthComment"
                                }
                            })}
                        />
                        <Form.Text className="text-muted">
                            {errors?.comment && <p>{t(errors?.comment?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                    <div className="col">
                        <label>{t('employeeEditForm.proxy')}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="dov"
                            placeholder={t('employeeEditForm.enterProxy')}
                            {...register("dov", {
                                pattern: {
                                    value: /^[a-zA-ZА-Яа-я0-9\s-]{0,70}$/,
                                    message: "employeeEditForm.PatternProxy"
                                },
                                minLength: {
                                    value: 0,
                                    message: "employeeEditForm.MinLengthProxy"
                                },
                                maxLength: {
                                    value: 70,
                                    message: "employeeEditForm.MaxLengthProxy"
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
                        <label>{t('employeeEditForm.enterUserName')}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="userName"
                            placeholder={t('employeeEditForm.enterUserName')}
                            {...register("userName", {
                                required: "employeeEditForm.required",
                                pattern: {
                                    value: /^[a-zA-Z0-9]{1,255}$/,
                                    message: "employeeEditForm.PatternUserName"
                                },
                                minLength: {
                                    value: 1,
                                    message: "employeeEditForm.MinLengthUserName"
                                },
                                maxLength: {
                                    value: 255,
                                    message: "employeeEditForm.MaxLengthUserName"
                                }
                            })}
                        />
                        <Form.Text className="text-muted">
                            {errors?.userName && <p>{t(errors?.userName?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>

                    <div className="col">
                        <br/>
                        <Form.Check
                            type="checkbox"
                            label="Activate"
                            id="status"
                            {...register("status")}
                            checked={activeItem}
                            onChange={checkBoxAction}
                        />
                    </div>

                    <div className="col">
                        <br/>
                        <button className="btn btn-primary"
                                disabled={!isValid}
                                variant="primary"
                                onClick={handleSubmit(editItem)}>
                            {t('employeeEditForm.editButton')}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default EmployeeEditForm;