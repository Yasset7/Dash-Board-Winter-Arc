# Tableau de progression des certifications

Ce petit projet HTML/JavaScript génère un **tableau de bord interactif** pour suivre l’avancement d’un planning de formation comprenant plusieurs certifications (Machine Learning, AWS Architect, Terraform, etc.). Il s’inspire de l’interface ludique de Duolingo : chaque journée apparaît comme une carte contenant les tâches à réaliser, et un bouton permet de valider chaque bloc d’heures. L’état de votre progression est enregistré dans le navigateur grâce à l’API **localStorage**.

## Fonctionnement

- **Planning automatisé :** les phases et leurs dates sont définies dans le fichier `script.js`. Le script génère automatiquement une carte par jour entre les dates de début et de fin.
- **Validation des tâches :** chaque tâche possède un bouton « Valider » qui, lorsqu’on clique dessus, indique que l’activité est terminée et met à jour la barre de progression. Une fois validée, la tâche est grisées et ne peut plus être modifiée.
- **Sauvegarde locale :** la progression est conservée via `localStorage`. La méthode [`setItem()` de l’API Web Storage](https://www.w3schools.com/jsref/met_storage_setitem.asp) permet d’enregistrer une paire clé/valeur (ici la date et l’état des tâches)【674549869579703†L1189-L1206】, tandis que [`getItem()`](https://www.w3schools.com/jsref/met_storage_getitem.asp) retourne la valeur associée à une clé【149259851653151†L1191-L1204】. Ainsi, vous retrouvez votre progression même après avoir fermé le navigateur.

## Démarrer en local

1. Clonez ce dépôt ou téléchargez les fichiers.
2. Ouvrez `index.html` dans un navigateur moderne. Aucune dépendance externe n’est requise.
3. Les cartes s’afficheront automatiquement selon les dates définies. Vous pouvez personnaliser les phases et les tâches dans `script.js`.

## Déployer sur GitHub Pages

Vous pouvez héberger ce tableau de bord gratuitement avec GitHub Pages :

1. Créez un nouveau dépôt sur GitHub et envoyez-y les fichiers du projet (`index.html`, `styles.css`, `script.js`, etc.).
2. Dans les paramètres du dépôt, ouvrez la section **Pages**.
3. Choisissez **Deploy from a branch** et sélectionnez la branche contenant les fichiers puis, par exemple, le dossier `/` comme source. GitHub décrit cette procédure dans son guide de démarrage : il faut créer un dépôt puis activer Pages dans la section « Pages » des paramètres【84421185550601†L84-L116】.
4. Une fois activé, votre site sera disponible à l’adresse `https://votre‑nom.github.io/votre‑depot/` après quelques minutes.

## Personnalisation

Le planning actuel suit les trois phases décrites dans l’image fournie :

| Phase | Période | Structure des tâches (heures) |
|------|---------|-------------------------------|
| **Phase 1** | 13 septembre → 30 septembre | 2h Machine Learning, 2h AWS Architect, 1h Terraform, 1h révisions/exercices |
| **Phase 2** | 1ᵉʳ octobre → 25 octobre | 3h AWS ML Specialty, 2h AWS ML Engineer, 1h labo/pratique |
| **Phase 3** | 26 octobre → 15 novembre | 2h Fiches Stanford ML/AI, 2h révisions/mocks AWS, 1h révisions ML, 1h Terraform |

Pour modifier le planning (dates ou durées), ouvrez `script.js` et ajustez le tableau `phases`. Chaque phase possède un champ `start`, `end` et une liste `tasks` avec un nom et le nombre d’heures attribuées.

## Capture d’écran

Lorsque vous chargez la page, vous verrez un tableau de bord où chaque journée ressemble à ceci :

![Exemple de carte de journée]({{file:f1a46ac6-627f-4bbd-9730-e2d3dc273e80.png}})

Chaque carte affiche la date, une barre de progression et les tâches avec leurs heures. Le bouton « Valider » marque la tâche comme terminée et met à jour la barre.

---

Si vous souhaitez intégrer ce tableau de bord dans un autre projet ou l’étendre (par exemple en ajoutant une authentification ou une sauvegarde côté serveur), n’hésitez pas à le forker et à l’adapter à vos besoins !