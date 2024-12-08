package zoo.models.animal;

import zoo.enums.Specie;

public class Seal extends Animal {

    public Seal(String name, Specie specie, int age) {
        super(name, specie, age);
    }

    @Override
    public String toString() {
        return "Seal{" +
                "name='" + this.getName() + '\'' +
                ", specie=" + this.getSpecie() +
                ", age=" + this.getAge() +
                '}';
    }
}
