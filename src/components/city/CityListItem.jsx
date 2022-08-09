import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import MyModal from "../MyModalWindow/MyModal";
import EditCityForm from "./EditCityForm";
import {chekAccess} from "../../util/chekAccess";
import {ROLE_ADMIN, ROLE_MANAGER} from "../../constants";
import {useTranslation} from "react-i18next";
import "../../i18n";

const CityListItem = (props) => {
    const [editCityWindowVisibleFlag, setEditCityWindowVisibleFlag] = useState(false);
    const {t} = useTranslation();
    return (
        <tr>
            <th scope="row">{props.index}</th>
            <td>{props.city.name}</td>
            <td>{props.city.status}</td>
            {((chekAccess(ROLE_ADMIN) || chekAccess(ROLE_MANAGER))) &&
            <td>
                <Button onClick={() => setEditCityWindowVisibleFlag(true)}>{t('cityListItem.editCityButton')}</Button>
                <MyModal visible={editCityWindowVisibleFlag}
                         setVisible={setEditCityWindowVisibleFlag}>
                    <EditCityForm city={props.city}
                                  updateCityList={props.updateCityList}
                                  setEditCityWindowVisibleFlag={setEditCityWindowVisibleFlag}
                    />
                </MyModal>
            </td>
            }
        </tr>
    );
};

export default CityListItem;