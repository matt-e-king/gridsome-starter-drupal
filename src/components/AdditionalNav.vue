<template>
  <span>
    <g-link v-for="{ node } in pages" 
      :key="node.id" 
      class="nav__link" 
      :to="node.path">
      {{ node.title }}
    </g-link>
  </span>
</template>

<script>
  export default {
    computed: {
      pages() {
        const { 
          allDrupalNodePage: {
            edges
          } = {}
        } = this.$static

        return edges || []
      }
    }
  }
</script>

<static-query>
  query Pages {
    allDrupalNodePage {
      edges {
        node {
          id,
          title,
          path
        }
      }
    }
  }
</static-query>
