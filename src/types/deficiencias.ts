export const TIPOS_DEFICIENCIA = [
  { label: 'Nenhuma', value: 'nenhuma' },
  { label: 'Visual', value: 'visual' },
  { label: 'Motora', value: 'motora' },
  { label: 'Auditiva', value: 'auditiva' },
  { label: 'Múltipla', value: 'multipla' },
  { label: 'Outra', value: 'outra' },
] as const;

export type TipoDeficiencia = typeof TIPOS_DEFICIENCIA[number]['value'];