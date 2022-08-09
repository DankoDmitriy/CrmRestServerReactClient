import React from 'react';
import {Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import DepartmentListItem from "./DepartmentListItem";
import {useTranslation} from "react-i18next";
import "../../i18n";
import {chekAccess} from "../../util/chekAccess";
import {ROLE_ADMIN, ROLE_MANAGER} from "../../constants";

const DepartmentList = ({
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
                <th scope="col">{t('departmentList.tableId')}</th>
                <th scope="col">{t('departmentList.tableDepartmentName')}</th>
                <th scope="col">{t('departmentList.tableStatus')}</th>
                {
                    ((chekAccess(ROLE_ADMIN) || chekAccess(ROLE_MANAGER))) &&
                    <th scope="col">{t('departmentList.tableOperations')}</th>
                }
            </tr>
            </thead>
            <tbody>
            {items.map((item, index) =>
                <DepartmentListItem key={item.id}
                                    item={item}
                                    index={(pageSize * currentPage) + index + 1}
                                    updateItemsListAfterAction={updateItemsListAfterAction}
                />
            )}
            </tbody>
        </Table>
    );
};

export default DepartmentList;