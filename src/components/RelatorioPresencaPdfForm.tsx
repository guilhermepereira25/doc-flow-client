import React from "react";
import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";

// Estilos do PDF
const styles = StyleSheet.create({
  page: { flexDirection: "column", padding: 20, alignItems: "center", textAlign: "center" },
  headerImage: { width: 400, height: 100, marginBottom: 20 },
  textContainer: { margin: 20, width: "80%" },
  text: { fontSize: 14, lineHeight: 1.5 },
  signatures: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
  signatureImage: { width: 150, height: 50, marginHorizontal: 20 },
});

export const CertificatePDF = ({
  nome,
  atividade,
  horas,
  dataInicio,
  dataFim,
}: {
  nome: string | undefined;
  atividade: string;
  horas: number;
  dataInicio: string;
  dataFim: string;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image style={styles.headerImage} src="/images/cefet-logo.png" />
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          O Centro Federal de Educação Tecnológica Celso Suckow da Fonseca certifica que {nome} apresentou a
          Atividade {atividade} , com duração de {horas} horas, durante a realização da Semana de Ensino,
          Pesquisa e Extensão 2024 – “Biomas do Brasil: diversidade, saberes e tecnologias sociais” evento anual
          promovido pelo Departamento de Extensão e Assuntos Comunitário – DEAC, no período de {dataInicio} a {dataFim}
          .
        </Text>
      </View>
      <View style={styles.signatures}>
        <Image style={styles.signatureImage} src="/images/assinatura1.png" />
        <Image style={styles.signatureImage} src="/images/assinatura2.jpg" />
      </View>
    </Page>
  </Document>
);

export default CertificatePDF;
