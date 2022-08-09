import React, {useEffect, useState} from 'react';
import CityService from "../../API/CityService";
import LtdService from "../../API/LtdService";
import EmployeeService from "../../API/EmployeeService";
import {Form} from "react-bootstrap";
import LtdInstanceService from "../../API/LtdInstanceService";
import "../../i18n"
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";

const LtdInstanceEditForm = (props) => {
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
            type: props.item.type,
            distanceMainOffice: props.item.distanceMainOffice,
            distanceLocalOffice: props.item.distanceLocalOffice,
            telecomCabinet: props.item.telecomCabinet,
            ups: props.item.ups,
            server: props.item.server,
            switchs: props.item.switchs,
            workplace: props.item.workplace,
            equipment: props.item.equipment,
            address: props.item.address,
            ltd: {id: props.item.ltd.id},
            employee: {id: props.item.employee.id},
            city: {id: props.item.city.id}
        }
    });

    const [cities, setCities] = useState([]);
    const [ltds, setLtds] = useState([]);
    const [employees, setEmployees] = useState([]);

    //Loading data for dynamic form and forming
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
        await LtdInstanceService.update(data.id, data);
        props.updateItemsListAfterAction();
        props.setEditItemWindowVisibleFlag(false);
    }


    return (
        <form onSubmit={handleSubmit(editItem)}>

            <div className="form-group">
                <div className="row">
                    <div className="col">
                        <label>{t('ltdInstanceEditForm.ltd')}</label>
                        <select
                            disabled="true"
                            className="form-control"
                            name="ltd.id"
                            {
                                ...register("ltd.id", {
                                    required: "ltdInstanceAddForm.required"
                                })
                            }
                        >
                            {ltds.map((ltd, index) =>
                                <option key={index}
                                        selected={(ltd.id === props.item.ltd.id) && props.item.ltd.id}
                                        value={ltd.id}>{ltd.nameShort}</option>
                            )}
                        </select>
                        <Form.Text className="text-muted">
                            {errors?.ltdId && <p>{t(errors?.ltdId?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                    <div className="col">
                        <label>{t('ltdInstanceEditForm.city')}</label>
                        <select
                            className="form-control"
                            disabled="true"
                            name="city.id"
                            {
                                ...register("city.id", {
                                    required: "ltdInstanceEditForm.required"
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
                            {errors?.cityId && <p>{t(errors?.cityId?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                    <div className="col">
                        <label>{t('ltdInstanceEditForm.employee')}</label>
                        <select
                            className="form-control"
                            name="employee.id"
                            {
                                ...register("employee.id", {
                                    required: "ltdInstanceEditForm.required"
                                })
                            }
                        >
                            {employees.map((employee, index) =>
                                <option key={index}
                                        selected={(employee.id === props.item.employee.id) && props.item.employee.id}
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
                        <label>{t('ltdInstanceEditForm.address')}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            placeholder={t('ltdInstanceEditForm.enterAddress')}
                            {...register("address", {
                                required: "ltdInstanceEditForm.required",
                                pattern: {
                                    value: /^[a-zA-ZА-Яа-я0-9,.:;!?\s-"]{1,255}$/,
                                    message: "ltdInstanceEditForm.PatternAddress"
                                },
                                minLength: {
                                    value: 1,
                                    message: "ltdInstanceEditForm.MinLengthAddress"
                                },
                                maxLength: {
                                    value: 255,
                                    message: "ltdInstanceEditForm.MaxLengthAddress"
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
                <center>{t('ltdInstanceEditForm.technicalInformation')}</center>
                <br/>
                <div className="row">
                    <div className="col">
                        <label>{t('ltdInstanceEditForm.tCabinet')}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="telecomCabinet"
                            placeholder={t('ltdInstanceEditForm.enterTCabinets')}
                            {...register("telecomCabinet", {
                                required: "ltdInstanceEditForm.required",
                                min: {
                                    value: 0,
                                    message: "ltdInstanceEditForm.minTCabinet"
                                },
                                max: {
                                    value: 100,
                                    message: "ltdInstanceEditForm.maxTCabinet"
                                }
                            })}
                        />
                        <Form.Text className="text-muted">
                            {errors?.telecomCabinet && <p>{t(errors?.telecomCabinet?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                    <div className="col">
                        <label>{t('ltdInstanceEditForm.servers')}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="server"
                            placeholder={t('ltdInstanceEditForm.enterServers')}
                            {...register("server", {
                                required: "ltdInstanceEditForm.required",
                                min: {
                                    value: 0,
                                    message: "ltdInstanceEditForm.minServers"
                                },
                                max: {
                                    value: 100,
                                    message: "ltdInstanceEditForm.maxServers"
                                }
                            })}
                        />
                        <Form.Text className="text-muted">
                            {errors?.server && <p>{t(errors?.server?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                    <div className="col">
                        <label>{t('ltdInstanceEditForm.ups')}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="ups"
                            placeholder={t('ltdInstanceEditForm.enterUps')}
                            {...register("ups", {
                                required: "ltdInstanceEditForm.required",
                                min: {
                                    value: 0,
                                    message: "ltdInstanceEditForm.minUps"
                                },
                                max: {
                                    value: 100,
                                    message: "ltdInstanceEditForm.maxUps"
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
                        <label>{t('ltdInstanceEditForm.switchs')}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="switchs"
                            placeholder={t('ltdInstanceEditForm.enterSwitchs')}
                            {...register("switchs", {
                                required: "ltdInstanceEditForm.required",
                                min: {
                                    value: 0,
                                    message: "ltdInstanceEditForm.maxSwitchs"
                                },
                                max: {
                                    value: 100,
                                    message: "ltdInstanceEditForm.maxSwitchs"
                                }
                            })}
                        />
                        <Form.Text className="text-muted">
                            {errors?.switchs && <p>{t(errors?.switchs?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                    <div className="col">
                        <label>{t('ltdInstanceEditForm.workplace')}</label>
                        <input
                            type="text"
                            className="form-control"
                            name="workplace"
                            placeholder={t('ltdInstanceEditForm.enterWorkplace')}
                            {...register("workplace", {
                                required: "ltdInstanceEditForm.required",
                                min: {
                                    value: 0,
                                    message: "ltdInstanceEditForm.minWorkplace"
                                },
                                max: {
                                    value: 100,
                                    message: "ltdInstanceEditForm.maxWorkplace"
                                }
                            })}
                        />
                        <Form.Text className="text-muted">
                            {errors?.workplace && <p>{t(errors?.workplace?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                    <div className="col">
                        <label>{t('ltdInstanceEditForm.equipment')}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="equipment"
                            placeholder={t('ltdInstanceEditForm.enterEquipment')}
                            {...register("equipment", {
                                required: "ltdInstanceEditForm.required",
                                min: {
                                    value: 0,
                                    message: "ltdInstanceEditForm.minEquipment"
                                },
                                max: {
                                    value: 100,
                                    message: "ltdInstanceEditForm.maxEquipment"
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
                <center>{t('ltdInstanceEditForm.distanceInformation')}</center>
                <br/>
                <div className="row">
                    <div className="col">
                        <label>{t('ltdInstanceEditForm.distanceMain')}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="distanceMainOffice"
                            placeholder={t('ltdInstanceEditForm.enterDistanceMain')}
                            {...register("distanceMainOffice", {
                                required: "ltdInstanceEditForm.required",
                                min: {
                                    value: 0,
                                    message: "ltdInstanceEditForm.minDistanceMain"
                                },
                                max: {
                                    value: 5000,
                                    message: "ltdInstanceEditForm.maxDistanceMain"
                                }
                            })}
                        />
                        <Form.Text className="text-muted">
                            {errors?.distanceMainOffice && <p>{t(errors?.distanceMainOffice?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                    <div className="col">
                        <label>{t('ltdInstanceEditForm.distanceLocal')}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="distanceLocalOffice"
                            placeholder={t('ltdInstanceEditForm.enterDistanceLocal')}
                            {...register("distanceLocalOffice", {
                                required: "ltdInstanceEditForm.required",
                                min: {
                                    value: 0,
                                    message: "ltdInstanceEditForm.minDistanceLocal"
                                },
                                max: {
                                    value: 5000,
                                    message: "ltdInstanceEditForm.maxDistanceLocal"
                                }
                            })}
                        />
                        <Form.Text className="text-muted">
                            {errors?.distanceLocalOffice &&
                            <p>{t(errors?.distanceLocalOffice?.message) || "Error!"}</p>}
                        </Form.Text>
                    </div>
                    <div className="col">
                        <label>{t('ltdInstanceEditForm.activeStatus')}</label>
                        <Form.Check
                            type="checkbox"
                            label="Activate"
                            id="status"
                            {...register("status")}
                            checked={activeItem}
                            onChange={checkBoxAction}
                        />
                    </div>
                </div>
            </div>

            <div className="form-group">
                <button className="btn btn-primary"
                        disabled={!isValid}
                        onClick={handleSubmit(editItem)}>
                    {t('ltdInstanceEditForm.editButton')}
                </button>
            </div>
        </form>
    );


    // const [cities, setCities] = useState([]);
    // const [ltds, setLtds] = useState([]);
    // const [employees, setEmployees] = useState([]);
    // const [activeItem, setActiveItem] = useState(props.item.status === 'ACTIVE');
    //
    // //Loading data for dynamic form and forming
    // useEffect(() => {
    //     fetchItem();
    // }, [])
    //
    // async function fetchItem() {
    //     const responseCities = await CityService.getAll(0, 1500);
    //     setCities(responseCities.data.content);
    //
    //     const responseLtds = await LtdService.getAll(0, 1500);
    //     setLtds(responseLtds.data.content);
    //
    //     const responseEmployee = await EmployeeService.getAllByStatus(0, 1500);
    //     setEmployees(responseEmployee.data.content);
    // }
    //
    // useEffect(() => {
    //     changeActiveStatusEditingItem();
    // }, [activeItem])
    //
    // async function changeActiveStatusEditingItem() {
    //     if (activeItem) {
    //         item.status = 'ACTIVE';
    //     } else {
    //         item.status = 'NOT_ACTIVE';
    //     }
    // }
    //
    // async function editItem(e) {
    //     e.preventDefault();
    //     if (
    //         item.distanceMainOffice > 0 &&
    //         item.distanceLocalOffice > 0 &&
    //         item.telecomCabinet >= 0 &&
    //         item.ups >= 0 &&
    //         item.server >= 0 &&
    //         item.switchs >= 0 &&
    //         item.workplace >= 0 &&
    //         item.equipment >= 0 &&
    //         item.address.length > 0 &&
    //         item.ltd.id > 0 &&
    //         item.employee.id > 0 &&
    //         item.city.id > 0 &&
    //         (
    //             props.item.distanceMainOffice !== item.distanceMainOffice ||
    //             props.item.distanceLocalOffice !== item.distanceLocalOffice ||
    //             props.item.telecomCabinet !== item.telecomCabinet ||
    //             props.item.ups !== item.ups ||
    //             props.item.server !== item.server ||
    //             props.item.switchs !== item.switchs ||
    //             props.item.workplace !== item.workplace ||
    //             props.item.equipment !== item.equipment ||
    //             props.item.address !== item.address ||
    //             props.item.city.id !== item.city.id ||
    //             props.item.employee.id !== item.employee.id ||
    //             props.item.ltd.id !== item.ltd.id ||
    //             props.item.status.toString() !== item.status.toString()
    //         )
    //     ) {
    //         console.log(item);
    //         await LtdInstanceService.update(item.id, item);
    //         props.updateItemsListAfterAction();
    //         props.setEditItemWindowVisibleFlag(false);
    //     }
    // }
    //
    // const checkBoxAction = () => {
    //     setActiveItem(!activeItem);
    // }


    // return (
    //     <form method="post">
    //
    //         <div className="form-group">
    //             <div className="row">
    //                 <div className="col">
    //                     <label>{ltdDefaultText}</label>
    //                     <select
    //                         className="form-control"
    //                         id="ltdId"
    //                         name="ltdId"
    //                         value={item.ltd.id}
    //                         onChange={event => setItem({...item, ltd: {id: event.target.value}})}
    //                     >
    //                         <option defaultValue="-1" selected="selected"
    //                                 hidden="hidden">{selectOptionLtdDefaultText}</option>
    //                         {ltds.map((ltd, index) =>
    //                             <option key={index} value={ltd.id}>{ltd.nameShort}</option>
    //                         )}
    //                     </select>
    //                 </div>
    //
    //                 <div className="col">
    //                     <label>{cityDefaultText}</label>
    //                     <select
    //                         className="form-control"
    //                         id="cityId"
    //                         name="cityId"
    //                         value={item.city.id}
    //                         onChange={event => setItem({...item, city: {id: event.target.value}})}
    //                     >
    //                         <option defaultValue="-1" selected="selected"
    //                                 hidden="hidden">{selectOptionCityDefaultText}</option>
    //                         {cities.map((city, index) =>
    //                             <option key={index} value={city.id}>{city.name}</option>
    //                         )}
    //                     </select>
    //                 </div>
    //
    //
    //                 <div className="col">
    //                     <label>{employeeDefaultText}</label>
    //                     <select
    //                         className="form-control"
    //                         id="employeeId"
    //                         name="employeeId"
    //                         value={item.employee.id}
    //                         onChange={event => setItem({...item, employee: {id: event.target.value}})}
    //                     >
    //                         <option defaultValue="-1" selected="selected"
    //                                 hidden="hidden">{selectOptionEmployeeDefaultText}</option>
    //                         {employees.map((employee, index) =>
    //                             <option key={index}
    //                                     value={employee.id}>{employee.firstName} {employee.lastName}</option>
    //                         )}
    //                     </select>
    //                 </div>
    //             </div>
    //         </div>
    //         <div className="form-group">
    //             <div className="row">
    //                 <div className="col">
    //                     <label>{addressDefaultText}</label>
    //                     <input
    //                         type="text"
    //                         className="form-control"
    //                         name="address"
    //                         placeholder="Address"
    //                         value={item.address}
    //                         onChange={event => setItem({...item, address: event.target.value})}
    //                     />
    //                 </div>
    //             </div>
    //         </div>
    //         <div className="form-group">
    //             <center>Technical Information</center>
    //             <br/>
    //             <div className="row">
    //                 <div className="col">
    //                     <label>T-Cabinet</label>
    //                     <input
    //                         type="text"
    //                         className="form-control"
    //                         name="telecomCabinet"
    //                         placeholder="telecomCabinet"
    //
    //                         value={item.telecomCabinet}
    //                         onChange={event => setItem({...item, telecomCabinet: event.target.value})}
    //                     />
    //                 </div>
    //                 <div className="col">
    //                     <label>Servers</label>
    //                     <input
    //                         type="text"
    //                         className="form-control"
    //                         name="server"
    //                         placeholder="server"
    //
    //                         value={item.server}
    //                         onChange={event => setItem({...item, server: event.target.value})}
    //                     />
    //                 </div>
    //                 <div className="col">
    //                     <label>Ups</label>
    //                     <input
    //                         type="text"
    //                         className="form-control"
    //                         name="ups"
    //                         placeholder="ups"
    //
    //                         value={item.ups}
    //                         onChange={event => setItem({...item, ups: event.target.value})}
    //                     />
    //                 </div>
    //             </div>
    //             <div className="row">
    //                 <div className="col">
    //                     <label>Switchs</label>
    //                     <input
    //                         type="text"
    //                         className="form-control"
    //                         name="switchs"
    //                         placeholder="switchs"
    //
    //                         value={item.switchs}
    //                         onChange={event => setItem({...item, switchs: event.target.value})}
    //                     />
    //                 </div>
    //                 <div className="col">
    //                     <label>Workplace</label>
    //                     <input
    //                         type="text"
    //                         className="form-control"
    //                         name="workplace"
    //                         placeholder="workplace"
    //
    //                         value={item.workplace}
    //                         onChange={event => setItem({...item, workplace: event.target.value})}
    //                     />
    //                 </div>
    //                 <div className="col">
    //                     <label>Equipment</label>
    //                     <input
    //                         type="text"
    //                         className="form-control"
    //                         name="equipment"
    //                         placeholder="equipment"
    //
    //                         value={item.equipment}
    //                         onChange={event => setItem({...item, equipment: event.target.value})}
    //                     />
    //                 </div>
    //             </div>
    //         </div>
    //
    //         <div className="form-group">
    //             <center>Distance information</center>
    //             <br/>
    //             <div className="row">
    //                 <div className="col">
    //                     <label>Distance main office</label>
    //                     <input
    //                         type="text"
    //                         className="form-control"
    //                         name="distanceMainOffice"
    //                         placeholder="distanceMainOffice"
    //
    //                         value={item.distanceMainOffice}
    //                         onChange={event => setItem({...item, distanceMainOffice: event.target.value})}
    //                     />
    //                 </div>
    //                 <div className="col">
    //                     <label>Distance local office</label>
    //                     <input
    //                         type="text"
    //                         className="form-control"
    //                         name="distanceLocalOffice"
    //                         placeholder="distanceLocalOffice"
    //
    //                         value={item.distanceLocalOffice}
    //                         onChange={event => setItem({...item, distanceLocalOffice: event.target.value})}
    //                     />
    //                 </div>
    //                 <div className="col">
    //                     <label>Active Status:</label>
    //                     <Form.Check
    //                         type="checkbox"
    //                         label="Activate"
    //                         checked={activeItem}
    //                         onChange={checkBoxAction}
    //                     />
    //                 </div>
    //             </div>
    //         </div>
    //
    //         <div className="form-group">
    //             <button className="btn btn-primary"
    //                     variant="primary"
    //                     onClick={editItem}>
    //                 {editInstanceButtonText}
    //             </button>
    //         </div>
    //     </form>
    // );
};

export default LtdInstanceEditForm;