export default function (technologie) {
  const labels = {
    'Mécanique/Hydraulique et Marine': 'Hydroélectricité et énergies marines',
    'Mécanique/Vent': 'Eolien',
    'Chaleur/Géothermique': 'Géothermie',
    'Chaleur/Solaire': 'Photovoltaïque',
    'Renouvelable/Solide': 'Autre renouvelable',
    'Renouvelable/Solide/Bois/Sous-produits forestiers et déchets':
      'Bois énergie',
    'Solide/Déchets ménagers/Biogène': 'Déchets ménagers',
    'Renouvelable/Gaz': 'Gaz renouvelable',
  }
  return labels[technologie]
}
