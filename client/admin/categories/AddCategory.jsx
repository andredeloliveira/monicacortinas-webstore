Meteor.subscribe("categories");
AddCategory = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    return {
      categories: Categories.find({}).fetch()
    }
  },
  categoriesOptionsRender(){
    return this.data.categories.map( (category, index) =>{
      return( <option key={index} value={category._id}>
                  {category.name}
              </option>);
    });
  },
  onSubmit(event){
    event.preventDefault();
    /*still need to be validated!*/
    newCategoryObj = {
      name: event.target.name.value,
      description: event.target.description.value,
      parentCategory: event.target.parentCategory.value,
    };

    Categories.insert(newCategoryObj);
    event.target.name.value = '';
    event.target.description.value= '';
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
          <h1>Nova Categoria</h1>
          <form onSubmit={this.onSubmit} className="ui form" >
            <div className="field">
              <label>Nome</label>
              <input type="text" name="name" placeholder="Name" />
            </div>
            <div className="field">
              <label>Descrição</label>
              <input type="text" name="description" placeholder="Descrição" />
            </div>
            <div className="field">
              <label>Categoria Superior</label>
              <select className="ui fluid dropdown" name="parentCategory">
                  <option value="">Nenhuma</option>
                {this.categoriesOptionsRender()}
              </select>
            </div>
            <button className="ui button" type="submit">Adicionar</button>
         </form>
       </div>
      );
  }
});
