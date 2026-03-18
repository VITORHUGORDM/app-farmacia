import { ClipboardCheck, Pill, Stethoscope, Users } from "lucide-react-native";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CardEstatistica from "../_components/CardEstatistica";
import { Colors } from "../_components/Colors";
import Header from "../_components/Header";
import { useApp } from "../_interfaces/AppContext";

const screenWidth = Dimensions.get("window").width;

export default function HomeScreen() {
  const { pacientes, medicamentos, farmaceuticos, tratamentos } = useApp();

  // Dados do gráfico de tratamentos por mês
  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
  const dadosGrafico = [15, 22, 18, 25, 21, 28];
  const maxValor = Math.max(...dadosGrafico);

  // Medicamentos mais utilizados (simulados ou baseados nos dados)
  const medicamentosMaisUsados =
    medicamentos.length > 0
      ? medicamentos.slice(0, 3).map((med, index) => ({
          nome: med.nome,
          quantidade: med.quantidade,
          dosagem: med.dosagem,
        }))
      : [
          {
            nome: "Paracetamol 500mg",
            fabricante: "EMS",
            quantidade: "150",
            dosagem: "2x/dia",
          },
          {
            nome: "Ibuprofeno 600mg",
            fabricante: "Medley",
            quantidade: "80",
            dosagem: "2x/dia",
          },
          {
            nome: "Amoxicilina 500mg",
            fabricante: "Neo Química",
            quantidade: "65",
            dosagem: "3x/dia",
          },
        ];

  // Tratamentos recentes
  const tratamentosRecentes =
    tratamentos.length > 0
      ? tratamentos
          .slice(-3)
          .reverse()
          .map((trat) => ({
            paciente: trat.paciente,
            medicamento: trat.medicamento,
            data: trat.dataInicio,
          }))
      : [
          {
            paciente: "Carlos Oliveira",
            medicamento: "Paracetamol 500mg",
            data: "01/01/2026",
          },
          {
            paciente: "Maria Silva",
            medicamento: "Ibuprofeno 600mg",
            data: "28/12/2025",
          },
        ];

  return (
    <SafeAreaView style={styles.container}>
      <Header image={require("../../../assets/images/logo-iesgobranca.png")} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Título Dashboard */}
        <View style={styles.titleSection}>
          <Text style={styles.dashboardTitle}>Dashboard</Text>
          <Text style={styles.dashboardSubtitle}>
            Bem-vindo ao sistema de gestão farmacêutica
          </Text>
        </View>

        {/* Cards de Estatísticas */}
        <CardEstatistica
          title="Total de pacientes"
          value={String(pacientes.length || 2)}
          icon={<Users size={24} color={Colors.primary} />}
        />
        <CardEstatistica
          title="Medicamentos em estoque"
          value={String(medicamentos.length || 230)}
          icon={<Pill size={24} color={Colors.success} />}
        />
        <CardEstatistica
          title="Farmacêuticos ativos"
          value={String(farmaceuticos.length || 2)}
          icon={<Stethoscope size={24} color="#8B5CF6" />}
        />
        <CardEstatistica
          title="Tratamentos em andamento"
          value={String(tratamentos.length || 1)}
          icon={<ClipboardCheck size={24} color={Colors.success} />}
        />

        {/* Gráfico de Tratamentos por Mês */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}> Tratamentos por Mês</Text>
          <View style={styles.chartContainer}>
            {dadosGrafico.map((valor, index) => (
              <View key={index} style={styles.barContainer}>
                <Text style={styles.barValue}>{valor}</Text>
                <View
                  style={[
                    styles.bar,
                    {
                      height: (valor / maxValor) * 120,
                      backgroundColor: Colors.primary,
                    },
                  ]}
                />
                <Text style={styles.barLabel}>{meses[index]}</Text>
              </View>
            ))}
          </View>
          <View style={styles.legendContainer}>
            <View style={styles.legendDot} />
            <Text style={styles.legendText}>tratamentos</Text>
          </View>
        </View>

        {/* Medicamentos Mais Utilizados */}
        <View style={styles.listCard}>
          <Text style={styles.listTitle}>Medicamentos mais utilizados</Text>
          {medicamentosMaisUsados.map((med, index) => (
            <View key={index} style={styles.listItem}>
              <View style={styles.listItemNumber}>
                <Text style={styles.listItemNumberText}>{index + 1}</Text>
              </View>
              <View style={styles.listItemContent}>
                <Text style={styles.listItemName}>{med.nome}</Text>
              </View>
              <View style={styles.listItemRight}>
                <Text style={styles.listItemQuantity}>{med.quantidade}</Text>
                <Text style={styles.listItemDosage}>{med.dosagem}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Tratamentos Recentes */}
        <View style={[styles.listCard, { marginBottom: 32 }]}>
          <Text style={styles.listTitle}>Tratamentos recentes</Text>
          {tratamentosRecentes.map((trat, index) => (
            <View key={index} style={styles.listItem}>
              <View style={styles.listItemContent}>
                <Text style={styles.listItemName}>{trat.paciente}</Text>
                <Text style={styles.listItemSub}>{trat.medicamento}</Text>
              </View>
              <View style={styles.listItemRight}>
                <Text style={styles.listItemSub}>Dr. João Silva</Text>
                <Text style={styles.listItemDosage}>{trat.data}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  titleSection: {
    marginBottom: 20,
  },
  dashboardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
  },
  dashboardSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  // Gráfico
  chartCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 16,
  },
  chartContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    height: 160,
    paddingTop: 20,
  },
  barContainer: {
    alignItems: "center",
    flex: 1,
  },
  bar: {
    width: 32,
    borderRadius: 6,
    minHeight: 8,
  },
  barValue: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginBottom: 4,
    fontWeight: "600",
  },
  barLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 8,
  },
  legendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    marginRight: 6,
  },
  legendText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  // Lista Cards
  listCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 12,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  listItemNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  listItemNumberText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 13,
  },
  listItemContent: {
    flex: 1,
  },
  listItemName: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
  },
  listItemSub: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  listItemRight: {
    alignItems: "flex-end",
  },
  listItemQuantity: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.text,
  },
  listItemDosage: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
