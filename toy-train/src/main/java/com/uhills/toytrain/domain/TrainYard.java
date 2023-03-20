package com.uhills.toytrain.domain;

import java.util.Collection;

/**
 * The "TrainYard" is where the train cars are kept before
 * being put into service.
 *
 */
public class TrainYard {

    private Collection<TrainCar> inventory;

    public Collection<TrainCar> getInventory() {
        return inventory;
    }

    public void setInventory(Collection<TrainCar> inventory) {
        this.inventory = inventory;
    }
}
