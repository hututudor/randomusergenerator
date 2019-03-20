import React, {Component} from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    user: null,
    selected: 'name',
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios.get('https://randomuser.me/api').then(res => {
      this.setState({
        user: res.data.results[0],
      });
    });
  };

  getDisplay = () => {
    switch (this.state.selected) {
      case 'name':
        return (
          this.state.user.name.first.toUpperCase() +
          ' ' +
          this.state.user.name.last.toUpperCase()
        );
      case 'birth':
        let date = new Date(this.state.user.dob.date);
        return date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();
      case 'email':
        return this.state.user.email;
      case 'adress':
        return this.state.user.location.street;
      case 'phone':
        return this.state.user.phone;
      case 'password':
        return this.state.user.login.password;
      default:
        return 'Display';
    }
  };

  getDisplayTitle = () => {
    switch (this.state.selected) {
      case 'name':
        return 'Hi, my name is';
      case 'birth':
        return 'My birthday is on';
      case 'email':
        return 'My email adress is';
      case 'adress':
        return 'I live on';
      case 'phone':
        return 'Call me';
      case 'password':
        return 'I use the password';
      default:
        return '';
    }
  };

  updateDisplay = name => {
    this.setState({selected: name});
  };

  getClass = name => {
    if(name === this.state.selected) {
      return 'active';
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.user ? (
          <div className="user">
            <span onClick={() => this.fetchData()}>
              <i className="fas fa-redo" />
            </span>
            <img src={this.state.user.picture.large} alt="" />
            <h1>{this.getDisplayTitle()}</h1>
            <p>{this.getDisplay()}</p>
            <div className="act">
              <p className={this.getClass('name')} onMouseEnter={() => this.updateDisplay('name')}>
                <i className="fas fa-user" />
              </p>
              <p className={this.getClass('email')} onMouseEnter={() => this.updateDisplay('email')}>
                <i className="fas fa-envelope" />
              </p>
              <p className={this.getClass('birth')} onMouseEnter={() => this.updateDisplay('birth')}>
                <i className="fas fa-calendar" />
              </p>
              <p className={this.getClass('adress')} onMouseEnter={() => this.updateDisplay('adress')}>
                <i className="fas fa-map" />
              </p>
              <p className={this.getClass('phone')} onMouseEnter={() => this.updateDisplay('phone')}>
                <i className="fas fa-phone" />
              </p>
              <p className={this.getClass('password')} onMouseEnter={() => this.updateDisplay('password')}>
                <i className="fas fa-lock" />
              </p>
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default App;
