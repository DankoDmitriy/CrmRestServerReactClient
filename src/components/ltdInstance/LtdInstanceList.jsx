import React from 'react';
import {Table} from "react-bootstrap";
import LtdInstanceListItem from "./LtdInstanceListItem";
import {useTranslation} from "react-i18next";
import "../../i18n";
import {chekAccess} from "../../util/chekAccess";
import {ROLE_ADMIN, ROLE_MANAGER} from "../../constants";

const LtdInstanceList = ({
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
                <th scope="col">{t('ltdInstanceList.tableId')}</th>
                <th scope="col">{t('ltdInstanceList.tableLtd')}</th>
                <th scope="col">{t('ltdInstanceList.tableCity')}</th>
                <th scope="col">{t('ltdInstanceList.tableAddress')}</th>
                <th scope="col">{t('ltdInstanceList.tableTCabinet')}</th>
                <th scope="col">{t('ltdInstanceList.tablesServers')}</th>
                <th scope="col">{t('ltdInstanceList.tablesUps')}</th>
                <th scope="col">{t('ltdInstanceList.tablesSwitchs')}</th>
                <th scope="col">{t('ltdInstanceList.tablesWorkplace')}</th>
                <th scope="col">{t('ltdInstanceList.tablesEquipment')}</th>
                <th scope="col">{t('ltdInstanceList.tablesEmployee')}</th>
                <th scope="col">{t('ltdInstanceList.tablesDistanceMain')}</th>
                <th scope="col">{t('ltdInstanceList.tablesDistanceLocal')}</th>
                <th scope="col">{t('ltdInstanceList.tableStatus')}</th>
                {
                    (chekAccess(ROLE_ADMIN) || chekAccess(ROLE_MANAGER)) &&
                    <th scope="col">{t('ltdInstanceList.tableOperations')}</th>
                }
            </tr>
            </thead>
            <tbody>
            {items.map((item, index) =>
                <LtdInstanceListItem key={item.id}
                                     item={item}
                                     index={(pageSize * currentPage) + index + 1}
                                     updateItemsListAfterAction={updateItemsListAfterAction}
                />
            )}
            </tbody>
        </Table>
    );
};

export default LtdInstanceList;