import React from 'react'
import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';

// example of a query
const test = gql`
  query test {
    test {
      id
    }
  }
`

// example of a graphql mutation
const signup = gql`
  mutation Signup($email: String, $password: String) {
    signup(email: $email, password: $password) {
      email
    }
  }
`

// querries run automatically!
@compose(
  graphql(test),
  graphql(signup)
)
class Signup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  signup = () => {
    const { email, password } = this.state
    this.props.mutate({ variables: { email, password } })
      .then(data => {
        // set in localstorage...
      })
      .catch(err => {
        // error
      })
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <input placeholder='email' name='email' onChange={this.onChange}/>
        <input placeholder='password' type='password' name='password' onChange={this.onChange}/>
        <button onClick={this.signup} >press</button>
      </div>
    )
  }
}

export default Signup