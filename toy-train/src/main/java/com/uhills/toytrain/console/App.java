package com.uhills.toytrain.console;

import com.uhills.toytrain.domain.*;
import com.uhills.toytrain.domain.Scenery.SceneryType;
import com.uhills.toytrain.domain.TrackSegment.OrientationType;

public class App {

    private World theWorld;
    private WorldConsoleRenderer worldRenderer;

    public App() {
        worldRenderer = new WorldConsoleRenderer();
    }

    private void buildCircularTrack(int height, int width) {
        for (int row=0; row < height; row++) {
            theWorld.setPropertyAt(row, 0, new TrackSegment(OrientationType.NorthSouth));
            theWorld.setPropertyAt(row, width-1, new TrackSegment(OrientationType.NorthSouth));
        }

        for (int col=0; col < width; col++) {
            theWorld.setPropertyAt(0, col, new TrackSegment(OrientationType.EastWest));
            theWorld.setPropertyAt(height-1, col, new TrackSegment(OrientationType.EastWest));
        }

        theWorld.setPropertyAt(0, 0, new TrackSegment(OrientationType.SouthEast));
        theWorld.setPropertyAt(height-1, 0, new TrackSegment(OrientationType.NorthEast));
        theWorld.setPropertyAt(0, width-1, new TrackSegment(OrientationType.SouthWest));
        theWorld.setPropertyAt(height-1, width-1, new TrackSegment(OrientationType.NorthWest));
    }
    
    public void createSampleWorld() {
        int height = 5;
        int width = 6;

        theWorld = new World(height, width);
        theWorld.initializeTerrain(Terrain.TerrainType.Grass);
        theWorld.initializeProperty(SceneryType.Foliage);

        buildCircularTrack(height, width);
    }

    public void displayWorld() {
        worldRenderer.printWorld(theWorld);
    }

    private Train buildTrain() {
        Train theTrain = new Train();

        theTrain.addCar(new Locomotive(Locomotive.EngineType.Electric));
        theTrain.addCar(new FreightCar());
        theTrain.addCar(new PassengerCar());
        theTrain.addCar(new FreightCar());
        theTrain.addCar(new FreightCar());

        theWorld.placeTrainAt(0, 1, theTrain);

        return theTrain;
    }

    public static void main(String[] args) {
        App app = new App();

        System.out.println("Creating sample world");
        app.createSampleWorld();

        System.out.println("Building sample train");
        app.buildTrain();

        System.out.println("Rendering world");
        app.displayWorld();
    }
}
