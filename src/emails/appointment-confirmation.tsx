import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Button,
  Hr,
  Img,
} from "@react-email/components";

export interface AppointmentEmailProps {
  name: string;
  propertyTitle: string;
  propertyImage: string;
  city: string;
  agentName: string;
  date: string; // human readable
  slot: string;
  url: string;
}

export function AppointmentConfirmationEmail({
  name,
  propertyTitle,
  propertyImage,
  city,
  agentName,
  date,
  slot,
  url,
}: AppointmentEmailProps) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>
        Votre visite privée est confirmée — {propertyTitle}, {date} à {slot}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={brand}>LuxEstate</Text>
          <Heading style={h1}>Votre visite est confirmée</Heading>
          <Text style={text}>Bonjour {name},</Text>
          <Text style={text}>
            Nous avons le plaisir de confirmer votre visite privée. Votre
            conseiller {agentName} vous accueillera à l&apos;horaire convenu.
          </Text>

          <Section style={card}>
            <Img src={propertyImage} width="100%" style={image} alt="" />
            <Section style={cardBody}>
              <Text style={cardTitle}>{propertyTitle}</Text>
              <Text style={cardMeta}>{city}</Text>
              <Hr style={hr} />
              <Text style={detail}>
                <strong>Date :</strong> {date}
              </Text>
              <Text style={detail}>
                <strong>Heure :</strong> {slot}
              </Text>
              <Text style={detail}>
                <strong>Conseiller :</strong> {agentName}
              </Text>
            </Section>
          </Section>

          <Button style={button} href={url}>
            Voir la propriété
          </Button>

          <Hr style={hr} />
          <Text style={footer}>
            LuxEstate — l&apos;immobilier d&apos;exception. Pour modifier ou
            annuler, connectez-vous à votre espace client.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default AppointmentConfirmationEmail;

const main = { backgroundColor: "#f4f5f7", fontFamily: "Helvetica, Arial, sans-serif" };
const container = { margin: "0 auto", padding: "32px 24px", maxWidth: "520px" };
const brand = { fontSize: "18px", fontWeight: 700, color: "#2f45a8", letterSpacing: "0.5px" };
const h1 = { fontSize: "24px", fontWeight: 700, color: "#1a1f2e", margin: "16px 0" };
const text = { fontSize: "15px", lineHeight: "24px", color: "#3a4152" };
const card = { border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden", margin: "24px 0", backgroundColor: "#ffffff" };
const image = { objectFit: "cover" as const, maxHeight: "200px" };
const cardBody = { padding: "16px 20px" };
const cardTitle = { fontSize: "18px", fontWeight: 700, color: "#1a1f2e", margin: 0 };
const cardMeta = { fontSize: "14px", color: "#6b7280", margin: "4px 0 0" };
const detail = { fontSize: "14px", color: "#3a4152", margin: "4px 0" };
const button = { backgroundColor: "#2f45a8", color: "#ffffff", borderRadius: "8px", padding: "12px 24px", fontSize: "15px", fontWeight: 600, textDecoration: "none", display: "inline-block" };
const hr = { borderColor: "#e5e7eb", margin: "20px 0" };
const footer = { fontSize: "12px", color: "#9ca3af", lineHeight: "18px" };
