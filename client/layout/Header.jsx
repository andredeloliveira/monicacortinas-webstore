Header = React.createClass({
  mixins: [ReactMeteorData],
  /*gets the data and put into this.data.[property]*/
  getMeteorData(){
    var shoppingCartItemsHandler = Meteor.subscribe("shoppingcart");
    return {
      isCartLoading: ! shoppingCartItemsHandler.ready(),
      currentUser: Meteor.user(),
      shoppingCartItems: ShoppingCarts.find({}).fetch()[0]
    }
  },
  handleLogout(){
    Meteor.logout();
    FlowRouter.go("Home");
  },
  renderShoppingCart(){
    return <ShoppingCartHeader nItems={this.data.shoppingCartItems.items.length} /> ;
  },
  render(){
    var hasShoppingCart = this.data.shoppingCartItems;
    let currentUser = this.data.currentUser;
    if(currentUser){
      var logoutButton =<button className="ui red basic button right floated" onClick={this.handleLogout}>Sair</button>;
    }else {
      var loginButtons = <div> <LoginButtons/>
      </div>;
    }
 /*Ok. I've got things working now by some unknown force. I should finish this in a nice way.
  I should think about some styles as well
 */
    if(this.data.isCartLoading){
      return <LoadingSpinner />
    }
    return(
      <div className="ui fixed menu">
        <a className="item" href="/">Home</a>
        <a className="item" href="/admin">Admin</a>
        <div className="right menu">
        {logoutButton}
        {loginButtons}
        {currentUser && hasShoppingCart ? <div> {this.renderShoppingCart()}</div> :
         <div>
           <ShoppingCartHeader nItems={0} />

         </div>
        }
        </div>
      </div>
    );
  }
});
