
import { useSelector } from "react-redux";
import { IState } from "../store/modules";


export interface ILoginData {
    username: string;
    password: string
}

interface IauthToken {
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