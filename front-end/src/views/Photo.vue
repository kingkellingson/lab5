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
  methods: {
      async getPhoto() {
        console.log("called Get Photo")
        let photo = await axios.get("/api/photos/"+this.id);
        return photo;
      }  
  },
  created() {
    this.id = this.$route.params.id;
    console.log("you have created: ", this.path);
    this.photo = this.getPhoto();
  },
}
</script>