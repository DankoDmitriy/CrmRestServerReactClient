import React, {useEffect, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import CityService from "../../API/CityService";
import CarService from "../../API/CarService";
import "../../i18n"
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";

const CarEditForm = (props) => {
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
            number: props.item.number,
            other: props.item.other,
            status: props.item.status,
            city: {id: props.item.city.id}
        }
    });

    const [cities, setCities] = useState([]);
    useEffect(() => {
        fetchItem();
    }, [])

    async function fetchItem() {
        const response = await CityService.getAll(0, 1500);
        setCities(response.data.content);
    }

    const [activeItem, setActiveItem] = useState(props.item.status === 'ACTIVE');

    async function editItem(data) {
        if (activeItem) {
            data.status = 'ACTIVE';
        } else {
            data.status = 'NOT_ACTIVE';
        }
        await CarService.update(data.id, data);
        props.updateItemsListAfterAction();
        props.setEditItemWindowVisibleFlag(false);
    }

    const checkBoxAction = () => {
        setActiveItem(!activeItem);
    }

    return (
        <div>
            <center>{t('carEditForm.title')}</center>
            <Form onSubmit={handleSubmit(editItem())}>
                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('carEditForm.enterNumber')}
                    </Form.Text>

                    <Form.Control
                        id="number"
                        type="text"
                        placeholder={t('carEditForm.enterNumber')}
                        {...register("number", {
                            required: "carEditForm.required",
                            pattern: {
                                value: /^[a-zA-Z0-9\s-]{9,45}$/,
                                message: "carEditForm.PatternNumber"
                            },
                            minLength: {
                                value: 9,
                                message: "carEditForm.MinLength9"
                            },
                            maxLength: {
                                value: 45,
                                message: "carEditForm.MaxLength45"
                            }
                        })}
                    />
                    <Form.Text className="text-muted">
                        {errors?.number && <p>{t(errors?.number?.message) || "Error!"}</p>}
                    </Form.Text>

                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('carEditForm.enterDescription')}
                    </Form.Text>
                    <Form.Control
                        id="other"
                        type="text"
                        placeholder={t('carEditForm.enterDescription')}
                        {...register("other", {
                            pattern: {
                                value: /^[a-zA-ZА-Яа-я0-9,.:;!?\s-]{0,255}$/,
                                message: "carEditForm.PatternOther"
                            },
                            minLength: {
                                value: 0,
                                message: "carEditForm.MinLength0"
                            },
                            maxLength: {
                                value: 255,
                                message: "carEditForm.MaxLength255"
                            }
                        })}
                    />
                    <Form.Text className="text-muted">
                        {errors?.other && <p>{t(errors?.other?.message) || "Error!"}</p>}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Text className="text-muted">
                        {t('carEditForm.selectCity')}
                    </Form.Text>

                    <Form.Select
                        name="city.id"
                        {...register("city.id", {
                            required: "carEditForm.required"
                        })
                        }
                    >
                        {cities.map((city, index) =>
                            <option key={index}
                                    selected={(city.id === props.item.city.id) && props.item.city.id}
                                    value={city.id}>{city.name}
                            </option>
                        )}
                    </Form.Select>

                    <Form.Text className="text-muted">
                        {errors?.cityId && <p>{t(errors?.cityId?.message) || "Error!"}</p>}
                    </Form.Text>

                    <Form.Check
                        type="checkbox"
                        label="Activate"
                        id="status"
                        placeholder={t('carEditForm.enterNumber')}
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
                        {t('carEditForm.editButton')}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default CarEditForm;