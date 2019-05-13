<template>
  <Layout>
    <h1 v-html="article.title"></h1>

    <section class="article__tags">
      Tags:
      <span v-for="tag in article.field_tags" :key="tag.name">
        <a :href="tag.path">{{ tag.name }}</a>
      </span>
    </section>

    <img :src="`${baseUrl}${imgUrl}`" height="200" :alt="article.field_image.filename"/>

    <p>{{ article.date }}</p>
    <p v-html="article.body.processed"></p>
  </Layout>
</template>

<script>
  export default {
    computed: {
      article() {
        const { drupalNodeArticle } = this.$page

        return drupalNodeArticle || {}
      },
      imgUrl() {
        const {
          field_image: {
            uri: {
              url
            } = {}
          } = {}
        } = this.article

        return url
      } 
    },

    data() {
      return {
        baseUrl: process.env.APP_BASE_URL
      }
    }
  }
</script>


<page-query>
  query Article ($path: String!) {
    drupalNodeArticle (path: $path) {
      title,
      date,
      body {
        processed
      }
      field_tags {
        name,
        path
      },
      field_image {
        filename,
        uri {
          url
        }
      }
    }
  }
</page-query>

<style>
  .article__tags {
    margin-top: -20px;
    margin-bottom: 20px;
  }

  .article__tags span {
    margin-right: 5px;
  }
</style>
