<template>
    <div v-if="store.state.show_product_detail" class="modal fade show" aria-hidden="true"
        style="display: block; background: #0004;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title modalTitle">Product Detail</h4>
                    <button type="button" class="btn-close" v-on:click="store.state.show_product_detail = false"></button>
                </div>
                <div class="modal-body">
                    <img :src="productDetail.image" alt="product image" class="productImage">
                    <div><span>Name:</span> {{ productDetail?.name ? productDetail.name : "N/A" }}</div>
                    <div><span>Brand:</span> {{ productDetail?.brand ? productDetail.brand : "N/A" }}</div>
                    <div><span>Category:</span> {{ productDetail?.category ? productDetail.category : "N/A" }}</div>
                    <div><span>Price:</span> {{ productDetail?.price ? '$' + productDetail.price : "N/A" }}</div>
                    <div><span>Description:</span> {{ productDetail?.description ? productDetail.description : "N/A" }}
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary"
                        @click="store.state.show_product_detail = false">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
let productDetail = ref([]);

onMounted(() => {
    productDetail.value = store.state.product_detail;
})
</script>

<style scoped>
.modalTitle {
    font-family: "Jost", sans-serif;
    color: #4285F4;
}

.productImage {
    width: 100%;
    margin-bottom: 1rem;
}
.modal-body div{
    font-family: "Nunito", sans-serif;
}

.modal-body div span{
    font-family: "Jost", sans-serif;
    color: #4285F4;
    font-weight: 500;
}
</style>