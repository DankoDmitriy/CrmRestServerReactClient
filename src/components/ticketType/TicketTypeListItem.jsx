import React, {useState} from 'react';
import TicketTypeEditForm from "./TicketTypeEditForm";
import {Button} from "react-bootstrap";
import MyModal from "../MyModalWindow/MyModal";
import "../../i18n";
import {chekAccess} from "../../util/chekAccess";
import {ROLE_ADMIN, ROLE_MANAGER} from "../../constants";
import {useTranslation} from "react-i18next";
import "../../i18n";

const TicketTypeListItem = (props) => {
    const [editItemWindowVisibleFlag, setEditItemWindowVisibleFlag] = useState(false);
    const {t} = useTranslation();
    return (
        <tr>
            <th scope="row">{props.index}</th>
            <td>{props.item.name}</td>
            <td>{props.item.action}</td>
            <td>{props.item.priority}</td>
            <td>{props.item.status}</td>
            {
                (chekAccess(ROLE_ADMIN) || chekAccess(ROLE_MANAGER)) &&
                <td>
                    <Button onClick={() => setEditItemWindowVisibleFlag(true)}>{t('ticketTypeItem.editTicketTypeButton')}</Button>
                    <MyModal visible={editItemWindowVisibleFlag}
                             setVisible={setEditItemWindowVisibleFlag}>
                        <TicketTypeEditForm item={props.item}
                                            updateItemsListAfterAction={props.updateItemsListAfterAction}
                                            setEditItemWindowVisibleFlag={setEditItemWindowVisibleFlag}
                        />
                    </MyModal>
                </td>
            }
        </tr>
    );
};

export default TicketTypeListItem;