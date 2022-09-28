<template>
  <q-page padding>

    <div class="text-h6 q-my-md">Usuarios</div>

    <q-table
      class="full-width"
      :data="users"
      :columns="columns"
      row-key="email"
      :rows-per-page-options="[10, 20, 50, 100]"
      @row-click="onRowClick"
    >
      <template v-slot:top>
        <q-space />
        <q-btn color="primary" :loading="loading" label="Obtener Datos" @click="loadUsers" />
      </template>
    </q-table>
    <q-card class="q-mt-lg">
      <q-card-section>
        <div class="row justify-between items-center q-mb-sm">
          <div class="text-subtitle2 text-bold">Filtros:</div>
          <q-btn dense color="secondary" outline :loading="loading" label="Quitar Filtros" @click="removeFilters" />
        </div>
        <div class="row justify-between q-gutter-md">
          <q-select
            label="Género"
            v-model="genderFilter"
            :options="genderOptions"
            class="col"
            outlined dense
            emit-value
            map-options
            @input="loadUsers"
          />
          <q-input
            label="Edad"
            v-model="ageFilter"
            class="col"
            outlined
            dense
          />
          <q-select
            label="Nacionalidad"
            v-model="countryFilter"
            :options="countryListAllIsoData"
            option-label="name"
            option-value="code"
            emit-value
            map-options
            class="col"
            outlined
            dense
            @input="loadUsers"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapMutations } from 'vuex'
import { userService } from 'src/services/userService'
import { genderOptions, countryListAllIsoData } from 'src/utils/constants'

export default {
  name: 'PageIndex',
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
        { name: 'dob', align: 'left', label: 'Fecha de Nacimiento',field: row => row.dob.date, sortable: true },
        { name: 'registered', align: 'left', label: 'Fecha de Registro', field: row => row.registered.date, sortable: true },
      ]
    }
  },
  mounted () {
    this.loadUsers()
  },
  methods: {
    ...mapMutations('user', ['setSelectedUser']),
    async loadUsers () {
      this.loading = true
      this.users = await userService.getList(this.genderFilter, this.countryFilter)
      // console.log(this.users)
      this.loading = false
    },
    removeFilters () {
      this.countryFilter = null
      this.ageFilter = null
      this.genderFilter = null
      this.loadUsers()
    },
    onRowClick(_, row) {
      this.setSelectedUser(row)
      this.$router.push('/profile')
    }
  
  }
}
</script>
