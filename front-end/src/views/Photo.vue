<template>
<div>
  <div class="photoInfo">
        <p class="photoTitle">Title: {{photos.data[0].title}}</p>
        <p class="photoName">Taken by: {{photos.data[0].user.firstName}} {{photos.data[0].user.lastName}}</p>
      </div>
    <p class="photoDate">{{formatDate(photos.data[0].created)}}</p>
    <div class="image">
    <img :src='photos.data[0].path' alt="no image due to error">
  </div>
  <p class="photoDescription">Description: {{photos.data[0].description}}</p>
  
  <div v-if="user">
    <div>
      <button @click="setCreating" class="pure-button button-xsmall">
          <i class="fas fa-plus" />
      </button>
    </div>
    <form class="pure-form" v-if="creating" @submit.prevent="addComment">
      <legend>Add Comment:</legend>
      <fieldset>
          <textarea v-model="commentToAdd"></textarea>
          <br />
          <button @click="cancelCreating" class="pure-button space-right">Cancel</button>
          <button class="pure-button pure-button-primary" type="submit">Submit</button>
      </fieldset>
    </form>
  </div>
  <!-- <div v-for="ticket in comments" v-bind:key="ticket.id">
    <div class="ticket">
        <div class="commentToAdd">
            <h3>Comment Added {{time(ticket.created)}}</h3>
            <p>{{ticket.commentToAdd}}</p>
            <p v-if="ticket.response"><i>{{ticket.response}}</i></p>
            <p v-else><i>No response yet</i></p>
        </div>
    </div>
  </div> -->
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
      creating: false,
      commentToAdd: '',
      comments: [],
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
     async addComment () {
      try {
        await axios.post("/api/comments/", {
          photo: this.photos.data[0],
          commentToAdd: this.commentToAdd
        });
        this.commentToAdd = "";
        this.creating = false;
        this.getComments();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getComments() {
      try {
        // let response = await axios.get("/api/comments/");
        // this.comments = response.data.comments;
        console.log ("getComments called!")
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    time(d) {
      return moment(d).format('D MMMM YYYY, h:mm:ss a');
    },
    setCreating() {
        this.creating = true;
    },
    cancelCreating() {
        this.creating = false;
    },
  },
  created() {
    this.id = this.$route.params.id;
    
    console.log("you have created: ", this.id);
    
    this.getPhoto();
    this.getComments();
    // this.photos = this.getPhoto();
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  }
}
</script>

<style scoped>

* {
    margin: 0 auto;
}

.image {
    display: flex;
    justify-content: center;
    /* width: 100%; */
    margin: 0 auto;
}

.image img{
    /* width: 100%; */
    max-height: 667px;
    /* object-fit:cover; */
    margin: 0 auto;
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

textarea {
  width: 100%;
  max-width: 500px;
}

h3 {
  font-size: 12px;
  font-weight: normal;
  background-color: #ccc;
  padding: 10px 20px;
}


label {
  background-color: #000;
  color: white;
  padding: 5px;
  border-radius: 30px;
  font-size: 12px;
  margin-right: 10px;
}

</style>