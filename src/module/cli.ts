
import {Command} from "commander"
import {get_local_node_list} from "src/lib";
import {use_node_version} from "src/module/use";


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
        use_node_version(version)
    }


    private init() {
    }
}



export function run() {

    const cli_instance = new CliOrder();

    cli_instance.run()



}