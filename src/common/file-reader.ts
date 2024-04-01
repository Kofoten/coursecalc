import { existsSync, readFileSync } from 'fs';
import { Result, success, error } from './result';

export interface Controls {
    set: Set<number>;
    array: number[];
}

export interface Course {
    name: string;
    controls: Controls;
}

export interface CourseCollection {
    [key: string]: Course;
}

export const readAndParseFile = (filePath: string): Result<CourseCollection> => {
    if (!existsSync(filePath)) {
        return error(`File '${filePath} could not be found.`);
    }

    const data = readFileSync(filePath, { encoding: 'utf8' });
    const courses: CourseCollection = {};

    let buffer: string = '';
    let course: Course = emptyCourse();
    for (let i = 0; i < data.length; i++) {
        if (data[i] === '\r') {
            continue;
        }

        if (data[i] === '\t') {
            if (course.name === '') {
                course.name = buffer;
            }

            buffer = '';
            continue;
        } else if (data[i] === '\n') {
            const controls = buffer
                .split('-')
                .map((x) => parseInt(x, 10))
                .filter((x) => isFinite(x));

            course.controls = {
                set: new Set(controls),
                array: controls,
            };

            courses[course.name] = course;
            course = emptyCourse();
            buffer = '';
            continue;
        }

        buffer += data[i];
    }

    return success(courses);
};

const emptyCourse = (): Course => ({
    name: '',
    controls: {
        set: new Set<number>(),
        array: [],
    },
});
