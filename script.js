/*La e sta per event
questa non è una funzione attiva*/
function txtEnterEvent(e){
 var keyPressed = e.which;
  /*questa if cerca che bottone è stato premuto |
  il 13 è il tasto invio */
  if(keyPressed == 13){
    testAddMessage2();
  }
}

//content è il contenuto del messaggio
//sentORreceived è il parametro che decide se il messaggio sarà
//a destra o sinistra in base al css.
function getMessage(sentORreceived, content){
  //imposto un createElement che mi crea il div
  var messageSent = document.createElement("div");

  //Jquerizzo il selettore e aggiungo le classi al div che formano
  //in automatico il messaggio inviato
  //addClass(sentORreceived) non ha virgolette nel parametro perchè le eredita
  //dalla stringa che uso per passsargli il valore sent o receive.
  $(messageSent).addClass("message").addClass(sentORreceived).addClass("clearfix");

  //creo l'elemento <p> che contiene il testo del messaggio
  var p = document.createElement("p");
  $(p).text(content);

/* ## Aggiunge la spunta e l'orario ma non è completa ##
  var timeWrapper = document.createElement("div");
  $(timeWrapper).addClass("time-wrapper");

  var time = document.createElement("small");
  $(time).text("17:30");
*/
messageSent.append(p);

/*deve esserci un return perché questa funzione viene chiamata
solo dopo aver premuto invio quando mi trovo nell'input*/
return messageSent;
}

function getInfoMessage(){
  /*this individua dove stiamo cliccando*/
  var me = $(this)


  //questa variabile usa find() per legarsi alla classe infoMsg
  var infoMsgProva = me.find(".infoMsg");
  console.log(infoMsgProva.length);

  /*conta quanti div infoMsg ci sono e se ne trova almeno uno li rimuove
  se invece il valore è 0 crea tutto il div infoMsg*/
  if(infoMsgProva.length>0){
    infoMsgProva.remove();
  } else {

  /*devo ricreare lo stesso div infoMsg con le stesse caratteristiche*/

  /*ora creo una variabile che ora è solo un div generico*/
  var infoMsgDiv = document.createElement("div");
  /*jquerizzo la variabile e aggiungo al div appena creato la classe infoMsg*/
  $(infoMsgDiv).addClass("infoMsg");
  /*uguale per questa variabile*/
  var pInfo = document.createElement("p");
  $(pInfo).text("info");
  $(infoMsgDiv).append(pInfo);

  var pDelete =document.createElement("p");
  $(pDelete).addClass("elimina");
  $(pDelete).text("Elimina");
  $(infoMsgDiv).append(pDelete);

  /*creo una variabile che contiene l'insieme di tutti i div e il loro contenuto*/
  var infoMsgComplete = infoMsgDiv;

  /*appendo il tutto*/
  me.append(infoMsgComplete);
  }
}

function enterNewMessage(e){
  //seleziona l'input
  var me = $(this);
  //seleziono il div che contiene tutti i messaggi
  var activeMessageContainer = $(".messageBox.selected");

//condizione che verifica se viene premuto enter
  if(e.which == 13){
    //immagazzino il testo dell'input
    var txt = me.val();
    //resetto il campo di testo impostandolo vuoto
    me.val(" ");

    //creo una variabile che mi serirà tra poco
    //getMessage crea il div con le caratteristiche
    //del messaggio inviato chiedendo come parametro
    //il testo dell'input inserito
    var sent = "sent"; //inizializzo uno stringa per poterla passare come parametro a getMessage
    /*altrimenti mi resituisce un errore per via delle virgolette*/
    var htmlMsg = getMessage(sent,txt);

    //"appendo" il messaggio con il testo dentro
    activeMessageContainer.append(htmlMsg);

    /*anima con jquery la scroll -  targhet.prop("scrollHeight")
    corrisponde ad un valore massimo che sposta la scroolbar alla fine
    se al posto di targhet.prop("scrollHeight") scrivo il valore 0, mi porta la scroolbar in cima*/
    activeMessageContainer.animate({scrollTop: activeMessageContainer.prop("scrollHeight") }, 0);

    setTimeout(function(){
      activeMessageContainer = $(".messageBox.selected");
      var receive = "receive"
      htmlMsg = getMessage(receive, "Grazie della tua risposta");
      activeMessageContainer.append(htmlMsg);
      activeMessageContainer.animate({scrollTop: activeMessageContainer.prop("scrollHeight")});
    },2000);
  }
}

function searchUser(){
  //seleziono l'input
  var me = $(this);

  //salvo il testo dell'input
  var content = me.val();
  console.log(content);

  //seleziono i contatti
  var userList = $(".messageHistory");

  userList.removeClass("hidden")
  //potendola utilizzare come un array la variabile userList
  //creo un for per avere l'iesimo elemento tramite eq()
  for(var i = 0 ; i< userList.length; i++){

    //salvo questo iesimo elemento
    var check = userList.eq(i);

    //ora mi serve il testo contenuto in questo elemento
    var checkTxt = check.text();

    //ora che ho il l'elemento e il suo testo, devo verificare se c'è
    //un match tra il mio testo contenuto nell'input e un utente nella lista
    if(!checkTxt.includes(content) ){
      check.addClass("hidden");
    }
  }
}

function showOtherMessage(){
//seleziono la conversazione cliccata
  var me = $(this);
  //index() resituisce quale componente dell'evento stiamo prendendo
  var meIndex = me.index();
console.log(meIndex);
//seleziono il contentitore padre dei contenuti che voglio mostrare
  var messageBox = $(".messageBox");
//rimuovo la classe che mostra il contenuto
  messageBox.removeClass("selected");

  //prendo il messageBox che corrisponde alla conversazione selezionata
  var selectedMessageBox = messageBox.eq(meIndex);

  //ora aggiungo la classe che permette di visualizzare il contenuto
  selectedMessageBox.addClass("selected");

}

/*non è piu necessaria questa funzione*/
function showInfoMessage(){
  var classSel = $(".infoMsg");

  classSel.toggle();
}



function init() {

  /*input text*/
  var txt = $("#input-TXT");
  /*questo è il trigger dell'invio del testo
  keyup() è un trigger che funziona ogni volta che premiamo un tasto*/
  txt.keyup(enterNewMessage);

  //cerca dai contatti
  var searchInput = $(".search-container>input");
  searchInput.keyup(searchUser);

  //seleziona le conversazione
  var selectedMessageBox = $(".messageHistory");
  //mostra i messaggi associati alla conversazione cliccata
  selectedMessageBox.click(showOtherMessage);

  //funzione delete dei messaggi
  /*non si può utilizzare il solito targhet.click perchè
  stiamo creando dinamicamente i messaggi che non esistono
  al ready cioè qunado parte la funzione init() -
  $(document).on("click" ."taghetCliccato") legge nuovamente il documente
  il documento al click.
  creo una funzione anonima perchè devo passargli il this.*/
  $(document).on("click",".elimina", function() {
    var me = $(this);
    /*.closest() ragiona all'opposto di find()
    dato che mi serve una classe più esterna di .elimina
    dove mi trovo adesso, uso closest per far diventare
    il me = .message e non più .elimina*/
    me.closest(".message").remove();

  });

  $(document).on("click", ".message", getInfoMessage);
}


$(document).ready(init);
