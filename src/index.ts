import { readAndParseFile } from './common/file-reader';
import calculators from './calculators';
import { getAndParseArguments } from './common/argument-parser';

const optionsResult = getAndParseArguments();
if (optionsResult.success === false) {
    console.error(optionsResult.error);
    process.exit(1);
}

const options = optionsResult.data;
const parsingResult = readAndParseFile(options.filePath);
if (parsingResult.success === false) {
    console.error(parsingResult.error);
    process.exit(2);
}

const mostUnvisitedResult = calculators.mostVisits(parsingResult.data, options.require);
if (mostUnvisitedResult.success) {
    console.log(`Most Unvisited: ${mostUnvisitedResult.data.join(', ')}`);
} else {
    console.error(mostUnvisitedResult.error);
    process.exit(3);
}
