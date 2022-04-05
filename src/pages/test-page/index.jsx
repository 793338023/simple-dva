import React from 'react'
import { connect } from "zStore/configureStore";

function TestPage(props) {
  console.log(props);
  return (
    <div>
      <div onClick={() => props.dispatch({ type: 'home/asyncAdd' })}> click</div>
      <div onClick={() => props.dispatch({ type: 'home/add' })}> click2</div>
      <div>{props.number}</div>
    </div>
  )
}

export default connect(state => state.home)(TestPage)