<template>
<div>
  <div class="photoInfo">
        <p class="photoTitle">{{photos.data[0].title}}</p>
        <p class="photoName">{{photos.data[0].user.firstName}} {{photos.data[0].user.lastName}}</p>
      </div>
    <p class="photoDate">{{formatDate(photos.data[0].created)}}</p>
    <div class="image">
    <img :src='photos.data[0].path' alt="no image due to error">
  </div>
  <p class="photoDescription">{{photos.data[0].description}}</p>
  
</div>
</template>

<script>
import moment from 'moment';
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
      },
      formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },  
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
    max-height: 10vw;
    object-fit:fill;
}

.photoInfo {
  display: flex;
  justify-content: space-between;
  font-size: 1.2em;
}

.photoInfo p {
  margin: 0px;
}

.photoDescription {
  font-size: 1.2em;
  margin: 0px;
}

.photoDate {
  font-size: 1em;
  font-weight: normal;
}

p {
  margin: 0px;
}

</style>