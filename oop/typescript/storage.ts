export { };
/*
Design a file storage system. It needs to be able to do
-Add file
  -If files already exists it is a problem
-Delete file
  -If file never existed its a problem
-Copy file to new place or stay in same place (new title)
  -If file doesn't exist OR already exists its a problem
-Figure out which directories contain(any n number of directories) the most files (including other directories and non including)

-ex.
  -"file_1", "file_2", "dir_1/file_1", "dir_2/file_1", "dir_1/dir_2/file_1"


Solve in the way you think is best but they are going to want Object Oriented Programming
*/






// By using objects
class Storage {
  public path: string;
  public files: Set<string>;
  public directories: Map<string, Storage>;

  constructor(path: string) {
    this.path = path;
    this.files = new Set<string>();
    this.directories = new Map<string, Storage>();
  }

  addFile(path: string[]): null | -1 {
    if (path.length === 1) {
      if (this.files.has(path[0])) {
        return -1;
      } else {
        this.files.add(path[0]);
        return null;
      }
    } else {
      const dir = path.shift() as string;
      if (!this.directories.has(dir)) {
        this.directories.set(dir, new Storage(`${this.path}/${dir}`));
      }
      return this.directories.get(dir)?.addFile(path) as null | -1;
    }
  }

  deleteFile(path: string[]): null | -1 {
    if (path.length === 1) {
      if (this.files.has(path[0])) {
        this.files.delete(path[0]);
        return null
      } else {
        return -1;
      }
    } else {
      const dir = path.shift() as string;
      if (!this.directories.has(dir)) {
        return -1;
      }
      return this.directories.get(dir)?.deleteFile(path) as null | -1;
    }
  }


  // TODO ADD THIS
  deleteDirectory(path: string[]): null | -1 {
    if (path.length === 0) {
      this.files.clear();
      if (this.directories.size !== 0) {
        for (const dirName of this.directories.keys()) {
          this.directories.get(dirName)?.deleteDirectory([]);
          this.directories.delete(dirName);
        }
        return null;
      } else {
        return null;
      }
    } else {
      const dir = path.shift() as string;
      if (this.directories.has(dir)) {
        const deletedContents = this.directories.get(dir)?.deleteDirectory(path) as null | -1;
        if (deletedContents === null && path.length === 0) {
          this.directories.delete(dir);
        }
        return deletedContents;
      } else {
        return -1
      }
    }
  }

  fileExists(path: string[]): null | -1 {
    if (path.length === 1) {
      if (this.files.has(path[0])) {
        return null;
      } else {
        return -1;
      }
    } else {
      const dir = path.shift() as string;
      if (!this.directories.has(dir)) {
        return -1;
      }
      return this.directories.get(dir)?.fileExists(path) as null | -1;
    }
  }

  // This is a weird one because you aren't copying anything you think
  // it depends on how it wants to do it. Like is it providing you the name it
  // wants, how deep is it going, all of that
  copyFile(fromPath: string[], toPath: string[]): null | -1 {
    const exists: null | -1 = this.fileExists(fromPath);
    if (exists == -1) {
      return -1;
    }
    return this.addFile(toPath);
  }

  getNumFiles(acc: { path: string, numFiles: number }[]) {
    acc.push({
      path: this.path,
      numFiles: this.files.size
    })
    for (const dir of this.directories.keys()) {
      this.directories.get(dir)?.getNumFiles(acc);
    }
  }

  getTop(n: number): { path: string, numFiles: number }[] {
    const pathNumFiles: { path: string, numFiles: number }[] = [];
    this.getNumFiles(pathNumFiles);
    pathNumFiles.sort((a, b) => {
      if (a.numFiles === b.numFiles) {
        a.path.localeCompare(b.path);
      }
      return b.numFiles - a.numFiles
    });
    return pathNumFiles.slice(0, n);
  }


}


