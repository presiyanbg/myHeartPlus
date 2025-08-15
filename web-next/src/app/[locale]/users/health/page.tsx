import PageLayout from "@/components/layouts/pageLayout/pageLayout";
import UserHealthPortal from "@/components/user/userPanels/userHealthPanel/userHealthPanel";

const UserHealthPage = async () => {
    return (
        <PageLayout>
            <div className="px-3">
                <UserHealthPortal></UserHealthPortal>
            </div>
        </PageLayout>
    )
}

export default UserHealthPage;