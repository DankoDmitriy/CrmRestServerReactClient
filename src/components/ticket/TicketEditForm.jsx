import React, {useEffect, useState} from 'react';
import LtdService from "../../API/LtdService";
import DepartmentService from "../../API/DepartmentService";
import TicketTypeService from "../../API/TicketTypeService";
import CarService from "../../API/CarService";
import LtdInstanceService from "../../API/LtdInstanceService";
import EmployeeService from "../../API/EmployeeService";
import TicketService from "../../API/TicketService";
import {Form} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";

const TicketEditForm = (props) => {
    const {t} = useTranslation();
    const {
        register,
        formState: {
            errors, // In this object save all errors.
            isValid // This is valid form status.
        },
        handleSubmit, // Method used when we send form
        watch
    } = useForm({
        mode: "onBlur",
        defaultValues: {
            id: props.item.id,
            openStatus: props.item.openStatus,
            dateOfReceiving: props.item.dateOfReceiving,
            dateOfFinish: props.item.dateOfFinish,
            dateCustomersDepartmentDoc: props.item.dateCustomersDepartmentDoc,
            dateAccountingDepartmentDoc: props.item.dateAccountingDepartmentDoc,
            dateTransferDoc: props.item.dateTransferDoc,
            systemTicketId: props.item.systemTicketId,
            waybill: props.item.waybill,
            server: props.item.server,
            ups: props.item.ups,
            switchs: props.item.switchs,
            workplace: props.item.workplace,
            equipment: props.item.equipment,
            employeeExecutorDov: props.item.employeeExecutorDov,
            job: props.item.job,
            other: props.item.other,
            car: {id: props.item.car.id},
            ltdInstance: {
                id: props.item.ltdInstance.id
            },
            employeeExecutor: {
                id: props.item.employeeExecutor.id
            },
            employeeOwner: {
                id: props.item.employeeOwner.id
            },
            employeeRecipient: {
                id: props.item.employeeRecipient.id
            },
            ticketType: {
                id: props.item.ticketType.id
            },
            departmentExecutor: {
                id: props.item.employeeExecutor.department.id
            },
            departmentOwner: {
                id: props.item.employeeOwner.department.id
            },
            ltd: {
                id: props.item.ltdInstance.ltd.id
            }
        }
    });

    const [ltds, setLtds] = useState([]);
    const [ltdInstances, setLtdInstances] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [employeesOwners, setEmployeesOwners] = useState([])
    const [employeesExecutors, setEmployeesExecutors] = useState([])
    const [ticketTypes, setTicketsTypes] = useState([]);
    const [cars, setCars] = useState([]);
    const [activeItem, setActiveItem] = useState(props.item.openStatus === 0);

    const checkBoxAction = () => {
        setActiveItem(!activeItem);
    }

    useEffect(() => {
        fetchItem();
    }, [])

    async function fetchItem() {
        const responseLtd = await LtdService.getAllByStatus(0, 1500,);
        setLtds(responseLtd.data.content);

        const responseDepartments = await DepartmentService.getAllByStatus(0, 1500);
        setDepartments(responseDepartments.data.content)

        const responseTicketTypes = await TicketTypeService.getAllByStatus(0, 1500);
        setTicketsTypes(responseTicketTypes.data.content);

        const responseCars = await CarService.getAllByStatus(0, 1500);
        setCars(responseCars.data.content);
        loadInstanceForLtd(props.item.ltdInstance.ltd.id);
        loadEmployeesOwnersByDepartmentId(props.item.employeeOwner.department.id);
        loadEmployeesExecutorByDepartmentId(props.item.employeeExecutor.department.id)
    }

    const selectLtdId = watch('ltd.id');
    useEffect(() => {
        loadInstanceForLtd(selectLtdId);
    }, [selectLtdId])

    async function loadInstanceForLtd(id) {
        const response = await LtdInstanceService.getAllByStatusAndLtdId(0, 1500, id);
        setLtdInstances(response.data.content);
    }

    const departmentIdOwner = watch('departmentOwner.id')
    useEffect(() => {
        loadEmployeesOwnersByDepartmentId(departmentIdOwner);
    }, [departmentIdOwner])

    async function loadEmployeesOwnersByDepartmentId(id) {
        const response = await EmployeeService.getAllByDepartmentIdAndStatus(0, 1500, id);
        setEmployeesOwners(response.data.content);
    }

    const departmentIdExecutor = watch('departmentExecutor.id')
    useEffect(() => {
        loadEmployeesExecutorByDepartmentId(departmentIdExecutor);
    }, [departmentIdExecutor])

    async function loadEmployeesExecutorByDepartmentId(id) {
        const response = await EmployeeService.getAllByDepartmentIdAndStatus(0, 1500, id);
        setEmployeesExecutors(response.data.content);
    }

    async function editItem(data) {
        if (activeItem) {
            data.openStatus = 0;
        } else {
            data.openStatus = 1;
        }
        await TicketService.update(data.id, data);
        props.updateItemsListAfterAction();
        props.setEditItemWindowVisibleFlag(false);
    }

    return (
        <div>
            <form onSubmit={handleSubmit(editItem)}>
                <div className="form-group">
                    <div className="row">
                        <div className="col">
                            <label>{t('ticketEditForm.ltd')}</label>
                            <select
                                className="form-control"
                                name="ltd.id"
                                {
                                    ...register("ltd.id", {
                                        required: "ticketEditForm.required"
                                    })
                                }
                            >
                                <option value="">{t('ticketEditForm.selectLtd')}</option>
                                {ltds.map((ltd, index) =>
                                    <option key={index}
                                            selected={(ltd.id === props.item.ltdInstance.ltd.id) && props.item.ltdInstance.ltd.id}
                                            value={ltd.id}>
                                        {ltd.nameShort}
                                    </option>
                                )}
                            </select>
                            <Form.Text className="text-muted">
                                {errors?.ltd?.id && <p>{t(errors?.ltd?.id?.message) || "Error!"}</p>}
                            </Form.Text>
                        </div>

                        <div className="col">
                            <label>{t('ticketEditForm.address')}</label>
                            <select
                                className="form-control"
                                name="ltdInstance.id"
                                {
                                    ...register("ltdInstance.id", {
                                        required: "ticketEditForm.required"
                                    })
                                }
                            >
                                <option value="">{t('ticketEditForm.selectAddress')}</option>
                                {ltdInstances.map((instance, index) =>
                                    <option key={index}
                                            selected={(instance.id === props.item.ltdInstance.id) && props.item.ltdInstance.id}
                                            value={instance.id}>
                                        {instance.address}
                                    </option>
                                )}
                            </select>
                            <Form.Text className="text-muted">
                                {errors?.ltdInstance?.id && <p>{t(errors?.ltdInstance?.id?.message) || "Error!"}</p>}
                            </Form.Text>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <div className="col">
                            <label>{t('ticketEditForm.departmentOwner')}</label>
                            <select
                                className="form-control"
                                name="departmentOwner.id"
                                {
                                    ...register("departmentOwner.id", {
                                        required: "ticketEditForm.required"
                                    })
                                }
                            >
                                <option value="">{t('ticketEditForm.selectDepartment')}</option>
                                {departments.map((department, index) =>
                                    <option key={index}
                                            selected={(department.id === props.item.employeeOwner.department.id) && props.item.employeeOwner.department.id}
                                            value={department.id}>
                                        {department.name}
                                    </option>
                                )}
                            </select>
                            <Form.Text className="text-muted">
                                {errors?.departmentOwner?.id &&
                                <p>{t(errors?.departmentOwner?.id?.message) || "Error!"}</p>}
                            </Form.Text>
                        </div>


                        <div className="col">
                            <label>{t('ticketEditForm.owner')}</label>
                            <select
                                className="form-control"
                                name="employeeOwner.id"
                                {
                                    ...register("employeeOwner.id", {
                                        required: "ticketEditForm.required"
                                    })
                                }
                            >
                                <option value="">{t('ticketEditForm.selectOwner')}</option>
                                {employeesOwners.map((employee, index) =>
                                    <option
                                        key={index}
                                        selected={(employee.id === props.item.employeeOwner.id) && props.item.employeeOwner.id}
                                        value={employee.id}>
                                        {employee.firstName + " " + employee.lastName}
                                    </option>
                                )}
                            </select>
                            <Form.Text className="text-muted">
                                {errors?.employeeOwner?.id &&
                                <p>{t(errors?.employeeOwner?.id?.message) || "Error!"}</p>}
                            </Form.Text>
                        </div>

                        <div className="col">
                            <label>{t('ticketEditForm.ticketType')}</label>
                            <select
                                className="form-control"
                                name="ticketType.id"
                                {
                                    ...register("ticketType.id", {
                                        required: "ticketEditForm.required"
                                    })
                                }
                            >
                                <option value="">{t('ticketEditForm.selectTicketType')}</option>
                                {ticketTypes.map((ticketType, index) =>
                                    <option key={index}
                                            selected={(ticketType.id === props.item.ticketType.id) && props.item.ticketType.id}
                                            value={ticketType.id}>
                                        {ticketType.name}
                                    </option>
                                )}
                            </select>
                            <Form.Text className="text-muted">
                                {errors?.ticketType?.id && <p>{t(errors?.ticketType?.id?.message) || "Error!"}</p>}
                            </Form.Text>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">

                            <div className="col">
                                <label>{t('ticketEditForm.systemId')}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="systemTicketId"
                                    placeholder={t('ticketEditForm.enterSystemId')}
                                    {...register("systemTicketId", {
                                        required: "ticketEditForm.required",
                                        pattern: {
                                            value: /^[a-zA-ZА-Яа-я0-9,.:;!?\s-"]{0,70}$/,
                                            message: "ticketEditForm.PatternSystemId"
                                        },
                                        minLength: {
                                            value: 0,
                                            message: "ticketEditForm.MinLengthSystemId"
                                        },
                                        maxLength: {
                                            value: 70,
                                            message: "ticketEditForm.MaxLengthSystemId"
                                        }
                                    })}
                                />
                                <Form.Text className="text-muted">
                                    {errors?.systemTicketId && <p>{t(errors?.systemTicketId?.message) || "Error!"}</p>}
                                </Form.Text>
                            </div>

                            <div className="col">
                                <label>{t('ticketEditForm.receivingDate')}</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    id="dateOfReceiving"
                                    {
                                        ...register("dateOfReceiving", {
                                            required: "ticketEditForm.required"
                                        })
                                    }
                                />
                                <Form.Text className="text-muted">
                                    {errors?.dateOfReceiving &&
                                    <p>{t(errors?.dateOfReceiving?.message) || "Error!"}</p>}
                                </Form.Text>
                            </div>

                            <div className="col">
                                <label>{t('ticketEditForm.finishDate')}</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    id="dateOfFinish"
                                    {
                                        ...register("dateOfFinish", {
                                            required: "ticketEditForm.required"
                                        })
                                    }
                                />
                                <Form.Text className="text-muted">
                                    {errors?.dateOfFinish && <p>{t(errors?.dateOfFinish?.message) || "Error!"}</p>}
                                </Form.Text>
                            </div>

                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <div className="col">
                                <label>{t('ticketEditForm.servers')}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="server"
                                    placeholder={t('ticketEditForm.enterServers')}
                                    {...register("server", {
                                        required: "ticketEditForm.required",
                                        pattern: {
                                            value: /^[0-9"]{1,4}$/
                                        },
                                        min: {
                                            value: 0,
                                            message: "ticketEditForm.minServers"
                                        },
                                        max: {
                                            value: 1000,
                                            message: "ticketEditForm.maxServers"
                                        }
                                    })}
                                />
                                <Form.Text className="text-muted">
                                    {errors?.server && <p>{t(errors?.server?.message) || "Error!"}</p>}
                                </Form.Text>
                            </div>

                            <div className="col">
                                <label>{t('ticketEditForm.ups')}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="ups"
                                    placeholder={t('ticketEditForm.enterUps')}
                                    {...register("ups", {
                                        required: "ticketEditForm.required",
                                        pattern: {
                                            value: /^[0-9"]{1,4}$/
                                        },
                                        min: {
                                            value: 0,
                                            message: "ticketEditForm.minUps"
                                        },
                                        max: {
                                            value: 1000,
                                            message: "ticketEditForm.maxUps"
                                        }
                                    })}
                                />
                                <Form.Text className="text-muted">
                                    {errors?.ups && <p>{t(errors?.ups?.message) || "Error!"}</p>}
                                </Form.Text>
                            </div>

                            <div className="col">
                                <label>{t('ticketEditForm.switchs')}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="switchs"
                                    placeholder={t('ticketEditForm.enterSwitchs')}
                                    {...register("switchs", {
                                        required: "ticketEditForm.required",
                                        pattern: {
                                            value: /^[0-9"]{1,4}$/
                                        },
                                        min: {
                                            value: 0,
                                            message: "ticketEditForm.minSwitchs"
                                        },
                                        max: {
                                            value: 1000,
                                            message: "ticketEditForm.maxSwitchs"
                                        }
                                    })}
                                />
                                <Form.Text className="text-muted">
                                    {errors?.switchs && <p>{t(errors?.switchs?.message) || "Error!"}</p>}
                                </Form.Text>
                            </div>

                            <div className="col">
                                <label>{t('ticketEditForm.workplace')}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="workplace"
                                    placeholder={t('ticketEditForm.enterWorkplace')}
                                    {...register("workplace", {
                                        required: "ticketEditForm.required",
                                        pattern: {
                                            value: /^[0-9"]{1,4}$/
                                        },
                                        min: {
                                            value: 0,
                                            message: "ticketEditForm.minWorkplace"
                                        },
                                        max: {
                                            value: 1000,
                                            message: "ticketEditForm.maxWorkplace"
                                        }
                                    })}
                                />
                                <Form.Text className="text-muted">
                                    {errors?.workplace && <p>{t(errors?.workplace?.message) || "Error!"}</p>}
                                </Form.Text>
                            </div>

                            <div className="col">
                                <label>{t('ticketEditForm.equipment')}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="equipment"
                                    placeholder={t('ticketEditForm.enterEquipment')}
                                    {...register("equipment", {
                                        required: "ticketEditForm.required",
                                        pattern: {
                                            value: /^[0-9"]{1,4}$/
                                        },
                                        min: {
                                            value: 0,
                                            message: "ticketEditForm.minEquipment"
                                        },
                                        max: {
                                            value: 1000,
                                            message: "ticketEditForm.maxEquipment"
                                        }
                                    })}
                                />
                                <Form.Text className="text-muted">
                                    {errors?.equipment && <p>{t(errors?.equipment?.message) || "Error!"}</p>}
                                </Form.Text>
                            </div>

                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">

                            <div className="col">
                                <label>{t('ticketEditForm.car')}</label>
                                <select
                                    className="form-control"
                                    name="car.id"
                                    {
                                        ...register("car.id", {
                                            required: "ticketEditForm.required"
                                        })
                                    }
                                >
                                    <option value="">{t('ticketEditForm.selectCar')}</option>
                                    {cars.map((car, index) =>
                                        <option key={index}
                                                selected={(car.id === props.item.car.id) && props.item.car.id}
                                                value={car.id}>
                                            {car.number}
                                        </option>
                                    )}
                                </select>
                                <Form.Text className="text-muted">
                                    {errors?.car?.id && <p>{t(errors?.car?.id?.message) || "Error!"}</p>}
                                </Form.Text>
                            </div>

                            <div className="col">
                                <label>{t('ticketEditForm.waybill')}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="waybill"
                                    placeholder={t('ticketEditForm.enterWaybill')}
                                    {...register("waybill", {
                                        required: "ticketEditForm.required",
                                        pattern: {
                                            value: /^[a-zA-ZА-Яа-я0-9,.:;!?\s-"]{1,70}$/,
                                            message: "ticketEditForm.PatternWaybill"
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "ticketEditForm.MinLengthWaybill"
                                        },
                                        maxLength: {
                                            value: 70,
                                            message: "ticketEditForm.MaxLengthWaybill"
                                        }
                                    })}
                                />
                                <Form.Text className="text-muted">
                                    {errors?.waybill && <p>{t(errors?.waybill?.message) || "Error!"}</p>}
                                </Form.Text>
                            </div>

                            <div className="col">
                                <label>{t('ticketEditForm.executorDepartment')}</label>
                                <select
                                    className="form-control"
                                    name="departmentExecutor.id"
                                    {
                                        ...register("departmentExecutor.id", {
                                            required: "ticketEditForm.required"
                                        })
                                    }
                                >
                                    <option value="">{t('ticketEditForm.selectExecutorDepartment')}</option>
                                    {departments.map((department, index) =>
                                        <option key={index}
                                                selected={(department.id === props.item.employeeExecutor.department.id) && props.item.employeeExecutor.department.id}
                                                value={department.id}>
                                            {department.name}
                                        </option>
                                    )}
                                </select>
                                <Form.Text className="text-muted">
                                    {errors?.departmentExecutor?.id &&
                                    <p>{t(errors?.departmentExecutor?.id?.message) || "Error!"}</p>}
                                </Form.Text>
                            </div>


                            <div className="col">
                                <label>{t('ticketEditForm.executor')}</label>
                                <select
                                    className="form-control"
                                    name="employeeExecutor.id"
                                    {
                                        ...register("employeeExecutor.id", {
                                            required: "ticketEditForm.required"
                                        })
                                    }
                                >
                                    <option value="">{t('ticketEditForm.selectExecutor')}</option>
                                    {employeesExecutors.map((employee, index) =>
                                        <option
                                            key={index}
                                            selected={(employee.id === props.item.employeeExecutor.id) && props.item.employeeExecutor.id}
                                            value={employee.id}>
                                            {employee.firstName + " " + employee.lastName}
                                        </option>
                                    )}
                                </select>
                                <Form.Text className="text-muted">
                                    {errors?.employeeExecutor?.id &&
                                    <p>{t(errors?.employeeExecutor?.id?.message) || "Error!"}</p>}
                                </Form.Text>
                            </div>

                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">

                            <div className="col">
                                <label>{t('ticketEditForm.docCustomers')}</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    id="dateCustomersDepartmentDoc"
                                    {
                                        ...register("dateCustomersDepartmentDoc", {})
                                    }
                                />
                                <Form.Text className="text-muted">
                                    {errors?.dateCustomersDepartmentDoc &&
                                    <p>{t(errors?.dateCustomersDepartmentDoc?.message) || "Error!"}</p>}
                                </Form.Text>
                            </div>

                            <div className="col">
                                <label>{t('ticketEditForm.docAccounting')}</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    id="dateAccountingDepartmentDoc"
                                    {
                                        ...register("dateAccountingDepartmentDoc", {})
                                    }
                                />
                                <Form.Text className="text-muted">
                                    {errors?.dateAccountingDepartmentDoc &&
                                    <p>{t(errors?.dateAccountingDepartmentDoc?.message) || "Error!"}</p>}
                                </Form.Text>
                            </div>

                            <div className="col">
                                <label>{t('ticketEditForm.docTransfer')}</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    name="dateTransferDoc"
                                    {
                                        ...register("dateTransferDoc", {})
                                    }
                                />
                                <Form.Text className="text-muted">
                                    {errors?.dateTransferDoc &&
                                    <p>{t(errors?.dateTransferDoc?.message) || "Error!"}</p>}
                                </Form.Text>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">

                            <div className="col">
                                <label>{t('ticketEditForm.job')}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="job"
                                    placeholder={t('ticketEditForm.enterJob')}
                                    {...register("job", {
                                        pattern: {
                                            value: /^[a-zA-ZА-Яа-я0-9,.:;!?\s-"]{0,255}$/,
                                            message: "ticketEditForm.PatternJob"
                                        },
                                        minLength: {
                                            value: 0,
                                            message: "ticketEditForm.MinLengthJob"
                                        },
                                        maxLength: {
                                            value: 255,
                                            message: "ticketEditForm.MaxLengthJob"
                                        }
                                    })}
                                />
                                <Form.Text className="text-muted">
                                    {errors?.job &&
                                    <p>{t(errors?.job?.message) || "Error!"}</p>}
                                </Form.Text>
                            </div>

                            <div className="col">
                                <label>{t('ticketEditForm.other')}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="other"
                                    placeholder={t('ticketEditForm.enterOther')}
                                    {...register("other", {
                                        pattern: {
                                            value: /^[a-zA-ZА-Яа-я0-9,.:;!?\s-"]{0,255}$/,
                                            message: "ticketEditForm.PatternOther"
                                        },
                                        minLength: {
                                            value: 0,
                                            message: "ticketEditForm.MinLengthOther"
                                        },
                                        maxLength: {
                                            value: 255,
                                            message: "ticketEditForm.MaxLengthOther"
                                        }
                                    })}
                                />
                                <Form.Text className="text-muted">
                                    {errors?.other &&
                                    <p>{t(errors?.other?.message) || "Error!"}</p>}
                                </Form.Text>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">

                        <div className="col">
                            <label>Close ticket:</label>
                            <Form.Check
                                type="checkbox"
                                label="Closed"
                                checked={activeItem}
                                onChange={checkBoxAction}
                            />
                        </div>

                        <div className="col">
                            <br/>
                            <button className="btn btn-primary"
                                    disabled={!isValid}
                                    onClick={handleSubmit(editItem)}>
                                {t('ticketEditForm.editButton')}
                            </button>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    );
};

export default TicketEditForm;