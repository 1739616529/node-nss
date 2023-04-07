import config from "src/config"
import {UrlWithStringQuery} from "url";
import context from "src/context"
import * as process from "process";

const { source } = config


export function http() {
    if (context.get("https")) return require("https")
    else return require("http")
}


export function proxy() {
    console.log(context.get("https"))
    if (context.get("https")) return require("https-proxy-agent")
    else return require("http-proxy-agent")
}

export function http_get(option: UrlWithStringQuery, cb: ChoreFun) {

    const Proxy_ = proxy()

    const proxy_url = context.get("proxy")
    if (proxy_url) option["agent"] = new Proxy_(context.get("proxy"))

    return http().get(option, cb)
}