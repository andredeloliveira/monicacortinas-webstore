Meteor.subscribe("images");
Meteor.subscribe("brands");
Meteor.subscribe("categories");

AddProduct = React.createClass({
mixins: [ReactMeteorData],
getMeteorData(){
  return{
    brands: Brands.find({}).fetch(),
    categories: Categories.find({}).fetch()
  }
},
  onSubmit(event){
    event.preventDefault();
    function addImagesToDB(images){
      var imagesToBeInserted = [];
      for(var i =0; i< images.length; i++){
        var pImage = Images.insert(images[i], (err, fileObj) => {
          if(err){
            console.error('duh');
          }else {
            console.log(pImage);
            return fileObj;
          }
        });
        imagesToBeInserted.push(pImage);
      }
      return imagesToBeInserted;
    }
    /*get all the values again, into the object*/
    var newProductObj = new ProductObj({
      name: event.target.name.value,
      description: event.target.description.value,
      weight : event.target.weight.value,
      height : event.target.height.value,
      width : event.target.width.value,
      length : event.target.length.value,
      price : event.target.price.value,
      stock: event.target.stock.value,
      brand: event.target.brand.value,
      category: event.target.category.value,
    });

    /*adds the images to the database.. I think it can be refactored to a
    single function that returns an Array with all the added images, but
    we still need to add the component to add into the db and another one for
    image buckets such as s3, etc*/
    var images = this.refs.images.returnFiles();
    var colors = this.refs.colors.returnFiles();
    if(images.length > 0) {
      newProductObj.images = addImagesToDB(images);
    }
    if(colors.length > 0){
      newProductObj.colors= addImagesToDB(colors);
    }

    Products.insert(newProductObj);

    event.target.name.value = '';
    event.target.description.value = '';
    event.target.weight.value = '';
    event.target.height.value = '';
    event.target.width.value = '';
    event.target.length.value = '';
    event.target.price.value = '';
    event.target.stock.value = '';

    /*after everything, closes the modal*/
    this.props.close();
  },

  brandsOptionsRender(){
    return this.data.brands.map((brand) => {
      return (
          <option key={brand._id} value={brand._id}>
            {brand.name}
          </option>
      );
    });
  },
  categoriesOptionsRender(){
    return this.data.categories.map( (category) => {
      return(
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
      );
    });
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
      <h1>Novo Produto</h1>
      <form onSubmit={this.onSubmit} className="ui form" >
        <div className="field">
          <label>Nome</label>
          <input type="text" name="name" placeholder="Nome" />
        </div>
        <div className="field">
          <label>Descrição</label>
          <input type="text" name="description" placeholder="Descrição"/>
        </div>
        <div className="field">
          <label>Peso</label>
          <input type="text" placeholder="Peso" name="weight" />
        </div>
        <h4 className="ui dividing header">Tamanho(cm)</h4>
        <div className="three fields">
          <div className="field">
            <input type="number" placeholder="Altura" name="height" />
          </div>
          <div className="field">
            <input type="number" placeholder="Largura" name="width"/>
          </div>
          <div className="field">
            <input type="number" placeholder="Comprimento" name="length" />
          </div>
        </div>
        <div className="field">
            <label>Preço</label>
            <input type="text" placeholder="Preço" name="price" />
        </div>
        <div className="field">
            <label>Quantidade no Estoque</label>
            <input type="number" placeholder="Quantidade no Estoque" name="stock"  />
        </div>
        <div className="field">
            <label>Marca</label>
            <select className="ui fluid dropdown" name="brand">
              <option value="">Escolha..</option>
              {this.brandsOptionsRender()}
            </select>
        </div>
        <div className="field">
            <label>Categoria</label>
              <select className="ui fluid dropdown" name="category">
                <option value="">Escolha..</option>
                {this.categoriesOptionsRender()}
              </select>
        </div>
        <div className="field">
          <label>Fotos</label>
          <div>
            <ImageField ref="images" />
          </div>
          </div>
          <div className="field">
            <label>Cores</label>
            <div>
              <ImageField ref="colors" />
            </div>
            </div>
        <button className="ui button" type="submit" >Adicionar</button>
     </form>

   </div>
  );
  }
});
