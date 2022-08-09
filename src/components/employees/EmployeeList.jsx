import React from 'react';
import {Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeeListItem from "./EmployeeListItem";
import {useTranslation} from "react-i18next";
import "../../i18n";
import {chekAccess} from "../../util/chekAccess";
import {ROLE_ADMIN, ROLE_MANAGER} from "../../constants";

const EmployeeList = ({
                          items,
                          pageSize,
                          currentPage,
                          rolesList,
                          updateItemsListAfterAction
                      }) => {
    const {t} = useTranslation();

    return (
        <Table className={Table}>
            <thead>
            <tr>
                <th scope="col">{t('employeeList.tableId')}</th>
                <th scope="col">{t('employeeList.tableEmployeeName')}</th>
                <th scope="col">{t('employeeList.tableProxy')}</th>
                <th scope="col">{t('employeeList.tableDepartmentName')}</th>
                <th scope="col">{t('employeeList.tablePosition')}</th>
                <th scope="col">{t('employeeList.tableCity')}</th>
                <th scope="col">{t('employeeList.tableStatus')}</th>
                {
                    ((chekAccess(ROLE_ADMIN) || chekAccess(ROLE_MANAGER))) &&
                    <th scope="col">{t('employeeList.tableOperations')}</th>
                }
            </tr>
            </thead>
            <tbody>
            {items.map((item, index) =>
                <EmployeeListItem key={item.id}
                                  item={item}
                                  rolesList={rolesList}
                                  index={(pageSize * currentPage) + index + 1}
                                  updateItemsListAfterAction={updateItemsListAfterAction}
                />
            )}
            </tbody>
        </Table>
    );
};

export default EmployeeList;