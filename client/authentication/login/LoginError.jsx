/*Login error component. A message can be passed on the prop message.*/
LoginError = React.createClass({

  render(){
    return(
        <div className="ui error message">
          <div className="header">
            Login Error!
          </div>
          <p>O seguinte erro aconteceu: <strong>{this.props.message}</strong>. Por favor, confira seus detalhes e tente novamente.</p>
      </div>
    );
  }
});
