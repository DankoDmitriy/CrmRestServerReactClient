import React, {useEffect, useState} from 'react';
import LtdService from "../../API/LtdService";
import LtdInstanceService from "../../API/LtdInstanceService";
import DepartmentService from "../../API/DepartmentService";
import EmployeeService from "../../API/EmployeeService";
import TicketTypeService from "../../API/TicketTypeService";
import CarService from "../../API/CarService";
import TicketService from "../../API/TicketService";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {Form} from "react-bootstrap";

const TicketAddForm = (props) => {
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
        mode: "onBlur",
        defaultValues: {
            id: '',
            openStatus: '1',
            dateOfReceiving: '',
            dateOfFinish: '',
            dateCustomersDepartmentDoc: '',
            dateAccountingDepartmentDoc: '',
            dateTransferDoc: '',
            systemTicketId: '',
            waybill: '',
            server: '0',
            ups: '0',
            switchs: '0',
            workplace: '0',
            equipment: '0',
            employeeExecutorDov: '',
            job: '',
            other: '',
            car: {id: null},
            ltdInstance: {id: ''},
            employeeExecutor: {id: ''},
            employeeOwner: {id: ''},
            employeeRecipient: {id: 1},
            ticketType: {id: ''}
        }
    });

    const [ltds, setLtds] = useState([]);
    const [ltdInstances, setLtdInstances] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [employeesOwners, setEmployeesOwners] = useState([])
    const [employeesExecutors, setEmployeesExecutors] = useState([])
    const [ticketTypes, setTicketsTypes] = useState([]);
    const [cars, setCars] = useState([]);

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

    async function addItem(data) {
        await TicketService.add(data)
        props.updateItemsListAfterAction();
        reset();
    }

    return (
        <div>
            <form onSubmit={handleSubmit(addItem)}>
                <div className="form-group">
                    <div className="row">
                        <div className="col">
                            <label>{t('ticketAddForm.ltd')}</label>
                            <select
                                className="form-control"
                                name="ltd.id"
                                {
                                    ...register("ltd.id", {
                                        required: "ticketAddForm.required"
                                    })
                                }
                            >
                                <option value="">{t('ticketAddForm.selectLtd')}</option>
                                {ltds.map((ltd, index) =>
                                    <option key={index} value={ltd.id}>{ltd.nameShort}</option>
                                )}
                            </select>
                            <Form.Text className="text-muted">
                                {errors?.ltd?.id && <p>{t(errors?.ltd?.id?.message) || "Error!"}</p>}
                            </Form.Text>
                        </div>

                        <div className="col">
                            <label>{t('ticketAddForm.address')}</label>
                            <select
                                className="form-control"
                                name="ltdInstance.id"
                                {
                                    ...register("ltdInstance.id", {
                                        required: "ticketAddForm.required"
                                    })
                                }
                            >
                                <option value="">{t('ticketAddForm.selectAddress')}</option>
                                {ltdInstances.map((instance, index) =>
                                    <option key={index} value={instance.id}>{instance.address}</option>
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
                            <label>{t('ticketAddForm.departmentOwner')}</label>
                            <select
                                className="form-control"
                                name="departmentOwner.id"
                                {
                                    ...register("departmentOwner.id", {
                                        required: "ticketAddForm.required"
                                    })
                                }
                            >
                                <option value="">{t('ticketAddForm.selectDepartment')}</option>
                                {departments.map((department, index) =>
                                    <option key={index} value={department.id}>{department.name}</option>
                                )}
                            </select>
                            <Form.Text className="text-muted">
                                {errors?.departmentOwner?.id &&
                                <p>{t(errors?.departmentOwner?.id?.message) || "Error!"}</p>}
                            </Form.Text>
                        </div>


                        <div className="col">
                            <label>{t('ticketAddForm.owner')}</label>
                            <select
                                className="form-control"
                                name="employeeOwner.id"
                                {
                                    ...register("employeeOwner.id", {
                                        required: "ticketAddForm.required"
                                    })
                                }
                            >
                                <option value="">{t('ticketAddForm.selectOwner')}</option>
                                {employeesOwners.map((employee, index) =>
                                    <option
                                        key={index}
                                        value={employee.id}>{employee.firstName + " " + employee.lastName}</option>
                                )}
                            </select>
                            <Form.Text className="text-muted">
                                {errors?.employeeOwner?.id &&
                                <p>{t(errors?.employeeOwner?.id?.message) || "Error!"}</p>}
                            </Form.Text>
                        </div>

                        <div className="col">
                            <label>{t('ticketAddForm.ticketType')}</label>
                            <select
                                className="form-control"
                                name="ticketType.id"
                                {
                                    ...register("ticketType.id", {
                                        required: "ticketAddForm.required"
                                    })
                                }
                            >
                                <option value="">{t('ticketAddForm.selectTicketType')}</option>
                                {ticketTypes.map((ticketType, index) =>
                                    <option key={index} value={ticketType.id}>{ticketType.name}</option>
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
                                <label>{t('ticketAddForm.systemId')}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="systemTicketId"
                                    placeholder={t('ticketAddForm.enterSystemId')}
                                    {...register("systemTicketId", {
                                        required: "ticketAddForm.required",
                                        pattern: {
                                            value: /^[a-zA-ZА-Яа-я0-9,.:;!?\s-"]{0,70}$/,
                                            message: "ticketAddForm.PatternSystemId"
                                        },
                                        minLength: {
                                            value: 0,
                                            message: "ticketAddForm.MinLengthSystemId"
                                        },
                                        maxLength: {
                                            value: 70,
                                            message: "ticketAddForm.MaxLengthSystemId"
                                        }
                                    })}
                                />
                                <Form.Text className="text-muted">
                                    {errors?.systemTicketId && <p>{t(errors?.systemTicketId?.message) || "Error!"}</p>}
                                </Form.Text>
                            </div>

                            <div className="col">
                                <label>{t('ticketAddForm.receivingDate')}</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    id="dateOfReceiving"
                                    {
                                        ...register("dateOfReceiving", {
                                            required: "ticketAddForm.required"
                                        })
                                    }
                                />
                                <Form.Text className="text-muted">
                                    {errors?.dateOfReceiving &&
                                    <p>{t(errors?.dateOfReceiving?.message) || "Error!"}</p>}
                                </Form.Text>
                            </div>

                            <div className="col">
                                <label>{t('ticketAddForm.finishDate')}</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    id="dateOfFinish"
                                    {
                                        ...register("dateOfFinish", {
                                            required: "ticketAddForm.required"
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
                                <label>{t('ticketAddForm.servers')}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="server"
                                    placeholder={t('ticketAddForm.enterServers')}
                                    {...register("server", {
                                        required: "ticketAddForm.required",
                                        pattern: {
                                            value: /^[0-9"]{1,4}$/
                                        },
                                        min: {
                                            value: 0,
                                            message: "ticketAddForm.minServers"
                                        },
                                        max: {
                                            value: 1000,
                                            message: "ticketAddForm.maxServers"
                                        }
                                    })}
                                />
                                <Form.Text className="text-muted">
                                    {errors?.server && <p>{t(errors?.server?.message) || "Error!"}</p>}
                                </Form.Text>
                            </div>

                            <div className="col">
                                <label>{t('ticketAddForm.ups')}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="ups"
                                    placeholder={t('ticketAddForm.enterUps')}
                                    {...register("ups", {
                                        required: "ticketAddForm.required",
                                        pattern: {
                                            value: /^[0-9"]{1,4}$/
                                        },
                                        min: {
                                            value: 0,
                                            message: "ticketAddForm.minUps"
                                        },
                                        max: {
                                            value: 1000,
                                            message: "ticketAddForm.maxUps"
                                        }
                                    })}
                                />
                                <Form.Text className="text-muted">
                                    {errors?.ups && <p>{t(errors?.ups?.message) || "Error!"}</p>}
                                </Form.Text>
                            </div>

                            <div className="col">
                                <label>{t('ticketAddForm.switchs')}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="switchs"
                                    placeholder={t('ticketAddForm.enterSwitchs')}
                                    {...register("switchs", {
                                        required: "ticketAddForm.required",
                                        pattern: {
                                            value: /^[0-9"]{1,4}$/
                                        },
                                        min: {
                                            value: 0,
                                            message: "ticketAddForm.minSwitchs"
                                        },
                                        max: {
                                            value: 1000,
                                            message: "ticketAddForm.maxSwitchs"
                                        }
                                    })}
                                />
                                <Form.Text className="text-muted">
                                    {errors?.switchs && <p>{t(errors?.switchs?.message) || "Error!"}</p>}
                                </Form.Text>
                            </div>

                            <div className="col">
                                <label>{t('ticketAddForm.workplace')}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="workplace"
                                    placeholder={t('ticketAddForm.enterWorkplace')}
                                    {...register("workplace", {
                                        required: "ticketAddForm.required",
                                        pattern: {
                                            value: /^[0-9"]{1,4}$/
                                        },
                                        min: {
                                            value: 0,
                                            message: "ticketAddForm.minWorkplace"
                                        },
                                        max: {
                                            value: 1000,
                                            message: "ticketAddForm.maxWorkplace"
                                        }
                                    })}
                                />
                                <Form.Text className="text-muted">
                                    {errors?.workplace && <p>{t(errors?.workplace?.message) || "Error!"}</p>}
                                </Form.Text>
                            </div>

                            <div className="col">
                                <label>{t('ticketAddForm.equipment')}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="equipment"
                                    placeholder={t('ticketAddForm.enterEquipment')}
                                    {...register("equipment", {
                                        required: "ticketAddForm.required",
                                        pattern: {
                                            value: /^[0-9"]{1,4}$/
                                        },
                                        min: {
                                            value: 0,
                                            message: "ticketAddForm.minEquipment"
                                        },
                                        max: {
                                            value: 1000,
                                            message: "ticketAddForm.maxEquipment"
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
                                <label>{t('ticketAddForm.car')}</label>
                                <select
                                    className="form-control"
                                    name="car.id"
                                    {
                                        ...register("car.id", {
                                            required: "ticketAddForm.required"
                                        })
                                    }
                                >
                                    <option value="">{t('ticketAddForm.selectCar')}</option>
                                    {cars.map((car, index) =>
                                        <option key={index} value={car.id}>{car.number}</option>
                                    )}
                                </select>
                                <Form.Text className="text-muted">
                                    {errors?.car?.id && <p>{t(errors?.car?.id?.message) || "Error!"}</p>}
                                </Form.Text>
                            </div>

                            <div className="col">
                                <label>{t('ticketAddForm.waybill')}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="waybill"
                                    placeholder={t('ticketAddForm.enterWaybill')}
                                    {...register("waybill", {
                                        required: "ticketAddForm.required",
                                        pattern: {
                                            value: /^[a-zA-ZА-Яа-я0-9,.:;!?\s-"]{1,70}$/,
                                            message: "ticketAddForm.PatternWaybill"
                                        },
                                        minLength: {
                                            value: 1,
                                            message: "ticketAddForm.MinLengthWaybill"
                                        },
                                        maxLength: {
                                            value: 70,
                                            message: "ticketAddForm.MaxLengthWaybill"
                                        }
                                    })}
                                />
                                <Form.Text className="text-muted">
                                    {errors?.waybill && <p>{t(errors?.waybill?.message) || "Error!"}</p>}
                                </Form.Text>
                            </div>

                            <div className="col">
                                <label>{t('ticketAddForm.executorDepartment')}</label>
                                <select
                                    className="form-control"
                                    name="departmentExecutor.id"
                                    {
                                        ...register("departmentExecutor.id", {
                                            required: "ticketAddForm.required"
                                        })
                                    }
                                >
                                    <option value="">{t('ticketAddForm.selectExecutorDepartment')}</option>
                                    {departments.map((department, index) =>
                                        <option key={index} value={department.id}>{department.name}</option>
                                    )}
                                </select>
                                <Form.Text className="text-muted">
                                    {errors?.departmentExecutor?.id &&
                                    <p>{t(errors?.departmentExecutor?.id?.message) || "Error!"}</p>}
                                </Form.Text>
                            </div>


                            <div className="col">
                                <label>{t('ticketAddForm.executor')}</label>
                                <select
                                    className="form-control"
                                    name="employeeExecutor.id"
                                    {
                                        ...register("employeeExecutor.id", {
                                            required: "ticketAddForm.required"
                                        })
                                    }
                                >
                                    <option value="">{t('ticketAddForm.selectExecutor')}</option>
                                    {employeesExecutors.map((employee, index) =>
                                        <option
                                            key={index}
                                            value={employee.id}>{employee.firstName + " " + employee.lastName}</option>
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
                                <label>{t('ticketAddForm.docCustomers')}</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    id="dateCustomersDepartmentDoc"
                                    {
                                        ...register("dateCustomersDepartmentDoc", {
                                        })
                                    }
                                />
                                <Form.Text className="text-muted">
                                    {errors?.dateCustomersDepartmentDoc &&
                                    <p>{t(errors?.dateCustomersDepartmentDoc?.message) || "Error!"}</p>}
                                </Form.Text>
                            </div>

                            <div className="col">
                                <label>{t('ticketAddForm.docAccounting')}</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    id="dateAccountingDepartmentDoc"
                                    {
                                        ...register("dateAccountingDepartmentDoc", {
                                        })
                                    }
                                />
                                <Form.Text className="text-muted">
                                    {errors?.dateAccountingDepartmentDoc &&
                                    <p>{t(errors?.dateAccountingDepartmentDoc?.message) || "Error!"}</p>}
                                </Form.Text>
                            </div>

                            <div className="col">
                                <label>{t('ticketAddForm.docTransfer')}</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    name="dateTransferDoc"
                                    {
                                        ...register("dateTransferDoc", {
                                        })
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
                                <label>{t('ticketAddForm.job')}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="job"
                                    placeholder={t('ticketAddForm.enterJob')}
                                    {...register("job", {
                                        pattern: {
                                            value: /^[a-zA-ZА-Яа-я0-9,.:;!?\s-"]{0,255}$/,
                                            message: "ticketAddForm.PatternJob"
                                        },
                                        minLength: {
                                            value: 0,
                                            message: "ticketAddForm.MinLengthJob"
                                        },
                                        maxLength: {
                                            value: 255,
                                            message: "ticketAddForm.MaxLengthJob"
                                        }
                                    })}
                                />
                                <Form.Text className="text-muted">
                                    {errors?.job &&
                                    <p>{t(errors?.job?.message) || "Error!"}</p>}
                                </Form.Text>
                            </div>

                            <div className="col">
                                <label>{t('ticketAddForm.other')}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="other"
                                    placeholder={t('ticketAddForm.enterOther')}
                                    {...register("other", {
                                        pattern: {
                                            value: /^[a-zA-ZА-Яа-я0-9,.:;!?\s-"]{0,255}$/,
                                            message: "ticketAddForm.PatternOther"
                                        },
                                        minLength: {
                                            value: 0,
                                            message: "ticketAddForm.MinLengthOther"
                                        },
                                        maxLength: {
                                            value: 255,
                                            message: "ticketAddForm.MaxLengthOther"
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
                    <button className="btn btn-primary"
                            disabled={!isValid}
                            onClick={handleSubmit(addItem)}>
                        {t('ticketAddForm.addButton')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TicketAddForm;