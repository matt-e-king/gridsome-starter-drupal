<template>
  <Layout>
    <h1 v-html="article.title"></h1>

    <section class="article__tags">
      Tags:
      <span v-for="tag in tags" :key="tag.name">
        <a :href="tag.path">{{ tag.name }}</a>
      </span>
    </section>

    <img :src="`${baseUrl}${imgUrl}`" height="200" :alt="imgMeta.alt" :title="imgMeta.title"/>

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
      tags() {
        const {
          field_tags = []
        } = this.article

        return field_tags.map(tag => tag.node)
      },
      imgMeta() {
        const {
          field_image: {
            meta
          } = {}
        } = this.article

        return meta
      },
      imgUrl() {
        const {
          field_image: {
            node: {
              uri: {
                url
              } = {}
            }
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
        node {
          name,
          path
        }
      },
      field_image {
        node {
          filename,
          uri {
            url
          }
        },
        meta {
          alt,
          title
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
