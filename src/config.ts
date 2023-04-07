import { join } from "path"
export default {
    source: "http://127.0.0.1:3000/data.json",
    // source: "https://nodejs.org/dist/index.json",
    download_dir: join(__dirname, "../node"),
    proxy: false,
}
