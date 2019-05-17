<template>
  <Layout>
    <h1>Tag Page</h1>

    <div>All articles tagged by <strong><em>{{ getTagName }}</em></strong></div>

    <ul>
      <li v-for="{ node } in getArticlesByTagName" :key="node.title">
        <a :href="node.path">{{ node.title }}</a>
      </li>
    </ul>
  </Layout>
</template>

<script>
  export default {
    computed: {
      getTagName() {
        const { params: { name } = {} } = this.$route
        return name
      },
      articles() {
        const { 
          allDrupalNodeArticle: {
            edges
          } = {}
        } = this.$page

        return edges || []
      },
      getArticlesByTagName() {
        return this.articles.filter((article) => {
          let {
            node: {
              field_tags = []
            } = {}
          } = article

          const allTags = field_tags.map(tagObj => tagObj.name)
          return allTags.includes(this.getTagName)
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
            name
          }
        }
      }
    }
  }
</page-query>
