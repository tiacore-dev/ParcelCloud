import axios from "axios";

interface IApiResponce<R> {
    error: boolean;
    errorMessage?: string;
    responceData?: R
}

export const useApi = async <R, D = any>(templateName: string, methodName: string, data?: D): Promise<R> => {

    const url = `${process.env.REACT_APP_API_URL}/${templateName}/${methodName}`
    const responce: { data: IApiResponce<R>} = await axios.post(url,JSON.stringify(data))
    if (responce.data.error) {
        throw new Error(responce.data.errorMessage);
    }
    return responce.data.responceData
}
