import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Hr,
} from "@react-email/components";

export interface ContactLeadEmailProps {
  name: string;
  email: string;
  phone?: string;
  message: string;
  propertyTitle?: string;
}

export function ContactLeadEmail({
  name,
  email,
  phone,
  message,
  propertyTitle,
}: ContactLeadEmailProps) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>Nouvelle demande de contact — {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={brand}>LuxEstate</Text>
          <Heading style={h1}>Nouvelle demande de contact</Heading>
          {propertyTitle && (
            <Text style={text}>
              Concernant : <strong>{propertyTitle}</strong>
            </Text>
          )}
          <Hr style={hr} />
          <Text style={text}>
            <strong>Nom :</strong> {name}
          </Text>
          <Text style={text}>
            <strong>Email :</strong> {email}
          </Text>
          {phone && (
            <Text style={text}>
              <strong>Téléphone :</strong> {phone}
            </Text>
          )}
          <Hr style={hr} />
          <Text style={text}>{message}</Text>
        </Container>
      </Body>
    </Html>
  );
}

export default ContactLeadEmail;

const main = { backgroundColor: "#f4f5f7", fontFamily: "Helvetica, Arial, sans-serif" };
const container = { margin: "0 auto", padding: "32px 24px", maxWidth: "520px" };
const brand = { fontSize: "18px", fontWeight: 700, color: "#2f45a8" };
const h1 = { fontSize: "22px", fontWeight: 700, color: "#1a1f2e", margin: "16px 0" };
const text = { fontSize: "15px", lineHeight: "24px", color: "#3a4152", margin: "6px 0" };
const hr = { borderColor: "#e5e7eb", margin: "16px 0" };
