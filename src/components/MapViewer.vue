<template>
  <LMap style="height: 150px" :zoom="zoom" :center="center">
    <LTileLayer :url="url" :attribution="attribution"></LTileLayer>
    <LMarker :lat-lng="markerLatLng" :icon="new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })"></LMarker>
  </LMap>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import markerIconPng from 'leaflet/dist/images/marker-icon.png'
import { Icon } from 'leaflet'

export default {
  name: 'MapViewer',
  props: { lat: [Number, String], lng: [Number, String] },
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data () {
    return {
      Icon,
      markerIconPng,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: [this.lat, this.lng],
      markerLatLng: [this.lat, this.lng]
    }
  }
}
</script>
