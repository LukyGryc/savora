import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

export interface PasswordResetEmailProps {
  userName: string;
  userEmail: string;
  resetUrl: string;
}
//new.email
const ForgotYourPasswordEmail = (props: PasswordResetEmailProps) => {
  const { userName, userEmail, resetUrl } = props;
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Reset your password - Action required</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[580px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[24px] font-bold text-gray-900 m-0 mb-[8px]">
                Reset Your Password
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                We received a request to reset your password
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[16px]">
                Hello, {userName}
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[16px]">
                Someone requested a password reset for your account associated with <strong>{userEmail}</strong>. 
                If this was you, click the button below to reset your password.
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[24px]">
                If you didn't request this password reset, you can safely ignore this email. 
                Your password will remain unchanged.
              </Text>

              {/* Reset Button */}
              <Section className="text-center mb-[24px]">
                <Button
                  href={resetUrl}
                  className="bg-blue-600 text-white px-[32px] py-[12px] rounded-[6px] text-[16px] font-medium no-underline box-border inline-block"
                >
                  Reset Password
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 leading-[20px] m-0 mb-[16px]">
                Or copy and paste this link into your browser:
              </Text>
              <Text className="text-[14px] text-blue-600 leading-[20px] m-0 mb-[24px] break-all">
                <Link href={resetUrl} className="text-blue-600 underline">
                  {resetUrl}
                </Link>
              </Text>
            </Section>

            {/* Security Notice */}
            <Section className="bg-amber-50 border-l-[4px] border-amber-400 p-[16px] mb-[32px] rounded-r-[4px]">
              <Text className="text-[14px] text-amber-800 m-0 mb-[8px] font-medium">
                Security Notice
              </Text>
              <Text className="text-[14px] text-amber-700 leading-[20px] m-0">
                This password reset link will expire in 24 hours for your security. 
                If you need to reset your password after this time, please request a new reset link.
              </Text>
            </Section>

            <Hr className="border-gray-200 my-[24px]" />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ForgotYourPasswordEmail;