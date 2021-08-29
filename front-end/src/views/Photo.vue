<template>
<div>
  <div class="info">
    <p>Congratulations, you have ordered {{id}}</p>
  </div>
  <div class="image">
    <img :src="path" alt="no image due to error">
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
        let photo = await axios.get("/api/photos/"+this.id);
        console.log("Returned Photo: ", photo)
        this.path = photo.data[0].path,
        console.log("data path: ", photo.data[0].path);
        return photo;
      }  
  },
  created() {
    this.id = this.$route.params.id;
    console.log("you have created: ", this.id);
    this.photo = this.getPhoto();
    
  },
}
</script>