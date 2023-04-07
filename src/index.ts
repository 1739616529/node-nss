import config from "./config"
import context from "./context"
import { http_get } from "src/lib/http"
import url from "url";
const {source} = config

function run() {



    import("./module/cli").then(v => v.run())



}

// run()


http_get(url.parse("https://www.google.com"), (...args) => {
    console.log(args)
})