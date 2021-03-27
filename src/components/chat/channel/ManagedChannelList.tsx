import React, {useEffect, useState} from 'react';
import ChannelList from './ChannelList';
import {ChannelData} from '../../../api/channel/ChannelData';
import {LoggedInUserData, useLoggedInUser} from '../../../api/authentication/AuthenticationManager';
import ChannelAPI from '../../../api/channel/ChannelAPI';
import {WebSocketManager} from '../../../api/websocket/WebSocketManager';
import {WebSocketMessage} from '../../../api/websocket/WebSocketMessage';
import IconMessage from '../../utils/IconMessage';
import './ManagedChannelList.scss';

/**
 * Props for the ManagedChannelList component
 */
interface ManagedChannelListProps {
    /**
     * WebSocket connection to where get channel events from
     */
    websocket?: WebSocketManager,

    /**
     * ID of the selected chat channel
     */
    selectedChannelId?: number,

    /**
     * Callback called when a channel was clicked
     *
     * @param data Data about the channel that was clicked
     */
    onChannelClickListener?: (data: ChannelData) => void,
}

/**
 * Manages a ChannelList with data provided from the server
 *
 * @param props Component props
 * @constructor
 */
const ManagedChannelList: React.FunctionComponent<ManagedChannelListProps> = (props: ManagedChannelListProps) => {
    // Component state
    const [channels, setChannels] = useState<Array<ChannelData>>([]);
    const [fetchError, setFetchError] = useState<boolean>(false);

    // Get the logged in user data
    const loggedInUser: LoggedInUserData | undefined = useLoggedInUser();

    // Pass the channel that was clicked to the parent
    const onChannelClick = (idx: number, data: ChannelData) => {
        props.onChannelClickListener?.(data);
    };

    useEffect(() => {
        // Fetch the available channels and put them in the state
        if (loggedInUser !== undefined) {
            ChannelAPI.fetchChannels(loggedInUser.jwt)
                .then((res) => {
                    if (!res.error) {
                        setChannels(res.channels);
                    }

                    setFetchError(res.error);
                });
        }
    }, [loggedInUser]);

    useEffect(() => {
        if (props.websocket !== undefined) {
            // Listen for channel events on the websocket
            const onWebSocketMessage = (msg: WebSocketMessage) => {
                if (msg.type === 'channelCreated') {
                    // A channel has been created
                    setChannels((prev) => {
                        return [...prev, {
                            id: msg.id,
                            owner: msg.owner,
                            ownerUsername: msg.ownerUsername,
                            title: msg.title,
                        }];
                    });
                }
            };

            props.websocket.addOnMessageListener(onWebSocketMessage);

            return () => {
                // Remove the listener when we're finished
                props.websocket?.removeOnMessageListener(onWebSocketMessage);
            };
        }
    }, [props.websocket]);

    if (fetchError) {
        // Show an error message if an error occurred while fetching channels
        return (
            <div className={'managed-channel-list-error'}>
                <IconMessage iconName={'warning'} message={'Les salons n\'ont pas pu être récupérés'}/>
            </div>
        );
    }

    return (
        <ChannelList data={channels} selectedId={props.selectedChannelId}
                     onItemClickListener={onChannelClick}/>
    );
};

export default ManagedChannelList;
