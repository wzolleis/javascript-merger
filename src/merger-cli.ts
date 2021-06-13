import chalk from 'chalk'
import clear from 'clear'
import figlet from "figlet";
import {consoleLogger} from './common/lib/winston.logger.config'
import CommandLineParser from './common/lib/command.line.parser'
import {pathExists, readFile, writeObjectToFile} from "./common/lib/files";
import {CliOptions, PackageJson} from "./common/common.types";
import mergeService from './merge_modules/services/merge.service'
import {MergeData} from "./merge_modules/merge.modules.types";

const checkArguments = (cliOptions: CliOptions): boolean => {
    let argsValid = true;

    if (!pathExists(cliOptions.workingDirectory)) {
        consoleLogger.error(`invalid working directory ${cliOptions.workingDirectory}`)
        argsValid = false
    }

    if (!pathExists(cliOptions.source)) {
        consoleLogger.error(`invalid source ${cliOptions.workingDirectory}/${cliOptions.source}`)
        argsValid = false
    }

    cliOptions.destination.forEach((destination) => {
        if (!pathExists(destination)) {
            consoleLogger.error(`invalid path ${cliOptions.workingDirectory}/${destination}`)
            argsValid = false
        }
    })

    return argsValid

}

const logResult = (result: MergeData): void => {
    consoleLogger.info(`merged '${result.source.path}' into '${result.destination.path}'`)
}


const start = () => {
    clear();

    consoleLogger.info(
        chalk.yellow(
            figlet.textSync('Merge', {horizontalLayout: 'full'})
        )
    );

    const cliOptions = CommandLineParser.parseArguments(process.argv)
    if (!pathExists(cliOptions.workingDirectory)) {
        consoleLogger.error(`invalid directory ${cliOptions.workingDirectory}`)
        process.exit(-1)
    }

    // Das Arbeitsverzeichnis setzen, alle anderen Pfade sind relativ zu diesem Verzeichnis
    process.chdir(cliOptions.workingDirectory)
    consoleLogger.info(`cwd = ${process.cwd()}`)

    const argsValid = checkArguments(cliOptions)
    if (!argsValid) {
        consoleLogger.error("invalid arguments - exiting...")
        process.exit(-1)
    }

    const {source, destination: destinations} = cliOptions;
    const mergeData = destinations.flatMap(destination => mergeService.createMergeData(source, destination))
    mergeService.mergeAll(mergeData).flatMap(logResult)
}

start()


