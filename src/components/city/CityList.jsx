import React from 'react';
import {Table} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import CityListItem from "./CityListItem";
import {useTranslation} from "react-i18next";
import "../../i18n";
import {chekAccess} from "../../util/chekAccess";
import {ROLE_ADMIN, ROLE_MANAGER} from "../../constants";

const CityList = ({pageSize, currentPage, cities, updateCityList}) => {
    const {t} = useTranslation();
    return (
        <Table className={Table}>
            <thead>
            <tr>
                <th scope="col">{t('cityList.tableId')}</th>
                <th scope="col">{t('cityList.tableCityName')}</th>
                <th scope="col">{t('cityList.tableStatus')}</th>
                {
                    ((chekAccess(ROLE_ADMIN) || chekAccess(ROLE_MANAGER))) &&
                    <th scope="col">{t('cityList.tableOperations')}</th>
                }
            </tr>
            </thead>
            <tbody>
            {cities.map((city, index) =>
                <CityListItem key={city.id}
                              city={city}
                              index={(pageSize * currentPage) + index + 1}
                              updateCityList={updateCityList}
                />
            )}
            </tbody>
        </Table>
    );
};

export default CityList;