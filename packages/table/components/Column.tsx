import * as React from "react";
export interface WidthArgs {
  width: number;
  totalColumns: number;
  remainingWidth: number;
  currentIndex: number;
}

export interface ColumnProps {
  /**
   * header is providing the contents for the header cell for the column.
   */
  header: string | React.ReactNode;
  /**
   * cellRenderer is the function which is creating the cell contents for this column.
   */
  cellRenderer: (data: any, width: number) => React.ReactNode;
  /**
   * width should return a column width in pixels.
   */
  width?: (args: WidthArgs) => number;
  /**
   * the minimum width a column should be
   */
  minWidth?: number;
  /**
   * the maximum width a column can be
   */
  maxWidth?: number;
}

export class Column extends React.PureComponent<ColumnProps, {}> {}

export default Column;
