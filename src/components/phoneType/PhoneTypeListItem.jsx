import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import MyModal from "../MyModalWindow/MyModal";
import PhoneTypeEditForm from "./PhoneTypeEditForm";
import {chekAccess} from "../../util/chekAccess";
import {ROLE_ADMIN, ROLE_MANAGER} from "../../constants";
import {useTranslation} from "react-i18next";
import "../../i18n";

const PhoneTypeListItem = (props) => {
    const {t} = useTranslation();
    const [editPhoneTypeWindowVisibleFlag, setEditPhoneTypeWindowVisibleFlag] = useState(false);
    return (
        <tr>
            <th scope="row">{props.index}</th>
            <td>{props.phoneType.name}</td>
            <td>{props.phoneType.status}</td>
            {
                (chekAccess(ROLE_ADMIN) || chekAccess(ROLE_MANAGER)) &&
                <td>
                    <Button onClick={() => setEditPhoneTypeWindowVisibleFlag(true)}>{t('phoneTypeListItem.editPhoneTypeButton')}</Button>
                    <MyModal visible={editPhoneTypeWindowVisibleFlag}
                             setVisible={setEditPhoneTypeWindowVisibleFlag}>
                        <PhoneTypeEditForm phoneType={props.phoneType}
                                           updatePhoneTypeList={props.updatePhoneTypeList}
                                           setEditPhoneTypeWindowVisibleFlag={setEditPhoneTypeWindowVisibleFlag}
                        />
                    </MyModal>
                </td>
            }
        </tr>
    );
};

export default PhoneTypeListItem;