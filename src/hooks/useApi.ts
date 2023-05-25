import axios from "axios";

interface IApiResponce<R> {
    error: boolean;
    errorMessage?: string;
    responceData?: R
}

export const useApi = async <R, D = any>(templateName: string, methodName: string, data?: D): Promise<R> => {

    const url = `${process.env.REACT_APP_API_URL}/${templateName}/${methodName}`
    console.log('consolelog url', url)

    const responce: { data: IApiResponce<R>} = await axios.post(
        url,
        JSON.stringify(data),
        {withCredentials: false}
        )
    console.log('consolelog responce', responce)
    if (responce.data.error) {
        throw responce.data.errorMessage;
    }
    return responce.data.responceData
}
