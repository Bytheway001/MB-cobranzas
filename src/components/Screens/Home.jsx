import React from 'react';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../ducks/session';
import { Button } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
const HomeScreen = ({ login, user, loading, history }) => {
    const responseGoogle = (response) => {
        console.log(response.profileObj)

        login(response.profileObj)
        history.push('/')
    }
    const responseGoogleFail = (response) => {
        console.log('----')
        console.log(response)
    }
    if (!user) {
        return (
            <div className={loading ? 'login d-none' : 'login'}>
                <div className='login-form'>
                    <h2>PS Cobranzas</h2>
                    <div className='text-center'>
                        <p>Usa tu cuenta megabadvisors para ingresar</p>
                        <GoogleLogin
                            clientId="346512427285-0gs9tg2cvhd0v4b3r5h7dvjitm8fkcal.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogleFail}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
                            render={(renderProps) => {
                                return <Button size='lg' className='text-left' onClick={renderProps.onClick} disabled={renderProps.disabled} >
                                    <FontAwesomeIcon icon={faGoogle} color='white' size='lg' className='mr-3'/>
                                    Ingresar
                                 </Button>
                            }
                            }
                        />
                    </div>


                </div>
            </div>
        )
    }
    else {
        return <Redirect to='/' />
    }

}
const mapStateToProps = state => ({
    user: state.session.user
})

const mapDispatchToProps = dispatch => ({
    login: (data) => dispatch(login(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);