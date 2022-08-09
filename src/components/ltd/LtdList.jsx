import React from 'react';
import {Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import LtdListItem from "./LtdListItem";
import {useTranslation} from "react-i18next";
import "../../i18n";
import {chekAccess} from "../../util/chekAccess";
import {ROLE_ADMIN, ROLE_MANAGER} from "../../constants";

const LtdList = ({
                     items,
                     pageSize,
                     currentPage,
                     updateItemsListAfterAction
                 }) => {
    const {t} = useTranslation();
    return (
        <Table className={Table}>
            <thead>
            <tr>
                <th scope="col">{t('ltdList.tableId')}</th>
                <th scope="col">{t('ltdList.tableLtdShortName')}</th>
                <th scope="col">{t('ltdList.tableAddress')}</th>
                <th scope="col">{t('ltdList.tableUnp')}</th>
                <th scope="col">{t('ltdList.tableTotalBanks')}</th>
                <th scope="col">{t('ltdList.tableTotalContracts')}</th>
                <th scope="col">{t('ltdList.tableTotalInstance')}</th>
                <th scope="col">{t('ltdList.tableStatus')}</th>
                <th scope="col">{t('ltdList.tableOperations')}</th>
            </tr>
            </thead>
            <tbody>
            {items.map((item, index) =>
                <LtdListItem key={item.id}
                             item={item}
                             index={(pageSize * currentPage) + index + 1}
                             updateItemsListAfterAction={updateItemsListAfterAction}
                />
            )}
            </tbody>
        </Table>
    );
};

export default LtdList;