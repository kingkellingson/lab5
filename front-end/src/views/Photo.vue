<template>
<div>
  <div class="info">
    <p>Congratulations, you have ordered {{id}}</p>
  </div>
  <div class="image">
    <img :src="photo.path" alt="no image due to error">
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Photo',
  data() {
    return {
      id: '',
      photo: '',
    }
  },
//   props: {
//     selectedPhoto: Object,
//   },
  created() {
    this.id = this.$route.params.id;
    console.log("you have created: ", this.path);
    this.photo = getPhoto();
    // this.random =
    //   Math.floor(Math.random() * 90) + 10;
    // this.amount = this.random * parseFloat(this.product.price.replace(/\$|,/g, ''));
    // this.amount = this.amount.toFixed(2);
  },
  methods: {
      async getPhoto() {
        console.log("called Get Photo")
        let photo = await axios.get("/api/photos/"+this.id);
        return photo;
      }
      
  }
}
</script>