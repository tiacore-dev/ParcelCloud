import axios from "axios";
import { IauthToken } from "./useAuth";
import { Buffer } from "buffer";

type fileType = "order" | "act" | "cf"

interface IApiResponce<R> {
    error: boolean;
    errorMessage?: string;
    responceData?: R
}

interface GetFileDto {
    authToken: IauthToken;
    fileType: fileType;
    id: string;
    fileName: string;
}

export const useApi = async <R, D = any>(templateName: string, methodName: string, data?: D): Promise<R> => {

    const url = `${process.env.REACT_APP_API_URL}/${templateName}/${methodName}`
    const responce: { data: IApiResponce<R> } = await axios.post(
        url,
        JSON.stringify(data),
        { withCredentials: false }
    )
    if (responce.data.error) {
        console.log(responce.data.errorMessage)
        throw responce.data.errorMessage;
    }
    return responce.data.responceData
}

export const useGettingFile = (authToken: IauthToken, fileType: fileType, id: string, fileName: string) => {

    const params: GetFileDto = {
        authToken,
        id,
        fileType,
        fileName
    }

    useApi<string, GetFileDto>('getfile', 'get', params).then((fileData) => {
        const buffer = Buffer.from(fileData, 'base64');
        const file = new File([buffer as BlobPart], fileName, {
            type: "application/pdf",
        });

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(file);
        link.download = `${fileName}-${+new Date()}.pdf`;
        link.click();

    }).catch(err => {
        console.log(err)
    })

}