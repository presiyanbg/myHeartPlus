'use client';
import { NextUIColorsType, NotificationType } from "@/ts/types";
import React, { useState, createContext } from "react";

interface NotificationProviderProps {
    children: React.ReactNode
}

export const NotificationContext = createContext({
    displayNotification: false,
    notificationData: { message: 'Success', color: 'success' } as NotificationType,
    setDisplayNotification: (active: boolean) => { },
    notify: (message: string, code: number) => { },
    hideNotification: () => { }
});

export const NotificationContextProvider = ({ children }: NotificationProviderProps) => {
    const [displayNotification, setDisplayNotification] = useState<boolean>(false);
    const [notificationData, setNotificationData] = useState<NotificationType>({
        message: 'Success',
        color: 'success'
    });

    /**
     * Set and display notification
     * 
     * @param message string - Content of notification
     * @param code number - Code of notification used for color
     */
    const notify = (message: string, code: number) => {
        let notifyColor: NextUIColorsType = 'secondary';

        switch (parseInt((code / 100) + '')) {
            case 1:
                notifyColor = 'primary';
                break;

            case 2:
                notifyColor = 'success';
                break;

            case 3:
                notifyColor = 'warning';
                break;

            case 4:
                notifyColor = 'danger';
                break;

            default:
                notifyColor = 'default';
                break;
        }

        setNotificationData({
            message,
            color: notifyColor
        });

        setDisplayNotification(true);

        setTimeout(() => {
            setDisplayNotification(false);
        }, 5000);
    }

    /**
     * Manually hide notification
     */
    const hideNotification = () => {
        setTimeout(() => {
            setDisplayNotification(false);
        }, 10);
    }

    return (
        <NotificationContext.Provider value={{
            displayNotification,
            notificationData,
            setDisplayNotification,
            notify,
            hideNotification
        }}>
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationContextProvider;