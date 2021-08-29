<template>
<div>
  <div class="info">
    <p>Id is {{id}} using path {{photos.data[0].path}}</p>
  </div>
  <div class="image">
    <img :src='photos.data[0].path' alt="no image due to error">
  </div>
  <div class="photoInfo">
        <p class="photoTitle">{{photos.data[0].title}}</p>
        <p class="photoName">{{photos.data[0].user.firstName}} {{photos.data[0].user.lastName}}</p>
      </div>
    <p class="photoDate">{{formatDate(photo.created)}}</p>
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
      user: null,
    }
  },
  methods: {
      async getPhoto() {
        this.photos = await axios.get("/api/photos/"+this.id);
        console.log("Returned Photo Object: ", this.photos);
        console.log("with array: ", this.photos.data);
        // return photos.data;
      }  
  },
  created() {
    this.id = this.$route.params.id;
    
    console.log("you have created: ", this.id);
    
    this.getPhoto();
    // this.photos = this.getPhoto();
    
    
  },
}
</script>

<style scoped>
.image {
    width: 100%;
}

.image img{
    width: 100%;
    object-fit:cover;
}

.photoInfo {
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
}

.photoInfo p {
  margin: 0px;
}

.photoDate {
  font-size: 0.7em;
  font-weight: normal;
}

p {
  margin: 0px;
}

</style>