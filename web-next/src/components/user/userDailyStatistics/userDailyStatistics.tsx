'use client';
import { Chip, Progress, User } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal, faPersonRunning, faUtensils } from '@fortawesome/free-solid-svg-icons';

const UserDailyStatistics = () => {
    const t = useTranslations();

    return (
        <div className="flex flex-col w-full gap-1">
            <div className="pb-2">
                <User
                    name="Presiyan Tsonevski"
                    description="Doctor"
                    avatarProps={{
                        src: "https://i.pravatar.cc/150"
                    }}
                />
            </div>

            <div className="grid grid-cols-3 pb-2">
                <Chip
                    className="whitespace-pre-wrap col-span-2"
                    startContent={<FontAwesomeIcon icon={faUtensils} />}
                    color="warning"
                    variant="light">
                    {t('Calories intake')}:
                </Chip>

                <div className="pl-2 w-full">
                    <Progress
                        size="sm"
                        color="warning"
                        value={60}
                        showValueLabel={true}
                        aria-label="Loading..."
                        className="text-right"
                    />
                </div>
            </div>

            <div className="grid grid-cols-3 pb-2">
                <Chip
                    className="whitespace-pre-wrap col-span-2"
                    startContent={<FontAwesomeIcon icon={faPersonRunning} />}
                    color="danger"
                    variant="light">
                    {t('Calories burned')}:
                </Chip>

                <div className="pl-2 w-full">
                    <Progress
                        size="sm"
                        color="danger"
                        value={30}
                        showValueLabel={true}
                        aria-label="Loading..."
                        className="flex-1"
                    />
                </div>
            </div>

            <div className="grid grid-cols-3 pb-2">
                <Chip
                    className="whitespace-pre-wrap col-span-2"
                    startContent={<FontAwesomeIcon icon={faMedal} />}
                    color="success"
                    variant="light">
                    {t('Goal status')}:
                </Chip>

                <div className="pl-2 w-full">
                    <Progress
                        size="sm"
                        color="success"
                        value={55}
                        showValueLabel={true}
                        aria-label="Loading..."
                        className="flex-1"
                    />
                </div>
            </div>
        </div>

    )

}

export default UserDailyStatistics;