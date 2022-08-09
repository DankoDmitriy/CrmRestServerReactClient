import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import MyModal from "../MyModalWindow/MyModal";
import TicketEditForm from "./TicketEditForm";
import moment from "moment";
import {useTranslation} from "react-i18next";
import {chekAccess} from "../../util/chekAccess";
import {ROLE_ADMIN, ROLE_MANAGER} from "../../constants";

const TicketListItem = (props) => {
    const {t} = useTranslation();
    const [editItemWindowVisibleFlag, setEditItemWindowVisibleFlag] = useState(false);

    function dateFormatConverterDateAndTime(date) {
        return moment(date, "YYYY-MM-DD HH:mm").format("DD.MM.YYYY HH:mm");
    }

    function dateFormatConverterOnlyDate(date) {
        return moment(date, "YYYY-MM-DD HH:mm").format("DD.MM.YYYY");
    }

    return (
        <tr className="text-center">
            <th scope="row">{props.index}</th>
            <td>{props.item.ltdInstance.ltd.nameShort}</td>
            <td>{props.item.ltdInstance.address}</td>
            <td>{props.item.employeeOwner.department.name}</td>
            <td>{props.item.ticketType.name}</td>
            <td>{props.item.systemTicketId}</td>
            <td>{dateFormatConverterDateAndTime(props.item.dateOfReceiving).toString().split(" ").map((str, index) =>
                < tr>{str}</tr>
            )}
            </td>
            <td>{props.item.server}</td>
            <td>{props.item.ups}</td>
            <td>{props.item.switchs}</td>
            <td>{props.item.workplace}</td>
            <td>{props.item.equipment}</td>
            <td>{dateFormatConverterDateAndTime(props.item.dateOfFinish).toString().split(" ").map((str, index) =>
                < tr>{str}</tr>
            )}
            </td>
            <td>
                {props.item.employeeExecutor.firstName}
                <br/>
                {props.item.employeeExecutor.lastName}
            </td>
            <td>
                {t('ticketListItem.customers')}: {dateFormatConverterOnlyDate(props.item.dateCustomersDepartmentDoc)}
                <br/>
                {t('ticketListItem.accounting')}: {dateFormatConverterOnlyDate(props.item.dateAccountingDepartmentDoc)}
                <br/>
                {t('ticketListItem.transfer')}: {dateFormatConverterOnlyDate(props.item.dateTransferDoc)}
            </td>
            {
                (chekAccess(ROLE_ADMIN) || chekAccess(ROLE_MANAGER)) &&
                <td>
                    <Button onClick={() => setEditItemWindowVisibleFlag(true)}>
                        {t('ticketListItem.editButton')}
                    </Button>
                    <MyModal visible={editItemWindowVisibleFlag}
                             setVisible={setEditItemWindowVisibleFlag}>
                        <TicketEditForm item={props.item}
                                        updateItemsListAfterAction={props.updateItemsListAfterAction}
                                        setEditItemWindowVisibleFlag={setEditItemWindowVisibleFlag}
                        />
                    </MyModal>
                </td>
            }
        </tr>
    );
};

export default TicketListItem;