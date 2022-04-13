export class Course{
  id: number = -1;
  courseName: string = "";
  courseCode: string = "";

  constructor(courseName? : string, courseCode? : string) {
    this.courseName = courseName;
    this.courseCode = courseCode;
  }
}
