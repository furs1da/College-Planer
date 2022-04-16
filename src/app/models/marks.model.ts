export class Mark {
  id: number = -1;
  assignmentId: number = -1;
  grade: number = 0;


  constructor(assignmentId?: number,
              grade?: number) {
    this.assignmentId = assignmentId;
    this.grade = grade;
  }
}
