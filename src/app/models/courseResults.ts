export class CourseResults{
  achieved: number = 0;
  average: number = 0;


  constructor(achieved? : number, average? : number) {
    this.achieved = achieved;
    this.average = average;
  }
}
