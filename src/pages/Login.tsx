import {useHistory} from 'react-router-dom';
import OutlinedCard from '../components/utils/OutlinedCard';
import LoginBox from '../components/login/LoginBox';
import authenticationManager from '../api/authentication/AuthenticationManager';
import {useState} from 'react';
import {LoginResponseStatus} from '../api/authentication/LoginResponse';
import './Login.scss';
import CommonPageLayout from '../components/utils/CommonPageLayout';
import AuthenticationAPI from '../api/authentication/AuthenticationAPI';

/**
 * The page for the user to log in
 * @constructor
 */
const Login = () => {
    // Error state for the login box
    const [errorState, setErrorState] = useState<string | undefined>(undefined);

    // Get the history hook
    const history = useHistory();

    return (
        <CommonPageLayout id={'login-container'}>
            <OutlinedCard>
                <p className={'title-text'}>Se connecter</p>

                <LoginBox error={errorState}
                          onLoginButtonClick={(username, password) => {
                              AuthenticationAPI.login(username, password)
                                  .then((res) => {
                                      if (res.error) {
                                          // Show an error message according to the status code
                                          switch (res.status) {
                                              case LoginResponseStatus.STATUS_REQUEST_ERROR:
                                                  setErrorState('Une erreur inconnue s\'est produite');
                                                  break;
                                              case LoginResponseStatus.STATUS_INVALID_CREDENTIALS:
                                                  setErrorState('Le nom d\'utilisateur/mot de passe est invalide');
                                                  break;
                                          }
                                      } else {
                                          // Remember the JWT
                                          authenticationManager.handleJWT(res.token)
                                              .then((res) => {
                                                  if (res) {
                                                      // Replace the current path
                                                      history.replace('/');
                                                  }
                                              });
                                      }
                                  });
                          }}
                          onRegisterButtonClick={() => {
                              history.push('/register');
                          }}/>
            </OutlinedCard>
        </CommonPageLayout>
    );
};

export default Login;
