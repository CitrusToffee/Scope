export interface inventoryItem {
    /**
     * Path to image of the item.
     */
    img: string;
    /**
     * Name of the item
     */
    name: string;
    /**
     * Link to a function that will execute when item is used.
     */
    executable: Function;
    /**
     * parameters for that executable function. Maybe in the form of tuples? Thinking very python-y
     */
    params: any;
  }