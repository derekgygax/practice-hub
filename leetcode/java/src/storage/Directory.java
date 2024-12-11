package storage;

import java.util.*;

public class Directory {
    String name;
    HashMap<String, File> files;
    HashMap<String, Directory> directories;

    public Directory(String name) {
        this.name = name;
        this.directories = new HashMap<>();
        this.files = new HashMap<>();
    }

    public void addFullPath(LinkedList<String> filePath) throws Exception {
        String fileName = filePath.removeLast();
        addFile(filePath, new File(fileName));
    }

    public void addFile(LinkedList<String> path, File file) throws Exception {
        if (path.isEmpty()) {
            if (this.files.containsKey(file.name)) {
                throw new Exception("The file already exists");
            } else {
                this.files.put(file.name, file);
            }
        } else {
            String dirName = path.removeFirst();
            Directory dir = null;
            if (this.directories.containsKey(dirName)) {
                dir = this.directories.get(dirName);
            } else {
                dir = new Directory(dirName);
                this.directories.put(dirName, dir);
            }
            dir.addFile(path, file);
        }

    }

    public void deleteFile(LinkedList<String> filePath) throws Exception {
        if (filePath.size() == 1) {
            String fileName = filePath.getFirst();
            if (!this.files.containsKey(fileName)) {
                throw new Exception("Cannot delete the file because it does not exist.");
            }
            this.files.remove(fileName);
        } else {
            String dirName = filePath.removeFirst();
            if (!this.directories.containsKey(dirName)) {
                throw new Exception("The directory " + dirName + " does not exist in the path so we must quit.");
            }
            this.directories.get(dirName).deleteFile(filePath);
        }
    }

    public void copyFile(LinkedList<String> origFilePath, LinkedList<String> newFilePath) throws Exception{
        String newFileName = newFilePath.removeLast();
        File copiedFile = this.getFileCopy(origFilePath, newFileName);
        this.addFile(newFilePath, copiedFile);
    }

    public File getFileCopy(LinkedList<String> filePath, String newName) throws Exception{
        if (filePath.size() == 1) {
            String fileName = filePath.getFirst();
            if (!this.files.containsKey(fileName)) {
                throw new Exception("Cannot copy the file "+fileName+"because it does not exist.");
            }
            File copiedFile = this.files.get(fileName).makeCopy();
            copiedFile.name = newName;
            return copiedFile;
        } else {
            String dirName = filePath.removeFirst();
            if (!this.directories.containsKey(dirName)) {
                throw new Exception("The directory " + dirName + " does not exist in the path so we must quit.");
            }
            return this.directories.get(dirName).getFileCopy(filePath, newName);
        }
    }

    public List<PathFileNumber> getTopDirectories(int numTopDirs) throws Exception {
        List<PathFileNumber> dirFileNumber = new ArrayList<>();
        this.getFileNumberForDirectories("", dirFileNumber);

        dirFileNumber.sort(Comparator.comparingInt((PathFileNumber pn) -> {
            return pn.numFiles;
        }).reversed());

        return dirFileNumber.subList(0, Math.min(numTopDirs, dirFileNumber.size()));
    }

    public void getFileNumberForDirectories(String path, List<PathFileNumber> dirFileNumber) {
        String thisPath = path.isEmpty() ? this.name : path + "/" + this.name;
        dirFileNumber.add(new PathFileNumber(thisPath, this.files.size()));
        for (String dirName: this.directories.keySet()) {
            this.directories.get(dirName).getFileNumberForDirectories(thisPath, dirFileNumber);
        }
    }

}
