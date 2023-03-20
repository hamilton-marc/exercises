package com.uhills.toytrain.domain;

import com.uhills.toytrain.util.RowColumnCoordinate;

import com.uhills.toytrain.domain.Scenery.SceneryType;
import com.uhills.toytrain.domain.Terrain.TerrainType;

//TODO: Watch this class to ensure it does not turn into a monstrous "God" object. It may need to be re-factored to separate concerns.

/**
 * The World consists of layers of 2 dimensional grids.
 *
 * The underlying layer is the "Terrain".  This describes the
 * characteristics of the "land".  (i.e. grass, water, trees, etc.)
 * 
 * On top of the terrain is where "Property" is placed.  This consists
 * of "Scenery" items such as buildings, or other structures which
 * enhance the Terrain.
 * 
 * Property also consists of the TrackSegments which are used to
 * create a track. Business rules will probably be established as far
 * as what type of land a track can be placed on top of.  For example,
 * a track should probably be able to be placed on top of trees or water
 * (then again, we could create a bridge over the water).
 *
 */
public final class World {
    /** Number of rows */
    private int         height;
    /** Number of columns */
    private int         width;

    //TODO: Is a 2D primitive array good enough?
    private Property[][] propertyLayer;  // TODO: This may need to be re-factored for efficiency as this may be very sparse
    private Terrain[][]  terrainLayer;   // Every piece of the "World" will have some form of terrain

    /**
     * There is no "train layer"...
     * We're assuming there's only one "train" on the track at a given time for now.  We're letting the World manage
     * the position of the train on the track instead of the train itself.  We may need to re-evaluate that approach later.
     */
    private RowColumnCoordinate trainPosition;
    private Train train;
    
    /**
     * This version of the constructor creates a square world
     * using the size for both the height and width.
     * 
     * @param size - height and width of the World
     */
    public World(int size) {
        this(size, size);
    }

    /**
     * The world must be initialized with dimensions.
     * 
     * @param height - height of the World
     * @param width - width of the World
     */
    public World(int height, int width) {
        this.height = height;
        this.width = width;

        terrainLayer = new Terrain[height][width];
        propertyLayer = new Property[height][width];
    }


    /**
     * @return the height
     */
    public int getHeight() {
        return height;
    }

    /**
     * @return the width
     */
    public int getWidth() {
        return width;
    }

    /**
     * Returns the property layer. 
     * 
     * @return
     */
    public Property[][] getPropertyLayer() {
        //TODO: This getter method may not be a good idea as it could
        //      be seen as exposing too much of the inner implementation
        //      and thereby breaking the norms of encapsulation
        return propertyLayer;
    }

    /**
     * Returns the terrain layer
     * 
     * @return
     */
    public Terrain[][] getTerrainLayer() {
        //TODO: This getter method may not be a good idea as it could
        //      be seen as exposing too much of the inner implementation
        //      and thereby breaking the norms of encapsulation
        return terrainLayer;
    }

    /**
     * Sets the terrain at a specific World coordinate.
     *
     * @param row - row coordinate to place Terrain
     * @param col - column coordinate to place Terrain
     * @param terrain - the new Terrain object
     */
    public void setTerrainAt(int row, int col, Terrain terrain) {
        terrainLayer[row][col] = terrain;
    }

    /**
     * Gets the terrain at a specific World coordinate.
     *
     * @param row - row coordinate to place Terrain
     * @param col - column coordinate to place Terrain
     * @return the Terrain object at the given coordinates
     */
    public Terrain getTerrainAt(int row, int col) {
        //TODO: Add bounds checking
        
        return terrainLayer[row][col];
    }

    /**
     * Sets the Property at a specific World coordinate.
     *
     * @param row - row coordinate to place Property
     * @param col - column coordinate to place Property
     * @param property - the new Property object
     */
    public void setPropertyAt(int row, int col, Property property) {
        //TODO: Add business rules around what kind of Property can be added to the underlying Terrain
        propertyLayer[row][col] = property;
    }

    /**
     * Gets the terrain at a specific World coordinate.
     *
     * @param row - row coordinate to place Property
     * @param col - column coordinate to place Property
     * @return the Property object at the given coordinates
     */
    public Property getPropertyAt(int row, int col) {
        //TODO: Add bounds checking
        
        return propertyLayer[row][col];
    }

    /**
     * Sets all of the terrain to one type.
     * 
     * @param terrainType - the type of terrain to set
     */
    public void initializeTerrain(TerrainType terrainType) {
        for (int row=0; row < height; row++) {
            for (int col=0; col < width; col++) {
                terrainLayer[row][col] = new Terrain(terrainType);
            }
        }
    }

    /**
     * Sets all of the Property to one type of Scenery.
     * 
     * @param sceneryType - the type of scenery to set
     */
    public void initializeProperty(SceneryType sceneryType) {
        for (int row=0; row < height; row++) {
            for (int col=0; col < width; col++) {
                propertyLayer[row][col] = new Scenery(sceneryType);
            }
        }
    }

    /**
     * Places the train at a specific row, column position in the World.
     * 
     * @param row
     * @param col
     * @param train
     */

    public void placeTrainAt(int row, int col, Train train) {
        placeTrainAt(new RowColumnCoordinate(row, col), train);
    }

    /**
     * Places the train at a specific coordinate in the world.
     * 
     * @param row
     * @param col
     * @param train
     */
    public void placeTrainAt(RowColumnCoordinate coordinate, Train train) {
        this.train = train;

        this.trainPosition = coordinate;
    }

    /**
     * Returns the train's position in the World
     * 
     * @return
     */
    public RowColumnCoordinate getTrainPosition() {
        return this.trainPosition;
    }

    /**
     * Returns the train
     * 
     * @return
     */
    public Train getTrain() {
        return train;
    }
}
