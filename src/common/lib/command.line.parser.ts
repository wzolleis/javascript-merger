import {CliOptions} from "../common.types";
import {Command} from "commander";

class CommandLineParser {
    parseArguments(args: string[]): CliOptions {
        const program = new Command();
        program.requiredOption('-s, --source <input>', 'source package.json')
        program.option('-w, --cwd <input>',
            'working directory, the other paths are relative to this directory',
            process.cwd()
        )
        program.option('-d, --destination [destinations...]', 'Multiple Destination package.json ')

        program.parse(args)

        const options = program.opts();
        return {
            source: options.source,
            destination: options.destination,
            workingDirectory: options.cwd
        }

    }
}

export default new CommandLineParser()