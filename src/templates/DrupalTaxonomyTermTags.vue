<template>
  <Layout>
    <h1>Tag Page</h1>

    <div>All articles tagged by <strong><em>{{ getTagSlug }}</em></strong></div>

    <ul>
      <li v-for="{ node } in getArticlesByTagSlug" :key="node.title">
        <a :href="node.path">{{ node.title }}</a>
      </li>
    </ul>
  </Layout>
</template>

<script>
  export default {
    computed: {
      getTagSlug() {
        const { params: { slug } = {} } = this.$route
        return slug
      },
      articles() {
        const { 
          allDrupalNodeArticle: {
            edges
          } = {}
        } = this.$page

        return edges || []
      },
      getArticlesByTagSlug() {
        return this.articles.filter((article) => {
          let {
            node: {
              fieldTags = []
            } = {}
          } = article

          const allTags = fieldTags.map(tagObj => tagObj.slug)

          return allTags.includes(this.getTagSlug)
        })
      }
    }
  }
</script>

<page-query>
  query Articles {
    allDrupalNodeArticle (perPage:100) {
      edges {
        node {
          id,
          title,
          path,
          fieldTags {
            slug,
            name
          }
        }
      }
    }
  }
</page-query>
