import axios, {AxiosRequestConfig, CreateAxiosDefaults, AxiosError, AxiosResponse} from 'axios'
import {getToken} from "./auth";


export interface IHttpClientRequestParameters {
    url: string
    requiresToken?: boolean
    payload?: Object
}

export interface IHttpClient {
    get<T>(parameters: IHttpClientRequestParameters): Promise<T>

    post<T>(parameters: IHttpClientRequestParameters): Promise<T>

    patch<T>(parameters: IHttpClientRequestParameters): Promise<T>
}

export interface IFormBackEndError {
    isInvalid: boolean,
    message: string|undefined;
}
class BackEndError implements IbackEndError{
    isInvalid=false;
    message: string|undefined;

}

export const backendError= new BackEndError();


class BackEndClient implements IHttpClient {

    config: CreateAxiosDefaults = {
        baseURL: 'http://localhost:3333'
    }

    get<T>(parameters: IHttpClientRequestParameters): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const {url, requiresToken} = parameters

            const options: AxiosRequestConfig = {
                headers: {}
            }

            // if API endpoint requires a token, we'll need to add a way to add this.
            if (requiresToken) {
                options.headers = {
                    Authorization: `Bearer ${getToken()}`
                }
            }

            // finally execute the GET request with axios:
            axios
                .get(url, options)
                .then((response: any) => {
                    resolve(response.data as T)
                })
                .catch((response: any) => {
                    reject(response)
                })
        })
    }

    post<T>(parameters: IHttpClientRequestParameters): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const {url, payload, requiresToken = false} = parameters

            const options: AxiosRequestConfig = {
                headers: {}
            }

            // if API endpoint requires a token, we'll need to add a way to add this.
            if (requiresToken) {
                options.headers = {
                    Authorization: `Bearer ${getToken()}`
                }
            }

            // finally execute the GET request with axios:
            axios
                .post(url, payload, options)
                .then((response: any) => {
                    resolve(response.data as T)
                })
                .catch((response: any) => {
                    reject(response)
                })
        })
    }

    patch<T>(parameters: IHttpClientRequestParameters): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const {url, payload, requiresToken} = parameters

            const options: AxiosRequestConfig = {
                headers: {}
            }

            // if API endpoint requires a token, we'll need to add a way to add this.
            if (requiresToken) {
                options.headers = {
                    Authorization: `Bearer ${getToken()}`
                }
            }

            // finally execute the GET request with axios:
            axios
                .patch(url, payload, options)
                .then((response: any) => {
                    resolve(response.data as T)
                })
                .catch((response: any) => {
                    reject(response)
                })
        })
    }

}

export const backend = new BackEndClient()