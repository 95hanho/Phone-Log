<template>
  <div id="app">
    <div class="container">
      <div id="accordion">
        <div class="card card-default">
          <div class="card-header" style="height:65px;background:#ddddd6;">
            <img src="sejongLogo.PNG" class="float-left" />
            <button
              v-if="$cookies.get('refreshToken')"
              @click="logout"
              class="btn btn-info float-right btn-sm"
              style="margin-left:5px"
            >
              LOGOUT
            </button>
            <button
              v-if="admin && $cookies.get('refreshToken')"
              @click="infoBtn"
              class="btn btn-success float-right btn-sm"
              style="margin-left:5px"
            >
              INFO
            </button>
          </div>
        </div>
        <div class="row" style="margin-top:20px;margin-bottom:20px;">
          <div class="col-md-3 col-lg-12">
            <div class="text-center">
              <h1>세종텔레콤 CDR 조회 API</h1>
            </div>
          </div>
        </div>
        <router-view @adminLogin="adminLogin" />
        <div class="card card-default" style="margin-top:56px;">
          <div
            class="card-header"
            style="height:80px;background:#ddddd6;"
          ></div>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  data() {
    return {
      admin: false,
    };
  },
  components: {},
  created() {
    this.adminLogin();
  },
  beforeDestroy() {},
  methods: {
    logout() {
      this.$store.commit("logout");
      this.admin = false;
      this.$router.push({ name: "Login" });
    },
    adminLogin() {
      if (this.$cookies.get("accessToken")) {
        this.$store
          .dispatch("loginInfo", this.$cookies.get("accessToken"))
          .then((res) => {
            if (res.id == "admin") {
              this.admin = true;
            }
          })
          .catch((err) => {
            alert(err);
            this.$router.push({ name: "Login" });
          });
      }
    },
    infoBtn() {
      if (this.$route.name == "Search") {
        this.$router.push({ name: "UserInput" });
      } else {
        this.$router.push({ name: "Search" });
      }
    },
  },
};
</script>

<style></style>
