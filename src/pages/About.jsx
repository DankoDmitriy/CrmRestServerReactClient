import React from 'react';
import {Container} from "react-bootstrap";
import MyNavBar from "../components/navBar/MyNavBar";
import CityList from "../components/city/CityList";

const About = () => {
    return (
        <div className="App">
            <MyNavBar/>
            <Container mt={5}>
                It is about page
            </Container>
        </div>
    );
};

export default About;