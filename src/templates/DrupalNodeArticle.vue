<template>
  <Layout>
    <h1 v-html="article.title"></h1>

    <section class="article__tags">
      Tags:
      <span v-for="tag in article.fieldTags" :key="tag.name">
        <a :href="tag.path">{{ tag.name }}</a>
      </span>
    </section>

    <img :src="`${baseUrl}${imgUrl}`" height="200" :alt="article.fieldImage.title"/>

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
          fieldImage: {
            uri: {
              url: {
                src
              } = {}
            } = {}
          } = {}
        } = this.article

        return src
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
      },
      fieldImage {
        title,
        filename,
        uri {
          url
        }
      },
      fieldTags {
        name,
        path
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
