import React, {useEffect, useState} from 'react';
import {Button, Container} from "react-bootstrap";
import TicketService from "../API/TicketService";
import MyModal from "../components/MyModalWindow/MyModal";
import PaginationBar from "../components/pagination/PaginationBar";
import TicketAddForm from "../components/ticket/TicketAddForm";
import TicketList from "../components/ticket/TicketList";
import MyNavBar from "../components/navBar/MyNavBar";
import {useTranslation} from "react-i18next";
import {chekAccess} from "../util/chekAccess";
import {ROLE_ADMIN, ROLE_MANAGER} from "../constants";

const Ticket = () => {
    const {t} = useTranslation();
    const [items, setItems] = useState([]);
    //Option for Modal window for add Item: True -> ON false -> off.
    const [addItemVisibleFlag, setAddItemVisibleFlag] = useState(false);
    const [actionWithItemFlag, setActionWithItemFlag] = useState(0);
    //Pagination options
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(50);
    //Tickets load: 1- open. 0-closed
    const [ticketOpenStatusLoad, setTicketOpenStatusLoad] = useState(1);

    useEffect(() => {
        fetchItem();
    }, [currentPage, actionWithItemFlag, ticketOpenStatusLoad])

    async function fetchItem() {
        const response = await TicketService.getAll(currentPage, pageSize, ticketOpenStatusLoad);
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

    function ticketOfListOpenStatus() {
        if (ticketOpenStatusLoad === 1) {
            return t('ticket.ticketsInWork');
        } else {
            return t('ticket.closedTickets');
        }
    }

    function changeTicketListOfStatus() {
        if (ticketOpenStatusLoad === 1) {
            setTicketOpenStatusLoad(0);
        } else {
            setTicketOpenStatusLoad(1);
        }
    }

    return (
        <div>
            <MyNavBar/>
            <Container fluid>
                <Button style={{marginTop: 10, marginBottom: 10, marginRight: 10}}
                        onClick={() => changeTicketListOfStatus()}>
                    {t('ticket.openClosedButton')}
                </Button>

                {
                    (chekAccess(ROLE_ADMIN) || chekAccess(ROLE_MANAGER)) &&
                    <Button style={{marginTop: 10, marginBottom: 10}} onClick={() => setAddItemVisibleFlag(true)}>
                        {t('ticket.addTicketButton')}
                    </Button>
                }

                <MyModal visible={addItemVisibleFlag}
                         setVisible={setAddItemVisibleFlag}>
                    <TicketAddForm updateItemsListAfterAction={updateItemsListAfterAction}/>
                </MyModal>

                <center>{ticketOfListOpenStatus()}</center>
                <TicketList items={items}
                            currentPage={currentPage}
                            pageSize={pageSize}
                            updateItemsListAfterAction={updateItemsListAfterAction}/>
                <PaginationBar
                    totalPage={totalPages}
                    currentPage={currentPage}
                    changePage={changePage}/>
            </Container>
        </div>
    );
};

export default Ticket;