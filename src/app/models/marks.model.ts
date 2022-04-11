export class Mark {
  id: number = -1;
  assignmentId: number = -1;
  weight: number = 0;
  grade: number = 0;


  constructor(assignmentId: number,
              weight: number,
              grade: number) {
    this.assignmentId = assignmentId;
    this.weight = weight ;
    this.grade = grade;
  }
}
