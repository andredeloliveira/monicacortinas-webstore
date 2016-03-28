Shipping = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    return {
      loadingGmaps : ! GoogleMaps.loaded(),
    }
  },
  toShoppingCart(event){
    event.preventDefault();
    FlowRouter.go("shoppingCart");
  },
  onSubmit(event){
    event.preventDefault();
    var shippingInfo = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      address: {
        route: event.target.route.value,
        street_number: event.target.street_number.value,
        postal_code: event.target.postal_code.value,
        state: event.target.administrative_area_level_1.value,
        country: event.target.country.value,
        city: event.target.locality.value
      },
      owner: Meteor.user()._id
    };
    var si = ShippingInfos.insert(shippingInfo, (err, id) => {
      if(err){
        console.error(err.reason);
      }else{
        return id;
      }
    });
    /*clean the form after adding the new Shipping info*/
    event.target.firstName.value = '';
    event.target.lastName.value = '';
    event.target.route.value= '';
    event.target.street_number.value = '';
    event.target.postal_code.value = '';
    event.target.administrative_area_level_1.value = '';
    event.target.country.value = '';
    event.target.locality.value = '';
    console.log(si);
  },
  geolocate(event){
    event.preventDefault();
    $('#autocomplete').geocomplete({details: "form"});
  },
  render(){
    if(this.data.loadingGmaps){
      return <LoadingSpinner />
    }
    return(
    <div>
      <div>
        <ExistingShippingInfo ref="existingInfo" />
      </div>
      <form onSubmit={this.onSubmit} className="ui form">
        <h4 className="ui dividing header">Cadastrar informações de entrega</h4>
        <div className="field">
          <label>Nome</label>
          <div className="two fields">
            <div className="field">
              <input type="text" name="firstName" placeholder="Nome" />
            </div>
            <div className="field">
              <input type="text" name="lastName" placeholder="Sobrenome" />
            </div>
          </div>
        </div>
        <div className="field">
          <label>Digite seu endereço...</label>
          <div className="field">
            <input id="autocomplete" type="text"  placeholder="Digite seu endereço..."  onFocus={this.geolocate}/>
          </div>
          <div className="field">
            <label>Endereço</label>
          </div>
          <div className="fields">
            <div className="ten wide field">
              <input type="text" name="route" placeholder="Logradouro" />
            </div>
            <div className="three wide field">
              <input type="text" name="street_number" placeholder="Numero"/>
            </div>
            <div className="three wide field">
              <input type="text" name="postal_code" placeholder="CEP" />
            </div>
          </div>
        </div>
        <div className="three fields">
          <div className="field">
            <label>Estado</label>
            <input type="text" name="administrative_area_level_1" placeholder="State"/>
          </div>
          <div className="field">
            <label>País</label>
              <input type="text" name="country" placeholder="Country"/>
          </div>
          <div className="field">
            <label>Cidade</label>
            <input type="text" name="locality" placeholder="City"/>
          </div>
        </div>
          <div className="field">
            <input type="submit" className="ui button" value="Cadastrar Endereço"/>
          </div>
      </form>
      <div className="ui divider"></div>
  </div>
  );
  }
});
