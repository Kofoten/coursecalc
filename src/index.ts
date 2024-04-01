import { readAndParseFile } from './common/file-reader';
import calculators from './calculators';

if (process.argv.length < 3) {
    console.error('Missig required argument: input file');
    process.exit(1);
}

const parsingResult = readAndParseFile(process.argv[2]);
if (parsingResult.success === false) {
    console.error(parsingResult.error);
    process.exit(1);
}

const mostUnvisitedResult = calculators.mostVisits(parsingResult.data);

console.log(`Most Unvisited: ${mostUnvisitedResult.join(', ')}`);
