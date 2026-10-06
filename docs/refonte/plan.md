# VertVolt : refonte et nouvelle livraison

**Objectifs :**
- servir le widget depuis `vertvolt.incubateur.ademe.fr`, avec des versions figées ;
- garder l'URL actuelle en service, sans intervention de l'ADEME ;
- moderniser le code : sécurité, poids, accessibilité.

Le plan détaillé, pour l'implémentation, est dans [plan-detaille.md](./plan-detaille.md).

## Décisions

- **Domaine :** `vertvolt.incubateur.ademe.fr`
- **Hébergement :**
  - les versions sont stockées sur Scaleway Object Storage ;
  - un petit serveur nginx en Docker, déployé par Coolify sur Scaleway, les sert.
- **Nommage des fichiers :**
  - `vertvolt.js` = la dernière version ;
  - `vertvolt.1.2.3.js` = une version figée (pas de `v`, pas de sous-dossier, pas d'alias de version majeure).
- **URL actuelle** `vertvolt.netlify.app/vertvolt.js` : conservée, dépréciée. Elle relaie la dernière version.
- **Fonctionnel :**
  - la pagination est supprimée ;
  - chaque offre a un vrai lien partageable.
- **Technique :**
  - Node 26 ;
  - branches `main` + `feat/`, `fix/`, `chore/`, `docs/`.

## Comment fonctionne la livraison

| URL | Contenu | Cache |
|---|---|---|
| `…/vertvolt.js` | dernière version stable | 5 min |
| `…/vertvolt.1.2.3.js` | version figée, jamais modifiée (intégrité vérifiable par SRI) | 1 an |
| `…/versions.json` | liste des versions et de leurs empreintes | 1 min |
| `…/` | page vitrine : doc d'intégration, versions, aperçu de chaque version | |
| `vertvolt.netlify.app/vertvolt.js` | relaie `vertvolt.js` (déprécié) | 5 min |

- **Publier une version :** pousser un tag `vX.Y.Z`. La CI publie après une validation manuelle.
- **Revenir en arrière :** relancer la promotion d'une version précédente, actif en 5 à 10 minutes.

## Étapes

| # | Étape | Résultat |
|---|---|---|
| 0 | Infra : Scaleway, DNS, Coolify, réglages GitHub | prérequis |
| 1 | Livraison S3 : serveur, page vitrine, CI de publication | **v1.0.0** = la prod actuelle, archivée |
| 2 | Bascule de l'URL Netlify en relais | l'ADEME est servie depuis S3, sans changement visible |
| 3 | Suppression des 5 scripts tiers (unpkg, jsdelivr, cdnjs) chargés à chaque affichage | **v1.0.1** |
| 4 | Refonte : Vite, Preact, TypeScript 7, Biome, ESLint, pnpm | **v2.0.0-rc** |
| 5 | Passe d'accessibilité RGAA | **v2.0.0** |
| 6 | Sécurité continue : Dependabot, audit des dépendances | en continu |

## Ce que la refonte corrige

- **Sécurité :**
  - plus aucun code tiers exécuté sur la page ADEME (seule l'API data.ademe.fr est appelée) ;
  - compatible avec une CSP stricte.
- **Poids :** environ 50 Ko visés au lieu de 192 Ko compressés, avec des logos chargés une seule fois au lieu de 75 Ko par carte.
- **Bugs visibles aujourd'hui :**
  - noms de technologies vides dans le détail des offres ;
  - Île-de-France et PACA jamais affichées sur la carte ;
  - pourcentage affiché « 79.17999999999999 % » ;
  - bornes de pagination fausses ;
  - liens d'offres cassés (`/#Nom avec espaces`).
- **Infobulles :** une seule, au lieu d'environ 45 empilées au même endroit.
- **ARENH :** les dernières mentions sont retirées (dispositif terminé fin 2025).
- **Accessibilité :**
  - champs étiquetés ;
  - titres dans l'ordre ;
  - navigation au clavier ;
  - contrastes ;
  - infobulles accessibles.

## Ce qui ne change pas

- La balise `<vertvolt-component>` et l'URL utilisées par la page ADEME.
- Les données (data.ademe.fr) et les fonctionnalités : recherche, filtres, détail, carte.

## Tests (minimalistes)

- **Un test unitaire** sur la préparation des données.
- **Un test de bout en bout**, avec une API simulée, sur Chrome, Firefox et Safari (moteur WebKit). Il vérifie aussi :
  - qu'aucune requête ne part ailleurs que vers l'API ;
  - le respect d'une CSP stricte ;
  - l'accessibilité automatique (axe).

## Risques et parades

| Risque | Parade |
|---|---|
| Suppression du site Netlify : le nom `vertvolt.netlify.app` pourrait être repris par un tiers | ne jamais le supprimer, il reste en relais |
| Différence visuelle sur la page ADEME | chaque rc est testée sur la vraie page avant publication |
| Panne du stockage | cache du serveur, retour arrière en quelques minutes |
| Changement de format des données | libellés normalisés, valeur brute affichée en secours |

## Points ouverts

1. Qui gère le DNS de `incubateur.ademe.fr` ?
2. La taille de police de base de la page ADEME, pour garantir un rendu identique.
3. Le contraste du badge « Engagé » (blanc sur jaune) : peut-on changer la couleur ?
4. Certaines valeurs du jeu de données dépassent 100 % : faut-il le signaler à l'équipe data ?
