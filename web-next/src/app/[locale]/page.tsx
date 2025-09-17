import HeroBanner from "@/components/common/hero/heroBanner";
import PageLayout from "@/components/layouts/pageLayout/pageLayout";
import OrganizationDoctorsDisplay from "@/components/organizations/organizationDoctorsDisplay/organizationDoctorsDisplay";
import OrganizationsServices from "@/services/organizationsServices/organizationsServices";
import React from 'react';
import Portal from "@/components/portal/portal";

const Home = async () => {
    return (<Portal></Portal>);

    // Get organizations 
    let data = await OrganizationsServices().organizationsList();
    let organizations = await data?.organizations || [];

    // Get doctors for the first organization 
    let dataOrganizationDoctors = await OrganizationsServices().organizationDoctors(organizations[0]?.id || 0);
    let doctors = await dataOrganizationDoctors?.data || [];

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
