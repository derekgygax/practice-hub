//package home.depot;
//
//import java.math.BigInteger;
//import java.util.HashMap;
//import java.util.Map;
//import java.util.stream.Collectors;
//
//public class Main {
//    public static void main(String[] args) {
//        Processor p = new Processor("87D9AC62");
//        try {
//            while (!p.process().equals("FINISHED")) {
//                // Do nothing
//            }
//        } catch (Exception e) {
//            System.out.println("Invalid State");
//        }
//        System.out.println(p.getResult());
//    }
//}
//
///////////////////////////////////////////////////////////
//
//public interface Command {
//    <T> T execute();
//    <T> void setContext(T context);
//}
//
//
///////////////////////////////////////////////////////////
//
//public final class CommandFactory {
//    public enum Type {
//        SCRAMBLE_HEX,
//        UNSCRAMBLE_HEX
//    }
//
//    private static CommandFactory instance = new CommandFactory();
//    private Map<Type, Command> map = new HashMap<>();
//
//    private CommandFactory() {
//        map.put(Type.SCRAMBLE_HEX, new CommandScrambleHex());
//        map.put(Type.UNSCRAMBLE_HEX, new CommandUnscrambleHex());
//    };
//
//    public static synchronized CommandFactory getInstance() {
//        return instance;
//    }
//
//    Command getCommand(Type type) {
//        return map.get(type);
//    }
//}
//
//
///////////////////////////////////////////////////////////
//
//public class CommandScrambleHex implements Command {
//    private String hexString;
//    private Map<Character, Character> map = new HashMap<>();
//
//    {
//        map.put('0', 'D');
//        map.put('1', 'F');
//        map.put('2', '4');
//        map.put('3', '7');
//        map.put('4', '0');
//        map.put('5', '9');
//        map.put('6', '1');
//        map.put('7', '5');
//        map.put('8', '6');
//        map.put('9', 'B');
//        map.put('A', 'C');
//        map.put('B', '8');
//        map.put('C', 'A');
//        map.put('D', '2');
//        map.put('E', '3');
//        map.put('F', 'E');
//    }
//
//    public CommandScrambleHex() {}
//
//    @Override
//    public <T> void setContext(T s) {
//        hexString = s.toString();
//    }
//
//    @Override
//    public String execute() {
//        return hexString.toUpperCase()
//                .codePoints()
//                .mapToObj(pt -> {map.get((char)pt).toString()).collect(Collectors.joining());
//    }
//}
//
//
///////////////////////////////////////////////////////////
//
//public class CommandUnscrambleHex implements Command {
//    private String hexString;
//    private Map<Character, Character> map = new HashMap<>();
//
//    {
//        map.put('D', '0');
//        map.put('F', '1');
//        map.put('4', '2');
//        map.put('7', '3');
//        map.put('0', '4');
//        map.put('9', '5');
//        map.put('1', '6');
//        map.put('5', '7');
//        map.put('6', '8');
//        map.put('B', '9');
//        map.put('C', 'A');
//        map.put('8', 'B');
//        map.put('A', 'C');
//        map.put('2', 'D');
//        map.put('3', 'E');
//        map.put('E', 'F');
//    }
//
//    public CommandUnscrambleHex() {}
//
//    @Override
//    public <T> void setContext(T s) {
//        hexString = s.toString();
//    }
//
//    @Override
//    public String execute() {
//        return hexString.toUpperCase().codePoints().mapToObj(pt -> map.get((char)pt).toString()).collect(Collectors.joining());
//    }
//}
//
//
///////////////////////////////////////////////////////////
//
//public class Processor {
//    private String s;
//    private String v;
//    private String state;
//
//    public Processor(String hexStr) {
//        s = hexStr;
//        state = "INITIAL";
//    }
//
//    private static String hexToBin(String hex) {
//        String binStr = new BigInteger(hex, 16).toString(2);
//        while (binStr.length() < 24) {
//            binStr = '0' + binStr;
//        }
//        return binStr;
//    }
//
//    private static String binToHex(String bin) {
//        String hexStr = new BigInteger(bin, 2).toString(16);
//        while (hexStr.length() < 6) {
//            hexStr = '0' + hexStr;
//        }
//        return hexStr;
//    }
//
//    public String process() throws Exception {
//        Command cmd_unscramble_hex = CommandFactory.getInstance().getCommand(CommandFactory.Type.UNSCRAMBLE_HEX);
//        Command cmdScrambleHex = CommandFactory.getInstance().getCommand(CommandFactory.Type.SCRAMBLE_HEX);
//        switch(state) {
//            case "BINARY":
//                s = (
//                        "" + s.charAt(10) + s.charAt(11) + s.charAt(12) + s.charAt(13) +
//                                s.charAt(18) + s.charAt(19) + s.charAt(20) + s.charAt(21) +
//                                s.charAt(0) + s.charAt(1) + s.charAt(2) + s.charAt(3) +
//                                s.charAt(22) + s.charAt(23) + s.charAt(8) + s.charAt(9) +
//                                s.charAt(4) + s.charAt(5) + s.charAt(6) + s.charAt(7) +
//                                s.charAt(14) + s.charAt(15) + s.charAt(16) + s.charAt(17)
//                );
//                state = "UNSCRAMBLED_BINARY";
//                return state;
//            case "INCREMENTED_BINARY":
//                s = (
//                        "" + s.charAt(8) + s.charAt(9) + s.charAt(10) + s.charAt(11) +
//                                s.charAt(16) + s.charAt(17) + s.charAt(18) + s.charAt(19) +
//                                s.charAt(14) + s.charAt(15) + s.charAt(0) + s.charAt(1) +
//                                s.charAt(2) + s.charAt(3) + s.charAt(20) + s.charAt(21) +
//                                s.charAt(22) + s.charAt(23) + s.charAt(4) + s.charAt(5) +
//                                s.charAt(6) + s.charAt(7) + s.charAt(12) + s.charAt(13)
//                );
//                state = "SCRAMBLED_BINARY";
//                return state;
//            case "INCREMENTED_HEX":
//                s = hexToBin(s);
//                state = "INCREMENTED_BINARY";
//                return state;
//            case "INITIAL":
//                cmd_unscramble_hex.setContext(s);
//                s = cmd_unscramble_hex.execute();
//                state = "UNSCRAMBLED_HEX";
//                return state;
//            case "SCRAMBLED_BINARY":
//                cmdScrambleHex.setContext(v + binToHex(s));
//                s = cmdScrambleHex.execute();
//                state = "FINISHED";
//                return state;
//            case "UNSCRAMBLED_BINARY":
//                s = new BigInteger(binToHex(s), 16).add(new BigInteger("1")).toString(16);
//                state = "INCREMENTED_HEX";
//                return state;
//            case "UNSCRAMBLED_HEX":
//                v = s.substring(0, 2);
//                s = hexToBin(s.substring(2));
//                state = "BINARY";
//                return state;
//            default:
//                throw new Exception("Invalid State");
//        }
//    }
//    public String getResult() {
//        return s;
//    }
//}