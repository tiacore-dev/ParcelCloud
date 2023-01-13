
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

export interface ILoginResponce {
    fullName: string;
    email: string;
    userKey: string;
    token: string;
    permissions: Record<string, string[]>;



    //fullName, email, userKey, token, permissions
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
