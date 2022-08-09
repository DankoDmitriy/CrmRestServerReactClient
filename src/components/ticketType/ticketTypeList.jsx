import React from 'react';
import {Table} from "react-bootstrap";
import TicketTypeListItem from "./TicketTypeListItem";
import "../../i18n";
import {chekAccess} from "../../util/chekAccess";
import {ROLE_ADMIN, ROLE_MANAGER} from "../../constants";
import {useTranslation} from "react-i18next";
import "../../i18n";

const TicketTypeList = ({
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
                <th scope="col">{t('ticketTypeList.tableId')}</th>
                <th scope="col">{t('ticketTypeList.tableTicketTypeName')}</th>
                <th scope="col">{t('ticketTypeList.tableTicketTypeAction')}</th>
                <th scope="col">{t('ticketTypeList.tableTicketTypePriority')}</th>
                <th scope="col">{t('ticketTypeList.tableStatus')}</th>
                {
                    (chekAccess(ROLE_ADMIN) || chekAccess(ROLE_MANAGER)) &&
                    <th scope="col">{t('ticketTypeList.tableOperations')}</th>
                }
            </tr>
            </thead>
            <tbody>
            {items.map((item, index) =>
                <TicketTypeListItem key={item.id}
                                    item={item}
                                    index={(pageSize * currentPage) + index + 1}
                                    updateItemsListAfterAction={updateItemsListAfterAction}
                />
            )}
            </tbody>
        </Table>
    );
};

export default TicketTypeList;