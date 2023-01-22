import React from 'react'
import { Avatar, useChatContext } from 'stream-chat-react';

const TeamChannelPreview = ({ setActiveChannel, setToggleContainer, setIsCreating, setIsEditing, channel, type }) => {
    const { channel: activeChannel, client } = useChatContext();

    // console.log("ye lo ji:")
    // console.log(channel)
    // // console.log(channel?.data?.name);
    // // console.log(channel?.data?.name);
    // console.log("hehe")
    // console.log(channel?.data?.name)
    // console.log(channel?.id);
    // // console.log(activeChannel?.id)
    // console.log("seeit:")
    // console.log(channel.id)

    const ChannelPreview = () => {
        <p className="channel-preview__item ">
            # {channel?.data?.name || channel?.data?.id}


        </p>

    };

    const DirectPreview = () => {
        const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);

        console.log(members);
        return (
            <div className="channel-preview__item single">
                <Avatar
                    image={members[0]?.user?.image}
                    name={members[0]?.user?.fullName}
                    size={24}
                />
                <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
            </div>

        )
    }
    return (

        <div className={channel?.id === activeChannel?.id ? 'channel-preview__wrapper__selected' : 'channel-preview__wrapper'}

            onClick={() => {
                setIsCreating(false);
                setIsEditing(false);
                setActiveChannel(channel);
                if (setToggleContainer) {
                    setToggleContainer((prevState) => !prevState)
                }
            }}
        >
            {type === 'team' ? <ChannelPreview /> : <DirectPreview />
            }
        </div >
    )
}

export default TeamChannelPreview;
