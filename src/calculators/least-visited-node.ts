import { CourseCollection } from '../common/file-reader';

export const leastVisitedNode = (courses: CourseCollection): string[] => {
    const all = new Set(Object.values(courses).flatMap((course) => course.controls.array));

    return [];
};
