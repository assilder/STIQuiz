const nameContainer = document.getElementById("name-container");
const startBtn = document.getElementById("start-btn");
const playerNameInput = document.getElementById("player-name");
const playerDisplay = document.getElementById("player-display");
const footerPlayer = document.getElementById("footer-player");

const quizContainer = document.getElementById("quiz-container");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");

const scoreContainer = document.getElementById("score-container");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

const leaderboardCard = document.getElementById("leaderboard-card");
const leaderboardEl = document.getElementById("leaderboard");
const clearBtn = document.getElementById("clear-btn");

// Navbar
const navQuiz = document.getElementById("nav-quiz");
const navScore = document.getElementById("nav-score");
const navLeaderboard = document.getElementById("nav-leaderboard");

let player = localStorage.getItem("player") || "";
let usedQuestions = JSON.parse(localStorage.getItem("usedQuestions")) || [];
let current = 0;
let score = 0;

// الأسئلة (هنا مثال 20 سؤال، يمكن تزيد أكثر)
let allQuestions = [
  {"question":"En Java, quel mot-clé est utilisé pour hériter d'une classe ?","options":["extends","implements","inherits","super"],"answer":"extends"},
  {"question":"Comment déclarer une constante en Java ?","options":["final int x = 10;","const int x = 10;","int x = 10;","let x = 10;"],"answer":"final int x = 10;"},
  {"question":"Quel élément HTML est utilisé pour créer un formulaire ?","options":["<form>","<input>","<label>","<fieldset>"],"answer":"<form>"},
  {"question":"Comment lier un fichier CSS externe à un HTML ?","options":["<link rel='stylesheet' href='style.css'>","<style src='style.css'>","<css href='style.css'>","<link src='style.css'>"],"answer":"<link rel='stylesheet' href='style.css'>"},
  {"question":"Quelle propriété CSS modifie l'espacement entre les lettres ?","options":["letter-spacing","text-spacing","word-spacing","line-height"],"answer":"letter-spacing"},
  {"question":"En SQL, quel mot-clé est utilisé pour supprimer une table ?","options":["DROP TABLE","DELETE TABLE","REMOVE TABLE","TRUNCATE TABLE"],"answer":"DROP TABLE"},
  {"question":"Comment créer un lien hypertexte en HTML ?","options":["<a href='url'>texte</a>","<link>","<url>","<href>"],"answer":"<a href='url'>texte</a>"},
  {"question":"En Java, quel type primitif pour une valeur vraie/fausse ?","options":["boolean","int","char","double"],"answer":"boolean"},
  {"question":"En CSS, quelle propriété permet de créer un contour arrondi ?","options":["border-radius","border-round","radius","corner-radius"],"answer":"border-radius"},
  {"question":"En Java, comment appelle-t-on un constructeur par défaut ?","options":["new NomClasse()","NomClasse()","init()","constructor()"],"answer":"new NomClasse()"},
  {"question":"Comment centrer un texte horizontalement en CSS ?","options":["text-align:center;","align:center;","justify:center;","center-text;"],"answer":"text-align:center;"},
  {"question":"En HTML, quel élément sert à créer une liste à puces ?","options":["<ul>","<ol>","<li>","<list>"],"answer":"<ul>"},
  {"question":"Quel mot-clé Java permet d'implémenter une interface ?","options":["implements","extends","interface","inherit"],"answer":"implements"},
  {"question":"Comment ajouter un commentaire multi-lignes en CSS ?","options":["/* commentaire */","// commentaire","<!-- commentaire -->","# commentaire"],"answer":"/* commentaire */"},
  {"question":"En SQL, comment limiter le nombre de résultats ?","options":["LIMIT","TOP","MAX","ROWNUM"],"answer":"LIMIT"},
  {"question":"Comment déclarer un tableau d'entiers en Java ?","options":["int[] tab = new int[5];","int tab[5];","array int tab = new int[5];","int tab = new array[5];"],"answer":"int[] tab = new int[5];"},
  {"question":"Quel élément HTML affiche une image cliquable ?","options":["<a><img></a>","<img>","<button><img></button>","<link>"],"answer":"<a><img></a>"},
  {"question":"En CSS, quelle propriété modifie la taille de la police ?","options":["font-size","text-size","size","font-style"],"answer":"font-size"},
  {"question":"Quel mot-clé SQL combine deux tables ?","options":["JOIN","MERGE","COMBINE","CONNECT"],"answer":"JOIN"},
  {"question":"Comment créer un bouton en HTML ?","options":["<button>Texte</button>","<btn>Texte</btn>","<input type='button'>","<a>Texte</a>"],"answer":"<button>Texte</button>"},
  {"question":"En Java, comment vérifier l'égalité de deux objets ?","options":["obj1.equals(obj2)","obj1==obj2","obj1.eq(obj2)","obj1.equal(obj2)"],"answer":"obj1.equals(obj2)"},
  {"question":"Comment définir un arrière-plan dégradé en CSS ?","options":["background: linear-gradient(...)","background-color: gradient(...)","bg-gradient(...)","gradient: linear(...)"],"answer":"background: linear-gradient(...)"},
  {"question":"En SQL, quelle commande supprime des lignes ?","options":["DELETE FROM table WHERE ...;","DROP TABLE ...;","REMOVE FROM ...;","TRUNCATE ...;"],"answer":"DELETE FROM table WHERE ...;"},
  {"question":"Quel élément HTML contient le titre de la page ?","options":["<title>","<h1>","<header>","<head>"],"answer":"<title>"},
  {"question":"En Java, comment déclarer une variable flottante ?","options":["float x = 1.5f;","double x = 1.5;","int x = 1.5;","var x = 1.5;"],"answer":"float x = 1.5f"},
  {"question":"Comment centrer un bloc en CSS ?","options":["margin:0 auto;","text-align:center;","align:center;","center:block;"],"answer":"margin:0 auto;"},
  {"question":"Quel mot-clé Java arrête une boucle prématurément ?","options":["break","continue","stop","exit"],"answer":"break"},
  {"question":"Comment créer un tableau HTML ?","options":["<table>","<tab>","<grid>","<tr>"],"answer":"<table>"},
  {"question":"En CSS, quelle propriété change la police ?","options":["font-family","font-style","text-font","typeface"],"answer":"font-family"},
  {"question":"Comment ajouter un identifiant à un élément HTML ?","options":["id='monId'","class='monId'","name='monId'","ident='monId'"],"answer":"id='monId'"},
  {"question":"En SQL, comment renommer une table ?","options":["ALTER TABLE old_name RENAME TO new_name;","RENAME TABLE old TO new;","MODIFY TABLE old TO new;","CHANGE TABLE old TO new;"],"answer":"ALTER TABLE old_name RENAME TO new_name;"},
  {"question":"Quel mot-clé Java permet d'arrêter une méthode et retourner une valeur ?","options":["return","exit","break","stop"],"answer":"return"},
  {"question":"Comment appliquer une bordure à un élément CSS ?","options":["border:1px solid #000;","border-style:solid;","border-width:1px;","border-color:#000;"],"answer":"border:1px solid #000;"},
  {"question":"En HTML, quel élément crée un champ texte ?","options":["<input type='text'>","<textarea>","<field>","<text>"],"answer":"<input type='text'>"},
  {"question":"Quel mot-clé Java permet de créer une boucle infinie ?","options":["while(true)","for(;;)","do{}while(true)","Toutes les réponses"],"answer":"Toutes les réponses"},
  {"question":"Comment ajouter une marge en CSS ?","options":["margin:20px;","padding:20px;","space:20px;","gap:20px;"],"answer":"margin:20px;"},
  {"question":"Quel élément HTML définit un paragraphe ?","options":["<p>","<div>","<span>","<text>"],"answer":"<p>"},
  {"question":"En CSS, quelle propriété contrôle l'opacité ?","options":["opacity","transparent","visibility","alpha"],"answer":"opacity"},
  {"question":"Comment créer un champ obligatoire en HTML ?","options":["<input required>","<input mandatory>","<input must>","<input need>"],"answer":"<input required>"},
  {"question":"En SQL, quelle clause est utilisée pour regrouper les résultats ?","options":["GROUP BY","ORDER BY","WHERE","LIMIT"],"answer":"GROUP BY"},
  {"question":"Comment créer un élément de liste HTML ?","options":["<li>","<ul>","<ol>","<list>"],"answer":"<li>"},
  {"question":"En Java, quel mot-clé crée une interface ?","options":["interface","implements","extends","class"],"answer":"interface"},
  {"question":"Comment changer la couleur d'un texte inline en HTML ?","options":["<span style='color:red;'>","<p color='red'>","<text color='red'>","<font color='red'>"],"answer":"<span style='color:red;'>"},
  {"question":"En CSS, quelle propriété change le style de la bordure ?","options":["border-style","border-color","border-width","border-radius"],"answer":"border-style"},
  {"question":"En Java, quel mot-clé est utilisé pour déclarer une classe abstraite ?","options":["abstract","interface","extends","final"],"answer":"abstract"},
  {"question":"Quel élément HTML est utilisé pour insérer une ligne horizontale ?","options":["<hr>","<line>","<break>","<hl>"],"answer":"<hr>"},
  {"question":"En CSS, quelle propriété change la couleur du texte ?","options":["color","text-color","font-color","text-style"],"answer":"color"},
  {"question":"En SQL, quel mot-clé est utilisé pour ajouter une nouvelle ligne ?","options":["INSERT INTO","ADD ROW","NEW ENTRY","CREATE ROW"],"answer":"INSERT INTO"},
  {"question":"Comment créer une liste ordonnée en HTML ?","options":["<ol>","<ul>","<li>","<list>"],"answer":"<ol>"},
  {"question":"En Java, comment déclarer un tableau de chaînes de caractères ?","options":["String[] tab = new String[5];","String tab[5];","array String tab = new String[5];","String tab = new array[5];"],"answer":"String[] tab = new String[5];"},
  {"question":"Quelle propriété CSS contrôle la largeur d'un élément ?","options":["width","size","length","max-width"],"answer":"width"},
  {"question":"En SQL, quelle commande permet de modifier des données existantes ?","options":["UPDATE","MODIFY","ALTER","CHANGE"],"answer":"UPDATE"},
  {"question":"En Java, quel mot-clé permet de créer un objet ?","options":["new","create","instance","object"],"answer":"new"},
  {"question":"Comment insérer un commentaire en HTML ?","options":["<!-- commentaire -->","/* commentaire */","// commentaire","# commentaire"],"answer":"<!-- commentaire -->"},
  {"question":"En CSS, quelle propriété définit l'espacement entre les lignes ?","options":["line-height","letter-spacing","word-spacing","spacing"],"answer":"line-height"},
  {"question":"En SQL, comment trier les résultats par ordre croissant ?","options":["ORDER BY ... ASC","ORDER BY ... DESC","SORT ASC","SORT BY ASC"],"answer":"ORDER BY ... ASC"},
  {"question":"Quel élément HTML affiche un texte en gras ?","options":["<b>","<strong>","<bold>","<text>"],"answer":"<b>"},
  {"question":"En Java, quel mot-clé permet de gérer une exception ?","options":["try","catch","throw","finally"],"answer":"try"},
  {"question":"Comment lier un fichier JavaScript externe à un HTML ?","options":["<script src='script.js'></script>","<js src='script.js'>","<script href='script.js'>","<link rel='script' href='script.js'>"],"answer":"<script src='script.js'></script>"},
  {"question":"En CSS, quelle propriété change le style des bordures ?","options":["border-style","border-width","border-color","border-radius"],"answer":"border-style"},
  {"question":"En SQL, quel mot-clé combine plusieurs conditions dans WHERE ?","options":["AND","OR","NOT","XOR"],"answer":"AND"},
  {"question":"Quel élément HTML est utilisé pour un champ mot de passe ?","options":["<input type='password'>","<input type='text'>","<password>","<pwd>"],"answer":"<input type='password'>"},
  {"question":"En Java, quel mot-clé permet de déclarer une constante ?","options":["final","const","static","immutable"],"answer":"final"},
  {"question":"Comment créer un bouton radio en HTML ?","options":["<input type='radio'>","<input type='button'>","<radio>","<btn radio>"],"answer":"<input type='radio'>"},
  {"question":"En CSS, quelle propriété modifie l'arrière-plan d'un élément ?","options":["background","background-color","bgcolor","color"],"answer":"background-color"},
  {"question":"En SQL, comment supprimer une table entière ?","options":["DROP TABLE","DELETE TABLE","REMOVE TABLE","TRUNCATE TABLE"],"answer":"DROP TABLE"},
  {"question":"En Java, comment créer une boucle qui s'exécute tant qu'une condition est vraie ?","options":["while(condition)","for(condition)","do...while(condition)","loop(condition)"],"answer":"while(condition)"},
  {"question":"Quel élément HTML est utilisé pour insérer une image ?","options":["<img>","<image>","<photo>","<pic>"],"answer":"<img>"},
  {"question":"Comment centrer un élément horizontalement en CSS ?","options":["margin:0 auto;","text-align:center;","align:center;","center:block;"],"answer":"margin:0 auto;"},
  {"question":"En SQL, quelle commande supprime seulement certaines lignes ?","options":["DELETE FROM ... WHERE ...;","DROP TABLE ...;","REMOVE ROW ...;","TRUNCATE ...;"],"answer":"DELETE FROM ... WHERE ...;"},
  {"question":"En Java, comment déclarer une variable de type entier ?","options":["int x = 5;","integer x = 5;","var x = 5;","num x = 5;"],"answer":"int x = 5;"},
  {"question":"Quel élément HTML définit un titre de premier niveau ?","options":["<h1>","<h2>","<header>","<title>"],"answer":"<h1>"},
  {"question":"En CSS, quelle propriété modifie la police d'un texte ?","options":["font-family","text-font","font-style","typeface"],"answer":"font-family"},
  {"question":"En SQL, quelle commande permet de créer une table ?","options":["CREATE TABLE","NEW TABLE","ADD TABLE","MAKE TABLE"],"answer":"CREATE TABLE"},
  {"question":"En Java, quel mot-clé permet de déclarer une méthode qui ne retourne rien ?","options":["void","null","empty","none"],"answer":"void"},
  {"question":"Comment insérer un saut de ligne en HTML ?","options":["<br>","<break>","<line>","<lb>"],"answer":"<br>"},
  {"question":"En CSS, quelle propriété change la couleur de texte au survol ?","options":["color:hover","hover-color","text-hover","color"],"answer":"color"},
  {"question":"Quel élément HTML contient le corps de la page ?","options":["<body>","<head>","<html>","<main>"],"answer":"<body>"},
  {"question":"En SQL, quelle clause filtre les résultats ?","options":["WHERE","ORDER BY","GROUP BY","LIMIT"],"answer":"WHERE"},
  {"question":"Comment déclarer un tableau de flottants en Java ?","options":["float[] tab = new float[5];","float tab[5];","array float tab = new float[5];","float tab = new array[5];"],"answer":"float[] tab = new float[5];"},
  {"question":"Quel élément HTML crée un champ texte multi-lignes ?","options":["<textarea>","<input type='text'>","<input type='textarea'>","<text>"],"answer":"<textarea>"},
  {"question":"En CSS, quelle propriété modifie la largeur d'un élément ?","options":["width","height","size","max-width"],"answer":"width"},
  {"question":"En SQL, quel mot-clé sert à trier les résultats par ordre décroissant ?","options":["ORDER BY ... DESC","ORDER BY ... ASC","SORT DESC","SORT ASC"],"answer":"ORDER BY ... DESC"},
  {"question":"Comment ajouter un identifiant à un élément HTML ?","options":["id='monId'","class='monId'","name='monId'","ident='monId'"],"answer":"id='monId'"},
  {"question":"En Java, comment comparer deux nombres entiers ?","options":["==","equals()","compare()","isEqual()"],"answer":"=="},
  {"question":"En CSS, quelle propriété définit la marge intérieure ?","options":["padding","margin","spacing","gap"],"answer":"padding"},
  {"question":"En SQL, quel mot-clé permet de regrouper les résultats par une colonne ?","options":["GROUP BY","ORDER BY","WHERE","HAVING"],"answer":"GROUP BY"},
  {"question":"Quel élément HTML définit un paragraphe ?","options":["<p>","<div>","<span>","<text>"],"answer":"<p>"},
  {"question":"En Java, quel mot-clé permet de terminer une boucle prématurément ?","options":["break","continue","stop","exit"],"answer":"break"},
  {"question":"Comment créer un lien ouvrant dans un nouvel onglet ?","options":["<a href='url' target='_blank'>","<a href='url' newtab>","<link href='url' target='new'>","<a href='url' blank>"],"answer":"<a href='url' target='_blank'>"},
  {"question":"En CSS, quelle propriété modifie l'opacité d'un élément ?","options":["opacity","transparent","alpha","visibility"],"answer":"opacity"},
  {"question":"En SQL, quel mot-clé supprime seulement certaines lignes ?","options":["DELETE FROM table WHERE ...;","DROP TABLE ...;","REMOVE FROM ...;","TRUNCATE ...;"],"answer":"DELETE FROM table WHERE ...;"},
  {"question":"Comment créer un champ obligatoire en HTML ?","options":["<input required>","<input must>","<input mandatory>","<input need>"],"answer":"<input required>"},
];

