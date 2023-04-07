import {hashmap_cache} from "src/util"
import config from "src/config";
import { http, proxy } from "./http"
import * as url from "url";



const { source} = config
export const download_cache = hashmap_cache()
export function get_nodejs_version_list() {
    return download_cache(
        source,
        async () => {
            // return http
        }
    )
}


export function download_node_by_version(version: string) {
    const option = url.parse(source)


    http().get()

}