<template>
  <div class="weather" v-if="weather.cityInfo">
    <div>
      <div class="weather-city-info">
        <span class="weather-city">{{
          weather.cityInfo.parent + weather.cityInfo.city
        }}</span>
        <span>{{ weather.weatherInfo.week }}</span>
      </div>
      <div>
        <span>{{ weather.weatherInfo.type }}</span>
        <span>{{ weather.weatherInfo.fx + weather.weatherInfo.fl }}</span>
      </div>
    </div>
    <div>
      <span>{{ weather.weatherInfo.high }}</span>
      <span>{{ weather.weatherInfo.low }}</span>
    </div>
    <div>
      <span>{{ weather.weatherInfo.notice }}</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";

const weather = reactive({
  cityInfo: null,
  weatherInfo: null,
});

onMounted(() => {
  getWeather();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      console.log(position,'position');
      
      console.log("Latitude: " + latitude + " Longitude: " + longitude);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
});

const getWeather = () => {
  // TODO: implement weather API call
  fetch("/api/weather/city/101280601")
    .then((response) => response.json())
    .then((data) => {
      console.log(data, "weather");
      weather.cityInfo = data.cityInfo;
      weather.weatherInfo = data.data.forecast[0];
    })
    .catch((error) => console.error(error));
};
</script>

<style lang="scss" scoped>
.weather {
  color: var(--vp-button-brand-text);
  background-color: var(--vp-button-brand-bg);
  border-radius: 10px;
  display: inline-flex;
  padding: 10px 15px;
  font-size: 14px;
  flex-direction: column;
  margin-top: 10px;
  .weather-city {
    font-size: 16px;
    font-weight: bold;
  }
  .weather-city-info {
    display: flex;
    justify-content: space-between;
  }
}
</style>