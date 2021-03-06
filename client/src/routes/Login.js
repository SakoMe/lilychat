import React, { Component } from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { Container, Header, Input, Button } from 'semantic-ui-react';
import { gql, graphql } from 'react-apollo';

class Login extends Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      email: '',
      password: '',
    });
  }

  onSubmit = async () => {
    const { email, password } = this;
    const response = await this.props.mutate({
      variables: { email, password },
    });
    const { ok, token, refreshToken } = response.data.login;
    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
    }
  };

  onChange = event => {
    const { name, value } = event.target;
    this[name] = value;
  };

  render() {
    const { email, password } = this;
    return (
      <Container text>
        <Header as="h2">Login</Header>
        <Input name="email" onChange={this.onChange} value={email} placeholder="Email..." fluid />
        <Input
          name="password"
          onChange={this.onChange}
          value={password}
          type="password"
          placeholder="Password..."
          fluid
        />
        <Button fluid onClick={this.onSubmit}>
          Submit
        </Button>
      </Container>
    );
  }
}

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(loginMutation)(observer(Login));
