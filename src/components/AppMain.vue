<script>
import axios from 'axios';

export default {
    name: 'AppMain',
    data() {
        return {
            posts: [],
            contentMaxLenght: 100,
            baseUrl: 'http://localhost:8000',
            currentPage: 1,
            lastPage: null,

        }
    },
    methods: {
        getPosts(gotoPage) {
            axios.get(`${this.baseUrl}/api/posts`,
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
        truncateText(text) {
            if (text && text.lenght > this.contentMaxLenght) {
                return text.substr(0, this.contentMaxLength) + '...';
            }
            return text;
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

                <div class="card">
                    <img v-if="post.cover_img" :src="`${this.baseUrl}/storage/${post.cover_img}`" class="card-img-top">
                    <img v-else src="https://icon-library.com/images/no-image-icon/no-image-icon-1.jpg"
                        class="card-img-top" />

                    <div class="card-body">
                        <h5 class="card-title">{{ post.title }}</h5>
                        <h6>Categoria: {{ post.type?.name }}</h6>
                        <p class="card-text">{{ post.description }}</p>
                        <!-- <a href="#" class="btn btn-primary">Vedi di più</a> -->
                    </div>

                </div>

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