import config from "src/config";
import { readdirSync } from "fs-extra"
export function get_local_node_list() {
    const { download_dir } = config

    let version_list: string[] = []
    try {
        version_list = readdirSync(download_dir)
    } catch (err) {}

    return version_list
}
