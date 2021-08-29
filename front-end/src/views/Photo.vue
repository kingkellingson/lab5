<template>
<div>
  <div class="info">
    <p>Congratulations, you have ordered {{id}}</p>
  </div>
  <div class="image">
    <img :src='this.path' alt="no image due to error">
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
      path: '',
    }
  },
  methods: {
      async getPhoto() {
        this.photo = await axios.get("/api/photos/"+this.id);
        console.log("Returned Photo: ", this.photo);
        // let path = photo.data[0].path;
        // console.log("data path: ", photo.data[0].path);
        // return path;
      }  
  },
  created() {
    this.id = this.$route.params.id;
    this.path = this.$route.params.path;
    console.log("you have created: ", this.id);
    console.log("with path:", this.path);
    this.getPhoto();
    // this.path = this.getPhoto();
    
  },
}
</script>