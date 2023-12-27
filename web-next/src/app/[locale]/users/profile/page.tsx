import PageLayout from "@/components/layouts/pageLayout/pageLayout";
import UserProfile from "@/components/user/userProfile/userProfile";

const ProfilePage = async () => {
    return (
        <PageLayout>
            <div className="px-3">
                <UserProfile></UserProfile>
            </div>
        </PageLayout>
    )
}

export default ProfilePage;