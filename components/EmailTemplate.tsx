import {
  Html,
  Head,
  Body,
  Section,
  Row,
  Column,
  Text,
} from "@react-email/components";
import * as React from "react";

export const EmailTemplate = () => (
  <Html style={main}>
    <Head />
    <Body>
      <Section style={grid}>
        {/* Row 1 */}
        <Row>
          <Column style={cellBorderRightBottom}>
            <Text style={textStyle}>1</Text>
          </Column>
          <Column style={cellBorderBottomMiddle}>
            <Text style={textStyle}>
              <Text style={emailSubjectStyle}>
                Hiring a business
                <br />
                developer
              </Text>
            </Text>
          </Column>
          <Column style={cellBorderLeftBottom}>
            <Text style={textStyle}>3</Text>
          </Column>
        </Row>
        {/* Row 2 */}
        <Row>
          <Column style={cellBorderRight}>
            <Text style={textStyle}>
              <img src="/left.png" style={leftImage} />
            </Text>
          </Column>
          <Column style={centerCol}>
            <Text style={emailSubjectStyle}>
              Center Strip
              <br />
              Much Larger
            </Text>
          </Column>
          <Column style={cellBorderLeft}>
            <img src="/right.png" style={rightImage} />
          </Column>
        </Row>
        {/* Row 3 */}
        <Row>
          <Column style={cellBorderRightTop}>
            <Text style={textStyle}>7</Text>
          </Column>
          <Column style={cellBorderTopMiddle}>
            <Text style={textStyle}>
              <img src="/bottom.png" style={bottomImage} />
            </Text>
          </Column>
          <Column style={cellBorderLeftTop}>
            <Text style={textStyle}>9</Text>
          </Column>
        </Row>
      </Section>
    </Body>
  </Html>
);

export default EmailTemplate;

// --- Styles ---
const leftImage = {
  position: "absolute" as const,
  right: 0,
  top: 0,
  height: "100%" as const,
  width: "auto" as const,
  objectFit: "cover" as const,
};

const rightImage = {
  position: "absolute" as const,
  left: 0,
  top: 0,
  height: "100%" as const,
  width: "auto" as const,
  objectFit: "cover" as const,
};

const bottomImage = {
  position: "absolute" as const,
  left: 0,
  top: 0,
  width: "100%" as const,
  height: "auto" as const,
  objectFit: "cover" as const,
};

const main = {
  backgroundColor: "#fff",
  fontFamily: "sans-serif",
};

const grid = {
  background: "#fff",
  borderRadius: "2px",
  margin: "0 auto",
  width: "96%",
  maxWidth: "760px",
  border: "0.5px solid #c4c4c4",
  boxShaow: "0px 0px 50px rgba(0,0,0,0.2)",
};

// Border style
const dashed = "1px dashed #c4c4c4";

// Responsive: middle column is much wider
const cellBase = {
  position: "relative" as const,
  boxSizing: "border-box" as const,
  textAlign: "center" as const,
  verticalAlign: "middle",
  minWidth: "40px",
  fontWeight: 500,
  fontSize: "18px",
  padding: "0",
};

const textStyle = {
  fontSize: "20px",
  lineHeight: "60px",
  margin: 0,
  fontWeight: 600,
  letterSpacing: "2px",
};

const emailSubjectStyle = {
  fontSize: "22px" as const,
  fontWeight: 700,
  lineHeight: "1.4" as const,
  margin: 0,
  padding: "32px 0" as const,
  color: "#333" as const,
  textTransform: "uppercase" as const,
  fontFamily: "sans-serif" as const,
};

// Column widths: 20% | 60% | 20%
const leftCol = { ...cellBase, width: "20%" };
const middleCol = { ...cellBase, width: "60%" };
const rightCol = { ...cellBase, width: "20%" };

// Borders for each cell as per your instructions:
const cellBorderRightBottom = {
  ...leftCol,
  borderRight: dashed,
  borderBottom: dashed,
};
const cellBorderBottomMiddle = {
  ...middleCol,
  borderBottom: dashed,
};
const cellBorderLeftBottom = {
  ...rightCol,
  borderLeft: dashed,
  borderBottom: dashed,
};
const cellBorderRight = {
  ...leftCol,
  borderRight: dashed,
};
const cellBorderLeft = {
  ...rightCol,
  borderLeft: dashed,
};
const centerCol = {
  ...middleCol,
  background: "#e9e9e9",
  minHeight: "120px",
  padding: "18px 0",
};
const cellBorderRightTop = {
  ...leftCol,
  borderRight: dashed,
  borderTop: dashed,
};
const cellBorderTopMiddle = {
  ...middleCol,
  borderTop: dashed,
};
const cellBorderLeftTop = {
  ...rightCol,
  borderLeft: dashed,
  borderTop: dashed,
};
