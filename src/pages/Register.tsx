import {useHistory} from 'react-router-dom';
import OutlinedCard from '../components/utils/OutlinedCard';
import RegisterBox from '../components/register/RegisterBox';
import {AuthenticationManager} from '../api/authentication/AuthenticationManager';
import {RegisterResponseStatus} from '../api/authentication/RegisterResponse';
import './Register.scss';
import {useState} from 'react';

/**
 * The page for the user to register
 * @constructor
 */
const Register = () => {
    // Error state for the register box
    const [errorState, setErrorState] = useState<string | undefined>(undefined);

    // Get the history hook
    const history = useHistory();

    return (
        <div id={'register-container'}>
            <OutlinedCard>
                <h1>S'enregistrer</h1>
                <RegisterBox error={errorState}
                             onRegisterButtonClick={(username, password) => {
                                 AuthenticationManager.getInstance().register(username, password)
                                     .then((response) => {
                                         if (response.error) {
                                             // Show an error message according to the status code
                                             switch (response.status) {
                                                 case RegisterResponseStatus.STATUS_REQUEST_ERROR:
                                                     setErrorState('Une erreur inconnue s\'est produite');
                                                     break;
                                                 case RegisterResponseStatus.STATUS_USER_ALREADY_EXISTS:
                                                     setErrorState('Cet utilisateur existe déjà');
                                                     break;
                                             }
                                         } else {
                                             // Replace the current path
                                             history.replace('/');
                                         }
                                     });
                             }}
                             onLoginButtonClick={() => {
                                 history.push('/');
                             }}/>
            </OutlinedCard>
        </div>
    );
};

export default Register;
