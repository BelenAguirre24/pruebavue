import { axiosInstance } from 'boot/axios'

export const userService = {
  getList (gender, nat) {
    let queryFilter = ''
    if (gender) queryFilter = queryFilter + `&gender=${gender}`
    if (nat) queryFilter = queryFilter + `&nat=${nat}`
    return axiosInstance.get('/?results=100' + queryFilter || '')
      .then( ({ data }) => data.results)
  }
}
