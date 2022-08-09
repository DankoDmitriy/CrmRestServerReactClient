import React from 'react';
import {Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import CarListItem from "./CarListItem";
import {useTranslation} from "react-i18next";
import "../../i18n";
import {chekAccess} from "../../util/chekAccess";
import {ROLE_ADMIN, ROLE_MANAGER} from "../../constants";

const CarList = ({
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
                <th scope="col">{t('carList.tableId')}</th>
                <th scope="col">{t('carList.tableCarNumber')}</th>
                <th scope="col">{t('carList.tableCity')}</th>
                <th scope="col">{t('carList.tableDescription')}</th>
                <th scope="col">{t('carList.tableStatus')}</th>
                {
                    ((chekAccess(ROLE_ADMIN) || chekAccess(ROLE_MANAGER))) &&
                    <th scope="col">{t('carList.tableOperations')}</th>
                }
            </tr>
            </thead>
            <tbody>
            {items.map((item, index) =>
                <CarListItem key={item.id}
                             item={item}
                             index={(pageSize * currentPage) + index + 1}
                             updateItemsListAfterAction={updateItemsListAfterAction}
                />
            )}
            </tbody>
        </Table>
    );
};

export default CarList;