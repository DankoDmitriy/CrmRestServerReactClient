import React from 'react';
import {Table} from "react-bootstrap";
import TicketListItem from "./TicketListItem";
import {useTranslation} from "react-i18next";
import {chekAccess} from "../../util/chekAccess";
import {ROLE_ADMIN, ROLE_MANAGER} from "../../constants";

const TicketList = ({
                        items,
                        pageSize,
                        currentPage,
                        updateItemsListAfterAction
                    }) => {
    const {t} = useTranslation();
    return (
        <Table className={Table}>
            <thead>
            <tr className="text-center">
                <th scope="col">{t('ticketList.tableId')}</th>
                <th scope="col">{t('ticketList.tableLtd')}</th>
                <th scope="col">{t('ticketList.tableAddress')}</th>
                <th scope="col">{t('ticketList.tableDepartment')}</th>
                <th scope="col">{t('ticketList.tableTicketType')}</th>
                <th scope="col">{t('ticketList.tableSystemId')}</th>
                <th scope="col">{t('ticketList.tableReceivingDate')}</th>
                <th scope="col">{t('ticketList.tablesServers')}</th>
                <th scope="col">{t('ticketList.tablesUps')}</th>
                <th scope="col">{t('ticketList.tablesSwitchs')}</th>
                <th scope="col">{t('ticketList.tablesWorkplace')}</th>
                <th scope="col">{t('ticketList.tablesEquipment')}</th>
                <th scope="col">{t('ticketList.tableFinishDate')}</th>
                <th scope="col">{t('ticketList.tableExecutor')}</th>
                <th scope="col">{t('ticketList.tableDocuments')}</th>
                {
                    (chekAccess(ROLE_ADMIN) || chekAccess(ROLE_MANAGER)) &&
                    <th scope="col">{t('ticketList.tableAction')}</th>
                }
            </tr>
            </thead>
            <tbody>
            {items.map((item, index) =>
                <TicketListItem key={item.id}
                                item={item}
                                index={(pageSize * currentPage) + index + 1}
                                updateItemsListAfterAction={updateItemsListAfterAction}
                />
            )}
            </tbody>
        </Table>
    );
};

export default TicketList;