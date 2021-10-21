export default function (statut) {
  const labels = {
    'Labélisation sur engagement': `Le fournisseur s'est engagé à respecter les critères du label VertVolt.`,
    'Labélisation après audit': `Le fournisseur a démontré son respect des critères du label VertVolt.`,
    'Labélisation suspendue contrôle en cours': `Les éléments de preuve du fournisseur vis-à-vis du respect des critères du label VertVolt ont été jugés insuffisants.`,
    Déclaratif: `Le fournisseur s'est engagé à respecter les critères du label VertVolt.`,
    'Audit réalisé': `Le fournisseur a démontré son respect des critères du label VertVolt.`,
    'Suspension pour contrôle supplémentaire': `Les éléments de preuve du fournisseur vis-à-vis du respect des critères du label VertVolt ont été jugés insuffisants.`,
  }
  return labels[statut]
}
