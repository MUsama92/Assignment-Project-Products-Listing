<template>
    <h3 class="cardHeading">Product Filter</h3>
    <div class="filterContainer row">

        <!-- price range filter-->
        <div class="col-12 col-lg-4 col-xl-4 col-md-3 filterBox">
            <div>
                <input @change="getFilteredData()" type="checkbox" v-model="store.state.filter_on.price_range">
                <label style="font-weight: 600;">Price</label>
            </div>
            <div v-if="store.state.filter_on.price_range">
                <input @keyup="getFilteredData()" type="number" v-model="store.state.price_range.min" min="1"
                    placeholder="min">
                to
                <input @keyup="getFilteredData()" type="number" v-model="store.state.price_range.max" min="1"
                    placeholder="max">
            </div>
        </div>

        <!-- brand filter-->
        <div class="col-12 col-lg-4 col-xl-4 col-md-3 filterBox">
            <div>
                <input @change="getFilteredData()" type="checkbox" v-model="store.state.filter_on.brand">
                <label style="font-weight: 600;">Brand</label>
            </div>
            <div v-if="store.state.filter_on.brand">
                <div>
                    <input @change="getFilteredData()" type="radio" value="Lindt" v-model="store.state.brand_filter">
                    <label>Lindt</label>
                </div>
                <div><input @change="getFilteredData()" type="radio" value="Cadbury" v-model="store.state.brand_filter">
                    <label>Cadbury</label>
                </div>
                <div><input @change="getFilteredData()" type="radio" value="Hershey's" v-model="store.state.brand_filter">
                    <label>Hershey's</label>
                </div>
                <div><input @change="getFilteredData()" type="radio" value="Godiva" v-model="store.state.brand_filter">
                    <label>Godiva</label>
                </div>
                <div><input @change="getFilteredData()" type="radio" value="Ghirardelli" v-model="store.state.brand_filter">
                    <label>Ghirardelli</label>
                </div>
                <div><input @change="getFilteredData()" type="radio" value="Scharffen Berger"
                        v-model="store.state.brand_filter">
                    <label>Scharffen Berger</label>
                </div>

            </div>
        </div>

        <!-- category -->
        <div class="col-12 col-lg-4 col-xl-4 col-md-3 filterBox">
            <div>
                <input @change="getFilteredData()" type="checkbox" v-model="store.state.filter_on.category">
                <label style="font-weight: 600;">Category</label>
            </div>
            <div v-if="store.state.filter_on.category">
                <div> <input @change="getFilteredData()" value="Milk Chocolate" v-model="store.state.category_filter"
                        type="radio">
                    <label>Milk Chocolate</label>
                </div>
                <div><input @change="getFilteredData()" value="Dark Chocolate" v-model="store.state.category_filter"
                        type="radio">
                    <label>Dark Chocolate</label>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useStore } from "vuex";
import { ref, onMounted } from 'vue';

const store = useStore();
const productsList = ref([]);

const getProducts = async () => {
    await store.dispatch("getProductsData").then((response) => {
        productsList.value = response;
    });
}

const getFilteredData = () => {
    store.state.filtered_products = [];
    let filteredData = [];
    // price range filtering
    if (store.state.filter_on.price_range) {
        if (store.state.price_range.min > 0 && store.state.price_range.max > 0) {
            if (filteredData.length > 0) {
                for (let i = 0; i < filteredData.length; i++) {
                    if (productsList.value[i].price >= store.state.price_range.min && productsList.value[i].price <= store.state.price_range.max) { " " }
                    else {
                        filteredData[i] = 0;
                    }
                }
            }

            else {
                for (let i = 0; i < productsList.value.length; i++) {
                    if (productsList.value[i].price >= store.state.price_range.min && productsList.value[i].price <= store.state.price_range.max) {
                        filteredData.push(productsList.value[i]);
                    }
                }
            }

        }
    }


    //brand filtering
    if (store.state.filter_on.brand) {
        if (store.state.brand_filter) {
            if (filteredData.length > 0) {
                for (let i = 0; i < filteredData.length; i++) {
                    if (filteredData[i].brand == store.state.brand_filter) { " " }
                    else {
                        filteredData[i] = 0;
                    }
                }
            }
            else {
                for (let i = 0; i < productsList.value.length; i++) {
                    if (productsList.value[i].brand == store.state.brand_filter) {
                        filteredData.push(productsList.value[i]);
                    }
                }
            }

        }
    }

    //category filtering
    if (store.state.filter_on.category) {
        if (store.state.category_filter) {
            if (filteredData.length > 0) {
                for (let i = 0; i < filteredData.length; i++) {
                    if (filteredData[i].category == store.state.category_filter) { " " }
                    else {
                        filteredData[i] = 0;
                    }
                }
            }
            else {
                for (let i = 0; i < productsList.value.length; i++) {
                    if (productsList.value[i].category == store.state.category_filter) {
                        filteredData.push(productsList.value[i]);
                    }
                }
            }

        }
    }

    // saving filtered products data in store 
    if (filteredData.length > 0) {
        for (let i = filteredData.length - 1; i >= 0; i--) {
            if (filteredData[i] === 0) {
                filteredData.splice(i, 1);
            }
        }
        store.state.filtered_products = filteredData;
    }
}

onMounted(() => {
    getProducts();
});
</script>
<style scoped>
.filterContainer {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    padding: 10px;
    margin: 6px;
}

.cardHeading {
    margin: 0 6px 0 8px;
    font-family: 'Jost', sans-serif;
    color: #4285F4;
}

input {
    margin-right: 5px;
    outline: none;
}

label {
    font-family: "Nunito", sans-serif;
}

input[type=number] {
    padding: 0 5px;
    border: 1px solid #4285F4;
    width: 5rem;
    height: 2rem;
    margin-bottom: 1rem;

}

input[type=checkbox] {
    outline: 1px solid #4285F4;
}

.filterBox {
    margin-bottom: 1rem;
}
</style>