import React, {useEffect, useState} from 'react';
import {Button, Container} from "react-bootstrap";
import PaginationBar from "../components/pagination/PaginationBar";
import TicketTypeService from "../API/TicketTypeService";
import TicketTypeList from "../components/ticketType/ticketTypeList";
import MyModal from "../components/MyModalWindow/MyModal";
import TicketTypeAddForm from "../components/ticketType/TicketTypeAddForm";
import MyNavBar from "../components/navBar/MyNavBar";
import {chekAccess} from "../util/chekAccess";
import {useTranslation} from "react-i18next";
import "../i18n";
import {ROLE_ADMIN, ROLE_MANAGER} from "../constants";

const TicketType = () => {
    const {t} = useTranslation();
    const buttonAddNewItemText = 'Add ticket type';
    const [items, setItems] = useState([]);
    //Option for Modal window for add Item: True -> ON false -> off.
    const [addItemVisibleFlag, setAddItemVisibleFlag] = useState(false);
    const [actionWithItemFlag, setActionWithItemFlag] = useState(0);
    //Pagination options
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(30);

    useEffect(() => {
        fetchItem();
    }, [currentPage, actionWithItemFlag])

    async function fetchItem() {
        const response = await TicketTypeService.getAll(currentPage, pageSize);
        setItems(response.data.content);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.pageable.pageNumber);
    }

    const updateItemsListAfterAction = () => {
        setActionWithItemFlag(actionWithItemFlag + 1);
        setCurrentPage(0);
        setAddItemVisibleFlag(false);
    }

    const changePage = (page) => {
        setCurrentPage(page);
    }
    return (
        <div className="App">
            <MyNavBar/>
            <Container mt={5}>
                {(chekAccess(ROLE_ADMIN) || chekAccess(ROLE_MANAGER)) &&
                <Button style={{marginTop: 10, marginBottom: 10}} onClick={() => setAddItemVisibleFlag(true)}>
                    {t('ticketType.addTicketTypeButton')}
                </Button>
                }
                <MyModal visible={addItemVisibleFlag}
                         setVisible={setAddItemVisibleFlag}>
                    <TicketTypeAddForm updateItemsListAfterAction={updateItemsListAfterAction}/>
                </MyModal>

                {items && <TicketTypeList items={items}
                                          currentPage={currentPage}
                                          pageSize={pageSize}
                                          updateItemsListAfterAction={updateItemsListAfterAction}/>
                }

                <PaginationBar
                    totalPage={totalPages}
                    currentPage={currentPage}
                    changePage={changePage}/>
            </Container>
        </div>
    );
};

export default TicketType;