Meteor.subscribe("images");
Meteor.subscribe("brands");
Meteor.subscribe("categories");

EditProduct = React.createClass({
mixins: [ReactMeteorData],
getMeteorData(){
  return{
    brand: Brands.findOne(this.props.product.brand),
    brands: Brands.find({}).fetch(),
    category: Categories.findOne(this.props.product.category),
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
            return fileObj;
          }
        });
        imagesToBeInserted.push(pImage);
      }
      return imagesToBeInserted;
    }
    /*get all the values again, into the object*/
    var newProductObj = {
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
      images: this.props.product.images,
      colors: this.props.product.colors
    };
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

    Products.update({_id: this.props.product._id}, {$set:
      {
        'name': newProductObj.name,
        'description': newProductObj.description,
        'weight': newProductObj.weight,
        'height': newProductObj.height,
        'width': newProductObj.width,
        'length': newProductObj.length,
        'price': newProductObj.price,
        'stock': newProductObj.stock,
        'brand' : newProductObj.brand,
        'category' : newProductObj.category,
        'images': newProductObj.images,
        'colors': newProductObj.colors
      }
    });
    /*after everything, closes the modal*/
    this.props.close();
  },
  actualImagesRender(){
    return this.props.product.images.map((image, index)=>{
      return <img key={index} src={image.url()} className="adminImage" />
    });
  },
  actualColorsRender(){
    return this.props.product.colors.map( (image, index) => {
      return <img key={index} src={image.url()} className="adminImage" />
    });
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
      <h1>Editar Produto</h1>
      <form onSubmit={this.onSubmit} className="ui form" >
        <div className="field">
          <label>Nome</label>
          <input type="text" name="name" placeholder="Nome" defaultValue={this.props.product.name}/>
        </div>
        <div className="field">
          <label>Descrição</label>
          <input type="text" name="description" placeholder="Descrição" defaultValue={this.props.product.description}/>
        </div>
        <div className="field">
          <label>Peso</label>
          <input type="text" placeholder="Peso" name="weight" defaultValue={this.props.product.weight}/>
        </div>
        <h4 className="ui dividing header">Tamanho(cm)</h4>
        <div className="three fields">
          <div className="field">
            <input type="number" placeholder="Altura" name="height" defaultValue={this.props.product.height}/>
          </div>
          <div className="field">
            <input type="number" placeholder="Largura" name="width"  defaultValue={this.props.product.width}/>
          </div>
          <div className="field">
            <input type="number" placeholder="Comprimento" name="length" defaultValue={this.props.product.length}/>
          </div>
        </div>
        <div className="field">
            <label>Preço</label>
            <input type="text" placeholder="Preço" name="price" defaultValue={this.props.product.price}/>
        </div>
        <div className="field">
            <label>Quantidade Estoque</label>
            <input type="number" placeholder="Quantidade Estoque" name="stock" defaultValue={this.props.product.stock} />
        </div>
        <div className="field">
            <label>Marca</label>
            <select className="ui fluid dropdown" name="brand">
              {this.data.brand ? <option value={this.data.brand._id}>{this.data.brand.name}</option> :
              <option value="">Escolha..</option>}
              {this.brandsOptionsRender()}
            </select>
        </div>
        <div className="field">
            <label>Categoria</label>
              <select className="ui fluid dropdown" name="category">
                {this.data.brand ? <option value={this.data.category._id}>{this.data.category.name}</option>:
                <option value="">Escolha..</option>
                }
                {this.categoriesOptionsRender()}
              </select>
        </div>
        <div className="field">
          <label>Imagens</label>
          <div>
            <h1>Imagens atuais</h1>
            <br></br>
            <div>
              {this.actualImagesRender()}
            </div>
          </div>
          <div>
            <ImageField ref="images" />
          </div>
          </div>
          <div className="field">
            <label>Cores</label>
            <div>
              <h1>Cores Atuais</h1>
              <br></br>
              <div>
                {this.actualColorsRender()}
              </div>
            </div>
            <div>
              <ImageField ref="colors" />
            </div>
            </div>
        <button className="ui button" type="submit" >Atualizar</button>
     </form>

   </div>
  );
  }
});
