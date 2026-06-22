import { StyleSheet } from "react-native";

export const COLOR = {
  brand: '#3B75B0',
  surface: '#FFFFFF',
  surfaceMuted: '#F8F9FA',
  border: '#E2E2E2',
  textPrimary: '#1A1A1A',
  textSecondary: '#494949',
  textMuted: '#777777',
} as const;

export const FONT = {
  regular: 'Montserrat-Regular',
  bold: 'Montserrat-Bold',
} as const;

const RADIUS = { sm: 8, md: 12, lg: 16 } as const;

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLOR.surfaceMuted,
  },
  scroll: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 48,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  logoMark: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    backgroundColor: COLOR.brand,
    alignItems: 'center',

    justifyContent: 'center',
  },
  logoMarkText: {
    fontSize: 16,
    fontFamily: FONT.bold,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  eyebrow: {
    fontSize: 11,
    fontFamily: FONT.bold,
    color: COLOR.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.9,
  },
  appName: {
    fontSize: 24,
    fontFamily: FONT.bold,
    color: COLOR.textPrimary,
    letterSpacing: -0.3,
  },

  tagline: {
    fontSize: 15,
    fontFamily: FONT.regular,
    color: COLOR.textSecondary,
    lineHeight: 24,
    marginBottom: 20,
  },

  statsRow: {
    flexDirection: 'row',
    backgroundColor: COLOR.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 0.5,
    borderColor: COLOR.border,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 18,
    fontFamily: FONT.bold,
    color: COLOR.brand,
    letterSpacing: -0.3,
  },
  statLabel: {
    fontSize: 11,
    fontFamily: FONT.regular,
    color: COLOR.textMuted,
    textAlign: 'center',
    lineHeight: 15,
  },
  statDivider: {
    width: 0.5,
    backgroundColor: COLOR.border,
    marginVertical: 4,
  },

  divider: {
    height: 0.5,
    backgroundColor: COLOR.border,
    marginVertical: 24,
  },

  sectionsBlock: {
    gap: 20,
  },
  infoSection: {
    gap: 8,
  },
  infoSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoIcon: {
    fontSize: 17,
  },
  infoHeading: {
    fontSize: 15,
    fontFamily: FONT.bold,
    color: COLOR.textPrimary,
  },
  infoBody: {
    fontSize: 14,
    fontFamily: FONT.regular,
    color: COLOR.textSecondary,
    lineHeight: 22,
    paddingLeft: 26,
  },

  audienceBlock: {
    gap: 14,
  },
  sectionLabel: {
    fontSize: 11,
    fontFamily: FONT.bold,
    color: COLOR.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.9,
  },
  audienceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  audienceCard: {
    width: '47.5%',
    backgroundColor: COLOR.surface,
    borderRadius: RADIUS.md,
    borderWidth: 0.5,
    borderColor: COLOR.border,
    padding: 14,
    gap: 4,
  },
  audienceIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  audienceLabel: {
    fontSize: 13,
    fontFamily: FONT.bold,
    color: COLOR.textPrimary,
  },
  audienceDesc: {
    fontSize: 12,
    fontFamily: FONT.regular,
    color: COLOR.textMuted,
    lineHeight: 17,
  },

  quoteBlock: {
    flexDirection: 'row',
    marginTop: 28,
    marginBottom: 28,
    gap: 14,
  },
  quoteAccent: {
    width: 3,
    borderRadius: 2,
    backgroundColor: COLOR.brand,
  },
  quoteContent: {
    flex: 1,
    gap: 6,
  },
  quoteText: {
    fontSize: 14,
    fontFamily: FONT.regular,
    fontStyle: 'italic',
    color: COLOR.textSecondary,
    lineHeight: 22,
  },
  quoteAttrib: {
    fontSize: 12,
    fontFamily: FONT.bold,
    color: COLOR.textMuted,
  },

  footer: {
    gap: 8,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    fontFamily: FONT.regular,
    color: COLOR.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },
  footerVersion: {
    fontSize: 11,
    fontFamily: FONT.regular,
    color: COLOR.textMuted,
    opacity: 0.6,
  },
});