import './Controls.css';

function Controls({ onLogout }){

    return(
        <div className='header'>
        <div className='header-title'>
            <h1 className='app-title'>Fresh Farm</h1>
        </div>
        <div className='logout'>
        <button className='btn-logout' type="button" onClick={onLogout}>Logout</button>
        </div>
        </div>
    );
}

export default Controls;