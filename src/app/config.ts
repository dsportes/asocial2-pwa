/* Par simplification et convention:
- la configuration est dans '/src/app/config.ts'
- le patch à appliquer est dans '/src/assets/custom.json'.
  Dans le script de build pour une cible donnée, un fichier spécifique
  vient écraser ce fichier (et le rétablir après build avec celui de dev).
*/

import THEMES from './themes'
import customjson from '../assets/custom.json?raw'

const head = `<html><head><meta charset="utf-8">
<style>div {font-size:18px;margin:12px;font-family:sans-serif;text-align:center;};a{margin-right:20px};</style>
</head><body>
`
const tail =`
</body></html>
`

const dupfr = head + `<div>Le lancement de l'application plus d'une fois dans ce browser n'est pas autorisé.
<a href="https://asocialapps.github.io/frdocs/">Aide</a></div>
` + tail

const dupen = head + `<div>Duplicate application launch in this browser not allowed.
<a href="https://asocialapps.github.io/frdocs/">Help</a></div>
` + tail

export const appConfig = {
  /******************************************************************************
   * Constantes de configuration requises / utilisées par le "starter"
   *****************************************************************************/

  /* Pour pouvoir recharger l'application, son URL
  Systématiquement surchargé par /src/assets/custom.json avec l'URL de dépliement */
  LOCATION: 'http://locahost:8080',

  /* Pour information: à disposition dans le code de l'application.
  NORMALEMENT ne doit pas changer selon la cible de distribution ce qui pourrait
  perturber le comportement de l'application ni elle ne l'a pas prévu */
  APPNAME: 'asocial3',

  /* Pour information: systématiquement surchargé par /src/assets/custom.json 
  en fonction aussi de la cible du déploiement. */
  BUILD: '2.1',
  
  /* Si vide, plusieurs instances de l'application peuvent s'exécuter dans 
  des onglets / fenêtres différentes du browser.
  Blocage des exécutions multiple: donner pour chaque langue le texte HTML
  d'information expliquant le blocage. */
  DUPBYE: { fr: dupfr, en: dupen }, // ou DUPBYE: ''

  /* En cas de rechargment, délai d'attente en ms de la page de rechargement
  permettant l'information de l'utilisateur. */
  RELOADDELAY: 1000,

  /* Si true, l'utilisateur peut cliquer sur une notification pour effectuer
  un popup de la page en exécution ou son lancement. */
  NOTIFICATIONCLICK: true,

  /* Si web-push est activé, clé "vapid" publique en base 64. Sinon '' */
  WEBPUSH: 'BC8J60JGGoZRHWJDrSbRih-0qi4Ug0LPbYsnft668oH56hqApUR0piwzZ_fsr0qGrkbOYSJ0lX1hPRTawQE88Ew',

  /* si DEBUG est true, des traces supplémentaires sont effectuées sur la console. 
  En général surchargé à 'false' dans /src/assets/custom.json */
  DEBUG: true,

  /* Langues supportées par l'application avec:
  - value: leur code standard (fr, en-GB ...)
  - leur label dans leur propre langue.
  - leur drapeau: le caractère unicode choisi. */
  LANGOPTIONS: [
    { value: 'en', label: 'English 🇬🇧',  flag: '🇬🇧' },
    { value: 'fr', label: 'Français 🇫🇷', flag: '🇫🇷' }
  ],

  /* Langue de départ présélectionnée par défaut.
  Peut être surchargé dans /src/assets/custom.json selon la cible de la distribution */
  LANG: 'fr',

  /* Mode sombre par défaut au démarrage */
  DARK: true,

  /* Thèmes: valeur des variables utilisées dans app.css marquant les couleurs choisies.
  PEUT être surchargé dans /src/assets/custom.json selon la cible de la distribution */
  THEMES: THEMES,

  /******************************************************************************
   * Constantes de configuration spécifiques de l'application
   *****************************************************************************/

  MANAGERS: new Map([
    ['AS2', ['CoDir', 'Redaction']]
  ]),

  SERVICES: {
    AS2: { api: 1 },
    ASSO2: { api: 1 },
    SAFE: { api: 1 }
  },

  MASTERDIR_URL: 'http://localhost:8091/master/',
  STDSAFE_URL: 'http://localhost:8091/safe/',

  DOC_URLS: {
    fr: "https://asocialapps.github.io/frdocs/",
    en: "https://asocialapps.github.io/frdocs/",
  },

  SYNCINCRNBD: 90, // nombre de jours de validité des synchros incrémentales

  maxlgtextegen: 4000,

    sizes: {
    alias: [10, 24],
    p1: [24, 40],
    tr: [3, 8],
    dev: [6, 16],
    pin: [8, 16],
    about: [4, 64],
    url: [4, 80],
    comment: [4, 80],
    pref: [4, 32],
    org: [3, 16, 'an1'],
    site: [3, 8, 'an1'],
    stdb: [3, 16, 'b64'],
    file: [1, 32],
    ps: [8, 40],
    entid: [0, 60],
    isotime: [24, 24],
    svc: [3, 8, 'svc'],
    auteur: [6, 24],
    minor: [0, 12, 'an2'],
    pseudo: [3, 16],
    trig: [3, 6, 'an1'],
    text: [0, 250],
    AS2$SectionC: [1, 8, 'an0'],
    AS2$SectionL: [1, 24]
  },

  regexp: {
    b64: new RegExp('^[0-9a-zA-Z-_]*$'),
    num: new RegExp('^[0-9]*$'),
    an0: new RegExp('^[0-9a-zA-Z]*$'),
    an1: new RegExp('^[a-z][0-9a-z]*$'),
    an2: new RegExp('^[a-zA-Z][0-9a-zA-Z]*$'),
    oper: new RegExp('^[$][0-9A-Z]*$'),
    svc: new RegExp('^[A-Z][0-9A-Z]*$')
  },

  phrasestar: { ps: 2, p1: 2, contact: 2}
}

const patch: any = JSON.parse(customjson)
for(const p in patch) (appConfig as any)[p] = patch[p]
