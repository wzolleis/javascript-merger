import chalk from 'chalk'
import clear from 'clear'
import figlet from "figlet";
import {consoleLogger} from './common/lib/winston.logger.config'
import CommandLineParser from './common/lib/command.line.parser'
import {pathExists, readFile, writeObjectToFile} from "./common/lib/files";
import {CliOptions, PackageJson} from "./common/common.types";
import mergeService from './merge_modules/services/merge.service'

const checkArguments = (cliOptions: CliOptions): boolean => {
    let argsValid = true;

    if (!pathExists(cliOptions.source)) {
        consoleLogger.error(`invalid source ${cliOptions.source}`)
        argsValid = false
    }

    cliOptions.destination.forEach((destination) => {
        if (!pathExists(destination)) {
            consoleLogger.error(`invalid path ${destination}`)
            argsValid = false
        }
    })

    return argsValid

}


const start = () => {
    clear();

    consoleLogger.info(
        chalk.yellow(
            figlet.textSync('Merge', {horizontalLayout: 'full'})
        )
    );

    const cliOptions = CommandLineParser.parseArguments(process.argv)
    consoleLogger.info(`source = ${cliOptions.source}, destinations: ${cliOptions.destination.join()}`)

    const argsValid = checkArguments(cliOptions)
    if (!argsValid) {
        consoleLogger.error("invalid arguements - exiting...")
        process.exit(-1)
    }


    const {source, destination} = cliOptions;
    const sourceObj: PackageJson = readFile(source)
    destination.forEach(file => {
        const destinationData = readFile(file)
        const mergeResult = mergeService.merge(sourceObj, destinationData)
        writeObjectToFile(file, mergeResult)
    })
}

start()


