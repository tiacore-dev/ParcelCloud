import axios from "axios";

interface IApiResponce<R> {
    error: boolean;
    errorMessage?: string;
    responceData?: R
}

export const useApi = async <R, D = any>(templateName: string, methodName: string, data?: D): Promise<R> => {

    const url = `${process.env.REACT_APP_API_URL}/${templateName}/${methodName}`
    const responce: { data: IApiResponce<R>} = await axios.post(
        url,
        JSON.stringify(data),
        {withCredentials: false}
        )
    if (responce.data.error) {
        console.log(responce.data.errorMessage)
        throw responce.data.errorMessage;
    }
    console.log(responce.data.responceData)
    return responce.data.responceData
}
