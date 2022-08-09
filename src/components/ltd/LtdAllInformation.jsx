import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import LtdService from "../../API/LtdService";
import {Col, Container, Row} from "react-bootstrap";
import LtdBanksList from "../ltdBank/LtdBanksList";
import LtdGeneralInformation from "./LtdGeneralInformation";
import LtdContractList from "../ltdContract/LtdContractList";
import MyNavBar from "../navBar/MyNavBar";
import {useTranslation} from "react-i18next";
import "../../i18n";

const LtdAllInformation = () => {
    const {t} = useTranslation();
    const {id} = useParams();
    const [item, setItem] = useState({});
    const [actionWithItemFlag, setActionWithItemFlag] = useState(0);

    useEffect(() => {
        fetchItem()
    }, [actionWithItemFlag])

    async function fetchItem() {
        const response = await LtdService.getById(id);
        setItem(response.data);
    }

    async function nullCheckerForList(list) {
        return list === null ? 0 : list.length;
    }

    const updatePageAfterAction = () => {
        setActionWithItemFlag(actionWithItemFlag + 1);
    }

    return (
        <div>
            <MyNavBar/>
            <br/>
            <Container>
                <Row>
                    <Col>
                        <b>{t('ltdAllInformation.generalInformation')}</b>
                        <LtdGeneralInformation
                            item={item}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <b>{t('ltdAllInformation.banks')}</b>
                        {
                            item.ltdBanks &&
                            <LtdBanksList
                                items={item.ltdBanks}
                                ltdId={item.id}
                                updatePageAfterAction={updatePageAfterAction}
                            />
                        }
                    </Col>
                    <Col>
                        <b>{t('ltdAllInformation.contracts')}</b>
                        {item && item.ltdContracts &&
                        <LtdContractList
                            items={item.ltdContracts} ltdId={item.id}
                            updatePageAfterAction={updatePageAfterAction}
                        />
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default LtdAllInformation;