<template>
<div>
  <div class="info">
    <p>Congratulations, you have ordered {{id}}</p>
  </div>
  <div class="image">
    <img :src="'/images/'+id" alt="no image due to error">
  </div>
</div>
</template>

<script>
export default {
  name: 'Photo',
  data() {
    return {
      id: '',
      picture: {},
    }
  },
  created() {
    this.picture = this.$route.params.id;
    this.id = this.$route.params.id;
    // this.random =
    //   Math.floor(Math.random() * 90) + 10;
    // this.amount = this.random * parseFloat(this.product.price.replace(/\$|,/g, ''));
    // this.amount = this.amount.toFixed(2);
  },
}
</script>