Meteor.subscribe("categories");
EditCategory = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    return {
      parentCategory: Categories.findOne({_id: this.props.category.parentCategory}),
      categories: Categories.find({}).fetch()
    }
  },
  categoriesOptionsRender(){
    return this.data.categories.map( (category) =>{
      return( <option key={category._id} value={category._id}>
                  {category.name}
              </option>
      );
    });
  },
  onSubmit(event){
    event.preventDefault();
    newCategoryObj = {
      name: event.target.name.value,
      description: event.target.description.value,
      parentCategory: event.target.parentCategory.value,
    };

    Categories.update({_id: this.props.category._id}, {$set:
      {
        'name': newCategoryObj.name,
        'description': newCategoryObj.description,
        'parentCategory': newCategoryObj.parentCategory
      }
    });
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
          <h1>Editar Categoria</h1>
          <form onSubmit={this.onSubmit} className="ui form" >
            <div className="field">
              <label>Nome</label>
              <input type="text" name="name" placeholder="Nome" defaultValue={this.props.category.name}/>
            </div>
            <div className="field">
              <label>Descrição</label>
              <input type="text" name="description" placeholder="Description" defaultValue={this.props.category.description}/>
            </div>
            <div className="field">
              <label>Categoria Superior</label>
              <select className="ui fluid dropdown" name="parentCategory">
                { this.data.parentCategory ?
                  <option value={this.data.parentCategory._id}>{this.data.parentCategory.name}</option> :
                  <option value="">Nenhuma</option>}
                {this.categoriesOptionsRender()}
              </select>
            </div>
            <button className="ui button" type="submit">Atualizar</button>
         </form>
       </div>
      );
  }
});
