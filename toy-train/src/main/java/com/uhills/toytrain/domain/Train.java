package com.uhills.toytrain.domain;

import java.util.Deque;
import java.util.LinkedList;

/**
 * Domain object for a train.  Essentially, this consists of
 * a linked list of train cars.
 *
 */
public class Train {
    private Deque<TrainCar> cars;

    public Deque<TrainCar> getCars() {
        return cars;
    }

    public void setCars(Deque<TrainCar> cars) {
        this.cars = cars;
    }

    /**
     * Initialize our linked list of train cars
     */
    public Train() {
        cars = new LinkedList<TrainCar>();
    }

    /**
     * Adds a new train car to the end of the train.
     *
     * @param newCar
     */
    public void addCar(TrainCar newCar) {
        cars.addLast(newCar);
    }

    /**
     * The Locomotive (or "Engine") should be added to the
     * front of the train by default.
     *
     * @param newCar
     */
    public void addLocomotive(Locomotive locomotive) {
        cars.addFirst(locomotive);
    }
}
