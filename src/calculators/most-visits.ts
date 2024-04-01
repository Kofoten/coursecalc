import { CourseCollection } from '../common/file-reader';

export const mostVisits = (courses: CourseCollection): string[] => {
    const remaining = new Set(Object.values(courses).flatMap((course) => course.controls.array));

    const selectedNames: string[] = [];
    while (remaining.size > 0) {
        const coursesEntries = Object.entries(courses);
        const weightedCourses = coursesEntries.map((course) => {
            const weight = course[1].controls.array.reduce((acc, control) => acc + Number(remaining.has(control)), 0);
            return {
                name: course[0],
                controls: course[1].controls,
                weight,
            };
        });

        weightedCourses.sort((a, b) => b.weight - a.weight);
        const heaviestCourse = weightedCourses[0];
        selectedNames.push(heaviestCourse.name);
        heaviestCourse.controls.array.forEach((control) => remaining.delete(control));
        delete courses[heaviestCourse.name];
    }

    return selectedNames;
};
