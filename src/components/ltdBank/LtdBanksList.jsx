import React from 'react';
import {Table} from "react-bootstrap";
import LtdBanksListItem from "./LtdBanksListItem";
import {useTranslation} from "react-i18next";
import "../../i18n";
import {chekAccess} from "../../util/chekAccess";
import {ROLE_ADMIN, ROLE_MANAGER} from "../../constants";

const LtdBanksList = (props) => {
    const {t} = useTranslation();
    return (
        <Table className={Table}>
            <thead>
            <tr>
                <th scope="col">{t('ltdBanksList.tableId')}</th>
                <th scope="col">{t('ltdBanksList.requisites')}</th>
                <th scope="col">{t('ltdBanksList.tableStatus')}</th>
                {
                    ((chekAccess(ROLE_ADMIN) || chekAccess(ROLE_MANAGER))) &&
                    <th scope="col">{t('ltdBanksList.tableOperations')}</th>
                }

            </tr>
            </thead>
            {props.items.map((item, index) =>
                <LtdBanksListItem key={item.id}
                                  item={item}
                                  ltdId ={props.ltdId}
                                  index={index + 1}
                                  updatePageAfterAction={props.updatePageAfterAction}
                />
            )}
        </Table>
    );
};

export default LtdBanksList;