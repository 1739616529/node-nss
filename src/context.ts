import { BroadcastPlus } from "src/util"
import config from "./config"
import url, {UrlWithStringQuery} from "url";
import process from "process";
const { source } = config



export interface ContextData {
    https: boolean
    proxy: string
}
class Context extends BroadcastPlus {
    private $_:ContextData



    constructor() {
        super()

        this.$_ = {
            https: source.startsWith("https:"),
            proxy: process.env.https_proxy || process.env.HTTPS_PROXY || process.env.http_proxy || process.env.HTTP_PROXY || ""
        }
    }



    public get(key: string) {
        const value = this.$_[key]
        this.send("get", key, value)
        return value
    }

    public set(key: string, value: any) {
        this.$_[key] = value
        this.send("set", key, value)
    }
}

export default new Context()