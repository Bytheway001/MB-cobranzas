import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import { Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../ducks/session';
const HomeScreen = ({ login, user, loading, history }) => {

    const responseGoogle = (response) => {
        console.log(response.profileObj)
        login(response.profileObj)
        history.push('/')

    }
    if (!user) {
        return (
            <div className={loading ? 'login d-none' : 'login'}>
                <div className='login-form'>
                    <h2 className='my-5'>Sistema de Cobranzas</h2>
                    <div>
                        <p>Usa tu cuenta megabadvisors para ingresar</p>
                        <GoogleLogin
                            clientId="346512427285-0gs9tg2cvhd0v4b3r5h7dvjitm8fkcal.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
                        />
                    </div>


                </div>
            </div>
        )
    }
    else{
        return <Redirect to='/'/>
    }

}
const mapStateToProps = state => ({
    user: state.session.user
})

const mapDispatchToProps = dispatch => ({
    login: (data) => dispatch(login(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);