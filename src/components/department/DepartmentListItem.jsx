import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import MyModal from "../MyModalWindow/MyModal";
import DepartmentEditForm from "./DepartmentEditForm";
import {chekAccess} from "../../util/chekAccess";
import {ROLE_ADMIN, ROLE_MANAGER} from "../../constants";
import {useTranslation} from "react-i18next";
import "../../i18n";

const DepartmentListItem = (props) => {
    const [editItemWindowVisibleFlag, setEditItemWindowVisibleFlag] = useState(false);
    const {t} = useTranslation();
    return (
        <tr>
            <th scope="row">{props.index}</th>
            <td>{props.item.name}</td>
            <td>{props.item.status}</td>
            {((chekAccess(ROLE_ADMIN) || chekAccess(ROLE_MANAGER))) &&
            <td>
                <Button onClick={() => setEditItemWindowVisibleFlag(true)}>
                    {t('departmentListItem.editDepartmentButton')}
                </Button>
                <MyModal visible={editItemWindowVisibleFlag}
                         setVisible={setEditItemWindowVisibleFlag}>
                    <DepartmentEditForm item={props.item}
                                        updateItemsListAfterAction={props.updateItemsListAfterAction}
                                        setEditItemWindowVisibleFlag={setEditItemWindowVisibleFlag}
                    />
                </MyModal>
            </td>
            }
        </tr>
    );
};

export default DepartmentListItem;