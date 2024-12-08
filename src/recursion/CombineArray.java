package recursion;

import java.util.ArrayList;
import java.util.Arrays;

//This took you wayyy too long to recreate.
//you fucked up and shit along the way.
//you doubt yourself now

public class CombineArray {
    private Integer[] nums;
    private ArrayList<Integer> combined;

    public CombineArray(Integer[] nums) {
        this.nums = nums;
    }

    public ArrayList<Integer> getCombined() {
        return this.combined;
    }

    public void combine() {
        this.combined = this.combine(new ArrayList<>(Arrays.asList(this.nums)));
    }

    public ArrayList<Integer> combine(ArrayList<Integer> numbers) {
        ArrayList<Integer> putTogether = new ArrayList<>();
        Integer numOn = null;
        Integer total = null;
        boolean combinedSomething = false;
        for (int i = 0; i < numbers.size(); i++) {
            Integer thisNum = numbers.get(i);
            if (i == 0) {
                numOn = thisNum;
                total = thisNum;
                continue;
            }
            if (numOn.equals(thisNum)) {
                total += thisNum;
                combinedSomething = true;
                continue;
            } else {
                putTogether.add(total);
                numOn = thisNum;
                total = thisNum;
            }
        }
        putTogether.add(total);
        if (combinedSomething) {
            return this.combine(putTogether);
        } {
            return numbers;
        }

    }

}
