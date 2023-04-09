import process from "process";

function run() {

    const len = process.argv.length

    if (len > 2) import("./module/cli").then(v => v.run())





}

run()
