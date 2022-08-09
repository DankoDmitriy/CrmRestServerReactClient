import React from 'react';
import {Container} from "react-bootstrap";
import MyNavBar from "../components/navBar/MyNavBar";

const Main = () => {
    return (
        <div>
            <MyNavBar/>
            <Container className="text-center" mt={5}>

                <br/><br/>
                Welcome!!!. Have a good day.<br/><br/>
                Today is: {(new Date()).toDateString()}
            </Container>
        </div>
    );
};

export default Main;