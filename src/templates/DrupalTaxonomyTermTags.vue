<template>
  <Layout>
    <h1>Tag Page</h1>

    <div>All articles tagged by <strong><em>{{ getTagTitle }}</em></strong></div>

    <ul>
      <li v-for="{ node } in getArticlesByTagTitle" :key="node.title">
        <a :href="node.path">{{ node.title }}</a>
      </li>
    </ul>
  </Layout>
</template>

<script>
  export default {
    computed: {
      getTagTitle() {
        const { params: { title } = {} } = this.$route
        return title
      },
      articles() {
        const { 
          allDrupalNodeArticle: {
            edges
          } = {}
        } = this.$page

        return edges || []
      },
      getArticlesByTagTitle() {
        return this.articles.filter((article) => {
          let {
            node: {
              field_tags = []
            } = {}
          } = article

          const allTags = field_tags.map(tagObj => tagObj.title)
          return allTags.includes(this.getTagTitle)
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
          field_tags {
            id,
            title
          }
        }
      }
    }
  }
</page-query>