// ==================== الوظائف ====================

// تسجيل اللاعب
function startGame(){
  if(playerNameInput.value.trim()==="") return alert("Veuillez entrer votre nom!");
  player = playerNameInput.value.trim();
  localStorage.setItem("player", player);
  playerDisplay.textContent = "Joueur : " + player;
  footerPlayer.textContent = player;
  nameContainer.style.display="none";
  quizContainer.style.display="block";
  current=0;
  score=0;
  usedQuestions = [];
  localStorage.setItem("usedQuestions", JSON.stringify(usedQuestions));
  selectRandomQuestions();
  showQuestion();
}

startBtn.addEventListener("click", startGame);

// اختيار 10 أسئلة عشوائية
let quiz = [];
function selectRandomQuestions(){
  shuffleArray(allQuestions);
  quiz = allQuestions.slice(0,10); // أول 10 أسئلة
}

// خلط العناصر
function shuffleArray(array){
  for(let i=array.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [array[i],array[j]]=[array[j],array[i]];
  }
  return array;
}

// عرض السؤال
function showQuestion(){
  if(current>=quiz.length){ showScore(); return; }
  let q = quiz[current];
  let options = shuffleArray([...q.options]);
  questionEl.textContent = q.question;
  optionsEl.innerHTML="";
  options.forEach(opt=>{
    const btn=document.createElement("button");
    btn.textContent=opt;
    btn.onclick=()=>checkAnswer(opt);
    optionsEl.appendChild(btn);
  });
}

