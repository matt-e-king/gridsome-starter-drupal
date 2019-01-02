<template>
  <Layout>
    <g-image alt="Example image" src="~/favicon.png" width="135" />
    <h1>Hello, world!</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur excepturi labore tempore expedita, et iste tenetur suscipit explicabo! Dolores, aperiam non officia eos quod asperiores</p>

    <h2>Articles</h2>
    <ul>
      <li v-for="{ node } in articles" :key="node.id">
        <router-link :to="node.path">{{ node.title }}</router-link>
      </li>
    </ul>
  </Layout>
</template>

<script>
  export default {
    computed: {
      articles() {
        const { 
          allDrupalNodeArticle: {
            edges
          } = {}
        } = this.$page

        return edges || []
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
          path
        }
      }
    }
  }
</page-query>
