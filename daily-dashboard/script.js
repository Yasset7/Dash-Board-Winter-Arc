/*
 * script.js
 *
 * Ce fichier génère automatiquement une liste de dates et de tâches à partir des
 * phases définies. Chaque tâche dispose d'un bouton « Valider » qui enregistre
 * la progression dans le stockage local du navigateur. Les données sont
 * persistées grâce aux méthodes localStorage.setItem() et getItem(), qui
 * permettent d'enregistrer et de relire des données à travers les sessions
 * comme l'indique la documentation de l'API Web Storage【674549869579703†L1189-L1206】.
 */

// Définit les différentes phases et leurs tâches journalières.
const phases = [
  {
    name: 'Phase 1',
    start: '2025-09-13',
    end: '2025-09-30',
    tasks: [
      { name: 'Machine Learning Specialization', hours: 2 },
      { name: 'AWS Solutions Architect Associate', hours: 2 },
      { name: 'Terraform (IaC)', hours: 1 },
      { name: 'Révisions/exercices', hours: 1 },
    ],
  },
  {
    name: 'Phase 2',
    start: '2025-10-01',
    end: '2025-10-25',
    tasks: [
      { name: 'AWS Machine Learning Specialty', hours: 3 },
      { name: 'AWS ML Engineer Associate', hours: 2 },
      { name: 'Laboratoire/Pratique', hours: 1 },
    ],
  },
  {
    name: 'Phase 3',
    start: '2025-10-26',
    end: '2025-11-15',
    tasks: [
      { name: 'Fiches Stanford ML/AI', hours: 2 },
      { name: 'Révisions/mocks AWS', hours: 2 },
      { name: 'Révisions Machine Learning', hours: 1 },
      { name: 'Terraform (IaC)', hours: 1 },
    ],
  },
];

/**
 * Génère une liste d'objets contenant la date et les tâches associées entre deux dates.
 * @param {string} start - Date de début au format AAAA-MM-JJ
 * @param {string} end - Date de fin au format AAAA-MM-JJ
 * @param {Array} tasks - Liste des tâches pour chaque jour
 * @returns {Array} Liste de jours avec tâches
 */
function generateDays(start, end, tasks) {
  const days = [];
  const startDate = new Date(start);
  const endDate = new Date(end);
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    // Clone la date pour éviter des références partagées
    const dateObj = new Date(d);
    days.push({ date: dateObj, tasks: tasks.map(t => ({ ...t })) });
  }
  return days;
}

/**
 * Crée un planning complet en concaténant les phases.
 */
function buildSchedule() {
  let schedule = [];
  phases.forEach(phase => {
    schedule = schedule.concat(generateDays(phase.start, phase.end, phase.tasks));
  });
  return schedule;
}

/**
 * Formate une date en français (ex : 13 septembre 2025).
 * @param {Date} date
 */
function formatDate(date) {
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Charge la progression enregistrée dans le localStorage.
 * @returns {Object} Un objet où la clé est la date et la valeur un tableau booléen par tâche
 */
function loadProgress() {
  const data = localStorage.getItem('progress');
  // getItem() lit la valeur du stockage local pour une clé donnée【149259851653151†L1191-L1204】
  return data ? JSON.parse(data) : {};
}

/**
 * Sauvegarde la progression dans le localStorage.
 * @param {Object} progress - Données de progression à sauvegarder
 */
function saveProgress(progress) {
  // setItem() écrit une paire clé/valeur dans le stockage local【674549869579703†L1189-L1206】
  localStorage.setItem('progress', JSON.stringify(progress));
}

/**
 * Calcule le pourcentage de tâches terminées pour un jour donné.
 * @param {Array<Boolean>} completedArr - Tableau de booléens indiquant l'état de chaque tâche
 */
function calculateCompletion(completedArr) {
  const total = completedArr.length;
  const done = completedArr.filter(Boolean).length;
  return total > 0 ? (done / total) * 100 : 0;
}

/**
 * Met à jour la barre de progression pour un jour.
 * @param {HTMLElement} bar - Élément DOM de la barre
 * @param {number} percent - Pourcentage à appliquer
 */
function updateProgressBar(bar, percent) {
  bar.style.width = `${percent}%`;
}

/**
 * Création du tableau de bord dans le DOM.
 */
function renderDashboard() {
  const dashboard = document.getElementById('dashboard');
  dashboard.innerHTML = '';
  const schedule = buildSchedule();
  const progressData = loadProgress();

  schedule.forEach(day => {
    const dateKey = day.date.toISOString().split('T')[0];
    // Récupère l'état des tâches ou initialise par défaut avec false
    let completed = progressData[dateKey];
    if (!completed) {
      completed = day.tasks.map(() => false);
      progressData[dateKey] = completed;
    }

    // Création des éléments DOM
    const card = document.createElement('div');
    card.className = 'day-card';

    // En-tête avec date et barre de progression
    const header = document.createElement('div');
    header.className = 'day-header';

    const title = document.createElement('div');
    title.className = 'day-title';
    title.textContent = formatDate(day.date);

    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress';
    const bar = document.createElement('div');
    bar.className = 'progress-bar';
    progressContainer.appendChild(bar);

    header.appendChild(title);
    header.appendChild(progressContainer);
    card.appendChild(header);

    // Tâches
    const tasksList = document.createElement('div');
    tasksList.className = 'tasks';
    day.tasks.forEach((task, idx) => {
      const taskItem = document.createElement('div');
      taskItem.className = 'task';

      const nameEl = document.createElement('span');
      nameEl.className = 'task-name';
      nameEl.textContent = task.name;

      const hoursEl = document.createElement('span');
      hoursEl.className = 'task-hours';
      hoursEl.textContent = `${task.hours} h`;

      const btn = document.createElement('button');
      btn.textContent = completed[idx] ? '✔ Terminé' : 'Valider';
      if (completed[idx]) btn.classList.add('completed');

      // Écouteur pour marquer comme terminé
      btn.addEventListener('click', () => {
        if (completed[idx]) return; // Ne rien faire si déjà terminé
        completed[idx] = true;
        btn.textContent = '✔ Terminé';
        btn.classList.add('completed');
        // Met à jour la barre de progression
        const percent = calculateCompletion(completed);
        updateProgressBar(bar, percent);
        // Sauvegarde
        saveProgress(progressData);
      });

      taskItem.appendChild(nameEl);
      taskItem.appendChild(hoursEl);
      taskItem.appendChild(btn);
      tasksList.appendChild(taskItem);
    });

    card.appendChild(tasksList);

    // Initialise la barre de progression
    const percent = calculateCompletion(completed);
    updateProgressBar(bar, percent);

    dashboard.appendChild(card);
  });

  // Enregistre la progression initiale (cas où aucune donnée n'existait)
  saveProgress(progressData);
}

// Lance le rendu au chargement de la page
document.addEventListener('DOMContentLoaded', renderDashboard);