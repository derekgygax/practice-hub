package utils.models;

public class NodeWithRandom {
    public int val;
    public NodeWithRandom next;
    public NodeWithRandom random;
    // This is just for you when you are printing.
    // it is NOT part of the real thing
    public int index;

    public NodeWithRandom(int val, int index) {
        this.val = val;
        this.index = index;
        this.next = null;
        this.random = null;
    }
}
