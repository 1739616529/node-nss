import {get_local_node_list} from "src/lib";
import {join} from "path";
import { node_path } from "../config"
import process from "process";

export function use_node_version(version: string) {

    const is_use = use_local_node_version(version)

}


function use_local_node_version(version: string) {
    const version_list = get_local_node_list()

    const local_node_version = version_list.find(v => v.startsWith(version))

    if (local_node_version === void 0) return false

    const active_local_node_dir = join(node_path, local_node_version, process.arch)



    return true
}