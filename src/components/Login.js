import React from 'react';
import propTypes from 'prop-types';
import rockGlass from '../images/rockGlass.svg';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      invalid: true,
    };
  }

  inputRolesValidation = () => {
    const { email, password } = this.state;
    const minLetters = 6;
    if (
      email.length > 0
      && email.includes('@')
      && email.endsWith('.com')
      && password.length > minLetters
    ) {
      this.setState({
        invalid: false,
      });
    } else {
      this.setState({
        invalid: true,
      });
    }
  }

  handleInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => this.inputRolesValidation());
  }

  handleEnter = (email) => {
    const storageEmail = { email };
    localStorage.setItem('user', JSON.stringify(storageEmail));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    const { history } = this.props;
    history.push('/foods');
  }

  render() {
    const { email, password, invalid } = this.state;
    return (
      <div className="initial-page">
        <div className="login-page">
          <span className="logo">TRYBE</span>
          <object
            className="rocksGlass"
            type="image/svg+xml"
            data={ rockGlass }
          >
            Glass
          </object>
          <section>
            <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--Eg8INSNe--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/5302/26258239-4ac6-4d28-b94c-ba6d3f9eabc2.png" alt="Logo da trybe" />
            <h2>App de Receitas</h2>
          </section>
          <p>Informe seu email e senha:</p>
          <form>
            <input
              type="email"
              name="email"
              placeholder="Email"
              data-testid="email-input"
              value={ email }
              onChange={ (event) => this.handleInputChange(event) }
            />
            <input
              type="password"
              name="password"
              placeholder="Senha"
              data-testid="password-input"
              value={ password }
              onChange={ (event) => this.handleInputChange(event) }
            />
            {
              (invalid) ? <p>Por favor preencha corretamente as informações</p> : <> </>
            }
            <button
              type="button"
              disabled={ invalid }
              data-testid="login-submit-btn"
              onClick={ () => this.handleEnter(email) }
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

export default Login;
