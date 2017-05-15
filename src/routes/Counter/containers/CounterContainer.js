import { connect } from 'react-redux'
import { increment, doubleAsync } from '../modules/counter'
import Counter from '../components/Counter'

const mapState2Props = state => ({
  counter: state.counter
})

const mapDispatch2Props = {
  increment: () => increment(1),
  doubleAsync
}

export default connect(mapState2Props, mapDispatch2Props)(Counter)
