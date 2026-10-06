# VertVolt : plan détaillé de refonte et de livraison

Version de travail pour l'implémentation. La version courte, à présenter, est dans [plan.md](./plan.md).

Plan validé le 6 octobre 2026. Rien n'est encore implémenté.

---

## 0. Cadre

### Décisions actées

| Sujet | Décision |
|---|---|
| Domaine | `vertvolt.incubateur.ademe.fr` |
| Stockage des versions | Scaleway Object Storage, région `fr-par` |
| Hébergement du front | conteneur Docker (nginx) sur Scaleway, déployé par Coolify |
| Nommage | `vertvolt.X.Y.Z.js` (sans `v`), pré-versions `vertvolt.X.Y.Z-rc.N.js`, pas d'alias de version majeure |
| Dernière version | `vertvolt.js` sur le domaine. `vertvolt.netlify.app/vertvolt.js` reste servie en proxy, dépréciée |
| Pagination | supprimée, toutes les offres sont affichées |
| Offres | vrais liens directs, partageables |
| Node | 26 |
| Git | `main` (déjà en place sur GitHub). Branches `feat/`, `fix/`, `chore/`, `docs/`. Merge en squash, titres de PR au format Conventional Commits |
| Intégration ADEME | on n'y touche pas |

### Contrat à préserver avec la page ADEME

- **Le script :**
  - `<script src="https://vertvolt.netlify.app/vertvolt.js">` est un script classique : pas de `type="module"`, pas de `defer` ;
  - il est placé avant la balise ;
  - il est ouvert et fermé dans deux blocs Drupal différents.
- **La balise :** `<vertvolt-component></vertvolt-component>`, sans attribut.

Conséquence : le bundle reste **un seul fichier IIFE**. Il enregistre lui-même l'élément, n'a besoin de rien d'autre au chargement et n'expose aucune variable globale.

### Constats relevés pendant la préparation

