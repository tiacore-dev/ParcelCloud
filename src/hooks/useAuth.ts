
import { useSelector } from "react-redux";
import { IState } from "../store/modules";


export interface ILoginData {
    email: string;
    password: string
}

export interface IauthToken {
    userKey: string;
    token: string
}



export const authData = () =>{
    return useSelector((state: IState) => state.auth)
}


export const authToken = ():IauthToken => {
    const {userKey, token} = authData()
    return ({
        userKey,
        token
    })
}

export const checkPermission = (permission: string):boolean => {
    const {permissions} = authData();
    return Object.values(permissions).some(value => value === permission)
}