import React from 'react';
import {Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import PositionListItem from "./PositionListItem";
import {useTranslation} from "react-i18next";
import "../../i18n";
import {chekAccess} from "../../util/chekAccess";
import {ROLE_ADMIN, ROLE_MANAGER} from "../../constants";

const PositionList = ({
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
                <th scope="col">{t('positionList.tableId')}</th>
                <th scope="col">{t('positionList.tablePositionName')}</th>
                <th scope="col">{t('positionList.tableDepartmentName')}</th>
                <th scope="col">{t('positionList.tableSubordination')}</th>
                <th scope="col">{t('positionList.tableDescription')}</th>
                <th scope="col">{t('positionList.tableStatus')}</th>
                {
                    (chekAccess(ROLE_ADMIN) || chekAccess(ROLE_MANAGER)) &&
                    <th scope="col">{t('positionList.tableOperations')}</th>
                }
            </tr>
            </thead>
            <tbody>
            {items.map((item, index) =>
                <PositionListItem key={item.id}
                                  item={item}
                                  index={(pageSize * currentPage) + index + 1}
                                  updateItemsListAfterAction={updateItemsListAfterAction}
                />
            )}
            </tbody>
        </Table>
    );
};

export default PositionList;