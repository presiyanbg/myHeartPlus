import PageLayout from "@/components/layouts/pageLayout/pageLayout";
import UserProfilePortal from "@/components/user/userPanels/userProfilePanel/userProfilePanel";

const UserProfilePage = async () => {
    return (
        <PageLayout>
            <div className="px-3">
                <UserProfilePortal></UserProfilePortal>
            </div>
        </PageLayout>
    )
}

export default UserProfilePage;