import SharePost from "@/components/Blog/SharePost";
import TagButton from "@/components/Blog/TagButton";
import Image from "next/image";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Privacy Policy",
  description: "This is Blog Details Page for Startup Nextjs Template",
  // other metadata
};

const BlogDetailsPage = () => {
  return (
    <>
      <section className="pb-[120px] pt-[150px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4 lg:w-8/12">
              <div>
                <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                KINGS DEVELOPERS PRIVACY POLICY
                </h2>
                
                <div>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                  Date: May 21, 2024 Kings Developers ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy outlines our practices regarding the collection, use, and disclosure of information we receive from users ("you", "your") of our website (the "Site"). By using the Site, you agree to the collection and use of information in accordance with this policy
                  </p>
                  <h2 className="mb-8 text-2xl font-bold leading-tight text-black dark:text-white sm:text-xl sm:leading-tight">
                  1.Information We Collect
                  </h2>
                  <h2 className="mb-8 text-xl font-bold leading-tight text-black dark:text-white sm:text-lg sm:leading-tight">
                  personal Information
                  </h2>
                  <ul className="mb-10 list-inside list-disc text-body-color">
                    <li className="mb-2 text-base font-medium text-body-color sm:text-lg lg:text-base xl:text-lg">
                    Name
                    </li>
                    <li className="mb-2 text-base font-medium text-body-color sm:text-lg lg:text-base xl:text-lg">
                    Email address
                    </li>
                    <li className="mb-2 text-base font-medium text-body-color sm:text-lg lg:text-base xl:text-lg">
                    Postal address1
                    </li>
                    <li className="mb-2 text-base font-medium text-body-color sm:text-lg lg:text-base xl:text-lg">
                    Other information you choose to provide
                    </li>
                  </ul>
                  <h2 className="mb-8 text-xl font-bold leading-tight text-black dark:text-white sm:text-lg sm:leading-tight">
                  Non Personal Information
                  </h2>
                  <ul className="mb-10 list-inside list-disc text-body-color">
                    <li className="mb-2 text-base font-medium text-body-color sm:text-lg lg:text-base xl:text-lg">
                    IP address
                    </li>
                    <li className="mb-2 text-base font-medium text-body-color sm:text-lg lg:text-base xl:text-lg">
                    Operating system
                    </li>
                    <li className="mb-2 text-base font-medium text-body-color sm:text-lg lg:text-base xl:text-lg">
                    Pages visited
                    </li>
                    <li className="mb-2 text-base font-medium text-body-color sm:text-lg lg:text-base xl:text-lg">
                    Time and date of visit
                    </li>
                    <li className="mb-2 text-base font-medium text-body-color sm:text-lg lg:text-base xl:text-lg">
                    Referring website address
                    </li>
                  </ul>
                  <h2 className="mb-8 text-2xl font-bold leading-tight text-black dark:text-white sm:text-xl sm:leading-tight">
                  2.How We Use Information We Collect
                  </h2>
                  <h2 className="mb-8 text-xl font-bold leading-tight text-black dark:text-white sm:text-lg sm:leading-tight">
                  personal Information
                  </h2>
                  <p className="mb-8 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                  Kings Developers may collect and use your personal information for the following purposes:

To respond to your inquiries
To improve customer service: Information you provide helps us respond to your customer service requests and support needs more efficiently.
To personalise user experience: We may use information in the aggregate to understand how our users as a group use the services and resources provided on our site.
                    <br /> <br /><strong className="text-primary dark:text-white">
                    To improve our site:
                    </strong>
                    We may use feedback you provide to improve our products and services.
To run a promotion, contest, survey, or other site feature: To send you information you agreed to receive about topics we think will be of interest to you.
To send periodic emails: We may use the email address to send user information and updates pertaining to their order. It may also be used to respond to their inquiries, questions, and/or other requests.
                  </p>
                  <h2 className="mb-8 text-xl font-bold leading-tight text-black dark:text-white sm:text-lg sm:leading-tight">
                  Non-personal Information
                  </h2>
                  <p className="mb-8 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                  Non-personal information is used to:

Analyze site usage and trends
Administer the Site
Improve the performance and user experience of the Site
                    
                  </p>
                  <h3 className="font-xl mb-10 font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight lg:text-xl lg:leading-tight xl:text-2xl xl:leading-tight">
                  Cookies
                  </h3>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                  Our site may use "cookies" to enhance your experience. Your web browser places cookies on your hard drive for record-keeping purposes and sometimes to track information about you. You can choose to set your web browser to refuse cookies or to alert you when cookies are being sent. If you do so, note that some parts of the site may not function properly.
                  </p>
                  <h2 className="mb-8 text-2xl font-bold leading-tight text-black dark:text-white sm:text-xl sm:leading-tight">
                  3.Sharing Your Information
                  </h2>
                  <p className="mb-8 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                  We do not sell, trade, or otherwise transfer your personal information to outside parties without your consent, except as described below:

 <br /><br />Service Providers:
                    <br /> <br /><strong className="text-primary dark:text-white">
                    We may disclose your information if required to do so by law or in response to valid requests by public authorities.


<br /><br />Business Transfers:
                    </strong>
                    We may use feedback you provide to improve our products and services.
To run a promotion, contest, survey, or other site feature: To send you information you agreed to receive about topics we think will be of interest to you.
To send periodic emails: We may use the email address to send user information and updates pertaining to their order. It may also be used to respond to their inquiries, questions, and/or other requests.
<br /> <br /><strong className="text-primary dark:text-white">
In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of the transaction.
                    </strong>
                  </p>
                  <h3 className="font-xl mb-10 font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight lg:text-xl lg:leading-tight xl:text-2xl xl:leading-tight">
                  4.How We Protect Your Information
                  </h3>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                  We implement appropriate technical and organisational measures to protect your personal information from unauthorised access, alteration, disclosure. However, no method of transmission over the internet or method of electronic storage is completely secure, and we cannot guarantee absolute security:
                  </p>
                  <h3 className="font-xl mb-10 font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight lg:text-xl lg:leading-tight xl:text-2xl xl:leading-tight">
                  5.Your Choices
                  </h3>
                  <p className="mb-10 font-bold text-base leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                  Access and Correction:
                  </p>
                  <p className="mb-10 font-medium text-base leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                  You have the right to access and correct your personal information held by us. You may request to review, update, or delete your personal information by contacting us at [contact email]:
                  </p>
                  <p className="mb-10 font-bold text-base leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                  Marketing Communications:
                  </p>
                  <p className="mb-10 font-medium text-base leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                  If you no longer wish to receive marketing communications from us, you can opt out by following the unsubscribe instructions provided in the email or by contacting us at [contact email].
                  </p>
                  <h3 className="font-xl mb-10 font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight lg:text-xl lg:leading-tight xl:text-2xl xl:leading-tight">
                  6.Third-Party Links
                  </h3>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                  Our Site may contain links to third-party websites. We are not responsible for the privacy practices or the content of these websites. We encourage you to review the privacy policies of any third-party websites you visit.
                  </p>
                  <h3 className="font-xl mb-10 font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight lg:text-xl lg:leading-tight xl:text-2xl xl:leading-tight">
                  7.Children's Privacy
                  </h3>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                  Our Site is not intended for children under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have inadvertently received personal information from a child under 18, we will delete such information from our records.
                  </p>
                  <h3 className="font-xl mb-10 font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight lg:text-xl lg:leading-tight xl:text-2xl xl:leading-tight">
                  8.Changes to this Policy
                  </h3>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page
                  </p>
                  <h3 className="font-xl mb-10 font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight lg:text-xl lg:leading-tight xl:text-2xl xl:leading-tight">
                  9.Contact Us
                  </h3>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at:

                  Kings Developers<br /><br />

                  Royal Business Park, Near SGR Nairobi Terminus, OR

                  <br /><br /> Prism Towers, 6th Floor, Third Ngon Avenue, Upperhil

                  <br /><br />  Nairobi, Kenya

                  <br /><br /> Email: info@kingsdevelopers.com

                  <br /><br /> Phone: +254 700 090060

                  <br /><br />  By using our Site, you consent to our Privacy Policy.

                  <br /><br /> This Privacy Policy is effective as of the date above.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetailsPage;
