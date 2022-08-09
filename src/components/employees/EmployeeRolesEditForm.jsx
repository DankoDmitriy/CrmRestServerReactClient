import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import EmployeeService from "../../API/EmployeeService";

const EmployeeRolesEditForm = (props) => {
    const [item, setItem] = useState(props.item);
    const [userRolesChange, setUserRolesChange] = useState(props.item.roles);

    const checkingIfTheUserHasRole = (roleChange) => {
        return userRolesChange.some(role => role.name === roleChange.name);
    }

    const editUserRolesList = (roleChange) => {
        if (checkingIfTheUserHasRole(roleChange)) {
            setUserRolesChange(userRolesChange.filter(p => p.name !== roleChange.name));
        } else {
            setUserRolesChange([...userRolesChange, roleChange]);
        }
    }

    async function saveNewUserRoles(e) {
        e.preventDefault();
        item.roles = userRolesChange;
        await EmployeeService.updateRoles(item.id, item);
        props.updateItemsListAfterAction();
        props.setEditItemRolesWindowVisibleFlag(false);
    }

    return (
        <div>
            {props.item.lastName} {props.item.firstName}
            <Form>
                <Form.Group className="mb-3" controlId="rolesEditForm">
                    {props.rolesList.map((role, index) =>
                        <Form.Check
                            key={index}
                            defaultChecked={checkingIfTheUserHasRole(role)}
                            onChange={e => editUserRolesList(role)}
                            type="checkbox"
                            label={role.name}
                        />
                    )}

                </Form.Group>
                <div style={{textAlign: 'right'}}>
                    <Button
                        variant="primary"
                        onClick={saveNewUserRoles}>
                        save roles
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default EmployeeRolesEditForm;