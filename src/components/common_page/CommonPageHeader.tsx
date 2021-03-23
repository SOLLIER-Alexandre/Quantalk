import React from 'react';
import './CommonPageHeader.scss';
import {useHistory} from 'react-router-dom';

/**
 * Props for the CommonPageHeader component
 */
interface CommonPageHeaderProps {
    /**
     * The component to show on the right hand side of the header
     */
    rightNode?: React.ReactNode,
}

/**
 * The header for the common page layout
 * @constructor
 */
const CommonPageHeader: React.FunctionComponent<CommonPageHeaderProps> = (props: CommonPageHeaderProps) => {
    // Get the history hook
    const history = useHistory();

    // Go to the home page when the page title is clicked
    const onHeaderTitleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Prevent the default behavior of the anchor link and use react-router routing instead
        e.preventDefault();
        history.push('/');
    };

    return (
        <div className={'common-page-header'}>
            <a href={'/'} className={'title-text button-like'} onClick={onHeaderTitleClick}>Quantalk</a>
            {props.rightNode}
        </div>
    );
};

export default CommonPageHeader;
