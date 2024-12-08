package recursion;

public class Main {

    public static void main(String[] args) {
        combineArray();

    }

    private static void combineArray() {
        // Example 1:
        Integer[] example1 = {2, 2, 2, 3, 3, 12, 4, 4, 8, 4, 4};
        // Steps:
        // {2, 2, 2, 3, 3, 12, 4, 4, 8, 4, 4} -> [6, 6, 12, 8, 8, 8] -> [12, 12, 24] -> [24, 24] -> [48]

        // Example 2:
        Integer[] example2 = {1, 1, 1, 1, 2, 2, 2, 3};
        // Steps:
        // {1, 1, 1, 1, 2, 2, 2, 3} -> [4, 6, 3] (does not fully reduce)

        // Example 3:
        Integer[] example3 = {5, 5, 10, 10, 10};
        // Steps:
        // {5, 5, 10, 10, 10} -> [10, 30] -> [40]

        // Example 4:
        Integer[] example4 = {6, 6, 6, 7, 7, 8, 8, 8};
        // Steps:
        // {6, 6, 6, 7, 7, 8, 8, 8} -> [18, 14, 24] (does not fully reduce)

        // Example 5:
        Integer[] example5 = {4, 4, 4, 4, 4, 4, 5};
        // Steps:
        // {4, 4, 4, 4, 4, 4, 5} -> [24,5 ] (stops here)

        Integer[][] inputs = {
            example1, example2, example3, example4, example5
        };

        for (Integer[] input: inputs) {
            CombineArray ca = new CombineArray(input);
            ca.combine();
            System.out.println(ca.getCombined());
        }


    }
}
