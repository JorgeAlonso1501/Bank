import React, { Component } from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';


const baseUrl="http://localhost:3001/users";
const cookies= new Cookies();

class Login extends Component{

    state={
        form:{
            username:"",
            password:""
        }
    }

    handleChange = async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form)
    }

    signUp = async ()=>{
        await axios.get(
            baseUrl, {params: {username: this.state.form.username, password: md5 (this.state.form.password)}})
        .then(response=>{
            return response.data;
        })
        .then (response=>{
            if(response.length>0){
                var answer= response[0];
                cookies.set('id', answer.id, {path: "/"});
                cookies.set('last_name', answer.last_name, {path: "/"});
                cookies.set('name', answer.name, {path: "/"});
                cookies.set('username', answer.username, {path: "/"});
                cookies.set('email', answer.email, {path: "/"});
                window.location.href="./Home";


            }else{
                alert('Some data is wrong')
            }
        })
        .catch(error=>{
            console.log(error);
        })
    }

    componentDidMount(){
        if(cookies.get('username')){
            window.location.href="./Home";
        }
    }

    render(){
        return(
            <div className='MainContainer'>
                <div className='SubContainer'>
                    <div className='form-group'>
                        <label>User: </label>
                        <br/>
                        <input type='text' className='form-control' name='username' onChange={this.handleChange}/>
                        <br/>
                        <label>Password: </label>
                        <br/>
                        <input type='password' className='form-control' name='password' onChange={this.handleChange}/>
                        <br/>
                        <button className='btn btn-primary' onClick={()=>this.signUp()}>Sign up</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;