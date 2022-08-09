import React, {useEffect, useState} from 'react';
import CityService from "../../API/CityService";
import EmployeeService from "../../API/EmployeeService";
import LtdService from "../../API/LtdService";
import LtdInstanceService from "../../API/LtdInstanceService";
import "../../i18n"
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {Form} from "react-bootstrap";

const LtdInstanceAddForm = (props) => {
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

    const [cities, setCities] = useState([]);
    const [ltds, setLtds] = useState([]);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchItem();
    }, [])

    async function fetchItem() {
        const responseCities = await CityService.getAll(0, 1500);
        setCities(responseCities.data.content);

        const responseLtds = await LtdService.getAll(0, 1500);
        setLtds(responseLtds.data.content);

        const responseEmployee = await EmployeeService.getAllByStatus(0, 1500);
        setEmployees(responseEmployee.data.content);
    }

    async function addItem(data) {
        // console.log(data);
        await LtdInstanceService.add(data);
        props.updateItemsListAfterAction();
        reset();
    }

    return (
        <form onSubmit={handleSubmit(addItem)}>

            <div className="form-group">
                <div className="row">
                    <div className="col">
                        <label>{t('ltdInstanceAddForm.ltd')}</label>
                        <select
                            className="form-control"
                            name="ltd.id"
                            {
                                ...register("ltd.id", {
                                    required: "ltdInstanceAddForm.required"
                                })
                            }
                        >
                            <option value="">{t('ltdInstanceAddForm.selectLtd')}</option>
                            {ltds.map((ltd, index) =>
                                <option key={index} value={ltd.id}>{ltd.nameShort}</option>
                            )}
                        </select>
                        <Form.Text className="text-muted">
                            {errors?.ltdId && <p>{t(errors?.ltdId?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                    <div className="col">
                        <label>{t('ltdInstanceAddForm.city')}</label>
                        <select
                            className="form-control"
                            name="city.id"
                            {
                                ...register("city.id", {
                                    required: "ltdInstanceAddForm.required"
                                })
                            }
                        >
                            <option value="">{t('ltdInstanceAddForm.selectCity')}</option>
                            {cities.map((city, index) =>
                                <option key={index} value={city.id}>{city.name}</option>
                            )}
                        </select>
                        <Form.Text className="text-muted">
                            {errors?.cityId && <p>{t(errors?.cityId?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                    <div className="col">
                        <label>{t('ltdInstanceAddForm.employee')}</label>
                        <select
                            className="form-control"
                            name="employee.id"
                            {
                                ...register("employee.id", {
                                    required: "ltdInstanceAddForm.required"
                                })
                            }
                        >
                            <option value="">{t('ltdInstanceAddForm.selectEmployee')}</option>
                            {employees.map((employee, index) =>
                                <option key={index}
                                        value={employee.id}>{employee.firstName} {employee.lastName}</option>
                            )}
                        </select>
                        <Form.Text className="text-muted">
                            {errors?.employeeId && <p>{t(errors?.employeeId?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col">
                        <label>{t('ltdInstanceAddForm.address')}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            placeholder={t('ltdInstanceAddForm.enterAddress')}
                            {...register("address", {
                                required: "ltdInstanceAddForm.required",
                                pattern: {
                                    value: /^[a-zA-ZА-Яа-я0-9,.:;!?\s-"]{1,255}$/,
                                    message: "ltdInstanceAddForm.PatternAddress"
                                },
                                minLength: {
                                    value: 1,
                                    message: "ltdInstanceAddForm.MinLengthAddress"
                                },
                                maxLength: {
                                    value: 255,
                                    message: "ltdInstanceAddForm.MaxLengthAddress"
                                }
                            })}
                        />
                        <Form.Text className="text-muted">
                            {errors?.address && <p>{t(errors?.address?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <center>{t('ltdInstanceAddForm.technicalInformation')}</center>
                <br/>
                <div className="row">
                    <div className="col">
                        <label>{t('ltdInstanceAddForm.tCabinet')}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="telecomCabinet"
                            placeholder={t('ltdInstanceAddForm.enterTCabinets')}
                            {...register("telecomCabinet", {
                                required: "ltdInstanceAddForm.required",
                                min: {
                                    value: 0,
                                    message: "ltdInstanceAddForm.minTCabinet"
                                },
                                max: {
                                    value: 100,
                                    message: "ltdInstanceAddForm.maxTCabinet"
                                }
                            })}
                        />
                        <Form.Text className="text-muted">
                            {errors?.telecomCabinet && <p>{t(errors?.telecomCabinet?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                    <div className="col">
                        <label>{t('ltdInstanceAddForm.servers')}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="server"
                            placeholder={t('ltdInstanceAddForm.enterServers')}
                            {...register("server", {
                                required: "ltdInstanceAddForm.required",
                                min: {
                                    value: 0,
                                    message: "ltdInstanceAddForm.minServers"
                                },
                                max: {
                                    value: 100,
                                    message: "ltdInstanceAddForm.maxServers"
                                }
                            })}
                        />
                        <Form.Text className="text-muted">
                            {errors?.server && <p>{t(errors?.server?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                    <div className="col">
                        <label>{t('ltdInstanceAddForm.ups')}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="ups"
                            placeholder={t('ltdInstanceAddForm.enterUps')}
                            {...register("ups", {
                                required: "ltdInstanceAddForm.required",
                                min: {
                                    value: 0,
                                    message: "ltdInstanceAddForm.minUps"
                                },
                                max: {
                                    value: 100,
                                    message: "ltdInstanceAddForm.maxUps"
                                }
                            })}
                        />
                        <Form.Text className="text-muted">
                            {errors?.ups && <p>{t(errors?.ups?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label>{t('ltdInstanceAddForm.switchs')}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="switchs"
                            placeholder={t('ltdInstanceAddForm.enterSwitchs')}
                            {...register("switchs", {
                                required: "ltdInstanceAddForm.required",
                                min: {
                                    value: 0,
                                    message: "ltdInstanceAddForm.maxSwitchs"
                                },
                                max: {
                                    value: 100,
                                    message: "ltdInstanceAddForm.maxSwitchs"
                                }
                            })}
                        />
                        <Form.Text className="text-muted">
                            {errors?.switchs && <p>{t(errors?.switchs?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                    <div className="col">
                        <label>{t('ltdInstanceAddForm.workplace')}</label>
                        <input
                            type="text"
                            className="form-control"
                            name="workplace"
                            placeholder={t('ltdInstanceAddForm.enterWorkplace')}
                            {...register("workplace", {
                                required: "ltdInstanceAddForm.required",
                                min: {
                                    value: 0,
                                    message: "ltdInstanceAddForm.minWorkplace"
                                },
                                max: {
                                    value: 100,
                                    message: "ltdInstanceAddForm.maxWorkplace"
                                }
                            })}
                        />
                        <Form.Text className="text-muted">
                            {errors?.workplace && <p>{t(errors?.workplace?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                    <div className="col">
                        <label>{t('ltdInstanceAddForm.equipment')}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="equipment"
                            placeholder={t('ltdInstanceAddForm.enterEquipment')}
                            {...register("equipment", {
                                required: "ltdInstanceAddForm.required",
                                min: {
                                    value: 0,
                                    message: "ltdInstanceAddForm.minEquipment"
                                },
                                max: {
                                    value: 100,
                                    message: "ltdInstanceAddForm.maxEquipment"
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
                <center>{t('ltdInstanceAddForm.distanceInformation')}</center>
                <br/>
                <div className="row">
                    <div className="col">
                        <label>{t('ltdInstanceAddForm.distanceMain')}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="distanceMainOffice"
                            placeholder={t('ltdInstanceAddForm.enterDistanceMain')}
                            {...register("distanceMainOffice", {
                                required: "ltdInstanceAddForm.required",
                                min: {
                                    value: 0,
                                    message: "ltdInstanceAddForm.minDistanceMain"
                                },
                                max: {
                                    value: 5000,
                                    message: "ltdInstanceAddForm.maxDistanceMain"
                                }
                            })}
                        />
                        <Form.Text className="text-muted">
                            {errors?.distanceMainOffice && <p>{t(errors?.distanceMainOffice?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                    <div className="col">
                        <label>{t('ltdInstanceAddForm.distanceLocal')}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="distanceLocalOffice"
                            placeholder={t('ltdInstanceAddForm.enterDistanceLocal')}
                            {...register("distanceLocalOffice", {
                                required: "ltdInstanceAddForm.required",
                                min: {
                                    value: 0,
                                    message: "ltdInstanceAddForm.minDistanceLocal"
                                },
                                max: {
                                    value: 5000,
                                    message: "ltdInstanceAddForm.maxDistanceLocal"
                                }
                            })}
                        />
                        <Form.Text className="text-muted">
                            {errors?.distanceLocalOffice &&
                            <p>{t(errors?.distanceLocalOffice?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                </div>
            </div>

            <div className="form-group">
                <button className="btn btn-primary"
                        disabled={!isValid}
                        onClick={handleSubmit(addItem)}>
                    {t('ltdInstanceAddForm.addButton')}
                </button>
            </div>
        </form>
    );
};

export default LtdInstanceAddForm;