
"""
Design a file storage system. It needs to be able to do
-Add file
  -If files already exists it is a problem
-Delete file
  -If file never existed its a problem
-Copy file to new place or stay in same place (new title)
  -If file doesn't exist OR already exists its a problem
-Figure out which directories contain(any n number of directories) the most files (ONLY files, not if they contain directories)
-Format of string printed out for the directories with the most files:  USE __repr__
    Directory_path (number files)


Solve in the way you think is best but they are going to want Object Oriented Programming
"""

# inputs
# -ADD_FILE, file_path
# -DELETE_FILE, file_path
# -COPY_FILE, source_file_path, destination_file_path
# -TOP_DIRECTORIES, count

# All the transactions need to be able to run. As in one input can have an error and stop and then the next one runs.


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
