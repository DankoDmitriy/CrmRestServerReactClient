import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import MyModal from "../MyModalWindow/MyModal";
import LtdEditForm from "./LtdEditForm";
import {Link} from "react-router-dom";
import LtdBankAddForm from "../ltdBank/LtdBankAddForm";
import LtdContractAddForm from "../ltdContract/LtdContractAddForm";
import {chekAccess} from "../../util/chekAccess";
import {ROLE_ADMIN, ROLE_MANAGER} from "../../constants";
import {useTranslation} from "react-i18next";
import "../../i18n";

const LtdListItem = (props) => {
    const [editItemWindowVisibleFlag, setEditItemWindowVisibleFlag] = useState(false);
    const [addItemBankWindowVisibleFlag, setAddItemBankWindowVisibleFlag] = useState(false);
    const [addItemContractWindowVisibleFlag, setAddItemContractWindowVisibleFlag] = useState(false);
    const {t} = useTranslation();

    function nullCheckerForList(list) {
        return list === null ? 0 : list.length;
    }

    return (
        <tr>
            <th scope="row">{props.index}</th>
            <td>{props.item.nameShort}</td>
            <td>{props.item.address}</td>
            <td>{props.item.unp}</td>
            <td>{nullCheckerForList(props.item.ltdBanks)}   </td>
            <td>{nullCheckerForList(props.item.ltdContracts)}</td>
            <td>{nullCheckerForList(props.item.ltdInstances)}</td>
            <td>{props.item.status}</td>
            <td>

                {
                    ((chekAccess(ROLE_ADMIN) || chekAccess(ROLE_MANAGER))) &&
                    <Button onClick={() => setEditItemWindowVisibleFlag(true)}>{t('ltdListItem.editLtdButton')}</Button>
                }
                <MyModal visible={editItemWindowVisibleFlag}
                         setVisible={setEditItemWindowVisibleFlag}>
                    <LtdEditForm item={props.item}
                                 updateItemsListAfterAction={props.updateItemsListAfterAction}
                                 setEditItemWindowVisibleFlag={setEditItemWindowVisibleFlag}
                    />
                </MyModal>

                {
                    ((chekAccess(ROLE_ADMIN) || chekAccess(ROLE_MANAGER))) &&
                    <Button style={{marginLeft: 10}}
                            onClick={() => setAddItemBankWindowVisibleFlag(true)}>{t('ltdListItem.addBankButton')}</Button>
                }
                <MyModal visible={addItemBankWindowVisibleFlag}
                         setVisible={setAddItemBankWindowVisibleFlag}>
                    <LtdBankAddForm ltd={props.item}
                                    updateItemsListAfterAction={props.updateItemsListAfterAction}
                                    setAddItemBankWindowVisibleFlag={setAddItemBankWindowVisibleFlag}
                    />
                </MyModal>
                {
                    ((chekAccess(ROLE_ADMIN) || chekAccess(ROLE_MANAGER))) &&
                    <Button style={{marginLeft: 10}}
                            onClick={() => setAddItemContractWindowVisibleFlag(true)}>{t('ltdListItem.addContractButton')}</Button>
                }
                <MyModal visible={addItemContractWindowVisibleFlag}
                         setVisible={setAddItemContractWindowVisibleFlag}>
                    <LtdContractAddForm ltd={props.item}
                                        updateItemsListAfterAction={props.updateItemsListAfterAction}
                                        setAddItemContractWindowVisibleFlag={setAddItemContractWindowVisibleFlag}
                    />
                </MyModal>
                <Button style={{marginLeft: 10}} onClick={() => setAddItemContractWindowVisibleFlag(true)}>
                    <Link style={{color: 'white'}} to={"/ltd/information/full/" + props.item.id}>
                        {t('ltdListItem.allInformationButton')}
                    </Link>
                </Button>
            </td>
        </tr>
    );
};

export default LtdListItem;