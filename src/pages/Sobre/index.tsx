import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { styles, COLOR } from './style';
import { AudienceItem, SectionItem, StatItem } from './type';

const STATS: StatItem[] = [
  { value: '2.400+', label: 'obstáculos\nmapeados' },
  { value: '180+', label: 'bairros\ncobertos' },
  { value: '12 mil', label: 'usuários\nativos' },
];

const SECTIONS: SectionItem[] = [
  {
    icon: '🎯',
    heading: 'Nossa missão',
    body:
      'Construir, de forma colaborativa e contínua, um mapa vivo e participativo dos obstáculos de acessibilidade urbana como rampas quebradas, elevadores fora de operação, calçadas intransitáveis, semáforos sem sinalização sonora e faixas malconservadas. Nosso objetivo é garantir que nenhuma rota seja uma surpresa desagradável e que cada deslocamento seja planejado com segurança, previsibilidade e dignidade.',
  },
  {
    icon: '⚙️',
    heading: 'Como funciona',
    body:
      'Qualquer pessoa moradora, visitante ou profissional pode registrar um obstáculo em poucos segundos por meio de dispositivos móveis, com foto, geolocalização e descrição objetiva. A comunidade assume um papel ativo: valida, complementa, corrige e comenta cada relato, garantindo que o mapa se mantenha atualizado em tempo real e com alta confiabilidade. Cada contribuição transforma uma experiência individual em um dado concreto e útil, que empodera quem mais precisa a planejar rotas seguras e evitar surpresas no dia a dia.',
  },
  {
    icon: '💡',
    heading: 'Por que isso importa',
    body:
      'No Brasil, mais de 17 milhões de pessoas convivem com algum tipo de deficiência motora, visual, auditiva ou intelectual. Para muitas delas, uma calçada irregular, uma rampa interditada ou um elevador quebrado não é um mero incômodo: pode significar a perda de uma consulta médica, o atraso para uma entrevista de trabalho, a impossibilidade de levar os filhos à escola ou, em casos extremos, o desestímulo permanente a sair de casa. Além desse público, o mapa beneficia idosos, gestantes, pessoas com carrinhos de bebê, ciclistas e todos que desejam trajetos mais previsíveis. A acessibilidade, quando bem mapeada, torna-se um bem coletivo que transforma cidades inteiras.',
  },
];

const AUDIENCE: AudienceItem[] = [
  { id: 'wheelchair', icon: '♿', label: 'Cadeirantes', description: 'Rotas livres de barreiras físicas' },
  { id: 'lowvision', icon: '👁️', label: 'Baixa visão', description: 'Alertas sobre pisos e obstáculos' },
  { id: 'elderly', icon: '🚶', label: 'Idosos', description: 'Caminhos seguros e sinalizados' },
  { id: 'stroller', icon: '🍼', label: 'Famílias com carrinho', description: 'Acesso nivelado e sem degraus' },
];

const Header: React.FC = () => (
  <TouchableOpacity 
    style={styles.header}
    activeOpacity={0.7}
    accessibilityRole="button"
    accessibilityLabel="Via Livre - Página inicial"
    accessibilityHint="Navega para a tela inicial do aplicativo"
  >
    <View style={styles.logoMark}>
      <Text style={styles.logoMarkText}>VL</Text>
    </View>
    <View>
      <Text style={styles.eyebrow}>Sobre o app</Text>
      <Text style={styles.appName}>Via Livre</Text>
    </View>
  </TouchableOpacity>
);

const Tagline: React.FC = () => (
  <Text 
    style={styles.tagline}
    accessibilityRole="text"
    accessibilityLabel="Transformamos o caminho até o ponto de ônibus numa rota que qualquer pessoa pode percorrer com confiança." // ✨ A11Y: Descrição completa
  >
    Transformamos o caminho até o ponto de ônibus numa rota que qualquer pessoa
    pode percorrer com confiança.
  </Text>
);

