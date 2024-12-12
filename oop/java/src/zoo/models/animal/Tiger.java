package zoo.models.animal;

import zoo.enums.Specie;

public class Tiger extends Animal {

    public Tiger(String name, Specie specie, int age) {
        super(name, specie, age);
    }

    @Override
    public String toString() {
        return "Tiger{" +
                "name='" + this.getName() + '\'' +
                ", specie=" + this.getSpecie() +
                ", age=" + this.getAge() +
                '}';
    }
}
