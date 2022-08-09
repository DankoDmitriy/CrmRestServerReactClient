import React from 'react';
import {Pagination} from "react-bootstrap";

const PaginationBar = (props) => {
    let active = props.currentPage;
    let items = [];
    //FIXME -PAGINATION_BAR_BUTTONS (made gradation in buttons, because  in this moment we have a long button line.)
    if (props.totalPage > 15 && props.currentPage != 0) {
    }
    for (let number = 0; number < props.totalPage; number++) {
        items.push(
            <Pagination.Item onClick={() => props.changePage(number)} key={number} active={number === active}>
                {number + 1}
            </Pagination.Item>,
        );
    }
    return (
        <div>
            <Pagination>{items}</Pagination>
            <br/>
        </div>
    );
};

export default PaginationBar;