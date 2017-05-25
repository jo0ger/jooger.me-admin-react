import Axios from 'axios'

export const Service = {
  fetchZen: () => Axios.get('https://api.github.com/zen')
}

export default Service
