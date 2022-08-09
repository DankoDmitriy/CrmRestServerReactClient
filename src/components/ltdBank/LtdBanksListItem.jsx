import React, {useState} from 'react';
import LtdBankEditForm from "./LtdBankEditForm";
import MyModal from "../MyModalWindow/MyModal";
import {Button} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import "../../i18n";
import {chekAccess} from "../../util/chekAccess";
import {ROLE_ADMIN, ROLE_MANAGER} from "../../constants";

const LtdBanksListItem = (props) => {
    const {t} = useTranslation();
    const [editItemBankWindowVisibleFlag, setEditItemBankWindowVisibleFlag] = useState(false);

    return (
        <tbody>
        <tr>
            <th scope="row">{props.index}</th>
            <td>{props.item.requisites}</td>
            <td>{props.item.status}</td>
            {
                ((chekAccess(ROLE_ADMIN) || chekAccess(ROLE_MANAGER))) &&
                <td>
                    <Button onClick={() => setEditItemBankWindowVisibleFlag(true)}>{t('ltdBanksListItem.editBankButton')}</Button>
                    <MyModal visible={editItemBankWindowVisibleFlag}
                             setVisible={setEditItemBankWindowVisibleFlag}>
                        <LtdBankEditForm
                            item={props.item}
                            ltdId={props.ltdId}
                            updatePageAfterAction={props.updatePageAfterAction}
                            setEditItemBankWindowVisibleFlag={setEditItemBankWindowVisibleFlag}
                        />
                    </MyModal>
                </td>
            }
        </tr>
        </tbody>
    );
};

export default LtdBanksListItem;