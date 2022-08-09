import About from "../pages/About";
import Cities from "../pages/Cities";
import PhoneType from "../pages/PhoneType";
import TicketType from "../pages/TicketType";
import Department from "../pages/Department";
import Position from "../pages/Position";
import Employee from "../pages/Employee";
import Main from "../pages/Main";
import TestPage from "../pages/testPage";
import Car from "../pages/Car";
import LtdMain from "../pages/LtdMain";
import Ticket from "../pages/Ticket";
import LtdAllInformation from "../components/ltd/LtdAllInformation";
import LtdInstance from "../pages/LtdInstance";
import Page404 from "../pages/Page404";
import LoginPage from "../pages/LoginPage";

export const privateRouters = [
    {path: '/about', component: <About/>, exact: true},
    {path: '/city', component: <Cities/>, exact: true},
    {path: '/phoneType', component: <PhoneType/>, exact: true},
    {path: '/ticket/type', component: <TicketType/>, exact: true},
    {path: '/department', component: <Department/>, exact: true},
    {path: '/position', component: <Position/>, exact: true},
    {path: '/user', component: <Employee/>, exact: true},
    {path: '/', component: <Main/>, exact: true},
    {path: '/test', component: <TestPage/>, exact: true},
    {path: '/car', component: <Car/>, exact: true},
    {path: '/ltd', component: <LtdMain/>, exact: true},
    {path: '/tickets', component: <Ticket/>, exact: true},
    {path: '/ltd/information/full/:id', component: <LtdAllInformation/>, exact: true},
    {path: '/instance', component: <LtdInstance/>, exact: true},
    {path: '/*', component: <Page404/>, exact: true}
]

export const publicRouters = [
    {path: '/', component: LoginPage, exact: true},
    {path: '/*', component: Page404, exact: true}
]