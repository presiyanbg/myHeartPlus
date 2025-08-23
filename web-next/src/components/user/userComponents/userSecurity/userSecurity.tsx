'use client';
import { UserType } from "@/ts/types";
import { Accordion, AccordionItem, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useTranslations } from "next-intl";

type Props = {
    user: UserType,
}

const UserSecurity = (props: Props) => {
    const t = useTranslations();
    const user = props?.user;

    if (!user) return (<>No results found </>);

    return (
        <Card>
            <CardHeader>
                <h3>Privacy and security</h3>
            </CardHeader>

            <CardBody>
                <Accordion>
                    <AccordionItem title="Account Security">

                    </AccordionItem>

                    <AccordionItem title="Privacy Policy">
                        <div className="privacy-policy-intro text-sm">
                            <b>Last updated: 25/08/2025</b>
                            <br />

                            <h4>1. Who We Are</h4>
                            <p>myHearhPlus (“we”, “us”, “our”) collects and processes your personal and health-related data in accordance with the General Data Protection Regulation (EU) 2016/679 (“GDPR”) and applicable Bulgarian laws.</p>
                            <br />

                            <h4>2. What Data We Collect</h4>
                            <ul>
                                <li><strong>Identification details:</strong> name, email (optional or required for account access).</li>
                                <li><strong>Demographic data:</strong> age, gender (optional).</li>
                                <li><strong>Health and fitness information:</strong> weight, height, progress history, notes on health or fitness goals.</li>
                            </ul>
                            <br />

                            <h4>3. How We Use Your Data</h4>
                            <p>Your data is collected only for the following purposes:</p>
                            <ul>
                                <li>Tracking your progress and displaying your weight history.</li>
                                <li>Providing insights or recommendations (if applicable).</li>
                                <li>Maintaining and improving our service.</li>
                            </ul>
                            <br />

                            <h4>4. Legal Basis for Processing</h4>
                            <p>We process your health-related data <strong>only with your explicit consent</strong>. By checking the consent box on our forms, you agree to the collection and processing of this information for the purposes listed above.</p>
                            <br />

                            <h4>5. How Long We Keep Your Data</h4>
                            <p>We store your data only as long as necessary to provide the service or until you request its deletion.</p>
                            <br />

                            <h4>6. How We Protect Your Data</h4>
                            <p>We use encryption and secure servers to protect your information. Access to data is limited to authorized personnel only.</p>
                            <br />

                            <h4>7. Your Rights Under GDPR</h4>
                            <p>You have the right to:</p>
                            <ul>
                                <li>Access your data.</li>
                                <li>Correct or update your data.</li>
                                <li>Request deletion of your data.</li>
                                <li>Withdraw consent at any time.</li>
                                <li>File a complaint with the Bulgarian Commission for Personal Data Protection (CPDP).</li>
                            </ul>
                            <p>To exercise these rights, contact us at: <a href="mailto:contact@myhearhplus.com">contact@myhearhplus.com</a></p>
                            <br />

                            <h4>8. Sharing Your Data</h4>
                            <p>We do not share your personal or health data with third parties except when required by law.</p>
                            <br />

                            <h4>9. Cookies and Analytics</h4>
                            <p>If your website uses cookies or analytics, describe them briefly here. Example:
                                “We use cookies to improve site functionality. You can manage cookies in your browser settings.”
                            </p>
                        </div>
                    </AccordionItem>
                </Accordion>
            </CardBody>
        </Card >
    )
}

export default UserSecurity;