export const chekAccess = (roleAccept) => {
    return localStorage.getItem('roles').split(',').some(elem => elem === roleAccept);
}