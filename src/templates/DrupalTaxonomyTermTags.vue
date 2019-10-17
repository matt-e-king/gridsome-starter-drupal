<template>
  <Layout>
    <h1>Tag Page</h1>

    <div>All articles tagged by <strong><em>{{ getTagName }}</em></strong></div>

    <ul>
      <li v-for="{ node } in $page.articles.belongsTo.edges" :key="node.title">
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
    }
  }
</script>

<page-query>
  query Articles($path: String!, $page: Int) {
    articles: drupalTaxonomyTermTags(path: $path) {
      belongsTo (perPage: 1000, page: $page) @paginate {
        pageInfo {
          totalPages
          currentPage
        }
        edges {
          node {
            ... on DrupalNodeArticle {
              title
              path
            }
          }
        }
      }
    }
  }
</page-query>
