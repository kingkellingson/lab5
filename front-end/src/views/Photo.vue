<template>
<div>
  <div class="info">
    <p>Congratulations, you have ordered {{id}} using path {{photos.path}}</p>
  </div>
  <div class="image" v-for="photo in photos" v-bind:key="photo._id">
    <img :src='photo.path' alt="no image due to error">
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
      photos: '',
      path: '',
    }
  },
  methods: {
      async getPhoto() {
        let photos = await axios.get("/api/photos/"+this.id);
        console.log("Returned Photo Object: ", photos);
        console.log("with array: ", photos.data);
        return photos.data;
      }  
  },
  created() {
    this.id = this.$route.params.id;
    
    console.log("you have created: ", this.id);
    
    // this.getPhoto();
    this.photos = this.getPhoto();
    
    
  },
}
</script>

<style scoped>
.info {
    margin-top: 200px;
}

</style>