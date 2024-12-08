package zoo.models.animal;

import zoo.enums.Specie;

public class Shark extends Animal{

    public Shark(String name, Specie specie, int age) {
        super(name, specie, age);
    }

    @Override
    public String toString() {
        return "Shark{" +
                "name='" + this.getName() + '\'' +
                ", specie=" + this.getSpecie() +
                ", age=" + this.getAge() +
                '}';
    }
}
