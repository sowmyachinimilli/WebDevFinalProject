import {useState} from 'react';
import "./Login.css";

function Login({onLogin}){
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    return(
        <div className='login-content'>
        <div className='wall'>
          <img className='wall-image' src='/images/wall.jpg' alt="app-wallpaper" />
        </div>
        <div className='login'>
        <div className='logo'>
        <h1 className='app-title'>Fresh Farm</h1>
        </div>
        <form className='login-form'>
        <div className='login-area'>
          <input className='txtusername' value={username} placeholder="Username" onInput={ (e)=>{
            setUsername(e.target.value)}}/>
          <input className='txtpassword' type="password" value={password}  placeholder="Password" onInput={ (e)=>{
            setPassword(e.target.value)}}/>
        <div className='loginbtn'>
        <button className='btn-login' type='button' onClick={ ()=> 
        {onLogin(username)} }>Login</button>
        </div>
        </div>
      </form>
      </div>
      </div>
    );
}

export default Login;