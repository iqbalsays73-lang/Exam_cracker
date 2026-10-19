"use strict";
alert("script loaded")

document.addEventListener("DOMContentLoaded", () => {
  const DATA = window.IQBAL_DATA;

  if (!DATA) {
    alert("Data.js load nahi hui. Filename aur script order check karo.");
    return;
  }

  const $ = (id) => document.getElementById(id);
  const all = (selector) => [...document.querySelectorAll(selector)];

  const state = {
    page: "home",
    exam: "chsl",
    subject: null,
    topic: null,
    questions: [],
    index: 0,
    answers: [],
    score: 0,
    notes: load("project_iqbal_notes", []),
    progress: load("project_iqbal_progress", {
      attempted: 0,
      correct: 0,
      history: [],
      lessons: []
    }),
    target: load("project_iqbal_target", 20)
  };

  function load(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  }

  function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  function toast(message) {
    const el = $("toast");
    if (el) {
      el.textContent = message;
      el.classList.add("show");
      setTimeout(() => el.classList.remove("show"), 2500);
    } else {
      console.log(message);
    }
  }

  function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  const targetPage = document.getElementById(pageId) || document.querySelector(`[data-page="${pageId}"]`);
  if (targetPage) {
    targetPage.classList.add('active');
  }
  }
  

    all('[id^="page-"]').forEach(section => {
      section.hidden = section.id !== `page-${page}`;
    });

    $("mainNav")?.classList.remove("open");
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (page === "home") updateDashboard();
    if (page === "exams") renderExams();
    if (page === "subjects") renderSubjects();
    if (page === "notes") renderNotes();
    if (page === "progress") renderProgress();
    if (page === "tests") renderTests();
    if (page === "constitution") renderConstitution();
  // NAVIGATION

  all("[data-page]").forEach(button => {
    button.addEventListener("click", () => {
      showPage(button.dataset.page);
    });
  });

  $("menuToggle")?.addEventListener("click", () => {
    $("mainNav")?.classList.toggle("open");
  });

  // DASHBOARD

  function accuracy() {
    return state.progress.attempted
      ? Math.round(
          state.progress.correct /
          state.progress.attempted * 100
        )
      : 0;
  }

  function updateDashboard() {
    setText("homeAttempted", state.progress.attempted);
    setText("homeCorrect", state.progress.correct);
    setText("homeAccuracy", accuracy() + "%");
    setText("homeTests", state.progress.history.length);

    if ($("dailyTarget")) $("dailyTarget").value = state.target;

    const done = state.progress.history.filter(item => {
      return item.date === new Date().toLocaleDateString("en-CA");
    }).length;

    const percent = state.target > 0
      ? Math.min(100, Math.round(done / state.target * 100))
      : 0;

    if ($("dailyProgressBar")) {
      $("dailyProgressBar").style.width = percent + "%";
    }

    setText("dailyProgressText", `${done} / ${state.target}`);
  }

  function setText(id, value) {
    if ($(id))$(id).textContent = value;
  }

  $("saveDailyTargetBtn")?.addEventListener("click", () => {
    const target = Number($("dailyTarget")?.value);

    if (!Number.isFinite(target) || target < 1) {
      toast("Valid daily target enter karo.");
      return;
    }

    state.target = Math.floor(target);
    save("project_iqbal_target", state.target);
    updateDashboard();
    toast("Daily target saved!");
  });

  // EXAMS

  function renderExams() {
    const grid = $("examGrid");
    if (!grid) return;

    const search = ($("examSearch")?.value || "").toLowerCase();
    const category = all("[data-category].active")
      .map(el => el.dataset.category)[0] || "All";

    const exams = DATA.exams.filter(exam => {
      const matchesSearch =
        `${exam.name} ${exam.description}`.toLowerCase().includes(search);

      const matchesCategory =
        category === "All" || exam.category === category;

      return matchesSearch && matchesCategory;
    });

    grid.innerHTML = exams.map(exam => `
      <article class="card exam-card">
        <h3>${escapeHTML(exam.name)}</h3>
        <p>${escapeHTML(exam.description)}</p>
        <span>${escapeHTML(exam.category)}</span>
        <button class="btn primary" data-open-exam="${escapeHTML(exam.id)}">
          Open Academy
        </button>
      </article>
    `).join("") || "<p>No exams found.</p>";

    all("[data-open-exam]").forEach(button => {
      button.addEventListener("click", () => {
        state.exam = button.dataset.openExam;
        showPage("subjects");
      });
    });
  }

  $("examSearch")?.addEventListener("input", renderExams);

  all("[data-category]").forEach(button => {
    button.addEventListener("click", () => {
      all("[data-category]").forEach(item =>
        item.classList.remove("active")
      );
      button.classList.add("active");
      renderExams();
    });
  });

  // SUBJECTS

  function renderSubjects() {
    const grid = $("subjectGrid");
    if (!grid) return;

    const exam = DATA.exams.find(item => item.id === state.exam);

    setText("subjectsExamName", exam?.name || "General Preparation");
    setText("subjectsHeading", "Subjects");

    const search = ($("subjectSearch")?.value || "").toLowerCase();

    const subjects = DATA.subjects.filter(subject =>
      `${subject.name} ${subject.description}`
        .toLowerCase().includes(search)
    );

    grid.hidden = false;
    if ($("topicArea")) $("topicArea").hidden = true;
    if ($("lessonArea")) $("lessonArea").hidden = true;

    grid.innerHTML = subjects.map(subject => `
      <article class="card subject-card">
        <div class="subject-icon">${escapeHTML(subject.icon)}</div>
        <h3>${escapeHTML(subject.name)}</h3>
        <p>${escapeHTML(subject.description)}</p>
        <p>${subject.topics.length} topics</p>
        <button class="btn primary" data-subject="${escapeHTML(subject.id)}">
          Study Subject
        </button>
      </article>
    `).join("");

    all("[data-subject]").forEach(button => {
      button.addEventListener("click", () => {
        openSubject(button.dataset.subject);
      });
    });
  }

  $("subjectSearch")?.addEventListener("input", renderSubjects);

  function openSubject(id) {
    state.subject = DATA.subjects.find(subject => subject.id === id);
    if (!state.subject) return;

    if ($("subjectGrid")) $("subjectGrid").hidden = true;
    if ($("topicArea")) $("topicArea").hidden = false;
    if ($("lessonArea")) $("lessonArea").hidden = true;

    setText("currentSubjectTitle", state.subject.name);

    const list = $("topicList");
    if (!list) return;

    list.innerHTML = state.subject.topics.map((topic, index) => `
      <article class="card topic-card">
        <h3>${index + 1}. ${escapeHTML(topic.title)}</h3>
        <p>${escapeHTML(topic.difficulty || "Practice")}</p>
        <button class="btn primary" data-topic="${index}">
          Open Lesson
        </button>
      </article>
    `).join("");

    all("[data-topic]").forEach(button => {
      button.addEventListener("click", () => {
        openLesson(Number(button.dataset.topic));
      });
    });
  }

  $("backToSubjects")?.addEventListener("click", renderSubjects);

  function openLesson(index) {
    if (!state.subject) return;

    state.topic = state.subject.topics[index];
    if (!state.topic) return;

    if ($("topicArea")) $("topicArea").hidden = true;
    if ($("lessonArea")) $("lessonArea").hidden = false;

    setText("lessonTitle", state.topic.title);

    if ($("lessonBody")) {
      $("lessonBody").innerHTML = state.topic.content || "<p>Lesson content coming soon.</p>";
    }
  }

  $("backToTopics")?.addEventListener("click", () => {
    if ($("lessonArea")) $("lessonArea").hidden = true;
    if ($("topicArea")) $("topicArea").hidden = false;
  });

  $("markLessonBtn")?.addEventListener("click", () => {
    if (!state.topic) return;

    if (!state.progress.lessons.includes(state.topic.id)) {
      state.progress.lessons.push(state.topic.id);
      save("project_iqbal_progress", state.progress);
    }

    toast("Lesson completed!");
  });

  $("practiceTopicBtn")?.addEventListener("click", () => {
    if (state.subject) {
      showPage("practice");
      if ($("practiceSubject")) {
        $("practiceSubject").value = state.subject.name;
      }
      startPractice(state.subject.name);
    }
  });

  // PRACTICE

  function fillPracticeDropdown() {
    const select = $("practiceSubject");
    if (!select || select.options.length > 0) return;

    select.innerHTML = `
      <option value="All">All Subjects</option>
      ${DATA.subjects.map(subject => `
        <option value="${escapeHTML(subject.name)}">${escapeHTML(subject.name)}</option>
      `).join("")}
    `;
  }

  fillPracticeDropdown();

  $("startPracticeBtn")?.addEventListener("click", () => {
    startPractice($("practiceSubject")?.value || "All");
  });

  function startPractice(subjectName) {
    const difficulty = $("practiceDifficulty")?.value || "All";
    const count = $("practiceCount")?.value || "10";

    let pool = DATA.questions.filter(question => {
      const subjectMatch =
        subjectName === "All" || question.subject === subjectName;

      const difficultyMatch =
        difficulty === "All" || question.difficulty === difficulty;

      return subjectMatch && difficultyMatch;
    });

    if (!pool.length) {
      toast("Is selection mein questions nahi mile.");
      return;
    }

    pool = pool.sort(() => Math.random() - 0.5);

    const amount = count === "all"
      ? pool.length
      : Math.max(1, Number(count) || 10);

    state.questions = pool.slice(0, amount);
    state.index = 0;
    state.answers = [];
    state.score = 0;

    if ($("quizArea")) $("quizArea").hidden = false;
    if ($("quizResults")) $("quizResults").hidden = true;

    showQuestion();
  }

  function showQuestion() {
    const question = state.questions[state.index];
    if (!question) return finishPractice();

    setText("quizSubjectLabel", question.subject);
    setText("quizQuestionCounter",
      `Question ${state.index + 1} of ${state.questions.length}`
    );
    setText("questionDifficulty", question.difficulty || "Practice");
    setText("questionExamLabel", question.type || "Practice");
    setText("questionText", question.question);

    if ($("quizProgressBar")) {
      $("quizProgressBar").style.width =
        ((state.index + 1) / state.questions.length * 100) + "%";
    }

    const options = $("questionOptions");
    if (!options) return;

    options.innerHTML = question.options.map((option, index) => `
      <button class="option-btn" data-answer="${index}">
        <span>${String.fromCharCode(65 + index)}.</span>
        ${escapeHTML(option)}
      </button>
    `).join("");

    setText("answerFeedback", "");
    if ($("nextQuestionBtn")) $("nextQuestionBtn").hidden = true;
    if ($("skipQuestionBtn")) $("skipQuestionBtn").hidden = false;

    all("[data-answer]").forEach(button => {
      button.addEventListener("click", () => {
        chooseAnswer(Number(button.dataset.answer));
      });
    });
  }

  function chooseAnswer(selected) {
    if (state.answers[state.index] !== undefined) return;

    const question = state.questions[state.index];
    state.answers[state.index] = selected;

    const correct = selected === question.answer;
    if (correct) state.score++;

    all("[data-answer]").forEach(button => {
      button.disabled = true;
      const index = Number(button.dataset.answer);

      if (index === question.answer) {
        button.classList.add("correct");
      } else if (index === selected) {
        button.classList.add("incorrect");
      }
    });

    setText(
      "answerFeedback",
      correct
        ? "Correct! " + (question.explanation || "")
        : "Incorrect. " + (question.explanation || "")
    );

    if ($("nextQuestionBtn")) $("nextQuestionBtn").hidden = false;
    if ($("skipQuestionBtn")) $("skipQuestionBtn").hidden = true;
  }

  $("skipQuestionBtn")?.addEventListener("click", () => {
    if (state.answers[state.index] === undefined) {
      state.answers[state.index] = null;
      nextQuestion();
    }
  });

  $("nextQuestionBtn")?.addEventListener("click", nextQuestion);

  function nextQuestion() {
    state.index++;
    if (state.index >= state.questions.length) {
      finishPractice();
    } else {
      showQuestion();
    }
  }

  function finishPractice() {
    const attempted = state.answers.filter(answer => answer !== null && answer !== undefined).length;
    const correct = state.score;
    const percent = attempted ? Math.round(correct / attempted * 100) : 0;

    state.progress.attempted += attempted;
    state.progress.correct += correct;

    state.progress.history.unshift({
      date: new Date().toLocaleDateString("en-CA"),
      subject: $("practiceSubject")?.value || "All",
      attempted,
      correct,
      accuracy: percent
    });

    state.progress.history = state.progress.history.slice(0, 100);

    save("project_iqbal_progress", state.progress);

    if ($("quizArea")) $("quizArea").hidden = true;
    if ($("quizResults")) $("quizResults").hidden = false;

    setText("resultAttempted", attempted);
    setText("resultCorrect", correct);
    setText("resultAccuracy", percent + "%");
    setText(
      "resultMessage",
      percent >= 80 ? "Excellent work!" :
      percent >= 50 ? "Good effort. Keep practising!" :
      "Revise the lesson and try again."
    );

    updateDashboard();
  }

  $("restartPracticeBtn")?.addEventListener("click", () => {
    startPractice($("practiceSubject")?.value || "All");
  });

  // MOCK TESTS

  function renderTests() {
    const grid = $("mockTestGrid");
    if (!grid) return;

    grid.innerHTML = DATA.mockTests.map(test => `
      <article class="card">
        <h3>${escapeHTML(test.title)}</h3>
        <p>${escapeHTML(test.description)}</p>
        <p>Duration: ${test.durationMinutes} minutes</p>
        <button class="btn primary" data-test="${escapeHTML(test.subject)}">
          Start Test
        </button>
      </article>
    `).join("");

    all("[data-test]").forEach(button => {
      button.addEventListener("click", () => {
        showPage("practice");
        if ($("practiceSubject")) {
          $("practiceSubject").value =
            button.dataset.test === "All" ? "All" : button.dataset.test;
        }
        startPractice(button.dataset.test);
      });
    });

    const history = $("testHistory");
    if (history) {
      history.innerHTML = state.progress.history.slice(0, 10).map(item => `
        <p>${escapeHTML(item.date)} — ${escapeHTML(item.subject)}:
        ${item.correct}/${item.attempted} correct (${item.accuracy}%)</p>
      `).join("") || "<p>No tests attempted yet.</p>";
    }
  }

  // CONSTITUTION

  function renderConstitution() {
    const grid = $("constitutionGrid");
    if (!grid) return;

    const search = ($("constitutionSearch")?.value || "").toLowerCase();

    const items = DATA.constitution.filter(item =>
      `${item.title} ${item.tag} ${item.content}`
        .toLowerCase().includes(search)
    );

    grid.innerHTML = items.map(item => `
      <article class="card">
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.tag)}</p>
        <details>
          <summary>Read Notes</summary>
          <div>${item.content}</div>
        </details>
      </article>
    `).join("") || "<p>No results found.</p>";
  }

  $("constitutionSearch")?.addEventListener("input", renderConstitution);

  // NOTES

  $("noteForm")?.addEventListener("submit", event => {
    event.preventDefault();

    const id = $("noteId")?.value;
    const title = $("noteTitle")?.value.trim();
    const subject = $("noteSubject")?.value || "General";
    const content = $("noteContent")?.value.trim();

    if (!title || !content) {
      toast("Title aur note content likho.");
      return;
    }

    if (id) {
      const note = state.notes.find(item => item.id === id);
      if (note) Object.assign(note, { title, subject, content });
    } else {
      state.notes.unshift({
        id: String(Date.now()),
        title,
        subject,
        content,
        date: new Date().toLocaleDateString("en-CA")
      });
    }

    save("project_iqbal_notes", state.notes);
    $("noteForm").reset();
    if ($("noteId")) $("noteId").value = "";

    renderNotes();
    toast("Note saved!");
  });

  function renderNotes() {
    const list = $("notesList");
    if (!list) return;

    const search = ($("noteSearch")?.value || "").toLowerCase();

    const notes = state.notes.filter(note =>
      `${note.title} ${note.subject} ${note.content}`
        .toLowerCase().includes(search)
    );

    list.innerHTML = notes.map(note => `
      <article class="card">
        <h3>${escapeHTML(note.title)}</h3>
        <p>${escapeHTML(note.subject)} · ${escapeHTML(note.date || "")}</p>
        <p>${escapeHTML(note.content)}</p>
        <button class="btn" data-edit-note="${escapeHTML(note.id)}">Edit</button>
        <button class="btn" data-delete-note="${escapeHTML(note.id)}">Delete</button>
      </article>
    `).join("") || "<p>No notes yet. Create your first note!</p>";

    all("[data-edit-note]").forEach(button => {
      button.addEventListener("click", () => {
        const note = state.notes.find(item => item.id === button.dataset.editNote);
        if (!note) return;

        $("noteId").value = note.id;
        $("noteTitle").value = note.title;
        $("noteSubject").value = note.subject;
        $("noteContent").value = note.content;
        $("noteTitle").focus();
      });
    });

    all("[data-delete-note]").forEach(button => {
      button.addEventListener("click", () => {
        if (!confirm("Delete this note?")) return;

        state.notes = state.notes.filter(
          note => note.id !== button.dataset.deleteNote
        );

        save("project_iqbal_notes", state.notes);
        renderNotes();
        toast("Note deleted.");
      });
    });
  }

  $("noteSearch")?.addEventListener("input", renderNotes);

  $("cancelEditBtn")?.addEventListener("click", () => {
    $("noteForm")?.reset();
    if ($("noteId")) $("noteId").value = "";
  });

  // PROGRESS + EXPORT / IMPORT / RESET

  function renderProgress() {
    setText("progressAttempted", state.progress.attempted);
    setText("progressCorrect", state.progress.correct);
    setText("progressAccuracy", accuracy() + "%");

    const total = DATA.subjects.reduce(
      (sum, subject) => sum + subject.topics.length, 0
    );

    const completed = state.progress.lessons.length;
    const percent = total ? Math.round(completed / total * 100) : 0;

    if ($("topicProgressBar")) {
      $("topicProgressBar").style.width = percent + "%";
    }

    setText("topicProgressText", `${completed} / ${total} topics`);

    const history = $("practiceHistory");
    if (history) {
      history.innerHTML = state.progress.history.slice(0, 20).map(item => `
        <article class="card">
          <p>${escapeHTML(item.date)} — ${escapeHTML(item.subject)}</p>
          <p>Correct: ${item.correct}/${item.attempted}</p>
          <p>Accuracy: ${item.accuracy}%</p>
        </article>
      `).join("") || "<p>Practice history will appear here.</p>";
    }
  }

  $("exportDataBtn")?.addEventListener("click", () => {
    const backup = {
      notes: state.notes,
      progress: state.progress,
      target: state.target
    };

    const blob = new Blob(
      [JSON.stringify(backup, null, 2)],
      { type: "application/json" }
 "use strict";

document.addEventListener("DOMContentLoaded", () => {
  const DATA = window.IQBAL_DATA;

  if (!DATA) {
    alert("Data.js load nahi hui. Filename aur script order check karo.");
    return;
  }

  const $ = (id) => document.getElementById(id);
  const all = (selector) => [...document.querySelectorAll(selector)];

  const state = {
    page: "home",
    exam: "chsl",
    subject: null,
    topic: null,
    questions: [],
    index: 0,
    answers: [],
    score: 0,
    notes: load("project_iqbal_notes", []),
    progress: load("project_iqbal_progress", {
      attempted: 0,
      correct: 0,
      history: [],
      lessons: []
    }),
    target: load("project_iqbal_target", 20)
  };

  function load(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  }

  function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  function toast(message) {
    const el = $("toast");
    if (el) {
      el.textContent = message;
      el.classList.add("show");
      setTimeout(() => el.classList.remove("show"), 2500);
    } else {
      console.log(message);
    }
  }

  function showPage(page) {
    state.page = page;

    all("[data-page]").forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.page === page
      );
    });

    all('[id^="page-"]').forEach(section => {
      section.hidden = section.id !== `page-${page}`;
    });

    $("mainNav")?.classList.remove("open");
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (page === "home") updateDashboard();
    if (page === "exams") renderExams();
    if (page === "subjects") renderSubjects();
    if (page === "notes") renderNotes();
    if (page === "progress") renderProgress();
    if (page === "tests") renderTests();
    if (page === "constitution") renderConstitution();
  }

  // NAVIGATION

  all("[data-page]").forEach(button => {
    button.addEventListener("click", () => {
      showPage(button.dataset.page);
    });
  });

  $("menuToggle")?.addEventListener("click", () => {
    $("mainNav")?.classList.toggle("open");
  });

  // DASHBOARD

  function accuracy() {
    return state.progress.attempted
      ? Math.round(
          state.progress.correct /
          state.progress.attempted * 100
        )
      : 0;
  }

  function updateDashboard() {
    setText("homeAttempted", state.progress.attempted);
    setText("homeCorrect", state.progress.correct);
    setText("homeAccuracy", accuracy() + "%");
    setText("homeTests", state.progress.history.length);

    if ($("dailyTarget")) $("dailyTarget").value = state.target;

    const done = state.progress.history.filter(item => {
      return item.date === new Date().toLocaleDateString("en-CA");
    }).length;

    const percent = state.target > 0
      ? Math.min(100, Math.round(done / state.target * 100))
      : 0;

    if ($("dailyProgressBar")) {
      $("dailyProgressBar").style.width = percent + "%";
    }

    setText("dailyProgressText", `${done} / ${state.target}`);
  }

  function setText(id, value) {
    if ($(id))$(id).textContent = value;
  }

  $("saveDailyTargetBtn")?.addEventListener("click", () => {
    const target = Number($("dailyTarget")?.value);

    if (!Number.isFinite(target) || target < 1) {
      toast("Valid daily target enter karo.");
      return;
    }

    state.target = Math.floor(target);
    save("project_iqbal_target", state.target);
    updateDashboard();
    toast("Daily target saved!");
  });

  // EXAMS

  function renderExams() {
    const grid = $("examGrid");
    if (!grid) return;

    const search = ($("examSearch")?.value || "").toLowerCase();
    const category = all("[data-category].active")
      .map(el => el.dataset.category)[0] || "All";

    const exams = DATA.exams.filter(exam => {
      const matchesSearch =
        `${exam.name} ${exam.description}`.toLowerCase().includes(search);

      const matchesCategory =
        category === "All" || exam.category === category;

      return matchesSearch && matchesCategory;
    });

    grid.innerHTML = exams.map(exam => `
      <article class="card exam-card">
        <h3>${escapeHTML(exam.name)}</h3>
        <p>${escapeHTML(exam.description)}</p>
        <span>${escapeHTML(exam.category)}</span>
        <button class="btn primary" data-open-exam="${escapeHTML(exam.id)}">
          Open Academy
        </button>
      </article>
    `).join("") || "<p>No exams found.</p>";

    all("[data-open-exam]").forEach(button => {
      button.addEventListener("click", () => {
        state.exam = button.dataset.openExam;
        showPage("subjects");
      });
    });
  }

  $("examSearch")?.addEventListener("input", renderExams);

  all("[data-category]").forEach(button => {
    button.addEventListener("click", () => {
      all("[data-category]").forEach(item =>
        item.classList.remove("active")
      );
      button.classList.add("active");
      renderExams();
    });
  });

  // SUBJECTS

  function renderSubjects() {
    const grid = $("subjectGrid");
    if (!grid) return;

    const exam = DATA.exams.find(item => item.id === state.exam);

    setText("subjectsExamName", exam?.name || "General Preparation");
    setText("subjectsHeading", "Subjects");

    const search = ($("subjectSearch")?.value || "").toLowerCase();

    const subjects = DATA.subjects.filter(subject =>
      `${subject.name} ${subject.description}`
        .toLowerCase().includes(search)
    );

    grid.hidden = false;
    if ($("topicArea")) $("topicArea").hidden = true;
    if ($("lessonArea")) $("lessonArea").hidden = true;

    grid.innerHTML = subjects.map(subject => `
      <article class="card subject-card">
        <div class="subject-icon">${escapeHTML(subject.icon)}</div>
        <h3>${escapeHTML(subject.name)}</h3>
        <p>${escapeHTML(subject.description)}</p>
        <p>${subject.topics.length} topics</p>
        <button class="btn primary" data-subject="${escapeHTML(subject.id)}">
          Study Subject
        </button>
      </article>
    `).join("");

    all("[data-subject]").forEach(button => {
      button.addEventListener("click", () => {
        openSubject(button.dataset.subject);
      });
    });
  }

  $("subjectSearch")?.addEventListener("input", renderSubjects);

  function openSubject(id) {
    state.subject = DATA.subjects.find(subject => subject.id === id);
    if (!state.subject) return;

    if ($("subjectGrid")) $("subjectGrid").hidden = true;
    if ($("topicArea")) $("topicArea").hidden = false;
    if ($("lessonArea")) $("lessonArea").hidden = true;

    setText("currentSubjectTitle", state.subject.name);

    const list = $("topicList");
    if (!list) return;

    list.innerHTML = state.subject.topics.map((topic, index) => `
      <article class="card topic-card">
        <h3>${index + 1}. ${escapeHTML(topic.title)}</h3>
        <p>${escapeHTML(topic.difficulty || "Practice")}</p>
        <button class="btn primary" data-topic="${index}">
          Open Lesson
        </button>
      </article>
    `).join("");

    all("[data-topic]").forEach(button => {
      button.addEventListener("click", () => {
        openLesson(Number(button.dataset.topic));
      });
    });
  }

  $("backToSubjects")?.addEventListener("click", renderSubjects);

  function openLesson(index) {
    if (!state.subject) return;

    state.topic = state.subject.topics[index];
    if (!state.topic) return;

    if ($("topicArea")) $("topicArea").hidden = true;
    if ($("lessonArea")) $("lessonArea").hidden = false;

    setText("lessonTitle", state.topic.title);

    if ($("lessonBody")) {
      $("lessonBody").innerHTML = state.topic.content || "<p>Lesson content coming soon.</p>";
    }
  }

  $("backToTopics")?.addEventListener("click", () => {
    if ($("lessonArea")) $("lessonArea").hidden = true;
    if ($("topicArea")) $("topicArea").hidden = false;
  });

  $("markLessonBtn")?.addEventListener("click", () => {
    if (!state.topic) return;

    if (!state.progress.lessons.includes(state.topic.id)) {
      state.progress.lessons.push(state.topic.id);
      save("project_iqbal_progress", state.progress);
    }

    toast("Lesson completed!");
  });

  $("practiceTopicBtn")?.addEventListener("click", () => {
    if (state.subject) {
      showPage("practice");
      if ($("practiceSubject")) {
        $("practiceSubject").value = state.subject.name;
      }
      startPractice(state.subject.name);
    }
  });

  // PRACTICE

  function fillPracticeDropdown() {
    const select = $("practiceSubject");
    if (!select || select.options.length > 0) return;

    select.innerHTML = `
      <option value="All">All Subjects</option>
      ${DATA.subjects.map(subject => `
        <option value="${escapeHTML(subject.name)}">${escapeHTML(subject.name)}</option>
      `).join("")}
    `;
  }

  fillPracticeDropdown();

  $("startPracticeBtn")?.addEventListener("click", () => {
    startPractice($("practiceSubject")?.value || "All");
  });

  function startPractice(subjectName) {
    const difficulty = $("practiceDifficulty")?.value || "All";
    const count = $("practiceCount")?.value || "10";

    let pool = DATA.questions.filter(question => {
      const subjectMatch =
        subjectName === "All" || question.subject === subjectName;

      const difficultyMatch =
        difficulty === "All" || question.difficulty === difficulty;

      return subjectMatch && difficultyMatch;
    });

    if (!pool.length) {
      toast("Is selection mein questions nahi mile.");
      return;
    }

    pool = pool.sort(() => Math.random() - 0.5);

    const amount = count === "all"
      ? pool.length
      : Math.max(1, Number(count) || 10);

    state.questions = pool.slice(0, amount);
    state.index = 0;
    state.answers = [];
    state.score = 0;

    if ($("quizArea")) $("quizArea").hidden = false;
    if ($("quizResults")) $("quizResults").hidden = true;

    showQuestion();
  }

  function showQuestion() {
    const question = state.questions[state.index];
    if (!question) return finishPractice();

    setText("quizSubjectLabel", question.subject);
    setText("quizQuestionCounter",
      `Question ${state.index + 1} of ${state.questions.length}`
    );
    setText("questionDifficulty", question.difficulty || "Practice");
    setText("questionExamLabel", question.type || "Practice");
    setText("questionText", question.question);

    if ($("quizProgressBar")) {
      $("quizProgressBar").style.width =
        ((state.index + 1) / state.questions.length * 100) + "%";
    }

    const options = $("questionOptions");
    if (!options) return;

    options.innerHTML = question.options.map((option, index) => `
      <button class="option-btn" data-answer="${index}">
        <span>${String.fromCharCode(65 + index)}.</span>
        ${escapeHTML(option)}
      </button>
    `).join("");

    setText("answerFeedback", "");
    if ($("nextQuestionBtn")) $("nextQuestionBtn").hidden = true;
    if ($("skipQuestionBtn")) $("skipQuestionBtn").hidden = false;

    all("[data-answer]").forEach(button => {
      button.addEventListener("click", () => {
        chooseAnswer(Number(button.dataset.answer));
      });
    });
  }

  function chooseAnswer(selected) {
    if (state.answers[state.index] !== undefined) return;

    const question = state.questions[state.index];
    state.answers[state.index] = selected;

    const correct = selected === question.answer;
    if (correct) state.score++;

    all("[data-answer]").forEach(button => {
      button.disabled = true;
      const index = Number(button.dataset.answer);

      if (index === question.answer) {
        button.classList.add("correct");
      } else if (index === selected) {
        button.classList.add("incorrect");
      }
    });

    setText(
      "answerFeedback",
      correct
        ? "Correct! " + (question.explanation || "")
        : "Incorrect. " + (question.explanation || "")
    );

    if ($("nextQuestionBtn")) $("nextQuestionBtn").hidden = false;
    if ($("skipQuestionBtn")) $("skipQuestionBtn").hidden = true;
  }

  $("skipQuestionBtn")?.addEventListener("click", () => {
    if (state.answers[state.index] === undefined) {
      state.answers[state.index] = null;
      nextQuestion();
    }
  });

  $("nextQuestionBtn")?.addEventListener("click", nextQuestion);

  function nextQuestion() {
    state.index++;
    if (state.index >= state.questions.length) {
      finishPractice();
    } else {
      showQuestion();
    }
  }

  function finishPractice() {
    const attempted = state.answers.filter(answer => answer !== null && answer !== undefined).length;
    const correct = state.score;
    const percent = attempted ? Math.round(correct / attempted * 100) : 0;

    state.progress.attempted += attempted;
    state.progress.correct += correct;

    state.progress.history.unshift({
      date: new Date().toLocaleDateString("en-CA"),
      subject: $("practiceSubject")?.value || "All",
      attempted,
      correct,
      accuracy: percent
    });

    state.progress.history = state.progress.history.slice(0, 100);

    save("project_iqbal_progress", state.progress);

    if ($("quizArea")) $("quizArea").hidden = true;
    if ($("quizResults")) $("quizResults").hidden = false;

    setText("resultAttempted", attempted);
    setText("resultCorrect", correct);
    setText("resultAccuracy", percent + "%");
    setText(
      "resultMessage",
      percent >= 80 ? "Excellent work!" :
      percent >= 50 ? "Good effort. Keep practising!" :
      "Revise the lesson and try again."
    );

    updateDashboard();
  }

  $("restartPracticeBtn")?.addEventListener("click", () => {
    startPractice($("practiceSubject")?.value || "All");
  });

  // MOCK TESTS

  function renderTests() {
    const grid = $("mockTestGrid");
    if (!grid) return;

    grid.innerHTML = DATA.mockTests.map(test => `
      <article class="card">
        <h3>${escapeHTML(test.title)}</h3>
        <p>${escapeHTML(test.description)}</p>
        <p>Duration: ${test.durationMinutes} minutes</p>
        <button class="btn primary" data-test="${escapeHTML(test.subject)}">
          Start Test
        </button>
      </article>
    `).join("");

    all("[data-test]").forEach(button => {
      button.addEventListener("click", () => {
        showPage("practice");
        if ($("practiceSubject")) {
          $("practiceSubject").value =
            button.dataset.test === "All" ? "All" : button.dataset.test;
        }
        startPractice(button.dataset.test);
      });
    });

    const history = $("testHistory");
    if (history) {
      history.innerHTML = state.progress.history.slice(0, 10).map(item => `
        <p>${escapeHTML(item.date)} — ${escapeHTML(item.subject)}:
        ${item.correct}/${item.attempted} correct (${item.accuracy}%)</p>
      `).join("") || "<p>No tests attempted yet.</p>";
    }
  }

  // CONSTITUTION

  function renderConstitution() {
    const grid = $("constitutionGrid");
    if (!grid) return;

    const search = ($("constitutionSearch")?.value || "").toLowerCase();

    const items = DATA.constitution.filter(item =>
      `${item.title} ${item.tag} ${item.content}`
        .toLowerCase().includes(search)
    );

    grid.innerHTML = items.map(item => `
      <article class="card">
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.tag)}</p>
        <details>
          <summary>Read Notes</summary>
          <div>${item.content}</div>
        </details>
      </article>
    `).join("") || "<p>No results found.</p>";
  }

  $("constitutionSearch")?.addEventListener("input", renderConstitution);

  // NOTES

  $("noteForm")?.addEventListener("submit", event => {
    event.preventDefault();

    const id = $("noteId")?.value;
    const title = $("noteTitle")?.value.trim();
    const subject = $("noteSubject")?.value || "General";
    const content = $("noteContent")?.value.trim();

    if (!title || !content) {
      toast("Title aur note content likho.");
      return;
    }

    if (id) {
      const note = state.notes.find(item => item.id === id);
      if (note) Object.assign(note, { title, subject, content });
    } else {
      state.notes.unshift({
        id: String(Date.now()),
        title,
        subject,
        content,
        date: new Date().toLocaleDateString("en-CA")
      });
    }

    save("project_iqbal_notes", state.notes);
    $("noteForm").reset();
    if ($("noteId")) $("noteId").value = "";

    renderNotes();
    toast("Note saved!");
  });

  function renderNotes() {
    const list = $("notesList");
    if (!list) return;

    const search = ($("noteSearch")?.value || "").toLowerCase();

    const notes = state.notes.filter(note =>
      `${note.title} ${note.subject} ${note.content}`
        .toLowerCase().includes(search)
    );

    list.innerHTML = notes.map(note => `
      <article class="card">
        <h3>${escapeHTML(note.title)}</h3>
        <p>${escapeHTML(note.subject)} · ${escapeHTML(note.date || "")}</p>
        <p>${escapeHTML(note.content)}</p>
        <button class="btn" data-edit-note="${escapeHTML(note.id)}">Edit</button>
        <button class="btn" data-delete-note="${escapeHTML(note.id)}">Delete</button>
      </article>
    `).join("") || "<p>No notes yet. Create your first note!</p>";

    all("[data-edit-note]").forEach(button => {
      button.addEventListener("click", () => {
        const note = state.notes.find(item => item.id === button.dataset.editNote);
        if (!note) return;

        $("noteId").value = note.id;
        $("noteTitle").value = note.title;
        $("noteSubject").value = note.subject;
        $("noteContent").value = note.content;
        $("noteTitle").focus();
      });
    });

    all("[data-delete-note]").forEach(button => {
      button.addEventListener("click", () => {
        if (!confirm("Delete this note?")) return;

        state.notes = state.notes.filter(
          note => note.id !== button.dataset.deleteNote
        );

        save("project_iqbal_notes", state.notes);
        renderNotes();
        toast("Note deleted.");
      });
    });
  }

  $("noteSearch")?.addEventListener("input", renderNotes);

  $("cancelEditBtn")?.addEventListener("click", () => {
    $("noteForm")?.reset();
    if ($("noteId")) $("noteId").value = "";
  });

  // PROGRESS + EXPORT / IMPORT / RESET

  function renderProgress() {
    setText("progressAttempted", state.progress.attempted);
    setText("progressCorrect", state.progress.correct);
    setText("progressAccuracy", accuracy() + "%");

    const total = DATA.subjects.reduce(
      (sum, subject) => sum + subject.topics.length, 0
    );

    const completed = state.progress.lessons.length;
    const percent = total ? Math.round(completed / total * 100) : 0;

    if ($("topicProgressBar")) {
      $("topicProgressBar").style.width = percent + "%";
    }

    setText("topicProgressText", `${completed} / ${total} topics`);

    const history = $("practiceHistory");
    if (history) {
      history.innerHTML = state.progress.history.slice(0, 20).map(item => `
        <article class="card">
          <p>${escapeHTML(item.date)} — ${escapeHTML(item.subject)}</p>
          <p>Correct: ${item.correct}/${item.attempted}</p>
          <p>Accuracy: ${item.accuracy}%</p>
        </article>
      `).join("") || "<p>Practice history will appear here.</p>";
    }
  }

  $("exportDataBtn")?.addEventListener("click", () => {
    const backup = {
      notes: state.notes,
      progress: state.progress,
      target: state.target
    };

    const blob = new Blob(
      [JSON.stringify(backup, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "project-iqbal-backup.json";
    link.click();
    URL.revokeObjectURL(url);

    toast("Backup downloaded!");
  });

  $("importDataFile")?.addEventListener("change", async event => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const backup = JSON.parse(await file.text());

      if (Array.isArray(backup.notes)) {
        state.notes = backup.notes;
        save("project_iqbal_notes", state.notes);
      }

      if (backup.progress && typeof backup.progress === "object") {
        state.progress = {
          attempted: Number(backup.progress.attempted) || 0,
          correct: Number(backup.progress.correct) || 0,
          history: Array.isArray(backup.progress.history) ? backup.progress.history : [],
          lessons: Array.isArray(backup.progress.lessons) ? backup.progress.lessons : []
        };
        save("project_iqbal_progress", state.progress);
      }

      if (Number.isFinite(backup.target) && backup.target > 0) {
        state.target = Math.floor(backup.target);
        save("project_iqbal_target", state.target);
      }

      renderNotes();
      renderProgress();
      updateDashboard();
      toast("Backup imported successfully!");
    } catch {
      toast("Invalid backup file.");
    }

    event.target.value = "";
  });

  $("resetProgressBtn")?.addEventListener("click", () => {
    if (!confirm("Reset all practice progress? This cannot be undone.")) return;

    state.progress = {
      attempted: 0,
      correct: 0,
      history: [],
      lessons: []
    };

    save("project_iqbal_progress", state.progress);
    renderProgress();
    updateDashboard();
    toast("Progress reset.");
  });

  // START WEBSITE

  renderExams();
  renderSubjects();
  renderTests();
  renderConstitution();
  renderNotes();
  renderProgress();
  updateDashboard();
  showPage("home");

  console.log("PROJECT IQBAL loaded successfully.");
});
