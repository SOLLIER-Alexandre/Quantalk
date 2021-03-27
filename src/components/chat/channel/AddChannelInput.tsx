import TextInput from '../../utils/TextInput';
import React, {useRef, useState} from 'react';
import './AddChannelInput.scss';

/**
 * Props passed to the AddChannelInput component
 */
interface AddChannelInputProps {
    /**
     * Callback called when the add button is clicked
     */
    onAddClick?: (channelName: string) => void,

    /**
     * Show the error text because the channel could not be created
     */
    error?: boolean,
}

/**
 * Component for the user to add a new channel
 * @constructor
 */
const AddChannelInput: React.FunctionComponent<AddChannelInputProps> = (props: AddChannelInputProps) => {
    // Component state and ref
    const [addButtonEnabled, setAddButtonEnabled] = useState<boolean>(false);
    const textInputRef = useRef<HTMLInputElement | null>(null);

    // Add button class name
    let buttonClassName: string = 'material-icons button-like';
    if (addButtonEnabled)
        buttonClassName += ' enabled';

    // Set the add button enabled depending on the text inside the input
    const onTextInputValueChange = (value: string) => {
        setAddButtonEnabled(value.trim() !== '');
    };

    // Call the callback in the props when the add button is clicked and enabled
    const onAddButtonClick = () => {
        if (addButtonEnabled && textInputRef.current !== null) {
            props.onAddClick?.(textInputRef.current.value);

            textInputRef.current.value = '';
            setAddButtonEnabled(false);
        }
    };

    return (
        <div className={'add-channel-input'}>
            <TextInput title={'Créer un salon'} onValueChange={onTextInputValueChange}
                       inputRef={(ref) => textInputRef.current = ref}
                       errorText={'Le salon n\'a pas pu être créé'} error={props.error}/>

            <span className={buttonClassName} onClick={onAddButtonClick}>add</span>
        </div>
    );
};

export default AddChannelInput;
