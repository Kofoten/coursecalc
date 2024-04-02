import { readAndParseFile } from './common/file-reader';
import calculators from './calculators';

enum Option {
    None = 0,
    Require = 1,
}

if (process.argv.length < 3) {
    console.error('Missig required argument: input file');
    process.exit(1);
}

const required: string[] = [];
if (process.argv.length > 3) {
    let currentOption = Option.None;
    for (let i = 3; i < process.argv.length; i++) {
        const currentArgument = process.argv[i];
        if (currentArgument.startsWith('-')) {
            switch (currentArgument) {
                case '-r':
                case '--require':
                    currentOption = Option.Require;
                    break;
                default:
                    break;
            }
        } else {
            switch (currentOption) {
                case Option.Require:
                    required.push(currentArgument);
                    break;
                default:
                    break;
            }
        }
    }
}

const parsingResult = readAndParseFile(process.argv[2]);
if (parsingResult.success === false) {
    console.error(parsingResult.error);
    process.exit(1);
}

const mostUnvisitedResult = calculators.mostVisits(parsingResult.data, required);
if (mostUnvisitedResult.success) {
    console.log(`Most Unvisited: ${mostUnvisitedResult.data.join(', ')}`);
} else {
    console.error(mostUnvisitedResult.error);
    process.exit(2);
}
