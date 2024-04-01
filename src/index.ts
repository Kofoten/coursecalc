import { readAndParseFile } from './common/file-reader';
import calculators from './calculators';

if (process.argv.length < 3) {
    console.error('Missig required argument: input file');
    process.exit(1);
}

const coursesResult = readAndParseFile(process.argv[2]);
if (coursesResult.success === false) {
    console.error(coursesResult.error);
    process.exit(1);
}

const mostUnvisitedResult = calculators.mostVisits(coursesResult.data);

console.log(`Most Unvisited: ${mostUnvisitedResult.join(', ')}`);
