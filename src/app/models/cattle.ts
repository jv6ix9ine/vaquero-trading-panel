export interface Cattle {
    batch: String;
    quantityAndType: String;
    slide: String;
    averageWT: String;
    weighingCond: String;
    breedType: String;
    frame: String;
    currentLocation: String;
    comments: String;
    date: String;
    isoDate: String;
    feed: String;
    deliveryMethod: String;
    askingPrice: number;
    items: Images[];
}

interface Images {
    url?: string
    ref?: string
}