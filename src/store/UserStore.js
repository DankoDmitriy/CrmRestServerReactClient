import {makeAutoObservable} from "mobx";

class UserStore {
    isLogin = false;

    constructor(props) {
        this.isLogin = localStorage.getItem('isLogin') ? true : false;
        makeAutoObservable(this)
    }

    setIsLogin(value) {
        this.isLogin = value;
    }
}

export default new UserStore()