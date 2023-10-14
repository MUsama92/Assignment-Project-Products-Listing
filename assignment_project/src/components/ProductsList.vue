<template>
    <ProductDetailsModal v-if="store.state.show_product_detail" />
    <h1 class="pageHeading">Products List</h1>

    <ProductFilterCard />

    <!-- products table start -->
    <div class="tableContainer">
        <table class="mainTable">
            <thead>
                <tr>
                    <th>Sr.</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Image</th>
                </tr>
            </thead>
            <tbody>
                <!-- for filtered data -->
                <template
                    v-if="store.state.filter_on.price_range || store.state.filter_on.brand || store.state.filter_on.category">
                    <template v-for="(product, index) in store.state.filtered_products" :key="index">
                        <tr @click="showProductDetail(product)">
                            <td>{{ index + 1 }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.brand }}</td>
                            <td>{{ product.category }}</td>
                            <td>${{ product.price }}</td>
                            <td><img class="product_img" :src="product.image" alt="product image"></td>
                        </tr>
                    </template>
                </template>

                <!-- for all data -->
                <template v-else>
                    <template v-for="(product, index) in productsList" :key="index">
                        <tr @click="showProductDetail(product)">
                            <td>{{ index + 1 }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.brand }}</td>
                            <td>{{ product.category }}</td>
                            <td>${{ product.price }}</td>
                            <td><img class="product_img" :src="product.image" alt="product image"></td>
                        </tr>
                    </template>
                </template>
            </tbody>
        </table>
    </div>
    <!-- products table end -->
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import ProductDetailsModal from './ProductDetailsModal.vue';
import ProductFilterCard from "./ProductFilterCard.vue";

const store = useStore();
const productsList = ref([]);

const getProducts = async () => {
    await store.dispatch("getProductsData").then((response) => {
        productsList.value = response;
    });
}

const showProductDetail = (product) => {
    store.state.product_detail = product;
    store.state.show_product_detail = true;
}

onMounted(() => {
    getProducts();
});

</script>

<style scoped>
.pageHeading {
    font-family: 'Jost', sans-serif;
    font-weight: 500;
    text-align: center;
    text-decoration: underline;
    color: #4285F4;
    margin-bottom: 2rem;
    margin-top: 2rem;
}

.tableContainer {
    overflow: auto;
    max-height: 25rem;
    margin-left: 6px;
    margin-right: 6px;
    margin-top: 2rem;
}

.mainTable {
    width: 100%;
    border-collapse: collapse;
}

.product_img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
}

th,
td {
    border: 1px solid #0003;
    text-align: center;
    font-family: "Nunito", sans-serif;
    padding: 5px;
    white-space: nowrap;
}

th {
    color: #fff;
    background: #4285F4;
    height: 2rem;
    position: sticky;
    top: -1px;
}

tbody tr {
    cursor: pointer;
}
</style>