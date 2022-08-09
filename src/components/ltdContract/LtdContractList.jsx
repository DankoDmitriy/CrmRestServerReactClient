import React from 'react';
import {Table} from "react-bootstrap";
import LtdContractListItem from "./LtdContractListItem";
import {useTranslation} from "react-i18next";
import "../../i18n";
import {chekAccess} from "../../util/chekAccess";
import {ROLE_ADMIN, ROLE_MANAGER} from "../../constants";

const LtdContractList = (props) => {
    const {t} = useTranslation();
    return (
        <Table className={Table}>
            <thead>
            <tr>
                <th scope="col">{t('ltdContractList.tableId')}</th>
                <th scope="col">{t('ltdContractList.tableNumber')}</th>
                <th scope="col">{t('ltdContractList.tableContractStart')}</th>
                <th scope="col">{t('ltdContractList.tableOther')}</th>
                <th scope="col">{t('ltdContractList.tableStatus')}</th>
                {
                    ((chekAccess(ROLE_ADMIN) || chekAccess(ROLE_MANAGER))) &&
                    <th scope="col">{t('ltdContractList.tableOperations')}</th>
                }

            </tr>
            </thead>
            {props.items.map((item, index) =>
                <LtdContractListItem key={item.id}
                                     item={item}
                                     ltdId ={props.ltdId}
                                     updatePageAfterAction={props.updatePageAfterAction}
                                     index={index + 1}
                />
            )}
        </Table>
    );
};

export default LtdContractList;