| # | Constat | Preuve |
|---|---|---|
| 1 | **Libellés de technologies vides en prod.** Le dataset écrit `Chaleur / Géothermique`, le code attend `Chaleur/Géothermique` (`utils/setLabelTechnologie.js`). Une valeur a en plus un espacement incohérent : `Renouvelable /Solide / Bois / …` | Bundle de prod dans Chromium : les lignes affichent « 38,3 % » sans libellé |
| 2 | **Deux régions jamais colorées ni cliquables sur la carte.** Le dataset écrit `Île-de-France` et `Provence-Alpes-Côte d'Azur` (apostrophe droite). `Map.js` écrit `Ile-de-France` et `Côte d’Azur` (apostrophe typographique) | Code et valeurs de l'API |
| 3 | **Pourcentage mal formaté.** « Taux moyen de couverture demi-horaire » calcule `x * 100` sans formatage, ce qui donne `79.17999999999999 %` pour 0,7918 | Calcul vérifié avec Node |
| 4 | **Troncature silencieuse possible.** `values_agg` est appelé sans `agg_size`, donc avec la valeur par défaut de data-fair. Au-delà, des offres disparaîtraient sans erreur | `agg_size=5` renvoie bien 5 offres |
| 5 | `nom_offre_in` découpe la valeur sur les virgules : un nom d'offre contenant une virgule casserait le détail. `nom_offre_eq` existe | Testé sur l'API |
| 6 | Le nom de l'offre elmy contient un retour à la ligne (`\r\n`). Il faut le normaliser pour l'affichage et le slug | API |
| 7 | `Recours_ARENH_fournisseur` est encore demandé à l'API et affiché (`misc/Fournisseur.js`). Les seules valeurs sont « Avec ARENH » et « Oui » | API |
| 8 | Certaines lignes ont `part_sans_soutien_public` > 1 (jusqu'à 6,47, soit « 647 % » affiché) | API, question pour l'équipe data |
| 9 | Contraste du badge « Engagé » : texte blanc sur `#ECC505`, environ 1,7:1. Le RGAA exige 4,5:1 | Calcul |
| 10 | `url_offre` existe dans le dataset mais n'est pas utilisée | API, idée hors périmètre |

Le dataset compte 1 352 lignes, 13 offres et 11 fournisseurs. Dernière mise à jour : 9 avril 2026.

---

## 1. Architecture de livraison

```
Page ADEME ── <script src> ──► vertvolt.netlify.app/vertvolt.js     (legacy, proxy 200, déprécié)
                                        │
Autres intégrateurs ─────────► vertvolt.incubateur.ademe.fr        (Coolify : TLS → conteneur nginx)
                                        │  proxy_pass, liste blanche de noms
                                        ▼
                         Scaleway Object Storage : bucket vertvolt-releases (fr-par)
                                        ▲
GitHub Actions (tag vX.Y.Z, environnement production) ── PutObject (clé IAM dédiée à la CI)
```

### Contenu du bucket (sans sous-dossier)

| Objet | Écrit par | Modifiable | `Cache-Control` (posé par nginx) |
|---|---|---|---|
| `vertvolt.X.Y.Z.js` | release | non (contrôle CI + Object Lock) | `public, max-age=31536000, immutable` |
| `vertvolt.X.Y.Z-rc.N.js` | release | non | idem |
| `vertvolt.js` | release (stable) ou promote | oui | `public, max-age=300, stale-while-revalidate=86400, stale-if-error=604800` |
| `versions.json` | release ou promote | oui | `public, max-age=60` |
| (fichier absent) | | | réponse 404, `no-store` |

### `versions.json`

```json
{
  "latest": "1.0.1",
  "versions": [
    {
      "version": "1.0.1",
      "file": "vertvolt.1.0.1.js",
      "integrity": "sha384-…",
      "size": 612345,
      "date": "2026-10-…T…Z",
      "commit": "abc1234",
      "prerelease": false
    }
  ]
}
```

### Règles

- **Immuabilité :** un fichier versionné n'est jamais réécrit.
- **Contenu de `vertvolt.js` :** une copie à l'identique de la dernière version stable, jamais d'une pré-version.
- **Ordre d'écriture :** fichier versionné, puis `vertvolt.js`, puis `versions.json`. Le manifeste ne pointe ainsi jamais vers un fichier absent.
- **Rollback :** un `promote` d'une version antérieure. La propagation prend 5 à 10 minutes à cause des caches.

---

## 2. Infra : checklist à faire de ton côté (hors repo)

### Scaleway

- [ ] Un projet dédié `vertvolt`. Les droits IAM s'appliquent au niveau du projet, ce qui les isole.
- [ ] **Bucket :** `vertvolt-releases` (nom à confirmer, les noms sont globaux), en `fr-par`.
  - Object Lock doit être activé **à la création** : on ne peut plus l'activer ensuite. Il active aussi le versioning.
- [ ] **Bucket policy :**
  - lecture anonyme (`s3:GetObject`) sur `vertvolt-releases/*` ;
  - pas de `s3:ListBucket` anonyme ;
  - ⚠️ chez Scaleway, une bucket policy qui oublie tes propres identités te coupe l'accès. Inclure le compte admin et l'application CI.
- [ ] Une règle de cycle de vie : supprimer les anciennes versions de `vertvolt.js` et `versions.json` après 90 jours.
- [ ] **Application IAM `vertvolt-ci` :**
  - une politique sur le projet avec lecture et écriture d'objets et lecture des buckets, **sans droit de suppression** (noms exacts des permissions à vérifier dans la console) ;
  - sa clé API va dans les secrets GitHub, environnement `production`.

### DNS

- [ ] Faire pointer `vertvolt.incubateur.ademe.fr` vers le serveur Coolify (A/AAAA ou CNAME).

### Coolify

- [ ] **Application de type Dockerfile :**
  - dépôt `incubateur-ademe/vertvolt`, branche `main` ;
  - répertoire de base `/front`, port 8080.
- [ ] **Domaine :** `https://vertvolt.incubateur.ademe.fr`, certificat TLS Let's Encrypt via le proxy Coolify.
- [ ] **Healthcheck :** `GET /healthz`.
- [ ] **Watch paths :** `front/**`, pour ne pas redéployer à chaque commit du widget.
- [ ] **Variables :** `S3_HOST=vertvolt-releases.s3.fr-par.scw.cloud` et `RESOLVER=127.0.0.11` (DNS interne de Docker).
- [ ] **Options Docker, si Coolify les accepte :** `--read-only --tmpfs /tmp --tmpfs /var/cache/nginx --cap-drop ALL`.

### GitHub

- [ ] **Règles sur `main` :** PR obligatoire, check `ci` requis, squash uniquement, pas de force-push.
- [ ] **Règles sur les tags `v*` :** création réservée aux mainteneurs, pas de suppression ni de déplacement.
- [ ] **Environnement `production` :**
  - relecteur obligatoire (toi), limité aux tags `v*` ;
  - secrets `SCW_ACCESS_KEY` et `SCW_SECRET_KEY` ;
  - variables `S3_BUCKET`, `S3_ENDPOINT=https://s3.fr-par.scw.cloud`, `S3_REGION=fr-par`.
- [ ] **Réglages Actions :** `GITHUB_TOKEN` en lecture seule par défaut, et les Actions ne peuvent ni créer ni approuver de PR.
- [ ] **Sécurité du dépôt :**
  - alertes et mises à jour de sécurité Dependabot ;
  - détection de secrets, avec blocage au push.
- [ ] La branche `martinregner-typo` est déjà intégrée à `main` : on peut la supprimer.

### Netlify

- [ ] **Après le merge de `chore/netlify-proxy` :**
  - répertoire de base `netlify`, commande de build vide ;
  - deploy previews et branch deploys désactivés.
- [ ] ⚠️ **Ne jamais supprimer le site `vertvolt`.** Le sous-domaine `vertvolt.netlify.app` redeviendrait libre, et n'importe qui pourrait servir son propre JS sur la page ADEME.

---

## 3. Phase 1 : livraison S3, sans toucher au code du widget

### PR `feat/livraison-s3`

```
front/
  Dockerfile
  nginx/default.conf.template
  nginx/snippets/security-headers.conf
  nginx/snippets/proxy-s3.conf
  site/index.html  site/preview.html  site/app.js  site/preview.js  site/style.css
scripts/release/
  publish.sh        # publie une version, met à jour vertvolt.js et versions.json
  promote.sh        # repointe vertvolt.js (promotion ou rollback)
.github/workflows/
  ci.yml            # build legacy (Node 16, yarn), build de l'image front, nginx -t
  release.yml       # tag vX.Y.Z → build → publish (environnement production) → GitHub Release
  promote.yml       # lancement manuel avec une version → promote.sh
```

**Dockerfile**
- Image de base : `nginxinc/nginx-unprivileged:<stable>-alpine`, épinglée par digest. Elle tourne sans root, avec l'utilisateur 101.
- Les templates sont rendus par l'entrypoint officiel. `NGINX_ENVSUBST_FILTER` limite la substitution à `S3_HOST` et `RESOLVER`.
- `EXPOSE 8080`, `HEALTHCHECK` sur `/healthz`.

**nginx : comportement attendu**
- **Méthodes et serveur :**
  - seuls `GET` et `HEAD` sont acceptés, les autres reçoivent 405 ;
  - `server_tokens off`, pas d'`autoindex`.
- **Routes :**
  - `= /healthz` répond 200 ;
  - `~ ^/vertvolt\.\d+\.\d+\.\d+(-[0-9A-Za-z.]+)?\.js$` : proxy vers S3, cache d'un an, `immutable` ;
  - `= /vertvolt.js` : proxy vers S3, cache de 5 min avec `stale-while-revalidate` et `stale-if-error` ;
  - `= /versions.json` : proxy vers S3, cache de 60 s ;
  - **tout autre chemin** est servi depuis `site/` ou reçoit un 404 : aucun autre chemin n'atteint le bucket.
- **Proxy vers S3 :**
  - `resolver ${RESOLVER}`, `proxy_pass https://${S3_HOST}$uri`, SNI et vérification du certificat TLS, en-tête `Host` égal au bucket ;
  - les en-têtes `x-amz-*`, `Set-Cookie` et `Cache-Control` venant de S3 sont masqués ;
  - un 403 ou 404 de S3 devient un 404 `no-store`.
- **Micro-cache nginx :** `proxy_cache` sur tmpfs avec `proxy_cache_use_stale error timeout updating`. Il réduit le trafic sortant S3 et maintient le service si le bucket a un raté.
- **En-têtes sur les fichiers JS et JSON :**
  - `Access-Control-Allow-Origin: *`, nécessaire pour SRI avec `crossorigin` ;
  - `Cross-Origin-Resource-Policy: cross-origin` ;
  - `X-Content-Type-Options: nosniff` ;
  - `Content-Type: application/javascript; charset=utf-8`, forcé.
- **En-têtes communs :** `Strict-Transport-Security: max-age=63072000` et `Referrer-Policy: strict-origin-when-cross-origin`.
- **CSP stricte sur les pages, sans script inline :** `default-src 'self'; connect-src 'self' https://data.ademe.fr; img-src 'self' data:; frame-ancestors 'self'; base-uri 'none'; form-action 'none'`.
- ⚠️ Un `add_header` placé dans un bloc `location` annule ceux du bloc `server`. Il faut donc inclure les en-têtes avec `include` dans chaque bloc.

**Page vitrine** (`site/` : HTML, JS et CSS statiques, sans build)
- Présentation du widget et lien vers data.ademe.fr.
- **Extraits d'intégration**, avec un bouton copier :
  - « dernière version », qui pointe sur `vertvolt.js` ;
  - « version figée », qui pointe sur `vertvolt.X.Y.Z.js` avec `integrity` et `crossorigin="anonymous"`.
- **Tableau des versions**, lu depuis `versions.json` : date, taille, SRI, commit.
- **Prérequis CSP** pour l'intégrateur : `script-src https://vertvolt.incubateur.ademe.fr; connect-src https://data.ademe.fr; img-src data:`.
- **Aperçu :** un sélecteur de version ouvre `<iframe src="preview.html?v=X.Y.Z">`.
  - L'iframe est nécessaire car un custom element ne peut être défini qu'une fois par document.
  - `preview.js` vérifie `v` avec la même regex que nginx avant d'injecter le script.

**`publish.sh <version> <fichier>`** (bash, avec `aws` CLI déjà présente sur les runners, `jq` et `openssl`)
1. Valide le format semver, et vérifie que tag, `v$version` et version de `package.json` concordent.
2. Refuse si `vertvolt.$version.js` existe déjà (`head-object`).
3. Calcule le hash SRI (`sha384`) et la taille.
4. **Envoie `vertvolt.$version.js` avec :**
   - `Content-Type` et `Cache-Control` ;
   - une rétention Object Lock en mode GOVERNANCE de 5 ans ;
   - un `Content-MD5`, qu'Object Lock exige.
5. Si la version est stable, copie le fichier vers `vertvolt.js`, côté serveur.
6. Met à jour `versions.json` (lu, ou créé s'il n'existe pas). `latest` ne change que pour une version stable.
7. Écrit le SRI et les URL dans le résumé du job.
- Variables à définir : `AWS_REQUEST_CHECKSUM_CALCULATION=when_required` et `AWS_RESPONSE_CHECKSUM_VALIDATION=when_required`. Les versions récentes de la CLI AWS ajoutent des checksums que les S3 compatibles refusent parfois.

**`promote.sh <version>`**
- Vérifie que la version existe et refuse une pré-version.
- Copie le fichier vers `vertvolt.js` et met à jour `latest` dans `versions.json`.

**Règles communes aux workflows**
- **Actions :** épinglées par SHA, avec `persist-credentials: false` au checkout.
- **Permissions :** `permissions: contents: read` par défaut.
- **Concurrence :** `concurrency: s3-release`, sans annulation, sur release et promote.
- **`release.yml`**, trois jobs :
  - `build`, sans secret, qui produit l'artefact `vertvolt.js` ;
  - `publish`, dans l'environnement `production`, avec les secrets ;
  - `github-release`, seul job avec `contents: write`. Il crée la release avec le fichier et le SRI, marquée `prerelease` si la version contient un `-`.
- **Build legacy :** `actions/setup-node` avec `.nvmrc` (16.20.2), puis `yarn install --frozen-lockfile` et `yarn build`. Le résultat est `build/vertvolt.js`.
- Chaque tag utilise le workflow présent dans son propre commit : les tags 1.0.x gardent donc le build legacy, les 2.x le nouveau build.

**Critères d'acceptation**
- `curl -I` sur `/vertvolt.1.0.0.js`, `/vertvolt.js` et `/versions.json` donne les codes, `Cache-Control`, CORS et `Content-Type` attendus.
- `/vertvolt.9.9.9.js` renvoie 404 `no-store`, `/autre-chose` renvoie 404 et un `POST` renvoie 405.
- `vertvolt.1.0.0.js` ne diffère du fichier Netlify actuel que par le chemin de build.
- Republier `1.0.0` échoue proprement.
- L'aperçu de la 1.0.0 fonctionne sur la page vitrine.

**Séquence**
1. Infra prête (section 2).
2. Merge de `feat/livraison-s3`. Coolify déploie le front.
3. Tag `v1.0.0` sur `main`, approbation de l'environnement, publication.
4. Vérifications ci-dessus.

### PR `chore/netlify-proxy` : bascule de l'URL legacy

```
netlify/
  netlify.toml
  public/index.html   # page minimale avec un lien vers le nouveau domaine
```

- `/vertvolt.js` est relayé en **200 (proxy)** vers `https://vertvolt.incubateur.ademe.fr/vertvolt.js`, avec `force = true`.
- `/*` redirige en 301 vers le nouveau domaine.
- **En-têtes sur `/vertvolt.js` :** `Deprecation: true` et `Link: <https://vertvolt.incubateur.ademe.fr/vertvolt.js>; rel="successor-version"`.
- `ignore` : Netlify ne reconstruit que si `netlify/` change.
- **À vérifier après la bascule :**
  - Netlify transmet bien le `Cache-Control` de l'origine ;
  - Netlify applique ses `[[headers]]` à une réponse relayée. Sinon on s'en passe.
- **Critère :** la page ADEME affiche le widget, désormais servi depuis S3 en 1.0.0 (identique à aujourd'hui).
- **Rollback :** revert de la PR.

### PR `fix/cdn-tiers` : version 1.0.1

- `direflow-config.json` :
  - `"modules": { "react": false, "reactDOM": false }` ;
  - `"polyfills": { "sd": false, "ce": false, "adapter": false }`.
- Suppression du `console.log` dans `src/index.js`.
- `package.json` passe en `1.0.1`.
- **Validation avant merge :**
  - tag `v1.0.1-rc.1` sur la branche ;
  - test de `preview.html?v=1.0.1-rc.1` sur **Firefox et Safari** (Chromium est déjà validé) ;
  - une seule requête externe attendue, vers `data.ademe.fr`.
- **Après le merge :** tag `v1.0.1`. `vertvolt.js`, donc la page ADEME, passe en 1.0.1.

---

## 4. Phase 2 : refonte (`feat/refonte-preact`, donnera la 2.0.0)

### Outillage (versions npm vérifiées le 6 octobre 2026)

| Outil | Version | Rôle |
|---|---|---|
| Node | 26.x (`.nvmrc`, `engines`, CI) | build |
| pnpm | 12.x (`packageManager`) | gestion des paquets |
| Vite | 8.x | build en mode bibliothèque |
| Preact | 11.x | UI |
| TypeScript | 7.x | vérification des types (`tsc --noEmit`) |
| Biome | 2.x | formatage et lint, y compris les règles d'accessibilité JSX |
| ESLint et typescript-eslint | 10.x / 8.x | uniquement les règles qui utilisent les types |
| TypeScript 6 | 6.0.x | uniquement pour typescript-eslint, qui exige `typescript <6.1.0` |
| Vitest | 5.x | un test unitaire |
| Playwright | 1.6x | un test e2e |

**Points de vigilance**
- Node 25 et suivants ne fournissent plus Corepack. pnpm s'installe avec `pnpm/action-setup` en CI, et en version autonome en local.
- **TS 7 et TS 6 portent le même nom de paquet `typescript`**, avec le même binaire `tsc`.
  - ESLint est donc isolé dans un paquet de workspace `tooling/eslint`, qui dépend de `typescript@~6.0`.
  - La racine dépend de `typescript@^7`.
  - À vérifier avec `pnpm why typescript`.
- Le `tsconfig` doit rester compatible avec TS 6 et TS 7 : aucune option supprimée par TS 7.
  - Options : `strict`, `noUncheckedIndexedAccess`, `verbatimModuleSyntax`.
  - Modules et JSX : `module: preserve`, `moduleResolution: bundler`, `jsx: react-jsx`, `jsxImportSource: preact`.
- **Réglages de sécurité pnpm** dans `pnpm-workspace.yaml` (noms exacts à vérifier pour pnpm 12) :
  - un délai minimum avant d'adopter une version fraîchement publiée ;
  - une liste blanche des paquets autorisés à lancer des scripts de build.

### Ce qui part

- **Dépendances :**
  - `direflow-*`, `react-scripts`, `react`, `react-dom`, `react-app-rewired` ;
  - `react-query`, `axios`, `styled-components`, `react-tooltip` ;
  - `to-string-loader`, `webpack-cli`, les anciens plugins ESLint, `jest-environment-jsdom-fourteen`, `react-test-renderer`.
- **Fichiers :**
  - `yarn.lock`, `direflow-config.json`, `direflow-webpack.js`, `.eslintrc` ;
  - `src/component-exports.js` ;
  - `public/` (la copie d'une page ADEME) ;
  - les logos `*SansRaeh.js`.
- Fuse.js reste, en version 7.

### Arborescence cible

```
src/
  main.tsx               # définit <vertvolt-component> (sauf si déjà défini), shadow DOM, styles
  app.tsx                # chargement des données, filtres, vue (liste ou détail)
  api.ts                 # fetch et transformations pures (toOffres, toOffreDetail)
  api.test.ts            # le test unitaire
  types.ts               # types du dataset et du modèle
  labels.ts              # libellés (technologies, statuts) et normalizeKey
  route.ts               # liens directs : slug, lecture et écriture du hash
  format.ts              # formatPercent
  components/
    search.tsx  offre-list.tsx  offre-card.tsx  offre-detail.tsx
    origine.tsx  additionnalite.tsx  details.tsx  repartition-table.tsx
    carte.tsx  fournisseur.tsx  badge.tsx  logo.tsx  tooltip.tsx
  assets/
    logo-engage.svg  logo-tres-engage.svg   # optimisés avec SVGO
    carte-regions.ts                        # tracés des régions, précision réduite
  styles/widget.css      # importé avec ?inline
index.html               # page de développement (vite dev)
e2e/
  widget.spec.ts
  fixtures/page.html  fixtures/values_agg.json  fixtures/lines-*.json
tooling/eslint/
  package.json  eslint.config.js
scripts/
  size.mjs               # budget de taille (gzip et brotli)
  fixtures.sh            # recapture des fixtures depuis l'API réelle
```

### Choix techniques

- **Élément :** une petite classe `HTMLElement` maison (une vingtaine de lignes) plutôt que `preact-custom-element`.
  - Shadow DOM `open`, styles via `adoptedStyleSheets`.
  - Rendu Preact dans `connectedCallback`, démontage dans `disconnectedCallback`.
  - Test `customElements.get()` avant `define`. Charger à la fois l'URL legacy et la nouvelle ne provoque alors pas d'erreur.
- **Build :**
  - `build.lib` au format `iife` ;
  - une entrée sans export, donc aucune variable globale ;
  - le CSS embarqué avec `?inline` ;
  - la cible par défaut de Vite (fonctionnalités Baseline « widely available ») ;
  - une bannière `/*! vertvolt X.Y.Z | MIT */` pour identifier la version en prod ;
  - la sourcemap, uniquement jointe à la GitHub Release.
- **Styles :**
  - un seul `widget.css`, avec les couleurs du thème en propriétés CSS sur `:host` ;
  - `font-family` héritée de la page.
  - ⚠️ Le CSS actuel est en `rem` et dépend donc de la taille de police racine de la page ADEME. Il faut la mesurer et convertir les unités pour un rendu identique.
- **Données (`api.ts`) :**
  - **Liste :** `values_agg?field=nom_offre;nom_fournisseur&size=1&agg_size=100&select=nom_offre,niveau_labelisation,statut_offre,nom_fournisseur,clients_offre_labelisee`.
  - **Détail :** `lines?nom_offre_eq=…&nom_fournisseur_eq=…&size=1000`.
  - **Appels :** `fetch` avec `AbortController` ; états chargement, erreur et vide affichés ; un simple cache en mémoire pour la session.
  - **Transformations pures :**
    - protection quand il n'y a aucun résultat ;
    - sommes en `acc + (x ?? 0)` ;
    - regroupements avec `Map` ;
    - tri stable : niveau, puis nom.
- **Normalisation :**
  - `normalizeKey` retire les accents, les espaces autour des `/`, unifie les apostrophes et la casse ;
  - elle sert aux libellés de technologies et aux régions de la carte ;
  - si un libellé est inconnu, la valeur brute est affichée : plus jamais de cellule vide.
- **Pourcentages :** un seul `formatPercent`, basé sur `Intl.NumberFormat('fr-FR', { style: 'percent', maximumFractionDigits: 2 })`, utilisé partout.
- **Liens directs :**
  - `href="#vertvolt-<slug>"`, où le slug est le nom de l'offre normalisé, suivi du fournisseur en cas de doublon ;
  - **navigation :**
    - l'événement `hashchange` pilote la vue ;
    - arriver directement sur un lien ouvre le détail ;
    - le retour passe par le lien `#vertvolt` ou par le bouton Précédent du navigateur ;
  - **focus :** il va sur le titre du détail à l'ouverture, puis revient sur le lien d'origine au retour.
- **Infobulles :**
  - un seul composant, avec une seule bulle visuelle partagée ;
  - le déclencheur est un `<button>`, et le texte existe aussi en description accessible (visuellement masquée) ;
  - ouverture au survol, au focus et au clic, fermeture avec `Échap` ;
  - contenu en texte, jamais en HTML (`white-space: pre-line` pour les retours à la ligne).
- **Logos :** SVG optimisés avec SVGO, embarqués une seule fois en data URI, affichés avec `<img alt="Label VertVolt : offre très engagée">`.
- **Carte :** purement visuelle (`aria-hidden`). La même interaction est disponible au clavier via les tableaux.
- **ARENH :** supprimé de l'API, des types, de l'interface et des logos.
- **Pagination :** supprimée.

### Ordre des commits dans la PR

1. pnpm, Node 26 et Playwright, puis le test e2e et ses fixtures, lancé contre `vertvolt.1.0.1.js` publié (sous-ensemble `@smoke`, 3 moteurs).
2. Vite, TypeScript, Biome, ESLint et la CI, sur un composant minimal.
3. `api.ts`, les types et le test unitaire.
4. Les composants : liste, recherche, détail, carte, infobulle.
5. Les corrections : liens, libellés, formatage, ARENH.
6. La suppression du legacy et le README.
7. Passage en `2.0.0-rc.1`, tag rc, aperçu.

### CI (`ci.yml`, remplace la version legacy)

`pnpm install --frozen-lockfile`, puis :
1. `biome ci`, `eslint` (workspace), `tsc --noEmit` ;
2. `vitest run`, `vite build`, contrôle du budget de taille ;
3. Playwright (chromium, firefox, webkit) ;
4. `pnpm audit --audit-level high`.

Le job `front` ne change pas.

### Critères d'acceptation

- Le test e2e passe sur les 3 moteurs : aucune requête hors `data.ademe.fr`, aucune violation de CSP.
- **Parité visuelle** validée par toi sur la vraie page ADEME avec la rc.
  - Le script est remplacé via les « Overrides » des DevTools de Chrome, sans toucher à la page.
- Le budget de taille est respecté. Il sera fixé à la fin de la refonte, avec une cible d'environ 50 Ko gzippés contre 192 aujourd'hui.
- Les libellés de technologies et les régions Île-de-France et PACA sont corrects, et les pourcentages bien formatés.

---

## 5. Phase 3 : RGAA (`feat/rgaa`, donnera la 2.0.0)

La refonte est écrite accessible dès le départ. Cette passe vérifie et corrige ce qui reste.

Ce n'est pas un audit de conformité officiel : celui-ci revient à un auditeur, et la déclaration d'accessibilité est portée par le site ADEME.

| Thème RGAA | Points |
|---|---|
| 1. Images | logos avec `alt`, carte en `aria-hidden`, icônes décoratives masquées |
| 3. Couleurs | contraste du badge « Engagé » (texte foncé sur jaune, **à valider avec l'ADEME** car c'est l'identité du label) ; aucune information portée seulement par la couleur |
| 7. Scripts | infobulles, tableaux dépliables (`<button aria-expanded>`), changement de vue annoncé, gestion du focus |
| 9. Structure | titres sans saut de niveau (offre en `h3`, sections en `h4`), liste d'offres en `<ul>` |
| 10. Présentation | focus visible, zoom à 200 %, affichage sur 320 px de large, `prefers-reduced-motion` |
| 11. Formulaires | `<label>` sur la recherche et les listes, `role="search"`, nombre de résultats annoncé (`aria-live`) |
| 13. Consultation | contenu au survol masquable (`Échap`), survolable et persistant |

- **Outils :**
  - axe dans le test e2e, sans aucune violation `serious` ou `critical` ;
  - test manuel avec NVDA sur Firefox et VoiceOver sur Safari ;
  - navigation complète au clavier.
- **Livrable :** `docs/rgaa.md`, avec les critères vérifiés, les résultats et les réserves.
- **Fin de phase :** version `2.0.0`, promue sur `vertvolt.js`, donc visible sur la page ADEME.

---

## 6. Tests (minimalistes)

### `src/api.test.ts` (Vitest, environnement node)
- **`toOffres` :** résultat vide, tri.
- **`toOffreDetail` :**
  - totaux sans `NaN` quand une part manque ;
  - regroupements ;
  - normalisation : `Chaleur / Géothermique` donne « Géothermie », `Île-de-France` est bien reconnue.

### `e2e/widget.spec.ts` (Playwright)
- **Mise en place :**
  - la page de test est servie par `page.route`, sans serveur, avec une CSP stricte en en-tête ;
  - les réponses de `data.ademe.fr` viennent des fixtures ;
  - toute autre requête est bloquée et fait échouer le test.
- **Scénario :**
  1. les offres s'affichent ;
  2. recherche « ultra », puis filtre par fournisseur ;
  3. ouverture d'une offre : hash, titre, libellés de technologies non vides ;
  4. rechargement de la page sur le lien direct ;
  5. retour à la liste ;
  6. analyse axe.
- **Options :**
  - `WIDGET_URL` permet de tester un fichier publié (par exemple la 1.0.1) au lieu du build local ;
  - le tag `@smoke` marque les étapes que la version legacy sait passer.

### Fixtures
Capturées une fois depuis l'API réelle (`scripts/fixtures.sh`) et versionnées dans le dépôt.

---

## 7. Sécurité continue (PR `chore/securite-ci`)

- **`dependabot.yml` :**
  - pour npm (pnpm), les GitHub Actions et Docker (`front/`) ;
  - mises à jour hebdomadaires et groupées ;
  - un délai de 7 jours avant d'adopter une nouvelle version (`cooldown`).
- `pnpm audit` tourne déjà dans `ci.yml`.
- **En option :** `zizmor`, un audit de sécurité des workflows.

---

## 8. Bascule et sortie de Netlify

- **Mise en ligne :** promouvoir la 2.0.0 met à jour `vertvolt.js`, que l'URL Netlify suit en 5 à 10 minutes.
- **Rollback :** `promote` vers la 1.0.1.
- **Côté ADEME :** quand ils pourront modifier leur page, leur proposer le nouvel extrait (`vertvolt.incubateur.ademe.fr/vertvolt.js`, idéalement avec `defer`).
- **Netlify :** le site est conservé indéfiniment en proxy, sans build, pour un coût nul.
- **Supervision :** une sonde de disponibilité sur les deux URL (outil au choix).

---

## 9. Récapitulatif des PR

| # | Branche | Contenu | Version |
|---|---|---|---|
| 1 | `docs/plan-refonte` | ce plan | n/a |
| 2 | `feat/livraison-s3` | front, scripts de release, workflows | tag `v1.0.0` |
| 3 | `chore/netlify-proxy` | proxy legacy | bascule |
| 4 | `fix/cdn-tiers` | suppression des scripts tiers | `v1.0.1-rc.1`, puis `v1.0.1` |
| 5 | `feat/refonte-preact` | nouvelle stack, réécriture, corrections, tests | `v2.0.0-rc.N` |
| 6 | `feat/rgaa` | passe RGAA, `docs/rgaa.md` | `v2.0.0` |
| 7 | `chore/securite-ci` | Dependabot, audit des workflows | n/a |

---

## 10. Questions ouvertes

1. **DNS :** qui crée l'enregistrement dans la zone `incubateur.ademe.fr` ?
2. **Taille de police racine de la page ADEME :** à mesurer dans la console avec `getComputedStyle(document.documentElement).fontSize`. La page bloque les navigateurs automatisés, je n'ai pas pu le faire.
3. **Badge « Engagé » :** peut-on changer sa couleur pour respecter le contraste ?
4. **Données :** faut-il signaler à l'équipe data les valeurs de `part_sans_soutien_public` supérieures à 1 ?

### Idées hors périmètre

- Un lien vers l'offre chez le fournisseur (`url_offre`).
- Une vérification hebdomadaire du contrat d'API : champs attendus et libellés tous reconnus. Elle aurait détecté le constat 1.
