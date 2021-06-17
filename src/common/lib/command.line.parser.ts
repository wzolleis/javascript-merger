import {CliOptions, CommandLineConfigFile} from "../common.types";
import {Command} from "commander";
import {readFile} from './files';

class CommandLineParser {
    isCommandLineConfig(config: CommandLineConfigFile): config is CommandLineConfigFile {
        const commandLineConfig = (config as CommandLineConfigFile)
        return commandLineConfig.cwd !== undefined &&
            commandLineConfig.destination !== undefined &&
            commandLineConfig.source !== undefined;
    }

    parseArguments(args: string[]): CliOptions {
        const program = new Command();
        program.option('-s, --source <input>', 'source package.json relative to cwd')
        program.option('-w, --cwd <input>',
            'working directory, the other paths are relative to this directory',
            process.cwd()
        )
        program.option('-d, --destination [destinations...]',
            'Multiple Destination package.json, relative to cwd ')

        program.option('-c, --config <config>', 'configuration file')
        program.parse(args)

        const options = program.opts();
        if (options.config) {
            const configFile = readFile(options.config)
            if (this.isCommandLineConfig(configFile)) {
                return {
                    ...configFile,
                    workingDirectory: configFile.cwd,
                }
            }
        }

        return {
            source: options.source,
            destination: options.destination,
            workingDirectory: options.cwd,
        }

    }
}

export default new CommandLineParser()