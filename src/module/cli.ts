
import {Command} from "commander"
import {get_local_node_list} from "src/lib";


export interface ProgramOption {
    command: string
    description: string,
    run: ChoreFun,
    // option:
}

export interface ProgramList {
    [K: string]: ProgramOption
}

class CliOrder {
    private program: Command = new Command()
    constructor() {
        this.init()
    }


    private set_option() {
    }

    public run() {


        this.program
            .command('use')
            .description('use node version')
            .argument('<string>', 'string to split')
            .option('-O, --os', `link local node version to system path. (only command 'link' valid)`)
            .action(this.use);

        this.program.parse()
    }

    private async use(version: any, option: any) {


        const version_list = get_local_node_list()

        const is_local_have = version_list.some(v => v.startsWith(version))

        // if (is_local_have === false) await
    }


    private init() {
    }
}



export function run() {

    const cli_instance = new CliOrder();

    cli_instance.run()



}