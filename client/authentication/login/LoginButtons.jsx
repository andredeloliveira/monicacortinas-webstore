LoginButtons = React.createClass({
  goToLogin(){
    FlowRouter.go('LoginForm');
  },
  goToRegister(){
    FlowRouter.go('RegisterForm');
  },
  render(){
    return(
      <div>
        <button className="ui blue basic button right floated" onClick={this.goToLogin}>Entrar</button>
        <button className="ui green basic button right floated" onClick={this.goToRegister}>Cadastrar-se</button>
      </div>
    );
  }
});
