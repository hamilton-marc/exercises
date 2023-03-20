package com.uhills.toytrain.domain;

/**
 * 
 * Represents a section of Earth.
 *
 */
public class Terrain {
    public enum TerrainType {
        Desert  ("desert"),
        Grass   ("grass"),
        Trees   ("trees"),
        Water   ("water"),
        Mountain("mountain");

        private final String name;       

        private TerrainType(String name) {
            this.name = name;
        }

        public boolean equalsName(String otherName) {
            return (otherName == null) ? false : name.equals(otherName);
        }

        public String toString() {
            return this.name;
        }
    }

    private TerrainType terrainType;

    public Terrain(TerrainType terrainType) {
        setType(terrainType);
    }

    /**
     * @return the type
     */
    public TerrainType getType() {
        return terrainType;
    }

    /**
     * @param type the type to set
     */
    public void setType(TerrainType type) {
        this.terrainType = type;
    }

    @Override
    public String toString() {
        return terrainType.toString();
    }
}
