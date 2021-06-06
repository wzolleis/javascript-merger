import chalk from 'chalk'
import clear from 'clear'
import figlet from "figlet";
import {consoleLogger} from './common/lib/winston.logger.config'
import CommandLineParser from './common/lib/command.line.parser'

clear();

consoleLogger.info(
    chalk.yellow(
        figlet.textSync('Merge', { horizontalLayout: 'full' })
    )
);

const cliOptions = CommandLineParser.parseArguments(process.argv)

console.log(`source = ${cliOptions.source}, destinations: ${cliOptions.destination.join()}`)
