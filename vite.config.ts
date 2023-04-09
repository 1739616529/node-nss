import { UserConfigFn, UserConfig } from "vite";
import { join } from "node:path";
import { builtinModules } from "module";
import { readJsonSync } from "fs-extra"
export default <UserConfigFn>function ({mode}) {

    const config: UserConfig = {
        resolve: {
            alias: {
                "src": join(__dirname, "./src")
            }
        },
        root: __dirname,
        mode: mode,
        publicDir: "public",
        build: {
            emptyOutDir: true,
            minify: false,
            lib: {
                entry: "src/index.ts",
                formats: ["cjs"],
                fileName: "index",
            },
            rollupOptions: {
                external: [ ...builtinModules, ...Object.keys(readJsonSync(join(__dirname, "./package.json")).dependencies || {}) ],
            },

        }
    }



    if (mode === "development") {
        config!.build!.watch = {}
        require("./serve")
    }
    return config
}