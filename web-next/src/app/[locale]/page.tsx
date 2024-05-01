import HeroBanner from "@/components/common/hero/heroBanner";
import PageLayout from "@/components/layouts/pageLayout/pageLayout";
import OrganizationDoctorsDisplay from "@/components/organizations/organizationDoctorsDisplay/organizationDoctorsDisplay";
import OrganizationsServices from "@/services/organizationsServices/organizationsServices";
import { DoctorsType, OrganizationsType } from "@/ts/types";
import { unstable_setRequestLocale } from 'next-intl/server';

const Home = async ({ params: { locale } }: { params: { locale: any } }) => {
    unstable_setRequestLocale(locale);

    let data: any;
    let organizations: OrganizationsType = [] as OrganizationsType;

    let dataOrganizationDoctors: any;
    let doctors: DoctorsType = [] as DoctorsType;

    try {
        // Get organizations 
        data = await OrganizationsServices().organizationsList();
        organizations = await data?.organizations || [];

        // Get doctors for the first organization 
        dataOrganizationDoctors = await OrganizationsServices().organizationDoctors(organizations[0]?.id || 0);
        doctors = await dataOrganizationDoctors?.data || [];
    } catch (ex) {
        console.error(ex);
    }

    return (
        <>
            {/* Hero */}
            <HeroBanner></HeroBanner>

            <PageLayout>
                {/* Title and about us */}
                <section>
                    {/* Title */}
                    <div className="text-center py-8">
                        <h1>{!!(organizations?.length) ? (organizations[0]?.title) : 'Test'}</h1>
                    </div>

                    {/* About us */}
                    <div className="w-full text-center pb-12">
                        <p>
                            Founded in 2023, we take pride in being a dynamic and forward-thinking company dedicated to providing top-notch
                            health solutions. Our commitment to quality, customer satisfaction,
                            and cutting-edge technology sets us apart in the competitive landscape.
                        </p>
                    </div>
                </section>

                {/* Doctors display */}
                <section>
                    <div className="w-full pb-6">
                        <hr />
                    </div>

                    <OrganizationDoctorsDisplay doctors={doctors}></OrganizationDoctorsDisplay>

                    <div className="w-full pt-6">
                        <hr />
                    </div>
                </section>
            </PageLayout>
        </>
    )
}

export default Home;
