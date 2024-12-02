import React from 'react';
import { Container, Typography, Box, Link, Divider } from '@mui/material';

const TermsAndConditions = () => {
  return (
    <Container maxWidth="md" sx={{ padding: 4, backgroundColor: '#fff', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Terms and Conditions
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Effective Date:</strong> [Insert Date]
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to <strong>Symphonic Concert</strong>. By accessing or using the Symphonic Concert service (the “Service”), you agree to comply with and be bound by these Terms of Use (“Terms”). If you do not agree to these Terms, do not access or use the Service. Please also review our{' '}
        <Link href="/privacy-policy" color="primary">Privacy Policy</Link> for further information on how we collect and process your personal data.
      </Typography>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          1. Symphonic Concert’s Operation Through Third-Party Websites and Applications
        </Typography>
        <Typography variant="body1" paragraph>
          1.1 <strong>Third-Party Platforms:</strong> Symphonic Concert may use third-party websites, applications, and/or platforms to provide its services. You should be aware that third-party platforms may have their own terms and conditions, which you need to review and accept in order to use Symphonic Concert’s services.
        </Typography>
        <Typography variant="body1" paragraph>
          1.2 <strong>Monetization Partner:</strong> Our payment and subscription partner, <strong>Cleeng B.V.</strong> (“Cleeng”), handles the management of access to content, subscriptions, and payment processing on our behalf. Cleeng acts as the merchant of record for subscription billing. The services provided by Cleeng are subject to Cleeng’s terms and conditions, which you can review here: <Link href="https://cleeng.com/cleeng-user-agreement" target="_blank" color="primary">Cleeng User Agreement</Link>.
        </Typography>
      </Box>

      <Divider sx={{ margin: '24px 0' }} />

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          2. Modifications to the Terms of Use
        </Typography>
        <Typography variant="body1" paragraph>
          2.1 <strong>Changes to Terms:</strong> We may modify these Terms from time to time to comply with legal requirements or to improve the Service. Any changes will be communicated to you through the Service, and we will provide you with prior notice via email or a notification on the website/app. You will need to accept any changes before continuing to use the Service after the modifications are made.
        </Typography>
        <Typography variant="body1" paragraph>
          2.2 <strong>Acceptance of Modifications:</strong> By continuing to use the Service after receiving notice of changes, you agree to the updated Terms. If you do not agree with the modifications, you can terminate your subscription by contacting us via <Link href="https://symphonicconcert.com/need-help" color="primary">Symphonic Concert Help Center</Link>.
        </Typography>
      </Box>

      <Divider sx={{ margin: '24px 0' }} />

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          3. Accounts
        </Typography>
        <Typography variant="body1" paragraph>
          3.1 <strong>Account Creation:</strong> To use the Symphonic Concert Service, you must create an account by providing accurate and truthful information during registration. You are responsible for ensuring that your account information is up-to-date. Symphonic Concert reserves the right to suspend or terminate accounts at its sole discretion.
        </Typography>
        <Typography variant="body1" paragraph>
          3.2 <strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account login information. You agree to immediately notify us of any unauthorized use of your account.
        </Typography>
      </Box>

      <Divider sx={{ margin: '24px 0' }} />

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          4. Subscription
        </Typography>
        <Typography variant="body1" paragraph>
          4.1 <strong>Subscription Plans:</strong> For access to Symphonic Concert’s content, you must subscribe to one of our available plans. You may find subscription details on the Symphonic Concert website or app. Your subscription will continue until terminated, as specified in Section 5.
        </Typography>
        <Typography variant="body1" paragraph>
          4.2 <strong>Free Trials and Promotions:</strong> If you subscribed via a free trial or promotional offer, your access will end at the conclusion of the trial period unless you subscribe to a paid plan.
        </Typography>
      </Box>

      <Divider sx={{ margin: '24px 0' }} />

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          5. Payment and Cancellation
        </Typography>
        <Typography variant="body1" paragraph>
          5.1 <strong>Payment Methods:</strong> You must provide one or more valid payment methods to access the Service. You authorize Symphonic Concert and its payment processing partner, Cleeng, to charge your payment method for the applicable subscription fees.
        </Typography>
        <Typography variant="body1" paragraph>
          5.2 <strong>Billing:</strong> Your subscription fee will be charged automatically at the start of each billing cycle (monthly or annually). You can view your next billing date by accessing your account at <Link href="https://symphonicconcert.com/my-account" color="primary">Symphonic Concert Account</Link>.
        </Typography>
        <Typography variant="body1" paragraph>
          5.3 <strong>Updating Payment Methods:</strong> You can update your payment methods anytime by visiting the “Account” page on the website or app.
        </Typography>
        <Typography variant="body1" paragraph>
          5.4 <strong>Subscription Renewal and Cancellation:</strong> Your subscription will renew automatically unless you cancel it before the end of the current billing cycle. If you cancel, you will retain access to the Service until the end of the current subscription period. To cancel your subscription, visit your account page.
        </Typography>
        <Typography variant="body1" paragraph>
          5.5 <strong>Price Changes:</strong> Symphonic Concert reserves the right to modify subscription prices, with at least 30 days' notice given to users. You will have the option to accept or reject these changes.
        </Typography>
        <Typography variant="body1" paragraph>
          5.6 <strong>Customer Support:</strong> For any inquiries related to payments, subscriptions, or cancellations, please visit our <Link href="https://symphonicconcert.com/need-help" color="primary">Help Center</Link>.
        </Typography>
      </Box>

      <Divider sx={{ margin: '24px 0' }} />

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          6. Using Symphonic Concert’s Service
        </Typography>
        <Typography variant="body1" paragraph>
          6.1 <strong>Personal and Non-Commercial Use:</strong> The Service is provided for personal, non-commercial use only. You may not use the Service for public performances or any unauthorized commercial activities.
        </Typography>
        <Typography variant="body1" paragraph>
          6.2 <strong>Content Access:</strong> Your access to Symphonic Concert’s content is non-transferable and revocable at any time. You do not own any content on the Service but are granted a limited license to access it during your subscription period.
        </Typography>
        <Typography variant="body1" paragraph>
          6.3 <strong>Prohibited Activities:</strong> You agree not to engage in any activities that violate applicable laws, infringe on intellectual property rights, disrupt the Service, or compromise the security of the Service.
        </Typography>
        <Typography variant="body1" paragraph>
          6.4 <strong>Content Availability:</strong> Symphonic Concert’s content may vary by geographic location and may be updated regularly. We may modify or remove content without notice.
        </Typography>
        <Typography variant="body1" paragraph>
          6.5 <strong>Updates to Software:</strong> Symphonic Concert may update its website, mobile application, or software periodically. You may be required to update your software to continue using the Service.
        </Typography>
      </Box>

      <Divider sx={{ margin: '24px 0' }} />

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          7. Assignment
        </Typography>
        <Typography variant="body1" paragraph>
          7.1 <strong>Assignment by Symphonic Concert:</strong> Symphonic Concert may assign its rights or obligations under these Terms to third parties at its discretion.
        </Typography>
        <Typography variant="body1" paragraph>
          7.2 <strong>Assignment by You:</strong> You may not assign or transfer your rights or obligations under these Terms to any third party.
        </Typography>
      </Box>

      <Divider sx={{ margin: '24px 0' }} />

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          8. Governing Law
        </Typography>
        <Typography variant="body1" paragraph>
          These Terms shall be governed by and construed in accordance with the laws of [Insert Country or Jurisdiction], without regard to its conflict of laws principles. This will not affect any consumer protection rights you may have under the laws of your country of residence.
        </Typography>
      </Box>

      <Divider sx={{ margin: '24px 0' }} />

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          9. Survival
        </Typography>
        <Typography variant="body1" paragraph>
          If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will continue in effect.
        </Typography>
      </Box>

      <Divider sx={{ margin: '24px 0' }} />

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          10. Communications
        </Typography>
        <Typography variant="body1" paragraph>
          You agree to receive emails or notifications from Symphonic Concert regarding account activities, updates, and promotional offers. If you prefer not to receive marketing communications, you can manage your preferences in your account settings.
        </Typography>
      </Box>

      <Divider sx={{ margin: '24px 0' }} />

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          11. Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about these Terms or the Service, please contact our customer support team via the{' '}
          <Link href="https://symphonicconcert.com/need-help" color="primary">Symphonic Concert Help Center</Link>.
        </Typography>
      </Box>

      <Divider sx={{ margin: '24px 0' }} />

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          12. Company Information
        </Typography>
        <Typography variant="body1" paragraph>
          Symphonic Concert is operated by Symphonic Concert Media LLC, registered in [Country/Region], with company number [Insert Number]. VAT registration number [Insert VAT Number].
        </Typography>
      </Box>
    </Container>
  );
};

export default TermsAndConditions;