// التحقق من الإجابة
function checkAnswer(opt){
  const buttons = [...optionsEl.querySelectorAll("button")];
  buttons.forEach(b=>b.disabled=true);
  let clicked = buttons.find(b=>b.textContent===opt);
  if(opt === quiz[current].answer){
    score++;
    clicked.classList.add("correct");
  }else{
    clicked.classList.add("wrong");
    buttons.forEach(b=>{
      if(b.textContent===quiz[current].answer) b.classList.add("correct-reveal");
    });
  }
  current++;
  setTimeout(showQuestion, 1000);
}

// عرض Score
function showScore(){
  quizContainer.style.display="none";
  scoreContainer.style.display="block";
  scoreEl.textContent=score;
  saveScore(score);
  displayLeaderboard();
}

// حفظ النقاط
function saveScore(s){
  let scores = JSON.parse(localStorage.getItem("leaderboard")) || [];
  scores.push({name:player, score:s});
  scores.sort((a,b)=>b.score-a.score);
  localStorage.setItem("leaderboard", JSON.stringify(scores.slice(0,5)));
}

// عرض Leaderboard
function displayLeaderboard(){
  leaderboardEl.innerHTML="";
  let scores = JSON.parse(localStorage.getItem("leaderboard")) || [];
  scores.forEach(s=>{
    const li=document.createElement("li");
    li.textContent=`${s.name} - ${s.score}`;
    leaderboardEl.appendChild(li);
  });
}

