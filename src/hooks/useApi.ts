import axios from "axios";
import { IauthToken, authToken } from "./useAuth";

interface IApiResponce<R> {
    error: boolean;
    errorMessage?: string;
    responceData?: R
}

interface GetFileDto {
    authToken: IauthToken;
    fileType: string;
    fileNum: string;
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

export const useGettingFile = (fileType: string, fileNum: string, fileName: string) => {

    const params: GetFileDto = {
        authToken: authToken(),
        fileType,
        fileNum,
        fileName
    }

    useApi<string, GetFileDto>('getfile', 'get', params).then((fileData) => {
        console.log(fileData)

        const i = fileData.indexOf('base64,')
        const buffer = Buffer.from(fileData.slice(i + 7), 'base64');

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