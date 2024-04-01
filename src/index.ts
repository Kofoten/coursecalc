import { readAndParseFile } from './file-parser';

if (process.argv.length < 3) {
    console.error("Missig required argument: input file");
    process.exit(1);
}

const coursesResult = readAndParseFile(process.argv[2]);
if (coursesResult.success === false) {
    console.error(coursesResult.error);
    process.exit(1);
}

const courses = coursesResult.data;
const remaining = Object.values(courses)
    .reduce((acc, course) => {
        course.forEach(control => {
            acc.add(control);
        });

        return acc;
    }, new Set<number>());

const selectedNames: string[] = [
    'Bana 10',
    'Bana 9',
];

const course10 = courses['Bana 10'];
const course9 = courses['Bana 9'];

course10.forEach(control => remaining.delete(control));
course9.forEach(control => remaining.delete(control));

delete courses['Bana 10'];
delete courses['Bana 9'];

while (remaining.size > 0) {
    const weightedCourses = Object.entries(courses).map(course => {
        const weight = course[1].reduce((acc, control) => acc + Number(remaining.has(control)), 0);
        return {
            name: course[0],
            controls: course[1],
            weight,
        };
    });

    weightedCourses.sort((a, b) => b.weight - a.weight)
    const heaviestCourse = weightedCourses[0];
    selectedNames.push(heaviestCourse.name);
    heaviestCourse.controls.forEach(control => remaining.delete(control));
    delete courses[heaviestCourse.name];
}

console.log(selectedNames);
