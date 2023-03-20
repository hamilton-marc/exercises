package com.uhills.toytrain.domain;

/**
 * PassengerCar is a type of Car. As the name suggests, it
 * holds passengers.
 * 
 * For a passenger car, capacity = the number of passengers it can hold.
 *
 */
public class PassengerCar extends TrainCar {

    @Override
    public long getWeight() {
        // TODO Auto-generated method stub
        return 0;
    }

    @Override
    public String toString() {
        return "PassengerCar";
    }
}
