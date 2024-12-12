import os
from pathlib import Path

"""
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
"""



class Directory:

  def __init__(self, path) -> None:
    self.path = path
    self.files = set()
    self.directories = {}

  def add_file(self, paths):
    if (len(paths) == 1):
      file = paths[0]
      if (file in self.files):
        raise Exception(f"The file {file} already exists")
      self.files.add(file)
    else:
      dir = paths.pop(0)
      if (dir not in self.directories):
        self.directories[dir] = Directory(dir)
      self.directories[dir].add_file(paths)

  def delete_file(self, paths):
    if (len(paths) == 1):
      file = paths[0]
      if (file not in self.files):
        raise Exception(f"The file you want to delete {file} does not exist.")
      self.files.remove(file)
    else:
      dir = paths.pop(0)
      if (dir not in self.directories):
        raise Exception(f"The directory {dir} does not exist so the file {paths[len(paths) - 1]} cannot be removed")
      self.directories[dir].delete_file(paths)

  def does_file_exist(self, paths) -> bool:
    if (len(paths) == 1):
      file = paths[0]
      if (file not in self.files):
        return False
      else:
        return True
    else:
      dir = paths.pop(0)
      if (dir not in self.directories):
        return False
      return self.directories[dir].does_file_exist(paths)
    
  def fill_num_files(self, acc, path):
    acc[path] = len(self.files)
    for dir_name in self.directories:
      self.directories[dir_name].fill_num_files(acc, path / dir_name)



  def __repr__(self) -> str:
    return f"path={self.path} dirs={','.join(self.directories.keys())} files={','.join(self.files)}"


class System(Directory):
  def __init__(self, path):
    super().__init__(path)

  def add_file(self, path: str):
    paths = path.split('/')
    super().add_file(paths)

  def delete_file(self, path:str):
    paths = path.split("/")
    super().delete_file(paths)

  def copy_file(self, path1:str, path2: str):
    # It does depend here is the copy is just a path or has teh file name
    paths1 = path1.split("/")
    if not self.does_file_exist(paths1):
      raise Exception(f"The file {paths1[len(paths1) - 1]} does not exist AND SO NO COPY!")
    paths2 = path2.split("/")
    if self.does_file_exist(paths2):
      raise Exception(f"The file {paths2[len(paths2) - 1]} ALREADY EXISTS")
    self.add_file(path2)

  def top_dir(self, n):
    top = {}
    self.fill_num_files(top, Path(""))
    return sorted(top.items(), key=lambda x: (-x[1], x[0]))[:n]




inputs = [
  ["ADD_FILE", "file_1"],  # Success
  ["ADD_FILE", "file_2"],  # Success
  ["ADD_FILE", "dir_1/file_1"],  # Success
  ["ADD_FILE", "dir_2/file_1"],  # Success
  ["ADD_FILE", "dir_1/dir_2/file_1"],  # Success
  ["ADD_FILE", "file_2"],  # Error: file already exists
  ["DELETE_FILE", "file_3"],  # Error: file never existed
  ["COPY_FILE", "file_1", "dir_1/file_1_copy"],  # Success
  ["COPY_FILE", "file_3", "dir_1/file_3_copy"],  # Error: file doesn't exist
  ["COPY_FILE", "file_1", "dir_1/file_1_copy"],  # Error: file already exists
  ["DELETE_FILE", "file_2"],  # Success
  ["COPY_FILE", "file_1", "dir_2/file_1_copy"],  # Success
  ["DELETE_FILE", "dir_2/file_1"],  # Success
  ["ADD_FILE", "dir_3/file_3"],  # Success
  ["COPY_FILE", "dir_3/file_3", "file_3_copy"],  # Success
  ["DELETE_FILE", "dir_1/dir_2/file_1"],  # Success
  ["ADD_FILE", "dir_4/file_4"],  # Success
  ["COPY_FILE", "file_1", "dir_4/file_1_copy"],  # Success
  ["ADD_FILE", "dir_1/dir_3/file_4"],  # Success
  ["DELETE_FILE", "dir_3/file_3"],  # Success
  ["ADD_FILE", "dir_1/dir_2/dir_3/file_5"],  # Success
  ["COPY_FILE", "dir_1/dir_3/file_4", "dir_2/dir_3/file_4_copy"],  # Success
  ["DELETE_FILE", "file_3_copy"],  # Success
  ["ADD_FILE", "dir_4/dir_5/file_6"],  # Success
  ["COPY_FILE", "dir_4/dir_5/file_6", "dir_4/file_6_copy"],  # Success
  ["ADD_FILE", "file_7"],  # Success
  ["DELETE_FILE", "file_7"],  # Success
  ["ADD_FILE", "dir_6/file_8"],  # Success
  ["COPY_FILE", "dir_6/file_8", "file_8_copy"],  # Success
  ["ADD_FILE", "dir_1/dir_2/file_9"],  # Success
  ["DELETE_FILE", "dir_1/file_1_copy"],  # Success
  ["ADD_FILE", "dir_1/file_10"],  # Success
  ["DELETE_FILE", "dir_2/dir_3/file_4_copy"],  # Success
  ["COPY_FILE", "dir_1/file_10", "dir_1/file_10_copy"],  # Success
  ["ADD_FILE", "dir_1/dir_4/file_11"],  # Success
  ["COPY_FILE", "dir_1/dir_4/file_11", "dir_5/file_11_copy"],  # Success
  ["ADD_FILE", "dir_1/dir_5/file_12"],  # Success
  ["DELETE_FILE", "file_8_copy"],  # Success
  ["COPY_FILE", "dir_6/file_8", "dir_6/file_8_copy"],  # Success
  ["ADD_FILE", "dir_4/file_13"],  # Success
  ["DELETE_FILE", "dir_1/dir_5/file_12"],  # Success
  ["ADD_FILE", "file_14"],  # Success
  ["ADD_FILE", "dir_7/file_15"],  # Success
  ["COPY_FILE", "dir_7/file_15", "file_15_copy"],  # Success
  ["DELETE_FILE", "dir_4/file_4"],  # Success
  ["ADD_FILE", "dir_7/dir_8/file_16"],  # Success
  ["DELETE_FILE", "dir_6/file_8_copy"],  # Success
  ["COPY_FILE", "dir_1/file_10_copy", "dir_3/file_10_copy"],  # Success
  ["ADD_FILE", "dir_8/file_17"],  # Success
  ["COPY_FILE", "file_14", "dir_1/dir_9/file_14_copy"],  # Success
  ["ADD_FILE", "dir_2/dir_3/file_18"],  # Success
  ["DELETE_FILE", "dir_1/file_10_copy"],  # Success
  ["COPY_FILE", "dir_1/file_10", "file_10_copy_2"],  # Success
  ["TOP_DIRECTORIES", 5]  # Example expected result: ["dir_1", "dir_4", "dir_3", "dir_2", "dir_8"]
]

system = System("")

if __name__ == "__main__":
  for index, input in enumerate(inputs):
    try:
      if (input[0] == "ADD_FILE"):
        system.add_file(input[1])
      elif (input[0] == "DELETE_FILE"):
        system.delete_file(input[1])
      elif (input[0] == "COPY_FILE"):
        system.copy_file(input[1], input[2])
      elif (input[0] == "TOP_DIRECTORIES"):
        print(system.top_dir(input[1]))
    except Exception as e:
      print(e, index)