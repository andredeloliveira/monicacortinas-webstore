RegisterForm = React.createClass({
  error: '',
  onSubmit(event){
    event.preventDefault();
    /*New user's object*/
    var newUser = {
      email: event.target.email.value,
      password: event.target.password.value,
      profile: {
        name: event.target.name.value,
        /*extra profile data can be handle here*/
        surname: event.target.surname.value
      }
    };
    /*Now we can create the user on Accounts and redirect to the Home route*/

    Accounts.createUser(newUser, (err) =>{
       if(err){
         this.props.error = err.reason;
       }else {
         FlowRouter.go('Home');
       }
    });
  },
  render(){
    return(
      <div className="ui form success">
        <form onSubmit={this.onSubmit}>
          <div className="field">
            <label>Nome</label>
            <input type="text" name="name" placeholder="Nome"/>
          </div>
          <div className="field">
            <label>Sobrenome</label>
            <input type="text" name="surname" placeholder="Sobrenome"/>
          </div>
          <div className="field">
            <label>E-mail</label>
            <input type="email" name="email" placeholder="Ex: john@provedor.com"/>
          </div>
          <div className="field">
            <label>Senha</label>
            <input type="password" name="password" placeholder="Senha"/>
          </div>
          <div>
            <input type="submit" value="Cadastrar" className="ui green basic button"/>
          </div>
        </form>
        <div className="ui error message">
          {this.props.error}
        </div>
      </div>
    );
  }
});
