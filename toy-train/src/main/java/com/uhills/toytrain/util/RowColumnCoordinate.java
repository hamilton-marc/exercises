package com.uhills.toytrain.util;

public class RowColumnCoordinate {
    private int         row;
    private int         column;

    public RowColumnCoordinate() {

    }

    public RowColumnCoordinate(int row, int column) {
        this.row = row;
        this.column = column;
    }

    /**
     * @return the row
     */
    public int getRow() {
        return row;
    }

    /**
     * @param row the row to set
     */
    public void setRow(int row) {
        this.row = row;
    }

    /**
     * @return the column
     */
    public int getColumn() {
        return column;
    }

    /**
     * @param column the column to set
     */
    public void setColumn(int column) {
        this.column = column;
    }

    /**
     * @see java.lang.Object#equals(java.lang.Object)
     * 
     * Overrides default equals operation by comparing all of the
     * members of the class.
     */
    @Override
    public boolean equals(Object obj) {
        if (obj == null || !(obj instanceof RowColumnCoordinate))
            return false;

        RowColumnCoordinate comparisonObj = (RowColumnCoordinate) obj;

        return (comparisonObj.getRow()    == this.getRow() &&
                comparisonObj.getColumn() == this.getColumn());
    }
}
