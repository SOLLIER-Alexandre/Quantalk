import React from 'react';
import './CommonPageLayout.scss';
import CommonPageHeader from './CommonPageHeader';

/**
 * Props for the CommonPageLayout component
 */
interface CommonPageLayoutProps {
    /**
     * Name of the classes for the root div
     */
    className?: string,

    /**
     * ID of the root div
     */
    id?: string,

    /**
     * Children of the page
     */
    children?: React.ReactNode,

    /**
     * Extra node to put at the right of the page header
     */
    headerExtra?: React.ReactNode,
}

/**
 * The common layout for the website pages
 *
 * @param props Props passed to the component
 * @constructor
 */
const CommonPageLayout: React.FunctionComponent<CommonPageLayoutProps> = (props: CommonPageLayoutProps) => {
    // Get class names
    let className: string = 'common-page-layout';
    if (props.className !== undefined)
        className += ' ' + props.className;

    return (
        <div className={className} id={props.id}>
            <CommonPageHeader rightNode={props.headerExtra}/>

            <div className={'common-page-layout-content'}>
                {props.children}
            </div>
        </div>
    );
};

export default CommonPageLayout;
