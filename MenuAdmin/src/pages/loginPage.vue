<template>
<div class="body">
  <inputLogin/>
</div>
</template>

<script>
import inputLogin from '../components/inputLogin.vue'
export default{
  components:{
    inputLogin
  }
}
</script>

<style scoped>
.body{
  height: 100vh;
}
</style>