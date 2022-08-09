import React from 'react';
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import i18n from "i18next";
import "../../i18n";
import {useTranslation} from "react-i18next";
import {chekAccess} from "../../util/chekAccess"
import {ROLE_ADMIN, ROLE_MANAGER, ROLE_USER} from "../../constants";

const MyNavBar = () => {
    const {t} = useTranslation();
    const changeLanguageHandler = (lang) => {
        i18n.changeLanguage(lang);
    }

    return (
        <Navbar className="navbar navbar-expand-lg navbar-light bg-light" xmlns="http://www.w3.org/1999/html">
            <Navbar.Brand href="/">DankoCRM</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll"/>
            <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{maxHeight: '50px'}}
                    navbarScroll
                >
                    <Nav.Link href="/">{t('navBar.main')}</Nav.Link>

                    {(chekAccess(ROLE_USER)) &&
                    <NavDropdown title={t('navBar.work')} id="navbarScrollingDropdown">
                        <Link className="dropdown-item" to="/tickets">{t('navBar.workTickets')}</Link>
                    </NavDropdown>
                    }

                    {(chekAccess(ROLE_USER)) &&
                    <NavDropdown title={t('navBar.clients')} id="navbarScrollingDropdown">
                        <Link className="dropdown-item" to="/ltd">{t('navBar.clientsLtd')}</Link>
                        <Link className="dropdown-item" to="/instance">{t('navBar.clientsLtdInstance')}</Link>
                    </NavDropdown>
                    }

                    {(chekAccess(ROLE_USER)) &&
                    <NavDropdown title={t('navBar.company')} id="navbarScrollingDropdown">
                        <Link className="dropdown-item" to="/department">{t('navBar.companyDepartments')}</Link>
                        <Link className="dropdown-item" to="/position">{t('navBar.companyPositions')}</Link>
                        <NavDropdown.Divider/>
                        <Link className="dropdown-item" to="/user">
                            {t('navBar.companyEmployees')}
                        </Link>
                    </NavDropdown>
                    }

                    {(chekAccess(ROLE_ADMIN) || chekAccess(ROLE_MANAGER)) &&
                    <NavDropdown title={t('navBar.systemData')} id="navbarScrollingDropdown">
                        <Link className="dropdown-item" to="/car">{t('navBar.systemDataCars')}</Link>
                        <Link className="dropdown-item" to="/city">{t('navBar.systemDataCities')}</Link>
                        <Link className="dropdown-item" to="/phoneType">{t('navBar.systemDataPhoneType')}</Link>
                        <Link className="dropdown-item" to="/ticket/type">{t('navBar.systemDataTicketType')}</Link>
                    </NavDropdown>
                    }

                </Nav>
                <Nav>
                    <Nav.Item>{localStorage.getItem('username')}</Nav.Item>
                    <Nav.Item>
                        <button
                            style={{marginLeft: 10, marginRight: 5, backgroundColor: "#99c9dc"}}
                            onClick={() => changeLanguageHandler("ru")}
                        > Ru
                        </button>
                        <button
                            style={{backgroundColor: "#99c9dc"}}
                            onClick={() => changeLanguageHandler("en")}
                        > EN
                        </button>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default MyNavBar;