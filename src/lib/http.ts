import config from "src/config"
import {UrlWithStringQuery} from "url";
import context from "src/context"
import url from "url";
import Http, { ClientRequest, IncomingMessage } from "http";



export function url_valid_https(option: UrlWithStringQuery) {
    return option.protocol === "https:"
}

export function http(uri: string): Promise<IncomingMessage> {
    return new Promise((resolve, reject) => {

        const option = url.parse(uri)

        let lib: typeof Http
        if (url_valid_https(option)) lib = require("https")
        else lib = require("http")

        const Proxy_ = proxy(option)
        const proxy_url = context.get("proxy")
        if (proxy_url) option["agent"] = new Proxy_(context.get("proxy"))

        lib.get(option, resolve)
    })

}


export interface HttpApiResponse {
    code: number,
    data: any
}

export function http_api(uri: string): Promise<HttpApiResponse> {
    return new Promise(async (resolve, reject) => {
        const res = await http(uri)

        let rt = ""
        res.on("data", (chunks) => {
            rt += chunks
        })

        res.on("end", () => {
            resolve({
                code: res.statusCode!,
                data: JSON.parse(rt)
            })
        })
    })
}


export function proxy(option: UrlWithStringQuery) {

    if (url_valid_https(option)) return require("https-proxy-agent")
    else return require("http-proxy-agent")
}



