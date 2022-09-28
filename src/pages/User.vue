<template>
  <q-page padding>

    <div class="text-h6 q-my-md">Perfil</div>

    <q-card>
      <q-card-section>
        <div class="row items-center">
          <div class="col-3">
            <q-img :src="selectedUser.picture.large" width="150px" :ratio="1" style="border-radius: 100px"/>
          </div>
          <MapViewer :lat="selectedUser.location.coordinates.latitude" :lng="selectedUser.location.coordinates.longitude" class="col-7" />
          <q-btn icon="favorite" flat color="red" rounded class="col-2" />
        </div>
      </q-card-section>
      <q-card-section class="text-center">
        <div class="text-subtitle1 text-weight-medium">
          {{ selectedUser.name.first }} {{ selectedUser.name.last }}
        </div>
        <div class="text-grey-8">
          {{ selectedUser.email }}
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="text-center">
        <div class="">
          {{ selectedUser.location.city }}
        </div>
        <div class="">
          {{ selectedUser.location.street.name }}
        </div>
        <div class="text-bold">
          {{ selectedUser.phone }}
        </div>
      </q-card-section>
    </q-card>

  </q-page>
</template>

<script>
import { mapState } from 'vuex'
import { userService } from 'src/services/userService'
import { genderOptions, countryListAllIsoData } from 'src/utils/constants'
import MapViewer from 'components/MapViewer'

export default {
  name: 'PageUser',
  components: {MapViewer},
  data () {
    return {
      users: [],
      // usersTmp: [],
      genderFilter: null,
      ageFilter: null,
      countryFilter: null,
      genderOptions,
      countryListAllIsoData,
      loading: false,
      columns: [
        { name: 'gender', align: 'center', label: 'Genero', field: 'gender', sortable: true },
        { name: 'name', align: 'left', label: 'Nombre', field: 'name', format: row => `${row.first} ${row.last}`, sortable: true },
        { name: 'email', align: 'left', label: 'Email', field: 'email', sortable: true },
        { name: 'country', align: 'left', label: 'Nacionalidad', field: row => row.location.country, sortable: true },
        { name: 'age', align: 'left', label: 'Edad', field: row => row.dob.age, sortable: true },
        { name: 'dob', align: 'left', label: 'Fecha de Nacimiento', field: row => row.dob.date, sortable: true },
        { name: 'registered', align: 'left', label: 'Fecha de Registro', field: row => row.registered.date, sortable: true },
      ]
    }
  },
  mounted () {
    this.loadUsers()
  },
  computed: {
    ...mapState('user', ['selectedUser'])
  },
  methods: {
    async loadUsers () {
      this.loading = true
      this.users = await userService.getList(this.genderFilter, this.countryFilter)
      this.loading = false
    },
    removeFilters () {
      this.countryFilter = null
      this.ageFilter = null
      this.genderFilter = null
      this.loadUsers()
    }
  }
}
</script>
