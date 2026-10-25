/* CODE · the app (moved out of app.html so the page itself arrives and paints fast; loaded with defer, runs in this order) */
try{ const q=new URLSearchParams(location.search), pc=(q.get('promo')||q.get('p')||'').trim(); if(/^[A-Za-z0-9_-]{2,30}$/.test(pc)) localStorage.setItem('code-promo',pc.toUpperCase()); }catch(_){}
;
const TR=window.TR||{};
/* ---------- content localization: every Ukrainian source string is looked up by hash in TR[lang] ---------- */
const _H=s=>{let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,0x01000193);}return (h>>>0).toString(36);};
const _TC={};
function _t(s){ if(typeof LANG==='undefined'||LANG==='uk') return s; const d=TR[LANG]; if(!d) return s;
  const c=_TC[LANG]||(_TC[LANG]=new Map()); let v=c.get(s); if(v===undefined){ v=d[_H(s)]; if(v==null) v=s; c.set(s,v); } return v; }
function _f(s,a){ return _t(s).replace(/\{(\d+)\}/g,(m,i)=>String(a[+i])); }
const LOC=()=>({uk:'uk-UA',en:'en-GB',de:'de-DE',fr:'fr-FR',es:'es-ES',it:'it-IT'})[typeof LANG==='undefined'?'uk':LANG]||'uk-UA';
let __L10N=null;
function __snap(o,seen){ if(typeof o==='string') return o; if(!o||typeof o!=='object') return undefined;
  if(Array.isArray(o)) return o.map(x=>__snap(x,seen)); const r={}; for(const k of Object.keys(o)){ const v=__snap(o[k],seen); if(v!==undefined) r[k]=v; } return r; }
function __apply(live,orig){ if(!live||!orig) return; for(const k of Object.keys(orig)){ const o=orig[k]; if(typeof o==='string'){ live[k]=_t(o); } else if(o&&typeof o==='object') __apply(live[k],o); } }
function L10N_init(){
  const G={}; const names=['ARC','EX','CHAK','EX2','EX3','EX4','YR','NAMED','LINES','POS','SEG','MONTHS','MONTHN','DAY','LVLW','WD','WDS','DSPH','PPOS','AUTH_ERR','GD','PLAN_DAYS','SPH_FOCUS','XCALC','XLAB','PGD','PROG_ROLES','SPREADS'];
  if(!__L10N){
    const CYR=/[А-Яа-яЇїІіЄєҐґ]/, texts=[], attrs=[];
    const w=document.createTreeWalker(document.documentElement,NodeFilter.SHOW_TEXT);
    for(let n=w.nextNode();n;n=w.nextNode()){ const p=n.parentElement; if(!p||/^(SCRIPT|STYLE)$/.test(p.tagName)||p.closest('[data-i18n]')) continue; if(CYR.test(n.nodeValue)) texts.push([n,n.nodeValue]); }
    document.querySelectorAll('[aria-label],[title],[placeholder],[data-tip],[alt]').forEach(e=>{
      for(const a of ['aria-label','title','placeholder','data-tip','alt']){ if(!e.hasAttribute(a)) continue; if(a==='aria-label'&&e.hasAttribute('data-i18n-al')) continue; if(a==='placeholder'&&e.hasAttribute('data-i18n-ph')) continue; const v=e.getAttribute(a); if(CYR.test(v)) attrs.push([e,a,v]); } });
    __L10N={D:{},orig:{},texts,attrs};
  }
  for(const k of names){ if(__L10N.D[k]) continue; let v; try{ v=(0,eval)(k); }catch(_){ continue; } __L10N.D[k]=v; __L10N.orig[k]=__snap(v); }
  L10N_apply();
}
function L10N_apply(){
  if(!__L10N) return; const {D,orig,texts,attrs}=__L10N;
  for(const k in D) __apply(D[k],orig[k]);
  for(const [n,v] of texts){ const m=v.match(/^(\s*)([\s\S]*?)(\s*)$/); n.nodeValue=m[1]+_t(m[2])+m[3]; }
  for(const [e,a,v] of attrs){ if(e.isConnected||true) { if(a==='title'&&!e.hasAttribute('title')&&e.dataset.tip){ e.dataset.tip=_t(v); continue; } e.setAttribute(a,_t(v)); } }
  document.documentElement.style.setProperty('--meta-pre',JSON.stringify(_t('[ карта чакр ]  ')));
}
window.__l10nDump=()=>{ const out=new Map(); const CYR=/[А-Яа-яЇїІіЄєҐґ]/;
  const rec=(o,path)=>{ if(typeof o==='string'){ if(CYR.test(o)&&!out.has(o)) out.set(o,path); return; } if(o&&typeof o==='object') for(const k of Object.keys(o)) rec(o[k],path+'.'+k); };
  for(const k in __L10N.orig) rec(__L10N.orig[k],k); for(const [n,v] of __L10N.texts){ if(!out.has(v.trim())) out.set(v.trim(),'html'); } for(const x of __L10N.attrs) if(!out.has(x[2])) out.set(x[2],'attr'); return [...out]; };

;


/* ---------- interface languages ---------- */
const LANGS=[['uk','UA','Українська'],['en','EN','English'],['de','DE','Deutsch'],['fr','FR','Français'],['es','ES','Español'],['it','IT','Italiano']];
const MONTHN_L={
 uk:["Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень"],
 en:["January","February","March","April","May","June","July","August","September","October","November","December"],
 de:["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
 fr:["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],
 es:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
 it:["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"]};
const I18N={
uk:{solo:"Особиста",pair:"Сумісність",name:"Ім’я",namePh:"Як вас звати",day:"День",month:"Місяць",year:"Рік",fem:"Жінка",male:"Чоловік",calc:"Розрахувати",p1:"Партнер 1",p2:"Партнер 2",errDate:"Оберіть день, місяць і рік народження.",errPair:"Вкажіть дати народження обох партнерів.",
 mSolo:"Особиста матриця",mPair:"Сумісність",mToday:"Енергія дня",mYears:"Прогноз по роках",mCat:"Довідник арканів",mLogin:"Вхід і реєстрація",mCab:"Кабінет",contacts:"контакти",lang:"мова",langNote:"",mNote:"Матриця долі за методом Наталії Ладіні. Інструмент самопізнання, а не прогноз чи діагноз.",menu:"Меню",closeMenu:"Закрити меню",
 eyebrow:"матриця долі · метод Наталії Ладіні",sT1:"Розрахуй",sT2:"свій код",sLead:"Дата народження — це шифр. Введіть її нижче — і 22 аркани складуться в карту вашого характеру, талантів, кармічних завдань і призначення.",sGo:"Розрахувати свій код",sMine:"Моя матриця",sCab:"Мій кабінет",
 aT1:"Ваш",aT2:"код долі",aT3:"в одному кабінеті",aLead:"Розрахувати матрицю можна просто у формі вище, без реєстрації. Акаунт потрібен, щоб зберігати коди, додавати матриці в обране й не вводити дані щоразу.",aP1:"Особисті дані для розрахунку — один раз",aP2:"Збережені коди: ваші, близьких і пар",aP3:"Обране і PDF-звіт в один дотик",aBack:"← Повернутися до розрахунку",aCat:"Довідник 22 арканів ↗",aLogin:"Вхід",aReg:"Реєстрація",aHLogin:"З поверненням",aHReg:"Створіть акаунт",aSubLogin:"Ваші збережені коди, обране й історія вже чекають на вас.",aSubReg:"Це займе хвилину — далі дані для розрахунку підставлятимуться самі.",aApple:"Продовжити з Apple",aGoogle:"Продовжити з Google",aOr:"або email",aEmail:"Email",aPw:"Пароль",aPwLogin:"Ваш пароль",aPwReg:"Латиниця, без пробілів",aBtnLogin:"Увійти",aBtnReg:"Створити акаунт",aNo:"Немає акаунта?",aNoB:"Створити",aHave:"Вже є акаунт?",aHaveB:"Увійти",aFine:"Прототип: акаунт і збережені коди зберігаються лише в цьому браузері.",aSso:"Вхід через {x} запрацює після підключення сервера авторизації. Поки що скористайтеся email.",aBadEmail:"Вкажіть коректний email.",aShortPw:"Пароль — латинські літери, цифри чи символи, без пробілів.",aPwHint:"Латинські символи без пробілів, регістр будь-який. Рекомендовано додати цифри.",
 cK:"кабінет",cHi:"Вітаємо,",cFriend:"друже",cBack:"← До розрахунку",cOut:"Вийти",cData:"особисті дані",cSave:"Зберегти",cCalc:"Розрахувати мою матрицю",cNote:"Ці дані підставляються у форму розрахунку автоматично.",cSaved:"збережені коди",cEmpty1:"Тут з’являться матриці, які ви додасте в обране.",cEmpty2:"Розрахуйте матрицю і натисніть іконку закладки поруч з іменем.",
 rMatrix:"Матриця",rYour:"Ваша",rDestiny:"матриця долі",rPair:"Сумісність",tMatrix:"Матриця",tToday:"Сьогодні",tYears:"Прогноз по роках",tArc:"Аркани",tPair:"Матриця пари",rCenter:"Центр",rTail:"Кармічний хвіст",rYear:"Цей рік",rUnion:"Енергія союзу",rKProg:"Кармічна програма",rPurp:"Призначення пари",rDl:"Завантажити код",rF:"жінка",rM:"чоловік",rAge:"р.",rOverlay:"повне накладання матриць",bmAdd:"Додати в обране",bmDel:"Прибрати з обраного",
 ftLead:"CODE — простір самопізнання. Усе є енергія — досліджуйте свою.",ftSec:"Розділи",ftCalc:"Розрахунки",ftMeth:"Метод",ftM1:"Матриця долі Наталії Ладіні",ftM2:"22 Старші Аркани",ftM3:"Карта здоров’я, програми, роки",chData:"Змінити дані",aAgree1:"Погоджуюся з",aAgree2:"політикою конфіденційності",aNeedAgree:"Підтвердіть згоду з політикою конфіденційності.",aHelp:"Довідка",aTerms:"Умови",aPriv:"Конфіденційність",thOn:"Увімкнути світло",thOff:"Вимкнути світло",ckT:"Cookies",ckP:"Ми зберігаємо мову, тему, кабінет і ваші коди в цьому браузері, щоб сайт працював зручно.",ckL:"Детальніше",ckMin:"Лише необхідні",ckAll:"Прийняти",pdT:"Завантажити код",pdS:"Оберіть оформлення PDF — як на сайті, світле чи темне.",pdLight:"Світлий",pdDark:"Темний",pdLightS:"Для друку та читання вдень",pdDarkS:"Глибокий космос, як на сайті",pdCancel:"Скасувати",pdPrep:"Готуємо PDF…",pdGo:"Завантажити PDF",pdBuild:"Збираємо сторінки…",pdPage:"Сторінка",pdSave:"Зберігаємо…",calcCode:"Розрахувати код",ftCopy:"Інструмент самопізнання, а не прогноз чи діагноз",mTarot:"Таро-трактувальник",mGuide:"Шпаргалка по позиціях",cHistT:"Історія переглядів",cClear:"Очистити історію",cHistEmpty:"Тут з’являться матриці, які ви переглядали.",cCleared:"Історію очищено.",cDataT:"Особисті дані",cSavedT:"Збережені коди",cEdit:"Редагувати",cCancel:"Скасувати",cPdf:"Завантажити PDF",cDel:"Видалити",cSolo:"Особиста",cPairT:"Сумісність",cCenter:"центр",cTail:"хвіст",cFill:"Заповніть особисті дані, щоб розрахувати свою матрицю."},
en:{solo:"Personal",pair:"Compatibility",name:"Name",namePh:"Your name",day:"Day",month:"Month",year:"Year",fem:"Female",male:"Male",calc:"Calculate",p1:"Partner 1",p2:"Partner 2",errDate:"Choose the day, month and year of birth.",errPair:"Enter both partners’ dates of birth.",
 mSolo:"Personal matrix",mPair:"Compatibility",mToday:"Energy of the day",mYears:"Forecast by year",mCat:"Arcana guide",mLogin:"Sign in & sign up",mCab:"Account",contacts:"contacts",lang:"language",langNote:"Energy interpretations are in Ukrainian for now. Translations are on the way.",mNote:"Destiny Matrix by Natalia Ladini’s method. A tool for self-discovery, not a prediction or diagnosis.",menu:"Menu",closeMenu:"Close menu",
 eyebrow:"destiny matrix · Natalia Ladini’s method",sT1:"Calculate",sT2:"your code",sLead:"Your date of birth is a cipher. Enter it below and 22 arcana will form a map of your character, talents, karmic tasks and purpose.",sGo:"Calculate your code",sMine:"My matrix",sCab:"My account",
 aT1:"Your",aT2:"destiny code",aT3:"in one account",aLead:"You can calculate a matrix right in the form above, no sign-up needed. An account lets you save codes, keep favourites and skip re-entering your data.",aP1:"Your birth data, entered once",aP2:"Saved codes: yours, loved ones’, couples’",aP3:"Favourites and PDF report in one tap",aBack:"← Back to the result",aCat:"Guide to the 22 arcana ↗",aLogin:"Sign in",aReg:"Sign up",aHLogin:"Welcome back",aHReg:"Create an account",aSubLogin:"Your saved codes, favourites and history are waiting for you.",aSubReg:"It takes a minute — after that your data fills in by itself.",aApple:"Continue with Apple",aGoogle:"Continue with Google",aOr:"or email",aEmail:"Email",aPw:"Password",aPwLogin:"Your password",aPwReg:"Latin characters, no spaces",aBtnLogin:"Sign in",aBtnReg:"Create account",aNo:"No account yet?",aNoB:"Create one",aHave:"Already have an account?",aHaveB:"Sign in",aFine:"Prototype: your account and saved codes are stored in this browser only.",aSso:"Signing in with {x} will work once the authorization server is connected. For now, please use email.",aBadEmail:"Enter a valid email.",aShortPw:"Use Latin letters, digits or symbols, without spaces.",aPwHint:"Latin characters, no spaces, any case. Adding digits is recommended.",
 cK:"account",cHi:"Welcome,",cFriend:"friend",cBack:"← Back to the result",cOut:"Sign out",cData:"personal data",cSave:"Save",cCalc:"Calculate my matrix",cNote:"This data fills in the calculation form automatically.",cSaved:"saved codes",cEmpty1:"Matrices you add to favourites will appear here.",cEmpty2:"Calculate a matrix and tap the bookmark icon next to the name.",
 rMatrix:"Matrix",rYour:"Your",rDestiny:"destiny matrix",rPair:"Compatibility",tMatrix:"Matrix",tToday:"Today",tYears:"Forecast by year",tArc:"Arcana",tPair:"Couple matrix",rCenter:"Center",rTail:"Karmic tail",rYear:"This year",rUnion:"Union energy",rKProg:"Karmic program",rPurp:"Couple’s purpose",rDl:"Download code",rF:"female",rM:"male",rAge:"y.o.",rOverlay:"full matrix overlay",bmAdd:"Add to favourites",bmDel:"Remove from favourites",
 ftLead:"CODE — a space for self-discovery. Everything is energy — explore yours.",ftSec:"Sections",ftCalc:"Calculations",ftMeth:"Method",ftM1:"Natalia Ladini’s Destiny Matrix",ftM2:"22 Major Arcana",ftM3:"Health map, programs, years",chData:"Change details",aAgree1:"I agree to the",aAgree2:"privacy policy",aNeedAgree:"Please accept the privacy policy.",aHelp:"Help",aTerms:"Terms",aPriv:"Privacy",thOn:"Turn the light on",thOff:"Turn the light off",ckT:"Cookies",ckP:"We store your language, theme, account and codes in this browser so the site works smoothly.",ckL:"Learn more",ckMin:"Essential only",ckAll:"Accept",pdT:"Download your code",pdS:"Choose the PDF style — light or dark, just like the site.",pdLight:"Light",pdDark:"Dark",pdLightS:"For printing and daytime reading",pdDarkS:"Deep space, like the site",pdCancel:"Cancel",pdPrep:"Preparing PDF…",pdGo:"Download PDF",pdBuild:"Building pages…",pdPage:"Page",pdSave:"Saving…",calcCode:"Calculate code",ftCopy:"A tool for self-discovery, not a prediction or diagnosis",mTarot:"Tarot reader",mGuide:"Positions cheat sheet",cHistT:"View history",cClear:"Clear history",cHistEmpty:"Matrices you have viewed will appear here.",cCleared:"History cleared.",cDataT:"Personal data",cSavedT:"Saved codes",cEdit:"Edit",cCancel:"Cancel",cPdf:"Download PDF",cDel:"Delete",cSolo:"Personal",cPairT:"Compatibility",cCenter:"center",cTail:"tail",cFill:"Fill in your personal data to calculate your matrix."},
de:{solo:"Persönlich",pair:"Partnerschaft",name:"Name",namePh:"Ihr Name",day:"Tag",month:"Monat",year:"Jahr",fem:"Frau",male:"Mann",calc:"Berechnen",p1:"Partner 1",p2:"Partner 2",errDate:"Wählen Sie Tag, Monat und Jahr der Geburt.",errPair:"Geben Sie die Geburtsdaten beider Partner an.",
 mSolo:"Persönliche Matrix",mPair:"Partnerschaft",mToday:"Energie des Tages",mYears:"Jahresprognose",mCat:"Arkana-Lexikon",mLogin:"Anmelden & registrieren",mCab:"Konto",contacts:"Kontakt",lang:"Sprache",langNote:"Die Deutungen sind vorerst auf Ukrainisch. Übersetzungen folgen.",mNote:"Schicksalsmatrix nach der Methode von Natalia Ladini. Ein Werkzeug zur Selbsterkenntnis, keine Vorhersage oder Diagnose.",menu:"Menü",closeMenu:"Menü schließen",
 eyebrow:"Schicksalsmatrix · Methode von Natalia Ladini",sT1:"Berechne",sT2:"deinen Code",sLead:"Dein Geburtsdatum ist eine Chiffre. Gib es unten ein, und 22 Arkana fügen sich zu einer Karte deines Charakters, deiner Talente, karmischen Aufgaben und Bestimmung.",sGo:"Meinen Code berechnen",sMine:"Meine Matrix",sCab:"Mein Konto",
 aT1:"Dein",aT2:"Schicksalscode",aT3:"in einem Konto",aLead:"Die Matrix lässt sich direkt oben berechnen, ohne Registrierung. Mit einem Konto speicherst du Codes, Favoriten und musst deine Daten nicht erneut eingeben.",aP1:"Geburtsdaten nur einmal eingeben",aP2:"Gespeicherte Codes: deine, von Nahestehenden, von Paaren",aP3:"Favoriten und PDF-Bericht mit einem Tipp",aBack:"← Zurück zum Ergebnis",aCat:"Lexikon der 22 Arkana ↗",aLogin:"Anmelden",aReg:"Registrieren",aHLogin:"Willkommen zurück",aHReg:"Konto erstellen",aSubLogin:"Deine gespeicherten Codes, Favoriten und dein Verlauf warten auf dich.",aSubReg:"Dauert eine Minute — danach werden deine Daten automatisch eingesetzt.",aApple:"Weiter mit Apple",aGoogle:"Weiter mit Google",aOr:"oder E-Mail",aEmail:"E-Mail",aPw:"Passwort",aPwLogin:"Dein Passwort",aPwReg:"Lateinische Zeichen, ohne Leerzeichen",aBtnLogin:"Anmelden",aBtnReg:"Konto erstellen",aNo:"Noch kein Konto?",aNoB:"Erstellen",aHave:"Schon ein Konto?",aHaveB:"Anmelden",aFine:"Prototyp: Konto und Codes werden nur in diesem Browser gespeichert.",aSso:"Die Anmeldung mit {x} funktioniert, sobald der Autorisierungsserver verbunden ist. Bitte nutze vorerst E-Mail.",aBadEmail:"Gib eine gültige E-Mail an.",aShortPw:"Nur lateinische Buchstaben, Ziffern oder Zeichen, ohne Leerzeichen.",aPwHint:"Lateinische Zeichen ohne Leerzeichen, beliebige Schreibweise. Ziffern werden empfohlen.",
 cK:"Konto",cHi:"Willkommen,",cFriend:"Freund",cBack:"← Zum Ergebnis",cOut:"Abmelden",cData:"persönliche Daten",cSave:"Speichern",cCalc:"Meine Matrix berechnen",cNote:"Diese Daten werden automatisch ins Formular übernommen.",cSaved:"gespeicherte Codes",cEmpty1:"Hier erscheinen Matrizen, die du zu den Favoriten hinzufügst.",cEmpty2:"Berechne eine Matrix und tippe auf das Lesezeichen neben dem Namen.",
 rMatrix:"Matrix",rYour:"Deine",rDestiny:"Schicksalsmatrix",rPair:"Partnerschaft",tMatrix:"Matrix",tToday:"Heute",tYears:"Jahresprognose",tArc:"Arkana",tPair:"Paar-Matrix",rCenter:"Zentrum",rTail:"Karmischer Schweif",rYear:"Dieses Jahr",rUnion:"Energie der Verbindung",rKProg:"Karmisches Programm",rPurp:"Bestimmung des Paares",rDl:"Code herunterladen",rF:"Frau",rM:"Mann",rAge:"J.",rOverlay:"vollständige Überlagerung",bmAdd:"Zu Favoriten",bmDel:"Aus Favoriten entfernen",
 ftLead:"CODE — ein Raum der Selbsterkenntnis. Alles ist Energie — erforsche deine.",ftSec:"Bereiche",ftCalc:"Berechnungen",ftMeth:"Methode",ftM1:"Schicksalsmatrix nach Natalia Ladini",ftM2:"22 Große Arkana",ftM3:"Gesundheitskarte, Programme, Jahre",chData:"Daten ändern",aAgree1:"Ich stimme der",aAgree2:"Datenschutzerklärung zu",aNeedAgree:"Bitte stimme der Datenschutzerklärung zu.",aHelp:"Hilfe",aTerms:"Bedingungen",aPriv:"Datenschutz",thOn:"Licht einschalten",thOff:"Licht ausschalten",ckT:"Cookies",ckP:"Wir speichern Sprache, Design, Konto und deine Codes in diesem Browser, damit die Seite bequem funktioniert.",ckL:"Mehr erfahren",ckMin:"Nur notwendige",ckAll:"Akzeptieren",pdT:"Code herunterladen",pdS:"Wähle das PDF-Design — hell oder dunkel, wie auf der Seite.",pdLight:"Hell",pdDark:"Dunkel",pdLightS:"Zum Drucken und Lesen am Tag",pdDarkS:"Tiefer Kosmos, wie auf der Seite",pdCancel:"Abbrechen",pdPrep:"PDF wird vorbereitet…",pdGo:"PDF herunterladen",pdBuild:"Seiten werden erstellt…",pdPage:"Seite",pdSave:"Wird gespeichert…",calcCode:"Code berechnen",ftCopy:"Ein Werkzeug zur Selbsterkenntnis, keine Vorhersage oder Diagnose",mTarot:"Tarot-Deutung",mGuide:"Positionen erklärt",cHistT:"Verlauf",cClear:"Verlauf löschen",cHistEmpty:"Hier erscheinen die Matrizen, die du angesehen hast.",cCleared:"Verlauf gelöscht.",cDataT:"Persönliche Daten",cSavedT:"Gespeicherte Codes",cEdit:"Bearbeiten",cCancel:"Abbrechen",cPdf:"PDF herunterladen",cDel:"Löschen",cSolo:"Persönlich",cPairT:"Partnerschaft",cCenter:"Zentrum",cTail:"Schweif",cFill:"Gib deine persönlichen Daten ein, um deine Matrix zu berechnen."},
fr:{solo:"Personnelle",pair:"Compatibilité",name:"Prénom",namePh:"Votre prénom",day:"Jour",month:"Mois",year:"Année",fem:"Femme",male:"Homme",calc:"Calculer",p1:"Partenaire 1",p2:"Partenaire 2",errDate:"Choisissez le jour, le mois et l’année de naissance.",errPair:"Indiquez les dates de naissance des deux partenaires.",
 mSolo:"Matrice personnelle",mPair:"Compatibilité",mToday:"Énergie du jour",mYears:"Prévisions par année",mCat:"Guide des arcanes",mLogin:"Connexion et inscription",mCab:"Mon compte",contacts:"contacts",lang:"langue",langNote:"Les interprétations sont pour l’instant en ukrainien. Les traductions arrivent.",mNote:"Matrice du destin selon la méthode de Natalia Ladini. Un outil de connaissance de soi, pas une prédiction ni un diagnostic.",menu:"Menu",closeMenu:"Fermer le menu",
 eyebrow:"matrice du destin · méthode de Natalia Ladini",sT1:"Calcule",sT2:"ton code",sLead:"Ta date de naissance est un chiffre secret. Saisis-la ci-dessous : 22 arcanes dessineront la carte de ton caractère, de tes talents, de tes tâches karmiques et de ta mission.",sGo:"Calculer mon code",sMine:"Ma matrice",sCab:"Mon compte",
 aT1:"Ton",aT2:"code du destin",aT3:"dans un seul compte",aLead:"Tu peux calculer une matrice directement ci-dessus, sans inscription. Un compte permet de garder tes codes, tes favoris et de ne plus ressaisir tes données.",aP1:"Tes données de naissance, saisies une fois",aP2:"Codes enregistrés : les tiens, ceux de tes proches et des couples",aP3:"Favoris et rapport PDF en un geste",aBack:"← Retour au résultat",aCat:"Guide des 22 arcanes ↗",aLogin:"Connexion",aReg:"Inscription",aHLogin:"Bon retour",aHReg:"Créer un compte",aSubLogin:"Tes codes enregistrés, tes favoris et ton historique t’attendent.",aSubReg:"Une minute suffit — ensuite tes données se remplissent toutes seules.",aApple:"Continuer avec Apple",aGoogle:"Continuer avec Google",aOr:"ou e-mail",aEmail:"E-mail",aPw:"Mot de passe",aPwLogin:"Ton mot de passe",aPwReg:"Caractères latins, sans espaces",aBtnLogin:"Se connecter",aBtnReg:"Créer le compte",aNo:"Pas encore de compte ?",aNoB:"Créer",aHave:"Déjà un compte ?",aHaveB:"Se connecter",aFine:"Prototype : le compte et les codes sont stockés uniquement dans ce navigateur.",aSso:"La connexion avec {x} fonctionnera dès que le serveur d’autorisation sera branché. Utilise l’e-mail pour l’instant.",aBadEmail:"Indique un e-mail valide.",aShortPw:"Utilise des lettres latines, chiffres ou symboles, sans espaces.",aPwHint:"Caractères latins sans espaces, casse libre. Ajouter des chiffres est recommandé.",
 cK:"compte",cHi:"Bienvenue,",cFriend:"ami",cBack:"← Retour au résultat",cOut:"Se déconnecter",cData:"données personnelles",cSave:"Enregistrer",cCalc:"Calculer ma matrice",cNote:"Ces données remplissent automatiquement le formulaire.",cSaved:"codes enregistrés",cEmpty1:"Les matrices ajoutées aux favoris apparaîtront ici.",cEmpty2:"Calcule une matrice et touche le marque-page à côté du nom.",
 rMatrix:"Matrice",rYour:"Ta",rDestiny:"matrice du destin",rPair:"Compatibilité",tMatrix:"Matrice",tToday:"Aujourd’hui",tYears:"Par année",tArc:"Arcanes",tPair:"Matrice du couple",rCenter:"Centre",rTail:"Queue karmique",rYear:"Cette année",rUnion:"Énergie du couple",rKProg:"Programme karmique",rPurp:"Mission du couple",rDl:"Télécharger le code",rF:"femme",rM:"homme",rAge:"ans",rOverlay:"superposition complète",bmAdd:"Ajouter aux favoris",bmDel:"Retirer des favoris",
 ftLead:"CODE — un espace pour se connaître. Tout est énergie — explore la tienne.",ftSec:"Rubriques",ftCalc:"Calculs",ftMeth:"Méthode",ftM1:"Matrice du destin de Natalia Ladini",ftM2:"22 Arcanes majeurs",ftM3:"Carte de santé, programmes, années",chData:"Modifier les données",aAgree1:"J’accepte la",aAgree2:"politique de confidentialité",aNeedAgree:"Merci d’accepter la politique de confidentialité.",aHelp:"Aide",aTerms:"Conditions",aPriv:"Confidentialité",thOn:"Allumer la lumière",thOff:"Éteindre la lumière",ckT:"Cookies",ckP:"Nous enregistrons la langue, le thème, le compte et tes codes dans ce navigateur pour un usage confortable.",ckL:"En savoir plus",ckMin:"Essentiels seulement",ckAll:"Accepter",pdT:"Télécharger le code",pdS:"Choisis le style du PDF — clair ou sombre, comme le site.",pdLight:"Clair",pdDark:"Sombre",pdLightS:"Pour imprimer et lire en journée",pdDarkS:"Cosmos profond, comme le site",pdCancel:"Annuler",pdPrep:"Préparation du PDF…",pdGo:"Télécharger le PDF",pdBuild:"Mise en page…",pdPage:"Page",pdSave:"Enregistrement…",calcCode:"Calculer le code",ftCopy:"Un outil de connaissance de soi, pas une prédiction ni un diagnostic",mTarot:"Lecture du tarot",mGuide:"Guide des positions",cHistT:"Historique",cClear:"Effacer l’historique",cHistEmpty:"Les matrices consultées apparaîtront ici.",cCleared:"Historique effacé.",cDataT:"Données personnelles",cSavedT:"Codes enregistrés",cEdit:"Modifier",cCancel:"Annuler",cPdf:"Télécharger le PDF",cDel:"Supprimer",cSolo:"Personnelle",cPairT:"Compatibilité",cCenter:"centre",cTail:"queue",cFill:"Renseigne tes données personnelles pour calculer ta matrice."},
es:{solo:"Personal",pair:"Compatibilidad",name:"Nombre",namePh:"Tu nombre",day:"Día",month:"Mes",year:"Año",fem:"Mujer",male:"Hombre",calc:"Calcular",p1:"Pareja 1",p2:"Pareja 2",errDate:"Elige el día, el mes y el año de nacimiento.",errPair:"Indica las fechas de nacimiento de ambos.",
 mSolo:"Matriz personal",mPair:"Compatibilidad",mToday:"Energía del día",mYears:"Pronóstico por años",mCat:"Guía de arcanos",mLogin:"Acceso y registro",mCab:"Mi cuenta",contacts:"contacto",lang:"idioma",langNote:"Por ahora las interpretaciones están en ucraniano. Las traducciones están en camino.",mNote:"Matriz del destino según el método de Natalia Ladini. Una herramienta de autoconocimiento, no una predicción ni un diagnóstico.",menu:"Menú",closeMenu:"Cerrar menú",
 eyebrow:"matriz del destino · método de Natalia Ladini",sT1:"Calcula",sT2:"tu código",sLead:"Tu fecha de nacimiento es un cifrado. Escríbela abajo y 22 arcanos formarán el mapa de tu carácter, tus talentos, tus tareas kármicas y tu propósito.",sGo:"Calcular mi código",sMine:"Mi matriz",sCab:"Mi cuenta",
 aT1:"Tu",aT2:"código del destino",aT3:"en una sola cuenta",aLead:"Puedes calcular una matriz arriba, sin registrarte. Con una cuenta guardas tus códigos, tus favoritos y no vuelves a escribir tus datos.",aP1:"Tus datos de nacimiento, una sola vez",aP2:"Códigos guardados: tuyos, de tus seres queridos y de parejas",aP3:"Favoritos e informe PDF con un toque",aBack:"← Volver al resultado",aCat:"Guía de los 22 arcanos ↗",aLogin:"Entrar",aReg:"Registrarse",aHLogin:"Bienvenido de nuevo",aHReg:"Crea una cuenta",aSubLogin:"Tus códigos guardados, favoritos e historial te están esperando.",aSubReg:"Es un minuto — después tus datos se rellenarán solos.",aApple:"Continuar con Apple",aGoogle:"Continuar con Google",aOr:"o email",aEmail:"Email",aPw:"Contraseña",aPwLogin:"Tu contraseña",aPwReg:"Caracteres latinos, sin espacios",aBtnLogin:"Entrar",aBtnReg:"Crear cuenta",aNo:"¿No tienes cuenta?",aNoB:"Crear",aHave:"¿Ya tienes cuenta?",aHaveB:"Entrar",aFine:"Prototipo: la cuenta y los códigos se guardan solo en este navegador.",aSso:"El acceso con {x} funcionará cuando se conecte el servidor de autorización. Por ahora usa el email.",aBadEmail:"Escribe un email válido.",aShortPw:"Usa letras latinas, números o símbolos, sin espacios.",aPwHint:"Caracteres latinos sin espacios, mayúsculas o minúsculas. Se recomienda añadir números.",
 cK:"cuenta",cHi:"Hola,",cFriend:"amigo",cBack:"← Volver al resultado",cOut:"Salir",cData:"datos personales",cSave:"Guardar",cCalc:"Calcular mi matriz",cNote:"Estos datos se rellenan automáticamente en el formulario.",cSaved:"códigos guardados",cEmpty1:"Aquí aparecerán las matrices que añadas a favoritos.",cEmpty2:"Calcula una matriz y toca el marcador junto al nombre.",
 rMatrix:"Matriz",rYour:"Tu",rDestiny:"matriz del destino",rPair:"Compatibilidad",tMatrix:"Matriz",tToday:"Hoy",tYears:"Por años",tArc:"Arcanos",tPair:"Matriz de pareja",rCenter:"Centro",rTail:"Cola kármica",rYear:"Este año",rUnion:"Energía de la unión",rKProg:"Programa kármico",rPurp:"Propósito de la pareja",rDl:"Descargar código",rF:"mujer",rM:"hombre",rAge:"años",rOverlay:"superposición completa",bmAdd:"Añadir a favoritos",bmDel:"Quitar de favoritos",
 ftLead:"CODE — un espacio de autoconocimiento. Todo es energía — explora la tuya.",ftSec:"Secciones",ftCalc:"Cálculos",ftMeth:"Método",ftM1:"Matriz del destino de Natalia Ladini",ftM2:"22 Arcanos mayores",ftM3:"Mapa de salud, programas, años",chData:"Cambiar datos",aAgree1:"Acepto la",aAgree2:"política de privacidad",aNeedAgree:"Acepta la política de privacidad.",aHelp:"Ayuda",aTerms:"Términos",aPriv:"Privacidad",thOn:"Encender la luz",thOff:"Apagar la luz",ckT:"Cookies",ckP:"Guardamos el idioma, el tema, la cuenta y tus códigos en este navegador para que el sitio funcione cómodamente.",ckL:"Más información",ckMin:"Solo necesarias",ckAll:"Aceptar",pdT:"Descargar el código",pdS:"Elige el estilo del PDF: claro u oscuro, como el sitio.",pdLight:"Claro",pdDark:"Oscuro",pdLightS:"Para imprimir y leer de día",pdDarkS:"Cosmos profundo, como el sitio",pdCancel:"Cancelar",pdPrep:"Preparando el PDF…",pdGo:"Descargar PDF",pdBuild:"Montando páginas…",pdPage:"Página",pdSave:"Guardando…",calcCode:"Calcular código",ftCopy:"Una herramienta de autoconocimiento, no una predicción ni un diagnóstico",mTarot:"Lectura de tarot",mGuide:"Guía de posiciones",cHistT:"Historial",cClear:"Borrar historial",cHistEmpty:"Aquí aparecerán las matrices que has visto.",cCleared:"Historial borrado.",cDataT:"Datos personales",cSavedT:"Códigos guardados",cEdit:"Editar",cCancel:"Cancelar",cPdf:"Descargar PDF",cDel:"Eliminar",cSolo:"Personal",cPairT:"Compatibilidad",cCenter:"centro",cTail:"cola",cFill:"Completa tus datos personales para calcular tu matriz."},
it:{solo:"Personale",pair:"Compatibilità",name:"Nome",namePh:"Il tuo nome",day:"Giorno",month:"Mese",year:"Anno",fem:"Donna",male:"Uomo",calc:"Calcola",p1:"Partner 1",p2:"Partner 2",errDate:"Scegli giorno, mese e anno di nascita.",errPair:"Inserisci le date di nascita di entrambi i partner.",
 mSolo:"Matrice personale",mPair:"Compatibilità",mToday:"Energia del giorno",mYears:"Previsioni per anno",mCat:"Guida agli arcani",mLogin:"Accesso e registrazione",mCab:"Il mio account",contacts:"contatti",lang:"lingua",langNote:"Per ora le interpretazioni sono in ucraino. Le traduzioni sono in arrivo.",mNote:"Matrice del destino secondo il metodo di Natalia Ladini. Uno strumento di conoscenza di sé, non una previsione né una diagnosi.",menu:"Menu",closeMenu:"Chiudi menu",
 eyebrow:"matrice del destino · metodo di Natalia Ladini",sT1:"Calcola",sT2:"il tuo codice",sLead:"La tua data di nascita è un cifrario. Inseriscila qui sotto: 22 arcani comporranno la mappa del tuo carattere, dei talenti, dei compiti karmici e dello scopo.",sGo:"Calcola il mio codice",sMine:"La mia matrice",sCab:"Il mio account",
 aT1:"Il tuo",aT2:"codice del destino",aT3:"in un solo account",aLead:"Puoi calcolare una matrice qui sopra, senza registrarti. Con un account salvi i codici, i preferiti e non reinserisci i dati.",aP1:"I tuoi dati di nascita, una volta sola",aP2:"Codici salvati: tuoi, dei tuoi cari e delle coppie",aP3:"Preferiti e report PDF con un tocco",aBack:"← Torna al risultato",aCat:"Guida ai 22 arcani ↗",aLogin:"Accedi",aReg:"Registrati",aHLogin:"Bentornato",aHReg:"Crea un account",aSubLogin:"I tuoi codici salvati, i preferiti e la cronologia ti aspettano.",aSubReg:"Ci vuole un minuto — poi i tuoi dati si compileranno da soli.",aApple:"Continua con Apple",aGoogle:"Continua con Google",aOr:"oppure email",aEmail:"Email",aPw:"Password",aPwLogin:"La tua password",aPwReg:"Caratteri latini, senza spazi",aBtnLogin:"Accedi",aBtnReg:"Crea account",aNo:"Non hai un account?",aNoB:"Crealo",aHave:"Hai già un account?",aHaveB:"Accedi",aFine:"Prototipo: account e codici sono salvati solo in questo browser.",aSso:"L’accesso con {x} funzionerà quando sarà collegato il server di autorizzazione. Per ora usa l’email.",aBadEmail:"Inserisci un’email valida.",aShortPw:"Usa lettere latine, numeri o simboli, senza spazi.",aPwHint:"Caratteri latini senza spazi, maiuscole o minuscole. Consigliato aggiungere numeri.",
 cK:"account",cHi:"Benvenuto,",cFriend:"amico",cBack:"← Torna al risultato",cOut:"Esci",cData:"dati personali",cSave:"Salva",cCalc:"Calcola la mia matrice",cNote:"Questi dati compilano automaticamente il modulo.",cSaved:"codici salvati",cEmpty1:"Qui compariranno le matrici aggiunte ai preferiti.",cEmpty2:"Calcola una matrice e tocca il segnalibro accanto al nome.",
 rMatrix:"Matrice",rYour:"La tua",rDestiny:"matrice del destino",rPair:"Compatibilità",tMatrix:"Matrice",tToday:"Oggi",tYears:"Per anno",tArc:"Arcani",tPair:"Matrice di coppia",rCenter:"Centro",rTail:"Coda karmica",rYear:"Quest’anno",rUnion:"Energia dell’unione",rKProg:"Programma karmico",rPurp:"Scopo della coppia",rDl:"Scarica il codice",rF:"donna",rM:"uomo",rAge:"anni",rOverlay:"sovrapposizione completa",bmAdd:"Aggiungi ai preferiti",bmDel:"Rimuovi dai preferiti",
 ftLead:"CODE — uno spazio per conoscersi. Tutto è energia — esplora la tua.",ftSec:"Sezioni",ftCalc:"Calcoli",ftMeth:"Metodo",ftM1:"Matrice del destino di Natalia Ladini",ftM2:"22 Arcani maggiori",ftM3:"Mappa della salute, programmi, anni",chData:"Modifica i dati",aAgree1:"Accetto l’",aAgree2:"informativa sulla privacy",aNeedAgree:"Accetta l’informativa sulla privacy.",aHelp:"Aiuto",aTerms:"Termini",aPriv:"Privacy",thOn:"Accendi la luce",thOff:"Spegni la luce",ckT:"Cookie",ckP:"Salviamo lingua, tema, account e i tuoi codici in questo browser perché il sito funzioni comodamente.",ckL:"Scopri di più",ckMin:"Solo necessari",ckAll:"Accetta",pdT:"Scarica il codice",pdS:"Scegli lo stile del PDF: chiaro o scuro, come il sito.",pdLight:"Chiaro",pdDark:"Scuro",pdLightS:"Per stampare e leggere di giorno",pdDarkS:"Cosmo profondo, come il sito",pdCancel:"Annulla",pdPrep:"Preparazione del PDF…",pdGo:"Scarica PDF",pdBuild:"Impaginazione…",pdPage:"Pagina",pdSave:"Salvataggio…",calcCode:"Calcola il codice",ftCopy:"Uno strumento di conoscenza di sé, non una previsione né una diagnosi",mTarot:"Lettura dei tarocchi",mGuide:"Guida alle posizioni",cHistT:"Cronologia",cClear:"Cancella cronologia",cHistEmpty:"Qui compariranno le matrici che hai visto.",cCleared:"Cronologia cancellata.",cDataT:"Dati personali",cSavedT:"Codici salvati",cEdit:"Modifica",cCancel:"Annulla",cPdf:"Scarica PDF",cDel:"Elimina",cSolo:"Personale",cPairT:"Compatibilità",cCenter:"centro",cTail:"coda",cFill:"Compila i tuoi dati personali per calcolare la tua matrice."}
};
const LANGS_ON=['uk','en'];
let LANG=(()=>{ try{ if(window.__SEO&&__SEO.lang==='en'&&I18N.en){ localStorage.setItem('code-lang',JSON.stringify('en')); return 'en'; } }catch(_){ if(window.__SEO&&__SEO.lang==='en') return 'en'; }
  try{ const q=new URLSearchParams(location.search).get('lang'); if(q&&LANGS_ON.includes(q)&&I18N[q]){ localStorage.setItem('code-lang',JSON.stringify(q)); return q; } }catch(_){}
  try{const l=JSON.parse(localStorage.getItem('code-lang')||'null');return l&&LANGS_ON.includes(l)&&I18N[l]?l:'uk'}catch(_){return 'uk'}})();
const T=(k,x)=>{const s=(I18N[LANG]&&I18N[LANG][k])||I18N.uk[k]||k;return x?s.replace('{x}',x):s;};
const mName=m=>LANG==='uk'?MONTHS[m-1]:MONTHN_L[LANG][m-1];
function applyStaticI18n(){
  L10N_apply();
  document.documentElement.lang=LANG;
  document.querySelectorAll('[data-blog]').forEach(a=>a.setAttribute('href',LANG==='en'?'/en/blog':'/blog'));
  document.querySelectorAll('[data-i18n]').forEach(e=>{ const v=T(e.dataset.i18n);
    if(e.dataset.i18n==='ftLead'){ const k=v.indexOf('. '); if(k>0){ e.textContent=''; e.append(v.slice(0,k+1)+' '); const m=document.createElement('span'); m.className='ft-m'; m.textContent=v.slice(k+2); e.append(m); return; } }
    e.textContent=v; });
  document.querySelectorAll('[data-i18n-ph]').forEach(e=>e.placeholder=T(e.dataset.i18nPh));
  document.querySelectorAll('[data-i18n-al]').forEach(e=>e.setAttribute('aria-label',T(e.dataset.i18nAl)));
  document.querySelectorAll('[data-i18n-tip]').forEach(e=>{const t=T(e.dataset.i18nTip); e.dataset.tip=t; e.setAttribute('aria-label',t);});
  const names=MONTHN_L[LANG]||MONTHN_L.uk;
  ['month','m1','m2','pfM'].forEach(id=>{const s=document.getElementById(id);if(!s)return;[...s.options].forEach(o=>{if(o.value)o.textContent=names[+o.value-1];});});
  document.querySelectorAll('.lang-b').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===LANG)));
  window.csSync&&window.csSync();
}

/* ---------- 22 arcana ---------- */
const ARC = [null,
{n:"Маг",kw:["воля","ініціатива","сила слова","старт"],
d:"Маг — енергія першого кроку й творчої волі. Це людина, яка вміє перетворювати думку на дію, а слово — на реальність: з нуля запускає проєкти, легко навчається, швидко орієнтується в нових умовах. Маг володіє харизмою, гнучким розумом і даром комунікації, тому сильний у переговорах, продажах, навчанні та будь-якому «починанні». Його ресурс — цікавість і рух: застій для нього руйнівний. Головний урок — спрямовувати силу на творення, а не на маніпуляцію, і доводити розпочате до кінця.",
p:"Ініціативність, винахідливість, сила слова, вміння надихати й вести за собою, швидке навчання.",
m:"Маніпуляції, поверховість, розпорошення на десятки справ, нервове виснаження, самовпевненість, обман.",
pers:"Ви справляєте враження енергійної, кмітливої людини, з якою щось починається.",
tal:"талант запускати нове, переконувати й працювати словом: виступи, навчання, продажі, підприємництво",
money:"гроші приходять через ініціативу, власні проєкти, комунікацію та швидкі рішення; простій у справах перекриває потік",
love:"у стосунках потрібні рух, спільні проєкти й інтелектуальна іскра — рутина гасить почуття",
karma:"у минулому втіленні ви мали силу впливу — знання, слово чи владу над думками — і могли використовувати її на власну користь",
task:"навчитися чесно користуватися своїм впливом і доводити справи до результату",
pur:"бути ініціатором: запускати процеси, ділитися знаннями й показувати людям, що почати можна вже зараз",
f:"У жінки Маг дає діловитість і гострий розум; важливо не придушувати власну м’якість заради результату.",
mm:"У чоловіка Маг проявляється як лідер-першопроходець; ризик — братися за все й нічого не завершувати."},
{n:"Верховна Жриця",kw:["інтуїція","тиша","таємне знання","аналіз"],
d:"Жриця — енергія інтуїції, внутрішнього знання і спостереження. Ця людина відчуває більше, ніж говорить, чує підтекст і нерідко «знає» наперед. Її сила — в тиші, аналізі, накопиченні інформації, в умінні тримати дистанцію й зберігати чужі таємниці. Жриця потребує усамітнення й розвитку внутрішнього світу: навчання, психології, наукового пошуку. Урок енергії — довіряти внутрішньому голосу й при цьому не ховатися від життя за маскою холодності.",
p:"Глибока інтуїція, мудрість, дипломатичність, вміння слухати, аналітичний розум, витримка.",
m:"Закритість, холодність, плітки й інтриги, недовіра, пасивність, суперництво замість співпраці.",
pers:"Ви здаєтеся стриманою й загадковою людиною, яка бачить більше, ніж показує.",
tal:"талант до інтуїтивного аналізу, психології, досліджень, консультування й роботи з інформацією",
money:"гроші через знання, консультації, аналітику, роботу з інформацією; рішення варто ухвалювати на інтуїції, а не під тиском",
love:"потрібен партнер, з яким можна мовчати; довіра й особистий простір — основа почуттів",
karma:"ви були хранителем таємного знання — жрицею, цілителем, радником — і могли закритися від людей або використати знання для інтриг",
task:"відкрити свою інтуїцію, ділитися знанням і не замикатися у власному світі",
pur:"бути провідником знання: навчати, консультувати, допомагати людям почути себе",
f:"У жінки — сильна інтуїція та привабливість через загадковість.",
mm:"У чоловіка — тонке чуття й аналітичність; важливо не плутати стриманість з емоційною недоступністю."},
{n:"Імператриця",kw:["жіночність","творчість","достаток","турбота"],
d:"Імператриця — енергія жіночої сили, краси, творення та материнства. Вона пов’язана з тілом, задоволенням, естетикою і достатком: там, де ця енергія в плюсі, з’являються затишок, діти, проєкти, гроші. Людина з Імператрицею креативна, тепла, вміє створювати красу й піклуватися. Енергія потребує насолоди життям, а не постійного «треба». Урок — приймати свою жіночність (а у чоловіків — делікатність), не душити близьких опікою і не жити лише емоціями.",
p:"Творчість, турбота, смак, плідність ідей, тепло, вміння насолоджуватися й створювати добробут.",
m:"Гіперопіка, ревнощі, емоційні гойдалки, лінощі, марнотратство, контроль через турботу.",
pers:"Ви випромінюєте тепло й естетику — поруч із вами затишно.",
tal:"талант до творчості, дизайну, краси, роботи з дітьми, створення комфортного простору",
money:"гроші через красу, творчість, турботу про людей, сферу послуг; грошам допомагає стан задоволення",
love:"стосунки з турботою, красою й тілесністю; важливо не перетворюватися на «маму» для партнера",
karma:"у минулому — материнство або творчість, де ви могли відмовитися від дитини, від себе чи від своєї жіночої природи",
task:"прийняти свою творчу й жіночну природу та дозволити собі насолоду і достаток",
pur:"нести красу й тепло у світ, плекати людей, проєкти, родину",
f:"Для жінки — ключова енергія самоцінності: материнство, краса й творчість наповнюють її.",
mm:"Для чоловіка — смак, турбота й творче бачення; важливо поважати жінок поруч і жіноче в собі."},
{n:"Імператор",kw:["структура","влада","відповідальність","стабільність"],
d:"Імператор — енергія чоловічої сили, порядку й лідерства. Це вміння ставити цілі, будувати системи, брати відповідальність і захищати своїх. Людина з цією енергією стратегічна, вимоглива, організована; вона створює правила й стабільність. Імператор пов’язаний з образом батька, з кар’єрою, статусом і матеріальною базою. Урок — керувати без тиску, лишатися надійним, але не деспотичним.",
p:"Лідерство, організованість, надійність, стратегічність, захист і відповідальність.",
m:"Деспотизм, контроль, жорсткість, трудоголізм, нетерпимість до слабкості, конфлікт з батьком.",
pers:"Вас сприймають як сильну й зібрану людину, на яку можна спертися.",
tal:"талант керувати, організовувати, будувати бізнес-процеси й структури",
money:"гроші через управління, власний бізнес, посаду, відповідальність за людей і процеси",
love:"у парі ви — опора; важливо не командувати партнером і залишати йому свободу",
karma:"у минулому — влада й керівництво, де могли бути жорстокість або відмова від відповідальності",
task:"навчитися мудро керувати: брати відповідальність, але без тиску й контролю",
pur:"створювати порядок і стабільність, бути опорою для команди, родини, справи",
f:"У жінки — сила характеру й лідерство; ризик забрати на себе чоловічу роль і втомитися від усього «на собі».",
mm:"Для чоловіка — центральна енергія самореалізації: статус, захист родини, кар’єра."},
{n:"Ієрофант",kw:["знання","традиції","наставництво","цінності"],
d:"Ієрофант (Жрець) — енергія вчителя, наставника й хранителя традицій. Він передає досвід, пояснює правила й допомагає людям знайти сенс. Людина з цією енергією любить вчитися й навчати, шанує родину, сімейні цінності та систему знань. Вона може бути чудовим педагогом, ментором, юристом, психологом, духовним провідником. Урок — навчати власним прикладом, а не моралізаторством, і поважати право інших на свій шлях.",
p:"Мудрість, наставництво, вірність, шанобливість до традицій, системне мислення.",
m:"Моралізаторство, догматизм, позиція «я знаю краще», ригідність, лицемірство.",
pers:"Ви справляєте враження людини з принципами, до якої йдуть по пораду.",
tal:"талант навчати, пояснювати складне, передавати досвід і структурувати знання",
money:"гроші через навчання, наставництво, експертність, роботу в системі та з документами",
love:"шлюб і сімейні цінності для вас важливі; стосунки будуються на довірі та спільних принципах",
karma:"ви були вчителем чи духовною особою, але могли нав’язувати віру й правила або відмовитися передати знання",
task:"ділитися знанням без примусу, стати наставником, а не суддею",
pur:"бути вчителем: передавати досвід і допомагати людям знайти опору в цінностях",
f:"У жінки — мудра наставниця, хранителька сімейних традицій.",
mm:"У чоловіка — авторитет і ментор; важливо слухати, а не лише повчати."},
{n:"Закохані",kw:["любов","вибір","гармонія","стосунки"],
d:"Закохані — енергія любові, краси й вибору. Вона про стосунки в широкому сенсі: з партнером, друзями, командою, із самим собою. Людина з цією енергією товариська, чарівна, естетична, потребує гармонії та взаємності. Через неї проходять важливі вибори — серцем, а не з розрахунку. Урок — любити себе так само, як інших, обирати чесно і не залежати від чужої думки.",
p:"Любов, щирість, привабливість, дипломатичність, вміння дружити й поєднувати людей.",
m:"Залежність від схвалення, нерішучість, ревнощі, вибір не серцем, ідеалізація партнера.",
pers:"Ви чарівна, відкрита людина, з якою легко й приємно.",
tal:"талант до стосунків, естетики, партнерства, роботи з людьми і краси",
money:"гроші через партнерство, людей, красу; справу варто обирати «по любові»",
love:"це ключова любовна енергія: потрібні романтика, взаємність і рівність, а самоцінність — фундамент",
karma:"у минулому — нерозділене кохання або зрада, вибір не на користь серця, порушена обіцянка",
task:"навчитися любити без умов і залежності, робити вибір відповідно до серця",
pur:"нести любов і гармонію, поєднувати людей, творити красу у стосунках",
f:"У жінки — привабливість і потреба в романтиці; самоповага важливіша за схвалення партнера.",
mm:"У чоловіка — галантність і чарівність; ризик — нерішучість у виборі."},
{n:"Колісниця",kw:["рух","ціль","перемога","подорожі"],
d:"Колісниця — енергія руху, цілеспрямованості й перемоги. Це рушійна сила, яка веде вперед: кар’єра, подорожі, амбіційні цілі, дисципліна. Людина з Колісницею — воїн із ясним напрямком, вона не терпить застою, любить змагання й результат. Енергія потребує постійного розвитку та зміни обстановки. Урок — знати, куди їдеш, і не перетворювати життя на гонку заради гонки.",
p:"Цілеспрямованість, рішучість, витривалість, лідерство в дії, любов до подорожей і розвитку.",
m:"Агресія, нетерпіння, гонка без мети, трудоголізм, конфліктність, страх зупинитися.",
pers:"Ви — людина руху й мети: швидко вирішуєте і їдете вперед.",
tal:"талант досягати цілей, вести проєкти, подорожувати, займатися спортом і логістикою",
money:"гроші через рух: відрядження, транспорт, продажі, проєктний менеджмент, швидкі рішення",
love:"потрібен партнер-однодумець, з яким ви рухаєтеся в одному напрямку",
karma:"у минулому — воїн або мандрівник, який міг залишати близьких заради мети чи воювати без сенсу",
task:"поставити справжню мету і йти до неї усвідомлено, а не втікати в рух",
pur:"вести вперед, показувати напрямок і надихати інших на дію",
f:"У жінки — амбітність і самостійність; важливо не жертвувати сім’єю заради гонки.",
mm:"У чоловіка — воїн і досягатор; урок — не воювати з близькими."},
{n:"Справедливість",kw:["закон","баланс","чесність","наслідки"],
d:"Справедливість — енергія закону, порядку і кармічної рівноваги. Вона вчить, що кожна дія має наслідок. Людина з цією енергією чесна, логічна, вимоглива до себе й інших, має сильне почуття справедливості й здатна бути арбітром. Вона добре працює з документами, правом, фінансами, контролем якості. Урок — бути справедливим без жорстокості й не ставати суддею для всіх навколо.",
p:"Чесність, об’єктивність, порядок, відповідальність, логіка, здатність до балансу.",
m:"Осуд, критиканство, звинувачення, бюрократизм, судові конфлікти, образи на несправедливість.",
pers:"Ви людина принципів — вас поважають за чесність і справедливість.",
tal:"талант до права, аналітики, фінансів, документів і рішень, де потрібна неупередженість",
money:"гроші через закон, документи, аналіз, роботу «за правилами»; нечесні схеми блокують дохід",
love:"важливі рівність і чесність у парі; не перетворюйте стосунки на суд",
karma:"у минулому — суддя чи людина при владі, яка могла судити несправедливо або порушувати закон",
task:"відновити баланс: чесно відповідати за свої вчинки й не засуджувати інших",
pur:"нести справедливість і порядок, бути об’єктивним посередником",
f:"У жінки — сильна логіка й принциповість; урок — м’якість у судженнях.",
mm:"У чоловіка — чесний і надійний арбітр; ризик — холодність і категоричність."},
{n:"Відлюдник",kw:["мудрість","глибина","усамітнення","пошук"],
d:"Відлюдник — енергія мудрості, внутрішнього пошуку й глибини. Людина з нею потребує тиші, часу наодинці, подорожей і пізнання сенсів. Вона — фахівець своєї справи, вузький експерт, філософ, шукач істини. Відлюдник освітлює ліхтарем дорогу іншим, але сам часто самотній. Урок — ділитися мудрістю, не відгороджуватися від людей і не жити минулим.",
p:"Мудрість, глибина, експертність, самодостатність, вміння бачити суть.",
m:"Самотність, замкненість, песимізм, скупість, страх майбутнього, депресивність.",
pers:"Ви здаєтеся стриманою й мудрою людиною, яка цінує тишу.",
tal:"талант до глибокої експертизи, досліджень, філософії, навчання й подорожей",
money:"гроші через експертність, вузьку спеціалізацію, консультації, зосереджену роботу",
love:"потрібні простір і глибина; поверхові стосунки виснажують",
karma:"у минулому — мудрець чи самітник, який пішов від людей і не поділився знанням",
task:"вийти до людей і ділитися досвідом, не боячись бути почутим",
pur:"бути мудрим провідником, ліхтарем для інших",
f:"У жінки — внутрішня глибина; важливо не замикатися в самотності.",
mm:"У чоловіка — мудрець-експерт; ризик — емоційна віддаленість від родини."},
{n:"Колесо Фортуни",kw:["потік","удача","цикли","легкість"],
d:"Колесо Фортуни — енергія потоку, удачі й життєвих циклів. Вона дає легкість, везіння, вміння опинитися в правильному місці в правильний час. Людина з нею — оптиміст, комунікабельна, швидко адаптується, любить подорожі й різноманіття. Енергія вчить довіряти життю й рухатися разом з його ритмом. Урок — не чекати дива пасивно і не пливти за течією без власного вибору.",
p:"Удача, легкість, оптимізм, гнучкість, комунікабельність, вміння бачити можливості.",
m:"Пасивність, залежність від обставин, нестабільність, азартність, хаос.",
pers:"Ви легка, оптимістична людина, якій часто щастить.",
tal:"талант відчувати можливості, працювати з людьми, торгувати, подорожувати",
money:"гроші через потік, удачу, торгівлю, мережу контактів; не тримайтеся лише за одне джерело",
love:"легкість і радість у стосунках; не варто покладатися лише на долю",
karma:"у минулому — життя в залежності від обставин, азарт або змарнований шанс",
task:"довіряти потоку, але робити власний вибір і брати відповідальність",
pur:"нести легкість і віру в можливості, допомагати людям ловити свій шанс",
f:"У жінки — легкість і чарівність удачі.",
mm:"У чоловіка — фарт і підприємливість; урок — стабільність і завершеність."},
{n:"Сила",kw:["енергія","витримка","пристрасть","тіло"],
d:"Сила — енергія потужного життєвого ресурсу, витримки й пристрасті. Це здатність приборкати інстинкти, перетворити емоцію на дію і працювати з великим навантаженням. Людина з цією енергією вольова, працездатна, з сильним тілом і темпераментом; вона піднімає важке й веде інших. Енергії потрібні спорт, фізична активність і чесне вираження емоцій. Урок — використовувати силу м’яко, не через агресію і не на межі виснаження.",
p:"Витримка, сміливість, працездатність, пристрасть, лідерство, енергійність.",
m:"Агресія, впертість, перевтома, вибухи гніву, жорсткість, перенапруження тіла.",
pers:"Ви сильна, енергійна людина з потужним темпераментом.",
tal:"талант до спорту, роботи з тілом, лідерства, бізнесу, роботи під навантаженням",
money:"гроші через працю, витримку, спорт, лідерство; ресурс потребує відновлення",
love:"пристрасні стосунки; важливо не придушувати партнера своєю силою",
karma:"у минулому — фізична сила або влада, яку могли застосовувати як агресію чи тиск",
task:"перетворити силу на м’якість і підтримку, керувати емоціями",
pur:"бути джерелом сили й підтримки, вести своїм прикладом",
f:"У жінки — внутрішня потужність; важливо не тягнути все на собі.",
mm:"У чоловіка — фізична й вольова сила; урок — контроль гніву."},
{n:"Повішений",kw:["служіння","інший погляд","творчість","пауза"],
d:"Повішений — енергія служіння, іншого погляду на світ і глибокої творчості. Людина з нею бачить те, чого не помічають інші, мислить нестандартно і часто почувається «не з цього світу». Її сила — у допомозі людям, творчості, духовності, мистецтві. Повішений вчить відпускати контроль і змінювати кут зору. Урок — служити, не стаючи жертвою, і не обмежувати себе страхами чи залежностями.",
p:"Нестандартне мислення, творчість, емпатія, служіння, духовність, терпіння.",
m:"Жертовність, бездіяльність, «застрягання», залежності, відчуття життя на паузі.",
pers:"Ви людина з особливим поглядом на світ, творча й чуйна.",
tal:"талант до мистецтва, творчості, волонтерства, психології, допомоги людям",
money:"гроші через допомогу людям, творчість і нестандартні рішення; не працюйте безкоштовно з жертовності",
love:"ризик жертовності у стосунках; потрібна рівність, а не «порятунок» партнера",
karma:"у минулому — обмеження свободи, жертва або служіння, в якому ви втратили себе",
task:"звільнитися від ролі жертви, служити зі свободи, а не з обов’язку",
pur:"допомагати людям побачити світ інакше, нести творчість і співчуття",
f:"У жінки — тонка творча душа; урок — не жертвувати собою заради інших.",
mm:"У чоловіка — нестандартний мислитель; ризик — пасивність і залежності."},
{n:"Смерть",kw:["трансформація","оновлення","завершення","сміливість"],
d:"Смерть — енергія трансформації, кардинальних змін і оновлення. Вона вчить завершувати старе, щоб звільнити місце новому. Людина з цією енергією не боїться криз, сміливо змінює роботу, місце, образ, часто любить екстрим і швидкість. Вона чудово працює там, де потрібні реформи, точність і вміння «відрізати» зайве. Урок — не руйнувати бездумно і не триматися за те, що вже віджило.",
p:"Сміливість, здатність до змін, оновлення, глибина, витривалість у кризах.",
m:"Страх змін або бездумне руйнування, екстрим і ризик, різкість, депресивні стани, втрати.",
pers:"Ви людина змін — вмієте починати заново й не боїтеся криз.",
tal:"талант трансформувати: реформи, кризовий менеджмент, медицина, психологія, стиль і перевтілення",
money:"гроші через зміни, оновлення, кризові ситуації та сміливі рішення; застій перекриває потік",
love:"стосунки проходять через трансформації; важливо вчасно відпускати те, що віджило",
karma:"у минулому — різкі обриви, загибель, руйнування або страх змін, що заблокував розвиток",
task:"прийняти зміни як ресурс, вчасно завершувати й оновлюватися",
pur:"допомагати людям проходити трансформацію й народжуватися заново",
f:"У жінки — сильна здатність до перевтілення; урок — м’які завершення.",
mm:"У чоловіка — тяга до ризику; важливо берегти себе від небезпек."},
{n:"Помірність",kw:["гармонія","баланс","душа","міра"],
d:"Помірність — енергія гармонії, балансу та душі. Людина з нею спокійна, врівноважена, тонка, з розвиненим смаком і чуттям міри. Вона вміє поєднувати протилежності, лікувати словом, створювати атмосферу. Сфери реалізації — мистецтво, дизайн, медицина, психологія, кулінарія, усе, що потребує відчуття пропорції. Урок — не впадати в крайнощі й не жертвувати собою заради чужого спокою.",
p:"Гармонія, терпіння, смак, цілительство, витонченість, миролюбність.",
m:"Крайнощі, байдужість, повільність, невміння відмовити, залежності, відстороненість.",
pers:"Ви врівноважена, тонка людина, поруч із якою спокійно.",
tal:"талант до мистецтва, дизайну, цілительства, творчості й створення гармонії",
money:"гроші через красу, гармонію, медицину, мистецтво; потрібен спокійний темп без надриву",
love:"потрібні гармонія, ніжність і спокій; конфлікти виснажують",
karma:"у минулому — порушення міри, крайнощі, втрата зв’язку з душею",
task:"знайти внутрішній баланс і жити в гармонії з собою",
pur:"нести гармонію, зцілювати, створювати красу й мир",
f:"У жінки — ніжність, смак і витонченість.",
mm:"У чоловіка — чуйність і дипломатія; урок — рішучість."},
{n:"Диявол",kw:["харизма","гроші","спокуса","вплив"],
d:"Диявол — енергія харизми, магнетизму, грошей і спокуси. Вона дає потужну привабливість, сексуальність, вміння впливати й заробляти. Людина з нею яскрава, підприємлива, знає ціну речам і людям, легко веде за собою. Водночас ця енергія перевіряє залежностями: від грошей, задоволень, людей, влади. Урок — використовувати харизму чесно й бути вільним від того, що намагається тебе контролювати.",
p:"Харизма, лідерство, підприємливість, сексуальність, гумор, вміння заробляти.",
m:"Залежності, маніпуляції, обман, жадібність, ревнощі, контроль, руйнівні пристрасті.",
pers:"Ви харизматична, яскрава людина з сильним магнетизмом.",
tal:"талант до бізнесу, продажів, маркетингу, публічності, лідерства й впливу",
money:"сильна грошова енергія: великі суми через бізнес, вплив і харизму — за умови чесності",
love:"пристрасть і магнетизм; ризик залежних і токсичних стосунків, ревнощів",
karma:"у минулому — залежності, маніпуляції або зловживання владою, грошима чи пристрастю",
task:"звільнитися від залежностей і використовувати свою силу впливу чесно",
pur:"показувати людям, як бути вільними, використовувати харизму на добро",
f:"У жінки — фатальна привабливість; урок — не грати на маніпуляціях.",
mm:"У чоловіка — лідер-підприємець; ризик — зради й залежності."},
{n:"Вежа",kw:["будівництво","руйнування старого","пробудження","масштаб"],
d:"Вежа — енергія руйнування застарілих структур і будівництва нового. Вона приносить раптові зміни й кризи, що звільняють від ілюзій та гордині. У плюсі людина з Вежею — будівничий: створює бізнес, зводить дім, вибудовує систему чи духовний шлях. Вона вміє починати з нуля після падіння. Урок — смирення, відмова від гордині й творення замість руйнування.",
p:"Будівництво, масштаб, сила відродження, духовне пробудження, витривалість.",
m:"Гординя, руйнування стосунків і справ, конфлікти, раптові втрати, травматизм.",
pers:"Ви людина масштабу: будуєте, перебудовуєте і знову будуєте.",
tal:"талант до будівництва, архітектури, масштабних проєктів, реформ і кризового управління",
money:"гроші через будівництво, нерухомість, великі проєкти; гординя та ризики руйнують капітал",
love:"стосунки перевіряються кризами; важливо будувати разом, а не воювати",
karma:"у минулому — гординя, зруйнована родина чи справа, побудована на хибному фундаменті",
task:"будувати на чесному фундаменті й відпускати гординю",
pur:"будувати нове: системи, доми, спільноти, духовні опори",
f:"У жінки — сила відбудувати все з нуля; урок — м’якість.",
mm:"У чоловіка — будівничий-творець; ризик — гординя й конфлікти."},
{n:"Зірка",kw:["талант","натхнення","визнання","надія"],
d:"Зірка — енергія таланту, натхнення й визнання. Людина з нею творча, естетична, має смак і вроджене відчуття прекрасного; її помічають і пам’ятають. Зірка дає надію, мрію й віру в майбутнє, зв’язок із творчим потоком. Реалізація — мистецтво, медіа, мода, блогінг, публічні професії. Урок — дозволити собі сяяти й не жити лише мріями, перетворюючи натхнення на результат.",
p:"Талант, натхнення, оптимізм, привабливість, творча свобода, вміння надихати.",
m:"Зіркова хвороба, мрійливість без дії, марнославство, страх бути видимою людиною, розчарування.",
pers:"Ви привертаєте увагу — у вас є внутрішнє сяйво й смак.",
tal:"талант до мистецтва, творчості, медіа, моди, публічності й натхнення інших",
money:"гроші через творчість, видимість, особистий бренд і публічність",
love:"потрібні захоплення й натхнення; важливо не ідеалізувати партнера",
karma:"у минулому — нереалізований талант, слава без змісту або страх бути помітною людиною",
task:"проявити свій талант і дати собі право бути видимою людиною",
pur:"надихати, нести красу й надію, бути прикладом творчої свободи",
f:"У жінки — краса, смак і творчий магнетизм.",
mm:"У чоловіка — творча обдарованість; урок — дія, а не лише мрії."},
{n:"Місяць",kw:["уява","інтуїція","підсвідоме","страхи"],
d:"Місяць — енергія підсвідомого, уяви та інтуїції. Вона дає багату фантазію, творчий дар, тонке відчуття атмосфери й людей. Людина з Місяцем може бути художником, психологом, дизайнером, працювати з образами, снами, рекламою. Тіньова сторона — страхи, тривожність, ілюзії, самообман. Урок — дивитися страхам в очі, відрізняти інтуїцію від тривоги і втілювати уяву в реальність.",
p:"Уява, інтуїція, творчість, чуйність, глибина, естетика.",
m:"Страхи, тривоги, ілюзії, самообман, залежності, пригніченість, недовіра.",
pers:"Ви тонка, чуйна людина з багатим внутрішнім світом.",
tal:"талант до візуального мистецтва, психології, реклами, дизайну, роботи з образами",
money:"гроші через уяву, творчість, візуальні та психологічні напрями; страх блокує дохід",
love:"глибокі емоції; ризик ревнощів, ілюзій і недовіри до партнера",
karma:"у минулому — страхи, ілюзії, магія або обман, що змушували жити в тіні",
task:"подолати страхи, навчитися довіряти собі й реальності",
pur:"допомагати людям розуміти свою підсвідомість, створювати образи, що зцілюють",
f:"У жінки — сильна інтуїція й чарівність; урок — не тонути в тривогах.",
mm:"У чоловіка — творча уява; ризик — ілюзії та втеча від реальності."},
{n:"Сонце",kw:["радість","успіх","лідерство","тепло"],
d:"Сонце — енергія радості, успіху, тепла й щедрості. Людина з нею сяє, притягує людей, легко досягає результатів і надихає оптимізмом. Вона природний лідер, здатна зігрівати, підтримувати, бути в центрі уваги. Сонце пов’язане з дітьми, творчістю, публічністю та процвітанням. Урок — світити, не обпікаючи, і не ставити себе в центр світу.",
p:"Оптимізм, щедрість, лідерство, успіх, тепло, енергія, відкритість.",
m:"Гординя, егоцентризм, марнославство, вигорання, бажання завжди бути першим.",
pers:"Ви сонячна, відкрита людина, яка заряджає оптимізмом.",
tal:"талант до лідерства, публічності, творчості, роботи з дітьми та командами",
money:"гроші через лідерство, публічність, щедрість і радість від справи — гроші люблять ваш оптимізм",
love:"тепло, щедрість і радість; ризик — потреба бути в центрі уваги партнера",
karma:"у минулому — гординя або егоїзм, небажання ділитися своїм світлом",
task:"бути щедрим без марнославства, світити для інших",
pur:"нести радість, тепло й успіх, надихати людей",
f:"У жінки — сяйво й щедрість; урок — дбати й про себе.",
mm:"У чоловіка — природний лідер; ризик — его."},
{n:"Суд",kw:["рід","сім’я","усвідомлення","перезавантаження"],
d:"Суд — енергія роду, сім’ї та пробудження. Вона пов’язує людину з предками, родовими програмами й ресурсами. Людина з цією енергією шанує сімейні цінності, має сильне відчуття коріння, потребує близьких поруч. Суд дає здатність переосмислювати, усвідомлювати і «перезавантажуватися». Урок — прийняти свій рід, взяти від нього силу і звільнитися від родових сценаріїв, які не служать.",
p:"Родинність, мудрість поколінь, усвідомленість, вміння пробачати й переосмислювати.",
m:"Образи на рідних, конфлікти в родині, осуд, повторення родових сценаріїв, зарозумілість.",
pers:"Ви людина сім’ї та коріння — для вас важливі близькі.",
tal:"талант до сімейної справи, генеалогії, психології, роботи з родинними системами й історією",
money:"гроші через сімейний бізнес, підтримку роду, спадок, роботу з родинами",
love:"стосунки орієнтовані на сім’ю; важливо прийняти родину партнера",
karma:"у минулому — розрив із родом, відмова від сім’ї або засудження близьких",
task:"прийняти рід і пробачити, взяти родову силу й не повторювати чужі сценарії",
pur:"поєднувати родину, нести мудрість поколінь, допомагати людям пробуджуватися",
f:"У жінки — хранителька роду й домашнього вогнища.",
mm:"У чоловіка — голова родини; урок — шанувати батьків."},
{n:"Світ",kw:["масштаб","свобода","мир","міжнародність"],
d:"Світ — енергія масштабу, свободи й цілісності. Людина з нею мислить широко, тяжіє до подорожей, іноземних мов, міжнародних проєктів. Вона відкрита до різних культур, миролюбна, здатна об’єднувати людей. Світ дає відчуття завершеності й гармонії з усім. Урок — не тікати від реальності в постійні переїзди й не боятися обмежень.",
p:"Масштаб, відкритість, свобода, миролюбність, дипломатія, широта поглядів.",
m:"Втеча, страх обмежень, розпорошеність, невміння вкоренитися, хаос.",
pers:"Ви відкрита людина зі світовим масштабом мислення.",
tal:"талант до міжнародних зв’язків, туризму, мов, дипломатії та масштабних проєктів",
money:"гроші через міжнародні проєкти, подорожі, іноземних клієнтів і широкий масштаб",
love:"потрібні свобода й спільні горизонти; партнер може бути з іншої культури",
karma:"у минулому — війни, вигнання або обмеження свободи, втрата батьківщини",
task:"знайти свій дім у світі й нести мир",
pur:"об’єднувати людей і культури, нести мир і масштаб",
f:"У жінки — відкритість світові й дипломатія.",
mm:"У чоловіка — масштабне мислення; урок — укорінення."},
{n:"Блазень",kw:["свобода","легкість","гра","новий шлях"],
d:"Блазень (Шут) — енергія свободи, легкості й безмежних можливостей. Це дитяча безпосередність, гра, гумор, вміння починати з чистого аркуша. Людина з нею творча, нестандартна, не терпить рамок, легко адаптується й надихає інших на свободу. Сфери — творчість, робота з дітьми, подорожі, гумор, події. Урок — бути вільним відповідально, не плутаючи свободу з безтурботністю.",
p:"Свобода, легкість, гумор, креативність, відкритість, щирість.",
m:"Безвідповідальність, інфантильність, хаос, втеча від зобов’язань, ризиковані вчинки.",
pers:"Ви легка, вільна людина з гарним почуттям гумору.",
tal:"талант до творчості, гри, роботи з дітьми, гумору, подорожей і нестандартних рішень",
money:"гроші через свободу, творчість, гру, нестандартні формати; жорсткі рамки перекривають потік",
love:"потрібні свобода й легкість; ризик уникати зобов’язань",
karma:"у минулому — обмеження свободи (неволя, ув’язнення) або безвідповідальність",
task:"бути вільним і відповідальним водночас, відкрити в собі дитячу радість",
pur:"нести свободу й радість, звільняти людей від рамок",
f:"У жінки — легкість і дитяча щирість.",
mm:"У чоловіка — вільний дух; урок — дорослішання."}
];

/* ---------- extended arcana data: spheres of realisation, practical steps, resource & signals ---------- */
const EX=[null,
{prof:"підприємництво, продажі, маркетинг, викладання, журналістика, IT, переговори, блогінг",how:["Доводьте до кінця хоча б одну справу, перш ніж братися за нову","Навчайтеся постійно — нові знання живлять цю енергію","Говоріть чесно: ваше слово має вагу і швидко втілюється","Плануйте день і фіксуйте результати"],hp:"Ресурс — рух, нове, спілкування; сили швидко повертаються, коли є цікава справа",hm:"Сигнали перевантаження — нервове виснаження, напруга в голові, безсоння через потік думок"},
{prof:"психологія, аналітика, наука, консультування, медицина, дослідження, робота з інформацією",how:["Щодня залишайте час на тишу й самоспостереження","Записуйте інтуїтивні здогадки й перевіряйте їх","Діліться знаннями, а не тримайте їх у собі","Відмовтеся від пліток і чужих таємниць"],hp:"Ресурс — тиша, вода, природа, навчання, якісний сон",hm:"Сигнали — гормональні коливання, втома від людей, накопичення невиражених емоцій"},
{prof:"дизайн, мода, б’юті, кулінарія, педагогіка, готельна справа, творчість, робота з дітьми",how:["Даруйте собі задоволення без почуття провини","Доглядайте тіло й простір навколо себе","Створюйте щось руками — творчість відкриває потік","Піклуйтеся, не контролюючи"],hp:"Ресурс — краса, тілесні практики, природа, смачна їжа, творчість",hm:"Сигнали — емоційне переїдання, гормональні збої, апатія від життя «на обов’язку»"},
{prof:"управління, власний бізнес, держслужба, військова справа, будівництво, фінанси, логістика",how:["Ставте чіткі цілі та плани","Делегуйте замість того, щоб контролювати все","Будьте опорою, а не наглядачем","Налагодьте стосунки з батьком або з образом батька в собі"],hp:"Ресурс — порядок, режим, спорт, досягнуті цілі",hm:"Сигнали — напруга в спині й шиї, скачки тиску, перевтома від гіперконтролю"},
{prof:"викладання, менторство, право, психологія, культура, коучинг, наука",how:["Навчайтеся в наставників і самі ставайте наставником","Пояснюйте, а не моралізуйте","Шануйте традиції роду й сім’ї","Тримайте слово"],hp:"Ресурс — навчання, віра, однодумці, сімейні традиції",hm:"Сигнали — напруга в горлі, шиї, плечах; втома від надмірного обов’язку"},
{prof:"робота з людьми, HR, організація подій, б’юті, мистецтво, дизайн, PR, партнерські проєкти",how:["Ухвалюйте рішення серцем, а не з огляду на чужу думку","Розвивайте самоцінність — вона основа стосунків","Оточуйте себе красою й людьми, яких любите","Будьте чесними у виборі"],hp:"Ресурс — любов, спілкування, краса, гармонійні стосунки",hm:"Сигнали — сердечні переживання, тривога через схвалення, втома від чужих очікувань"},
{prof:"логістика, туризм, спорт, продажі, менеджмент проєктів, транспорт, військова справа",how:["Формулюйте мету й рухайтеся до неї щодня","Подорожуйте й змінюйте обстановку","Давайте собі паузи — швидкість без відпочинку виснажує","Перетворюйте конкуренцію на спільну мету"],hp:"Ресурс — рух, подорожі, спорт, досягнення",hm:"Сигнали — травми через поспіх, напруга, перевтома, роздратування"},
{prof:"право, юриспруденція, бухгалтерія, аудит, контроль якості, держслужба, медіація",how:["Ухвалюйте рішення чесно й зважено","Тримайте документи й фінанси в порядку","Відпускайте образи на несправедливість","Не беріть на себе роль судді"],hp:"Ресурс — порядок, чесність, баланс праці й відпочинку",hm:"Сигнали — напруга від невирішених конфліктів, порушення балансу, перевантаження обов’язками"},
{prof:"наука, аналітика, IT, філософія, психологія, експертиза, туризм, письменство",how:["Плануйте час наодинці без почуття провини","Діліться знаннями з людьми","Подорожуйте й шукайте нові сенси","Не застрягайте в минулому"],hp:"Ресурс — тиша, природа, подорожі, глибоке навчання",hm:"Сигнали — пригніченість від ізоляції, мерзлякуватість, втома від людей"},
{prof:"торгівля, туризм, комунікації, нетворкінг, організація подій, фінанси, медіа",how:["Кажіть «так» новим можливостям","Розширюйте коло знайомств","Завершуйте цикли, щоб відкривалися нові","Не ставте все на одну карту"],hp:"Ресурс — легкість, нові враження, подорожі, люди",hm:"Сигнали — збитий режим, перепади настрою, виснаження від хаосу"},
{prof:"спорт, фітнес, бізнес, керівництво, медицина, робота з тваринами, робота під навантаженням",how:["Регулярний спорт — обов’язкова умова","Проживайте емоції, а не тримайте їх у собі","Чергуйте навантаження й відновлення","Використовуйте силу для підтримки, а не тиску"],hp:"Ресурс — фізична активність, тіло, природа, дія",hm:"Сигнали — напруга в м’язах і спині, підвищений тиск, спалахи гніву від перевтоми"},
{prof:"мистецтво, психологія, медицина, волонтерство, соціальна робота, духовні практики, дизайн",how:["Допомагайте людям, але ставте межі","Займайтеся творчістю регулярно","Відмовтеся від залежностей","Дивіться на проблему з іншого боку"],hp:"Ресурс — творчість, служіння, медитація, сон",hm:"Сигнали — застій, млявість, залежності, відчуття «підвішеності»"},
{prof:"медицина, хірургія, психологія, кризовий менеджмент, стиль, реставрація, екстремальні професії",how:["Регулярно позбувайтеся непотрібного","Не бійтеся починати заново","Зменшуйте ризики — ця енергія тяжіє до екстриму","Проживайте завершення, а не тікайте від них"],hp:"Ресурс — оновлення, зміни, очищення простору",hm:"Сигнали — страх змін, різкі спади сил, тяга до ризику"},
{prof:"мистецтво, дизайн, медицина, психологія, кулінарія, естетика, гармонізація простору",how:["Шукайте золоту середину","Дбайте про душевний спокій","Створюйте красу й гармонію навколо","Вчіться відмовляти"],hp:"Ресурс — спокій, мистецтво, вода, повільний темп",hm:"Сигнали — коливання між крайнощами, залежності, втома від чужих конфліктів"},
{prof:"бізнес, продажі, маркетинг, фінанси, шоу-бізнес, ресторанна справа, публічність",how:["Чесно заробляйте й витрачайте","Відстежуйте залежності й звільняйтеся від них","Використовуйте харизму на добро","Не маніпулюйте"],hp:"Ресурс — задоволення в міру, харизма, гумор, пристрасть до справи",hm:"Сигнали — залежності, переїдання, виснаження від надмірностей"},
{prof:"будівництво, архітектура, нерухомість, великий бізнес, реформи, кризове управління",how:["Будуйте поступово й на чесному фундаменті","Відпускайте гординю","Приймайте кризи як шанс","Створюйте, а не руйнуйте"],hp:"Ресурс — будівництво, фізична праця, творення",hm:"Сигнали — травми, раптові кризи самопочуття, напруга від конфліктів"},
{prof:"мистецтво, медіа, мода, блогінг, дизайн, фотографія, публічні виступи",how:["Регулярно показуйте свою творчість","Ставте мрії в календар","Дбайте про естетику навколо","Надихайте інших"],hp:"Ресурс — творчість, краса, натхнення, визнання",hm:"Сигнали — розчарування, втома від невизнання, коливання самооцінки"},
{prof:"мистецтво, дизайн, реклама, кіно, психологія, фотографія, робота з образами",how:["Дивіться страхам в очі й перевіряйте їх реальністю","Ведіть щоденник снів або інтуїтивних відчуттів","Втілюйте уяву в творчість","Обирайте довіру замість підозр"],hp:"Ресурс — творчість, вода, сон, інтуїтивні практики",hm:"Сигнали — тривожність, безсоння, страхи, емоційні гойдалки"},
{prof:"керівництво, публічність, робота з дітьми, шоу-бізнес, творчість, освіта",how:["Діліться теплом і успіхом","Хваліть людей поруч","Відпочивайте, щоб не вигоріти","Відмовтеся від прагнення завжди бути першим"],hp:"Ресурс — сонце, радість, діти, успіх, визнання",hm:"Сигнали — вигорання, перегрів, втома від постійної ролі лідера"},
{prof:"сімейний бізнес, психологія, генеалогія, педагогіка, історія, соціальна робота",how:["Прийміть батьків і рід","Підтримуйте зв’язок із родиною","Переосмислюйте досвід і вчасно «перезавантажуйтеся»","Не засуджуйте"],hp:"Ресурс — родина, коріння, родинні традиції, усвідомленість",hm:"Сигнали — образи на рідних, втома від сімейних конфліктів, повторення родових сценаріїв"},
{prof:"міжнародний бізнес, туризм, дипломатія, мови, логістика, масштабні проєкти",how:["Розширюйте горизонти — мови, подорожі, нові культури","Знайдіть місце, де відчуваєте себе вдома","Доводьте великі етапи до завершення","Несіть мир у конфлікти"],hp:"Ресурс — простір, подорожі, свобода, масштаб",hm:"Сигнали — відчуття обмеженості, розпорошеність, втома від невизначеності"},
{prof:"творчість, події, робота з дітьми, гумор, анімація, туризм, стартапи",how:["Залишайте в житті місце для гри та легкості","Беріть відповідальність за свої вибори","Пробуйте нестандартні рішення","Дорослішайте, зберігаючи дитячу щирість"],hp:"Ресурс — свобода, гра, сміх, спонтанність",hm:"Сигнали — хаос у режимі, безтурботність щодо здоров’я, втома від рамок"}
];
EX.forEach((e,i)=>{if(e)Object.assign(ARC[i],e)});

/* ---------- chakras (health map) ---------- */
const CHAK=[
 {n:"Сахасрара",c:'var(--p-violet)',z:"тім’я, мозок, нервова система",t:"зв’язок із сенсом, світогляд, духовність, якість мислення",ph:['A','B'],pr:"тиша й медитація, читання, час на природі без гаджетів"},
 {n:"Аджна",c:'var(--p-blue)',z:"лоб, очі, голова",t:"інтуїція, ясність бачення, цілі, уява",ph:['A1','B1'],pr:"щоденник інтуїції, візуалізація цілей, відпочинок для очей"},
 {n:"Вішудха",c:'var(--p-cyan)',z:"горло, шия, щитоподібна залоза",t:"самовираження, комунікація, творчість, право голосу",ph:['A2','B2'],pr:"говорити про свої потреби вголос, спів, письмо"},
 {n:"Анахата",c:'var(--p-green)',z:"груди, серце, легені",t:"любов, прийняття, співчуття, стосунки",ph:['A3','B3'],pr:"практика вдячності й прощення, дихальні вправи, обійми"},
 {n:"Маніпура",c:'var(--p-gold)',z:"сонячне сплетіння, травлення",t:"воля, особиста сила, межі, ядро характеру",ph:['E','E'],pr:"рішення без відкладання, спорт, чіткі особисті межі"},
 {n:"Свадхістана",c:'var(--p-rose)',z:"низ живота, нирки, репродуктивна сфера",t:"задоволення, бажання, сексуальність, гроші, творча енергія",ph:['C2','D2'],pr:"творчість, танець, задоволення без провини, контакт із водою"},
 {n:"Муладхара",c:'var(--p-red)',z:"основа хребта, ноги, кістки",t:"безпека, виживання, тіло, матеріальна опора",ph:['C','D'],pr:"ходьба, режим сну, фінансова подушка, контакт із землею"}
];

/* ---------- how each energy is lived, cause→effect links, year scenarios ---------- */
const EX2=[null,
{live:"Енергія Мага проживається через дію і слово: ідея з’являється — і людина одразу хоче її втілити. У плюсі це відчуття «я можу», легкість старту, жива цікавість, вміння знайти рішення там, де інші бачать глухий кут. У мінусі — метушня, десятки незавершених справ, втома від власного розуму і бажання впливати на людей хитрістю, а не чесно.",
cause:["Коли ви доводите справи до кінця — зростає довіра людей і з’являється стабільний дохід","Коли слово розходиться з ділом — руйнується репутація, і нові старти не злітають","Коли розум перевантажений — з’являються безсоння, дратівливість і розпорошення"],
yp:["запуск власного проєкту, нова робота або підвищення завдяки ініціативі","навчання, курси, нова професія, вдалі переговори й угоди","знайомства, що відкривають двері, публічні виступи, перші клієнти"],
ym:["багато почато — мало завершено, проєкти «зависають»","обман або маніпуляції з боку партнерів чи власні хитрощі, що повертаються бумерангом","нервове виснаження, конфлікти через різкі слова"],
yw:["Оберіть 1–2 головні цілі року й доведіть їх до результату","Вчіться новому щомісяця й одразу застосовуйте","Фіксуйте домовленості письмово, говоріть чесно"]},
{live:"Жриця проживається всередині: через відчуття, сни, тихе знання, що приходить раніше за факти. У плюсі людина спокійна, прониклива, вміє вчасно промовчати й точно відчуває людей. У мінусі накопичуються невисловлені емоції, з’являються недовіра, закритість, бажання контролювати через інформацію або плітки.",
cause:["Коли ви довіряєте інтуїції — рішення виявляються точними, а помилок стає менше","Коли емоції стримуються роками — тіло відповідає гормональними збоями й апатією","Коли знання не передаються — енергія застоюється, і з’являється відчуття самотності"],
yp:["навчання психології, аналітиці, езотериці; поява наставника","точні інтуїтивні рішення, вдалі делікатні домовленості","глибоке зближення з однією людиною, внутрішній спокій"],
ym:["інтриги, плітки, таємниці, що спливають","ізоляція, недовіра, відчуження від близьких","гормональні коливання, накопичена втома"],
yw:["Щодня залишайте 20 хвилин тиші й записуйте відчуття","Розкажіть близькій людині те, що давно тримаєте в собі","Діліться знаннями — навчайте, консультуйте"]},
{live:"Імператриця проживається тілом і чуттями: через смак, красу, дотики, творчість і турботу. У плюсі життя наповнене задоволенням, ресурсом, теплом — і гроші приходять легше. У мінусі людина живе «на обов’язку», забуває про себе, контролює близьких через опіку або, навпаки, впадає в лінощі й марнотратство.",
cause:["Коли ви дозволяєте собі задоволення — з’являється енергія, і достаток зростає","Коли жертвуєте собою заради інших — накопичуються образа й виснаження","Коли творчість заблокована — гасне привабливість і зникає легкість у грошах"],
yp:["вагітність, народження дитини або нового творчого проєкту","покращення фінансів, облаштування дому, гарні покупки","розквіт стосунків, турбота й ніжність у парі"],
ym:["емоційні гойдалки, ревнощі, гіперопіка","марнотратство або, навпаки, жорстка економія на собі","погіршення самопочуття через життя без задоволення"],
yw:["Щотижня робіть щось лише для власного задоволення","Займіться творчістю або облаштуванням простору","Піклуйтеся про близьких без контролю"]},
{live:"Імператор проживається через відповідальність, структуру й результат. У плюсі людина збирає життя в систему — цілі, план, порядок — і довкола неї стає безпечно. У мінусі з’являються жорсткий контроль, тиск на інших, трудоголізм і внутрішня напруга, яку відчуває тіло.",
cause:["Коли ви берете відповідальність — зростають статус і довіра, приходять гроші","Коли контролюєте все самі — команда пасивніє, а ви вигоряєте","Коли конфлікт із батьком не прожитий — важко приймати авторитети й будувати кар’єру"],
yp:["кар’єрне зростання, керівна посада, власний бізнес","купівля нерухомості, стабілізація фінансів","структура в житті: режим, плани, чіткі домовленості"],
ym:["конфлікти з керівниками або батьком, боротьба за владу","перевтома, напруга в тілі, трудоголізм","жорсткість у сім’ї, втрата близькості через контроль"],
yw:["Поставте річну ціль і розбийте її на квартали","Делегуйте хоча б третину справ","Помиріться з образом батька: напишіть лист, поговоріть"]},
{live:"Ієрофант проживається через знання, цінності й наставництво. У плюсі людина знаходить свою систему переконань, учителів і сама стає опорою для інших. У мінусі з’являються моралізаторство, догматизм, позиція «я краще знаю» і страх вийти за межі правил.",
cause:["Коли ви навчаєтеся й навчаєте — відкриваються двері й надійні зв’язки","Коли нав’язуєте свою думку — люди віддаляються, а авторитет падає","Коли живете за чужими правилами — губиться власний сенс"],
yp:["шлюб або офіційне оформлення стосунків","навчання, диплом, наставник, нова кваліфікація","успішні справи з документами й офіційними структурами"],
ym:["конфлікти поглядів, моралізаторство в родині","бюрократичні затримки, проблеми з документами","застій через страх порушити правила"],
yw:["Знайдіть наставника або станьте ним","Перегляньте свої цінності й залиште лише власні","Тримайте слово — навіть у дрібницях"]},
{live:"Закохані проживаються через вибір і стосунки. У плюсі людина обирає серцем, відкрито любить, приваблює й поєднує людей. У мінусі вона залежить від чужого схвалення, вагається між варіантами, ідеалізує партнера й боїться помилитися з вибором.",
cause:["Коли ви обираєте серцем — з’являються щастя, легкість і правильні люди","Коли обираєте з розрахунку чи страху — накопичується розчарування","Коли самоцінність низька — стосунки стають залежними"],
yp:["нове кохання, знайомство, весілля або оновлення почуттів","вдалий вибір роботи «по душі», партнерські проєкти","краса, гармонія, нові друзі"],
ym:["складний вибір, любовні трикутники, сумніви","залежність від думки партнера, ревнощі","розчарування в людях через ідеалізацію"],
yw:["Ухвалюйте рішення, питаючи себе: «що я відчуваю?»","Працюйте із самоцінністю: щодня відзначайте свої досягнення","Будьте чесними у стосунках, не тримайте «запасних варіантів»"]},
{live:"Колісниця проживається рухом: дороги, цілі, проєкти, змагання. У плюсі людина впевнено веде себе й інших, досягає мети й любить зміну обстановки. У мінусі — гонка без мети, нетерпіння, агресія на тих, хто «гальмує», і страх зупинитися.",
cause:["Коли є ясна мета — енергія концентрується і приходять перемоги","Коли ви біжите без мети — виснаження і травми через поспіх","Коли настає застій — з’являються дратівливість і конфлікти"],
yp:["переїзд, подорожі, відрядження, нове авто","кар’єрний ривок, перемоги, досягнення мети","спорт, активність, нові горизонти"],
ym:["конфлікти, агресія, суперництво","травми через поспіх — будьте уважні в дорозі","гонка, вигорання, віддалення від близьких"],
yw:["Сформулюйте одну головну мету року","Плануйте подорожі — рух живить цю енергію","Чергуйте ривки з відпочинком"]},
{live:"Справедливість проживається через баланс і наслідки: що віддали — те й отримали. У плюсі людина чесна, послідовна, і в її житті все «сходиться». У мінусі вона судить себе й інших, ображається на несправедливість, застрягає в конфліктах і судах.",
cause:["Коли ви чесні — життя повертає вам справедливо","Коли засуджуєте — притягуєте осуд і конфлікти","Коли ігноруєте домовленості — приходять юридичні й фінансові наслідки"],
yp:["виграні справи, офіційні рішення на вашу користь","договори, угоди, порядок у документах","відновлення справедливості, повернення боргів"],
ym:["суди, штрафи, конфлікти через документи","образи, осуд, звинувачення","наслідки минулих нечесних рішень"],
yw:["Наведіть лад у документах і фінансах","Чесно закрийте старі борги й обіцянки","Відмовтеся від осуду — і себе, і інших"]},
{live:"Відлюдник проживається в глибині: через самоаналіз, пошук сенсу, експертність і тишу. У плюсі людина мудра, самодостатня, бачить суть і світить іншим. У мінусі — самотність, замкненість, песимізм, страх майбутнього і втеча від людей.",
cause:["Коли ви ділитеся знанням — з’являються учні, клієнти й визнання","Коли ізолюєтеся — наростають пригніченість і страх","Коли живете минулим — майбутнє не відкривається"],
yp:["поглиблене навчання, експертність, подорожі","переосмислення життя, нові сенси","спокій, внутрішня опора, відновлення сил"],
ym:["самотність, відчуження, апатія","песимізм, страх майбутнього, скупість","застій через надмірну обережність"],
yw:["Плануйте час наодинці, але не зникайте з життя близьких","Здійсніть подорож, яка має для вас сенс","Діліться досвідом: блог, консультації, лекції"]},
{live:"Колесо Фортуни проживається через потік подій: шанси, збіги, зміни обставин. У плюсі людина легка, оптимістична, у правильний час опиняється в правильному місці. У мінусі — пасивне очікування дива, нестабільність, азарт і відчуття, що життям керує випадок.",
cause:["Коли ви кажете «так» можливостям — удача множиться","Коли чекаєте пасивно — шанси проходять повз","Коли не завершуєте цикли — нові не починаються"],
yp:["несподівані можливості, вигідні пропозиції","подорожі, нові знайомства, легкі гроші","завершення старого етапу й початок нового циклу"],
ym:["нестабільність, хаос у планах","азартні ризики, втрати через легковажність","відчуття «колеса», коли все повторюється"],
yw:["Відповідайте на нові пропозиції швидко","Розширюйте коло спілкування","Завершіть старі справи, щоб звільнити місце новому"]},
{live:"Сила проживається через тіло, волю й пристрасть. У плюсі людина витривала, смілива, працездатна, здатна піднімати великі справи. У мінусі — гнів, впертість, бажання все тягнути самій і виснаження на межі можливостей.",
cause:["Коли тіло в русі — енергія і впевненість зростають","Коли емоції придушуються — вибухи гніву й напруга в тілі","Коли все робиться силою — втома і конфлікти"],
yp:["великі досягнення через працю й наполегливість","спорт, покращення фізичної форми","лідерство, сміливі рішення, нові вершини"],
ym:["перевтома, напруга, скачки тиску","конфлікти через різкість і гнів","впертість, яка заважає домовитися"],
yw:["Регулярний спорт — щонайменше тричі на тиждень","Проживайте емоції: говоріть, пишіть, рухайтеся","Просіть допомоги — не тягніть усе самі"]},
{live:"Повішений проживається через паузу й інший погляд на світ. У плюсі людина творча, глибока, бачить те, чого не бачать інші, і служить людям зі свободи. У мінусі — відчуття «підвішеності», жертовність, залежності й бездіяльність.",
cause:["Коли ви змінюєте кут зору — знаходиться вихід із глухого кута","Коли жертвуєте собою — накопичуються образи й залежності","Коли намагаєтеся форсувати події — все гальмується ще більше"],
yp:["творчий прорив, нові ідеї, духовне зростання","волонтерство, допомога людям, що приносить сенс","переосмислення, зміна цінностей"],
ym:["застій, «зависання» справ, відкладені плани","жертовність, використання вас іншими","залежності — від людей, їжі, гаджетів"],
yw:["Не форсуйте — зробіть паузу й перегляньте плани","Допомагайте, ставлячи межі","Позбудьтеся однієї залежності"]},
{live:"Смерть проживається через завершення й оновлення. У плюсі людина сміливо відпускає старе, змінюється і стає сильнішою після кожної кризи. У мінусі — страх змін, тримання за минуле, різкі обриви й тяга до ризику.",
cause:["Коли ви вчасно завершуєте — нове приходить легко","Коли тримаєтеся за віджиле — життя відрізає його саме, болісніше","Коли тягнетеся до екстриму — зростають ризики для тіла"],
yp:["кардинальні зміни: робота, місто, образ","звільнення від старих стосунків і звичок","нове життя після кризи"],
ym:["втрати, розриви, різкі завершення","страх змін, пригнічені стани","ризиковані ситуації — бережіть себе"],
yw:["Розберіть простір і позбудьтеся зайвого","Свідомо завершіть те, що віджило","Уникайте екстриму, обирайте безпечні зміни"]},
{live:"Помірність проживається через баланс і спокій. У плюсі людина гармонійна, лагідна, зцілює присутністю й тонко відчуває красу. У мінусі — крайнощі, байдужість, повільність, нездатність відмовити й втеча в залежності.",
cause:["Коли ви тримаєте міру — тіло й душа в гармонії","Коли кидаєтеся в крайнощі — виснаження і залежності","Коли не вмієте відмовити — накопичується втома від чужого"],
yp:["відновлення, зцілення, спокійний рік","творчість, мистецтво, краса","гармонія у стосунках, примирення"],
ym:["апатія, повільність, відкладання","крайнощі в харчуванні чи емоціях","втома від чужих конфліктів"],
yw:["Шукайте золоту середину в усьому","Додайте практики відновлення: вода, природа, сон","Навчіться казати «ні»"]},
{live:"Диявол проживається через пристрасть, гроші, вплив і спокуси. У плюсі людина харизматична, сильна в бізнесі, знає свою цінність і веде за собою. У мінусі — залежності, маніпуляції, жадібність і ревнощі, які роблять людину несвободною.",
cause:["Коли ви чесні в грошах — дохід зростає стрімко","Коли маніпулюєте — втрачаєте довіру і гроші","Коли залежності керують — енергія витікає, а стосунки руйнуються"],
yp:["великі гроші, вдалі угоди, підйом бізнесу","яскравий роман, пристрасть","публічність, вплив, зростання харизми"],
ym:["залежності, спокуси, надмірності","маніпуляції, обман, токсичні стосунки","фінансові ризики через жадібність"],
yw:["Відстежте одну залежність і звільніться від неї","Заробляйте чесно й прозоро","Використовуйте вплив, щоб допомагати"]},
{live:"Вежа проживається через руйнування старого й будівництво нового. У плюсі людина будує масштабно і вміє починати з нуля. У мінусі — гординя, конфлікти, раптові кризи, які руйнують те, що трималося на хибному фундаменті.",
cause:["Коли ви будуєте на чесному фундаменті — створене стоїть роками","Коли керує гординя — приходять раптові падіння","Коли тримаєтеся за застаріле — Вежа руйнує його сама"],
yp:["будівництво, ремонт, купівля житла","масштабний проєкт, власна справа","духовне пробудження, звільнення від ілюзій"],
ym:["раптові кризи, обвали планів","конфлікти, розриви, гординя","травми — будьте уважні до безпеки"],
yw:["Будуйте поступово, з запасом міцності","Відпускайте гординю — питайте поради","Приймайте кризи як сигнал до перебудови"]},
{live:"Зірка проживається через творчість, красу й надію. У плюсі людина сяє, надихає, її помічають, і талант перетворюється на визнання. У мінусі — мрії без дії, страх бути видимою людиною, марнославство й розчарування.",
cause:["Коли ви показуєте свою творчість — з’являються визнання й гроші","Коли ховаєте талант — накопичується розчарування","Коли живете чужою оцінкою — коливається самооцінка"],
yp:["визнання, популярність, творчий успіх","нові творчі проєкти, медіа, публічність","натхнення й віра в майбутнє"],
ym:["розчарування, нереалізованість","«зіркова хвороба» або страх проявитися","мрії без результату"],
yw:["Покажіть світові хоча б один творчий результат","Ведіть щоденник мрій із конкретними кроками","Надихайте інших своїм прикладом"]},
{live:"Місяць проживається через уяву, інтуїцію й підсвідоме. У плюсі людина творча, чуйна, відчуває атмосферу й людей. У мінусі — тривоги, страхи, ілюзії, самообман і недовіра, які затьмарюють реальність.",
cause:["Коли ви перевіряєте страхи реальністю — вони зникають","Коли живете в ілюзіях — приходять розчарування","Коли творчість не втілюється — уява перетворюється на тривогу"],
yp:["творчі проєкти, мистецтво, робота з образами","посилення інтуїції, яскраві сни","глибоке розуміння себе"],
ym:["страхи, тривожність, безсоння","обман, ілюзії, туманні ситуації","недовіра й ревнощі у стосунках"],
yw:["Записуйте страхи й перевіряйте їх фактами","Втілюйте уяву в творчість","Уникайте сумнівних угод — усе з’ясовуйте"]},
{live:"Сонце проживається через радість, тепло й успіх. У плюсі людина сяє, гріє інших, легко досягає результатів і притягує удачу. У мінусі — гординя, егоцентризм, потреба бути першою і вигорання.",
cause:["Коли ви ділитеся теплом — успіх множиться","Коли вимагаєте уваги — люди віддаляються","Коли не відпочиваєте — приходить вигорання"],
yp:["успіх, визнання, перемоги","народження дитини, радісні події в родині","подорожі до сонця, відпочинок, лідерство"],
ym:["гординя, конфлікти через его","вигорання, перегрів","марнославство, витрати на показ"],
yw:["Святкуйте успіхи — свої й чужі","Відпочивайте за графіком, а не «потім»","Ведіть, але залишайте простір іншим"]},
{live:"Суд проживається через рід, сім’ю й усвідомлення. У плюсі людина відчуває підтримку предків, вміє пробачати й «перезавантажуватися». У мінусі — образи на рідних, сімейні конфлікти й повторення родових сценаріїв.",
cause:["Коли ви приймаєте батьків — відкривається родова сила","Коли тримаєте образу — сценарії роду повторюються","Коли переосмислюєте досвід — приходить нова якість життя"],
yp:["сімейні події: весілля, народження, возз’єднання","переосмислення, нове бачення життя","спадок, підтримка родини"],
ym:["сімейні конфлікти, розбіжності з батьками","осуд, образи, повтор родових проблем","втома від обов’язків перед родиною"],
yw:["Відновіть зв’язок з рідними","Дослідіть історію роду","Пробачте те, що тягне вас назад"]},
{live:"Світ проживається через масштаб, свободу й простір. У плюсі людина відкрита, миролюбна, мислить широко і почувається вдома всюди. У мінусі — втеча, страх обмежень, розпорошеність і невміння вкоренитися.",
cause:["Коли ви розширюєте горизонти — приходять нові можливості","Коли тікаєте від проблем — вони наздоганяють","Коли відчуваєте обмеження — з’являється тривога"],
yp:["подорожі, переїзд, робота з іноземцями","завершення великого етапу, нові горизонти","міжнародні проєкти, нові культури"],
ym:["відчуття клітки, обмеження","розпорошеність, втеча від реальності","невизначеність із місцем проживання"],
yw:["Заплануйте подорож або вивчення мови","Завершіть велику справу, яку давно тягнете","Знайдіть місце, де вам добре, і вкоріньтеся"]},
{live:"Блазень проживається через свободу, гру й легкість. У плюсі людина творча, спонтанна, щира, легко починає нове. У мінусі — безвідповідальність, хаос, інфантильність і втеча від зобов’язань.",
cause:["Коли ви граєте й творите — приходять легкість і нові шляхи","Коли уникаєте відповідальності — виникає хаос","Коли сидите в рамках — енергія згасає"],
yp:["новий старт, спонтанні подорожі","творчість, діти, гра, радість","вихід із рамок, нестандартні рішення"],
ym:["хаос, безвідповідальність, ризики","нестабільність у грошах і планах","втеча від зобов’язань"],
yw:["Дайте собі свободу, але з планом","Беріть відповідальність за свої вибори","Додайте в рік гру, творчість і нові формати"]}
];
EX2.forEach((e,i)=>{if(e)Object.assign(ARC[i],e)});
const causeList=a=>`<ul class="cz">${a.cause.map(c=>{const p=c.split(' — ');return `<li><span>${p[0]}</span><i aria-hidden="true">→</i><span>${p.slice(1).join(' — ')}</span></li>`}).join('')}</ul>`;

/* ---------- self-recognition, ways to improve, questions for self ---------- */
const EX3=[null,
{rec:["Вам легко почати, але важко довести до кінця","Ідеї приходять швидше, ніж ви встигаєте їх записати","Ви вмієте переконати майже будь-кого","Рутина швидко набридає — потрібна новизна","Коли втомлюєтеся, говорите різко або «накручуєте» себе думками"],
 q:["Яку справу я давно почав(-ла) і не завершив(-ла)?","Де мої слова розходяться з діями?","Чого я хочу навчитися цього року?"],
 fix:["Якщо справ забагато — залиште три пріоритети, решту відкладіть письмово","Якщо втрачаєте довіру людей — виконуйте дрібні обіцянки вчасно","Якщо голова «гуде» від думок — 30 хвилин прогулянки без телефону","Якщо немає результату — поставте дедлайн і звітуйте комусь про прогрес"]},
{rec:["Ви часто знаєте, чим закінчиться ситуація, ще до її початку","Вам легше слухати, ніж говорити про себе","Люди довіряють вам свої таємниці","Шумні компанії швидко виснажують","Образи ви тримаєте в собі довго й тихо"],
 q:["Що мені підказує інтуїція, а я її не слухаю?","Що я давно не сказав(-ла) вголос?","Де я граю роль холодного спостерігача?"],
 fix:["Якщо накопичилося — проговоріть або випишіть емоції","Якщо сумніваєтеся — дайте собі ніч на рішення","Якщо самотньо — поділіться знанням з кимось","Якщо втягують у плітки — м’яко виходьте з розмови"]},
{rec:["Ви тонко відчуваєте красу, смак, атмосферу","Вам важливо, щоб удома було гарно й затишно","Турбота про інших — ваша природна реакція","Без задоволення в житті ви швидко «гаснете»","Буває, що ви контролюєте близьких через опіку"],
 q:["Що приносить мені задоволення і чи є це в моєму тижні?","Кого я опікаю надто сильно?","Що я створюю своїми руками?"],
 fix:["Якщо немає сил — додайте щоденне маленьке задоволення","Якщо дратують близькі — дайте їм свободу й подбайте про себе","Якщо фінанси застигли — займіться творчістю або красою","Якщо заїдаєте емоції — шукайте інше тепло: дотики, прогулянки, мистецтво"]},
{rec:["Вам важливо, щоб усе йшло за планом","Ви берете відповідальність навіть тоді, коли не просили","Безлад і неорганізованість інших дратують","Вам важко просити допомоги","Відпочинок дається складніше, ніж робота"],
 q:["Що я можу делегувати вже цього тижня?","Де мій контроль заважає близьким?","Які в мене стосунки з батьком?"],
 fix:["Якщо перевтома — заплануйте відпочинок як робоче завдання","Якщо конфлікти — дайте іншим право на власне рішення","Якщо кар’єра стоїть — поставте конкретну ціль на рік","Якщо напруга в тілі — регулярний спорт і масаж"]},
{rec:["До вас часто звертаються по пораду","Ви любите пояснювати й навчати","Традиції й сімейні свята для вас важливі","Вас ранить, коли порушують домовленості","Іноді ви повчаєте, навіть коли не просили"],
 q:["Хто мій наставник і кого навчаю я?","Які мої цінності справді мої?","Де я моралізую замість того, щоб підтримати?"],
 fix:["Якщо вас не чують — запитуйте, а не повчайте","Якщо застій — навчіться новому з наставником","Якщо конфлікт поглядів — визнайте право іншого на свою правду","Якщо втратили сенс — поверніться до власних цінностей"]},
{rec:["Ви довго обираєте, боячись помилитися","Вам важливо, щоб вас любили й схвалювали","Ви легко знаходите спільну мову з людьми","Красу й гармонію відчуваєте дуже тонко","Сварка з близькими надовго вибиває з колії"],
 q:["Що я обираю серцем, а що — зі страху?","Чи люблю я себе так само, як інших?","Де я жертвую собою заради схвалення?"],
 fix:["Якщо не можете обрати — запитайте себе: «що я відчуваю?»","Якщо залежите від чужої думки — щодня записуйте три свої досягнення","Якщо у стосунках похололо — повертайте романтику й спільний час","Якщо ревнуєте — говоріть про свої страхи прямо"]},
{rec:["Без мети ви почуваєтеся загубленими","Поїздки й нові місця вас заряджають","Ви швидко ухвалюєте рішення","Вас дратує, коли хтось «гальмує»","Зупинитися й відпочити складно"],
 q:["Куди я рухаюся і навіщо?","Від чого я тікаю в постійний рух?","Кого я залишаю позаду в гонитві?"],
 fix:["Якщо дратівливість — більше фізичного руху","Якщо вигорання — плануйте паузи між етапами","Якщо конфлікти — перетворіть суперника на союзника","Якщо застій — змініть обстановку хоча б на вихідні"]},
{rec:["Несправедливість зачіпає вас глибоко","Ви чесні, навіть коли це невигідно","Вам важливі порядок у документах і чіткі правила","Ви схильні оцінювати людей і вчинки","Довго пам’ятаєте, хто і як вчинив"],
 q:["Кого я досі не пробачив(-ла)?","Де я сам(-а) порушую баланс?","Які обіцянки я не виконав(-ла)?"],
 fix:["Якщо тримаєте образу — напишіть лист прощення без відправлення","Якщо є юридичні питання — фіксуйте все письмово","Якщо засуджуєте — спробуйте зрозуміти мотиви іншого","Якщо відчуваєте дисбаланс — порівняйте, скільки даєте і скільки отримуєте"]},
{rec:["Вам потрібен час наодинці, щоб відновитися","Ви глибоко занурюєтеся в те, що цікавить","Поверхові розмови виснажують","Ви часто аналізуєте минуле","Друзів небагато, але вони справжні"],
 q:["Де я ховаюся від життя за самотністю?","Чим я можу поділитися з людьми?","Що тримає мене в минулому?"],
 fix:["Якщо самотньо — одна жива зустріч на тиждень","Якщо пригніченість — природа, рух і денне світло","Якщо страшно за майбутнє — напишіть план на три місяці","Якщо застій — поділіться досвідом публічно"]},
{rec:["Вам часто щастить у несподіваних ситуаціях","Життя йде хвилями — то злет, то пауза","Ви легко адаптуєтеся до змін","Рутина вас пригнічує","Іноді чекаєте, що все вирішиться саме"],
 q:["Яку можливість я зараз пропускаю?","Що я досі не завершив(-ла)?","Де я покладаюся на випадок замість дії?"],
 fix:["Якщо ситуації повторюються — знайдіть спільний сценарій і змініть одну дію","Якщо хаос — заведіть простий режим дня","Якщо тягне на ризик — встановіть ліміт втрат заздалегідь","Якщо застій — нові люди й нові місця"]},
{rec:["Ви можете дуже багато витримати","Емоції сильні — і радість, і гнів на повну","Фізична активність вас «ремонтує»","Ви звикли все тягнути на собі","Слабкість — своя чи чужа — дратує"],
 q:["Що я тримаю на собі, хоча можу віддати?","Як я проживаю гнів?","Коли я востаннє відпочивав(-ла) по-справжньому?"],
 fix:["Якщо накриває гнів — спорт або інтенсивна прогулянка того ж дня","Якщо перевтома — сон 8 годин хоча б тиждень поспіль","Якщо назріває конфлікт — пауза 10 хвилин перед відповіддю","Якщо важко самому — дозвольте собі попросити допомоги"]},
{rec:["Ви бачите світ інакше, ніж більшість","Часто допомагаєте, забуваючи про себе","Буває відчуття, що життя «на паузі»","Творчість і духовність вас наповнюють","Вам важко сказати «ні»"],
 q:["Де я роблю себе жертвою?","Що я можу побачити під іншим кутом?","Від чого я залежу?"],
 fix:["Якщо застрягли — опишіть ситуацію очима іншої людини","Якщо вас використовують — встановіть межу й скажіть «ні»","Якщо є залежність — замініть її творчістю чи служінням","Якщо апатія — одна маленька дія щодня"]},
{rec:["Ваше життя ділиться на чіткі «до» і «після»","Ви не боїтеся криз — вони вас загартовують","Періодично хочеться все змінити","Тягне до ризику й гострих відчуттів","Людей і речі ви або довго не відпускаєте, або рвете різко"],
 q:["Що в моєму житті вже віджило?","Чого я боюся змінити?","Де мені потрібна безпека, а не ризик?"],
 fix:["Якщо застій — позбудьтеся 30 непотрібних речей","Якщо страшно змінюватися — зробіть один маленький крок до нового","Якщо тягне до ризику — оберіть безпечний екстрим","Якщо сталася втрата — дайте собі час її прожити"]},
{rec:["Вам важливий внутрішній спокій","Ви вмієте мирити людей","Тонко відчуваєте смак, кольори, звуки","Конфлікти фізично виснажують","Буває, кидає в крайнощі: то все, то нічого"],
 q:["Де я втратив(-ла) баланс?","Кому я не вмію відмовити?","Що відновлює мою душу?"],
 fix:["Якщо кидає в крайнощі — тримайте середину хоча б у сні та їжі","Якщо виснажують люди — дозвольте собі відмовити","Якщо апатія — вода, природа, творчість","Якщо є залежність — замініть її м’яким щоденним ритуалом"]},
{rec:["Люди тягнуться до вас, навіть не знаючи чому","Ви вмієте заробляти й домовлятися","Пристрасть — до людей, справ чи задоволень — дуже сильна","Буває важко зупинитися в задоволеннях","Ревнощі й бажання контролю вам знайомі"],
 q:["Що мною керує замість мене?","Де я використовую харизму собі на користь за чужий рахунок?","Від чого мені варто звільнитися?"],
 fix:["Якщо є залежність — 21 день без неї","Якщо гроші витікають — проаналізуйте імпульсивні витрати","Якщо ревнуєте — шукайте джерело страху в собі, а не в партнері","Якщо хочеться маніпулювати — кажіть прямо, чого хочете"]},
{rec:["Ви мислите масштабно","У житті траплялися раптові обвали планів","Вам близькі будівництво, ремонт, нові системи","Гордість не дає визнати помилку","Після кризи ви відбудовуєтеся сильнішими"],
 q:["На якому хиткому фундаменті я будую?","Де мені заважає гордість?","Що я хочу збудувати за п’ять років?"],
 fix:["Якщо криза — спершу безпека, потім аналіз, потім план","Якщо конфлікт — визнайте свою частку відповідальності","Якщо щось руйнується — збережіть цінне й відпустіть решту","Якщо заважає гординя — попросіть чесного зворотного зв’язку"]},
{rec:["У вас є талант, який помічають інші","Ви мрійник із тонким смаком","Вам важливо, щоб вас бачили й цінували","Страшно показати творчість — раптом не сподобається","Натхнення приходить хвилями"],
 q:["Який мій талант я ховаю?","Що я можу показати світові цього місяця?","Чия оцінка для мене важить найбільше?"],
 fix:["Якщо страшно проявитися — покажіть спершу маленькій аудиторії","Якщо розчарування — поверніться до того, що надихає","Якщо мрії без дії — один крок до мрії щотижня","Якщо заносить у марнославство — подякуйте тим, хто допоміг"]},
{rec:["У вас багата уява і яскраві сни","Ви відчуваєте настрій людей без слів","Тривога може «накрити» без явної причини","Ви буваєте недовірливими","Образи, кольори, атмосфера для вас дуже важливі"],
 q:["Який мій страх ніколи не справджувався?","Де я живу в ілюзії?","Як я можу втілити свою уяву?"],
 fix:["Якщо тривога — запишіть страх і три факти «за» і «проти»","Якщо безсоння — вечір без екранів і тепла вода","Якщо недовіра — перевіряйте, а не додумуйте","Якщо уява застоюється — малюйте, фотографуйте, пишіть"]},
{rec:["Вас помічають, навіть коли ви мовчите","Ви щиро радієте успіхам — своїм і чужим","Вам легко надихати людей","Важко, коли вас не цінують","Можна вигоріти, граючи роль сильного"],
 q:["Кого я можу підтримати своїм теплом?","Де моє его заважає?","Коли я востаннє відпочивав(-ла) без почуття провини?"],
 fix:["Якщо вигорання — сонце, відпочинок і жодних «треба» на вихідних","Якщо конфлікти через его — дайте іншим сяяти","Якщо зникла радість — поверніться до того, що любили в дитинстві","Якщо мало успіхів — святкуйте навіть маленькі перемоги"]},
{rec:["Сім’я і рід для вас дуже важливі","Ви відчуваєте відповідальність за близьких","Старі образи на рідних досі відгукуються","Вам властиві глибокі переосмислення","Історії роду повторюються у вашому житті"],
 q:["Що я досі не пробачив(-ла) батькам?","Які сценарії роду я повторюю?","Що я хочу передати своїм дітям?"],
 fix:["Якщо конфлікт у родині — розмова без звинувачень","Якщо повторюється сценарій — запишіть його і свідомо змініть один крок","Якщо втома від обов’язків — розділіть їх з іншими рідними","Якщо немає опори — дізнайтеся історію свого роду"]},
{rec:["Вам тісно в рамках","Подорожі й нові культури надихають","Ви мислите масштабно й глобально","Важко вкоренитися в одному місці","Ви миролюбні й вмієте домовлятися"],
 q:["Де я відчуваю себе вдома?","Від чого я тікаю в нові горизонти?","Яку велику справу я хочу завершити?"],
 fix:["Якщо тісно — вивчайте мову або плануйте подорож","Якщо розпорошеність — один великий фокус на рік","Якщо тягне втекти — вирішіть одну проблему, яку відкладаєте","Якщо немає відчуття дому — створіть ритуали там, де живете"]},
{rec:["Вам легко почати з нуля","Ви щирі, як дитина","Рамки й правила вас пригнічують","Гумор рятує у складних ситуаціях","Іноді уникаєте зобов’язань і відповідальності"],
 q:["Де свобода перетворилася на хаос?","Яку відповідальність я уникаю?","Що б я робив(-ла), якби не боявся(-лася) осуду?"],
 fix:["Якщо хаос — мінімальний режим і список із трьох справ","Якщо бракує грошей — стабільне джерело плюс творчі експерименти","Якщо уникаєте зобов’язань — доведіть до кінця одну обіцянку","Якщо нудно — гра, нові формати, подорож"]}
];
EX3.forEach((e,i)=>{if(e)Object.assign(ARC[i],e)});
const fixList=a=>`<ul class="cz fx">${a.fix.map(c=>{const p=c.split(' — ');return `<li><span>${p[0]}</span><i aria-hidden="true">→</i><span>${p.slice(1).join(' — ')}</span></li>`}).join('')}</ul>`;
const qList=a=>`<ol class="qs">${a.q.map(x=>`<li>${x}</li>`).join('')}</ol>`;
const qStrip=x=>String(x).replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
const qGo=(qs,src)=>`<button class="qs-go" type="button" data-tq="${esc(JSON.stringify({q:qs.map(qStrip),s:src?qStrip(src):''}))}"><svg viewBox="0 0 16 16" aria-hidden="true"><rect x="2.5" y="3" width="6" height="9.5" rx="1.2" transform="rotate(-8 5.5 7.75)"/><rect x="7.5" y="3" width="6" height="9.5" rx="1.2" transform="rotate(8 10.5 7.75)"/></svg><span>${_t("Запитати карти в трактувальнику")}</span><i>→</i></button>`;
const qListT=(a,src)=>qList(a)+qGo(a.q,src);
function overlay(P1,P2){
  const P={};
  for(const k in P1) if(typeof P1[k]==='number') P[k]=r(P1[k]+P2[k]);
  P.RING=P1.RING.map((row,s)=>row.map((v,j)=>r(v+P2.RING[s][j])));
  P.AGE=P1.AGE.map((v,i)=>r(v+P2.AGE[i]));
  P.YEARS=P.AGE.map((v,a)=>{const o=P.AGE[(a+40)%80];return [v,o,r(v+o)];});
  return P;
}


/* ---------- deep layer for "Читати більше": symbolism, origins, hidden shadow, work, couple dynamics, 21-day plan ---------- */
const EX4=[null,
{sym:"Меркурій · стихія Повітря",img:"Чоловік біля столу з чотирма символами стихій: одна рука піднята до неба, друга вказує на землю. Над головою знак нескінченності — «як угорі, так і внизу»: ідея стає дією.",
 origin:"Енергія Мага розкривається, коли дитину хвалять за ініціативу і дозволяють пробувати. Якщо ж кожну спробу критикували або ідеї висміювали, дорослий або боїться починати, або починає все підряд, щоб довести, що «я можу».",
 deep:["Потреба постійно бути «найрозумнішим у кімнаті» й контролювати розмову","Страх рутини, через який людина кидає справу саме тоді, коли треба закріпити результат","Звичка переконувати замість того, щоб домовлятися чесно"],
 body:"Енергії потрібен ясний розум: сон без гаджетів, прогулянки, письмо від руки, дихальні практики, що заспокоюють нервову систему.",
 work:{p:"Запускає нові напрями, продає ідеї, швидко вчиться, добре веде переговори, презентує, навчає.",m:"Десятки незавершених проєктів, обіцянки без результату, конфлікти через самовпевненість або хитрощі."},
 pr:{p:"Пара постійно щось починає разом: проєкти, поїздки, ідеї. Багато розмов, сміху, інтелектуальної іскри.",m:"Суперечки «хто розумніший», маніпуляції словами, недотримані обіцянки, нудьга, коли нових цілей немає.",c:"Один говорить — інший не чує; обидва хочуть мати останнє слово.",t:["Мати спільний проєкт, який ви доводите до кінця","Домовлятися письмово про важливе: гроші, обов’язки, плани","Раз на тиждень говорити не про справи, а про почуття"]},
 plan:["Випишіть усі незавершені справи й оберіть три головні","Щодня робіть хоча б один крок у кожній з трьох","Завершіть одну справу повністю й відзначте результат","Навчіться новому навику й одразу застосуйте його","Підбийте підсумок: що вдалося, від чого чесно відмовитися"],
 aff:"Мої слова стають ділами, а розпочате я доводжу до результату.",harm:[3,10,17,19,21],tens:[9,12,18]},
{sym:"Місяць · стихія Води",img:"Жінка сидить між темною і світлою колонами, на колінах — сувій знань, біля ніг — місяць. За нею завіса з гранатами: таємне знання, доступне лише тим, хто вміє слухати тишу.",
 origin:"Жриця формується в тиші: дитина, яку не чули або яку вчили «не виносити сміття з хати», рано вчиться спостерігати й мовчати. У плюсі це дає глибоку інтуїцію, у мінусі — звичку тримати все в собі й не довіряти людям.",
 deep:["Мовчазна образа замість розмови","Контроль через інформацію: знати більше за інших і не ділитися","Самотність, яку людина видає за самодостатність"],
 body:"Ресурс — вода, тиша, сон, циклічність. Енергія реагує на перевантаження людьми й шумом — потрібні дні усамітнення й практики, що повертають у тіло.",
 work:{p:"Аналітика, дослідження, психологія, консультування, робота з інформацією й таємницями (юриспруденція, медицина, HR).",m:"Інтриги в колективі, пасивна агресія, страх проявитися й презентувати свою роботу."},
 pr:{p:"Пара розуміє одне одного без слів, у союзі багато довіри, тиші, спільного внутрішнього світу.",m:"Недомовленість, таємниці, холодна дистанція, ревнощі, що не проговорюються.",c:"Один мовчить, другий «додумує» — і накопичується недовіра.",t:["Мати ритуал щирої розмови без телефонів","Говорити про відчуття, навіть коли «і так зрозуміло»","Поважати потребу кожного в просторі й тиші"]},
 plan:["Щоранку 10 хвилин тиші й запис першої думки","Перевіряйте інтуїтивні здогадки: записуйте, що справдилося","Скажіть комусь те, що давно тримаєте в собі","Відмовтеся від пліток і чужих таємниць на тиждень","Поділіться знанням: порада, текст, консультація"],
 aff:"Я довіряю своєму внутрішньому голосу й дозволяю собі бути почутою людиною.",harm:[9,14,18,20],tens:[1,7,15]},
{sym:"Венера · стихія Землі",img:"Жінка на троні серед пшеничного поля й лісу, у короні з дванадцяти зірок, поруч знак Венери. Достаток, плідність, краса, що росте сама, коли про неї дбають.",
 origin:"Енергія розкривається в дитинстві, де були тепло, обійми й дозвіл насолоджуватися. Якщо мама була виснаженою чи холодною або любов треба було «заслуговувати», дорослий або забуває про себе, або компенсує нестачу тепла їжею, покупками, гіперопікою.",
 deep:["Турбота як спосіб контролю: «я ж для тебе стараюсь»","Почуття провини за відпочинок і задоволення","Залежність самооцінки від зовнішності та чужих компліментів"],
 body:"Ресурс — тіло, краса, природа, смачна їжа, дотики, творчість руками. Енергія потребує задоволення щодня, а не «колись у відпустці».",
 work:{p:"Дизайн, б’юті, мода, кулінарія, дизайн простору, робота з дітьми, сфера послуг, творчі проєкти.",m:"Вигорання від роботи «на обов’язку», марнотратство, лінощі, нездатність монетизувати свій талант."},
 pr:{p:"Затишок, ніжність, турбота, гарний дім, тілесна близькість, діти або спільні творчі проєкти.",m:"Гіперопіка, ревнощі, «я тобі все віддала», емоційні гойдалки, контроль через побут.",c:"Один піклується надміру, другий почувається контрольованим.",t:["Влаштовувати побачення й красиві ритуали","Піклуватися, питаючи, чого хоче партнер","Мати спільну творчу справу або облаштування дому"]},
 plan:["Щодня одне маленьке задоволення без почуття провини","Наведіть красу в одному куточку дому","Створіть щось руками: їжа, рукоділля, малюнок","Відмовтеся від однієї «турботи», про яку не просили","Відзначте, як змінився рівень енергії й настрій"],
 aff:"Я дозволяю собі насолоду, і достаток росте разом зі мною.",harm:[6,14,17,19],tens:[4,13,15]},
{sym:"Овен · стихія Вогню",img:"Правитель на кам’яному троні з головами овнів, у руках скіпетр і держава, за спиною — гори. Влада, що тримається на структурі й відповідальності.",
 origin:"Енергія Імператора пов’язана з образом батька. Якщо батько був опорою — дорослий легко бере відповідальність і будує. Якщо батька не було, він був жорстким або слабким — людина або тягне все сама, або воює з будь-якою владою.",
 deep:["Нездатність показати слабкість навіть близьким","Робота як спосіб не відчувати","Контроль, що маскується під «я просто знаю, як краще»"],
 body:"Ресурс — режим, спорт, порядок у просторі. Енергія накопичує напругу в спині, шиї, щелепі — потрібне регулярне фізичне розвантаження.",
 work:{p:"Управління, власний бізнес, стратегія, будівництво систем, кар’єра в структурах, військова справа, фінанси.",m:"Трудоголізм, конфлікти з керівництвом, мікроменеджмент, нездатність делегувати."},
 pr:{p:"Надійність, стабільність, чіткі домовленості, відчуття захищеності, спільні великі цілі (дім, бізнес).",m:"Боротьба за владу, «я сказав», холодність, усе за правилами без ніжності.",c:"Хто головний — і чиї правила діють удома.",t:["Розподілити зони відповідальності чесно","Обговорювати рішення, а не ставити перед фактом","Залишати місце для ніжності поза «справами»"]},
 plan:["Поставте одну річну ціль і розбийте на кроки","Делегуйте хоча б одне завдання, яке тягнете самі","Плануйте відпочинок як обов’язкову зустріч","Поговоріть з батьком або напишіть йому лист (можна не відправляти)","Оцініть, де контроль допоміг, а де — заважав"],
 aff:"Я опора, яка не тисне. Моя сила — у відповідальності й довірі.",harm:[5,8,11,21],tens:[3,12,22]},
{sym:"Телець · стихія Землі",img:"Наставник на троні між двома колонами, перед ним — учні, у руці потрійний хрест, біля ніг — схрещені ключі. Знання, що передається від учителя до учня.",
 origin:"Енергія формується в сім’ї з традиціями, правилами й авторитетами. Якщо правила були живими й зрозумілими — людина стає мудрим наставником. Якщо жорсткими й лицемірними — або бунтує, або сама починає повчати всіх довкола.",
 deep:["Віра, що є лише одна правильна думка — своя","Страх зробити «неправильно», який блокує живі рішення","Повчання замість підтримки"],
 body:"Ресурс — навчання, стабільний ритм, родинні ритуали, спокійна їжа. Енергія відгукується напругою в горлі й плечах, коли людина «тягне обов’язки».",
 work:{p:"Викладання, менторство, право, коучинг, психологія, культура, наука, робота в системних структурах.",m:"Догматизм, бюрократія, нездатність адаптуватися до нового, моралізаторство в колективі."},
 pr:{p:"Спільні цінності, повага, традиції, шлюб як важливий інститут, взаємне навчання.",m:"Повчання, «так має бути», нетерпимість до інакшості партнера, життя за правилами батьків.",c:"Чиї сімейні традиції правильні.",t:["Створити власні сімейні традиції, а не копіювати батьківські","Вчитися чогось нового разом","Питати думку партнера, перш ніж радити"]},
 plan:["Випишіть свої цінності й позначте, які справді ваші","Знайдіть наставника або курс у важливій для вас темі","Поділіться досвідом з кимось молодшим","Тиждень замість порад ставте запитання","Виконайте дрібну обіцянку, яку відкладали"],
 aff:"Я навчаюся й навчаю з любов’ю, поважаючи шлях кожного.",harm:[4,9,14,20],tens:[15,16,22]},
{sym:"Близнюки · стихія Повітря",img:"Чоловік і жінка під благословенням ангела; за жінкою — дерево пізнання, за чоловіком — дерево життя. Вибір серцем і союз, де двоє бачать одне одного.",
 origin:"Закохані вчаться любові в сім’ї: як батьки любили одне одного й чи любили дитину просто так. Якщо любов була умовною — дорослий шукає схвалення, боїться вибирати і плутає любов із залежністю.",
 deep:["Вибір на користь того, хто схвалює, а не того, кого любиш","Ідеалізація партнера й розчарування, коли він «не такий»","Страх конфлікту, через який людина зраджує себе"],
 body:"Ресурс — любов, краса, приємне спілкування. Енергія відчувається в серці: важкі стосунки забирають сили швидше за будь-яку роботу.",
 work:{p:"Робота з людьми, HR, PR, дизайн, мистецтво, партнерські проєкти, організація подій.",m:"Робота «не по душі», конфлікти через бажання всім подобатися, нерішучість."},
 pr:{p:"Закоханість, рівність, романтика, гарний смак, вміння говорити й домовлятися.",m:"Ревнощі, трикутники, «запасні варіанти», нерішучість щодо майбутнього.",c:"Хтось один сумнівається у виборі — і другий це відчуває.",t:["Регулярно обирати одне одного заново: побачення, слова, жести","Говорити про сумніви, поки вони не стали дистанцією","Мати спільну красу: подорожі, музика, мистецтво"]},
 plan:["Щодня записуйте три речі, за які любите себе","Ухваліть одне рішення, спитавши: «що я відчуваю?»","Скажіть «ні» там, де раніше погоджувалися зі страху","Відновіть одну важливу для вас дружбу","Подаруйте близькій людині увагу без умов"],
 aff:"Я обираю серцем і люблю себе так само, як інших.",harm:[3,10,17,19],tens:[9,15,18]},
{sym:"Рак · стихія Води",img:"Воїн у колісниці, яку тягнуть чорний і білий сфінкси. Протилежності рухаються в одному напрямку, коли ними керує воля.",
 origin:"Колісниця розкривається, коли дитині дозволяли досягати, змагатися й рухатися. Якщо її зупиняли («сиди тихо») або, навпаки, змушували бути першою — дорослий або боїться дії, або не вміє зупинитися.",
 deep:["Рух як втеча від почуттів","Потреба перемагати навіть у близьких стосунках","Нетерпимість до власної паузи — «я нічого не роблю, значить, я ніхто»"],
 body:"Ресурс — рух, спорт, подорожі. Ризики — травми через поспіх і перевтома; потрібні паузи між ривками.",
 work:{p:"Логістика, продажі, туризм, спорт, проєктний менеджмент, кар’єрний ріст, керування командами в русі.",m:"Вигорання, конфліктність, гонка за статусом без задоволення."},
 pr:{p:"Спільна мета, подорожі, активність, пара-команда, яка досягає разом.",m:"Змагання між партнерами, «у кожного своя дорога», конфлікти на ходу.",c:"Різна швидкість: один мчить, другий не встигає.",t:["Мати спільну мету на рік","Подорожувати разом","Домовлятися про темп і паузи"]},
 plan:["Сформулюйте одну головну мету на місяць","Щодня крок до неї — навіть маленький","Додайте спорт тричі на тиждень","Заплануйте поїздку або зміну обстановки","Зробіть свідому паузу на день і перевірте, куди рухаєтеся"],
 aff:"Я рухаюся до своєї мети впевнено й дозволяю собі паузи.",harm:[1,11,19,21],tens:[2,12,14]},
{sym:"Терези · стихія Повітря",img:"Суддя з мечем і терезами між двома колонами. Меч розрізняє правду, терези зважують наслідки.",
 origin:"Енергія формується, коли дитина стикається з несправедливістю: покарання «ні за що», різне ставлення до дітей у сім’ї. Дорослий або стає чесним арбітром, або постійно шукає винних і судить себе й інших.",
 deep:["Внутрішній суддя, який не дає собі помилитися","Образа на несправедливість, що триває роками","Чорно-біле мислення: правий/неправий"],
 body:"Ресурс — порядок, баланс праці й відпочинку, чесність. Енергія виснажується від невирішених конфліктів і боргів — матеріальних і емоційних.",
 work:{p:"Право, аудит, бухгалтерія, медіація, контроль якості, держслужба, аналітика, робота з документами.",m:"Бюрократизм, суди, критиканство, конфлікти через «принцип»."},
 pr:{p:"Чесність, рівність, ясні домовленості, баланс «даю — отримую».",m:"Підрахунок, хто скільки зробив, звинувачення, холодна справедливість без тепла.",c:"Хто винен — замість того, як вирішити.",t:["Домовлятися про правила побуту й грошей","Говорити «я відчуваю», а не «ти винен»","Регулярно перевіряти, чи нікому з вас не тяжко"]},
 plan:["Наведіть лад у документах і фінансах","Закрийте один старий борг чи обіцянку","Напишіть лист прощення людині (не відправляйте)","Тиждень ловіть себе на осуді й замінюйте його запитанням","Перевірте баланс: що ви даєте і що отримуєте"],
 aff:"Я чесна людина й дозволяю собі та іншим помилятися.",harm:[4,5,20,21],tens:[12,15,18]},
{sym:"Діва · стихія Землі",img:"Старець на вершині гори з ліхтарем, у якому світить зірка, і з посохом. Мудрість, знайдена в самоті, світить тим, хто йде слідом.",
 origin:"Відлюдник формується, коли дитина рано лишається наодинці зі своїми думками або змушена дорослішати швидше. Звідси глибина й самостійність, але й звичка не просити допомоги та відгороджуватися.",
 deep:["Самотність як захист від болю","Переконання «мене все одно ніхто не зрозуміє»","Застрягання в минулому й страх майбутнього"],
 body:"Ресурс — природа, тиша, тепло, неспішні прогулянки. Енергія чутлива до холоду й ізоляції — пригніченість приходить, коли людина довго без живого контакту.",
 work:{p:"Наука, експертиза, IT, аналітика, психологія, письменство, вузька спеціалізація, викладання.",m:"Ізоляція, перфекціонізм, небажання показувати результат, скупість у грошах і знаннях."},
 pr:{p:"Глибина, вірність, тиха близькість, повага до простору одне одного.",m:"Дистанція, мовчання, кожен у своєму світі, пара «співмешканців».",c:"Один потребує тиші, другий сприймає це як відкидання.",t:["Домовлятися про час разом і час наодинці","Ділитися думками, а не лише рішеннями","Мати спільне заняття з глибиною: навчання, подорожі, читання"]},
 plan:["Щодня прогулянка без телефону","Одна жива зустріч на тиждень","Поділіться знанням публічно: пост, лекція, порада","Напишіть план на три місяці вперед","Відпустіть одну історію з минулого: запишіть і спаліть"],
 aff:"Моя мудрість світить іншим, і я не самотня людина на своєму шляху.",harm:[2,5,14,20],tens:[1,6,19]},
{sym:"Юпітер · стихія Вогню",img:"Колесо з символами стихій, яке обертається в небі; на ньому сфінкс, змій і Анубіс. Цикли життя: те, що внизу, піднімається, те, що вгорі, опускається.",
 origin:"Колесо розкривається в сім’ях, де багато змін: переїзди, зміни статусу, «то густо, то пусто». Дорослий легко адаптується, але може жити з відчуттям, що від нього нічого не залежить.",
 deep:["Очікування дива замість дії","Повторення одних і тих самих сценаріїв по колу","Азарт і ризик як спосіб відчути життя"],
 body:"Ресурс — нові враження, подорожі, люди. Енергія виснажується від хаосу в режимі — потрібна проста щоденна структура.",
 work:{p:"Торгівля, туризм, нетворкінг, медіа, фінанси, все, де потрібна швидкість і зв’язки.",m:"Нестабільний дохід, ризикові рішення, кидання справ на півдорозі."},
 pr:{p:"Легкість, удача, пригоди, спільні подорожі, вміння разом проходити зміни.",m:"Нестабільність, «то разом, то окремо», повторення тих самих сварок.",c:"Одна і та сама сварка повертається знову й знову.",t:["Помітити свій повторюваний сценарій і змінити одну дію","Мати спільні ритуали, що дають стабільність","Разом казати «так» новим можливостям"]},
 plan:["Випишіть повторюваний сценарій свого життя","Змініть у ньому одну конкретну дію","Скажіть «так» новій можливості протягом тижня","Заведіть простий режим дня","Завершіть старий цикл: справу, борг, стосунок"],
 aff:"Я довіряю потоку життя й сама обираю свій напрямок.",harm:[1,6,17,21],tens:[4,8,9]},
{sym:"Лев · стихія Вогню",img:"Жінка ніжно закриває пащу леву. Сила — не в тиску, а в м’якості, яка приборкує інстинкт.",
 origin:"Сила формується, коли дитині доводилося бути сильною: витримувати, не плакати, захищати себе чи інших. Звідси потужний ресурс — і звичка не просити допомоги, придушувати емоції до вибуху.",
 deep:["Заборона на слабкість і сльози","Гнів, що накопичується й вибухає не там","Тягнути все самому, щоб ні від кого не залежати"],
 body:"Ресурс — фізична активність, сон, природа. Енергія накопичує напругу в м’язах і тиску — тілу потрібне регулярне навантаження й відновлення.",
 work:{p:"Спорт, бізнес, керівництво, медицина, робота з тваринами, проєкти з великим навантаженням.",m:"Перевтома, жорсткість у команді, конфлікти через гнів."},
 pr:{p:"Пристрасть, захист, сила, впевненість, що «ми впораємося з усім».",m:"Боротьба характерів, тиск, вибухи гніву, «хто сильніший».",c:"Сила проти сили — ніхто не хоче поступитися.",t:["Мати спільну фізичну активність","Домовитися про «паузу» під час сварки","Показувати одне одному слабкість — і не карати за неї"]},
 plan:["Спорт тричі на тиждень","Пауза 10 хвилин перед відповіддю в конфлікті","Попросіть про допомогу хоча б раз за тиждень","Тиждень сну по 8 годин","Помітьте, як змінилися дратівливість і енергія"],
 aff:"Моя сила — м’яка. Я можу бути сильною людиною й дозволяти собі відпочинок.",harm:[4,7,19,21],tens:[12,14,2]},
{sym:"Нептун · стихія Води",img:"Людина висить догори ногами на дереві, але обличчя спокійне, навколо голови — сяйво. Інший кут зору відкриває істину, якої не видно звичним поглядом.",
 origin:"Енергія формується, коли дитина рано вчиться жертвувати: допомагати, підлаштовуватися, бути «зручною». Дорослий тонко відчуває інших, але часто живе чужими потребами й застрягає в очікуванні.",
 deep:["Жертовність заради любові й схвалення","Залежності як спосіб утекти від реальності","Відчуття, що життя «на паузі», доки хтось інший не змінить ситуацію"],
 body:"Ресурс — творчість, медитація, вода, сон. Енергія виснажується від залежностей і роботи «за так» — потрібні межі.",
 work:{p:"Мистецтво, психологія, медицина, волонтерство, духовні практики, нестандартні творчі проєкти.",m:"Робота без оплати, застій, відкладання, використання вас іншими."},
 pr:{p:"Глибоке співчуття, духовний зв’язок, готовність підтримати в складний період.",m:"Жертва й рятівник, залежні стосунки, «я терплю заради тебе».",c:"Один рятує, другий не хоче змінюватися.",t:["Помічати, де допомога стала жертвою","Мати спільну творчу або духовну практику","Говорити про свої потреби прямо"]},
 plan:["Скажіть «ні» там, де раніше погоджувалися з обов’язку","Відмовтеся від однієї залежності на 21 день","Займайтеся творчістю щодня 20 хвилин","Подивіться на проблему очима іншої людини","Зробіть одну маленьку дію там, де ви «чекаєте»"],
 aff:"Я служу зі свободи, а не з жертви. Мої межі — це турбота про себе.",harm:[2,14,17,18],tens:[4,7,11]},
{sym:"Скорпіон · стихія Води",img:"Вершник на білому коні з чорним стягом із трояндою. Перед ним схиляються всі — і король, і дитина: кінець одного етапу неминучий, але за ним сходить сонце.",
 origin:"Смерть формується, коли в дитинстві були різкі зміни: втрати, переїзди, розлучення батьків. Людина вчиться відроджуватися, але може або боятися змін, або руйнувати все сама, щоб не чекати удару.",
 deep:["Тримання за те, що віджило, через страх порожнечі","Різкі «обриви» стосунків без пояснень","Тяга до ризику як спосіб відчути, що живеш"],
 body:"Ресурс — очищення: простору, тіла, стосунків. Енергія чутлива до ризиків — бережіть себе в дорозі й екстремальних заняттях.",
 work:{p:"Медицина, хірургія, кризовий менеджмент, реструктуризація, психологія, стиль і перевтілення.",m:"Спалювання мостів, різкі звільнення, ризиковані рішення."},
 pr:{p:"Глибока трансформація разом, вміння пройти кризу й стати ближчими.",m:"Розриви й повернення, ревнощі, тиск, бажання змінити партнера.",c:"Хтось хоче змін, а хтось — щоб усе лишилося як є.",t:["Раз на рік чесно переглядати стосунки: що віджило","Відпускати старі образи разом","Підтримувати одне одного в періоди змін"]},
 plan:["Позбудьтеся 30 непотрібних речей","Завершіть те, що давно віджило","Зробіть один маленький крок до нового","Замініть ризиковане заняття безпечним","Дайте собі час прожити втрату чи завершення"],
 aff:"Я відпускаю старе з вдячністю й відкриваюся новому.",harm:[8,16,20,22],tens:[3,14,19]},
{sym:"Стрілець · стихія Вогню",img:"Ангел переливає воду з однієї чаші в іншу; одна нога на землі, друга у воді. Міра й поєднання протилежностей.",
 origin:"Помірність формується в дитинстві, де людині доводилося бути «миротворцем» між дорослими. Звідси тонке відчуття балансу — і звичка жертвувати своїм спокоєм заради чужого.",
 deep:["Нездатність сказати «ні», щоб не порушити мир","Крайнощі: то все, то нічого","Відстороненість як захист від емоцій"],
 body:"Ресурс — вода, природа, мистецтво, повільний темп, режим. Енергія виснажується від крайнощів у харчуванні, сні, роботі.",
 work:{p:"Мистецтво, дизайн, медицина, психологія, кулінарія, гармонізація простору, медіація.",m:"Повільність, відкладання, втома від чужих конфліктів."},
 pr:{p:"Спокій, ніжність, гармонія, вміння домовлятися без сварок.",m:"Уникання конфліктів, байдужість, «все добре», коли насправді ні.",c:"Проблеми замовчуються заради миру.",t:["Говорити про незадоволення м’яко, але вчасно","Мати спільні ритуали відпочинку","Тримати баланс «ми» і «я»"]},
 plan:["Знайдіть одну сферу, де кидає в крайнощі, і тримайте середину","Щодня контакт із водою чи природою","Відмовте комусь, кому раніше не могли","Додайте 30 хвилин творчості на день","Перевірте, як змінилися сон і настрій"],
 aff:"Я тримаю баланс і зберігаю свій спокій, не жертвуючи собою.",harm:[2,3,5,12],tens:[7,11,13]},
{sym:"Козеріг · стихія Землі",img:"Рогата істота на постаменті, до якого прикуті чоловік і жінка; ланцюги вільні — їх можна зняти. Залежність, яка тримає лише доти, доки ми погоджуємося.",
 origin:"Енергія формується, коли в сім’ї були теми грошей, влади, залежностей або маніпуляцій. Людина вчиться впливати й заробляти, але може повторювати сценарії контролю чи залежності.",
 deep:["Залежність від грошей, людей, задоволень чи влади","Маніпуляція як звична мова стосунків","Сором за свої бажання й пристрасть"],
 body:"Ресурс — задоволення в міру, харизма, пристрасть до справи. Енергія виснажується від надмірностей — їжі, алкоголю, ночей без сну.",
 work:{p:"Бізнес, продажі, маркетинг, фінанси, шоу-бізнес, публічність, переговори.",m:"Нечесні схеми, жадібність, вигорання від гонки за грошима."},
 pr:{p:"Пристрасть, магнетизм, сильне тяжіння, спільний фінансовий успіх.",m:"Ревнощі, контроль, залежні стосунки, маніпуляції, токсичні гойдалки.",c:"Контроль і ревнощі — хто кому належить.",t:["Чесно говорити про гроші й бажання","Мати власні простори свободи кожному","Перевіряти, чи немає в стосунках залежності"]},
 plan:["Визначте одну залежність і 21 день без неї","Проаналізуйте імпульсивні витрати","Кажіть прямо, чого хочете, без натяків","Заробіть або збережіть гроші чесним новим способом","Помітьте, де ви вільні, а де — ні"],
 aff:"Я вільна людина. Моя сила й пристрасть служать добру.",harm:[1,10,19,21],tens:[5,6,8]},
{sym:"Марс · стихія Вогню",img:"Блискавка вдаряє у вежу, з неї падає корона й люди. Раптове руйнування того, що було побудоване на хибному фундаменті.",
 origin:"Вежа формується в сім’ях з кризами: банкрутства, раптові переїзди, руйнування родини. Людина вчиться будувати знову, але може жити в очікуванні катастрофи або руйнувати збудоване сама.",
 deep:["Гординя, що не дозволяє визнати помилку","Очікування, що «все знову розвалиться»","Будівництво на піску: швидко, без фундаменту"],
 body:"Ресурс — будівництво, фізична праця, творення. Ризики — травми й раптові кризи самопочуття, важлива безпека.",
 work:{p:"Будівництво, архітектура, нерухомість, великі проєкти, реформи, кризове управління.",m:"Раптові обвали справ, конфлікти, ризикові інвестиції."},
 pr:{p:"Пара, яка будує разом: дім, бізнес, сім’ю, і стає сильнішою після кожної кризи.",m:"Гучні сварки, руйнування, гординя, «краще розійтися, ніж поступитися».",c:"Хтось один руйнує, коли страшно.",t:["Будувати спільне поступово й надійно","Визнавати свою частку в конфлікті","Переживати кризи як команда"]},
 plan:["Знайдіть, де будуєте на хиткому фундаменті","Укріпіть одну опору: гроші, здоров’я, стосунки","Попросіть чесний зворотний зв’язок","Визнайте одну помилку вголос","Почніть будувати щось нове — повільно й надійно"],
 aff:"Я будую на чесному фундаменті й стаю сильнішою після кожної кризи.",harm:[13,20,22,4],tens:[5,14,17]},
{sym:"Водолій · стихія Повітря",img:"Оголена жінка під великою зіркою виливає воду на землю й у ставок. Надія, натхнення, талант, що щедро віддається світу.",
 origin:"Зірка розкривається, коли дитину помічали й захоплювалися нею. Якщо ж її творчість знецінювали або порівнювали з іншими — дорослий має талант, але боїться бути видимою людиною.",
 deep:["Страх показати свою творчість","Залежність від оцінки й лайків","Мрії, що так і лишаються мріями"],
 body:"Ресурс — творчість, краса, натхнення, визнання. Енергія виснажується від невизнання й розчарувань — потрібне коло підтримки.",
 work:{p:"Мистецтво, медіа, мода, блогінг, фотографія, особистий бренд, публічні професії.",m:"Нереалізованість, «зіркова хвороба», робота заради визнання без змісту."},
 pr:{p:"Натхнення, захоплення одне одним, спільні мрії й творчість.",m:"Ідеалізація, розчарування, конкуренція за увагу.",c:"Один затьмарює іншого.",t:["Підтримувати таланти одне одного","Мати спільну мрію з конкретним планом","Радіти успіхам партнера"]},
 plan:["Покажіть світові один творчий результат","Ведіть щоденник мрій із кроками","Оточіть себе людьми, які надихають","Порадійте вголос чужому успіху","Оцініть, як змінилося відчуття себе"],
 aff:"Я дозволяю собі сяяти й надихаю інших своїм світлом.",harm:[1,3,6,10,12],tens:[16,18,15]},
{sym:"Риби · стихія Води",img:"Місяць над дорогою між двома вежами, вовк і собака виють на нього, з води виповзає рак. Шлях через підсвідоме, де реальність змішується з ілюзіями.",
 origin:"Місяць формується в атмосфері невизначеності: недомовки, таємниці, тривожні дорослі. Дитина вчиться відчувати настрій без слів — і разом із цим вчиться тривожитися.",
 deep:["Тривога без явної причини","Додумування замість перевірки","Ілюзії про людей і розчарування"],
 body:"Ресурс — сон, творчість, вода, інтуїтивні практики. Енергія чутлива до безсоння й тривоги — потрібні вечірні ритуали без екранів.",
 work:{p:"Мистецтво, дизайн, реклама, кіно, фотографія, психологія, робота з образами.",m:"Страх ухвалювати рішення, сумнівні угоди, творча прокрастинація."},
 pr:{p:"Глибока емоційна близькість, романтика, інтуїтивне розуміння.",m:"Ревнощі, підозри, ілюзії, недомовленості.",c:"Підозра без фактів.",t:["Перевіряти, а не додумувати","Говорити про страхи вголос","Мати спільний творчий простір"]},
 plan:["Записуйте страхи й перевіряйте фактами","Вечір без екранів тричі на тиждень","Втілюйте уяву: малюйте, пишіть, фотографуйте","Перевірте одне підозріле припущення розмовою","Помітьте, які страхи не справдилися"],
 aff:"Я довіряю собі й реальності, моя уява творить, а не лякає.",harm:[2,12,14,20],tens:[1,6,8,17]},
{sym:"Сонце · світло",img:"Дитина на білому коні під великим сонцем, позаду соняшники. Радість, відкритість, успіх, що зігріває всіх довкола.",
 origin:"Сонце розкривається, коли дитину любили й раділи їй. Якщо ж любов треба було заслуговувати успіхом — дорослий може сяяти лише в ролі переможця й вигорати.",
 deep:["Потреба бути в центрі уваги","Страх не бути найкращим","Вигорання від постійної ролі сильного й веселого"],
 body:"Ресурс — сонце, радість, діти, відпочинок, визнання. Енергія вигорає від роботи без пауз — потрібен справжній відпочинок.",
 work:{p:"Керівництво, публічність, робота з дітьми, творчість, освіта, шоу-бізнес.",m:"Его в команді, конфлікти за лідерство, вигорання."},
 pr:{p:"Тепло, радість, щедрість, діти, свята, успіх разом.",m:"Конкуренція за увагу, его, «я важливіший».",c:"Хто в центрі.",t:["Святкувати успіхи одне одного","Мати багато радості й гри","Давати партнерові сяяти"]},
 plan:["Щодня 15 хвилин сонця або світла","Відзначте три свої успіхи за тиждень","Похваліть трьох людей щиро","Плануйте відпочинок без «треба»","Зробіть щось лише для радості"],
 aff:"Я сяю й зігріваю інших, не втрачаючи себе.",harm:[1,3,6,11,17],tens:[9,13,18]},
{sym:"Плутон · стихія Вогню",img:"Ангел сурмить, і люди піднімаються з трун, простягаючи руки до неба. Пробудження, переосмислення, поклик роду.",
 origin:"Суд формується через родову історію: сімейні таємниці, конфлікти поколінь, сильні фігури бабусь і дідусів. Людина несе родову силу — і родові сценарії.",
 deep:["Повторення життя батьків, від якого хотілося втекти","Осуд рідних і себе","Почуття обов’язку перед родиною, що тисне"],
 body:"Ресурс — коріння, родина, спільні свята, усвідомленість. Енергія виснажується від сімейних конфліктів і непрощених образ.",
 work:{p:"Сімейний бізнес, психологія, генеалогія, історія, педагогіка, соціальна робота.",m:"Робота «як у батьків», а не своя; конфлікти через обов’язок."},
 pr:{p:"Сильна сім’я, повага до родин обох, перезавантаження стосунків.",m:"Конфлікти з ріднею партнера, повторення батьківських сценаріїв.",c:"Чия родина важливіша.",t:["Прийняти родини одне одного","Створити власні традиції","Переосмислювати стосунки й оновлювати домовленості"]},
 plan:["Дізнайтеся історію роду від старших","Запишіть сценарій, який повторюєте","Змініть у ньому одну дію","Відновіть зв’язок з одним рідним","Пробачте те, що тягне назад"],
 aff:"Я беру силу свого роду й живу своє життя.",harm:[2,5,9,13],tens:[15,22,1]},
{sym:"Сатурн · стихія Землі",img:"Танцівниця всередині вінка, по кутах — символи чотирьох стихій. Завершеність, гармонія з усім світом.",
 origin:"Світ формується, коли дитина відчуває простір: подорожі, різні культури, свобода. Або навпаки — тісні рамки, з яких хочеться вирватися назавжди.",
 deep:["Страх обмежень і зобов’язань","Втеча від проблем у нові горизонти","Розпорошеність: багато всього, нічого завершеного"],
 body:"Ресурс — простір, подорожі, свобода, масштаб. Енергія виснажується від тісноти й невизначеності.",
 work:{p:"Міжнародний бізнес, туризм, дипломатія, мови, логістика, масштабні проєкти.",m:"Розпорошеність, незавершені великі справи, страх відповідальності за масштаб."},
 pr:{p:"Простір, свобода, подорожі, спільні горизонти, повага до свободи одне одного.",m:"Дистанція, «кожен у своєму світі», страх зобов’язань.",c:"Свобода проти близькості.",t:["Подорожувати разом","Залишати свободу кожному","Мати спільний великий план"]},
 plan:["Сплануйте подорож або вивчення мови","Завершіть велику справу, яку тягнете","Створіть ритуал «дому» там, де живете","Вирішіть одну проблему, від якої тікаєте","Оцініть, де свобода, а де втеча"],
 aff:"Я вільна людина й відчуваю себе вдома в цьому світі.",harm:[1,4,7,8,10],tens:[12,18,22]},
{sym:"Уран · стихія Повітря",img:"Юнак із квіткою в руці й торбинкою на плечі ступає до краю скелі, поруч собачка. Новий шлях, довіра, легкість першого кроку.",
 origin:"Блазень розкривається в дитинстві з грою й свободою. Якщо ж дитину рано змусили бути дорослою або, навпаки, ні до чого не привчили — дорослий або боїться спонтанності, або тікає від відповідальності.",
 deep:["Втеча від зобов’язань під виглядом свободи","Інфантильність: «хай хтось інший вирішить»","Страх рамок, через який людина нічого не будує"],
 body:"Ресурс — гра, сміх, спонтанність, свобода. Енергія виснажується від рамок, але й від хаосу — потрібен мінімальний режим.",
 work:{p:"Творчість, події, робота з дітьми, гумор, стартапи, туризм, нестандартні формати.",m:"Нестабільність, безвідповідальність, хаос у справах."},
 pr:{p:"Легкість, гра, сміх, спонтанні пригоди.",m:"Безвідповідальність, страх зобов’язань, «давай без планів».",c:"Один хоче стабільності, другий — свободи.",t:["Залишати місце для гри й спонтанності","Домовитися про мінімальні зобов’язання","Пробувати нове разом"]},
 plan:["Мінімальний режим: три справи на день","Доведіть до кінця одну обіцянку","Спробуйте щось зовсім нове","Додайте гру в рутину","Оцініть, де свобода, а де безвідповідальність"],
 aff:"Я вільна людина й відповідаю за свої вибори.",harm:[13,16,17,1],tens:[4,5,21]}
];
EX4.forEach((e,i)=>{if(e)Object.assign(ARC[i],e)});

/* ---------- what each arcana brings as a year energy ---------- */
const YR=[null,
"рік нових починань: запускайте проєкти, навчайтеся, говоріть про свої ідеї вголос",
"рік тиші й інтуїції: накопичення знань, таємниці, рішення на внутрішньому відчутті",
"рік достатку й творення: краса, тіло, новий творчий проєкт, можливе поповнення в родині",
"рік структури: відповідальність, кар’єра, статус, наведення ладу у справах",
"рік навчання й наставників: традиції, шлюб, нові знання, офіційні рамки",
"рік вибору й стосунків: знайомства, кохання, важливі рішення серцем",
"рік руху: переїзди, подорожі, кар’єрний ривок, досягнення мети",
"рік балансу: документи, договори, юридичні питання, наслідки минулих рішень",
"рік усамітнення й переосмислення: глибина, експертність, пошук сенсу",
"рік потоку й зміни обставин: удача, несподівані можливості, новий цикл",
"рік навантаження й сили: спорт, тіло, витримка, керування емоціями",
"рік паузи: інший погляд, творчість, служіння; події краще не форсувати",
"рік трансформації: завершення старого, кардинальні зміни, оновлення",
"рік гармонії: відновлення, повільний темп, творчість, турбота про душу",
"рік спокус і грошей: харизма, вплив, фінансові можливості, ризик залежностей",
"рік перебудови: руйнування застарілого, будівництво, переїзд, нерухомість",
"рік визнання: творчість, видимість, натхнення, публічність",
"рік підсвідомого: страхи й ілюзії виходять на поверхню, загострюється інтуїція",
"рік успіху й радості: досягнення, діти, тепло, лідерство",
"рік роду: сімейні події, переосмислення, перезавантаження, рішення щодо родини",
"рік масштабу: подорожі, нові горизонти, завершення великого етапу",
"рік свободи: легкість, нові шляхи, спонтанність, вихід із рамок"];

/* ---------- named programs (written from the center outward: D2-D1-D) ---------- */
const NAMED=[
{codes:["18-9-9","9-18-9","9-9-18"],n:"Чарівник і маг",alt:"Заборонені знання",
 p:"Глибока інтуїція, мудрість, дар бачити суть людей і подій, здібності до цілительства, психології, езотерики.",
 m:"Закритість, самотність, страх власних здібностей, замовчування знань, недовіра до людей, тяга до маніпуляцій.",
 h:"У минулому знання або магічні здібності використовувалися неправильно чи приховувалися від людей. Зараз це відчуття «я не такий, як усі», самотність, сильна тяга до таємного знання і водночас страх його проявити.",
 w:"Легально розвивати свої здібності — через психологію, консультування, навчання. Ділитися знанням відкрито, не впливати на людей без їхньої згоди, виходити з ізоляції."},
{codes:["12-16-4","12-4-16"],n:"Господар (Імператор)",alt:"Властитель",
 p:"Лідерство, вміння будувати системи й бізнес, відповідальність за людей, стратегічне мислення.",
 m:"Жорсткий контроль, тиск на близьких, руйнування збудованого, відчуття обмеженості й залежності від чужої волі.",
 h:"Колись була влада, яку використовували на шкоду. Зараз — кризи в кар’єрі, втрата статусу, ситуації, коли доводиться підкорятися або служити іншим, раптові обвали в справах.",
 w:"Керувати з турботою про людей, бачити в лідерстві служіння, будувати повільно й на чесному фундаменті, відпускати гординю."},
{codes:["15-5-8"],n:"Пристрасті в сім’ї та зради",alt:"Сімейні пристрасті",
 p:"Вірність, чесність, глибока пристрасть у шлюбі, повага до сімейних цінностей.",
 m:"Зради, ревнощі, обман у родині, подвійні стандарти, трикутники у стосунках.",
 h:"У минулому — зради близьких або зловживання їхньою довірою. Зараз сценарій повертається дзеркально: недовіра, ревнощі, любовні трикутники, страх бути ошуканим.",
 w:"Обирати чесність навіть тоді, коли незручно; поважати шлюб і обіцянки; не виправдовувати маніпуляції пристрастю."},
{codes:["21-4-10"],n:"Пригноблена душа",alt:"Пригноблений дух",
 p:"Сила вирватися з обмежень, масштаб мислення, здатність будувати власну незалежність.",
 m:"Залежність від людей, що контролюють, страх самостійності, відчуття, що життям керують обставини.",
 h:"У минулому — втрачена свобода. Зараз людина часто потрапляє під чужий контроль (батьки, партнер, начальник) і не наважується жити самостійно.",
 w:"Крок за кроком будувати власну опору: фінанси, рішення, кордони. Брати відповідальність за свій вибір і поступово звільнятися від контролю."},
{codes:["15-20-5"],n:"Бунтар",alt:"Надія роду",
 p:"Незалежність, сміливість іти своїм шляхом, здатність оновлювати застарілі традиції, реформаторський дух.",
 m:"Конфлікти з батьками й родом, протест заради протесту, неприйняття правил і вчителів, складнощі в будь-якій системі.",
 h:"У минулому — відмова від родових традицій і цінностей. Зараз це сварки з рідними, бунт проти авторитетів, проблеми з навчанням чи дисципліною, відчуття, що «вони мене не розуміють».",
 w:"Прийняти рід і батьків такими, якими вони є; поважати традиції, навіть не поділяючи їх; спрямувати бунтарську енергію в створення нового, а не в руйнування."},
{codes:["12-19-7"],n:"Воїн",alt:"Військовий",
 p:"Мужність, цілеспрямованість, здатність захищати слабших, сила доводити справу до перемоги.",
 m:"Агресія, постійна боротьба, конфлікти, травматизм, жорсткість до себе й інших, вигорання.",
 h:"Минулі втілення пов’язані з війною і боротьбою. Зараз усе дається «з бою»: життя відчувається як поле битви, легко спалахує агресія, важко розслабитися.",
 w:"Перетворити боротьбу на служіння: захищати, рятувати, займатися спортом. Ставити мирні цілі й дозволяти собі перемагати без війни."},
{codes:["6-8-20"],n:"Розчарування роду",alt:"Ганьба роду",
 p:"Родинність, справедливість, здатність відновлювати сімейні зв’язки й бути опорою для близьких.",
 m:"Образи на рідних, відчуття провини перед родом або того, що рід підвів, тяжкий шлях без підтримки.",
 h:"У минулому — вчинки, що розчарували рід. Зараз складні стосунки з батьками, відчуття, що доводиться все проходити самостійно, повторення сімейних конфліктів.",
 w:"Прощення — себе й рідних; турбота про старших; чесні й справедливі рішення щодо сім’ї; створення власної теплої родини."},
{codes:["18-3-12"],n:"Фізичні страждання",
 p:"Глибоке співчуття, творчість, здатність підтримувати інших духовно й емоційно.",
 m:"Тривоги за здоров’я, жертовність, сценарій страждання, страхи, отримання уваги через проблеми.",
 h:"Минуле пов’язане зі стражданням. Зараз — підвищена тривожність, жертовність у материнстві чи турботі, тенденція «хворіти», щоб отримати турботу.",
 w:"Працювати зі страхами, дбати про тіло без паніки, розвивати творчість і допомагати людям духовно, а не через самопожертву."},
{codes:["9-15-6"],n:"Світ казок і пристрастей",alt:"Пристрасть чи любов",
 p:"Глибина почуттів, харизма, мудрість у коханні, здатність до справжньої близькості.",
 m:"Ілюзії в коханні, залежні стосунки, самотність, недовіра, вибір недоступних партнерів.",
 h:"У минулому кохання ігнорувалося або підмінялося пристрастю. Зараз складно відкритися: або самотність, або закоханість у тих, хто не відповідає взаємністю.",
 w:"Відкривати серце поступово, будувати реальні стосунки замість фантазій, відмовитися від ігор і залежностей."},
{codes:["6-17-11","11-6-17"],n:"Загублений талант",alt:"Нереалізований талант",
 p:"Яскравий творчий дар, натхнення, сила втілити задумане й надихнути інших.",
 m:"Нереалізованість, лінь або перенапруга, розчарування в собі, відчуття, що живете не своїм життям.",
 h:"Талант із минулих втілень лишився нереалізованим. Зараз з’являється тиха туга за «своєю справою», заздрість до тих, хто творить, страх показати свою роботу.",
 w:"Регулярно творити і показувати результат світові, доводити творчі проєкти до кінця, не чекати ідеального моменту."},
{codes:["21-10-16"],n:"Духовний жрець",alt:"Духовний учитель",
 p:"Духовна сила, дар вчителя, масштаб мислення, здатність вести людей.",
 m:"Раптові руйнування, втрата віри, нереалізований дар, кризи, що повторюються.",
 h:"У минулому духовний дар не був переданий іншим. Зараз — пошук віри, раптові обвали планів, відчуття, що доля підштовхує до чогось більшого.",
 w:"Навчати, ділитися духовним досвідом, будувати спільноти; приймати кризи як підказки до свого шляху."},
{codes:["15-8-11"],n:"Фізична агресія",alt:"Боротьба за справедливість з агресією",
 p:"Велика сила, енергійність, почуття справедливості, здатність захистити.",
 m:"Агресія, вибухи гніву, конфлікти, оточення агресивних людей.",
 h:"Агресія з минулого повертається: поруч з’являються конфліктні люди, легко «зриває», складно стримувати гнів.",
 w:"Спорт і фізичне навантаження, робота з емоціями, захист справедливості без насильства."},
{codes:["18-6-15"],n:"Темний маг",alt:"Чорний маг",
 p:"Магнетизм, сильна інтуїція, чарівність, здатність впливати на людей.",
 m:"Маніпуляції, залежні стосунки, ілюзії, бажання контролювати почуття інших.",
 h:"У минулому здібності використовувалися на шкоду. Зараз — заплутані любовні історії, тяга впливати на людей, страх власної темряви.",
 w:"Спрямувати вплив на добро: психологія, творчість, допомога; бути чесним у коханні, не нав’язувати свою волю."},
{codes:["3-7-22"],n:"В’язень",alt:"Ув’язнений",
 p:"Сильна тяга до свободи, здатність допомагати іншим звільнитися.",
 m:"Залежності, відчуття клітки, обмеження в сім’ї чи на роботі.",
 h:"Минуле пов’язане з неволею. Зараз — несвобода в родині або роботі, залежності, страх обмежень.",
 w:"Будувати свободу відповідально, позбуватися залежностей, допомагати іншим знайти свободу."},
{codes:["9-3-21"],n:"Наглядач",alt:"Самотність у натовпі",
 p:"Мудрість, організованість, масштаб, вміння створювати безпечні рамки.",
 m:"Контроль, обмеження свободи близьких, гіперопіка, тиск.",
 h:"У минулому — обмеження свободи інших людей. Зараз — бажання тримати все й усіх під контролем, конфлікти через тиск.",
 w:"Поважати право інших на власний вибір, відпускати контроль, опікуватися без обмежень."},
{codes:["6-5-17"],n:"Гординя",alt:"Краса й марнославство",
 p:"Таланти, смак, здатність наставляти й надихати.",
 m:"Гординя, зверхність, нереалізованість, відчуття недооціненості.",
 h:"У минулому — гординя через таланти чи багатство. Зараз успіх дається важко, здається, що світ вас не цінує.",
 w:"Працювати наполегливо, приймати допомогу, ділитися талантом без зверхності."},
{codes:["21-7-13"],n:"Руйнування",alt:"Руйнівник",
 p:"Сила змін, сміливість, здатність рятувати й захищати.",
 m:"Тяга до ризику, агресія, страх смерті, руйнівні рішення.",
 h:"Минуле пов’язане з руйнуванням і загибеллю. Зараз — тяга до екстриму, ризикованих професій, різких рішень.",
 w:"Рятувати життя: медицина, безпека, допомога; спрямовувати силу змін у творення."},
{codes:["6-20-14"],n:"Душа, принесена в жертву",alt:"Жертва",
 p:"Гармонія, любов до родини, здатність об’єднувати близьких.",
 m:"Жертовність, життя для інших, відмова від самореалізації.",
 h:"У минулому — роль жертви. Зараз людина живе чужими цілями, ставить себе на останнє місце.",
 w:"Реалізовувати себе, обирати своє, дбати про власні бажання без почуття провини."},
{codes:["18-6-6"],n:"Магія любові (любовна залежність)",alt:"Безвідповідальне кохання",
 p:"Глибока чуттєвість, вміння любити віддано, тонке відчуття партнера, природна привабливість і чарівність.",
 m:"Любовна залежність, ідеалізація партнера, страх самотності, ревнощі, бажання «прив’язати» людину до себе, розчарування в коханні.",
 h:"У минулому кохання здобували хитрістю, ілюзіями чи приворотом — почуття були несправжніми або нерозділеними. Зараз людина закохується в образ, який сама вигадала, розчиняється в партнері й боїться його втратити; стосунки часто тримаються на емоційній залежності, а не на виборі.",
 w:"Будувати любов на свободі й чесності: бачити реальну людину, а не мрію, мати власне життя поза стосунками, не маніпулювати почуттями. Вибирати партнера тверезо, а не зі страху залишитися самому."},
{codes:["6-18-6"],n:"Жага любові",
 p:"Велика здатність любити, романтичність, емпатія, вміння створювати атмосферу ніжності й краси.",
 m:"Постійна потреба в підтвердженні любові, страх бути покинутим, ілюзії щодо партнерів, жертовність заради стосунків.",
 h:"Людина ніби весь час шукає любов, якої «не додали»: відчуває себе повноцінною лише поруч із кимось, легко потрапляє в стосунки, де любить більше, ніж її. Любов стає способом заповнити внутрішню порожнечу.",
 w:"Навчитися давати любов спершу собі: власні бажання, турбота про себе, відчуття цінності без партнера. Тоді стосунки перестають бути порятунком і стають рівноправним союзом."},
{codes:["9-12-3", "3-12-9"],n:"Жіноча самотність",
 p:"Мудрість, глибина почуттів, здатність бачити сенс у випробуваннях, жіноча сила, яка не залежить від обставин.",
 m:"Самотність у стосунках або без них, жертовність, відчуття, що щастя «не для мене», закритість після болю.",
 h:"У минулому сильне кохання закінчилося втратою або жінка залишилася сама з тягарем відповідальності. Зараз — повторювані сценарії самотності, вибір недоступних партнерів, страх знову відкритися.",
 w:"Відпустити старий біль, дозволити собі бути щасливою й прийняти турботу. Розвивати жіночність, творчість і дружбу, не замикатися в ролі «я все сама»."},
{codes:["3-22-19"],n:"Ненароджене дитя",alt:"Небажана дитина",
 p:"Особлива любов до дітей, тонка інтуїція, здатність опікуватися, творчість і легкість.",
 m:"Почуття провини без явної причини, складнощі з зачаттям або стосунками з дітьми, страх материнства чи батьківства, інфантильність.",
 h:"Програму пов’язують із втратою дитини в минулому — перерваною вагітністю, смертю чи відмовою від дитини. Зараз це може звучати як тривога за дітей, гіперопіка або, навпаки, страх відповідальності за них.",
 w:"Прожити й відпустити провину, свідомо ставитися до батьківства, піклуватися про дітей — власних чи чужих (наставництво, волонтерство, робота з дітьми). Дозволити собі радість і легкість."},
{codes:["21-10-7"],n:"Воїн віри",alt:"Біг по колу",
 p:"Сильні переконання, віра в ідею, відвага, здатність вести людей і захищати слабших.",
 m:"Фанатизм, нетерпимість до інших поглядів, боротьба заради боротьби, нав’язування своєї правди.",
 h:"У минулому людина воювала за віру чи ідею й могла завдавати шкоди тим, хто думав інакше. Зараз — жорсткі принципи, конфлікти через переконання, бажання «навернути» інших.",
 w:"Захищати свої цінності без насильства, поважати свободу думок, служити ідеї через творення й допомогу, а не через боротьбу."},
{codes:["3-13-10"],n:"Цінність життя",alt:"Саморуйнування",
 p:"Глибоке розуміння життя, вміння відроджуватися після криз, сила трансформації, турбота про інших.",
 m:"Апатія, відчуття безвиході в кризах, недооцінка власного життя, саморуйнівні звички, ризикована поведінка.",
 h:"Програму пов’язують із тим, що в минулому життя обірвалося з власної волі. Зараз уроки стосуються цінності життя: у складні періоди може здаватися, що виходу немає, хоча він завжди є.",
 w:"Свідомо наповнювати життя сенсом, турбуватися про тіло, будувати опору — людей, справи, творчість. У кризах не залишатися на самоті й звертатися по допомогу до близьких і фахівців."},
{codes:["6-14-8"],n:"Диктатор",alt:"Деспот",
 p:"Організаторський талант, вміння керувати великими групами, почуття справедливості, сила впливу.",
 m:"Деспотизм, контроль над близькими, жорсткість, вимога безумовного підкорення, конфлікти через владу.",
 h:"У минулому людина мала владу над багатьма й користувалася нею жорстко. Зараз — бажання все контролювати, складні стосунки в парі через тиск, або навпаки — опинення в залежності від чужої волі.",
 w:"Керувати через повагу, а не через страх; давати близьким свободу вибору; поєднувати силу з м’якістю й справедливістю."},
{codes:["3-15-12"],n:"Знецінення результату", alt:"Фатальна жінка (чоловік)",
 p:"Творча й матеріальна плідність, вміння створювати красу й цінне, глибина погляду.",
 m:"Знецінення власної праці, віддавання результату задарма, відчуття «все дарма», застрягання в процесі без фіналу.",
 h:"Людина багато вкладає — сили, гроші, турботу, — але не дозволяє собі отримати віддачу: продає себе дешевше, ніж варта, або кидає справу перед самим результатом.",
 w:"Чесно оцінювати свою працю, називати ціну, доводити справи до кінця й привласнювати успіх. Дозволити собі насолоджуватися плодами зробленого."},
{codes:["5-17-12"],n:"Страх проявлення",alt:"Публічна ганьба",
 p:"Мудрість, талант, натхнення, здатність навчати й бути прикладом для інших.",
 m:"Страх публічності й оцінки, приховування талантів, очікування «правильного моменту», який не настає.",
 h:"Людина відчуває свій потенціал, але боїться показатися: соромиться, чекає дозволу або вважає, що ще не готова. Таланти роками лишаються «в шухляді».",
 w:"Проявлятися маленькими кроками: ділитися роботами, виступати, навчати. Прийняти, що критика — це частина шляху, а не вирок."},
{codes:["12-6-21"],n:"Світова відомість",
 p:"Масштаб, широке бачення, вміння служити людям, творчий дар, здатність бути відомим за межами свого кола.",
 m:"Відчуття, що ти «не на своєму місці», жертовність заради визнання, розпорошення на багато напрямків.",
 h:"Програма людини, чий вплив може вийти далеко за межі рідного міста чи країни. Але поки шлях не знайдено, з’являється відчуття, що життя проходить повз, а сили йдуть на чужі цілі.",
 w:"Шукати свою справу, через яку можна служити багатьом: творчість, освіта, міжнародні проєкти. Не боятися масштабу й виходити за звичні межі."},
{codes:["7-5-16"],n:"Відмова від кумира", alt:"Втрата авторитету",
 p:"Сильний рух уперед, вірність ідеалам, здатність перебудовувати своє життя й переглядати авторитети.",
 m:"Сліпе наслідування кумирів, розчарування в учителях, руйнування віри, конфлікти з авторитетами.",
 h:"Людина довго йде за чужими правилами чи авторитетом, а потім настає криза: кумир падає, і разом з ним руйнується опора.",
 w:"Шанувати вчителів, але не обожнювати; будувати власні переконання на досвіді; сприймати руйнування старого як звільнення для нового."},
{codes:["9-22-13"],n:"Загублена людина", alt:"Неупокоєні душі",
 p:"Свобода, мудрість, здатність починати з чистого аркуша, внутрішня незалежність.",
 m:"Відчуття розгубленості, відсутність мети, втеча від реальності, постійна зміна напрямку без результату.",
 h:"Людина ніби шукає себе й не знаходить: міняє роботи, міста, захоплення, але відчуття «де моє місце?» не зникає.",
 w:"Зупинитися й побути з собою, знайти свої цінності; дозволити старому завершитися, щоб з’явилася ясність; обрати одну справу й пройти її до кінця."},
{codes:["15-7-10"],n:"Спокуса і чистота",
 p:"Харизма, енергійність, вміння досягати цілей, удача в справах.",
 m:"Спокуси легких грошей і задоволень, залежності, азарт, ризикована поведінка.",
 h:"Програма постійного вибору між швидким і правильним: шлях часто підкидає спокуси, які обіцяють легкий успіх, але забирають сили.",
 w:"Обирати чисті методи, тримати слово, розвивати силу волі. Спрямовувати пристрасть і енергію в чесну справу."},
{codes:["5-12-7"],n:"Подвійність", alt:"Духовний застій",
 p:"Мудрість, гнучкість, здатність бачити ситуацію з різних боків, вміння навчати.",
 m:"Роздвоєність, нерішучість, життя за двома правилами, страх вибору, внутрішній конфлікт.",
 h:"Людина розривається між обов’язком і бажанням, між правилами й свободою. Зовні може здаватися правильною, а всередині жити зовсім іншим.",
 w:"Узгодити переконання й дії, робити вибір і брати за нього відповідальність, бути чесним із собою."},
{codes:["14-21-7"],n:"Емпатія і грубість",alt:"Розкриття внутрішньої сили",
 p:"Тонке відчуття людей, дипломатія, вміння гармонізувати, масштаб і рішучість.",
 m:"Перепади від м’якості до різкості, вибухи після довгого терпіння, грубість до близьких.",
 h:"Людина довго терпить і пристосовується, а потім різко вибухає. Дві протилежні сторони характеру конфліктують між собою.",
 w:"Говорити про свої почуття вчасно, не накопичувати; поєднувати ніжність і силу; знайти здоровий вихід енергії — спорт, рух, творчість."},
{codes:["14-6-10"],n:"Творчий шлях", alt:"Поворот долі",
 p:"Талант до мистецтва, смак, гармонія, вміння творити красу й заробляти на ній.",
 m:"Розпорошення, очікування натхнення, непостійність, залежність від чужої оцінки.",
 h:"Програма людини, якій важливо реалізуватися творчо. Без цього з’являється туга й відчуття, що життя проходить не так.",
 w:"Робити творчість регулярною практикою, монетизувати свої таланти, не чекати ідеального моменту."},
{codes:["22-5-10"],n:"Плутанина", alt:"Інквізиція",
 p:"Свобода мислення, відкритість новому, легкість, вміння переглядати правила.",
 m:"Хаос у справах, неорганізованість, плутанина в поглядах, необов’язковість.",
 h:"Людина не любить рамок, і через це життя часто стає хаотичним: незавершені справи, змішані плани, непослідовність.",
 w:"Знайти свою систему, яка не обмежує, а підтримує: плани, списки, ритуали. Зберігати свободу, але відповідати за наслідки."},
{codes:["17-10-11"],n:"Надія на успіх", alt:"Упущений шанс",
 p:"Талант, удача, енергія, віра у свою зірку, сила досягати.",
 m:"Очікування успіху без дій, надія на «щасливий випадок», розчарування, коли успіх не приходить сам.",
 h:"Людина відчуває, що її чекає щось велике, і часом чекає на це занадто довго, замість того щоб діяти.",
 w:"Поєднувати віру з наполегливою роботою, рухатися щодня. Удача приходить до тих, хто вже в русі."},
{codes:["8-22-14"],n:"Два полюси", alt:"Скупість",
 p:"Справедливість, свобода, гармонія, вміння знаходити баланс між протилежностями.",
 m:"Крайнощі: від суворих правил до повного хаосу, нестабільність, складно знайти золоту середину.",
 h:"Життя людини ніби хитається між двома полюсами — порядок і свобода, контроль і безтурботність.",
 w:"Шукати баланс і помірність, не впадати в крайнощі, свідомо обирати середину."},
{codes:["7-18-11"],n:"Продуманий шлях", alt:"Бойовий маг",
 p:"Стратегічність, інтуїція, сила, вміння прораховувати кроки наперед.",
 m:"Надмірний контроль, страхи й підозрілість, параліч через аналіз, недовіра до інших.",
 h:"Людина хоче все передбачити й прорахувати, і через страхи довго не наважується діяти.",
 w:"Довіряти інтуїції, але діяти; прийняти, що неможливо передбачити все; працювати зі страхами."},
{codes:["20-3-10"],n:"Розчарування в жінках",alt:"Страх повторення",
 p:"Родинні цінності, турбота, творчість, вміння відроджувати й відновлювати.",
 m:"Конфлікти з жінками роду, недовіра до жінок, складні стосунки з матір’ю, жінкою чи доньками.",
 h:"Програма родової образи: людина могла не отримати достатньо тепла від матері чи пережити зраду з боку жінки.",
 w:"Відпустити образи до жінок роду, вибачити матір, вибудувати здорові стосунки з жіночністю — у собі чи в партнерці."},
{codes:["8-20-12"],n:"Фенікс", alt:"Спустошення душі",
 p:"Здатність відроджуватися після криз, мудрість роду, справедливість, нові можливості після падіння.",
 m:"Затяжні кризи, відчуття покарання, життя за чужими сценаріями роду.",
 h:"Людина проходить через серйозні випробування, але кожного разу може підніматися сильнішою.",
 w:"Прийняти досвід роду, дивитися на кризи як на перехід, не застрягати в ролі жертви."},
{codes:["17-9-10"],n:"Утопія",
 p:"Мрійливість, натхнення, мудрість, здатність бачити ідеальний світ і надихати ним.",
 m:"Відірваність від реальності, ідеалізм, розчарування в людях і світі.",
 h:"Людина мріє про ідеальне життя й ідеальних людей, а реальність постійно не відповідає очікуванням.",
 w:"Перетворювати мрії на конкретні плани, приймати світ неідеальним, робити маленькі реальні кроки."},
{codes:["13-7-20"],n:"Застій", alt:"Відмова рухатися вперед",
 p:"Сила трансформації, рішучість, зв’язок із родом, здатність до кардинальних змін.",
 m:"Застрягання в старому, страх змін, тягнення того, що вже давно пора завершити.",
 h:"Людина довго тримається за старі стосунки, роботу, звички, хоча вони вже не дають розвитку.",
 w:"Завершувати те, що віджило; не боятися змін; рухатися вперед, навіть якщо страшно."},
{codes:["5-6-11"],n:"Самооцінка",
 p:"Мудрість, любов, сила, вміння вибирати своє й підтримувати інших.",
 m:"Невпевненість, залежність від чужої думки, складність у виборі, заниження власної цінності.",
 h:"Людина часто сумнівається в собі й шукає схвалення, через що робить вибір на користь інших, а не себе.",
 w:"Розвивати внутрішню опору, цінувати свої бажання, приймати рішення самостійно."},
{codes:["6-21-15"],n:"Без кордонів", alt:"Розгул",
 p:"Любов до свободи, широкий світогляд, пристрасність, харизма.",
 m:"Розмиті межі в стосунках, складність сказати «ні», зловживання свободою, залежності.",
 h:"Людина легко входить у чуже життя й пускає інших у своє, через що з’являються виснажливі стосунки.",
 w:"Встановлювати здорові межі, вчитися казати «ні», свідомо обирати, кому відкриватися."},
{codes:["20-11-9"],n:"Сімейна людина", alt:"Мудрий Лев",
 p:"Цінність родини, сила й мудрість, вміння об’єднувати близьких і бути опорою для роду.",
 m:"Розчинення в сім’ї, відмова від себе заради родини, самотність усередині великої родини.",
 h:"Родина для людини — центр життя. Але якщо забути про себе, сімейне коло стає обов’язком, а не радістю.",
 w:"Будувати сім’ю на рівних, зберігати власний простір і справу, передавати роду мудрість, а не жертовність."},
{codes:["5-8-13"],n:"Чуже життя",
 p:"Мудрість, справедливість, сила трансформації, вміння жити за цінностями.",
 m:"Життя за чужими правилами й очікуваннями, відчуття, що власне життя не почалося.",
 h:"Людина довго живе так, як «треба» батькам, суспільству чи партнеру, і не помічає, як втрачає себе.",
 w:"Розібратися, чого хочеться саме тобі; поступово змінювати життя під свої цінності, не боятися розірвати чужий сценарій."},
{codes:["4-15-11"],n:"Амбітний лідер", alt:"Спокуса владою",
 p:"Лідерство, сила, енергія, вміння досягати масштабних цілей і заробляти.",
 m:"Владолюбство, жорсткість, маніпуляції, робота на знос, пристрасть до контролю.",
 h:"Людина створена керувати й досягати, але легко перетворює амбіції на тиск на інших і на себе.",
 w:"Керувати з повагою до людей, ставити чесні цілі, розподіляти навантаження, пам’ятати про відпочинок."},
{codes:["7-22-15"],n:"Розпал пристрастей",alt:"Адреналін усередині",
 p:"Енергія, сміливість, харизма, пристрасть до життя й руху.",
 m:"Імпульсивність, залежності, гонитва за емоціями, ризик, бурхливі стосунки.",
 h:"Людина живе на високих швидкостях і сильних емоціях: стосунки й рішення часто виходять бурхливими.",
 w:"Спрямовувати пристрасть у справу, спорт, творчість; зупинятися перед рішеннями; не шукати адреналіну заради адреналіну."},
{codes:["20-11-4"],n:"Володар",
 p:"Сила, лідерство, зв’язок із родом, вміння будувати й захищати.",
 m:"Контроль, авторитаризм у сім’ї, тиск роду, жорсткість.",
 h:"Програма людини, яка тримає все під контролем — родину, справи, близьких.",
 w:"Перейти від контролю до опори, поважати свободу інших, бути сильним без тиску."},
{codes:["9-7-16"],n:"Замкнутість", alt:"Руйнівник ілюзій",
 p:"Мудрість, глибина, самостійність, вміння зосереджуватися й досягати.",
 m:"Ізоляція, недовіра, самотність, відгородженість від людей, болісні кризи.",
 h:"Людина замикається в собі після болю чи розчарувань і поступово відгороджується від світу.",
 w:"Відкриватися поступово, ділитися досвідом, шукати своїх людей, приймати допомогу."},
{codes:["19-11-10"],n:"Драйв і виснаження", alt:"Вигорання, спалах",
 p:"Енергія, оптимізм, сила, удача, здатність надихати.",
 m:"Робота на межі, вигорання, перевтома, ігнорування сигналів тіла.",
 h:"Людина горить справою й тягне на собі багато, але без відновлення швидко виснажується.",
 w:"Чергувати навантаження й відпочинок, берегти здоров’я, делегувати."},
{codes:["9-5-14"],n:"Шахіст", alt:"Внутрішній учитель",
 p:"Стратегічність, мудрість, терпіння, вміння навчати й прораховувати наслідки.",
 m:"Надмірна обережність, повільність, недовіра, холодність.",
 h:"Людина довго думає й прораховує, і через це іноді упускає можливості.",
 w:"Поєднувати аналіз із дією, довіряти людям, ділитися знанням."},
{codes:["9-8-8"],n:"Просвітлення", alt:"Усвідомлена самотність",
 p:"Мудрість, справедливість, внутрішня гармонія, дар бачити причини й наслідки.",
 m:"Надмірна суворість до себе й інших, ізоляція, моралізаторство.",
 h:"Подвійна енергія Справедливості робить людину дуже вимогливою до правди й порядку.",
 w:"Поєднувати мудрість і м’якість, ділитися знаннями без осуду, жити за принципами без жорсткості."},
{codes:["16-16-5"],n:"Оплот знань",
 p:"Сила оновлення, мудрість, вміння вчити й будувати нове на руїнах старого.",
 m:"Руйнування авторитетів, конфлікти з учителями, кризи віри.",
 h:"Подвійна енергія Вежі часто приносить різкі зміни в поглядах і світоглядні кризи.",
 w:"Будувати власну систему знань, вчитися й навчати, сприймати кризи як ріст."},
{codes:["18-6-12"],n:"Постійна напруга",alt:"Залежні стосунки",
 p:"Інтуїція, любов, вміння бачити глибину й служити іншим.",
 m:"Тривожність, страхи, жертовність у стосунках, напруга без явної причини.",
 h:"Людина живе з фоновою тривогою: щось може статися, когось можна втратити.",
 w:"Працювати з тривогою, вчитися довіряти, не жертвувати собою заради чужого спокою."},
{codes:["8-10-10"],n:"Знавець долі",alt:"Страхи",
 p:"Справедливість, удача, розуміння законів життя, вміння бачити причини подій.",
 m:"Фаталізм, пасивність, надія на долю замість дій.",
 h:"Людина відчуває, що все в житті невипадкове, і інколи перестає діяти, покладаючись на долю.",
 w:"Брати відповідальність за свої вибори, бачити в подіях підказки, а не вирок."},
{codes:["8-11-11"],n:"Борець за справедливість", alt:"Миротворець",
 p:"Сила, справедливість, енергія, бажання захищати слабших.",
 m:"Агресія, боротьба заради принципу, конфлікти, жорсткість.",
 h:"Подвійна Сила й Справедливість роблять людину борцем, який не терпить нечесності.",
 w:"Захищати правду мудро, без агресії; спрямовувати силу на допомогу людям."},
{codes:["8-7-17"],n:"Унікальний талант", alt:"Ексклюзив",
 p:"Особливий дар, рух уперед, справедливість, натхнення.",
 m:"Незрозумілість для інших, недооцінка таланту, страх проявитися.",
 h:"Людина має рідкісний талант, але може довго його не помічати або не показувати.",
 w:"Розвивати свій дар, проявлятися, шукати середовище, де його цінують."},
{codes:["10-15-5"],n:"Духовне об’єднання", alt:"Висока місія об’єднання",
 p:"Удача, енергія, мудрість, вміння об’єднувати людей ідеєю.",
 m:"Сектантство, маніпуляції через віру, залежність від гуру.",
 h:"Програма лідера або вчителя, навколо якого збираються люди.",
 w:"Навчати чесно, поважати свободу учнів, не підміняти віру контролем."},
{codes:["21-6-6"],n:"Чиста любов",
 p:"Безумовна любов, гармонія, широта душі, вміння любити світ і людей.",
 m:"Ідеалізація кохання, страх реальних стосунків, розчарування через високі очікування.",
 h:"Подвійні Закохані в поєднанні зі Світом дають мрію про ідеальну, «вселенську» любов.",
 w:"Любити реальних людей, приймати їхні недоліки, дозволити стосункам бути живими."},
{codes:["13-13-8"],n:"Перезавантаження системи", alt:"Трансформація",
 p:"Сила трансформації, здатність до глибоких змін, справедливість.",
 m:"Різкі завершення, кризи, страх змін, руйнування стабільності.",
 h:"Подвійна Смерть приносить цикли радикальних оновлень у житті.",
 w:"Сприймати завершення як оновлення, не триматися за старе, жити чесно."},
{codes:["9-8-17"],n:"Заперечення і внутрішній блок",alt:"Втрачена таємниця",
 p:"Мудрість, справедливість, талант, натхнення.",
 m:"Самоблокування, заперечення своїх бажань, страх успіху.",
 h:"Людина сама собі ставить перешкоди: «я не можу», «це не для мене».",
 w:"Помічати внутрішні заборони, дозволяти собі мріяти й діяти."},
{codes:["9-21-12"],n:"Жертва заради світу", alt:"Переоцінка життєвого шляху",
 p:"Мудрість, служіння, широке бачення, вміння допомагати багатьом.",
 m:"Жертовність, самотність, виснаження від служіння іншим.",
 h:"Людина відчуває місію допомагати світу й часто забуває про себе.",
 w:"Служити, зберігаючи ресурс; дбати про себе; приймати допомогу."},
{codes:["11-11-4"],n:"Міць і сила", alt:"Лідер",
 p:"Велика фізична й внутрішня сила, витривалість, лідерство, здатність захищати.",
 m:"Агресія, впертість, тиск на інших, виснаження від надмірних навантажень.",
 h:"Подвійна Сила з Імператором робить людину дуже потужною, але ця сила потребує керування.",
 w:"Спрямовувати силу у спорт, справу, захист інших; вчитися м’якості й гнучкості."},
{codes:["16-8-10"],n:"Поділ на групи", alt:"Змова, змовник",
 p:"Справедливість, вміння оновлювати системи, удача в змінах.",
 m:"Конфлікти, поділ на «своїх» і «чужих», руйнування стосунків через принципи.",
 h:"Людина часто опиняється в ситуаціях розколу — у колективі, родині, оточенні.",
 w:"Шукати те, що об’єднує, будувати мости, бути справедливим без радикальності."},
{codes:["16-10-21"],n:"Доступ до духовних знань",
 p:"Відкритість новому, удача, масштаб, глибоке розуміння світу.",
 m:"Різкі кризи світогляду, нестабільність, втеча в духовність від реальності.",
 h:"Через кризи й переломи людина приходить до глибокого розуміння життя.",
 w:"Поєднувати духовний розвиток із реальним життям, ділитися знанням."},
{codes:["18-11-11"],n:"Магічні здібності", alt:"Страх прийняти магічну силу",
 p:"Сильна інтуїція, внутрішня сила, здатність впливати й зцілювати.",
 m:"Страхи, ілюзії, маніпуляції, енергетичне виснаження.",
 h:"Подвійна Сила з Місяцем дає сильний вплив на людей і тонке відчуття прихованого.",
 w:"Використовувати свій дар етично — допомога, психологія, творчість; працювати зі страхами."},
{codes:["18-10-10"],n:"Атеїст",alt:"Страх довіритися Богу",
 p:"Раціональність, удача, вміння бачити закономірності, практичність.",
 m:"Заперечення інтуїції й духовного, цинізм, страхи, які людина не визнає.",
 h:"Людина шукає логічне пояснення всьому й заперечує те, що не може пояснити.",
 w:"Довіряти інтуїції поряд із логікою, бути відкритим до різних поглядів."},
{codes:["18-7-7"],n:"Відмова від лідерства", alt:"Страх розвитку",
 p:"Сила руху, інтуїція, здатність досягати цілей.",
 m:"Страх відповідальності, відмова від лідерства, ілюзії щодо власних можливостей.",
 h:"Людина має потенціал вести за собою, але через страхи відходить у тінь.",
 w:"Брати відповідальність маленькими кроками, ставити цілі, рухатися попри страх."},
{codes:["6-15-9"],n:"Ідеї, ілюзії, пристрасть", alt:"Пристрасть або любов",
 p:"Чарівність, харизма, мудрість, вміння надихати ідеями.",
 m:"Ілюзії, спокуси, пристрасні, але руйнівні стосунки.",
 h:"Людина легко захоплюється ідеями й людьми, але часто розчаровується, коли бачить реальність.",
 w:"Розрізняти пристрасть і любов, перевіряти ідеї практикою."},
{codes:["14-7-7"],n:"Лідер і дипломат",
 p:"Гармонія, рух, рішучість, вміння домовлятися й вести.",
 m:"Нетерпіння, конфлікти через поспіх, розпорошення.",
 h:"Подвійна Колісниця з Помірністю дає лідера, який вміє поєднувати силу й дипломатію.",
 w:"Поєднувати швидкість і виваженість, вести людей через домовленості."},
{codes:["3-3-6"],n:"Творчість і краса",alt:"Стабільність і пристрасть",
 p:"Творчість, краса, жіночність, вміння створювати затишок і гармонію.",
 m:"Лінь, споживацтво, надмірна залежність від комфорту, ревнощі.",
 h:"Подвійна Імператриця з Закоханими дає сильну творчу й чуттєву природу.",
 w:"Творити, ділитися красою, поєднувати комфорт із розвитком."},
{codes:["8-8-18"],n:"Страх нового обману",
 p:"Справедливість, інтуїція, вміння розпізнавати правду.",
 m:"Підозрілість, недовіра, страх бути обманутим, тривожність.",
 h:"Після болючого досвіду людина весь час чекає підступу й важко довіряє.",
 w:"Відпустити минулий досвід, довіряти поступово, перевіряти факти, а не страхи."},
{codes:["4-4-8"],n:"Справедливий правитель",alt:"Патріарх",
 p:"Лідерство, порядок, справедливість, стабільність, вміння будувати.",
 m:"Жорсткість, контроль, бюрократичність, суворість до близьких.",
 h:"Подвійний Імператор зі Справедливістю дає сильного керівника, який цінує порядок.",
 w:"Поєднувати порядок із людяністю, бути справедливим, але не жорстким."},
{codes:["5-5-18"],n:"Таємниця роду", alt:"Магічні знання роду та ідеалізація сім’ї",
 p:"Мудрість роду, інтуїція, зв’язок із традиціями, глибина.",
 m:"Родові таємниці, страхи, ілюзії, сліпе слідування традиціям.",
 h:"У роду можуть бути таємниці, які впливають на долю нащадків.",
 w:"Пізнавати історію роду, відпускати чужі страхи, брати з традицій ресурс."},
{codes:["14-14-9"],n:"Мудрий посланець", alt:"Аскет",
 p:"Гармонія, терпіння, мудрість, вміння зцілювати й навчати.",
 m:"Пасивність, самотність, відстороненість від життя.",
 h:"Подвійна Помірність із Відлюдником дає мудру й спокійну людину, яка допомагає іншим знайти баланс.",
 w:"Ділитися мудрістю, бути активним, виходити до людей."},
{codes:["9-9-20"],n:"Вища мудрість", alt:"Самотній мудрець",
 p:"Глибока мудрість, зв’язок із родом, духовність, вміння пробуджувати інших.",
 m:"Самотність, замкнутість, відчуження від родини.",
 h:"Подвійний Відлюдник із Судом дає людину, яка шукає глибинний сенс і рідко говорить про це.",
 w:"Ділитися знаннями з роду, бути частиною спільноти, навчати."},
{codes:["11-11-22"],n:"Вихід із матриці",alt:"Сила і баланс",
 p:"Сила, свобода, сміливість, нестандартне мислення.",
 m:"Бунт заради бунту, безвідповідальність, ризик, агресія.",
 h:"Людина прагне вийти за всі рамки й жити по-своєму.",
 w:"Поєднувати свободу з відповідальністю, спрямовувати силу на творення."},
{codes:["16-16-9"],n:"Духовний лідер", alt:"Фортеця духу",
 p:"Мудрість, сила оновлення, вміння вести людей через кризи.",
 m:"Руйнування, гординя, самотність, фанатизм.",
 h:"Подвійна Вежа з Відлюдником дає лідера, який проходить через кризи й допомагає іншим.",
 w:"Вести людей без примусу, приймати кризи як ріст, залишатися скромним."},
{codes:["11-19-19"],n:"Сила, радість і успіх", alt:"Амбіції та енергія",
 p:"Енергія, оптимізм, удача, сила, успіх.",
 m:"Самовпевненість, гординя, виснаження від постійної активності.",
 h:"Подвійне Сонце з Силою дає яскраву, успішну й енергійну особистість.",
 w:"Ділитися радістю, не зазнаватися, берегти ресурс."},
{codes:["12-6-6"],n:"Любов і жертва",
 p:"Відданість, любов, вміння служити й підтримувати.",
 m:"Жертовність у стосунках, залежність, страждання через любов.",
 h:"Людина любить, віддаючи себе повністю, і часто забуває про власні потреби.",
 w:"Любити, зберігаючи себе; приймати любов у відповідь; не жертвувати собою."},
{codes:["22-22-8"],n:"Повна свобода від установок",
 p:"Свобода, легкість, справедливість, відкритість новому.",
 m:"Безвідповідальність, хаос, відмова від правил, несерйозність.",
 h:"Подвійний Блазень дає дуже вільну людину, яка не терпить рамок.",
 w:"Поєднувати свободу з відповідальністю, створювати власні правила."},
{codes:["10-5-5"],n:"Віра і матерія", alt:"Інженер",
 p:"Мудрість, удача, традиції, вміння поєднувати духовне й матеріальне.",
 m:"Догматизм, жорсткість у поглядах, залежність від авторитетів.",
 h:"Подвійний Ієрофант із Колесом Фортуни дає людину, яка шукає баланс між вірою й практичним життям.",
 w:"Поєднувати духовні цінності з матеріальним успіхом, бути гнучким."},
{codes:["4-14-10"],n:"Емоційна залежність",alt:"Залежність від влади й грошей",
 p:"Емоційна зрілість, уміння будувати стабільне життя, тонке відчуття міри, вдача в справах, коли людина спирається на себе.",
 m:"Розчинення в партнері чи роботі, контроль через гроші й статус, холодність, страх утратити опору поза собою.",
 h:"Людина шукає опору в комусь або в чомусь зовнішньому — партнері, керівнику, грошах — і втрачає себе, коли ця опора хитається.",
 w:"Будувати внутрішню опору: власні рішення, фінансову самостійність, режим. Відпускати контроль, шукати баланс між матеріальним і душею."},
{codes:["5-3-20"],n:"Гординя і проблеми з родом",
 p:"Мудрий наставник, який шанує минуле й створює для родини нові, здорові традиції; тепло, плідність, сімейна сила.",
 m:"Конфлікти зі старшими, осуд родинних правил, розірвані зв’язки, бажання бути «правильнішим» за власний рід.",
 h:"Людина рано починає сперечатися з традиціями сім’ї й відчуває, що рід її не розуміє; згодом повторює те, що засуджувала.",
 w:"Прийняти рід без ідеалізації, подякувати старшим, будувати свої правила м’яко, не руйнуючи зв’язків."},
{codes:["5-8-21"],n:"Порушення законів і неприйняття світу",alt:"Особиста відповідальність",
 p:"Чесність, повага до правил, здатність реформувати системи зсередини, широке бачення й особиста відповідальність.",
 m:"Відчуття, що світ несправедливий, боротьба з владою й законами, конфлікти з системою, «правила не для мене».",
 h:"Людина часто стикається з бюрократією, судами, начальством і сприймає це як особисту війну проти себе.",
 w:"Діяти в межах закону або змінювати правила конструктивно; брати відповідальність за свою частку в конфлікті."},
{codes:["5-19-14"],n:"Інтелектуальна гординя", alt:"Багатство",
 p:"Яскравий розум, уміння вчити й надихати, гармонійне поєднання знань і тепла, успіх в освіті та консультуванні.",
 m:"Відчуття «я розумніший за інших», зневага до чужої думки, повчальний тон, самотність через зверхність.",
 h:"Людина багато знає й любить пояснювати, але чує лише себе; її поради відштовхують, а не допомагають.",
 w:"Розвивати смирення: питати, слухати, визнавати знання інших. Ділитися знанням із теплом, а не з висоти."},
{codes:["6-5-20"],n:"Розбите серце",
 p:"Глибока здатність любити, вірність, уміння створювати сім’ю на повазі й традиціях, прощення.",
 m:"Старий біль у коханні, страх близькості, вибір недоступних партнерів, недовіра після зради.",
 h:"Пережита зрада чи розставання формує обережність: людина або уникає стосунків, або обирає тих, хто знову поранить.",
 w:"Пробачити минулий досвід, свідомо обирати партнера за цінностями, відкриватися поступово."},
{codes:["7-1-8"],n:"Воїн за справедливість",
 p:"Сильний лідер, який рухається до мети, ініціативність, сила слова, боротьба за правду чесними методами.",
 m:"Агресія, тиск, трудоголізм, бажання перемогти будь-якою ціною, маніпуляції словом.",
 h:"Людина постійно «воює» — за проєкти, за правду, за своє місце — і виснажується від боротьби.",
 w:"Спрямовувати енергію на конструктивні цілі, вчитися командній роботі й домовленостям замість війни."},
{codes:["7-12-19"],n:"Душа дитини",alt:"Безвідповідальність",
 p:"Легкість, творчість, щирість, уміння радіти й надихати, оптимізм навіть у складних обставинах.",
 m:"Уникання відповідальності й труднощів, очікування, що хтось подбає, інфантильність, жертовність заради схвалення.",
 h:"Людина ніби залишається дитиною: її рятують, за неї вирішують, а вона ображається, коли доводиться відповідати самій.",
 w:"Подорослішати, зберігаючи легкість: брати відповідальність за своє життя, завершувати почате, рухатися до власних цілей."},
{codes:["7-13-20"],n:"Агресія до близьких",alt:"Воїн роду",
 p:"Захисник родини, сила оновлення, здатність вести близьких через кризи й рятувати рід.",
 m:"Контроль і конфлікти в сім’ї, різкість до рідних, руйнування стосунків у пориві гніву.",
 h:"Енергія боротьби спрямовується на найближчих: суперечки, тиск, бажання переробити рідних під себе.",
 w:"Перетворити агресію на захист і підтримку, вести без домінування, вчитися прощати й завершувати старі образи."},
{codes:["8-1-6"],n:"Складний вибір у коханні",
 p:"Чесність у почуттях, уміння домовлятися, сила слова, гармонійні стосунки на рівних.",
 m:"Постійне вагання між партнерами чи варіантами, страх помилитися, параліч вибору, подвійні стосунки.",
 h:"Людина довго не може обрати — між двома людьми, містами, роботами — і через це втрачає обидва варіанти.",
 w:"Слухати серце й ухвалювати рішення; прийняти, що ідеального вибору не буває, і брати відповідальність за свій."},
{codes:["8-7-15"],n:"Боротьба і насильство",
 p:"Сила волі, справедливість, здатність захищати слабших і досягати масштабних цілей чесно.",
 m:"Агресія, боротьба за владу, роль агресора чи жертви, конфлікти, що переходять межі.",
 h:"У житті повторюються ситуації тиску й сили: людина або тисне сама, або опиняється поруч із тими, хто тисне.",
 w:"Усвідомити ціну гніву, шукати мирні способи вирішення конфліктів, спрямовувати силу в спорт і справу."},
{codes:["8-12-4"],n:"Жертва влади",alt:"Повалений правитель",
 p:"Справедливе лідерство, повага до волі інших, уміння служити й керувати водночас.",
 m:"Тиск домінантного начальника чи партнера, або власна тиранія; втрата статусу, приниження.",
 h:"Людина або терпить тиск сильнішого, або сама стає жорстким керівником, а потім втрачає позиції.",
 w:"Будувати внутрішній стрижень, ставити здорові межі, поважати свободу інших і не зловживати владою."},
{codes:["8-18-10"],n:"Магічний вплив і страх обману", alt:"У пошуках справедливості",
 p:"Сильна інтуїція, здатність розпізнавати правду, справедливість, удача, коли людина довіряє собі.",
 m:"Чутливість до маніпуляцій, страх бути ошуканим, підозрілість, тривога через «чужий вплив».",
 h:"Людина постійно перевіряє, чи її не обманюють, а через недовіру втрачає і шанси, і людей.",
 w:"Розвивати інтуїцію й довіру до себе, перевіряти факти замість страхів, захищати себе межами, а не підозрою."},
{codes:["10-12-22"],n:"Жертва обставин",
 p:"Легкість, довіра до потоку, уміння бачити ситуацію інакше й починати з чистого аркуша.",
 m:"Пасивність, очікування рятівника, відчуття, що життя — низка невдач, безвідповідальність.",
 h:"Людина пливе за течією й чекає, що хтось змінить її життя; невдачі сприймає як долю.",
 w:"Стати капітаном свого життя: помічати, що вибір є навіть у складних ситуаціях, і робити маленькі кроки самостійно."},
{codes:["11-5-16"],n:"Руйнування устоїв",
 p:"Реформатор, який сміливо оновлює застарілі правила й будує нове; сила, віра, масштаб.",
 m:"Протест заради протесту, руйнування традицій, конфлікти з учителями й системами, хаос.",
 h:"Людина постійно бореться з правилами й авторитетами, але після руйнування не знає, що збудувати натомість.",
 w:"Руйнувати лише те, що справді віджило, і мати план нового; поважати знання, навіть оновлюючи їх."},
{codes:["11-16-5"],n:"Применшення значущості",
 p:"Внутрішня сила, здатність оновлюватися після криз, мудрість, що спирається на досвід.",
 m:"Знецінення себе й своїх знань, страх виділитися, руйнування власних досягнень.",
 h:"Людина применшує свої заслуги, віддає ініціативу іншим і сама руйнує те, що могло б її підняти.",
 w:"Визнавати свою цінність, фіксувати досягнення, дозволяти собі бути видимою людиною й експертом."},
{codes:["11-9-19"],n:"Самотній геній",
 p:"Сильний інтелект, талант, глибина, здатність досягати успіху й ділитися мудрістю з багатьма.",
 m:"Ізоляція, переконання «мене ніхто не розуміє», вигорання від роботи наодинці, зверхність.",
 h:"Людина працює сама, не просить допомоги й не ділиться знанням — і відчуває, що її талант ніхто не бачить.",
 w:"Виходити з «вежі зі слонової кістки»: навчати, працювати в команді, ділитися досягненнями."},
{codes:["11-12-1"],n:"Неприйняття своєї сили",
 p:"Велика внутрішня сила, ініціативність, уміння служити людям і запускати нове.",
 m:"Страх власної сили, роль жертви, щоб уникнути відповідальності, нездійснені починання.",
 h:"Людина відчуває в собі потенціал, але обирає залишатися слабкою: так безпечніше, ніж відповідати за свою силу.",
 w:"Визнати свою силу й використовувати її на добро; починати справи й доводити їх до результату."},
{codes:["13-3-16"],n:"Руйнування жіночності",alt:"Правило балансу",
 p:"Оновлена, зріла жіночність, творчість, турбота, здатність відродити дім і стосунки.",
 m:"Придушення жіночої енергії, конфлікти з жінками, відмова від м’якості, руйнування затишку.",
 h:"Людина (або жінки в роду) живе «по-чоловічому», заперечує ніжність і потребу в турботі, а потім вигорає.",
 w:"Зцілювати внутрішню жіночність: м’якість, прийняття, турбота про тіло й дім, творчість."},
{codes:["13-6-19"],n:"Втрата дитини",alt:"Очищення простору",
 p:"Любов до дітей, вміння оновлювати стосунки й простір, радість, тепло, сила життя.",
 m:"Травма, пов’язана з дітьми (втрата, аборт), страх вагітності, гіперопіка, тривога за дітей.",
 h:"Програма може звучати як страх материнства чи батьківства або надмірний контроль над дитиною.",
 w:"Прожити й відпустити травму, звернутися по підтримку, вчитися довіряти життю; оновлювати простір і стосунки."},
{codes:["13-10-21"],n:"Глобальні зміни і страх майбутнього",
 p:"Сміливість змінюватися, масштаб, удача в нових циклах, уміння бачити зміни як ріст.",
 m:"Страх змін, триманння за стабільність, відчуття, що світ руйнується, тривога за майбутнє.",
 h:"Людина опирається будь-яким змінам, а життя «виштовхує» її різкими поворотами.",
 w:"Приймати цикли життя, планувати зміни замість чекати їх, бачити в завершенні початок нового."},
{codes:["14-3-7"],n:"Творча нереалізованість",
 p:"Творчий дар, смак, гармонія, уміння втілювати ідеї й рухатися до мети.",
 m:"Апатія, лінь, рутина, страх показати творчість, туга за «своєю справою».",
 h:"Творчий потенціал роками лежить без руху: людина відкладає, бо «не на часі» чи «не досконало».",
 w:"Зробити творчість частиною життя хоча б як хобі; регулярно творити й показувати результат."},
{codes:["14-8-22"],n:"В’язень обов’язку",
 p:"Відповідальність без надриву, баланс, свобода, уміння жити за власними цінностями.",
 m:"Життя за «треба» замість «хочу», втрата радості й свободи, неможливість сказати «ні».",
 h:"Людина тягне обов’язки перед іншими й не помічає, як її власне життя минає повз.",
 w:"Поєднувати відповідальність із власними бажаннями, вчитися відмовляти, повертати собі свободу вибору."},
{codes:["15-6-19"],n:"Спокуси в коханні й грошах",
 p:"Харизма, пристрасть, успіх, радість у стосунках і справах, уміння заробляти чесно.",
 m:"Романи, фінансові схеми, легкі задоволення з важкими наслідками, залежності.",
 h:"Людину тягне до швидкого успіху й гострих почуттів, а наслідки наздоганяють згодом.",
 w:"Думати про довгострокові наслідки, обирати чесні шляхи, будувати стосунки на виборі, а не на спокусі."},
{codes:["16-4-19"],n:"Руйнування сім’ї",
 p:"Сила будувати міцний дім, лідерство, тепло, уміння відродити родину після криз.",
 m:"Втрата дому й стабільності, розлучення, страх сім’ї, руйнування збудованого.",
 h:"Людина або боїться створювати сім’ю, або стикається з тим, що збудоване раптово руйнується.",
 w:"Будувати внутрішній фундамент і дім поступово, на чесності й повазі; не будувати на гординні."},
{codes:["16-10-12"],n:"Руйнування стабільності",alt:"Жертва змін",
 p:"Здатність перебудовуватися, удача в нових циклах, інший погляд на ситуацію.",
 m:"Страх змін, через який життя саме ламає рутину; відчуття, що зміни відбуваються «з тобою».",
 h:"Людина тримається за звичне, доки обставини не змушують її різко змінитися.",
 w:"Приймати зміни й керувати ними: самій ініціювати оновлення, поки воно не прийшло кризою."},
{codes:["17-4-9"],n:"Невизнаний геній",
 p:"Талант, глибина, мудрість, уміння втілювати ідеї в систему й бути помітним.",
 m:"Приховування дару з гордині чи страху критики, самотність, роки «в шухляді».",
 h:"Людина має сильний талант, але не показує його: чекає ідеального моменту або боїться оцінки.",
 w:"Сміливо проявлятися, ділитися талантом, приймати зворотний зв’язок як частину росту."},
{codes:["17-7-6"],n:"Війна за кохання",
 p:"Яскраві, натхненні стосунки, пара-команда, яка рухається до спільної мети.",
 m:"Кохання як поле битви: суперництво, ревнощі, страждання, боротьба за увагу.",
 h:"Людина вірить, що любов треба вибороти, і створює стосунки, де багато драми й мало спокою.",
 w:"Прийняти, що справжня любов не потребує війни; будувати партнерство замість суперництва."},
{codes:["7-6-17"],n:"Два світи", alt:"Паралельне кохання",
 p:"Здатність поєднувати різні сфери життя, натхнення, вибір серцем, творчий рух уперед.",
 m:"Розрив між мрією й реальністю, життя на два світи, неможливість обрати один шлях.",
 h:"Людина ніби живе подвійним життям — у мріях і в буденності — і ніде не відчуває себе цілісною.",
 w:"Обрати свій шлях і привести мрію в реальність кроками; не розриватися між двома світами."},
{codes:["17-10-3"],n:"Втрата потоку й достатку",
 p:"Удача, творчий і фінансовий потік, щедрість, уміння приймати достаток.",
 m:"Блокування грошей і творчості через сумніви, страх чи гординю; «стеля» доходу.",
 h:"Можливості приходять, але людина їх не бере або відштовхує, бо не вірить, що заслуговує.",
 w:"Відновити довіру до життя, дозволити собі отримувати, вчитися приймати й дякувати."},
{codes:["19-3-13"],n:"Втрата радості й страх змін",
 p:"Радість, творчість, плідність, уміння оновлюватися й радіти кожному етапу життя.",
 m:"Страх змін, бо вони асоціюються з утратою, блокування радості, тривога за благополуччя.",
 h:"Людина боїться, що будь-яка зміна забере щось добре, і тому не дозволяє собі радіти повністю.",
 w:"Приймати зміни як частину життя, щодня знаходити радість, завершувати старе з вдячністю."},
{codes:["20-10-8"],n:"Порушення родових законів", alt:"Звільнення з неволі",
 p:"Справедливість, мудрість роду, удача, здатність виправити помилки поколінь.",
 m:"Повторення родових помилок, порушення моральних норм у роду, почуття провини.",
 h:"Людина ніби несе чужу провину або повторює вчинки, які в роду вже приносили біду.",
 w:"Усвідомити ці помилки й свідомо обирати інакше; чесно відповідати за свої вчинки."},
{codes:["22-3-8"],n:"Несвобода в сім’ї",alt:"Ідеальна картинка",
 p:"Свобода в родині, здорові межі, справедливість, творчість і легкість у стосунках.",
 m:"Сім’я як в’язниця, тиск родичів, бунт або втеча з дому, життя заради «ідеальної картинки».",
 h:"Людина або підлаштовується під очікування рідних, або різко рве з ними, щоб вирватися.",
 w:"Знайти внутрішню свободу, ставити здорові межі з рідними, жити не заради картинки, а заради себе."},
{codes:["22-4-11"],n:"Придушення свободи силою",
 p:"Сила, що захищає свободу, справедливе лідерство, мужність відстоювати свої межі.",
 m:"Тиск і контроль — свій або чужий, обмеження свободи, боротьба за незалежність.",
 h:"Людина або сама обмежує інших, або опиняється під жорстким контролем і довго не може вирватися.",
 w:"Відстоювати свою свободу спокійно й твердо, поважати свободу інших, керувати без придушення."},
{codes:["2-10-8"],n:"Безтурботний балакун",
 p:"Інтуїція, уміння слухати й говорити доречно, удача, справедливі рішення.",
 m:"Зайві розмови, плітки, розголошення таємниць, слова без відповідальності.",
 h:"Людина говорить більше, ніж робить, і через необережні слова втрачає довіру й можливості.",
 w:"Цінувати слово: тримати таємниці, говорити по суті, підкріплювати обіцянки діями."},
{codes:["19-9-8"],n:"Промінчик світла", alt:"Безнадія",
 p:"Тепло, мудрість, справедливість, здатність світити іншим і вести їх до ясності.",
 m:"Самотність, втома від ролі «рятівника», жорсткість до себе, вигорання.",
 h:"Людина стає для інших джерелом світла й підтримки, але забуває наповнювати себе.",
 w:"Ділитися теплом, зберігаючи ресурс; дозволяти собі відпочинок і підтримку від інших."},
{codes:["6-9-21"],n:"Гіперопіка", alt:"Усиновлення",
 p:"Любов і мудрість, турбота, що дає свободу, здатність бачити світ широко.",
 m:"Надмірна опіка й контроль близьких, страх відпустити, задушлива любов.",
 h:"Людина так дбає про інших, що позбавляє їх самостійності, і ображається, коли її турботу не цінують.",
 w:"Любити, даючи свободу; довіряти близьким їхній вибір, дбати й про себе."},
{codes:["17-12-22"],n:"Переворот світогляду",
 p:"Новий погляд на світ, свобода від старих установок, натхнення, творчий прорив.",
 m:"Розчарування в ідеалах, втрата орієнтирів, хаос, жертовність заради ілюзій.",
 h:"Людина переживає момент, коли старі переконання руйнуються, і довго шукає нові опори.",
 w:"Прийняти переосмислення як ріст, будувати нові цінності на досвіді, а не на мріях."},
{codes:["22-17-12"],n:"Відстоювання своїх прав",
 p:"Сміливість захищати свої права й мрії, свобода, натхнення, інший погляд.",
 m:"Боротьба за своє місце, відчуття невизнаності, жертовність, бунт.",
 h:"Людина довго терпить, а потім різко відстоює себе — часто запізно або занадто різко.",
 w:"Захищати свої права вчасно й спокійно, ставити межі до того, як накопичиться образа."},
{codes:["16-21-5"],n:"Фокус на матеріальному", alt:"Псування майна",
 p:"Масштабне будівництво, духовна опора в матеріальному успіху, мудрість.",
 m:"Зосередженість лише на грошах і статусі, втрата сенсу, руйнування через гординю.",
 h:"Людина будує кар’єру й добробут, але відчуває порожнечу, бо забуває про душу.",
 w:"Поєднувати матеріальні цілі з духовними цінностями, будувати не лише для себе, а й для світу."},
{codes:["19-7-6"],n:"Провина без причини", alt:"Винен за всіх",
 p:"Радість руху, успіх, щирі стосунки, уміння обирати серцем.",
 m:"Почуття провини «на рівному місці», виправдовування, страх зробити щось не так.",
 h:"Людина постійно відчуває себе винною — за успіх, за вибір, за радість — і гальмує свій рух.",
 w:"Розрізняти справжню відповідальність і нав’язану провину, дозволяти собі радіти й рухатися."},
{codes:["20-7-5"],n:"Захист свого", alt:"Вигнання із системи",
 p:"Захист родини й цінностей, рух до мети, мудрість роду, лідерство.",
 m:"Агресивна оборона «свого», нетерпимість до чужих поглядів, конфлікти за принципи.",
 h:"Людина гостро реагує на будь-яку загрозу своєму — родині, переконанням, території.",
 w:"Захищати своє мудро, без війни; поважати чужі погляди й шукати спільне."},
{codes:["16-8-6"],n:"Не можна дати того, чого немає", alt:"Хвастощі",
 p:"Чесні, збалансовані стосунки, справедливість, уміння будувати любов на реальності.",
 m:"Вимоги до партнера дати те, чого не вистачило в дитинстві, руйнування стосунків через очікування.",
 h:"Людина чекає від близьких любові й підтримки, яких не отримала в дитинстві, і розчаровується.",
 w:"Спершу дати собі те, чого бракує; будувати стосунки на рівних, без вимог закрити старі рани."},
{codes:["20-9-7"],n:"Приховування таємниці", alt:"Ніхто не забере",
 p:"Мудрість роду, глибина, рух уперед, уміння відкрити й зцілити родові історії.",
 m:"Родинні таємниці, замовчування, самотність, страх правди.",
 h:"У роду є історії, про які мовчать; людина відчуває напругу, але не розуміє її причин.",
 w:"Дізнаватися історію роду, говорити про важливе, відпускати таємниці, що тягнуть назад."},
{codes:["22-11-7"],n:"Статичність",
 p:"Свобода, сила й рух уперед, сміливість починати нове.",
 m:"Застій, страх змін, сила, яка не знаходить виходу, бездіяльність.",
 h:"Людина має багато енергії, але не рухається: чекає, сумнівається, «зависає».",
 w:"Робити маленькі кроки щодня, спрямовувати силу в конкретну мету, дозволяти собі пробувати."},
{codes:["3-14-17"],n:"Яскрава особливість",
 p:"Творчий талант, смак, гармонія, здатність бути помітною людиною й надихати.",
 m:"Страх виділятися, марнославство, залежність від оцінки, нереалізований дар.",
 h:"Людина має яскраву рису чи талант, які складно сховати, і або соромиться їх, або живе заради оплесків.",
 w:"Приймати свою особливість, розвивати її й ділитися нею без страху й без марнославства."},
{codes:["12-11-17"],n:"Масштабність",
 p:"Великий талант, сила, інший погляд, здатність впливати на багатьох.",
 m:"Жертовність заради великих ідей, розпорошення, нереалізованість масштабу.",
 h:"Людина мислить масштабно, але не наважується діяти або жертвує собою заради чужих цілей.",
 w:"Перетворювати масштабні ідеї на конкретні кроки, служити ідеї, не забуваючи про себе."},
{codes:["9-13-4"],n:"Думки про кінець", alt:"Скінченність буття",
 p:"Мудрість, глибина, здатність до трансформації, внутрішня опора й порядок.",
 m:"Тривожні думки про завершення, песимізм, страх втрат, жорсткий контроль.",
 h:"Людина часто думає про те, що все закінчиться, і через це не дозволяє собі жити повністю.",
 w:"Приймати цикли життя, жити теперішнім, будувати опору; у складні періоди звертатися по підтримку до близьких і фахівців."},
{codes:["17-20-3"],n:"Прихована прив’язаність", alt:"Таємне кохання",
 p:"Натхнення, підтримка роду, творчість, тепла близькість.",
 m:"Прихована залежність від рідних чи колишніх, невисловлені почуття, туга.",
 h:"Людина зовні незалежна, але всередині тримається за когось із минулого й не відпускає.",
 w:"Визнати свою прив’язаність, прожити й відпустити її, будувати нові зв’язки відкрито."},
{codes:["20-4-11"],n:"Приборкувач", alt:"Сильна воля",
 p:"Сила й лідерство, захист родини, уміння керувати емоціями й людьми.",
 m:"Жорсткість, придушення інших, контроль у родині, гнів.",
 h:"Людина ніби весь час «приборкує» — себе, близьких, обставини — і живе в напрузі.",
 w:"Керувати м’якою силою, поважати волю інших, давати вихід емоціям безпечно."},
{codes:["11-6-22"],n:"Маніпуляція дитиною",
 p:"Сила любові, свобода, щирі стосунки з дітьми й близькими.",
 m:"Маніпуляції почуттями, використання дитини в конфліктах дорослих, тиск через любов.",
 h:"У родині дитину використовують як аргумент чи засіб тиску, і доросла людина повторює цей сценарій.",
 w:"Давати дітям і близьким свободу, говорити прямо, не використовувати любов як важіль."},
{codes:["17-22-5"],n:"Академічні знання",
 p:"Глибокі знання, натхнення, свобода мислення, талант викладача й дослідника.",
 m:"Відірваність теорії від життя, догматизм, знання заради статусу.",
 h:"Людина накопичує знання й дипломи, але не завжди застосовує їх на практиці.",
 w:"Поєднувати теорію з практикою, ділитися знаннями живо й зрозуміло."},
{codes:["13-21-8"],n:"Системна помилка",
 p:"Здатність перебудовувати системи, масштаб, справедливість.",
 m:"Повторення однієї й тієї самої помилки, хаос у справах, конфлікти з правилами.",
 h:"У житті ніби збій: людина знову й знову потрапляє в схожі ситуації, доки не змінить підхід.",
 w:"Шукати корінь повторюваної ситуації й змінювати одну конкретну дію; будувати чесні системи."},
{codes:["13-18-5"],n:"Сакральна жертва",
 p:"Глибока духовність, інтуїція, здатність до трансформації й служіння.",
 m:"Жертовність, страхи, залежність від учителів чи вірувань, втрата себе.",
 h:"Людина готова віддати себе ідеї чи вчителю й не помічає, як губить власне життя.",
 w:"Служити зі свободи, перевіряти вчення на досвіді, берегти себе й свої межі."},
{codes:["9-19-10"],n:"Чистий потік",
 p:"Мудрість, радість, удача, легкість, уміння бути в правильному місці в правильний час.",
 m:"Самотність, втрата потоку через страхи, пасивність.",
 h:"Коли людина в гармонії з собою, життя складається легко; коли ізолюється — потік зникає.",
 w:"Довіряти потоку, ділитися мудрістю й теплом, не замикатися в собі."},
{codes:["11-9-16"],n:"Саморуйнування",
 p:"Сила, мудрість, здатність перебудувати життя на новому фундаменті.",
 m:"Руйнування власних досягнень, самокритика, ізоляція, перевтома.",
 h:"Людина досягає результату, а потім сама його руйнує — через сумніви, гординю чи виснаження.",
 w:"Помічати момент, коли хочеться все зруйнувати, і зупинятися; будувати поступово й дбати про ресурс."},
{codes:["22-4-8"],n:"Обмеження системи",
 p:"Свобода в межах правил, справедливе лідерство, уміння змінювати системи.",
 m:"Відчуття клітки, конфлікти з правилами й владою, бюрократичні пастки.",
 h:"Людина відчуває себе затиснутою правилами — на роботі, в державі, в родині.",
 w:"Знаходити свободу всередині правил, змінювати систему законними шляхами."},
{codes:["22-4-9"],n:"Залежність", alt:"Несвобода",
 p:"Свобода, мудрість, уміння будувати незалежне життя.",
 m:"Залежність від людей, звичок чи обставин, контроль, самотність.",
 h:"Людина опиняється в залежності — від партнера, роботи чи звички — і довго не може вирватися.",
 w:"Помічати свої залежності й поступово звільнятися від них, будувати внутрішню опору."},
{codes:["7-8-19"],n:"Скочування в лінь", alt:"Шлях до самореалізації",
 p:"Рух до мети, справедливість, успіх і радість від результату.",
 m:"Лінь, відкладання, втрата мотивації після перших успіхів.",
 h:"Людина швидко досягає результату, а потім розслабляється й втрачає темп.",
 w:"Ставити чіткі цілі, відзначати проміжні результати й зберігати ритм."},
{codes:["3-18-18"],n:"Гармонія всередині",
 p:"Творчість, інтуїція, жіночність, уміння знаходити спокій у собі.",
 m:"Страхи, ілюзії, тривожність, творчість, що лякає замість радувати.",
 h:"Багата уява може і творити, і лякати — людина вчиться знаходити рівновагу.",
 w:"Втілювати уяву в творчість, перевіряти страхи реальністю, дбати про спокій."},
{codes:["11-3-19"],n:"Відсутність результатів",
 p:"Сила, творчість, успіх, коли енергія спрямована в одну мету.",
 m:"Багато зусиль без результату, розпорошення, втома.",
 h:"Людина багато працює, але результату не видно, бо сили розпорошені.",
 w:"Обрати один пріоритет, доводити справи до кінця й відзначати результат."},
{codes:["8-8-16"],n:"Наважитися на зміни",
 p:"Справедливість, порядок, сміливість оновлювати застаріле.",
 m:"Страх змін, тримання за правила, раптові кризи.",
 h:"Людина довго живе за правилами, доки зміни не приходять самі — різко.",
 w:"Наважуватися на зміни вчасно, оновлювати систему, поки вона працює."},
{codes:["9-17-9"],n:"Розвиток",
 p:"Мудрість, натхнення, талант, постійний внутрішній ріст.",
 m:"Самотність, замкненість, мрії без дії.",
 h:"Людина постійно вчиться й шукає сенс, але не завжди ділиться знайденим.",
 w:"Ділитися знаннями, втілювати ідеї й виходити до людей."},
{codes:["21-21-6"],n:"Цілісність",
 p:"Гармонія, любов до світу, широта поглядів, цілісність.",
 m:"Втеча від вибору, розпорошення, ідеалізація.",
 h:"Людина прагне охопити весь світ, але їй важко обрати й укорінитися.",
 w:"Обирати серцем, будувати глибокі зв’язки, поєднувати свободу з близькістю."},
{codes:["21-5-11"],n:"Обман", alt:"Підробка",
 p:"Сила віри, мудрість, широке бачення.",
 m:"Обман і самообман, маніпуляції, розчарування в учителях.",
 h:"Людина стикається з обманом — своїм чи чужим — і вчиться розрізняти правду.",
 w:"Бути чесною з собою й іншими, перевіряти слова діями."},
{codes:["3-19-16"],n:"Інтуїція і потреби", alt:"Рясне життя",
 p:"Тепло, творчість, радість, здатність разом будувати нове.",
 m:"Невисловлені потреби, різкі кризи, руйнування збудованого.",
 h:"У парі одна людина часто не говорить про свої потреби, і напруга вибухає кризою.",
 w:"Говорити про потреби прямо, будувати разом поступово."},
{codes:["10-5-15"],n:"Продаж знань і маніпуляції",
 p:"Мудрість, удача, уміння ділитися знаннями чесно й заробляти на експертності.",
 m:"Використання знань і авторитету для маніпуляцій, жадібність.",
 h:"Людина має знання й вплив, і її спокушає використати їх собі на користь за чужий рахунок.",
 w:"Ділитися знаннями щиро й етично, не прив’язуватися до результату."},
{codes:["9-6-15"],n:"Творча реалізація", alt:"Казковий світ, письменник і творець",
 p:"Мудрість, любов, харизма, творча реалізація.",
 m:"Ілюзії, залежність, пристрасті, самотність.",
 h:"Людина має творчий потенціал, але відволікається на пристрасті.",
 w:"Спрямовувати пристрасть у творчість."},
{codes:["9-20-11"],n:"Зміна енергетики роду", alt:"Виродження роду",
 p:"Мудрість роду, сила, здатність змінити сценарії поколінь.",
 m:"Тягар родових сценаріїв, самотність, боротьба з ріднею.",
 h:"Людина стає тим, хто змінює енергетику роду, і відчуває на собі його вагу.",
 w:"Прийняти рід, взяти силу й свідомо змінювати сценарії."},
{codes:["9-14-5"],n:"Помста",
 p:"Мудрість, терпіння, уміння прощати й навчати.",
 m:"Образи, бажання помсти, жорсткість принципів.",
 h:"Людина довго пам’ятає кривди й чекає справедливості.",
 w:"Пробачати, відпускати образи, шукати мир."},
{codes:["5-10-15"],n:"Висока духовна місія",
 p:"Мудрість, удача, вплив, духовне лідерство.",
 m:"Маніпуляції вірою, гординя, залежність від влади.",
 h:"Людина відчуває місію вести інших, і її випробовує спокуса влади.",
 w:"Служити чесно, не підміняти віру контролем."},
{"codes": ["7-20-13", "13-20-7"], "n": "Небезпека в дорозі", "alt": "Шлях переродження", "p": "Обережність без страху, вміння вчасно змінити маршрут, сміливість починати нове життя після кризи, родова підтримка в русі вперед.", "m": "Тривога перед поїздками й рішеннями, відкладання змін, травми через поспіх, відчуття, що кожен крок уперед небезпечний.", "h": "Програма звучить як сигнал «обережно»: перед важливими рішеннями, переїздами чи новою роботою людина відчуває напругу, ніби щось має піти не так. Часто в роду були історії втрат у дорозі або різких обривів планів.", "w": "Готуватися до змін, а не уникати їх: план, страховка, перевірка фактів. Не поспішати там, де є ризик, але й не відкладати рух роками. Пам’ятати, що завершення старого відкриває двері новому."},
{"codes": ["9-16-7", "7-16-9"], "n": "Мовчання", "p": "Спокій, спостережливість, вміння слухати й тримати паузу, глибина думки, здатність не реагувати на провокації.", "m": "Замкнутість, невисловлені образи, очікування, що інші вгадають ваші потреби, раптові «вибухи» після довгого мовчання.", "h": "Людина довго мовчить про важливе — про біль, бажання, незгоду — і сподівається, що все владнається саме. Накопичене прориває різко, руйнуючи стосунки чи плани.", "w": "Вчитися говорити вчасно й спокійно: «мені важливо…», «мені не підходить…». Вести щоденник, ділитися думками з близькими, не чекати, поки напруга стане вибуховою."},
{"codes": ["5-14-19", "19-14-5"], "n": "Код мільйонера", "p": "Масштабне мислення, багато ідей, вміння створювати цінність для людей, щедрість, удача в справах, які приносять користь багатьом.", "m": "Вимірювання своєї цінності грошима, розпорошення на десятки ідей, очікування легкого багатства без системної роботи.", "h": "Програма дає потенціал великого достатку, але не гарантує його: гроші приходять, коли ідеї доводяться до результату і служать людям. Без цього з’являється відчуття, що «могла б мати більше».", "w": "Обрати одну головну справу й довести її до стабільного доходу. Поєднувати натхнення з дисципліною, вчитися фінансової грамотності, ділитися знаннями й заробленим."},
{"codes": ["6-22-16", "16-22-6"], "n": "Жарт і серйозність", "p": "Почуття гумору, вміння розрядити напругу, легкість у складних ситуаціях, творчий погляд на кризи.", "m": "Біль, захований за жартами, знецінення серйозних тем, або навпаки — драматизація дрібниць; руйнування стосунків через недоречну іронію.", "h": "Людина часто відповідає жартом там, де треба говорити серйозно, або «вибухає» через дрібниці. За легкістю може ховатися страх показати справжні почуття.", "w": "Розрізняти, коли гумор допомагає, а коли тікає від розмови. Дозволяти собі серйозність і вразливість, а легкість використовувати, щоб підтримувати, а не уникати."},
{"codes": ["4-21-17", "17-21-4"], "n": "Фокус і розпорошення", "p": "Масштабне бачення, цілеспрямованість, здатність надихати людей великою метою й доводити її до втілення.", "m": "Розпорошення між ідеями, «хочу все одразу», великі плани без структури, втома від незавершених проєктів.", "h": "Людина бачить великі можливості й легко загоряється новими напрямками, але без порядку енергія розсіюється, і результат не з’являється.", "w": "Тримати одну головну ціль на рік і розбивати її на конкретні кроки. Записувати ідеї «на потім», а не кидатися на кожну. Будувати систему, яка утримує фокус."},
{"codes": ["20-5-3", "3-5-20"], "n": "Храм і осквернення", "p": "Повага до цінностей, традицій і спільного простору, вміння створювати дім і родину як щось святе, духовна опора роду.", "m": "Моральна жорсткість, засудження тих, хто живе інакше, або навпаки — порушення чужих меж і зневага до традицій.", "h": "Програма звучить у ставленні до дому, родини й цінностей: людина або дуже суворо охороняє «правильний» устрій, або постійно стикається з тим, що її простір чи цінності знецінюють.", "w": "Берегти свої цінності, не нав’язуючи їх іншим. Поважати чужі межі й традиції, створювати дім, у якому затишно всім, а не лише «за правилами»."},
{"codes": ["8-13-5", "5-13-8"], "n": "Не на своєму місці", "alt": "Загублений", "p": "Здатність перебудовувати життя, чесно шукати своє, відпускати чужі ролі й знаходити справжнє покликання.", "m": "Відчуття, що живеш не своє життя, відстороненість від реальності, робота чи стосунки «з обов’язку», нескінченні роздуми без дій.", "h": "Людина довго займає чуже місце — в професії, родині, стосунках — і відчуває глуху незадоволеність. Зовні все може виглядати пристойно, але всередині немає радості.", "w": "Чесно визнати, що саме не ваше, і крок за кроком змінювати це. Шукати свою справу через спроби, навчання й наставників, не боятися завершувати те, що віджило."},
{"codes": ["20-15-5", "5-15-20"], "n": "Родові узи", "p": "Сильний зв’язок із родом, вміння зберігати традиції й водночас обирати власні цінності, сила роду як опора.", "m": "Залежність від очікувань рідних, родові залежності чи пристрасті, що передаються поколіннями, конфлікти через «так у нас прийнято».", "h": "Людина відчуває, що рід тримає її сильніше, ніж хотілося б: рішення ухвалюються з оглядкою на родину, а старі сімейні сценарії — гроші, пристрасті, контроль — повторюються.", "w": "Подякувати роду за силу й чесно розібратися, які сценарії ви не хочете продовжувати. Обирати свої цінності без війни з рідними, розривати залежності м’яко, але твердо."},
{"codes": ["12-3-15", "15-3-12"], "n": "Розкриття творчого потенціалу", "p": "Яскравий творчий дар, нестандартне бачення, здатність перетворювати талант на дохід і впливати на людей через красу.", "m": "Творчість «у шухляді», страх оцінки, робота за безцінь або спокуса продати талант дешево, жертовність замість реалізації.", "h": "Людина відчуває сильний творчий потенціал, але довго не дозволяє собі його проявити або віддає результати задарма. Коли дар не реалізований, з’являються апатія й заздрість до тих, хто творить.", "w": "Регулярно творити й показувати результат, призначати чесну ціну своїй роботі. Перетворити творчість із хобі на справу, шукати середовище, де її цінують."},
/* added from the gadalkindom.ru catalogue (approved list) */
{codes:["19-9-10", "10-9-19"],n:"Чистий потік енергії",
 p:"Сила, мудрість і вдача, що підтримують одна одну; ясність і внутрішнє світло.",
 m:"Розпорошення енергії, ізоляція, очікування удачі без дій.",
 h:"Енергія тече вільно, коли людина живе усвідомлено й не тримається за контроль.",
 w:"Довіряти потоку, діяти вчасно, ділитися знаннями й радістю."},
{codes:["5-10-5"],n:"Науковець",
 p:"Системне мислення, жага знань, уміння пояснювати закони світу.",
 m:"Догматизм, закритість у теоріях, страх змін.",
 h:"Знання шукають порядок у випадковостях і перевіряють усе досвідом.",
 w:"Досліджувати, навчати, поєднувати теорію з практикою."},
{codes:["18-22-4", "4-22-18"],n:"Розтоптана віра",
 p:"Здатність відновити віру після розчарувань, свобода від чужих рамок.",
 m:"Розчарування в людях і системах, страх довіряти, жорсткий контроль.",
 h:"Колись віру зламали обставини чи сильніші люди — тепер важко довіряти.",
 w:"Відновлювати віру поступово, будувати власну опору, працювати зі страхами."},
{codes:["11-4-15", "15-4-11"],n:"Амбіції і жага перемоги",
 p:"Сила волі, лідерство, енергія досягати великого.",
 m:"Боротьба за владу, тиск, перемога будь-якою ціною.",
 h:"Сильне бажання бути першим може як вести до вершин, так і руйнувати стосунки.",
 w:"Спрямовувати амбіції в чесну справу, рахуватися з людьми."},
{codes:["22-10-6", "6-10-22"],n:"Погана компанія",
 p:"Відкритість людям, легкість у знайомствах, уміння бачити хороше.",
 m:"Вплив сумнівного оточення, залежність від компанії, ризиковані розваги.",
 h:"Людина легко потрапляє під вплив оточення й повторює чужі вибори.",
 w:"Обирати оточення свідомо, вчитися казати «ні»."},
{codes:["4-17-13", "13-17-4"],n:"Капсулювання, поховане",
 p:"Вміння зберегти цінне, глибина, здатність відродити забуте.",
 m:"Закопані таланти й почуття, застиглість, страх змін.",
 h:"Щось важливе колись «законсервували» — талант, мрію чи почуття.",
 w:"Відкопувати своє: таланти, мрії, почуття — і давати їм життя."},
{codes:["3-18-15", "15-18-3"],n:"Найкраще або найгірше",
 p:"Сильна інтуїція, творча уява, привабливість.",
 m:"Ілюзії, залежності, самообман, крайнощі.",
 h:"Життя йде між двома полюсами: надзвичайні злети або глибокі падіння.",
 w:"Перевіряти бажання реальністю, обирати світло свідомо."},
{codes:["15-10-13", "13-10-15"],n:"Взаємодія",
 p:"Уміння домовлятися й трансформувати ситуації, удача в змінах.",
 m:"Маніпуляції, різкі розриви, залежність від обставин.",
 h:"Через взаємодію з людьми приходять головні зміни й можливості.",
 w:"Будувати чесні партнерства, відпускати те, що віджило."},
{codes:["19-5-4", "4-5-19"],n:"Переоцінка сил",
 p:"Енергія, лідерство, віра в себе, авторитет.",
 m:"Самовпевненість, гординя, непосильні зобов’язання.",
 h:"Людина часто бере на себе більше, ніж може витримати.",
 w:"Тверезо оцінювати ресурс, просити допомоги, делегувати."},
{codes:["20-4-6", "6-4-20"],n:"Енергія пристрасті",
 p:"Сила почуттів, сімейність, уміння будувати союз.",
 m:"Пристрасть, що руйнує, ревнощі, контроль у стосунках.",
 h:"Почуття дуже сильні — вони можуть і будувати, і руйнувати.",
 w:"Спрямовувати пристрасть у творення, домовлятися в парі."},
{codes:["4-19-15", "15-19-4"],n:"Багатоваріантність успіху",
 p:"Лідерство, харизма, багато шляхів до достатку.",
 m:"Розпорошення, жадібність, спокуса легких грошей.",
 h:"Успіх можливий у різних сферах — важливо не розпорошитися.",
 w:"Обрати головний напрямок, тримати чесність у грошах."},
{codes:["6-16-10", "10-16-6"],n:"Музей або доступ до цінностей",
 p:"Цінування прекрасного, уміння зберігати й відкривати цінне.",
 m:"Зациклення на минулому, страх змін, закритість.",
 h:"Цінності можна законсервувати в «музеї», а можна зробити живими.",
 w:"Ділитися цінностями, оновлювати традиції."},
{codes:["6-12-6"],n:"Жертва заради любові",
 p:"Відданість, глибина почуттів, здатність любити безумовно.",
 m:"Жертовність, залежність, втрата себе в стосунках.",
 h:"Заради любові людина готова відмовитися від себе.",
 w:"Любити, не жертвуючи собою, ставити межі."},
{codes:["16-9-20", "20-9-16"],n:"Реформатор традицій",
 p:"Сміливість змінювати застаріле, мудрість роду, глибина.",
 m:"Конфлікти з рідними, руйнування традицій без заміни.",
 h:"Людина приходить оновити родові правила й підходи.",
 w:"Зберігати цінне, змінювати застаріле з повагою."},
{codes:["19-10-9", "9-10-19"],n:"Мандрівний мудрець",
 p:"Мудрість, удача в подорожах, відкритість світу.",
 m:"Неприкаяність, утеча від відповідальності, самотність.",
 h:"Знання приходять через подорожі, зміни й досвід.",
 w:"Мандрувати й ділитися досвідом, мати свій дім."},
{codes:["16-6-8", "8-6-16"],n:"У полоні любові",
 p:"Сила почуттів, бажання справедливості в парі.",
 m:"Залежні стосунки, руйнування через ревнощі, несправедливість.",
 h:"Почуття стають кліткою, з якої важко вийти.",
 w:"Будувати стосунки на рівності, виходити із залежності."},
{codes:["4-20-20", "20-20-4"],n:"Вершитель доль",
 p:"Сила роду, лідерство, вплив на долі людей.",
 m:"Владність, осуд, контроль над рідними.",
 h:"Людина впливає на долі інших — у родині чи суспільстві.",
 w:"Використовувати вплив відповідально, служити роду."},
{codes:["3-6-9", "9-6-3"],n:"Філантроп",
 p:"Щедрість, любов до людей, мудрість.",
 m:"Жертовність, роздавання себе, самотність.",
 h:"Людині природно допомагати й ділитися.",
 w:"Допомагати, зберігаючи ресурс для себе."},
{codes:["15-15-3", "3-15-15"],n:"Фатальна привабливість",
 p:"Сильна харизма, сексуальність, здатність притягувати.",
 m:"Маніпуляції, залежні стосунки, руйнівна пристрасть.",
 h:"Привабливість дуже сильна і може як надихати, так і руйнувати.",
 w:"Використовувати чарівність чесно, поважати почуття інших."},
{codes:["12-5-20", "20-5-12"],n:"Жертва заради мрії",
 p:"Відданість ідеї, терпіння, духовність.",
 m:"Жертва власним життям заради чужих правил чи мрій.",
 h:"Людина відкладає своє життя заради далекої мети.",
 w:"Йти до мрії, не відмовляючись від себе тут і зараз."},
{codes:["12-9-15", "15-9-12"],n:"Усвідомлені жертви",
 p:"Мудрість, служіння, глибина.",
 m:"Залежності, самопожертва, внутрішня боротьба.",
 h:"Жертви робляться свідомо, але можуть вести до виснаження.",
 w:"Розрізняти служіння й самознищення."},
{codes:["2-13-11", "11-13-2"],n:"Тренер",
 p:"Інтуїція, сила, уміння вести через зміни.",
 m:"Жорсткість, тиск, руйнування заради результату.",
 h:"Людина допомагає іншим ставати сильнішими.",
 w:"Навчати, підтримувати, поважати темп інших."},
{codes:["8-19-11", "11-19-8"],n:"Господар своєї долі",
 p:"Сила, справедливість, успіх.",
 m:"Самовпевненість, тиск, вигорання.",
 h:"Людина здатна сама будувати свою долю.",
 w:"Брати відповідальність, діяти чесно."},
{codes:["2-9-7", "7-9-2"],n:"Просвітлений",
 p:"Мудрість, інтуїція, цілеспрямованість.",
 m:"Відстороненість, самотність, гордість знаннями.",
 h:"Людина шукає істину й глибину.",
 w:"Ділитися мудрістю, жити в світі, а не над ним."},
{codes:["2-6-22", "22-6-2"],n:"Безрозсудний романтик",
 p:"Чуттєвість, свобода, романтика.",
 m:"Безвідповідальність у коханні, ілюзії, утеча.",
 h:"Почуття ведуть, а розум відстає.",
 w:"Поєднувати романтику з відповідальністю."},
{codes:["13-19-6", "6-19-13"],n:"Життя без вигорання",
 p:"Відродження, радість, любов.",
 m:"Вигорання, різкі зміни, втрата радості.",
 h:"Сили відновлюються через любов і радість.",
 w:"Берегти ресурс, вчасно відпускати зайве."},
{codes:["13-3-17", "17-3-13"],n:"Метаморфози долі",
 p:"Здатність перетворюватися, творчість, надія.",
 m:"Страх змін, втрата себе, розчарування.",
 h:"Життя складається з етапів глибоких змін.",
 w:"Приймати зміни, творити нове."},
{codes:["19-6-5", "5-6-19"],n:"Вогонь любові",
 p:"Тепло, радість, гармонія в сім’ї.",
 m:"Гординя в стосунках, потреба захоплення.",
 h:"Любов — головне джерело сили.",
 w:"Дарувати тепло, будувати сім’ю на повазі."},
{codes:["21-11-8", "8-11-21"],n:"Творець нової реальності",
 p:"Масштаб, сила, справедливість.",
 m:"Тиск, боротьба, руйнування.",
 h:"Людина здатна змінювати світ навколо себе.",
 w:"Діяти чесно, будувати нове."},
{codes:["21-6-3", "3-6-21"],n:"Любов без кордонів",
 p:"Широке серце, любов до світу, творчість.",
 m:"Ревнощі, залежність, розпорошення почуттів.",
 h:"Любов не знає меж — і це може бути як даром, так і викликом.",
 w:"Любити вільно, зберігаючи вірність собі."},
{codes:["22-8-4", "4-8-22"],n:"В'язниця",
 p:"Почуття порядку, справедливості, стабільність.",
 m:"Несвобода, обмеження, жорсткі рамки.",
 h:"Людина опиняється в рамках — зовнішніх чи внутрішніх.",
 w:"Шукати свободу всередині себе, виходити із застиглих схем."},
{codes:["3-11-8", "8-11-3"],n:"Успішний правитель",
 p:"Сила, справедливість, достаток.",
 m:"Владність, контроль, гординя.",
 h:"Людина вміє керувати й досягати.",
 w:"Керувати справедливо й щедро."},
{codes:["2-11-9", "9-11-2"],n:"Прихований потенціал",
 p:"Сила, мудрість, інтуїція.",
 m:"Нерозкриті таланти, самотність, страхи.",
 h:"Великі здібності залишаються прихованими.",
 w:"Відкривати свої таланти, довіряти собі."},
{codes:["2-12-10", "10-12-2"],n:"Незвичайний талант",
 p:"Інтуїція, нестандартність, вдача.",
 m:"Жертовність, пасивність, незатребуваність.",
 h:"Талант незвичайний і потребує особливого шляху.",
 w:"Цінувати свою незвичайність, шукати свою нішу."},
{codes:["2-14-12", "12-14-2"],n:"Смирення й очікування",
 p:"Терпіння, гармонія, мудрість.",
 m:"Пасивність, жертовність, застій.",
 h:"Людина вміє чекати, але може чекати надто довго.",
 w:"Поєднувати терпіння з дією."},
{codes:["2-15-13", "13-15-2"],n:"Перехід на темний бік",
 p:"Глибина, сила, здатність до трансформації.",
 m:"Залежності, маніпуляції, руйнування.",
 h:"Сильна спокуса темного шляху.",
 w:"Обирати світло свідомо, працювати з тінню."},
{codes:["2-16-14", "14-16-2"],n:"Зламаний баланс",
 p:"Інтуїція, здатність відновлюватися, гармонія.",
 m:"Кризи, руйнування, втрата рівноваги.",
 h:"Баланс часто порушується через раптові події.",
 w:"Відновлювати рівновагу, піклуватися про себе."},
{codes:["2-17-15", "15-17-2"],n:"Згубна мрія",
 p:"Творчість, натхнення, харизма.",
 m:"Ілюзії, залежності, нездійсненні мрії.",
 h:"Мрія може надихати або руйнувати.",
 w:"Перевіряти мрії реальністю, діяти поступово."},
{codes:["2-20-18", "18-20-2"],n:"Жриця Місяця",
 p:"Інтуїція, родова мудрість, містичність.",
 m:"Страхи, ілюзії, родові таємниці.",
 h:"Сильний зв’язок з інтуїцією та родом.",
 w:"Розвивати інтуїцію, відпускати родові страхи."},
{codes:["2-8-6", "6-8-2"],n:"Зріла любов",
 p:"Мудрість у стосунках, справедливість, гармонія.",
 m:"Холодність, розрахунок, сумніви.",
 h:"Любов приходить через зрілість і досвід.",
 w:"Будувати стосунки на рівності й повазі."},
{codes:["3-10-7", "7-10-3"],n:"Життя в достатку",
 p:"Плідність, удача, рух уперед.",
 m:"Марнотратство, лінощі, залежність від везіння.",
 h:"Достаток приходить легко, якщо є рух.",
 w:"Примножувати, а не розтрачувати."},
{codes:["3-14-11", "11-14-3"],n:"Ні багатства, ні бідності",
 p:"Баланс, сила, гармонія.",
 m:"Середній рівень через страх ризику.",
 h:"Життя тримається в золотій середині.",
 w:"Додавати сміливості, виходити за межі звичного."},
{codes:["3-16-13", "13-16-3"],n:"Випробування нуждою",
 p:"Здатність відновлюватися, сила, трансформація.",
 m:"Втрати, нужда, страх бідності.",
 h:"Через нестачу людина вчиться цінувати ресурс.",
 w:"Будувати фінансову подушку, працювати зі страхом нестачі."},
{codes:["3-17-14", "14-17-3"],n:"Скромна велич",
 p:"Творчість, гармонія, внутрішня сила.",
 m:"Недооцінювання себе, прихований талант.",
 h:"Велич проявляється тихо, без гучності.",
 w:"Показувати свій талант світу."},
{codes:["3-8-5", "5-8-3"],n:"Випробування достатком",
 p:"Достаток, справедливість, мудрість.",
 m:"Жадібність, контроль, марнотратство.",
 h:"Гроші випробовують цінності.",
 w:"Використовувати достаток для добра."},
{codes:["3-9-6", "6-9-3"],n:"Неприйняття свого тіла (краси)",
 p:"Глибина, чуттєвість, внутрішня краса.",
 m:"Неприйняття себе, комплекси, самотність.",
 h:"Людина не бачить своєї краси.",
 w:"Приймати й любити своє тіло."},
{codes:["4-10-6", "6-10-4"],n:"Тягар керівника",
 p:"Відповідальність, лідерство, вміння керувати.",
 m:"Перевантаження, самотність, втома.",
 h:"Лідерство дається важко.",
 w:"Ділити відповідальність, делегувати."},
{codes:["4-11-7", "7-11-4"],n:"Охоронець порядку",
 p:"Сила, дисципліна, рішучість.",
 m:"Жорсткість, контроль, агресія.",
 h:"Людина захищає порядок і правила.",
 w:"Захищати без жорстокості."},
{codes:["4-20-16", "16-20-4"],n:"Втрата влади й контролю",
 p:"Сила роду, здатність відбудуватися.",
 m:"Втрата контролю, кризи, конфлікти з батьками.",
 h:"Влада може раптово втрачатися.",
 w:"Будувати опору всередині себе."},
{codes:["4-6-20", "20-6-4"],n:"Влада любові",
 p:"Сила, сімейність, любов.",
 m:"Контроль через любов, владність у сім’ї.",
 h:"Любов і влада тісно переплетені.",
 w:"Любити, не контролюючи."},
{codes:["6-18-12", "12-18-6"],n:"Залежні стосунки",
 p:"Чуттєвість, глибина, відданість.",
 m:"Залежність, ілюзії, жертовність.",
 h:"Стосунки часто будуються на залежності.",
 w:"Будувати здорові межі, виходити з ролі жертви."},
{codes:["7-17-10", "10-17-7"],n:"Шлях до відомості",
 p:"Цілеспрямованість, талант, удача.",
 m:"Гонитва за славою, вигорання.",
 h:"Дорога до визнання відкрита.",
 w:"Йти до визнання через справжню творчість."},
{codes:["10-5-13", "13-5-10"],n:"Перегляд звичних шаблонів",
 p:"Мудрість, здатність змінюватися, удача.",
 m:"Застрягання в шаблонах, страх змін.",
 h:"Життя спонукає переглядати правила.",
 w:"Оновлювати переконання, пробувати нове."}
];
/* a program's display name: «our name / name from other schools» when both exist */
const PN=x=>!x?'':x.alt?`${x.n} / ${x.alt}`:x.n;
function findNamed(vals, anyOrder){
  const c=vals.join('-'), rc=[...vals].reverse().join('-');
  let f=NAMED.find(x=>x.codes.includes(c)||x.codes.includes(rc));
  if(f||!anyOrder) return f||null;
  const key=[...vals].sort((a,b)=>a-b).join('-');
  return NAMED.find(x=>x.codes.some(cd=>cd.split('-').map(Number).sort((a,b)=>a-b).join('-')===key))||null;
}

/* ---------- lines that form programs ---------- */
const LINES=[
 {k:'cen',t:'Центральна програма',ids:['E2','E3','E'],ctx:"Програма стоїть у самому центрі матриці й забарвлює весь характер"},
 {k:'tail',t:'Кармічний хвіст',ids:['D2','D1','D'],karmic:true,ctx:"Програма прийшла з минулих втілень і вмикається з дитинства"},
 {k:'mat',t:'Матеріальна карма',ids:['C2','C1','C'],karmic:true,ctx:"Програма проявляється в ставленні до грошей і матеріального"},
 {k:'tal',t:'Лінія талантів',ids:['B2','B1','B'],ctx:"Програма звучить у тому, як ви розкриваєте свої здібності"},
 {k:'pers',t:'Лінія особистості',ids:['A2','A1','A'],ctx:"Програма видна у вашому характері та реакціях"},
 {k:'money',t:'Канал грошей',ids:['C2','MON','X'],ctx:"Програма проявляється в тому, як ви заробляєте"},
 {k:'love',t:'Канал стосунків',ids:['D2','LOV','X'],ctx:"Програма проявляється в парі"},
 {k:'rf1',t:'Родова діагональ · батько, 10 р.',ids:['F2','F1','F'],ctx:"Програма передається по батьківській лінії"},
 {k:'rm1',t:'Родова діагональ · мати, 30 р.',ids:['G2','G1','G'],ctx:"Програма передається по материнській лінії"},
 {k:'rf2',t:'Родова діагональ · батько, 50 р.',ids:['H2','H1','H'],ctx:"Програма передається по батьківській лінії"},
 {k:'rm2',t:'Родова діагональ · мати, 70 р.',ids:['I2','I1','I'],ctx:"Програма передається по материнській лінії"},
 {k:'fl',t:'Лінія роду по батькові',ids:['F','H','MALE'],ctx:"Програма передається по батьківській лінії (кути 10 і 50 років)",any:true},
 {k:'ml',t:'Лінія роду по матері',ids:['G','I','FEM'],ctx:"Програма передається по материнській лінії (кути 30 і 70 років)",any:true},
 {k:'pp',t:'Особисте призначення',ids:['SKY','EARTH','PERS'],ctx:"Програма звучить як завдання самореалізації до 40 років",any:true},
 {k:'sp',t:'Соціальне призначення',ids:['MALE','FEM','SOC'],ctx:"Програма звучить як завдання в суспільстві після 40 років",any:true}
];

/* ---------- calculation (метод Н. Ладіні) ---------- */
const ds = n => String(n).split('').reduce((a,c)=>a+(+c),0);
const r = n => { while(n>22) n = ds(n); return n; };
const MAIN=['A','F','B','G','C','H','D','I'];

function calc(day, month, year){ return calcCore(r(day), r(month), r(ds(year))); }
function calcCore(a, b, c){
  const P = {};
  P.A=a; P.B=b; P.C=c;
  P.D=r(P.A+P.B+P.C); P.E=r(P.A+P.B+P.C+P.D);
  P.F=r(P.A+P.B); P.G=r(P.B+P.C); P.H=r(P.C+P.D); P.I=r(P.D+P.A);
  for(const k of ['A','B','C','D']){ P[k+'2']=r(P[k]+P.E); P[k+'1']=r(P[k]+P[k+'2']); }
  P.E2=r(P.F+P.G+P.H+P.I); P.E3=r(P.E+P.E2);
  /* родові діагоналі рахуються від центру родового квадрата (E2), а не від особистого центру */
  for(const k of ['F','G','H','I']){ P[k+'2']=r(P[k]+P.E2); P[k+'1']=r(P[k]+P[k+'2']); }
  P.A3=r(P.A2+P.E); P.B3=r(P.B2+P.E);
  P.X=r(P.C2+P.D2); P.MON=r(P.C2+P.X); P.LOV=r(P.D2+P.X);
  P.SKY=r(P.B+P.D); P.EARTH=r(P.A+P.C); P.PERS=r(P.SKY+P.EARTH);
  P.MALE=r(P.F+P.H); P.FEM=r(P.G+P.I); P.SOC=r(P.MALE+P.FEM);
  P.SPIR=r(P.PERS+P.SOC); P.PLAN=r(P.SOC+P.SPIR);
  /* age ring: 8 main points (0,10..70); each 10-year segment split in halves three times */
  P.RING=[]; P.AGE=[];
  for(let s=0;s<8;s++){
    const p0=P[MAIN[s]], p10=P[MAIN[(s+1)%8]];
    const p5=r(p0+p10), p25=r(p0+p5), p75=r(p5+p10), p125=r(p0+p25), p375=r(p25+p5), p625=r(p5+p75), p875=r(p75+p10);
    P.RING.push([p0,p125,p25,p375,p5,p625,p75,p875]);
    [p0,p125,p125,p25,p375,p5,p625,p625,p75,p875].forEach((v,o)=>P.AGE[s*10+o]=v);
  }
  /* year program: arcana of the age + arcana of the opposite age (+40) + their sum */
  P.YEARS=P.AGE.map((v,a)=>{const o=P.AGE[(a+40)%80];return [v,o,r(v+o)];});
  return P;
}

/* position labels + which interpretation field applies */
const POS = {
 A:["Особистість · портрет, ліва точка","pers"], A1:["Особистість · як ви розкриваєтеся","pers"], A2:["Особистість · глибинна якість","pers"],
 B:["Таланти · дар від Неба, верхня точка","tal"], B1:["Таланти · як розвивається дар","tal"], B2:["Таланти · глибинний талант душі","tal"],
 C:["Матеріальне · ресурс, права точка","money"], C1:["Матеріальне · вхід ресурсу","money"], C2:["Канал грошей · точка входу","money"],
 D:["Кармічний хвіст · минуле втілення","karma"], D1:["Кармічний хвіст · як програма проявляється","minus"], D2:["Кармічний хвіст · задача на це втілення","task"],
 E:["Центр · зона комфорту, ядро характеру","pers"],
 E2:["Центр · центр родового квадрата (сума кутів роду)","pers"], E3:["Центр · центральна програма (центр + родовий центр)","pers"],
 A3:["Анахата · фізика, лінія Землі","health"], B3:["Анахата · енергія, лінія Неба","health"],
 F:["Рід батька · вік 10 років","rod"], F1:["Рід батька · програма","rod"], F2:["Рід батька · глибинна програма","rod"],
 H:["Рід батька · вік 50 років","rod"], H1:["Рід батька · програма","rod"], H2:["Рід батька · глибинна програма","rod"],
 G:["Рід матері · вік 30 років","rod"], G1:["Рід матері · програма","rod"], G2:["Рід матері · глибинна програма","rod"],
 I:["Рід матері · вік 70 років","rod"], I1:["Рід матері · програма","rod"], I2:["Рід матері · глибинна програма","rod"],
 X:["Перетин любові й грошей · баланс","love"], MON:["Канал грошей · що примножує","money"], LOV:["Канал стосунків · образ партнера","love"],
 SKY:["Призначення · лінія Неба","pur"], EARTH:["Призначення · лінія Землі","pur"], PERS:["Особисте призначення · до 40 років","pur"],
 MALE:["Призначення · чоловіча лінія роду","pur"], FEM:["Призначення · жіноча лінія роду","pur"], SOC:["Соціальне призначення · 40–60 років","pur"],
 SPIR:["Духовне призначення · після 60 років","pur"], PLAN:["Планетарне призначення","pur"]
};
const GROUPCOL = id => {
  if(id==='E') return 'var(--p-gold)';
  if(id==='A3'||id==='B3') return 'var(--p-green)';
  const k=id[0], s=id.slice(1);
  if(k==='A'||k==='B') return s===''?'var(--p-violet)':s==='1'?'var(--p-blue)':null;
  if(k==='C'||k==='D') return s===''?'var(--p-red)':s==='2'?'var(--p-rose)':null; // Муладхара / Свадхістана; middle points neutral
  return null; // ancestral corners: neutral
};
const chipCol = id => GROUPCOL(id) || 'var(--accent)';

/* ---------- text composition ---------- */
const cap = s => s.charAt(0).toUpperCase()+s.slice(1);
const nm = v => `${v} · ${ARC[v].n}`;
const firstSent = s => s.split(/(?<=\.)\s/)[0];

function posText(id, v, g){
  if(isPair()) return pairPosText(id,v);
  const a=ARC[v], f=POS[id][1];
  if(f==='pers') return a.pers;
  if(f==='health') return `${_f("Енергія серцевої чакри: {0}. {1}. У стосунках: {2}.",[lc(a.hp),a.hm,a.love])}`;
  if(f==='minus') return _f("Програма хвоста вмикається, коли енергія {0} звучить у мінусі. Коли помічаєте ці прояви — це сигнал, що старий сценарій запустився.",[a.n]);
  if(f==='rod') return _f("Через цю точку рід передає вам енергію {0}: {1}. Родове завдання — {2}.",[a.n,a.kw.join(", "),a.task]);
  if(f==='love') return cap(a.love)+". "+(g==='f'?_t("Образ чоловіка, з яким вам добре, несе якості: "):_t("Образ жінки, з якою вам добре, несе якості: "))+a.kw.join(", ")+".";
  return cap(a[f])+".";
}

function combos(list){
  const s=new Set(list), out=[];
  if(new Set(list).size<list.length) out.push(_t("Енергія, що повторюється, посилюється вдвічі: її уроки проявляються яскравіше, а опрацювання дає подвійний ресурс."));
  if(s.has(15)) out.push(_t("15 аркан у програмі вказує на тему залежностей — від людей, грошей чи задоволень. Свобода приходить через чесність із собою."));
  if(s.has(18)) out.push(_t("18 аркан додає страхи та ілюзії: частина бар’єрів існує лише в уяві, їх варто перевіряти реальністю."));
  if(s.has(12)) out.push(_t("12 аркан приносить сценарій жертовності — допомога іншим не повинна коштувати вам себе."));
  if(s.has(13)||s.has(16)) out.push(_t("Енергія різких змін показує: кризи тут — не покарання, а спосіб розчистити місце для нового."));
  if(s.has(22)||s.has(21)) out.push(_t("Звучить тема свободи: обмеження будь-якого роду переживаються особливо гостро."));
  if(s.has(6)) out.push(_t("6 аркан пов’язує програму з вибором у коханні: важливо обирати серцем і не зраджувати собі."));
  if(s.has(20)) out.push(_t("Програма тісно переплетена з родом: прийняття батьків розблоковує ресурс."));
  if(s.has(5)||s.has(8)) out.push(_t("Звучить тема правил і відповідальності: дотримання власних принципів вирівнює баланс."));
  return out;
}

/* list splitter for the comma-separated trait texts: splits only between whole points — not inside (…) or «…», and keeps
   «…, що…», «…, коли…», participle tails and «X: a, b, c» enumerations attached to their point (used as str.split(LSPLIT)) */
const LSPLIT={[Symbol.split](s){
  const out=[]; let depth=0, cur='';
  for(let i=0;i<s.length;i++){ const c=s[i];
    if(c==='('||c==='«'||c==='“') depth++; else if((c===')'||c==='»'||c==='”')&&depth>0) depth--;
    if((c===','||c===';')&&s[i+1]===' '&&depth===0){ out.push(cur); cur=''; i++; continue; }
    cur+=c; }
  out.push(cur);
  const JOIN=/^(що|щоб|який|яка|яке|які|якого|якої|яким|якими|коли|де|куди|звідки|бо|ніби|наче|немов|ніж|як|але|а|і|й|та|проте|зокрема|особливо|навіть|тобто|that|which|who|whom|whose|when|where|because|as if|than|but|especially|even|so that)(?=[\s,]|$)/i;
  const PART=/^[\p{L}’']{3,}(ований|ована|аний|ана|яний|яна|ений|ена|єний|єна)\s/iu;
  const res=[]; for(const p of out){ if(res.length&&(JOIN.test(p)||PART.test(p)||(/: /.test(res[res.length-1])&&p.trim().split(/\s+/).length<=2))) res[res.length-1]+=', '+p; else res.push(p); }
  return res; }};
const UL=arr=>{ const seen=new Set(); return `<ul class="bl">${arr.filter(Boolean).map(x=>cap(String(x).trim().replace(/\.$/,''))).filter(x=>{ const k=x.toLowerCase(); if(seen.has(k)) return false; seen.add(k); return true; }).map(x=>`<li>${x}</li>`).join('')}</ul>`; };
const LST=(v,f,n)=>ARC[v][f].replace(/\.$/,'').split(LSPLIT).slice(0,n);
const uniq=a=>[...new Set(a)];
/* ---------- no copy-paste: when one arcana stands in several positions, each place gets its own part of the text ---------- */
const share=(arr,k,n)=>{ if(!Array.isArray(arr)||n<2) return arr; const per=Math.max(1,Math.ceil(arr.length/n)), part=arr.slice(k*per,k*per+per); return part.length?part:[arr[k%arr.length]]; };
const occ=list=>{ const c={},tot={}; list.forEach(v=>tot[v]=(tot[v]||0)+1); return list.map(v=>{ const k=c[v]||0; c[v]=k+1; return [k,tot[v]]; }); };
const nrmT=t=>String(t||'').replace(/\s+/g,' ').trim().toLowerCase();
function dedupeDOM(root,seen){
  seen=seen||new Set();
  root.querySelectorAll('li,p').forEach(el=>{
    if(el.closest('.note,.chips,.ynav,.qs-go')||el.querySelector('button')) return;
    const k=nrmT(el.textContent); if(k.length<28) return;
    if(!seen.has(k)){ seen.add(k); return; }
    const list=el.parentElement; el.remove();
    if(list&&/^(UL|OL)$/.test(list.tagName)&&!list.children.length) list.remove();
  });
  /* headings left without content, then empty boxes */
  root.querySelectorAll('h4,h5').forEach(h=>{ let n=h.nextElementSibling; if(!n||/^(H3|H4|H5)$/.test(n.tagName)) h.remove(); });
  root.querySelectorAll('.pp,.pos-box,.blk,.pblk,.two>div,.pm,.scn').forEach(b=>{ if(!b.querySelector('li,p,table,img,.phd,.ptl')) b.remove(); });
  return seen;
}
const dedupeHTML=h=>{ const t=document.createElement('template'); t.innerHTML=h; dedupeDOM(t.content); const d=document.createElement('div'); d.appendChild(t.content); return d.innerHTML; };

function spheres(P, g, name){
  const A=ARC, who=name||_t("Ви");
  const sp=[];
  sp.push({t:_t("Особистість"),k:"Особистість",s:_t("Портрет, характер і зона комфорту"),ids:['A','A1','A2','E','E2','E3'],prog:'cen',html:[
    [_t("Як вас бачать"),`${_f("{0} Перше враження формує {1}: {2}.",[A[P.A].pers,nm(P.A),A[P.A].kw.join(", ")])}`],
    [_t("Як проживається"),A[P.A].live],
    [_t("Ви впізнаєте себе, якщо…"),UL(A[P.A].rec)],
    [_t("Сильні сторони"),UL([...LST(P.A,'p',3),...LST(P.A1,'p',2)])],
    [_t("Тіньові прояви"),UL([...LST(P.A,'m',3),...LST(P.A2,'m',1)])],
    [_t("Як ви розкриваєтеся"),`${_f("З досвідом особистість проявляється через {0} — {1}. Глибинна якість, що відкривається в зрілості, — {2}: {3}.",[nm(P.A1),A[P.A1].kw.slice(0,2).join(_t(" і ")),nm(P.A2),A[P.A2].kw.slice(0,3).join(", ")])}`],
    [_t("Ядро й зона комфорту"),`${_f("Центр матриці — {0}. {1} Вам добре, коли в житті є {2}. {3}.",[nm(P.E),A[P.E].pers,A[P.E].kw.join(", "),A[P.E].hp])}`],
    [_t("Центральна програма"),`${_f("У центрі три енергії: {0} (зона комфорту), {1} (центр родового квадрата) і {2} — їхня сума. Програма {3}-{4}-{5}: родова сила {6} через {7} стає вашим особистим ядром.",[nm(P.E),nm(P.E2),nm(P.E3),P.E2,P.E3,P.E,A[P.E2].kw.slice(0,2).join(_t(" і ")),A[P.E3].kw[0]])}`],
    [_t("Коли центр у мінусі"),UL(LST(P.E,'m',4))],
    P.A===P.E?[_t("Збіг"),_t("Точка особистості й центр збігаються: як вас бачать, такими ви є всередині.")]:null,
    [_t("Як прийти в плюс"),UL([A[P.A].how[0],A[P.A].how[1],A[P.E].how[0]])]
  ]});
  sp.push({t:_t("Таланти"),k:"Таланти",s:_t("Дар від Неба та як його розкрити"),ids:['B','B1','B2'],html:[
    [_t("Головний талант"),`${nm(P.B)}: ${A[P.B].tal}.`],
    [_t("Як розвивається"),`${_f("Дар розкривається через {0} — {1}. {2}.",[nm(P.B1),A[P.B1].kw.join(", "),cap(A[P.B1].tal)])}`],
    [_t("Глибинний талант"),`${_f("{0}: {1}. Він проявляється, коли ви вже впевнено користуєтеся верхнім талантом.",[nm(P.B2),A[P.B2].tal])}`],
    [_t("Сфери реалізації"),UL(uniq([P.B,P.B1,P.B2].flatMap(v=>A[v].prof.split(LSPLIT).slice(0,3))))],
    [_t("Що заважає таланту"),UL([...LST(P.B,'m',3),...LST(P.B1,'m',1)])],
    [_t("Як покращити ситуацію"),fixList(A[P.B])],
    [_t("Як розкрити"),UL([A[P.B].how[0],A[P.B].how[1],A[P.B1].how[0]])]
  ]});
  const tail=[P.D2,P.D1,P.D], tn=findNamed(tail,false);
  sp.push({t:_t("Кармічний хвіст"),k:"Кармічний хвіст",s:`${_f("Програма {0}{1}",[tail.join("-"),tn?` · «${PN(tn)}»`:_t(" · минуле життя і задача")])}`,ids:['D2','D1','D'],prog:'tail',html:[
    tn?[_t("Іменна програма"),`«${PN(tn)}». ${tn.h}`]:null,
    [_t("Минуле втілення"),`${cap(A[P.D].karma)} (${nm(P.D)}).`],
    [_t("Як проявляється зараз"),`${_f("Через {0}: {1} Це повторювані сценарії, у яких програма нагадує про себе.",[nm(P.D1),lc(A[P.D1].m)])}`],
    [_t("Ознаки, що програма активна"),UL([...LST(P.D,'m',2),...LST(P.D1,'m',2),...LST(P.D2,'m',1)])],
    [_t("Як проживається програма"),A[P.D1].live],
    [_t("Причинно-наслідкові зв’язки"),causeList(A[P.D2])],
    [_t("Задача на це втілення"),`${cap(A[P.D2].task)}.`],
    [_t("Як пропрацювати"),tn?`<p>${tn.w}</p>`+UL([A[P.D2].how[0],A[P.D].how[0]]):UL([A[P.D2].task,A[P.D2].how[0],A[P.D1].how[0],A[P.D].how[0]])],
    [_t("Питання для себе"),qListT(A[P.D2],A[P.D2].n)],
    [_t("Ресурс після опрацювання"),`${tn?tn.p:A[P.D2].p}`],
    ...combos(tail).map(c=>[_t("Нюанс програми"),c])
  ]});
  sp.push({t:_t("Гроші"),k:"Гроші",s:_t("Канал грошей і матеріальний ресурс"),ids:['C','C2','MON','X'],prog:'money',html:[
    [_t("Ресурс"),`${_f("Права точка {0}: {1}.",[nm(P.C),A[P.C].money])}`],
    [_t("Точка входу"),`${_f("{0} — у чому шукати справу: {1}.",[nm(P.C2),A[P.C2].money])}`],
    [_t("Що примножує"),`${_f("{0}: {1}. Ця якість робить дохід стабільним.",[nm(P.MON),A[P.MON].tal])}`],
    [_t("Баланс"),`${_f("Точка перетину {0} пов’язує гроші й стосунки: коли гармонійні почуття, легше й з грошима. Ключ — {1}.",[nm(P.X),A[P.X].kw.slice(0,2).join(_t(" і "))])}`],
    [_t("Сфери заробітку"),UL(uniq([P.C2,P.MON,P.C].flatMap(v=>A[v].prof.split(LSPLIT).slice(0,3))))],
    [_t("Причинно-наслідкові зв’язки"),causeList(A[P.C2])],
    [_t("Що блокує гроші"),UL([...LST(P.C,'m',2),...LST(P.C2,'m',2)])],
    [_t("Як покращити ситуацію"),fixList(A[P.C2])],
    [_t("Як відкрити канал"),UL([A[P.C2].how[0],A[P.C2].how[1],A[P.MON].how[0]])]
  ]});
  sp.push({t:_t("Стосунки"),k:"Стосунки",s:g==='f'?_t("Канал любові та образ партнера"):_t("Канал любові та образ партнерки"),ids:['D2','LOV','X'],prog:'love',html:[
    [_t("Вхід у стосунки"),`${nm(P.D2)}: ${A[P.D2].love}.`],
    [g==='f'?_t("Ваш чоловік"):_t("Ваша жінка"),`${_f("{0}. {1} звучать якості {2}. {3}.",[nm(P.LOV),g==='f'?_t("Поруч із вами — чоловік, у якому"):_t("Поруч із вами — жінка, у якій"),A[P.LOV].kw.join(", "),cap(A[P.LOV].love)])}`],
    [_t("Що зміцнює союз"),`${nm(P.X)}: ${lc(A[P.X].p)}`],
    [_t("Причинно-наслідкові зв’язки"),causeList(A[P.LOV])],
    [_t("Що руйнує стосунки"),UL([...LST(P.D2,'m',2),...LST(P.LOV,'m',2)])],
    [_t("Як покращити ситуацію"),fixList(A[P.LOV])],
    [_t("Як зміцнити"),UL([A[P.LOV].how[0],A[P.D2].how[0],A[P.X].how[0]])],
    [g==='f'?_t("Для жінки"):_t("Для чоловіка"),g==='f'?A[P.LOV].f:A[P.LOV].mm]
  ]});
  sp.push({t:_t("Рід"),k:"Рід",s:`${_f("Батько {0}-{1}-{2} · мати {3}-{4}-{5}",[P.F,P.H,P.MALE,P.G,P.I,P.FEM])}`,ids:['F','H','G','I'],html:[
    [_t("Лінія батька"),`${_f("Програма {0}-{1}-{2}: {3} (10 років) і {4} (50 років), разом — {5}. Від чоловіків роду ви отримуєте {6}, {7}.",[P.F,P.H,P.MALE,nm(P.F),nm(P.H),nm(P.MALE),A[P.F].kw.slice(0,2).join(", "),A[P.H].kw.slice(0,2).join(", ")])}`],
    [_t("Лінія матері"),`${_f("Програма {0}-{1}-{2}: {3} (30 років) і {4} (70 років), разом — {5}. Від жінок роду — {6}, {7}.",[P.G,P.I,P.FEM,nm(P.G),nm(P.I),nm(P.FEM),A[P.G].kw.slice(0,2).join(", "),A[P.I].kw.slice(0,2).join(", ")])}`],
    [_t("Родові ресурси"),UL([...LST(P.F,'p',2),...LST(P.G,'p',2)])],
    [_t("Родові завдання"),UL([A[P.F].task,A[P.H].task,A[P.G].task,A[P.I].task])],
    [_t("Призначення роду"),`${_f("Чоловіча лінія — {0}, жіноча — {1}. {2}{3}",[nm(P.MALE),nm(P.FEM),g==='f'?_t("Для вас особливо відчутна жіноча лінія: "):_t("Для вас особливо відчутна чоловіча лінія: "),lc(g==='f'?A[P.FEM].p:A[P.MALE].p)])}`]
  ]});
  sp.push({t:_t("Призначення"),k:"Призначення",s:_t("Особисте, соціальне, духовне"),ids:['PERS','SOC','SPIR','PLAN'],html:[
    [_t("Особисте · до 40 років"),`${_f("Небо {0}, Земля {1}, разом — {2}. {3}. Спершу важливо знайти себе: {4}.",[P.SKY,P.EARTH,nm(P.PERS),cap(A[P.PERS].pur),A[P.PERS].kw.join(", ")])}`],
    [_t("Соціальне · 40–60 років"),`${nm(P.SOC)}: ${A[P.SOC].pur}.`],
    [_t("Духовне · після 60"),`${nm(P.SPIR)}: ${A[P.SPIR].pur}.`],
    [_t("Планетарне"),`${_f("{0} — внесок, який {1} світу: {2}.",[nm(P.PLAN),who===_t("Ви")?_t("ви залишаєте"):_f("{0} залишає",[who]),A[P.PLAN].kw.join(", ")])}`],
    [_t("Питання для себе"),qListT(A[P.PERS],A[P.PERS].n)],
    [_t("Як реалізувати"),UL([A[P.PERS].how[0],A[P.PERS].how[1],A[P.SOC].how[0]])]
  ]});
  sp.push({t:_t("Ресурс і здоров’я"),k:"Ресурс і здоров’я",s:_t("Звідки енергія і де вона витікає"),ids:['E','A','D'],html:[
    [_t("Джерело сил"),`${_f("Ви відновлюєтеся через центр {0}. {1}.",[nm(P.E),A[P.E].hp])}`],
    [_t("Як покращити самопочуття"),fixList(A[P.E])],
    [_t("Де витікає енергія"),`${_f("{0}. Виснаження приходить, коли вмикаються мінуси кармічного хвоста.",[A[P.D].hm])}`],
    [_t("Порада"),`${_f("{0} Тримайте баланс між особистістю ({1}) і завданням ({2}).",[g==='f'?A[P.A].f:A[P.A].mm,P.A,P.D])}`],
    [_t("Карта чакр"),_t("Повна карта здоров’я з трактуванням кожної чакри — нижче під матрицею.")]
  ]});
  return sp;
}


/* ---------- SVG matrix ---------- */
const S=640, CX=320, CY=320, R=212, RR=R+36, k=Math.SQRT1_2;
const DIR={A:[-1,0],B:[0,-1],C:[1,0],D:[0,1],F:[-k,-k],G:[k,-k],H:[k,k],I:[-k,k]};
const RAD={'':1,'1':.79,'2':.6,'3':.41};
const FR=[0,.125,.25,.375,.5,.625,.75,.875], AGEOF=[0,1,3,4,5,6,8,9], JOF=[0,1,1,2,3,4,5,5,6,7];
const DRAWN=['F','G','H','I','F1','G1','H1','I1','F2','G2','H2','I2','A','B','C','D','A1','B1','C1','D1','A2','B2','C2','D2','A3','B3','X','MON','LOV','E','E2','E3'];
const ageLabel=a=>{const o=a%10,b=a-o;return o===1||o===2?`${b+1}–${b+2}`:o===6||o===7?`${b+6}–${b+7}`:String(a)};
const ringId=a=>{const s=Math.floor(a/10)%8,j=JOF[a%10];return j?`R${s}_${j}`:MAIN[s]};
/* programs sit as tight clusters (outer → 1 → 2 almost touching), Anahata points halfway between the cluster and the centre */
let GK=1; const GAP=3;
function radPos(suf){
  const r0=24*GK, r1=17*GK, r2=15*GK, p1=R-r0-r1-GAP, p2=p1-r1-r2-GAP;
  if(suf==='1') return p1; if(suf==='2') return p2;
  if(suf==='3') return (p2-r2+34)/2;
  return R;
}
function coord(id){
  if(id[0]==='R'){const [s,j]=id.slice(1).split('_').map(Number);return ringXY(s,j);}
  if(id==='E') return [CX,CY];
  const pE2=34+13+GAP;
  if(id==='E2') return [CX+pE2,CY];
  if(id==='E3') return [CX+pE2+26+GAP,CY];
  const p2=radPos('2'), nc=[CX+p2,CY], nd=[CX,CY+p2], dx=7*Math.SQRT1_2;
  const x=[CX+p2/2-dx,CY+p2/2-dx];
  if(id==='X') return x;
  if(id==='MON') return [x[0]+.42*(nc[0]-x[0]),x[1]+.42*(nc[1]-x[1])];
  if(id==='LOV') return [x[0]+.42*(nd[0]-x[0]),x[1]+.42*(nd[1]-x[1])];
  const d=DIR[id[0]], rr=radPos(id.slice(1));
  return [CX+d[0]*rr, CY+d[1]*rr];
}
const INNER=new Set(['E','E2','E3','X','MON','LOV']);
const ptR=id=>id[0]==='R'?10.5:id==='E'?34:id==='X'?15:['MON','LOV','E2','E3'].includes(id)?13:id.length===1?24:['A3','B3'].includes(id)?14:/1$/.test(id)?17:15;
function ringXY(s,j){const an=(180+45*s+45*FR[j])*Math.PI/180;return [CX+Math.cos(an)*RR,CY+Math.sin(an)*RR]}
function svgMatrix(P, sel, mini, noRing, desk){
  const MOB=!mini&&!desk&&typeof innerWidth!=='undefined'&&innerWidth<=640, ZM=MOB&&!!(STATE&&STATE.zoom), KR=MOB?1.18:1, KF=MOB?1.26:1;
  sel=sel||new Set(); GK=KR;
  const L=[], pt=id=>coord(id).map(n=>n.toFixed(1)), f1=n=>n.toFixed(1);
  L.push(`<defs><radialGradient id="gl" cx="34%" cy="26%" r="72%"><stop offset="0" stop-color="#fff" stop-opacity=".62"/><stop offset=".42" stop-color="#fff" stop-opacity=".1"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><radialGradient id="cg"><stop offset="0" style="stop-color:var(--accent-2)" stop-opacity=".38"/><stop offset=".55" style="stop-color:var(--accent)" stop-opacity=".12"/><stop offset="1" style="stop-color:var(--accent)" stop-opacity="0"/></radialGradient><linearGradient id="hlg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:var(--accent)"/><stop offset="1" style="stop-color:var(--accent-3)"/></linearGradient></defs>`);
  L.push(`<circle cx="${CX}" cy="${CY}" r="${mini?150:130}" fill="url(#cg)"/>`);
  const line=(a,b,c='mx-line')=>{const [x1,y1]=pt(a),[x2,y2]=pt(b);L.push(`<line class="${c}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`)};
  L.push(`<circle class="mx-soft" cx="${CX}" cy="${CY}" r="${R}"/>`);
  L.push(`<polygon class="mx-line" points="${['A','B','C','D'].map(i=>pt(i).join(',')).join(' ')}"/>`);
  L.push(`<polygon class="mx-line" points="${['F','G','H','I'].map(i=>pt(i).join(',')).join(' ')}"/>`);
  line('A','C','mx-soft'); line('B','D','mx-soft'); line('F','H','mx-soft'); line('G','I','mx-soft');
  L.push(`<circle class="mx-soft" cx="${CX}" cy="${CY}" r="${radPos('2').toFixed(1)}" stroke-dasharray="2 5"/>`);
  { const [a,b]=pt('C2'),[c,d]=pt('X'),[e,f]=pt('D2'); L.push(`<polyline class="mx-line" fill="none" points="${a},${b} ${c},${d} ${e},${f}"/>`); }
  if(!mini){
    if(!noRing){ L.push(`<circle class="mx-soft" cx="${CX}" cy="${CY}" r="${RR}"/>`);
    for(let s=0;s<8;s++){
      const [lx,ly]=ringXY(s,0);
      L.push(`<text class="age" x="${f1(lx)}" y="${f1(ly+4)}" text-anchor="middle">${s*10}</text>`);
      if(P) for(let j=1;j<8;j++){
        const [x,y]=ringXY(s,j), a=s*10+AGEOF[j], id=`R${s}_${j}`, v=P.RING[s][j];
        const deg=180+45*s+45*FR[j], rad=deg*Math.PI/180, left=Math.cos(rad)<-0.01;
        const tx=CX+Math.cos(rad)*(RR+15), ty=CY+Math.sin(rad)*(RR+15);
        if(!MOB||ZM) L.push(`<text class="agel" x="${f1(tx)}" y="${f1(ty+3)}" text-anchor="${left?'end':'start'}" transform="rotate(${f1(left?deg+180:deg)} ${f1(tx)} ${f1(ty)})">${ageLabel(a)}</text>`);
        L.push(`<g class="pt yr${sel.has(id)?' sel':''}" data-age="${a}" data-id="${id}" tabindex="0" role="button" aria-label="${_f("Вік {0}: аркан {1} {2}",[ageLabel(a),v,ARC[v].n])}"><circle class="ring" cx="${f1(x)}" cy="${f1(y)}" r="${MOB?11.5:10.5}" fill="var(--surface-solid)" stroke="var(--line)" stroke-width="1"/><text x="${f1(x)}" y="${f1(y+(MOB?4.6:4))}" text-anchor="middle" font-size="${MOB?13:11.2}" fill="var(--fg)">${v}</text></g>`);
      }
    }}
    const m=coord('MON'), l=coord('LOV');
    if(P){
    const gy=13+(MOB?12:11);
    L.push(`<text class="glyph" x="${f1(m[0])}" y="${f1(m[1]+gy)}" text-anchor="middle">₴</text>`);
    L.push(`<text class="glyph" x="${f1(l[0])}" y="${f1(l[1]+gy)}" text-anchor="middle">♥</text>`);
    }
  }
  L.push(`<g id="hl"></g>`);
  for(const id of DRAWN){
    const inn=INNER.has(id), [x,y]=coord(id), col=GROUPCOL(id), rad=ptR(id)*(inn?1:KR);
    const fs=(inn?(MOB?1.06:1):KF)*(id==='E'?26:id==='X'?14:id.length===1?18:/1$/.test(id)?14:['MON','LOV'].includes(id)?12.5:13);
    const v=P?P[id]:'';
    const lab=P?`${POS[id][0]}: ${v} ${ARC[v].n}`:'';
    L.push(`<g class="pt${col?' col':''}${sel.has(id)?' sel':''}" style="--c:${col||'var(--fg)'}" ${mini?'':`data-id="${id}" tabindex="0" role="button" aria-label="${lab}"${P&&col&&typeof GD!=='undefined'&&GD[id]&&GD[id].ch?` data-tip="${GD[id].ch.split(' · ')[0]} · ${GD[id].t} — ${GD[id].s}"`:''}`}>${mini?'':`<circle class="hit" fill="transparent" stroke="none" cx="${f1(x)}" cy="${f1(y)}" r="${Math.max(rad+5,17)}"/>`}<circle class="ring${id==='E'?' core':''}" cx="${f1(x)}" cy="${f1(y)}" r="${rad}" style="stroke:${col||'var(--line)'}" stroke-width="${col?1.6:1}"/>${P?`<text x="${f1(x)}" y="${f1(y+fs*.36)}" text-anchor="middle" font-size="${fs}" >${v}</text>`:''}</g>`);
  }
  return `<svg viewBox="${MOB&&!ZM?`${CX-272} ${CY-272} 544 544`:`0 0 ${S} ${S}`}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${_t("Схема матриці долі")}">${L.join('')}</svg>`;
}

/* ---------- programs ---------- */
function progs(){ const P=STATE.P; return LINES.map(L=>{const vals=L.ids.map(i=>P[i]);return {...L,vals,named:findNamed(vals,!!L.any)}}) }
function yearProg(a){ const vals=STATE.P.YEARS[a]; return {k:'Y'+a,t:`${_f("Програма року · вік {0}",[a])}`,ids:null,vals,named:findNamed(vals,true),ctx:_t("Програма звучить протягом цього року"),year:a} }
function getProg(k){ return k[0]==='Y'?yearProg(+k.slice(1)):progs().find(p=>p.k===k) }
const lc=s=>s.charAt(0).toLowerCase()+s.slice(1);
const items=(a,f,n)=>a[f].replace(/\.$/,'').split(LSPLIT).slice(0,n).join(', ').toLowerCase();
function progText(pr){
  const As=pr.vals.map(v=>ARC[v]);
  /* fallback for combinations without a known name: no repeated keywords, a doubled energy is called out explicitly */
  const U=As.filter((a,i)=>As.indexOf(a)===i), dbl=As.find((a,i)=>As.indexOf(a)!==i), other=dbl?U.find(a=>a!==dbl):null, kw=a=>a.kw.slice(0,2).join(", ");
  const gen={
    p:`${U.length===1?`Програма повністю складається з енергії ${U[0].n}`:`Програма поєднує енергії ${U.map(a=>a.n).join(", ")}${dbl?` (енергія ${dbl.n} стоїть двічі, тому її тема звучить особливо сильно)`:''}`}. У гармонійному стані це ${U.map(a=>items(a,'p',2)).join("; ")}.`,
    m:`Коли програма в мінусі, з’являються ${U.map(a=>items(a,'m',2)).join("; ")}.`,
    h:`${pr.ctx}. `+(U.length===3?`Сценарій розгортається так: ${As[0].n} (${kw(As[0])}) запускає ситуацію, ${As[1].n} (${kw(As[1])}) визначає, як вона розвивається, а ${As[2].n} (${kw(As[2])}) показує, чим вона завершується.`
      :U.length===2?`Головна тема — ${dbl.n}: ${kw(dbl)}. Вона повторюється в програмі двічі й підсилюється енергією ${other.n} (${kw(other)}), тому ситуації на ці теми повторюються, доки урок не буде засвоєно.`
      :`Енергія ${As[0].n} стоїть у всіх трьох позиціях: її теми (${kw(As[0])}) повністю визначають цю сферу — і як ресурс, і як головне випробування.`),
    w:U.length===1?cap(U[0].task)+'.':`${cap(U[0].task)}; ${U.slice(1).map(a=>a.task).join('; і як підсумок — ')}.`
  };
  if(pr.named){ const n=pr.named; return {p:n.p,m:n.m,h:`${pr.ctx}. ${n.h}`,w:n.w,gen}; }
  return gen;
}
const SEG=["особистості й роду батька","роду батька й талантів","талантів і роду матері","роду матері й матеріального","матеріального й роду батька","роду батька й кармічного завдання","кармічного завдання й роду матері","роду матері й особистості"];

/* ---------- UI ---------- */
const $=s=>document.querySelector(s);
const MONTHS=["січня","лютого","березня","квітня","травня","червня","липня","серпня","вересня","жовтня","листопада","грудня"];
const MONTHN=["Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень"];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const daysIn=(m,y)=>new Date(y,m,0).getDate();
const CHEV=`<svg class="chev" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const XICON=`<svg viewBox="0 0 12 12"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;

const yearSel=$('#year'), monSel=$('#month'), daySel=$('#day');
const NOW=new Date().getFullYear();
yearSel.innerHTML='<option value="">—</option>'+Array.from({length:NOW-1919},(_,i)=>NOW-i).map(y=>`<option>${y}</option>`).join('');
monSel.innerHTML='<option value="">—</option>'+MONTHN.map((m,i)=>`<option value="${i+1}">${m}</option>`).join('');
function fillDays(){
  const m=+monSel.value||1, y=+yearSel.value||2000, max=monSel.value?daysIn(m,y):31, cur=+daySel.value;
  daySel.innerHTML='<option value="">—</option>'+Array.from({length:max},(_,i)=>`<option>${i+1}</option>`).join('');
  if(cur) daySel.value=Math.min(cur,max);
}
fillDays(); monSel.addEventListener('change',fillDays); yearSel.addEventListener('change',fillDays);

let STATE=null;
const gender=()=>STATE&&STATE.g||(document.querySelector('input[name=g]:checked')||{}).value||'f';
function curAge(){
  const {d,m,y}=STATE, t=new Date(); let a=t.getFullYear()-y;
  if(t.getMonth()+1<m||(t.getMonth()+1===m&&t.getDate()<d)) a--;
  return Math.max(0,a)%80;
}
function defaultDet(v){
  if(v==='today') return {type:'day',key:'me'};
  if(v==='years') return {type:'year',age:curAge()};
  if(v==='arcana') return {type:'cat',v:STATE.P?STATE.P.E:1};
  return null;
}
function setView(v){ STATE.view=v; STATE.stack=[]; STATE.det=STATE.baseDet=defaultDet(v); render(); }

/* --- chakra table --- */
function chakraRows(P){
  const rows=CHAK.map(c=>{const ph=P[c.ph[0]],en=P[c.ph[1]];return {ph,en,em:r(ph+en)}});
  const sum=f=>r(rows.reduce((s,x)=>s+x[f],0));
  return {rows,total:{ph:sum('ph'),en:sum('en'),em:sum('em')}};
}
/* ---------- «Шлях призначення»: родові програми → пошук себе → соціалізація → духовна грамотність (під картою здоров'я) ----------
   Left (2/3): the scheme — Sky + Earth give personal purpose, father's + mother's lines give social purpose, both give spiritual purpose.
   Right (1/3): what the chosen point means, plus/minus and how to work it through. Tooltips on hover, click a circle to read. */
const PP_ST={self:{t:"Пошук себе",a:"до 40 років",c:'var(--p-violet)'},rod:{t:"Родові програми",a:"сила і завдання роду",c:'var(--p-cyan)'},soc:{t:"Соціалізація",a:"40–60 років",c:'var(--p-blue)'},spir:{t:"Духовна грамотність",a:"після 60 років",c:'var(--p-gold)'}};
const PP_N={
  SKY:{st:'self',t:"Лінія Неба",f:"таланти + кармічне завдання",x:80,y:78,r:27,
    role:"Вертикаль матриці: дар, з яким ви прийшли, і завдання душі. Це духовні якості, які варто в собі розвинути, — те, що ви приносите у світ зсередини."},
  EARTH:{st:'self',t:"Лінія Землі",f:"особистість + матеріальне",x:222,y:78,r:27,
    role:"Горизонталь матриці: як ви проявляєтеся і як заробляєте. Це вміння й навички, через які ви реалізуєтеся в матеріальному світі."},
  PERS:{st:'self',t:"Особисте призначення",f:"Небо + Земля",x:151,y:200,r:40,
    role:"Пошук себе. До 40 років головне завдання — зрозуміти, хто ви, і поєднати внутрішнє покликання з матеріальною реалізацією."},
  MALE:{st:'rod',t:"Чоловіча лінія роду",s:"Лінія батька",f:"рід батька: 10 і 50 років",x:378,y:78,r:27,
    role:"Програми, сила й досвід, передані по батьківській лінії. Те, як ви ставитеся до дії, відповідальності, грошей і влади, часто звідси."},
  FEM:{st:'rod',t:"Жіноча лінія роду",s:"Лінія матері",f:"рід матері: 30 і 70 років",x:520,y:78,r:27,
    role:"Програми, мудрість і почуття, передані по материнській лінії. Звідси — ставлення до турботи, близькості, тіла й власної цінності."},
  SOC:{st:'soc',t:"Соціальне призначення",f:"чоловіча лінія + жіноча лінія",x:449,y:200,r:40,
    role:"Соціалізація. Між 40 і 60 роками важливо реалізуватися серед людей — у справі, команді, суспільстві, — прийнявши досвід свого роду."},
  SPIR:{st:'spir',t:"Духовне призначення",f:"особисте + соціальне",x:300,y:404,r:46,
    role:"Духовна грамотність. Після 60 років — мудрість, якою ви ділитеся, і гармонія між тим, ким ви стали, і тим, що дали людям."}
};
const PP_ORD=['SKY','EARTH','PERS','MALE','FEM','SOC','SPIR'];
const ppDefault=()=>{ const a=curAge(); return a<40?'PERS':a<60?'SOC':'SPIR'; };
function ppInfo(id){
  const P=STATE.P, v=P[id], a=ARC[v], n=PP_N[id], st=PP_ST[n.st];
  const parts={SKY:['B','D'],EARTH:['A','C'],PERS:['SKY','EARTH'],MALE:['F','H'],FEM:['G','I'],SOC:['MALE','FEM'],SPIR:['PERS','SOC']}[id];
  const PL={A:"Особистість",C:"Матеріальне",B:"Таланти",D:"Кармічне завдання",F:"Рід батька, 10 р.",H:"Рід батька, 50 р.",G:"Рід матері, 30 р.",I:"Рід матері, 70 р."};
  const pl=k=>PP_N[k]?_t(PP_N[k].s||PP_N[k].t):_t(PL[k]||k);
  return `<div class="pp-i" style="--c:${st.c}">
    <p class="pp-stage">${_t(st.t)} · ${_t(st.a)}</p>
    <div class="pp-ih"><span class="pp-big">${v}</span><div><h3>${_t(n.t)}</h3><p class="pp-arc">${esc(a.n)}</p></div></div>
    <p class="pp-calc">${parts.map(k=>`${pl(k)} <b>${P[k]}</b>`).join(' + ')} = <b>${v}</b></p>
    <p class="pp-role">${_t(n.role)}</p>
    <p class="pp-pur"><b>${_t("Суть:")}</b> ${cap(a.pur)}.</p>
    <div class="pm"><div class="pp"><h4>${_t("У плюсі")}</h4>${UL(LST(v,'p',3))}</div><div class="pp minus"><h4>${_t("У мінусі")}</h4>${UL(LST(v,'m',3))}</div></div>
    <h4>${_t("Як пропрацювати")}</h4>${UL([...(a.how||[]).slice(0,3),cap(a.task)])}
    ${aiAsk('arc:'+id)}
  </div>`;
}
function pathSection(){
  if(!STATE.P||isPair()) return '';
  const P=STATE.P, sel=STATE.pp||ppDefault(), age=curAge(), now=age<40?'PERS':age<60?'SOC':'SPIR';
  /* connectors start under each circle's caption, so they never cross the text */
  const line=(a,b)=>{ const A_=PP_N[a], B_=PP_N[b], y1=A_.y+A_.r+(A_.r>30?(a===now?76:56):28); return `<line x1="${A_.x}" y1="${y1}" x2="${B_.x}" y2="${B_.y-B_.r-6}" style="--c:${PP_ST[B_.st].c}"/>`; };
  const node=id=>{ const n=PP_N[id], st=PP_ST[n.st], a=ARC[P[id]];
    return `<g class="pp-n${id===sel?' on':''}${id===now?' now':''}" data-pp="${id}" tabindex="0" role="button" aria-pressed="${id===sel}" aria-label="${esc(_t(n.t))}: ${P[id]} ${esc(a.n)}" style="--c:${st.c}" data-tip-h="${esc(_t(n.t))} · ${P[id]} ${esc(a.n)}" data-tip="${esc(_t(n.f))}. ${esc(_t("Натисніть, щоб прочитати."))}">
      <circle class="pp-halo" cx="${n.x}" cy="${n.y}" r="${n.r+9}"/><circle class="pp-c" cx="${n.x}" cy="${n.y}" r="${n.r}"/>
      <text class="pp-v" x="${n.x}" y="${n.y}" style="font-size:${Math.round(n.r*.78)}px">${P[id]}</text>
      <text class="pp-l" x="${n.x}" y="${n.y+n.r+(n.r>30?22:19)}">${esc(_t(n.s||n.t))}</text></g>`; };
  const grp=(x,w,y,key)=>`<g class="pp-grp" style="--c:${PP_ST[key].c}"><path d="M${x} ${y+10}v-8h${w}v8"/><text x="${x+w/2}" y="${y-6}">${esc(_t(key==='rod'?"Родові програми":"Небо і Земля"))}</text></g>`;
  const stg=(id)=>{ const n=PP_N[id], st=PP_ST[n.st], y=n.y+n.r+40; return `<text class="pp-sg" x="${n.x}" y="${y}" style="--c:${st.c}">${esc(_t(st.t))} · ${esc(_t(st.a))}</text>${id===now?`<g class="pp-nowg" style="--c:${st.c}"><rect class="pp-nr" x="${n.x-62}" y="${y+7}" width="124" height="22" rx="11"/><text class="pp-now" x="${n.x}" y="${y+22}">${esc(_t("ви зараз тут"))}</text></g>`:''}`; };
  return `<section class="ppath fade" aria-labelledby="pph">
    <div class="sec-h" style="--meta-pre:'${_t("[ призначення ]  ").replace(/'/g,"\\'")}'"><h2 id="pph">${_t("Шлях призначення")}</h2><p class="meta">${_t("Родові програми, пошук себе, соціалізація й духовна грамотність — як вони складаються у вашій матриці. Наведіть на кружечок, щоб побачити підказку, натисніть — щоб прочитати, як пропрацювати.")}</p></div>
    <div class="pp-grid">
      <div class="panel pp-sch"><svg viewBox="0 0 600 520" class="pp-svg" role="group" aria-label="${esc(_t("Схема призначення"))}">
        <g class="pp-lines">${line('SKY','PERS')}${line('EARTH','PERS')}${line('MALE','SOC')}${line('FEM','SOC')}${line('PERS','SPIR')}${line('SOC','SPIR')}</g>
        ${grp(48,206,30,'self')}${grp(346,206,30,'rod')}
        ${PP_ORD.map(node).join('')}
        ${stg('PERS')}${stg('SOC')}${stg('SPIR')}
      </svg>
      <div class="pp-leg">${['self','rod','soc','spir'].map(k=>`<button type="button" class="pp-lg" data-pp="${{self:'PERS',rod:'MALE',soc:'SOC',spir:'SPIR'}[k]}" style="--c:${PP_ST[k].c}"><i></i>${_t(PP_ST[k].t)}<small>${_t(PP_ST[k].a)}</small></button>`).join('')}</div></div>
      <aside class="panel pp-side" id="ppside" aria-live="polite">${ppInfo(sel)}</aside>
    </div></section>`;
}
function chakraSection(){
  const P=STATE.P, {rows,total}=chakraRows(P), ci=STATE.ch;
  const cell=(v,col)=>`<td><span class="cnum${col?' em':''}">${v}</span></td>`;
  return `<section class="chak fade" aria-labelledby="chh">
    <div class="sec-h"><h2 id="chh">${_t("Карта здоров’я")}</h2><p class="meta">${_t("Енергії семи чакр: фізика — лінія Землі, енергія — лінія Неба, емоції — їхня сума. Оберіть рядок, щоб прочитати трактування.")}</p></div>
    <div class="grid2">
      <div class="panel ctw"><table class="ctab"><thead><tr><th scope="col">${_t("Чакра")}</th><th scope="col">${_t("Фізика")}</th><th scope="col">${_t("Енергія")}</th><th scope="col">${_t("Емоції")}</th></tr></thead><tbody>
        ${rows.map((x,i)=>`<tr class="crow${ci===i?' on':''}" data-ci="${i}" tabindex="0" style="--c:${CHAK[i].c}"><th scope="row" data-tip-h="${_f("{0} · {1}-а чакра",[CHAK[i].n,7-i])}" data-tip="${_f("{0}. Зона тіла: {1}.",[cap(CHAK[i].t),CHAK[i].z])}"><span class="cdot" style="--c:${CHAK[i].c}"></span><span class="cname"><strong>${CHAK[i].n}</strong><small>${CHAK[i].t.split(LSPLIT).slice(0,2).join(', ')}</small></span></th>${cell(x.ph)}${cell(x.en)}${cell(x.em,1)}</tr>`).join('')}
        <tr class="crow total${ci===7?' on':''}" data-ci="7" tabindex="0"><th scope="row" data-tip-h="${_t("Енергополе")}" data-tip="${_t("Загальний підсумок усіх семи чакр: фізичний, енергетичний та емоційний стан організму в цілому.")}"><span class="cdot tot"></span><span class="cname">${_t("<strong>Енергополе</strong>")}<small>${_t("загальний підсумок")}</small></span></th>${cell(total.ph)}${cell(total.en)}${cell(total.em,1)}</tr>
      </tbody></table></div>
      <aside class="panel chside" id="chside">${chakraDetail(ci)}</aside>
    </div></section>`;
}
function chakraDetail(i){ return withAsk(chakraDetail0(i),'chak:'+i); }
function chakraDetail0(i){
  const P=STATE.P, A=ARC, {rows,total}=chakraRows(P), badge=(v,c)=>`<span class="chip static"><b style="--c:${c}">${v}</b>${A[v].n}</span>`;
  if(i===7){
    const t=total;
    return `<div class="det fade"><div class="det-top"><div class="det-num" style="--c:var(--accent)">${t.em}</div><div class="det-title"><h3>${_t("Енергополе")}</h3><small>${_t("Загальний енергетичний стан · підсумок усіх чакр")}</small></div></div>
      <h4>${_t("Що це")}</h4><p>${_t("Сума енергій усіх семи чакр по кожному стовпчику. Показує, на якій енергії тримається ваш загальний стан і що виснажує його найсильніше.")}</p>
      <div class="role"><div class="role-h">${badge(t.ph,'var(--p-red)')}<span class="role-n">${_t("Фізика · тіло й дії")}</span></div><p>${A[t.ph].hp}.</p><p class="small">${_f("<b>Сигнали:</b> {0}.",[lc(A[t.ph].hm)])}</p></div>
      <div class="role"><div class="role-h">${badge(t.en,'var(--p-blue)')}<span class="role-n">${_t("Енергія · внутрішній заряд")}</span></div><p>${_f("Наповнюєтеся через {0}. {1}.",[A[t.en].kw.join(', '),A[t.en].hp])}</p></div>
      <div class="role"><div class="role-h">${badge(t.em,'var(--accent)')}<span class="role-n">${_t("Емоції · загальний фон")}</span></div><p>${_f("Емоційний фон задає {0}: у плюсі — {1}; у мінусі — {2}.",[A[t.em].n,items(A[t.em],'p',3),items(A[t.em],'m',3)])}</p></div>
      <div class="pos-box"><h4>${_t("Як підтримувати загальний стан")}</h4>${UL([A[t.em].how[0],A[t.ph].how[0],A[t.en].how[0]])}</div>
      ${moreBtn('chak:'+i)}<p class="note">${_t("Карта здоров’я — езотерична модель самопізнання, а не медична діагностика. З будь-якими симптомами звертайтеся до лікаря.")}</p></div>`;
  }
  const c=CHAK[i], x=rows[i];
  return `<div class="det fade"><div class="det-top"><div class="det-num" style="--c:${c.c}">${x.em}</div><div class="det-title"><h3>${c.n}</h3><small>${c.z}</small></div></div>
    <h4>${_t("За що відповідає")}</h4><p>${_f("{0}. Зона тіла — {1}.",[cap(c.t),c.z])}</p>
    <div class="role"><div class="role-h">${badge(x.ph,c.c)}<span class="role-n">${_t("Фізика · лінія Землі")}</span></div><p>${_f("Як енергія проявляється в тілі й діях: {0}.",[lc(A[x.ph].hp)])}</p><p class="small">${_f("<b>Сигнали дисбалансу:</b> {0}.",[lc(A[x.ph].hm)])}</p></div>
    <div class="role"><div class="role-h">${badge(x.en,c.c)}<span class="role-n">${_t("Енергія · лінія Неба")}</span></div><p>${_f("Чакра наповнюється через {0}. {1}.",[A[x.en].kw.join(', '),A[x.en].hp])}</p><p class="small">${_f("<b>Що виснажує:</b> {0}.",[items(A[x.en],'m',3)])}</p></div>
    <div class="role"><div class="role-h">${badge(x.em,c.c)}<span class="role-n">${_t("Емоції · сума")}</span></div><p>${_f("Емоційний тон чакри — {0}. У плюсі: {1}. У мінусі: {2}.",[A[x.em].n,items(A[x.em],'p',3),items(A[x.em],'m',3)])}</p></div>
    <div class="pos-box"><h4>${_t("Що підтримує чакру")}</h4>${UL([c.pr,A[x.ph].how[0],A[x.en].how[0]])}</div>
    ${moreBtn('chak:'+i)}<p class="note">${_t("Карта здоров’я — езотерична модель самопізнання, а не медична діагностика. З будь-якими симптомами звертайтеся до лікаря.")}</p></div>`;
}

function render(){
  { const gs=document.getElementById('guide'); if(gs) gs.hidden=true; hideTarot(); }
  const P=STATE.P;
  let head;
  if(!P){
    head=`<div class="res-head fade"><div><h2>${_t("Довідник <b>арканів</b>")}</h2><div class="meta">${_t("22 Старші Аркани · розрахуйте матрицю, щоб побачити їх у своїх позиціях, програмах і роках")}</div></div></div>`;
  } else if(isPair()){
    const {a,b}=STATE, tn=findNamed([P.D2,P.D1,P.D],false);
    head=`<div class="res-head fade">
      <div><div class="title-row"><h2>${T('rPair')} <b>${esc(a.n||T('p1'))} & ${esc(b.n||T('p2'))}</b></h2><div class="tr-acts">${bmBtn()}<button class="btn ghost dl" id="dlBtn" type="button"><span aria-hidden="true">↓</span> ${T('rDl')}</button></div></div><div class="meta">${a.d} ${mName(a.m)} ${a.y} · ${b.d} ${mName(b.m)} ${b.y} · ${T('rOverlay')}</div></div>
      <div class="head-r"><div class="codes"><button class="code" data-go="arc:E">${T('rUnion')}<b>${P.E}</b></button><button class="code" data-go="prog:tail">${T('rKProg')}<b>${P.D2}-${P.D1}-${P.D}</b>${tn?` · ${PN(tn)}`:''}</button><button class="code" data-go="arc:PERS">${T('rPurp')}<b>${P.PERS}</b></button></div></div>
    </div>
    <div class="tabs" role="tablist">${[['matrix',T('tPair')],['arcana',T('tArc')]].map(([v,t])=>`<button role="tab" aria-selected="${STATE.view===v}" data-view="${v}">${t}</button>`).join('')}</div>`;
  } else {
    const {g,name,d,m,y}=STATE, tn=findNamed([P.D2,P.D1,P.D],false);
    head=`<div class="res-head fade">
      <div><div class="title-row"><h2>${name?`${T('rMatrix')} <b>${esc(name)}</b>`:`${T('rYour')} <b>${T('rDestiny')}</b>`}</h2><div class="tr-acts">${bmBtn()}<button class="btn ghost dl" id="dlBtn" type="button"><span aria-hidden="true">↓</span> ${T('rDl')}</button></div></div><div class="meta">${d} ${mName(m)} ${y} · ${g==='f'?T('rF'):T('rM')} · ${curAge()} ${T('rAge')}</div></div>
      <div class="head-r"><div class="codes"><button class="code" data-go="arc:E">${T('rCenter')}<b>${P.E}</b></button><button class="code" data-go="prog:tail">${T('rTail')}<b>${P.D2}-${P.D1}-${P.D}</b>${tn?` · ${PN(tn)}`:''}</button><button class="code" data-go="year:${curAge()}">${T('rYear')}<b>${P.YEARS[curAge()].join('-')}</b>${(yn=>yn?` · ${PN(yn)}`:'')(findNamed(P.YEARS[curAge()],true))}</button></div></div>
    </div>
    <div class="tabs" role="tablist">${[['matrix',T('tMatrix')],['today',T('tToday')],['years',T('tYears')],['arcana',T('tArc')]].map(([v,t])=>`<button role="tab" aria-selected="${STATE.view===v}" data-view="${v}">${t}</button>`).join('')}</div>`;
  }
  let left;
  if(STATE.view==='matrix') left=`<div class="panel mx fade" id="left"><div class="mx-zoom-row"><button class="zoom-b" id="zoomB" type="button" aria-pressed="${!!STATE.zoom}">${STATE.zoom?_t("⤡ Зменшити схему"):_t("⤢ Збільшити схему")}</button></div><div class="mx-sc${STATE.zoom?' z':''}">${svgMatrix(P,selSet(),false,isPair())}</div>
      <div class="legend"><span>${_t("<i style=\"--c:var(--p-violet)\"></i>Сахасрара")}</span><span>${_t("<i style=\"--c:var(--p-blue)\"></i>Аджна")}</span><span>${_t("<i style=\"--c:var(--p-green)\"></i>Анахата")}</span><span>${_t("<i style=\"--c:var(--p-gold)\"></i>Маніпура")}</span><span>${_t("<i style=\"--c:var(--p-rose)\"></i>Свадхістана")}</span><span>${_t("<i style=\"--c:var(--p-red)\"></i>Муладхара")}</span><span>${_t("<i style=\"--c:var(--surface-solid);box-shadow:inset 0 0 0 1px var(--line)\"></i>Інші позиції")}</span>${isPair()?'':_t("<span><b class=\"ring-k\">10</b>вік на колі</span>")}</div></div>`;
  else if(STATE.view==='years') left=`<div class="panel yl fade" id="left">${aiYearBtn()}${yearsList()}</div>`;
  else if(STATE.view==='today') left=`<div class="panel tdp fade" id="left">${todayPanel()}</div>`;
  else left=`<div class="panel cl fade" id="left">${catGrid()}</div>`;
  if(STATE.view==='matrix') left=left.replace(/<\/div>\s*$/,aiBlock()+'</div>');
  $('#result').innerHTML=head+`<div class="grid">${left}<aside class="panel side" id="side"></aside></div>`+(P&&STATE.view==='matrix'&&!isPair()?chakraSection()+pathSection():'');
  document.querySelectorAll('.tabs [data-view]').forEach(b=>b.addEventListener('click',()=>setView(b.dataset.view)));
  document.querySelectorAll('.codes [data-go]').forEach(b=>b.addEventListener('click',()=>{ if(STATE.view!=='matrix'){ setView('matrix'); } openDet(parseGo(b.dataset.go)); }));
  const zb=$('#zoomB'); if(zb) zb.addEventListener('click',()=>{ STATE.zoom=!STATE.zoom; render(); const sc=$('.mx-sc'); if(sc&&STATE.zoom){ sc.scrollLeft=(sc.scrollWidth-sc.clientWidth)/2; } const z2=$('#zoomB'); if(z2) z2.focus({preventScroll:true}); });
  const bmb=$('#bmBtn'); if(bmb) bmb.addEventListener('click',toggleFav);
  const dlb=$('#dlBtn'); if(dlb) dlb.addEventListener('click',()=>downloadCode(dlb));
  const lp=$('#left');
  lp.addEventListener('click',e=>{
    const p=e.target.closest('.pt'); if(p){ p.dataset.age!==undefined?openDet({type:'year',age:+p.dataset.age}):openDet({type:'arc',id:p.dataset.id}); return; }
    const yr=e.target.closest('.yrow'); if(yr){ openDet({type:'year',age:+yr.dataset.age},false); return; }
    const cs=e.target.closest('[data-cats]'); if(cs){ CAT_SUIT=cs.dataset.cats; lp.innerHTML=catGrid(); if(!(typeof isSheet==='function'&&isSheet())) openDet(CAT_SUIT==='M'?{type:'cat',v:1}:{type:'tcat',id:CAT_SUIT+'1'},false); return; }
    const tc=e.target.closest('.card[data-t]'); if(tc){ openDet({type:'tcat',id:tc.dataset.t},false); return; }
    const c=e.target.closest('.card'); if(c){ openDet({type:'cat',v:+c.dataset.v},false); return; }
    const sh=e.target.closest('[data-dshift]'); if(sh){ const n=+sh.dataset.dshift; STATE.day=n===0?new Date():addDays(STATE.day,n); refreshToday(); return; }
    const ds_=e.target.closest('[data-dset]'); if(ds_){ const [yy,mm,dd]=ds_.dataset.dset.split('-').map(Number); STATE.day=new Date(yy,mm-1,dd,12); refreshToday(); return; }
    const dsel=e.target.closest('[data-dsel]'); if(dsel){ openDet({type:'day',key:dsel.dataset.dsel},false); $('#left').innerHTML=todayPanel(); }
  });
  lp.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.classList.contains('pt')){e.preventDefault();e.target.dispatchEvent(new MouseEvent('click',{bubbles:true}))}});
  const ct=document.querySelector('.ctab');
  if(ct){
    const pick=tr=>{STATE.ch=+tr.dataset.ci;ct.querySelectorAll('.crow').forEach(x=>x.classList.toggle('on',x===tr));$('#chside').innerHTML=chakraDetail(STATE.ch);if(innerWidth<=980)$('#chside').scrollIntoView({behavior:'smooth',block:'start'});};
    ct.addEventListener('click',e=>{const tr=e.target.closest('.crow');if(tr)pick(tr)});
    ct.addEventListener('keydown',e=>{const tr=e.target.closest('.crow');if(tr&&(e.key==='Enter'||e.key===' ')){e.preventDefault();pick(tr)}});
  }
  { const pp=document.querySelector('.ppath');
    if(pp){ const pick=id=>{ if(!PP_N[id]) return; STATE.pp=id; pp.querySelectorAll('.pp-n').forEach(g=>{ const on=g.dataset.pp===id; g.classList.toggle('on',on); g.setAttribute('aria-pressed',String(on)); }); pp.querySelectorAll('.pp-lg').forEach(b=>b.classList.toggle('on',b.dataset.pp===id)); const sd=$('#ppside'); sd.innerHTML=ppInfo(id); sd.classList.remove('flash'); void sd.offsetWidth; sd.classList.add('flash'); if(innerWidth<=980) sd.scrollIntoView({behavior:'smooth',block:'nearest'}); };
      pp.addEventListener('click',e=>{ const g=e.target.closest('[data-pp]'); if(g) pick(g.dataset.pp); });
      pp.addEventListener('keydown',e=>{ const g=e.target.closest('.pp-n'); if(g&&(e.key==='Enter'||e.key===' ')){ e.preventDefault(); pick(g.dataset.pp); } }); } }
  renderSide(); updateSel(); if(typeof placeForm==='function') placeForm();
  if(STATE.view==='years'){ const on=lp.querySelector('.yrow.on'); if(on&&lp.scrollHeight>lp.clientHeight) lp.scrollTop=on.offsetTop-lp.clientHeight/2; }
}

function refreshToday(){ const key=STATE.det&&STATE.det.type==='day'?STATE.det.key:'me'; STATE.det=STATE.baseDet={type:'day',key}; $('#left').innerHTML=todayPanel(); renderSide(); }
function parseGo(str){ const i=str.indexOf(':'), t=str.slice(0,i), v=str.slice(i+1); return t==='day'?{type:'day',key:v}:t==='arc'?{type:'arc',id:v}:t==='prog'?{type:'prog',k:v}:t==='year'?{type:'year',age:+v}:{type:'cat',v:+v}; }
function selSet(){
  const d=STATE&&STATE.det, s=new Set(); if(!d||!STATE.P) return s;
  if(d.type==='arc') s.add(d.id);
  else if(d.type==='year') s.add(ringId(d.age));
  else if(d.type==='prog'){ const p=getProg(d.k); if(p.ids) p.ids.forEach(i=>s.add(i)); else s.add(ringId(p.year)); }
  else if(d.type==='cat') DRAWN.forEach(i=>{if(STATE.P[i]===d.v)s.add(i)});
  return s;
}
function updateSel(){
  const s=selSet();
  document.querySelectorAll('#left .pt').forEach(p=>p.classList.toggle('sel',s.has(p.dataset.id)));
  const svg=document.querySelector('#left svg'), hl=svg&&svg.querySelector('#hl');
  if(hl){
    let h='';
    const d=STATE.det;
    if(d&&d.type==='prog'){const p=getProg(d.k); if(p.ids){const pts=p.ids.map(i=>coord(i).map(n=>n.toFixed(1)).join(',')).join(' ');h+=`<polyline class="hl-line" points="${pts}"/>`;}}
    /* halo centred on the arcana: radius from the ring actually drawn, breathing via SVG <animate> (Safari ignores transform-box for CSS scale and drifted the halo sideways) */
    s.forEach(id=>{const [x,y]=coord(id), ring=svg.querySelector(`.pt[data-id="${id}"] circle.ring`), r0=(ring?parseFloat(ring.getAttribute('r')):ptR(id))+9, a=(r0*.94).toFixed(1), b=(r0*1.04).toFixed(1);
      h+=`<circle class="halo" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r0.toFixed(1)}"><animate attributeName="r" values="${a};${b};${a}" dur="2.8s" repeatCount="indefinite"/></circle>`;});
    hl.innerHTML=h;
    svg.classList.toggle('has-sel',s.size>0);
  }
  document.querySelectorAll('#left .yrow').forEach(r=>r.classList.toggle('on',STATE.det&&STATE.det.type==='year'&&+r.dataset.age===STATE.det.age));
  document.querySelectorAll('#left .card').forEach(c=>c.classList.toggle('on',STATE.det&&(c.dataset.t?STATE.det.type==='tcat'&&c.dataset.t===STATE.det.id:STATE.det.type==='cat'&&+c.dataset.v===STATE.det.v)));
}
function openDet(d,push=true){
  if(isSheet()){ STATE.det=d; renderSide(); updateSel(); return; }
  if(!push) STATE.baseDet=d;
  STATE.det=d; renderSide(); updateSel();
  if(innerWidth<=980) $('#side').scrollIntoView({behavior:'smooth',block:'start'});
}
function closeDet(){ STATE.stack=[]; STATE.det=STATE.baseDet||null; renderSide(); updateSel(); }
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&STATE&&STATE.det&&STATE.det!==STATE.baseDet)closeDet()});
document.addEventListener('pointerdown',e=>{ const t=e.target.closest&&e.target.closest('.pt,.yrow,.card,.code,.dcard,.chip,.prow,.crow,[data-go]'); if(t&&!t.closest('#msheet')) window._tapEl=t; },true);
document.addEventListener('click',e=>{ if(e.target.closest('#msX')){ const sh=$('#msheet'); if(sh._close) sh._close(); else sheetClose(); } });
document.addEventListener('keydown',e=>{ const sh=$('#msheet'); if(e.key==='Escape'&&sh&&!sh.hidden&&$('#mdl').hidden){ if(sh._close) sh._close(); else sheetClose(); } });
addEventListener('resize',()=>{ const sh=$('#msheet'); if(sh&&!sh.hidden&&!isSheet()){ sheetClose(); if(!$('#result').hidden&&STATE&&STATE.P!==undefined) renderSide(); else if(!$('#guide').hidden) renderGuide(); } });

/* ---------- today: date matrix × personal matrix ---------- */
const DAY=[null,
"день старту: починайте, домовляйтеся, презентуйте ідеї, вчіться новому",
"день тиші: слухайте інтуїцію, аналізуйте, не розкривайте всі карти",
"день задоволення: краса, турбота про тіло, творчість, приємні покупки",
"день порядку: плануйте, вирішуйте робочі питання, беріть відповідальність",
"день навчання: консультації, наставники, офіційні справи, традиції",
"день стосунків: зустрічі, розмови серцем, вибір, приємні знайомства",
"день руху: поїздки, активні дії, просування до мети",
"день балансу: документи, договори, чесні розмови, наведення ладу",
"день усамітнення: глибока робота, аналіз, менше людей і шуму",
"день можливостей: несподівані шанси, зміни планів, легкість",
"день сили: спорт, складні завдання, фізична активність; стежте за емоціями",
"день паузи: не форсуйте події, подивіться на ситуацію інакше, допоможіть комусь",
"день оновлення: завершуйте старе, розбирайте завали, змінюйте звички",
"день гармонії: повільний темп, відновлення, творчість, вода",
"день спокус: гроші, харизма, переговори; уникайте надмірностей",
"день перебудови: можливі несподіванки; будуйте, а не руйнуйте",
"день натхнення: творчість, видимість, публічні дії, мрії",
"день інтуїції: сни, образи, відчуття; не піддавайтеся тривозі",
"день успіху: радість, лідерство, діти, теплі зустрічі",
"день родини: дзвінки близьким, сімейні справи, переосмислення",
"день масштабу: нові горизонти, подорожі, завершення етапу",
"день свободи: спонтанність, гра, легкість, нестандартні рішення"];
/* energy level of an arcana as a day energy: 5 — rise, 1 — tension */
const LEVEL=[0,5,3,4,4,3,4,5,3,2,4,5,2,2,3,4,1,4,2,5,3,4,4];
const LVLW=['','Напруга','Спад','Рівно','Високий','Підйом'];
const WD=['неділя','понеділок','вівторок','середа','четвер','пʼятниця','субота'];
const WDS=['нд','пн','вт','ср','чт','пт','сб'];
const DSPH=[
 {t:'Настрій і самопочуття',src:'особистість (A) + день дати',f:(P,T)=>r(P.A+T.A),fld:'pers'},
 {t:'Натхнення й таланти',src:'таланти (B) + місяць дати',f:(P,T)=>r(P.B+T.B),fld:'tal'},
 {t:'Гроші й справи',src:'матеріальне (C) + рік дати',f:(P,T)=>r(P.C+T.C),fld:'money'},
 {t:'Стосунки',src:'канал стосунків + енергія дня',f:(P,T)=>r(P.LOV+T.E),fld:'love'},
 {t:'Тіло й ресурс',src:'центр (E) + день дати',f:(P,T)=>r(P.E+T.A),fld:'hp'},
 {t:'Урок дня',src:'кармічне завдання (D) + нижня точка дати',f:(P,T)=>r(P.D+T.D),fld:'task'}
];
function dayCalc(dt){const T={};T.A=r(dt.getDate());T.B=dt.getMonth()+1;T.C=r(ds(dt.getFullYear()));T.D=r(T.A+T.B+T.C);T.E=r(T.A+T.B+T.C+T.D);return T;}
function personalDay(dt){
  const T=dayCalc(dt), P=STATE.P, pd=r(P.E+T.E), sph=DSPH.map(s=>s.f(P,T));
  const lvl=Math.round((LEVEL[pd]*2+sph.reduce((a,v)=>a+LEVEL[v],0))/(sph.length+2)/5*100);
  return {T,pd,sph,lvl};
}
function ageAt(dt){const {d,m,y}=STATE;let a=dt.getFullYear()-y;if(dt.getMonth()+1<m||(dt.getMonth()+1===m&&dt.getDate()<d))a--;return Math.max(0,a)%80;}
const sameDay=(a,b)=>a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate();
const addDays=(dt,n)=>{const x=new Date(dt);x.setDate(x.getDate()+n);return x;};
const fmtD=dt=>`${dt.getDate()} ${MONTHS[dt.getMonth()]} ${dt.getFullYear()}`;
const meter=v=>`<span class="meter" aria-hidden="true"><i style="width:${LEVEL[v]*20}%"></i></span>`;

function todayPanel(){
  const dt=STATE.day, I=personalDay(dt), now=new Date(), isT=sameDay(dt,now), sel=STATE.det&&STATE.det.type==='day'?STATE.det.key:'';
  const week=Array.from({length:7},(_,i)=>addDays(dt,i-3));
  return `<div class="td">
    <div class="td-h">
      <button class="iconbtn" data-dshift="-1" aria-label="${_t("Попередній день")}">‹</button>
      <div class="td-date"><strong>${fmtD(dt)}</strong><small>${isT?_t("Сьогодні · "):''}${WD[dt.getDay()]}</small></div>
      <button class="iconbtn" data-dshift="1" aria-label="${_t("Наступний день")}">›</button>
    </div>
    ${isT?'':'<div class="td-back">'+_t("<button class=\"btn ghost sm today-btn\" data-dshift=\"0\">Сьогодні</button>")+'</div>'}
    <div class="td-cards">
      <button class="dcard${sel==='me'?' on':''}" data-dsel="me"><span class="dnum" style="--c:var(--accent)">${I.pd}</span><span><small>${_t("Ваша енергія дня")}</small><strong>${ARC[I.pd].n}</strong><em>${cap(DAY[I.pd].split(':')[0])}</em></span></button>
      <button class="dcard${sel==='all'?' on':''}" data-dsel="all"><span class="dnum" style="--c:var(--p-blue)">${I.T.E}</span><span><small>${_t("Енергія дати для всіх")}</small><strong>${ARC[I.T.E].n}</strong><em>${cap(DAY[I.T.E].split(':')[0])}</em></span></button>
    </div>
    <div class="td-fon"><div><small>${_t("Енергетичний фон дня")}</small><strong>${I.lvl}%</strong></div><span class="meter big"><i style="width:${I.lvl}%"></i></span></div>
    <div class="side-h" style="padding-inline:4px">${_t("Коливання по сферах")}</div>
    <div class="sph">${DSPH.map((s,i)=>{const v=I.sph[i];return `<button class="srow${sel==='s'+i?' on':''}" data-dsel="s${i}"><span class="acc-t"><strong>${s.t}</strong><small>${v} · ${ARC[v].n}</small></span><span class="lv lv${LEVEL[v]}">${LVLW[LEVEL[v]]}</span>${meter(v)}</button>`}).join('')}</div>
    <div class="side-h" style="padding-inline:4px">${_t("Тиждень навколо дати")}</div>
    <div class="week">${week.map(w=>{const x=personalDay(w),on=sameDay(w,dt);return `<button class="wday${on?' on':''}${sameDay(w,now)?' now':''}" data-dset="${w.getFullYear()}-${w.getMonth()+1}-${w.getDate()}"><small>${WDS[w.getDay()]}</small><span class="wbar"><i style="height:${x.lvl}%"></i></span><b>${x.pd}</b><small>${w.getDate()}.${String(w.getMonth()+1).padStart(2,'0')}</small></button>`}).join('')}</div>
    <p class="note">${_t("Енергії дня — поєднання вашої матриці з матрицею календарної дати. Це підказка для планування, а не прогноз подій.")}</p>
  </div>`;
}
function dayDetail(key){
  const dt=STATE.day, I=personalDay(dt), P=STATE.P, A=ARC, age=ageAt(dt), yr=P.YEARS[age];
  const closable=STATE.det!==STATE.baseDet;
  const top=(v,col,title,sub)=>`<div class="det-top"><div class="det-num" style="--c:${col}">${v}</div><div class="det-title"><h3>${title}</h3><small>${sub}</small></div>${closable?`<button class="x" id="close" aria-label="${_t("Закрити")}">${XICON}</button>`:''}</div>`;
  if(key==='me'){
    const v=I.pd, a=A[v];
    return `<div class="det fade">${top(v,'var(--accent)',`${_f("Ваша енергія дня · {0}",[a.n])}`,`${_f("{0} · центр матриці {1} + енергія дати {2}",[fmtD(dt),P.E,I.T.E])}`)}
      <div class="pos-box"><h4>${_t("Тема дня")}</h4><p>${cap(DAY[v])}.</p></div>
      <h4>${_t("Як проживається енергія сьогодні")}</h4><p>${a.live}</p>
      <h4>${_t("Причинно-наслідкові зв’язки")}</h4>${causeList(a)}
      <h4>${_t("Питання дня")}</h4>${qListT(a,a.n)}
      <div class="pm"><div class="pp"><h4>${_t("Що вдасться")}</h4>${UL(a.p.replace(/\.$/,'').split(LSPLIT).slice(0,4))}</div><div class="pp minus"><h4>${_t("На що зважати")}</h4>${UL(a.m.replace(/\.$/,'').split(LSPLIT).slice(0,4))}</div></div>
      <div class="blk2"><div><h4>${_t("Зробіть сьогодні")}</h4>${UL([a.how[0],a.how[1],A[I.sph[0]].how[0]])}</div><div><h4>${_t("Краще уникати")}</h4>${UL([a.m.split(LSPLIT)[0],A[I.sph[5]].m.split(LSPLIT)[0],A[I.sph[3]].m.split(LSPLIT)[0]])}</div></div>
      <h4>${_t("Фон року")}</h4><p>${_f("День проходить на тлі року {0} (вік {1}): {2}. {3}",[yr.join('-'),age,YR[yr[0]],LEVEL[v]>=4?_t("Енергія дня підсилює рух у темі року."):LEVEL[v]<=2?_t("День просить пригальмувати й не форсувати тему року."):_t("День рівний — гарно працювати в ритмі року без різких кроків.")])}</p>
      <h4>${_t("Сфери дня")}</h4><div class="mini">${DSPH.map((s,i)=>`<button class="srow sm" data-go="day:s${i}"><span class="acc-t"><strong>${s.t}</strong><small>${I.sph[i]} · ${A[I.sph[i]].n}</small></span><span class="lv lv${LEVEL[I.sph[i]]}">${LVLW[LEVEL[I.sph[i]]]}</span></button>`).join('')}</div>${moreBtn('day:me')}</div>`;
  }
  if(key==='all'){
    const T=I.T, v=T.E, a=A[v];
    return `<div class="det fade">${top(v,'var(--p-blue)',`${_f("Енергія дати · {0}",[a.n])}`,`${_f("{0} · спільна для всіх",[fmtD(dt)])}`)}
      <div class="pos-box"><h4>${_t("Загальний фон")}</h4><p>${cap(DAY[v])}.</p></div>
      <h4>${_t("Матриця дати")}</h4><div class="chips">${[[_t("День"),T.A],[_t("Місяць"),T.B],[_t("Рік"),T.C],[_t("Сума"),T.D],[_t("Центр"),T.E]].map(([l,x])=>`<span class="chip static"><b style="--c:var(--p-blue)">${x}</b>${l} · ${A[x].n}</span>`).join('')}</div>
      <p class="small muted">${_t("Так рахується енергія самої дати — однакова для всіх людей. Вашу особисту реакцію на неї показує «Ваша енергія дня».")}</p>
      ${two(a)}
      <h4>${_t("Кому день найсприятливіший")}</h4><p>${_f("Тим, у кого в матриці сильна енергія {0} в плюсі: {1}.",[a.n,items(a,'p',3)])}</p>${moreBtn('day:all')}</div>`;
  }
  const i=+key.slice(1), s=DSPH[i], v=I.sph[i], a=A[v];
  const fieldTxt=s.fld==='hp'?a.hp+'.':s.fld==='pers'?a.pers:cap(a[s.fld])+'.';
  return `<div class="det fade">${top(v,'var(--accent)',`${s.t} · ${a.n}`,`${fmtD(dt)} · ${s.src}`)}
    <div class="pos-box"><h4>${_f("Рівень дня: {0}",[LVLW[LEVEL[v]]])}</h4><p>${cap(DAY[v])}.</p></div>
    <h4>${_t("Як це відчувається в сфері")}</h4><p>${fieldTxt}</p>
    <div class="pm"><div class="pp"><h4>${_t("Сприятливо")}</h4>${UL(a.p.replace(/\.$/,'').split(LSPLIT).slice(0,3))}</div><div class="pp minus"><h4>${_t("Обережно")}</h4>${UL(a.m.replace(/\.$/,'').split(LSPLIT).slice(0,3))}</div></div>
    <div class="pos-box"><h4>${_t("Порада на день")}</h4>${UL(a.how.slice(0,2))}</div>${moreBtn('day:'+key)}</div>`;
}

/* ---------- compatibility (pair matrix) ---------- */
const PPOS={A:'Як пару бачать інші',A1:'Як союз розкривається',A2:'Глибинна якість союзу',B:'Спільні таланти пари',B1:'Як розвивається спільний дар',B2:'Глибинний дар пари',C:'Матеріальна сфера пари',C1:'Матеріальна карма пари',C2:'Гроші пари · вхід',D:'Кармічне завдання пари',D1:'Кармічна програма пари · прояв',D2:'Кармічна програма пари · задача',E:'Енергія союзу · центр',E2:'Родова основа пари',E3:'Центральна програма пари',MON:'Гроші пари · що примножує',LOV:'Почуття пари',X:'Баланс любові й грошей пари',PERS:'Особиста задача пари',SOC:'Задача пари для світу',SPIR:'Духовний сенс союзу',PLAN:'Планетарна задача пари'};
const isPair=()=>!!(STATE&&STATE.mode==='pair');
const posLabel=id=>(isPair()&&PPOS[id])||POS[id][0];
function pairPosText(id,v){
  const a=ARC[v], f=POS[id][1];
  if(f==='pers') return `${_f("У союзі ця енергія проявляється як {0}. {1}.",[a.kw.join(', '),cap(a.love)])}`;
  if(f==='tal') return `${_f("Разом вам вдається: {0}.",[a.tal])}`;
  if(f==='money') return `${_f("Спільні гроші: {0}.",[a.money])}`;
  if(f==='karma') return `${_f("Кармічний досвід, що привів вас одне до одного: {0}.",[a.karma])}`;
  if(f==='minus') return `${_f("Як програма пари проявляється в буденності: {0}",[lc(a.m)])}`;
  if(f==='task') return `${_f("Спільна задача: {0}.",[a.task])}`;
  if(f==='love'||f==='health') return `${_f("У почуттях: {0}.",[a.love])}`;
  if(f==='rod') return `${_f("Від родів обох партнерів: {0} Завдання — {1}.",[lc(a.p),a.task])}`;
  if(f==='pur') return `${_f("Спільна місія: {0}.",[a.pur])}`;
  return a.pers;
}
function pairSpheres(){
  const {P,P1,P2,a,b}=STATE, A=ARC, n1=esc(a.n||_t("Партнер 1")), n2=esc(b.n||_t("Партнер 2"));
  const tail=[P.D2,P.D1,P.D], tn=findNamed(tail,false), ce=r(P1.E+P2.E);
  const shared=[P1.D,P1.D1,P1.D2].filter(v=>[P2.D,P2.D1,P2.D2].includes(v));
  return [
  {t:_t("Енергія союзу"),k:"Енергія союзу",s:`${_f("Центр {0} · {1}",[P.E,A[P.E].n])}`,ids:['E','E2','E3'],prog:'cen',html:[
    [_t("Що вас поєднує"),`${_f("Центр матриці пари — {0}: {1}. {2}.",[nm(P.E),A[P.E].kw.join(', '),cap(A[P.E].love)])}`],
    [_t("Як союз проживається"),`${_f("Ця енергія задає атмосферу вашого «ми». {0}",[A[P.E].live.split('. ').slice(1).join('. ')])}`],
    [_t("Сильні сторони союзу"),UL(LST(P.E,'p',4))],
    [_t("Тіньові прояви"),UL(LST(P.E,'m',4))],
    [_t("Родова основа"),`${_f("{0} — те, що приносять у союз роди обох партнерів. Разом із центром це дає {1}: {2}.",[nm(P.E2),nm(P.E3),A[P.E3].kw.slice(0,3).join(', ')])}`],
    [_t("Причинно-наслідкові зв’язки"),causeList(A[P.E])],
    [_t("Ви впізнаєте свій союз, якщо…"),UL(A[P.E].rec.slice(0,4))],
    [_t("Як покращити ситуацію"),fixList(A[P.E])],
    [_t("Як тримати союз у плюсі"),UL(A[P.E].how.slice(0,3))]]},
  {t:_t("Кожен у парі"),k:"Кожен у парі",s:`${a.n||_t("Партнер 1")} ${P1.E} · ${b.n||_t("Партнер 2")} ${P2.E}`,ids:[],html:[
    [n1,`${_f("Центр {0}. Приносить у союз {1}. Потребує від партнера: {2}.",[nm(P1.E),items(A[P1.E],'p',3),A[P1.E].kw.slice(0,2).join(_t(" і "))])}`],
    [n2,`${_f("Центр {0}. Приносить у союз {1}. Потребує від партнера: {2}.",[nm(P2.E),items(A[P2.E],'p',3),A[P2.E].kw.slice(0,2).join(_t(" і "))])}`],
    [_t("Як ви взаємодієте"),P1.E===P2.E?`${_f("Ваші центри однакові ({0}): ви дуже схожі, легко розумієте одне одного, але й мінуси цієї енергії подвоюються — {1}.",[nm(P1.E),items(A[P1.E],'m',2)])}`:`${_f("Сума ваших центрів — {0}: {1}. Так звучить простір між вами, коли ви поруч.",[nm(ce),A[ce].kw.join(', ')])}`],
    shared.length?[_t("Спільний урок"),`${_f("У кармічних хвостах обох є {0}: ви проходите схожий урок і можете допомагати одне одному його опрацювати.",[shared.map(nm).join(', ')])}`]:null]},
  {t:_t("Як пару бачать інші"),k:"Як пару бачать інші",s:`${P.A} · ${A[P.A].n}`,ids:['A','A1','A2'],html:[
    [_t("Образ пари"),`${_f("Оточення бачить у вас {0}: {1}.",[A[P.A].kw.join(', '),items(A[P.A],'p',3)])}`],
    [_t("Як союз розкривається з часом"),`${_f("Через {0} — {1}, а в глибині — {2}.",[nm(P.A1),A[P.A1].kw.slice(0,2).join(_t(" і ")),nm(P.A2)])}`],
    [_t("На що зважати"),UL(LST(P.A,'m',3))]]},
  {t:_t("Навіщо ви зустрілися"),k:"Навіщо ви зустрілися",s:`${_f("Призначення пари {0} · {1}",[P.PERS,A[P.PERS].n])}`,ids:['PERS','SOC','SPIR'],html:[
    [_t("Особиста задача пари"),`${nm(P.PERS)}: ${A[P.PERS].pur}.`],
    [_t("Задача для світу"),`${nm(P.SOC)}: ${A[P.SOC].pur}.`],
    [_t("Духовний сенс союзу"),`${nm(P.SPIR)}: ${A[P.SPIR].pur}.`],
    [_t("Як реалізувати"),UL(A[P.PERS].how.slice(0,3))]]},
  {t:_t("Спільні таланти"),k:"Спільні таланти",s:`${P.B} · ${A[P.B].n}`,ids:['B','B1','B2'],html:[
    [_t("Що вдається разом"),`${nm(P.B)}: ${A[P.B].tal}.`],
    [_t("Спільні справи"),UL(uniq([P.B,P.B1].flatMap(v=>A[v].prof.split(LSPLIT).slice(0,3))))],
    [_t("Як розкрити"),UL(A[P.B].how.slice(0,2))]]},
  {t:_t("Кохання й близькість"),k:"Кохання й близькість",s:`${_f("Канал {0}-{1}-{2}",[P.D2,P.LOV,P.X])}`,ids:['D2','LOV','X'],prog:'love',html:[
    [_t("Як ви кохаєте"),`${nm(P.D2)}: ${A[P.D2].love}.`],
    [_t("Що живить почуття"),`${nm(P.LOV)}: ${A[P.LOV].love}. ${A[P.LOV].live.split('. ')[1]||''}.`],
    [_t("Що руйнує близькість"),UL([...LST(P.D2,'m',2),...LST(P.LOV,'m',2)])],
    [_t("Причинно-наслідкові зв’язки"),causeList(A[P.LOV])],
    [_t("Як покращити ситуацію"),fixList(A[P.LOV])],
    [_t("Як зміцнити"),UL([A[P.LOV].how[0],A[P.D2].how[0],A[P.X].how[0]])]]},
  {t:_t("Гроші пари"),k:"Гроші пари",s:`${_f("Канал {0}-{1}-{2}",[P.C2,P.MON,P.X])}`,ids:['C','C2','MON','X'],prog:'money',html:[
    [_t("Матеріальна основа"),`${nm(P.C)}: ${A[P.C].money}.`],
    [_t("Через що заробляти разом"),`${nm(P.C2)}: ${A[P.C2].money}.`],
    [_t("Що примножує"),`${nm(P.MON)}: ${A[P.MON].tal}.`],
    [_t("Що блокує гроші пари"),UL([...LST(P.C,'m',2),...LST(P.C2,'m',2)])],
    [_t("Як відкрити канал"),UL([A[P.C2].how[0],A[P.MON].how[0]])]]},
  {t:_t("Кармічна програма пари"),k:"Кармічна програма пари",s:`${_f("Програма {0}{1}",[tail.join('-'),tn?` · «${PN(tn)}»`:''])}`,ids:['D2','D1','D'],prog:'tail',html:[
    tn?[_t("Іменна програма"),`«${PN(tn)}». ${tn.h}`]:null,
    [_t("Чому ви зустрілися"),`${_f("{0} ({1}) — тепер цей досвід ви проживаєте разом.",[cap(A[P.D].karma),nm(P.D)])}`],
    [_t("Як проявляється"),`${_f("Через {0}: {1}",[nm(P.D1),lc(A[P.D1].m)])}`],
    [_t("Спільна задача"),`${cap(A[P.D2].task)}.`],
    [_t("Як пропрацювати"),tn?`<p>${tn.w}</p>`:UL([A[P.D2].how[0],A[P.D1].how[0],A[P.D].how[0]])]]},
  {t:_t("Ризики й ключ до гармонії"),k:"Ризики й ключ до гармонії",s:_t("Де союз вразливий"),ids:['E','X','D'],html:[
    [_t("Зони ризику"),UL([A[P.E].m.split(LSPLIT)[0],A[P.X].m.split(LSPLIT)[0],A[P.D].m.split(LSPLIT)[0],A[P.D1].m.split(LSPLIT)[0]])],
    [_t("Ключ до гармонії"),UL([A[P.X].how[0],A[P.E].how[1],A[P.D2].how[1]])]]}
  ];
}

/* --- left panels --- */
function yearsList(){
  const {P,y}=STATE, cur=curAge(), selA=STATE.det&&STATE.det.type==='year'?STATE.det.age:-1;
  let h='';
  for(let dc=0;dc<8;dc++){
    h+=`<div class="dec"><div class="dec-h">${_f("{0}–{1} років",[dc*10,dc*10+9])} <span>${y+dc*10}–${y+dc*10+10}</span></div>`;
    for(let a=dc*10;a<dc*10+10;a++){
      const t=P.YEARS[a], nmd=findNamed(t,true);
      h+=`<button class="yrow${a===cur?' now':''}${a===selA?' on':''}" data-age="${a}"><span class="ya">${a}<small>${y+a}–${y+a+1}</small></span><span class="ytri">${t.map(v=>`<b>${v}</b>`).join('')}</span><span class="yname${nmd?' named':''}">${nmd?`«${nmd.n}»`:`${ARC[t[0]].n} · ${ARC[t[2]].n}`}</span>${a===cur?_t("<span class=\"badge\">зараз</span>"):''}</button>`;
    }
    h+='</div>';
  }
  return h;
}
function countIn(v){ return STATE.P?DRAWN.filter(i=>STATE.P[i]===v).length:0; }
/* ---------- Minor Arcana reference (Ukrainian): keywords · meaning · upright · reversed · advice · symbolism (+ as a person for court cards) ---------- */
const TSUIT_UK={
 W:{n:'Жезли',el:'Вогонь',d:'Масть дії, волі, пристрасті й творчості. Про енергію, ініціативу, кар’єру та все, що запалює й рухає вперед.'},
 C:{n:'Кубки',el:'Вода',d:'Масть почуттів, стосунків, інтуїції та внутрішнього світу. Про любов, дружбу, емоції та те, що наповнює серце.'},
 S:{n:'Мечі',el:'Повітря',d:'Масть думок, слів, рішень і конфліктів. Про ясність розуму, правду, виклики та те, що потребує чесного погляду.'},
 P:{n:'Пентаклі',el:'Земля',d:'Масть матеріального: гроші, робота, тіло, дім, ресурси. Про стабільність, майстерність і те, що можна побачити й відчути.'}};
const MINOR_UK={
W1:{kw:['натхнення','новий старт','іскра'],m:'Потужний імпульс, з якого починається нова справа, проєкт чи пристрасть.',up:'Свіжа ідея, сміливість почати, творчий запал, можливість, яка просить дії.',rev:'Затримка старту, згасання ентузіазму, енергія без напрямку.',adv:'Не чекайте ідеального моменту — зробіть перший крок, поки іскра горить.',sym:'Рука з хмари тримає зелений жезл з листям — дар життєвої сили; внизу замок і річка — шлях, що відкривається.'},
W2:{kw:['планування','вибір шляху','бачення'],m:'Ви стоїте на висоті й дивитеся на світ: час планувати наступний крок.',up:'Стратегія, бачення майбутнього, рішення вийти за межі звичного.',rev:'Страх змін, нерішучість, планування без дії.',adv:'Окресліть мету й виберіть напрям — світ у ваших руках, як глобус у руці героя.',sym:'Чоловік на мурах замку з глобусом у руці; один жезл він тримає, другий закріплений — між здобутим і новим.'},
W3:{kw:['розширення','очікування результату','горизонти'],m:'Перші кроки зроблено, тепер видно ширший горизонт і шанси за ним.',up:'Ріст, далекі плани, співпраця, кораблі ваших зусиль уже в дорозі.',rev:'Затримки, розчарування в темпі, обмежене бачення.',adv:'Дивіться далі сьогоднішнього дня і будьте готові до нових можливостей.',sym:'Постать зі спини на скелі дивиться на море з кораблями; три жезли вкопані поруч.'},
W4:{kw:['свято','дім','стабільність'],m:'Радість досягнутого, спільність і відчуття дому.',up:'Святкування, гармонія в родині, весілля, віха, якої досягнуто.',rev:'Напруга вдома, тимчасова нестабільність, перехідний етап.',adv:'Відзначте свої успіхи разом із близькими — це дає сили йти далі.',sym:'Чотири жезли з гірляндою квітів, двоє людей з букетами, замок позаду — святкова брама.'},
W5:{kw:['суперництво','конфлікт','змагання'],m:'Хаотична боротьба ідей і амбіцій, де кожен тягне на себе.',up:'Конкуренція, суперечки, змагальний дух, тертя в команді.',rev:'Уникнення конфлікту, внутрішня боротьба, пошук згоди.',adv:'Перетворіть сутичку на здорове змагання: домовтеся про правила.',sym:'П’ятеро юнаків махають жезлами — бій виглядає більше як гра, ніж як війна.'},
W6:{kw:['перемога','визнання','успіх'],m:'Публічний успіх і заслужене визнання.',up:'Тріумф, похвала, впевненість, лідерство, яке бачать інші.',rev:'Страх невдачі, гординя, визнання, що запізнюється.',adv:'Приймайте похвалу з гідністю і пам’ятайте, хто підтримав вас дорогою.',sym:'Вершник з лавровим вінком на жезлі, натовп із жезлами вітає переможця.'},
W7:{kw:['захист позиції','стійкість','виклик'],m:'Ви на висоті, і вас випробовують: позицію треба втримати.',up:'Відстоювання себе, мужність, конкуренція, впевненість у своїй правоті.',rev:'Виснаження, бажання здатися, відчуття, що вас тиснуть.',adv:'Тримайте межі й не відступайте від того, у що вірите.',sym:'Чоловік на пагорбі відбивається жезлом від шести жезлів, що піднімаються знизу.'},
W8:{kw:['швидкість','рух','новини'],m:'Події стрімко розгортаються, усе летить до мети.',up:'Швидкий прогрес, подорожі, новини, ясний напрям.',rev:'Затримки, поспіх, зірвані плани, хаос у справах.',adv:'Діяти треба зараз — ловіть хвилю, поки вона несе.',sym:'Вісім жезлів летять над рікою і пагорбами — енергія вже в повітрі.'},
W9:{kw:['стійкість','остання межа','обережність'],m:'Ви пройшли багато, втомлені, але ще на ногах — фініш близько.',up:'Витримка, наполегливість, захист досягнутого, досвід.',rev:'Виснаження, параноя, бажання все кинути.',adv:'Ще одне зусилля — і ви там. Беріть паузу, але не здавайтеся.',sym:'Поранений чоловік з пов’язкою на голові спирається на жезл; позаду частокіл із восьми жезлів.'},
W10:{kw:['тягар','перевантаження','відповідальність'],m:'Забагато справ на одних плечах — мета близько, але ноша важка.',up:'Перевтома, обов’язки, тягнути все самій, завершення важкого етапу.',rev:'Вивільнення від тягаря, делегування, вміння сказати «ні».',adv:'Подивіться, що з цієї ноші можна відкласти чи передати іншим.',sym:'Чоловік зігнувся під в’язанкою з десяти жезлів і несе її до міста.'},
W11:{kw:['цікавість','ентузіазм','звістка'],m:'Молода вогняна енергія: нова ідея, яка тільки шукає форму.',up:'Захоплення, відкриття, творчі новини, бажання спробувати.',rev:'Розпорошеність, незрілі ідеї, нетерпіння.',adv:'Досліджуйте з цікавістю, але доводьте хоча б одну ідею до справи.',sym:'Юнак у пустелі уважно розглядає жезл із пагоном — як нову можливість.',p:'Життєрадісна, допитлива людина, часто молода; вістка або пропозиція, що надихає.'},
W12:{kw:['пристрасть','пригода','імпульс'],m:'Вогонь у русі: сміливість, драйв і бажання діяти негайно.',up:'Сміливі дії, переїзд, пригоди, захоплення, яке веде вперед.',rev:'Поспіх, безрозсудність, кинуті на півдорозі справи.',adv:'Скеровуйте пристрасть у план — тоді швидкість стане силою.',sym:'Лицар на конях, що здиблюється, у вбранні з саламандрами — символами вогню.',p:'Харизматична, імпульсивна людина, яка швидко загоряється і швидко рухається далі.'},
W13:{kw:['впевненість','тепло','харизма'],m:'Зріла вогняна енергія: сила, що зігріває інших.',up:'Самовпевненість, незалежність, творчість, щедрість, магнетизм.',rev:'Ревнощі, вимогливість, вигорання, сумнів у собі.',adv:'Сяйте відкрито — ваша впевненість надихає тих, хто поруч.',sym:'Королева на троні з левами, у руці соняшник, біля ніг чорна кішка — інтуїція й сила.',p:'Тепла, енергійна жінка, яка вміє організувати й надихнути, центр компанії.'},
W14:{kw:['лідерство','бачення','підприємливість'],m:'Вогонь як влада: людина, що бачить мету й веде до неї інших.',up:'Лідерство, сміливі рішення, підприємництво, натхненна візія.',rev:'Деспотичність, нетерплячість, нереалістичні очікування.',adv:'Ведіть бачення, але давайте іншим простір рости поруч.',sym:'Король на троні з левами й саламандрами тримає квітучий жезл.',p:'Вольовий лідер, підприємець, наставник із великими планами.'},
C1:{kw:['любов','нові почуття','відкрите серце'],m:'Повна чаша почуттів: початок любові, дружби чи духовного оновлення.',up:'Нові стосунки, співчуття, емоційне наповнення, творче натхнення.',rev:'Закритість, придушені емоції, порожнеча всередині.',adv:'Дозвольте собі відчувати й приймати — серце готове до нового.',sym:'Рука з хмари тримає чашу, з якої б’ють п’ять струменів; голуб опускає облатку — благодать.'},
C2:{kw:['партнерство','взаємність','союз'],m:'Зустріч двох сердець на рівних — зв’язок, у якому обоє дають і отримують.',up:'Взаємне притягання, союз, примирення, глибоке порозуміння.',rev:'Розлад, нерівновага в стосунках, розірваний зв’язок.',adv:'Будуйте стосунки на взаємності й чесності — це основа союзу.',sym:'Чоловік і жінка обмінюються чашами; над ними кадуцей з головою крилатого лева.'},
C3:{kw:['дружба','свято','спільнота'],m:'Радість разом: дружба, святкування й підтримка близьких.',up:'Зустрічі, вечірки, співпраця, сестринство, спільний успіх.',rev:'Надмірності, плітки, відчуття третього зайвого.',adv:'Розділіть радість з тими, хто поруч, — так вона множиться.',sym:'Три жінки танцюють із піднятими чашами серед урожаю.'},
C4:{kw:['апатія','споглядання','переоцінка'],m:'Втома від того, що пропонує життя, — і непомічена нова можливість.',up:'Нудьга, замкненість у собі, роздуми, незадоволення.',rev:'Пробудження, нова мотивація, готовність прийняти пропозицію.',adv:'Підніміть погляд: можливо, нова чаша вже простягнута вам.',sym:'Юнак під деревом схрестив руки над трьома чашами; рука з хмари пропонує четверту.'},
C5:{kw:['втрата','жаль','смуток'],m:'Погляд прикутий до втраченого, хоча щось важливе ще лишилося.',up:'Розчарування, сум, жаль, переживання розлуки чи помилки.',rev:'Прийняття, прощення, рух далі після втрати.',adv:'Віддайте сум належне — а потім оберніться: дві чаші ще стоять.',sym:'Постать у чорному плащі над трьома перекинутими чашами; позаду дві цілі, міст веде до замку.'},
C6:{kw:['ностальгія','дитинство','щедрість'],m:'Тепло спогадів, невинність і прості радощі.',up:'Спогади, старі друзі, повернення додому, доброта без розрахунку.',rev:'Життя минулим, ідеалізація, небажання дорослішати.',adv:'Візьміть із минулого тепло, але живіть сьогодні.',sym:'Хлопчик дарує дівчинці чашу з квітами; навколо чаші з квітами й затишний двір.'},
C7:{kw:['ілюзії','вибір','мрії'],m:'Багато варіантів і фантазій — не всі з них реальні.',up:'Мрійливість, спокуси, розгубленість від вибору, бажане за дійсне.',rev:'Ясність, тверезий погляд, рішення після вагань.',adv:'Відділіть мрію від міражу: що з цього справді можна втілити?',sym:'Постать зі спини перед сімома чашами на хмарах: замок, коштовності, вінок, змія, дракон, голова й покрита фігура.'},
C8:{kw:['відхід','пошук глибшого','відпускання'],m:'Свідомий відхід від того, що більше не наповнює.',up:'Залишити звичне, духовний пошук, рішення йти далі.',rev:'Страх змін, кидання на півдорозі, повернення до старого.',adv:'Якщо серце вже не тут — дозвольте собі піти шукати своє.',sym:'Мандрівник із посохом іде в гори від восьми складених чаш під затемненим місяцем.'},
C9:{kw:['задоволення','бажання здійснюються','комфорт'],m:'Карта бажання: те, чого хотілося, збувається.',up:'Задоволення, вдячність, достаток, радість від життя.',rev:'Самовдоволення, надмірності, порожнеча за фасадом.',adv:'Насолоджуйтеся отриманим і дякуйте — так приходить ще.',sym:'Задоволений чоловік сидить, схрестивши руки; позаду дев’ять чаш на вигнутій полиці.'},
C10:{kw:['щаслива родина','гармонія','емоційна повнота'],m:'Повнота почуттів: дім, любов і мир у серці.',up:'Родинне щастя, гармонія в стосунках, глибоке задоволення.',rev:'Розлад у родині, ідеалізація, віддалення близьких.',adv:'Плекайте те, що поєднує вас із рідними, — це ваша веселка.',sym:'Пара з піднятими руками під веселкою з десяти чаш, поруч танцюють діти, вдалині дім.'},
C11:{kw:['чутливість','мрійливість','емоційна звістка'],m:'Ніжна, творча енергія почуттів і несподіваних емоційних новин.',up:'Інтуїція, творчість, романтична звістка, щирість.',rev:'Вразливість, незрілість, емоційні маніпуляції.',adv:'Слухайте інтуїцію і не бійтеся бути м’якою.',sym:'Паж біля моря тримає чашу, з якої виглядає риба, — несподіване послання підсвідомості.',p:'Мрійлива, чутлива людина, часто творча; романтична пропозиція чи новина.'},
C12:{kw:['романтика','пропозиція','ідеалізм'],m:'Лицар почуттів, що приходить із серцем у руках.',up:'Романтична пропозиція, шарм, ідеалізм, творча ініціатива.',rev:'Ревнощі, примхливість, нереалістичні очікування.',adv:'Ідіть за серцем, але перевіряйте, чи мрія тримається землі.',sym:'Лицар на білому коні повільно везе чашу, ніби пропонує її; на шоломі крила.',p:'Романтик, шармовний і чутливий, іноді більше мрійник, ніж діяч.'},
C13:{kw:['співчуття','інтуїція','емоційна мудрість'],m:'Глибока, турботлива енергія, що розуміє почуття без слів.',up:'Емпатія, турбота, інтуїтивна мудрість, емоційна стійкість.',rev:'Залежність від чужих емоцій, емоційне виснаження, жертовність.',adv:'Дбайте про себе так само ніжно, як про інших.',sym:'Королева на березі тримає закриту оздоблену чашу — таємниці підсвідомості.',p:'Чуйна жінка, яка вміє вислухати й підтримати; терапевт, наставниця, опора.'},
C14:{kw:['емоційна рівновага','дипломатія','мудрість'],m:'Владна, але м’яка сила почуттів: спокій посеред хвиль.',up:'Емоційний баланс, щедрість, дипломатія, зрілість.',rev:'Емоційна маніпуляція, перепади настрою, холодність.',adv:'Тримайте спокій, але не ховайте почуттів — керуйте ними.',sym:'Король на троні серед бурхливого моря тримає чашу і скіпетр; поруч риба й корабель.',p:'Зрілий, урівноважений чоловік, порадник, який розуміє людей.'},
S1:{kw:['ясність','прорив','правда'],m:'Гострий меч думки, що розсікає туман: момент істини.',up:'Ясність, нова ідея, перемога правди, рішучість.',rev:'Плутанина, хибні думки, зловживання силою слова.',adv:'Скажіть правду — собі та іншим. Ясність відкриває шлях.',sym:'Рука з хмари тримає меч із короною, оповитою оливою й пальмою, — перемога розуму.'},
S2:{kw:['важкий вибір','безвихідь','заперечення'],m:'Ви закриваєте очі на рішення, яке рано чи пізно доведеться ухвалити.',up:'Вагання, рівновага сил, уникання вибору, внутрішній конфлікт.',rev:'Інформаційне перевантаження, нарешті рішення, правда виходить назовні.',adv:'Зніміть пов’язку: розгляньте обидва варіанти чесно.',sym:'Жінка з пов’язкою на очах сидить, схрестивши два мечі на грудях; позаду море й молодик.'},
S3:{kw:['біль','розбите серце','горе'],m:'Гострий емоційний біль, що потребує визнання і часу.',up:'Розчарування, зрада, сум, болісна правда.',rev:'Зцілення, прощення, біль поступово відпускає.',adv:'Не женіть біль — проживіть його, і дощ мине.',sym:'Серце, пронизане трьома мечами, під дощовими хмарами.'},
S4:{kw:['відпочинок','відновлення','пауза'],m:'Час тиші й перепочинку після боротьби.',up:'Відпочинок, медитація, відновлення сил, перерва.',rev:'Неспокій, вигорання, повернення до дії.',adv:'Відступіть на крок — сили повернуться, якщо дозволити собі тишу.',sym:'Лицар лежить на гробниці зі складеними руками; три мечі на стіні, один під ним, вітраж угорі.'},
S5:{kw:['конфлікт','перемога будь-якою ціною','поразка'],m:'Суперечка, в якій виграш коштує дорожче, ніж здається.',up:'Сварки, егоїзм, приниження, перемога без честі.',rev:'Примирення, бажання закінчити конфлікт, визнання помилок.',adv:'Запитайте себе: це варте того, щоб утратити людей?',sym:'Чоловік з усмішкою збирає мечі; двоє переможених ідуть до моря під рваними хмарами.'},
S6:{kw:['перехід','рух до спокою','звільнення'],m:'Ви залишаєте бурхливі води й рухаєтеся до тихішого берега.',up:'Переїзд, вихід зі складної ситуації, поступове полегшення.',rev:'Незавершені справи, опір змінам, повернення до старого.',adv:'Беріть із собою досвід, а не біль, — човен уже рушив.',sym:'Перевізник везе жінку з дитиною в човні з шістьма мечами: вода поряд бурхлива, попереду гладь.'},
S7:{kw:['хитрість','стратегія','таємність'],m:'Дія тишком: обхідний шлях або спроба уникнути наслідків.',up:'Стратегія, обман, прихованість, діяти самотужки.',rev:'Викриття, зізнання, совість, повернення чесності.',adv:'Перевірте, чи ваша стратегія не стає самообманом.',sym:'Чоловік навшпиньки виносить п’ять мечів із табору, озираючись; два лишилися в землі.'},
S8:{kw:['обмеження','пастка думок','безпорадність'],m:'Відчуття пастки, яку здебільшого створює власний розум.',up:'Страх, самообмеження, жертовність, тупик.',rev:'Звільнення, новий погляд, сила вийти з ситуації.',adv:'Пов’язка не така міцна, як здається: зробіть крок назовні.',sym:'Зв’язана жінка з пов’язкою на очах серед восьми мечів; путі слабкі, шлях вільний.'},
S9:{kw:['тривога','безсоння','страхи'],m:'Нічні тривоги, які в голові здаються більшими, ніж є насправді.',up:'Хвилювання, провина, кошмари, внутрішній тиск.',rev:'Надія, вихід із тривоги, розмова, яка полегшує.',adv:'Поділіться страхом із кимось — удень він менший.',sym:'Людина сидить на ліжку, закривши обличчя руками; на темній стіні дев’ять мечів.'},
S10:{kw:['завершення','дно','кінець болю'],m:'Найтемніший момент, після якого може бути лише світанок.',up:'Болісний кінець, поразка, кінець старої історії.',rev:'Відновлення, вихід із кризи, урок засвоєно.',adv:'Визнайте, що це закінчилося, — і зверніть погляд на світанок.',sym:'Чоловік лежить обличчям донизу з десятьма мечами в спині; на горизонті світає.'},
S11:{kw:['допитливість','пильність','нові ідеї'],m:'Гострий молодий розум, що жадає знань і правди.',up:'Цікавість, навчання, спостережливість, нові думки.',rev:'Плітки, різкі слова, поверховість.',adv:'Ставте запитання й перевіряйте факти, перш ніж говорити.',sym:'Юнак на пагорбі з піднятим мечем під вітряним небом, пильний і насторожений.',p:'Кмітлива, допитлива людина, студент або дослідник; звістка, що потребує перевірки.'},
S12:{kw:['стрімкість','рішучість','амбіції'],m:'Розум у наступі: швидкий, рішучий, іноді різкий.',up:'Цілеспрямованість, сміливість, швидкі дії, відстоювання ідей.',rev:'Безрозсудність, агресія, поспіх без плану.',adv:'Будьте рішучою, але не ріжте зі злості.',sym:'Лицар на коні мчить в атаку з мечем, дерева гнуться від вітру.',p:'Прямолінійна, амбітна людина, яка діє швидко й говорить без прикрас.'},
S13:{kw:['чесність','незалежність','ясний розум'],m:'Мудрість, що пройшла крізь досвід, говорить прямо.',up:'Неупередженість, ясні межі, чесне слово, незалежність.',rev:'Холодність, гіркота, різкість, закритість.',adv:'Кажіть правду з добротою — тоді її чують.',sym:'Королева на троні над хмарами тримає меч угору, другою рукою ніби запрошує.',p:'Розумна, незалежна жінка з досвідом; чесна порадниця, яку не обдуриш.'},
S14:{kw:['інтелект','авторитет','справедливість'],m:'Влада розуму: логіка, правда й етика.',up:'Ясне мислення, експертність, справедливі рішення.',rev:'Маніпуляції, тиранія, холодний розрахунок.',adv:'Рішайте за фактами, але не забувайте про людяність.',sym:'Король на троні з метеликами тримає меч прямо — справедливість без хитань.',p:'Експерт, юрист, керівник із сильним інтелектом і принципами.'},
P1:{kw:['можливість','достаток','новий ресурс'],m:'Зерно матеріального успіху: нова робота, гроші чи здоров’я.',up:'Нова фінансова можливість, процвітання, стабільний старт.',rev:'Втрачений шанс, погане планування, нестача ресурсів.',adv:'Посадіть зерно: вкладіть час або кошти в те, що може рости.',sym:'Рука з хмари тримає пентакль над садом; арка з лілей веде до гір.'},
P2:{kw:['баланс','гнучкість','пріоритети'],m:'Вміння жонглювати кількома справами, не втрачаючи ритму.',up:'Пристосування, тайм-менеджмент, рух з потоком змін.',rev:'Перевантаження, хаос у фінансах, розкиданість.',adv:'Розставте пріоритети — не все треба тримати в повітрі одночасно.',sym:'Юнак танцює, жонглюючи двома пентаклями у стрічці нескінченності; позаду кораблі на хвилях.'},
P3:{kw:['майстерність','команда','навчання'],m:'Співпраця професіоналів, де вміння кожного важливе.',up:'Робота в команді, визнання навичок, якість, навчання.',rev:'Розлад у команді, поспіх, нестача досвіду.',adv:'Покажіть свою майстерність і прислухайтеся до інших фахівців.',sym:'Каменяр на лаві в соборі обговорює креслення з ченцем і архітектором; три пентаклі в арці.'},
P4:{kw:['контроль','збереження','скупість'],m:'Бажання втримати те, що маєте, будь-якою ціною.',up:'Заощадження, безпека, контроль, стабільність.',rev:'Скупість, страх втрати, або щедрість і відпускання.',adv:'Бережіть ресурси, але не дозволяйте страху закрити вас від світу.',sym:'Чоловік міцно тримає пентакль біля грудей, ще один на короні, два під ногами; позаду місто.'},
P5:{kw:['нестача','труднощі','ізоляція'],m:'Скрутні часи й відчуття, що ви залишилися за дверима.',up:'Фінансові проблеми, хвороба, самотність, відчуження.',rev:'Відновлення, допомога, вихід із кризи.',adv:'Попросіть про допомогу — двері теплого дому поруч.',sym:'Двоє жебраків ідуть снігом повз освітлене вікно церкви з п’ятьма пентаклями.'},
P6:{kw:['щедрість','обмін','баланс давати й брати'],m:'Рух ресурсів: допомога, подарунки, благодійність.',up:'Щедрість, підтримка, справедливий обмін.',rev:'Борги, нерівність, допомога з умовами.',adv:'Давайте й приймайте з відкритим серцем — і стежте за балансом.',sym:'Купець з терезами роздає монети двом жебракам, які стоять на колінах.'},
P7:{kw:['терпіння','оцінка результатів','інвестиції'],m:'Пауза, щоб подивитися, що вже виросло з ваших зусиль.',up:'Довгострокові вкладення, оцінка прогресу, наполегливість.',rev:'Нетерпіння, сумнів у доцільності, марні зусилля.',adv:'Не поспішайте збирати врожай — оцініть, що варто вирощувати далі.',sym:'Фермер, спершись на мотику, дивиться на кущ із сімома пентаклями.'},
P8:{kw:['праця','навички','вдосконалення'],m:'Наполеглива праця й шліфування майстерності.',up:'Ретельність, навчання, професійний ріст, концентрація.',rev:'Перфекціонізм, рутина без сенсу, недбалість.',adv:'Удосконалюйте вміння крок за кроком — якість накопичується.',sym:'Ремісник на лаві старанно вирізає пентаклі; шість уже висять на стовпі.'},
P9:{kw:['незалежність','розкіш','самодостатність'],m:'Плоди праці, якими можна насолоджуватися самостійно.',up:'Фінансова незалежність, комфорт, витонченість, самоцінність.',rev:'Залежність, показна розкіш, перевантаження роботою.',adv:'Насолоджуйтеся тим, що створили власними руками.',sym:'Жінка в саду серед виноградних лоз із сокілом на рукавиці; дев’ять пентаклів довкола.'},
P10:{kw:['спадок','родина','довготривалий добробут'],m:'Матеріальний і родинний добробут, що переходить між поколіннями.',up:'Стабільність, родинні цінності, спадщина, довгострокові статки.',rev:'Фінансові втрати, родинні суперечки, нестабільність.',adv:'Будуйте те, що лишиться після вас, і бережіть зв’язок поколінь.',sym:'Старий із собаками, родина під аркою, десять пентаклів у формі Дерева Життя.'},
P11:{kw:['навчання','амбіція','практичний початок'],m:'Молода земна енергія: старанність і прагнення вчитися.',up:'Нові навички, план, практичний підхід, перспектива роботи.',rev:'Лінощі, відсутність прогресу, нереалістичні плани.',adv:'Вчіться на практиці — зосередженість приносить результат.',sym:'Юнак у полі уважно розглядає пентакль, який тримає перед собою.',p:'Старанна, практична людина, студент чи початківець; пропозиція роботи чи навчання.'},
P12:{kw:['надійність','рутина','відповідальність'],m:'Повільний, але певний рух до мети.',up:'Старанність, терпіння, методичність, відданість справі.',rev:'Застій, нудьга, впертість, перфекціонізм.',adv:'Тримайте темп — стабільні кроки ведуть далі за ривки.',sym:'Лицар на нерухомому чорному коні тримає пентакль над зораним полем.',p:'Надійна, працьовита людина, на яку можна покластися, хоч і не швидка.'},
P13:{kw:['турбота','практичність','затишок'],m:'Земна мудрість: турбота, що вміє і нагодувати, і заробити.',up:'Добробут, турбота, практичність, дім і робота в балансі.',rev:'Самозанедбання, залежність, роботоголізм.',adv:'Створюйте затишок і не забувайте піклуватися про себе.',sym:'Королева на троні в квітучому саду тримає пентакль на колінах; поруч кролик — достаток.',p:'Турботлива, практична жінка, яка вміє вести дім і справи; опора родини.'},
P14:{kw:['достаток','безпека','матеріальний успіх'],m:'Зріла сила землі: багатство, стабільність, щедрість.',up:'Фінансовий успіх, лідерство в бізнесі, надійність.',rev:'Жадібність, матеріалізм, упертість.',adv:'Розпоряджайтеся ресурсами мудро — так вони служать і вам, і іншим.',sym:'Король на троні з биками, в саду з виноградом, тримає пентакль і скіпетр.',p:'Успішний підприємець, впевнений і щедрий, стабільна опора.'}};

let CAT_SUIT='M';
const catTabs=()=>`<div class="cat-tabs" role="tablist" aria-label="${_t("Розділи довідника")}">${[['M',_t("Старші аркани")],...TAROT_SUITS.map((x,k)=>[x,(TAROT_SUIT_N[LANG]||TAROT_SUIT_N.en)[k]])].map(([k,t])=>`<button type="button" role="tab" aria-selected="${CAT_SUIT===k}" data-cats="${k}">${t}</button>`).join('')}</div>`;
function tcatGrid(){
  const su=CAT_SUIT, T0=TSUIT_UK[su], sel=STATE.det&&STATE.det.type==='tcat'?STATE.det.id:'';
  const ids=Array.from({length:14},(_,i)=>su+(i+1));
  const row=id=>{ const d=MINOR_UK[id]; return `<button class="card tcard${id===sel?' on':''}" data-t="${id}" style="--sc:${TP_COL[su]}"><span class="tc-mini" aria-hidden="true">${tpArt(id)}</span><span class="ct"><strong>${esc(tpName(id))}</strong><small>${d?d.kw.join(' · '):''}</small></span></button>`; };
  return `<div class="cat-suit" style="--sc:${TP_COL[su]}"><p class="cs-el">${_t("Стихія")}: ${T0.el}</p><p>${T0.d}</p></div>
    <h4 class="cat-h">${_t("Числові карти")}</h4><div class="cat">${ids.slice(0,10).map(row).join('')}</div>
    <h4 class="cat-h">${_t("Придворні карти")}</h4><div class="cat">${ids.slice(10).map(row).join('')}</div>`;
}
function tcatDetail(id){
  const d=MINOR_UK[id]||{kw:[],m:'',up:'',rev:'',adv:'',sym:''}, su=id[0], T0=TSUIT_UK[su], n=+id.slice(1), court=n>10;
  const fig=`<figure class="arc-art" style="--sc:${TP_COL[su]}">${tpArt(id)}<span class="tc-n">${tpMark(id)}</span><span class="tc-name" style="--nl:${tpName(id).length}">${esc(tpName(id))}</span></figure>`;
  return `<div class="det fade">${topBlock(tpMark(id),TP_COL[su],esc(tpName(id)),`${T0.n} · ${T0.el}${court?' · '+_t("придворна карта"):''}`)}
    <div class="det-kw">${d.kw.map(k=>`<span>${k}</span>`).join('')}</div>
    ${fig}
    <p class="lead-p">${d.m}</p>
    ${court&&d.p?`<div class="pos-box"><h4>${_t("Як людина")}</h4><p>${d.p}</p></div>`:''}
    <div class="blk2"><div><h4>${_t("Пряме положення")}</h4><p>${d.up}</p></div><div><h4>${_t("Перевернуте")}</h4><p>${d.rev}</p></div></div>
    <div class="pos-box soft"><h4>${_t("Порада карти")}</h4><p>${d.adv}</p></div>
    <h4>${_t("Символізм")}</h4><p>${d.sym}</p>
    <button class="qs-go" type="button" data-tq="${esc(JSON.stringify({q:[`${_t("Що мені підказує карта")} «${tpName(id)}»?`],s:tpName(id)}))}"><svg viewBox="0 0 16 16" aria-hidden="true"><rect x="2.5" y="3" width="6" height="9.5" rx="1.2" transform="rotate(-8 5.5 7.75)"/><rect x="7.5" y="3" width="6" height="9.5" rx="1.2" transform="rotate(8 10.5 7.75)"/></svg><span>${_t("Запитати карти в трактувальнику")}</span><i>→</i></button></div>`;
}
function catGrid(){
  if(CAT_SUIT!=='M') return catTabs()+tcatGrid();
  const selV=STATE.det&&STATE.det.type==='cat'?STATE.det.v:0;
  return catTabs()+`<div class="cat">${ARC.slice(1).map((a,i)=>{const v=i+1,c=countIn(v);return `<button class="card${v===selV?' on':''}" data-v="${v}"><span class="cn">${v}</span><span class="ct"><strong>${a.n}</strong><small>${a.kw.join(' · ')}</small></span>${c?`<span class="cc" title="${_t("Разів у вашій матриці")}">×${c}</span>`:''}</button>`}).join('')}</div>`;
}

/* --- side panel --- */
function topBlock(badge,col,title,sub,isCode){
  const closable=STATE.det!==STATE.baseDet;
  return `<div class="det-top"><div class="det-num${isCode?' code':''}" style="--c:${col}">${badge}</div>
    <div class="det-title"><h3>${title}</h3><small>${sub}</small></div>
    ${closable?`<button class="x" id="close" aria-label="${_t("Закрити")}">${XICON}</button>`:''}</div>`;
}
const chipArc=(id)=>`<button class="chip" data-go="arc:${id}" data-tip="${posLabel(id)}"><b style="--c:${chipCol(id)}">${STATE.P[id]}</b>${ARC[STATE.P[id]].n}</button>`;
const chipVal=(v)=>`<button class="chip" data-go="cat:${v}"><b style="--c:var(--accent)">${v}</b>${ARC[v].n}</button>`;
function progRows(list){
  return `<div class="plist">${list.map(p=>`<button class="prow${p.named?' named':''}" data-go="prog:${p.k}"><span class="pcode">${p.vals.join('-')}</span><span class="acc-t"><strong>${p.named?`«${PN(p.named)}»`:p.t}</strong><small>${p.named?p.t:_t("Програма лінії")}${p.karmic?_t(" · кармічна"):''}</small></span>${CHEV}</button>`).join('')}</div>`;
}
function yearChips(v){
  const P=STATE.P, ages=[];
  for(let a=0;a<80;a++) if(P.YEARS[a][0]===v) ages.push(a);
  if(!ages.length) return `<p class="muted">${_t("Ця енергія не стає головною енергією жодного року.")}</p>`;
  return `<div class="chips">${ages.map(a=>`<button class="chip agechip" data-go="year:${a}">${_f("{0} р.",[a])}<small>${P.YEARS[a].join('-')}</small></button>`).join('')}</div>`;
}
const two=(a)=>`<div class="pm"><div class="pp"><h4>${_t("Сильні сторони · у плюсі")}</h4>${UL(a.p.replace(/\.$/,'').split(LSPLIT))}</div><div class="pp minus"><h4>${_t("Слабкі сторони · у мінусі")}</h4>${UL(a.m.replace(/\.$/,'').split(LSPLIT))}</div></div>`;
function arcBody(a,g){
  return `<h4>${_t("Суть енергії")}</h4><p>${a.d}</p>
    <div class="pos-box soft"><h4>${_t("Ви впізнаєте себе, якщо…")}</h4>${UL(a.rec)}</div>
    <h4>${_t("Як проживається енергія")}</h4><p>${a.live}</p>${two(a)}
    <h4>${_t("Причинно-наслідкові зв’язки")}</h4>${causeList(a)}
    <h4>${_t("Як покращити ситуацію")}</h4>${fixList(a)}
    <h4>${_t("Сфери реалізації")}</h4><div class="tags">${a.prof.split(LSPLIT).map(x=>`<span>${x}</span>`).join('')}</div>
    <div class="blk2"><div><h4>${_t("Стосунки")}</h4><p>${cap(a.love)}.</p></div><div><h4>${_t("Гроші")}</h4><p>${cap(a.money)}.</p></div></div>
    <h4>${_t("Ресурс і самопочуття")}</h4><p>${a.hp}. ${a.hm}.</p>
    <div class="pos-box"><h4>${_t("Як вивести в плюс")}</h4>${UL(a.how)}</div>
    <h4>${_t("Питання для себе")}</h4>${qListT(a,a.n)}
    ${isPair()?'':`<h4>${g==='f'?_t("Для жінки"):_t("Для чоловіка")}</h4><p>${g==='f'?a.f:a.mm}</p>`}`;
}
function posExtra(id,v){
  const a=ARC[v], f=POS[id][1];
  if(f==='tal') return `<p class="small">${_f("<b>Де розкривається:</b> {0}.",[a.prof])}</p>`;
  if(f==='money') return `<p class="small">${_f("<b>Сфери заробітку:</b> {0}.",[a.prof])}</p>`;
  if(f==='karma'||f==='minus'||f==='task') return `<p class="small">${_f("<b>Перший крок:</b> {0}.",[lc(a.how[0])])}</p>`;
  if(f==='love') return `<p class="small">${_f("<b>Порада:</b> {0}.",[lc(a.how[0])])}</p>`;
  if(f==='health') return '';
  return `<p class="small">${_f("<b>Як прийти в плюс:</b> {0}.",[lc(a.how[0])])}</p>`;
}
/* ---------- per-sphere readings of each arcana (tools/content/postx_*.py): how the energy shows in THIS kind of position ---------- */
const POSTX={"pers":{"1":{"p":["Енергія й кмітливість — з вами хочеться починати нове","Легкість у розмовах і знайомствах","Враження людини, яка знає, що робить"],"m":["Враження поверховості чи «продавця»","Звичка братися за все й кидати на півдорозі","Зверхність до тих, хто повільніший"],"d":["Показуйте результат, а не лише ідеї","Доводьте до кінця хоча б одну справу, перш ніж братися за нову"]},"2":{"p":["Спокій і загадковість — з вами хочеться ділитися таємним","Уміння слухати й помічати дрібниці","Враження мудрості не за віком"],"m":["Холодність і закритість","Мовчання там, де варто сказати","Недовіра, через яку люди не наважуються підійти"],"d":["Говоріть уголос про те, що відчуваєте","Довіряйте першому враженню про людей — воно зазвичай точне"]},"3":{"p":["Тепло й доглянутість — з вами затишно","Уміння створити красу навколо себе","Враження людини, що живе в достатку"],"m":["Опіка, яка душить","Залежність від зовнішності й оцінки","Лінощі, вимога комфорту за будь-яку ціну"],"d":["Дозволяйте собі задоволення без провини","Турбуйтеся, не контролюючи"]},"4":{"p":["Надійність і організованість — на вас хочеться спертися","Чітка мова, дотримане слово","Враження керівника"],"m":["Жорсткість і владність","Тиск там, де можна домовитися","Заборона собі на слабкість навіть із близькими"],"d":["Делегуйте й довіряйте","Дозволяйте собі м’якість, вона не руйнує авторитет"]},"5":{"p":["Шанобливість і вихованість — до вас ідуть по пораду","Уміння пояснити складне простими словами","Враження людини з принципами"],"m":["Моралізаторство й повчання","Ригідність, «так заведено»","Поділ людей на правильних і неправильних"],"d":["Діліться досвідом, коли просять","Перевіряйте правила на актуальність"]},"6":{"p":["Привітність — люди тягнуться до вас","Уміння домовлятися й згладжувати конфлікти","Враження людини серця"],"m":["Нерішучість, яка дратує","Залежність від схвалення","Бажання всім догодити"],"d":["Робіть вибір самостійно й швидше","Казати «ні» — теж про любов до себе"]},"7":{"p":["Цілеспрямованість і швидкість — з вами все рухається","Сміливість брати відповідальність","Враження лідера, що веде вперед"],"m":["Нетерплячість і тиск на інших","Агресія, коли щось іде не за планом","Вічна гонка без зупинки"],"d":["Ставте ціль і відпочинок у той самий план","Радійте пройденому шляху, а не лише фінішу"]},"8":{"p":["Чесність і ясність — з вами все зрозуміло","Твереза оцінка ситуацій","Враження людини, якій можна довірити рішення"],"m":["Холодний розрахунок і критика","Суворість до помилок інших","Образа, коли «нечесно»"],"d":["Оцінюйте вчинки, а не людей","Будьте справедливі й до себе"]},"9":{"p":["Глибина й мудрість — з вами можна говорити про важливе","Самодостатність, незалежність від натовпу","Враження експерта"],"m":["Відстороненість і замкнутість","Песимізм, «впораюся без нікого»","Враження недоступності"],"d":["Діліться знаннями — вони цінні","Виходьте до людей, навіть коли хочеться тиші"]},"10":{"p":["Легкість на підйом і везіння","Швидка адаптація до змін","Враження людини в потоці"],"m":["Непостійність, «сьогодні так, завтра інакше»","Надія на везіння замість дії","Хаос у справах"],"d":["Ловіть шанс, але закріплюйте результат","Ведіть простий план на тиждень"]},"11":{"p":["Сила й витримка — поруч із вами спокійно","Уміння тримати удар і не здаватися","Враження людини з характером"],"m":["Сила через тиск і контроль","Вибухи гніву","Перевтома, бо «треба триматися»"],"d":["Спрямовуйте силу в тіло: спорт, рух","Просіть допомоги, це не слабкість"]},"12":{"p":["Нестандартний погляд — ви бачите те, чого не бачать інші","Терпіння й уміння чекати","Враження творчої людини"],"m":["Жертовність і «мені нічого не треба»","Пасивність, очікування, що хтось вирішить","Вічна втома на обличчі"],"d":["Робіть щось для себе щодня","Дійте замість чекати слушного моменту"]},"13":{"p":["Глибина й сила змінюватися","Сміливість щодо кінців і нових початків","Враження людини з досвідом"],"m":["Похмурість і різкість","Обірвані стосунки замість розмови","Страх змін, прихований за контролем"],"d":["Відпускайте старе свідомо","Додайте в життя легкості й гумору"]},"14":{"p":["Врівноваженість і м’якість — з вами спокійно","Уміння помирити й об’єднати","Враження тонкого смаку"],"m":["Безхарактерність, усе «помірно»","Уникнення конфліктів будь-якою ціною","Повільність"],"d":["Вчіться казати, чого хочете","Знаходьте свою міру — не чужу"]},"15":{"p":["Яскравість і харизма — ви притягуєте увагу","Сміливість говорити про бажання","Враження людини, яка вміє жити"],"m":["Маніпуляції й залежності","Цинізм, «усе купується»","Надмірність у всьому"],"d":["Використовуйте харизму чесно","Помічайте, що вами керує, і повертайте собі вибір"]},"16":{"p":["Прямота й сміливість — ви руйнуєте застій","Швидке відновлення після криз","Враження людини, що не боїться змін"],"m":["Різкість і конфлікти","Руйнування того, що могло б жити","Хаос навколо"],"d":["Змінюйте поступово, де можна","Будуйте, а не лише ламайте"]},"17":{"p":["Світло й натхнення — з вами вірять у краще","Творчість і власний стиль","Враження людини з мрією"],"m":["Мрії без дій","Залежність від захоплення інших","Відчуття власної винятковості"],"d":["Перетворюйте мрію на кроки","Показуйте свою творчість світу"]},"18":{"p":["Чуйність і тонкість — ви відчуваєте людей","Багата уява й інтуїція","Враження загадкової людини"],"m":["Тривожність і страхи","Недомовленість, ілюзії","Перепади настрою"],"d":["Перевіряйте страхи фактами","Говоріть прямо, а не натяками"]},"19":{"p":["Тепло й щедрість — з вами сонячно","Впевненість, легкість бути в центрі уваги","Враження успішної людини"],"m":["Гординя й потреба захоплення","Потреба завжди бути першим","Вигорання від вічного сяяння"],"d":["Діліться успіхом і похвалою","Дозволяйте собі бути не в центрі"]},"20":{"p":["Повага до коріння й сім’ї","Уміння прощати й об’єднувати рід","Враження надійної людини"],"m":["Осуд і претензії до рідних","Застрягання в минулих образах","Глухота до порад"],"d":["Прийміть батьків такими, як є","Будуйте свої традиції"]},"21":{"p":["Відкритість світу, спільна мова з різними людьми","Масштабне бачення","Враження людини без кордонів"],"m":["Розпорошення й непостійність","Тиск на інших, щоб «все було правильно»","Відчуття, що ніде не свій"],"d":["Оберіть одну справу як дім","Подорожуйте, вчіться, розширюйте світ"]},"22":{"p":["Свобода й легкість — з вами весело","Нестандартне мислення","Враження людини без рамок"],"m":["Інфантильність і безвідповідальність","Хаос, утеча від зобов’язань","Враження несерйозності"],"d":["Беріть відповідальність хоча б за одну сферу","Свобода — це вибір, а не втеча"]}},"tal":{"1":{"p":["Запускати нове з нуля","Переконувати словом, продавати, навчати","Швидко освоювати навички"],"m":["Розпорошення на десятки проєктів","Маніпуляції замість переконання","Таланти без результату"],"d":["Оберіть одну справу і доведіть до продукту","Виступайте, пишіть, навчайте інших"]},"2":{"p":["Аналізувати й бачити суть","Інтуїція, що підказує правильні рішення","Працювати з інформацією, таємницями, знаннями"],"m":["Недовіра до власної інтуїції","Знання, якими ви ні з ким не ділитеся","Відчуття «ще не час», що гальмує"],"d":["Ведіть щоденник інтуїтивних рішень","Навчайте — це відкриває дар"]},"3":{"p":["Створювати красу, затишок і достаток","Творчість, дизайн, догляд","Вирощувати: людей, проєкти, рослини"],"m":["Лінощі й чекання натхнення","Знецінення своєї творчості","Опіка замість справи"],"d":["Перетворіть хобі на продукт","Творіть регулярно, а не за настроєм"]},"4":{"p":["Організовувати й керувати","Будувати системи й структури","Брати відповідальність за результат"],"m":["Контроль, через який команда не росте","Страх делегувати","Трудоголізм замість лідерства"],"d":["Будуйте процеси, а не лише керуйте людьми","Вчіться делегувати"]},"5":{"p":["Навчати, пояснювати складне","Наставництво, коучинг, консультування","Зберігати й передавати традиції"],"m":["Догматизм і повчання","Знання без практики","Страх вийти за рамки системи"],"d":["Створіть курс, методику чи наставницьку програму","Вчіться в наставника самі"]},"6":{"p":["Комунікація, переговори, робота з людьми","Естетичне чуття","Вміння бачити найкраще в інших"],"m":["Сумнів у виборі професії","Залежність від чужої думки","Робота «не по любові»"],"d":["Обирайте справу серцем","Працюйте в парі чи команді"]},"7":{"p":["Досягати цілей і вести за собою","Логістика, подорожі, рух","Спорт, змагання, проєкти з дедлайнами"],"m":["Вигорання від гонки","Талант без напрямку","Агресія в команді"],"d":["Ставте конкретні цілі на квартал","Чергуйте ривок і відпочинок"]},"8":{"p":["Аналітика, право, фінанси","Чесна оцінка й експертиза","Вміння збалансувати інтереси"],"m":["Критичність, що гасить ідеї","Страх помилитися","Перфекціонізм"],"d":["Застосовуйте точність у справі — юридичній, фінансовій, аналітичній","Дозволяйте собі чернетки"]},"9":{"p":["Глибока експертиза","Дослідження, психологія, філософія","Уміння бачити суть і давати мудрі поради"],"m":["Талант у шухляді","Самоізоляція","Песимізм щодо власних можливостей"],"d":["Пишіть, консультуйте, діліться висновками","Знайдіть свою нішу експерта"]},"10":{"p":["Відчуття тренду й моменту","Підприємництво, продажі, нові ринки","Вміння швидко перебудуватися"],"m":["Непослідовність","Кидаєте, коли стає рутинно","Ставка лише на удачу"],"d":["Ловіть хвилю, але фіксуйте процеси","Ведіть облік успішних рішень"]},"11":{"p":["Витримка й лідерство в кризах","Спорт, тілесні практики, робота з енергією","Надихати силою прикладу"],"m":["Сила на боротьбу, а не на справу","Перевтома","Контроль над людьми"],"d":["Займіться тілесною практикою як професією або хобі","Підтримуйте слабших"]},"12":{"p":["Нестандартне бачення, творчість","Допомога, служіння, психологія","Терпіння до довгих проєктів"],"m":["Жертовність і робота за копійки","Пасивність","Таланти «для інших», а не для себе"],"d":["Цінуйте свій дар грошима","Шукайте незвичний кут зору як перевагу"]},"13":{"p":["Трансформувати: кризи, бізнеси, людей","Робота з глибокими темами","Оптимізація й очищення від зайвого"],"m":["Руйнування замість перетворення","Страх нового етапу","Похмурість"],"d":["Беріться за проєкти «з нуля після кризи»","Завершуйте старе, щоб звільнити місце"]},"14":{"p":["Поєднувати непоєднуване","Терапія, кулінарія, дизайн, баланс","Мистецтво дипломатії"],"m":["Повільність і нерішучість","Уникнення будь-якого ризику","Сіра середина"],"d":["Створюйте гармонійні простори й рішення","Додайте в справу сміливості"]},"15":{"p":["Харизма, продажі, вплив","Робота з грошима, сексуальністю, енергією","Сміливість у бізнесі"],"m":["Маніпуляції","Залежність від результату й похвали","Талант заради влади"],"d":["Використовуйте вплив чесно","Продавайте те, у що вірите"]},"16":{"p":["Будувати нове на руїнах","Антикризове управління","Сміливі рішення, реформи"],"m":["Руйнування стабільного","Конфлікти","Страх будувати знову"],"d":["Ставайте тим, хто відбудовує","Плануйте на крок уперед"]},"17":{"p":["Творчість, мистецтво, краса","Надихати й бути прикладом","Бачити майбутнє"],"m":["Мрії без втілення","Залежність від оцінки","Нереалізований талант"],"d":["Публікуйте творчість","Робіть маленькі кроки до мрії щодня"]},"18":{"p":["Інтуїція, уява, творчість","Робота з підсвідомим, образами","Мистецтво, кіно, психологія"],"m":["Страхи заважають проявитися","Ілюзії щодо справи","Відкладання"],"d":["Творіть з образів, снів, відчуттів","Перевіряйте ідеї реальністю"]},"19":{"p":["Лідерство й публічність","Надихати, бути на сцені","Організувати свято, подію, бренд"],"m":["Гординя","Зневага до рутини","Вигорання від постійного сяяння"],"d":["Виходьте на публіку — виступи, блог","Діліться успіхом з командою"]},"20":{"p":["Робота з родом і сім’єю","Освіта, історія, генеалогія","Об’єднувати людей"],"m":["Застрягання в минулому","Осуд","Небажання слухати нове"],"d":["Працюйте з людьми різних поколінь","Відновлюйте зв’язки й традиції"]},"21":{"p":["Масштаб, міжнародні проєкти","Мови, подорожі, культура","Бачити світ цілісно"],"m":["Розпорошення","Невміння закінчити","Тиск на інших"],"d":["Беріть проєкти з міжнародним виміром","Завершуйте, перш ніж розширюватися"]},"22":{"p":["Нестандартні ідеї, креатив","Свобода, гра, робота з дітьми","Легкість у нових починаннях"],"m":["Інфантильність, «колись потім»","Ризик без розрахунку","Хаос"],"d":["Структуруйте свою свободу","Перетворіть гру на продукт"]}},"money":{"1":{"p":["Гроші через ініціативу й власні проєкти","Дохід від комунікації: продажі, навчання, переговори","Швидкі рішення, що приносять прибуток"],"m":["Безліч стартів без прибутку","Гроші «приходять і йдуть»","Простій у справах перекриває потік"],"d":["Запускайте продукт, а не лише ідею","Рахуйте прибуток кожного проєкту"]},"2":{"p":["Гроші через знання, аналітику й експертизу","Інтуїтивно правильні фінансові рішення","Стабільний дохід від закритої, тихої роботи"],"m":["Сором брати гроші за знання","Пасивне чекання","Таємниці й недомовленості щодо фінансів"],"d":["Встановіть ціну на свою експертизу","Довіряйте інтуїції у фінансових рішеннях"]},"3":{"p":["Гроші через красу, затишок, творчість","Дохід, що росте, як урожай","Уміння примножувати ресурс"],"m":["Марнотратство «на настрій»","Залежність від того, хто забезпечує","Лінощі заробляти"],"d":["Інвестуйте в красу як у справу","Ведіть бюджет на задоволення"]},"4":{"p":["Гроші через управління й відповідальність","Стабільний дохід, кар’єра, власний бізнес","Чіткий фінансовий план"],"m":["Жорсткий контроль кожної гривні","Страх ризикувати","Трудоголізм без радості від грошей"],"d":["Будуйте систему доходу, а не лише працюйте","Дозвольте собі витрачати на себе"]},"5":{"p":["Гроші через навчання й наставництво","Дохід у системі: державній, освітній, великій компанії","Чесні, «правильні» гроші"],"m":["Переконання, що багатство — це погано","Дохід лише «за правилами»","Страх продавати"],"d":["Монетизуйте досвід: курси, консультації","Перегляньте родові установки про гроші"]},"6":{"p":["Гроші через людей і партнерства","Дохід від справи, яку любите","Вміння домовитися про вигідні умови"],"m":["Залежність доходу від схвалення","Нерішучість у фінансових питаннях","Робота «не по любові» і втрата сил"],"d":["Обирайте справу, яка подобається","Домовляйтеся про ціну до початку роботи"]},"7":{"p":["Гроші через рух, швидкість, цілі","Дохід від проєктів із дедлайнами, логістики, подорожей","Кар’єрний ривок"],"m":["Гонка за грошима до вигорання","Агресивні рішення","Гроші, що йдуть так само швидко, як приходять"],"d":["Ставте фінансові цілі на рік","Залишайте подушку безпеки"]},"8":{"p":["Гроші через порядок і чесність","Дохід від права, фінансів, аналітики","Баланс доходів і витрат"],"m":["Страх помилитися блокує рішення","Скупість","Судові й фінансові конфлікти"],"d":["Укладайте чесні договори","Ведіть облік — він дає спокій"]},"9":{"p":["Гроші через експертизу й глибину","Дохід від консультацій, досліджень, авторських продуктів","Розумна економність"],"m":["Ізоляція від ринку","Аскетизм, «мені багато не треба»","Недооцінювання своєї праці"],"d":["Пакуйте знання в продукт","Підніміть ціну — ваша експертиза варта більшого"]},"10":{"p":["Гроші через удачу й правильний момент","Дохід від торгівлі, нових ринків, змін","Швидке зростання"],"m":["Нестабільний дохід","Азарт і ставки на удачу","Хаос у фінансах"],"d":["Закріплюйте вдалі періоди заощадженнями","Ведіть фінансовий план на сезон"]},"11":{"p":["Гроші через силу й витримку","Дохід від спорту, тілесних практик, лідерства","Уміння вистояти в кризу"],"m":["Заробіток через надзусилля","Контроль і тиск у грошових питаннях","Перевтома заради грошей"],"d":["Шукайте дохід, що не виснажує","Делегуйте частину роботи"]},"12":{"p":["Гроші через нестандартні рішення","Дохід від творчості, допомоги, служіння","Терпляче накопичення"],"m":["Робота за копійки або безкоштовно","Жертвування власними інтересами","Затримки й заморожені гроші"],"d":["Цінуйте свій час грошима","Виходьте з ситуацій, де вас не цінують"]},"13":{"p":["Гроші через трансформацію й завершення","Дохід після кардинальних змін","Звільнення від того, що забирає ресурс"],"m":["Різкі втрати","Страх змін тримає в безгрошів’ї","Руйнування стабільного"],"d":["Завершіть те, що не приносить доходу","Шукайте ресурс у нових форматах"]},"14":{"p":["Гроші через баланс і гармонію","Дохід від терапії, кулінарії, дизайну","Помірність без нестачі"],"m":["Повільність","«Середні» гроші через страх ризику","Розпорошення на дрібниці"],"d":["Поєднуйте кілька джерел доходу","Додайте сміливості в ціни"]},"15":{"p":["Великі гроші через харизму й вплив","Дохід від продажів, бізнесу, розваг","Сміливість заробляти багато"],"m":["Залежність від грошей","Кредити й борги","Нечесні схеми"],"d":["Заробляйте чесно — тоді гроші залишаються","Тримайте витрати під контролем"]},"16":{"p":["Гроші через відбудову й реформи","Дохід від антикризових рішень","Новий старт після падіння"],"m":["Раптові втрати","Імпульсивні рішення","Будування на піску"],"d":["Майте фінансову подушку","Будуйте поступово, на міцному фундаменті"]},"17":{"p":["Гроші через творчість і натхнення","Дохід від мистецтва, краси, бренду","Притягувати ресурс своїм світлом"],"m":["Незатребуваність таланту","Невміння продати себе","Мрії про гроші без дій"],"d":["Покажіть свою творчість ринку","Визначте ціну й тримайтеся її"]},"18":{"p":["Гроші через інтуїцію й творчість","Дохід від кіно, психології, мистецтва","Тонке відчуття ринку"],"m":["Страх грошей і бідності","Ілюзії, обман, сумнівні угоди","Нестабільність"],"d":["Перевіряйте угоди документами","Працюйте зі страхом нестачі"]},"19":{"p":["Гроші через публічність і лідерство","Дохід від виступів, бренду, свят","Щедрість, яка повертається"],"m":["Марнотратство на показ","Гординя в грошових питаннях","Вигорання"],"d":["Будуйте особистий бренд","Діліться частиною доходу"]},"20":{"p":["Гроші через рід і сімейну справу","Дохід від освіти, історії, роботи з поколіннями","Спадок і підтримка роду"],"m":["Родові установки про бідність","Залежність від рідних","Конфлікти за спадок"],"d":["Перегляньте, як ставилися до грошей у вашій сім’ї","Будуйте власний капітал"]},"21":{"p":["Гроші через масштаб і світ","Дохід від міжнародних проєктів, подорожей, мов","Багато джерел доходу"],"m":["Розпорошення","Ліміти, що здаються непереборними","Гроші, що «застрягають»"],"d":["Виходьте на ширший ринок","Завершуйте фінансові цикли"]},"22":{"p":["Гроші через свободу й креатив","Дохід від нестандартних ідей, фрилансу","Легкість у грошах"],"m":["Безвідповідальність у фінансах","Ризики без розрахунку","Гроші «на вітер»"],"d":["Ведіть простий облік","Плануйте хоча б на місяць уперед"]}},"love":{"1":{"p":["Стосунки як спільна гра й рух","Легке спілкування, інтелектуальна іскра","Ініціатива в коханні"],"m":["Маніпуляції словами","Нудьга й пошук нових вражень","Поверховість почуттів"],"d":["Створюйте спільні проєкти","Говоріть про почуття так само сміливо, як про ідеї"]},"2":{"p":["Глибока душевна близькість","Інтуїтивне розуміння партнера","Вірність і таємниця на двох"],"m":["Холодність і дистанція","Недовіра, ревнощі","Мовчання замість розмови"],"d":["Діліться думками, навіть коли незручно","Довіряйте — і перевіряйте розмовою, а не підозрою"]},"3":{"p":["Тепло, турбота, дім","Чуттєвість і насолода разом","Бажання створити сім’ю"],"m":["Гіперопіка або ревнощі","Лінощі в стосунках","Залежність від партнера"],"d":["Турбуйтеся, не контролюючи","Дбайте і про себе в парі"]},"4":{"p":["Надійність і захист","Стабільний союз, спільні плани","Відповідальність за сім’ю"],"m":["Контроль і владність","Холодність, «головне — забезпечити»","Боротьба за головування"],"d":["Домовляйтеся, а не наказуйте","Показуйте почуття, не лише турботу"]},"5":{"p":["Союз на спільних цінностях","Повага й вірність","Сім’я як традиція"],"m":["Моралізаторство","«Правильні» стосунки без почуттів","Ригідність ролей"],"d":["Шукайте спільне в цінностях","Залишайте місце почуттям, а не лише правилам"]},"6":{"p":["Кохання й вибір серцем","Гармонія, романтика","Рівність у парі"],"m":["Нерішучість у виборі партнера","Любовні трикутники","Залежність від схвалення"],"d":["Обирайте серцем і тримайте вибір","Говоріть про свої потреби"]},"7":{"p":["Спільний рух і цілі","Подорожі, пригоди","Партнер — команда"],"m":["Суперництво в парі","Нетерплячість","Відсутність часу на близькість"],"d":["Плануйте час удвох як ціль","Рухайтеся поруч, а не наввипередки"]},"8":{"p":["Чесність і рівність","Чіткі домовленості","Справедливий розподіл обов’язків"],"m":["Холодний розрахунок","Претензії й «рахунок»","Образи за несправедливість"],"d":["Обговорюйте правила спокійно","Додайте тепла до справедливості"]},"9":{"p":["Глибина й духовна близькість","Повага до простору одне одного","Мудрість у кризах"],"m":["Самотність навіть у парі","Відстороненість","Страх близькості"],"d":["Відкривайтеся поступово","Створюйте спільні ритуали тиші й розмов"]},"10":{"p":["Легкість і доля в зустрічах","Зміни, що оновлюють стосунки","Спонтанність"],"m":["Нестабільність, «то разом, то окремо»","Повторення тих самих сварок","Залежність від обставин"],"d":["Будуйте стабільні ритуали","Вчіться на повторах, а не повторюйте"]},"11":{"p":["Пристрасть і сила почуттів","Захист і підтримка","Сміливість у коханні"],"m":["Боротьба за владу","Ревнощі й контроль","Агресія у сварках"],"d":["Спрямовуйте пристрасть у спільне","Вчіться м’якості"]},"12":{"p":["Відданість і жертовність заради любові","Терпіння","Незвичайні, глибокі стосунки"],"m":["Жертва в стосунках","Залежність, «без нього (неї) я ніхто»","Очікування, що партнер зміниться"],"d":["Не жертвуйте собою заради пари","Ставте свої межі"]},"13":{"p":["Глибока трансформація через стосунки","Нові початки після криз","Пристрасть"],"m":["Різкі розриви","Страх втрати","Руйнування близькості"],"d":["Відпускайте те, що віджило, з вдячністю","Не рубайте з плеча"]},"14":{"p":["Гармонія й баланс","Терпіння й лагідність","Союз як мистецтво"],"m":["Нудьга, усе «рівно»","Уникнення конфліктів","Притлумлені почуття"],"d":["Додайте пристрасті й сюрпризів","Говоріть про невдоволення вчасно"]},"15":{"p":["Пристрасть і притягання","Сексуальність","Сміливість бажань"],"m":["Залежні стосунки","Маніпуляції","Ревнощі й контроль"],"d":["Помічайте, де пристрасть стає залежністю","Будьте чесні щодо бажань"]},"16":{"p":["Стосунки, що звільняють від старого","Відродження після кризи","Щирість"],"m":["Конфлікти й руйнування","Раптові розриви","Вибухові сварки"],"d":["Вирішуйте конфлікти до вибуху","Будуйте довіру поступово"]},"17":{"p":["Натхнення й мрія на двох","Ніжність, творчість","Віра в партнера"],"m":["Ідеалізація партнера","Розчарування","Стосунки на відстані без глибини"],"d":["Бачте реальну людину, а не образ","Мрійте разом і втілюйте"]},"18":{"p":["Тонке відчуття партнера","Романтика й таємниця","Емоційна глибина"],"m":["Ілюзії й обман","Ревнощі, підозри","Страх бути покинутим"],"d":["Перевіряйте страхи розмовою","Будьте прямими"]},"19":{"p":["Радість, тепло, щирість","Сім’я, діти, свята","Відкриті почуття"],"m":["Егоїзм, «я в центрі»","Потреба захоплення","Конкуренція в парі"],"d":["Даруйте увагу партнеру","Святкуйте маленькі перемоги разом"]},"20":{"p":["Сімейність і повага до рідних","Прощення","Союз, що поєднує роди"],"m":["Втручання рідні","Осуд і претензії","Повторення сценаріїв батьків"],"d":["Будуйте власні правила пари","Прощайте й рухайтеся далі"]},"21":{"p":["Широкий світ на двох","Свобода й довіра","Партнер з іншої культури чи країни"],"m":["Розпорошення почуттів","Неможливість бути разом через обставини","Відчуття обмеженості"],"d":["Давайте одне одному простір","Мандруйте й пізнавайте світ разом"]},"22":{"p":["Легкість, гра, свобода","Спонтанність","Дружба в коханні"],"m":["Безвідповідальність","Страх зобов’язань","Інфантильність"],"d":["Беріть на себе частину відповідальності","Свобода в парі — це довіра, а не втеча"]}},"karma":{"1":{"p":["Уміння впливати словом і починати з нуля","Кмітливість і швидке навчання","Дар переконання"],"m":["Маніпуляції й обман, щоб отримати своє","Кидання справ на півдорозі","Нерозкритий потенціал «я все можу, але потім»"],"d":["Говоріть правду, навіть коли незручно","Доводьте розпочате до кінця"]},"2":{"p":["Глибокі знання й інтуїція","Уміння зберігати таємниці","Зв’язок із невидимим"],"m":["Приховування знань і себе","Самотність, недовіра","Застрягання в аналізі без дій"],"d":["Діліться знаннями відкрито","Дозвольте собі бути поміченим"]},"3":{"p":["Уміння створювати достаток і красу","Материнська сила, турбота","Плідність у всьому"],"m":["Залежність від комфорту й опіки","Сценарії, пов’язані з дітьми, вагітністю, тілом","Марнотратство"],"d":["Цінуйте свою жіночність або турботливість без надмірної опіки","Творіть і дбайте про тіло"]},"4":{"p":["Досвід влади й управління","Уміння організувати й захистити","Сила волі"],"m":["Деспотизм, контроль, «я знаю, як краще»","Конфлікти з батьком або авторитетами","Втрата влади й страх її"],"d":["Будьте лідером, що служить людям","Помиріться з образом батька"]},"5":{"p":["Знання традицій і порядку","Досвід наставника, священнослужителя","Вірність принципам"],"m":["Догматизм, фанатизм","Нав’язування своїх правил","Розчарування у вчителях"],"d":["Шукайте власну віру, а не чужі правила","Навчайте без примусу"]},"6":{"p":["Досвід любові й вибору","Уміння бачити красу","Дипломатія"],"m":["Повторювані любовні трикутники","Неможливість зробити вибір","Зради й розчарування"],"d":["Робіть вибір серцем і тримайте його","Будьте вірні собі"]},"7":{"p":["Досвід воїна, мандрівника, лідера","Цілеспрямованість","Сміливість"],"m":["Життя «з бою», постійна боротьба","Агресія й травматизм","Втеча від проблем у рух"],"d":["Перетворіть боротьбу на служіння","Ставте мирні цілі"]},"8":{"p":["Досвід судді, правника","Почуття справедливості","Уміння зважити все"],"m":["Суди, конфлікти через справедливість","Осуд себе й інших","Відчуття, що світ несправедливий"],"d":["Будьте справедливі без жорстокості","Прощайте себе за помилки"]},"9":{"p":["Досвід мудреця, самітника, вченого","Глибина й самодостатність","Внутрішня тиша"],"m":["Самотність і замкнутість","Песимізм","Відмова від світу й радості"],"d":["Виходьте до людей і діліться мудрістю","Дозвольте собі прості радощі"]},"10":{"p":["Досвід змін і випадку","Уміння ловити шанс","Гнучкість"],"m":["Життя як рулетка: злети й падіння","Безвідповідальність, «доля так вирішила»","Нестабільність"],"d":["Беріть відповідальність за свій вибір","Будуйте опору, а не чекайте удачі"]},"11":{"p":["Велика внутрішня сила","Витривалість","Уміння приборкати стихію"],"m":["Боротьба на межі сил","Гнів і жорсткість","Надзусилля без результату"],"d":["Використовуйте силу м’яко","Відпочивайте до виснаження, а не після"]},"12":{"p":["Досвід служіння й жертви","Нестандартне бачення","Терпіння"],"m":["Роль жертви, що повторюється","Залежності","Відчуття «мене не цінують»"],"d":["Допомагайте, не жертвуючи собою","Виходьте з ролі рятівника"]},"13":{"p":["Досвід трансформації й кінців","Сміливість починати заново","Глибина"],"m":["Страх змін і втрат","Руйнування, різкі розриви","Застрягання в минулому"],"d":["Відпускайте свідомо","Приймайте зміни як частину шляху"]},"14":{"p":["Досвід цілителя, гармонізатора","Терпіння","Чуття міри"],"m":["Залежності від їжі, алкоголю, задоволень","Повільність, «колись потім»","Втрата балансу"],"d":["Шукайте свою міру в усьому","Піклуйтеся про тіло й емоції"]},"15":{"p":["Досвід влади над людьми й ресурсами","Харизма","Сміливість бажати"],"m":["Залежності: від людей, грошей, задоволень","Маніпуляції","Спокуси, що руйнують"],"d":["Помічайте свої залежності чесно","Використовуйте вплив на добро"]},"16":{"p":["Досвід будівника й реформатора","Сміливість","Здатність відновлюватися"],"m":["Руйнування збудованого","Раптові кризи","Гординя, що веде до падіння"],"d":["Будуйте на міцному фундаменті","Будьте скромнішими в успіху"]},"17":{"p":["Досвід творця й митця","Віра в краще","Талант надихати"],"m":["Розчарування, втрачена надія","Нереалізований талант","Залежність від захоплення"],"d":["Творіть і показуйте творчість світу","Тримайте віру в чорні дні"]},"18":{"p":["Досвід містика, чарівника","Сильна інтуїція","Уява"],"m":["Страхи без пояснення","Ілюзії й самообман","Обман з боку інших"],"d":["Перевіряйте страхи реальністю","Розвивайте інтуїцію свідомо"]},"19":{"p":["Досвід лідера й улюбленця","Щедрість","Сила радіти"],"m":["Гординя, марнославство","Потреба бути в центрі","Вигорання"],"d":["Світіть для інших, а не лише для себе","Будьте скромнішими"]},"20":{"p":["Досвід роду й родової сили","Мудрість поколінь","Уміння прощати"],"m":["Конфлікти з рідними","Родові сценарії, що повторюються","Осуд"],"d":["Прийміть свій рід","Пропрацюйте образи на батьків"]},"21":{"p":["Досвід мандрівника й дипломата","Широта поглядів","Уміння жити без кордонів"],"m":["Відчуття несвободи, обмежень","Утеча від проблем","Неможливість осісти"],"d":["Знайдіть свободу всередині","Завершуйте розпочате"]},"22":{"p":["Досвід вільної людини","Легкість","Нестандартність"],"m":["Безвідповідальність, утеча","Залежності","Хаос і втрата себе"],"d":["Беріть відповідальність за своє життя","Будуйте структуру у свободі"]}},"rod":{"1":{"p":["Рід передає кмітливість і вміння починати","Підприємницька жилка","Сила слова"],"m":["Обман і маніпуляції в роду","Нереалізовані таланти предків","Непостійність"],"d":["Реалізуйте те, що не встигли предки","Тримайте слово"]},"2":{"p":["Рід передає інтуїцію й мудрість","Знання, що передаються пошепки","Сильні жінки роду"],"m":["Родові таємниці","Замовчування","Недовіра"],"d":["Дізнайтеся історію роду","Говоріть про те, про що мовчали"]},"3":{"p":["Рід передає плідність і достаток","Затишок і традиції дому","Материнська сила"],"m":["Сценарії з дітьми й вагітністю","Залежність від чоловіка або родини","Надмірна опіка"],"d":["Цінуйте жіночу лінію роду","Створюйте свій затишок"]},"4":{"p":["Рід передає силу й порядок","Уміння будувати й володіти","Сильні чоловіки роду"],"m":["Деспотизм і контроль у сім’ї","Конфлікти з батьком","Холодність"],"d":["Прийміть силу батьківської лінії","Будуйте без тиску"]},"5":{"p":["Рід передає цінності й традиції","Освіченість, віра","Повагу до старших"],"m":["Жорсткі правила й догми","«Так у нас заведено»","Осуд"],"d":["Беріть із традицій живе","Відпускайте те, що не підходить вам"]},"6":{"p":["Рід передає вміння любити","Красу, естетику","Дипломатію"],"m":["Зради й трикутники в роду","Шлюби без любові","Нерішучість"],"d":["Обирайте партнера серцем","Не повторюйте чужих сценаріїв любові"]},"7":{"p":["Рід передає цілеспрямованість","Воїнську силу","Рух і переїзди"],"m":["Війни, втрати, боротьба","Агресія","Роз’єднаність родини"],"d":["Шануйте тих, хто боровся","Обирайте мирний шлях"]},"8":{"p":["Рід передає порядність і справедливість","Повагу до закону","Баланс"],"m":["Суди, спадкові конфлікти","Несправедливість щодо когось у роду","Жорсткість"],"d":["Відновлюйте справедливість у малому","Не судіть предків"]},"9":{"p":["Рід передає мудрість","Глибину й самостійність","Інтелект"],"m":["Самотні долі в роду","Відчуженість","Бідність через відмову від світу"],"d":["Беріть мудрість, а не самотність","Будуйте близькі зв’язки"]},"10":{"p":["Рід передає удачу","Гнучкість","Уміння пристосовуватися"],"m":["Злети й падіння","Втрата статків","Азарт"],"d":["Створюйте стабільність для наступних поколінь","Ставтеся до удачі відповідально"]},"11":{"p":["Рід передає силу й витривалість","Працьовитість","Здоров’я"],"m":["Насильство, жорсткість","Важка праця без радості","Гнів"],"d":["Беріть силу без жорстокості","Дбайте про тіло"]},"12":{"p":["Рід передає терпіння й служіння","Нестандартність","Духовність"],"m":["Жертовні долі","Залежності","Втрати й обмеження"],"d":["Не повторюйте жертву","Цінуйте себе"]},"13":{"p":["Рід передає здатність відроджуватися","Глибину","Сміливість змін"],"m":["Ранні втрати в роду","Страх смерті й змін","Руйнування"],"d":["Шануйте пам’ять без страху","Приймайте зміни"]},"14":{"p":["Рід передає баланс і цілительство","Гармонію","Терпіння"],"m":["Залежності в роду","Хвороби","Втрата міри"],"d":["Звертайте увагу на родові звички","Тримайте баланс"]},"15":{"p":["Рід передає енергію й харизму","Уміння заробляти","Пристрасть"],"m":["Залежності й пороки","Гроші, що руйнують","Маніпуляції"],"d":["Розірвіть ланцюг залежностей","Використовуйте енергію роду в справі"]},"16":{"p":["Рід передає здатність відбудовуватися","Сміливість","Силу почати з нуля"],"m":["Втрати дому, статків","Раптові катастрофи","Гординя"],"d":["Будуйте міцний фундамент","Цінуйте те, що маєте"]},"17":{"p":["Рід передає творчість і таланти","Віру в краще","Красу"],"m":["Нереалізовані таланти","Розчарування","Мрії без дій"],"d":["Реалізуйте таланти роду","Тримайте надію"]},"18":{"p":["Рід передає інтуїцію й чуттєвість","Уяву","Містичні здібності"],"m":["Страхи й тривоги в роду","Ілюзії, обман","Таємниці"],"d":["Говоріть про страхи роду","Відділяйте свої страхи від чужих"]},"19":{"p":["Рід передає радість і щедрість","Лідерство","Здоров’я дітей"],"m":["Гординя","Марнославство","Вигорання"],"d":["Даруйте тепло рідним","Діліться успіхом"]},"20":{"p":["Рід передає силу родових зв’язків","Мудрість поколінь","Підтримку"],"m":["Осуд і розриви в родині","Неприйняття батьків","Повторення сценаріїв"],"d":["Прийміть батьків","Відновлюйте зв’язки"]},"21":{"p":["Рід передає широту й свободу","Зв’язки з різними країнами","Дипломатію"],"m":["Еміграція й втрата коріння","Обмеження, несвобода","Розпорошеність родини"],"d":["Знайдіть своє коріння","Будуйте свій дім"]},"22":{"p":["Рід передає легкість і свободу","Креативність","Відкритість"],"m":["Безвідповідальність у роду","Утечі, покинуті діти","Хаос"],"d":["Будьте відповідальними там, де предки тікали","Зберігайте свободу без утечі"]}},"health":{"1":{"p":["Енергія від нових справ і спілкування","Легкість у тілі, коли є рух","Серце відкрите до людей"],"m":["Нервове виснаження","Розпорошення сил","Напруга від невиконаних обіцянок"],"d":["Чергуйте розмови й тишу","Доводьте справи до кінця — це знімає напругу"]},"2":{"p":["Енергія від тиші й самоти","Тонке відчуття тіла","Спокійне серце"],"m":["Пригнічені емоції","Гормональні й циклічні збої","Тривога, яку не проговорено"],"d":["Висипайтеся й слухайте тіло","Проговорюйте почуття"]},"3":{"p":["Енергія від краси й задоволень","Тілесна радість","Відкрите, любляче серце"],"m":["Переїдання, лінощі","Застій у тілі","Ображене серце, коли не цінують"],"d":["Рухайтеся з радістю: танці, прогулянки","Дозволяйте собі задоволення в міру"]},"4":{"p":["Енергія від порядку й контролю над своїм днем","Сильне тіло","Стабільність"],"m":["Напруга в спині й серці","Тиск, перевантаження","Стримані почуття"],"d":["Відпочивайте за розкладом","Дозволяйте собі слабкість"]},"5":{"p":["Енергія від навчання й сенсу","Спокій у звичному ритмі","Довіра до себе"],"m":["Ригідність, затиски","Напруга від «треба»","Осуд себе"],"d":["Шукайте сенс у щоденних справах","Відпускайте суворі правила"]},"6":{"p":["Енергія від любові й краси","Легкість, коли є гармонія","Тепле серце"],"m":["Сумніви, що виснажують","Емоційні гойдалки","Залежність настрою від інших"],"d":["Робіть вибір і відпускайте сумнів","Дбайте про себе, а не лише про стосунки"]},"7":{"p":["Енергія від руху й цілей","Витривалість","Сміливе серце"],"m":["Перегони до виснаження","Травми від поспіху","Агресія"],"d":["Плануйте відновлення","Спорт без змагання з собою"]},"8":{"p":["Енергія від балансу й порядку","Рівний ритм","Чисте сумління"],"m":["Напруга від несправедливості","Самокритика","Затиски"],"d":["Тримайте баланс роботи й відпочинку","Прощайте себе"]},"9":{"p":["Енергія від тиші й самоти","Глибокий відпочинок","Мудре серце"],"m":["Апатія, ізоляція","Застій","Самотність, що виснажує"],"d":["Ходіть на прогулянки на самоті","Не закривайтеся від близьких"]},"10":{"p":["Енергія від змін і нового","Гнучкість тіла","Легкість"],"m":["Нестабільний режим","Перепади енергії","Тривога через невизначеність"],"d":["Тримайте базовий режим","Додавайте нове поступово"]},"11":{"p":["Велика фізична сила","Витривалість","Пристрасне серце"],"m":["Перевтома","Гнів, що б’є по серцю","Напруга в м’язах"],"d":["Фізичні навантаження з відновленням","Випускайте гнів у рух"]},"12":{"p":["Енергія від творчості й нестандартного погляду","Чутливість","Співчуття"],"m":["Виснаження від жертовності","Застій","Залежності"],"d":["Робіть паузи для себе","Знімайте застій рухом і зміною обстановки"]},"13":{"p":["Енергія від оновлення","Здатність відновлюватися","Глибина почуттів"],"m":["Застаріле, що тягне сили","Важкі емоції","Страх змін у тілі"],"d":["Очищайте простір і графік","Проживайте емоції, а не тримайте"]},"14":{"p":["Енергія від балансу","Гармонія тіла й душі","Спокійне серце"],"m":["Залежності від їжі чи напоїв","Втрата міри","Повільність"],"d":["Шукайте свою міру","Дихальні практики й чиста вода"]},"15":{"p":["Енергія від пристрасті й бажань","Сильна сексуальна енергія","Яскраве серце"],"m":["Залежності","Надмірності","Енергія, що злітає й падає"],"d":["Помічайте свої залежності","Спрямовуйте пристрасть у справу"]},"16":{"p":["Енергія від змін і звільнення","Швидке відновлення","Сміливе серце"],"m":["Різкі стреси","Травми","Вибухи емоцій"],"d":["Знижуйте рівень стресу заздалегідь","Будьте обережні в ризикових ситуаціях"]},"17":{"p":["Енергія від творчості й краси","Легкість","Надія"],"m":["Розчарування, що виснажує","Втома від нереалізованості","Залежність від оцінки"],"d":["Творіть щодня хоча б трохи","Оточуйте себе красою"]},"18":{"p":["Енергія від уяви й снів","Чуттєвість","Глибокі емоції"],"m":["Тривоги й страхи","Порушення сну","Емоційна нестабільність"],"d":["Тримайте режим сну","Проговорюйте тривоги"]},"19":{"p":["Енергія від радості й сонця","Здоров’я","Тепле, щедре серце"],"m":["Вигорання","Перегрів, надмірність","Гординя, що віддаляє"],"d":["Відпочивайте на сонці й природі","Не тягніть усе на собі"]},"20":{"p":["Енергія від роду й сім’ї","Підтримка близьких","Серце, що прощає"],"m":["Образи на рідних, що тиснуть","Родові слабкі місця","Втома від обов’язку"],"d":["Прощайте рідних","Дізнайтеся сімейну історію здоров’я"]},"21":{"p":["Енергія від подорожей і нового","Гармонія з світом","Відкрите серце"],"m":["Відчуття обмеженості","Втома від хаосу","Розпорошення"],"d":["Мандруйте, змінюйте обстановку","Завершуйте справи"]},"22":{"p":["Енергія від свободи й гри","Легкість","Молоде серце"],"m":["Хаотичний режим","Безпечність щодо тіла","Залежності"],"d":["Тримайте мінімальний режим","Грайте й рухайтеся"]}},"pur":{"1":{"p":["Бути ініціатором, запускати нове","Ділитися знаннями й навчати","Показувати, що почати можна вже"],"m":["Сотні ідей без втілення","Маніпуляції замість впливу","Страх почати"],"d":["Почніть свою справу або проєкт","Навчайте тому, що вмієте"]},"2":{"p":["Нести знання й інтуїцію людям","Бути порадником","Розкривати глибину"],"m":["Ховати знання","Недовіра до себе","Самотність"],"d":["Діліться знаннями відкрито","Розвивайте інтуїцію"]},"3":{"p":["Творити красу, затишок, нове життя","Піклуватися","Примножувати"],"m":["Лінощі","Надмірна опіка","Залежність від комфорту"],"d":["Створюйте красу навколо","Дбайте про інших і себе"]},"4":{"p":["Організовувати, будувати, захищати","Бути опорою","Створювати системи"],"m":["Контроль і деспотизм","Страх відповідальності","Трудоголізм"],"d":["Візьміть відповідальність за справу","Будуйте те, що переживе вас"]},"5":{"p":["Бути вчителем і наставником","Передавати досвід","Допомагати знайти опору в цінностях"],"m":["Моралізаторство","Догматизм","Знання без практики"],"d":["Навчайте й наставляйте","Живіть за своїми принципами"]},"6":{"p":["Нести любов і гармонію","Поєднувати людей","Обирати серцем"],"m":["Нерішучість","Залежність від чужої думки","Зради"],"d":["Обирайте серцем","Будуйте гармонійні стосунки"]},"7":{"p":["Вести вперед, досягати","Відкривати нові шляхи","Надихати рухом"],"m":["Боротьба заради боротьби","Агресія","Утеча в рух"],"d":["Ставте цілі, що мають сенс","Ведіть людей за собою"]},"8":{"p":["Встановлювати справедливість","Наводити лад","Бути чесним прикладом"],"m":["Осуд","Холодність","Суди й конфлікти"],"d":["Будьте чесні в усьому","Допомагайте відновити справедливість"]},"9":{"p":["Ділитися мудрістю","Шукати й нести істину","Бути світлом для тих, хто шукає"],"m":["Самоізоляція","Песимізм","Знання без передачі"],"d":["Пишіть, консультуйте, навчайте","Виходьте до людей"]},"10":{"p":["Бачити шанси й допомагати іншим їх ловити","Приносити зміни","Бути в потоці"],"m":["Хаос","Надія лише на удачу","Непостійність"],"d":["Діліться вмінням бачити можливості","Будуйте стабільне"]},"11":{"p":["Надихати силою","Захищати слабших","Вести через кризи"],"m":["Тиск і насильство","Перевтома","Боротьба"],"d":["Використовуйте силу для захисту","Будьте прикладом витримки"]},"12":{"p":["Служити людям","Показувати новий погляд","Допомагати"],"m":["Жертовність","Пасивність","Залежності"],"d":["Допомагайте, зберігаючи себе","Діліться незвичним баченням"]},"13":{"p":["Трансформувати й оновлювати","Допомагати пройти зміни","Завершувати старе"],"m":["Руйнування","Страх змін","Застрягання"],"d":["Супроводжуйте людей у змінах","Відпускайте старе"]},"14":{"p":["Гармонізувати й лікувати","Поєднувати протилежності","Нести баланс"],"m":["Залежності","Безхарактерність","Повільність"],"d":["Займайтеся тим, що лікує людей","Шукайте свою міру"]},"15":{"p":["Пробуджувати енергію й бажання","Вчити людей заробляти й жити яскраво","Бути харизматичним лідером"],"m":["Маніпуляції","Залежності","Гроші понад усе"],"d":["Використовуйте вплив на добро","Вчіть людей свободи від залежностей"]},"16":{"p":["Руйнувати застаріле й будувати нове","Реформувати","Відбудовувати"],"m":["Руйнування без творення","Гординя","Хаос"],"d":["Ставайте тим, хто відбудовує","Будуйте на міцному"]},"17":{"p":["Надихати красою й вірою","Творити","Бути зіркою для інших"],"m":["Мрії без дій","Розчарування","Нереалізованість"],"d":["Показуйте свою творчість","Надихайте прикладом"]},"18":{"p":["Розкривати таємне й підсвідоме","Творити образи","Допомагати долати страхи"],"m":["Страхи й ілюзії","Обман","Нестабільність"],"d":["Працюйте з інтуїцією й творчістю","Допомагайте людям побачити реальність"]},"19":{"p":["Дарувати радість і тепло","Бути лідером","Святкувати життя"],"m":["Гординя","Марнославство","Вигорання"],"d":["Світіть для інших","Діліться успіхом"]},"20":{"p":["Об’єднувати рід і людей","Відновлювати зв’язки","Передавати мудрість поколінь"],"m":["Осуд","Розриви з рідними","Застрягання в минулому"],"d":["Працюйте з родом і сім’єю","Прощайте й об’єднуйте"]},"21":{"p":["Нести мир і єднання","Масштабні проєкти","Поєднувати культури"],"m":["Розпорошення","Несвобода","Тиск"],"d":["Беріться за проєкти без кордонів","Будуйте мости між людьми"]},"22":{"p":["Нести свободу й легкість","Показувати нестандартні шляхи","Надихати грати"],"m":["Безвідповідальність","Хаос","Утеча"],"d":["Будьте вільними відповідально","Показуйте людям, що можна інакше"]}}};
/* ---------- position-specific reading: what this exact point means, and the arcana's traits reframed for it ----------
   (the full catalogue description of the arcana stays one tap away, folded, instead of repeating under every position) */
const POSROLE={
 A:"Ліва точка — ваша «візитна картка»: перше враження, манера, те, як вас бачать люди, ще не знаючи близько.",
 A1:"Так якості вашої особистості розкриваються з віком і досвідом — у роботі, спілкуванні, коли ви почуваєтеся впевнено.",
 A2:"Глибинна якість особистості: те, ким ви відчуваєте себе зсередини, навіть коли зовні проявляєтеся інакше.",
 B:"Верхня точка — дар від Неба: те, що дається вам легше, ніж іншим, і з чим ви прийшли в життя.",
 B1:"Так ваш талант розвивається: через які заняття й умови дар росте і стає майстерністю.",
 B2:"Глибинний талант душі: найтонший рівень дару, який часто відкривається пізніше, через досвід і довіру до себе.",
 C:"Права точка — ваш матеріальний ресурс: як ви ставитеся до грошей, роботи й матеріального світу.",
 C1:"Вхід матеріального ресурсу: через які дії та якості гроші починають до вас приходити.",
 C2:"Точка входу в грошовий канал: діяльність, через яку дохід приходить найпростіше.",
 D:"Нижня точка — минуле втілення: досвід, звички й сценарії, які душа принесла з собою.",
 D1:"Як кармічна програма проявляється зараз: ситуації й стани, у яких хвіст нагадує про себе.",
 D2:"Завдання на це втілення: якість, яку варто розвинути, щоб програма хвоста перестала повторюватися.",
 E:"Центр матриці — зона комфорту: стан, у якому ви почуваєтеся собою, і ядро характеру.",
 E2:"Центр родового квадрата: загальна сила й тема роду, на якій ви стоїте.",
 E3:"Центральна програма: як сила роду переплавляється у ваш власний характер.",
 A3:"Анахата по лінії Землі: як серцева енергія проявляється в тілі й діях.",
 B3:"Анахата по лінії Неба: внутрішній ресурс серця — здатність любити, приймати й співчувати.",
 F:"Рід батька, вік 10 років: перша чоловіча програма роду, яка звучить у дитинстві.",F1:"Програма роду батька: що передається по чоловічій лінії.",F2:"Глибинна програма роду батька: найглибший пласт, який проявляється в кризові моменти.",
 H:"Рід батька, вік 50 років: зріла чоловіча програма роду.",H1:"Програма роду батька: що передається по чоловічій лінії.",H2:"Глибинна програма роду батька.",
 G:"Рід матері, вік 30 років: жіноча програма роду в розквіті сил.",G1:"Програма роду матері: що передається по жіночій лінії.",G2:"Глибинна програма роду матері.",
 I:"Рід матері, вік 70 років: мудрість і завдання жіночої лінії роду.",I1:"Програма роду матері: що передається по жіночій лінії.",I2:"Глибинна програма роду матері.",
 X:"Перетин любові й грошей: точка балансу, де стосунки й фінанси впливають одне на одне.",
 MON:"Що примножує гроші: енергія, яка збільшує дохід, коли ви проживаєте її в плюсі.",
 LOV:"Канал стосунків: образ партнера і те, що вам важливо в близькості.",
 SKY:"Лінія Неба: духовні якості, які варто в собі розвинути.",EARTH:"Лінія Землі: навички, через які ви реалізуєтеся в матеріальному світі.",
 PERS:"Особисте призначення, до 40 років: пошук себе.",MALE:"Чоловіча лінія роду.",FEM:"Жіноча лінія роду.",
 SOC:"Соціальне призначення, 40–60 років: реалізація серед людей.",SPIR:"Духовне призначення, після 60 років.",PLAN:"Планетарне призначення: внесок, який ви залишаєте світу."
};
const POSGRP={
 pers:["Сильні сторони в цій позиції","Що псує враження"],
 tal:["Як талант проявляється в плюсі","Що блокує талант"],
 money:["Що відкриває гроші","Що перекриває потік"],
 karma:["Ресурс, принесений з минулого","Сценарії, що повторюються"],
 minus:["Ресурс програми","Як програма проявляється"],
 task:["Ресурс, на який можна спертися","Куди тягне старий сценарій"],
 rod:["Що дав рід","Родові сценарії"],
 health:["Що наповнює","Що виснажує"],
 love:["Що зміцнює стосунки","Що руйнує стосунки"],
 pur:["Як призначення реалізується","Що відводить від шляху"]
};
const POSG={pers:'pers',tal:'tal',money:'money',love:'love',karma:'karma',minus:'karma',task:'karma',rod:'rod',health:'health',pur:'pur'};
/* a bullet in the current language; until a sphere text is translated, the arcana's general (already translated) list stands in */
const trHas=s=>LANG==='uk'||!!(TR[LANG]&&TR[LANG][_H(s)]);
/* the sphere-specific plus / minus / to-do lists for an arcana in a position (also used by the PDF) */
function posLists(id,v){
  const a=ARC[v], f=POS[id][1], X=(POSTX[POSG[f]||'pers']||{})[v];
  const pick=(arr,fb)=>arr&&arr.every(trHas)?arr.map(x=>_t(x)):fb;
  return {H:POSGRP[f]||POSGRP.pers, P:X?pick(X.p,LST(v,'p',4)):LST(v,'p',4), M:X?pick(X.m,LST(v,'m',4)):LST(v,'m',4), D:X?pick(X.d,a.how.slice(0,3)):a.how.slice(0,3)};
}
function posBody(id,v,g){
  const a=ARC[v], f=POS[id][1], L_=posLists(id,v), H=L_.H, P_=L_.P, M_=L_.M, D_=L_.D;
  /* only what the position text above doesn't already say */
  const ex=f==='karma'?`<h4>${_t("Завдання")}</h4><p>${cap(a.task)}.</p>`
    :f==='task'?`<h4>${_t("Досвід минулого")}</h4><p>${cap(a.karma)}.</p>`
    :f==='minus'?`<div class="blk2"><div><h4>${_t("Досвід минулого")}</h4><p>${cap(a.karma)}.</p></div><div><h4>${_t("Завдання")}</h4><p>${cap(a.task)}.</p></div></div>`:'';
  return `<div class="pm"><div class="pp"><h4>${_t(H[0])}</h4>${UL(P_)}</div><div class="pp minus"><h4>${_t(H[1])}</h4>${UL(M_)}</div></div>
    ${ex}
    <div class="pos-box"><h4>${_t("Що робити саме тут")}</h4>${UL(D_)}</div>
    ${(f==='pers'||f==='love')&&!isPair()?`<h4>${g==='f'?_t("Для жінки"):_t("Для чоловіка")}</h4><p>${g==='f'?a.f:a.mm}</p>`:''}
    <button type="button" class="arc-more" data-go="cat:${v}">${_f("Загальний опис аркана {0} · {1} — у довіднику",[v,a.n])} <span aria-hidden="true">↗</span></button>`;
}
function arcDetail(id){
  const P=STATE.P, v=P[id], a=ARC[v], g=gender();
  const inP=progs().filter(p=>p.ids.includes(id));
  return `<div class="det fade">${topBlock(v,chipCol(id),a.n,posLabel(id))}
    ${inP.length?`<div class="pgo">${inP.map(p=>`<button class="pgo-b" data-go="prog:${p.k}"><span class="pgo-l">${_t("Дивитись програму")}</span><b>${p.vals.join('-')}</b><em>${p.named?`«${PN(p.named)}»`:p.t}</em><i aria-hidden="true">↗</i></button>`).join('')}</div>`:''}
    <div class="kw">${a.kw.map(x=>`<span>${x}</span>`).join('')}</div>
    <div class="pos-box"><h4>${_t("У цій позиції")}</h4>${!isPair()&&POSROLE[id]?`<p class="pos-role">${_t(POSROLE[id])}</p>`:''}<p>${posText(id,v,g)}</p>${posExtra(id,v)}</div>
    ${posBody(id,v,g)}
    ${isPair()?'':`<h4>${_f("Роки, коли {0} — енергія року",[v])}</h4>${yearChips(v)}`}
    ${moreBtn('arc:'+id)}
    <p class="note">${_t("Трактування — інструмент самопізнання за методом Матриці долі, а не прогноз чи діагноз.")}</p></div>`;
}
function catDetail(v){
  const a=ARC[v], g=gender(), P=STATE.P;
  let mine='';
  if(P){
    const pos=DRAWN.filter(i=>P[i]===v), inP=progs().filter(p=>p.vals.includes(v));
    mine=`<div class="pos-box"><h4>${_t("У вашій матриці")}</h4>${pos.length?`<div class="chips">${pos.map(chipArc).join('')}</div><p class="small">${_t("Натисніть на позицію, щоб прочитати трактування саме для цього місця.")}</p>`:_t("<p>У схемі вашої матриці цього аркана немає — він може звучати в роках або програмах.</p>")}</div>`;
    mine+=`<div id="catTail"><h4>${_t("Програми з цим арканом")}</h4>${inP.length?progRows(inP):_t("<p class=\"muted\">Немає лінійних програм із цією енергією.</p>")}${isPair()?'':`<h4>${_f("Роки, коли {0} — енергія року",[v])}</h4>${yearChips(v)}`}</div>`;
  }
  return `<div class="det fade">${topBlock(v,'var(--accent)',a.n,`${_f("{0} аркан · {1}",[v,a.kw.join(', ')])}`)}
    ${arcFig(v)}
    ${P?mine.split('<div id="catTail">')[0]:''}
    ${arcBody(a,g)}
    <h4>${_t("Як енергія року")}</h4><p>${cap(YR[v])}.</p>
    <div class="blk2"><div><h4>${_t("Як завдання")}</h4><p>${cap(a.task)}.</p></div><div><h4>${_t("Призначення")}</h4><p>${cap(a.pur)}.</p></div></div>
    ${P?'<div>'+mine.split('<div id="catTail">')[1]:''}
    ${moreBtn('cat:'+v)}</div>`;
}
function progDetail(k){
  const pr=getProg(k), tx=progText(pr), code=pr.vals.join('-'), As=pr.vals.map(v=>ARC[v]);
  const roles=pr.ids?pr.ids.map((id,i)=>`<div class="role"><div class="role-h">${chipArc(id)}</div><p>${POS[id][0]}. ${i===0?_t("Внутрішній корінь програми."):i===1?_t("Як програма розгортається."):_t("Зовнішній прояв, з яким ви стикаєтеся найчастіше.")}</p><p class="small">${_f("<b>Роль у програмі:</b> {0} → {1}.",[items(ARC[STATE.P[id]],'m',2),items(ARC[STATE.P[id]],'p',2)])}</p></div>`).join('')
    : pr.vals.map((v,i)=>`<div class="role"><div class="role-h">${chipVal(v)}<span class="role-n">${[_t("Енергія року"),_t("Протилежна точка"),_t("Підсумок року")][i]}</span></div><p>${cap(YR[v])}.</p></div>`).join('');
  return `<div class="det fade">${topBlock(code,pr.named?'var(--accent)':pr.karmic?'var(--p-red)':'var(--p-blue)',pr.named?`«${PN(pr.named)}»`:`${_f("Програма {0}",[code])}`,`${pr.t}${pr.karmic?_t(" · кармічна програма"):''}${pr.named?_t(" · іменна програма"):''}`,true)}
    <div class="pm"><div class="pp"><h4>${_t("У плюсі")}</h4><p>${tx.p}</p></div><div class="pp minus"><h4>${_t("У мінусі")}</h4><p>${tx.m}</p></div></div>
    <h4>${_t("Як проявляється")}</h4><p>${tx.h}</p>
    <h4>${_t("Причинно-наслідковий ланцюг")}</h4><div class="chain"><div>${_t("<em>У мінусі</em>")}<p>${As.map(a=>a.m.split(LSPLIT)[0].replace(/\.$/,'').toLowerCase()).join(' <i>→</i> ')}</p></div><div>${_t("<em>У плюсі</em>")}<p>${As.map(a=>a.p.split(LSPLIT)[0].replace(/\.$/,'').toLowerCase()).join(' <i>→</i> ')}</p></div></div>
    <h4>${_t("Ознаки, що програма активна")}</h4>${UL(As.flatMap(a=>a.m.replace(/\.$/,'').split(LSPLIT).slice(0,2)))}
    <div class="pos-box"><h4>${_t("Як пропрацювати")}</h4><p>${tx.w}</p>${UL(As.map(a=>a.how[0]))}</div>
    <h4>${_t("Ресурс після опрацювання")}</h4>${UL(As.flatMap(a=>a.p.replace(/\.$/,'').split(LSPLIT).slice(0,2)))}
    ${pr.named?`<h4>${_t("Склад програми по енергіях")}</h4><p>${tx.gen.h}</p>`:''}
    <h4>${_t("Енергії програми")}</h4>${roles}
    ${moreBtn('prog:'+k)}
    <p class="note">${_t("Програма — це три енергії, що звучать разом. Опрацьована програма перестає повторюватися і стає вашим ресурсом.")}</p></div>`;
}
function yearDetail(a){
  const {P,d,m,y}=STATE, t=P.YEARS[a], o=(a+40)%80, pr=yearProg(a), tx=progText(pr), As=t.map(v=>ARC[v]);
  const names=[`${_f("Енергія року · вік {0}",[a])}`,`${_f("Протилежна точка · вік {0}",[o])}`,_t("Підсумок і урок року")];
  const notes=[_t("Головна подія й тема року."),_t("Фон і виклик: як тема року відгукується в протилежній сфері."),_t("До чого рік приведе, якщо пройти його усвідомлено.")];
  const O=occ(t);
  const blocks=t.map((v,i)=>`<div class="role"><div class="role-h">${chipVal(v)}<span class="role-n">${names[i]}</span></div><p>${O[i][0]?_f("Та сама енергія {0} тут звучить удруге — вже як {1}: {2}.",[ARC[v].n,[_t("головна тема"),_t("фон і виклик"),_t("підсумок року")][i],lc(i===2?(ARC[v].task||ARC[v].d):(ARC[v].work&&ARC[v].work.p||ARC[v].d))]):`${cap(YR[v])}. ${notes[i]}`}</p><div class="scn"><div class="pp"><h4>${_t("Імовірні сценарії в плюсі")}</h4>${UL(share(ARC[v].yp,...O[i]))}</div><div class="pp minus"><h4>${_t("Імовірні сценарії в мінусі")}</h4>${UL(share(ARC[v].ym,...O[i]))}</div><div class="pp work"><h4>${_t("Як пропрацювати")}</h4>${UL(share(ARC[v].yw,...O[i]))}</div></div></div>`).join('');
  return `<div class="det fade">${topBlock(a,a===curAge()?'var(--accent)':'var(--p-blue)',`${_f("Вік {0}{1}",[a,a===curAge()?_t(" · зараз"):''])}`,`${d} ${MONTHS[m-1]} ${y+a} — ${d} ${MONTHS[m-1]} ${y+a+1}`)}
    <button class="prow${pr.named?' named':''} yp" data-go="prog:Y${a}"><span class="pcode">${t.join('-')}</span><span class="acc-t"><strong>${pr.named?`«${PN(pr.named)}»`:_t("Програма року")}</strong><small>${_t("Відкрити окремо")}</small></span>${CHEV}</button>
    <div class="ynav"><button class="btn ghost sm" data-go="year:${(a+79)%80}" data-rep="1">${_f("← {0} р.",[(a+79)%80])}</button><button class="btn ghost sm" data-go="year:${(a+1)%80}" data-rep="1">${_f("{0} р. →",[(a+1)%80])}</button></div>
    <p class="small muted" style="margin-top:12px">${_f("На колі матриці цей вік лежить між точками {0} — тема року переплітається з цими сферами.",[SEG[Math.floor(a/10)%8]])}</p>
    <h4>${_t("Як проживається рік")}</h4><p>${ARC[t[0]].live}</p>
    <div class="pos-box soft"><h4>${_t("Ви впізнаєте цей рік, якщо…")}</h4>${UL(ARC[t[0]].rec.slice(0,4))}</div>
    <h4>${_t("Три аркани року")}</h4>${blocks}
    <h4>${_t("Причинно-наслідкові зв’язки року")}</h4><ul class="cz">${uniq(t.map((v,i)=>ARC[v].cause[O[i][0]%ARC[v].cause.length]).concat([As[0].cause[1]])).map(c=>{const p=c.split(' — ');return `<li><span>${p[0]}</span><i aria-hidden="true">→</i><span>${p.slice(1).join(' — ')}</span></li>`}).join('')}</ul>
    <div class="pm"><div class="pp"><h4>${_t("У плюсі")}</h4><p>${tx.p}</p></div><div class="pp minus"><h4>${_t("У мінусі")}</h4><p>${tx.m}</p></div></div>
    <h4>${_t("Як проявляється")}</h4><p>${tx.h}</p>
    <div class="blk2"><div><h4>${_t("Що робити")}</h4>${UL(uniq(t.map((v,i)=>ARC[v].how[O[i][0]%ARC[v].how.length])))}</div><div><h4>${_t("Чого уникати")}</h4>${UL(uniq(t.map((v,i)=>{const mm=ARC[v].m.split(LSPLIT);return mm[O[i][0]%mm.length];})))}</div></div>
    <h4>${_t("Як покращити ситуацію")}</h4>${fixList(ARC[t[0]])}
    <div class="pos-box"><h4>${_t("Як прожити рік")}</h4><p>${tx.w}</p></div>
    <h4>${_t("Питання на рік")}</h4>${qListT(ARC[t[0]],ARC[t[0]].n)}
    ${moreBtn('year:'+a)}</div>`;
}
/* "програма повністю" buttons: a sphere shows them only when a concrete program stands behind it */
const SPH_PROGS={'Особистість':['pers','cen'],'Таланти':['tal'],'Кармічний хвіст':['tail'],'Гроші':['money','mat'],'Стосунки':['love'],'Рід':['fl','ml'],'Призначення':['pp','sp'],
  'Енергія союзу':['cen'],'Як пару бачать інші':['pers'],'Навіщо ви зустрілися':['pp','sp'],'Спільні таланти':['tal'],'Кохання й близькість':['love'],'Гроші пари':['money'],'Кармічна програма пари':['tail']};
function sphProgs(s){
  const ks=SPH_PROGS[s.k||s.t]||(s.prog?[s.prog]:[]); if(!ks.length) return '';
  return `<div class="sph-progs">${ks.map(k=>{const p=getProg(k); if(!p) return ''; return `<button class="pgo-b sph-p" type="button" data-go="prog:${k}"><span class="pgo-l">${_t("Програма повністю")}</span><b>${p.vals.join('-')}</b><em>${p.named?`«${PN(p.named)}» · ${p.t}`:p.t}</em><i aria-hidden="true">↗</i></button>`;}).join('')}</div>`;
}
function accordion(){
  const {P,g,name}=STATE, sp=isPair()?pairSpheres():spheres(P,g,name), all=progs();
  sp.splice(3,0,{t:_t("Програми"),k:"Програми",s:`${_f("{0} ліній · {1} іменних",[all.length,all.filter(p=>p.named).length])}`,raw:progRows(all)});
  const blk=([h,t])=>`<div class="blk"><em>${h}</em>${/^\s*</.test(t)?t:`<p>${t}</p>`}</div>`;
  return `<div class="side-h">${isPair()?_t("Сфери союзу"):_t("Сфери життя")}</div><ul class="acc">${sp.map((s,i)=>`
    <li class="${STATE.open===i?'open':''}"><button class="acc-btn" aria-expanded="${STATE.open===i}" data-i="${i}">
      <span class="acc-t"><strong>${s.t}</strong><small>${s.s}</small></span>${CHEV}</button>
      <div class="acc-body"><div class="acc-in"><div>
        ${s.raw?s.raw:`${sphProgs(s)}<div class="chips">${s.ids.map(chipArc).join('')}</div>
        <div class="txt">${s.html.filter(Boolean).map(blk).join('')}</div>`}
        <div class="sph-more">${moreBtn('sph:'+i)}</div>${aiAsk('sph:'+i)}
      </div></div></div></li>`).join('')}</ul>`;
}
const isSheet=()=>innerWidth<=820;
const detHTML=d=>d?withAsk(dedupeHTML(detHTML0(d)),detSpec(d)):accordion();
const detHTML0=d=>!d?accordion():d.type==='tcat'?tcatDetail(d.id):d.type==='arc'?arcDetail(d.id):d.type==='prog'?progDetail(d.k):d.type==='year'?yearDetail(d.age):d.type==='day'?dayDetail(d.key):catDetail(d.v);
function sheetOpen(html,onClose){
  const sh=$('#msheet'), body=$('#msBody'), head=$('#msHead'); body.innerHTML=html;
  head.innerHTML=''; const dt=body.querySelector('.det-top'); if(dt) head.appendChild(dt);
  sh._close=onClose;
  if(sh.hidden){ sh.hidden=false; document.documentElement.classList.add('ms-on'); requestAnimationFrame(()=>sh.classList.add('in')); }
  body.style.scrollBehavior='auto'; body.scrollTop=0; requestAnimationFrame(()=>{ body.scrollTop=0; body.style.scrollBehavior=''; });
  /* keep what is being viewed (selected points / program) visible in the strip above the sheet */
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    const sel=[...document.querySelectorAll('#left svg .pt.sel, #gLeft svg .pt.sel')].filter(e=>e.getClientRects().length&&!e.closest('[hidden]'));
    let r=null;
    if(sel.length){ const rs=sel.map(e=>e.getBoundingClientRect()); r={top:Math.min(...rs.map(x=>x.top)),bottom:Math.max(...rs.map(x=>x.bottom))}; }
    else{ let a=window._tapEl; if(a&&!a.isConnected&&a.dataset&&a.dataset.id) a=document.querySelector(`#gLeft .pt[data-id="${a.dataset.id}"],#left .pt[data-id="${a.dataset.id}"]`); if(a&&a.isConnected&&!sh.contains(a)){ const q=a.getBoundingClientRect(); r={top:q.top,bottom:q.bottom}; } }
    if(!r) return;
    const nav=document.querySelector('.topnav'), vis0=(nav?nav.getBoundingClientRect().bottom:64)+10, vis1=innerHeight-sh.querySelector('.ms-box').offsetHeight-10;
    if(r.top<vis0||r.bottom>vis1){ const c=(r.top+r.bottom)/2, target=(vis0+vis1)/2; window.scrollBy({top:c-target,behavior:'smooth'}); }
  }));
  return body;
}
function sheetClose(){ const sh=$('#msheet'); if(sh.hidden) return; sh.classList.remove('in'); document.documentElement.classList.remove('ms-on'); setTimeout(()=>{ if(!sh.classList.contains('in')){ sh.hidden=true; $('#msBody').innerHTML=''; $('#msHead').innerHTML=''; $('#msBody').scrollTop=0; } },260); }
function bindSide(side){
  const cl=side.querySelector('#close'); if(cl){cl.addEventListener('click',closeDet);}
  side.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>{
    const [t,v]=b.dataset.go.split(':');
    const det=t==='day'?{type:'day',key:v}:t==='arc'?{type:'arc',id:v}:t==='prog'?{type:'prog',k:v}:t==='year'?{type:'year',age:+v}:{type:'cat',v:+v};
    if(b.dataset.rep&&!isSheet()){ STATE.det=det; renderSide(); updateSel(); const lp=$('#left .yrow.on'); if(lp){const c=$('#left'); if(c.scrollHeight>c.clientHeight) c.scrollTop=lp.offsetTop-c.clientHeight/2;} }
    else openDet(det);
  }));
  side.querySelectorAll('.acc-btn').forEach(b=>b.addEventListener('click',()=>{
    const i=+b.dataset.i, opening=STATE.open!==i; STATE.open=opening?i:-1;
    const before=b.getBoundingClientRect().top;
    const items=[...side.querySelectorAll('.acc > li')];
    items.forEach((li,j)=>{
      const want=j===STATE.open, body=li.querySelector('.acc-body');
      if(li.classList.contains('open')&&!want){ body.style.transition='none'; li.classList.remove('open'); void body.offsetHeight; body.style.transition=''; }
      else li.classList.toggle('open',want);
      li.querySelector('.acc-btn').setAttribute('aria-expanded',String(want));
    });
    const d=b.getBoundingClientRect().top-before;
    if(Math.abs(d)>0.5){
      const cs=getComputedStyle(side), inner=side.scrollHeight>side.clientHeight+1&&/(auto|scroll)/.test(cs.overflowY);
      if(inner) side.scrollTop+=d; else window.scrollBy(0,d);
    }
  }));
}
function renderSide(){
  const side=$('#side'), d=STATE.det;
  if(!side) return;
  const sheet=isSheet()&&d&&d!==STATE.baseDet;
  const base=sheet?STATE.baseDet:d;
  const html=detHTML(base);
  if(side._html!==html||!sheet){ side.innerHTML=html; side._html=html; side.scrollTop=0; bindSide(side); }
  if(sheet){ const body=sheetOpen(detHTML(d),closeDet); bindSide(body); }
  else sheetClose();
}

$('#q').addEventListener('submit',e=>{
  e.preventDefault();
  const name=$('#name').value.trim(), d=+daySel.value, m=+monSel.value, y=+yearSel.value, g=document.querySelector('input[name=g]:checked').value;
  const err=$('#err');
  if(!d||!m||!y){err.textContent=T('errDate');err.hidden=false;return;}
  if(d<1||d>daysIn(m,y)){err.textContent=`${_f("У цьому місяці {0} року лише {1} днів.",[y,daysIn(m,y)])}`;err.hidden=false;return;}
  err.hidden=true;
  const view=PENDING_VIEW||(STATE&&STATE.P&&STATE.view!=='arcana'?STATE.view:'matrix'); PENDING_VIEW=null;
  STATE={mode:'solo',P:calc(d,m,y),g,name,d,m,y,det:null,stack:[],open:-1,view,ch:0,day:new Date()};
  STATE.det=STATE.baseDet=defaultDet(view);
  $('#home').hidden=true; $('#result').hidden=false; render(); collapseForm(); if(typeof addHist==='function') addHist(STATE);
  try{localStorage.setItem('dm-last',JSON.stringify({name,d,m,y,g}))}catch(_){}
  recAdd({name,d,m,y,g});
  window.scrollTo({top:0,behavior:'smooth'});
});
function fill(o){$('#name').value=o.name||'';yearSel.value=o.y;monSel.value=o.m;fillDays();daySel.value=o.d;document.getElementById(o.g==='m'?'gm':'gf').checked=true;window.csSync&&window.csSync();window.dateSync&&window.dateSync();}
/* phones: one typed date field (ДД.ММ.РРРР) in place of the three dropdowns; it drives the hidden selects */
(()=>{
  const sets=[['day','month','year'],['d1','m1','y1'],['d2','m2','y2']], fields=[];
  const fmt=v=>{ const d=v.replace(/\D/g,'').slice(0,8); return d.length>4?d.slice(0,2)+'.'+d.slice(2,4)+'.'+d.slice(4):d.length>2?d.slice(0,2)+'.'+d.slice(2):d; };
  sets.forEach(([di,mi,yi])=>{
    const ds=$('#'+di), ms=$('#'+mi), ys=$('#'+yi); if(!ds||!ms||!ys) return;
    const fd=ds.closest('.field'); if(!fd) return;
    const w=document.createElement('div'); w.className='field f-date';
    const id='dt_'+di; w.innerHTML=`<label for="${id}">${_t("Дата народження")}</label><input id="${id}" type="text" inputmode="numeric" autocomplete="bday" placeholder="${_t("ДД.ММ.РРРР")}" maxlength="10">`;
    fd.parentNode.insertBefore(w,fd);
    const inp=w.querySelector('input');
    const toSel=()=>{ const m=inp.value.match(/^(\d{2})\.(\d{2})\.(\d{4})$/); inp.classList.remove('bad');
      if(!m){ if(inp.value.length===10) inp.classList.add('bad'); ds.value=''; return; }
      const d=+m[1], mo=+m[2], y=+m[3];
      if(mo<1||mo>12||![...ys.options].some(o=>+o.value===y)||d<1||d>new Date(y,mo,0).getDate()){ inp.classList.add('bad'); ds.value=''; return; }
      ys.value=y; ys.dispatchEvent(new Event('change',{bubbles:true})); ms.value=mo; ms.dispatchEvent(new Event('change',{bubbles:true})); ds.value=d; ds.dispatchEvent(new Event('change',{bubbles:true}));
      window.csSync&&window.csSync(); };
    inp.addEventListener('input',e=>{ const del=e.inputType&&e.inputType.startsWith('delete'); const v=del?inp.value.replace(/[^\d.]/g,''):fmt(inp.value); if(v!==inp.value){ inp.value=v; try{inp.setSelectionRange(v.length,v.length)}catch(_){} } toSel(); });
    inp.addEventListener('blur',()=>{ inp.value=fmt(inp.value); toSel(); });
    fields.push({inp,ds,ms,ys});
  });
  window.dateSync=()=>fields.forEach(({inp,ds,ms,ys})=>{ if(document.activeElement===inp) return; inp.classList.remove('bad'); inp.value=ds.value&&ms.value&&ys.value?`${String(ds.value).padStart(2,'0')}.${String(ms.value).padStart(2,'0')}.${ys.value}`:''; });
  window.dateSync();
})();
const nameInp=$('#name');
const capName=v=>v.replace(/(^|[\s-])([^\s-]*)/g,(m,sep,w)=>sep+(w?w.charAt(0).toLocaleUpperCase('uk')+w.slice(1).toLocaleLowerCase('uk'):''));
nameInp.addEventListener('input',()=>{const p=nameInp.selectionStart,v=capName(nameInp.value);if(v!==nameInp.value){nameInp.value=v;try{nameInp.setSelectionRange(p,p)}catch(_){}}});
/* ---------- the form starts empty; earlier entered people are offered as suggestions under the name field ---------- */
const REC_KEY='code-recent';
function recList(){ try{ return JSON.parse(localStorage.getItem(REC_KEY)||'[]')||[]; }catch(_){ return []; } }
function recSave(l){ try{ localStorage.setItem(REC_KEY,JSON.stringify(l.slice(0,40))); }catch(_){} }
/* guests: only with cookie consent («accept all»); signed-in users: always (their search history also lives in the account) */
const recAllowed=()=>{ if(USER) return true; try{ return localStorage.getItem('code-cookies')==='all'; }catch(_){ return false; } };
function recHidden(){ try{ return JSON.parse(localStorage.getItem('code-recent-hide')||'[]')||[]; }catch(_){ return []; } }
function recHide(o){ const k=recKey(o); try{ localStorage.setItem('code-recent-hide',JSON.stringify([k,...recHidden().filter(x=>x!==k)].slice(0,200))); }catch(_){} recSave(recList().filter(r=>recKey(r)!==k)); }
const recKey=o=>`${(o.name||'').toLowerCase()}|${o.d}.${o.m}.${o.y}`;
function recAdd(o){ if(!o||!o.d||!o.m||!o.y||!recAllowed()) return; const k=recKey(o); try{ localStorage.setItem('code-recent-hide',JSON.stringify(recHidden().filter(x=>x!==k))); }catch(_){} recSave([{name:o.name||'',d:o.d,m:o.m,y:o.y,g:o.g||''},...recList().filter(x=>recKey(x)!==k)]); }
function recAll(){
  if(!recAllowed()) return [];
  const hide=new Set(recHidden()), out=[], seen=new Set(), push=(o,tag)=>{ if(!o||!o.d||!o.m||!o.y) return; const k=recKey(o); if(seen.has(k)||(tag!=='me'&&hide.has(k))) return; seen.add(k); out.push(Object.assign({},o,{tag})); };
  if(USER&&profileReady(USER.profile)) push(USER.profile,'me');
  recList().forEach(o=>push(o,'rec'));
  ((USER&&USER.hist)||[]).forEach(h=>{ if(!h) return; if(h.type==='pair'){ push({name:h.a&&h.a.n,d:h.a&&h.a.d,m:h.a&&h.a.m,y:h.a&&h.a.y},'rec'); push({name:h.b&&h.b.n,d:h.b&&h.b.d,m:h.b&&h.b.m,y:h.b&&h.b.y},'rec'); } else push({name:h.name,d:h.d,m:h.m,y:h.y,g:h.g},'rec'); });
  ((USER&&USER.favs)||[]).forEach(f=>{ if(f&&f.type!=='pair') push({name:f.name,d:f.d,m:f.m,y:f.y,g:f.g},'rec'); });
  return out.slice(0,40);
}
function clearForm(){
  $('#name').value=''; yearSel.value=''; monSel.value=''; fillDays(); daySel.value=''; $('#gf').checked=true;
  window.csSync&&window.csSync(); window.dateSync&&window.dateSync(); const e=$('#err'); if(e) e.hidden=true;
  try{ localStorage.removeItem('dm-last'); }catch(_){}
  formHasData();
}
const formHasData=()=>{ const has=!!($('#name').value.trim()||daySel.value||monSel.value||yearSel.value); document.body.classList.toggle('form-has',has); const b=$('#startReset'); if(b) b.hidden=!has; return has; };
['input','change'].forEach(ev=>$('#q').addEventListener(ev,()=>formHasData()));
/* suggestion list: tap an earlier person to fill all fields at once */
(()=>{
  const targets=[{inp:$('#name'),set:o=>{ fill(o); formHasData(); }},
    {inp:$('#n1'),set:o=>pairFill(1,o)},{inp:$('#n2'),set:o=>pairFill(2,o)}].filter(t=>t.inp);
  function pairFill(i,o){ $('#n'+i).value=o.name||''; const y=$('#y'+i), m=$('#m'+i), d=$('#d'+i);
    y.value=o.y; y.dispatchEvent(new Event('change',{bubbles:true})); m.value=o.m; m.dispatchEvent(new Event('change',{bubbles:true})); d.value=o.d; d.dispatchEvent(new Event('change',{bubbles:true}));
    window.csSync&&window.csSync(); window.dateSync&&window.dateSync(); }
  let pop=null, cur=null, idx=-1;
  const close=()=>{ if(pop){ pop.remove(); pop=null; } cur=null; idx=-1; };
  const dot=o=>`${String(o.d).padStart(2,'0')}.${String(o.m).padStart(2,'0')}.${o.y}`;
  /* focus → the whole history; typing → narrowed to matching names */
  function open(t,all){
    const q=all?'':t.inp.value.trim().toLowerCase();
    const L=recAll().filter(o=>!q||(o.name||'').toLowerCase().startsWith(q)||(o.name||'').toLowerCase().includes(' '+q));
    if(!L.length){ close(); return; }
    if(!pop){ pop=document.createElement('div'); pop.className='rec-pop'; pop.setAttribute('role','listbox'); document.body.appendChild(pop); }
    cur=t; idx=-1;
    pop.innerHTML=`<p class="rec-h">${_t("Раніше вводили")}</p>`+L.map((o,i)=>`<div class="rec-it" role="option" data-i="${i}"><span class="rec-av" aria-hidden="true">${esc((o.name||'?').charAt(0).toUpperCase())}</span><span class="rec-t"><b>${esc(o.name||_t("Без імені"))}</b><small>${dot(o)}${o.g?` · ${o.g==='m'?T('male'):T('fem')}`:''}</small></span>${o.tag==='me'?`<em>${_t("Мій профіль")}</em>`:o.tag==='rec'?`<button type="button" class="rec-x" data-x="${i}" aria-label="${_t("Прибрати з підказок")}">${XICON}</button>`:''}</div>`).join('');
    pop._list=L; place();
  }
  function place(){ if(!pop||!cur) return; const r=cur.inp.getBoundingClientRect(), w=Math.max(r.width,280);
    pop.style.left=Math.max(8,Math.min(r.left,innerWidth-w-8))+'px'; pop.style.top=(r.bottom+8)+'px'; pop.style.width=w+'px'; }
  const pick=i=>{ const o=pop&&pop._list[i]; if(!o||!cur) return; const t=cur; close(); t.set(o); t.inp.blur(); };
  targets.forEach(t=>{
    t.inp.setAttribute('autocomplete','off');
    t.inp.addEventListener('focus',()=>open(t,true));
    /* × inside the field: clears the name in one tap and shows the full list again */
    const fx=document.createElement('button'); fx.type='button'; fx.className='f-x'; fx.tabIndex=-1; fx.setAttribute('aria-label',_t("Очистити ім’я")); fx.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    t.inp.insertAdjacentElement('afterend',fx);
    fx.addEventListener('pointerdown',e=>e.preventDefault());
    fx.addEventListener('click',()=>{ t.inp.value=''; t.inp.dispatchEvent(new Event('input',{bubbles:true})); t.inp.focus(); open(t,true); });
    t.inp.addEventListener('input',()=>open(t));
    t.inp.addEventListener('blur',()=>setTimeout(()=>{ if(cur===t&&document.activeElement!==t.inp) close(); },180));
    t.inp.addEventListener('keydown',e=>{ if(!pop||cur!==t) return; const n=pop._list.length;
      if(e.key==='ArrowDown'||e.key==='ArrowUp'){ e.preventDefault(); idx=(idx+(e.key==='ArrowDown'?1:-1)+n)%n; pop.querySelectorAll('.rec-it').forEach((el,k)=>el.classList.toggle('on',k===idx)); }
      else if(e.key==='Enter'&&idx>=0){ e.preventDefault(); pick(idx); }
      else if(e.key==='Escape'){ close(); } });
  });
  document.addEventListener('pointerdown',e=>{ if(!pop) return; const x=e.target.closest('.rec-x');
    if(x){ e.preventDefault(); const o=pop._list[+x.dataset.x]; recHide(o); const t=cur; open(t); return; }
    const it=e.target.closest('.rec-it'); if(it&&pop.contains(it)){ e.preventDefault(); pick(+it.dataset.i); return; }
    if(!pop.contains(e.target)&&cur&&e.target!==cur.inp) close(); },true);
  addEventListener('scroll',place,{passive:true}); addEventListener('resize',place);
})();
function openCatalog(){ closeDrawer(); STATE={P:null,view:'arcana',det:{type:'cat',v:1},stack:[]}; STATE.baseDet=STATE.det; $('#home').hidden=true; $('#result').hidden=false; render(); collapseForm(); if(typeof addHist==='function') addHist(STATE); window.scrollTo({top:0,behavior:'smooth'}); }



/* ---------- mobile: collapse the form into a side button after a calculation ---------- */
const FAB_OPEN=`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5.2" y="5.2" width="11.6" height="11.6" rx=".8" stroke="currentColor" stroke-width="1.5"/><rect x="5.2" y="5.2" width="11.6" height="11.6" rx=".8" transform="rotate(45 11 11)" stroke="currentColor" stroke-width="1.5"/><circle cx="11" cy="11" r="2.1" fill="currentColor"/><path d="M19.6 15.2c.25 1.6.75 2.2 2.4 2.5-1.65.3-2.15.9-2.4 2.5-.25-1.6-.75-2.2-2.4-2.5 1.65-.3 2.15-.9 2.4-2.5z" fill="currentColor"/></svg>`;
const FAB_CLOSE=`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;
function setFormOpen(open){
  if(window.setMC&&innerWidth<=820){ setMC(!open); return; }
  document.body.classList.toggle('fo',open);
  const f=$('#fab'); f.innerHTML=open?FAB_CLOSE:FAB_OPEN; f.setAttribute('aria-expanded',String(open)); f.setAttribute('aria-label',open?_t("Сховати форму"):_t("Ввести дані для розрахунку")); f.dataset.tip=open?_t("Сховати форму"):_t("Ввести дані для розрахунку");
}
function collapseForm(){ document.body.classList.add('fc'); setFormOpen(false); }
$('#fab').innerHTML=FAB_OPEN;
$('#fab').addEventListener('click',()=>setFormOpen(!document.body.classList.contains('fo')));
document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&document.body.classList.contains('fo')&&!document.querySelector('.cs-pop')) setFormOpen(false); });

let lastMob=innerWidth<=640;
addEventListener('resize',()=>{ const m=innerWidth<=640; if(m!==lastMob){ lastMob=m; if(STATE&&STATE.P&&STATE.view==='matrix'&&!$('#result').hidden) render(); else if(!$('#guide').hidden) renderGuide(); } });
/* ---------- mode switch, pair form, footer nav ---------- */
function setupDate(dI,mI,yI){
  const ds_=$('#'+dI), ms=$('#'+mI), ys=$('#'+yI);
  ys.innerHTML=yearSel.innerHTML; ms.innerHTML=monSel.innerHTML;
  const fd=()=>{const m=+ms.value||1,y=+ys.value||2000,max=ms.value?daysIn(m,y):31,cur=+ds_.value;ds_.innerHTML='<option value="">—</option>'+Array.from({length:max},(_,i)=>`<option>${i+1}</option>`).join('');if(cur)ds_.value=Math.min(cur,max);};
  fd(); ms.addEventListener('change',fd); ys.addEventListener('change',fd);
}
setupDate('d1','m1','y1'); setupDate('d2','m2','y2');
document.querySelectorAll('input.nm').forEach(inp=>inp.addEventListener('input',()=>{const p=inp.selectionStart,v=capName(inp.value);if(v!==inp.value){inp.value=v;try{inp.setSelectionRange(p,p)}catch(_){}}}));
function setMode(m){
  document.querySelectorAll('.modes [data-mode]').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.mode===m)));
  $('#q').hidden=m!=='solo'; $('#qp').hidden=m!=='pair';
}
document.addEventListener('click',e=>{
  const md=e.target.closest('[data-mode]');
  if(md){ if(md.classList.contains('flink')) goCalc(md.dataset.mode); else setMode(md.dataset.mode); return; }
  const nv=e.target.closest('.flink[data-nav]');
  if(nv){ const v=nv.dataset.nav; if(v==='tarot'){ showTarot(); return; }
    if(v==='arcana'){ if(hasResult()&&STATE.P){ if($('#result').hidden) backToResult(); setView(v); window.scrollTo({top:0,behavior:'smooth'}); } else openCatalog(); }
    else if(v==='matrix'&&hasResult()&&STATE.P){ if($('#result').hidden) backToResult(); setView(v); window.scrollTo({top:0,behavior:'smooth'}); }
    else goCalc('solo',v); }
});
$('#qp').addEventListener('submit',e=>{
  e.preventDefault();
  const g=i=>({n:$('#n'+i).value.trim(),d:+$('#d'+i).value,m:+$('#m'+i).value,y:+$('#y'+i).value});
  const a=g(1), b=g(2), err=$('#err2');
  if(!a.d||!a.m||!a.y||!b.d||!b.m||!b.y){err.textContent=T('errPair');err.hidden=false;return;}
  err.hidden=true; recAdd({name:a.n,d:a.d,m:a.m,y:a.y}); recAdd({name:b.n,d:b.d,m:b.m,y:b.y});
  const P1=calc(a.d,a.m,a.y), P2=calc(b.d,b.m,b.y);
  const P=overlay(P1,P2);
  STATE={mode:'pair',P,P1,P2,a,b,g:'f',name:'',det:null,baseDet:null,stack:[],open:-1,view:'matrix',ch:0};
  $('#home').hidden=true; $('#result').hidden=false; render(); collapseForm(); if(typeof addHist==='function') addHist(STATE);
  try{localStorage.setItem('dm-pair',JSON.stringify({a,b}))}catch(_){}
  window.scrollTo({top:0,behavior:'smooth'});
});
try{const lp=JSON.parse(localStorage.getItem('dm-pair')||'null'); if(lp){[[lp.a,1],[lp.b,2]].forEach(([o,i])=>{$('#n'+i).value=o.n||'';$('#y'+i).value=o.y;$('#m'+i).value=o.m;$('#m'+i).dispatchEvent(new Event('change'));$('#d'+i).value=o.d;});window.csSync&&window.csSync();}}catch(_){}


/* ---------- glass dropdowns over native selects ---------- */
(()=>{
  let open=null;
  const label=sel=>{const o=sel.options[sel.selectedIndex];return o&&o.value?o.textContent:'—';};
  function enhance(sel){
    if(sel.dataset.cs) return; sel.dataset.cs='1';
    const btn=document.createElement('button'); btn.type='button'; btn.className='cs-btn';
    btn.setAttribute('aria-haspopup','listbox'); btn.setAttribute('aria-expanded','false');
    const lab=sel.closest('.field')&&sel.closest('.field').querySelector('label');
    if(lab){ if(!lab.id) lab.id='lb-'+sel.id; btn.setAttribute('aria-labelledby',lab.id+' '+(btn.id='bt-'+sel.id)); lab.setAttribute('for','bt-'+sel.id); }
    sel.classList.add('cs-native'); sel.tabIndex=-1; sel.setAttribute('aria-hidden','true'); sel.after(btn);
    const sync=()=>{btn.textContent=label(sel); btn.classList.toggle('empty',!sel.value); btn.disabled=sel.disabled;};
    sel.addEventListener('change',sync); new MutationObserver(()=>sync()).observe(sel,{childList:true}); sel._csSync=sync; sync();
    btn.addEventListener('click',e=>{e.stopPropagation(); if(open&&open.sel===sel) close(); else show(sel,btn);});
    btn.addEventListener('keydown',e=>{if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();show(sel,btn);}});
  }
  function show(sel,btn){
    close();
    const isDay=/^(day|d\d)$/.test(sel.id);
    const pop=document.createElement('div'); pop.className='cs-pop'+(isDay?' grid':''); pop.setAttribute('role','listbox');
    [...sel.options].filter(o=>o.value).forEach(o=>{const b=document.createElement('button');b.type='button';b.className='cs-opt'+(o.value===sel.value?' on':'');b.setAttribute('role','option');b.setAttribute('aria-selected',String(o.value===sel.value));b.textContent=o.textContent;b.dataset.v=o.value;pop.appendChild(b);});
    document.body.appendChild(pop);
    const rc=btn.getBoundingClientRect(), w=Math.max(rc.width,isDay?292:190);
    pop.style.width=w+'px'; pop.style.left=Math.max(12,Math.min(rc.left,innerWidth-w-12))+'px';
    const below=innerHeight-rc.bottom-16, above=rc.top-16, need=Math.min(320,pop.scrollHeight);
    if(below>=need||below>=above){pop.style.top=(rc.bottom+8)+'px';pop.style.maxHeight=Math.min(320,below)+'px';}
    else{pop.style.bottom=(innerHeight-rc.top+8)+'px';pop.style.maxHeight=Math.min(320,above)+'px';pop.classList.add('up');}
    const on=pop.querySelector('.on')||pop.querySelector('.cs-opt');
    if(on){pop.scrollTop=on.offsetTop-pop.clientHeight/2+on.offsetHeight/2; on.focus({preventScroll:true});}
    pop.addEventListener('click',e=>{const b=e.target.closest('.cs-opt'); if(!b) return; sel.value=b.dataset.v; sel.dispatchEvent(new Event('change',{bubbles:true})); close(); btn.focus({preventScroll:true});});
    pop.addEventListener('keydown',e=>{
      const it=[...pop.querySelectorAll('.cs-opt')], i=it.indexOf(document.activeElement), c=isDay?7:1;
      const go=n=>{e.preventDefault(); const t=it[Math.max(0,Math.min(it.length-1,n))]; if(t) t.focus();};
      if(e.key==='Escape'){e.preventDefault();close();btn.focus();}
      else if(e.key==='ArrowDown') go(i+c); else if(e.key==='ArrowUp') go(i-c);
      else if(isDay&&e.key==='ArrowRight') go(i+1); else if(isDay&&e.key==='ArrowLeft') go(i-1);
      else if(e.key==='Home') go(0); else if(e.key==='End') go(it.length-1);
      else if(e.key==='Tab') close();
    });
    open={sel,btn,pop}; btn.setAttribute('aria-expanded','true');
    requestAnimationFrame(()=>pop.classList.add('in'));
  }
  function close(){ if(!open) return; open.btn.setAttribute('aria-expanded','false'); open.pop.remove(); open=null; }
  document.addEventListener('click',e=>{ if(open&&!open.pop.contains(e.target)) close(); });
  addEventListener('resize',close);
  addEventListener('scroll',e=>{ if(open&&!open.pop.contains(e.target)) close(); },true);
  document.querySelectorAll('.field select').forEach(enhance);
  window.csEnhance=enhance;
  window.csSync=()=>document.querySelectorAll('select[data-cs]').forEach(s=>s._csSync&&s._csSync());
})();


/* ---------- "Завантажити код": PDF in the site style ---------- */
const PAL_D={'--surface-solid':'#16152B','--surface-2':'rgba(150,138,255,.075)','--line':'rgba(176,166,255,.26)','--line-soft':'rgba(176,166,255,.10)','--fg':'#EEF0FF','--muted':'#9295B4','--accent':'#8C7DFF','--accent-2':'#B47CFF','--accent-3':'#4FD3F0','--p-violet':'#A27BFF','--p-blue':'#5F86FF','--p-cyan':'#3CC8F0','--p-gold':'#FFBF2E','--p-red':'#FF4D63','--p-rose':'#FF8F3D','--p-green':'#3ACB86','--p-pink':'#EC72B2','--p-amber':'#E09C3C','--glow':'rgba(124,92,255,.42)','--ptm':'24%','--ptm-e':'32%','--pt-glass':'rgba(26,24,52,.92)','--bg':'#07060F'};
const PAL_L={'--surface-solid':'#FFFFFF','--surface-2':'rgba(92,104,190,.075)','--line':'rgba(70,80,170,.26)','--line-soft':'rgba(70,80,170,.11)','--fg':'#14162B','--muted':'#6A6F8C','--accent':'#4F5BF2','--accent-2':'#8A5CF6','--accent-3':'#2BBBE6','--p-violet':'#8B5CF6','--p-blue':'#3D6BF5','--p-cyan':'#12B3E3','--p-gold':'#F5A70A','--p-red':'#F2364C','--p-rose':'#FF7A1F','--p-green':'#1FB273','--p-pink':'#D9579A','--p-amber':'#C9862A','--glow':'rgba(110,118,255,.30)','--ptm':'13%','--ptm-e':'18%','--pt-glass':'rgba(255,255,255,.96)','--bg':'#F3F4FB'};
let PDFPAL=PAL_D;
const pv=s=>s.replace(/var\((--[\w-]+)\)/g,(m,k)=>PDFPAL[k]||'#888');
function loadScript(src){return new Promise((res,rej)=>{if(document.querySelector(`script[src="${src}"]`))return res();const s=document.createElement('script');s.src=src;s.onload=()=>res();s.onerror=()=>rej(new Error('script'));document.head.appendChild(s);});}
function toast(msg){let t=$('#toast');if(!t){t=document.createElement('div');t.id='toast';t.className='toast';t.setAttribute('role','status');document.body.appendChild(t);}t.textContent=msg;t.classList.add('in');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('in'),3800);}
async function matrixPng(){
  let svg=svgMatrix(STATE.P,new Set(),false,isPair(),true);
  const Q=PDFPAL;
  const css=`<style>text{font-family:Archivo,"Helvetica Neue",Arial,sans-serif;font-weight:500}.pt text{fill:${Q['--fg']}}.pt circle.ring{fill:${Q['--pt-glass']};stroke:${Q['--line']}}.pt.col circle.ring{fill:color-mix(in srgb,var(--c) ${Q['--ptm']},${Q['--pt-glass']});stroke-width:1.6;filter:drop-shadow(0 0 5px color-mix(in srgb,var(--c) 55%,transparent)) drop-shadow(0 0 12px color-mix(in srgb,var(--c) 22%,transparent))}.pt.col circle.ring.core{fill:color-mix(in srgb,var(--c) ${Q['--ptm-e']},${Q['--pt-glass']})}.pt.yr circle.ring{fill:${Q['--pt-glass']}}.mx-line{stroke:${Q['--line']};fill:none;stroke-width:1}.mx-soft{stroke:${Q['--line-soft']};fill:none;stroke-width:1}.age{fill:${Q['--accent']};font-size:11px;font-weight:600}.agel{fill:${Q['--muted']};font-size:8.5px}.glyph{fill:${Q['--accent']};font-size:12px}</style>`;
  svg=pv(svg.replace('<svg ','<svg width="1400" height="1400" ').replace(/(<svg[^>]*>)/,'$1'+css));
  const img=new Image();
  await new Promise((res,rej)=>{img.onload=res;img.onerror=rej;img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);});
  const c=document.createElement('canvas');c.width=1400;c.height=1400;c.getContext('2d').drawImage(img,0,0);
  return c.toDataURL('image/png');
}
const pUL=a=>`<ul>${a.map(x=>`<li>${cap(String(x).replace(/\.$/,''))}</li>`).join('')}</ul>`;
const pFix=a=>`<div class="pz">${a.fix.map(c=>{const p=c.split(' — ');return `<div><span>${p[0]}</span><i>→</i><b>${p.slice(1).join(' — ')}</b></div>`}).join('')}</div>`;
const pNum=(v,col)=>`<span class="pn" style="border-color:${pv(col)};background:${pv(col).replace(/^#(\w\w)(\w\w)(\w\w)$/,(m,r,g,b)=>`rgba(${parseInt(r,16)},${parseInt(g,16)},${parseInt(b,16)},.16)`)}">${v}</span>`;
function pdfBlocks(png){
  const P=STATE.P, A=ARC, pair=isPair(), g=STATE.g||'f', B=[];
  const who=pair?`${esc(STATE.a.n||_t("Партнер 1"))} &amp; ${esc(STATE.b.n||_t("Партнер 2"))}`:esc(STATE.name||'');
  const meta=pair?`${_f("{0} {1} {2} · {3} {4} {5} · повне накладання матриць",[STATE.a.d,MONTHS[STATE.a.m-1],STATE.a.y,STATE.b.d,MONTHS[STATE.b.m-1],STATE.b.y])}`:`${_f("{0} {1} {2} · {3} · {4} р.",[STATE.d,MONTHS[STATE.m-1],STATE.y,g==='f'?_t("жінка"):_t("чоловік"),curAge()])}`;
  const tail=[P.D2,P.D1,P.D], tn=findNamed(tail,false);
  const LST0=pair?[['E',_t("Енергія союзу")],['A',_t("Як пару бачать інші")],['B',_t("Спільні таланти")],['C',_t("Матеріальна сфера пари")],['D',_t("Кармічне завдання пари")],['PERS',_t("Призначення пари")]]
                 :[['A',_t("Особистість · візитна картка")],['B',_t("Таланти · дар від Неба")],['C',_t("Матеріальне · ресурс")],['D',_t("Кармічне завдання")],['E',_t("Центр · зона комфорту")],['PERS',_t("Особисте призначення")]];
  const TOC=[...(pair?[]:[{a:'chak',t:_t("Карта здоров’я"),k:"Карта здоров’я"},{a:'path',t:_t("Шлях призначення")}]),...LST0.map(([id,t])=>({a:'en-'+id,t:`${t.split(' · ')[0]} · ${A[P[id]].n}`})),{a:'progs',t:pair?_t("Програми пари"):_t("Програми")},...(pair?[]:[{a:'year',t:`${_f("Рік {0} · {1}",[curAge(),P.YEARS[curAge()].join('-')])}`}])];
  pdfBlocks.toc=TOC;
  B.push(`<div class="pc"><div class="pk">[ ${pair?_t("матриця сумісності"):_t("матриця долі")} ]</div><h1>${pair?_t("Сумісність"):_t("Матриця")} <b>${who||_t("долі")}</b></h1><div class="pmeta">${meta}</div>
    <img class="pimg" src="${png}" alt="">
    <div class="pcodes"><span data-go="en-E">${pair?_t("Енергія союзу"):_t("Центр")}<b>${P.E} · ${A[P.E].n}</b></span><span data-go="pr-tail">${pair?_t("Кармічна програма"):_t("Кармічний хвіст")}<b>${tail.join('-')}${tn?` · ${PN(tn)}`:''}</b></span><span data-go="en-PERS">${_f("Призначення<b>{0} · {1}</b>",[P.PERS,A[P.PERS].n])}</span>${pair?'':`<span data-go="year">${_f("Цей рік<b>{0}</b>",[P.YEARS[curAge()].join('-')])}</span>`}</div>
    <div class="ptoc"><div class="pk">${_t("[ зміст · натисніть, щоб перейти ]")}</div><div class="ptoc-g">${TOC.map(e=>`<span class="ptl" data-go="${e.a}"><span>${e.t}</span><i></i><b>00</b></span>`).join('')}</div></div></div>`);
  B.push('__break');
  if(!pair){
    const {rows,total}=chakraRows(P);
    B.push(`<div class="psec" data-anchor="chak"><div class="pk">${_t("[ карта здоров’я ]")}</div><h2>${_t("Енергії чакр")}</h2><p class="pmuted">${_t("Фізика — лінія Землі, енергія — лінія Неба, емоції — їхня сума.")}</p>
      <table class="ptab"><thead><tr><th>${_t("Чакра")}</th><th>${_t("Фізика")}</th><th>${_t("Енергія")}</th><th>${_t("Емоції")}</th></tr></thead><tbody>
      ${rows.map((x,i)=>`<tr><td><i style="background:${pv(CHAK[i].c)}"></i><b>${CHAK[i].n}</b><small>${CHAK[i].t.split(LSPLIT).slice(0,2).join(', ')}</small></td><td>${x.ph}</td><td>${x.en}</td><td class="em">${x.em}</td></tr>`).join('')}
      <tr class="tot"><td>${_t("<b>Енергополе</b>")}<small>${_t("загальний підсумок")}</small></td><td>${total.ph}</td><td>${total.en}</td><td class="em">${total.em}</td></tr></tbody></table></div>`);
    rows.forEach((x,i)=>B.push(`<div class="pblk"><div class="phd">${pNum(x.em,CHAK[i].c)}<div><h3>${CHAK[i].n}</h3><div class="pmeta">${CHAK[i].z} · ${x.ph}/${x.en}/${x.em}</div></div></div><p>${_f("{0}. Фізика ({1}): {2}. Енергія ({3}): наповнюється через {4}. Емоції ({5}): у плюсі — {6}, у мінусі — {7}.",[cap(CHAK[i].t),A[x.ph].n,lc(A[x.ph].hp),A[x.en].n,A[x.en].kw.join(', '),A[x.em].n,items(A[x.em],'p',2),items(A[x.em],'m',2)])}</p><p class="pmuted">${_f("Що підтримує: {0}.",[CHAK[i].pr])}</p></div>`));
  }
  if(!pair){
    const now=curAge()<40?'PERS':curAge()<60?'SOC':'SPIR';
    B.push(`<div class="psec" data-anchor="path"><div class="pk">${_t("[ шлях призначення ]")}</div><h2>${_t("Шлях призначення")}</h2><p class="pmuted">${_t("Небо і Земля дають пошук себе, лінії батька й матері — соціалізацію, разом вони складаються в духовну грамотність.")}</p>
      <table class="ptab"><thead><tr><th>${_t("Етап")}</th><th>${_t("Точка")}</th><th>${_t("Енергія")}</th></tr></thead><tbody>
      ${PP_ORD.map(id=>{ const n=PP_N[id], st=PP_ST[n.st]; return `<tr><td><i style="background:${pv(st.c)}"></i><b>${_t(st.t)}</b><small>${_t(st.a)}${id===now?' · '+_t("ви зараз тут"):''}</small></td><td>${_t(n.t)}<small>${_t(n.f)}</small></td><td class="em">${P[id]} · ${A[P[id]].n}</td></tr>`; }).join('')}
      </tbody></table></div>`);
    ['PERS','MALE','FEM','SOC','SPIR'].forEach(id=>{ const n=PP_N[id], st=PP_ST[n.st], v=P[id], a=A[v];
      B.push(`<div class="pblk"><div class="phd">${pNum(v,st.c)}<div><div class="pk">${_t(st.t)} · ${_t(st.a)}</div><h3>${_t(n.t)} · ${a.n}</h3></div></div>
        <p class="plead">${_t(n.role)}</p><p><b>${_t("Суть:")}</b> ${cap(a.pur)}.</p>
        <div class="two"><div><h4 class="ok">${_t("У плюсі")}</h4>${pUL(LST(v,'p',3))}</div><div><h4 class="no">${_t("У мінусі")}</h4>${pUL(LST(v,'m',3))}</div></div>
        <h4>${_t("Як пропрацювати")}</h4>${pUL([...(a.how||[]).slice(0,2),cap(a.task)])}</div>`); });
  }
  B.push(`<div class="psec"><div class="pk">${_t("[ основні енергії ]")}</div><h2>${pair?_t("Енергії союзу"):_t("Ваші головні енергії")}</h2></div>`);
  const list=LST0;
  const seenV=new Set();
  list.forEach(([id,t],n)=>{
    const v=P[id], a=A[v];
    if(seenV.has(v)){
      B.push(`<div class="pblk" data-anchor="en-${id}"><div class="phd">${pNum(v,chipCol(id))}<div><div class="pk">${String(n+1).padStart(2,'0')} · ${t}</div><h3>${a.n}</h3></div></div>
        <p class="plead">${posText(id,v,g)}</p><p class="pmuted">${_f("Енергія {0} вже трапилася у вашій матриці вище — тут розбираємо, що вона додає саме в позиції «{1}».",[a.n,t.split(' · ')[0]])}</p></div>`);
      B.push(`<div class="pblk">${a.deep?`<h4>${_t("Прихований сценарій")}</h4>${pUL(a.deep)}`:''}${a.how?`<h4>${_t("Як вивести в плюс")}</h4>${pUL(a.how)}`:''}${a.q?`<h4>${_t("Питання для себе")}</h4>${pUL(a.q.slice(0,3))}`:''}</div>`);
      return;
    }
    seenV.add(v);
    B.push(`<div class="pblk" data-anchor="en-${id}"><div class="phd">${pNum(v,chipCol(id))}<div><div class="pk">${String(n+1).padStart(2,'0')} · ${t}</div><h3>${a.n}</h3></div></div>
      <p class="plead">${posText(id,v,g)}</p><p>${a.d}</p></div>`);
    B.push(`<div class="pblk"><h4>${_t("Як проживається")}</h4><p>${a.live}</p><h4>${_t("Ви впізнаєте себе, якщо…")}</h4>${pUL(a.rec)}</div>`);
    { const L_=pair?null:posLists(id,v);
      B.push(L_?`<div class="pblk two"><div><h4 class="ok">${_t(L_.H[0])}</h4>${pUL(L_.P)}</div><div><h4 class="no">${_t(L_.H[1])}</h4>${pUL(L_.M)}</div></div><div class="pblk"><h4>${_t("Що робити саме тут")}</h4>${pUL(L_.D)}</div>`
        :`<div class="pblk two"><div><h4 class="ok">${_t("Сильні сторони")}</h4>${pUL(a.p.replace(/\.$/,'').split(LSPLIT))}</div><div><h4 class="no">${_t("Слабкі сторони")}</h4>${pUL(a.m.replace(/\.$/,'').split(LSPLIT))}</div></div>`); }
    B.push(`<div class="pblk"><h4>${_t("Як покращити ситуацію")}</h4>${pFix(a)}</div>`);
  });
  B.push(`<div class="psec" data-anchor="progs"><div class="pk">${_t("[ програми ]")}</div><h2>${pair?_t("Програми пари"):_t("Ваші програми")}</h2></div>`);
  ['cen','tail','money','love','pp','sp'].forEach(k=>{
    const pr=getProg(k), tx=progText(pr);
    B.push(`<div class="pblk" data-anchor="pr-${k}"><div class="phd"><span class="pcode">${pr.vals.join('-')}</span><div><div class="pk">${pr.t}${pr.karmic?_t(" · кармічна"):''}</div><h3>${pr.named?`«${PN(pr.named)}»`:`${_f("Програма {0}",[pr.vals.join('-')])}`}</h3></div></div>
      <p>${_f("<b class=\"ok\">У плюсі.</b> {0}",[tx.p])}</p><p>${_f("<b class=\"no\">У мінусі.</b> {0}",[tx.m])}</p><p>${_f("<b>Як проявляється.</b> {0}",[tx.h])}</p><p>${_f("<b class=\"ac\">Як пропрацювати.</b> {0}",[tx.w])}</p></div>`);
  });
  if(!pair){
    const a=curAge(), t=P.YEARS[a], pr=yearProg(a), tx=progText(pr);
    B.push(`<div class="pblk" data-anchor="year"><div class="phd"><span class="pcode">${t.join('-')}</span><div><div class="pk">${_f("Поточний рік · вік {0}",[a])}</div><h3>${pr.named?`«${PN(pr.named)}»`:ARC[t[0]].n}</h3></div></div>
      <p>${_f("{0}. Протилежна точка — {1}, підсумок — {2}.",[cap(YR[t[0]]),ARC[t[1]].n,ARC[t[2]].n])}</p>
      <div class="two"><div><h4 class="ok">${_t("Сценарії в плюсі")}</h4>${pUL(ARC[t[0]].yp)}</div><div><h4 class="no">${_t("Сценарії в мінусі")}</h4>${pUL(ARC[t[0]].ym)}</div></div>
      <h4>${_t("Як прожити рік")}</h4><p>${tx.w}</p></div>`);
  }
  B.push(`<div class="pend">${PDF_WL?(PDF_WL.brand?`<div class="pword">${esc(PDF_WL.brand)}</div>`:''):'<div class="pword">CODE</div>'}<p class="pmuted">${_t("Матриця долі — інструмент самопізнання, а не прогноз чи діагноз.")}</p></div>`);
  return B;
}
/* PDF theme picker — opens at once, prepares the generator, then lets the person choose light or dark */
let PDF_WL=null;
const proOn=()=>{ if(!window.CODE_SB) return true; const sb=USER&&USER.sub; return !!(sb&&sb.plan==='pro'&&sb.paid_until&&new Date(sb.paid_until)>new Date()); };
function pdfDialog(){
  return new Promise(resolve=>{
    const pro=proOn(), wl0=LS.get('code-pdf-wl',{on:false,brand:''});
    const cur=(document.documentElement.getAttribute('data-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'));
    const d=document.createElement('div'); d.className='pdlg'; d.setAttribute('role','dialog'); d.setAttribute('aria-modal','true'); d.setAttribute('aria-labelledby','pdlgT');
    const card=(t,lab)=>`<label class="pd-opt"><input type="radio" name="pdth" value="${t}"${t===cur?' checked':''}><span class="pd-prev ${t}"><i class="g"></i><i class="r"></i><i class="c"></i><i class="l1"></i><i class="l2"></i><i class="b"></i></span><span class="pd-lab"><b>${lab}</b><small>${t==='light'?T('pdLightS'):T('pdDarkS')}</small></span></label>`;
    d.innerHTML=`<div class="pdlg-bg"></div><div class="pdlg-box"><button class="x" type="button" data-pd="x" aria-label="${_t("Закрити")}">${IC_X}</button>
      <p class="pk">[ PDF ]</p><h3 id="pdlgT">${T('pdT')}</h3><p class="pd-sub">${T('pdS')}</p>
      <div class="pd-opts">${card('light',T('pdLight'))}${card('dark',T('pdDark'))}</div>
      ${`<div class="pd-wl${pro?'':' off'}"${pro?'':` data-pd="pro" role="button" tabindex="0"`}><label class="pd-chk"><input type="checkbox" id="pdWl"${pro&&wl0.on?' checked':''}${pro?'':' disabled'}><span class="pd-box" aria-hidden="true"></span><span class="pd-tx"><b>${_t("Без логотипу CODE")}</b><small>${pro?_t("Для роботи з клієнтами: у файлі не буде нашого бренду. Можна вказати своє ім’я або назву практики."):_t("Для роботи з клієнтами: PDF без нашого бренду, з вашим ім’ям. Доступно в тарифі Pro.")}</small></span>${pro?'':'<em class="aim-tag">Pro</em>'}</label>${pro?`<input class="pd-brand" id="pdBrand" maxlength="40" autocomplete="organization" placeholder="${_t("Ваше ім’я або бренд (необов’язково)")}" value="${esc(wl0.brand||'')}"${wl0.on?'':' hidden'}>`:''}</div>`}
      <div class="pd-acts"><button class="btn ghost sm" type="button" data-pd="x">${T('pdCancel')}</button><button class="btn go sm" type="button" data-pd="ok" disabled><span class="pd-spin" aria-hidden="true"></span><span class="pd-t">${T('pdPrep')}</span></button></div></div>`;
    document.body.appendChild(d); requestAnimationFrame(()=>d.classList.add('in'));
    const ok=d.querySelector('[data-pd=ok]'), okT=ok.querySelector('.pd-t'); let busy=false, done=false;
    const close=()=>{ if(done) return; done=true; d.classList.remove('in'); setTimeout(()=>d.remove(),250); document.removeEventListener('keydown',key,true); };
    const key=e=>{ if(e.key==='Escape'&&!busy){ e.preventDefault(); e.stopImmediatePropagation(); close(); resolve(null); } };
    document.addEventListener('keydown',key,true);
    { const cb=d.querySelector('#pdWl'), br=d.querySelector('#pdBrand'); if(cb&&br) cb.addEventListener('change',()=>{ br.hidden=!cb.checked; if(cb.checked) br.focus({preventScroll:true}); }); }
    d.addEventListener('keydown',e=>{ if((e.key==='Enter'||e.key===' ')&&e.target.matches('[data-pd=pro]')){ e.preventDefault(); e.target.click(); } });
    d.addEventListener('click',e=>{
      if(busy) return;
      if(e.target.closest('[data-pd=pro]')){ close(); resolve(null); openPlans(); return; }
      if(e.target.closest('[data-pd=x]')||e.target.classList.contains('pdlg-bg')){ close(); resolve(null); return; }
      if(e.target.closest('[data-pd=ok]')&&!ok.disabled){ busy=true; d.classList.add('busy'); ok.disabled=true;
        const cb=d.querySelector('#pdWl'), br=d.querySelector('#pdBrand'), wl=pro&&cb&&cb.checked?{on:true,brand:(br&&br.value||'').trim().slice(0,40)}:null;
        if(pro) LS.set('code-pdf-wl',{on:!!wl,brand:br?br.value.trim().slice(0,40):''});
        resolve({theme:d.querySelector('input[name=pdth]:checked').value,wl,set:t=>{okT.textContent=t;},close}); }
    });
    d.ready=()=>{ ok.disabled=false; okT.textContent=T('pdGo'); d.classList.add('ready'); ok.focus({preventScroll:true}); };
    d.fail=()=>{ close(); resolve(null); };
    pdfDialog.cur=d;
  });
}
async function downloadCode(btn,src){
  let dl=window.claude&&window.claude.use?await window.claude.use('downloads').catch(()=>null):null;
  /* outside Claude: save the PDF straight from the browser */
  if(!dl) dl={save:async({filename,data})=>{ const u=URL.createObjectURL(data), a=document.createElement('a'); a.href=u; a.download=filename; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(u),4000); }};
  btn.disabled=true;
  const pick=pdfDialog(), d=pdfDialog.cur;
  try{
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
    if(document.fonts&&document.fonts.ready) await document.fonts.ready;
    d.ready();
  }catch(e){ d.fail(); toast(_t("Не вдалося підготувати PDF. Спробуйте ще раз.")); btn.disabled=false; return; }
  const ch=await pick;
  if(!ch){ btn.disabled=false; return; }
  try{ await renderPdf(dl,ch.theme,ch.set,ch.wl,src); toast(_t("PDF збережено.")); }
  catch(e){ if(e&&e.code==='declined'){} else if(e&&e.code==='rate_limited') toast(_t("Вікно збереження вже відкрите.")); else toast(_t("Не вдалося сформувати PDF. Спробуйте ще раз.")); }
  finally{ ch.close(); btn.disabled=false; }
}
/* splits paragraph html between sentences, never inside a tag */
function sentSplit(h){ const out=[]; let d=0,st=0; const re=/<(\/?)([a-z0-9]+)[^>]*?(\/?)>|[.!?…](?=\s|<\/)/gi; let m;
  while((m=re.exec(h))){ if(m[2]){ if(/^(br|img|hr|wbr)$/i.test(m[2])||m[3]) continue; d+=m[1]?-1:1; continue; }
    let e=re.lastIndex; const cl=h.slice(e).match(/^(<\/[a-z0-9]+>)*/i); if(d>0&&cl&&cl[0]){ const n=(cl[0].match(/<\//g)||[]).length; if(n>=d){ e+=cl[0].length; d=0; re.lastIndex=e; } }
    if(d===0){ const piece=h.slice(st,e).trim(); if(piece) out.push(piece); st=e; } }
  const tail=h.slice(st).trim(); if(tail) out.push(tail); return out; }
/* PDF of a paid AI reading (personal reading or 12-month forecast): cover with the matrix + clickable contents, one block per ## section */
function aiPdfSrc(kind,text,ts,who,img){
  const title=kind==='report'?_t("Персональний розбір"):_t("Прогноз на 12 місяців"), parts=[]; let cur={t:'',b:''};
  String(text||'').split('\n').forEach(l=>{ const m=l.match(/^#{1,2}\s+(.+)/); if(m){ if(cur.t||cur.b.trim()) parts.push(cur); cur={t:m[1].replace(/\*\*/g,'').trim(),b:''}; } else cur.b+=l+'\n'; });
  if(cur.t||cur.b.trim()) parts.push(cur);
  const toc=parts.map((x,i)=>x.t?{a:'s'+i,t:x.t}:null).filter(Boolean);
  const date=new Date(ts||Date.now()).toLocaleDateString(LOC(),{day:'numeric',month:'long',year:'numeric'});
  return {head:title,foot:kind==='report'?_t("персональний розбір"):_t("прогноз на рік"),fname:`${kind==='report'?_t("Розбір"):_t("Прогноз")}-${who.name||''}-${who.date}`.replace(/\s+/g,'-'),img,toc,
    blocks:png=>[`<div class="pc"><div class="pk">[ ${kind==='report'?_t("персональний розбір від ШІ"):_t("прогноз на 12 місяців")} ]</div><h1>${kind==='report'?_t("Розбір"):_t("Прогноз")} <b>${esc(who.name||'')}</b></h1><div class="pmeta">${_f("{0} · створено {1}",[who.date,date])}</div>${png?`<img class="pimg" src="${png}" alt="">`:''}
      ${toc.length?`<div class="ptoc"><div class="pk">${_t("[ зміст · натисніть, щоб перейти ]")}</div><div class="ptoc-g">${toc.map(e=>`<span class="ptl" data-go="${e.a}"><span>${esc(e.t)}</span><i></i><b>00</b></span>`).join('')}</div></div>`:''}</div>`,'__break',
      ...parts.map((x,i)=>`<div class="pblk pai"${x.t?` data-anchor="s${i}"`:''}>${x.t?`<h3>${esc(x.t)}</h3>`:''}${tpMd(x.b.trim())}</div>`)]};
}
/* lays blocks out page after page; a block that does not fit is split between pages instead of jumping whole */
const PDF_MOB=()=>matchMedia('(max-width: 820px)').matches||matchMedia('(pointer: coarse) and (max-width: 1100px)').matches;
async function renderPdf(dl,theme,setStatus,wl,src){
  PDFPAL=theme==='light'?PAL_L:PAL_D; PDF_WL=wl&&wl.on?wl:null;
  const BRAND=PDF_WL?esc(PDF_WL.brand||''):'CODE';
  const MOBP=PDF_MOB(), PW=MOBP?430:794, WPT=MOBP?322.5:595.28, HPT=MOBP?645:841.89;
  let host;
  try{
    setStatus(T('pdBuild'));
    const png=src&&!src.img?'':await matrixPng();
    host=document.createElement('div'); host.className='pdf-host'+(MOBP?' mob':''); document.body.appendChild(host);
    const pages=[];
    const newPage=()=>{const p=document.createElement('div');p.className='pdf-page'+(theme==='light'?' light':'')+(MOBP?' mob':'');p.innerHTML=`<div class="pglow"></div><div class="pglow2"></div><div class="ph"><span data-go="cover">${BRAND}</span><span data-go="cover">${_f("{0} · зміст ↑",[src?src.head:isPair()?_t("Матриця сумісності"):_t("Матриця долі")])}</span></div><div class="pb"></div><div class="pf"></div>`;host.appendChild(p);pages.push(p);return p.querySelector('.pb');};
    let body=newPage();
    /* safety slack: html2canvas wraps text a bit taller than the browser (esp. iOS), so leave room or the last lines get clipped */
    const SLACK=MOBP?40:24, fits=()=>{ const l=body.lastElementChild; if(!l) return true; const pbm=parseFloat(getComputedStyle(body).paddingBottom)||0; return l.offsetTop+l.offsetHeight<=body.clientHeight-pbm-SLACK; };
    const LIST=el=>el.matches&&el.matches('ul,.pz,.ptoc-g');
    const HEAD=el=>el.matches&&el.matches('h3,h4,.phd,.pk');
    const free=()=>body.clientHeight-(body.lastElementChild?body.lastElementChild.offsetTop+body.lastElementChild.offsetHeight-body.offsetTop:0);
    async function place(el){
      body.appendChild(el);
      const imgs=[...el.querySelectorAll('img')]; await Promise.all(imgs.map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r})));
      if(fits()) return;
      const PSPL=x=>x&&x.tagName==='P'&&sentSplit(x.innerHTML).length>1;
      const splittable=el.classList.contains('pblk')&&!el.classList.contains('two')&&(el.children.length>1||PSPL(el.firstElementChild));
      if(splittable){
        const rest=el.cloneNode(false); rest.classList.add('cont'); rest.removeAttribute('data-anchor');
        while(!fits()&&(el.children.length>1||PSPL(el.lastElementChild))){
          const last=el.lastElementChild;
          if(LIST(last)&&last.children.length>1){
            const lrest=last.cloneNode(false);
            while(!fits()&&last.children.length>1) lrest.insertBefore(last.lastElementChild,lrest.firstChild);
            rest.insertBefore(lrest,rest.firstChild);
            if(fits()) break;
            continue;
          }
          /* a long paragraph is split between sentences instead of being cut off or jumping whole */
          if(last.tagName==='P'){ const ss=sentSplit(last.innerHTML); if(ss.length>1){
            const tail=[]; while(!fits()&&ss.length>1){ tail.unshift(ss.pop()); last.innerHTML=ss.join(' '); }
            const p2=last.cloneNode(false); p2.innerHTML=tail.join(' '); rest.insertBefore(p2,rest.firstChild);
            if(fits()||el.children.length===1) break; last.innerHTML=ss.join(' ')+' '+p2.innerHTML; p2.remove(); } }
          if(el.children.length===1) break;
          rest.insertBefore(last,rest.firstChild);
        }
        while(el.children.length>1&&HEAD(el.lastElementChild)) rest.insertBefore(el.lastElementChild,rest.firstChild);
        const onlyHead=[...el.children].every(HEAD);
        if(fits()&&!onlyHead&&rest.children.length){ body=newPage(); await place(rest); return; }
        while(rest.firstChild) el.appendChild(rest.firstChild);
        /* merge split lists back */
        el.querySelectorAll('ul+ul,.pz+.pz').forEach(x=>{ const prev=x.previousElementSibling; if(prev&&prev.tagName===x.tagName&&prev.className===x.className){ while(x.firstChild) prev.appendChild(x.firstChild); x.remove(); } });
      }
      if(body.children.length>1){ body.removeChild(el); const prev=body; body=newPage(); const lc=prev.lastElementChild; if(lc&&lc.classList.contains('psec')&&prev.children.length>1) body.appendChild(lc); await place(el); }
    }
    let BL=src?src.blocks(png):pdfBlocks(png); const TOCL=src?src.toc:pdfBlocks.toc;
    /* phone pages are short: the table of contents gets its own block after the cover */
    if(MOBP) BL=BL.flatMap(b=>{ const k=b.indexOf('<div class="ptoc">'); return k>0?[b.slice(0,k)+'</div>','<div class="pblk ptoc">'+b.slice(k+18).replace(/<\/div>\s*$/,'')]:[b]; });
    /* no tall picture on the cover (or a phone page) → no forced page break: contents and the first sections follow right away */
    if(MOBP||!png){ const i=BL.indexOf('__break'); if(i>=0&&i<3) BL.splice(i,1); }
    { const seenT=new Set(); BL=BL.map(b=>{ if(b==='__break') return b; const t=document.createElement('template'); t.innerHTML=b; dedupeDOM(t.content,seenT); const d=document.createElement('div'); d.appendChild(t.content); return d.innerHTML; }).filter(b=>b==='__break'||/<(p|li|table|img|h1|h2|h3)\b|class="ptl"/.test(b)); }
    for(const b of BL){
      if(b==='__break'){ if(body.children.length) body=newPage(); continue; }
      const w=document.createElement('div'); w.innerHTML=b; await place(w.firstElementChild);
    }
    const AP={cover:0}; pages.forEach((p,i)=>p.querySelectorAll('[data-anchor]').forEach(a=>{ if(!(a.dataset.anchor in AP)) AP[a.dataset.anchor]=i; }));
    host.querySelectorAll('.ptl[data-go]').forEach(l=>{ const n=AP[l.dataset.go]; l.querySelector('b').textContent=n!=null?String(n+1).padStart(2,'0'):''; });
    const KK=WPT/PW;
    const LINKS=pages.map(p=>{ const pr=p.getBoundingClientRect(); return [...p.querySelectorAll('[data-go]')].map(l=>{ const r=l.getBoundingClientRect(); return {x:(r.left-pr.left)*KK,y:(r.top-pr.top)*KK,w:r.width*KK,h:r.height*KK,to:AP[l.dataset.go]}; }).filter(o=>o.to!=null&&o.w>0); });
    pages.forEach((p,i)=>{p.querySelector('.pf').innerHTML=`<span>${_f("{0} · метод Наталії Ладіні",[src?src.foot:isPair()?_t("сумісність"):_t("особиста матриця")])}</span><span>${String(i+1).padStart(2,'0')} / ${String(pages.length).padStart(2,'0')}</span>`;});
    const {jsPDF}=window.jspdf, doc=new jsPDF({unit:'pt',format:MOBP?[WPT,HPT]:'a4',compress:true});
    for(let i=0;i<pages.length;i++){
      setStatus(`${T('pdPage')} ${i+1} / ${pages.length}`);
      const cv=await window.html2canvas(pages[i],{scale:MOBP?3:2,backgroundColor:PDFPAL['--bg'],logging:false,useCORS:true});
      if(i) doc.addPage();
      doc.addImage(cv.toDataURL('image/jpeg',0.88),'JPEG',0,0,WPT,HPT,undefined,'FAST');
      for(const o of LINKS[i]) if(o.to!==i||i>0) try{ doc.link(o.x-2,o.y-2,o.w+4,o.h+4,{pageNumber:o.to+1}); }catch(_){}
    }
    try{ if(doc.outline){ doc.outline.add(null,_t("Обкладинка і зміст"),{pageNumber:1}); (TOCL||[]).forEach(e=>{ if(AP[e.a]!=null) doc.outline.add(null,e.t,{pageNumber:AP[e.a]+1}); }); } }catch(_){}
    setStatus(T('pdSave'));
    const fname=src?(PDF_WL?(PDF_WL.brand?PDF_WL.brand+'-':''):'CODE-')+src.fname.replace(/[\\/:*?"<>|]+/g,'')+(theme==='light'?'-light':'')+(MOBP?'-mobile':'')+'.pdf':(isPair()?`${_f("CODE-сумісність-{0}-{1}",[STATE.a.n||'1',STATE.b.n||'2'])}`:`CODE-${STATE.name||_t("матриця")}-${STATE.d}.${STATE.m}.${STATE.y}`).replace(/^CODE-/,PDF_WL?(PDF_WL.brand?PDF_WL.brand+'-':(isPair()?'':_t("Матриця")+'-')):'CODE-').replace(/[\\/:*?"<>|]+/g,'')+(theme==='light'?'-light':'')+(MOBP?'-mobile':'')+'.pdf';
    await dl.save({filename:fname,data:doc.output('blob')});
  } finally { if(host) host.remove(); PDFPAL=PAL_D; PDF_WL=null; }
}


/* ---------- accounts, cabinet, favourites, menu (prototype: data stays in this browser) ---------- */
const LS={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(_){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch(_){return false}}};
const BM_SVG=`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.5 3.5h11v17l-5.5-4-5.5 4z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`;
let USER=null, AUTH_MODE='login', HOME_MODE='start', GUEST_START=true, PENDING_VIEW=null;
async function hashPw(pw,salt){
  try{ const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(salt+':'+pw)); return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join(''); }
  catch(_){ let h=0; for(const c of salt+pw) h=(h*31+c.charCodeAt(0))|0; return 'x'+h; }
}
const accounts=()=>LS.get('code-acc',{});
const remOn=()=>LS.get('code-remember',true)!==false;
function setSess(email){ if(remOn()){ LS.set('code-sess',email); try{sessionStorage.removeItem('code-sess')}catch(_){} } else { LS.set('code-sess',null); try{sessionStorage.setItem('code-sess',JSON.stringify(email))}catch(_){} } }
document.addEventListener('change',e=>{ if(e.target&&e.target.id==='auRem') LS.set('code-remember',!!e.target.checked); });
function loadSession(){ let ss=null; try{ ss=JSON.parse(sessionStorage.getItem('code-sess')||'null'); }catch(_){} const e=LS.get('code-sess',null)||ss, a=accounts(); USER=e&&a[e]?{email:e,profile:a[e].profile||{},favs:a[e].favs||[],hist:a[e].hist||[]}:null; setAcctIcon(); }
function persistUser(){ const a=accounts(); if(!a[USER.email]) return false; a[USER.email].profile=USER.profile; a[USER.email].favs=USER.favs; a[USER.email].hist=USER.hist||[]; return LS.set('code-acc',a); }
async function register(email,pw,name){
  const a=accounts(); if(a[email]) throw 'exists';
  const salt=Math.random().toString(36).slice(2)+Date.now().toString(36);
  a[email]={salt,hash:await hashPw(pw,salt),profile:{name:name||'',d:0,m:0,y:0,g:'f'},favs:[],created:Date.now()};
  if(!LS.set('code-acc',a)) throw 'storage';
  setSess(email); loadSession();
}
async function login(email,pw){
  const u=accounts()[email]; if(!u) throw 'nouser';
  if(await hashPw(pw,u.salt)!==u.hash) throw 'badpw';
  setSess(email); loadSession();
}
function logout(){ LS.set('code-sess',null); try{sessionStorage.removeItem('code-sess')}catch(_){} USER=null; GUEST_START=true; HOME_MODE='start'; setAcctIcon(); AUTH_MODE='login'; renderHome(); if(STATE&&STATE.P&&!$('#result').hidden) render(); toast(_t("Ви вийшли з акаунта.")); }
const profileReady=p=>p&&p.d&&p.m&&p.y;
function setAcctIcon(){
  const b=$('#acctBtn'); if(!b) return;
  b.classList.toggle('in',!!USER); b.setAttribute('aria-label',USER?T('mCab'):T('aBtnLogin')); b.title=USER?T('mCab'):T('aBtnLogin');
  document.querySelectorAll('.acct-l').forEach(x=>x.textContent=USER?T('mCab'):T('mLogin'));
}

/* favourites */
function favKey(st){ return st.mode==='pair'?`p|${st.a.n}|${st.a.d}.${st.a.m}.${st.a.y}|${st.b.n}|${st.b.d}.${st.b.m}.${st.b.y}`:`s|${st.name}|${st.d}.${st.m}.${st.y}|${st.g}`; }
const isFav=()=>!!(USER&&STATE&&STATE.P&&USER.favs.some(f=>f.k===favKey(STATE)));
function bmBtn(){ if(!USER||!STATE||!STATE.P) return ''; const on=isFav(); return `<button class="bm${on?' on':''}" id="bmBtn" type="button" aria-pressed="${on}" aria-label="${on?T('bmDel'):T('bmAdd')}" title="${on?T('bmDel'):T('bmAdd')}">${BM_SVG}</button>`; }
function toggleFav(){
  if(!USER||!STATE||!STATE.P) return;
  const k=favKey(STATE), i=USER.favs.findIndex(f=>f.k===k);
  if(i>=0){ USER.favs.splice(i,1); toast(_t("Прибрано з обраного.")); }
  else{
    const f=STATE.mode==='pair'?{k,type:'pair',a:{...STATE.a},b:{...STATE.b},ts:Date.now()}:{k,type:'solo',name:STATE.name,d:STATE.d,m:STATE.m,y:STATE.y,g:STATE.g,ts:Date.now()};
    USER.favs.unshift(f); toast(_t("Додано в обране — шукайте в кабінеті."));
  }
  persistUser();
  const b=$('#bmBtn'); if(b){ const on=isFav(); b.classList.toggle('on',on); b.setAttribute('aria-pressed',String(on)); b.setAttribute('aria-label',on?T('bmDel'):T('bmAdd')); }
}
function openFav(f){
  if(f.type==='pair'){
    setMode('pair');
    [[f.a,1],[f.b,2]].forEach(([o,i])=>{$('#n'+i).value=o.n||'';$('#y'+i).value=o.y;$('#m'+i).value=o.m;$('#m'+i).dispatchEvent(new Event('change'));$('#d'+i).value=o.d;});
    window.csSync&&window.csSync(); $('#qp').requestSubmit();
  } else { setMode('solo'); fill(f); $('#q').requestSubmit(); }
}

/* home: auth or cabinet (replaces the old hero) */
let AUTH_FROM=null;
function closeAuth(){
  const f=AUTH_FROM; AUTH_FROM=null;
  if(f==='result'&&hasResult()){ $('#home').hidden=true; $('#result').hidden=false; document.body.classList.remove('auth-on'); render(); window.scrollTo({top:0,behavior:'smooth'}); return; }
  if(f==='guide'){ document.body.classList.remove('auth-on'); showGuide(); return; }
  if(f==='tarot'){ document.body.classList.remove('auth-on'); showTarot(); return; }
  GUEST_START=true; showHome('start');
}
function showHome(mode){ if(typeof sheetClose==='function') sheetClose(); if(mode==='cab'&&!USER){ const g=document.getElementById('guide'); const tt=document.getElementById('tarot'); AUTH_FROM=!$('#result').hidden?'result':(g&&!g.hidden)?'guide':(tt&&!tt.hidden)?'tarot':'start'; } if(mode) HOME_MODE=mode; if(mode==='cab') GUEST_START=false; closeDrawer(); $('#home').hidden=false; $('#result').hidden=true; renderHome(); window.scrollTo({top:0,behavior:'smooth'}); }
function backToResult(){ $('#home').hidden=true; $('#result').hidden=false; render(); window.scrollTo({top:0,behavior:'smooth'}); }
const hasResult=()=>!!(STATE&&STATE.P);
const IC_GOOGLE=`<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.23c0-.68-.06-1.33-.17-1.96H12v3.7h5.4a4.6 4.6 0 0 1-2 3.02v2.5h3.23c1.9-1.74 2.97-4.3 2.97-7.26z"/><path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.43l-3.23-2.5c-.9.6-2.04.95-3.39.95-2.6 0-4.81-1.76-5.6-4.13H3.07v2.58A10 10 0 0 0 12 22z"/><path fill="#FBBC05" d="M6.4 13.89a6 6 0 0 1 0-3.78V7.53H3.07a10 10 0 0 0 0 8.94l3.33-2.58z"/><path fill="#EA4335" d="M12 5.98c1.47 0 2.79.5 3.83 1.5l2.86-2.86A9.6 9.6 0 0 0 12 2 10 10 0 0 0 3.07 7.53L6.4 10.1C7.19 7.74 9.4 5.98 12 5.98z"/></svg>`;
const IC_APPLE=`<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.37 12.6c-.02-2.1 1.72-3.12 1.8-3.17-.98-1.43-2.5-1.63-3.05-1.65-1.3-.13-2.53.76-3.19.76-.66 0-1.67-.74-2.75-.72a4.07 4.07 0 0 0-3.44 2.09c-1.47 2.55-.38 6.32 1.05 8.39.7 1.01 1.53 2.15 2.62 2.11 1.05-.04 1.45-.68 2.72-.68 1.27 0 1.63.68 2.74.66 1.13-.02 1.85-1.03 2.54-2.05.8-1.17 1.13-2.3 1.15-2.36-.03-.01-2.2-.85-2.22-3.36zM14.3 6.43c.58-.7.97-1.68.86-2.65-.83.03-1.84.55-2.44 1.25-.53.62-1 1.62-.88 2.57.93.07 1.88-.47 2.46-1.17z"/></svg>`;
let AUTH_ANIM_DONE=false;
function authHTML(){
  const L=AUTH_MODE==='login', anim=AUTH_ANIM_DONE?' played':'';
  return `<button class="ib as-x" id="asClose" type="button" aria-label="${_t("Закрити")}" data-tip="${_t("Закрити")}">${IC_X}</button>
    <div class="as-l">
      <div class="as-in fade">
        <h2>${L?T('aHLogin'):T('aHReg')}</h2>
        <p class="sub">${L?T('aSubLogin'):T('aSubReg')}</p>
        <div class="sso"><button class="sso-b" type="button" data-sso="Google">${IC_GOOGLE}<span>${_t("Увійти через Google")}</span></button></div>
        <div class="or"><span>${T('aOr')}</span></div>
        <form id="authForm" novalidate>
          ${L?'':`<div class="field"><label for="auName">${T('name')}</label><input id="auName" class="nm" autocomplete="given-name" autocapitalize="words" maxlength="40" placeholder="${T('namePh')}"></div>`}
          <div class="field"><label for="auEmail">${T('aEmail')}</label><input id="auEmail" type="email" autocomplete="email" inputmode="email" placeholder="you@email.com" required></div>
          <div class="field"><label for="auPw">${T('aPw')}</label><input id="auPw" type="password" autocomplete="${L?'current-password':'new-password'}" placeholder="${L?T('aPwLogin'):T('aPwReg')}" required>${L?'':`<small class="hint">${T('aPwHint')}</small>`}</div>
          ${L?'':`<div class="field"><label for="auPromo">${_t("Промокод")} <span class="muted">${_t("(необов’язково)")}</span></label><input id="auPromo" autocomplete="off" autocapitalize="characters" maxlength="30" placeholder="${_t("Якщо є")}" value="${esc((()=>{ try{ return localStorage.getItem('code-promo')||''; }catch(_){ return ''; } })())}"></div>`}
          <label class="agree au-rem"><input type="checkbox" id="auRem"${remOn()?' checked':''}><span class="box" aria-hidden="true"></span><span>${_t("Запам’ятати мене на цьому пристрої")}</span></label>
          <div class="err" id="auErr" role="alert" hidden></div>
          <button class="btn go wide" type="submit">${L?T('aBtnLogin'):T('aBtnReg')}</button>
        </form>
        <p class="switch">${L?`${T('aNo')} <button type="button" data-am="register">${T('aNoB')}</button>`:`${T('aHave')} <button type="button" data-am="login">${T('aHaveB')}</button>`}</p>
        ${L?'':`<label class="agree"><input type="checkbox" id="auAgree"><span class="box" aria-hidden="true"></span><span>${T('aAgree1')} <button type="button" class="lnk" data-more="doc:privacy">${T('aAgree2')}</button></span></label>`}
      </div>
      <nav class="as-foot"><button type="button" data-more="doc:help">${T('aHelp')}</button><i>/</i><button type="button" data-more="doc:terms">${T('aTerms')}</button><i>/</i><button type="button" data-more="doc:privacy">${T('aPriv')}</button></nav>
    </div>
    <div class="as-r${anim}" aria-hidden="true">
      <canvas class="as-comets" id="asComets"></canvas>
      <div class="as-r-in">
        <div class="as-word">${'CODE'.split('').map((c,i)=>`<span style="--i:${i}">${c}</span>`).join('')}</div>
      </div>
    </div>`;
}
/* leaving the home screen any other way drops the sign-in layout */
(()=>{ const h=document.getElementById('home'); if(h) new MutationObserver(()=>{ if(h.hidden&&document.body.classList.contains('auth-on')) document.body.classList.remove('auth-on'); }).observe(h,{attributes:true,attributeFilter:['hidden']}); })();
/* shooting stars on the right half of the sign-in screen: rare, light, random directions */
function startComets(){
  const cv=document.getElementById('asComets'); if(!cv||cv.dataset.on) return; cv.dataset.on='1';
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cx=cv.getContext('2d'); let W=0,H=0,dpr=1,list=[],next=performance.now()+900;
  const stars=Array.from({length:46},()=>({x:Math.random(),y:Math.random(),r:.5+Math.random()*1.3,ph:Math.random()*6.28,sp:.5+Math.random()*1.4,big:Math.random()<.14}));
  const size=()=>{ dpr=Math.min(devicePixelRatio||1,2); W=cv.clientWidth; H=cv.clientHeight; cv.width=W*dpr; cv.height=H*dpr; cx.setTransform(dpr,0,0,dpr,0,0); };
  size(); const ro=new ResizeObserver(size); ro.observe(cv);
  const spawn=()=>{
    const an=(Math.random()*Math.PI*2), sp=520+Math.random()*420, len=70+Math.random()*90;
    const x=W*(.1+Math.random()*.8), y=H*(.08+Math.random()*.84);
    list.push({x,y,vx:Math.cos(an)*sp,vy:Math.sin(an)*sp,len,life:0,dur:.9+Math.random()*.7});
  };
  let last=performance.now();
  const tick=t=>{
    if(!cv.isConnected){ ro.disconnect(); return; }
    const dt=Math.min(.05,(t-last)/1000); last=t;
    if(t>next){ spawn(); if(Math.random()<.18) spawn(); next=t+2200+Math.random()*3600; }
    cx.clearRect(0,0,W,H);
    const rgb=(getComputedStyle(document.documentElement).getPropertyValue('--star').trim()||'226,230,255');
    const ts=t/1000;
    for(const st of stars){
      const a=.25+.75*(.5+.5*Math.sin(ts*st.sp+st.ph)), x=st.x*W, y=st.y*H;
      if(st.big){ const g=cx.createRadialGradient(x,y,0,x,y,st.r*7); g.addColorStop(0,`rgba(${rgb},${.55*a})`); g.addColorStop(1,`rgba(${rgb},0)`); cx.fillStyle=g; cx.beginPath(); cx.arc(x,y,st.r*7,0,6.283); cx.fill();
        cx.strokeStyle=`rgba(${rgb},${.5*a})`; cx.lineWidth=.8; cx.beginPath(); cx.moveTo(x-st.r*5,y); cx.lineTo(x+st.r*5,y); cx.moveTo(x,y-st.r*5); cx.lineTo(x,y+st.r*5); cx.stroke(); }
      cx.fillStyle=`rgba(${rgb},${a})`; cx.beginPath(); cx.arc(x,y,st.r,0,6.283); cx.fill();
    }
    list=list.filter(c=>{
      c.life+=dt; c.x+=c.vx*dt; c.y+=c.vy*dt; const k=c.life/c.dur; if(k>=1) return false;
      const a=Math.sin(Math.PI*k), v=Math.hypot(c.vx,c.vy), tx=c.x-c.vx/v*c.len, ty=c.y-c.vy/v*c.len;
      const g=cx.createLinearGradient(c.x,c.y,tx,ty); g.addColorStop(0,`rgba(${rgb},${.9*a})`); g.addColorStop(1,`rgba(${rgb},0)`);
      cx.strokeStyle=g; cx.lineWidth=1.4; cx.lineCap='round'; cx.beginPath(); cx.moveTo(c.x,c.y); cx.lineTo(tx,ty); cx.stroke();
      cx.fillStyle=`rgba(${rgb},${a})`; cx.beginPath(); cx.arc(c.x,c.y,1.5,0,Math.PI*2); cx.fill();
      return true;
    });
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
/* light waves under the start headline: soft luminous strands drifting like ribbons */
function startWaves(cv){
  if(!cv) return; const cx=cv.getContext('2d'); let W=0,H=0,dpr=1,raf=0,t0=performance.now();
  const still=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const PAL={dark:{mode:'lighter',cols:['138,92,255','255,92,200','40,210,255','92,120,255','255,150,80'],glow:.17,core:.52},
             light:{mode:'source-over',cols:['110,70,250','236,72,170','20,170,230','70,100,245','250,130,60'],glow:.13,core:.36}};
  const N=9, S=Array.from({length:N},(_,i)=>({a:.18+.5*((i*37)%9)/9, k:.0016+.0011*((i*53)%7)/7, w:.00062+.00045*((i*29)%5)/5, p:i*1.7, k2:.0042+.002*((i*17)%5)/5, w2:.0009+.0006*((i*13)%4)/4, q:i*2.3, c:i%5, lw:i%3===0?2:i%3===1?1.3:.8}));
  const size=()=>{ const r=cv.getBoundingClientRect(); dpr=Math.min(devicePixelRatio||1,2); W=r.width; H=r.height; cv.width=Math.round(W*dpr); cv.height=Math.round(H*dpr); cx.setTransform(dpr,0,0,dpr,0,0); if(still&&W&&H) requestAnimationFrame(draw); };
  const theme=()=>{ const t=document.documentElement.getAttribute('data-theme'); return t?t:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'); };
  const draw=t=>{
    if(!cv.isConnected){ cancelAnimationFrame(raf); removeEventListener('resize',size); return; }
    if(!W||!H||Math.abs(cv.getBoundingClientRect().width-W)>1){ size(); if(!W||!H){ raf=requestAnimationFrame(draw); return; } }
    const P=PAL[theme()]||PAL.dark, dk=theme()==='dark', tt=Math.max(0,t-t0), soft=W<640?.7:1; cx.clearRect(0,0,W,H); cx.globalCompositeOperation=P.mode; cx.lineCap='round';
    if(W<640){ /* phones: one soft orb drifting side to side, slowly changing hue */
      const sw=Math.sin(tt*.00042), x=W/2+W*.30*sw, y=H*.5+H*.08*Math.sin(tt*.0009), R=Math.min(H*.62,W*.42);
      const f=(tt*.00012)%5, i0=Math.floor(f), u=f-i0, A=P.cols[i0].split(',').map(Number), B=P.cols[(i0+1)%5].split(',').map(Number), c=A.map((v,k)=>Math.round(v+(B[k]-v)*u)).join(','), c2=P.cols[(i0+3)%5];
      const g=cx.createRadialGradient(x,y,0,x,y,R); g.addColorStop(0,`rgba(${c},${dk?.55:.42})`); g.addColorStop(.45,`rgba(${c},${dk?.22:.16})`); g.addColorStop(1,`rgba(${c},0)`);
      cx.globalCompositeOperation='source-over'; cx.fillStyle=g; cx.beginPath(); cx.arc(x,y,R,0,7); cx.fill();
      const x2=x-W*.12*sw, g2=cx.createRadialGradient(x2,y,0,x2,y,R*.55); g2.addColorStop(0,`rgba(${c2},${dk?.22:.14})`); g2.addColorStop(1,`rgba(${c2},0)`);
      cx.fillStyle=g2; cx.beginPath(); cx.arc(x2,y,R*.55,0,7); cx.fill();
      if(!still) raf=requestAnimationFrame(draw); return; }
    const mid=H*.5, amp=H*.34;
    for(let i=0;i<N;i++){ const s=S[i];
      const path=new Path2D(); for(let x=-20;x<=W+20;x+=8){
        const env=.55+.45*Math.sin(x*.0011+tt*.00021+s.p);
        const y=mid+amp*s.a*env*Math.sin(x*s.k+tt*s.w+s.p)+amp*.22*Math.sin(x*s.k2-tt*s.w2+s.q);
        x<=-20?path.moveTo(x,y):path.lineTo(x,y); }
      const g=cx.createLinearGradient(0,0,W,0), sf=tt*.00022+i*.4, mixc=f=>{ f=Math.abs(f); const i0=((Math.floor(f)%5)+5)%5, i1=(i0+1)%5, u=f-Math.floor(f), A=P.cols[i0].split(',').map(Number), B=P.cols[i1].split(',').map(Number); return A.map((v,k)=>Math.round(v+(B[k]-v)*u)).join(','); }, c1=mixc(s.c+sf), c2=mixc(s.c+2+sf), c3=mixc(s.c+4+sf);
      const sh=(Math.sin(tt*.0006+i)+1)/2;
      g.addColorStop(0,`rgba(${c1},0)`); g.addColorStop(.2+.1*sh,`rgba(${c1},1)`); g.addColorStop(.5,`rgba(${c2},1)`); g.addColorStop(.8-.1*sh,`rgba(${c3},1)`); g.addColorStop(1,`rgba(${c3},0)`);
      cx.strokeStyle=g;
      cx.globalAlpha=P.glow*soft; cx.lineWidth=s.lw*34; cx.stroke(path);
      cx.globalAlpha=P.glow*1.6*soft; cx.lineWidth=s.lw*12; cx.stroke(path);
      cx.globalAlpha=P.core*soft; cx.lineWidth=s.lw*4; cx.stroke(path);
    }
    cx.globalAlpha=1; cx.globalCompositeOperation='source-over';
    if(!still) raf=requestAnimationFrame(draw);
  };
  size(); addEventListener('resize',size); try{ new ResizeObserver(()=>size()).observe(cv); }catch(_){}
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(size);
  raf=requestAnimationFrame(draw);
}
/* "РОЗРАХУЙ" built from ever-changing digits (Matrix-style), in plain white / black */
function matrixWord(el){
  const tx=el&&el.querySelector('.lt-t'), cv=el&&el.querySelector('.lt-cv'); if(!tx||!cv) return;
  const cx=cv.getContext('2d'), mk=document.createElement('canvas'), mx=mk.getContext('2d');
  const still=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W=0,H=0,d=1,cell=8,cols=0,rows=0,grid=[],heads=[],last=0,raf=0,ok=false;
  const dark=()=>{ const t=document.documentElement.getAttribute('data-theme'); return t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches; };
  const layout=()=>{
    const r=el.getBoundingClientRect(); if(!r.width) return;
    d=Math.min(devicePixelRatio||1,2); W=r.width; H=r.height;
    cv.width=mk.width=Math.round(W*d); cv.height=mk.height=Math.round(H*d);
    cx.setTransform(d,0,0,d,0,0); mx.setTransform(d,0,0,d,0,0);
    const cs=getComputedStyle(tx), fs=parseFloat(cs.fontSize)||80;
    cell=Math.max(4.5,fs*.072); cols=Math.ceil(W/cell)+1; rows=Math.ceil(H/cell)+1;
    grid=Array.from({length:cols*rows},()=>(Math.random()*10)|0);
    heads=Array.from({length:cols},()=>({y:Math.random()*rows,v:.06+Math.random()*.12}));
    /* the word as a mask: each letter drawn where the real letter sits, a heavier cut so the digits have room */
    mx.clearRect(0,0,W,H); mx.fillStyle=dark()?'#fff':'#000'; mx.textBaseline='middle'; mx.textAlign='left';
    mx.font=`560 ${fs}px ${cs.fontFamily}`;
    const node=tx.firstChild, rg=document.createRange();
    if(node) for(let i=0;i<node.length;i++){ rg.setStart(node,i); rg.setEnd(node,i+1); const q=rg.getBoundingClientRect(); if(!q.width) continue;
      const ch=cs.textTransform==='uppercase'?node.data[i].toLocaleUpperCase('uk'):node.data[i], w=mx.measureText(ch).width||q.width, sx=q.width/w;
      mx.save(); mx.translate(q.left-r.left,(q.top+q.bottom)/2-r.top); mx.scale(Math.min(1.08,Math.max(.85,sx)),1); mx.fillText(ch,0,0); mx.restore(); }
    ok=true; el.classList.add('mx-on'); draw(performance.now(),true);
  };
  const draw=(t,force)=>{
    if(!el.isConnected){ cancelAnimationFrame(raf); return; }
    if(ok&&(force||t-last>70)){ last=t;
      const ink=dark()?'255,255,255':'0,0,0';
      cx.globalCompositeOperation='source-over'; cx.clearRect(0,0,W,H);
      cx.font=`600 ${cell*1.08}px "JetBrains Mono",ui-monospace,monospace`; cx.textAlign='center'; cx.textBaseline='middle';
      for(let i=0;i<cols;i++){ const h=heads[i]; if(!still){ h.y+=h.v*cell*.35; if(h.y>rows+8){ h.y=-Math.random()*rows; h.v=.06+Math.random()*.12; } }
        for(let j=0;j<rows;j++){ const k=j*cols+i; if(!still&&Math.random()<.05) grid[k]=(Math.random()*10)|0;
          const dist=h.y-j, glow=dist>=0&&dist<9?1-dist/9:0, a=.5+.5*glow;
          cx.fillStyle=`rgba(${ink},${a.toFixed(3)})`; cx.fillText(grid[k],i*cell+cell/2,j*cell+cell/2); } }
      cx.globalCompositeOperation='destination-in'; cx.drawImage(mk,0,0,W,H); cx.globalCompositeOperation='destination-over';
      cx.globalAlpha=.22; cx.drawImage(mk,0,0,W,H); cx.globalAlpha=1; cx.globalCompositeOperation='source-over';
    }
    if(!still) raf=requestAnimationFrame(draw);
  };
  const go=()=>{ layout(); if(!still) raf=requestAnimationFrame(draw); };
  (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(()=>setTimeout(go,60));
  let rt; addEventListener('resize',()=>{ clearTimeout(rt); rt=setTimeout(()=>{ if(el.isConnected) layout(); },150); });
  new MutationObserver(()=>{ if(el.isConnected) layout(); }).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
}
function startHTML(){
  const ready=profileReady(USER&&USER.profile);
  return `<div class="start fade">
    <p class="eyebrow">[ code ] <span>${T('eyebrow')}</span></p>
    <div class="start-h"><canvas class="waves" aria-hidden="true"></canvas><h1 class="st-title"><span class="lt">${T('sT1')}</span><br><span class="ac">${T('sT2')}</span></h1></div>
    <p class="lead">${T('sLead')}</p>
    <div class="start-form" id="startForm"></div>
    <div class="start-acts">${ready?`<button class="btn ghost sm" type="button" id="startMine">${T('sMine')}</button>`:''}<button class="btn ghost sm" type="button" id="startCab">${T('sCab')}</button><button class="btn ghost sm st-reset" type="button" id="startReset" hidden><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4.5 4.5v4h4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg><span>${_t("Скинути дані")}</span></button></div>
  </div>`;
}
const IC_PEN=`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-4-4L4 16v4z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M13.5 6.5l4 4" stroke="currentColor" stroke-width="1.7"/></svg>`;
const IC_DL=`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 19.5h14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const IC_DEL=`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 7h14M10 7V5h4v2M7 7l1 12h8l1-12" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const IC_USR=`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8.5" r="3.6" stroke="currentColor" stroke-width="1.7"/><path d="M5 20c1.2-3.6 3.8-5.4 7-5.4s5.8 1.8 7 5.4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`;
const IC_X=`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`;
let CAB_TAB='data', PF_EDIT=false;
const IC_CLOCK=`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8.2" stroke="currentColor" stroke-width="1.7"/><path d="M12 7.5V12l3 2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
function addHist(st){
  if(!USER||!st||!st.P) return;
  const k=favKey(st); USER.hist=(USER.hist||[]).filter(h=>h.k!==k);
  USER.hist.unshift(st.mode==='pair'?{k,type:'pair',a:{...st.a},b:{...st.b},ts:Date.now()}:{k,type:'solo',name:st.name,d:st.d,m:st.m,y:st.y,g:st.g,ts:Date.now()});
  USER.hist=USER.hist.slice(0,60); persistUser();
}
const whenTxt=ts=>{const d=new Date(ts);return `${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2,'0')} · ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;};
function histRow(f,i){
  const st=favState(f), P=st.P, pair=f.type==='pair';
  const title=pair?`${esc(f.a.n||T('p1'))} & ${esc(f.b.n||T('p2'))} <span class="fd">— ${dotDate(f.a.d,f.a.m,f.a.y)} + ${dotDate(f.b.d,f.b.m,f.b.y)}</span>`:`${esc(f.name||'—')} <span class="fd">— ${dotDate(f.d,f.m,f.y)}</span>`;
  return `<div class="fav"><button class="fav-open" type="button" data-hi="${i}"><span class="fn">${P.E}</span><strong>${title}</strong><small>${pair?T('cPairT'):T('cSolo')} · ${T('cCenter')} ${P.E} · ${T('cTail')} ${P.D2}-${P.D1}-${P.D} · ${whenTxt(f.ts)}</small></button>
    <div class="fav-acts"><button class="fav-ic del" type="button" data-hd="${i}" aria-label="${T('cDel')}" title="${T('cDel')}">${IC_DEL}</button></div></div>`;
}
function histPane(){
  const h=USER.hist||[];
  return `<div class="dm-h"><h2>${T('cHistT')}</h2>${h.length?`<button class="btn ghost sm" type="button" id="histClear">${IC_DEL}<span>${T('cClear')}</span></button>`:''}</div>
    ${h.length?`<div class="favs">${h.map(histRow).join('')}</div>`:`<div class="empty"><p>${T('cHistEmpty')}</p></div>`}`;
}

const dotDate=(d,m,y)=>`${String(d).padStart(2,'0')}.${String(m).padStart(2,'0')}.${y}`;
function favState(f){
  if(f.type==='pair'){ const P1=calc(f.a.d,f.a.m,f.a.y),P2=calc(f.b.d,f.b.m,f.b.y); return {mode:'pair',P:overlay(P1,P2),P1,P2,a:f.a,b:f.b,g:'f'}; }
  return {mode:'solo',P:calc(f.d,f.m,f.y),name:f.name,d:f.d,m:f.m,y:f.y,g:f.g||'f'};
}
function favRow(f,i){
  const st=favState(f), P=st.P, pair=f.type==='pair';
  const title=pair?`${esc(f.a.n||T('p1'))} & ${esc(f.b.n||T('p2'))} <span class="fd">— ${dotDate(f.a.d,f.a.m,f.a.y)} + ${dotDate(f.b.d,f.b.m,f.b.y)}</span>`:`${esc(f.name||'—')} <span class="fd">— ${dotDate(f.d,f.m,f.y)}</span>`;
  return `<div class="fav"><button class="fav-open" type="button" data-fi="${i}"><span class="fn">${P.E}</span><strong>${title}</strong><small>${pair?T('cPairT'):T('cSolo')} · ${T('cCenter')} ${P.E} · ${T('cTail')} ${P.D2}-${P.D1}-${P.D}</small></button>
    <div class="fav-acts"><button class="fav-ic" type="button" data-fdl="${i}" aria-label="${T('cPdf')}" title="${T('cPdf')}">${IC_DL}</button><button class="fav-ic del" type="button" data-fd="${i}" aria-label="${T('cDel')}" title="${T('cDel')}">${IC_DEL}</button></div></div>`;
}
function dataPane(p){
  const dis=PF_EDIT?'':' disabled';
  return `<div class="dm-h"><h2>${T('cDataT')}</h2><button class="ib sm-ib" type="button" id="pfEdit" aria-pressed="${PF_EDIT}" aria-label="${PF_EDIT?T('cCancel'):T('cEdit')}" title="${PF_EDIT?T('cCancel'):T('cEdit')}">${PF_EDIT?IC_X:IC_PEN}</button></div>
    <form id="profForm" class="${PF_EDIT?'':'ro'}" novalidate>
      <div class="pf-row1">
        <div class="field"><label for="pfName">${T('name')}</label><input id="pfName" class="nm" autocapitalize="words" maxlength="40" value="${esc(p.name||'')}" placeholder="${T('namePh')}"${dis}></div>
        <div class="seg seg2" role="radiogroup" aria-label="${T('fem')} / ${T('male')}"><input type="radio" name="pfg" id="pfgf" value="f" ${p.g!=='m'?'checked':''}${dis}><label for="pfgf">${T('fem')}</label><input type="radio" name="pfg" id="pfgm" value="m" ${p.g==='m'?'checked':''}${dis}><label for="pfgm">${T('male')}</label></div>
      </div>
      <div class="pf-date">
        <div class="field"><label for="pfD">${T('day')}</label><select id="pfD"${dis}></select></div>
        <div class="field"><label for="pfM">${T('month')}</label><select id="pfM"${dis}></select></div>
        <div class="field"><label for="pfY">${T('year')}</label><select id="pfY"${dis}></select></div>
      </div>
      <div class="err" id="pfErr" role="alert" hidden></div>
      ${PF_EDIT?`<div class="pf-act"><button class="btn go aura" type="submit">${T('cSave')}</button><button class="btn ghost wide" type="button" id="pfCancel">${T('cCancel')}</button></div>`:''}
    </form>
    <p class="pf-note">${T('cNote')}</p>
    ${consentHTML(p)}`;
}
/* consents: cookies on this device + emails (stored in the profile, synced with the account) */
function consentHTML(p){
  const c=(p&&p.consent)||{}, ck=(()=>{ try{ return localStorage.getItem('code-cookies'); }catch(_){ return null; } })();
  const row=(id,on,title,note,dis)=>`<label class="cs-row${dis?' fixed':''}"><input type="checkbox" id="${id}"${on?' checked':''}${dis?' disabled':''}><span class="cs-sw" aria-hidden="true"><i></i></span><span class="cs-t"><b>${title}</b><small>${note}</small></span></label>`;
  return `<section class="consents">
    <div class="cs-h"><h3>${_t("Згоди й сповіщення")}</h3><p>${_t("Оберіть, що можна зберігати й надсилати. Змінити вибір можна будь-коли — він діє одразу.")}</p></div>
    <p class="cs-k">${_t("Cookies і дані на цьому пристрої")}</p>
    ${row('csNeed',true,_t("Необхідні"),_t("Вхід в акаунт, мова, тема й ваш вибір щодо cookies. Без них сайт не працює, тому вимкнути їх не можна."),true)}
    ${row('csAll',ck==='all',_t("Зручність і аналітика"),_t("Підказки «Раніше вводили», запам’ятовування введених даних і анонімна статистика відвідувань, яка допомагає покращувати сайт."))}
    <p class="cs-k">${_t("Листи на {0}").replace('{0}',esc(USER.email||'email'))}</p>
    ${row('csServ',c.service!==false,_t("Сервісні сповіщення"),_t("Нагадування за кілька днів до закінчення підписки, повідомлення про оплату й продовження доступу, важливі зміни в умовах користування."))}
    ${row('csNews',!!c.news,_t("Новини та оновлення CODE"),_t("Нові можливості сайту, статті блогу, сезонні прогнози й спеціальні пропозиції — не частіше кількох разів на місяць."))}
    <p class="cs-f">${_t("Листи надходять з адреси hello@code-matrix.space. Ми не передаємо вашу пошту третім особам. Детальніше — у")} <a href="/privacy.html" target="_blank" rel="noopener">${_t("Політиці конфіденційності")}</a>.</p>
  </section>`;
}
function savedPane(){
  return `<div class="dm-h"><h2>${T('cSavedT')}</h2><span class="dm-count">${USER.favs.length}</span></div>
    ${USER.favs.length?`<div class="favs">${USER.favs.map(favRow).join('')}</div>`:`<div class="empty"><p>${T('cEmpty1')}</p><p class="muted">${T('cEmpty2')}</p></div>`}`;
}
const IC_CARDS=`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.6" y="5" width="9" height="14" rx="1.6" transform="rotate(-9 8.1 12)" stroke="currentColor" stroke-width="1.6"/><rect x="11.4" y="5" width="9" height="14" rx="1.6" transform="rotate(9 15.9 12)" stroke="currentColor" stroke-width="1.6"/></svg>`;
function tarRow(x,i){
  const sp=SPREADS.find(s=>s.id===x.sp)||{n:''}, n=x.slots.length, fu=(x.chat||[]).length;
  const thumbs=x.slots.slice(0,3).map((c,k)=>`<span class="tr-c${c.r?' rev':''}" style="--sc:${TP_COL[c.id[0]]};--k:${k-(Math.min(n,3)-1)/2}">${tpArt(c.id)}</span>`).join('');
  return `<div class="fav tr-row"><button class="fav-open" type="button" data-cto="${i}"><span class="tr-th" aria-hidden="true">${thumbs}</span><strong>${esc(x.q.length>110?x.q.slice(0,108)+'…':x.q)}</strong><small>${esc(sp.n)} · ${n} ${cardsWord(n)}${fu?` · ${_f("уточнень: {0}",[fu])}`:''} · ${whenTxt(x.ts)}</small></button>
    <div class="fav-acts"><button class="fav-ic del" type="button" data-ctd="${i}" aria-label="${_t("Видалити розклад")}" title="${_t("Видалити розклад")}">${IC_DEL}</button></div></div>`;
}
function tarotPane(){
  const h=tpHist();
  return `<div class="dm-h"><h2>${_t("Мої розклади")}</h2>${h.length?`<button class="btn ghost sm" type="button" id="tarClear">${IC_DEL}<span>${_t("Видалити всі")}</span></button>`:''}</div>
    ${h.length?`<div class="favs">${h.map(tarRow).join('')}</div>`:`<div class="empty"><p>${_t("Тут з’являться ваші розклади Таро з тлумаченнями.")}</p><p class="muted">${_t("Їх можна перечитувати й ставити картам уточнювальні питання.")}</p><button class="btn go aura" type="button" id="tarGo">${_t("Зробити розклад")}</button></div>`}`;
}
function tpOpenSaved(x){
  TAR.read={...x,chat:x.chat||[],turns:(x.turns&&x.turns.length)?x.turns:[{role:'user',content:tpPrompt(x)},{role:'assistant',content:x.ans||'-'}]}; TAR.busy=false; TAR.q=x.q; TAR.sp=x.sp; TAR.slots=x.slots.map(c=>({id:c.id,r:!!c.r}));
  showTarot(); setTimeout(()=>{ const r=$('#tpR'); if(r&&innerWidth<=980) r.scrollIntoView({behavior:'smooth',block:'start'}); },380);
}

/* ---------- tariffs (UAH) & subscription — payment itself is not connected yet ---------- */
const PLANS=[
  {id:'free',n:'Безкоштовний',m:0,y:0,tag:'',d:'Щоб познайомитися з CODE',lim:{ai:'3 на старт, далі 1 на тиждень',rep:'—',yr:'—',wl:'—'},f:['Матриця, усі позиції та сфери життя з розбором — без ліміту','Довідник арканів і шпаргалка по позиціях','Розпізнавання розкладу з фото не витрачає запит (до 20 фото на день)']},
  {id:'pack',n:'Пакет',m:149,y:0,tag:'Без підписки',d:'Спробувати платні функції без підписки',lim:{ai:'10 запитів',rep:'1 розбір',yr:'—',wl:'—'},f:['Не згорає — використайте, коли зручно','Разова оплата, без автопродовження','Спершу витрачаються безкоштовні запити або запити тарифу, потім — з пакета']},
  {id:'plus',n:'Plus',m:199,y:1790,tag:'Популярний',d:'Для себе — питати карти й матрицю, коли потрібно',lim:{ai:'100 на місяць',rep:'1 на місяць',yr:'1 на місяць',wl:'—'},f:['Трактування розкладів з урахуванням вашої матриці','Уточнення до розкладу можна ставити — кожне рахується як окремий запит','Розбір і прогноз мають власний ліміт і не забирають запити']},
  {id:'pro',n:'Pro',m:549,y:4990,tag:'Для тарологів',d:'Робоче місце для консультацій',lim:{ai:'300 на місяць',rep:'10 на місяць',yr:'10 на місяць',wl:'Так'},f:['Розбори й прогнози для клієнтів — на будь-які дати народження','Уточнення до розкладу — кожне рахується як окремий запит','Трактування розкладів з урахуванням матриці клієнта'],soon:'Незабаром у Pro: база клієнтів, тон відповіді «для мене / для клієнта» і шаблони консультацій'},
];
const PLAN_LIM=[['all','Матриця, сумісність, прогноз по роках, PDF'],['ai','Запити до ШІ (Таро, уточнення, «Запитай свою матрицю»)'],['rep','Персональний розбір матриці'],['yr','Прогноз на 12 місяців'],['wl','PDF без логотипу CODE']];
const limHTML=p=>`<dl class="pl-lim">${PLAN_LIM.map(([k,t])=>{ const v=k==='all'?_t("Без ліміту"):_t(p.lim[k]); return `<div class="${v==='—'?'no':''}"><dt>${_t(t)}</dt><dd${v.length>16?' class="lng"':''}>${v}</dd></div>`; }).join('')}</dl>`;
let PLAN_PER='m';
const uah=n=>_f("{0} грн",[String(n).replace(/\B(?=(\d{3})+(?!\d))/g,' ')]);
function plansHTML(){
  const card=p=>{
    const yr=PLAN_PER==='y'&&p.y, price=p.id==='free'?uah(0):p.id==='pack'?uah(p.m):yr?uah(p.y):uah(p.m), per=_t(p.id==='free'?"назавжди":p.id==='pack'?"разово":yr?"на рік":"на місяць");
    const sub=yr?_f("≈ {0} на місяць · вигода {1}%",[uah(Math.round(p.y/12)),Math.round((1-p.y/(p.m*12))*100)]):p.id==='pack'?_t("1 розбір матриці + 10 запитів до ШІ"):'';
    return `<article class="pl${p.id==='plus'?' hot':''}" data-p="${p.id}">
      <div class="pl-h"><h4>${_t(p.n)}</h4>${p.tag?`<span class="pl-tag">${_t(p.tag)}</span>`:''}</div>
      <p class="pl-d">${_t(p.d)}</p>
      <div class="pl-pr"><b>${price}</b><span>${per}</span></div><p class="pl-sub">${sub||'&nbsp;'}</p>
      ${limHTML(p)}<ul>${p.f.map(x=>`<li>${_t(x)}</li>`).join('')}</ul>${p.soon?`<p class="pl-soon">${_t(p.soon)}</p>`:''}
      ${p.id==='free'?`<button class="btn ghost sm" type="button" disabled>${USER?_t("Ваш поточний тариф"):_t("Доступно після реєстрації")}</button>`:`<button class="btn ${p.id==='plus'?'go':'ghost'} sm" type="button" data-buy="${p.id}">${p.id==='pack'?_t("Купити пакет"):_t("Оформити")}</button>`}
    </article>`;
  };
  return `<div class="tf-h"><div><p class="pk">${_t("[ Тарифи ]")}</p><h3 id="tfT">${_t("Оберіть свій формат")}</h3><p class="tf-s">${_t("Ціни в гривнях. Оплата разова — продовжувати автоматично чи ні, вирішуєте ви.")}</p></div>
    <div class="tf-per" role="tablist" aria-label="${_t("Період оплати")}"><button type="button" role="tab" aria-selected="${PLAN_PER==='m'}" data-per="m">${_t("Щомісяця")}</button><button type="button" role="tab" aria-selected="${PLAN_PER==='y'}" data-per="y">${_t("Щороку")} <em>−25%</em></button></div></div>
    <div class="tf-g">${PLANS.map(card).join('')}</div>
    <p class="tf-note">${_t("Один запит до ШІ — це одне трактування розкладу, одне уточнення до нього або одне питання до матриці. Розпізнавання розкладу з фото запит не витрачає. Персональний розбір і прогноз на 12 місяців мають окремий ліміт і запити не забирають; «Оновити розбір» створює новий розбір і рахується в цьому ліміті. Невикористані запити за місяць не переносяться, а пакет не згорає.")}</p>`;
}
function checkoutHTML(id){
  const p=PLANS.find(x=>x.id===id), yr=PLAN_PER==='y'&&p.y, price=p.id==='pack'?p.m:yr?p.y:p.m;
  const until=new Date(); if(p.id!=='pack'){ if(yr) until.setFullYear(until.getFullYear()+1); else until.setDate(until.getDate()+30); }
  const dt=until.toLocaleDateString(LOC(),{day:'numeric',month:'long',year:'numeric'});
  return `<div class="tf-h"><div><p class="pk">${_t("[ Оформлення ]")}</p><h3 id="tfT">${_t(p.n)}${p.id==='pack'?'':yr?_t(" · рік"):_t(" · місяць")}</h3></div></div>
    <div class="co">
      <div class="co-row"><span>${_t("До сплати")}</span><b>${uah(price)}</b></div>
      ${p.id==='pack'?`<div class="co-row"><span>${_t("Що отримаєте")}</span><b>${_t("10 запитів до ШІ + 1 розбір матриці, без терміну дії")}</b></div>`:`<div class="co-row"><span>${_t("Доступ діятиме до")}</span><b>${dt}</b></div>`}
      ${p.id==='pack'?'':`<label class="agree co-auto"><input type="checkbox" id="coAuto"><span class="box" aria-hidden="true"></span><span>${yr?_t("Автоматично продовжувати щороку"):_t("Автоматично продовжувати щомісяця")}</span></label>
      <p class="co-hint" id="coHint">${_f("Без автопродовження: після {0} доступ просто повернеться до безкоштовного тарифу, нічого не спишеться. За 3 дні ми нагадаємо.",[dt])}</p>`}
      <p class="co-legal">${_t("Натискаючи «Оплатити», ви погоджуєтеся з <a href=\"/terms.html\" target=\"_blank\" rel=\"noopener\">умовами</a>. Оплата карткою через захищений платіжний сервіс.")}</p>
      <div class="co-acts"><button class="btn ghost sm" type="button" data-tf="back">${_t("Назад")}</button><button class="btn go sm" type="button" data-pay="${id}">${_f("Оплатити {0}",[uah(price)])}</button></div>
    </div>`;
}
function openPlans(start){
  const d=document.createElement('div'); d.className='tf-ov'; d.setAttribute('role','dialog'); d.setAttribute('aria-modal','true'); d.setAttribute('aria-labelledby','tfT');
  d.innerHTML=`<div class="tf-bg"></div><div class="tf-box"><button class="x" type="button" data-tf="x" aria-label="${_t("Закрити")}">${IC_X}</button><div class="tf-in"></div></div>`;
  const inn=d.querySelector('.tf-in'), show=h=>{ inn.innerHTML=h; inn.scrollTop=0; const bx=d.querySelector('.tf-box'); bx.scrollTop=0; bx.classList.toggle('narrow',h.indexOf('class="co"')>-1); };
  show(start?checkoutHTML(start):plansHTML());
  document.body.appendChild(d); document.documentElement.classList.add('mdl-on'); requestAnimationFrame(()=>d.classList.add('in'));
  const prev=document.activeElement;
  const close=()=>{ d.classList.remove('in'); document.documentElement.classList.remove('mdl-on'); setTimeout(()=>d.remove(),240); document.removeEventListener('keydown',key,true); if(prev&&prev.focus&&prev.isConnected) prev.focus({preventScroll:true}); };
  const key=e=>{ if(e.key==='Escape'){ e.preventDefault(); e.stopImmediatePropagation(); close(); } };
  document.addEventListener('keydown',key,true);
  d.addEventListener('change',e=>{ if(e.target.id==='coAuto'){ const h=d.querySelector('#coHint'), id=d.querySelector('[data-pay]').dataset.pay, p=PLANS.find(x=>x.id===id), yr=PLAN_PER==='y'&&p.y, price=yr?p.y:p.m, dt=d.querySelector('.co-row:nth-child(2) b').textContent;
    h.textContent=e.target.checked?_f("{0} ми автоматично спишемо {1} і продовжимо доступ. Вимкнути можна будь-коли в кабінеті → «Підписка». За 3 дні до списання надішлемо нагадування.",[dt,uah(price)]):_f("Без автопродовження: після {0} доступ просто повернеться до безкоштовного тарифу, нічого не спишеться. За 3 дні ми нагадаємо.",[dt]); } });
  d.addEventListener('click',e=>{
    if(e.target.closest('[data-tf=x]')||e.target.classList.contains('tf-bg')){ close(); return; }
    const per=e.target.closest('[data-per]'); if(per){ PLAN_PER=per.dataset.per; show(plansHTML()); return; }
    const buy=e.target.closest('[data-buy]'); if(buy){ if(!USER){ close(); toast(_t("Увійдіть або зареєструйтеся, щоб оформити тариф.")); AUTH_MODE='register'; showHome('cab'); return; } show(checkoutHTML(buy.dataset.buy)); return; }
    if(e.target.closest('[data-tf=back]')){ show(plansHTML()); return; }
    if(e.target.closest('[data-pay]')){ toast(_t("Оплата з’явиться найближчим часом — ми повідомимо вас листом.")); close(); }
  });
}
/* «Ваш залишок» in the cabinet: counted by the server with the same rules as the limits */
const fmtDay=d=>new Date(d).toLocaleDateString(LOC(),{day:'numeric',month:'long'});
function balHTML(b){
  const tile=(lab,left,total,cap,dim)=>`<div class="bal-t${dim?' dim':''}"><p class="bal-l">${lab}</p><p class="bal-n"><b>${left}</b>${total!=null?`<span>${_f("з {0}",[total])}</span>`:''}</p><p class="bal-c">${cap}</p></div>`;
  const T=[], a=b.ai||{left:0,total:0};
  const aiCap=a.kind==='month'?(a.left?(b.paid_until?_f("До {0}",[fmtDay(b.paid_until)]):_t("На 30 днів")):_f("Наступний запит з’явиться {0}",[a.next?fmtDay(a.next):_t("незабаром")]))
    :a.kind==='start'?_t("Стартові безкоштовні. Потім — 1 запит щотижня")
    :(a.left?_t("Безкоштовний запит цього тижня"):_f("Наступний безкоштовний — {0}",[a.next?fmtDay(a.next):_t("наступного тижня")]));
  T.push(tile(_t("Запити до ШІ"),a.left,a.total,aiCap));
  if(b.pack&&b.pack.ai) T.push(tile(_t("Пакетні запити"),b.pack.ai,null,_t("Не згорають")));
  const deep=(k,lab)=>{ const x=b[k], p=k==='report'&&b.pack?b.pack.report:0;
    if(x) T.push(tile(lab,x.left,x.total,x.left?(b.paid_until?_f("До {0}",[fmtDay(b.paid_until)]):_t("На 30 днів")):_f("Наступний з’явиться {0}",[x.next?fmtDay(x.next):_t("незабаром")])));
    if(p) T.push(tile(lab+_t(" · пакет"),p,null,_t("Не згорає")));
    if(!x&&!p) T.push(tile(lab,'—',null,k==='report'?_t("Доступно в Plus, Pro або в Пакеті"):_t("Доступно в Plus і Pro"),true)); };
  deep('report',_t("Розбір матриці")); deep('year',_t("Прогноз на 12 місяців"));
  return `<div class="bal-h"><b>${_t("Ваш залишок")}</b><small>${_f("Розпізнавання фото — без витрати запитів, до {0} фото на день",[b.photo_day||20])}</small></div><div class="bal-g">${T.join('')}</div>`;
}
async function fillBalance(){
  const el=document.getElementById('subBal'); if(!el||typeof window.codeBalance!=='function') return;
  try{ const b=await window.codeBalance(); if(el.isConnected) el.innerHTML=balHTML(b); }
  catch(e){ if(!el.isConnected) return; const c=e&&e.message||''; el.innerHTML=`<p class="muted">${_t(c==='setup'?"Лічильник запитів ще підключається — залишок з’явиться тут найближчим часом.":c==='login'?"Увійдіть знову, щоб побачити залишок.":"Не вдалося отримати залишок. Оновіть сторінку трохи згодом.")} <span class="bal-code">[${esc(c||'error')}]</span></p>`; }
}
function subPane(){
  const sb=USER&&USER.sub, active=sb&&(sb.plan==='plus'||sb.plan==='pro')&&sb.paid_until&&new Date(sb.paid_until)>new Date();
  const cur=PLANS.find(x=>x.id===(active?sb.plan:'free')), dt=active?new Date(sb.paid_until).toLocaleDateString(LOC(),{day:'numeric',month:'long',year:'numeric'}):'';
  return `<div class="dm-h"><h2>${_t("Підписка")}</h2></div>
    <div class="sub-dash"><div class="sub-cur"><div class="sub-top"><p class="pk">${_t("[ Поточний тариф ]")}</p><span class="sub-until">${active?_f("Діє до {0}",[dt]):_t("Безстроково")}</span></div>
      <div class="sub-name"><h3>${_t(cur.n)}</h3>${active&&sb.period==='y'?`<span class="sub-tag">${_t("річний")}</span>`:''}${!active&&sb&&(sb.packs||sb.pack_reports)?`<span class="sub-tag">${_t("+ пакет")}</span>`:''}</div>
      ${!active&&sb&&(sb.packs||sb.pack_reports)?`<p class="sub-mini">${window.CODE_SB?_t("Що лишилося в пакеті — у картках поруч."):_f("Пакет: {0} запитів, {1} розбір.",[sb.packs||0,sb.pack_reports||0])}</p>`:''}
      <div class="sub-btns">${!active?`<button class="btn go aura" type="button" data-plans>${_t("Обрати тариф")}</button>`
        :sb.plan==='plus'?`<button class="btn ghost" type="button" data-plans="renew">${_t("Продовжити Plus")}</button><button class="btn go aura" type="button" data-plans="pro">${_t("Підвищити до Pro")}</button>`
        :`<button class="btn go aura" type="button" data-plans="renew">${_t("Продовжити Pro")}</button>`}</div></div>
    ${window.CODE_SB&&USER?(setTimeout(fillBalance,0),'<div class="sub-bal" id="subBal"><div class="bal-g"><div class="bal-skel"></div><div class="bal-skel"></div><div class="bal-skel"></div></div></div>'):''}</div>${window.CODE_SB&&USER?`<p class="sub-dnote">${_t("Розпізнавання фото — без витрати запитів, до 20 фото на день.")}</p>`:''}
    ${limHTML(cur).replace('class="pl-lim"','class="sub-f pl-lim"')}
    <div class="sub-blk"><div class="sub-row"><div><b>${_t("Автопродовження")}</b><small>${active?(sb.auto_renew?_f("Увімкнене: {0} доступ продовжиться автоматично. Вимкнути можна будь-коли.",[dt]):_f("Вимкнене: після {0} доступ повернеться до безкоштовного тарифу, нічого не спишеться.",[dt])):_t("Вимкнене. З’явиться, коли ви оформите Plus або Pro, — і лише якщо ви самі його увімкнете.")}</small></div><label class="sw"><input type="checkbox" id="subAuto" aria-label="${_t("Автопродовження")}"${active&&sb.auto_renew?' checked':''}><i></i></label></div></div>
    <div class="sub-blk"><b>${_t("Історія оплат")}</b><p class="muted">${_t("Оплат ще не було.")}</p></div>
    <p class="muted sub-note">${_t("Оплата разова: доступ діє місяць або рік і нічого не списується без вашої згоди. Питання щодо оплат —")} <a class="mail-l" href="mailto:code.matrix.support@gmail.com?subject=CODE%20оплата" target="_blank" rel="noopener">code.matrix.support@gmail.com</a></p>`;
}
document.addEventListener('click',e=>{ const b=e.target.closest&&e.target.closest('[data-plans]'); if(b){ e.preventDefault(); const v=b.dataset.plans, sb=USER&&USER.sub;
  if(v==='renew'&&sb){ PLAN_PER=sb.period==='y'?'y':'m'; openPlans(sb.plan); } else if(v==='pro'){ openPlans('pro'); } else openPlans(); } });
/* simple info dialog in the site style */
function infoModal(title,html,acts){
  const d=document.createElement('div'); d.className='tf-ov'; d.setAttribute('role','dialog'); d.setAttribute('aria-modal','true');
  d.innerHTML=`<div class="tf-bg"></div><div class="tf-box info-box"><button class="x" type="button" data-tf="x" aria-label="${_t("Закрити")}">${IC_X}</button><div class="tf-h"><div><p class="pk">[ CODE ]</p><h3>${title}</h3></div></div><div class="info-b">${html}</div>${acts?`<div class="info-a">${acts}</div>`:''}</div>`;
  document.body.appendChild(d); document.documentElement.classList.add('mdl-on'); requestAnimationFrame(()=>d.classList.add('in'));
  const close=()=>{ d.classList.remove('in'); if(!document.querySelector('.tf-ov.in')) document.documentElement.classList.remove('mdl-on'); setTimeout(()=>d.remove(),240); document.removeEventListener('keydown',k,true); };
  const k=e=>{ if(e.key==='Escape'){ e.preventDefault(); e.stopImmediatePropagation(); close(); } };
  document.addEventListener('keydown',k,true);
  d.addEventListener('click',e=>{ if(e.target.closest('[data-tf=x]')||e.target.classList.contains('tf-bg')||e.target.closest('[data-plans]')) close(); });
  return close;
}
/* auto-renew switch in the cabinet: saved through the server; explains why when it can't be changed */
document.addEventListener('change',async e=>{
  const cb=e.target; if(!cb||cb.id!=='subAuto') return;
  const want=cb.checked, sb=USER&&USER.sub, active=sb&&(sb.plan==='plus'||sb.plan==='pro')&&sb.paid_until&&new Date(sb.paid_until)>new Date();
  cb.checked=!want;
  if(!active){ infoModal(_t("Автопродовження"),`<p>${_t("Автопродовження працює лише з платним тарифом — Plus або Pro. Зараз у вас безкоштовний тариф, тож продовжувати нічого.")}</p><p class="muted">${_t("Коли оформите підписку, тут можна буде увімкнути автопродовження. За замовчуванням воно завжди вимкнене — без вашої згоди нічого не списується.")}</p>`,`<button class="btn go aura" type="button" data-plans>${_t("Обрати тариф")}</button>`); return; }
  if(typeof window.codeSetAutoRenew!=='function'){ infoModal(_t("Автопродовження"),`<p>${_t("Керувати автопродовженням можна на сайті CODE після входу в акаунт.")}</p>`); return; }
  cb.disabled=true;
  try{ await window.codeSetAutoRenew(want); sb.auto_renew=want; cb.checked=want;
    const dt=new Date(sb.paid_until).toLocaleDateString(LOC(),{day:'numeric',month:'long',year:'numeric'}), sm=cb.closest('.sub-row')&&cb.closest('.sub-row').querySelector('small');
    if(sm) sm.textContent=want?_f("Увімкнене: {0} доступ продовжиться автоматично. Вимкнути можна будь-коли.",[dt]):_f("Вимкнене: після {0} доступ повернеться до безкоштовного тарифу, нічого не спишеться.",[dt]);
    toast(want?_t("Автопродовження увімкнено."):_t("Автопродовження вимкнено.")); }
  catch(err){ const m=String(err&&err.message||err);
    const why=_t(/no_active_plan/.test(m)?"Сервер не бачить у вас активної підписки Plus або Pro. Якщо ви щойно оплатили, оновіть сторінку за хвилину."
      :/Could not find the function|set_auto_renew/.test(m)?"Ця функція ще налаштовується на нашому боці. Спробуйте трохи пізніше — або напишіть нам, і ми змінимо налаштування вручну."
      :/JWT|login|auth/i.test(m)?"Сесія входу завершилася. Увійдіть в акаунт ще раз і повторіть."
      :/fetch|network|Failed/i.test(m)?"Немає зв’язку з сервером. Перевірте інтернет і спробуйте ще раз.":"Не вдалося зберегти зміну.");
    infoModal(_t("Не вдалося змінити автопродовження"),`<p>${why}</p><p class="muted">${_t("Технічна причина:")} ${esc(m.slice(0,160))}</p><p class="muted">${_t("Питання —")} <a class="mail-l" href="mailto:code.matrix.support@gmail.com?subject=CODE%20автопродовження" target="_blank" rel="noopener">code.matrix.support@gmail.com</a></p>`); }
  finally{ cb.disabled=false; }
});
const IC_PLAN=`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3.5l2.4 5 5.4.7-4 3.8 1 5.4-4.8-2.6-4.8 2.6 1-5.4-4-3.8 5.4-.7z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`;

/* ---------- paid AI on the matrix: personal reading, "ask your matrix", the year month by month ---------- */
const AIM_KEY=()=>`${STATE.name||''}|${STATE.d}.${STATE.m}.${STATE.y}|${STATE.g||'f'}`;
function aiStore(){ try{ return JSON.parse(localStorage.getItem('code-ai-reports')||'{}')||{}; }catch(_){ return {}; } }
function aiSave(o){ try{ localStorage.setItem('code-ai-reports',JSON.stringify(o)); }catch(_){} if(typeof window.codeCloudPush==='function') window.codeCloudPush(); }
const MONTH_UK=['січень','лютий','березень','квітень','травень','червень','липень','серпень','вересень','жовтень','листопад','грудень'];
function mxContext(){
  const P=STATE.P, g=STATE.g||'f', a=curAge(), nmx=v=>`${v} ${ARC[v].n} (${MX_EN[v]}; ${ARC[v].kw.slice(0,3).join(', ')})`;
  const ids=Object.keys(POS).filter(id=>P[id]!=null);
  const pos=ids.map(id=>`- ${id} · ${POS[id][0]}: ${nmx(P[id])}`).join('\n');
  const pr=progs().map(p=>`- ${p.t}: ${p.vals.join('-')}${p.named?` «${PN(p.named)}»`:''}`).join('\n');
  const {rows,total}=chakraRows(P);
  const ch=rows.map((x,i)=>`- ${CHAK[i].n} (${CHAK[i].t}): фізика ${x.ph}, енергія ${x.en}, емоції ${x.em}`).join('\n')+`\n- Енергополе: ${total.ph}/${total.en}/${total.em}`;
  const yrs=[a,(a+1)%80,(a+2)%80].map(k=>`- вік ${k}: ${P.YEARS[k].join('-')} (${ARC[P.YEARS[k][0]].n})`).join('\n');
  const tail=[P.D2,P.D1,P.D], tn=findNamed(tail,false);
  const counts={}; ids.forEach(id=>counts[P[id]]=(counts[P[id]]||0)+1);
  const rep=Object.entries(counts).filter(([,n])=>n>2).sort((x,y)=>y[1]-x[1]).slice(0,6).map(([v,n])=>`${v} ${ARC[v].n} ×${n}`).join(', ');
  return `PERSON: ${STATE.name||'(без імені)'}, ${g==='m'?'чоловік':'жінка'}, народження ${STATE.d}.${STATE.m}.${STATE.y}, зараз ${a} років.
DESTINY MATRIX (Natalia Ladini method; numbers are Major Arcana 1–22):
Positions:
${pos}
Karmic tail: ${tail.join('-')}${tn?` «${PN(tn)}»`:''}
Programs (lines of the matrix):
${pr}
Health map (chakras):
${ch}
Path of purpose (Sky + Earth → finding yourself, to 40; father’s line + mother’s line → socialization, 40–60; both → spiritual literacy, after 60; now in the «${a<40?'finding yourself':a<60?'socialization':'spiritual literacy'}» stage):
- Sky (talents + karmic task): ${nmx(P.SKY)}; Earth (personality + material): ${nmx(P.EARTH)}; personal purpose: ${nmx(P.PERS)}
- father’s line: ${nmx(P.MALE)}; mother’s line: ${nmx(P.FEM)}; social purpose: ${nmx(P.SOC)}
- spiritual purpose: ${nmx(P.SPIR)}; planetary purpose: ${nmx(P.PLAN)}
Year programs (age ring):
${yrs}
Energies repeating most in this matrix: ${rep||'—'}${(()=>{ const seen=new Set(), kb=progs().filter(p=>p.named&&!seen.has(p.named.n)&&seen.add(p.named.n)).map(p=>`- ${p.t} ${p.vals.join('-')} «${PN(p.named)}»: plus — ${p.named.p} Minus — ${p.named.m} How it shows — ${p.named.h} Work — ${p.named.w}`); return kb.length?`\nCODE knowledge base on the named programs found in this matrix (use it as the factual basis, retell in your own words, never copy verbatim):\n${kb.join('\n')}`:''; })()}`;
}
/* which knowledge-base entries (server side, api/_kb.js) a reading of this matrix needs: [sphere, arcana, where it stands] */
function kbMx(P,o){
  o=o||{}; const out=[], add=(s,v,l)=>{ if(v>=1&&v<=22) out.push([s,v,l]); };
  const only=o.only?new Set(o.only):null;
  Object.keys(POS).forEach(id=>{ if(P[id]==null||(only&&!only.has(id))) return; const f=POS[id][1], l=POS[id][0], v=P[id];
    if(id==='E'||id==='E3') add('centre',v,l); else if(id==='E2') add('rod',v,l);
    else if(f==='pers') add('pers',v,l); else if(f==='karma'||f==='minus'||f==='task') add('karma',v,l);
    else if(f==='love'){ add('love',v,l); if(id==='X') add('money',v,l); }
    else if(f==='pur'){ add('pur',v,l); if(id==='SKY') add('tal',v,l); if(id==='MALE'||id==='FEM') add('rod',v,l); }
    else if(['tal','money','rod','health'].includes(f)) add(f,v,l); });
  if(o.health!==false&&!only) chakraRows(P).rows.forEach((x,i)=>add('health',x.em,`${CHAK[i].n} · емоції`));
  const a=o.age!=null?o.age:null;
  if(a!=null) [a,(a+1)%80,(a+2)%80].forEach((k,i)=>add('year',P.YEARS[k][0],`програма року, вік ${k}${i?'':' (зараз)'}`));
  (o.months||[]).forEach(m=>{ add('year',m.pers,`особистий місяць · ${m.label}`); });
  return out;
}
const kbFull=extra=>Object.assign({method:true,mx:kbMx(STATE.P,{age:curAge()})},extra||{});
const AIM_RULES=L=>`Write in ${L.name}, addressing the person ${L.reg}; use grammatical forms matching their gender. Refer to positions by their human names (e.g. “personality”, “money channel”, “male line of the family”); the letter codes A, B, C, D, E with digits may be added in brackets, but NEVER write internal codes such as PERS, SOC, SPIR, MALE, FEM, MON, LOVE, X, F, G, H, I, H1. Be specific to THIS matrix: name the positions and numbers you rely on and explain how the energies interact (e.g. how the centre shapes the way talents are used, how the karmic tail colours money or love). Never paste generic dictionary definitions of an arcana. When the same arcana appears in several positions, explain what it does differently in EACH place — never repeat the same sentence twice. Concrete life situations, behaviours and steps, not vague esotericism. Ground every interpretation in the CODE knowledge base given to you (the system prompt): use its meanings, scenarios, professions, partner images, triggers and practices for the exact arcana × sphere in this matrix, combine several entries to show how the positions interact, and add your own depth on top; retell, never copy. Depth over breadth: no section may be a short generic summary — every claim gets a «because» (the position and number) and a «what it looks like in life» (a concrete example). No fatalism, no medical, legal or financial diagnoses or guarantees; the matrix is a tool for self-reflection. Use Markdown headings (##) and short paragraphs, bullet lists where they help. Always finish the whole structure and end with a complete closing section — never stop mid-sentence.`;
function aimReportPrompt(){
  const L=TP_LANG[LANG]||TP_LANG.en;
  return `You are CODE’s senior Destiny Matrix analyst (Natalia Ladini method) — deep, warm, practical, psychologically literate.
${mxContext()}

TASK: write a PERSONAL, in-depth reading of this whole matrix — the kind of analysis a person would gladly pay for and come back to. It must feel written about this one person: connect the dots between positions, show cause and effect, give concrete examples of how it looks in everyday life (at work, with money, in a couple, with parents, when tired or under stress).
Structure (use these ## headings, translated into ${L.name}; every section must be substantial — at least 2–4 paragraphs or a rich list):
1. Ваш портрет — who this person is at the core: centre + personality + talents as one picture; how others see them vs. who they are inside; what they need to feel themselves.
2. Як працює ваша матриця — the 3–4 key links between positions (e.g. centre ↔ money, tail ↔ love, talents ↔ purpose) and what each link means in practice.
3. Три головні ресурси — the strongest energies/combinations, where each pays off most, how to switch it on on purpose.
4. Сценарії, що повторюються — karmic tail and key programs (use the knowledge base above): typical situations, triggers, inner reactions, what the scenario costs, and how exactly to break the loop step by step.
5. Гроші й реалізація — money channel and material line: suitable fields and formats of work (3–5 concrete examples), what blocks money, how they undervalue themselves, 3 concrete moves.
6. Стосунки й кохання — love line, partner image: what attracts them, which partner is good for them and which repeats the old scenario, what to change in themselves.
7. Рід — father’s and mother’s lines: resource and task from each side, typical family scenarios and how to transform them.
8. Тіло й ресурс — weakest chakra areas, what drains and what restores energy, daily habits that fit this matrix (no medical claims).
9. Призначення — personal (to 40), social (40–60), spiritual: what to grow into and signs they are on track.
10. Цей рік і два наступні — what the year programs ask for, how they link to the rest of the matrix.
11. Ваш план на 90 днів — 7–10 concrete, doable steps, each tied to a position, with how to check progress.
12. Питання для себе — 5–7 deep questions for reflection.
Length: about 5000–6500 words — this is a premium reading, so be generous with detail, examples and steps. ${AIM_RULES(L)}`;
}
function aimChatPrompt(){
  const L=TP_LANG[LANG]||TP_LANG.en;
  return `You are CODE’s Destiny Matrix consultant (Natalia Ladini method). The person asks questions about their life; answer them THROUGH their matrix below.
${mxContext()}

How to answer (Markdown, with short ## headings): start with a direct answer to the question in 2–4 sentences; then a detailed explanation of which positions, programs, channels and year energies of the matrix show this and why (name each position and number, describe how it looks in this person's real life — work, money, couple, parents, stress — and how the energies interact); then what helps and what hinders (plus and minus of the energies involved); then 4–7 concrete practical steps, each tied to a position, plus one reflection question. About 600–1000 words; up to 1400 for broad life questions; shorter (300–500) only for a quick clarifying follow-up. If the question is outside what a matrix can say, still help with what the matrix shows (tendencies, resources, risks) without refusing. ${AIM_RULES(L)}
${TP_FU_RULE(L)}`;
}
function aimMonths(){
  const now=new Date(), out=[];
  for(let i=0;i<12;i++){
    const dt=new Date(now.getFullYear(),now.getMonth()+i,15), age=ageAt(dt), t=STATE.P.YEARS[age];
    const uni=r(dt.getMonth()+1+r(ds(dt.getFullYear()))), pers=r(t[0]+uni), em=r(STATE.P.E+uni);
    out.push({dt,age,t,uni,pers,em,label:`${MONTH_UK[dt.getMonth()]} ${dt.getFullYear()}`});
  }
  return out;
}
function aimYearPrompt(){
  const L=TP_LANG[LANG]||TP_LANG.en, M=aimMonths();
  const lines=M.map(x=>`- ${x.label}: year program (age ${x.age}) ${x.t.join('-')}; month energy of the calendar ${x.uni} ${ARC[x.uni].n}; personal month (year energy + month) ${x.pers} ${ARC[x.pers].n}; month vs. centre ${x.em} ${ARC[x.em].n}`).join('\n');
  return `You are CODE’s Destiny Matrix forecaster (Natalia Ladini method), careful and practical.
${mxContext()}

THE NEXT 12 MONTHS (computed for this person; the year program switches on the birthday):
${lines}

TASK: write a month-by-month forecast for these 12 months that is genuinely useful, rich and NOT a repetition of general arcana texts — a paid premium forecast the person will reread every month.
Structure (headings translated into ${L.name}; every section substantial):
## Загальна лінія року — the arc of the next 12 months: main theme, what the year is building, how it connects to the karmic tail, centre, money and love lines (name positions and numbers). 3–5 paragraphs.
## Чому саме так у вашій матриці — which positions resonate with the year energies and what that changes in practice.
## Квартали — four short blocks (months 1–3, 4–6, 7–9, 10–12): the focus of each quarter and how it leads to the next.
## Найкращі періоди — for starting new things, money and career, love and relationships, rest and recovery: name the months and explain why.
## Періоди уваги — where to slow down, what exactly to watch, how to soften it.
Then one ## heading per month (“Січень 2027” etc.) with these bold labels, each 1–3 sentences: **Тема місяця**; **Що вдасться легше**; **Де бути уважнішою/уважнішим**; **Робота й гроші**; **Стосунки**; **Тіло й ресурс**; **Практика місяця** (one concrete exercise or action). Months with the same energies must still read differently: build on what came before, show progression through the year.
## Ваш план на рік — 5–7 goals that fit this year’s energies, each with the best months for it.
## Підсумок — what the person will have by the end of these 12 months if they live them consciously.
Describe tendencies and probabilities, never certain events; the future is many-sided and depends on choices. Each monthly bold label gets 2–4 full sentences specific to that month. Length: about 5000–6500 words. ${AIM_RULES(L)}`;
}
async function aimRun(task,turns,onText,signal,kb){
  const s=await tpGetSample(); if(!s) throw Object.assign(new Error('nosample'),{code:'not_configured'});
  if(task!=='report'&&task!=='year') return s(turns,{cache:false,signal,task,kb,onText:({text})=>onText(text)});
  /* long paid readings: if the text stops early (length limit or a dropped connection), continue it seamlessly — continuations are free */
  let full='', res=null, err=null;
  try{ res=await s(turns,{cache:false,signal,task,kb,onText:({text})=>onText(text)}); full=res.text; }
  catch(e){ if(!(e&&e.code==='network'&&e.text&&e.text.length>400)) throw e; full=e.text; err=e; }
  for(let n=0;n<3&&(err||(res&&res.complete===false));n++){
    if(signal&&signal.aborted) break;
    const base=full.replace(/\s+$/,''); err=null;
    try{ res=await s([...turns,{role:'assistant',content:base}],{cache:false,signal,task:'cont',kb,onText:({text})=>onText(base+text)}); full=base+res.text; }
    catch(e){ if(e&&e.code==='network'&&e.text){ full=base+e.text; err=e; continue; } if(e&&(e.code==='need_plan'||e.code==='cancelled')) break; throw e; }
  }
  return {text:full};
}
const aimPaid=kind=>{ if(!(window.CODE_SB)) return true; const sb=USER&&USER.sub; if(!sb) return false; if((sb.plan==='plus'||sb.plan==='pro')&&sb.paid_until&&new Date(sb.paid_until)>new Date()) return true; return kind==='report'&&(sb.pack_reports||0)>0; };
function aiBlock(){
  if(isPair()) return '';
  return `<div class="aim aim-rep"><div class="aim-i"><button class="btn ghost aim-b" type="button" data-aim="report">${AI_IC}<span>${_t("Персональний розбір від ШІ")}</span><em class="aim-tag">Plus</em></button><p class="aim-h">${_t("Цілісний глибокий розбір усієї матриці: як ваші енергії впливають одна на одну, сценарії, що повторюються, гроші, стосунки, рід і план на 90 днів.")}</p></div></div>`;
}
const AI_IC='<svg class="ai-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></svg>';
/* «Запитай свою матрицю» — at the bottom of every opened info block, with the block as context */
function aiAsk(spec){
  if(!STATE||!STATE.P||isPair()||!spec) return '';
  return `<div class="aim aim-ask"><div class="aim-i"><button class="btn ghost aim-b" type="button" data-aim="chat" data-aim-ctx="${esc(spec)}">${AI_IC}<span>${_t("Запитай свою матрицю")}</span></button><p class="aim-h">${_t("Залишилися питання саме про це? ШІ відповість з урахуванням усієї вашої матриці.")}</p></div></div>`;
}
function withAsk(html,spec){ const a=aiAsk(spec); return a?html.replace(/<\/div>\s*$/,a+'</div>'):html; }
const detSpec=d=>!d?'':d.type==='arc'?'arc:'+d.id:d.type==='cat'?'cat:'+d.v:d.type==='prog'?'prog:'+d.k:d.type==='year'?'year:'+d.age:d.type==='day'?'day:'+d.key:'';
const SPH_SUG={
  "Особистість":["Як мені краще проявляти себе, щоб мене правильно сприймали?","Що в моєму характері заважає мені найбільше?","Як вийти з мінусу центральної енергії?"],
  "Таланти":["Як розкрити мій головний талант?","У якій справі мої таланти принесуть дохід?","Чому я сумніваюся у своїх здібностях?"],
  "Кармічний хвіст":["Як мій кармічний хвіст проявляється в житті зараз?","Що конкретно робити, щоб пропрацювати програму?","Які ситуації в мене повторюються через хвіст?"],
  "Гроші":["Що заважає мені заробляти більше?","Яка сфера заробітку мені найкраще підходить?","Як відкрити грошовий канал саме мені?"],
  "Стосунки":["Чому в стосунках у мене повторюється один сценарій?","Який партнер мені підходить?","Що мені варто змінити в собі для гармонійних стосунків?"],
  "Рід":["Які родові програми впливають на мене найбільше?","Що я взяла від роду як ресурс?","Як опрацювати родові сценарії?"],
  "Призначення":["У чому моє призначення зараз, у цьому віці?","Як зрозуміти, що я на своєму шляху?","Що мені робити, щоб реалізувати призначення?"],
  "Ресурс і здоров’я":["Звідки мені брати енергію?","Що виснажує мене найбільше?","Які звички підтримають мій ресурс?"],
  "Програми":["Яка програма в моїй матриці зараз найактивніша?","Як пропрацювати мої кармічні програми?","Які програми є моїм ресурсом?"]
};
function aimCtx(spec){
  if(!spec||!STATE.P) return null;
  const i=spec.indexOf(':'), t=spec.slice(0,i), v=spec.slice(i+1), P=STATE.P;
  if(t==='arc'){ const x=P[v], a=ARC[x], pl=POS[v]?POS[v][0]:v;
    return {label:_f("{0} — {1} {2}",[pl,x,a.n]),sug:[_f("Як мені проявляти {0} у плюсі в цій позиції?",[a.n]),_t("Як ця енергія впливає на мої гроші й стосунки?"),_t("Що заважає мені розкрити цю позицію?")]}; }
  if(t==='cat'){ const a=ARC[+v];
    return {label:_f("Аркан {0} {1}",[v,a.n]),sug:[_f("Як аркан {0} проявляється в моїй матриці?",[a.n]),_f("Як мені прожити енергію {0} у плюсі?",[a.n]),_t("Що ця енергія дає мені як ресурс?")]}; }
  if(t==='prog'){ const p=getProg(v); if(!p) return null; const c=p.vals.join('-');
    return {label:_f("Програма {0}{1}",[c,p.named?` «${PN(p.named)}»`:'']),sug:[_t("Як ця програма проявляється в моєму житті?"),_f("Як мені пропрацювати програму {0}?",[c]),_t("Що зміниться, коли програма стане ресурсом?")]}; }
  if(t==='year'){ const a=+v, tt=P.YEARS[a];
    return {label:_f("Рік у віці {0} · {1}",[a,tt.join('-')]),sug:[_t("На що звернути увагу в цьому році?"),_t("Що цей рік означає для роботи й грошей?"),_t("Що цей рік означає для стосунків?")]}; }
  if(t==='day') return {label:_t("Енергія дня"),sug:[_t("Як мені найкраще прожити сьогоднішній день?"),_t("Чого сьогодні краще уникати?"),_t("Яке рішення сьогодні вдасться легше?")]};
  if(t==='chak'){ const n=+v===7?_t("Енергополе"):CHAK[+v].n;
    return {label:_f("Карта здоров’я · {0}",[n]),sug:[_f("Що допоможе мені наповнити {0}?",[n]),_t("Як мій емоційний стан пов’язаний з цією зоною?"),_t("Які звички підтримають мою енергію?")]}; }
  if(t==='sph'){ const sp=spheres(P,STATE.g,STATE.name); sp.splice(3,0,{t:_t("Програми"),k:"Програми"}); const s=sp[+v]; if(!s) return null;
    return {label:_f("Сфера «{0}»",[s.t]),sug:(SPH_SUG[s.k]||[]).map(q=>_t(q))}; }
  return null;
}
const aiYearBtn=()=>isPair()?'':`<div class="aim aim-y"><div class="aim-i"><button class="btn ghost aim-b" type="button" data-aim="year">${AI_IC}<span>${_t("Прогноз на 12 місяців")}</span><em class="aim-tag">Plus</em></button><p class="aim-h">${_t("Персональний прогноз по місяцях: загальна лінія року, найкращі періоди й періоди уваги, тема, фокус і одна дія на кожен місяць.")}</p></div></div>`;
function aimOpen(kind,spec,opt){
  if(!STATE||!STATE.P) return;
  const key=AIM_KEY(), st=aiStore(), rec=st[key]||{}, ctlBox={c:null}, cx=kind==='chat'?aimCtx(spec):null;
  const title={chat:_t("Запитай свою матрицю"),report:_t("Персональний розбір матриці"),year:_t("Прогноз на 12 місяців")}[kind];
  const d=document.createElement('div'); d.className='tf-ov aim-ov'; d.setAttribute('role','dialog'); d.setAttribute('aria-modal','true'); d.setAttribute('aria-labelledby','aimT');
  d.innerHTML=`<div class="tf-bg"></div><div class="tf-box aim-box"><button class="x" type="button" data-tf="x" aria-label="${_t("Закрити")}">${IC_X}</button>
    <div class="tf-h"><div><p class="pk">[ ${esc(STATE.name||_t("Ваша матриця"))} · ${STATE.d}.${STATE.m}.${STATE.y} ]</p><h3 id="aimT">${title}</h3></div>${kind==='chat'?`<button class="btn ghost sm aim-hist" type="button" data-aim-hist>${IC_ASK}<span>${_t("Історія запитів")}</span></button>`:''}</div><div class="aim-body"></div></div>`;
  document.body.appendChild(d); document.documentElement.classList.add('mdl-on'); requestAnimationFrame(()=>{ d.classList.add('in'); const x=d.querySelector('[data-tf=x]'); if(x&&!matchMedia('(hover:none)').matches) x.focus({preventScroll:true}); });
  const body=d.querySelector('.aim-body');
  const close=()=>{ if(ctlBox.c) ctlBox.c.abort(); d.classList.remove('in'); if(!(document.getElementById('mdl')&&!document.getElementById('mdl').hidden)) document.documentElement.classList.remove('mdl-on'); setTimeout(()=>d.remove(),240); document.removeEventListener('keydown',onKey,true); };
  const onKey=e=>{ if(e.key==='Escape'&&!document.querySelector('.pdlg')){ e.preventDefault(); e.stopImmediatePropagation(); close(); } };
  document.addEventListener('keydown',onKey,true);
  d.addEventListener('click',async e=>{ if(e.target.closest('[data-tf=x]')||e.target.classList.contains('tf-bg')) close();
    if(e.target.closest('[data-aim-hist]')){ close(); CAB_TAB='asks'; PF_EDIT=false; showHome('cab'); scrollTo({top:0}); }
    { const cb=e.target.closest('[data-aim-cp]'); if(cb){ const a=cb.closest('.aim-a'); try{ await navigator.clipboard.writeText(tpStrip(a&&a.dataset.raw||'')); toast(_t("Текст скопійовано.")); }catch(_){} } } });
  const errBox=m=>`<div class="aim-err">${m}</div>`;
  const gate=()=>{ body.innerHTML=`<div class="aim-gate"><p>${kind==='report'?_t("Персональний розбір — це глибокий аналіз усієї вашої матриці, написаний саме про вас: зв’язки між енергіями, сценарії, гроші, стосунки, рід, призначення і план на 90 днів."):_t("Прогноз на 12 місяців — персональна розкладка наступного року по місяцях з урахуванням вашої матриці та програм років.")}</p><p class="muted">${kind=='report'?_t("Доступно в тарифах Plus і Pro або разово — у Пакеті."):_t("Доступно в тарифах Plus і Pro.")}</p><button class="btn go aura" type="button" data-plans>${_t("Обрати тариф")}</button></div>`; };
  if(kind==='chat'){
    /* every opening starts a fresh conversation (earlier ones live in the cabinet → «Питання до матриці»); «Продовжити» there resumes the last one */
    const hist=opt&&opt.resume?(rec.chat||[]).slice(-20):[]; let turns=[]; hist.forEach(m=>{ turns.push({role:'user',content:m.q}); turns.push({role:'assistant',content:m.a}); });
    const SUG=[_t("Яка професія мені найбільше підходить?"),_t("Що заважає мені заробляти більше?"),_t("Чому в стосунках у мене повторюється один сценарій?"),_t("На що звернути увагу цього року?")];
    let sug=cx&&cx.sug.length?cx.sug:SUG;
    const draw=()=>{ body.innerHTML=`${cx?`<p class="aim-meta aim-cx">${_t("Розділ")}: ${esc(cx.label)}</p>`:''}<div class="aim-chat">${hist.length?hist.map(m=>`<div class="aim-q">${esc(m.q)}</div><div class="aim-a tp-ans" data-raw="${esc(m.a||'')}">${m.a?tpMd(m.a)+aiCopyBtn():aiThinking()}</div>`).join(''):`<p class="aim-intro">${_t("Питайте про що завгодно: роботу, гроші, стосунки, рішення, які зараз перед вами. Відповідь спиратиметься на позиції саме вашої матриці.")}</p>`}</div>
      <div class="aim-sgw"><p class="aim-sgl">${hist.length?_t("Можна запитати далі"):_t("Можна запитати")}</p><div class="aim-sg">${sug.map(q=>`<button type="button" data-q="${esc(q)}"><span>${esc(q)}</span></button>`).join('')}</div></div>
      <form class="aim-f"><textarea id="aimIn" rows="2" maxlength="600" placeholder="${_t("Ваше питання до матриці…")}"></textarea><button class="btn go sm" type="submit">${_t("Запитати")}</button></form><div id="aimE"></div>`;
      const ch=body.querySelector('.aim-chat'); ch.scrollTop=ch.scrollHeight; };
    draw();
    const ask=async q=>{ q=q.trim(); if(!q||ctlBox.c) return;
      const m={q,a:'',cx:cx?cx.label:'',ts:Date.now()}; hist.push(m); draw();
      const last=()=>{ const a=body.querySelectorAll('.aim-a'); return a[a.length-1]; };
      const all=[];
      hist.forEach((x,i)=>{ const cn=x.cx?`CONTEXT: the person asked this while reading the section «${x.cx}» of their matrix — answer in that context, using the energies of this section first, then the rest of the matrix.\n`:''; all.push({role:'user',content:i?cn+x.q:aimChatPrompt()+`\n\n${cn}QUESTION: ${x.q}`}); if(i<hist.length-1) all.push({role:'assistant',content:x.a||'—'}); });
      const ctl=new AbortController(); ctlBox.c=ctl;
      try{ const res=await aimRun('chat',all,t=>{ m.a=t; const a=last(); if(a) a.innerHTML=tpMd(t); },ctl.signal,kbFull());
        m.a=res.text; sug=(tpFuParse(res.text)||SUG).slice(0,3); const s2=aiStore(); s2[key]=s2[key]||{}; const mine=hist.map(x=>({q:x.q,a:x.a,cx:x.cx||'',ts:x.ts||0})); s2[key].chat=(s2[key].chat||[]).filter(x=>!mine.some(y=>y.ts===x.ts&&y.q===x.q)).concat(mine).slice(-200); aiSave(s2); draw(); }
      catch(e){ hist.pop(); draw(); body.querySelector('#aimE').innerHTML=errBox(tpErr(e&&e.code)); }
      finally{ ctlBox.c=null; } };
    body.addEventListener('click',e=>{ const b=e.target.closest('[data-q]'); if(b) ask(b.dataset.q); });
    body.addEventListener('submit',e=>{ e.preventDefault(); const t=body.querySelector('#aimIn'); const v=t.value; t.value=''; ask(v); });
    body.addEventListener('keydown',e=>{ if(e.target.id==='aimIn'&&e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); body.querySelector('.aim-f').requestSubmit(); } });
    return;
  }
  const saved=kind==='report'?rec.report:(rec.year&&rec.year.from===`${new Date().getFullYear()}-${new Date().getMonth()}`?rec.year:null);
  let CUR=null;
  const showRec=r=>{ CUR=r; const t=aiTextFor(r); show(t||r.text,r.ts,false,t?(t!==r.text?'tr':''):'need'); };
  const show=(txt,ts,busy,tm)=>{ body.innerHTML=`${ts?`<p class="aim-meta">${_f("Створено {0}",[new Date(ts).toLocaleDateString(LOC(),{day:'numeric',month:'long',year:'numeric'})])}${tm==='tr'?` · ${_t("перекладено автоматично")}`:''}</p>`:''}${tm==='need'?aiTrBar():''}<div class="tp-ans aim-doc">${txt?tpMd(txt):`${aiThinking(true)}<p class="muted">${_t("Готуємо розбір — це займе 1–2 хвилини. Можна читати, поки текст з’являється.")}</p>`}</div>
    ${busy?'':`<div class="aim-acts"><button class="btn ghost sm" type="button" data-aim-copy>${_t("Скопіювати текст")}</button><button class="btn ghost sm" type="button" data-aim-pdf>${_t("Завантажити PDF")}</button><button class="btn ghost sm" type="button" data-aim-redo>${_t("Оновити розбір")}</button></div>${window.CODE_SB?`<p class="aim-h">${_t("Оновлення створює новий розбір і рахується в ліміті тарифу.")}</p>`:''}`}`; };
  const run=async()=>{
    if(!aimPaid(kind)){ gate(); return; }
    show('',0,true); const ctl=new AbortController(); ctlBox.c=ctl;
    try{ const res=await aimRun(kind,[{role:'user',content:kind==='report'?aimReportPrompt():aimYearPrompt()}],t=>{ const el=body.querySelector('.aim-doc'); if(el) el.innerHTML=tpMd(t); },ctl.signal,kind==='year'?{method:true,mx:kbMx(STATE.P,{age:curAge(),months:aimMonths()})}:kbFull());
      const s2=aiStore(); s2[key]=s2[key]||{}; const now=Date.now();
      if(kind==='report') s2[key].report={text:res.text,ts:now,lang:LANG}; else { if(s2[key].year&&s2[key].year.text) s2[key].yearsOld=[s2[key].year,...(s2[key].yearsOld||[])].slice(0,12); s2[key].year={text:res.text,ts:now,lang:LANG,from:`${new Date().getFullYear()}-${new Date().getMonth()}`}; }
      aiSave(s2); showRec({text:res.text,ts:now,lang:LANG}); }
    catch(e){ if(e&&e.code==='need_plan'){ gate(); return; } if(e&&e.code==='report_quota'){ body.innerHTML=`<div class="aim-gate"><p>${kind==='report'?_t("Ліміт персональних розборів на цей місяць вичерпано. Збережені розбори залишаються з вами."):_t("Ліміт прогнозів на цей місяць вичерпано. Збережений прогноз залишається з вами.")}</p><p class="muted">${_t("Більше розборів — у тарифі Pro")}${kind==='report'?_t(" або в Пакеті"):''}.</p><button class="btn go aura" type="button" data-plans>${_t("Обрати тариф")}</button></div>`; return; } if(!(e&&e.code==='cancelled')) body.innerHTML=errBox(tpErr(e&&e.code))+`<div class="aim-acts"><button class="btn ghost sm" type="button" data-aim-redo>${_t("Спробувати ще раз")}</button></div>`; }
    finally{ ctlBox.c=null; } };
  body.addEventListener('click',async e=>{
    if(e.target.closest('[data-aim-redo]')) run();
    const cur=()=>{ const t=(aiStore()[key]||{})[kind==='report'?'report':'year']; return t&&t.text?Object.assign({},t,{text:aiTextFor(t)||t.text}):null; };
    { const pb=e.target.closest('[data-aim-pdf]'); if(pb){ const t=cur(); if(t) downloadCode(pb,aiPdfSrc(kind,t.text,t.ts,{name:STATE.name,date:dotDate(STATE.d,STATE.m,STATE.y)},true)); } }
    if(e.target.closest('[data-aim-copy]')){ const t=cur(); try{ await navigator.clipboard.writeText(tpStrip(t&&t.text||'')); toast(_t("Текст скопійовано.")); }catch(_){} }
    { const tb=e.target.closest('[data-aim-tr]'); if(tb&&CUR){ const r0=(aiStore()[key]||{})[kind==='report'?'report':'year']; if(!r0) return; const ctl=new AbortController(); ctlBox.c=ctl;
      const bar=body.querySelector('.aim-tr'); if(bar) bar.innerHTML=`<p>${_t("Перекладаємо — це займе хвилину-дві.")}</p>`;
      try{ const t=await aiTranslate(r0.text,x=>{ const el=body.querySelector('.aim-doc'); if(el) el.innerHTML=tpMd(x); },ctl.signal); aiStoreTr(key,kind,r0.ts,t); showRec((aiStore()[key]||{})[kind==='report'?'report':'year']); }
      catch(err){ if(!(err&&err.code==='cancelled')){ if(bar) bar.innerHTML=`<p>${tpErr(err&&err.code)}</p>`; } }
      finally{ ctlBox.c=null; } } }
  });
  if(saved) showRec(saved); else run();
}
document.addEventListener('click',e=>{ const b=e.target.closest&&e.target.closest('[data-aim]'); if(b){ e.preventDefault(); aimOpen(b.dataset.aim,b.dataset.aimCtx); } });


/* ---------- cabinet: questions to the matrix & AI readings (stored in code-ai-reports, synced to the cloud) ---------- */
const IC_ASK=`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v8.5A1.5 1.5 0 0 1 19 17h-7.5L7 20.5V17H5a1.5 1.5 0 0 1-1.5-1.5V7A1.5 1.5 0 0 1 5 5.5z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M10 9.6a2 2 0 1 1 2.6 1.9c-.4.1-.6.5-.6.9v.3M12 14.6v.1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`;
const IC_DOC=`<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 3.5h7l4.5 4.5v11A1.5 1.5 0 0 1 17 20.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M14 3.7V8h4.3M8.6 12h6.8M8.6 15.4h4.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`;
const aimKeyInfo=k=>{ const [name,dt,g]=String(k).split('|'), [d,m,y]=String(dt||'').split('.').map(Number); return {name:name||'',d,m,y,g:g||'f'}; };
const aimKeyLabel=k=>{ const o=aimKeyInfo(k); return `${esc(o.name||_t("Без імені"))} <span class="fd">— ${o.d?dotDate(o.d,o.m,o.y):''}</span>`; };
function aiChats(){ const st=aiStore(); return Object.keys(st).map(k=>{ const c=(st[k].chat||[]).filter(x=>x&&x.q&&x.a); return {k,c,ts:c.reduce((t,x)=>Math.max(t,x.ts||0),0)}; }).filter(x=>x.c.length).sort((a,b)=>b.ts-a.ts); }
function aiReps(only){ const st=aiStore(), out=[]; Object.keys(st).forEach(k=>{ ['report','year'].forEach(kind=>{ if(only&&only!==kind) return; const r=st[k][kind]; if(r&&r.text) out.push({k,kind,text:r.text,ts:r.ts||0,lang:r.lang,tr:r.tr}); }); if(!only||only==='year') (st[k].yearsOld||[]).forEach((r,i)=>{ if(r&&r.text) out.push({k,kind:'year',text:r.text,ts:r.ts||0,old:i,lang:r.lang,tr:r.tr}); }); }); return out.sort((a,b)=>b.ts-a.ts); }
/* language of a saved reading (old ones have no tag: Cyrillic means Ukrainian) and its text in the current site language */
const aiLangOf=r=>r&&r.lang||(/[А-Яа-яІіЇїЄєҐґ]/.test(String(r&&r.text||'').slice(0,600))?'uk':'en');
const aiTextFor=r=>!r?null:aiLangOf(r)===LANG?r.text:(r.tr&&r.tr[LANG])||null;
const aiTrBar=()=>`<div class="aim-tr"><p>${_t("Цей розбір створено іншою мовою.")}</p><button class="btn ghost sm" type="button" data-aim-tr>${_t("Перекласти українською")}</button></div>`;
/* translates a long reading section by section (free for readings you already have), streaming into the page */
async function aiTranslate(text,onText,signal){
  const s=await tpGetSample(); if(!s) throw Object.assign(new Error('nosample'),{code:'not_configured'});
  const parts=[]; let cur='';
  const push=x=>{ if(cur&&(cur.length+x.length>5500)){ parts.push(cur); cur=''; } cur+=x; };
  String(text).split(/\n(?=#{1,3} )/).forEach(sec=>{ sec+='\n'; if(sec.length<=5500) push(sec); else sec.split(/\n\n/).forEach(pp=>push(pp+'\n\n')); });
  if(cur.trim()) parts.push(cur);
  let done='';
  for(const ch of parts){ if(signal&&signal.aborted) throw Object.assign(new Error('c'),{code:'cancelled'});
    const res=await s([{role:'user',content:ch}],{cache:false,signal,task:'tr',lang:LANG,onText:({text})=>onText(done+text)});
    done+=res.text.trim()+'\n\n'; onText(done); }
  return done.trim();
}
function aiStoreTr(k,kind,ts,text){ const st=aiStore(), o=st[k]; if(!o) return;
  const list=[o[kind]].concat(kind==='year'?(o.yearsOld||[]):[]); const r=list.find(x=>x&&x.ts===ts); if(!r) return;
  r.tr=r.tr||{}; r.tr[LANG]=text; aiSave(st); }
const aiAskCount=()=>aiChats().reduce((n,x)=>n+x.c.length,0);
function asksPane(){
  const L=aiChats();
  return `<div class="dm-h"><h2>${_t("Питання до матриці")}</h2></div>
    ${L.length?`<div class="ak-list">${L.map(g=>`<section class="ak-g"><div class="ak-gh"><div><strong>${aimKeyLabel(g.k)}</strong><small>${_f("питань: {0}",[g.c.length])}${g.ts?` · ${whenTxt(g.ts)}`:''}</small></div>
      <div class="fav-acts"><button class="btn ghost sm" type="button" data-akgo="${esc(g.k)}">${AI_IC}<span>${_t("Продовжити")}</span></button><button class="fav-ic del" type="button" data-akdel="${esc(g.k)}" aria-label="${_t("Видалити питання")}" title="${_t("Видалити питання")}">${IC_DEL}</button></div></div>
      ${g.c.slice().reverse().map(x=>`<details class="ak-it"><summary><span class="ak-q">${esc(x.q)}</span><small>${x.cx?esc(x.cx):_t("Уся матриця")}${x.ts?` · ${whenTxt(x.ts)}`:''}</small></summary><div class="ak-a tp-md" data-raw="${esc(x.a)}">${tpMd(x.a)}${aiCopyBtn()}</div></details>`).join('')}</section>`).join('')}</div>`
    :`<div class="empty"><p>${_t("Тут з’являться ваші питання до матриці та відповіді на них.")}</p><p class="muted">${_t("Поставити питання можна внизу будь-якого розділу розбору — кнопка «Запитай свою матрицю».")}</p><button class="btn go aura" type="button" data-akmine>${T('sMine')}</button></div>`}`;
}
function repsPane(only){
  const L=aiReps(only), Y=only==='year', nm=r=>{ if(r.kind==='report') return _t("Персональний розбір матриці"); const d=new Date(r.ts||Date.now()), e=new Date(d.getFullYear(),d.getMonth()+11,1); return `${MONTHN[d.getMonth()]} ${d.getFullYear()} — ${MONTHN[e.getMonth()].toLowerCase()} ${e.getFullYear()}`; };
  return `<div class="dm-h"><h2>${Y?_t("Прогнози на рік"):_t("Розбори матриці")}</h2></div>
    ${L.length?`<div class="favs">${L.map((r,i)=>`<div class="fav rp-row"><button class="fav-open" type="button" data-rpo="${i}"><span class="rp-ic">${r.kind==='report'?IC_DOC:IC_CLOCK}</span><strong>${nm(r)}</strong><small>${Y?`${_t("Прогноз на 12 місяців")} · `:''}${aimKeyLabel(r.k).replace(/<[^>]+>/g,'')}${r.ts?` · ${whenTxt(r.ts)}`:''}${r.old!=null?` · ${_t("попередня версія")}`:''}</small></button>
      <div class="fav-acts"><button class="btn ghost sm rp-pdf" type="button" data-rpp="${i}">PDF</button><button class="fav-ic del" type="button" data-rpd="${i}" aria-label="${_t("Видалити")}" title="${_t("Видалити")}">${IC_DEL}</button></div></div>`).join('')}</div>`
    :`<div class="empty"><p>${Y?_t("Тут з’являться ваші прогнози на 12 місяців — усі збережені версії."):_t("Тут з’являться ваші персональні розбори від ШІ.")}</p><p class="muted">${Y?_t("Замовити прогноз можна під вашою матрицею — кнопка «Прогноз на 12 місяців»."):_t("Замовити розбір можна під вашою матрицею — кнопка «Персональний розбір від ШІ».")}</p><button class="btn go aura" type="button" data-akmine>${T('sMine')}</button></div>`}`;
}
/* open the matrix behind a stored key, then the AI window on top of it */
function aimOpenFor(k,kind){
  const o=aimKeyInfo(k); if(!o.d) return;
  openFav({type:'solo',name:o.name,d:o.d,m:o.m,y:o.y,g:o.g});
  let n=0; const t=setInterval(()=>{ n++; if(STATE&&STATE.P&&AIM_KEY()===k){ clearInterval(t); aimOpen(kind,null,{resume:true}); } else if(n>40) clearInterval(t); },100);
}
/* read a stored reading without leaving the cabinet */
function aiReader(r){
  const o=aimKeyInfo(r.k), title=r.kind==='report'?_t("Персональний розбір матриці"):_t("Прогноз на 12 місяців");
  const d=document.createElement('div'); d.className='tf-ov aim-ov'; d.setAttribute('role','dialog'); d.setAttribute('aria-modal','true'); d.setAttribute('aria-labelledby','aiRdT');
  d.innerHTML=`<div class="tf-bg"></div><div class="tf-box aim-box"><button class="x" type="button" data-tf="x" aria-label="${_t("Закрити")}">${IC_X}</button>
    <div class="tf-h"><div><p class="pk">[ ${esc(o.name||_t("Ваша матриця"))} · ${dotDate(o.d,o.m,o.y)} ]</p><h3 id="aiRdT">${title}</h3></div></div>
    <div class="aim-body"><p class="aim-meta">${r.ts?whenTxt(r.ts):''}${aiTextFor(r)&&aiTextFor(r)!==r.text?` · ${_t("перекладено автоматично")}`:''}</p>${aiTextFor(r)?'':aiTrBar()}<div class="aim-doc tp-md">${tpMd(aiTextFor(r)||r.text)}</div>
    <div class="aim-acts"><button class="btn ghost sm" type="button" data-rdc>${_t("Копіювати текст")}</button><button class="btn ghost sm" type="button" data-rdp>${_t("Завантажити PDF")}</button><button class="btn ghost sm" type="button" data-rdm>${_t("Відкрити матрицю")}</button></div></div></div>`;
  document.body.appendChild(d); document.documentElement.classList.add('mdl-on'); requestAnimationFrame(()=>d.classList.add('in'));
  const close=()=>{ d.classList.remove('in'); document.documentElement.classList.remove('mdl-on'); setTimeout(()=>d.remove(),240); document.removeEventListener('keydown',onKey,true); };
  const onKey=e=>{ if(e.key==='Escape'&&!document.querySelector('.pdlg')){ e.preventDefault(); e.stopImmediatePropagation(); close(); } };
  document.addEventListener('keydown',onKey,true);
  d.addEventListener('click',async e=>{
    if(e.target.closest('[data-tf=x]')||e.target.classList.contains('tf-bg')) return close();
    if(e.target.closest('[data-rdc]')){ try{ await navigator.clipboard.writeText(tpStrip(aiTextFor(r)||r.text)); toast(_t("Текст скопійовано.")); }catch(_){} }
    { const tb=e.target.closest('[data-aim-tr]'); if(tb){ const bar=d.querySelector('.aim-tr'); if(bar) bar.innerHTML=`<p>${_t("Перекладаємо — це займе хвилину-дві.")}</p>`;
      try{ const t=await aiTranslate(r.text,x=>{ d.querySelector('.aim-doc').innerHTML=tpMd(x); }); aiStoreTr(r.k,r.kind,r.ts,t); r.tr=Object.assign({},r.tr,{[LANG]:t}); if(bar) bar.remove(); const m=d.querySelector('.aim-meta'); if(m) m.textContent+=` · ${_t("перекладено автоматично")}`; }
      catch(err){ if(bar) bar.innerHTML=`<p>${tpErr(err&&err.code)}</p>`; } } }
    { const pb=e.target.closest('[data-rdp]'); if(pb) downloadCode(pb,aiPdfSrc(r.kind,aiTextFor(r)||r.text,r.ts,{name:o.name,date:dotDate(o.d,o.m,o.y)},!!(STATE&&STATE.P&&AIM_KEY()===r.k))); }
    if(e.target.closest('[data-rdm]')){ close(); const f=aimKeyInfo(r.k); openFav({type:'solo',name:f.name,d:f.d,m:f.m,y:f.y,g:f.g}); }
  });
}
const CAB_ITEMS=()=>[{k:'data',ic:IC_USR,t:T('cDataT'),n:null},{k:'saved',ic:BM_SVG,t:T('cSavedT'),n:USER.favs.length},{k:'hist',ic:IC_CLOCK,t:T('cHistT'),n:(USER.hist||[]).length},{k:'tarot',ic:IC_CARDS,t:_t("Мої розклади"),n:tpHist().length},{k:'asks',ic:IC_ASK,t:_t("Питання до матриці"),n:aiAskCount()},{k:'reps',ic:IC_DOC,t:_t("Розбори матриці"),n:aiReps('report').length},{k:'yrs',ic:IC_CLOCK,t:_t("Прогнози на рік"),n:aiReps('year').length},{k:'sub',ic:IC_PLAN,t:'Підписка',n:USER&&USER.sub&&USER.sub.plan!=='free'&&USER.sub.paid_until&&new Date(USER.sub.paid_until)>new Date()?USER.sub.plan[0].toUpperCase()+USER.sub.plan.slice(1):'Free'}];
function cabinetHTML(){
  const p=USER.profile||{};
  return `<div class="cab fade">
    <div class="cab-head"><div><p class="eyebrow">[ ${T('cK')} ] <span>${esc(USER.email)}</span></p><h1 class="cab-t"><span class="lt">${T('cHi')}</span> <b>${esc(p.name||T('cFriend'))}</b></h1></div>
      <div class="cab-acts"><button class="btn ghost sm" id="toStart" type="button">${T('cBack')}</button><button class="btn ghost sm" id="logoutBtn" type="button">${T('cOut')}</button></div></div>
    <div class="dash">
      ${(()=>{ const cur=CAB_ITEMS().find(x=>x.k===CAB_TAB)||CAB_ITEMS()[0]; return `<button class="btn go dn-go dn-go-m" type="button" data-mymx>${T('sMine')}</button>
      <nav class="panel dash-nav" aria-label="${T('cK')}">
        <button class="dn-tog" type="button" aria-expanded="false" aria-controls="dnList">${cur.ic}<span>${cur.t}</span>${cur.n!=null?`<em>${cur.n}</em>`:''}<i class="dn-chev" aria-hidden="true"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 4.5L6 8l3.5-3.5"/></svg></i></button>`; })()}
        <div class="dn-list" id="dnList"><div class="dn-in">
        <button class="dn${CAB_TAB==='data'?' on':''}" type="button" data-tab="data" aria-current="${CAB_TAB==='data'?'page':'false'}">${IC_USR}<span>${T('cDataT')}</span></button>
        <button class="dn${CAB_TAB==='saved'?' on':''}" type="button" data-tab="saved" aria-current="${CAB_TAB==='saved'?'page':'false'}">${BM_SVG}<span>${T('cSavedT')}</span><em>${USER.favs.length}</em></button>
        <button class="dn${CAB_TAB==='hist'?' on':''}" type="button" data-tab="hist" aria-current="${CAB_TAB==='hist'?'page':'false'}">${IC_CLOCK}<span>${T('cHistT')}</span><em>${(USER.hist||[]).length}</em></button>
        <button class="dn${CAB_TAB==='tarot'?' on':''}" type="button" data-tab="tarot" aria-current="${CAB_TAB==='tarot'?'page':'false'}">${IC_CARDS}<span>${_t("Мої розклади")}</span><em>${tpHist().length}</em></button>
        <button class="dn${CAB_TAB==='asks'?' on':''}" type="button" data-tab="asks" aria-current="${CAB_TAB==='asks'?'page':'false'}">${IC_ASK}<span>${_t("Питання до матриці")}</span><em>${aiAskCount()}</em></button>
        <button class="dn${CAB_TAB==='reps'?' on':''}" type="button" data-tab="reps" aria-current="${CAB_TAB==='reps'?'page':'false'}">${IC_DOC}<span>${_t("Розбори матриці")}</span><em>${aiReps('report').length}</em></button>
        <button class="dn${CAB_TAB==='yrs'?' on':''}" type="button" data-tab="yrs" aria-current="${CAB_TAB==='yrs'?'page':'false'}">${IC_CLOCK}<span>${_t("Прогнози на рік")}</span><em>${aiReps('year').length}</em></button>
        <button class="dn${CAB_TAB==='sub'?' on':''}" type="button" data-tab="sub" aria-current="${CAB_TAB==='sub'?'page':'false'}">${IC_PLAN}<span>Підписка</span><em>${USER&&USER.sub&&USER.sub.plan!=='free'&&USER.sub.paid_until&&new Date(USER.sub.paid_until)>new Date()?USER.sub.plan[0].toUpperCase()+USER.sub.plan.slice(1):'Free'}</em></button>
        </div></div>
        <div class="dn-sep" aria-hidden="true"></div>
        <button class="btn go dn-go" type="button" id="myMatrix" data-mymx>${T('sMine')}</button>
      </nav>
      <section class="panel dash-main">${CAB_TAB==='data'?dataPane(p):CAB_TAB==='hist'?histPane():CAB_TAB==='tarot'?tarotPane():CAB_TAB==='asks'?asksPane():CAB_TAB==='reps'?repsPane('report'):CAB_TAB==='yrs'?repsPane('year'):CAB_TAB==='sub'?subPane():savedPane()}</section>
    </div></div>`;
}
async function downloadFav(f,btn){ const prev=STATE; STATE=favState(f); try{ await downloadCode(btn); } finally{ STATE=prev; } }
const FORM_EL={modes:document.querySelector('.modes'),bar:document.querySelector('.bar')};
function formHome(){ const top=$('#topForm'), {modes,bar}=FORM_EL; if(!top||!bar||bar.parentNode===top) return; top.querySelector('.topnav').insertBefore(modes,$('#acctBtn')); top.appendChild(bar); }
function placeForm(){
  const slot=$('#startForm'), {modes,bar}=FORM_EL, top=$('#topForm');
  if(!modes||!bar||!top) return;
  const onStart=!!slot&&!$('#home').hidden&&$('#home').contains(slot);
  document.body.classList.toggle('on-start',onStart);
  if(onStart){ if(bar.parentNode!==slot){ slot.appendChild(modes); slot.appendChild(bar); } }
  else if(bar.parentNode!==top){ top.querySelector('.topnav').insertBefore(modes,$('#acctBtn')); top.appendChild(bar); }
}
const AUTH_ERR={promo:'Такого промокоду немає. Перевірте написання або залиште поле порожнім.',exists:'Акаунт із цим email уже існує. Увійдіть у нього.',nouser:'Акаунта з таким email немає. Створіть його — це хвилина.',badpw:'Пароль не підходить. Спробуйте ще раз.',storage:'Браузер не дозволяє зберігати дані. Перевірте налаштування приватності.'};
function renderHome(){
  { const gs=document.getElementById('guide'); if(gs) gs.hidden=true; hideTarot(); }
  const h=$('#home');
  const st=HOME_MODE!=='cab'&&(!!USER||GUEST_START), au=!st&&!USER;
  formHome();
  h.innerHTML=st?startHTML():au?authHTML():cabinetHTML();
  if(st) startWaves(h.querySelector('canvas.waves'));
  h.classList.toggle('is-start',st); h.classList.toggle('is-auth',au);
  if(document.body.classList.contains('auth-on')!==au) document.body.classList.toggle('auth-on',au);
  if(au){ startComets(); { const cx=$('#asClose'); if(cx) cx.addEventListener('click',closeAuth); } setTimeout(()=>{ AUTH_ANIM_DONE=true; },2600); const lg=$('#asLogo'); if(lg) lg.addEventListener('click',()=>{ GUEST_START=true; showHome('start'); }); }
  placeForm();
  const br=$('#backRes'); if(br) br.addEventListener('click',backToResult);
  const oc=$('#openCat'); if(oc) oc.addEventListener('click',openCatalog);
  h.querySelectorAll('input.nm').forEach(inp=>inp.addEventListener('input',()=>{const p=inp.selectionStart,v=capName(inp.value);if(v!==inp.value){inp.value=v;try{inp.setSelectionRange(p,p)}catch(_){}}}));
  if(!USER&&!st){
    h.querySelectorAll('[data-am]').forEach(b=>b.addEventListener('click',()=>{AUTH_MODE=b.dataset.am;renderHome();const f=$(AUTH_MODE==='login'?'#auEmail':'#auName');f&&f.focus();}));
    const agreeOK=()=>{ const a=$('#auAgree'), e=$('#auErr'); if(!a||a.checked) return true; e.classList.remove('info'); e.textContent=T('aNeedAgree'); e.hidden=false; a&&a.closest('.agree').classList.add('need'); return false; };
    { const a=$('#auAgree'); if(a) a.addEventListener('change',()=>{ a.closest('.agree').classList.remove('need'); const e=$('#auErr'); if(e.textContent===T('aNeedAgree')) e.hidden=true; }); }
    h.querySelectorAll('[data-sso]').forEach(b=>b.addEventListener('click',()=>{ if(!agreeOK()) return; const e=$('#auErr');e.textContent=T('aSso',b.dataset.sso);e.hidden=false;e.classList.add('info');}));
    $('#authForm').addEventListener('submit',async e=>{
      e.preventDefault();
      const err=$('#auErr'); err.classList.remove('info');
      const email=$('#auEmail').value.trim().toLowerCase(), pw=$('#auPw').value, nm=$('#auName')?$('#auName').value.trim():'';
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){err.textContent=T('aBadEmail');err.hidden=false;return;}
      if(!/^[\x21-\x7E]+$/.test(pw)){err.textContent=T('aShortPw');err.hidden=false;return;}
      if(!agreeOK()) return;
      try{
        if(AUTH_MODE!=='login'){ const pr=$('#auPromo')?$('#auPromo').value.trim().toUpperCase():''; try{ if(pr) localStorage.setItem('code-promo',pr); else localStorage.removeItem('code-promo'); }catch(_){} }
        if(AUTH_MODE==='login') await login(email,pw); else await register(email,pw,nm);
        if(profileReady(USER.profile)) fill(USER.profile);
        HOME_MODE='cab'; CAB_TAB='data'; PF_EDIT=!profileReady(USER.profile); renderHome(); if(hasResult()) render();
        toast(AUTH_MODE==='login'?_t("Ви увійшли в кабінет."):_t("Акаунт створено."));
      }catch(x){
        err.innerHTML=(AUTH_ERR[x]||_t("Щось пішло не так. Спробуйте ще раз."))+(x==='exists'?_t(" <button type=\"button\" class=\"inl\" data-am2=\"login\">Увійти</button>"):x==='nouser'?_t(" <button type=\"button\" class=\"inl\" data-am2=\"register\">Створити акаунт</button>"):'');
        err.hidden=false;
        const sw=err.querySelector('[data-am2]'); if(sw) sw.addEventListener('click',()=>{AUTH_MODE=sw.dataset.am2;renderHome();$('#auEmail').value=email;});
      }
    });
    return;
  }
  if(st){
    const sm=$('#startMine'); if(sm) sm.addEventListener('click',()=>{ setMode('solo'); fill(USER.profile); $('#q').requestSubmit(); });
    $('#startCab').addEventListener('click',()=>showHome('cab'));
    { const rs=$('#startReset'); if(rs){ rs.addEventListener('click',()=>{ clearForm(); toast(_t("Дані очищено.")); }); formHasData(); } }
    return;
  }
  $('#logoutBtn').addEventListener('click',logout);
  $('#toStart').addEventListener('click',()=>showHome('start'));
  h.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>{ CAB_TAB=b.dataset.tab; PF_EDIT=false; renderHome(); const t=h.querySelector('.dn.on'); t&&t.focus({preventScroll:true}); }));
  { const tg=h.querySelector('.dn-tog'), nv=h.querySelector('.dash-nav'); if(tg) tg.addEventListener('click',()=>{ const o=!nv.classList.contains('open'); nv.classList.toggle('open',o); tg.setAttribute('aria-expanded',String(o)); }); }
  h.querySelectorAll('[data-mymx]').forEach(b=>b.addEventListener('click',()=>{
    if(profileReady(USER.profile)){ setMode('solo'); fill(USER.profile); $('#q').requestSubmit(); }
    else { CAB_TAB='data'; PF_EDIT=true; renderHome(); const e=$('#pfErr'); e.textContent=T('cFill'); e.hidden=false; e.classList.add('info'); }
  }));
  if(CAB_TAB==='asks'||CAB_TAB==='reps'||CAB_TAB==='yrs'){ const RL=()=>aiReps(CAB_TAB==='reps'?'report':CAB_TAB==='yrs'?'year':undefined);
    h.querySelectorAll('[data-akmine]').forEach(b=>b.addEventListener('click',()=>{ const m=$('#myMatrix'); if(m) m.click(); }));
    h.querySelectorAll('[data-akgo]').forEach(b=>b.addEventListener('click',()=>aimOpenFor(b.dataset.akgo,'chat')));
    h.querySelectorAll('[data-akdel]').forEach(b=>b.addEventListener('click',()=>{ const st=aiStore(), k=b.dataset.akdel; if(st[k]){ delete st[k].chat; aiSave(st); } renderHome(); toast(_t("Питання видалено.")); }));
    h.querySelectorAll('[data-rpo]').forEach(b=>b.addEventListener('click',()=>{ const r=RL()[+b.dataset.rpo]; if(r) aiReader(r); }));
    h.querySelectorAll('[data-rpp]').forEach(b=>b.addEventListener('click',()=>{ const r=RL()[+b.dataset.rpp]; if(!r) return; const o=aimKeyInfo(r.k); downloadCode(b,aiPdfSrc(r.kind,aiTextFor(r)||r.text,r.ts,{name:o.name,date:dotDate(o.d,o.m,o.y)},!!(STATE&&STATE.P&&AIM_KEY()===r.k))); }));
    h.querySelectorAll('[data-rpd]').forEach(b=>b.addEventListener('click',()=>{ const r=RL()[+b.dataset.rpd]; if(!r) return; const st=aiStore(); if(st[r.k]){ if(r.old!=null) (st[r.k].yearsOld||[]).splice(r.old,1); else delete st[r.k][r.kind]; aiSave(st); } renderHome(); toast(_t("Розбір видалено.")); }));
  }
  if(CAB_TAB==='tarot'){
    h.querySelectorAll('[data-cto]').forEach(b=>b.addEventListener('click',()=>{ const x=tpHist()[+b.dataset.cto]; if(x) tpOpenSaved(x); }));
    h.querySelectorAll('[data-ctd]').forEach(b=>b.addEventListener('click',()=>{ const l=tpHist(); l.splice(+b.dataset.ctd,1); tpSaveHist(l); renderHome(); toast(_t("Розклад видалено.")); }));
    { const c=$('#tarClear'); if(c) c.addEventListener('click',()=>{ tpSaveHist([]); renderHome(); toast(_t("Розклади видалено.")); }); }
    { const g=$('#tarGo'); if(g) g.addEventListener('click',()=>{ TAR.read=null; showTarot(); }); }
  }
  if(CAB_TAB==='data'){
    setupDate('pfD','pfM','pfY'); applyStaticI18n();
    h.querySelectorAll('.consents input[type=checkbox]:not([disabled])').forEach(cb=>cb.addEventListener('change',()=>{
      if(cb.id==='csAll'){ try{ localStorage.setItem('code-cookies',cb.checked?'all':'min'); if(!cb.checked) localStorage.removeItem('code-recent'); }catch(_){} toast(cb.checked?_t("Зручність і аналітику увімкнено."):_t("Залишено лише необхідні cookies.")); return; }
      USER.profile=USER.profile||{}; const c=Object.assign({},USER.profile.consent||{});
      if(cb.id==='csServ') c.service=cb.checked; if(cb.id==='csNews') c.news=cb.checked; c.ts=new Date().toISOString();
      USER.profile.consent=c; persistUser(); toast(_t("Налаштування листів збережено."));
    }));
    const p=USER.profile||{};
    if(p.y){ $('#pfY').value=p.y; $('#pfM').value=p.m; $('#pfM').dispatchEvent(new Event('change')); $('#pfD').value=p.d; }
    h.querySelectorAll('.field select').forEach(s=>window.csEnhance&&window.csEnhance(s)); window.csSync&&window.csSync();
    $('#pfEdit').addEventListener('click',()=>{ PF_EDIT=!PF_EDIT; renderHome(); if(PF_EDIT){ const n=$('#pfName'); n&&n.focus(); } else { const b=$('#pfEdit'); b&&b.focus(); } });
    if(PF_EDIT){
      $('#pfCancel').addEventListener('click',()=>{ PF_EDIT=false; renderHome(); });
      $('#profForm').addEventListener('submit',e=>{
        e.preventDefault();
        const v={name:$('#pfName').value.trim(),d:+$('#pfD').value,m:+$('#pfM').value,y:+$('#pfY').value,g:document.querySelector('input[name=pfg]:checked').value}, err=$('#pfErr');
        if(!v.d||!v.m||!v.y){ err.classList.remove('info'); err.textContent=T('errDate'); err.hidden=false; return; }
        USER.profile=Object.assign({},USER.profile||{},v); persistUser(); fill(v); PF_EDIT=false; renderHome(); toast(_t("Дані збережено."));
      });
    }
  } else if(CAB_TAB==='hist'){
    h.querySelectorAll('[data-hi]').forEach(b=>b.addEventListener('click',()=>openFav(USER.hist[+b.dataset.hi])));
    h.querySelectorAll('[data-hd]').forEach(b=>b.addEventListener('click',()=>{ USER.hist.splice(+b.dataset.hd,1); persistUser(); renderHome(); }));
    const hc=$('#histClear'); if(hc) hc.addEventListener('click',()=>{ USER.hist=[]; persistUser(); renderHome(); toast(T('cCleared')); });
  } else {
    h.querySelectorAll('[data-fi]').forEach(b=>b.addEventListener('click',()=>openFav(USER.favs[+b.dataset.fi])));
    h.querySelectorAll('[data-fdl]').forEach(b=>b.addEventListener('click',()=>downloadFav(USER.favs[+b.dataset.fdl],b)));
    h.querySelectorAll('[data-fd]').forEach(b=>b.addEventListener('click',()=>{ USER.favs.splice(+b.dataset.fd,1); persistUser(); renderHome(); toast(_t("Прибрано з обраного.")); }));
  }
}

/* burger menu */
function openDrawer(){ document.body.classList.add('dr-open'); $('#drawer').setAttribute('aria-hidden','false'); $('#menuBtn').setAttribute('aria-expanded','true'); setTimeout(()=>{const f=$('#drawer .dr-i');f&&f.focus({preventScroll:true});},60); }
function closeDrawer(){ if(!document.body.classList.contains('dr-open')) return; document.body.classList.remove('dr-open'); $('#drawer').setAttribute('aria-hidden','true'); $('#menuBtn').setAttribute('aria-expanded','false'); }
$('#menuBtn').addEventListener('click',()=>document.body.classList.contains('dr-open')?closeDrawer():openDrawer());
$('#drClose').addEventListener('click',()=>{closeDrawer();$('#menuBtn').focus();});
$('#dscrim').addEventListener('click',closeDrawer);
document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&document.body.classList.contains('dr-open')){closeDrawer();$('#menuBtn').focus();} });
$('#acctBtn').addEventListener('click',()=>showHome('cab'));
$('#drLogo').addEventListener('click',()=>{ GUEST_START=true; showHome('start'); });
$('#drawer').addEventListener('click',e=>{const b=e.target.closest('.lang-b'); if(!b) return;
  /* this language's translations aren't loaded yet (they're a separate file): open the page in that language */
  if(b.dataset.lang!=='uk'&&!TR[b.dataset.lang]){ e.stopImmediatePropagation(); try{localStorage.setItem('code-lang',JSON.stringify(b.dataset.lang))}catch(_){} const to=(typeof pgPath==='function'&&PG_SERVED&&pgPath(PG_CUR||'home',b.dataset.lang))||location.pathname+'?lang='+b.dataset.lang; location.href=to; return; }
  LANG=b.dataset.lang; try{localStorage.setItem('code-lang',JSON.stringify(LANG))}catch(_){} const gv=!$('#guide').hidden, tv=!$('#tarot').hidden; applyStaticI18n(); setAcctIcon(); renderHome(); if(hasResult()&&!$('#result').hidden) render(); if(gv){ $('#guide').hidden=false; renderGuide(); } if(tv){ $('#tarot').hidden=false; document.body.classList.add('on-tarot'); renderTarot(); } });
/* menu routing: signed-in users with a profile go straight to their own matrix / day / years; others land on the start screen with the right form */
function goCalc(mode,view){
  closeDrawer(); view=view||'matrix';
  const ready=!!USER&&profileReady(USER.profile);
  if(mode==='solo'&&ready){ setMode('solo'); fill(USER.profile); PENDING_VIEW=view; $('#q').requestSubmit(); return; }
  if(mode==='solo'&&view!=='matrix'&&hasResult()&&STATE.mode==='solo'){ if($('#result').hidden) backToResult(); setView(view); window.scrollTo({top:0,behavior:'smooth'}); return; }
  PENDING_VIEW=mode==='solo'&&view!=='matrix'?view:null;
  GUEST_START=true; showHome('start'); setMode(mode);
  if(PENDING_VIEW) toast(view==='today'?_t("Розрахуйте матрицю — і одразу відкриється енергія дня."):_t("Розрахуйте матрицю — і одразу відкриється прогноз по роках."));
  setTimeout(()=>{const f=$(mode==='pair'?'#n1':'#name'); f&&f.focus({preventScroll:true});},400);
}
function focusForm(mode){ setMode(mode); window.scrollTo({top:0,behavior:'smooth'}); if(document.body.classList.contains('fc')&&innerWidth<=820) setFormOpen(true); setTimeout(()=>{const f=$(mode==='pair'?'#n1':'#name'); f&&f.focus({preventScroll:true});},350); }
/* deep links from the blog: /?go=tarot | years | pair | today | cat | guide | acct */
setTimeout(()=>{ try{ const g=new URLSearchParams(location.search).get('go'); if(g&&/^(solo|pair|today|years|cat|guide|tarot|acct)$/.test(g)){ const b=document.querySelector(`#drawer [data-act="${g}"]`); if(b) b.click(); history.replaceState(null,'',location.pathname+location.hash); } }catch(_){} },700);
$('#drawer').addEventListener('click',e=>{
  const b=e.target.closest('[data-act]'); if(!b) return;
  const a=b.dataset.act; closeDrawer();
  if(a==='solo'||a==='pair') goCalc(a);
  else if(a==='cat') openCatalog();
  else if(a==='acct') showHome('cab');
  else if(a==='guide') showGuide();
  else if(a==='tarot') showTarot();
  else if(a==='today'||a==='years') goCalc('solo',a);
});

/* ---------- page addresses: every section has its own URL (/taro, /sumisnist, /en/tarot …), titles and slugs come from «SEO» in the admin panel.
   The server (api/page.js) puts the right title/description into the HTML for search engines; here we keep the address bar, tab title
   and footer links in step while the visitor moves around the app, and open the right section when someone arrives on /taro etc. ---------- */
const PG_DEF=[['home','',''],['acct','kabinet','account'],['solo','osobysta-matrytsia','destiny-matrix'],['pair','sumisnist','compatibility'],['today','enerhiia-dnia','energy-of-the-day'],['cat','arkany','arcana'],['tarot','taro','tarot'],['years','prohnoz-po-rokakh','forecast-by-year'],['guide','pozytsii-matrytsi','positions'],['blog','blog','blog']];
const PG=(window.__SEO&&Array.isArray(__SEO.p)&&__SEO.p.length)?__SEO.p:PG_DEF.map(([k,u,e])=>({k,uk:{s:u},en:{s:e}}));
const PG_CALC=['solo','pair','today','years'];
const pgL=()=>LANG==='en'?'en':'uk';
function pgPath(k,l){ l=l||pgL(); const p=PG.find(x=>x.k===k); if(!p) return null; if(k==='home') return l==='en'?'/en':'/'; if(k==='blog') return l==='en'?'/en/blog':'/blog'; return (l==='en'?'/en/':'/')+p[l].s; }
function pgFromPath(pth){ const l=/^\/en(\/|$)/.test(pth)?'en':'uk'; const s=pth.replace(/^\/en(?=\/|$)/,'').replace(/^\/+|\/+$/g,''); if(!s||s==='index.html'||s==='app.html') return {k:'home',l}; const p=PG.find(x=>x.k!=='home'&&x[l]&&x[l].s===s); return p?{k:p.k,l}:null; }
const PG_SERVED=!!window.__SEO;   /* false when app.html is opened directly (local preview): leave the address alone */
const PG_START=(window.__SEO&&__SEO.k)||'home';
let PG_CUR=PG_START, PG_HINT=PG_CALC.includes(PG_START)?PG_START:null, PG_BUSY=true, PG_READY=false, pgT=0;
function pgMeta(k){ const p=PG.find(x=>x.k===k), L=p&&p[pgL()]; if(!L||!L.t) return; document.title=L.t; const md=document.querySelector('meta[name="description"]'); if(md&&L.d) md.setAttribute('content',L.d); const c=document.querySelector('link[rel="canonical"]'); if(c) c.setAttribute('href',location.origin+pgPath(k)); }
function pgSet(k,replace){
  const to=pgPath(k); if(!to) return;
  const same=location.pathname.replace(/\/+$/,'')===to.replace(/\/+$/,'');
  if(k===PG_CUR&&same) return; PG_CUR=k;
  if(!same&&PG_SERVED){ try{ history[(replace||PG_BUSY)?'replaceState':'pushState']({pg:k},'',to+location.search+location.hash); }catch(_){} }
  pgMeta(k);
}
function pgLinks(){ document.querySelectorAll('a.flink[data-pg]').forEach(a=>{ const k=a.dataset.pg, p=PG.find(x=>x.k===k); a.setAttribute('href',pgPath(k)); if(p&&p[pgL()]&&p[pgL()].n) a.textContent=p[pgL()].n; else if(LANG!=='uk') a.textContent=_t(a.textContent); }); }
function pgNow(){
  if(document.body.classList.contains('auth-on')) return 'acct';   /* sign-in screen = the way into the cabinet */
  const vis=id=>{ const e=document.getElementById(id); return !!(e&&!e.hidden); };
  if(vis('tarot')) return 'tarot';
  if(vis('guide')) return 'guide';
  if(vis('result')) return hasResult()?(isPair()?'pair':STATE.view==='today'?'today':STATE.view==='years'?'years':'solo'):'cat';
  if(vis('home')){ if(HOME_MODE==='cab') return 'acct'; const qp=document.getElementById('qp'); if(qp&&!qp.hidden) return 'pair'; return PG_HINT&&PG_HINT!=='pair'?PG_HINT:'home'; }
  return null;
}
function pgSoon(){ if(!PG_READY) return; clearTimeout(pgT); pgT=setTimeout(()=>{ const k=pgNow(); if(k) pgSet(k); },80); }
function pgRoute(k){
  PG_HINT=PG_CALC.includes(k)?k:null;
  if(k==='home'){ GUEST_START=true; showHome('start'); return; }
  if(k==='blog'){ location.href=pgPath('blog'); return; }
  const b=document.querySelector(`#drawer [data-act="${k}"]`); if(b) b.click();
}
['home','result','guide','tarot','qp'].forEach(id=>{ const e=document.getElementById(id); if(e) new MutationObserver(pgSoon).observe(e,{attributes:true,attributeFilter:['hidden'],childList:id==='result'||id==='home'}); });
new MutationObserver(pgSoon).observe(document.body,{attributes:true,attributeFilter:['class']});
/* what the visitor chose decides the address on the start screen (personal / day / years / compatibility form) */
$('#drawer').addEventListener('click',e=>{ const b=e.target.closest('[data-act]'); if(b) PG_HINT=PG_CALC.includes(b.dataset.act)?b.dataset.act:null; },true);
document.addEventListener('click',e=>{ if(e.target.closest('#drLogo,#toStart')) PG_HINT=null; },true);
document.addEventListener('click',e=>{ const a=e.target.closest('a.flink[data-pg]'); if(!a||e.metaKey||e.ctrlKey||e.shiftKey||e.button) return; e.preventDefault(); PG_BUSY=false; pgRoute(a.dataset.pg); window.scrollTo({top:0,behavior:'smooth'}); });
$('#drawer').addEventListener('click',e=>{ if(!e.target.closest('.lang-b')) return; pgLinks(); const k=PG_CUR; PG_CUR=null; pgSet(k,true); });
addEventListener('popstate',()=>{ const r=pgFromPath(location.pathname); if(!r) return; if(r.l!==pgL()){ location.reload(); return; } PG_BUSY=true; PG_CUR=r.k; pgRoute(r.k); pgMeta(r.k); setTimeout(()=>{ PG_BUSY=false; },600); });
pgLinks();
/* arrived on /taro, /kabinet …: open that section (like the old ?go= links); a stored English preference on a Ukrainian address moves to /en/… */
setTimeout(()=>{ try{
  const k=PG_START; if(k!=='home') pgRoute(k);
  if(PG_SERVED&&__SEO.lang!==pgL()){ PG_CUR=null; pgSet(k,true); } else pgMeta(k);
}catch(_){} setTimeout(()=>{ PG_READY=true; pgSoon(); setTimeout(()=>{ PG_BUSY=false; },400); },300); },700);


/* ---------- tarot card art: line-art vectors in the CODE style (Rider–Waite–Smith symbolism) ---------- */
const TA=(()=>{
const f=n=>Math.round(n*10)/10;
const P=(d,c)=>`<path d="${d}"${c?` class="${c}"`:''}/>`;
const C=(x,y,r,c)=>`<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}"${c?` class="${c}"`:''}/>`;
const L=(pts,c)=>`<polyline points="${pts.map(p=>p.map(f).join(',')).join(' ')}"${c?` class="${c}"`:''}/>`;
const G=(t,inner)=>`<g transform="${t}">${inner}</g>`;
/* four-point sparkle */
const S=(x,y,r)=>P(`M${f(x)} ${f(y-r)}Q${f(x)} ${f(y)} ${f(x+r)} ${f(y)}Q${f(x)} ${f(y)} ${f(x)} ${f(y+r)}Q${f(x)} ${f(y)} ${f(x-r)} ${f(y)}Q${f(x)} ${f(y)} ${f(x)} ${f(y-r)}Z`,'fl');
const STARS=(list)=>list.map(([x,y,r])=>S(x,y,r||3)).join('');
/* n-pointed star polygon */
const STAR=(x,y,R,r,n,rot=-90,c='')=>{let d='';for(let i=0;i<n*2;i++){const a=(rot+i*180/n)*Math.PI/180,rr=i%2?r:R;d+=(i?'L':'M')+f(x+Math.cos(a)*rr)+' '+f(y+Math.sin(a)*rr);}return P(d+'Z',c);};
const RAYS=(x,y,r1,r2,n,rot=0,skip)=>{let d='';for(let i=0;i<n;i++){if(skip&&skip(i))continue;const a=(rot+i*360/n)*Math.PI/180;d+=`M${f(x+Math.cos(a)*r1)} ${f(y+Math.sin(a)*r1)}L${f(x+Math.cos(a)*r2)} ${f(y+Math.sin(a)*r2)}`;}return P(d);};
const WAVY=(x1,x2,y,amp,n)=>{let d=`M${x1} ${y}`;const w=(x2-x1)/n;for(let i=0;i<n;i++){d+=`q${f(w/4)} ${-amp} ${f(w/2)} 0t${f(w/2)} 0`;}return P(d);};
const MOUNT=(pts)=>P('M'+pts.map(p=>p.map(f).join(' ')).join('L'));
/* figure pieces */
const FACE=(x,y,r)=>P(`M${f(x-r*.5)} ${f(y+r*.02)}q${f(r*.17)} ${f(r*.16)} ${f(r*.34)} 0M${f(x+r*.16)} ${f(y+r*.02)}q${f(r*.17)} ${f(r*.16)} ${f(r*.34)} 0M${f(x-r*.16)} ${f(y+r*.45)}q${f(r*.16)} ${f(r*.1)} ${f(r*.32)} 0`,'thin');
const HAIRB=(x,y,r,len=2.6)=>P(`M${f(x-r-3)} ${f(y+r*len)}C${f(x-r-5)} ${f(y-r*.4)} ${f(x-r*.8)} ${f(y-r*1.45)} ${f(x)} ${f(y-r*1.42)}C${f(x+r*.8)} ${f(y-r*1.45)} ${f(x+r+5)} ${f(y-r*.4)} ${f(x+r+3)} ${f(y+r*len)}Z`,'fa');
const EYES=(x,y,r)=>P(`M${f(x-r*.5)} ${f(y+r*.02)}q${f(r*.17)} ${f(r*.16)} ${f(r*.34)} 0M${f(x+r*.16)} ${f(y+r*.02)}q${f(r*.17)} ${f(r*.16)} ${f(r*.34)} 0`,'thin');
const HEAD=(x,y,r,hair)=>{
  let o='';
  if(hair==='long') o+=HAIRB(x,y,r); if(hair==='mid') o+=HAIRB(x,y,r,1.3);
  o+=C(x,y,r,'sk');
  const fringe=P(`M${f(x-r)} ${f(y-r*.05)}Q${f(x-r*.6)} ${f(y-r*1.05)} ${f(x)} ${f(y-r*.98)}Q${f(x+r*.6)} ${f(y-r*1.05)} ${f(x+r)} ${f(y-r*.05)}Q${f(x+r*.2)} ${f(y-r*.62)} ${f(x-r)} ${f(y-r*.05)}Z`,'fa');
  const cap=P(`M${f(x-r)} ${f(y-r*.05)}Q${f(x)} ${f(y-r*1.35)} ${f(x+r)} ${f(y-r*.05)}Q${f(x+r*.3)} ${f(y-r*.62)} ${f(x-r)} ${f(y-r*.05)}Z`,'fa');
  if(hair==='skull') return o+P(`M${f(x-r*.5)} ${f(y-r*.1)}h${f(r*.32)}v${f(r*.28)}h${f(-r*.32)}zM${f(x+r*.18)} ${f(y-r*.1)}h${f(r*.32)}v${f(r*.28)}h${f(-r*.32)}zM${f(x-r*.3)} ${f(y+r*.6)}h${f(r*.6)}M${f(x-r*.1)} ${f(y+r*.5)}v${f(r*.2)}M${f(x+r*.1)} ${f(y+r*.5)}v${f(r*.2)}`,'thin');
  if(hair==='long'||hair==='mid') return o+fringe+FACE(x,y,r);
  if(hair==='beard') return o+cap+EYES(x,y,r)+P(`M${f(x-r*.98)} ${f(y+r*.2)}Q${f(x-r*.95)} ${f(y+r*2.1)} ${f(x)} ${f(y+r*2.6)}Q${f(x+r*.95)} ${f(y+r*2.1)} ${f(x+r*.98)} ${f(y+r*.2)}Q${f(x+r*.6)} ${f(y+r*.75)} ${f(x+r*.25)} ${f(y+r*.42)}Q${f(x)} ${f(y+r*.25)} ${f(x-r*.25)} ${f(y+r*.42)}Q${f(x-r*.6)} ${f(y+r*.75)} ${f(x-r*.98)} ${f(y+r*.2)}Z`,'fa')+P(`M${f(x-r*.2)} ${f(y+r*.95)}q${f(r*.2)} ${f(r*.12)} ${f(r*.4)} 0`,'thin');
  return o+cap+FACE(x,y,r);
};
const ROBE=(x,y1,y2,w1,w2,c='fa')=>P(`M${f(x-w1)} ${f(y1+7)}Q${f(x-w1)} ${f(y1)} ${f(x-w1*.35)} ${f(y1)}L${f(x+w1*.35)} ${f(y1)}Q${f(x+w1)} ${f(y1)} ${f(x+w1)} ${f(y1+7)}L${f(x+w1*.82)} ${f(y1+(y2-y1)*.32)}L${f(x+w2)} ${f(y2)}Q${f(x)} ${f(y2+6)} ${f(x-w2)} ${f(y2)}L${f(x-w1*.82)} ${f(y1+(y2-y1)*.32)}Z`,c)+P(`M${f(x-w1*.35)} ${f(y1)}Q${f(x)} ${f(y1+7)} ${f(x+w1*.35)} ${f(y1)}`,'thin');
const ARM=(sx,sy,hx,hy,w=6)=>{const dx=hx-sx,dy=hy-sy,l=Math.hypot(dx,dy)||1,nx=-dy/l,ny=dx/l,w2=w*.5;return P(`M${f(sx+nx*w)} ${f(sy+ny*w)}L${f(hx+nx*w2)} ${f(hy+ny*w2)}L${f(hx-nx*w2)} ${f(hy-ny*w2)}L${f(sx-nx*w)} ${f(sy-ny*w)}Z`,'fa')+C(hx+dx/l*2.4,hy+dy/l*2.4,2.6,'sk');};
/* standing figure: head centre (x,y), robe to hem */
const FIG=(o)=>{const {x,y,r=9,hem,wh=24,hair='short',arms=[],belt,w=14}=o;return (o.back||'')+ROBE(x,y+r+3,hem,w,wh)+(belt?P(`M${f(x-w*.82)} ${f(y+r+3+(hem-y-r-3)*.32)}h${f(w*1.64)}`,'thin'):'')+arms.map(([hx,hy],i)=>ARM(x+(i?w-3:-(w-3)),y+r+7,hx,hy)).join('')+HEAD(x,y,r,hair)+(o.top||'');};
const CROWN=(x,y,w,h,n=3)=>{let d=`M${f(x-w)} ${f(y)}`;for(let i=0;i<=n*2;i++){const xx=x-w+i*(2*w)/(n*2);d+=`L${f(xx)} ${f(i%2?y-h*.45:y-h)}`;}d+=`L${f(x+w)} ${f(y)}Z`;return P(d,'fa');};
const CUP=(x,y,s=1)=>P(`M${f(x-7*s)} ${f(y)}h${f(14*s)}q0 ${f(10*s)} ${f(-7*s)} ${f(11*s)}q${f(-7*s)} ${f(-1*s)} ${f(-7*s)} ${f(-11*s)}ZM${f(x)} ${f(y+11*s)}v${f(7*s)}M${f(x-5*s)} ${f(y+19*s)}h${f(10*s)}`,'fa');
const SWORD=(x,y,len,ang=0,s=1)=>G(`translate(${f(x)} ${f(y)}) rotate(${ang})`,P(`M0 ${f(-len)}l${f(2.2*s)} ${f(5*s)}v${f(len-9*s)}h${f(-4.4*s)}v${f(-(len-9*s))}ZM${f(-7*s)} ${f(-4*s)}h${f(14*s)}M0 ${f(-4*s)}v${f(9*s)}`,'fa')+C(0,5.6*s,1.4*s));
const WAND=(x,y,len,ang=0,s=1)=>G(`translate(${f(x)} ${f(y)}) rotate(${ang})`,P(`M${f(-1.8*s)} ${f(-len/2)}h${f(3.6*s)}v${f(len)}h${f(-3.6*s)}Z`,'fa')+P(`M${f(1.8*s)} ${f(-len*.25)}q${f(4*s)} ${f(-2*s)} ${f(5*s)} ${f(-6*s)}M${f(-1.8*s)} ${f(len*.12)}q${f(-4*s)} ${f(-2*s)} ${f(-5*s)} ${f(-6*s)}`)+P(`M${f(1.8*s)} ${f(-len*.25)}q${f(3*s)} ${f(-1*s)} ${f(5*s)} ${f(-6*s)}q${f(-3*s)} ${f(1*s)} ${f(-5*s)} ${f(6*s)}`,'fl'));
const PENT=(x,y,r)=>C(x,y,r,'fa')+STAR(x,y,r*.82,r*.32,5);
const SUN=(x,y,r,face)=>C(x,y,r,'fa')+RAYS(x,y,r+3,r+9,16)+RAYS(x,y,r+3,r+5.5,16,11.25)+(face?P(`M${f(x-r*.45)} ${f(y-r*.1)}q${f(r*.2)} ${f(-r*.2)} ${f(r*.35)} 0M${f(x+r*.1)} ${f(y-r*.1)}q${f(r*.2)} ${f(-r*.2)} ${f(r*.35)} 0M${f(x-r*.3)} ${f(y+r*.35)}q${f(r*.3)} ${f(r*.25)} ${f(r*.6)} 0`,'thin'):'');
const MOONC=(x,y,r,dir=1)=>P(`M${f(x)} ${f(y-r)}A${f(r)} ${f(r)} 0 1 ${dir>0?0:1} ${f(x)} ${f(y+r)}A${f(r*.78)} ${f(r*.78)} 0 1 ${dir>0?1:0} ${f(x)} ${f(y-r)}Z`,'fa');
const PILLAR=(x,y1,y2,w,lab)=>P(`M${f(x-w)} ${f(y1)}h${f(w*2)}v${f(y2-y1)}h${f(-w*2)}ZM${f(x-w-2)} ${f(y1)}h${f(w*2+4)}M${f(x-w-2)} ${f(y2)}h${f(w*2+4)}M${f(x-w*.6)} ${f(y1-5)}q${f(w*.6)} ${f(-6)} ${f(w*1.2)} 0`,'fa')+(lab?`<text x="${f(x)}" y="${f(y1+16)}" class="tx">${lab}</text>`:'');
const LEMN=(x,y,w)=>P(`M${f(x)} ${f(y)}c${f(w*.3)} ${f(-w*.35)} ${f(w)} ${f(-w*.35)} ${f(w)} 0s${f(-w*.7)} ${f(w*.35)} ${f(-w)} 0s${f(-w*.7)} ${f(-w*.35)} ${f(-w)} 0s${f(w*.7)} ${f(w*.35)} ${f(w)} 0`);
const CLOUD=(x,y,w)=>P(`M${f(x-w)} ${f(y)}q${f(w*.1)} ${f(-w*.3)} ${f(w*.35)} ${f(-w*.22)}q${f(w*.15)} ${f(-w*.35)} ${f(w*.45)} ${f(-w*.22)}q${f(w*.3)} ${f(-w*.25)} ${f(w*.55)} ${f(-w*.02)}q${f(w*.4)} ${f(-w*.05)} ${f(w*.65)} ${f(w*.46)}Z`,'fa');
const ROSE=(x,y,r)=>C(x,y,r,'fa')+P(`M${f(x-r*.5)} ${f(y)}q${f(r*.5)} ${f(-r*.7)} ${f(r)} 0q${f(-r*.5)} ${f(r*.6)} ${f(-r)} 0`,'thin');
const LILY=(x,y,s=1)=>P(`M${f(x)} ${f(y)}v${f(10*s)}M${f(x)} ${f(y)}q${f(-5*s)} ${f(-2*s)} ${f(-5*s)} ${f(-7*s)}q${f(4*s)} ${f(1*s)} ${f(5*s)} ${f(5*s)}q${f(1*s)} ${f(-4*s)} ${f(5*s)} ${f(-5*s)}q0 ${f(5*s)} ${f(-5*s)} ${f(7*s)}`);
const WHEAT=(x,y,h)=>{let d=`M${f(x)} ${f(y)}v${f(-h)}`;for(let i=0;i<4;i++){const yy=y-h+4+i*5;d+=`M${f(x)} ${f(yy)}q-4 -1 -4 -5q3 1 4 5q0 -4 4 -5q0 4 -4 5`;}return P(d);};
const GARLAND=(x1,x2,y)=>{let d='';const n=7,w=(x2-x1)/n;for(let i=0;i<n;i++)d+=`M${f(x1+i*w)} ${f(y)}q${f(w/2)} 7 ${f(w)} 0`;let fl='';for(let i=0;i<=n;i++)fl+=ROSE(x1+i*w,y,2.6);return P(d)+fl;};
const GROUND=(y)=>P(`M18 ${y}h164`,'thin');

const A={};
const SPARK=()=>STARS([[30,56,2.6],[170,56,2.6]]);
const ANIM_LION=(x,y,s=1,flip)=>G(`translate(${x} ${y}) scale(${flip?-s:s} ${s})`,P('M-34 30v-26q0-14 14-18h30q10 0 14-10l10 4q2 10-4 16l2 34h-8l-2-22h-30l-4 22h-8l-2-22q-6 4-8 22z','fa')+P('M10 -12q-14-2-14 12 0 14 14 16 16-2 18-16-2-14-18-12z','fa')+C(14,-4,7.5,'sk')+C(16,-6,1.2,'fl')+P('M12 0q4 2 8 0M-34 8q-8 4-8 14','thin'));
const DOG=(x,y,s=1)=>G(`translate(${x} ${y}) scale(${s})`,P('M-14 8q-2-12 8-14h14l6-8 4 2v6q4 2 2 8l-4 2-2 10h-4l-2-8h-12l-4 10h-4z','fa')+P('M14 -12l2-6 3 6','thin')+P('M-14 6q-6-4-8-10','thin'));
const SPHINX=(x,y,flip,dark)=>G(`translate(${x} ${y}) scale(${flip?-1:1} 1)`,P('M-30 26q-2-12 8-16h22q4-2 6-10l2-12q4-8 12-6l4 4v26q0 6-4 10h-48z',dark?'dk':'fa')+P('M8 -18q6-8 14-2l-2 8-14 0z',dark?'dk':'fa')+C(15,-6,5.4,'sk')+EYES(15,-6,5.4)+P('M-30 22q-8-2-8-12','thin')+P('M-2 26v-8M14 26v-8','thin'));
const HORSE=(x,y,s=1,flip)=>G(`translate(${x} ${y}) scale(${flip?-s:s} ${s})`,P('M-44 22q-4-26 14-32h40q10-20 26-20l8 12-8 6q4 22-2 34l4 40h-8l-6-30h-46l-8 30h-8l4-36q-10-2-14 0z','fa')+C(36,-30,1.4,'fl')+P('M24 -36q-6 16 0 30','thin')+P('M-44 10q-10 6-10 24','thin'));
const FLOW=(x,y)=>C(x,y,6,'fa')+RAYS(x,y,6,10,14)+C(x,y,2.4,'fl')+P(`M${x} ${y+10}v16`);
const CR3=(x,y)=>MOONC(x-12,y,5,1)+C(x,y-1,5,'fa')+MOONC(x+12,y,5,-1);
const POMS=(x1,x2,y1,y2)=>{let o='';for(let yy=y1;yy<y2;yy+=18)for(let xx=x1+((yy-y1)/18%2?9:0);xx<x2;xx+=18)o+=C(xx,yy,3.4,'fa')+P(`M${xx-1.5} ${yy-3.4}l1.5-2 1.5 2`,'thin');return o;};
/* 0 The Fool */
A.M0=()=>SUN(158,54,10)+MOUNT([[16,168],[40,138],[58,156],[80,124],[104,152],[126,138],[148,160]])+
 P('M16 256C60 242 116 240 146 248L154 266L160 290H16Z','fa')+P('M146 248l-6 14M154 266l-10 6','thin')+DOG(58,226,1.1)+
 P('M92 196l-6 48h-8M108 196l12 46h8','')+
 FIG({x:100,y:104,hem:198,wh:20,w:13,hair:'mid',belt:true,arms:[[74,146],[124,124]],top:P('M96 92q8-14 22-12-8 2-12 10','thin')})+
 P('M120 132L144 98','')+C(148,94,7.5,'fa')+P('M144 89q4 4 8 0','thin')+ROSE(70,150,3.4)+P('M70 154v8','thin')+STARS([[34,60,3],[62,48,2.4],[176,108,2.4],[26,96,2]]);
/* I The Magician */
A.M1=()=>GARLAND(20,180,44)+LEMN(100,64,9)+
 FIG({x:100,y:90,hem:206,wh:26,hair:'mid',belt:true,arms:[[80,64],[124,170]]})+WAND(78,46,30,0,.75)+P('M126 172l6 10','')+
 P('M24 204h152v12H24zM34 216v64M166 216v64','fa')+CUP(48,182,.9)+SWORD(88,200,30,-90,.7)+WAND(120,196,28,-90,.7)+PENT(152,192,8)+
 LILY(48,258,1.1)+LILY(64,266,.9)+LILY(136,266,.9)+LILY(152,258,1.1)+ROSE(100,270,4)+ROSE(84,276,3)+ROSE(116,276,3)+STARS([[30,76,2.6],[170,76,2.6],[40,124,2],[160,124,2]]);
/* II The High Priestess */
A.M2=()=>P('M46 64h108v150H46z','fa')+POMS(56,150,74,210)+PILLAR(34,54,280,9,'B')+PILLAR(166,54,280,9,'J')+
 FIG({x:100,y:100,hem:258,wh:44,w:16,hair:'long',arms:[[86,170],[114,170]],top:CR3(100,80)})+
 P('M100 128v24M92 138h16','')+P('M82 164h36v26H82z','fa')+`<text x="100" y="181" class="tx sm">TORA</text>`+
 P('M74 266q26 22 52 0q-26 10-52 0z','fa')+STARS([[60,246,2.2],[140,246,2.2],[100,44,2.6]]);
/* III The Empress */
A.M3=()=>[30,48,152,170].map((x,k)=>P(`M${x} ${k%3?132:120}v14M${x} ${k%3?132:120}c-9-10-8-40 0-64 8 24 9 54 0 64z`,'fa')).join('')+P('M150 120q6 40 0 80M158 120q6 40 0 80','thin')+
 P('M56 110q0-26 44-28 44 2 44 28v120H56z','fa')+
 FIG({x:100,y:104,hem:248,wh:46,w:17,hair:'long',arms:[[72,132],[124,190]],top:[0,1,2,3,4,5,6,7,8,9,10,11].map(i=>{const a=(195+i*13.6)*Math.PI/180;return S(100+Math.cos(a)*24,98+Math.sin(a)*22,2.8);}).join('')})+
 P('M86 124q14 10 28 0','thin')+WAND(70,114,40,-8,.6)+C(66,92,4.5,'fa')+G('translate(134 210)',P('M-12 -12h24v8q0 14-12 20-12-6-12-20z','fa')+C(0,-4,3.6)+P('M0 -0.4v8M-3 4h6','thin'))+
 WHEAT(30,286,52)+WHEAT(44,288,40)+WHEAT(156,288,40)+WHEAT(170,286,52)+STARS([[100,48,3]]);
/* IV The Emperor */
A.M4=()=>MOUNT([[16,170],[36,134],[50,150],[64,120],[80,150]])+MOUNT([[120,150],[136,118],[150,140],[166,124],[184,160]])+
 P('M50 120h100v164H50z','fa')+G('translate(56 124)',C(0,0,8,'fa')+P('M-6 -6q-10 2-6 12M6 -6q10 2 6 12','thin'))+G('translate(144 124)',C(0,0,8,'fa')+P('M-6 -6q-10 2-6 12M6 -6q10 2 6 12','thin'))+
 FIG({x:100,y:92,hem:262,wh:34,w:20,hair:'beard',arms:[[70,170],[132,160]],top:CROWN(100,82,12,14,3)})+P('M84 122h32M86 136l14 10 14-10','thin')+
 G('translate(66 160)',C(0,-14,5,'fa')+P('M0 -9v30M-6 -2h12'))+C(136,150,7,'fa')+P('M136 143v-5M133 140h6','thin')+STARS([[30,70,2.6],[170,70,2.6],[100,46,3]]);
/* V The Hierophant */
A.M5=()=>PILLAR(32,62,262,8)+PILLAR(168,62,262,8)+P('M40 78h120','thin')+
 FIG({x:100,y:104,hem:236,wh:40,w:18,arms:[[72,116],[126,150]],top:P('M88 96l12-34 12 34z','fa')+P('M89 88h22M91 80h18M94 72h12','thin')})+
 P('M100 128v106M92 132l8 8 8-8','thin')+P('M70 112v-14M74 110v-12','thin')+P('M134 70v178M126 86h16M124 98h20M128 110h12','')+
 G('translate(100 262)',P('M-16 -8l32 16M16 -8l-32 16','')+C(-19,-10,4,'fa')+C(19,-10,4,'fa')+P('M-16 8l-3 3M16 8l3 3','thin'))+
 HEAD(62,264,7,'short')+P('M50 290q12-20 24 0','fa')+HEAD(138,264,7,'short')+P('M126 290q12-20 24 0','fa')+STARS([[100,46,3],[70,52,2.4],[130,52,2.4]]);
/* VI The Lovers */
A.M6=()=>SUN(100,46,9)+P('M86 112q-40-18-38-58 18 22 38 36M114 112q40-18 38-58-18 22-38 36','fa')+
 FIG({x:100,y:88,hem:132,wh:18,w:12,hair:'mid',arms:[[76,108],[124,108]]})+CLOUD(100,146,52)+MOUNT([[84,214],[100,168],[116,214]])+
 G('translate(156 196)',P('M0 90V24M0 24q-20-8-14-30 16-10 28 4 12 12-14 26','fa')+C(-6,4,2.6,'fa')+C(6,-4,2.6,'fa')+C(4,10,2.6,'fa')+P('M2 34q6 6 0 12t0 12','thin'))+
 G('translate(44 196)',P('M0 90V20','')+[0,1,2,3,4,5].map(k=>S(k%2?8:-8,24+k*8,3)).join('')+S(0,14,3.4))+
 FIG({x:130,y:200,hem:282,wh:14,w:10,r:8,hair:'long',arms:[[118,226],[140,216]]})+FIG({x:70,y:200,hem:282,wh:14,w:10,r:8,arms:[[60,226],[84,230]]})+STARS([[28,62,2.6],[172,62,2.6]]);
/* VII The Chariot */
A.M7=()=>P('M18 168h12v-14h8v-8h8v8h8v14M146 168h8v-10h10v-12h6v12h10v10','thin')+
 P('M40 64h120l-10 20H50z','fa')+[58,76,94,112,130,146].map(x=>S(x,74,2.4)).join('')+P('M52 84v86M148 84v86','')+
 FIG({x:100,y:104,hem:174,wh:20,w:15,arms:[[72,146],[122,150]],top:STAR(100,88,6,2.4,8,-90,'fa')})+WAND(70,138,44,-14,.6)+P('M88 122h24M92 136l8 6 8-6','thin')+
 P('M38 172h124v42H38z','fa')+C(100,192,10)+P('M92 192h16M100 184v16','thin')+P('M76 180q-10 6-6 18M124 180q10 6 6 18','thin')+
 C(46,226,14,'fa')+C(154,226,14,'fa')+RAYS(46,226,3,14,8)+RAYS(154,226,3,14,8)+
 SPHINX(68,252,false,true)+SPHINX(132,252,true,false)+P('M20 282h160','thin')+STARS([[28,48,2.6],[172,48,2.6]]);
/* VIII Strength */
A.M8=()=>MOUNT([[16,200],[40,176],[58,192],[78,170]])+LEMN(76,62,9)+
 FIG({x:76,y:88,hem:262,wh:30,w:13,hair:'long',belt:true,arms:[[116,150],[120,172]]})+GARLAND(64,92,108)+P('M64 150q12 6 26 0','thin')+
 ANIM_LION(130,178,1.15,true)+P('M112 160q4-6 10-2','thin')+STARS([[30,60,2.6],[170,60,2.6],[162,110,2.4],[150,82,2]]);
/* IX The Hermit */
A.M9=()=>MOUNT([[16,290],[16,250],[60,214],[80,230],[104,196],[140,228],[184,206],[184,290]])+P('M60 214l8 12-8 2M104 196l8 12-10 2','thin')+
 P('M80 196C80 130 82 104 100 92 118 104 120 130 120 196Z','fa')+P('M86 102q14-20 28 0v18H86z','fa')+HEAD(100,108,8,'beard')+P('M84 100q16-26 32 0','fa')+
 ARM(90,128,64,142)+P('M126 88V214','')+ARM(112,128,124,140)+
 G('translate(58 154)',P('M-9 -10h18l-3 26h-12zM-12 -10h24M0 -10v-8','fa')+STAR(0,3,6.5,2.6,6,-90,'fl'))+RAYS(58,157,14,20,8,22.5)+
 STARS([[30,52,2.4],[62,44,3],[150,52,3],[172,78,2.4],[40,98,2],[160,120,2]]);
/* X Wheel of Fortune */
A.M10=()=>P('M60 136q-18 40 4 80','')+P('M58 140l4-8 4 8','thin')+
 C(100,166,52,'fa')+C(100,166,38)+C(100,166,14,'fa')+RAYS(100,166,14,38,8,22.5)+RAYS(100,166,40,50,8,0)+
 ['T','A','R','O'].map((ch,i)=>{const a=(-90+i*90)*Math.PI/180;return `<text x="${f(100+Math.cos(a)*45)}" y="${f(169+Math.sin(a)*45)}" class="tx sm">${ch}</text>`;}).join('')+
 G('translate(100 100)',P('M-14 14v-8q0-8 8-8h10q2-10 8-10t6 10v16','fa')+C(6,-10,5,'sk')+SWORD(-8,6,22,0,.5))+
 G('translate(148 206)',P('M-6 24v-22q0-8 8-8h4v30','fa')+P('M2 -6l-2-8 6 4 6-4-2 8q-4 4-8 0z','fa'))+
 [[38,58],[162,58],[38,272],[162,272]].map(([x,y],k)=>CLOUD(x,y+8,22)+(k===0?HEAD(x,y-4,7,'mid')+P(`M${x-14} ${y}q-6-12 4-14M${x+14} ${y}q6-12-4-14`,'thin'):k===1?C(x,y-4,7,'fa')+P(`M${x+6} ${y-4}l7 2-7 3`,'fa'):k===2?C(x,y-4,7,'fa')+RAYS(x,y-4,7,11,10):C(x,y-4,7,'fa')+P(`M${x-6} ${y-10}q-6-4-6-10M${x+6} ${y-10}q6-4 6-10`,'')));
/* XI Justice */
A.M11=()=>P('M46 70h108v186H46z','fa')+PILLAR(38,62,268,8)+PILLAR(162,62,268,8)+
 FIG({x:100,y:100,hem:252,wh:42,w:18,hair:'long',arms:[[132,96],[72,146]],top:P('M90 90h20v-10l-4 4-6-6-6 6-4-4z','fa')+P('M97 82h6v5h-6z','thin')})+
 P('M90 128h20l-10 12z','thin')+SWORD(134,96,60,0,1)+G('translate(70 150)',P('M0 0v-16M-18 -16h36M-18 -16l-6 16h12zM18 -16l-6 16h12z','')+P('M-24 0q6 6 12 0M12 0q6 6 12 0','thin'))+STARS([[100,48,3],[66,52,2.4],[134,52,2.4]]);
/* XII The Hanged Man */
A.M12=()=>P('M40 46h120v10H40zM56 56v232M144 56v232','fa')+[56,144].map(x=>P(`M${x} 90l-7-6M${x} 140l7-6M${x} 200l-7-6M${x} 250l7-6`,'thin')+S(x+(x<100?-8:8),84,2.4)).join('')+
 P('M100 56v18','')+P('M96 74h8l2 44h-12z','fa')+P('M100 84q14 6 22 30l-6 2q-6-16-16-18','fa')+
 P('M88 118h24l6 64H82z','fa')+P('M88 126l8 8 8-8','thin')+ARM(86,176,96,198,5)+ARM(114,176,104,198,5)+
 C(100,206,17,'thin')+RAYS(100,206,19,27,16)+HEAD(100,206,10,'mid')+STARS([[30,100,2.4],[170,100,2.4],[100,262,3],[80,272,2],[120,272,2]]);
/* XIII Death */
A.M13=()=>P('M118 156v-40h12v40M168 156v-44h12v44','fa')+P('M118 116l6-8 6 8M168 112l6-8 6 8','thin')+SUN(150,156,10)+P('M16 156h168','thin')+
 HORSE(112,214,1)+FIG({x:94,y:150,hem:202,wh:14,w:11,hair:'skull',arms:[[78,172],[112,184]]})+P('M86 166h16M86 176h16M86 186h16','thin')+P('M88 200l8 28-6 4','fa')+
 P('M76 180L64 96','')+P('M64 96h28v26H64z','fa')+ROSE(78,109,6)+P('M72 109h12M78 103v12','thin')+
 HEAD(44,262,6,'mid')+P('M34 290q10-20 20 0','fa')+HEAD(160,262,6,'long')+P('M150 290q10-20 20 0','fa')+STARS([[36,60,2.4],[162,56,3],[110,48,2.4]]);
/* XIV Temperance */
A.M14=()=>P('M30 286q30-30 58 0','thin')+P('M40 60l14 30 14-30','thin')+SUN(54,66,6)+LILY(40,256,1)+LILY(54,264,.9)+
 P('M84 110q-34-6-50-58 28 8 50 36M116 110q34-6 50-58-28 8-50 36','fa')+
 FIG({x:100,y:90,hem:242,wh:32,w:15,hair:'mid',arms:[[74,136],[126,170]]})+C(100,90,14,'thin')+S(100,72,3.4)+P('M92 120l8 12 8-12z','thin')+
 CUP(70,130,.85)+CUP(130,162,.85)+P('M76 144q14 6 48 18','thin')+P('M90 242l-6 34M112 242l10 30','')+P('M110 272h70','thin')+WAVY(112,182,280,3,4)+STARS([[170,120,2.4],[30,136,2]]);
/* XV The Devil */
A.M15=()=>STAR(100,50,12,5,5,90,'fa')+
 P('M86 104q-44-12-66 18 14-4 22 4 6-12 14-4 8-8 16 2M114 104q44-12 66 18-14-4-22 4-6-12-14-4-8-8-16 2','fa')+
 FIG({x:100,y:86,hem:178,wh:22,w:16,hair:'beard',arms:[[124,88],[74,152]],top:P('M90 78q-8-12-2-20M110 78q8-12 2-20','')})+
 P('M124 88v-10M120 82l4-6 4 6','thin')+P('M74 152l-6 14','')+P('M66 166q2 12 6 0q-2-6-6 0','fl')+
 P('M66 178h68v30H66z','fa')+C(100,188,3)+P('M80 198q-14 12-26 16M120 198q14 12 26 16','thin')+
 FIG({x:52,y:222,hem:284,wh:14,w:9,r:7,hair:'long',arms:[[44,250],[60,250]],top:P('M46 214l-4-6M58 214l4-6','thin')})+
 FIG({x:148,y:222,hem:284,wh:14,w:9,r:7,arms:[[140,250],[156,250]],top:P('M142 214l-4-6M154 214l4-6','thin')})+STARS([[30,56,2.4],[170,56,2.4]]);
/* XVI The Tower */
A.M16=()=>P('M36 260q30-14 64-8t64 8v30H36z','fa')+P('M72 92h56l-6 164H78z','fa')+P('M76 92v-10h8v10M94 92v-10h8v10M112 92v-10h8v10','thin')+
 G('rotate(-24 100 76)',CROWN(100,80,14,12,3))+P('M88 112h10v16H88zM104 150h10v16h-10zM88 196h10v16H88z','fa')+
 P('M166 34l-32 36 14 4-28 30','')+P('M78 120q-10-10 2-20-2 10 6 10M124 140q10-8 0-18 2 8-6 10','fl')+
 G('translate(46 168) rotate(-36)',FIG({x:0,y:0,hem:36,wh:10,w:7,r:6,arms:[[-12,10],[12,10]]}))+G('translate(156 204) rotate(30)',FIG({x:0,y:0,hem:36,wh:10,w:7,r:6,hair:'long',arms:[[-12,10],[12,10]]}))+
 [[36,60],[56,42],[150,96],[170,130],[34,118],[60,214],[150,240],[170,62]].map(([x,y])=>P(`M${x} ${y}q3 4 0 7q-3-3 0-7`,'fl')).join('');
/* XVII The Star */
A.M17=()=>STAR(100,64,26,9,8,-90,'fa')+STAR(100,64,15,6,8,-67.5)+[[38,48],[66,40],[134,40],[162,48],[44,98],[156,98],[100,108]].map(([x,y])=>STAR(x,y,6,2.4,8,-90,'fl')).join('')+
 MOUNT([[16,196],[40,176],[60,188]])+G('translate(156 166)',P('M0 80V0M0 8q-14-10-12-24 10 6 12 14M0 26q16-6 16-22-12 4-16 14','')+P('M2 -10q4-12 12-10l4 6-8 2','fa'))+
 P('M24 258h100q12 8 24 0','thin')+WAVY(24,124,268,3,4)+P('M124 272q22-8 52-6','thin')+
 P('M88 196q-10 30 4 52l40 6-6-12-22-8q6-20-2-38z','fa')+ARM(88,198,64,214)+ARM(98,198,122,222)+HEAD(92,184,8,'long')+
 P('M56 208l8 12H50zM118 214l8 12h-14z','fa')+P('M58 222q-2 18-6 34M122 228q4 16 0 26','thin');
/* XVIII The Moon */
A.M18=()=>RAYS(100,72,30,40,24)+C(100,72,28,'fa')+MOONC(106,72,22,-1)+P('M106 68l4-2M106 80q6 2 10 0','thin')+
 [[70,114],[88,122],[112,120],[130,112]].map(([x,y])=>P(`M${x} ${y}q4 6 0 10q-4-4 0-10`,'fl')).join('')+
 P('M22 214v-72l10-8 10 8v72M158 214v-72l10-8 10 8v72','fa')+P('M28 154h8M164 154h8','thin')+
 P('M88 212q-14 30 4 72M112 212q14 30-4 72','')+P('M100 212q-8 20 4 40t-4 32','thin')+
 G('translate(58 220)',P('M-14 22q0-18 10-24l6-12 4 8 4 2 6 8-4 6-2 14','fa'))+G('translate(142 220) scale(-1 1)',P('M-14 22q0-18 10-24l6-12 4 8 4 2 6 8-4 6-2 14','fa'))+
 P('M20 266q80-12 160 0','thin')+WAVY(20,180,278,3,6)+G('translate(100 272)',P('M-8 0q0-10 8-12 8 2 8 12zM-8-2l-6-6M8-2l6-6','fa'))+STARS([[28,42,2.4],[172,42,2.4],[38,110,2],[162,110,2]]);
/* XIX The Sun */
A.M19=()=>SUN(100,72,24,true)+RAYS(100,72,40,48,12,15)+P('M16 190h168v42H16z','fa')+P('M16 204h168M16 218h168M44 190v42M84 190v42M124 190v42M164 190v42','thin')+
 [34,60,140,166].map(x=>P(`M${x} 190v-24`,'')+C(x,160,6.5,'fa')+RAYS(x,160,6.5,10.5,12)+C(x,160,2.6,'fl')).join('')+
 HORSE(104,250,.82)+FIG({x:96,y:206,hem:238,wh:14,w:10,r:8,hair:'mid',arms:[[78,224],[118,214]]})+P('M118 214l12-30','')+P('M130 184l24 6-6 12-18-4','fa')+STARS([[28,44,2.4],[172,44,2.4]]);
/* XX Judgement */
A.M20=()=>MOUNT([[16,206],[40,176],[60,196],[84,166],[104,192]])+MOUNT([[110,190],[136,168],[160,192],[184,176]])+
 P('M76 74q-22-24-16-46 14 14 32 30M124 74q22-24 16-46-14 14-32 30','fa')+FIG({x:100,y:58,hem:96,wh:16,w:11,r:8,hair:'mid',arms:[[86,84],[118,72]]})+
 P('M114 72l38 30','')+P('M152 102l10 6-14 2z','fa')+P('M118 78l-4 26h24l-4-14z','fa')+P('M124 86v14M117 93h14','thin')+CLOUD(100,112,62)+
 [[50,234],[100,240],[150,234]].map(([x,y],i)=>P(`M${x-20} ${y+30}h40v-12h-40z`,'fa')+FIG({x,y:y-10,hem:y+20,wh:10,w:8,r:7,hair:i===1?'short':'long',arms:[[x-14,y-28],[x+14,y-28]]})).join('')+
 WAVY(16,184,282,3,6)+STARS([[30,48,2.4],[170,48,2.4]]);
/* XXI The World */
A.M21=()=>[[38,58],[162,58],[38,272],[162,272]].map(([x,y],k)=>CLOUD(x,y+8,20)+(k===0?HEAD(x,y-4,7,'mid'):k===1?C(x,y-4,7,'fa')+P(`M${x+6} ${y-4}l7 2-7 3`,'fa'):k===2?C(x,y-4,7,'fa')+P(`M${x-6} ${y-10}q-6-4-6-10M${x+6} ${y-10}q6-4 6-10`,''):C(x,y-4,7,'fa')+RAYS(x,y-4,7,11,10))).join('')+
 P('M100 54c44 0 54 48 54 110s-10 110-54 110-54-48-54-110 10-110 54-110z','fa')+P('M100 62c38 0 46 44 46 102s-8 102-46 102-46-44-46-102 8-102 46-102z','thin')+
 [...Array(14)].map((_,i)=>{const t=i/14*Math.PI*2;return P(`M${f(100+Math.cos(t)*50)} ${f(164+Math.sin(t)*106)}l3 -4 3 4`,'thin');}).join('')+
 P('M90 130q10 6 20 0l-2 40 10 46h-10l-8-34-6 34h-10l6-46z','fa')+P('M90 132q16 14 18 50','thin')+ARM(92,132,66,150,4)+ARM(108,132,132,156,4)+HEAD(100,118,8,'long')+
 WAND(64,152,34,-10,.55)+WAND(134,158,34,10,.55)+LEMN(92,54,7)+LEMN(92,274,7);
/* ---------- minor arcana: canonical pip layouts + court emblems ---------- */
const SYM={
 W:(x,y,s)=>WAND(x,y,30*s,0,s),
 C:(x,y,s)=>CUP(x,y-8*s,s),
 S:(x,y,s)=>SWORD(x,y+12*s,30*s,0,s),
 P:(x,y,s)=>PENT(x,y,9*s)};
const LAY={1:[[0,0]],2:[[0,-1],[0,1]],3:[[0,-1.2],[0,0],[0,1.2]],4:[[-.7,-.8],[.7,-.8],[-.7,.8],[.7,.8]],5:[[-.7,-.9],[.7,-.9],[0,0],[-.7,.9],[.7,.9]],
 6:[[-.7,-1.1],[.7,-1.1],[-.7,0],[.7,0],[-.7,1.1],[.7,1.1]],7:[[-.7,-1.2],[.7,-1.2],[0,-.6],[-.7,0],[.7,0],[-.7,1.2],[.7,1.2]],
 8:[[-.7,-1.35],[.7,-1.35],[-.7,-.45],[.7,-.45],[-.7,.45],[.7,.45],[-.7,1.35],[.7,1.35]],
 9:[[-.7,-1.35],[.7,-1.35],[-.7,-.45],[.7,-.45],[0,0],[-.7,.45],[.7,.45],[-.7,1.35],[.7,1.35]],
 10:[[-.7,-1.5],[.7,-1.5],[0,-1],[-.7,-.5],[.7,-.5],[-.7,.5],[.7,.5],[0,1],[-.7,1.5],[.7,1.5]]};
const HAND=(gx,gy)=>P(`M58 ${gy-5}L${gx-8} ${gy-5}L${gx-8} ${gy+6}L58 ${gy+6}Z`,'fa')+P(`M${gx-10} ${gy-8}h14q5 0 5 4v9q0 5-5 5h-14z`,'fa')+P(`M${gx-10} ${gy-3}h15M${gx-10} ${gy+1.5}h15M${gx-10} ${gy+6}h13M${gx-10} ${gy-8}q-4 4 0 8`,'thin')+CLOUD(46,gy+12,28);
const BG={W:(y)=>MOUNT([[18,y],[42,y-24],[66,y]])+MOUNT([[134,y],[160,y-20],[182,y]])+P(`M18 ${y}h164`,'thin'),
 C:(y)=>WAVY(18,182,y-6,3,8)+WAVY(18,182,y+4,3,8),
 S:(y)=>CLOUD(44,92,20)+CLOUD(172,118,16)+P(`M18 ${y}h164M30 ${y}l3-8M40 ${y}l-2-7M152 ${y}l3-8M164 ${y}l-2-7`,'thin'),
 P:(y)=>P(`M18 ${y}h164`,'thin')+P(`M24 ${y}q8-20 18 0M152 ${y}q10-22 22 0`,'fa')+ROSE(33,y-12,3)+ROSE(163,y-14,3)};
/* ---------- minor arcana 2–10: canonical scenes (RWS symbolism) ---------- */
const HB=(x,y,r,c='fa')=>C(x,y,r,c)+P(`M${f(x-r*.8)} ${f(y-r*.2)}q${f(r*.8)} ${f(r*.5)} ${f(r*1.6)} 0`,'thin');
const FIGB=(o)=>FIG(Object.assign({},o,{top:HB(o.x,o.y,o.r||9,o.hc||'fa')+(o.top||'')}));
const CLOAK=(x,y,r,hem,w,wh)=>ROBE(x,y+r+2,hem,w,wh,'dk')+P(`M${f(x-r-3)} ${f(y+r+6)}Q${f(x-r-4)} ${f(y-r-5)} ${f(x)} ${f(y-r-5)}Q${f(x+r+4)} ${f(y-r-5)} ${f(x+r+3)} ${f(y+r+6)}Z`,'dk');
const LEGS=(x,y,len,sp=5)=>P(`M${f(x-3)} ${f(y)}l${f(-sp)} ${f(len)}h-5M${f(x+3)} ${f(y)}l${f(sp)} ${f(len)}h5`);
const CASTLE=(x,y,s=1)=>G(`translate(${x} ${y}) scale(${s})`,P('M-20 0V-22h4v-4h4v4h4v-4h4v4h4v-4h4v4h4V0ZM6 0V-36h4v-4h3v4h3v-4h3v4h3V0Z','fa')+P('M-10 0v-9a3 3 0 0 1 6 0v9M14 -28v6','thin'));
const HOUSE=(x,y,s=1)=>G(`translate(${x} ${y}) scale(${s})`,P('M-12 0v-16l12-10 12 10v16Z','fa')+P('M-3 0v-8h6v8M6 -22v-8h3v5','thin'));
const TREE=(x,y,h,w=22)=>{const cx=x,cy=y-h*.66,rx=w,ry=h*.34,n=9;let d='';for(let i=0;i<=n;i++){const t=-Math.PI/2+i*2*Math.PI/n,px=cx+Math.cos(t)*rx,py=cy+Math.sin(t)*ry;d+=(i?`A${f(rx*.42)} ${f(rx*.42)} 0 0 1 `:'M')+f(px)+' '+f(py);}return P(`M${f(x-2.5)} ${f(y)}V${f(cy+ry*.6)}h5V${f(y)}Z`,'fa')+P(d+'Z','fa')+P(`M${f(x)} ${f(cy+ry*.7)}v${f(-ry*.7)}l${f(-rx*.3)} ${f(-ry*.4)}M${f(x)} ${f(cy+ry*.2)}l${f(rx*.35)} ${f(-ry*.35)}`,'thin');};
const SHIP=(x,y,s=1)=>G(`translate(${x} ${y}) scale(${s})`,P('M-12 0h24l-5 6h-14Z','fa')+P('M0 0v-22','')+P('M1 -21l10 18H1Z','fa')+P('M-1 -18l-8 15h8Z','fa'));
const HEART=(x,y,s=1)=>P(`M${f(x)} ${f(y+40*s)}C${f(x-30*s)} ${f(y+20*s)} ${f(x-46*s)} ${f(y-4*s)} ${f(x-38*s)} ${f(y-22*s)}C${f(x-30*s)} ${f(y-40*s)} ${f(x-8*s)} ${f(y-38*s)} ${f(x)} ${f(y-20*s)}C${f(x+8*s)} ${f(y-38*s)} ${f(x+30*s)} ${f(y-40*s)} ${f(x+38*s)} ${f(y-22*s)}C${f(x+46*s)} ${f(y-4*s)} ${f(x+30*s)} ${f(y+20*s)} ${f(x)} ${f(y+40*s)}Z`,'fa');
const GLOBE=(x,y,r)=>C(x,y,r,'fa')+P(`M${f(x-r)} ${f(y)}h${f(2*r)}M${f(x)} ${f(y-r)}q${f(r*.7)} ${f(r)} 0 ${f(2*r)}q${f(-r*.7)} ${f(-r)} 0 ${f(-2*r)}`,'thin');
const SCALES=(x,y,s=1)=>G(`translate(${x} ${y}) scale(${s})`,P('M0 0v-16M-14 -16h28M-14 -16l-5 13h10ZM14 -16l-5 13h10Z','')+P('M-19 -3q5 5 10 0M9 -3q5 5 10 0','thin'));
const BIRD=(x,y,s=1)=>G(`translate(${x} ${y}) scale(${s})`,P('M-6 6q-2-10 4-14 6-3 9 2l4 1-4 2q2 8-5 12z','fa')+P('M-6 6l-4 6M-2 8l-1 5','thin')+C(2,-4,1,'fl'));
const HOOD=(x,y,r)=>P(`M${f(x-r*1.3)} ${f(y+r*1.4)}Q${f(x-r*1.5)} ${f(y-r*1.6)} ${f(x)} ${f(y-r*1.6)}Q${f(x+r*1.5)} ${f(y-r*1.6)} ${f(x+r*1.3)} ${f(y+r*1.4)}Z`,'fa');
const CUPS=(arr,s=.8)=>arr.map(([x,y])=>CUP(x,y,s)).join('');
const PENTS=(arr,r=8)=>arr.map(([x,y])=>PENT(x,y,r)).join('');
const FLOW2=(x,y)=>ROSE(x-3,y,2.4)+ROSE(x+3,y-1,2.4)+ROSE(x,y-4,2.4);
const SKYLINE=(x1,x2,y)=>{let d=`M${x1} ${y}`,x=x1,k=0;const hs=[14,22,10,26,16,12,20];while(x<x2){const w=Math.min(10+(k%3)*4,x2-x),h=hs[k%hs.length];d+=`V${y-h}h${w}`;x+=w;k++;}d+=`V${y}Z`;return P(d,'fa');};
const SNOW=()=>[[24,60],[44,90],[30,130],[170,70],[156,104],[178,140],[60,176],[150,184],[24,200],[176,220],[90,48],[120,170]].map(([x,y])=>C(x,y,1.3,'fl')).join('');

/* ---- Wands ---- */
A.W2=()=>WAVY(18,182,214,2.5,8)+MOUNT([[18,206],[44,186],[66,204]])+MOUNT([[124,204],[150,182],[182,206]])+
 WAND(162,152,176,0,1.35)+FIG({x:98,y:118,r:10,hem:250,w:15,wh:24,hair:'beard',belt:1,arms:[[72,164],[128,158]],top:P('M86 112q12-16 26-6l-2 6h-22z','fa')})+
 WAND(70,150,176,0,1.35)+GLOBE(132,150,11)+
 P('M18 236h164v52H18z','fa')+P('M18 236v-8h10v8M40 236v-8h10v8M62 236v-8h10v8M128 236v-8h10v8M150 236v-8h10v8M172 236v-8h10v8','fa')+
 G('translate(100 262)',P('M-10 -10l20 20M10 -10l-20 20','thin')+ROSE(-10,-10,3.6)+LILY(10,-14,.7))+STARS([[36,56,2.6],[164,48,2.6],[118,66,2]]);
A.W3=()=>MOUNT([[18,176],[40,158],[62,172]])+MOUNT([[132,170],[156,150],[182,172]])+P('M18 180h164','thin')+
 WAVY(18,182,192,2,9)+WAVY(18,182,204,2,9)+SHIP(56,186,.9)+SHIP(146,198,.75)+SHIP(100,176,.6)+
 WAND(34,190,170,0,1.25)+WAND(168,190,170,0,1.25)+
 P('M18 290v-48q50-20 112-10 30 8 52 24v34z','fa')+
 FIGB({x:94,y:150,r:10,hem:262,w:15,wh:22,belt:1,arms:[[78,206],[120,190]]})+WAND(124,186,170,0,1.25)+STARS([[60,56,2.6],[148,56,2.6]]);
A.W4=()=>CASTLE(100,232,1.1)+MOUNT([[18,236],[40,214],[60,232]])+MOUNT([[140,232],[162,212],[182,236]])+P('M18 236h164','thin')+
 FIG({x:84,y:178,r:7,hem:250,w:9,wh:12,hair:'long',arms:[[70,150],[92,206]]})+FIG({x:116,y:178,r:7,hem:250,w:9,wh:12,hair:'mid',arms:[[130,150],[108,206]]})+
 FLOW2(70,146)+FLOW2(130,146)+
 [30,62,138,170].map(x=>WAND(x,190,186,0,1.3)).join('')+
 P('M30 112q32 22 64 4M106 116q32 18 64-4M62 108q38 26 76 0','')+[46,78,100,122,154].map((x,i)=>ROSE(x,i%2?118:122,3.4)).join('')+
 P('M18 278h164','thin')+STARS([[100,58,3],[46,70,2.2],[154,70,2.2]]);
A.W5=()=>P('M18 284h164','thin')+
 WAND(70,124,124,-30,1.05)+WAND(130,124,124,30,1.05)+WAND(100,92,112,90,1.05)+WAND(76,176,110,58,1.05)+WAND(124,172,110,-58,1.05)+
 [[38,132],[160,132],[100,150],[62,206],[140,206]].map(([x,y],i)=>FIG({x,y,r:7.5,hem:y+(i>2?72:64),w:9,wh:12,hair:i%2?'mid':'short',belt:1,arms:[[x+(x<100?14:-14),y-10],[x+(x<100?22:-22),y+18]]})).join('')+
 STARS([[30,56,2.4],[170,56,2.4]]);
A.W6=()=>[26,44,62,138,156,174].map(x=>WAND(x,190,150,0,1)).join('')+
 [34,56,144,166].map((x,i)=>HEAD(x,240,7,i%2?'mid':'short')+P(`M${x-12} 284q12-34 24 0`,'fa')).join('')+
 HORSE(100,222,.9)+FIG({x:92,y:150,r:9,hem:214,w:11,wh:14,hair:'short',arms:[[110,190],[122,150]]})+P('M84 214l6 30-6 4','fa')+
 P('M82 146q10-14 22-2','')+[84,90,96,102].map(x=>P(`M${x} ${x<93?144:142}l2-4`,'thin')).join('')+
 WAND(124,132,130,0,1.05)+C(124,72,9,'')+P('M116 66l-3-4M132 66l3-4M116 78l-3 4M132 78l3 4M124 63v-4','thin')+P('M118 80l-4 18M130 80l4 18','thin')+STARS([[36,56,2.4],[168,60,2.4]]);
A.W7=()=>P('M18 290V246q40-50 104-50 34 0 60 24v70z','fa')+P('M60 220q8-4 10-10M142 214l6-8','thin')+
 [[28,226,-8],[46,220,-2],[64,218,6],[82,224,-6],[36,196,10],[58,190,-12]].map(([x,y,a])=>WAND(x,y,96,a,1.05)).join('')+
 FIG({x:134,y:118,r:9,hem:198,w:13,wh:18,hair:'mid',belt:1,arms:[[110,150],[146,170]]})+LEGS(134,196,20,6)+
 WAND(124,150,140,-52,1.15)+STARS([[34,56,2.4],[164,54,2.6],[96,48,2]]);
A.W8=()=>[...Array(8)].map((_,i)=>WAND(70+i*9,70+i*16,112,62,1)).join('')+
 MOUNT([[18,236],[40,214],[62,226],[84,206],[110,230]])+P('M110 230l30-14 42 20','')+P('M18 240h164','thin')+
 P('M60 288q22-26 52-34 30-8 52-14','thin')+P('M76 288q24-24 50-30 28-6 46-10','thin')+HOUSE(150,224,.8)+STARS([[34,56,2.4],[170,250,2.4]]);
A.W9=()=>[30,48,66,84,116,134,152,170].map(x=>WAND(x,178,170,0,1.05)).join('')+P('M18 270h164','thin')+
 FIG({x:110,y:150,r:10,hem:282,w:15,wh:24,hair:'short',belt:1,arms:[[88,206],[96,186]]})+P('M100 144q10-12 22-4l-2 5q-8-6-18 1z','fa')+P('M100 146h20M106 140l10 12','thin')+
 WAND(90,196,186,0,1.3)+STARS([[100,52,2.6]]);
A.W10=()=>HOUSE(160,236,.9)+P('M150 236h32M18 286h164','thin')+P('M24 286q40-30 120-48','thin')+
 FIG({x:94,y:196,r:9,hem:282,w:14,wh:22,hair:'short',belt:1,arms:[[80,166],[110,168]]})+
 [...Array(10)].map((_,i)=>WAND(80+i*4,150,170,-26+i*5.2,1)).join('')+P('M76 166q20 8 40 0','')+STARS([[30,60,2.4],[168,60,2.4]]);

/* ---- Cups ---- */
A.C2=()=>HOUSE(100,166,.9)+MOUNT([[18,176],[44,156],[70,176]])+MOUNT([[130,176],[156,156],[182,176]])+P('M18 180h164','thin')+
 P('M100 56v100','')+P('M100 76c-10 6-10 14 0 18s10 14 0 18-10 12 0 16M100 76c10 6 10 14 0 18s-10 14 0 18 10 12 0 16','thin')+
 P('M98 72q-20-18-44-12 16 2 22 10-12 0-16 6 22-6 38 0zM102 72q20-18 44-12-16 2-22 10 12 0 16 6-22-6-38 0z','fa')+
 C(100,62,8,'fa')+P('M94 60l3 2M106 60l-3 2M96 66q4 3 8 0','thin')+RAYS(100,62,9,12,12)+
 FIG({x:62,y:196,r:9,hem:286,w:13,wh:20,hair:'long',belt:1,arms:[[84,222],[54,240]]})+FIG({x:138,y:196,r:9,hem:286,w:13,wh:20,hair:'short',belt:1,arms:[[116,222],[146,240]]})+
 CUP(86,206,.8)+CUP(114,206,.8)+STARS([[30,56,2.4],[170,56,2.4]]);
A.C3=()=>[[56,142],[100,132],[144,142]].map(([x,y],i)=>FIG({x,y,r:9,hem:262,w:12,wh:20,hair:i===1?'long':'mid',belt:1,arms:[[x+(i===2?6:-6),y-34],[x+(i===0?20:i===2?-20:14),y+46]]})).join('')+
 CUPS([[50,84],[94,74],[150,84]],.85)+
 P('M18 270h164','thin')+C(40,274,8,'fa')+P('M34 268q6-6 12 0','thin')+[150,158,154,162,166].map((x,i)=>C(x,i<2?270:i<4?276:268,3.2,'fa')).join('')+P('M110 278q-8-14 4-18 10 4 4 18z','fa')+
 STARS([[30,56,2.4],[170,56,2.4],[122,48,2]]);
A.C4=()=>TREE(130,236,170,48)+P('M18 248h164','thin')+
 FIG({x:122,y:150,r:10,hem:244,w:15,wh:22,hair:'mid',arms:[[132,186],[112,186]]})+P('M110 182h24v8h-24z','fa')+P('M106 244q16 14 34 0','fa')+
 CUPS([[60,250],[94,254],[128,256]],.85)+P('M18 268h164','thin')+
 CUP(48,92,.85)+HAND(48,118)+STARS([[30,56,2.4],[170,56,2.4]]);
A.C5=()=>P('M18 196h48M118 196h64','thin')+WAVY(18,182,206,2,8)+P('M126 176a26 18 0 0 1 52 0v20h-10v-14a16 10 0 0 0-32 0v14h-10z','fa')+CASTLE(160,150,.8)+
 CLOAK(96,120,10,262,17,28)+
 G('translate(54 258) rotate(-96)',CUP(0,0,1))+G('translate(140 266) rotate(84)',CUP(0,0,1))+G('translate(86 276) rotate(-90)',CUP(0,0,.9))+
 P('M34 266q-6 8-14 10M160 274q6 4 14 4M66 282q-6 4-12 4','thin')+CUPS([[144,236],[168,240]],.85)+P('M18 288h164','thin')+STARS([[30,56,2.4],[100,48,2.6]]);
A.C6=()=>HOUSE(160,148,1)+P('M140 148h42','thin')+
 FIG({x:74,y:150,r:9,hem:250,w:12,wh:18,hair:'short',belt:1,arms:[[100,194],[60,206]]})+P('M66 144q8-12 18-4','fa')+
 FIG({x:130,y:184,r:7.5,hem:256,w:10,wh:15,hair:'long',arms:[[110,204],[140,224]]})+
 CUP(104,196,.75)+FLOW2(104,194)+
 P('M24 176h22v22H24z','fa')+CUP(35,160,.75)+FLOW2(35,158)+
 CUPS([[38,256],[70,262],[150,262]],.75)+FLOW2(38,254)+FLOW2(70,260)+FLOW2(150,260)+P('M18 284h164','thin')+STARS([[30,56,2.4],[100,60,2.4]]);
A.C7=()=>CLOUD(100,124,80)+CLOUD(100,204,86)+
 (()=>{const r1=[[52,86],[100,78],[148,86]],r2=[[34,166],[78,160],[122,160],[166,166]];
  const em=[
   (x,y)=>HEAD(x,y-8,6,'mid'),
   (x,y)=>P(`M${x-6} ${y}q6-22 12 0z`,'fa')+RAYS(x,y-8,8,12,8),
   (x,y)=>P(`M${x-6} ${y-2}q-4-8 4-10 6 0 2 6-6 2`,''),
   (x,y)=>CASTLE(x,y,.42),
   (x,y)=>STAR(x-4,y-6,4,2,4,-90,'fl')+STAR(x+4,y-8,4,2,4,-90,'fl')+C(x,y-3,2.4,'fl'),
   (x,y)=>C(x,y-8,6,'')+RAYS(x,y-8,6,8.5,10),
   (x,y)=>P(`M${x-8} ${y}l4-10 4 4 4-8 4 14`,'')];
  return [...r1,...r2].map(([x,y],i)=>CUP(x,y,.82)+em[i](x,y-2)).join('');})()+
 P('M70 290q-4-36 30-40 34 4 30 40z','dk')+C(100,240,12,'dk')+STARS([[24,48,2.4],[176,48,2.4]]);
A.C8=()=>C(100,64,16,'fa')+MOONC(104,64,14,-1)+P('M90 66q4 4 8 0','thin')+
 MOUNT([[96,196],[124,140],[140,160],[160,120],[182,170]])+P('M18 196h164','thin')+
 FIGB({x:136,y:150,r:7.5,hem:214,w:9,wh:12,belt:1,arms:[[120,176],[148,184]]})+LEGS(136,214,14,4)+P('M118 162v70','')+
 CUPS([[30,238],[54,238],[78,238],[102,238],[126,238]],.85)+CUPS([[42,214],[66,214],[90,214]],.85)+
 WAVY(18,182,276,2,8)+P('M18 262h164','thin')+STARS([[40,60,2.4],[160,64,2.4]]);
A.C9=()=>P('M18 160q82-84 164 0','')+P('M18 166q82-84 164 0','thin')+
 [...Array(9)].map((_,i)=>{const t=Math.PI*(1-(i+.5)/9),x=100-Math.cos(t)*78,y=160-Math.sin(t)*58;return CUP(x,y-18,.7);}).join('')+
 P('M30 268h140v10H30zM40 278v10M160 278v10','fa')+
 FIG({x:100,y:178,r:10,hem:270,w:20,wh:28,hair:'short',arms:[[116,220],[84,220]]})+P('M88 170q12-18 26-6l-2 4h-22z','fa')+P('M80 216h40v8H80z','fa')+P('M88 186q12 6 24 0','thin')+
 STARS([[100,56,2.6],[36,52,2.2],[164,52,2.2]]);
A.C10=()=>P('M24 166a76 76 0 0 1 152 0','')+P('M34 166a66 66 0 0 1 132 0','thin')+P('M44 166a56 56 0 0 1 112 0','thin')+
 [...Array(10)].map((_,i)=>{const t=Math.PI*(1-i/9),x=100+Math.cos(t)*70,y=166-Math.sin(t)*70;return CUP(x,y-10,.62);}).join('')+
 HOUSE(36,224,.9)+TREE(56,226,34,12)+P('M18 228h70','thin')+
 FIG({x:94,y:208,r:8,hem:284,w:11,wh:16,hair:'short',arms:[[80,172],[106,236]]})+FIG({x:118,y:210,r:8,hem:284,w:11,wh:16,hair:'long',arms:[[132,174],[106,238]]})+
 FIG({x:150,y:240,r:6,hem:284,w:8,wh:11,hair:'mid',arms:[[140,226],[166,248]]})+FIG({x:172,y:240,r:6,hem:284,w:8,wh:11,hair:'short',arms:[[162,250],[184,228]]})+P('M18 286h164','thin')+STARS([[100,48,2.6]]);

/* ---- Swords ---- */
A.S2=()=>MOONC(160,64,11,1)+WAVY(18,182,206,2,8)+WAVY(18,182,218,2,8)+P('M30 206q6-14 16-6 6-8 12 6M150 206q8-12 16-4 6-6 10 4','fa')+
 SWORD(116,184,128,-38,1.05)+SWORD(84,184,128,38,1.05)+
 FIG({x:100,y:150,r:10,hem:262,w:15,wh:22,hair:'mid',arms:[[114,182],[86,182]]})+P('M90 148h20v5H90z','fa')+
 P('M56 262h88v26H56z','fa')+STARS([[34,56,2.4],[110,52,2.2]]);
A.S3=()=>CLOUD(56,78,40)+CLOUD(150,90,36)+P('M30 110l-6 14M46 108l-6 14M62 112l-6 14M138 120l-6 14M154 118l-6 14M170 122l-6 14M40 150l-6 14M160 156l-6 14M34 210l-6 14M168 216l-6 14M50 250l-6 14M150 252l-6 14','thin')+
 HEART(100,176,1.35)+
 SWORD(100,96,160,180,1.05)+SWORD(54,128,130,128,1.05)+SWORD(146,128,130,-128,1.05)+P('M18 286h164','thin');
A.S4=()=>P('M24 52h56v92H24z','fa')+P('M24 66a28 14 0 0 1 56 0','thin')+P('M52 52v92M24 98h56M38 66v78M66 66v78','thin')+HEAD(52,82,5,'mid')+
 SWORD(116,64,96,180,.9)+SWORD(140,64,96,180,.9)+SWORD(164,64,96,180,.9)+
 P('M24 220h152v62H24z','fa')+P('M24 232h152','thin')+SWORD(42,256,116,90,.95)+
 P('M50 196q0-10 10-10h96q10 0 10 10v20H50z','fa')+HEAD(46,204,8,'short')+P('M98 186l6-14 6 14','fa')+P('M60 206h88','thin')+STARS([[100,170,2]]);
A.S5=()=>P('M18 70l20-12 18 10 22-14 20 12 20-10 22 14 22-10 20 12','')+P('M18 82l24-8 22 8 24-6 22 8 26-8 24 8 22-6','thin')+
 WAVY(130,182,190,2,4)+P('M18 196h112','thin')+FIGB({x:150,y:154,r:6,hem:206,w:8,wh:10,belt:1,arms:[[142,176],[160,180]]})+FIGB({x:172,y:162,r:6,hem:210,w:8,wh:10,arms:[[164,176],[180,184]]})+
 SWORD(116,160,92,24,1)+SWORD(124,164,92,40,1)+
 FIG({x:94,y:134,r:10,hem:270,w:15,wh:22,hair:'mid',belt:1,arms:[[118,162],[74,196]]})+SWORD(70,192,74,180,1)+
 G('translate(28 280) rotate(80)',SWORD(0,0,58,0,.85))+G('translate(176 276) rotate(-96)',SWORD(0,0,52,0,.85))+P('M18 286h164','thin')+STARS([[40,108,2.2],[164,112,2.2]]);
A.S6=()=>MOUNT([[18,178],[46,150],[70,170],[96,146],[124,170]])+P('M18 184h164','thin')+
 P('M18 288q20-6 40-2t40 0','thin')+P('M110 288q14-6 22-2t24 2t26-4','thin')+WAVY(110,182,272,4,4)+
 P('M24 234h142l-20 28H44Z','fa')+P('M176 108L140 290','')+
 FIG({x:154,y:156,r:8,hem:234,w:11,wh:14,hair:'short',arms:[[166,170],[160,210]]})+
 HOOD(100,208,10)+ROBE(100,214,236,14,22,'fa')+P('M86 216q14 10 28 0','thin')+FIG({x:78,y:218,r:5.5,hem:236,w:7,wh:9,hair:'mid'})+
 [36,50,64,118,130,142].map(x=>SWORD(x,158,74,180,.72)).join('')+STARS([[30,56,2.4],[164,60,2.4],[100,90,2]]);
A.S7=()=>P('M144 196l18-36 18 36zM162 160v-10l8 4-8 3','fa')+P('M128 196l12-24 12 24','fa')+P('M18 196h164','thin')+
 SWORD(34,174,70,180,.85)+SWORD(54,180,70,180,.85)+
 FIG({x:98,y:122,r:9,hem:210,w:13,wh:18,hair:'short',belt:1,arms:[[118,166],[112,180]]})+P('M90 116q8-14 20-6l-2 4-16 2z','fa')+
 P(`M92 210l-14 40h-8M104 210l20 30h8`)+
 [0,1,2,3,4].map(i=>SWORD(110+i*2,172+i,72,30+i*8,.85)).join('')+P('M18 286h164','thin')+STARS([[34,56,2.4],[166,56,2.4]]);
A.S8=()=>CASTLE(154,92,.8)+P('M120 92q30-12 62 0','thin')+
 [[22,150],[38,170],[54,146],[70,176],[130,176],[146,146],[162,170],[178,150]].map(([x,y])=>SWORD(x,y,262-y,180,.8)).join('')+
 FIG({x:100,y:132,r:10,hem:264,w:15,wh:22,hair:'long'})+P('M90 130h20v5H90z','fa')+
 P('M86 166l28 12M86 186l28 12M86 206l28 12M86 226l28 12','thin')+
 P('M30 280a14 4 0 0 0 28 0zM130 284a20 4 0 0 0 40 0z','thin')+P('M18 270h164','thin');
A.S9=()=>[...Array(9)].map((_,i)=>SWORD(26,60+i*17,150,90,.85)).join('')+
 P('M24 214h152v64H24zM24 278v10M176 278v10','fa')+P('M24 230h152','thin')+[44,76,108,140].map(x=>P(`M${x} 240l8 8-8 8-8-8z`,'thin')+ROSE(x+16,252,2.6)).join('')+
 FIG({x:100,y:180,r:9,hem:226,w:14,wh:20,hair:'long',arms:[[96,178],[104,178]]})+P('M92 176q8-8 16 0v8H92z','fa')+P('M24 214h152','');
A.S10=()=>P('M18 64h70M40 80h90M100 58h70M24 100h50M120 96h56','thin')+P('M28 180a22 22 0 0 1 44 0','fa')+RAYS(50,180,26,32,7,195)+
 MOUNT([[110,180],[136,160],[160,176],[182,166]])+P('M18 180h164','thin')+WAVY(18,182,192,2,8)+
 [...Array(10)].map((_,i)=>SWORD(62+i*11,184+(i%2)*6,62-(i%2)*6,180,.82)).join('')+P('M24 258q0-16 16-16h120q16 0 16 16v8H24z','fa')+HEAD(38,248,9,'mid')+P('M48 260h20','thin')+P('M18 268h164','thin')+P('M18 286h164','thin');

/* ---- Pentacles ---- */
A.P2=()=>P('M18 150q18-36 40-10 22 30 44 0 22-32 46-4 20 26 34 4','')+P('M18 166q18-28 40-6 22 24 44 0 24-24 46-4 20 20 34 4','thin')+SHIP(48,130,.8)+SHIP(140,124,.9)+
 FIG({x:100,y:150,r:9,hem:254,w:12,wh:18,hair:'short',belt:1,arms:[[66,212],[136,180]]})+P('M90 142h20l-3-28h-14z','fa')+LEGS(100,254,22,8)+
 P('M64 214c-30 0-30-44 0-44 20 0 52 54 72 54 30 0 30-44 0-44-20 0-52 34-72 34','')+PENT(62,214,11)+PENT(138,178,11)+
 P('M18 286h164','thin')+STARS([[34,60,2.4],[166,60,2.4]]);
A.P3=()=>P('M28 290V118a72 72 0 0 1 144 0V290','fa')+P('M38 290V120a62 62 0 0 1 124 0V290','thin')+
 PENTS([[100,82],[76,116],[124,116]],10)+
 P('M118 236h52v10h-52zM124 246v40M164 246v40','fa')+FIG({x:144,y:170,r:8,hem:234,w:11,wh:14,hair:'short',arms:[[128,188],[160,200]]})+P('M128 188l-6-8','')+
 HOOD(60,196,8)+ROBE(60,202,284,11,16)+HEAD(88,206,8,'short')+ROBE(88,216,284,11,16)+P('M60 222h44v16H60z','fa')+P('M66 228h32M66 232h20','thin')+STARS([[34,48,2.4],[166,48,2.4]]);
A.P4=()=>SKYLINE(18,74,212)+SKYLINE(126,182,212)+P('M18 212h164','thin')+
 P('M60 266h80v18H60z','fa')+FIG({x:100,y:118,r:10,hem:264,w:18,wh:30,hair:'beard',arms:[[88,170],[112,170]]})+CROWN(100,108,11,10,3)+
 PENT(100,82,11)+PENT(100,170,14)+PENTS([[72,282],[128,282]],10)+STARS([[34,56,2.4],[166,56,2.4]]);
A.P5=()=>P('M44 150V82a56 56 0 0 1 112 0v68z','fa')+P('M44 112h112M100 26v124M72 34v116M128 34v116','thin')+PENTS([[72,68],[128,68],[100,96],[72,126],[128,126]],9)+
 SNOW()+P('M18 286h164','thin')+
 HOOD(72,196,9)+ROBE(72,202,280,13,18,'dk')+P('M60 214l-6 20M84 214l4 24','thin')+
 FIG({x:132,y:190,r:8,hem:258,w:11,wh:15,hair:'mid',arms:[[118,222],[148,222]]})+P('M118 222l-4 62M148 222l4 62M112 284h8M150 284h8','')+P('M128 258l-2 26M138 258l0 14','')+P('M134 264h8v6h-8z','fa');
A.P6=()=>PENTS([[64,54],[100,54],[136,54],[46,92],[100,92],[154,92]],9)+
 FIG({x:100,y:126,r:9,hem:240,w:15,wh:24,hair:'beard',belt:1,arms:[[72,148],[130,180]]})+P('M90 118h20l-2-10h-16z','fa')+SCALES(72,166,1.1)+
 P('M132 190v8M136 200v8M130 210v6','thin')+
 FIG({x:48,y:222,r:7.5,hem:282,w:10,wh:14,hair:'mid',arms:[[62,202],[56,240]]})+FIG({x:154,y:226,r:7.5,hem:282,w:10,wh:14,hair:'short',arms:[[140,212],[146,244]]})+P('M18 286h164','thin');
A.P7=()=>P('M24 256c-14-40 0-90 22-110 10-40 50-60 74-30 22 20 16 60 4 84 12 20 0 52-16 56z','fa')+P('M40 252q20-50 22-96M62 156q14-10 20-26M50 210q16-8 30-30','thin')+
 PENTS([[48,136],[82,124],[60,170],[94,170],[44,206],[78,212],[104,232]],9)+
 FIG({x:150,y:140,r:9,hem:262,w:13,wh:20,hair:'mid',belt:1,arms:[[134,168],[142,178]]})+P('M126 286L140 156','')+P('M132 286h-14l4-8h12z','fa')+
 PENT(160,274,9)+P('M18 288h164','thin')+STARS([[34,56,2.4],[164,56,2.4]]);
A.P8=()=>HOUSE(140,106,.6)+HOUSE(162,104,.7)+P('M110 108h72','thin')+
 P('M26 52h18v234H26z','fa')+PENTS([[35,74],[35,108],[35,142],[35,176],[35,210],[35,244]],8)+
 P('M98 226h76v10H98zM104 236v50M168 236v50','fa')+
 FIG({x:126,y:150,r:9,hem:228,w:13,wh:20,hair:'short',belt:1,arms:[[142,206],[150,190]]})+PENT(142,214,9)+P('M150 190l10-12M156 174h10v8h-10z','fa')+
 PENT(70,274,9)+P('M18 286h164','thin')+STARS([[100,52,2.4],[166,56,2.2]]);
A.P9=()=>P('M30 290V100M30 120q16 6 20 20M30 170q-10 8-8 22M30 220q16 4 20 18','')+P('M170 290V112M170 140q-16 6-20 20M170 196q10 6 8 22M170 236q-16 4-20 18','')+
 PENTS([[30,104],[50,142],[24,194],[50,240],[30,272],[170,116],[150,162],[176,220],[150,256]],8)+
 CASTLE(100,96,.6)+P('M70 96h60','thin')+
 FIG({x:104,y:136,r:9,hem:282,w:15,wh:28,hair:'long',belt:1,arms:[[78,156],[120,206]]})+P('M90 128q14-18 28 0l4 4H86z','fa')+BIRD(78,142,1.1)+
 P('M18 288h164','thin')+P('M136 280c0-6 8-6 8 0s-6 4-6 0','thin');
A.P10=()=>PENTS([[100,52],[136,74],[64,74],[136,114],[64,114],[100,134],[136,160],[64,160],[100,178],[100,214]],8.5)+
 P('M150 196v90M176 196v90M150 196h26','fa')+
 FIG({x:44,y:220,r:8,hem:284,w:12,wh:18,hair:'beard',arms:[[32,250],[60,250]]})+P('M24 260h40v24H24z','fa')+DOG(72,272,.8)+
 FIG({x:126,y:224,r:7,hem:284,w:9,wh:13,hair:'short',arms:[[116,250],[142,240]]})+FIG({x:156,y:226,r:7,hem:284,w:9,wh:13,hair:'long',arms:[[144,240],[166,252]]})+
 FIG({x:108,y:252,r:5,hem:284,w:6,wh:9,hair:'mid',arms:[[100,262],[118,250]]})+P('M18 286h164','thin');

function minor(id){
  const su=id[0], n=+id.slice(1), sym=SYM[su];
  const deco=STARS([[30,48,2.6],[170,48,2.6],[30,272,2.6],[170,272,2.6]]);
  if(n===1){ let o=BG[su](280);
    if(su==='W') o+=WAND(100,150,150,0,1.6)+P('M124 120q6 4 4 10q-6-2-4-10zM78 210q-6 2-4 9q6-2 4-9zM130 236q5 4 2 9q-5-3-2-9z','fl')+HAND(100,184);
    if(su==='C') o+=P('M82 177q-10 40-14 90M92 178q-2 40-6 88M108 178q2 40 6 88M118 177q10 40 14 90','thin')+CUP(100,112,3)+P('M92 82q8-10 16 0l-8 10z','fa')+C(100,100,4,'fl')+HAND(100,166);
    if(su==='S') o+=SWORD(100,236,150,0,1.6)+CROWN(100,98,15,12,3)+P('M86 98q-16 14-10 30M114 98q16 14 10 30','thin')+P('M76 128q-4 2-2 6M124 128q4 2 2 6','fl')+HAND(100,238);
    if(su==='P') o+=P('M76 280v-34a24 24 0 0 1 48 0v34','thin')+PENT(100,136,38)+HAND(100,184);
    return o+deco; }
  if(n<=10){ const sc=n<=3?1.15:n<=6?1:.88, dx=40, dy=n<=3?62:n<=7?66:58;
    return P('M40 282V104a60 60 0 0 1 120 0V282','thin')+LAY[n].map(([a,b])=>sym(100+a*dx,160+b*dy,sc)).join('')+deco; }
  const court=n-10, bg=BG[su](280);
  const hold=(x,y,s)=>su==='W'?WAND(x,y,30*s,0,s):su==='C'?CUP(x,y-6*s,s):su==='S'?SWORD(x,y+5*s,34*s,0,s):PENT(x,y,9*s);
  if(court===1) return bg+FIG({x:100,y:110,r:11,hem:278,w:15,wh:26,hair:'mid',belt:1,arms:[[86,176],[130,142]]})+P('M88 100q12-12 26-2l-4 4q-10-4-20 0z','fa')+hold(132,138,1.35)+deco;
  if(court===2) return bg+HORSE(100,214,.95)+FIG({x:90,y:146,r:9,hem:210,w:11,wh:14,hair:'short',arms:[[112,186],[122,170]]})+P('M82 140q8-12 18-6','thin')+P('M86 206l6 30l-6 4','fa')+hold(124,166,1.15)+deco;
  const throne=P('M62 278V112a38 38 0 0 1 76 0V278Z','fa')+sym(100,86,.5);
  const fig=FIG({x:100,y:124,r:11,hem:278,w:17,wh:32,hair:court===3?'long':'beard',belt:1,arms:[[86,196],[132,168]]});
  const crown=court===3?CROWN(100,114,12,12,3):CROWN(100,114,13,14,3)+P('M100 100v-8M96 96h8','thin');
  return bg+throne+fig+crown+hold(134,164,1.3)+deco;
}
function art(id){ const fn=A[id]; return fn?fn():minor(id); }
return {art};
})();
function tpArt(id){ return `<svg class="tc-art" viewBox="0 0 200 330" aria-hidden="true"><rect class="fr" x="7" y="7" width="186" height="316" rx="7"/><rect class="fr2" x="12" y="12" width="176" height="306" rx="4"/><path class="fr2" d="M12 280h176M12 34h176"/><g class="art-r"><g class="ink" transform="translate(8 2.72) scale(.92)">${TA.art(id)}</g></g></svg>`; }
const arcTid=v=>'M'+(v===22?0:v);

/* ---------- Tarot reader: the person's question + the cards they drew → AI interpretation ---------- */
const TAROT_SUITS=['W','C','S','P'];
const TAROT_MAJ_L={
 uk:['Блазень','Маг','Верховна Жриця','Імператриця','Імператор','Ієрофант','Закохані','Колісниця','Сила','Відлюдник','Колесо Фортуни','Справедливість','Повішений','Смерть','Помірність','Диявол','Вежа','Зірка','Місяць','Сонце','Суд','Світ'],
 en:['The Fool','The Magician','The High Priestess','The Empress','The Emperor','The Hierophant','The Lovers','The Chariot','Strength','The Hermit','Wheel of Fortune','Justice','The Hanged Man','Death','Temperance','The Devil','The Tower','The Star','The Moon','The Sun','Judgement','The World'],
 de:['Der Narr','Der Magier','Die Hohepriesterin','Die Herrscherin','Der Herrscher','Der Hierophant','Die Liebenden','Der Wagen','Die Kraft','Der Eremit','Rad des Schicksals','Die Gerechtigkeit','Der Gehängte','Der Tod','Die Mäßigkeit','Der Teufel','Der Turm','Der Stern','Der Mond','Die Sonne','Das Gericht','Die Welt'],
 fr:['Le Mat','Le Bateleur','La Grande Prêtresse','L’Impératrice','L’Empereur','Le Hiérophante','Les Amoureux','Le Chariot','La Force','L’Ermite','La Roue de Fortune','La Justice','Le Pendu','La Mort','Tempérance','Le Diable','La Tour','L’Étoile','La Lune','Le Soleil','Le Jugement','Le Monde'],
 es:['El Loco','El Mago','La Sacerdotisa','La Emperatriz','El Emperador','El Hierofante','Los Enamorados','El Carro','La Fuerza','El Ermitaño','La Rueda de la Fortuna','La Justicia','El Colgado','La Muerte','La Templanza','El Diablo','La Torre','La Estrella','La Luna','El Sol','El Juicio','El Mundo'],
 it:['Il Matto','Il Mago','La Papessa','L’Imperatrice','L’Imperatore','Il Papa','Gli Amanti','Il Carro','La Forza','L’Eremita','La Ruota della Fortuna','La Giustizia','L’Appeso','La Morte','La Temperanza','Il Diavolo','La Torre','La Stella','La Luna','Il Sole','Il Giudizio','Il Mondo']};
const TAROT_RANK_L={
 uk:['Туз','Двійка','Трійка','Четвірка','П’ятірка','Шістка','Сімка','Вісімка','Дев’ятка','Десятка','Паж','Лицар','Королева','Король'],
 en:['Ace','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Page','Knight','Queen','King'],
 de:['Ass','Zwei','Drei','Vier','Fünf','Sechs','Sieben','Acht','Neun','Zehn','Bube','Ritter','Königin','König'],
 fr:['As','Deux','Trois','Quatre','Cinq','Six','Sept','Huit','Neuf','Dix','Valet','Cavalier','Reine','Roi'],
 es:['As','Dos','Tres','Cuatro','Cinco','Seis','Siete','Ocho','Nueve','Diez','Sota','Caballo','Reina','Rey'],
 it:['Asso','Due','Tre','Quattro','Cinque','Sei','Sette','Otto','Nove','Dieci','Fante','Cavaliere','Regina','Re']};
const TAROT_SUIT_G={uk:['Жезлів','Кубків','Мечів','Пентаклів'],en:['Wands','Cups','Swords','Pentacles'],de:['der Stäbe','der Kelche','der Schwerter','der Münzen'],fr:['de Bâton','de Coupe','d’Épée','de Denier'],es:['de Bastos','de Copas','de Espadas','de Oros'],it:['di Bastoni','di Coppe','di Spade','di Denari']};
const TAROT_SUIT_N={uk:['Жезли','Кубки','Мечі','Пентаклі'],en:['Wands','Cups','Swords','Pentacles'],de:['Stäbe','Kelche','Schwerter','Münzen'],fr:['Bâtons','Coupes','Épées','Deniers'],es:['Bastos','Copas','Espadas','Oros'],it:['Bastoni','Coppe','Spade','Denari']};
const TP_LANG={uk:{name:'Ukrainian',reg:'politely, using the formal «ви»',sr:'uk-UA'},en:{name:'English',reg:'as “you”',sr:'en-US'},de:{name:'German',reg:'formally, using “Sie”',sr:'de-DE'},fr:{name:'French',reg:'formally, using “vous”',sr:'fr-FR'},es:{name:'Spanish',reg:'warmly, using “tú”',sr:'es-ES'},it:{name:'Italian',reg:'warmly, using “tu”',sr:'it-IT'}};
const TP_IDS=[...Array.from({length:22},(_,i)=>'M'+i),...TAROT_SUITS.flatMap(s=>Array.from({length:14},(_,i)=>s+(i+1)))];
const ROMAN=['0','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX','XXI'];
/* compact reference meanings (English, for the model only): upright | reversed | advice */
const TP_KB={
M0:'new beginnings, spontaneity, faith in life, freedom, innocence | recklessness, naivety, fear of the leap, delays | take the first step with an open heart',
M1:'willpower, skill, manifestation, resourcefulness, the word becoming action | manipulation, untapped talent, trickery, scattered focus | use your tools consciously and honestly',
M2:'intuition, hidden knowledge, the subconscious, patience, silence | secrets, ignored intuition, withdrawal, information withheld | listen inward before acting',
M3:'abundance, fertility, nurturing, creativity, sensuality, nature | dependence, creative block, smothering care, neglect of self | nourish yourself and what you create',
M4:'structure, authority, stability, leadership, the father | domination, rigidity, control, lack of discipline | build order without pressure',
M5:'tradition, institutions, mentorship, shared values, learning, marriage | rebellion, dogma, hypocrisy, unconventional path | seek wise counsel, keep your own values',
M6:'love, union, alignment of values, an important choice of the heart | disharmony, imbalance, misaligned values, indecision | choose with the heart and own the choice',
M7:'willpower, victory, determination, movement, travel | lack of direction, aggression, scattered energy, obstacles | steer clearly toward one goal',
M8:'courage, inner strength, compassion, patience, gentle control of instincts | self-doubt, low energy, raw emotion, force instead of gentleness | gentle strength wins',
M9:'introspection, solitude, inner guidance, wisdom, search for meaning | isolation, loneliness, withdrawal, stuck in the past | step back to find your own light, then share it',
M10:'cycles, destiny, turning point, luck, change of circumstances | bad luck, resisting change, repeating patterns | go with the turn and make your choice within it',
M11:'fairness, truth, cause and effect, law, contracts, balance | unfairness, dishonesty, avoiding accountability, legal trouble | act honestly and accept consequences',
M12:'surrender, pause, new perspective, letting go, sacrifice | stalling, needless martyrdom, indecision, stuck | change the angle of view instead of forcing',
M13:'endings, transformation, transition, release (almost never literal death) | resistance to change, stagnation, fear of endings | let what has died go to make room',
M14:'balance, moderation, patience, healing, blending opposites | imbalance, excess, impatience, discord | find the middle path and slow down',
M15:'attachment, temptation, addiction, materialism, the shadow, strong desire | release, breaking free, reclaiming power, facing the shadow | notice what controls you and loosen the chain',
M16:'sudden change, upheaval, revelation, collapse of false structures | averted disaster, fear of change, delayed crisis | rebuild on truer foundations',
M17:'hope, renewal, inspiration, healing, faith, being seen | despair, disconnection, lack of faith, insecurity | trust the future and let your light show',
M18:'illusion, fear, anxiety, the subconscious, uncertainty, dreams | release of fear, truth emerges, clarity returns | check fears against facts, trust intuition carefully',
M19:'joy, success, vitality, positivity, clarity, children | temporary sadness, overconfidence, delayed success | celebrate and share your warmth',
M20:'awakening, reckoning, inner calling, renewal, family/ancestry | self-doubt, ignoring the call, harsh self-judgement | answer the call and forgive the past',
M21:'completion, integration, accomplishment, wholeness, travel | incompletion, lack of closure, shortcuts | finish the cycle and step into the next',
W1:'inspiration, new venture, creative spark, desire | delays, lack of motivation, false start | act on the spark',
W2:'planning, future vision, decisions, leaving the comfort zone | fear of change, poor planning, indecision | plan boldly and choose a direction',
W3:'expansion, foresight, first results, opportunities abroad | setbacks, obstacles to plans, frustration | look further ahead',
W4:'celebration, home, harmony, milestone, stability | instability at home, cancelled celebration, transition | celebrate what is built',
W5:'competition, conflict, rivalry, disagreements | avoiding conflict, inner conflict, resolution | turn rivalry into healthy challenge',
W6:'victory, recognition, public success, confidence | ego, fall from grace, lack of recognition | accept recognition with humility',
W7:'defending a position, perseverance, standing ground | overwhelm, giving up, being on the defensive | hold your ground where it matters',
W8:'speed, swift action, news, movement, travel | delays, frustration, haste, waiting | move fast while the window is open',
W9:'resilience, last stand, persistence, boundaries | exhaustion, paranoia, giving up too soon | one more push, with boundaries',
W10:'burden, overload, responsibility, hard work | delegating, release, collapse under weight | put down what is not yours',
W11:'enthusiasm, exploration, curious messenger, new idea | impatience, lack of direction, unreliable news | explore with curiosity',
W12:'action, adventure, passion, impulsiveness | recklessness, haste, scattered energy | channel passion into a plan',
W13:'confidence, charisma, warmth, determination, independence | jealousy, insecurity, demanding | shine and warm others',
W14:'visionary leadership, entrepreneurship, bold vision | domineering, impulsive, unrealistic expectations | lead with vision and patience',
C1:'new love, emotional opening, compassion, intuition | blocked emotions, emptiness, self-love needed | open your heart',
C2:'partnership, mutual attraction, union, harmony | imbalance, break-up, mistrust | meet the other halfway',
C3:'friendship, celebration, community, joy | gossip, isolation, overindulgence, triangle | lean on your circle',
C4:'apathy, contemplation, missed offer, discontent | new awareness, accepting help, coming out of withdrawal | notice what is being offered',
C5:'loss, grief, regret, focus on what is gone | acceptance, moving on, forgiveness | turn to what remains',
C6:'nostalgia, childhood, innocence, past connections | stuck in the past, idealising, moving forward | take the good from the past, live now',
C7:'illusions, many options, fantasy, wishful thinking | clarity, decision, sobering | choose one real option',
C8:'walking away, seeking deeper meaning, leaving what no longer fulfils | fear of leaving, stagnation, aimless drifting | leave what empties you',
C9:'wish fulfilled, contentment, satisfaction | smugness, dissatisfaction, materialism | enjoy and be grateful',
C10:'family happiness, emotional fulfilment, harmony | family conflict, broken ideals, disconnection | nurture the bonds',
C11:'emotional message, intuition, creative offer, sensitivity | emotional immaturity, blocked creativity | listen to feelings with curiosity',
C12:'romance, charm, offers, following the heart | moodiness, unrealistic, jealousy | follow the heart with your feet on the ground',
C13:'compassion, empathy, emotional security, intuition | codependence, emotional overwhelm, martyrdom | care for yourself as you care for others',
C14:'emotional balance, diplomacy, calm, wise counsel | manipulation, moodiness, suppressed feelings | stay calm and kind',
S1:'clarity, truth, breakthrough, decisive mind | confusion, misinformation, harsh words | cut through to the truth',
S2:'stalemate, difficult choice, avoidance | information overload, a forced decision, lies revealed | take off the blindfold and decide',
S3:'heartbreak, sorrow, painful truth | recovery, releasing pain, forgiveness | let the pain be felt and released',
S4:'rest, recuperation, contemplation, pause | burnout, restlessness, return to activity | rest before the next step',
S5:'conflict, defeat, winning at all costs, tension | reconciliation, making amends, old resentment | ask whether winning is worth it',
S6:'transition, moving on, leaving troubles behind | resistance to change, unfinished business | move toward calmer waters',
S7:'deception, strategy, secrecy, getting away with something | confession, conscience, getting caught | be honest and strategic',
S8:'restriction, self-imposed limits, victim mentality, feeling trapped | release, new perspective, self-liberation | the bindings are looser than they seem',
S9:'anxiety, worry, sleepless nights, fear | hope, reaching out, releasing worry | share the worry, check it against reality',
S10:'painful ending, rock bottom, betrayal, closure | recovery, regeneration, refusing to let go | the worst is over, dawn follows',
S11:'curiosity, new ideas, vigilance, communication | gossip, defensiveness, all talk | ask questions, verify information',
S12:'ambition, fast action, assertive, direct | aggression, haste, burnout, rudeness | act decisively but not harshly',
S13:'independence, clear boundaries, honesty, perceptive | coldness, bitterness, cruelty | speak the truth with kindness',
S14:'intellectual authority, truth, fairness, clear thinking | manipulation, tyranny, cold logic | decide with a clear, fair mind',
P1:'new financial opportunity, prosperity, manifestation | missed opportunity, poor planning, scarcity | plant the seed',
P2:'balance, juggling priorities, adaptability | overwhelm, disorganisation, financial juggling | prioritise and stay flexible',
P3:'teamwork, skill, collaboration, learning | lack of teamwork, poor quality, misalignment | build together',
P4:'security, saving, control, holding on | greed, materialism, letting go, overspending | hold, but do not clutch',
P5:'hardship, insecurity, exclusion, lack | recovery, help arrives, end of a hard period | ask for help, it is near',
P6:'generosity, giving and receiving, fairness, charity | strings attached, debt, inequality | keep the exchange fair',
P7:'patience, long-term investment, evaluation, perseverance | impatience, poor returns, wasted effort | wait for the harvest, assess honestly',
P8:'mastery, diligence, skill development, craft | perfectionism, lack of focus, uninspired work | keep practising',
P9:'independence, abundance, self-sufficiency, luxury | over-investment in work, financial dependence | enjoy what you earned',
P10:'wealth, legacy, family, long-term stability | family money disputes, instability, loss | think long-term and about family',
P11:'ambition, study, new skill, opportunity | procrastination, lack of progress | learn and start small',
P12:'reliability, routine, hard work, steady progress | stagnation, boredom, laziness | steady steps every day',
P13:'nurturing, practical, abundance, home | self-neglect, work-home imbalance, smothering | care practically for body and home',
P14:'wealth, business acumen, security, leadership | greed, materialism, stubbornness | lead with generosity and stability'};
const MX_EN=[null,'The Magician','The High Priestess','The Empress','The Emperor','The Hierophant','The Lovers','The Chariot','Justice','The Hermit','Wheel of Fortune','Strength','The Hanged Man','Death','Temperance','The Devil','The Tower','The Star','The Moon','The Sun','Judgement','The World','The Fool'];
const SPREADS=[
 {id:'one',n:'Одна карта',d:'Швидка відповідь, порада або енергія дня.',pos:['Відповідь і порада']},
 {id:'three',n:'Минуле · теперішнє · майбутнє',d:'Як ситуація розвивалася і куди вона веде.',pos:['Минуле','Теперішнє','Майбутнє']},
 {id:'three_b',n:'Триплет + дно колоди',d:'Минуле, теперішнє, майбутнє і прихована основа ситуації — карта з дна колоди.',pos:['Минуле','Теперішнє','Майбутнє','Дно колоди'],bottom:3},
 {id:'sar',n:'Ситуація · дія · результат',d:'Що відбувається, що варто зробити і до чого це приведе.',pos:['Ситуація','Що варто зробити','Можливий результат']},
 {id:'choice',n:'Вибір між двома',d:'Порівняти два шляхи й побачити, що важливо врахувати.',pos:['Суть вибору','Шлях А','Шлях Б','Що важливо врахувати','Порада']},
 {id:'love',n:'Стосунки',d:'Ви, партнер і те, що відбувається між вами.',pos:['Ви в цих стосунках','Партнер','Що вас поєднує','Що заважає','Перспектива']},
 {id:'celtic',n:'Кельтський хрест',d:'Глибокий розбір складної ситуації з десяти позицій.',pos:['Суть ситуації','Що перетинає · виклик','Глибинна основа','Недавнє минуле','Свідома мета','Найближче майбутнє','Ви самі','Оточення','Надії та страхи','Підсумок']},
 {id:'free',n:'Вільний розклад',d:'Стільки карт, скільки ви витягнули, — без фіксованих позицій.',pos:null}];
const SPREAD_EN={three_b:['Triplet + bottom of the deck',['Past','Present','Future','Bottom of the deck — the hidden root and underlying influence beneath the whole situation (the card at the very bottom of the shuffled deck)']],one:['One card',['Answer and advice']],three:['Past · Present · Future',['Past','Present','Future']],sar:['Situation · Action · Outcome',['Situation','What to do','Likely outcome']],choice:['Choice between two paths',['The essence of the choice','Path A','Path B','What to take into account','Advice']],love:['Relationship spread',['You in this relationship','The partner','What connects you','What stands in the way','Prospects']],celtic:['Celtic Cross',['The heart of the matter','What crosses it / the challenge','The deep foundation','The recent past','The conscious goal','The near future','You yourself','The environment','Hopes and fears','The outcome']],free:['Free spread',null]};
const TP_GLYPH={
 M:'<svg viewBox="0 0 24 24" fill="none"><path d="M12 2.5l1.9 6.6L20.5 12l-6.6 1.9L12 21.5l-1.9-7.6L3.5 12l6.6-2.9z" fill="currentColor" fill-opacity=".18" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/></svg>',
 W:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M6 20L18 4"/><path d="M15 7.5c1.2-.4 2.3-.2 3.1.5M12.6 10.6c.2-1.3.9-2.2 2-2.6M10.3 13.6c-1.1-.5-1.7-1.4-1.8-2.6M8.3 16.2c-1.3 0-2.3-.5-2.9-1.4"/></svg>',
 C:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 4h11v3.5a5.5 5.5 0 0 1-11 0z" fill="currentColor" fill-opacity=".14"/><path d="M12 13v5.5M8.5 20.5h7"/><path d="M8.5 6.5c1.2.8 5.8.8 7 0"/></svg>',
 S:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.8l1.6 2.4v10.3h-3.2V5.2z" fill="currentColor" fill-opacity=".14"/><path d="M7.5 15.5h9M12 15.5v4.2"/><circle cx="12" cy="20.6" r=".9" fill="currentColor"/></svg>',
 P:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"><circle cx="12" cy="12" r="8.6" fill="currentColor" fill-opacity=".12"/><path d="M12 4.9L16.2 17.6 5.4 9.8h13.2L7.8 17.6z"/></svg>'};
const TP_COL={M:'var(--t-m)',W:'var(--t-w)',C:'var(--p-blue)',S:'var(--p-cyan)',P:'var(--t-p)'};
const TP_COURT=['♟','♞','♛','♚'];
let TAR={q:'',sp:'three',slots:[null,null,null],rev:false,mx:false,mxs:[],read:null,busy:false,ctl:null};
const TP_MXMAX=4;
let TP_SAMPLE;
(async()=>{ try{ TP_SAMPLE=window.claude&&window.claude.use?await window.claude.use('sample'):null; }catch(_){ TP_SAMPLE=null; } })();
const tpSp=()=>SPREADS.find(s=>s.id===TAR.sp)||SPREADS[1];
function tpName(id,lang){
  lang=lang||LANG; const L=TAROT_MAJ_L[lang]?lang:'en';
  if(id[0]==='M') return TAROT_MAJ_L[L][+id.slice(1)];
  const si=TAROT_SUITS.indexOf(id[0]), rk=TAROT_RANK_L[L][+id.slice(1)-1], su=TAROT_SUIT_G[L][si];
  return L==='en'?`${rk} of ${su}`:`${rk} ${su}`;
}
function tpMark(id){ if(id[0]==='M') return ROMAN[+id.slice(1)]; const r=+id.slice(1); return r===1?'A':r<=10?String(r):TP_COURT[r-11]; }
const tpLw=n=>{const w=Math.max(...n.split(/\s+/).map(x=>x.length));return w>=13?' xl':w>=10?' long':'';};
const tpFace=c=>`<span class="tc${c.id[0]==='M'?' mj':''}" style="--sc:${TP_COL[c.id[0]]}"><span class="tc-n">${tpMark(c.id)}</span>${tpArt(c.id)}<span class="tc-name" style="--nl:${tpName(c.id).length}">${esc(tpName(c.id))}</span></span>`;
const cardsWord=n=>{const a=n%10,b=n%100;return a===1&&b!==11?_t("карта"):a>=2&&a<=4&&(b<12||b>14)?_t("карти"):_t("карт");};
const TP_MIC='<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="9" y="3.5" width="6" height="11" rx="3" stroke="currentColor" stroke-width="1.6"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v2.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
const TP_SEND='<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h13M13 6.5l5.5 5.5-5.5 5.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
function tpHist(){ try{ return JSON.parse(localStorage.getItem('code-tarot')||'[]')||[]; }catch(_){ return []; } }
function tpSaveHist(list){ try{ localStorage.setItem('code-tarot',JSON.stringify(list.slice(0,30))); }catch(_){} }
/* the matrix taken into account: the user's own, or another person's entered in the modal (e.g. a tarologist's client) */
/* every matrix taken into account: «mine» (the user's own) and any number of other people (up to TP_MXMAX) */
function tpMxUse(){
  return TAR.mxs.map(x=>{ if(x.mine){ const m=tpMatrix(); return m?Object.assign({},m,{g:(USER&&USER.profile&&USER.profile.g)||STATE&&STATE.g||'f'}):null; }
    return {P:calc(x.d,x.m,x.y),d:x.d,m:x.m,y:x.y,name:x.name,g:x.g,other:true}; }).filter(Boolean);
}
/* turning the option on: start with your own matrix, or ask for a person if there is none */
function tpMxStart(){ if(TAR.mxs.length) return; if(tpMatrix()) TAR.mxs=[{mine:true}]; }
const tpDot=o=>`${String(o.d).padStart(2,'0')}.${String(o.m).padStart(2,'0')}.${o.y}`;
function tpPeople(){ try{ return JSON.parse(localStorage.getItem('code-tarot-people')||'[]')||[]; }catch(_){ return []; } }
function tpSavePeople(l){ try{ localStorage.setItem('code-tarot-people',JSON.stringify(l.slice(0,12))); }catch(_){} }
function tpOtherModal(idx){
  const o=(idx!=null&&TAR.mxs[idx]&&!TAR.mxs[idx].mine)?TAR.mxs[idx]:{name:'',g:'f',d:0,m:0,y:0};
  /* recent people: tarot ones first, then everyone entered in the calculators (same consent rules as «Раніше вводили») */
  const ppl=(()=>{ const out=[], seen=new Set(); [...tpPeople(),...(typeof recAll==='function'?recAll():[])].forEach(p=>{ if(!p||!p.y) return; const k=`${(p.name||'').toLowerCase()}|${p.d}.${p.m}.${p.y}`; if(seen.has(k)) return; seen.add(k); out.push({name:p.name||'',g:p.g||'f',d:+p.d,m:+p.m,y:+p.y}); }); return out.slice(0,30); })();
  const d=document.createElement('div'); d.className='tpk tpo'; d.setAttribute('role','dialog'); d.setAttribute('aria-modal','true'); d.setAttribute('aria-labelledby','tpoT');
  d.innerHTML=`<div class="tpk-bg"></div><div class="tpk-box"><div class="tpk-h"><div><small>${_t("Матриця для розкладу")}</small><h3 id="tpoT">${_t("Дані людини")}</h3></div><button class="x" type="button" data-tpo="x" aria-label="${_t("Закрити")}">${XICON}</button></div>
    <form class="tpo-f" novalidate>
      <p class="tpo-n">${_t("Сервіс розрахує матрицю долі цієї людини й урахує її в трактуванні. Саму матрицю на сторінці показано не буде.")}</p>
      ${ppl.length?`<div class="tpo-pp"><span>${_t("Нещодавні")}</span>${ppl.map((p,i)=>`<button type="button" data-pp="${i}" data-nm="${esc((p.name||'').toLowerCase())}">${esc(p.name||'—')} · ${tpDot(p)}</button>`).join('')}<em class="tpo-none" hidden>${_t("Нікого з таким ім’ям")}</em></div>`:''}
      <div class="pf-row1"><div class="field"><label for="tpoN">${T('name')}</label><input id="tpoN" class="nm" autocapitalize="words" maxlength="40" value="${esc(o.name||'')}" placeholder="${_t("Ім’я людини")}"></div>
        <div class="seg seg2" role="radiogroup" aria-label="${T('fem')} / ${T('male')}"><input type="radio" name="tpog" id="tpogf" value="f" ${o.g!=='m'?'checked':''}><label for="tpogf">${T('fem')}</label><input type="radio" name="tpog" id="tpogm" value="m" ${o.g==='m'?'checked':''}><label for="tpogm">${T('male')}</label></div></div>
      <div class="pf-date"><div class="field"><label for="tpoD">${T('day')}</label><select id="tpoD"></select></div><div class="field"><label for="tpoM">${T('month')}</label><select id="tpoM"></select></div><div class="field"><label for="tpoY">${T('year')}</label><select id="tpoY"></select></div></div>
      <div class="err" id="tpoE" role="alert" hidden></div>
      <div class="tpo-a"><button class="btn go" type="submit">${_t("Врахувати в розкладі")}</button><button class="btn ghost" type="button" data-tpo="x">${T('cCancel')}</button></div>
    </form></div>`;
  document.body.appendChild(d); document.documentElement.classList.add('mdl-on'); requestAnimationFrame(()=>d.classList.add('in'));
  setupDate('tpoD','tpoM','tpoY');
  const put=p=>{ $('#tpoN').value=p.name||''; d.querySelector(`#tpog${p.g==='m'?'m':'f'}`).checked=true; if(p.y){ $('#tpoY').value=p.y; $('#tpoM').value=p.m; $('#tpoM').dispatchEvent(new Event('change')); $('#tpoD').value=p.d; } window.csSync&&window.csSync(); };
  if(o.y) put(o);
  d.querySelectorAll('.field select').forEach(s=>window.csEnhance&&window.csEnhance(s)); window.csSync&&window.csSync();
  /* typing a name narrows «Нещодавні» letter by letter: «Юр» keeps Юрій, drops Юлія */
  const filt=()=>{ const q=nm.value.trim().toLowerCase(), bs=d.querySelectorAll('.tpo-pp [data-pp]'); let n=0;
    bs.forEach(b=>{ const t=b.dataset.nm||'', on=!q||t.startsWith(q)||t.includes(' '+q); b.hidden=!on; if(on) n++; });
    const no=d.querySelector('.tpo-none'); if(no) no.hidden=!(q&&n===0); };
  const nm=$('#tpoN'); nm.addEventListener('input',()=>{ const p=nm.selectionStart,v=capName(nm.value); if(v!==nm.value){ nm.value=v; try{nm.setSelectionRange(p,p)}catch(_){} } filt(); });
  const prev=document.activeElement; if(innerWidth>820) setTimeout(()=>nm.focus({preventScroll:true}),60);
  const close=()=>{ d.classList.remove('in'); document.documentElement.classList.remove('mdl-on'); setTimeout(()=>d.remove(),240); document.removeEventListener('keydown',key,true); tpRefreshL(); if(prev&&prev.focus&&prev.isConnected) prev.focus({preventScroll:true}); };
  const key=e=>{ if(e.key==='Escape'&&!document.querySelector('.cs-pop.in')){ e.preventDefault(); e.stopImmediatePropagation(); close(); } };
  document.addEventListener('keydown',key,true);
  d.addEventListener('click',e=>{ if(e.target.closest('[data-tpo=x]')||e.target.classList.contains('tpk-bg')){ if(!TAR.mxs.length) TAR.mx=false; close(); return; }
    const pp=e.target.closest('[data-pp]'); if(pp){ const p=ppl[+pp.dataset.pp]; if(p){ put(p); filt(); } } });
  d.querySelector('form').addEventListener('submit',e=>{ e.preventDefault();
    const v={name:$('#tpoN').value.trim(),g:d.querySelector('input[name=tpog]:checked').value,d:+$('#tpoD').value,m:+$('#tpoM').value,y:+$('#tpoY').value}, er=$('#tpoE');
    if(!v.d||!v.m||!v.y){ er.textContent=T('errDate'); er.hidden=false; return; }
    if(idx!=null&&TAR.mxs[idx]&&!TAR.mxs[idx].mine) TAR.mxs[idx]=v; else if(TAR.mxs.length<TP_MXMAX) TAR.mxs.push(v); TAR.mx=true;
    tpSavePeople([v,...tpPeople().filter(p=>!(p.d===v.d&&p.m===v.m&&p.y===v.y&&(p.name||'')===(v.name||'')))]);
    close(); });
}
function tpMatrix(){
  if(STATE&&STATE.P&&STATE.mode==='solo') return {P:STATE.P,d:STATE.d,m:STATE.m,y:STATE.y,name:STATE.name};
  if(USER&&profileReady(USER.profile)){ const p=USER.profile; return {P:calc(p.d,p.m,p.y),d:p.d,m:p.m,y:p.y,name:p.name}; }
  return null;
}
function tpMd(s){
  const lines=esc(tpStrip(s)).split('\n'); let out='', list=null;
  const close=()=>{ if(list){ out+=`</${list}>`; list=null; } };
  const inl=t=>t.replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/(^|[\s(«“])\*(?!\s)([^*]+?)\*(?=[\s).,:;!?»”]|$)/g,'$1<em>$2</em>');
  for(const raw of lines){
    const l=raw.trim(); let m;
    if(!l){ close(); continue; }
    if((m=l.match(/^#{1,4}\s+(.*)/))){ close(); out+=`<h4>${inl(m[1].replace(/^\*\*(.*)\*\*$/,'$1'))}</h4>`; continue; }
    if((m=l.match(/^[-*•]\s+(.*)/))){ if(list!=='ul'){ close(); out+='<ul class="bl">'; list='ul'; } out+=`<li>${inl(m[1])}</li>`; continue; }
    if((m=l.match(/^\d+[.)]\s+(.*)/))&&!/^\d+[.)]\s+\*\*/.test(l)){ if(list!=='ol'){ close(); out+='<ol class="tp-ol">'; list='ol'; } out+=`<li>${inl(m[1])}</li>`; continue; }
    close(); out+=`<p>${inl(l)}</p>`;
  }
  close(); return out;
}
/* knowledge-base entries for a spread: every card + the key points of each matrix involved */
function tpKb(r,mx){
  const out={cards:[...new Set((r.slots||[]).map(c=>c.id))]}, list=[];
  (mx||[]).forEach(M=>{ if(!M||!M.P) return; const who=M.name?` (${M.name})`:''; let age=new Date().getFullYear()-M.y; const t=new Date(); if(t.getMonth()+1<M.m||(t.getMonth()+1===M.m&&t.getDate()<M.d)) age--; age=Math.max(0,age)%80;
    kbMx(M.P,{only:['A','E','B','C','C2','MON','LOV','X','D','PERS','SOC','MALE','FEM']}).forEach(e=>list.push([e[0],e[1],e[2]+who]));
    list.push(['year',M.P.YEARS[age][0],`програма року зараз${who}`]); });
  if(list.length) out.mx=list.slice(0,60);
  return out;
}
function tpPrompt(r){
  const L=TP_LANG[LANG]||TP_LANG.en, en=SPREAD_EN[r.sp]||SPREAD_EN.free, sp=SPREADS.find(s=>s.id===r.sp);
  const cards=r.slots.map((c,i)=>{ const pe=en[1]?en[1][i]:`Card ${i+1}`, pl=sp&&sp.pos?sp.pos[i]:''; return `${i+1}. Position “${pe}”${pl&&pl!==pe?` (shown to the person as “${pl}”)`:''} — ${tpName(c.id,'en')}, ${c.r?'REVERSED':'upright'} [the person sees the name as: ${tpName(c.id)}]`; }).join('\n');
  const maj=r.slots.filter(c=>c.id[0]==='M').length, rev=r.slots.filter(c=>c.r).length, court=r.slots.filter(c=>c.id[0]!=='M'&&+c.id.slice(1)>10).length;
  const suits=TAROT_SUITS.map((s,i)=>`${['Wands','Cups','Swords','Pentacles'][i]} ${r.slots.filter(c=>c.id[0]===s).length}`).join(', ');
  const nums={}; r.slots.forEach(c=>{ if(c.id[0]!=='M'){ const n=+c.id.slice(1); if(n<=10) nums[n]=(nums[n]||0)+1; } });
  const rep=Object.entries(nums).filter(([,k])=>k>1).map(([n,k])=>`${n}×${k}`).join(', ');
  let mx='';
  const mxs=Array.isArray(r.mx)?r.mx:(r.mx?[r.mx]:[]);
  const mxOne=(M,many)=>{ const P=M.P, nmx=v=>`${v} ${MX_EN[v]}`; let age=new Date().getFullYear()-M.y; const t=new Date(); if(t.getMonth()+1<M.m||(t.getMonth()+1===M.m&&t.getDate()<M.d)) age--; age=Math.max(0,age)%80;
    const who=M.other?`${M.name?`“${M.name}”`:'another person'} (${M.g==='m'?'male':'female'}, born ${tpDot(M)}) — entered by the querent (who may be a tarot reader working for a client); NOT the querent’s own matrix, so refer to this person by name or as “this person”`:`the querent themself${M.name?` (“${M.name}”)`:''}, born ${tpDot(M)}`;
    return `${many?'- ':''}${many?'':'DESTINY MATRIX OF '}${who}: centre / comfort zone ${nmx(P.E)}; personality ${nmx(P.A)}; talents ${nmx(P.B)}; money & material ${nmx(P.C)}; karmic task ${nmx(P.D)}; karmic tail ${P.D2}-${P.D1}-${P.D}; love channel ${nmx(P.LOV)}; personal purpose ${nmx(P.PERS)}; current year (age ${age}) ${P.YEARS[age].join('-')} (main energy ${MX_EN[P.YEARS[age][0]]}); money channel: entry ${nmx(P.C2)}, multiplier ${nmx(P.MON)}, love/money crossing ${nmx(P.X)}; family lines: father’s ${nmx(P.MALE)}, mother’s ${nmx(P.FEM)}; path of purpose: Sky ${nmx(P.SKY)} + Earth ${nmx(P.EARTH)} → finding yourself (to 40) ${nmx(P.PERS)}, socialization (40–60) ${nmx(P.SOC)}, spiritual literacy (after 60) ${nmx(P.SPIR)} — now in the «${age<40?'finding yourself':age<60?'socialization':'spiritual literacy'}» stage; health map (emotions column, crown→root): ${chakraRows(P).rows.map(x=>x.em).join(', ')}${(()=>{ const t=findNamed([P.D2,P.D1,P.D],false), y=findNamed(P.YEARS[age],true); return (t?`; named tail program «${PN(t)}»`:'')+(y?`; named year program «${PN(y)}»`:''); })()}. Pick the matrix points that fit the question: money → money channel; love → love channel and crossing; work/meaning → talents and the current purpose stage; family → family lines; energy/health → health map; timing → year program`; };
  if(mxs.length===1) mx=`\n${mxOne(mxs[0],false)} (Natalia Ladini’s method; arcana numbered 1–22, where 8 = Justice, 11 = Strength, 22 = The Fool). Where a drawn Major Arcana matches one of these energies by name, mention the resonance in one or two sentences inside the relevant card or in “How the cards connect”. Do not over-focus on the matrix: the cards and the question come first.`;
  else if(mxs.length>1) mx=`\nDESTINY MATRICES OF THE PEOPLE INVOLVED (Natalia Ladini’s method; arcana numbered 1–22, where 8 = Justice, 11 = Strength, 22 = The Fool):\n${mxs.map(M=>mxOne(M,true)).join('\n')}\nUse them to read the question in the light of these people and the dynamics between them: where a drawn Major Arcana matches one of their energies by name, say whose matrix it resonates with; note shared energies or clear tensions between them when they matter for the question. Do not over-focus on the matrices: the cards and the question come first.`;
  const kb=[...new Set(r.slots.map(c=>c.id))].map(id=>{ const [u,v,a]=TP_KB[id].split(' | '); return `- ${tpName(id,'en')}: upright — ${u}; reversed — ${v}; advice — ${a}`; }).join('\n');
  return `You are CODE’s tarot reader: an experienced, warm and grounded tarot interpreter. You know the Rider–Waite–Smith tradition deeply, as well as Thoth and Marseille symbolism, card numerology, elemental dignities and the Major Arcana as archetypes. The person shuffled and laid out the cards themselves (or drew them online) and asks you to interpret what came up in the context of their question. They may not be confident reading the cards, so be clear and concrete.

Write the entire reply in ${L.name}, addressing the person ${L.reg}. Write card names in ${L.name} exactly as the person sees them (given in square brackets below).

QUESTION: """${r.q}"""
SPREAD: ${en[0]} — ${r.slots.length} card(s)
CARDS IN POSITIONS:
${cards}
PATTERNS: Major Arcana ${maj} of ${r.slots.length}; suits — ${suits}; reversed ${rev}; court cards ${court}${rep?`; repeated numbers ${rep}`:''}.${mx}

REFERENCE MEANINGS (short; the deep CODE tarot reference for these cards — love, work and money, another person's feelings, advice, yes/no, reversed — is in the system prompt; ground the reading in both, then go deeper with your own knowledge of the cards):
${kb}

HOW TO READ:
- Interpret every card through its position AND the exact question. Never recite generic textbook meanings: say what this card in this place says about this situation.
- Reversed cards show the energy blocked, delayed, internalised or overdone — not automatically “bad”.
- Read the whole picture: many Major Arcana point to a significant life lesson; the dominant suit shows where the matter really lives (Wands — action, drive, career; Cups — feelings, relationships; Swords — thoughts, conflict, decisions; Pentacles — money, work, body, material); court cards may be people or attitudes; repeated numbers repeat a theme.
- Show how the cards talk to each other: sequence, contrasts, reinforcement.
- For yes/no questions give a clear lean (yes / rather yes / unclear / rather no / no) and explain why.
- ANSWER EXACTLY WHAT WAS ASKED. Never reply that the cards cannot see someone’s thoughts, cannot know the future or cannot say what a person will do, and never deflect on that ground: the person is asking precisely this, and reading it is what tarot is for. Answer in the language of energies and tendencies, with confident but soft wording (“the cards show…”, “his thoughts about you seem to run…”, “the most likely course right now is…”). At most one short clause may note that this is an energetic picture, not certainty — no disclaimer paragraphs.
- ANOTHER PERSON’S THOUGHTS, FEELINGS OR INTENTIONS: describe the character and energy of their inner world as the cards show it — the emotional tone of the thoughts (warm, tender, nostalgic, longing, heavy, guilty, anxious, cold, detached, irritated, proud, calculating, indifferent, confused…), whether thinking about the querent is pleasant or painful for them, how intense and how frequent these thoughts seem, the recurring themes (the shared past, regret, desire, doubt, fear, pride, practical worries), what holds them back, and how likely the thoughts are to turn into words or action. Do not invent literal sentences the person is thinking.
- THE FUTURE (will it happen, how will it go, when, what will he/she do): give a concrete answer. Describe the most probable course of events as it follows from the present situation and these cards — what is most likely to happen, roughly in what order, how it may feel; give a timing tendency if the cards suggest one (e.g. Wands and Eights move fast, Pentacles slowly). Then name 1–3 key variables (the querent’s choices and actions, the other person’s decisions, circumstances) that could change this course, and show briefly how it might unfold differently. The future is many-sided and is created by people’s choices: present the reading as the current trajectory, never as a fixed fate; never be fatalistic and never frighten.
- The same applies to any question that may look “unknowable” (hidden motives, whether someone is honest, the outcome of an exam or interview): read what the cards say about it and answer directly in terms of tendencies and energies.
- Be honest and supportive. Never predict death, serious illness, pregnancy outcomes or disasters; for health, legal or financial matters add one short line recommending a qualified specialist. If the question is harmful or manipulative (e.g. controlling or harming someone), gently redirect to what the person can do themselves.

FORMAT (Markdown, about 700–1100 words; for the Celtic Cross and spreads of 7+ cards about 1200–1600):
## (heading meaning “Short answer”, in ${L.name})
Two or three sentences answering the question directly.
## (heading meaning “The cards in their positions”, in ${L.name})
One paragraph per card that starts with **N. Position — Card name** (add the word for “reversed” in ${L.name} if it is reversed), 4–6 sentences tied to the question: what the card means in this position, what it says about this situation, the feelings or events behind it, and how it links to the neighbouring cards.
## (heading meaning “How the cards connect”, in ${L.name})
Two or three paragraphs: the overall story of the spread, the dominant suit and numbers, the most likely course of events and the key variables.
## (heading meaning “Advice”, in ${L.name})
4–6 concrete bullet points the person can act on, each tied to a card.
End with one line in italics: a question for reflection.
No preamble, no closing pleasantries.
${TP_FU_RULE(L)}`;
}
const TP_FU_RULE=L=>`After everything else, on the very last line, output exactly: [[FU]] question 1 || question 2 || question 3
— three follow-up questions in ${L.name} (each at most about 70 characters), phrased in the first person as the person would ask them, specific to THIS question, these cards and what you have just said: e.g. about a particular card or position, timing, what to do next, the other person’s side, a variable you named. Do not repeat questions already asked in this conversation and avoid generic ones. This line is hidden from the person and shown as buttons.`;
const TP_FU_RE=/\n*\[\[FU\]\][\s\S]*$/;
const tpStrip=t=>String(t||'').replace(TP_FU_RE,'').replace(/\n*\[(\[(F(U(\])?)?)?)?$/,'').trimEnd();
const tpFuParse=t=>{ const m=String(t||'').match(/\[\[FU\]\]\s*([\s\S]+)$/); if(!m) return null; const a=m[1].split(/\s*\|\|\s*|\n+/).map(x=>x.replace(/^[-*\d.)\s"«“]+|["»”\s]+$/g,'').trim()).filter(x=>x.length>3&&x.length<160).slice(0,3); return a.length?a:null; };
function tpFollow(text){
  const L=TP_LANG[LANG]||TP_LANG.en;
  return `Follow-up question from the same person about this spread: """${text}"""
Answer in ${L.name}, addressing the person ${L.reg}. Answer substantively (about 250–500 words; up to 700 if the question opens a new topic), grounded in the cards already drawn, the reading above and the deep tarot reference: name the cards and positions you rely on, explain why, describe what it looks like in practice and finish with 2–3 concrete steps. Markdown is allowed; use headings only if really needed. If they ask about a card that is not in the spread, say so and suggest drawing one clarifying card.
Keep the same principles as before: answer exactly what is asked, never say the cards cannot know; for another person’s thoughts describe their tone and energy; for the future describe the most likely course plus the variables that could change it.
${TP_FU_RULE(L)}`;
}
function tpErr(c){
  if(['not_granted','sampling_disabled','not_declared','capability_disabled','capability_removed'].includes(c)) return _t("Тлумачення недоступне: дозвольте цій сторінці звертатися до Claude.");
  if(c==='rate_limited') return _t("Забагато запитів поспіль або вичерпано ліміт. Спробуйте трохи пізніше.");
  if(c==='session_expired') return _t("Сесія завершилася — увійдіть у Claude ще раз.");
  if(c==='refused') return _t("ШІ не може відповісти на таке питання. Спробуйте сформулювати його інакше.");
  if(c==='prompt_too_large') return _t("Запит завеликий — скоротіть питання.");
  return _t("Не вдалося отримати відповідь. Спробуйте ще раз.");
}
async function tpGetSample(){
  if(TP_SAMPLE!==undefined) return TP_SAMPLE;
  try{ TP_SAMPLE=window.claude&&window.claude.use?await window.claude.use('sample'):null; }catch(_){ TP_SAMPLE=null; }
  return TP_SAMPLE;
}

/* --- left: question, spread, cards --- */
function tpForm(){
  const sp=tpSp(), n=TAR.slots.length, filled=TAR.slots.filter(Boolean).length, mx=tpMatrix();
  const ex=[_t("Що мені важливо знати про нову роботу?"),_t("Як розвиватимуться наші стосунки найближчі пів року?"),_t("Що допоможе мені вийти з цієї ситуації?"),_t("Чи варто мені переїжджати цього року?")];
  return `<div class="tp-sec"><div class="tp-st"><b>01</b><span>${_t("Ваше питання")}</span></div>
      <div class="tp-q"><textarea id="tpQ" rows="3" maxlength="700" placeholder="${_t("Наприклад: що мені важливо знати про нову роботу?")}">${esc(TAR.q)}</textarea><button class="tp-mic" id="tpMic" type="button" aria-label="${_t("Надиктувати питання")}" data-tip="${_t("Надиктувати голосом")}">${TP_MIC}</button></div>
      ${TAR.sugg&&TAR.sugg.q.length?`<div class="tp-sg"><div class="tp-sg-h"><span>${TAR.sugg.s?_f("Питання з матриці · {0}",[TAR.sugg.s]):_t("Питання з матриці")}</span><button type="button" id="tpSgX" aria-label="${_t("Сховати")}">×</button></div><div class="tp-ex">${TAR.sugg.q.map(x=>`<button type="button" class="${x===TAR.q?'on':''}" data-ex="${esc(x)}">${esc(x)}</button>`).join('')}</div></div>`
       :`<div class="tp-ex">${ex.map(x=>`<button type="button" data-ex="${esc(x)}">${x}</button>`).join('')}</div>`}
      <p class="tp-hint">${_t("Формулюйте відкрито: «що мені важливо знати…», «як краще діяти…», «що допоможе…». Для питань «так чи ні» підійде одна карта або три.")}</p></div>
    <div class="tp-sec"><div class="tp-st"><b>02</b><span>${_t("Розклад")}</span></div>
      <div class="tp-sps" role="radiogroup" aria-label="${_t("Розклад")}">${SPREADS.map(s=>`<button class="tp-sp" type="button" role="radio" aria-checked="${s.id===TAR.sp}" data-sp="${s.id}"><strong>${s.n}</strong><small>${s.pos?`${s.pos.length} ${cardsWord(s.pos.length)}`:_t("1–12 карт")}</small></button>`).join('')}</div>
      <p class="tp-spd">${sp.d}</p></div>
    <div class="tp-sec"><div class="tp-st"><b>03</b><span>${_t("Карти, що випали")}</span><em>${filled} / ${n}</em></div>
      <div class="tp-acts"><button class="btn ghost sm" type="button" id="tpDraw"><span aria-hidden="true">✦</span> ${_t("Витягнути онлайн")}</button><button class="btn ghost sm" type="button" id="tpPhoto">${_t("Розпізнати з фото")}</button><input type="file" id="tpFile" accept="image/*" hidden>${filled?_t("<button class=\"linkb\" type=\"button\" id=\"tpClear\">Очистити</button>"):''}</div>
      <div class="tp-slots">${TAR.slots.map((c,i)=>{ const pos=sp.pos?sp.pos[i]:''; return `<div class="tp-slot"><button class="tp-card${c?' on':''}${c&&c.r?' rev':''}" type="button" data-pick="${i}" aria-label="${c?esc(tpName(c.id)):_t("Оберіть карту")}${pos?' · '+pos:''}" style="--k:${i}${c?';--sc:'+TP_COL[c.id[0]]:''}">${c?tpFace(c):_t("<span class=\"tp-plus\" aria-hidden=\"true\">+</span><span class=\"tp-add\">Оберіть карту</span>")}</button><span class="tp-pos"><b>${String(i+1).padStart(2,'0')}</b>${pos||''}</span>${c?`<button class="tp-flip" type="button" data-flip="${i}" aria-pressed="${c.r}">↻ ${c.r?_t("Перевернута"):_t("Пряма")}</button>`:''}</div>`; }).join('')}</div>
      ${sp.pos?'':`<div class="tp-cnt"><button type="button" data-cnt="-1" aria-label="${_t("Менше карт")}">−</button><span>${n} ${cardsWord(n)}</span><button type="button" data-cnt="1" aria-label="${_t("Більше карт")}">+</button></div>`}
      <div class="tp-opts"><label class="agree"><input type="checkbox" id="tpRev"${TAR.rev?' checked':''}><span class="box" aria-hidden="true"></span><span>${_t("Перевернуті карти при онлайн-витягуванні")}</span></label>
      <label class="agree"><input type="checkbox" id="tpMx"${TAR.mx?' checked':''}><span class="box" aria-hidden="true"></span><span>${_t("Врахувати матрицю долі")}</span></label>
      ${TAR.mx?`<div class="tp-mxl">${TAR.mxs.map((x,i)=>{ const v=x.mine?mx:x; if(!v) return ''; return `<div class="tp-mxc${x.mine?' me':''}"><button type="button" class="tp-mxo" ${x.mine?'':`data-mxedit="${i}"`} title="${x.mine?'':_t("Змінити")}"><small>${x.mine?_t("Моя"):_f("Людина {0}",[i+1])}</small><b>${esc(v.name||(x.mine?_t("Мій профіль"):'—'))}</b>${v.y?`<em>${tpDot(v)}</em>`:''}</button><button type="button" class="tp-mxx" data-mxdel="${i}" aria-label="${_t("Прибрати")}">${XICON}</button></div>`; }).join('')}${TAR.mxs.length<TP_MXMAX?`<button type="button" class="tp-mxadd" data-mxadd><span aria-hidden="true">+</span>${TAR.mxs.length?_t("Ще людина"):_t("Додати людину")}</button>`:''}</div>`:''}</div></div>
    <div class="tp-go"><button class="btn go" type="button" id="tpGo"${TAR.busy?' disabled':''}>${_t("Отримати трактування")}</button><div class="err" id="tpErr" hidden></div></div>`;
}
/* --- right: how it works + history, or the reading --- */
function tpRight(){
  const r=TAR.read;
  if(!r){
    const h=tpHist();
    return `<div class="det fade">
      <div class="side-h" style="padding:0 0 10px">${_t("як це працює")}</div>
      <h3 class="g-h">${_t("Карти — ваші, тлумачення — від ШІ")}</h3>
      <p>${_t("Розкладіть колоду самостійно, а сюди внесіть питання й карти, що випали. ШІ розгляне кожну карту в її позиції саме у зв’язку з вашим питанням, побачить зв’язки між картами й дасть пораду.")}</p>
      <ol class="qs">${[_t("Сформулюйте питання — текстом або голосом."),_t("Оберіть розклад, за яким розкладали карти."),_t("Внесіть карти: оберіть з колоди, сфотографуйте розклад або витягніть онлайн."),_t("Отримайте тлумачення й ставте уточнювальні питання.")].map(x=>`<li>${x}</li>`).join('')}</ol>
      <div class="pos-box soft"><h4>${_t("Важливо")}</h4><p>${_t("Таро — інструмент рефлексії, а не передбачення долі. У питаннях здоров’я, права й фінансів спирайтеся на фахівців.")}</p></div>
      ${h.length?`<h4>${_t("Мої розклади")}</h4><div class="favs">${h.map((x,i)=>`<div class="fav"><button class="fav-open" type="button" data-th="${i}"><span class="fn" style="border-color:var(--p-gold)">${x.slots.length}</span><strong>${esc(x.q.length>70?x.q.slice(0,68)+'…':x.q)}</strong><small>${(SPREADS.find(s=>s.id===x.sp)||{n:''}).n} · ${whenTxt(x.ts)}</small></button><div class="fav-acts"><button class="fav-ic del" type="button" data-thd="${i}" aria-label="${_t("Видалити")}" title="${_t("Видалити")}">${IC_DEL}</button></div></div>`).join('')}</div>`:''}
    </div>`;
  }
  const sp=SPREADS.find(s=>s.id===r.sp)||SPREADS[6];
  return `<div class="det fade tp-read">
    <div class="det-top"><div class="det-num" style="--c:var(--p-gold)">✦</div><div class="det-title"><h3>${_t("Тлумачення")}</h3><small>${sp.n} · ${r.slots.length} ${cardsWord(r.slots.length)} · ${whenTxt(r.ts)}</small></div><button class="x" id="tpBack" type="button" aria-label="${_t("Закрити")}">${XICON}</button></div>
    <blockquote class="tp-qq">«${esc(r.q)}»</blockquote>
    <div class="tp-mini">${r.slots.map((c,i)=>`<span style="--sc:${TP_COL[c.id[0]]}"><i>${i+1}</i>${esc(tpName(c.id))}${c.r?' <em>↻</em>':''}</span>`).join('')}</div>
    <div class="tp-ans md" id="tpAns">${r.ans?tpMd(r.ans):tpThinking()}</div>
    <div class="tp-chat" id="tpChat">${(r.chat||[]).map(m=>`<div class="tp-u">${esc(m.q)}</div><div class="tp-a md">${m.a?tpMd(m.a):tpThinking()}</div>`).join('')}</div>
    <div class="err" id="tpErr2" hidden></div>
    ${TAR.busy?`<div class="tp-ra"><button class="btn ghost sm" type="button" id="tpStop">${_t("Зупинити")}</button></div>`:''}
    ${!TAR.busy&&r.ans?`<div class="tp-fu"><textarea id="tpFU" rows="2" maxlength="500" placeholder="${_t("Уточніть: наприклад, «а що робити, якщо…»")}"></textarea><button class="tp-mic" id="tpMic2" type="button" aria-label="${_t("Надиктувати питання")}" data-tip="${_t("Надиктувати голосом")}">${TP_MIC}</button><button class="tp-send" id="tpAsk" type="button" aria-label="${_t("Запитати")}" data-tip="${_t("Запитати")}">${TP_SEND}</button></div>
      <div class="tp-ex">${(()=>{ const asked=new Set((r.chat||[]).map(m=>m.q.trim().toLowerCase())); const a=(r.fu&&r.fu.length?r.fu:[_t("Що найважливіше в цьому розкладі?"),_t("Що мені зробити найближчим часом?")]).filter(x=>!asked.has(x.trim().toLowerCase())); return a; })().map(x=>`<button type="button" data-fu="${esc(x)}">${x}</button>`).join('')}</div>
      <div class="tp-ra"><button class="btn ghost sm" type="button" id="tpNew">${_t("Новий розклад")}</button><button class="btn ghost sm" type="button" id="tpCopy">${_t("Скопіювати тлумачення")}</button></div>`:''}
    <p class="note">${_t("Тлумачення згенеровано ШІ на основі символіки карт Таро. Це інструмент рефлексії, а не прогноз чи порада фахівця.")}</p>
  </div>`;
}
/* AI is preparing an answer: spinning colour orb + phrases that change while we wait for the first words */
const AI_THINK=()=>[_t("Читаю вашу матрицю…"),_t("Зводжу енергії й програми…"),_t("Шукаю зв’язки між позиціями…"),_t("Формулюю відповідь…")];
const aiCopyBtn=()=>`<div class="aim-cpw"><button class="aim-cp" type="button" data-aim-cp><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="8.5" y="8.5" width="11" height="11" rx="2.5" stroke="currentColor" stroke-width="1.6"/><path d="M15.5 8.5V6A1.5 1.5 0 0 0 14 4.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5" stroke="currentColor" stroke-width="1.6"/></svg><span>${_t("Копіювати")}</span></button></div>`;
document.addEventListener('click',async e=>{ const cb=e.target.closest&&e.target.closest('.ak-a [data-aim-cp]'); if(!cb) return; const a=cb.closest('.ak-a'); try{ await navigator.clipboard.writeText(tpStrip(a.dataset.raw||'')); toast(_t("Текст скопійовано.")); }catch(_){} });
const aiThinking=deep=>`<div class="tp-think ai-think" data-k="0" role="status" aria-live="polite"><span class="ai-ld" aria-hidden="true"><i></i><i></i><i></i><b></b></span><span class="ai-think-t">${AI_THINK()[0]}</span></div>`;
setInterval(()=>{ document.querySelectorAll('.ai-think').forEach(el=>{ const L=AI_THINK(), k=(+el.dataset.k+1)%L.length, t=el.querySelector('.ai-think-t'); el.dataset.k=k; if(t){ t.classList.remove('in'); void t.offsetWidth; t.textContent=L[k]; t.classList.add('in'); } }); },2200);
const tpThinking=()=>`<div class="tp-think" role="status" aria-live="polite"><span class="ai-ld" aria-hidden="true"><i></i><i></i><i></i><b></b></span><span>${_t("Карти говорять…")}</span></div>`;
function renderTarot(){
  const sec=$('#tarot'); if(!sec) return;
  sec.innerHTML=`<div class="res-head fade"><div><div class="title-row"><h2>${_t("Таро-<b>трактувальник</b>")}</h2><div class="tr-acts"><button class="btn aura tp-plans" type="button" data-plans>Тарифи</button></div></div><div class="meta">${_t("Ваше питання · ваші карти · тлумачення від ШІ")}</div></div></div>
    <div class="grid tgrid"><div class="panel tp-l fade" id="tpL">${tpForm()}</div><aside class="panel side tp-r" id="tpR">${tpRight()}</aside></div>`;
}
function tpRefreshL(){ const l=$('#tpL'); if(!l) return; const q=$('#tpQ'), foc=document.activeElement===q, pos=q?q.selectionStart:0; l.innerHTML=tpForm(); if(foc){ const nq=$('#tpQ'); nq.focus({preventScroll:true}); try{nq.setSelectionRange(pos,pos)}catch(_){} } }
function tpRefreshR(){ const r=$('#tpR'); if(r){ r.innerHTML=tpRight(); r.scrollTop=r.scrollTop; } }
function showTarot(){
  closeDrawer(); if(typeof sheetClose==='function') sheetClose(); if(typeof closeMore==='function') closeMore();
  $('#home').hidden=true; $('#result').hidden=true; $('#guide').hidden=true; $('#tarot').hidden=false;
  document.body.classList.add('on-tarot'); renderTarot(); placeForm(); window.scrollTo({top:0,behavior:'smooth'});
}
function hideTarot(){ const t=document.getElementById('tarot'); if(t) t.hidden=true; document.body.classList.remove('on-tarot'); }
function tpSetSpread(id){
  TAR.sp=id; const sp=tpSp(), n=sp.pos?sp.pos.length:Math.max(1,Math.min(12,TAR.slots.length||3));
  const old=TAR.slots; TAR.slots=Array.from({length:n},(_,i)=>old[i]||null); tpRefreshL();
}
function tpRand(n){ const a=new Uint32Array(1); crypto.getRandomValues(a); return a[0]%n; }
function tpDraw(){
  const n=TAR.slots.length, deck=[...TP_IDS];
  for(let i=deck.length-1;i>0;i--){ const j=tpRand(i+1); [deck[i],deck[j]]=[deck[j],deck[i]]; }
  const sp=tpSp(), ids=sp.bottom!=null?[...deck.slice(0,sp.bottom),deck[deck.length-1]]:deck.slice(0,n);
  TAR.slots=ids.map(id=>({id,r:TAR.rev&&tpRand(100)<30}));
  tpRefreshL(); document.querySelectorAll('#tpL .tp-card').forEach(b=>b.classList.add('deal'));
}
/* card picker */
function tpPicker(i){
  const sp=tpSp(); let cur=i, tab='M', rev=false, q='';
  const d=document.createElement('div'); d.className='tpk'; d.setAttribute('role','dialog'); d.setAttribute('aria-modal','true'); d.setAttribute('aria-labelledby','tpkT');
  const used=()=>new Set(TAR.slots.filter((c,k)=>c&&k!==cur).map(c=>c.id));
  const head=()=>`<div><small>${LANG==='uk'?`Позиція ${cur+1} / ${TAR.slots.length}`:_f("Позиція {0} з {1}",[cur+1,TAR.slots.length])}</small><h3 id="tpkT">${sp.pos?sp.pos[cur]:`${_f("Карта {0}",[cur+1])}`}</h3></div><button class="x" type="button" data-tpk="x" aria-label="${_t("Закрити")}">${XICON}</button>`;
  const tabs=()=>[['M',_t("Старші аркани")],...TAROT_SUITS.map((s,k)=>[s,(TAROT_SUIT_N[LANG]||TAROT_SUIT_N.en)[k]])].map(([k,t])=>`<button type="button" role="tab" aria-selected="${!q&&tab===k}" data-tab="${k}">${t}</button>`).join('');
  const grid=()=>{ const u=used(), ql=q.trim().toLowerCase(); const ids=ql?TP_IDS.filter(id=>[tpName(id),tpName(id,'en'),tpName(id,'uk')].some(x=>x.toLowerCase().includes(ql))):TP_IDS.filter(id=>id[0]===tab);
    return ids.length?ids.map(id=>`<button class="tp-card on tpk-c${rev?' rev':''}" type="button" data-id="${id}"${u.has(id)?' disabled':''} style="--sc:${TP_COL[id[0]]}" aria-label="${esc(tpName(id))}">${tpFace({id})}</button>`).join(''):`<p class="muted">${_t("Нічого не знайдено.")}</p>`; };
  d.innerHTML=`<div class="tpk-bg"></div><div class="tpk-box"><div class="tpk-h">${head()}</div>
    <div class="tpk-tools"><input type="search" id="tpkS" placeholder="${_t("Пошук карти за назвою")}" autocomplete="off"><label class="agree"><input type="checkbox" id="tpkR"><span class="box" aria-hidden="true"></span><span>${_t("Перевернута")}</span></label></div>
    <div class="tpk-tabs" role="tablist">${tabs()}</div><div class="tpk-grid" id="tpkG">${grid()}</div></div>`;
  document.body.appendChild(d); document.documentElement.classList.add('mdl-on'); requestAnimationFrame(()=>d.classList.add('in'));
  const prev=document.activeElement;
  if(innerWidth>820) setTimeout(()=>{ const s=d.querySelector('#tpkS'); s&&s.focus({preventScroll:true}); },60);
  const upd=()=>{ d.querySelector('.tpk-h').innerHTML=head(); d.querySelector('.tpk-tabs').innerHTML=tabs(); d.querySelector('#tpkG').innerHTML=grid(); };
  const close=()=>{ d.classList.remove('in'); document.documentElement.classList.remove('mdl-on'); setTimeout(()=>d.remove(),240); document.removeEventListener('keydown',key,true); tpRefreshL(); if(prev&&prev.focus&&prev.isConnected) prev.focus({preventScroll:true}); };
  const key=e=>{ if(e.key==='Escape'){ e.preventDefault(); e.stopImmediatePropagation(); close(); } };
  document.addEventListener('keydown',key,true);
  d.addEventListener('input',e=>{ if(e.target.id==='tpkS'){ q=e.target.value; d.querySelector('.tpk-tabs').innerHTML=tabs(); d.querySelector('#tpkG').innerHTML=grid(); } });
  d.addEventListener('change',e=>{ if(e.target.id==='tpkR'){ rev=e.target.checked; d.querySelector('#tpkG').innerHTML=grid(); } });
  d.addEventListener('click',e=>{
    if(e.target.closest('[data-tpk=x]')||e.target.classList.contains('tpk-bg')){ close(); return; }
    const t=e.target.closest('[data-tab]'); if(t){ tab=t.dataset.tab; q=''; const s=d.querySelector('#tpkS'); if(s) s.value=''; upd(); d.querySelector('#tpkG').scrollTop=0; return; }
    const c=e.target.closest('.tpk-c'); if(!c||c.disabled) return;
    TAR.slots[cur]={id:c.dataset.id,r:rev}; tpRefreshL();
    const next=TAR.slots.findIndex(x=>!x);
    if(next<0){ close(); return; }
    cur=next; rev=false; q=''; const r=d.querySelector('#tpkR'); if(r) r.checked=false; const s=d.querySelector('#tpkS'); if(s) s.value=''; upd();
  });
}
/* voice input (Web Speech API, where the browser allows it) */
let TP_REC=null;
function tpVoice(btn,ta){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){ toast(_t("Голосовий ввід тут не підтримується. Скористайтеся мікрофоном на клавіатурі телефону.")); return; }
  if(TP_REC){ try{TP_REC.stop()}catch(_){} return; }
  let rec; try{ rec=new SR(); }catch(_){ toast(_t("Не вдалося увімкнути мікрофон.")); return; }
  rec.lang=(TP_LANG[LANG]||TP_LANG.uk).sr; rec.interimResults=true; rec.continuous=false;
  const base=ta.value.trim()?ta.value.trim()+' ':'';
  rec.onresult=e=>{ let s=''; for(const x of e.results) s+=x[0].transcript; ta.value=base+s; if(ta.id==='tpQ') TAR.q=ta.value; };
  rec.onerror=e=>{ toast(e.error==='not-allowed'||e.error==='service-not-allowed'?_t("Немає доступу до мікрофона. Дозвольте його в браузері або скористайтеся мікрофоном на клавіатурі."):e.error==='no-speech'?_t("Не почули голосу — спробуйте ще раз."):_t("Не вдалося розпізнати голос. Спробуйте ще раз.")); };
  rec.onend=()=>{ TP_REC=null; btn.classList.remove('on'); btn.setAttribute('aria-pressed','false'); };
  try{ rec.start(); TP_REC=rec; btn.classList.add('on'); btn.setAttribute('aria-pressed','true'); }catch(_){ toast(_t("Не вдалося увімкнути мікрофон.")); }
}
/* photo of the spread → cards */
async function tpPhoto(file,btn){
  const s=await tpGetSample(); if(!s){ toast(_t("Розпізнавання фото працює, коли сайт відкрито в Claude.")); return; }
  const lim=await s.limits().catch(()=>null); if(!lim||!lim.images){ toast(_t("Розпізнавання фото в цьому перегляді недоступне.")); return; }
  btn.disabled=true; const lab=btn.textContent; btn.textContent=_t("Розпізнаю…");
  try{
    const list=TP_IDS.map(id=>`${id} = ${tpName(id,'en')}`).join('; ');
    const res=await s.json(`The photo shows a tarot spread laid out by a person. Identify every tarot card that is visible, in reading order (left to right, top to bottom; for a Celtic Cross use the standard positions 1–10). For each card decide whether it is upright or reversed (upside down relative to the viewer). If something cannot be identified, skip it and mention it in "note". Reply with only JSON like {"cards":[{"id":"M13","reversed":false}],"note":""}. Use only these ids: ${list}`,{images:[file],modelTier:'default'});
    const got=(res&&Array.isArray(res.cards)?res.cards:[]).filter(c=>c&&TP_IDS.includes(String(c.id))).map(c=>({id:String(c.id),r:!!c.reversed}));
    const uniqIds=[]; const cards=got.filter(c=>uniqIds.includes(c.id)?false:(uniqIds.push(c.id),true)).slice(0,12);
    if(!cards.length){ toast(_t("Не вдалося розпізнати карти на фото. Спробуйте чіткіше фото згори.")); return; }
    const sp=tpSp();
    if(!sp.pos||sp.pos.length!==cards.length){ const fit=SPREADS.find(x=>x.pos&&x.pos.length===cards.length&&x.id===TAR.sp); if(!fit){ TAR.sp='free'; } }
    TAR.slots=cards; tpRefreshL(); document.querySelectorAll('#tpL .tp-card').forEach(b=>b.classList.add('deal'));
    toast(`${_f("Розпізнано {0} {1} — перевірте, чи все правильно.",[cards.length,cardsWord(cards.length)])}`);
  }catch(e){ toast(e&&e.code==='image_rejected'?_t("Це фото не підходить — спробуйте інше."):tpErr(e&&e.code)); }
  finally{ btn.disabled=false; btn.textContent=lab; }
}
/* ask the AI */
async function tpAsk(){
  const err=$('#tpErr'); const q=($('#tpQ')||{}).value||TAR.q; TAR.q=q.trim();
  const show=m=>{ if(err){ err.textContent=m; err.hidden=false; } };
  if(!TAR.q){ show(_t("Напишіть або надиктуйте питання.")); $('#tpQ')&&$('#tpQ').focus(); return; }
  const sp=tpSp(); let slots=TAR.slots;
  if(sp.pos){ if(slots.some(c=>!c)){ show(_t("Оберіть усі карти розкладу або натисніть «Витягнути онлайн».")); return; } }
  else { slots=slots.filter(Boolean); if(!slots.length){ show(_t("Оберіть хоча б одну карту.")); return; } }
  if(err) err.hidden=true;
  const s=await tpGetSample();
  if(!s){ show("ШІ-трактувальник ще не підключено в тестовій версії сайту — це наступний крок налаштування."); return; }
  const mx=TAR.mx?tpMxUse():[];
  const r={id:Date.now(),ts:Date.now(),q:TAR.q,sp:TAR.sp,slots:slots.map(c=>({id:c.id,r:!!c.r})),ans:'',chat:[],turns:[]};
  r.turns=[{role:'user',content:tpPrompt({...r,mx})}]; r.kb=tpKb(r,mx);
  TAR.read=r; TAR.busy=true; tpRefreshL(); tpRefreshR();
  if(innerWidth<=980) $('#tpR').scrollIntoView({behavior:'smooth',block:'start'});
  const ctl=new AbortController(); TAR.ctl=ctl;
  try{
    const res=await s(r.turns,{cache:false,signal:ctl.signal,kb:r.kb,onText:({text})=>{ r.ans=text; const a=$('#tpAns'); if(a&&TAR.read===r) a.innerHTML=tpMd(text); }});
    r.ans=res.text; r.fu=tpFuParse(res.text); r.turns.push({role:'assistant',content:res.text});
    const h=tpHist().filter(x=>x.id!==r.id); h.unshift({id:r.id,ts:r.ts,q:r.q,sp:r.sp,slots:r.slots,ans:r.ans,fu:r.fu,chat:[],turns:r.turns,kb:r.kb}); tpSaveHist(h);
  }catch(e){
    r.ans=e&&e.text?e.text:'';
    if(!(e&&e.code==='cancelled')){ TAR.busy=false; tpRefreshR(); const e2=$('#tpErr2'); if(e2){ e2.textContent=tpErr(e&&e.code); e2.hidden=false; } TAR.ctl=null; tpRefreshL(); return; }
  }
  TAR.busy=false; TAR.ctl=null; tpRefreshL(); tpRefreshR();
}
async function tpFollowUp(text){
  const r=TAR.read; text=(text||'').trim(); if(!r||!text||TAR.busy) return;
  const s=await tpGetSample(); if(!s) return;
  const m={q:text,a:''}; r.chat=r.chat||[]; r.chat.push(m);
  const turns=[...r.turns,{role:'user',content:tpFollow(text)}];
  TAR.busy=true; tpRefreshR();
  const box=$('#tpR'); const last=()=>{ const a=[...document.querySelectorAll('#tpChat .tp-a')]; return a[a.length-1]; };
  const lb=last(); if(lb&&box) box.scrollTop=lb.offsetTop-80; if(innerWidth<=980&&lb) lb.scrollIntoView({behavior:'smooth',block:'center'});
  const ctl=new AbortController(); TAR.ctl=ctl;
  try{
    const res=await s(turns,{cache:false,signal:ctl.signal,kb:r.kb||tpKb(r,[]),onText:({text})=>{ m.a=text; const a=last(); if(a) a.innerHTML=tpMd(text); }});
    m.a=res.text; r.fu=tpFuParse(res.text)||r.fu; r.turns=[...turns,{role:'assistant',content:res.text}];
    const h=tpHist(), k=h.findIndex(x=>x.id===r.id); if(k>=0){ h[k].chat=r.chat.map(x=>({q:x.q,a:x.a})); h[k].turns=r.turns; h[k].fu=r.fu; tpSaveHist(h); }
  }catch(e){
    m.a=e&&e.text?e.text:'';
    if(!m.a) r.chat.pop();
    if(!(e&&e.code==='cancelled')){ TAR.busy=false; TAR.ctl=null; tpRefreshR(); const e2=$('#tpErr2'); if(e2){ e2.textContent=tpErr(e&&e.code); e2.hidden=false; } return; }
  }
  TAR.busy=false; TAR.ctl=null; tpRefreshR();
  const a=last(); if(a&&box&&innerWidth>980) box.scrollTop=a.offsetTop-80;
}
document.addEventListener('input',e=>{ if(e.target.id==='tpQ') TAR.q=e.target.value; });
document.addEventListener('click',e=>{ const b=e.target.closest&&e.target.closest('.qs-go'); if(!b) return; e.preventDefault(); e.stopPropagation();
  let d; try{ d=JSON.parse(b.dataset.tq); }catch(_){ return; }
  TAR.sugg=d; TAR.q=d.q[0]||''; TAR.read=null; showTarot();
  setTimeout(()=>{ const q=$('#tpQ'); if(q){ q.scrollIntoView({block:'center',behavior:'smooth'}); } },350); },true);
document.addEventListener('change',e=>{
  if(e.target.id==='tpRev') TAR.rev=e.target.checked;
  if(e.target.id==='tpMx'){ TAR.mx=e.target.checked; if(TAR.mx){ tpMxStart(); if(!TAR.mxs.length){ tpRefreshL(); tpOtherModal(); return; } } tpRefreshL(); }
  if(e.target.id==='tpFile'){ const f=e.target.files&&e.target.files[0]; e.target.value=''; if(f) tpPhoto(f,$('#tpPhoto')); }
});
document.addEventListener('click',e=>{
  const T0=e.target; if(!T0.closest||!T0.closest('#tarot')) return;
  const ex=T0.closest('[data-ex]'); if(ex){ TAR.q=ex.dataset.ex; const q=$('#tpQ'); if(q){ q.value=TAR.q; q.focus(); } document.querySelectorAll('.tp-ex button').forEach(b=>b.classList.toggle('on',b===ex)); return; }
  if(T0.closest('[data-mxadd]')){ tpOtherModal(); return; }
  { const ed=T0.closest('[data-mxedit]'); if(ed){ tpOtherModal(+ed.dataset.mxedit); return; } }
  { const dl=T0.closest('[data-mxdel]'); if(dl){ TAR.mxs.splice(+dl.dataset.mxdel,1); if(!TAR.mxs.length) TAR.mx=false; tpRefreshL(); return; } }
  if(T0.closest('#tpSgX')){ TAR.sugg=null; tpRefreshL(); return; }
  const sp=T0.closest('[data-sp]'); if(sp){ tpSetSpread(sp.dataset.sp); return; }
  const pk=T0.closest('[data-pick]'); if(pk){ tpPicker(+pk.dataset.pick); return; }
  const fl=T0.closest('[data-flip]'); if(fl){ const c=TAR.slots[+fl.dataset.flip]; if(c){ c.r=!c.r; tpRefreshL(); } return; }
  const cn=T0.closest('[data-cnt]'); if(cn){ const n=Math.max(1,Math.min(12,TAR.slots.length+(+cn.dataset.cnt))); TAR.slots=Array.from({length:n},(_,i)=>TAR.slots[i]||null); tpRefreshL(); return; }
  if(T0.closest('#tpDraw')){ tpDraw(); return; }
  if(T0.closest('#tpPhoto')){ const f=$('#tpFile'); f&&f.click(); return; }
  if(T0.closest('#tpClear')){ TAR.slots=TAR.slots.map(()=>null); tpRefreshL(); return; }
  if(T0.closest('#tpMic')){ tpVoice(T0.closest('#tpMic'),$('#tpQ')); return; }
  if(T0.closest('#tpMic2')){ tpVoice(T0.closest('#tpMic2'),$('#tpFU')); return; }
  if(T0.closest('#tpGo')){ tpAsk(); return; }
  if(T0.closest('#tpStop')){ if(TAR.ctl) TAR.ctl.abort(); return; }
  if(T0.closest('#tpBack')||T0.closest('#tpNew')){ if(TAR.ctl) TAR.ctl.abort(); TAR.read=null; TAR.busy=false; if(T0.closest('#tpNew')){ TAR.q=''; TAR.slots=TAR.slots.map(()=>null); } tpRefreshL(); tpRefreshR(); return; }
  if(T0.closest('#tpCopy')){ const r=TAR.read; if(!r) return; const txt=`${r.q}\n\n${r.slots.map((c,i)=>`${i+1}. ${tpName(c.id)}${c.r?' ↻':''}`).join('\n')}\n\n${tpStrip(r.ans)}${(r.chat||[]).map(m=>`\n\n— ${m.q}\n${tpStrip(m.a)}`).join('')}`; (navigator.clipboard?navigator.clipboard.writeText(txt):Promise.reject()).then(()=>toast(_t("Тлумачення скопійовано.")),()=>toast(_t("Не вдалося скопіювати."))); return; }
  if(T0.closest('#tpAsk')){ const f=$('#tpFU'); tpFollowUp(f&&f.value); return; }
  const fu=T0.closest('[data-fu]'); if(fu){ tpFollowUp(fu.dataset.fu); return; }
  const th=T0.closest('[data-th]'); if(th){ const x=tpHist()[+th.dataset.th]; if(x){ TAR.read={...x,chat:x.chat||[],turns:(x.turns&&x.turns.length)?x.turns:[{role:'user',content:tpPrompt(x)},{role:'assistant',content:x.ans||'-'}]}; TAR.busy=false; tpRefreshR(); if(innerWidth<=980) $('#tpR').scrollIntoView({behavior:'smooth',block:'start'}); } return; }
  const thd=T0.closest('[data-thd]'); if(thd){ const h=tpHist(); h.splice(+thd.dataset.thd,1); tpSaveHist(h); tpRefreshR(); return; }
});
document.addEventListener('keydown',e=>{ if(e.target&&e.target.id==='tpFU'&&e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); tpFollowUp(e.target.value); } });

const arcFig=v=>{const t=arcTid(v);return `<figure class="arc-art mj" style="--sc:var(--t-m)">${tpArt(t)}<span class="tc-n">${tpMark(t)}</span><span class="tc-name" style="--nl:${tpName(t).length}">${esc(tpName(t))}</span></figure>`;};

L10N_init();
applyStaticI18n();
loadSession();
renderHome();


/* ---------- floating header (matrix results only): hides on scroll down, glides back on scroll up.
   Phones: the first short swipe up brings the header back WITH the form open (you were probably heading for it);
   if you keep scrolling up without touching it, you are reading, so the form folds back into the compact bar
   (menu · «Змінити дані» · account). ---------- */
(()=>{
  const B=document.body, top=document.getElementById('topForm'); if(!top) return;
  const has=c=>B.classList.contains(c), mobFold=()=>has('tfx')&&window.setMC;
  let last=scrollY, acc=0, revealY=null, touched=false;
  const off=v=>{ if(has('hdr-off')!==v) B.classList.toggle('hdr-off',v); };
  const busy=()=>{ const a=document.activeElement; return (a&&top.contains(a)&&/INPUT|SELECT|TEXTAREA/.test(a.tagName))||!!document.querySelector('.cs-pop,.rec-pop')||has('dr-open'); };
  /* only on a calculated matrix (personal or compatibility, any tab); the cabinet, start screen, guide, tarot keep a plain sticky header */
  const res=document.getElementById('result');
  const onCalc=()=>!!(res&&!res.hidden&&typeof STATE!=='undefined'&&STATE&&STATE.P);
  const reset=()=>{ if(!onCalc()){ off(false); acc=0; revealY=null; } };
  ['result','home','guide','tarot'].forEach(id=>{ const el=document.getElementById(id); if(el) new MutationObserver(reset).observe(el,{attributes:true,attributeFilter:['hidden']}); });
  addEventListener('scroll',()=>{
    const y=scrollY, d=y-last; last=y;
    if(has('auth-on')||y<90||!onCalc()){ off(false); acc=0; revealY=null; return; }
    if(d===0) return;
    if((d>0)!==(acc>0)) acc=0; acc+=d;
    if(acc>14&&!busy()){ off(true); revealY=null; touched=false; return; }
    if(acc<-10&&has('hdr-off')){
      off(false); revealY=y; touched=false;
      if(mobFold()&&has('mc')) setMC(false);
      return;
    }
    /* still going up after the reveal: fold the form so it doesn't cover what you are reading */
    if(d<0&&revealY!=null&&!touched&&!busy()&&mobFold()&&!has('mc')&&revealY-y>220){ setMC(true); revealY=null; }
  },{passive:true});
  top.addEventListener('focusin',()=>{ off(false); touched=true; });
  top.addEventListener('pointerdown',()=>{ touched=true; },true);
})();

/* ---------- mobile: fixed top bar; the form folds into a pill ("Розрахувати код" on home, "Змінити дані" on results) ---------- */
(()=>{
  const B=document.body, top=document.getElementById('topForm'), home=document.getElementById('home'), btn=document.getElementById('miniCalc');
  if(!top||!home||!btn) return;
  const mob=()=>innerWidth<=820, has=c=>B.classList.contains(c), set=(c,v)=>{ if(has(c)!==v) B.classList.toggle(c,v); };
  const isCab=()=>typeof HOME_MODE!=='undefined'&&HOME_MODE==='cab';
  function mode(){ if(!mob()||has('on-start')||has('auth-on')||has('on-tarot')) return null; if(!home.hidden) return 'hm'; if(has('fc')) return 'rm'; return null; }
  function measure(){
    let h=null;
    if(has('hm')&&!has('mc')) h=top.offsetHeight;
    else if(has('rm')){ const n=top.querySelector('.topnav'); h=n.getBoundingClientRect().bottom-top.getBoundingClientRect().top+8; }
    if(h!=null) document.documentElement.style.setProperty('--toph',Math.round(h)+'px');
  }
  let openY=0;
  function setMC(v){ set('mc',v); btn.setAttribute('aria-expanded',String(!v)); if(!v) openY=scrollY; requestAnimationFrame(measure); }
  window.setMC=setMC;
  function sync(){
    const m=mode(), was=has('hm')?'hm':has('rm')?'rm':null;
    set('hm',m==='hm'); set('rm',m==='rm'); set('tfx',!!m);
    /* cabinet on a phone: the form starts folded into the «Розрахувати код» pill — the cabinet itself comes first */
    if(m!==was){ if(m==='rm') setMC(true); else if(m==='hm') setMC(isCab()); else set('mc',false); }
    measure();
  }
  new MutationObserver(sync).observe(home,{attributes:true,attributeFilter:['hidden']});
  new MutationObserver(sync).observe(B,{attributes:true,attributeFilter:['class']});
  if(window.ResizeObserver) new ResizeObserver(measure).observe(top);
  addEventListener('resize',sync);
  let lastY=scrollY;
  const busy=()=>{ const a=document.activeElement; return (a&&FORM_EL.bar.contains(a)&&/INPUT|SELECT|TEXTAREA/.test(a.tagName))||!!document.querySelector('.cs-pop'); };
  addEventListener('scroll',()=>{
    const y=scrollY, down=y>lastY; lastY=y;
    if(!has('tfx')) return;
    /* home: fold when the eyebrow reaches the form, unfold when scrolling back up past that same point — no empty gap */
    if(has('hm')){ const eb=home.querySelector('.eyebrow'), bar=FORM_EL.bar; if(!eb||!bar) return;
      const gap=eb.getBoundingClientRect().top-bar.getBoundingClientRect().bottom;
      if(has('mc')){ if(!down&&gap>2) setMC(false); }
      else if(down&&gap<=0&&!busy()) setMC(true);
      return; }
    if(has('mc')||!down||busy()) return;
    else if(y-openY>60) setMC(true);
  },{passive:true});
  let ty=null;
  addEventListener('touchstart',e=>{ ty=e.touches[0].clientY; },{passive:true});
  addEventListener('touchmove',e=>{ if(ty==null||!has('hm')||!has('mc')||isCab()) return; if(scrollY<=0&&e.touches[0].clientY-ty>36){ setMC(false); ty=null; } },{passive:true});
  addEventListener('touchend',()=>{ ty=null; },{passive:true});
  addEventListener('wheel',e=>{ if(has('hm')&&has('mc')&&!isCab()&&scrollY<=0&&e.deltaY<0) setMC(false); },{passive:true});
  btn.addEventListener('click',()=>setMC(false));
  /* results: tap outside the open form folds it back */
  document.addEventListener('pointerdown',e=>{ if(has('rm')&&!has('mc')&&!top.contains(e.target)&&!e.target.closest('.cs-pop')&&!e.target.closest('#drawer')) setMC(true); },true);
  document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&has('rm')&&!has('mc')&&!document.querySelector('.cs-pop')) setMC(true); });
  sync();
})();

/* ---------- theme switch: follows the browser until the person picks one ---------- */
(()=>{
  const root=document.documentElement, mq=matchMedia('(prefers-color-scheme: dark)');
  let saved=null; try{ saved=JSON.parse(localStorage.getItem('code-theme')||'null'); }catch(_){}
  if(saved==='light'||saved==='dark') root.setAttribute('data-theme',saved);
  const eff=()=>root.getAttribute('data-theme')||(mq.matches?'dark':'light');
  const sync=()=>document.querySelectorAll('.th-b').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.th===eff())));
  document.addEventListener('click',e=>{ const b=e.target.closest('.th-b'); if(!b) return; const t=b.dataset.th; root.setAttribute('data-theme',t); try{localStorage.setItem('code-theme',JSON.stringify(t))}catch(_){} sync(); });
  mq.addEventListener('change',sync); sync();
})();
/* ---------- cookie banner ---------- */
(()=>{
  let done=null; try{ done=localStorage.getItem('code-cookies'); }catch(_){}
  if(done) return;
  const ck=document.createElement('div'); ck.className='ck'; ck.setAttribute('role','dialog'); ck.setAttribute('aria-label','Cookies');
  ck.innerHTML=`<p><b>${T('ckT')}</b> ${T('ckP')} <button type="button" class="lnk" data-more="doc:privacy">${T('ckL')}</button></p><div class="ck-acts"><button class="btn ghost sm" type="button" data-ck="min">${T('ckMin')}</button><button class="btn go sm" type="button" data-ck="all">${T('ckAll')}</button></div>`;
  document.body.appendChild(ck);
  setTimeout(()=>ck.classList.add('in'),900);
  ck.addEventListener('click',e=>{ const b=e.target.closest('[data-ck]'); if(!b) return; try{localStorage.setItem('code-cookies',b.dataset.ck)}catch(_){} ck.classList.remove('in'); setTimeout(()=>ck.remove(),450); });
})();

/* ---------- glass tooltips (replace native title bubbles) ---------- */
(()=>{
  const tip=$('#tip'); let cur=null; let tTouch=0, tTimer=0;
  const place=el=>{
    const r=el.getBoundingClientRect(); tip.hidden=false;
    const w=tip.offsetWidth, h=tip.offsetHeight;
    let x=r.left+r.width/2-w/2; x=Math.max(10,Math.min(x,innerWidth-w-10));
    let y=r.top-h-10, below=false; if(y<10){ y=r.bottom+10; below=true; }
    tip.style.left=x+'px'; tip.style.top=y+'px'; tip.classList.toggle('below',below);
    tip.style.setProperty('--ax',(r.left+r.width/2-x)+'px');
  };
  const show=el=>{
    if(el.hasAttribute('title')){ const t=el.getAttribute('title'); if(t){ el.dataset.tip=t; if(!el.hasAttribute('aria-label')) el.setAttribute('aria-label',t); } el.removeAttribute('title'); }
    const t=el.dataset.tip; if(!t) return;
    cur=el; if(el.dataset.tipH){ tip.innerHTML=`<b>${esc(el.dataset.tipH)}</b>${esc(t)}`; } else tip.textContent=t; tip.classList.toggle('rich',!!el.dataset.tipH); tip.classList.remove('in'); place(el); requestAnimationFrame(()=>tip.classList.add('in'));
  };
  const hide=()=>{ cur=null; tip.classList.remove('in'); tip.hidden=true; };
  const target=e=>e.target&&e.target.closest?e.target.closest('[data-tip],[title]'):null;
  const noHover=matchMedia('(hover: none)');
  document.addEventListener('mouseover',e=>{ if(noHover.matches||Date.now()-tTouch<2200) return; const el=target(e); if(el&&el!==cur) show(el); else if(!el&&cur) hide(); });
  document.addEventListener('focusin',e=>{ const el=target(e); if(el&&el.matches(':focus-visible')) show(el); });
  document.addEventListener('focusout',hide);
  addEventListener('scroll',()=>{ if(!cur) return; if(Date.now()-tTouch>1200) hide(); else if(cur.isConnected) place(cur); },true);
  document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&cur) hide(); });
  document.addEventListener('pointerdown',e=>{ if(e.pointerType!=='touch') return; tTouch=Date.now(); if(cur) hide(); return; const el=target(e); if(!el) return; show(el); clearTimeout(tTimer); tTimer=setTimeout(()=>{ if(Date.now()-tTouch>=1900) hide(); },2000); },true);
  document.addEventListener('click',()=>{ if(cur&&Date.now()-tTouch>700) hide(); },true);
})();
/* ---------- page scroll indicator on top (native page scrollbar hidden) ---------- */
(()=>{
  const bar=$('#sprog'), fillEl=bar.querySelector('i');
  const upd=()=>{ const max=document.documentElement.scrollHeight-innerHeight; const p=max>0?scrollY/max:0; fillEl.style.width=(p*100).toFixed(2)+'%'; bar.classList.toggle('show',max>40); };
  addEventListener('scroll',upd,{passive:true}); addEventListener('resize',upd);
  new ResizeObserver(upd).observe(document.body);
  bar.addEventListener('click',e=>{ const max=document.documentElement.scrollHeight-innerHeight; window.scrollTo({top:max*(e.clientX/innerWidth),behavior:'smooth'}); });
  upd();
})();


/* footer wordmark: exactly as wide as the footer content */
(()=>{
  const box=$('#footWord'), sv=box&&box.querySelector('.fw-svg'), tx=sv&&sv.querySelector('.fw-t'); if(!tx) return;
  /* viewBox = the word's advance width × its ink height (cap top → baseline), so the svg scales to the content width */
  const fit=()=>{ try{ const b=tx.getBBox(); if(!b.width) return;
      const cs=getComputedStyle(tx), c=document.createElement('canvas').getContext('2d');
      c.font=`${cs.fontWeight} 1000px ${cs.fontFamily}`; try{c.fontStretch='semi-expanded';}catch(_){}
      const m=c.measureText('CODE'), asc=(m.actualBoundingBoxAscent||720)+6, dsc=Math.max(4,(m.actualBoundingBoxDescent||0)+4);
      sv.setAttribute('viewBox',`${b.x.toFixed(1)} ${(-asc).toFixed(1)} ${b.width.toFixed(1)} ${(asc+dsc).toFixed(1)}`); }catch(_){} };
  fit(); addEventListener('resize',fit); if(document.fonts&&document.fonts.ready) document.fonts.ready.then(fit);
  new ResizeObserver(fit).observe(box);
})();


/* ---------- guide: every position of the matrix explained ---------- */
const GD={
A:{k:'A',t:'Візитна картка',ch:'Сахасрара · фізика',s:'Як вас бачать люди: характер «назовні», перше враження',calc:'День народження. Якщо число більше 22 — додаємо його цифри.',
 what:'Ліва вершина особистого квадрата. Це ваш портрет для світу: манера поведінки, стиль спілкування, перше враження, яке ви справляєте.',
 role:'Відповідає за взаємодію «я і соціум», за ролі, у яких вас бачать інші, і за те, як ви заявляєте про себе в новій компанії чи на роботі.',
 life:'У плюсі допомагає легко знаходити свої людей і свою справу: образ збігається із суттю. У мінусі людина носить маску, грає чужу роль і втомлюється від спілкування.',
 work:'Подивіться на плюс і мінус енергії і чесно відмітьте, що з цього про вас. Проявляйте якості плюса там, де вас бачать: у роботі, соцмережах, знайомствах.'},
A1:{k:'A1',t:'Як ви подаєте себе',ch:'Аджна · фізика',s:'Як ви взаємодієте з людьми і яким себе показуєте',calc:'A + A2',
 what:'Друга точка на лінії особистості, між візиткою і центром. Показує, як ви подаєте себе в цьому житті.',
 role:'Відповідає за ясність бачення, вміння ставити цілі й обирати, з ким і як взаємодіяти. У карті здоров’я — фізичний рівень чакри Аджна.',
 life:'Коли енергія в плюсі, ви розумієте, чого хочете, і впевнено доносите це людям. У мінусі — розгубленість, сумніви, складність із вибором.',
 work:'Записуйте цілі, перевіряйте інтуїтивні рішення, тренуйте вміння говорити про себе так, як ви є.'},
A2:{k:'A2',t:'Глибинна якість особистості',ch:'Вішудха · фізика',s:'Те, як ви самовиражаєтесь і що відкривається з досвідом',calc:'A + E (точка, ближча до центру)',
 what:'Третя точка лінії особистості. Якість, яка відкривається з роками, коли ви вже знаєте себе краще.',
 role:'Відповідає за самовираження, голос, комунікацію, право говорити про своє. У карті здоров’я — горло й Вішудха.',
 life:'У плюсі — вміння ясно говорити, творити, бути почутим. У мінусі — невисловлене, «ком у горлі», страх висловитися.',
 work:'Говоріть про свої потреби вголос, пишіть, співайте, створюйте — дайте цій якості вихід.'},
A3:{k:'♡',t:'Бажання вашого серця',ch:'Анахата · фізика',s:'Чого насправді прагне ваше серце',calc:'A2 + E',
 what:'Точка Анахати на лінії Землі, найближча до центру ліворуч. Показує щирі бажання серця.',
 role:'Відповідає за любов до себе й до людей, прийняття, здатність відчувати радість і тепло.',
 life:'Якщо бажання серця реалізовуються — з’являються сили й відчуття, що життя ваше. Якщо ігноруються — порожнеча, хоча зовні все «правильно».',
 work:'Щотижня робіть щось лише тому, що хочеться серцю. Практика вдячності й прощення відкриває цю точку.'},
B:{k:'B',t:'Головний талант',ch:'Сахасрара · енергія',s:'Ваш дар від народження, те, що вас надихає',calc:'Місяць народження',
 what:'Верхня вершина особистого квадрата, «лінія Неба». Дар, з яким ви прийшли.',
 role:'Відповідає за натхнення, духовність, головні здібності. Через цю енергію найлегше отримувати ресурс від світу.',
 life:'Коли талант використовується, життя відчувається наповненим, з’являються визнання й гроші. Коли ні — апатія і відчуття «не своєї справи».',
 work:'Визначте, де ця енергія вже проявлялася у вашому житті, і зробіть її частиною роботи чи хобі.'},
B1:{k:'B1',t:'Прихований талант',ch:'Аджна · енергія',s:'Талант, який дістався вам із минулого життя — його варто розвивати',calc:'B + B2',
 what:'Друга точка на лінії талантів. За методом — дар із минулого втілення, який сам не проявляється.',
 role:'Відповідає за глибинні здібності, які стають помітними, коли ви свідомо їх розвиваєте.',
 life:'Розвинений прихований талант часто стає другою професією або джерелом сили в кризі.',
 work:'Пробуйте справи, пов’язані з цією енергією, навчайтеся, шукайте наставника в цій темі.'},
B2:{k:'B2',t:'Талант, що зростає з роками',ch:'Вішудха · енергія',s:'Дар, який розкривається через досвід і самовираження',calc:'B + E',
 what:'Третя точка лінії талантів, ближча до центру.',
 role:'Відповідає за те, як ваш дар звучить у світі: творчість, слово, спосіб ділитися.',
 life:'У плюсі — ви знаходите свій голос і формат. У мінусі — талант «застрягає» всередині.',
 work:'Діліться: публікуйте, викладайте, показуйте результати своєї творчості.'},
B3:{k:'♡',t:'Що відкриває серце',ch:'Анахата · енергія',s:'Через що наповнюється ваша серцева енергія',calc:'B2 + E',
 what:'Точка Анахати на лінії Неба, найближча до центру зверху.',
 role:'Відповідає за енергію любові, співчуття і близькості — те, що наповнює серце.',
 life:'Коли ви живите серце цією енергією, з’являються легкість і бажання любити. Без неї — замкненість і холод.',
 work:'Додайте в життя те, що дає ця енергія: людей, справи, місця, від яких тепло.'},
C:{k:'C',t:'Матеріальна точка',ch:'Муладхара · фізика',s:'Ваш ресурс і ставлення до грошей і матеріального',calc:'Сума цифр року народження (до 22)',
 what:'Права вершина особистого квадрата. Матеріальний світ: гроші, тіло, побут, безпека.',
 role:'Відповідає за те, де брати ресурс і як ви поводитесь з матеріальним.',
 life:'У плюсі гроші приходять через цю енергію. У мінусі — блоки, втрати, страх нестачі.',
 work:'Порівняйте свою роботу з якостями енергії: чим ближче — тим легше заробляти.'},
C1:{k:'C1',t:'Матеріальна карма',ch:'',s:'Що заважає заробляти — програма з минулого',calc:'C + C2',
 what:'Середня точка на правій лінії. За методом — матеріальний борг або блок із минулого.',
 role:'Відповідає за повторювані фінансові сценарії: втрати, нестачу, страх грошей.',
 life:'Поки програма в мінусі, гроші «витікають» схожим чином. Опрацьована — стає стабільністю.',
 work:'Знайдіть повторюваний фінансовий сценарій і змініть у ньому одну дію; працюйте з мінусом цієї енергії.'},
C2:{k:'C2',t:'Вхід у канал грошей',ch:'Свадхістана · фізика',s:'Що ви вже вмієте і через що найлегше заробляти',calc:'C + E',
 what:'Точка на правій лінії, ближча до центру. Початок лінії фінансів.',
 role:'Відповідає за перший крок до грошей: діяльність, з якої варто починати.',
 life:'Коли ви працюєте в цій енергії, дохід росте природно. Коли ні — заробіток вимагає надзусиль.',
 work:'Оберіть справу, близьку до плюса цієї енергії, і зробіть її основою заробітку.'},
D:{k:'D',t:'Кармічне завдання',ch:'Муладхара · енергія',s:'Головний урок втілення, нижня точка',calc:'A + B + C',
 what:'Нижня вершина особистого квадрата. Зовнішня точка кармічного хвоста.',
 role:'Відповідає за головний урок життя і досвід минулого втілення, з яким ви прийшли.',
 life:'У мінусі проявляється як повторювані складні ситуації. У плюсі — як мудрість і опора.',
 work:'Прочитайте мінус енергії як список сценаріїв, які варто перестати повторювати, і свідомо обирайте плюс.'},
D1:{k:'D1',t:'Середина кармічного хвоста',ch:'',s:'Як програма минулого проявляється зараз',calc:'D + D2',
 what:'Середня точка кармічного хвоста.',
 role:'Показує, через які ситуації і риси нагадує про себе кармічна програма.',
 life:'Це «тригер»: коли вмикається мінус цієї енергії, запускається старий сценарій.',
 work:'Помічайте мінус цієї енергії в собі — це сигнал свідомо вчинити інакше.'},
D2:{k:'D2',t:'Вхід у канал стосунків',ch:'Свадхістана · енергія',s:'Що заважає чи допомагає будувати здорові стосунки; ваша сексуальність',calc:'D + E',
 what:'Точка на нижній лінії, ближча до центру. Задача кармічного хвоста і початок лінії стосунків.',
 role:'Відповідає за те, як ви входите в близькість, за сексуальність і внутрішню силу.',
 life:'У мінусі — схожі проблеми з різними партнерами. У плюсі — гармонійна близькість і довіра.',
 work:'Подивіться, які мінуси цієї енергії повторюються у ваших стосунках, і працюйте з ними.'},
E:{k:'E',t:'Зона комфорту',ch:'Маніпура',s:'Ваш внутрішній ресурс і характер, центр матриці',calc:'A + B + C + D',
 what:'Центр матриці — ядро особистості, де сходяться всі лінії.',
 role:'Відповідає за базовий стан, у якому вам добре і з якого ви черпаєте сили.',
 life:'Коли центр у плюсі, ви почуваєтеся собою й маєте енергію на все інше. У мінусі — дисбаланс усієї матриці.',
 work:'Щодня робіть хоча б одну дію в енергії центру — це найкоротший шлях до ресурсу.'},
E2:{k:'E2',t:'Сила роду',ch:'',s:'Центр родового квадрата — те, що дає вам рід',calc:'F + G + H + I',
 what:'Друга точка центру — сума чотирьох родових кутів.',
 role:'Відповідає за силу, яку ви отримуєте від роду, і за родову основу характеру.',
 life:'У плюсі — відчуття підтримки й коріння. У мінусі — тягар родових сценаріїв.',
 work:'Дізнайтеся історію роду, прийміть батьків, візьміть від роду найкраще.'},
E3:{k:'E3',t:'Центральна програма',ch:'',s:'Як сила роду стає вашим особистим ядром',calc:'E + E2',
 what:'Третя точка центру — сума зони комфорту й сили роду.',
 role:'Показує, як родова енергія переплавляється у ваш характер.',
 life:'Ця енергія часто звучить як «внутрішній голос», що веде за характером.',
 work:'Розгляньте трійку центру як програму: прочитайте її плюс і мінус і оберіть плюс.'},
F:{k:'F',t:'Духовна карма по роду батька',ch:'',s:'Що передає рід батька на духовному рівні (вік 10 років)',calc:'A + B',
 what:'Лівий верхній кут родового квадрата.',
 role:'Відповідає за цінності, віру й духовні завдання чоловічої лінії роду.',
 life:'Проявляється в тому, як ви ставитеся до правил, віри, авторитетів.',
 work:'Подумайте, які цінності батьківського роду ви несете, і залиште ті, що вам служать.'},
G:{k:'G',t:'Духовна карма по роду матері',ch:'',s:'Що передає рід матері на духовному рівні (вік 30 років)',calc:'B + C',
 what:'Правий верхній кут родового квадрата.',
 role:'Відповідає за духовні завдання й таланти жіночої лінії роду.',
 life:'Проявляється в інтуїції, почуттях і ставленні до турботи.',
 work:'Прийміть дари материнського роду і звільніться від того, що обмежує.'},
H:{k:'H',t:'Матеріальна карма по роду батька',ch:'',s:'Гроші, справа й матеріальне від роду батька (вік 50 років)',calc:'C + D',
 what:'Правий нижній кут родового квадрата.',
 role:'Відповідає за ставлення до грошей, роботи й статусу, яке йде від батька.',
 life:'Повторювані сценарії з грошима часто родом звідси.',
 work:'Порівняйте свої фінансові звички зі звичками батьківського роду.'},
I:{k:'I',t:'Матеріальна карма по роду матері',ch:'',s:'Побут, дім і матеріальне від роду матері (вік 70 років)',calc:'D + A',
 what:'Лівий нижній кут родового квадрата.',
 role:'Відповідає за ставлення до дому, тіла, побуту й безпеки по материнській лінії.',
 life:'Проявляється в тому, як ви облаштовуєте життя і піклуєтеся про себе.',
 work:'Оберіть, які материнські сценарії побуту лишити, а які змінити.'},
ROD:{k:'Р',t:'Родові програми',ch:'',s:'Внутрішні точки родових діагоналей',calc:'Кут + E2, тобто сила роду (ближня до центру); кут + ця точка (середня)',
 what:'Точки на діагоналях між родовими кутами і центром.',
 role:'Показують, як енергія кута роду розгортається всередині вашого життя.',
 life:'Разом із кутом складають родову програму — сценарій, що передається поколіннями.',
 work:'Читайте кут і дві точки як програму: плюс — ресурс роду, мінус — те, що варто завершити.'},
X:{k:'X',t:'Баланс фінансів і стосунків',ch:'',s:'Точка перетину лінії любові й лінії грошей',calc:'C2 + D2',
 what:'Точка, де сходяться канал грошей і канал стосунків.',
 role:'Відповідає за баланс між роботою й любов’ю, між «заробити» і «бути поруч».',
 life:'Коли баланс порушено, одна сфера росте коштом іншої.',
 work:'Перевірте, чи не жертвуєте однією сферою заради іншої, і вирівняйте час і увагу.'},
MON:{k:'₴',t:'Що примножує гроші',ch:'',s:'Що допоможе примножити фінанси, сфери реалізації',calc:'C2 + X',
 what:'Середня точка каналу грошей.',
 role:'Показує якість, яка робить дохід стабільним і зростаючим.',
 life:'Розвинена енергія тут — ключ до росту, а не лише до заробітку.',
 work:'Розвивайте цю якість свідомо: навчання, нові формати, масштаб.'},
LOV:{k:'♥',t:'Ваш ідеальний партнер',ch:'',s:'Яка людина вам підходить і чого не вистачає вашому роду',calc:'D2 + X',
 what:'Середня точка каналу стосунків.',
 role:'Показує образ партнера, з яким вам гармонійно, і якості, які варто розвинути в собі.',
 life:'Ви тягнетеся до людей з цією енергією; якщо вона в мінусі — повторюються складні стосунки.',
 work:'Розвивайте якості цієї енергії в собі — тоді поруч з’являються відповідні люди.'}
};
const guideKey=id=>/^[FGHI][12]$/.test(id)?'ROD':id;
function guideGeneral(){
  const groups=[[_t("Особистість і таланти"),['A','A1','A2','A3','B','B1','B2','B3']],[_t("Центр"),['E','E2','E3']],[_t("Гроші й карма"),['C','C1','C2','D','D1','D2']],[_t("Любов і гроші"),['X','MON','LOV']],[_t("Рід"),['F','G','H','I','ROD']]];
  return `<div class="det fade">
    <div class="side-h" style="padding:0 0 10px">${_t("про матрицю")}</div>
    <h3 class="g-h">${_t("Що таке Матриця долі")}</h3>
    <p>${_t("Метод самопізнання, у якому дата народження перетворюється на схему з 22 енергій — Старших Арканів Таро. Кожна позиція схеми відповідає за свою сферу: характер, таланти, гроші, стосунки, рід, кармічні завдання.")}</p>
    <h4>${_t("Звідки взялася")}</h4>
    <p>${_t("Метод відомий з 2006 року завдяки українці Наталії Ладіні. Він поєднує нумерологію, символіку 22 Старших Арканів і психологічне бачення архетипів. Усі числа отримують лише з дати народження: дня, місяця й року.")}</p>
    <h4>${_t("Як побудована схема")}</h4>
    ${UL([_t("Особистий квадрат (ромб): візитка, таланти, матеріальне, кармічне завдання"),_t("Родовий квадрат: чотири кути — духовна й матеріальна карма по роду батька й матері"),_t("Центр: зона комфорту, сила роду і центральна програма"),_t("Лінія Неба (вертикаль) і лінія Землі (горизонталь) — основа особистого призначення"),_t("Кармічний хвіст — три нижні енергії: минуле втілення і задача на це життя"),_t("Канал грошей і канал стосунків — лінія з «₴» і «♥» праворуч унизу"),_t("Вікове коло — енергії кожного року від 0 до 80")])}
    <h4>${_t("Як працювати з інструментом")}</h4>
    <ol class="qs">${[_t("Розрахуйте матрицю й почніть з центру — це ваша база."),_t("Знайдіть енергії, що повторюються: їхні уроки звучать сильніше."),_t("Читайте кожну позицію в плюсі й мінусі — і чесно відмічайте, що з цього про вас."),_t("Опрацьовуйте мінус маленькими конкретними діями, а не лише розумінням."),_t("Повертайтеся до прогнозу року й енергії дня, щоб планувати темп.")].map(x=>`<li>${x}</li>`).join('')}</ol>
    <div class="pos-box soft"><h4>${_t("Важливо")}</h4><p>${_t("Матриця — дзеркало для рефлексії, а не прогноз, вирок чи діагноз. У питаннях здоров’я, грошей і стосунків спирайтеся на фахівців.")}</p></div>
    <h4>${_t("Позиції схеми")}</h4><p class="small muted">${_t("Наведіть на точку на схемі, щоб побачити коротко, або натисніть — щоб прочитати детально.")}</p>
    ${groups.map(([t,ids])=>`<div class="g-grp"><em>${t}</em><div class="chips">${ids.map(id=>`<button class="chip" type="button" data-gid="${id}"><b style="--c:${id==='ROD'?'var(--line)':chipCol(id)}">${GD[id].k}</b>${GD[id].t}</button>`).join('')}</div></div>`).join('')}
  </div>`;
}
function guideDetail(key){
  const g=GD[key], col=key==='ROD'?'var(--accent)':chipCol(key);
  const P=STATE&&STATE.P&&STATE.mode==='solo'?STATE.P:null, v=P&&key!=='ROD'?P[key]:null;
  return `<div class="det fade">
    <div class="det-top"><div class="det-num" style="--c:${col}">${g.k}</div><div class="det-title"><h3>${g.t}</h3><small>${g.ch?g.ch+' · ':''}${g.s}</small></div><button class="x" id="gClose" type="button" aria-label="${_t("Закрити")}">${XICON}</button></div>
    ${guideProgBtns(key)}
    ${v?`<div class="pos-box"><h4>${_t("У вашій матриці")}</h4><p>${v} · ${ARC[v].n}. ${posText(key,v,STATE.g||'f')}</p><button class="btn ghost sm" type="button" id="gOpen">${_t("Відкрити трактування ↗")}</button></div>`:''}
    <h4>${_t("Про що позиція")}</h4><p>${g.what}</p>
    <h4>${_t("За що відповідає")}</h4><p>${g.role}</p>
    <h4>${_t("Як впливає на життя")}</h4><p>${g.life}</p>
    <div class="pos-box soft"><h4>${_t("Як пропрацювати")}</h4><p>${g.work}</p></div>
    <h4>${_t("Як рахується")}</h4><p class="g-calc">${g.calc}</p>
  </div>`;
}

/* ---------- guide: programs (lines of three positions) ---------- */
const XCALC={SKY:'B + D (вертикаль: таланти + кармічне завдання)',EARTH:'A + C (горизонталь: особистість + матеріальне)',PERS:'Небо + Земля',MALE:'F + H (кути роду батька)',FEM:'G + I (кути роду матері)',SOC:'чоловіча лінія + жіноча лінія'};
const XLAB={SKY:'Лінія Неба',EARTH:'Лінія Землі',PERS:'Особисте призначення',MALE:'Чоловіча лінія роду',FEM:'Жіноча лінія роду',SOC:'Соціальне призначення'};
const PGD={
 cen:{s:'Ядро характеру: зона комфорту, сила роду і як вони сплавляються',about:'Головна програма матриці. Вона описує, як родова сила (E2) через центральну програму (E3) стає вашою зоною комфорту (E) — станом, у якому ви почуваєтеся собою.',infl:'Забарвлює весь характер і загальний енергетичний фон; від неї залежить, звідки ви берете сили і як реагуєте на стрес.',read:'Читайте зліва направо: що дає рід → як це переплавляється → яким стає ваше ядро. Плюс програми — ваша природна опора, мінус — перше, що «вилазить» під тиском.',work:'Щодня робіть хоча б одну дію в енергії центру й відмічайте, коли вмикається мінус програми.'},
 tail:{s:'Минуле втілення і завдання на це життя',al:'Кармічний хвіст',about:'Кармічна програма з трьох нижніх точок. D — досвід минулого втілення, D1 — як він проявляється зараз у повторюваних сценаріях, D2 — завдання, яке потрібно опрацювати.',infl:'Вмикається з дитинства: повторювані ситуації, страхи, «невидимі стіни». Сильно впливає на стосунки й на те, де ви застрягаєте.',read:'D — корінь, D1 — механізм повтору, D2 — вихід. Іменні програми (наприклад «Воїн») мають готовий опис.',work:'Помічайте повтор сценарію, називайте його і свідомо робіть дію в плюсі енергії D2.'},
 mat:{s:'Ставлення до грошей і матеріального, що прийшло з минулого',about:'Кармічна програма матеріальної сфери: C — матеріальна карма, C1 — як вона проявляється, C2 — вхід у канал грошей.',infl:'Переконання про гроші, «стелю» доходу, страх втрат або, навпаки, легкість у матеріальному.',read:'C — що принесено, C1 — як це звучить у вашому досвіді, C2 — двері, через які гроші заходять у життя.',work:'Випишіть свої переконання про гроші й порівняйте з мінусом програми — це те, що варто змінити.'},
 tal:{s:'Як розкриваються ваші здібності',about:'Лінія талантів по вертикалі зверху: B — головний дар від Неба, B1 — як він розвивається, B2 — глибинний талант.',infl:'Сфери, в яких вам легко, професію, хобі, у чому вас помічають.',read:'Від зовнішнього до глибинного: B видно одразу, B2 розкривається, коли ви вже впевнено користуєтеся верхнім талантом.',work:'Оберіть одну навичку з енергії B і практикуйте її регулярно — так «відмикаються» глибші рівні.'},
 pers:{s:'Ваш характер і як вас бачать',about:'Лінія особистості зліва: A — візитна картка, A1 — як ви розкриваєтеся з досвідом, A2 — глибинна якість зрілості.',infl:'Перше враження, реакції, поведінку в новій компанії та на роботі.',read:'A — маска, яку бачать інші, A1 — що проявляється з часом, A2 — найглибший шар особистості.',work:'Порівняйте, як вас описують інші, з плюсом і мінусом A — і свідомо підсилюйте плюс.'},
 money:{s:'Як ви заробляєте і що примножує дохід',about:'Канал грошей: C2 — вхід у грошовий потік, ₴ — що примножує гроші, X — баланс фінансів і стосунків.',infl:'Сфери заробітку, стиль роботи з грошима, що допомагає рости в доході.',read:'Вхід (як гроші приходять) → множник (що їх збільшує) → баланс (чим ви за це платите в інших сферах).',work:'Розвивайте якість енергії ₴ і перевіряйте точку X: чи не росте дохід коштом стосунків.'},
 love:{s:'Як ви кохаєте і хто вам підходить',about:'Канал стосунків: D2 — як ви будуєте стосунки, ♥ — ваш ідеальний партнер, X — баланс любові й грошей.',infl:'Сценарії в парі, тип людей, яких ви притягуєте, що руйнує і що живить близькість.',read:'Ваш стиль у стосунках → образ партнера → баланс зі сферою грошей.',work:'Розвивайте в собі якості енергії ♥ — тоді поруч з’являються відповідні люди.'},
 rf1:{s:'Духовна програма роду батька (10 років)',about:'Родова діагональ від кута F до центру: кут — що передає рід батька на духовному рівні, внутрішні точки — як це розгортається у вашому житті.',infl:'Цінності, віра, ставлення до правил і авторитетів; часто звучить у віці близько 10 років.',read:'Кут → середня точка → точка біля центру: від родового до особистого.',work:'Подумайте, які цінності батьківського роду ви несете, і залиште ті, що вам служать.'},
 rm1:{s:'Духовна програма роду матері (30 років)',about:'Родова діагональ від кута G: духовні завдання й таланти жіночої лінії роду.',infl:'Інтуїцію, почуття, ставлення до турботи; часто загострюється близько 30 років.',read:'Кут → середня точка → точка біля центру: як дари материнського роду стають вашими.',work:'Прийміть дари материнського роду і звільніться від того, що обмежує.'},
 rf2:{s:'Матеріальна програма роду батька (50 років)',about:'Родова діагональ від кута H: гроші, справа і статус від чоловічої лінії.',infl:'Фінансові звички, ставлення до роботи й досягнень; яскраво звучить близько 50 років.',read:'Кут → середня точка → точка біля центру: як родовий досвід з грошима проявляється у вас.',work:'Порівняйте свої фінансові сценарії з батьківськими і змініть ті, що повторюють мінус.'},
 rm2:{s:'Матеріальна програма роду матері (70 років)',about:'Родова діагональ від кута I: дім, тіло, побут і безпека по материнській лінії.',infl:'Як ви облаштовуєте життя, піклуєтеся про себе і відчуваєте безпеку; звучить близько 70 років.',read:'Кут → середня точка → точка біля центру.',work:'Оберіть, які материнські сценарії побуту лишити, а які змінити.'},
 fl:{s:'Чоловіча лінія роду',about:'Програма з двох кутів роду батька (F і H) та їхньої суми — чоловічої лінії.',infl:'Ставлення до чоловіків, сили, відповідальності, справи; соціальне призначення після 40 років.',read:'Духовний кут → матеріальний кут → підсумок лінії роду.',work:'Прийміть батька таким, яким він є, і візьміть силу чоловічої лінії.'},
 ml:{s:'Жіноча лінія роду',about:'Програма з двох кутів роду матері (G і I) та їхньої суми — жіночої лінії.',infl:'Ставлення до жінок, турботи, дому, почуттів; соціальне призначення після 40 років.',read:'Духовний кут → матеріальний кут → підсумок лінії роду.',work:'Прийміть маму і жіночу лінію — це відкриває ресурс турботи й інтуїції.'},
 pp:{s:'Завдання самореалізації до 40 років',about:'Особисте призначення: лінія Неба (вертикаль) і лінія Землі (горизонталь) та їхня сума.',infl:'Пошук себе, балансу між духовним і матеріальним до 40 років.',read:'Небо (духовне) + Земля (матеріальне) = чого ви вчитеся першу половину життя.',work:'Шукайте справу, де поєднуються таланти (Небо) й матеріальний результат (Земля).'},
 sp:{s:'Завдання в суспільстві після 40 років',about:'Соціальне призначення: чоловіча й жіноча лінії роду та їхня сума.',infl:'Роль у суспільстві, родині, команді після 40 років; що ви передаєте іншим.',read:'Чоловіча лінія + жіноча лінія = ваша соціальна роль.',work:'Подумайте, яку користь ваш досвід може дати іншим людям.'}
};
const PROG_ROLES=['Корінь програми','Як розгортається','Зовнішній прояв'];
function progsOfKey(key){ const ids=key==='ROD'?['F1','F2','G1','G2','H1','H2','I1','I2']:[key]; return LINES.filter(L=>L.ids.some(i=>ids.includes(i))); }
const posName=id=>GD[guideKey(id)]?(guideKey(id)==='ROD'?`${_f("Родова точка {0}",[id])}`:GD[id].t):(XLAB[id]||id);
const posCalc=id=>GD[guideKey(id)]?(guideKey(id)==='ROD'?(/1$/.test(id)?`${_f("{0} + {1}2 (середня точка)",[id[0],id[0]])}`:`${_f("{0} + E2 (точка біля центру)",[id[0]])}`):GD[id].calc):(XCALC[id]||'');
function guideProgBtns(key){
  const L=progsOfKey(key); if(!L.length) return '';
  return `<div class="sph-progs">${L.map(l=>`<button class="pgo-b sph-p" type="button" data-gprog="${l.k}"><span class="pgo-l">${_t("Дивитися програму")}</span><b>${l.ids.join('-')}</b><em>${l.t}</em><i aria-hidden="true">↗</i></button>`).join('')}</div>`;
}
function guideProgDetail(k){
  const L=LINES.find(l=>l.k===k), d=PGD[k]||{}, P=STATE&&STATE.P&&STATE.mode==='solo'?STATE.P:null;
  const from=G_FROM&&G_FROM!=='prog:'+k?G_FROM:null;
  return `<div class="det fade">
    <div class="det-top"><div class="det-num code" style="--c:${L.karmic?'var(--p-red)':'var(--accent)'}">${L.ids.join('-')}</div><div class="det-title"><h3>${L.t}</h3><small>${d.s||L.ctx}</small></div><button class="x" id="gClose" type="button" aria-label="${_t("Закрити")}">${XICON}</button></div>
    ${from?`<button class="btn ghost sm g-back" type="button" data-gid="${from}">← ${GD[from]?GD[from].t:_t("Назад")}</button>`:''}
    <h4>${_t("Позиції програми")}</h4>
    <div class="g-prog">${L.ids.map((id,i)=>{const gk=guideKey(id), clickable=!!GD[gk]; return `<${clickable?'button type="button" data-gid="'+gk+'"':'div'} class="g-pp"><b style="--c:${GD[gk]?chipCol(id):'var(--line)'}">${id}</b><span><em>${PROG_ROLES[i]}</em><strong>${posName(id)}</strong><small>${posCalc(id)}</small></span>${P&&P[id]?`<i>${P[id]} · ${ARC[P[id]].n}</i>`:''}</${clickable?'button':'div'}>`;}).join('<span class="g-arr" aria-hidden="true">↓</span>')}</div>
    <h4>${_t("Про що програма")}</h4><p>${d.about||L.ctx}</p>
    <h4>${_t("На що впливає")}</h4><p>${d.infl||''}</p>
    <h4>${_t("Як читати")}</h4><p>${d.read||''}</p>
    ${L.karmic?`<div class="pos-box"><h4>${_t("Кармічна програма")}</h4><p>${_t("Прийшла з минулого досвіду і вмикається в повторюваних ситуаціях. Її мінус — те, що варто завершити, плюс — ресурс після опрацювання.")}</p></div>`:''}
    ${L.any?`<p class="small muted">${_t("Іменні назви для цієї програми шукаються за будь-яким порядком енергій.")}</p>`:''}
    <div class="pos-box soft"><h4>${_t("Як пропрацювати")}</h4><p>${d.work||''}</p></div>
    <h4>${_t("Як рахується")}</h4><p class="g-calc">${L.ids.map(id=>`${id} = ${posCalc(id)}`).join('<br>')}</p>
    ${P?`<div class="pos-box"><h4>${_t("У вашій матриці")}</h4><p>${_f("Програма {0}: {1}",[L.ids.map(id=>P[id]).join('-'),progText(getProg(k)).h])}</p></div>`:''}
  </div>`;
}
let G_FROM=null;
let G_SEL=null;
function renderGuide(){
  const sec=$('#guide');
  const gp=G_SEL&&G_SEL.startsWith('prog:')?LINES.find(l=>l.k===G_SEL.slice(5)):null, GSH=isSheet()&&!!G_SEL;
  let svg=svgMatrix(null,new Set(gp?gp.ids:G_SEL?(G_SEL==='ROD'?['F1','F2','G1','G2','H1','H2','I1','I2']:[G_SEL]):[]),false,true);
  svg=svg.replace(/data-id="([A-Z0-9]+)" tabindex="0" role="button" aria-label=""/g,(m,id)=>{const g=GD[guideKey(id)];return g?`data-id="${id}" tabindex="0" role="button" aria-label="${g.t}" data-tip="${g.t} — ${g.s}"`:m;});
  svg=svg.replace(/(<g class="pt[^"]*"[^>]*data-id="([A-Z0-9]+)"[^>]*>)((?:<circle[^>]*\/>)+)<\/g>/g,(m,open,id,circ)=>{const gg=GD[guideKey(id)]; if(!gg) return m; const [x,y]=coord(id), r=ptR(id), fs=Math.max(9,Math.min(16,r*.62)); return `${open}${circ}<text x="${x.toFixed(1)}" y="${(y+fs*.36).toFixed(1)}" text-anchor="middle" font-size="${fs.toFixed(1)}">${gg.k===_t("Р")?'·':gg.k}</text></g>`;});
  sec.innerHTML=`<div class="res-head fade"><div><div class="title-row"><h2>${_t("Шпаргалка <b>по матриці</b>")}</h2></div><div class="meta">${_t("Розбір усіх позицій · метод Наталії Ладіні")}</div></div></div>
    <div class="grid"><div class="panel mx fade" id="gLeft"><div class="mx-sc">${svg}</div>
      <div class="legend"><span>${_t("<i style=\"--c:var(--p-violet)\"></i>Сахасрара")}</span><span>${_t("<i style=\"--c:var(--p-blue)\"></i>Аджна")}</span><span>${_t("<i style=\"--c:var(--p-green)\"></i>Анахата")}</span><span>${_t("<i style=\"--c:var(--p-gold)\"></i>Маніпура")}</span><span>${_t("<i style=\"--c:var(--p-rose)\"></i>Свадхістана")}</span><span>${_t("<i style=\"--c:var(--p-red)\"></i>Муладхара")}</span><span>${_t("<i style=\"--c:var(--surface-solid);box-shadow:inset 0 0 0 1px var(--line)\"></i>Інші позиції")}</span></div></div>
      <aside class="panel side" id="gSide">${GSH?guideGeneral():gp?guideProgDetail(gp.k):G_SEL?guideDetail(G_SEL):guideGeneral()}</aside></div>`;
  let roots=[sec];
  if(GSH){ roots.push(sheetOpen(gp?guideProgDetail(gp.k):guideDetail(G_SEL),()=>{G_SEL=null;G_FROM=null;renderGuide();})); } else sheetClose();
  if(G_SEL) sec.querySelector('svg').classList.add('has-sel');
  if(gp){ const pts=gp.ids.filter(i=>{try{return !!coord(i)}catch(_){return false}}).map(i=>coord(i)); if(pts.length>1&&!gp.ids.some(i=>XLAB[i])){ const hl=sec.querySelector('#hl'); if(hl) hl.innerHTML=`<polyline class="hl-line" points="${pts.map(p=>p.map(n=>n.toFixed(1)).join(',')).join(' ')}"/>`; } }
  const left=$('#gLeft');
  left.addEventListener('click',e=>{const p=e.target.closest('.pt[data-id]'); if(p){ G_SEL=guideKey(p.dataset.id); renderGuide(); if(innerWidth<=980&&!isSheet()) $('#gSide').scrollIntoView({behavior:'smooth',block:'start'}); }});
  left.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('.pt[data-id]')){e.preventDefault();G_SEL=guideKey(e.target.dataset.id);renderGuide();}});
  roots.forEach(R=>{
  R.querySelectorAll('[data-gid]').forEach(b=>b.addEventListener('click',()=>{G_SEL=b.dataset.gid;renderGuide();}));
  R.querySelectorAll('[data-gprog]').forEach(b=>b.addEventListener('click',()=>{ G_FROM=G_SEL; G_SEL='prog:'+b.dataset.gprog; renderGuide(); const sd=$('#gSide'); if(sd&&!isSheet()){ sd.scrollTop=0; if(innerWidth<=980) sd.scrollIntoView({behavior:'smooth',block:'start'}); } }));
  const gc=R.querySelector('#gClose'); if(gc) gc.addEventListener('click',()=>{G_SEL=null;renderGuide();});
  });
  const go=roots[roots.length-1].querySelector('#gOpen'); if(go) go.addEventListener('click',()=>{ sheetClose(); const id=G_SEL; sec.hidden=true; $('#result').hidden=false; STATE.view='matrix'; render(); openDet({type:'arc',id}); window.scrollTo({top:0,behavior:'smooth'}); });
}
function showGuide(){ closeDrawer(); hideTarot(); $('#home').hidden=true; $('#result').hidden=true; $('#guide').hidden=false; G_SEL=null; renderGuide(); placeForm(); window.scrollTo({top:0,behavior:'smooth'}); }
document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&G_SEL&&!$('#guide').hidden){ G_SEL=null; renderGuide(); } });


/* ---------- "Читати більше": full structured read in a modal, personal vs couple context ---------- */
const sChip=(v,col)=>`<span class="chip static"><b style="--c:${col||'var(--accent)'}">${v}</b>${ARC[v].n}</span>`;
const PLAN_DAYS=['Дні 1–3','Дні 4–7','Дні 8–12','Дні 13–17','Дні 18–21'];
const planList=a=>`<ol class="plan">${a.plan.map((x,i)=>`<li><em>${PLAN_DAYS[i]}</em><span>${x}</span></li>`).join('')}</ol>`;
const affBox=a=>`<blockquote class="aff">«${a.aff}»</blockquote>`;
const deepList=a=>UL(a.deep);
const relTo=(v,w)=>ARC[v].harm.includes(w)||ARC[w].harm.includes(v)?'h':ARC[v].tens.includes(w)||ARC[w].tens.includes(v)?'t':'n';
function relBlock(v){
  const P=STATE&&STATE.P, a=ARC[v];
  const mk=(arr,cls)=>`<div class="chips">${arr.map(w=>`<span class="chip static${P&&DRAWN.some(i=>P[i]===w)?' here':''}"><b style="--c:${cls}">${w}</b>${ARC[w].n}</span>`).join('')}</div>`;
  return `<div class="two-col"><div><h5 class="ok">${_t("Підсилює")}</h5>${mk(a.harm,'var(--p-green)')}</div><div><h5 class="no">${_t("Створює напругу")}</h5>${mk(a.tens,'var(--p-red)')}</div></div>${P?_t("<p class=\"small muted\">Підсвічені аркани є у вашій матриці.</p>"):''}`;
}
function centreLink(v){
  const P=STATE.P, c=P.E; if(v===c) return `<p>${_t("Ця енергія збігається з центром матриці — вона звучить у всьому житті, її плюси й мінуси подвоюються.")}</p>`;
  const rel=relTo(v,c), cn=nm(c);
  if(rel==='h') return `<p>${_f("Центр матриці — {0}. Ці енергії підсилюють одна одну: коли ви в ресурсі центру, легше проживати й цю позицію в плюсі.",[cn])}</p>`;
  if(rel==='t') return `<p>${_f("Центр матриці — {0}. Між цими енергіями є напруга: те, що комфортно центру ({1}), може конфліктувати з цією позицією ({2}). Саме тут народжуються внутрішні суперечності — і саме тут найбільше зростання.",[cn,ARC[c].kw.slice(0,2).join(', '),ARC[v].kw.slice(0,2).join(', ')])}</p>`;
  return `<p>${_f("Центр матриці — {0}. Ці енергії працюють незалежно: позиція розвивається своїм шляхом, а центр дає загальний фон — {1}.",[cn,ARC[c].kw.slice(0,2).join(_t(" і "))])}</p>`;
}
function sec(t,html){ return {t,html}; }
function moreArc(id){
  const P=STATE.P, v=P[id], a=ARC[v], g=gender(), pair=isPair(), gd=typeof GD!=='undefined'?GD[guideKey(id)]:null;
  const reps=DRAWN.filter(i=>P[i]===v), inP=progs().filter(p=>p.ids.includes(id));
  const S=[];
  S.push(sec(_t("Коротко"),`<p class="lead-m">${posText(id,v,g)}</p><p>${a.d}</p><div class="kw">${a.kw.map(x=>`<span>${x}</span>`).join('')}</div>`));
  if(gd) S.push(sec(pair?_t("Про цю позицію в парі"):_t("Про цю позицію"),`<p>${gd.what}</p><h5>${_t("За що відповідає")}</h5><p>${gd.role}</p><h5>${_f("Як впливає на {0}",[pair?_t("союз"):_t("життя")])}</h5><p>${gd.life}</p><p class="small muted">${_f("Як рахується: {0}",[gd.calc])}</p>`));
  if(pair){
    const v1=STATE.P1[id], v2=STATE.P2[id], n1=esc(STATE.a.n||T('p1')), n2=esc(STATE.b.n||T('p2'));
    S.push(sec(_t("Звідки ця енергія у вашій парі"),`<div class="chips">${sChip(v1,'var(--p-blue)')}<span class="plus">+</span>${sChip(v2,'var(--p-violet)')}<span class="plus">=</span>${sChip(v,chipCol(id))}</div>
      <div class="mini-prog"><b>${n1}</b> <span>${T('p1')}</span><p>${nm(v1)} — ${ARC[v1].kw.slice(0,3).join(', ')}.</p></div><div class="mini-prog"><b>${n2}</b> <span>${T('p2')}</span><p>${nm(v2)} — ${ARC[v2].kw.slice(0,3).join(', ')}.</p></div>
      <p style="margin-top:14px">${_f("Коли ви разом, ці енергії складаються в {0} — так звучить ця сфера саме у вашій парі, а не в кожного окремо.",[nm(v)])}</p>
      ${v1===v2?`<p>${_f("У вас однакова енергія в цій позиції — ви добре розумієте одне одного тут, але й слабкі сторони {0} у парі подвоюються.",[ARC[v1].n])}</p>`:relTo(v1,v2)==='t'?`<p>${_f("Між вашими енергіями тут є напруга: {0} і {1} по-різному бачать цю сферу. Це зона, де варто домовлятися свідомо.",[ARC[v1].n,ARC[v2].n])}</p>`:relTo(v1,v2)==='h'?`<p>${_t("Ваші енергії тут підсилюють одна одну — це природна точка опори союзу.")}</p>`:''}`));
    S.push(sec(_t("Як енергія звучить між вами"),`<div class="pm"><div class="pp"><h4>${_t("Коли союз у плюсі")}</h4><p>${a.pr.p}</p></div><div class="pp minus"><h4>${_t("Коли союз у мінусі")}</h4><p>${a.pr.m}</p></div></div><h5>${_t("Типовий конфлікт")}</h5><p>${a.pr.c}</p><h5>${_t("Що робити разом")}</h5>${UL(a.pr.t)}`));
  }
  S.push(sec(_t("Символіка й архетип"),`<div class="sym-art"><div><p><b>${a.sym}.</b> ${a.img}</p></div>${arcFig(v)}</div>`));
  if(!pair) S.push(sec(_t("Як енергія формується"),`<p>${a.origin}</p>`));
  S.push(sec(_t("Як проживається"),`<p>${a.live}</p>${two(a)}<h5>${_t("Приховані сценарії")}</h5>${deepList(a)}`));
  S.push(sec(_t("Причини й наслідки"),`${causeList(a)}`));
  S.push(sec(pair?_t("У контексті вашої пари"):_t("У контексті вашої матриці"),`${id!=='E'?centreLink(v):''}
    ${reps.length>1?`<p>${_f("Енергія {0} стоїть у {1} позиціях: {2}. Повтор посилює її уроки — те, що проявляється в одній сфері, луною відгукується в інших.",[v,reps.length,reps.map(i=>posLabel(i)).join('; ')])}</p>`:''}
    ${inP.length?`<h5>${_t("Програми з цією позицією")}</h5>${inP.map(p=>{const tx=progText(p);return `<div class="mini-prog"><b>${p.vals.join('-')}</b> <span>${p.named?`«${PN(p.named)}» · `:''}${p.t}</span><p>${tx.h}</p></div>`}).join('')}`:''}`));
  S.push(sec(_t("Сфери життя"),`<div class="two-col"><div><h5>${_t("Робота · у плюсі")}</h5><p>${a.work.p}</p></div><div><h5>${_t("Робота · у мінусі")}</h5><p>${a.work.m}</p></div></div>
    <h5>${_t("Гроші")}</h5><p>${cap(a.money)}.</p><h5>${_t("Стосунки")}</h5><p>${cap(a.love)}.</p><h5>${_t("Тіло й ресурс")}</h5><p>${a.hp}. ${a.hm}. ${a.body}</p>
    <h5>${_t("Де реалізується")}</h5><div class="tags">${a.prof.split(LSPLIT).map(x=>`<span>${x}</span>`).join('')}</div>`));
  S.push(sec(_t("Енергії-союзники й напруга"),relBlock(v)));
  S.push(sec(_t("Як пропрацювати"),`${fixList(a)}<h5>${_t("Щоденні кроки")}</h5>${UL(a.how)}<h5>${_t("План на 21 день")}</h5>${planList(a)}`));
  S.push(sec(pair?_t("Ви впізнаєте свій союз, якщо…"):_t("Ви впізнаєте себе, якщо…"),`${UL(a.rec)}<h5>${_f("Питання для {0}",[pair?_t("розмови вдвох"):_t("себе")])}</h5>${qList(a)}`));
  S.push(sec(_t("Опора"),`${affBox(a)}${pair?'':`<h5>${g==='f'?_t("Для жінки"):_t("Для чоловіка")}</h5><p>${g==='f'?a.f:a.mm}</p>`}`));
  return {num:v,col:chipCol(id),title:a.n,sub:`${posLabel(id)}${pair?_t(" · сумісність"):''}`,S};
}
function moreCat(v){
  const a=ARC[v], P=STATE.P, g=gender(), pair=isPair(), S=[];
  S.push(sec(_t("Коротко"),`<p class="lead-m">${a.d}</p><div class="kw">${a.kw.map(x=>`<span>${x}</span>`).join('')}</div>`));
  if(P){ const pos=DRAWN.filter(i=>P[i]===v); S.push(sec(pair?_t("У вашій парі"):_t("У вашій матриці"),pos.length?`${pos.map(i=>`<div class="mini-prog"><b>${posLabel(i)}</b><p>${posText(i,v,g)}</p></div>`).join('')}`:`<p>${_f("У схемі {0} цього аркана немає. Він може звучати в роках або програмах — і тоді приходить як зовнішній урок.",[pair?_t("пари"):_t("вашої матриці")])}</p>`)); }
  S.push(sec(_t("Символіка й архетип"),`<div class="sym-art"><div><p><b>${a.sym}.</b> ${a.img}</p></div>${arcFig(v)}</div>`));
  S.push(sec(_t("Як енергія формується"),`<p>${a.origin}</p>`));
  S.push(sec(_t("Як проживається"),`<p>${a.live}</p>${two(a)}<h5>${_t("Приховані сценарії")}</h5>${deepList(a)}`));
  S.push(sec(_t("Причини й наслідки"),causeList(a)));
  S.push(sec(_t("Сфери життя"),`<div class="two-col"><div><h5>${_t("Робота · у плюсі")}</h5><p>${a.work.p}</p></div><div><h5>${_t("Робота · у мінусі")}</h5><p>${a.work.m}</p></div></div><h5>${_t("Гроші")}</h5><p>${cap(a.money)}.</p><h5>${_t("Стосунки")}</h5><p>${cap(a.love)}.</p><h5>${_t("Тіло й ресурс")}</h5><p>${a.hp}. ${a.hm}. ${a.body}</p>`));
  S.push(sec(_t("У парі"),`<div class="pm"><div class="pp"><h4>${_t("Коли союз у плюсі")}</h4><p>${a.pr.p}</p></div><div class="pp minus"><h4>${_t("Коли союз у мінусі")}</h4><p>${a.pr.m}</p></div></div><h5>${_t("Типовий конфлікт")}</h5><p>${a.pr.c}</p><h5>${_t("Що робити разом")}</h5>${UL(a.pr.t)}`));
  S.push(sec(_t("Як енергія року"),`<p>${cap(YR[v])}.</p><div class="two-col"><div><h5 class="ok">${_t("Сценарії в плюсі")}</h5>${UL(a.yp)}</div><div><h5 class="no">${_t("Сценарії в мінусі")}</h5>${UL(a.ym)}</div></div>`));
  S.push(sec(_t("Енергії-союзники й напруга"),relBlock(v)));
  S.push(sec(_t("Як пропрацювати"),`${fixList(a)}<h5>${_t("План на 21 день")}</h5>${planList(a)}`));
  S.push(sec(_t("Ви впізнаєте себе, якщо…"),`${UL(a.rec)}<h5>${_t("Питання для себе")}</h5>${qList(a)}`));
  S.push(sec(_t("Опора"),`${affBox(a)}<div class="two-col"><div><h5>${_t("Для жінки")}</h5><p>${a.f}</p></div><div><h5>${_t("Для чоловіка")}</h5><p>${a.mm}</p></div></div>`));
  return {num:v,col:'var(--accent)',title:a.n,sub:`${_f("{0} аркан · {1}",[v,a.sym])}`,S};
}
function moreProg(k){
  const pr=getProg(k), tx=progText(pr), As=pr.vals.map(v=>ARC[v]), pair=isPair(), S=[];
  const roles=[_t("Корінь програми"),_t("Як розгортається"),_t("Зовнішній прояв")];
  const yrRoles=[_t("Енергія року"),_t("Протилежна точка"),_t("Підсумок року")];
  const Ui=pr.vals.map((v,i)=>i).filter(i=>pr.vals.indexOf(pr.vals[i])===i), Au=Ui.map(i=>As[i]), twice=v=>pr.vals.filter(x=>x===v).length;
  S.push(sec(_t("Коротко"),`<p class="lead-m">${tx.h}</p><div class="chips">${pr.vals.map(v=>sChip(v)).join('<span class="plus">→</span>')}</div>`));
  S.push(sec(_t("У плюсі й у мінусі"),`<div class="pm"><div class="pp"><h4>${_t("У плюсі")}</h4><p>${tx.p}</p></div><div class="pp minus"><h4>${_t("У мінусі")}</h4><p>${tx.m}</p></div></div>`));
  S.push(sec(_t("Кожна енергія програми"),Ui.map(i=>{ const a=As[i], n=twice(pr.vals[i]); return `<div class="mini-prog"><b>${pr.vals[i]} · ${a.n}</b> <span>${n>1?(n===3?_t("стоїть у всіх трьох позиціях"):_t("стоїть двічі — тема подвоєна")):(pr.ids?roles:yrRoles)[i]}</span><p>${a.live}</p><h5>${_t("Приховані сценарії")}</h5>${UL(a.deep.slice(0,2))}</div>`; }).join('')));
  const pairs=[[0,1],[1,2],[0,2]].map(([x,y])=>({x,y,r:relTo(pr.vals[x],pr.vals[y])}));
  const tension=pairs.filter(p=>p.r==='t'), support=pairs.filter(p=>p.r==='h');
  S.push(sec(_t("Динаміка всередині програми"),`<div class="chain"><div>${_t("<em>У мінусі</em>")}<p>${As.map(a=>a.m.split(LSPLIT)[0].replace(/\.$/,'').toLowerCase()).join(' <i>→</i> ')}</p></div><div>${_t("<em>У плюсі</em>")}<p>${As.map(a=>a.p.split(LSPLIT)[0].replace(/\.$/,'').toLowerCase()).join(' <i>→</i> ')}</p></div></div>
    ${tension.length?`<p>${_f("Внутрішня напруга: {0}. Тут програма «смикає» в різні боки — саме ця суперечність найчастіше запускає мінус.",[tension.map(p=>`${_f("{0} і {1}",[As[p.x].n,As[p.y].n])}`).join('; ')])}</p>`:''}
    ${support.length?`<p>${_f("Внутрішня опора: {0}. Через цю зв’язку програму найлегше вивести в плюс.",[support.map(p=>`${_f("{0} і {1}",[As[p.x].n,As[p.y].n])}`).join('; ')])}</p>`:''}`));
  if(pair) S.push(sec(_t("Як програма звучить у парі"),_f("{0}<h5>Що робити разом</h5>{1}",[As.map((a,i)=>`<div class="mini-prog"><b>${a.n}</b><p>${a.pr.p}</p><p class="small">${_f("<b>Ризик:</b> {0}",[lc(a.pr.m)])}</p></div>`).join(''),UL(As.map(a=>a.pr.t[0]))])));
  else S.push(sec(_t("Звідки береться програма"),`<p>${As[0].origin}</p><p class="small muted">${_t("Програма вмикається, коли повторюються обставини, схожі на ті, у яких вона сформувалася.")}</p>`));
  S.push(sec(_t("Ознаки, що програма активна"),UL((pr.named?pr.named.m.replace(/\.$/,'').split(LSPLIT):[]).concat(Au.flatMap(a=>a.m.replace(/\.$/,'').split(LSPLIT).slice(0,Au.length===1?4:2))).concat(Au.map(a=>a.deep[2]||'')).slice(0,9))));
  S.push(sec(_t("Як пропрацювати"),`<p>${tx.w}</p>${fixList(As[0])}<h5>${_t("План на 21 день")}</h5><ol class="plan">${PLAN_DAYS.map((d,i)=>`<li><em>${d}</em><span>${As[i%3].plan[i]}</span></li>`).join('')}</ol>`));
  S.push(sec(_t("Ресурс після опрацювання"),UL((pr.named?pr.named.p.replace(/\.$/,'').split(LSPLIT):[]).concat(Au.flatMap(a=>a.p.replace(/\.$/,'').split(LSPLIT).slice(0,Au.length===1?4:2))).slice(0,9))));
  S.push(sec(_t("Питання й опора"),`${qList({q:Au.flatMap(a=>a.q.slice(0,Au.length===1?3:Au.length===2?2:1))})}${affBox(As[2])}`));
  return {num:pr.vals.join('-'),col:pr.named?'var(--accent)':pr.karmic?'var(--p-red)':'var(--p-blue)',title:pr.named?`«${PN(pr.named)}»`:`${_f("Програма {0}",[pr.vals.join('-')])}`,sub:`${pr.t}${pair?_t(" · сумісність"):''}${pr.named&&pr.named.alt?` · «${pr.named.alt}»`:''}`,S,code:true};
}
function moreYear(a){
  const P=STATE.P, t=P.YEARS[a], As=t.map(v=>ARC[v]), pr=yearProg(a), tx=progText(pr), S=[], O=occ(t);
  const prev=P.YEARS[(a+79)%80], next=P.YEARS[(a+1)%80];
  S.push(sec(_t("Коротко"),`<p class="lead-m">${cap(YR[t[0]])}.</p><p>${As[0].live}</p>`));
  S.push(sec(_t("Як рік розгортається"),[[_t("Початок року"),0,_t("головна тема й перші події")],[_t("Середина року"),1,_t("виклик і протилежна сфера")],[_t("Завершення року"),2,_t("підсумок, до якого рік підводить")]].map(([h,i,n])=>`<div class="mini-prog"><b>${h} · ${t[i]} ${As[i].n}</b> <span>${n}</span><p>${O[i][0]?_f("Енергія {0} повторюється — у цій частині року вона розкривається через {1}.",[As[i].n,lc(i===2?(As[i].task||As[i].d):(As[i].work&&As[i].work.p||As[i].d))]):cap(YR[t[i]])+'.'}</p><div class="two-col"><div><h5 class="ok">${_t("Імовірно в плюсі")}</h5>${UL(share(As[i].yp,...O[i]))}</div><div><h5 class="no">${_t("Імовірно в мінусі")}</h5>${UL(share(As[i].ym,...O[i]))}</div></div></div>`).join('')));
  S.push(sec(_t("Причини й наслідки року"),`<ul class="cz">${uniq(As.flatMap(x=>x.cause.slice(0,2))).map(c=>{const p=c.split(' — ');return `<li><span>${p[0]}</span><i aria-hidden="true">→</i><span>${p.slice(1).join(' — ')}</span></li>`}).join('')}</ul>`));
  S.push(sec(_t("Сфери року"),`<h5>${_t("Робота й гроші")}</h5><p>${_f("{0} У мінусі: {1}",[As[0].work.p,lc(As[0].work.m)])}</p><h5>${_t("Стосунки")}</h5><p>${cap(As[0].love)}. ${As[1].pr.c}</p><h5>${_t("Тіло й ресурс")}</h5><p>${As[0].hp}. ${As[0].body}</p>`));
  S.push(sec(_t("Зв’язок із сусідніми роками"),`<p>${_f("Ви заходите в цей рік із програми {0} ({1}) — те, що не завершилося там, продовжиться тут. Наступний рік — {2} ({3}): {4}. Цей рік — підготовка до нього.",[prev.join('-'),ARC[prev[0]].n,next.join('-'),ARC[next[0]].n,YR[next[0]]])}</p>`));
  S.push(sec(_t("Як прожити рік"),`<p>${tx.w}</p>${UL(uniq(As.flatMap(x=>x.yw.slice(0,2))))}<h5>${_t("План на перші 21 день року")}</h5>${planList(As[0])}`));
  S.push(sec(_t("Питання й опора"),`${qList(As[0])}${affBox(As[0])}`));
  return {num:a,col:a===curAge()?'var(--accent)':'var(--p-blue)',title:`${_f("Вік {0}{1}",[a,a===curAge()?_t(" · зараз"):''])}`,sub:`${_f("Програма року {0}",[t.join('-')])}`,S};
}
function moreDay(key){
  const dt=STATE.day, I=personalDay(dt), v=key==='all'?I.T.E:key==='me'?I.pd:I.sph[+key.slice(1)], a=ARC[v], S=[];
  S.push(sec(_t("Коротко"),`<p class="lead-m">${cap(DAY[v])}.</p><p>${a.live}</p>`));
  S.push(sec(_t("План дня"),`<div class="mini-prog">${_t("<b>Ранок</b>")}<p>${a.how[0]}.</p></div><div class="mini-prog">${_t("<b>День</b>")}<p>${cap(DAY[v].split(': ')[1]||DAY[v])}. ${a.how[1]}.</p></div><div class="mini-prog">${_t("<b>Вечір</b>")}<p>${_f("Запитайте себе: {0}",[lc(a.q[0])])}</p></div>`));
  S.push(sec(_t("Сфери дня"),DSPH.map((s,i)=>`<div class="mini-prog"><b>${s.t} · ${I.sph[i]} ${ARC[I.sph[i]].n}</b> <span>${LVLW[LEVEL[I.sph[i]]]}</span><p>${cap(DAY[I.sph[i]])}.</p></div>`).join('')));
  S.push(sec(_t("Що вдасться й на що зважати"),_f("{0}<h5>Приховані пастки дня</h5>{1}",[two(a),deepList(a)])));
  S.push(sec(_t("Опора дня"),affBox(a)));
  return {num:v,col:'var(--accent)',title:a.n,sub:`${fmtD(dt)} · ${key==='me'?_t("ваша енергія дня"):key==='all'?_t("енергія дати"):DSPH[+key.slice(1)].t}`,S};
}
function moreChak(i){
  const P=STATE.P, {rows,total}=chakraRows(P), S=[];
  if(i===7){
    const t=total;
    [[_t("Фізика"),t.ph],[_t("Енергія"),t.en],[_t("Емоції"),t.em]].forEach(([h,v])=>S.push(sec(`${h} · ${ARC[v].n}`,`<p>${ARC[v].hp}. ${ARC[v].hm}.</p><p>${ARC[v].body}</p>${planList(ARC[v])}`)));
    S.push(sec(_t("Опора"),affBox(ARC[t.em])));
    return {num:t.em,col:'var(--accent)',title:_t("Енергополе"),sub:_t("Загальний енергетичний стан"),S};
  }
  const c=CHAK[i], x=rows[i];
  S.push(sec(_t("Про чакру"),`<p class="lead-m">${cap(c.t)}.</p><p>${_f("Зона тіла — {0}. Що підтримує: {1}.",[c.z,c.pr])}</p>`));
  [[_t("Фізика · лінія Землі"),x.ph],[_t("Енергія · лінія Неба"),x.en],[_t("Емоції · сума"),x.em]].forEach(([h,v])=>S.push(sec(`${h} · ${ARC[v].n}`,`<p>${ARC[v].hp}. ${ARC[v].hm}.</p><p>${ARC[v].body}</p><h5>${_t("Приховані сценарії")}</h5>${deepList(ARC[v])}`)));
  S.push(sec(_t("Як підтримати чакру"),`${UL([c.pr,ARC[x.ph].how[0],ARC[x.en].how[0],ARC[x.em].how[0]])}<h5>${_t("План на 21 день")}</h5>${planList(ARC[x.em])}`));
  S.push(sec(_t("Опора"),`${affBox(ARC[x.em])}<p class="small muted">${_t("Карта здоров’я — модель самопізнання, а не медична діагностика.")}</p>`));
  return {num:x.em,col:c.c,title:c.n,sub:_t("Карта здоров’я"),S};
}
/* sphere-level "Читати більше": the whole sphere — every arcana in its position, recognition, practical steps */
function sphList(){
  const {P,g,name}=STATE, sp=isPair()?pairSpheres():spheres(P,g,name), all=progs();
  sp.splice(3,0,{t:_t("Програми"),k:"Програми",s:`${_f("{0} ліній · {1} іменних",[all.length,all.filter(p=>p.named).length])}`,raw:true});
  return sp;
}
const SPH_FOCUS={
  'Особистість':['Як це проявляється в характері',a=>`${a.pers}`],
  'Як пару бачать інші':['Як це бачать люди',a=>`${a.pers}`],
  'Таланти':['Який дар дає',a=>`${_f("{0}. Де реалізується: {1}.",[cap(a.tal),a.prof])}`],
  'Спільні таланти':['Що вдається разом',a=>`${_f("{0}. Спільні справи: {1}.",[cap(a.tal),a.prof])}`],
  'Кармічний хвіст':['Кармічний досвід і задача',a=>`${_f("{0}. Задача: {1}.",[cap(a.karma),a.task])}`],
  'Кармічна програма пари':['Кармічний досвід і задача',a=>`${_f("{0}. Спільна задача: {1}.",[cap(a.karma),a.task])}`],
  'Гроші':['Як впливає на гроші',a=>`${_f("{0}. {1} У мінусі: {2}",[cap(a.money),a.work.p,lc(a.work.m)])}`],
  'Гроші пари':['Як впливає на спільні гроші',a=>`${cap(a.money)}. ${a.work.p}`],
  'Стосунки':['Як впливає на стосунки',a=>`${cap(a.love)}. ${a.pr.p}`],
  'Кохання й близькість':['Як впливає на близькість',a=>`${cap(a.love)}. ${a.pr.p}`],
  'Рід':['Що передає рід',a=>`${_f("{0} У плюсі рід дає: {1}",[a.origin,lc(a.p)])}`],
  'Призначення':['Про що призначення',a=>`${_f("{0}. Задача: {1}.",[cap(a.pur),a.task])}`],
  'Навіщо ви зустрілися':['Про що спільна місія',a=>`${cap(a.pur)}.`],
  'Ресурс і здоров’я':['Ресурс і тіло',a=>`${a.hp}. ${a.hm}. ${a.body}`],
  'Енергія союзу':['Атмосфера союзу',a=>`${cap(a.love)}. ${a.pr.p}`],
  'Кожен у парі':['Що приносить у союз',a=>`${a.pers} ${cap(a.love)}.`],
  'Ризики й ключ до гармонії':['Де ризик для союзу',a=>`${_f("{0} Типовий конфлікт: {1}",[a.pr.m,lc(a.pr.c)])}`]
};
function sphItems(s){
  if(s.ids&&s.ids.length) return s.ids.map(id=>({id,v:STATE.P[id],lab:posLabel(id),col:chipCol(id)}));
  const {P1,P2,a,b}=STATE;
  return [{v:P1.E,lab:`${_f("{0} · центр",[esc(a.n||T('p1'))])}`,col:'var(--p-blue)'},{v:P2.E,lab:`${_f("{0} · центр",[esc(b.n||T('p2'))])}`,col:'var(--p-violet)'}];
}
function moreSphProgs(){
  const all=progs(), pair=isPair(), S=[];
  S.push(sec(_t("Коротко"),`<p class="lead-m">${_f("У {0} {1} ліній-програм, з них {2} іменних. Програма — це зв’язка з трьох енергій, яка вмикається в схожих обставинах і веде за знайомим сценарієм: у мінусі — повторювані труднощі, у плюсі — сильна сторона, на яку можна спертися.",[pair?_t("матриці пари"):_t("вашій матриці"),all.length,all.filter(p=>p.named).length])}</p>`));
  const named=all.filter(p=>p.named), karmic=all.filter(p=>!p.named&&p.karmic), rest=all.filter(p=>!p.named&&!p.karmic);
  const row=p=>{const tx=progText(p);return `<div class="mini-prog"><b>${p.vals.join('-')}</b> <span>${p.named?`«${PN(p.named)}» · `:''}${p.t}</span><p>${tx.h}</p><div class="pm"><div class="pp"><h4>${_t("У плюсі")}</h4><p>${tx.p}</p></div><div class="pp minus"><h4>${_t("У мінусі")}</h4><p>${tx.m}</p></div></div><h5>${_t("Як пропрацювати")}</h5><p>${tx.w}</p>${moreBtn('prog:'+p.k)}</div>`;};
  if(named.length) S.push(sec(_t("Іменні програми"),named.map(row).join('')));
  if(karmic.length) S.push(sec(_t("Кармічні програми"),karmic.map(row).join('')));
  if(rest.length) S.push(sec(_t("Програми ліній"),rest.map(row).join('')));
  const As=uniq(all.flatMap(p=>p.vals)).map(v=>ARC[v]);
  S.push(sec(pair?_t("Ви впізнаєте свій союз, якщо…"):_t("Ви впізнаєте себе, якщо…"),UL(uniq(As.map(a=>a.rec[0])).slice(0,8))));
  S.push(sec(_t("Як працювати з програмами"),UL([_t("Помічайте повтори: одна й та сама ситуація з різними людьми — ознака активної програми."),_t("Записуйте тригер, реакцію й наслідок — так сценарій стає видимим і втрачає силу."),_t("Почніть з однієї програми, найчастіше активної, а не з усіх одразу."),_t("Шукайте плюс програми: кожен мінус — перекручена сильна сторона тієї ж енергії."),_t("Через 21 день перевірте, що змінилося в реакціях, а не лише в обставинах.")])));
  return {num:all.length,col:'var(--accent)',title:_t("Програми"),sub:`${_f("{0} ліній{1}",[all.length,pair?_t(" · сумісність"):''])}`,S,code:true};
}
function moreSph(i){
  const sp=sphList(), s=sp[i]; if(!s) return moreChak(7);
  if(s.raw) return moreSphProgs();
  const pair=isPair(), g=gender(), it=sphItems(s), F=SPH_FOCUS[s.k||s.t]||[_t("Що дає ця енергія"),a=>a.pers], S=[];
  const As=uniq(it.map(x=>x.v)).map(v=>ARC[v]);
  S.push(sec(_t("Коротко"),`<p class="lead-m">${_f("{0}. Сферу «{1}» {2} формують {3} {4} — кожна у своїй позиції відповідає за окремий шар цієї сфери.",[s.s,s.t,pair?_t("у вашій парі"):_t("у вашій матриці"),it.length,it.length>4?_t("енергій"):_t("енергії")])}</p><div class="chips">${it.map(x=>sChip(x.v,x.col)).join('')}</div>`));
  it.forEach(x=>{
    const a=ARC[x.v], gd=x.id&&typeof GD!=='undefined'?GD[guideKey(x.id)]:null;
    const txt=x.id?(pair?pairPosText(x.id,x.v):posText(x.id,x.v,g)):a.pers;
    let pairBit='';
    if(pair&&x.id){ const v1=STATE.P1[x.id], v2=STATE.P2[x.id];
      pairBit=`<h5>${_t("Звідки в парі")}</h5><div class="chips">${sChip(v1,'var(--p-blue)')}<span class="plus">+</span>${sChip(v2,'var(--p-violet)')}<span class="plus">=</span>${sChip(x.v,x.col)}</div>${v1===v2?`<p>${_t("Тут у вас однакова енергія — ви легко розумієте одне одного, але її мінуси подвоюються.")}</p>`:relTo(v1,v2)==='t'?`<p>${_f("Між вашими енергіями тут напруга ({0} і {1}) — домовляйтеся про цю сферу свідомо.",[ARC[v1].n,ARC[v2].n])}</p>`:relTo(v1,v2)==='h'?`<p>${_t("Ваші енергії тут підсилюють одна одну — природна опора союзу.")}</p>`:''}`; }
    S.push(sec(`${x.lab} · ${x.v} ${a.n}`,`<p class="lead-m">${txt}</p>${gd?`<p class="small muted">${gd.role}</p>`:''}
      <h5>${F[0]}</h5><p>${F[1](a)}</p>${pairBit}
      <h5>${_t("Як проживається в цій позиції")}</h5><p>${a.live}</p>
      <div class="pm"><div class="pp"><h4>${_t("У плюсі")}</h4>${UL(a.p.replace(/\.$/,'').split(LSPLIT).slice(0,4))}</div><div class="pp minus"><h4>${_t("У мінусі")}</h4>${UL(a.m.replace(/\.$/,'').split(LSPLIT).slice(0,4))}</div></div>
      <h5>${_t("Прихований сценарій")}</h5>${UL(a.deep.slice(0,2))}
      <h5>${_t("Як вивести в плюс")}</h5>${UL([a.how[0],a.how[1]])}
      ${x.id?moreBtn('arc:'+x.id):moreBtn('cat:'+x.v)}`));
  });
  const vs=it.map(x=>x.v), links=[];
  for(let p=0;p<vs.length;p++) for(let q=p+1;q<vs.length;q++){ if(vs[p]===vs[q]) continue; const rl=relTo(vs[p],vs[q]); if(rl!=='n') links.push({p,q,rl}); }
  S.push(sec(_t("Як енергії сфери взаємодіють"),`${links.length?links.slice(0,6).map(l=>`<div class="mini-prog"><b>${ARC[vs[l.p]].n} + ${ARC[vs[l.q]].n}</b> <span>${l.rl==='h'?_t("підсилюють"):_t("напруга")}</span><p>${l.rl==='h'?`${_t("Ці енергії підтримують одна одну: коли одна в плюсі, друга теж легше розкривається. Це опора сфери — починайте зміни саме звідси.")}`:`${_f("Ці енергії тягнуть у різні боки: {0} проти {1}. Тут народжуються внутрішні суперечності — і тут найбільший потенціал зростання.",[ARC[vs[l.p]].kw[0],ARC[vs[l.q]].kw[0]])}`}</p></div>`).join(''):`<p>${_t("Енергії цієї сфери працюють незалежно: кожна розвивається своїм шляхом, тож опрацьовувати їх можна по черзі.")}</p>`}
    ${new Set(vs).size<vs.length?`<p>${_t("Деякі енергії повторюються — їхні уроки в цій сфері звучать гучніше.")}</p>`:''}`));
  const ks=SPH_PROGS[s.k||s.t]||(s.prog?[s.prog]:[]), prs=ks.map(getProg).filter(Boolean);
  if(prs.length) S.push(sec(_t("Програми сфери"),prs.map(p=>{const tx=progText(p);return `<div class="mini-prog"><b>${p.vals.join('-')}</b> <span>${p.named?`«${PN(p.named)}» · `:''}${p.t}</span><p>${tx.h}</p><div class="pm"><div class="pp"><h4>${_t("У плюсі")}</h4><p>${tx.p}</p></div><div class="pp minus"><h4>${_t("У мінусі")}</h4><p>${tx.m}</p></div></div>${moreBtn('prog:'+p.k)}</div>`;}).join('')));
  S.push(sec(pair?_t("Чи впізнаєте ви свій союз"):_t("Чи впізнаєте себе"),`<p>${pair?_t("Відмітьте, що з цього відбувається між вами:"):_t("Відмітьте, що з цього про вас:")}</p>${UL(uniq(As.flatMap(a=>a.rec.slice(0,2))).slice(0,8))}<h5>${_t("Приховані сценарії сфери")}</h5>${UL(uniq(As.map(a=>a.deep[0])))}<h5>${_t("Ознаки, що сфера в мінусі")}</h5>${UL(uniq(As.flatMap(a=>a.m.replace(/\.$/,'').split(LSPLIT).slice(0,1))))}`));
  S.push(sec(pair?_t("Як покращити життя пари"):_t("Як покращити життя в цій сфері"),`<h5>${_t("Що змінити в першу чергу")}</h5>${fixList({fix:uniq(As.flatMap(a=>a.fix.slice(0,2))).slice(0,6)})}
    <h5>${_t("Щоденні кроки")}</h5>${UL(uniq(As.flatMap(a=>a.how.slice(0,2))).slice(0,6))}
    ${pair?`<h5>${_t("Що робити разом")}</h5>${UL(uniq(As.map(a=>a.pr.t[0])))}`:''}
    <h5>${_t("План на 21 день")}</h5><ol class="plan">${PLAN_DAYS.map((d,k)=>`<li><em>${d}</em><span>${As[k%As.length].plan[k]}</span></li>`).join('')}</ol>`));
  S.push(sec(_t("Питання й опора"),`${qList({q:uniq(As.map(a=>a.q[0])).slice(0,5)})}${affBox(As[0])}${pair?'':`<h5>${g==='f'?_t("Для жінки"):_t("Для чоловіка")}</h5><p>${g==='f'?As[0].f:As[0].mm}</p>`}`));
  return {num:it[0].v,col:it[0].col,title:s.t,sub:`${s.s}${pair?_t(" · сумісність"):''}`,S};
}
function moreDoc(k){
  const S=[];
  if(k==='privacy'){
    S.push(sec(_t("Коротко"),`<p class="lead-m">${_t("CODE — прототип сервісу. Усі дані, які ви вводите, зберігаються лише у вашому браузері й нікуди не надсилаються.")}</p>`));
    S.push(sec(_t("Які дані ми зберігаємо"),UL([_t("Email, ім’я та пароль (у зашифрованому вигляді) — щоб ви могли увійти в кабінет"),_t("Дати народження, ім’я та стать — для розрахунку матриць"),_t("Збережені коди, обране та історію переглядів"),_t("Вибрану мову й тему")])));
    S.push(sec(_t("Де вони зберігаються"),`<p>${_t("У локальному сховищі вашого браузера на цьому пристрої. Ми не передаємо їх третім особам і не використовуємо для реклами. На іншому пристрої чи в іншому браузері ваших даних не буде.")}</p>`));
    S.push(sec(_t("Як видалити дані"),UL([_t("Видалити окремі коди чи всю історію — у кабінеті"),_t("Вийти з акаунта — кнопка «Вийти» в кабінеті"),_t("Повністю стерти — очистити дані сайту в налаштуваннях браузера")])));
    S.push(sec(_t("Контакти"),`<p>${_t("Питання щодо даних: hello@code.example").replace("hello@code.example",'<a class="mail-l" href="mailto:code.matrix.support@gmail.com?subject=CODE" target="_blank" rel="noopener">code.matrix.support@gmail.com</a>')}</p>`));
    return {num:'§',col:'var(--accent)',title:_t("Політика конфіденційності"),sub:_t("CODE · прототип"),S};
  }
  if(k==='terms'){
    S.push(sec(_t("Про сервіс"),`<p class="lead-m">${_t("CODE розраховує матрицю долі за методом Наталії Ладіні й пропонує трактування для самопізнання.")}</p>`));
    S.push(sec(_t("Що варто знати"),UL([_t("Трактування — інструмент самопізнання, а не прогноз, діагноз чи професійна порада"),_t("Карта здоров’я не замінює консультацію лікаря"),_t("Рішення щодо грошей, стосунків і здоров’я ви ухвалюєте самостійно")])));
    S.push(sec(_t("Ваш акаунт"),UL([_t("Ви відповідаєте за збереження свого пароля"),_t("Не вводьте чужі дані без згоди цих людей"),_t("Акаунт у прототипі прив’язаний до цього браузера")])));
    return {num:'§',col:'var(--accent)',title:_t("Умови використання"),sub:_t("CODE · прототип"),S};
  }
  S.push(sec(_t("Як розрахувати матрицю"),UL([_t("Введіть ім’я, стать і дату народження у формі та натисніть «Розрахувати»"),_t("Для пари оберіть «Сумісність» і введіть дані двох людей"),_t("Натисніть на будь-який аркан, щоб прочитати трактування")])));
  S.push(sec(_t("Кабінет"),UL([_t("Особисті дані підставлятимуться у форму автоматично"),_t("Збережені коди й обране — в один дотик"),_t("PDF-звіт можна завантажити для будь-якого коду")])));
  S.push(sec(_t("Не вдається увійти?"),UL([_t("Перевірте email і пароль: пароль — латиниця без пробілів"),_t("Акаунт працює лише в тому браузері, де його створено"),_t("Напишіть нам: hello@code.example").replace("hello@code.example",'<a class="mail-l" href="mailto:code.matrix.support@gmail.com?subject=CODE" target="_blank" rel="noopener">code.matrix.support@gmail.com</a>')])));
  return {num:'?',col:'var(--accent)',title:_t("Довідка"),sub:_t("Як користуватися CODE"),S};
}
const moreBtn=spec=>`<button class="more-link" type="button" data-more="${spec}">${_t("Читати більше")} <span aria-hidden="true">→</span></button>`;
let MORE_PREV=null;
function openMore(spec){
  const i=spec.indexOf(':'), t=spec.slice(0,i), v=spec.slice(i+1);
  const D=t==='arc'?moreArc(v):t==='cat'?moreCat(+v):t==='prog'?moreProg(v):t==='year'?moreYear(+v):t==='day'?moreDay(v):t==='sph'?moreSph(+v):t==='doc'?moreDoc(v):moreChak(+v);
  const m=$('#mdl');
  m.querySelector('.mdl-num').outerHTML=`<div class="mdl-num det-num${D.code?' code':''}" style="--c:${D.col}">${D.num}</div>`;
  $('#mdlT').textContent=D.title; $('#mdlS').textContent=D.sub;
  $('#mdlToc').innerHTML=D.S.map((s,k)=>`<button type="button" data-sec="${k}"><b>${String(k+1).padStart(2,'0')}</b>${s.t}</button>`).join('');
  setTimeout(()=>dedupeDOM($('#mdlBody')),0);
  $('#mdlBody').innerHTML=_f("{0}<p class=\"note\">Трактування — інструмент самопізнання за методом Матриці долі, а не прогноз чи діагноз.</p>",[D.S.map((s,k)=>`<section class="msec" id="msec${k}"><h3><b>${String(k+1).padStart(2,'0')}</b>${s.t}</h3>${s.html}</section>`).join('')]);
  if(t!=='doc') $('#mdlBody').insertAdjacentHTML('beforeend',aiAsk(spec));
  MORE_PREV=document.activeElement;
  m.hidden=false; document.documentElement.classList.add('mdl-on');
  { const bd=$('#mdlBody'), tc=$('#mdlToc'); bd.style.scrollBehavior='auto'; tc.style.scrollBehavior='auto'; bd.scrollTop=0; tc.scrollLeft=0; bd.style.scrollBehavior=''; tc.style.scrollBehavior=''; tc.querySelectorAll('.on').forEach(b=>b.classList.remove('on')); }
  requestAnimationFrame(()=>{ m.classList.add('in'); $('#mdlX').focus({preventScroll:true}); tocArrows(); tocSpy(); });
}
function tocArrows(){ const w=$('#mdlTocW'), n=$('#mdlToc'); if(!w||!n) return; w.classList.toggle('has-l',n.scrollLeft>4); w.classList.toggle('has-r',n.scrollLeft+n.clientWidth<n.scrollWidth-4); }
function tocSpy(){
  const body=$('#mdlBody'), secs=body.querySelectorAll('.msec'); if(!secs.length) return;
  let k=0; secs.forEach((x,i)=>{ if(x.offsetTop-body.scrollTop<=80) k=i; });
  if(body.scrollTop+body.clientHeight>=body.scrollHeight-4) k=secs.length-1;
  const n=$('#mdlToc'), btns=n.querySelectorAll('button'); if(!btns[k]||btns[k].classList.contains('on')) return;
  btns.forEach(b=>b.classList.toggle('on',b===btns[k]));
  const b=btns[k]; n.scrollTo({left:b.offsetLeft-(n.clientWidth-b.offsetWidth)/2,behavior:'smooth'});
}
(()=>{
  const n=document.getElementById('mdlToc'), body=document.getElementById('mdlBody'); if(!n) return;
  n.addEventListener('scroll',tocArrows,{passive:true});
  addEventListener('resize',tocArrows);
  body.addEventListener('scroll',()=>requestAnimationFrame(tocSpy),{passive:true});
  n.addEventListener('wheel',e=>{ if(Math.abs(e.deltaY)>Math.abs(e.deltaX)&&n.scrollWidth>n.clientWidth){ e.preventDefault(); n.style.scrollBehavior='auto'; n.scrollLeft+=e.deltaY; n.style.scrollBehavior=''; } },{passive:false});
  let sx=0, sl=0, down=false, moved=false;
  n.addEventListener('pointerdown',e=>{ if(e.pointerType!=='mouse'||e.button!==0) return; down=true; moved=false; sx=e.clientX; sl=n.scrollLeft; });
  addEventListener('pointermove',e=>{ if(!down) return; const dx=e.clientX-sx; if(!moved&&Math.abs(dx)>5){ moved=true; n.classList.add('drag'); } if(moved) n.scrollLeft=sl-dx; });
  addEventListener('pointerup',()=>{ if(!down) return; down=false; if(moved){ setTimeout(()=>n.classList.remove('drag'),0); } });
  document.getElementById('mdlTocW').addEventListener('click',e=>{ const a=e.target.closest('[data-toc]'); if(!a) return; n.scrollBy({left:+a.dataset.toc*n.clientWidth*.7,behavior:'smooth'}); });
})();
function closeMore(){
  const m=$('#mdl'); if(m.hidden) return;
  m.classList.remove('in'); document.documentElement.classList.remove('mdl-on');
  setTimeout(()=>{ m.hidden=true; },200);
  if(MORE_PREV&&MORE_PREV.focus) MORE_PREV.focus({preventScroll:true});
}
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-more]'); if(b){ e.preventDefault(); openMore(b.dataset.more); return; }
  const s=e.target.closest('#mdlToc [data-sec]'); if(s){ const el=$('#msec'+s.dataset.sec), body=$('#mdlBody'); body.scrollTo({top:el.offsetTop-12,behavior:'smooth'}); return; }
  if(e.target.closest('#mdlX')||e.target.classList.contains('mdl-bg')) closeMore();
});
document.addEventListener('keydown',e=>{
  const m=$('#mdl'); if(!m||m.hidden||document.querySelector('.aim-ov')) return;
  if(e.key==='Escape'){ e.preventDefault(); e.stopImmediatePropagation(); closeMore(); return; }
  if(e.key==='Tab'){
    const f=[...m.querySelectorAll('button,[href],[tabindex]:not([tabindex="-1"])')].filter(x=>!x.disabled&&x.offsetParent!==null);
    if(!f.length) return; const first=f[0], last=f[f.length-1];
    if(e.shiftKey&&document.activeElement===first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey&&document.activeElement===last){ e.preventDefault(); first.focus(); }
  }
},true);

/* ---------- starfield: stars appear at random points, twinkle, fade, reappear elsewhere ---------- */
(()=>{
  const cv=$('#sky'), cx=cv.getContext('2d'); let W,H,dpr,stars=[],rgb='226,230,255',alpha=.9,glow='',gold='',halo='';
  function readTheme(){const cs=getComputedStyle(document.documentElement);rgb=cs.getPropertyValue('--star').trim()||rgb;glow=cs.getPropertyValue('--star-glow').trim();gold=cs.getPropertyValue('--star-gold').trim();halo=cs.getPropertyValue('--star-halo').trim();alpha=parseFloat(cs.getPropertyValue('--star-alpha'))||alpha;}
  function size(){dpr=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0);}
  /* each star: soft dissolve-in → short hold → soft dissolve-out, then a new one appears elsewhere; new stars keep their distance from living ones */
  const ease=x=>x<=0?0:x>=1?1:x*x*x*(x*(x*6-15)+10);
  const reach=st=>st.shape?st.s*(st.shape===8?4:4.6)+14:st.s*4+10;
  function spawn(t,stagger){
    const roll=Math.random(), shape=roll<.14?4:roll<.24?6:roll<.3?8:0, sz=shape?2.2+Math.random()*3.8:.7+Math.random()*1.5;
    const me={s:sz,shape}; let x=0,y=0;
    for(let k=0;k<18;k++){ x=Math.random()*W; y=Math.random()*H; const r=reach(me);
      if(!stars.some(o=>o&&o!==me&&Math.hypot(o.x-x,o.y-y)<r+reach(o))) break; }
    const life=5000+Math.random()*7000;
    return{x,y,s:sz,shape,rot:Math.random()*Math.PI,
      t0:t+(stagger?-Math.random()*10000:Math.random()*1500),life,peak:.45+Math.random()*.55,
      fin:Math.min(.42,(2600+Math.random()*1000)/life),fout:Math.min(.45,(3000+Math.random()*1200)/life),
      tw:.0015+Math.random()*.003,ph:Math.random()*6.28,g:Math.random()<.3};
  }
  /* each star is pre-rendered once (glow included) and then only faded with globalAlpha:
     canvas shadows can switch off abruptly at very low opacity, a cached sprite fades linearly all the way into the background */
  function paint(c,s){
    const fc=(gold&&s.g)?gold:rgb, gc=glow||rgb;
    if(halo){const R=(s.shape?s.s*(s.shape===8?3.6:4.2):s.s*4.6),g=c.createRadialGradient(0,0,0,0,0,R);g.addColorStop(0,`rgba(${halo},.5)`);g.addColorStop(.3,`rgba(${halo},.18)`);g.addColorStop(.65,`rgba(${halo},.04)`);g.addColorStop(1,`rgba(${halo},0)`);c.fillStyle=g;c.beginPath();c.arc(0,0,R,0,7);c.fill();}
    c.fillStyle=`rgb(${fc})`;
    if(!s.shape){c.shadowColor=`rgba(${gc},${glow?.4:.9})`;c.shadowBlur=s.s*4;c.beginPath();c.arc(0,0,s.s,0,7);c.fill();}
    else{const n=s.shape,o=s.s*(n===8?2:2.6),i=s.s*.34;c.shadowColor=`rgba(${gc},${glow?.45:.95})`;c.shadowBlur=s.s*(glow?4.5:5);c.beginPath();
      for(let j=0;j<n*2;j++){const rr=j%2?i:(n===8&&j%4===2?o*.55:o),an=j*Math.PI/n;c.lineTo(Math.cos(an)*rr,Math.sin(an)*rr);}c.closePath();c.fill();
      c.beginPath();c.arc(0,0,s.s*.55,0,7);c.fill();}
  }
  function sprite(s){
    const R=Math.ceil(s.s*(s.shape?8:7)+12), d=dpr||1, c=document.createElement('canvas'); c.width=c.height=Math.ceil(R*2*d);
    const g=c.getContext('2d'); g.setTransform(d,0,0,d,R*d,R*d); paint(g,s); s.sp=c; s.R=R; s.key=rgb+halo+d; return c;
  }
  function drawStar(s,a){
    if(!s.sp||s.key!==rgb+halo+(dpr||1)) sprite(s);
    cx.save();cx.translate(s.x,s.y);cx.rotate(s.rot);cx.globalAlpha=Math.min(1,a*alpha);cx.drawImage(s.sp,-s.R,-s.R,s.R*2,s.R*2);cx.restore();
  }
  function frame(t){
    cx.clearRect(0,0,W,H);
    for(let n=0;n<stars.length;n++){let s=stars[n];let p=(t-s.t0)/s.life;
      if(p>1){stars[n]=s=spawn(t,false);p=(t-s.t0)/s.life;}
      if(p<0) continue;
      const env=Math.min(ease(p/s.fin),ease((1-p)/s.fout)), tw=.72+.28*Math.sin(t*s.tw+s.ph);
      if(env>.001) drawStar(s,env*tw*s.peak);}
    requestAnimationFrame(frame);
  }
  function init(){size();readTheme();const count=Math.round(Math.min(140,Math.max(50,W*H/12000)));const t=performance.now();stars=[];for(let n=0;n<count;n++)stars.push(spawn(t,true));}
  addEventListener('resize',()=>{const old=W;size();if(Math.abs(innerWidth-old)>200)init();});
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change',readTheme);
  new MutationObserver(readTheme).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  init(); requestAnimationFrame(frame);
})();
/* footer glow: slow drifting bounce (left → wall → right/up → wall → down …) */
(()=>{
  const ft=document.querySelector('.foot'), gl=ft&&ft.querySelector('.foot-glow'); if(!gl) return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){ gl.style.transform='translate3d(-50%,0,0)'; gl.style.left='50%'; gl.style.top='45%'; return; }
  let x=null,y=0,vx=-34,vy=-20,last=0,on=false,raf=0;
  const step=t=>{
    raf=0; if(!on) return;
    const dt=Math.min(.05,(t-(last||t))/1000); last=t;
    const W=ft.clientWidth,H=ft.clientHeight,w=gl.offsetWidth,h=gl.offsetHeight;
    const minX=-w*.35, maxX=W-w*.65, minY=-h*.25, maxY=H-h*.55;
    if(x===null){ x=(W-w)/2; y=maxY; }
    x+=vx*dt; y+=vy*dt;
    if(x<minX){x=minX;vx=Math.abs(vx);} if(x>maxX){x=maxX;vx=-Math.abs(vx);}
    if(y<minY){y=minY;vy=Math.abs(vy);} if(y>maxY){y=maxY;vy=-Math.abs(vy);}
    gl.style.transform=`translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;
    raf=requestAnimationFrame(step);
  };
  new IntersectionObserver(es=>{ on=es[0].isIntersecting; if(on&&!raf){ last=0; raf=requestAnimationFrame(step);} }).observe(ft);
})();
const TRX={"Триплет + дно колоди":["Triplet + bottom of the deck","Triplett + Boden des Decks","Triplet + fond du paquet","Triplete + fondo del mazo","Tripletta + fondo del mazzo"],
"Минуле, теперішнє, майбутнє і прихована основа ситуації — карта з дна колоди.":["Past, present, future and the hidden root of the situation — the card from the bottom of the deck.","Vergangenheit, Gegenwart, Zukunft und der verborgene Grund der Lage — die Karte vom Boden des Decks.","Passé, présent, futur et la racine cachée de la situation — la carte du fond du paquet.","Pasado, presente, futuro y la raíz oculta de la situación — la carta del fondo del mazo.","Passato, presente, futuro e la radice nascosta della situazione — la carta dal fondo del mazzo."],
"Дно колоди":["Bottom of the deck","Boden des Decks","Fond du paquet","Fondo del mazo","Fondo del mazzo"],
"Запитати карти в трактувальнику":["Ask the cards in the tarot reader","Die Karten im Tarot-Deuter fragen","Interroger les cartes dans l’interprète","Preguntar a las cartas en el intérprete","Chiedi alle carte nell’interprete"],
"Питання з матриці · {0}":["Questions from the matrix · {0}","Fragen aus der Matrix · {0}","Questions de la matrice · {0}","Preguntas de la matriz · {0}","Domande dalla matrice · {0}"],
"Питання з матриці":["Questions from the matrix","Fragen aus der Matrix","Questions de la matrice","Preguntas de la matriz","Domande dalla matrice"],
"Сховати":["Hide","Ausblenden","Masquer","Ocultar","Nascondi"],
"Мої розклади":["My readings","Meine Legungen","Mes tirages","Mis tiradas","Le mie stese"],
"Видалити розклад":["Delete reading","Legung löschen","Supprimer le tirage","Eliminar tirada","Elimina stesa"],
"уточнень: {0}":["follow-ups: {0}","Nachfragen: {0}","précisions : {0}","aclaraciones: {0}","approfondimenti: {0}"],
"Тут з’являться ваші розклади Таро з тлумаченнями.":["Your tarot readings with interpretations will appear here.","Hier erscheinen deine Tarot-Legungen mit Deutungen.","Vos tirages de tarot et leurs interprétations apparaîtront ici.","Aquí aparecerán tus tiradas de tarot con sus interpretaciones.","Qui appariranno le tue stese dei tarocchi con le interpretazioni."],
"Їх можна перечитувати й ставити картам уточнювальні питання.":["You can reread them and ask the cards follow-up questions.","Du kannst sie erneut lesen und den Karten Nachfragen stellen.","Vous pourrez les relire et poser aux cartes des questions de précision.","Puedes releerlas y hacer a las cartas preguntas de seguimiento.","Puoi rileggerle e porre alle carte domande di approfondimento."],
"Що мені зробити найближчим часом?":["What should I do in the near future?","Was sollte ich in nächster Zeit tun?","Que devrais-je faire prochainement ?","¿Qué debería hacer próximamente?","Cosa dovrei fare prossimamente?"],
"Врахувати матрицю долі":["Take a destiny matrix into account","Eine Schicksalsmatrix berücksichtigen","Tenir compte d’une matrice du destin","Tener en cuenta una matriz del destino","Tieni conto di una matrice del destino"],
"Чию матрицю врахувати":["Whose matrix to use","Wessen Matrix","Quelle matrice utiliser","Qué matriz usar","Quale matrice usare"],
"Моя":["Mine","Meine","La mienne","La mía","La mia"],
"Мій профіль":["My profile","Mein Profil","Mon profil","Mi perfil","Il mio profilo"],
"Іншої людини":["Another person","Andere Person","Une autre personne","Otra persona","Un’altra persona"],
"Ввести дані":["Enter details","Daten eingeben","Saisir les données","Introducir datos","Inserisci i dati"],
"Змінити":["Change","Ändern","Modifier","Cambiar","Modifica"],
"Матриця для розкладу":["Matrix for the reading","Matrix für die Legung","Matrice pour le tirage","Matriz para la tirada","Matrice per la stesa"],
"Дані людини":["Person’s details","Daten der Person","Données de la personne","Datos de la persona","Dati della persona"],
"Сервіс розрахує матрицю долі цієї людини й урахує її в трактуванні. Саму матрицю на сторінці показано не буде.":["We’ll calculate this person’s destiny matrix and take it into account in the reading. The matrix itself won’t be shown on the page.","Wir berechnen die Schicksalsmatrix dieser Person und berücksichtigen sie in der Deutung. Die Matrix selbst wird nicht angezeigt.","Nous calculerons la matrice du destin de cette personne et en tiendrons compte dans l’interprétation. La matrice elle-même ne sera pas affichée.","Calcularemos la matriz del destino de esta persona y la tendremos en cuenta en la lectura. La matriz no se mostrará en la página.","Calcoleremo la matrice del destino di questa persona e ne terremo conto nell’interpretazione. La matrice non verrà mostrata."],
"Ім’я людини":["Person’s name","Name der Person","Prénom de la personne","Nombre de la persona","Nome della persona"],
"Нещодавні":["Recent","Zuletzt","Récents","Recientes","Recenti"],
"Врахувати в розкладі":["Use in the reading","In der Legung verwenden","Utiliser dans le tirage","Usar en la tirada","Usa nella stesa"],
"Розділи довідника":["Reference sections","Bereiche","Sections","Secciones","Sezioni"],
"Стихія":["Element","Element","Élément","Elemento","Elemento"],
"Числові карти":["Number cards","Zahlenkarten","Cartes numérales","Cartas numéricas","Carte numerali"],
"Придворні карти":["Court cards","Hofkarten","Figures","Cartas de la corte","Figure di corte"],
"придворна карта":["court card","Hofkarte","figure","carta de la corte","figura di corte"],
"Як людина":["As a person","Als Person","En tant que personne","Como persona","Come persona"],
"Пряме положення":["Upright","Aufrecht","À l’endroit","Al derecho","Dritta"],
"Перевернуте":["Reversed","Umgekehrt","Renversée","Invertida","Rovesciata"],
"Порада карти":["The card’s advice","Rat der Karte","Conseil de la carte","Consejo de la carta","Consiglio della carta"],
"Символізм":["Symbolism","Symbolik","Symbolisme","Simbolismo","Simbolismo"],
"Що мені підказує карта":["What is the card telling me —","Was sagt mir die Karte","Que me dit la carte","Qué me dice la carta","Cosa mi dice la carta"],
"Увійти через Google":["Continue with Google","Mit Google anmelden","Continuer avec Google","Continuar con Google","Continua con Google"],
"Дата народження":["Date of birth","Geburtsdatum","Date de naissance","Fecha de nacimiento","Data di nascita"],
"ДД.ММ.РРРР":["DD.MM.YYYY","TT.MM.JJJJ","JJ.MM.AAAA","DD.MM.AAAA","GG.MM.AAAA"],
"Видалити всі":["Delete all","Alle löschen","Tout supprimer","Eliminar todas","Elimina tutte"],
"Зробити розклад":["Make a reading","Karten legen","Faire un tirage","Hacer una tirada","Fai una stesa"],
"Розклад видалено.":["Reading deleted.","Legung gelöscht.","Tirage supprimé.","Tirada eliminada.","Stesa eliminata."],
"Розклади видалено.":["Readings deleted.","Legungen gelöscht.","Tirages supprimés.","Tiradas eliminadas.","Stese eliminate."]};
["en","de","fr","es","it"].forEach((l,i)=>{if(TR[l])Object.entries(TRX).forEach(([k,v])=>TR[l][_H(k)]=v[i]);});
L10N_init();

;
window.CODE_SB={url:"https://blwyzqxhzvjzhqkabesi.supabase.co",key:"sb_publishable_v2wRmfGkiVW7fF6wIkPZBg_fjeS3wBu"};
;

/* ===== CODE cloud: real accounts + data sync via Supabase (only in the hosted build) ===== */
(()=>{
const CFG=window.CODE_SB; if(!CFG||!CFG.url||!CFG.key) return;
let sb=null, saveT=0, hydrating=null;
const ready=new Promise(res=>{
  if(window.supabase&&window.supabase.createClient){ res(); return; }
  const s=document.createElement('script'); s.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js';
  s.onload=()=>res(); s.onerror=()=>res(); document.head.appendChild(s);
}).then(()=>{ if(window.supabase&&window.supabase.createClient) sb=window.supabase.createClient(CFG.url,CFG.key,{auth:{storage:{getItem:k=>{ try{ return localStorage.getItem(k)??sessionStorage.getItem(k); }catch(_){ return null; } },setItem:(k,v)=>{ try{ const rem=JSON.parse(localStorage.getItem('code-remember')||'true')!==false; if(rem){ localStorage.setItem(k,v); sessionStorage.removeItem(k); } else { sessionStorage.setItem(k,v); localStorage.removeItem(k); } }catch(_){} },removeItem:k=>{ try{ localStorage.removeItem(k); sessionStorage.removeItem(k); }catch(_){} }},lock:async(n,_t,fn)=>{ if(!navigator.locks) return fn(); const ac=new AbortController(), tm=setTimeout(()=>ac.abort(),3000); try{ return await navigator.locks.request(n,{signal:ac.signal},async()=>{ clearTimeout(tm); return fn(); }); }catch(e){ if(e&&e.name==='AbortError') return fn(); throw e; } },persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}}); return sb; });

Object.assign(AUTH_ERR,{
  confirm:'Ми надіслали лист для підтвердження. Відкрийте його, натисніть посилання — і ви одразу опинитесь у кабінеті.',
  unconfirmed:'Пошту ще не підтверджено. Знайдіть лист від CODE (перевірте й «Спам») і натисніть посилання.',
  badpw:'Невірний email або пароль. Спробуйте ще раз або відновіть пароль.',
  network:'Немає зв’язку з сервером. Перевірте інтернет і спробуйте ще раз.',
  weakpw:'Пароль закороткий — потрібно щонайменше 6 символів.'
});
const emptyProfile=name=>({name:name||'',d:0,m:0,y:0,g:'f'});
const mergeById=(a,b)=>{ const seen=new Set(); return [...(a||[]),...(b||[])].filter(x=>{ const k=x&&x.id!=null?x.id:JSON.stringify(x); if(seen.has(k)) return false; seen.add(k); return true; }).sort((x,y)=>(y.ts||0)-(x.ts||0)); };

async function hydrate(session){
  if(!session||!session.user) return null;
  const u=session.user;
  let {data:row,error}=await sb.from('user_data').select('*').eq('id',u.id).maybeSingle();
  if(error) throw 'network';
  const localTarot=(()=>{ try{ return JSON.parse(localStorage.getItem('code-tarot')||'[]')||[]; }catch(_){ return []; } })();
  const localPeople=(()=>{ try{ return JSON.parse(localStorage.getItem('code-tarot-people')||'[]')||[]; }catch(_){ return []; } })();
  const localRep=(()=>{ try{ return JSON.parse(localStorage.getItem('code-ai-reports')||'{}')||{}; }catch(_){ return {}; } })();
  if(!row){
    const meta=u.user_metadata||{};
    row={id:u.id,email:u.email,profile:emptyProfile(meta.name||meta.full_name||''),favs:[],hist:[],tarot:localTarot,people:localPeople};
    let promo=''; try{ promo=(localStorage.getItem('code-promo')||'').trim().toUpperCase().slice(0,30); }catch(_){}
    if(promo){ const {data:ok}=await sb.rpc('promo_ok',{c:promo}); if(ok) row.promo=promo; }
    const {error:ie}=await sb.from('user_data').insert(row);
    if(ie&&/promo/.test(ie.message||'')){ delete row.promo; await sb.from('user_data').insert(row); }
    try{ localStorage.removeItem('code-promo'); }catch(_){}
  } else {
    row.tarot=mergeById(row.tarot,localTarot).slice(0,30);
    row.people=(row.people&&row.people.length?row.people:localPeople);
  }
  try{ localStorage.setItem('code-tarot',JSON.stringify(row.tarot||[])); localStorage.setItem('code-tarot-people',JSON.stringify(row.people||[])); localStorage.setItem('code-ai-reports',JSON.stringify(Object.assign({},localRep,row.reports||{}))); }catch(_){}
  USER={email:u.email,profile:row.profile||emptyProfile(),favs:row.favs||[],hist:row.hist||[],uid:u.id};
  try{ const {data:sr}=await sb.from('subscriptions').select('*').eq('user_id',u.id).maybeSingle(); USER.sub=sr||null; }catch(_){ USER.sub=null; }
  setAcctIcon();
  return USER;
}
function pushSoon(){
  clearTimeout(saveT);
  saveT=setTimeout(async()=>{
    if(!sb||!USER||!USER.uid) return;
    const tarot=(()=>{ try{ return JSON.parse(localStorage.getItem('code-tarot')||'[]')||[]; }catch(_){ return []; } })();
    const people=(()=>{ try{ return JSON.parse(localStorage.getItem('code-tarot-people')||'[]')||[]; }catch(_){ return []; } })();
    const reports=(()=>{ try{ return JSON.parse(localStorage.getItem('code-ai-reports')||'{}')||{}; }catch(_){ return {}; } })();
    const rowU={id:USER.uid,email:USER.email,profile:USER.profile,favs:USER.favs||[],hist:USER.hist||[],tarot,people,reports,updated_at:new Date().toISOString()};
    let {error}=await sb.from('user_data').upsert(rowU);
    if(error&&/reports/.test(error.message||'')){ delete rowU.reports; await sb.from('user_data').upsert(rowU); }
  },700);
}

/* replace the browser-only account functions */
window.loadSession=function(){ setAcctIcon(); };
window.persistUser=function(){ pushSoon(); return true; };
window.codeCloudPush=()=>{ if(USER&&USER.uid) pushSoon(); };
window.register=async function(email,pw,name){
  await ready; if(!sb) throw 'network';
  if(pw.length<6) throw 'weakpw';
  { let pr=''; try{ pr=localStorage.getItem('code-promo')||''; }catch(_){} if(pr){ const {data:ok,error:pe}=await sb.rpc('promo_ok',{c:pr}); if(!pe&&ok===false) throw 'promo'; } }
  const {data,error}=await sb.auth.signUp({email,password:pw,options:{data:{name:name||''},emailRedirectTo:location.origin+'/'}});
  if(error){ if(/registered|exists/i.test(error.message)) throw 'exists'; if(/password/i.test(error.message)) throw 'weakpw'; throw 'network'; }
  if(data&&data.user&&Array.isArray(data.user.identities)&&!data.user.identities.length) throw 'exists';
  if(!data.session) throw 'confirm';
  await hydrate(data.session); if(name){ USER.profile.name=name; pushSoon(); }
};
window.login=async function(email,pw){
  await ready; if(!sb) throw 'network';
  const {data,error}=await sb.auth.signInWithPassword({email,password:pw});
  if(error){ if(/confirm/i.test(error.message)) throw 'unconfirmed'; if(/invalid/i.test(error.message)) throw 'badpw'; throw 'network'; }
  await hydrate(data.session);
};
const _logout=window.logout;
window.logout=function(){ if(sb) sb.auth.signOut(); _logout(); };
const _ts=window.tpSaveHist; if(_ts) window.tpSaveHist=function(l){ _ts(l); if(USER&&USER.uid) pushSoon(); };
const _tp=window.tpSavePeople; if(_tp) window.tpSavePeople=function(l){ _tp(l); if(USER&&USER.uid) pushSoon(); };

/* "Забули пароль?" under the password on the login form */
const _auth=window.authHTML;
window.authHTML=function(){ const h=_auth(); return AUTH_MODE==='login'?h.replace('<div class="err" id="auErr"','<button type="button" class="lnk fpw" id="auForgot">Забули пароль?</button><div class="err" id="auErr"'):h; };
const st=document.createElement('style');
st.textContent='.fpw{display:block;margin:-4px 0 12px auto;background:none;border:0;padding:4px 2px;color:var(--accent);font:inherit;font-size:13px;cursor:pointer}.fpw:hover{text-decoration:underline}.np-ov{position:fixed;inset:0;z-index:200;display:grid;place-items:center;padding:20px;background:rgba(5,5,14,.5);backdrop-filter:blur(10px)}.np-box{width:min(420px,100%);padding:26px;border-radius:26px;background:var(--pop-bg);border:1px solid var(--hair);box-shadow:var(--shadow)}.np-box h3{margin:0 0 6px;font-family:var(--font-display);font-weight:400;text-transform:uppercase}.np-box p{margin:0 0 16px;color:var(--muted);font-size:14px}.np-box .btn{width:100%;margin-top:12px}';
document.head.appendChild(st);

document.addEventListener('click',async e=>{
  const dm=e.target.closest&&e.target.closest('[data-more="doc:privacy"],[data-more="doc:terms"]');
  if(dm){ e.preventDefault(); e.stopImmediatePropagation(); window.open(dm.dataset.more==='doc:privacy'?'/privacy.html':'/terms.html','_blank','noopener'); return; }
  const f=e.target.closest&&e.target.closest('#auForgot');
  if(f){ e.preventDefault(); const em=($('#auEmail')||{}).value||'', er=$('#auErr');
    const show=(m,info)=>{ if(er){ er.textContent=m; er.hidden=false; er.classList.toggle('info',!!info); } };
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.trim())){ show('Впишіть свій email у поле вище — і натисніть «Забули пароль?» ще раз.'); $('#auEmail')&&$('#auEmail').focus(); return; }
    await ready; if(!sb){ show(AUTH_ERR.network); return; }
    const {error}=await sb.auth.resetPasswordForEmail(em.trim().toLowerCase(),{redirectTo:location.origin+'/'});
    show(error?AUTH_ERR.network:'Готово! Ми надіслали лист із посиланням для нового пароля. Перевірте пошту (і папку «Спам»).',!error); return; }
  const g=e.target.closest&&e.target.closest('[data-sso]');
  if(g){ e.preventDefault(); e.stopImmediatePropagation();
    const a=$('#auAgree'); if(a&&!a.checked){ const er=$('#auErr'); if(er){ er.classList.remove('info'); er.textContent=T('aNeedAgree'); er.hidden=false; } a.closest('.agree').classList.add('need'); return; }
    if(g.dataset.sso!=='Google'){ const er=$('#auErr'); if(er){ er.textContent='Вхід через Apple з’явиться згодом. Поки що скористайтеся Google або email.'; er.hidden=false; er.classList.add('info'); } return; }
    await ready; if(!sb) return;
    const er=$('#auErr'), say=m=>{ if(er){ er.textContent=m; er.hidden=false; er.classList.add('info'); } };
    try{ const r=await fetch(CFG.url+'/auth/v1/settings',{headers:{apikey:CFG.key}}); const j=await r.json(); if(!j||!j.external||!j.external.google){ say('Вхід через Google ще налаштовується. Поки що увійдіть через email — це хвилина.'); return; } }catch(_){ say(AUTH_ERR.network); return; }
    await sb.auth.signInWithOAuth({provider:'google',options:{redirectTo:location.origin+'/'}}); }
},true);

function newPasswordDialog(){
  const d=document.createElement('div'); d.className='np-ov';
  d.innerHTML=`<form class="np-box" novalidate><h3>${_t("Новий пароль")}</h3><p>${_t("Придумайте новий пароль для свого акаунта CODE.")}</p><div class="field"><label for="npPw">${_t("Пароль")}</label><input id="npPw" type="password" autocomplete="new-password" placeholder="${_t("Щонайменше 6 символів")}"></div><div class="err" id="npErr" hidden></div><button class="btn go" type="submit">${_t("Зберегти пароль")}</button></form>`;
  document.body.appendChild(d); setTimeout(()=>d.querySelector('#npPw').focus(),50);
  d.querySelector('form').addEventListener('submit',async ev=>{ ev.preventDefault(); const pw=d.querySelector('#npPw').value, er=d.querySelector('#npErr');
    if(pw.length<6){ er.textContent=AUTH_ERR.weakpw; er.hidden=false; return; }
    const {error}=await sb.auth.updateUser({password:pw});
    if(error){ er.textContent=AUTH_ERR.network; er.hidden=false; return; }
    d.remove(); toast(_t("Пароль змінено. Ви в акаунті.")); });
}


/* Google sign-in via Google Identity Services: the consent screen shows the app name "CODE" and our domain instead of the Supabase address */
const GCID='908657032514-nfibgmccqqkb1nn098pps2senl60qdr1.apps.googleusercontent.com';
const GIS_ORIGINS=['https://code-matrix.space','https://www.code-matrix.space','https://code-matrix-test.vercel.app'];
let gisP=null;
const loadGIS=()=>gisP||(gisP=new Promise(res=>{ if(window.google&&google.accounts&&google.accounts.id) return res(true); const s=document.createElement('script'); s.src='https://accounts.google.com/gsi/client'; s.async=true; s.onload=()=>res(true); s.onerror=()=>res(false); document.head.appendChild(s); }));
const sha256hex=async t=>{ const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(t)); return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join(''); };
const isDark=()=>{ const t=document.documentElement.getAttribute('data-theme'); return t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches; };
async function mountGoogle(host){
  if(!host||host.dataset.gis) return; host.dataset.gis='1';
  /* Google only accepts origins registered for the client; on any other address (e.g. a Vercel preview link) keep the redirect sign-in */
  if(!GIS_ORIGINS.includes(location.origin)) return;
  const w=Math.max(220,Math.min(400,Math.round(host.getBoundingClientRect().width)||340));
  if(!(await loadGIS())||!window.crypto||!crypto.subtle){ delete host.dataset.gis; return; }
  const raw=(crypto.randomUUID?crypto.randomUUID():String(Math.random()))+Date.now(), hashed=await sha256hex(raw);
  google.accounts.id.initialize({client_id:GCID,nonce:hashed,ux_mode:'popup',itp_support:true,callback:async r=>{
    const er=$('#auErr'), say=(m,info)=>{ if(er){ er.textContent=m; er.hidden=false; er.classList.toggle('info',!!info); } };
    const a=$('#auAgree'); if(a&&!a.checked){ say(T('aNeedAgree')); a.closest('.agree').classList.add('need'); return; }
    await ready; if(!sb){ say(AUTH_ERR.network); return; }
    const {error}=await sb.auth.signInWithIdToken({provider:'google',token:r.credential,nonce:raw});
    if(error){ say('Не вдалося увійти через Google. Спробуйте ще раз або увійдіть через email.'); console.warn(error); }
  }});
  /* keep our own styled pill visible; Google's button sits invisibly on top of it and receives the click */
  const box=document.createElement('div'); box.className='gis-box'; box.setAttribute('aria-hidden','true');
  const wrap=document.createElement('div'); wrap.className='gis-wrap'; host.replaceWith(wrap); wrap.append(host,box);
  host.tabIndex=-1;
  const loc={uk:'uk',en:'en',de:'de',fr:'fr',es:'es',it:'it'}[window.LANG]||'uk';
  google.accounts.id.renderButton(box,{type:'standard',theme:'outline',size:'large',shape:'pill',text:'continue_with',logo_alignment:'center',width:w,locale:loc});
  wrap.classList.add('gis-on');
  /* Google's iframe carries a title that the browser shows as a hover tooltip — drop it */
  const untitle=()=>box.querySelectorAll('[title]').forEach(n=>n.removeAttribute('title'));
  untitle(); new MutationObserver(untitle).observe(box,{subtree:true,childList:true,attributes:true,attributeFilter:['title']});
}
const gst=document.createElement('style'); gst.textContent='.gis-wrap{position:relative;display:grid}.gis-wrap .sso-b{width:100%}.gis-box{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;overflow:hidden;opacity:0;pointer-events:none;color-scheme:normal}.gis-on .gis-box{opacity:.001;pointer-events:auto}.gis-box>div,.gis-box iframe{transform:scale(1.02,1.25);transform-origin:center}.gis-on:hover .sso-b{border-color:var(--accent);background:var(--accent-soft);transform:translateY(-1px)}.gis-on:active .sso-b{transform:translateY(0)}';
document.head.appendChild(gst);
new MutationObserver(()=>{ const h=document.querySelector('.sso [data-sso="Google"]:not([data-gis])'); if(h) mountGoogle(h); }).observe(document.body,{childList:true,subtree:true});
{ const h0=document.querySelector('.sso [data-sso="Google"]'); if(h0) mountGoogle(h0); }

/* AI tarot reader on the hosted site: same interface as window.claude.use('sample'), served by /api/tarot */
const aiToken=async()=>{ await ready; if(!sb) return null; const {data}=await sb.auth.getSession(); return data&&data.session?data.session.access_token:null; };
const aiErr=(code,text)=>Object.assign(new Error(code),{code,text});
window.codeSetAutoRenew=async on=>{ await ready; if(!sb) throw new Error('offline'); const {data,error}=await sb.rpc('set_auto_renew',{turn_on:!!on}); if(error) throw new Error(error.message||'error'); return data; };
window.codeBalance=async()=>{ const tok=await aiToken(); if(!tok) throw new Error('login'); const r=await fetch('/api/tarot',{method:'POST',headers:{'content-type':'application/json',authorization:'Bearer '+tok},body:JSON.stringify({mode:'balance'})}); if(!r.ok){ let c=''; try{ c=(await r.json()).code||''; }catch(_){} throw new Error(c||('http_'+r.status)); } return r.json(); };
async function aiCall(payload,signal){
  const tok=await aiToken(); if(!tok) throw aiErr('login');
  let r; try{ r=await fetch('/api/tarot',{method:'POST',signal,headers:{'content-type':'application/json',authorization:'Bearer '+tok},body:JSON.stringify(payload)}); }
  catch(e){ throw aiErr(e&&e.name==='AbortError'?'cancelled':'network'); }
  if(!r.ok){ let j={}; try{ j=await r.json(); }catch(_){} throw aiErr(j.code||'upstream'); }
  return r;
}
const aiSample=async(turns,opts={})=>{
  const r=await aiCall({turns,task:opts.task||'tarot',...(opts.lang?{lang:opts.lang}:{}),...(opts.kb?{kb:opts.kb}:{})},opts.signal);
  const rd=r.body.getReader(), dec=new TextDecoder(); let buf='', text='', stop='', fin=false;
  try{
    for(;;){ const {done,value}=await rd.read(); if(done) break; buf+=dec.decode(value,{stream:true});
      let i; while((i=buf.indexOf('\n'))>=0){ const line=buf.slice(0,i).trim(); buf=buf.slice(i+1);
        if(!line.startsWith('data:')) continue; let ev; try{ ev=JSON.parse(line.slice(5)); }catch(_){ continue; }
        if(ev.type==='content_block_delta'&&ev.delta&&ev.delta.type==='text_delta'){ text+=ev.delta.text; opts.onText&&opts.onText({text}); }
        else if(ev.type==='message_delta'&&ev.delta&&ev.delta.stop_reason) stop=ev.delta.stop_reason;
        else if(ev.type==='message_stop') fin=true;
        else if(ev.type==='error') throw aiErr(ev.error&&/overload/i.test(ev.error.type||'')?'rate_limited':'upstream',text); } }
  }catch(e){ if(e&&e.code) throw e; throw aiErr(opts.signal&&opts.signal.aborted?'cancelled':'network',text); }
  if(stop==='refusal'&&!text) throw aiErr('refused');
  return {text,stop,complete:fin&&stop!=='max_tokens'};
};
const shrink=file=>new Promise((res,rej)=>{ const im=new Image(), u=URL.createObjectURL(file); im.onload=()=>{ const k=Math.min(1,1600/Math.max(im.width,im.height)), c=document.createElement('canvas'); c.width=Math.round(im.width*k); c.height=Math.round(im.height*k); c.getContext('2d').drawImage(im,0,0,c.width,c.height); URL.revokeObjectURL(u); res({type:'image/jpeg',data:c.toDataURL('image/jpeg',.85).split(',')[1]}); }; im.onerror=()=>{ URL.revokeObjectURL(u); rej(aiErr('image_rejected')); }; im.src=u; });
aiSample.json=async(prompt,opts={})=>{
  const images=[]; for(const f of (opts.images||[]).slice(0,2)) images.push(await shrink(f));
  const r=await aiCall({mode:'json',prompt,images},opts.signal); const j=await r.json();
  const t=String(j.text||'').replace(/^```(?:json)?\s*|\s*```$/g,'').trim();
  try{ return JSON.parse(t); }catch(_){ const m=t.match(/\{[\s\S]*\}/); if(m) return JSON.parse(m[0]); throw aiErr('upstream'); }
};
aiSample.limits=async()=>({images:true});
if(!(window.claude&&window.claude.use)) TP_SAMPLE=aiSample;
const _tpErr=window.tpErr;
window.tpErr=function(c){
  if(c==='login') return 'Щоб отримати трактування, увійдіть або зареєструйтеся — це безкоштовно і займає хвилину.';
  if(c==='need_plan'){ setTimeout(()=>typeof openPlans==='function'&&openPlans(),900); return 'Ця функція доступна в тарифах Plus і Pro.'; }
  if(c==='free_quota'){ setTimeout(()=>typeof openPlans==='function'&&openPlans(),900); return 'Безкоштовні трактування на цей тиждень закінчилися. Наступне з’явиться за кілька днів — або оберіть тариф, щоб питати карти без очікування.'; }
  if(c==='plan_quota'){ setTimeout(()=>typeof openPlans==='function'&&openPlans(),900); return 'Ліміт запитів вашого тарифу на цей місяць вичерпано. Можна докупити пакет або перейти на більший тариф.'; }
  if(c==='daily_limit') return 'Ви використали денний ліміт трактувань. Повертайтеся завтра — ліміт оновлюється щодня.';
  if(c==='photo_limit') return 'На сьогодні ліміт розпізнавання фото вичерпано. Виберіть карти вручну або спробуйте завтра.';
  if(c==='not_configured'||c==='no_credit') return 'Трактувальник тимчасово недоступний. Ми вже знаємо і виправляємо.';
  if(c==='network') return 'Немає зв’язку з сервером. Перевірте інтернет і спробуйте ще раз.';
  return _tpErr?_tpErr(c):'Не вдалося отримати відповідь. Спробуйте ще раз.';
};
/* start: restore the session (also after Google sign-in or an email link) */
USER=null; setAcctIcon();
ready.then(async()=>{
  if(!sb) return;
  /* never await Supabase calls inside the auth callback itself — supabase-js holds its auth lock while it runs, and a nested call deadlocks (sign-in "hangs", session looks lost); handle it on the next tick instead */
  sb.auth.onAuthStateChange((ev,session)=>{ setTimeout(()=>onAuth(ev,session),0); });
  const onAuth=async(ev,session)=>{
    if(ev==='PASSWORD_RECOVERY'){ await hydrate(session).catch(()=>{}); newPasswordDialog(); return; }
    if(ev==='SIGNED_IN'&&session&&(!USER||USER.uid!==session.user.id)){
      if(hydrating) return; hydrating=hydrate(session).catch(()=>null);
      const u=await hydrating; hydrating=null; if(!u) return;
      try{ const cu=session.user; if(cu&&Date.now()-new Date(cu.created_at).getTime()<36e5*72&&!localStorage.getItem('code-welcome-'+cu.id)){ localStorage.setItem('code-welcome-'+cu.id,'1'); fetch('/api/email',{method:'POST',headers:{'content-type':'application/json',authorization:'Bearer '+session.access_token},body:JSON.stringify({mode:'welcome'})}).catch(()=>{}); } }catch(_){}
      if(profileReady(USER.profile)) fill(USER.profile);
      if(!$('#home').hidden){ HOME_MODE='cab'; CAB_TAB='data'; PF_EDIT=!profileReady(USER.profile); renderHome(); }
      if(/access_token|type=/.test(location.hash)) history.replaceState(null,'',location.pathname+location.search);
    }
    if(ev==='SIGNED_OUT'&&USER){ USER=null; setAcctIcon(); }
  };
  const {data}=await sb.auth.getSession();
  if(data&&data.session&&!USER){ const u=await hydrate(data.session).catch(()=>null); if(u){ if(profileReady(USER.profile)) fill(USER.profile); if(!$('#home').hidden) renderHome(); } }
});
})();


