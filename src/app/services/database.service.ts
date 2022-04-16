import {Injectable} from '@angular/core';
import {Assignment} from "../models/assignments.model";
import {Course} from "../models/courses.model";
import {Note} from "../models/notes.model";
import {Mark} from "../models/marks.model";

declare function openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess): any;

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db: any = null;
  constructor() {
  }
  public initDB(): void {
    if (this.db == null) {
      try {
        this.createDatabase();
        this.createTables();
      } catch (e) {
        console.error("Error in initDB(): " + e);
      }
    }
  }

  getDatabase(): any {
    this.initDB();
    return this.db;
  }
  private static errorHandler(error): any {
    console.error("Error: " + error.message);
  }

  private createDatabase(): void {
    let shortName = "PlannerDB";
    var version = "1.0";
    var displayName = "DB for Angular Planner App";
    var dbSize = 10 * 1024 * 1024;

    this.db = openDatabase(shortName, version, displayName, dbSize, () => {
      console.log("Success: Database created successfully");
    });
  }

  private createTables(): void {

    function txFunction(tx: any): void {
      console.log("Creating Planner's tables...");
      var options = [];
      let sql: string = "CREATE TABLE IF NOT EXISTS courses( " +
        " id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
        " courseName VARCHAR(40) NOT NULL, " +
        " courseCode VARCHAR(10) NOT NULL); ";


      tx.executeSql(sql, options, () => {
        console.log("Success: created courses successfully");
      }, DatabaseService.errorHandler);

      sql = " CREATE TABLE IF NOT EXISTS assignments( " +
        " id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        " courseId INTEGER NOT NULL," +
        " assignmentNumber INTEGER NOT NULL," +
        " title VARCHAR(40)," +
        " dueDate DATETIME NOT NULL," +
        " assignmentFile VARBINARY(1000)," +
        " fileFormatAttr VARCHAR(300)," +
        " fileName VARCHAR(200)," +
        " description VARCHAR(300)," +
        " weight DOUBLE NOT NULL," +
        " isFinished BIT," +
        " FOREIGN KEY (courseId) REFERENCES courses (id) );";

      tx.executeSql(sql, options, () => {
        console.log("Success: created assignments successfully");
      }, DatabaseService.errorHandler);


      sql = " CREATE TABLE IF NOT EXISTS notes(" +
        " id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        " title VARCHAR(40) NOT NULL," +
        " note VARCHAR(200) NOT NULL," +
        " noteFile VARBINARY(1000)," +
        " fileFormatAttr VARCHAR(300)," +
        " fileName VARCHAR(200)," +
        " assignmentId INTEGER NOT NULL," +
        " FOREIGN KEY (assignmentId) REFERENCES assignments (id));";

      tx.executeSql(sql, options, () => {
        console.log("Success: created notes successfully");
      }, DatabaseService.errorHandler);

      sql = " CREATE TABLE IF NOT EXISTS marks(" +
        " id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        " assignmentId INTEGER NOT NULL," +
        " grade DOUBLE NOT NULL," +
        " FOREIGN KEY (assignmentId) REFERENCES assignments (id));";

      tx.executeSql(sql, options, () => {
        console.log("Success: created marks successfully");
      }, DatabaseService.errorHandler);

    }



    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Success: Transaction successful");
    });

  }

  private dropTables(): void{
    function txFunction(tx: any): void {
      console.log("Deleting Planner tables...");
      var options = [];
      let sql: string = "DROP TABLE IF EXISTS courses;";

      tx.executeSql(sql, options, () => {
        console.log("Success: deleted courses successfully");
      }, DatabaseService.errorHandler);

      sql = "DROP TABLE IF EXISTS assignments;";

      tx.executeSql(sql, options, () => {
        console.log("Success: deleted assignments successfully");
      }, DatabaseService.errorHandler);

      sql = "DROP TABLE IF EXISTS notes;";

      tx.executeSql(sql, options, () => {
        console.log("Success: deleted notes successfully");
      }, DatabaseService.errorHandler);

      sql = "DROP TABLE IF EXISTS marks;";

      tx.executeSql(sql, options, () => {
        console.log("Success: deleted marks successfully");
      }, DatabaseService.errorHandler);

    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Success: Transaction successful");
    });
  }

  public clearDB(): void{
    let result = confirm("Do you really want to clear Database?");
    if (result) {
      this.dropTables();
      this.db = null;
      alert("Database cleared");
    }
  }

  public insertAssignment(assignment: Assignment, callback) {
    function txFunction(tx: any): void {
      let sql = "INSERT INTO assignments(courseId, assignmentNumber, title, dueDate, assignmentFile, fileFormatAttr, fileName, description, weight, isFinished) VALUES(?,?,?,?,?,?,?,?,?,?);";
      let options = [assignment.courseId, assignment.assignmentNumber,assignment.title, assignment.dueDate,assignment.assignmentFile, assignment.fileFormatAttr,assignment.fileName, assignment.description,assignment.weight, assignment.isFinished];
      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Success: record added successfully");
    });
  }

  public insertNote(noteItem: Note, callback) {
    function txFunction(tx: any): void {
      let sql = "INSERT INTO notes(title, note, noteFile, fileFormatAttr, fileName, assignmentId) VALUES(?,?,?,?,?,?);";
      let options = [noteItem.title, noteItem.note, noteItem.noteFile, noteItem.fileFormatAttr, noteItem.fileName, noteItem.assignmentId];
      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Success: record added successfully");
    });
  }

  public insertCourse(course: Course, callback) {
    function txFunction(tx: any): void {
      let sql = "INSERT INTO courses(courseName, courseCode) VALUES(?,?);";
      let options = [course.courseName, course.courseCode];
      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Success: record added successfully");
    });
  }

  public insertMarks(mark: Mark, callback) {
    function txFunction(tx: any): void {
      let sql = "INSERT INTO marks(assignmentId, grade) VALUES(?,?);";
      let options = [mark.assignmentId, mark.grade];
      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Success: record added successfully");
    });
  }


  public deleteCourse(course: Course, callback) {
    function txFunction(tx: any): void {
      let result = confirm("Do you really want to clear Database?");
      if (result) {
        let sql = "DELETE FROM courses WHERE id=?;";
        let options = [course.id];
        tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
      }
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Success: delete transaction successful");
    });
  }

  public deleteMark(mark: Mark, callback) {
    function txFunction(tx: any): void {
      let sql = "DELETE FROM marks WHERE id=?;";
      let options = [mark.id];
      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Success: delete transaction successful");
    });
  }
  public deleteAssignment(assignment: Assignment, callback) {
    function txFunction(tx: any): void {
      let sql = "DELETE FROM assignments WHERE id=?;";
      let options = [assignment.id];
      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Success: delete transaction successful");
    });
  }
  public deleteNote(note: Note, callback) {
    function txFunction(tx: any): void {
      let sql = "DELETE FROM notes WHERE id=?;";
      let options = [note.id];
      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Success: delete transaction successful");
    });
  }


  public updateMark(mark: Mark, callback) {
    function txFunction(tx: any): void {
      let sql = "UPDATE marks SET assignmentId=?, grade=? WHERE id=?;";
      let options = [mark.assignmentId, mark.id];
      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Success: update transaction successful");
    });
  }

  public updateCourse(course: Course, callback) {
    function txFunction(tx: any): void {
      let sql = "UPDATE courses SET courseName=?, courseCode=? WHERE id=?;";
      let options = [course.courseName, course.courseCode, course.id];
      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Success: update transaction successful");
    });
  }

  public updateAssignment(assignment: Assignment, callback) {
    function txFunction(tx: any): void {
      let sql = "UPDATE assignments SET courseId=?, assignmentNumber=?, title=?, dueDate=?, assignmentFile=?, fileFormatAttr=?, fileName=?, description=?, weight=?, isFinished=?  WHERE id=?;";
      let options = [assignment.courseId, assignment.assignmentNumber, assignment.title, assignment.dueDate, assignment.assignmentFile, assignment.fileFormatAttr, assignment.fileName, assignment.description, assignment.weight, assignment.isFinished, assignment.id];
      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Success: update transaction successful");
    });
  }

  public updateNote(noteItem: Note, callback) {
    function txFunction(tx: any): void {
      let sql = "UPDATE notes SET title=?, note=?, noteFile=?, fileFormatAttr=?, fileName=?, assignmentId=? WHERE id=?;";
      let options = [noteItem.title, noteItem.note, noteItem.noteFile, noteItem.fileFormatAttr, noteItem.fileName, noteItem.assignmentId, noteItem.id];
      tx.executeSql(sql, options, callback, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Success: update transaction successful");
    });
  }


  public selectMark(id: number): Promise<any> {
    let options = [id];
    let mark: Mark = null;

    return new Promise((resolve, reject) => {
      function txFunction(tx) {
        let sql = "SELECT * FROM marks WHERE id=?;";
        tx.executeSql(sql, options, function (tx, results) {
          if (results.rows.length > 0) {
            let row = results.rows[0];
            let mark = new Mark(row['assignmentId'], row['grade']);
            mark.id = row['id'];
            resolve(mark);
          } else {
            reject("Specific mark not found");
          }
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction,
        DatabaseService.errorHandler, () => {
          console.log("Success: select transaction successful");
        })
    });
  }

  public findMarkByAssignment(id: number): Promise<any> {
    let options = [id];
    let mark: Mark = null;

    return new Promise((resolve, reject) => {
      function txFunction(tx) {
        let sql = "SELECT * FROM marks WHERE assignmentId=?;";
        tx.executeSql(sql, options, function (tx, results) {
          if (results.rows.length > 0) {
            let row = results.rows[0];
            let mark = new Mark(row['assignmentId'], row['grade']);
            mark.id = row['id'];
            resolve(mark);
          } else {
            resolve(undefined);
          }
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction,
          DatabaseService.errorHandler, () => {
            console.log("Success: select transaction successful");
          })
    });
  }

  public selectCourse(id: number): Promise<any> {
    let options = [id];
    let course: Course = null;

    return new Promise((resolve, reject) => {
      function txFunction(tx) {
        let sql = "SELECT * FROM courses WHERE id=?;";
        tx.executeSql(sql, options, function (tx, results) {
          if (results.rows.length > 0) {
            let row = results.rows[0];
            let course = new Course(row['courseName'], row['courseCode']);
            course.id = row['id'];
            resolve(course);
          } else {
            reject("Specific course not found");
          }
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction,
        DatabaseService.errorHandler, () => {
          console.log("Success: select transaction successful");
        })
    });
  }

  public selectNote(id: number): Promise<any> {
    let options = [id];
    let noteItem: Note = null;

    return new Promise((resolve, reject) => {
      function txFunction(tx) {
        let sql = "SELECT * FROM notes WHERE id=?;";
        tx.executeSql(sql, options, function (tx, results) {
          if (results.rows.length > 0) {
            let row = results.rows[0];
            let noteItem = new Note(row['title'], row['note'], row['noteFile'], row['fileFormatAttr'], row['fileName'], row['assignmentId']);
            noteItem.id = row['id'];
            resolve(noteItem);
          } else {
            reject("Specific note not found");
          }
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction,
        DatabaseService.errorHandler, () => {
          console.log("Success: select transaction successful");
        })
    });
  }

  public selectAssignment(id: number): Promise<any> {
    let options = [id];
    let assignment: Assignment = null;

    return new Promise((resolve, reject) => {
      function txFunction(tx) {
        let sql = "SELECT * FROM assignments WHERE id=?;";
        tx.executeSql(sql, options, function (tx, results) {
          if (results.rows.length > 0) {
            let row = results.rows[0];
            let assignment = new Assignment(row['courseId'], row['assignmentNumber'], row['title'], row['dueDate'], row['assignmentFile'], row['fileFormatAttr'], row['fileName'], row['description'], row['weight'], row['isFinished']);
            assignment.id = row['id'];
            resolve(assignment);
          } else {
            reject("Specific assignment not found");
          }
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction,
        DatabaseService.errorHandler, () => {
          console.log("Success: select transaction successful");
        })
    });
  }


  public selectAllCourses(): Promise<any> {
    let options = [];
    let courses: Course[] = [];

    return new Promise((resolve, reject) => {
      function txFunction(tx) {
        let sql = "SELECT * FROM courses;";
        tx.executeSql(sql, options, function (tx, results) {
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              let row = results.rows[i];
              let c = new Course(row['courseName'], row['courseCode']);
              c.id = row['id'];
              courses.push(c);
            }
            resolve(courses);
          } else {
            reject("No courses found");
          }
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction,
        DatabaseService.errorHandler, () => {
          console.log("Success: selectAll transaction successful");
        })
    });
  }


  public selectAllMarks(): Promise<any> {
    let options = [];
    let marks: Mark[] = [];

    return new Promise((resolve, reject) => {
      function txFunction(tx) {
        let sql = "SELECT * FROM marks;";
        tx.executeSql(sql, options, function (tx, results) {
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              let row = results.rows[i];
              let m = new Mark(row['assignmentId'], row['grade']);
              m.id = row['id'];
              marks.push(m);
            }
            resolve(marks);
          } else {
            reject("No marks found");
          }
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction,
        DatabaseService.errorHandler, () => {
          console.log("Success: selectAll transaction successful");
        })
    });
  }


  public selectAllNotes(): Promise<any> {
    let options = [];
    let notes: Note[] = [];

    return new Promise((resolve, reject) => {
      function txFunction(tx) {
        let sql = "SELECT * FROM notes;";
        tx.executeSql(sql, options, function (tx, results) {
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              let row = results.rows[i];
              let n = new Note(row['title'], row['note'], row['noteFile'], row['fileFormatAttr'], row['fileName'], row['assignmentId']);
              n.id = row['id'];
              notes.push(n);
            }
            resolve(notes);
          } else {
            reject("No notes found");
          }
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction,
        DatabaseService.errorHandler, () => {
          console.log("Success: selectAll transaction successful");
        })
    });
  }


  public selectAllAssignments(): Promise<any> {
    let options = [];
    let assignments: Assignment[] = [];

    return new Promise((resolve, reject) => {
      function txFunction(tx) {
        let sql = "SELECT * FROM assignments;";
        tx.executeSql(sql, options, function (tx, results) {
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              let row = results.rows[i];
              let a = new Assignment(row['courseId'], row['assignmentNumber'], row['title'], row['dueDate'], row['assignmentFile'], row['fileFormatAttr'], row['fileName'], row['description'], row['weight'], row['isFinished']);
              a.id = row['id'];
              assignments.push(a);
            }
            resolve(assignments);
          } else {
            reject("No assignments found");
          }
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction,
        DatabaseService.errorHandler, () => {
          console.log("Success: selectAll transaction successful");
        })
    });
  }


  public selectAllAssignmentsByCourse(id: number): Promise<any> {
    let options = [id];
    let assignments: Assignment[] = [];

    return new Promise((resolve, reject) => {
      function txFunction(tx) {
        let sql = "SELECT * FROM assignments WHERE courseId = ?;";
        tx.executeSql(sql, options, function (tx, results) {
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              let row = results.rows[i];
              let a = new Assignment(row['courseId'], row['assignmentNumber'], row['title'], row['dueDate'], row['assignmentFile'], row['fileFormatAttr'], row['fileName'], row['description'], row['weight'], row['isFinished']);
              a.id = row['id'];
              assignments.push(a);
            }
            resolve(assignments);
          } else {
            reject("No assignments found");
          }
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction,
        DatabaseService.errorHandler, () => {
          console.log("Success: selectAll transaction successful");
        })
    });
  }


}
