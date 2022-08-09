import React from 'react';
import {Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import PhoneTypeListItem from "./PhoneTypeListItem";
import {useTranslation} from "react-i18next";
import "../../i18n";
import {chekAccess} from "../../util/chekAccess";
import {ROLE_ADMIN, ROLE_MANAGER} from "../../constants";

const PhoneTypeList = ({pageSize, currentPage, phoneTypes, updatePhoneTypeList}) => {
    const {t} = useTranslation();
    const lineNumberText = '#';
    const itemName = 'Phone type name';
    const itemStatusText = 'Status';
    const itemOperationsText = 'Operations';
    return (
        <Table className={Table}>
            <thead>
            <tr>
                <th scope="col">{t('phoneTypeList.tableId')}</th>
                <th scope="col">{t('phoneTypeList.tablePhoneTypeName')}</th>
                <th scope="col">{t('phoneTypeList.tableStatus')}</th>
                {
                    (chekAccess(ROLE_ADMIN) || chekAccess(ROLE_MANAGER)) &&
                    <th scope="col">{t('phoneTypeList.tableOperations')}</th>
                }
            </tr>
            </thead>
            <tbody>
            {phoneTypes.map((phoneType, index) =>
                <PhoneTypeListItem key={phoneType.id}
                                   phoneType={phoneType}
                                   index={(pageSize * currentPage) + index + 1}
                                   updatePhoneTypeList={updatePhoneTypeList}
                />
            )}
            </tbody>
        </Table>
    );
};

export default PhoneTypeList;