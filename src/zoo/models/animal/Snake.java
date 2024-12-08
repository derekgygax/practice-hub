package zoo.models.animal;

import zoo.enums.Specie;

public class Snake extends Animal{
    public Snake(String name, Specie specie, int age) {
        super(name, specie, age);
    }

    public void makeNoise() {
        System.out.println("CRRRAAAWWWLLL");
    }

    @Override
    public String toString() {
        return "Snake{" +
                "name='" + this.getName() + '\'' +
                ", specie=" + this.getSpecie() +
                ", age=" + this.getAge() +
                '}';
    }
}
