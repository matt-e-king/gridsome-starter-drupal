<template>
  <Layout>
    <h1 v-html="page.title"></h1>
    <p v-html="page.body.processed"></p>
  </Layout>
</template>

<script>
  export default {
    computed: {
      page() {
        const { drupalNodePage } = this.$page

        return drupalNodePage || {}
      }
    }
  }
</script>


<page-query>
  query Page ($path: String!) {
    drupalNodePage (path: $path) {
      title,
      body {
        processed
      }
    }
  }
</page-query>
