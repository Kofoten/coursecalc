import { existsSync, readFileSync } from 'fs';
import { Result, success, error } from './utility-types'

interface CourseCollection { [key: string]: number[] };

export const readAndParseFile = (filePath: string): Result<CourseCollection> => {
    if (!existsSync(filePath)) {
        return error(`File '${filePath} could not be found.`);
    }

    const contentString = readFileSync(filePath).toString();
    const courses: CourseCollection = {};
     contentString.split('\n').forEach(line => {
        const columns = line.trim().split('\t');
        const controlsString = columns[columns.length - 1];

        const controls: number[] = [];
        controlsString.split('-').forEach(controlString => {
            const controlNumber = parseInt(controlString, 10);
            if (isFinite(controlNumber)) {
                controls.push(controlNumber);
            }
        });

        courses[columns[0]] = controls;
    })

    return success(courses);
}
