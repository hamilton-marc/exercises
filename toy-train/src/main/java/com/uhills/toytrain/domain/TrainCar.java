package com.uhills.toytrain.domain;

/**
 * Superclass for the different types of TrainCars.
 *
 */
public abstract class TrainCar {

    /** capacity will mean different things to different types of cars */
    protected long capacity;

    /**
     * Returns the TrainCar's capacity.
     *
     * @return the capacity
     */
    public long getCapacity() {
        return capacity;
    }

    /**
     * Sets the TrainCar's capacity.
     *
     * @param capacity - the new capacity
     */
    public void setCapacity(long capacity) {
        this.capacity = capacity;
    }

    /**
     * Each type of car must compute its own weight.
     * 
     * @return the computed weight
     */
    public abstract long getWeight();
}
