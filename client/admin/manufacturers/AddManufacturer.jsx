AddManufacturer = React.createClass({


  onSubmit(event){
    event.preventDefault();
    newManufacturerObj = {
      name: event.target.name.value,
      description: event.target.description.value
    };

    Manufacturers.insert(newManufacturerObj);
    event.target.name.value = '';
    event.target.description.value = '';
    this.props.close();
  },
  render(){
    style ={
      marginTop: '30px',
      marginLeft: '30px',
      marginRight: '30px',
      marginBottom: '50px'
    };
    return(
        <div style={style}>
          <h1>Novo Fabricante</h1>
          <form onSubmit={this.onSubmit} className="ui form" >
            <div className="field">
              <label>Nome</label>
              <input type="text" name="name" placeholder="Nome"/>
            </div>
            <div className="field">
              <label>Descrição</label>
              <input type="text" name="description" placeholder="Descrição"/>
            </div>
            <button className="ui button" type="submit">Adicionar</button>
         </form>
       </div>
      );
  }
});
