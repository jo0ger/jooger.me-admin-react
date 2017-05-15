import { connect } from 'react-redux'
import Zen from '../components/Zen'
import { fetchZen, clearZen } from '../modules/zen'

const mapState2Props = (state) => {
  return { zen: state.zen }
}

const mapDispatch2Props = {
  fetchZen,
  clearZen
}

export default connect(mapState2Props, mapDispatch2Props)(Zen)
