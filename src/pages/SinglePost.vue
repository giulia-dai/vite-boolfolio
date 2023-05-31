<script>
import axios from 'axios';
import { store } from '../store.js';
export default {
    name: 'SinglePost',

    data() {
        return {
            store

        }
    },
    mounted() {
        const slug = this.$route.params.slug;

        axios.get(`${this.store.baseUrl}/api/post/${slug}`)
            .then(response => {
                console.log(response);
            })


    }
}
</script>

<template>
    <h1>questo è il tuo post singolo</h1>
</template>