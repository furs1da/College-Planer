export class Mark {
  id: number = -1;
  assignmentId: number = -1;
  weight: number = 0;


  constructor(assignmentId: number,
              weight: number) {
    this.assignmentId = assignmentId;
    this.weight = weight ;
  }
}
