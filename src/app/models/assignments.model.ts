export class Assignment {
  id: number = -1;
  public courseId: number = -1;
  public assignmentNumber: number = 0;
  public title: string = "";
  public dueDate: string = "";
  public assignmentFile: string = "";  //pls check and delete
  public fileFormatAttr: string = "";  //pls check and delete
  public fileName: string = "";
  public description: string = "";
  public weight: number = 0; //pls check and delete
  public isFinished: number = -1;  //pls check and delete



  constructor(courseId: number,
              assignmentNumber: number,
              title: string,
              dueDate: string,
              assignmentFile?: string,
              fileFormatAttr?: string,
              fileName?: string,
              description?: string,
              weight?: number,  //pls check and delete
              isFinished?: number) {
    this.courseId = courseId;
    this.assignmentNumber = assignmentNumber;
    this.title = title;
    this.dueDate = dueDate;
    this.assignmentFile = assignmentFile;
    this.fileFormatAttr = fileFormatAttr;
    this.fileName = fileName;
    this.description = description;
    this.weight = weight;
    this.isFinished = isFinished;
  }
}
