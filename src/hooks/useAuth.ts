
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

export const checkBranchesPermission = (permission: string, branch?: string):boolean => {
    const {branchesPermissions} = authData();
    
    if (branch) {
        return branchesPermissions[branch].some(value => value === permission)
    } else {
        return Object.values(branchesPermissions).flat().some(value => value === permission)
    }
}

export const checkCompaniesPermission = (permission: string, company?: string):boolean => {
    const {companiesPermissions} = authData();
    
    if (company) {
        return companiesPermissions[company].some(value => value === permission)
    } else {
        return Object.values(companiesPermissions).flat().some(value => value === permission)
    }
}

export const checkOrganizationsPermission = (permission: string, organization?: string):boolean => {
    const {organizationsPermissions} = authData();
    
    if (organization) {
        return organizationsPermissions[organization].some(value => value === permission)
    } else {
        return Object.values(organizationsPermissions).flat().some(value => value === permission)
    }
}