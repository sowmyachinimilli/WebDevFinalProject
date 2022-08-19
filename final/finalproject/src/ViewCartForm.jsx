import './ViewCartForm.css';

function ViewCartForm({onViewCart}){
    function onSubmit(e) {
        e.preventDefault();
        onViewCart();
      }
    return(
        <div>
            <form className="viewcart_form" action="#/viewcart" onSubmit={onSubmit}>
                <button className='btn-viewcart' type="submit">View Cart</button>
            </form>
        </div>
    );
}
export default ViewCartForm;