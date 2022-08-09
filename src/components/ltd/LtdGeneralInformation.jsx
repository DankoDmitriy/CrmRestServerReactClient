import React from 'react';
import {Table} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import "../../i18n";

const LtdGeneralInformation = (props) => {
    const {t} = useTranslation();

    return (
        <Table className={Table}>
            <thead>
            <tr>
                <th scope="col">{t('ltdGeneralInformation.tableId')}</th>
                <th scope="col">{t('ltdGeneralInformation.tableFullName')}</th>
                <th scope="col">{t('ltdGeneralInformation.tableShortName')}</th>
                <th scope="col">{t('ltdGeneralInformation.tableAddress')}</th>
                <th scope="col">{t('ltdGeneralInformation.tableUnp')}</th>
                <th scope="col">{t('ltdGeneralInformation.tableStatus')}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">1</th>
                <td>{props.item.nameFull}</td>
                <td>{props.item.nameShort}</td>
                <td>{props.item.address}</td>
                <td>{props.item.unp}</td>
                <td>{props.item.status}</td>
            </tr>
            </tbody>
        </Table>
    );
};

export default LtdGeneralInformation;