export default function (statut) {
  const labels = {
    'Labélisation sur engagement': `Les données présentées sont des données déclarées par le fournisseur, le fournisseur s'engage à respecter ces données mais aucun audit n'a encore eu lieu.`,
    'Labélisation après audit': `Les données présentées sont les données certifiées dans le cadre d'un audit réalisé par un organisme indépendant.`,
    'Labélisation suspendue contrôle en cours': `L'offre a fait l'objet d'un premier audit et certaines informations ont encore besoin d'être investiguées pour en vérifier l'exactitude.`,
  }
  return labels[statut]
}
