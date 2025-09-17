import PageLayout from "@/components/layouts/pageLayout/pageLayout";
import PageTitle from "@/components/layouts/pageTitle/pageTitle";
import SidePanel from "@/components/sidePanel/sidePanel";
import UserView from "@/components/user/userView/userView";
import UsersServices from "@/services/usersServices/usersServices";

import { UserType } from "@/ts/types";
import { Card, CardBody } from "@nextui-org/react";

const UserViewPage = async ({
    params,
}: {
    params: Promise<{ id: number }>
}) => {
    const { id } = await params;
    // Load main article data
    const data: any = await UsersServices().userShow(id);
    const user: UserType = await data?.user || {};

    return (
        <PageLayout>
            <div className="px-3 lg:px-0 pb-1 lg:pb-4">
                <Card>
                    <CardBody>
                        <PageTitle title={user.full_name}
                            breadCrumbs={[
                                { url: "/users", title: 'Users' }
                            ]}
                        ></PageTitle>
                    </CardBody>
                </Card>
            </div>

            <div className="gap-4 flex-col lg:grid lg:grid-cols-6 p-3 lg:p-0">
                <div className="lg:col-span-4 pb-4 lg:pb-0">
                    <UserView user={user}></UserView>
                </div>

                <div className="lg:col-span-2">
                    <SidePanel></SidePanel>
                </div>
            </div>
        </PageLayout>
    )
}

export default UserViewPage;