const StatsRow: React.FC = () => (
  <View 
    style={styles.statsRow}
    accessibilityRole="header"
    accessibilityLabel="Estatísticas do aplicativo: 2 mil e 400 obstáculos mapeados, 180 bairros cobertos, 12 mil usuários ativos" // ✨ A11Y: Descrição completa das stats
  >
    {STATS.map((stat, i) => (
      <React.Fragment key={stat.label}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stat.value}</Text>
          <Text style={styles.statLabel}>{stat.label}</Text>
        </View>
        {i < STATS.length - 1 && <View style={styles.statDivider} />}
      </React.Fragment>
    ))}
  </View>
);

const InfoSection: React.FC<{ item: SectionItem }> = ({ item }) => (
  <View 
    style={styles.infoSection}
    accessibilityRole="text"
  >
    <View style={styles.infoSectionHeader}>
      <Text 
        style={styles.infoIcon}
        accessibilityLabel={`Ícone: ${item.heading}`}
      >
        {item.icon}
      </Text>
      <Text 
        style={styles.infoHeading}
        accessibilityRole="header"
      >
        {item.heading}
      </Text>
    </View>
    <Text style={styles.infoBody}>{item.body}</Text>
  </View>
);

const AudienceCard: React.FC<{ item: AudienceItem }> = ({ item }) => (
  <TouchableOpacity 
    style={styles.audienceCard}
    activeOpacity={0.7}
    accessibilityRole="button"
    accessibilityLabel={`${item.label}: ${item.description}`}
    accessibilityHint={`Toque para ver mais detalhes sobre acessibilidade para ${item.label.toLowerCase()}`}
  >
    <Text 
      style={styles.audienceIcon}
      accessibilityLabel={`Ícone representando ${item.label}`}
    >
      {item.icon}
    </Text>
    <Text style={styles.audienceLabel}>{item.label}</Text>
    <Text style={styles.audienceDesc}>{item.description}</Text>
  </TouchableOpacity>
);

const Quote: React.FC = () => (
  <View 
    style={styles.quoteBlock}
    accessibilityRole="text"
    accessibilityLabel={`Citação: "Cada obstáculo reportado é uma barreira a menos no caminho de alguém." - Time Via Livre`} // ✨ A11Y: Descrição completa da citação
  >
    <View style={styles.quoteAccent} />
    <View style={styles.quoteContent}>
      <Text style={styles.quoteText}>
        "Cada obstáculo reportado é uma barreira a menos no caminho de alguém."
      </Text>
      <Text style={styles.quoteAttrib}>Time Via Livre</Text>
    </View>
  </View>
);

const Footer: React.FC = () => (
  <View 
    style={styles.footer}
    accessibilityRole="text"
  >
    <Text style={styles.footerText}>
      Via Livre é um projeto estudantil independente, desenvolvido com o
      propósito de tornar a cidade mais acessível para todos.
    </Text>
    <Text style={styles.footerVersion}>Versão 1.0.0</Text>
  </View>
);

export const Sobre: React.FC = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLOR.surfaceMuted} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        accessible={true}
        accessibilityLabel="Página Sobre o aplicativo Via Livre. Role para baixo para mais informações."
      >
        <Header />
        <Tagline />
        <StatsRow />

        <View style={styles.divider} />

        <View style={styles.sectionsBlock}>
          {SECTIONS.map((section) => (
            <InfoSection key={section.heading} item={section} />
          ))}
        </View>

        <View style={styles.divider} />

        <View 
          style={styles.audienceBlock}
          accessibilityRole="header"
          accessibilityLabel="Públicos atendidos: Cadeirantes, Baixa visão, Idosos, Famílias com carrinho" // ✨ A11Y: Descrição do público
        >
          <Text 
            style={styles.sectionLabel}
            accessibilityRole="header"
          >
            Para quem
          </Text>
          <View style={styles.audienceGrid}>
            {AUDIENCE.map((item) => (
              <AudienceCard key={item.id} item={item} />
            ))}
          </View>
        </View>

        <Quote />
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};