// إعادة اللعبة
restartBtn.addEventListener("click", ()=>{
  current=0; score=0;
  quizContainer.style.display="block";
  scoreContainer.style.display="none";
  selectRandomQuestions();
  showQuestion();
});

// مسح Leaderboard
clearBtn.addEventListener("click", ()=>{
  if(confirm("Voulez-vous vraiment supprimer tous les scores ?")){
    localStorage.removeItem("leaderboard");
    leaderboardEl.innerHTML="";
    alert("Tous les scores ont été supprimés !");
  }
});

// Navbar
navQuiz.addEventListener("click", ()=>{
  quizContainer.style.display="block";
  scoreContainer.style.display="none";
  leaderboardCard.style.display="none";
});
navScore.addEventListener("click", ()=>{
  quizContainer.style.display="none";
  scoreContainer.style.display="block";
  leaderboardCard.style.display="none";
});
navLeaderboard.addEventListener("click", ()=>{
  quizContainer.style.display="none";
  scoreContainer.style.display="none";
  leaderboardCard.style.display="block";
});

// بدء اللعبة مباشرة لو الاسم محفوظ
if(player){
  playerDisplay.textContent = "Joueur : " + player;
  footerPlayer.textContent = player;
  nameContainer.style.display="none";
  quizContainer.style.display="block";
  current=0; score=0;
  selectRandomQuestions();
  showQuestion();
}
document.getElementById('annee').innerHTML=new Date().getFullYear()
