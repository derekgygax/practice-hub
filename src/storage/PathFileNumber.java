package storage;

public class PathFileNumber {
    String path;
    int numFiles;

    public PathFileNumber(String path, int numFiles) {
        this.path = path;
        this.numFiles = numFiles;
    }

    @Override
    public String toString() {
        return "PathFileNumber{" +
                "path='" + path + '\'' +
                ", numFiles=" + numFiles +
                '}';
    }
}
