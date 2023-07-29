import React from "react";

const page = () => {
  return (
    <div className="container mx-auto py-8 md:w-5/6 w-full ">
      <h1 className="text-3xl font-semibold mb-4">Terms and Conditions</h1>

      <p className="mb-4">
        Welcome to Your Blog Website! These Terms and Conditions govern your use
        of the website and the services we provide. By accessing or using our
        website, you agree to comply with these terms. If you do not agree with
        any part of these terms, please refrain from using our website.
      </p>

      <h2 className="text-xl font-semibold mb-2">1. Intellectual Property</h2>
      <p className="mb-4">
        All content on this website, including but not limited to text, images,
        graphics, logos, and videos, is the property of Your Blog Website and is
        protected by intellectual property laws. You may not use, modify,
        reproduce, or distribute any content from this website without our
        explicit written permission.
      </p>

      <h2 className="text-xl font-semibold mb-2">2. User Conduct</h2>
      <p className="mb-4">
        You agree to use the website responsibly and refrain from:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>
          Posting or transmitting any content that is unlawful, harmful,
          offensive, or infringing on others&apos; rights.
        </li>
        <li>
          Impersonating any person or entity, or falsely representing your
          affiliation with any entity.
        </li>
        <li>
          Attempting to gain unauthorized access to any part of the website or
          its servers.
        </li>
        <li>
          Interfering with or disrupting the website&apos;s functionality or
          performance.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">3. Disclaimer</h2>
      <p className="mb-4">
        The information and content provided on this website are for general
        informational purposes only. We make no representations or warranties of
        any kind, express or implied, regarding the accuracy, completeness,
        reliability, or availability of the information on this website.
      </p>

      <h2 className="text-xl font-semibold mb-2">4. Limitation of Liability</h2>
      <p className="mb-4">
        Your use of this website is at your own risk. We shall not be liable for
        any direct, indirect, incidental, consequential, or punitive damages
        arising from your use of the website or any content therein.
      </p>

      <h2 className="text-xl font-semibold mb-2">5. Governing Law</h2>
      <p className="mb-4">
        These Terms and Conditions shall be governed by and construed in
        accordance with the laws of [Your Country/State], without regard to its
        conflict of law provisions.
      </p>

      <h2 className="text-xl font-semibold mb-2">6. Modifications</h2>
      <p className="mb-4">
        We reserve the right to update or modify these Terms and Conditions at
        any time without prior notice. Please check this page periodically for
        any changes. Your continued use of the website after the modifications
        constitute your acceptance of the updated terms.
      </p>

      <h2 className="text-xl font-semibold mb-2">7. Contact Us</h2>
      <p className="mb-4">
        If you have any questions or concerns about these Terms and Conditions,
        please contact us at [Insert Contact Email].
      </p>
    </div>
  );
};

export default page;
