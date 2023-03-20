package com.uhills.toytrain.domain;

/**
 * 
 * Additions that can be added to the underlying Terrain.
 *
 */
public class Scenery implements Property {
    public enum SceneryType {
        Foliage  ("foliage"),
        House    ("house"),
        Store    ("store"),
        School   ("school"),
        TrainStop("trainStop");

        private final String name;       

        private SceneryType(String name) {
            this.name = name;
        }

        public boolean equalsName(String otherName) {
            return (otherName == null) ? false : name.equals(otherName);
        }

        public String toString() {
            return this.name;
        }
    }

    private final SceneryType sceneryType;

    public SceneryType getSceneryType() {
        return sceneryType;
    }

    public Scenery(SceneryType sceneryType) {
        this.sceneryType = sceneryType;
    }

    @Override
    public String toString() {
        return sceneryType.toString();
    }
}
