import { useQuery } from 'react-query'
import axios from 'axios'

export function useOffres() {
  return useQuery(
    'offres',
    () =>
      axios
        .get(
          `https://data.ademe.fr/data-fair/api/v1/datasets/vertvolt/values_agg?field=nom_offre&size=1&select=nom_offre,niveau_labelisation,statut_offre,nom_fournisseur,Recours_ARENH_fournisseur,clients_offre_labelisee`
        )
        .then((res) =>
          res.data.aggs.map((agg) => ({
            nom_offre: agg.results[0].nom_offre,
            clients_offre_labelisee: agg.results[0].clients_offre_labelisee,
            niveau_labelisation: agg.results[0].niveau_labelisation,
            nom_fournisseur: agg.results[0].nom_fournisseur,
            Recours_ARENH_fournisseur: agg.results[0].Recours_ARENH_fournisseur,
            statut_offre: agg.results[0].statut_offre,
          }))
        )
        .then((res) =>
          res.sort((a, b) =>
            a.niveau_labelisation > b.niveau_labelisation ? -1 : 1
          )
        ),
    {
      keepPreviousData: true,
    }
  )
}
export function useOffre(offre) {
  return useQuery(
    ['offre', offre],
    () =>
      axios
        .get(
          `https://data.ademe.fr/data-fair/api/v1/datasets/vertvolt/lines?nom_offre_in=${encodeURIComponent(
            offre
          )}&size=1000`
        )
        .then(
          (res) => ({
            nom_offre: res.data.results[0].nom_offre,
            clients_offre_labelisee:
              res.data.results[0].clients_offre_labelisee,
            niveau_labelisation: res.data.results[0].niveau_labelisation,
            nom_fournisseur: res.data.results[0].nom_fournisseur,
            Recours_ARENH_fournisseur:
              res.data.results[0].Recours_ARENH_fournisseur,
            statut_offre: res.data.results[0].statut_offre,
            part_gouvernance_partagee_offre:
              res.data.results[0].part_gouvernance_partagee_offre,
            part_sans_soutien_public_offre:
              res.data.results[0].part_sans_soutien_public_offre,
            couverture_demi_horaire_offre:
              res.data.results[0].couverture_demi_horaire_offre,
            part_suivi_consommation_offre:
              res.data.results[0].part_suivi_consommation_offre,
            regions: res.data.results
              .map((regionLine) => ({
                region: regionLine.region,
                technologies: res.data.results
                  .filter(
                    (technoLine) => technoLine.region === regionLine.region
                  )
                  .map((technoLine) => ({
                    technologie: technoLine.technologie,
                    part_offre: technoLine.part_offre,
                    part_gouvernance_partagee:
                      technoLine.part_gouvernance_partagee,
                    part_sans_soutien_public:
                      technoLine.part_sans_soutien_public,
                  })),
              }))
              .reduce(
                (acc, cur) =>
                  acc.find((line) => line.region === cur.region)
                    ? acc
                    : [...acc, cur],
                []
              ),
            technologies: res.data.results
              .map((technoLine) => ({
                technologie: technoLine.technologie,
                regions: res.data.results
                  .filter(
                    (regionLine) =>
                      regionLine.technologie === technoLine.technologie
                  )
                  .map((regionLine) => ({
                    region: regionLine.region,
                    part_offre: regionLine.part_offre || 0,
                    part_gouvernance_partagee:
                      regionLine.part_gouvernance_partagee || 0,
                    part_sans_soutien_public:
                      regionLine.part_sans_soutien_public || 0,
                  })),
              }))
              .reduce(
                (acc, cur) =>
                  acc.find((line) => line.technologie === cur.technologie)
                    ? acc
                    : [...acc, cur],
                []
              ),
          }),
          []
        )
        .then((offre) => ({
          ...offre,
          regions: offre.regions.map((region) => ({
            ...region,
            total_part_offre: region.technologies.reduce(
              (acc, cur) => acc + cur.part_offre || 0,
              0
            ),
            total_part_gouvernance_partagee: region.technologies.reduce(
              (acc, cur) => acc + cur.part_gouvernance_partagee || 0,
              0
            ),
            total_part_sans_soutien_public: region.technologies.reduce(
              (acc, cur) => acc + cur.part_sans_soutien_public || 0,
              0
            ),
          })),
        }))
        .then((offre) => ({
          ...offre,
          technologies: offre.technologies.map((technologie) => ({
            ...technologie,
            total_part_offre: technologie.regions.reduce(
              (acc, cur) => acc + cur.part_offre || 0,
              0
            ),
            total_part_gouvernance_partagee: technologie.regions.reduce(
              (acc, cur) => acc + cur.part_gouvernance_partagee || 0,
              0
            ),
            total_part_sans_soutien_public: technologie.regions.reduce(
              (acc, cur) => acc + cur.part_sans_soutien_public || 0,
              0
            ),
          })),
        }))
        .then((offre) => ({
          ...offre,
          total: {
            part_offre: offre.regions.reduce(
              (acc, cur) =>
                acc +
                cur.technologies.reduce(
                  (acc2, cur2) => acc2 + cur2.part_offre || 0,
                  0
                ),
              0
            ),
            part_gouvernance_partagee: offre.regions.reduce(
              (acc, cur) =>
                acc +
                cur.technologies.reduce(
                  (acc2, cur2) => acc2 + cur2.part_gouvernance_partagee || 0,
                  0
                ),
              0
            ),
            part_sans_soutien_public: offre.regions.reduce(
              (acc, cur) =>
                acc +
                cur.technologies.reduce(
                  (acc2, cur2) => acc2 + cur2.part_sans_soutien_public || 0,
                  0
                ),
              0
            ),
          },
        })),

    {
      keepPreviousData: true,
    }
  )
}
