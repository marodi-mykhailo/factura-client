export type ProductType = {
    ID: string,
    name: string,
    price: string,
    unit: string,
    currency: string,
    tax: string
}

const initialProductState: ProductType[] = [
    {
        "ID": "1",
        "name": "Milk",
        "price": "2",
        "unit": "bottle",
        "currency": "PL",
        "tax": "2"
    },
    {
        "ID": "2",
        "name": "Sweet fresh stawberry",
        "price": "10",
        "unit": "kg",
        "currency": "PL",
        "tax": "5"
    },
    {
        "ID": "3",
        "name": "Homemade bread",
        "price": "4",
        "unit": "piece",
        "currency": "PL",
        "tax": "5"
    },
    {
        "ID": "4",
        "name": "Tomato",
        "price": "5",
        "unit": "kg",
        "currency": "PL",
        "tax": "5"
    },
    {
        "ID": "5",
        "name": "Pears",
        "price": "3",
        "unit": "kg",
        "currency": "PL",
        "tax": "5"
    },
    {
        "ID": "6",
        "name": "Yogurt",
        "price": "4",
        "unit": "bottle",
        "currency": "PL",
        "tax": "2"
    },
    {
        "ID": "7",
        "name": "Cherry",
        "price": "6",
        "unit": "kg",
        "currency": "PL",
        "tax": "8"
    },
    {
        "ID": "8",
        "name": "Lemon",
        "price": "6",
        "unit": "kg",
        "currency": "PL",
        "tax": "5"
    },
    {
        "ID": "9",
        "name": "Plums",
        "price": "4",
        "unit": "kg",
        "currency": "PL",
        "tax": "7"
    },
    {
        "ID": "10",
        "name": "Avocado",
        "price": "10",
        "unit": "kg",
        "currency": "PL",
        "tax": "5"
    }
]

export const productReducer = (state = initialProductState, action: ProductsReducerActionType) => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return [
                ...state,
                ...action.products
            ]
        default:
            return state
    }
}

export type ProductsReducerActionType =
    | ReturnType<typeof setProducts>

export const setProducts = (products: ProductType[]) => ({
    type: "SET_PRODUCTS",
    products
} as const)
