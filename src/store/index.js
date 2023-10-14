import axios from "axios";
import { createStore } from "vuex";

const store = createStore({
    state: {
        show_product_detail: false,
        product_detail: [],
        filter_on: {
            price_range: false,
            brand: false,
            category: false,
        },
        price_range: {
            min: 0,
            max: 0,
        },
        brand_filter: "",
        category_filter: "",
        filtered_products: [],
    },

    actions: {
        getProductsData() {
            return new Promise((resolve, reject) => {
                axios.get("https://mocki.io/v1/cab354f7-f9fd-468d-8654-2e9006413292").then((response) => {
                    resolve(response.data);
                }).catch((error) => reject(error));
            })

        },
    },
})

export default store;