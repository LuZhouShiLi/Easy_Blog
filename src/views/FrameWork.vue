<template>
  <div class="layout">
    <el-container >
      <el-header class = "header">Header</el-header>
      <el-container class = "container">
        <el-aside width="200px" class ="left-aside">Aside</el-aside>
        <el-main class = "right-main">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {

}
</script>

<style lang = "scss">

.layout{
    .header{

        border-bottom:1px solid #ddd;

        .container{
            background:#f5f6f7;
            height:calc(100vh - 60px);
        }
    }

}

</style>