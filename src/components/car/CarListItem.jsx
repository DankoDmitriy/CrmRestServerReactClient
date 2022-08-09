import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import MyModal from "../MyModalWindow/MyModal";
import CarEditForm from "./CarEditForm";
import {chekAccess} from "../../util/chekAccess";
import {ROLE_ADMIN, ROLE_MANAGER} from "../../constants";
import {useTranslation} from "react-i18next";
import "../../i18n";

const CarListItem = (props) => {
    const [editItemWindowVisibleFlag, setEditItemWindowVisibleFlag] = useState(false);
    const {t} = useTranslation();
    return (
        <tr>
            <th scope="row">{props.index}</th>
            <td>{props.item.number}</td>
            <td>{props.item.city.name}</td>
            <td>{props.item.other}</td>
            <td>{props.item.status}</td>
            {((chekAccess(ROLE_ADMIN) || chekAccess(ROLE_MANAGER))) &&
            <td>
                <Button onClick={() => setEditItemWindowVisibleFlag(true)}>{t('carListItem.editCarButton')}</Button>
                <MyModal visible={editItemWindowVisibleFlag}
                         setVisible={setEditItemWindowVisibleFlag}>
                    <CarEditForm item={props.item}
                                 updateItemsListAfterAction={props.updateItemsListAfterAction}
                                 setEditItemWindowVisibleFlag={setEditItemWindowVisibleFlag}
                    />
                </MyModal>
            </td>
            }
        </tr>
    );
};

export default CarListItem;