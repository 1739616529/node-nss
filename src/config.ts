import { join } from "path"
export default {
    source: "http://127.0.0.1:3000/data.json",
    // source: "https://nodejs.org/dist/index.json",
    node_path: join(__dirname, "../node"),

    env_name: "NSS_NODE",
    proxy: false,
}
