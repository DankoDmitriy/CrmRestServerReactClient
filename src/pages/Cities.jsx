import 'bootstrap/dist/css/bootstrap.min.css';

import React, {useEffect, useState} from "react";
import {Button, Container} from "react-bootstrap";
import CityService from "../API/CityService";
import CityList from "../components/city/CityList";
import PaginationBar from "../components/pagination/PaginationBar";
import CityAddFrom from "../components/city/CityAddFrom";
import MyModal from "../components/MyModalWindow/MyModal";
import MyNavBar from "../components/navBar/MyNavBar";
import "../i18n";
import {ROLE_ADMIN, ROLE_MANAGER} from "../constants";
import {useTranslation} from "react-i18next";
import {chekAccess} from "../util/chekAccess";

function Cities() {
    const {t} = useTranslation();
    const [cities, setCities] = useState([]);
    //Option for Modal window for add city show : True -> ON false -> off.
    const [addCityWindowVisibleFlag, setAddCityWindowVisibleFlag] = useState(false);
    const [addCityFlag, setAddCityFlag] = useState(0);
    //Pagination options
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(40);

    useEffect(() => {
        fetchCity();
    }, [currentPage, addCityFlag])

    async function fetchCity() {
        const response = await CityService.getAll(currentPage, pageSize);
        setCities(response.data.content);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.pageable.pageNumber);
    }

    const updateCityListAfterAction = () => {
        setAddCityFlag(addCityFlag + 1);
        setCurrentPage(0);
        setAddCityWindowVisibleFlag(false);
    }

    const changePage = (page) => {
        setCurrentPage(page);
    }

    return (
        <div className="App">
            <MyNavBar/>
            <Container mt={5}>
                {(chekAccess(ROLE_ADMIN) || chekAccess(ROLE_MANAGER)) &&
                <Button style={{marginTop: 10, marginBottom: 10}} onClick={() => setAddCityWindowVisibleFlag(true)}>
                    {t('cities.addCityButton')}</Button>
                }
                <MyModal visible={addCityWindowVisibleFlag}
                         setVisible={setAddCityWindowVisibleFlag}>
                    <CityAddFrom updateCityList={updateCityListAfterAction}/>
                </MyModal>

                <CityList cities={cities}
                          currentPage={currentPage}
                          pageSize={pageSize}
                          updateCityList={updateCityListAfterAction}/>
                <PaginationBar
                    totalPage={totalPages}
                    currentPage={currentPage}
                    changePage={changePage}/>
            </Container>
        </div>
    );
}

export default Cities;
