package com.uhills.toytrain.domain;

/**
 * A Locomotive is a type of Car. As the name suggests, it
 * is the engine for the train.
 * 
 * For a Locomotive, the capacity is its towing capacity.
 * Or, in other words, the amount of weight it can pull.
 *
 */
public class Locomotive extends TrainCar {

    public enum EngineType {
        Steam,
        Diesel,
        Electric
    }

    private EngineType engineType;

    /**
     * @return the engineType
     */
    public EngineType getEngineType() {
        return engineType;
    }

    /**
     * @param engineType the engineType to set
     */
    public void setEngineType(EngineType engineType) {
        this.engineType = engineType;
    }

    @Override
    public long getWeight() {
        // TODO Auto-generated method stub
        return 0;
    }

    public Locomotive(EngineType engineType) {
        setEngineType(engineType);
    }

    @Override
    public String toString() {
        return "Locomotive";
    }
}
