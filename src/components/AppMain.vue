<script>
import { store } from '../store.js'
import axios from 'axios';
import AppPost from './AppPost.vue';

export default {
    name: 'AppMain',
    data() {
        return {
            posts: [],
            contentMaxLenght: 50,
            currentPage: 1,
            lastPage: null,
            store

        }
    },
    components: {
        AppPost
    },
    methods: {
        getPosts(gotoPage) {
            axios.get(`${this.store.baseUrl}/api/posts`,
                {
                    // richiedi la pagina corrente
                    params: {
                        page: gotoPage,
                    }
                })
                .then(response => {
                    //console.log(response);
                    this.posts = response.data.results.data;
                    this.currentPage = response.data.results.current_page;
                    this.lastPage = response.data.results.last_page;

                });
        },
        truncateText(description) {
            if (description && description.lenght > this.contentMaxLenght) {
                return description.substr(0, this.contentMaxLenght) + '...';
            }
            return description;
        }
    },
    mounted() {
        this.getPosts(1);
    }
}
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-4" v-for="post in  posts ">
                <AppPost :post="post"></AppPost>
            </div>


            <!-- bottoni per la paginazione -->
            <nav aria-label="Page navigation example">
                <ul class="pagination">

                    <li class="page-item">
                        <button class="page-link" @click="getPosts(currentPage - 1)"
                            :class="{ 'disabled': currentPage == 1 }">Previous Page</button>
                    </li>

                    <li class="page-item">
                        <button class="page-link" @click="getPosts(currentPage + 1)"
                            :class="{ 'disabled': currentPage == lastPage }">Next Page</button>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<style lang="scss"></style>