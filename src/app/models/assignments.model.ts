export class Assignment {
  id: number = -1;
  courseId: number = -1;
  assignmentNumber: number = 0;
  title: string = "";
  dueDate: string = "";
  assignmentFile: string = "";  //pls check and delete
  fileFormatAttr: string = "";  //pls check and delete
  fileName: string = "";
  description: string = "";
  weight: number = 0; //pls check and delete
  isFinished: boolean = false;  //pls check and delete



  constructor(courseId?: number,
              assignmentNumber?: number,
              title?: string,
              dueDate?: string,
              assignmentFile?: string,
              fileFormatAttr?: string,
              fileName?: string,
              description?: string,
              weight?: number,  //pls check and delete
              isFinished?: boolean) {
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
  getCourseId(){
    return this.courseId;
  }
}
