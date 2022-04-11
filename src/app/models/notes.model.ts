export class Note {
  id: number = -1;
  title: string = "";
  note: string = "";
  noteFile: string = "";
  fileFormatAttr: string = "";
  fileName: string = "";
  assignmentId: number = -1;


  constructor(title: string,
              note: string,
              noteFile?: string,
              fileFormatAttr?: string,
              fileName?: string,  //pls check and delete
              assignmentId?: number  ) {//pls check and delete
    this.title = title;
    this.note = note ;
    this.noteFile = noteFile;
    this.fileFormatAttr = fileFormatAttr;
    this.fileName = fileName;
    this.assignmentId = assignmentId;
  }
}
