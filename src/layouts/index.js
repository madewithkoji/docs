import React from "react"
import { Link } from "gatsby"

class DefaultLayout extends React.Component {
  render() {
    return (
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 650,
        }}
      >
        {this.props.children}
      </div>
    )
  }
}

export default DefaultLayout