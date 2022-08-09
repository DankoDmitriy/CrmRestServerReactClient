import React, {useEffect, useState} from 'react';
import {Button, Container} from "react-bootstrap";
import MyModal from "../components/MyModalWindow/MyModal";
import PaginationBar from "../components/pagination/PaginationBar";
import PhoneTypeService from "../API/PhoneTypeService";
import PhoneTypeList from "../components/phoneType/PhoneTypeList";
import PhoneTypeAddFrom from "../components/phoneType/PhoneTypeAddFrom";
import MyNavBar from "../components/navBar/MyNavBar";
import "../i18n";
import {ROLE_ADMIN, ROLE_MANAGER} from "../constants";
import {useTranslation} from "react-i18next";
import {chekAccess} from "../util/chekAccess";

const PhoneType = () => {
    const {t} = useTranslation();
    const buttonAddNewItemText = 'Add new phone type';
    const [phoneTypes, setPhoneTypes] = useState([]);
    //Option for Modal window for add city show : True -> ON false -> off.
    const [addPhoneTypeWindowVisibleFlag, setAddPhoneTypeWindowVisibleFlag] = useState(false);
    const [addPhoneTypeFlag, setAddPhoneTypeFlag] = useState(0);
    //Pagination options
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);

    useEffect(() => {
        fetchPhoneType();
    }, [currentPage, addPhoneTypeFlag])

    async function fetchPhoneType() {
        const response = await PhoneTypeService.getAll(currentPage, pageSize);
        setPhoneTypes(response.data.content);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.pageable.pageNumber);
    }

    const updatePhoneTypeListAfterAction = () => {
        setAddPhoneTypeFlag(addPhoneTypeFlag + 1);
        setCurrentPage(0);
        setAddPhoneTypeWindowVisibleFlag(false);
    }

    const changePage = (page) => {
        setCurrentPage(page);
    }

    return (
        <div className="App">
            <MyNavBar/>
            <Container mt={5}>
                {(chekAccess(ROLE_ADMIN) || chekAccess(ROLE_MANAGER)) &&
                <Button style={{marginTop: 10, marginBottom: 10}}
                        onClick={() => setAddPhoneTypeWindowVisibleFlag(true)}>
                    {t('phoneType.addPhoneTypeButton')}</Button>
                }
                <MyModal visible={addPhoneTypeWindowVisibleFlag}
                         setVisible={setAddPhoneTypeWindowVisibleFlag}>
                    <PhoneTypeAddFrom updatePhoneTypeList={updatePhoneTypeListAfterAction}/>
                </MyModal>


                <PhoneTypeList phoneTypes={phoneTypes}
                               currentPage={currentPage}
                               pageSize={pageSize}
                               updatePhoneTypeList={updatePhoneTypeListAfterAction}/>
                <PaginationBar
                    totalPage={totalPages}
                    currentPage={currentPage}
                    changePage={changePage}/>
            </Container>
        </div>
    );
};

export default PhoneType;