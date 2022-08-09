import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import MyModal from "../MyModalWindow/MyModal";
import PositionEditForm from "./PositionEditForm";
import {chekAccess} from "../../util/chekAccess";
import {ROLE_ADMIN, ROLE_MANAGER} from "../../constants";
import {useTranslation} from "react-i18next";
import "../../i18n";

const PositionListItem = (props) => {
    const {t} = useTranslation();
    const [editItemWindowVisibleFlag, setEditItemWindowVisibleFlag] = useState(false);
    return (
        <tr>
            <th scope="row">{props.index}</th>
            <td>{props.item.name}</td>
            <td>{props.item.department.name}</td>
            <td>{props.item.subordinationLevel}</td>
            <td>{props.item.description}</td>
            <td>{props.item.status}</td>
            {
                (chekAccess(ROLE_ADMIN) || chekAccess(ROLE_MANAGER)) &&
                <td>
                    <Button onClick={() => setEditItemWindowVisibleFlag(true)}>{t('positionListItem.editPositionButton')}</Button>
                    <MyModal visible={editItemWindowVisibleFlag}
                             setVisible={setEditItemWindowVisibleFlag}>
                        <PositionEditForm item={props.item}
                                          updateItemsListAfterAction={props.updateItemsListAfterAction}
                                          setEditItemWindowVisibleFlag={setEditItemWindowVisibleFlag}
                        />
                    </MyModal>
                </td>
            }
        </tr>
    );
};

export default PositionListItem;