const inputs: string[][] = [
  ["ADD_FILE", "file_1"],  // Success
  ["ADD_FILE", "file_2"],  // Success
  ["ADD_FILE", "dir_1/file_1"],  // Success
  ["ADD_FILE", "dir_2/file_1"],  // Success
  ["ADD_FILE", "dir_1/dir_2/file_1"],  // Success
  ["ADD_FILE", "file_2"],  // Error: file already exists
  ["DELETE_FILE", "file_3"],  // Error: file never existed
  ["COPY_FILE", "file_1", "dir_1/file_1_copy"],  // Success
  ["COPY_FILE", "file_3", "dir_1/file_3_copy"],  // Error: file doesn't exist
  ["COPY_FILE", "file_1", "dir_1/file_1_copy"],  // Error: file already exists
  ["DELETE_FILE", "file_2"],  // Success
  ["COPY_FILE", "file_1", "dir_2/file_1_copy"],  // Success
  ["DELETE_FILE", "dir_2/file_1"],  // Success
  ["ADD_FILE", "dir_3/file_3"],  // Success
  ["COPY_FILE", "dir_3/file_3", "file_3_copy"],  // Success
  ["DELETE_FILE", "dir_1/dir_2/file_1"],  // Success
  ["ADD_FILE", "dir_4/file_4"],  // Success
  ["COPY_FILE", "file_1", "dir_4/file_1_copy"],  // Success
  ["ADD_FILE", "dir_1/dir_3/file_4"],  // Success
  ["DELETE_FILE", "dir_3/file_3"],  // Success
  ["ADD_FILE", "dir_1/dir_2/dir_3/file_5"],  // Success
  ["COPY_FILE", "dir_1/dir_3/file_4", "dir_2/dir_3/file_4_copy"],  // Success
  ["DELETE_FILE", "file_3_copy"],  // Success
  ["ADD_FILE", "dir_4/dir_5/file_6"],  // Success
  ["COPY_FILE", "dir_4/dir_5/file_6", "dir_4/file_6_copy"],  // Success
  ["ADD_FILE", "file_7"],  // Success
  ["DELETE_FILE", "file_7"],  // Success
  ["ADD_FILE", "dir_6/file_8"],  // Success
  ["COPY_FILE", "dir_6/file_8", "file_8_copy"],  // Success
  ["ADD_FILE", "dir_1/dir_2/file_9"],  // Success
  ["DELETE_FILE", "dir_1/file_1_copy"],  // Success
  ["ADD_FILE", "dir_1/file_10"],  // Success
  ["DELETE_FILE", "dir_2/dir_3/file_4_copy"],  // Success
  ["COPY_FILE", "dir_1/file_10", "dir_1/file_10_copy"],  // Success
  ["ADD_FILE", "dir_1/dir_4/file_11"],  // Success
  ["COPY_FILE", "dir_1/dir_4/file_11", "dir_5/file_11_copy"],  // Success
  ["ADD_FILE", "dir_1/dir_5/file_12"],  // Success
  ["DELETE_FILE", "file_8_copy"],  // Success
  ["COPY_FILE", "dir_6/file_8", "dir_6/file_8_copy"],  // Success
  ["ADD_FILE", "dir_4/file_13"],  // Success
  ["DELETE_FILE", "dir_1/dir_5/file_12"],  // Success
  ["ADD_FILE", "file_14"],  // Success
  ["ADD_FILE", "dir_7/file_15"],  // Success
  ["COPY_FILE", "dir_7/file_15", "file_15_copy"],  // Success
  ["DELETE_FILE", "dir_4/file_4"],  // Success
  ["ADD_FILE", "dir_7/dir_8/file_16"],  // Success
  ["DELETE_FILE", "dir_6/file_8_copy"],  // Success
  ["COPY_FILE", "dir_1/file_10_copy", "dir_3/file_10_copy"],  // Success
  ["ADD_FILE", "dir_8/file_17"],  // Success
  ["COPY_FILE", "file_14", "dir_1/dir_9/file_14_copy"],  // Success
  ["ADD_FILE", "dir_2/dir_3/file_18"],  // Success
  ["DELETE_FILE", "dir_1/file_10_copy"],  // Success
  ["COPY_FILE", "dir_1/file_10", "file_10_copy_2"],  // Success
  ["TOP_DIRECTORIES", "5"]  // Example expected result: ["dir_1", "dir_4", "dir_3", "dir_2", "dir_8"]
];



const storage = new Storage("");
inputs.forEach((input: string[], index: number) => {
  if (input[0] === "ADD_FILE") {
    const fileAdded = storage.addFile(input[1].split('/'));
    if (fileAdded === -1) {
      console.log(`The file ${input[1]} could not be added.`);
    }
  } else if (input[0] === "DELETE_FILE") {
    const fileRemoved = storage.deleteFile(input[1].split('/'));
    if (fileRemoved === -1) {
      console.log(`Error when trying to delete the file ${input[1]} at index ${index}`)
    }
  } else if (input[0] === "COPY_FILE") {
    const succeed = storage.copyFile(input[1].split('/'), input[2].split('/'));
    if (succeed === -1) {
      console.log(`The copy from ${input[1]} to ${input[2]} could not happen.`)
    }
  } else if (input[0] === "TOP_DIRECTORIES") {
    console.log(storage.getTop(Number(input[1])));
  }
})

// console.log(storage);
