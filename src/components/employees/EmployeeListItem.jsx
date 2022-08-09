import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import MyModal from "../MyModalWindow/MyModal";
import EmployeeEditForm from "./EmployeeEditForm";
import EmployeeRolesEditForm from "./EmployeeRolesEditForm";
import {chekAccess} from "../../util/chekAccess";
import {ROLE_ADMIN, ROLE_MANAGER} from "../../constants";
import {useTranslation} from "react-i18next";
import "../../i18n";

const EmployeeListItem = (props) => {
    const [editItemWindowVisibleFlag, setEditItemWindowVisibleFlag] = useState(false);
    const [editItemRolesWindowVisibleFlag, setEditItemRolesWindowVisibleFlag] = useState(false);
    const {t} = useTranslation();
    return (
        <tr>
            <th scope="row">{props.index}</th>
            <td>
                {props.item.firstName}<br/>
                {props.item.lastName}<br/>
                {props.item.patronymic}<br/>
            </td>
            <td>{props.item.dov}</td>
            <td>{props.item.department.name}</td>
            <td>{props.item.position.name}</td>
            <td>{props.item.city.name}</td>
            <td>{props.item.status}</td>
            {
                ((chekAccess(ROLE_ADMIN) || chekAccess(ROLE_MANAGER))) &&
                <td>
                    <Button onClick={() => setEditItemWindowVisibleFlag(true)}>
                        {t('employeeListItem.editButton')}
                    </Button>
                    <MyModal visible={editItemWindowVisibleFlag}
                             setVisible={setEditItemWindowVisibleFlag}>
                        <EmployeeEditForm
                            key={props.item.id}
                            item={props.item}
                            updateItemsListAfterAction={props.updateItemsListAfterAction}
                            setEditItemWindowVisibleFlag={setEditItemWindowVisibleFlag}
                        />
                    </MyModal>

                    <Button style={{marginLeft: 10}} onClick={() => setEditItemRolesWindowVisibleFlag(true)}>
                        {t('employeeListItem.rolesButton')}
                    </Button>
                    <MyModal visible={editItemRolesWindowVisibleFlag}
                             setVisible={setEditItemRolesWindowVisibleFlag}>
                        <EmployeeRolesEditForm
                            key={props.item.id}
                            item={props.item}
                            rolesList={props.rolesList}
                            updateItemsListAfterAction={props.updateItemsListAfterAction}
                            setEditItemRolesWindowVisibleFlag={setEditItemRolesWindowVisibleFlag}
                        />
                    </MyModal>
                </td>
            }
        </tr>
    );
};

export default EmployeeListItem;