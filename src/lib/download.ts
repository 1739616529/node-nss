import {hashmap_cache} from "src/util"
import config from "src/config";
import {http, http_api, proxy} from "./http"
import * as url from "url";



const { source} = config
export const download_cache = hashmap_cache()
export function get_remote_node_version_list() {
    return download_cache(
        "remote_node_version_list",
        async () => {

            const data = await http_api(source)
            console.log(data)
            return data
        }
    )
}


export async function download_node_by_version(version: string) {

    const remote_data_version_list = await get_remote_node_version_list()

    console.log(remote_data_version_list)

}