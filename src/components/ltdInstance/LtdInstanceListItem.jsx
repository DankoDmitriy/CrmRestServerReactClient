import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import MyModal from "../MyModalWindow/MyModal";
import LtdInstanceEditForm from "./LtdInstanceEditForm";
import {Link} from "react-router-dom";
import {chekAccess} from "../../util/chekAccess";
import {ROLE_ADMIN, ROLE_MANAGER} from "../../constants";
import {useTranslation} from "react-i18next";
import "../../i18n";

const LtdInstanceListItem = (props) => {
    const [editItemWindowVisibleFlag, setEditItemWindowVisibleFlag] = useState(false);
    const {t} = useTranslation();
    return (
        <tr>
            <th scope="row">{props.index}</th>
            <td>

                <Link style={{color: 'black'}} to={"/ltd/information/full/" + props.item.ltd.id}>
                    {props.item.ltd.nameShort}
                </Link>
            </td>
            <td>{props.item.city.name}</td>
            <td>{props.item.address}</td>
            <td>{props.item.telecomCabinet}</td>
            <td>{props.item.server}</td>
            <td>{props.item.ups}</td>
            <td>{props.item.switchs}</td>
            <td>{props.item.workplace}</td>
            <td>{props.item.equipment}</td>
            <td>{props.item.employee.lastName}<br/>{props.item.employee.firstName}</td>
            <td>{props.item.distanceMainOffice}</td>
            <td>{props.item.distanceLocalOffice}</td>
            <td>{props.item.status}</td>
            {((chekAccess(ROLE_ADMIN) || chekAccess(ROLE_MANAGER))) &&
            <td>
                <Button
                    onClick={() => setEditItemWindowVisibleFlag(true)}>{t('ltdInstanceListItem.editInstanceButton')}</Button>
                <MyModal visible={editItemWindowVisibleFlag}
                         setVisible={setEditItemWindowVisibleFlag}>
                    <LtdInstanceEditForm item={props.item}
                                         updateItemsListAfterAction={props.updateItemsListAfterAction}
                                         setEditItemWindowVisibleFlag={setEditItemWindowVisibleFlag}
                    />
                </MyModal>
            </td>
            }
        </tr>
    );
};

export default LtdInstanceListItem;