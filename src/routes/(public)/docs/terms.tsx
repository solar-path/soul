import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/docs/terms")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div className="flex flex-col space-y-2 text-justify p-8">
        <p className="mb-2 text-lg font-semibold">
          Acceptance of the Terms of Use
        </p>
        <p className="text-justify">Aneko Last Updated: April 18, 2024</p>

        <p className="text-justify">
          These Terms of Use are entered into by and between you and Aneko, and
          any of its subsidiaries and affiliates thereof (“Company”, “we”, or
          “us”). The term “Aneko” refers to Aneko, LLC doing business under the
          name “Aneko”.
        </p>

        <p className="text-justify">
          The following terms and conditions, together with any documents
          expressly incorporated herein by reference (collectively, “Terms of
          Use”), govern your access to and use of <a href="/">aneko.io</a> (the
          “Website” or the “Site”) including any content, marketplace, mobile
          apps, functionality, and site services (the “Services”) offered on or
          through the Website, whether as a guest or a registered user (a
          “User”). Users include those who have registered for an account on the
          Platform (“Account”).
        </p>

        <p className="text-justify">
          Please read the Terms of Use carefully before you start to use the
          Website. By registering for an account on the Website, or by clicking
          to accept or agree to the Terms of Use when this option is made
          available to you, you accept and agree to be bound and abide by these
          Terms of Use, and our <a href="/policy">Privacy Policy</a>, which
          Privacy Policy is hereby incorporated by reference. If you do not want
          to agree to these Terms of Use, or our Privacy Policy, you must not
          access or use the Website and must exit the Website immediately.
        </p>

        <p className="mb-2 text-lg font-semibold">
          Eligibility Requirements to Use or Access the Services
        </p>

        <p className="text-justify">
          To use the Website or any other Services offered by the Company, you
          must be
        </p>
        <ul className="text-justify list-disc ml-8">
          <li className="text-justify">(i) at least 18 years old, and</li>
          <li className="text-justify">
            (ii) not a competitor of or using the Services for purposes that are
            competitive with the Company.
          </li>
        </ul>

        <p className="text-justify">
          By accessing or using the Services, you represent and warrant that you
          meet all the foregoing eligibility requirements. You also represent
          and warrant that you have the right, authority, and capacity to enter
          into these Terms of Use on your behalf or the entity or organization
          that you represent. If you do not meet all these requirements, you may
          not use or access the Services.
        </p>

        <p className="mb-2 text-lg font-semibold">Privacy</p>
        <p className="text-justify">
          For information about how the Company collects, uses, and shares your
          information, please review our <a href="/policy">Privacy Policy</a>.
          You agree that by using the Services you consent to the collection,
          use, and sharing (as set forth in the Privacy Policy) of such
          information.
        </p>

        <p className="text-justify">
          The Children’s Online Privacy Protection Act requires that online
          service providers obtain parental consent before they knowingly
          collect personally identifiable information online from children who
          are under 18 years old. We do not knowingly collect or solicit
          personally identifiable information from children under 18 years old.
          If you are a child under 18 years old, please do not attempt to
          register for the Services or send any personal information about
          yourself to us. If we learn we have collected personal information
          from a child under 18 years old, we will delete that information as
          quickly as possible. If you believe that a child under 18 years old
          may have provided us personal information, please{" "}
          <a href="/contactUs">Contact us</a>
        </p>

        <p className="mb-2 text-lg font-semibold">
          Changes to the Terms of Use
        </p>

        <p className="text-justify">
          We may revise and update these Terms of Use from time to time in our
          sole and absolute discretion. All changes are effective immediately
          when we post them, and apply to all access to and use of the Website
          thereafter. However, any changes to the dispute resolution provisions
          set out in Governing Law and Jurisdiction sections (below) will not
          apply to any disputes for which the parties have actual notice on or
          before the date the change is posted on the Website. Your continued
          use of the Website following the posting of revised Terms of Use means
          that you accept and agree to the changes. You are expected to check
          this page frequently so you are aware of any changes, as they are
          binding on you.
        </p>

        <p className="mb-2 text-lg font-semibold">Definitions</p>

        <ul className="text-justify list-disc ml-8">
          <li className="text-justify">
            <span className="font-semibold">Affiliates</span>
            means any third-party companies which the Company chooses to work
            with and is considered a part of the Platform.
          </li>
          <li className="text-justify">
            <span className="font-semibold">Connected Account</span> means the
            account Users successfully create with the Company’s third-party
            payment processor, Stripe, in order to complete payments to and from
            Users.
          </li>
          <li className="text-justify">
            <span className="font-semibold">Content</span> means texts, emails,
            photographs or videos, information, software, images, communication,
            or other materials, including but not limited to, profile
            information, message threads, auditing resources, reviews,
            calendars, schedules, other information materials.
          </li>
          <li className="text-justify">
            <span className="font-semibold">Groups</span> are areas of the
            Website in which a User can either join or start a group focused on
            collaboration and which allows for sharing Group Content among Users
            that is specific to such groups’ industry, geography, or functional
            focus. Groups can be open to all Users or invite-only as determined
            by the access settings set by the Group Organizer or Group
            Moderator.
          </li>
          <li className="text-justify">
            <span className="font-semibold">Group Content</span> means Content
            shared among Users who are subscribed to a particular Group.
          </li>
          <li className="text-justify">
            <span className="font-semibold">Group Moderator</span> is a User who
            is part of a Group, is promoted to be a moderator of a Group, and
            who has the ability to edit and delete any forum discussion within
            the Group and delete any activity feed items, excluding those posted
            by a Group Organizer.
          </li>
          <li className="text-justify">
            <span className="font-semibold">Group Organizer</span> means a User
            who creates a Group and has total control over the contents and
            settings of a Group, which includes all the abilities of Group
            Moderators, as well as the ability to turn Group forums on or off,
            change Group status from public to private, change the Group photo,
            manage Group Users, and delete the Group.
          </li>
          <li className="text-justify">
            <span className="font-semibold">Marketplace</span> is defined as the
            area of the Website whereby Marketplace Sellers can offer
            Marketplace Resources to other Users either for free or for cost, as
            determined by such Marketplace Seller.
          </li>
          <li className="text-justify">
            <span className="font-semibold">Marketplace Payout Rate</span> is
            defined as the percentage of the total sales price Users may earn
            for sales of Marketplace Resource sold through the Website. The
            Marketplace Payout Rate will be paid out by the Company to a User
            via mutually agreed payment method and such amount shall be
            determined by a mutually agreed upon calculation. The Company
            reserves the right to deduct from the Marketplace Payout Rate the
            amount of any refunds granted to Users or deduct the amount of such
            refunds from future disbursements otherwise payable to Marketplace
            Sellers. All payments and refunds payable or due from Marketplace
            Sellers shall be done through a mutually agreed method.
          </li>
          <li className="text-justify">
            <span className="font-semibold">Marketplace Resources</span> means
            digital products, physical products, or services sold or shared for
            free by Marketplace Sellers and/or Users, as applicable, on the
            Marketplace.
          </li>
          <li className="text-justify">
            <span className="font-semibold">Marketplace Seller</span> means a
            User who sells Marketplace Resources through the Website.
          </li>
          <li className="text-justify">
            <span className="font-semibold">Payment Method</span> refers to
            credit card, debit cards, and ACH transactions.
          </li>
          <li className="text-justify">
            <span className="font-semibold">Platform</span> means the
            application on the Site used to connect Users.
          </li>
          <li className="text-justify">
            <span className="font-semibold">Premium Membership Content</span>{" "}
            means, including, without limitation, webinars, educational courses,
            access to live and a library of recorded events, virtual community
            events, and other educational resources and content the Company
            makes available now or in the future to Users with a Subscription.
          </li>
          <li className="text-justify">
            <span className="font-semibold">Profile</span> means the
            User-created web profile on the Site in which a User’s information
            is stored and select information is displayed, such as the
            information described in the “User Profile” section below.
          </li>
          <li className="text-justify">
            <span className="font-semibold">Subscription</span> means the amount
            to be paid by the User to obtain access to the Platform, Website,
            Premium Membership Content, access to purchase Marketplace
            Resources, and/or Website Services. All Subscriptions are
            non-refundable. All Subscription fees are subject to change in the
            Company’s sole and absolute discretion.
          </li>
          <li className="text-justify">
            <span className="font-semibold">User Content</span> means all
            content Users submit, post, upload, publish, or transmit on or
            through the Platform, including but not limited to, chat messaging,
            or calls made through the Site’s internal communication application,
            photographs, Profile information, descriptions, postings, and
            reviews.
          </li>
        </ul>

        <p className="mb-2 text-lg font-semibold">
          Aneko Site and Marketplace Services
        </p>
        <p className="text-justify">
          The Company is an online community for internal auditors that allows
          Users to share resources, learn from each other in virtual community
          events, and expand their professional education. The Company offers
          Subscriptions, which grant Users access to Premium Membership Content.
          The Company also offers Marketplace Resources, including without
          limitation, electronically delivered files, digital products, and
          other digital product types. The Company may modify, add, discontinue
          support for, or limit the availability of any product type. The
          Company at no time sells Marketplace Resources for or on behalf of our
          Users. The Company offers Subscriptions to its Premium Membership
          Content independently of Marketplace Resources that are offered by
          third-party Marketplace Sellers. Users acknowledge and agree that the
          Company does not supervise or direct the Content posted by, and is
          therefore not responsible for the information posted or sold by,
          Marketplace Sellers or other Users. The Company does not ensure the
          accuracy and legality of any Content. For more information about
          Content standards, please see Prohibited Uses and Code of Conduct and
          Content Standards below.
        </p>

        <p className="mb-2 text-lg font-semibold">
          Payment Methods and Currency
        </p>
        <p className="text-justify">
          The Company charges Users a periodic Subscription rate for access to
          Premium Membership Content according to the Company’s pricing page on
          the Website. The Company uses a third-party payment processing
          company, PayPal, as the payment processor for all payment services on
          the Platform, including for Premium Membership Subscriptions and
          Marketplace Resources. PayPal currently accepts payments in multiple
          currencies. The Company is not responsible or liable in any way for
          third-party losses, damages, lawsuits, actions, or claims. By using
          the Website, Users release the Company from any liability resulting
          from use of third-party payment services. If you have questions
          regarding PayPal, please contact PayPal at support@paypal.com or visit
          the PayPal website to review their Terms of Service.
        </p>

        <p className="mb-2 text-lg font-semibold">Refund Policy</p>
        <p className="text-justify">
          When you subscribe to Premium Membership Content or purchase
          Marketplace Resources on the Platform, you agree to our Refund Policy.
          Except as otherwise provided herein, all sales are final and
          nonrefundable once an order is submitted. We may, in our sole
          discretion, modify our Refund Policy or, on a case-by-case basis,
          issue a refund for a reason that falls outside of our Refund Policy,
          such as a receipt of a corrupted file. In such cases, please contact
          us as soon as possible to let us know.
        </p>

        <p className="mb-2 text-lg font-semibold">Promise to Pay</p>
        <p className="text-justify">
          When you subscribe to Premium Membership Content or purchase
          Marketplace Resources on the Marketplace, you represent and warrant
          that you are authorized to make the purchase and to use the payment
          method and billing information you have provided to the Company’s
          third-party payment processor, Stripe. You further agree that the
          Company may charge your payment method for the amount due. The Company
          is not responsible for any additional fees you may be charged by your
          financial institution, such as international transaction fees or
          overdraft fees.
        </p>

        <p className="mb-2 text-lg font-semibold">
          Failure to Pay and Payment Disputes
        </p>
        <p className="text-justify">
          Failure to pay as promised may result in late fees being charged,
          removal of Premium Membership Content or Marketplace Resources from
          your Account, Account suspension or closure, or any other action we
          deem necessary. If the Company receives notice that you have disputed
          a charge related to a purchase made from your Account, it may, at its
          discretion, offer proof to challenge the dispute. Pending resolution
          of the dispute, the Company may terminate Premium Membership Content
          in your Account, terminate your Subscription Account, and/or remove
          the purchased Marketplace Resources from your Account temporarily, or,
          if a refund is ultimately issued, permanently. In our discretion, we
          may take further action against your Account.
        </p>

        <p className="mb-2 text-lg font-semibold">Marketplace Earnings</p>
        <p className="text-justify">
          For each sale through the Platform, the User earns the applicable
          Marketplace Payout Rate applicable to each User’s sales of Marketplace
          Resources.
        </p>

        <p className="mb-2 text-lg font-semibold">
          Content Standards and Intellectual Property Infringement
        </p>
        <p className="text-justify">
          All Users (including Marketplace Sellers) must abide by the Content
          Standards (described below) and Users and Marketplace Sellers maintain
          all right, title, and interest to all their intellectual property in
          Marketplace Resources, User Content, and Group Content offered through
          the Website or in Groups (as applicable).
        </p>
        <p className="mb-2 text-lg font-semibold">
          Marketplace Indemnification
        </p>
        <p className="text-justify">
          Marketplace Sellers and Users agree to indemnify, defend, and hold
          harmless the Company, its employees, officers, directors, agents, and
          affiliates from and against all costs, expenses, damages, judgments,
          and liabilities (including reasonable attorneys’ fees) resulting from
          allegations, threats, claims, suits, or other proceedings brought by
          third parties related to a Marketplace Seller’s or User’s use or
          misuse of the Marketplace Services or the Website, including but not
          limited to, any breach of these Terms of Use, violation of any
          federal, state, or local law, and infringement of someone else’s
          intellectual property, privacy, publicity, or other rights.
        </p>
        <p className="mb-2 text-lg font-semibold">Sales Tax</p>
        <p className="text-justify">
          A purchaser of Marketplace Resources may be subject to local, state,
          or federal sales taxes or other taxes in the jurisdiction in which
          such purchaser resides.
        </p>

        <p className="mb-2 text-lg font-semibold">
          Accessing the Website and Account Security
        </p>
        <p className="text-justify">
          We reserve the right to withdraw or amend this Website, and any
          service or material we provide on the Website, in our sole and
          absolute discretion without notice. We will not be liable if for any
          reason all or any part of the Website is unavailable at any time or
          for any period. From time to time, we may restrict access to some
          parts of the Website, or the entire Website, to Users, including
          registered Users.
        </p>
        <p className="text-justify">You are responsible for both:</p>
        <ul className="text-justify list-disc ml-8">
          <li className="text-justify">
            Making all arrangements necessary for you to have access to the
            Website.
          </li>
          <li className="text-justify">
            Ensuring that all persons who access the Website through your
            Internet connection are aware of these Terms of Use and comply with
            them.
          </li>
        </ul>

        <p className="text-justify">
          To access the Website or some of the resources it offers, you may be
          asked to provide certain registration details or other information. It
          is a condition of your use of the Website that all the information you
          provide on the Website is correct, current, and complete. You agree
          that all information you provide to register with this Website or
          otherwise, including but not limited to, through the use of any
          interactive features on the Website, if applicable, is governed by our{" "}
          <a href="/policy">Privacy Policy</a> which is hereby incorporated into
          these Terms of Use, and you consent to all actions we take with
          respect to your information consistent with our Privacy Policy and
          these Terms of Use.
        </p>
        <p className="mb-2 text-lg font-semibold">Account Profile</p>
        <p className="text-justify">
          To register for the Website, you must complete a User profile
          (“Profile”), in which you must choose a username and password. With
          your Profile creation, your default screen name will be your first
          name, which you can later modify if you choose to. By creating a
          Profile, you consent to having your Profile information visible to
          other Users and/or the public. If you choose, or are provided with,
          any other piece of information as part of our security procedures, you
          must treat such information as confidential, and you must not disclose
          it to any other person or entity. You also acknowledge that your
          account is personal to you and agree not to provide any other person
          with access to this Website or portions of it using your username,
          password, or other security information. The safety of your account is
          your responsibility. You agree that the information you provide is
          true, accurate, and complete, will not provide misleading information
          about your identity, location, skills, or services you provide, and
          you will update your information to maintain such accuracy and
          completeness or correct any information that becomes false or
          misleading. You agree to notify us immediately of any unauthorized
          access to or use of your username or password or any other breach of
          security by contacting the Company at
          <a href="Contact Us">Contact us</a>. You should use particular caution
          when accessing your account from a public or shared computer so that
          others are not able to view or record your password or other personal
          information. You agree that you will not open an account for someone
          else or log in to someone else’s account and act on their behalf
          unless you are authorized by the Company. You agree that you will act
          on your own behalf, unless appropriately authorized to act on behalf
          of another person, and will not pretend to be any identify other than
          your own. You agree that the person using your account has authority
          to make payments using your payment method on file.
        </p>

        <p className="text-justify">
          We have the right to disable or remove any Profile or User name,
          password, or other identifier, whether chosen by you or provided by
          us, at any time in our sole discretion for any or no reason if, in our
          opinion, you have violated any provision of these Terms of Use.
        </p>
        <p className="text-justify">
          Upon registration, your account will be subject to verification, and
          you may be asked to validate your identity. Failure to validate your
          identity will result in: 1) incomplete registration or Profile, and 2)
          denied access to the Site and Site Services. You must provide truthful
          identification under the laws of the jurisdiction in which you reside.
          Failure to provide accurate and truthful information may result in
          account deletion.
        </p>

        <p className="mb-2 text-lg font-semibold">
          Membership and Subscription Fees
        </p>
        <p className="text-justify">
          Access to the basic version of the Site is provided to you for free,
          while the premium version of the Site requires a paid membership. By
          starting your membership, you expressly agree that we are authorized
          to charge you the membership fee associated with periodic membership.
          The prices associated with membership and other charges are subject to
          change without notice. Membership begins on the date purchased (the
          “Purchase Date“) and will continue until cancelled. Membership shall
          not be transferred or assigned to any other third-party nor shall a
          third-party be granted access to the software or Site through use of
          your registration data. The Company may collect sales tax for the
          membership, which shall be collected at the time of processing your
          payment method through Stripe.
        </p>

        <p className="mb-2 text-lg font-semibold">
          Purchases, Taxes, and Other Fees
        </p>
        <p className="text-justify">
          You are responsible for paying any amounts due, including any
          applicable taxes, when you make purchases on the Platform. When you
          purchase on the Platform, you will be charged (in U.S. Dollars) the
          list price for each item, and any fees associated with your order. By
          placing an order, you represent and warrant that the billing
          information you have provided us is accurate. The Company is not
          responsible for the information provided by our Users and does not
          guarantee the accuracy of sales tax calculations or other calculations
          by Stripe or other payment processors.
        </p>

        <p className="mb-2 text-lg font-semibold">Termination</p>
        <p className="text-justify">
          In its sole discretion, the Company reserves the right to terminate
          your Account, or any part thereof, if you fail to comply with the
          terms outlined in the Terms of Use. The Company, may, in its sole
          discretion, terminate access to the Site without notice. You agree
          that the Company shall not be liable to you or any third party in the
          event of such termination of access to the Site or software. In the
          event a User’s Account is terminated, and such User is a subscriber to
          Premium Membership Content, a pro-rated refund will be issued as of
          the date of termination, which termination date shall be decided in
          the sole and absolute discretion of the Company.
        </p>
        <p className="mb-2 text-lg font-semibold">
          Intellectual Property Rights
        </p>

        <p className="mb-2 text-lg font-semibold">
          Ownership of Intellectual Property
        </p>

        <p className="text-justify">
          You acknowledge that all intellectual property rights, including
          copyrights, trademarks, trade secrets, and patents, in the Services
          and its contents, features, and functionality (collectively, the
          “Content”), excluding Marketplace Resources, User Content, and Group
          Content, in all respects, are owned by the Company, its licensors, or
          other providers of such material. The Content is protected by U.S. and
          international intellectual property or proprietary rights laws.
          Neither this Terms of Use nor your access to the Services transfers to
          you any right, title, or interest in or to such intellectual property
          rights. Any rights not expressly granted in this Terms of Use are
          reserved by the Company and its licensors. Notwithstanding the
          foregoing, User Content is owned by you and is licensed to the Company
          pursuant to the User Generated Content section below.
        </p>

        <p className="mb-2 text-lg font-semibold">
          License to Use the Services
        </p>
        <p className="text-justify">
          The Company grants you a limited, non-exclusive, non-transferable,
          non-sublicensable, and revocable license to use and access the Content
          solely for use in accordance with the terms and conditions of these
          Terms of Use. The Content may not be used for any other purpose. This
          license will terminate upon your cessation of use of the Services,
          Website, and/or Marketplace.
        </p>

        <p className="mb-2 text-lg font-semibold">Certain Restrictions</p>
        <p className="text-justify">
          The rights granted to you in this Agreement are subject to the
          following restrictions:
        </p>
        <ul className="text-justify list-disc ml-8">
          <li className="text-justify">
            (a) No Copying or Distribution. You shall not copy, reproduce,
            publish, display, perform, post, transmit, or distribute any part of
            the Content in any form or by any means except as expressly
            permitted herein or as enabled by a feature, product, or the
            Services when provided to you.
          </li>
          <li className="text-justify">
            (b) No Modifications. You shall not modify, create derivative works
            from, translate, adapt, disassemble, reverse compile, or reverse
            engineer any part of the Content.
          </li>
          <li className="text-justify">
            (c) No Exploitation. You shall not sell, license, sublicense,
            transfer, assign, rent, lease, loan, host, or otherwise exploit the
            Content or the Services in any way, whether in whole or in part.
          </li>
          <li className="text-justify">
            (d) No Altering of Notices. You shall not delete or alter any
            copyright, trademark, or other proprietary rights notices from
            copies of the Content.
          </li>
          <li className="text-justify">
            (e) No Competition. You shall not access or use the Content in order
            to build a similar or competitive website, product, or service.
          </li>
          <li className="text-justify">
            (f) Systematic Retrieval. You shall not use any information
            retrieval system to create, compile, directly or indirectly, a
            database, compilation, collection or directory of the Content or
            other data from the Services.
          </li>
        </ul>

        <p className="mb-2 text-lg font-semibold">Trademark Notice</p>
        <p className="text-justify">
          All trademarks, logos, and service marks displayed on the Services are
          either the Company’s property or the property of third parties. You
          may not use such trademarks, logos, or service marks without the prior
          written consent of their respective owners.
        </p>
        <p className="text-justify">
          These Terms of Use permit you to use the Website for your personal,
          non-commercial use only, unless authorized by the Company. You must
          not reproduce, distribute, modify, create derivative works of,
          publicly display, publicly perform, republish, download, store, or
          transmit any of the material on our Website, except as follows:
        </p>
        <ul className="text-justify list-disc ml-8">
          <li className="text-justify">
            Your computer may temporarily store copies of such materials in RAM
            incidental to your accessing and viewing those materials.
          </li>
          <li className="text-justify">
            You may store files that are automatically cached by your Web
            browser for display enhancement purposes.
          </li>
          <li className="text-justify">
            If we provide desktop, mobile, or other applications for download,
            you may download a single copy to your computer or mobile device
            solely for your own personal, non-commercial use, provided you agree
            to be bound by our end User license agreement for such applications.
          </li>
        </ul>

        <p className="text-justify">
          We currently maintain social media accounts at:
        </p>
        <ul className="text-justify list-disc ml-8">
          {/* <!-- <li className="text-justify">X: @Aneko</li> -->
<li className="text-justify">
  <a href="https://www.linkedin.com/company/104223135" target="_blank">LinkedIn</a>
</li>
<!-- <li className="text-justify">Facebook: https://www.facebook.com/Aneko</li> -->
<!-- <li className="text-justify">Instagram: https://www.instagram.com/Aneko</li> --> */}
        </ul>
        <p className="text-justify">
          If we provide social media features with the above sites and/or
          applications with certain content, you may take such actions as are
          enabled by such features. We may provide additional social media
          features on other sites and/or applications and any such actions are
          to be used in accordance with the terms therein.
        </p>

        <p className="text-justify">You must not:</p>
        <ul className="text-justify list-disc ml-8">
          <li className="text-justify">
            Modify copies of any materials from this Website for resale or
            similar use.
          </li>
          <li className="text-justify">
            Use any illustrations, photographs, video or audio sequences, or any
            graphics separately from the accompanying text.
          </li>
          <li className="text-justify">
            Delete or alter any copyright, trademark, or other proprietary
            rights notices from copies of materials from this site.
          </li>
        </ul>

        <p className="text-justify">
          If you print, copy, modify, download, or otherwise use or provide any
          other person with access to any part of the Website in breach of these
          Terms of Use, your right to use the Website will cease immediately and
          you must, at our option, return or destroy any copies of the materials
          you have made. No right, title, or interest in or to the Website or
          any content on the Website is transferred to you, and all rights not
          expressly granted are reserved by the Company. Any use of the Website
          not expressly permitted by these Terms of Use is a breach of these
          Terms of Use and may violate copyright, trademark, and other laws.
        </p>

        <p className="mb-2 text-lg font-semibold">
          Prohibited Uses and Code of Conduct
        </p>
        <p className="text-justify">
          It is the expectation of the Company and its affiliates that all Users
          of the Site and Platform as well as use of third-party affiliates of
          the Company act in a manner that is professional and ethical at all
          times. You may use the Website only for lawful purposes and in
          accordance with these Terms of Use. You agree not to use the Website:
        </p>
        <ul className="text-justify list-disc ml-8">
          <li className="text-justify">
            In any way that violates any applicable federal, state, local, or
            international law or regulation (including, without limitation, any
            laws regarding the export of data or software to and from the U.S.
            or other countries).
          </li>
          <li className="text-justify">
            For the purpose of exploiting, harming, or attempting to exploit or
            harm others, including minors, in any way by exposing them to
            inappropriate content, asking for personally identifiable
            information, or otherwise.
          </li>
          <li className="text-justify">
            To send, knowingly receive, upload, download, use, or re-use any
            material that does not comply with the Content Standards (below) set
            out in these Terms of Use.
          </li>
          <li className="text-justify">
            To transmit, or procure the sending of, any advertising or
            promotional material not authorized by the company, including any
            “junk mail,” “chain letter,” “spam,” or any other similar
            solicitation.
          </li>
          <li className="text-justify">
            To impersonate or attempt to impersonate the Company, a Company
            employee, another User, or any other person or entity (including,
            without limitation, by using email addresses or screen names
            associated with any of the foregoing).
          </li>
          <li className="text-justify">
            To engage in any other conduct that restricts or inhibits others’
            use or enjoyment of the Website, or which, as determined by us, may
            harm or expose to liability the Company, Users of the Website, or
            others.
          </li>
        </ul>
        <p className="text-justify">You also hereby acknowledge:</p>
        <ul className="text-justify list-disc ml-8">
          <li className="text-justify">
            Use of foul, discriminating, incident language or slurs between
            Users of the Site will not be tolerated.
          </li>
          <li className="text-justify">
            Cyber bullying, cohesion, or like intentions to defame, destroy, or
            intimidate others is not tolerated and will be met with the full
            force of available actions if any User, person, or organization is
            found to be engaging in any action that can be construed as harmful
            to any other User, person, or organization. The Company may
            terminate your use of the Website if it finds you have engaged in
            any of the foregoing activities, in its sole and absolute
            discretion.
          </li>
          <li className="text-justify">
            Expulsion from the site, deletion of account, and any monies still
            owed to the Company may be taken at the time of account removal. The
            Company reserves all rights to make these decisions in its sole and
            absolute discretion.
          </li>
          <li className="text-justify">
            If removed from the Site for violating these Terms of Use or any
            agreement listed herein does not entitle any User to any form of
            refund.
          </li>
        </ul>
        <p className="text-justify">Additionally, you agree not to:</p>
        <ul className="text-justify list-disc ml-8">
          <li className="text-justify">
            Use the Website in any manner that could disable, overburden,
            damage, or impair the Site or interfere with any other party’s use
            of the Website, including their ability to engage in real time
            activities through the Website.
          </li>
          <li className="text-justify">
            Use any robot, spider, or other automatic device, process, or means
            to access the Website for any purpose, including monitoring or
            copying any of the material on the Website.
          </li>
          <li className="text-justify">
            Use any manual process to monitor or copy any of the material on the
            Website, or for any other purpose not expressly authorized in these
            Terms of Use, without our prior written consent.
          </li>
          <li className="text-justify">
            Use any device, software, or routine that interferes with the proper
            working of the Website.
          </li>
          <li className="text-justify">
            Introduce any viruses, Trojan horses, worms, logic bombs, or other
            material that is malicious or technologically harmful.
          </li>
          <li className="text-justify">
            Attempt to gain unauthorized access to, interfere with, damage, or
            disrupt any parts of the Website, the server on which the Website is
            stored, or any server, computer, or database connected to the
            Website.
          </li>
          <li className="text-justify">
            Attack the Website via a denial-of-service attack or a distributed
            denial-of-service attack.
          </li>
          <li className="text-justify">
            Otherwise attempt to interfere with the proper working of the
            Website.
          </li>
        </ul>

        <p className="mb-2 text-lg font-semibold">User Generated Content</p>
        <p className="text-justify">
          The Site and Platform may contain (either currently or in the future)
          message boards, chatrooms, Profiles, forums, Groups, the ability to
          share Marketplace Resources, and other interactive features that allow
          Users to post, upload, submit, publish, display, or transmit to other
          Users or other persons content or materials (collectively, “User
          Generated Content”) on or through the Services.
        </p>

        <p className="text-justify">
          You are solely responsible for your User Generated Content. Please
          consider carefully what you choose to share. All User Generated
          Content must comply with the Content Standards set forth below. With
          the exception of Group Content, which a Group Organizer or Group
          Moderator may, in their discretion, elect to be deemed confidential
          per User access settings, any User Generated Content you post on or
          through the Services will be considered non-confidential and
          non-proprietary. You assume all risks associated with the use of your
          User Generated Content. This includes any reliance on its accuracy,
          completeness, reliability, or appropriateness by other users and third
          parties, or any disclosure of your User Generated Content that
          personally identifies you or any third party. You agree that the
          Company shall not be responsible or liable to any third party for the
          sharing or nature of any User Generated Content posted by you or any
          other User of the Services.
        </p>

        <p className="text-justify">
          You further agree that the Company shall not be responsible for any
          loss or damage incurred as the result of any interactions between you
          and other Users. Your interactions with other Users are solely between
          you and such Users. If there is a dispute between you and any other
          User, we are under no obligation to become involved.
        </p>

        <p className="mb-2 text-lg font-semibold">License</p>
        <p className="text-justify">
          You retain ownership of User Content you post to the Site. You hereby
          grant to the Company an irrevocable, non-exclusive, royalty-free and
          fully paid, transferable, perpetual, and worldwide license to
          reproduce, distribute, publicly display and perform, prepare
          derivative works of, incorporate into other works, and otherwise use
          and exploit your User Content, and to grant sublicenses of the
          foregoing rights, in connection with the Services and the Company’s
          business including, without limitation, for promoting and
          redistributing part or all of the Services in any media formats and
          through any media channels. Notwithstanding the foregoing, the Company
          shall not be entitled to a license from Users for Group Content.
        </p>
        <p className="text-justify">
          You represent and warrant that you have all the rights, power, and
          authority necessary to grant the rights granted herein to any User
          Content that you submit. You hereby irrevocably waive all claims and
          have no recourse against us for any alleged or actual infringement or
          misappropriation of any proprietary rights in any communication,
          content, or material submitted to us. Please note that all of the
          following licenses are subject to our{" "}
          <a href="/policy">Privacy Policy</a> to the extent they relate to any
          User Content that contains any personally identifiable information.
        </p>
        <p className="mb-2 text-lg font-semibold">Content Standards</p>
        <p className="text-justify">
          You agree not to send, knowingly receive, upload, transmit, display,
          or distribute any User Content that does not comply with the following
          standards (“Content Standards”). User Content must not:
        </p>
        <ul className="text-justify list-disc ml-8">
          <li className="text-justify">
            (a) Violate Laws or Obligations. Violate any applicable laws or
            regulations (including intellectual property laws and right of
            privacy or publicity laws), or any contractual or fiduciary
            obligations.
          </li>
          <li className="text-justify">
            (b) Promote Illegal Activity or Harm to Others. Promote any illegal
            activity; advocate, promote, or assist any unlawful act; or create
            any risk of any harm, loss, or damage to any person or property.
          </li>
          <li className="text-justify">
            (c) Infringe Intellectual Property Rights. Infringe any copyright,
            trademark, patent, trade secret, moral right, or other intellectual
            property rights of any other person.
          </li>
          <li className="text-justify">
            (d) Defamatory, Abusive, or Otherwise Objectionable Material.
            Contain any information or material that we deem to be unlawful,
            defamatory, trade libelous, invasive of another’s privacy or
            publicity rights, abusive, threatening, harassing, harmful, violent,
            hateful, obscene, vulgar, profane, indecent, offensive,
            inflammatory, humiliating to other people (publicly or otherwise),
            or otherwise objectionable. This includes any information or
            material that we deem to cause annoyance, inconvenience, or needless
            anxiety, or be likely to upset, embarrass, alarm, or annoy another
            person.
          </li>
          <li className="text-justify">
            (e) Promotion of Sexually Explicit Material or Discrimination.
            Promote sexually explicit or pornographic material, violence, or
            discrimination based on race, sex, religion, nationality,
            disability, sexual orientation, or age.
          </li>
          <li className="text-justify">
            (f) Fraudulent Information or Impersonation. Contain any information
            or material that is false, intentionally misleading, or otherwise
            likely to deceive any person including, without limitation,
            impersonating any person, or misrepresenting your identity or
            affiliation with any person or organization.
          </li>
          <li className="text-justify">
            (g) Commercial Activity. Involve commercial activities or sales not
            authorized by the Company, including but not limited to, contests,
            sweepstakes, and other sales promotions, barter, or advertising.
          </li>
          <li className="text-justify">
            (h) Endorsement by the Company. Represent or imply to others that it
            is in any way provided, sponsored, or endorsed by the Company or any
            other person or entity, if that is not the case.
          </li>
        </ul>

        <p className="mb-2 text-lg font-semibold">Monitoring and Enforcement</p>
        <p className="text-justify">
          We reserve the right at all times, but are not obligated, to:
        </p>
        <ul className="text-justify list-disc ml-8">
          <li className="text-justify">
            take any action with respect to any User Content that we deem
            necessary or appropriate in our sole discretion, including if we
            believe that such User Content violates the Content Standards or any
            other provision in this Terms of Use or our{" "}
            <a href="/policy">Privacy Policy</a>, or creates liability for the
            Company or any other person. Such action may include reporting you
            to law enforcement authorities.
          </li>
          <li className="text-justify">
            remove or reject any User Content for any or no reason in our sole
            discretion.
          </li>
          <li className="text-justify">
            disclose any User Content, your identity, or electronic
            communication of any kind to satisfy any law, regulation, or
            government request, or to protect the rights or property of the
            Company or any other person.
          </li>
          <li className="text-justify">
            terminate or suspend your access to all or part of the Services for
            any or no reason, including without limitation, any violation of
            this Agreement.
          </li>
        </ul>

        <p className="text-justify">
          The Company shall use commercially reasonable efforts to remove
          objectional content that does not conform to our Content Standards,
          but the Company cannot ensure prompt removal of questionable User
          Content. Accordingly, the Company and its affiliates, and their
          respective officers, directors, employees or agents, assume no
          liability for any action or inaction regarding transmissions,
          communications, or content provided by any User or third party. The
          Company shall have no liability or responsibility to anyone for
          performance or non-performance of the activities described in this
          Section.
        </p>
        <p className="mb-2 text-lg font-semibold">
          Copyright Infringement (Digital Millennium Copyright Act Policy)
        </p>
        <p className="text-justify">
          The Company respects the intellectual property of others and expects
          Users of the Services to do the same. It is the Company’s policy to
          terminate access to our Services of Users who are repeat infringers of
          intellectual property rights, including copyrights. If you believe
          that your work has been copied in a way that constitutes copyright
          infringement and wish to have the allegedly infringing material
          removed, please provide the following information in accordance with
          the Digital Millennium Copyright Act to our designated copyright
          agent:
        </p>
        <ul className="text-justify list-disc ml-8">
          <li className="text-justify">
            (a) a physical or electronic signature of the copyright owner or a
            person authorized to act on their behalf;
          </li>
          <li className="text-justify">
            (b) a description of the copyrighted work that you allege has been
            infringed;
          </li>
          <li className="text-justify">
            (c) a description of the material that is claimed to be infringing
            or to be the subject of infringing activity and that is to be
            removed or access to which is to be disabled;
          </li>
          <li className="text-justify">
            (d) a description of where the material that you claim is infringing
            is located;
          </li>
          <li className="text-justify">
            (e) your contact information, including your address, telephone
            number, and email address;
          </li>
          <li className="text-justify">
            (f) a statement that you have a good faith belief that use of the
            objectionable material is not authorized by the copyright owner, its
            agent, or under the law; and
          </li>
          <li className="text-justify">
            (g) a statement by you, made under penalty of perjury, that the
            above information in your notice is accurate and that you are the
            copyright owner or authorized to act on the copyright owner’s
            behalf.
          </li>
        </ul>
        {/* <!-- <p className="text-justify">
Please note that pursuant to 17 U.S.C. § 512(f), any misrepresentation of material fact in a
written notification automatically subjects the complaining party to liability for any damages,
costs, and attorneys’ fees incurred by us in connection with the written notification and
allegation of copyright infringement.
</p>

<p className="text-justify">Designated copyright agent for the Company:</p>
<address>Aneko Copyright Agent 2772 Pear Orchard Rd Granbury, TX 76048 info@Aneko.com</address> --> */}

        <p className="mb-2 text-lg font-semibold">Feedback to the Company</p>
        <p className="text-justify">
          If you provide the Company with any feedback or suggestions regarding
          the Services (“Feedback”), you hereby assign to the Company all rights
          in such Feedback and agree that the Company shall have the right to
          use and fully exploit such Feedback and related information in any
          manner it deems appropriate or valuable. The Company will treat any
          Feedback that you provide to the Company as non-confidential and
          non-proprietary. You agree that you will not submit to the Company any
          information or ideas that you consider to be confidential or
          proprietary.
        </p>
        <p className="mb-2 text-lg font-semibold">
          Reliance on Information Posted
        </p>
        <p className="text-justify">
          The information presented on or through the Website is made available
          solely for general information purposes. We do not warrant the
          accuracy, completeness, or usefulness of this information. Any
          reliance you place on such information is strictly at your own risk.
          We disclaim all liability and responsibility arising from any reliance
          placed on such materials by you or any other visitor to the Website,
          or by anyone who may be informed of any of its contents.
        </p>
        <p className="text-justify">
          This Website may include content provided by third parties and all
          statements and/or opinions expressed in these materials, and all
          articles and responses to questions and other content, other than the
          content provided by the Company, are solely the opinions and the
          responsibility of the person or entity providing those materials.
          These materials do not necessarily reflect the opinion of the Company.
          We are not responsible, or liable to you or any third party, for the
          content or accuracy of any materials provided by any third parties.
        </p>

        <p className="mb-2 text-lg font-semibold">Changes to the Website</p>
        <p className="text-justify">
          We may update the content on this Website from time to time, but its
          content is not necessarily complete or up-to-date. Any of the material
          on the Website may be out of date at any given time, and we are under
          no obligation to update such material or label it in any way.
        </p>

        <p className="mb-2 text-lg font-semibold">
          Information About You and Your Visits to the Website
        </p>
        <p className="text-justify">
          All information we collect on this Website is subject to our Terms of
          Use and our <a href="/policy">Privacy Policy</a>. By using the
          Website, you consent to all actions taken by us with respect to your
          information in compliance with the Terms and Conditions and the
          Privacy Policy.
        </p>

        <p className="mb-2 text-lg font-semibold">Other Terms and Conditions</p>
        <p className="text-justify">
          Additional terms and conditions may also apply to specific portions,
          services, or features of the Website. All such additional terms and
          conditions are hereby incorporated by this reference into these Terms
          of Use.
        </p>

        <p className="mb-2 text-lg font-semibold">
          Linking to the Website and Social Media Features
        </p>
        <p className="text-justify">
          You may link to our homepage, provided you do so in a way that is fair
          and legal and does not damage our reputation or take advantage of it,
          but you must not establish a link in such a way as to suggest any form
          of association, approval, or endorsement on our part without our
          express written consent.
        </p>

        <p className="text-justify">
          This Website may provide certain social media features that enable you
          to:
        </p>
        <ul className="text-justify list-disc ml-8">
          <li className="text-justify">
            Link from your own or certain third-party websites to certain
            content on this Website.
          </li>
          <li className="text-justify">
            Send emails or other communications with certain content, or links
            to certain content, on this Website.
          </li>
          <li className="text-justify">
            Cause limited portions of content on this Website to be displayed or
            appear to be displayed on your own or certain third-party websites.
          </li>
        </ul>
        <p className="text-justify">
          You may use these features solely as they are provided by us, and
          solely with respect to the content they are displayed with, and
          otherwise in accordance with any additional terms and conditions we
          provide with respect to such features. Subject to the foregoing, you
          must not:
        </p>

        <ul className="text-justify list-disc ml-8">
          <li className="text-justify">
            Establish a link from any website that is not owned by you.
          </li>
          <li className="text-justify">
            Cause the Website or portions of it to be displayed on, or appear to
            be displayed by, any other site, for example, framing, deep linking,
            or in-line linking.
          </li>
          <li className="text-justify">
            Link to any part of the Website other than the homepage.
          </li>
          <li className="text-justify">
            Otherwise take any action with respect to the materials on this
            Website that is inconsistent with any other provision of these Terms
            of Use.
          </li>
        </ul>

        <p className="text-justify">
          You agree to cooperate with us in causing any unauthorized framing or
          linking to stop immediately. We reserve the right to withdraw linking
          permission without notice. We may disable all or any social media
          features and any links at any time without notice in our discretion.
        </p>

        <p className="mb-2 text-lg font-semibold">Links from the Website</p>
        <p className="text-justify">
          If the Website contains links to other sites and resources provided by
          third parties, these links are provided for your convenience only.
          This includes links contained in advertisements, including banner
          advertisements and sponsored links, if applicable. We have no control
          over the contents of those sites or resources and accept no
          responsibility for them or for any loss or damage that may arise from
          your use of them. If you decide to access any of the third-party
          websites linked to this Website, you do so entirely at your own risk
          and subject to the terms and conditions of use for such websites.
        </p>

        <p className="mb-2 text-lg font-semibold">Disclaimer of Warranties</p>
        <p className="text-justify">
          You understand that we cannot and do not guarantee or warrant that
          files available for downloading from the Internet or the Website will
          be free of viruses or other destructive code. You are responsible for
          implementing sufficient procedures and checkpoints to satisfy your
          particular requirements for anti-virus protection and accuracy of data
          input and output, and for maintaining a means external to our Site for
          any reconstruction of any lost data.
        </p>

        <p className="text-justify">
          TO THE FULLEST EXTENT PROVIDED BY LAW, WE WILL NOT BE LIABLE FOR ANY
          LOSS OR DAMAGE CAUSED BY A DISTRIBUTED DENIAL-OF-SERVICE ATTACK,
          VIRUSES, OR OTHER TECHNOLOGICALLY HARMFUL MATERIAL THAT MAY INFECT
          YOUR COMPUTER EQUIPMENT, COMPUTER PROGRAMS, DATA, OR OTHER PROPRIETARY
          MATERIAL DUE TO YOUR USE OF THE WEBSITE OR ANY SERVICES OR ITEMS
          OBTAINED THROUGH THE WEBSITE OR TO YOUR DOWNLOADING OF ANY MATERIAL
          POSTED ON IT, OR ON ANY WEBSITE LINKED TO IT.
        </p>
        <p className="text-justify">
          YOUR USE OF THE WEBSITE, ITS CONTENT, AND ANY SERVICES OR ITEMS
          OBTAINED THROUGH THE WEBSITE IS AT YOUR OWN RISK. THE WEBSITE, ITS
          CONTENT, AND ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE ARE
          PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS, WITHOUT ANY
          WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. NEITHER THE COMPANY
          NOR ANY PERSON ASSOCIATED WITH THE COMPANY MAKES ANY WARRANTY OR
          REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY,
          RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE WEBSITE.
          WITHOUT LIMITING THE FOREGOING, NEITHER THE COMPANY NOR ANYONE
          ASSOCIATED WITH THE COMPANY REPRESENTS OR WARRANTS THAT THE WEBSITE,
          ITS CONTENT, OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE
          WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED, THAT DEFECTS
          WILL BE CORRECTED, THAT OUR SITE OR THE SERVER THAT MAKES IT AVAILABLE
          ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS, OR THAT THE WEBSITE
          OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE WILL OTHERWISE
          MEET YOUR NEEDS OR EXPECTATIONS.
        </p>
        <p className="text-justify">
          TO THE FULLEST EXTENT PROVIDED BY LAW, THE COMPANY HEREBY DISCLAIMS
          ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, STATUTORY, OR
          OTHERWISE, INCLUDING BUT NOT LIMITED TO, ANY WARRANTIES OF
          MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR PURPOSE.
        </p>
        <p className="text-justify">
          THE FOREGOING DOES NOT AFFECT ANY WARRANTIES THAT CANNOT BE EXCLUDED
          OR LIMITED UNDER APPLICABLE LAW.
        </p>

        <p className="mb-2 text-lg font-semibold">Limitation on Liability</p>
        <p className="text-justify">
          TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL THE COMPANY,
          ITS AFFILIATES, SUBSIDIARIES, SUCCESSORS, ASSIGNS, OR THEIR LICENSORS,
          SERVICE PROVIDERS, EMPLOYEES, AGENTS, MEMBERS, OWNERS, PARTNERS,
          OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY
          LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR
          INABILITY TO USE, THE WEBSITE, ANY WEBSITES LINKED TO IT, ANY CONTENT
          ON THE WEBSITES OR SUCH OTHER WEBSITES, INCLUDING ANY DIRECT,
          INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
          INCLUDING BUT NOT LIMITED TO, PERSONAL INJURY, PAIN AND SUFFERING,
          EMOTIONAL DISTRESS, LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS
          OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF GOODWILL, LOSS OF DATA,
          AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT,
          OR OTHERWISE, EVEN IF FORESEEABLE.
        </p>

        <p className="mb-2 text-lg font-semibold">Indemnification</p>

        <p className="text-justify">
          You agree to defend, indemnify, and hold harmless the Company, its
          affiliates, licensors, and service providers, and its and their
          respective direct or indirect partners, owners, members, officers,
          directors, affiliates, subsidiaries, representatives, employees,
          contractors, agents, licensors, suppliers, invitees, guests, clients
          of the Company, successors, and assigns from and against any claims,
          liabilities, damages, judgments, awards, losses, costs, expenses, or
          fees (including reasonable attorneys’ fees) arising out of or relating
          to your violation of these Terms of Use, all documents incorporated
          herein by reference, including, without limitation, these Terms of Use
          and Privacy Policy or your use of the Website, any use of the
          Website’s content, services, and products other than as expressly
          authorized in these Terms of Use, or your use of any information
          obtained from the Website.
        </p>

        <p className="mb-2 text-lg font-semibold">Governing Law</p>
        <p className="text-justify">
          All matters relating to the Website and these Terms of Use, and any
          dispute or claim arising therefrom or related thereto (in each case,
          including non-contractual disputes or claims), shall be governed by
          and construed in accordance with the internal laws of the Kazakhstan
          Republic without giving effect to any choice or conflict of law
          provision or rule (whether of the Kazakhstan Republic or any other
          jurisdiction).
        </p>

        <p className="mb-2 text-lg font-semibold">Arbitration</p>
        <p className="text-justify">
          At the Company’s sole discretion, it may require you to submit any
          disputes arising from these Terms of Use or use of the Website,
          including disputes arising from or concerning their interpretation,
          violation, invalidity, non-performance, or termination, to final and
          binding arbitration under the Kazakhstany legislation. The place of
          arbitration shall be Kazakhstan.
        </p>

        <p className="mb-2 text-lg font-semibold">
          Limitation on Time to File Claims
        </p>
        <p className="text-justify">
          ANY CAUSE OF ACTION OR CLAIM YOU MAY HAVE ARISING OUT OF OR RELATING
          TO THESE TERMS OF USE OR THE WEBSITE MUST BE COMMENCED WITHIN ONE (1)
          YEAR AFTER THE CAUSE OF ACTION ACCRUES; OTHERWISE, SUCH CAUSE OF
          ACTION OR CLAIM IS PERMANENTLY BARRED.
        </p>

        <p className="mb-2 text-lg font-semibold">Waiver and Severability</p>
        <p className="text-justify">
          No waiver by the Company of any term or condition set out in these
          Terms of Use shall be deemed a further or continuing waiver of such
          term or condition or a waiver of any other term or condition, and any
          failure of the Company to assert a right or provision under these
          Terms of Use shall not constitute a waiver of such right or provision.
        </p>

        <p className="text-justify">
          If any provision of these Terms of Use is held by a court or other
          tribunal of competent jurisdiction to be invalid, illegal, or
          unenforceable for any reason, such provision shall be eliminated or
          limited to the minimum extent such that the remaining provisions of
          the Terms of Use will continue in full force and effect.
        </p>

        <p className="mb-2 text-lg font-semibold">Entire Agreement</p>

        <p className="text-justify">
          The Terms of Use, our Privacy Policy, and any applicable Terms and
          Conditions constitute the sole and entire agreement between Users and
          the Company regarding the Website and supersedes all prior and
          contemporaneous understandings, agreements, representations, and
          warranties, both written and oral, regarding use of the Website.
        </p>

        <p className="mb-2 text-lg font-semibold">Your Comments and Concerns</p>
        <p className="text-justify">This website is operated by Aneko.</p>
        <p className="text-justify">
          All notices of copyright infringement claims should be sent to:{" "}
          <a href="/contactUs">Contact us</a>.
        </p>
        <p className="text-justify">
          All other feedback, comments, requests for technical support, and
          other communications relating to the Website should be directed to:{" "}
          <a href="/contactUs">Contact us</a>
        </p>
      </div>
    </div>
  );
}
