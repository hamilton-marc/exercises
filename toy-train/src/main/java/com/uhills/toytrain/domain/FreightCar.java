package com.uhills.toytrain.domain;

/**
 * A FreightCar is a type of Car. As the name suggests, it
 * is used to transport freight and cargo.
 * 
 * For a FreightCar, the capacity is the amount of weight
 * it can hold.
 *
 */
public class FreightCar extends TrainCar {

    @Override
    public long getWeight() {
        // TODO Auto-generated method stub
        return 0;
    }

    @Override
    public String toString() {
        return "FreightCar";
    }
}
