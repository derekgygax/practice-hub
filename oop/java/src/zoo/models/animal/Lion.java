package zoo.models.animal;

import zoo.enums.Specie;

public class Lion extends Animal{

    public Lion(String name, Specie specie, int age) {
        super(name, specie, age);
    }

    @Override
    public void makeNoise() {
        System.out.println("ROARRRRR!!!!");
    }

    @Override
    public String toString() {
        return "Lion{" +
                "name='" + this.getName() + '\'' +
                ", specie=" + this.getSpecie() +
                ", age=" + this.getAge() +
                '}';
    }
}
