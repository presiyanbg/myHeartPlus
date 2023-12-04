'use client';
import { NotificationContext } from "@/context/notificationContext/notificationContextProvider";
import { Button } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { faInfoCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Notifications = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const { notificationData, displayNotification, hideNotification } = useContext(NotificationContext);

    // Manually hide notification
    const handleClick = () => {
        hideNotification();
    }

    // Update notification visibility 
    useEffect(() => {
        setVisible(displayNotification)
    }, [displayNotification]);

    return (
        <div className={'fixed transition-opacity z-50 ease-in-out w-full lg:w-11/12 xl:w-10/12 mx-auto lg:rounded-lg ' + (visible ? 'opacity-100' : 'opacity-0')}>
            <div className="absolute z-50 top-4 right-4">
                <Button
                    onClick={() => handleClick()}
                    color={notificationData?.color}
                    variant="shadow">
                    <FontAwesomeIcon className="text-lg" icon={faInfoCircle} />

                    {notificationData?.message}
                </Button>
            </div>
        </div>
    )
}

export default Notifications;