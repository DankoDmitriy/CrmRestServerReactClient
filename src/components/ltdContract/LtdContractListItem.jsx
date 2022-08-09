import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import MyModal from "../MyModalWindow/MyModal";
import LtdContractEditForm from "./LtdContractEditForm";
import moment from "moment";
import {useTranslation} from "react-i18next";
import "../../i18n";
import {chekAccess} from "../../util/chekAccess";
import {ROLE_ADMIN, ROLE_MANAGER} from "../../constants";

const LtdContractListItem = (props) => {
    const {t} = useTranslation();
    const [editItemContractWindowVisibleFlag, setEditItemContractWindowVisibleFlag] = useState(false);
    function dateFormatConverter(date){
        return moment(date,"YYYY-MM-DD HH:mm").format("DD-MM-YYYY HH:mm");
    }
    return (
        <tbody>
        <tr>
            <th scope="row">{props.index}</th>
            <td>{props.item.number}</td>
            <td>{dateFormatConverter(props.item.contractStart)}</td>
            <td>{props.item.other}</td>
            <td>{props.item.status}</td>
            {
                ((chekAccess(ROLE_ADMIN) || chekAccess(ROLE_MANAGER))) &&
                <td>
                    <Button onClick={() => setEditItemContractWindowVisibleFlag(true)}>{t('ltdContractListItem.editContractButton')}</Button>
                    <MyModal visible={editItemContractWindowVisibleFlag}
                             setVisible={setEditItemContractWindowVisibleFlag}>
                        <LtdContractEditForm
                            item={props.item}
                            ltdId={props.ltdId}
                            updatePageAfterAction={props.updatePageAfterAction}
                            setEditItemContractWindowVisibleFlag={setEditItemContractWindowVisibleFlag}
                        />
                    </MyModal>
                </td>
            }
        </tr>
        </tbody>
    );
};

export default LtdContractListItem;