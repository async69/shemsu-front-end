export default {
    category: {
        _type: "categoryID",
        DEFAULT: -1
    },
    price: {
        _type: "FILTER_BY_PRICE",
        DEFAULT: 0,
        HIGH_TO_LOW: -1,
        LOW_TO_HIGH: 1
    },
    search: {
        _type: "FILTER_BY_SEARCH",
        DEFAULT: ""
    },
    color: {
        _type: "FILTER_BY_COLOR",
        DEFAULT: ""
    },
    size: {
        _type: "FILTER_BY_SIZE",
        DEFAULT: ""
    }
}