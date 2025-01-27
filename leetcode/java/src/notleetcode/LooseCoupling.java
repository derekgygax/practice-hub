package notleetcode;

import java.util.ArrayList;
import java.util.HashMap;

public class LooseCoupling {

    public static void expand() {
        String[] inputs = {
                "CA: N",
                "US: Y",
                "CA.by001: Y",
                "US.by901.mkt901: N",
                "CA.by001.mkt001.st9080: N",
        };

        // then expand so they all have this write up "CA.by001.mkt001.st9080: N",
        // you want to do it by nesting. But HOW!
        // {
        // US: {
        // default: Y,
        // byo009: {
        // default: N,
        // mkt990: {
        // default: N {
        // st9001: Y,
        // st9020: N
        // }
        // }
        // }
        // }
        // }

        HashMap<String, String> defaults = new HashMap<>();
        ArrayList<String> values = new ArrayList<>();
        int storeLevel = 4;

        for (String input : inputs) {
            String[] parts = input.split(":");
            String fullKey = parts[0];
            String[] keys = fullKey.split("\\.");
            String parameterValue = parts[1].trim();

            if (keys.length == storeLevel) {
                values.add(parameterValue);
                continue;
            } else {
                defaults.put(fullKey, parameterValue);
            }
        }
        System.out.println();
        System.out.println(defaults);
    }

    public static void main(String[] args) {
        expand();
    }
}
// Object currentDepth;
// for (int i = 0; i < keys.length; i++) {
// String key = keys[i];
// if (i == storeLevel) {
// Store store;
// currentDepth.put(new Store(key, parameterValue));
// } else if (i == 0) {
// Country country;
// if (countries.containsKey(key)) {
// country = countries.get(key);
// } else {
// country = new Country();
// countries.put(key, country);
// }
// if (keys.length == 1) {
// country.defaultValue = parameterValue;
// }
// currentDepth = country;
// } else if (i == 1) {
// BuyingOffice byo;
// if (currentDepth.containsKey(key)) {
// byo = currentDepth.get(key);
// } else {
// byo = new BuyingOffice();
// currentDepth.put(key, byo);
// }
// if (keys.length == 1) {
// byo.defaultValue = parameterValue;
// }
// currentDepth = byo;
// } else if (i ==2) {
// Market market;
// if (currentDepth.containsKey(key)) {
// market = countries.get(key);
// } else {
// market = new Country();
// market.put(key, market);
// }
// if (keys.length == 1) {
// market.defaultValue = parameterValue;
// }
// currentDepth = market;
// }
// }
//
// }