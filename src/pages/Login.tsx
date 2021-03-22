import {useHistory} from 'react-router-dom';
import OutlinedCard from '../components/utils/OutlinedCard';
import LoginBox from '../components/login/LoginBox';
import {AuthenticationManager} from '../api/authentication/AuthenticationManager';
import {useState} from 'react';
import {LoginResponseStatus} from '../api/authentication/LoginResponse';
import './Login.scss';

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
        <div id={'login-container'}>
            <OutlinedCard>
                <h1>Se connecter</h1>
                <LoginBox error={errorState}
                          onLoginButtonClick={(username, password) => {
                              AuthenticationManager.getInstance().login(username, password)
                                  .then((response) => {
                                      if (response.error) {
                                          // Show an error message according to the status code
                                          switch (response.status) {
                                              case LoginResponseStatus.STATUS_REQUEST_ERROR:
                                                  setErrorState('Une erreur inconnue s\'est produite');
                                                  break;
                                              case LoginResponseStatus.STATUS_INVALID_CREDENTIALS:
                                                  setErrorState('Le nom d\'utilisateur/mot de passe est invalide');
                                                  break;
                                          }
                                      } else {
                                          // Replace the current path
                                          history.replace('/');
                                      }
                                  });
                          }}
                          onRegisterButtonClick={() => {
                              history.push('/register');
                          }}/>
            </OutlinedCard>
        </div>
    );
};

export default Login;
