let deck = [];
let tutorialTick=0;
let funnyDepressed=false;
let shownRedraw=false;
let shownChimmy=false;
let shownRitual=false;
let shownDiscard=false;
let shownSixer=false;
let tutorialFinished=false;
let lindaVal=0;
let speech = "...";
let highlight="none";
let tutorialTime=0;
let arrowX=0;
let arrowY=0;
let currentImg=funnyImg;
let currentBubble=speechBubble;

function displayGame(){
  funnyMove();

  background(bgColor);

  if(deckSize>0)image(sleeveImg, deckX, deckY);//pseudo- deck display
  for(let i=0; i<ophand.length; i++){
    ophand[i].display();
  }
  for(let i=0; i<tops.length; i++){
    tops[i].display();
  }
  fill(bgColor);
  stroke(0);
  if(highlight==="discard"){
    stroke(loseClr);
    strokeWeight(5);
  }
  discard.display();
  stroke(0);
  strokeWeight(1);

  if(highlight==="fred"){
    stroke(loseClr);
    strokeWeight(5);
  }
  for(let i=0; i<freds.length; i++){
    freds[i].display();
  }
  stroke(0);
  strokeWeight(1);

  if(highlight==="action"){
    stroke(loseClr);
    strokeWeight(5);
  }
  action.display();
  opaction.display();
  stroke(0);
  strokeWeight(1);

  if(highlight==="ritual"){
    stroke(loseClr);
    strokeWeight(5);
  }
  opritual.display();
  if(highlight==="pritual"){
    stroke(loseClr);
    strokeWeight(5);
  }
  ritual.display();
  stroke(0);
  strokeWeight(1);

  if(highlight==="party"){
    stroke(loseClr);
    strokeWeight(5);
  }
  for(let i=0; i<parties.length; i++){
    parties[i].display();
  }
  stroke(0);
  strokeWeight(1);

  if(displayChoice){
    for(let i=0; i<specIcons.length; i++){
      if(yourTurn){
        if(specIcons[i].mouseOver()){
          //tooltip
          fill(40, 40, 40, 80);
          rect(mouseX+tooltipW/2, mouseY+tooltipH/2, tooltipW, tooltipH);
          fill(255);
          textSize(16);
          text(specIcons[i].title, mouseX+tooltipW/2, mouseY+tooltipH*0.35);
          textSize(12);
          text(specIcons[i].desc, mouseX+tooltipW/2, mouseY+tooltipH*0.65);
          //icon
          image(specIcons[i].hoverimg, specIcons[i].xPos, specIcons[i].yPos);
        }else {
          image(specIcons[i].img, specIcons[i].xPos, specIcons[i].yPos);
        }
      }else {
        image(specIcons[i].img, specIcons[i].xPos, specIcons[i].yPos-CARDH*3);
      }
    }
  }else {
    if(dispcball){
      image(specIcons[0].img, specIcons[0].xPos, specIcons[0].yPos);
    }else if(dispeye){
      image(specIcons[1].img, specIcons[1].xPos, specIcons[1].yPos);
    }else if(disphand){
      image(specIcons[2].img, specIcons[2].xPos, specIcons[2].yPos);
    }
  }

  if(ritualed){
    image(cantritualcon, infoTokenX, height/2 - 30);
  }else {
    image(canritualcon, infoTokenX, height/2 - 30);
  }
  if(discarded){
    image(cantdiscardcon, infoTokenX, height/2 + 30);
  }else {
    image(candiscardcon, infoTokenX, height/2 + 30);
  }

  fill(190);
  if(endBtn.mouseOver()){
    fill(150);
    if(mouseDown)fill(110);
  }
  rect(endBtn.xPos, endBtn.yPos, endBtn.w, endBtn.h);
  fill(0);
  text(endBtn.label, endBtn.xPos, endBtn.yPos);

  if(discardTime){
    strokeWeight(5);
    stroke(220, 0, 0);
  }
  for(let i=0; i<hand.length; i++){
    if(hand[i].sel){
      hand[i].xPos=mouseX;
      hand[i].yPos=mouseY;
      hand[i].refresh();
    }
    hand[i].display();
  }
  strokeWeight(1);
  stroke(0);
  if(displayDiscard){
    for(let i=0; i<presentedDiscard.length; i++){
      let card = presentedDiscard[i];
      card.xPos=((i%5)*(CARDW+10))+(hbX+CARDW*2);
      card.yPos=((Math.floor(i/5)+1)*CARDH)+10;
      //if(i<=5)card.yPos=CARDH*2+10;
      //if(i<=10)card.yPos=CARDH*3+20;
      //if(i<=15)card.yPos=CARDH*4+30;
      //if(i<=20)card.yPos=CARDH*5+40;
      card.refresh();
      card.display();
      if(card.repeats===1)image(onecon, card.xPos-CARDW/2, card.yPos-CARDH/2);
      if(card.repeats===2)image(twocon, card.xPos-CARDW/2, card.yPos-CARDH/2);
      if(card.repeats===3)image(threecon, card.xPos-CARDW/2, card.yPos-CARDH/2);
      if(card.repeats===4)image(fourcon, card.xPos-CARDW/2, card.yPos-CARDH/2);
    }
  }

  fill(bgColor);
  strokeWeight(2);
  rect(hbX, hbY+(HBLIMIT/2*55) - 28, 56, 55*HBLIMIT + 2);
  hbcount = 0;
  for(let i=0; i<historybar.length; i++){
    let ii=historybar.length - (i+1);
    let suit = getSuit(historybar[ii].suitIndex);
    if(suit==="red")fill(redClr);
    if(suit==="blue")fill(blueClr);
    if(suit==="yellow")fill(yellowClr);
    let src = historybar[ii].src;
    if(src===playerId){
      stroke(playerClr);
    }else {
      stroke(opClr);
    }
    let panelY = hbY + i*55;
    rect(hbX, panelY, 50, 50);
    fill(255);
    let value = historybar[ii].value;
    if(historybar[ii].id!=="dump"){
      if(value===10){
        text("F", hbX, panelY);
      }else if(value!==0){
        text(value, hbX, panelY);
      }
    }else {
      text("x"+value, hbX, panelY);
    }
    image(getIcon(historybar[ii].id), hbX+14, panelY+14);
    hbcount++;
    if(hbcount===HBLIMIT)break;
  }
  strokeWeight(1);
  stroke(0);

  if(arrowX!==0){
    imageMode(CORNER);
    image(arrowImg, arrowX, arrowY-50);
    imageMode(CENTER);
  }

  if(showInfo){
    fill(0);
    text("fps:"+Math.floor(frameRate()), width*0.05, height*0.02);
    text("Ritualed:"+ritualed, width*0.05, height*0.035);
    text("Discarded:"+discarded, width*0.05, height*0.05);
    text('gameStarted:'+gameStarted, width*0.05, height*0.065);
    text('ophandsize:'+ophand.length, width*0.05, height*0.08);
    text('yourTurn:'+yourTurn, width*0.05, height*0.095);
    text('discardTime:'+discardTime, width*0.05, height*0.11);
    text('deckSize:'+deckSize, width*0.05, height*0.125);
  }

  if(tutorialFinished)background(0);

  image(currentImg, 189/2, 124/2);
  image(currentBubble, 189*1.75, 124/2);
  fill(0);
  text(speech, 189*1.75, 124/2);
}

function initGame(){
  frameRate(60);
  rectMode(CENTER);
  imageMode(CENTER);
  //angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  stroke(0);
  bgColor=color(90);
  //red=color(220, 0, 0);
  //green=color(0, 220, 0);

  HBLIMIT=Math.floor(height/55)-5;

  deckSize=(5*DUPENUMBER*MAXSUIT)+FREDNUMBER;
  handY=height-CARDH/2-25;
  ophandY=CARDH/2+25;
  partyX=width/2;
  partyY=height/2;
  deckX=partyX-(CARDW*2+20)-(width*0.1);
  deckY=height/2;
  discardX=partyX+(CARDW*2+20)+(width*0.1);
  iconX=discardX-75;
  iconY=deckY+CARDH*1.5;
  infoTokenX=width*0.02;
  hbX=infoTokenX + 75;
  hbY=height*0.2;
  tooltipW=200;
  tooltipH=100;

  loadCards();//pushes all number cards to deck

  for(let i=0; i<MAXCARDS; i++){
    getNextFaceDown(ophand);
  }
  realignHand(ophand, "ophand");

  for(let i=0; i<MAXCARDS; i++){//deals cards to player hand
    getNextFaceUp(hand);
  }
  realignHand(hand, "hand");
  
/*
  for(let i=0; i<MAXCARDS; i++){//deals cards to opponent hand
    let card = getNextFaceDown();
    card.alignTo("ophand", i, MAXCARDS);
    ophand.push(card);
    if(showLogs)console.log("Op drew "+card.suit+" "+card.value+" at game start");
  }*/

  //loadMerch();//pushes all fred merch cards to deck
  //if(showLogs)console.log(deck);
  //deck=shuffle(deck);//reshuffles for freds
  //if(showLogs)console.log(deck);

  leftParty=new Party(partyX-(CARDW+10)-(width*0.05), partyY, "left");
  middleParty=new Party(partyX, partyY, "middle");
  rightParty=new Party(partyX+(CARDW+10)+(width*0.05), partyY, "right");

  ritual = new Ritual(partyX, height*0.75);
  opritual = new Ritual(partyX, height*0.25);

  fred = new Fred(deckX, iconY, "p");
  fred.cards.push(new Card(10, 1, getImage(1, 10)));
  fred.cards.push(new Card(10, 3, getImage(3, 10)));

  opfred = new Fred(deckX, deckY-CARDH*1.5, "op");
  opfred.cards.push(new Card(10, 2, getImage(2, 10)));

  action = new Action(discardX, iconY, "p");
  opaction = new Action(discardX, deckY-CARDH*1.5, "op");

  discard = new Discard(discardX, deckY);

  cballbtn = new ImgButton(iconX, iconY-75, 50, 50, cballcon, cballhovercon, "cball");
  eyebtn = new ImgButton(iconX, iconY, 50, 50, eyecon, eyehovercon, "eye");
  handbtn = new ImgButton(iconX, iconY+75, 50, 50, handcon, handhovercon, "hand");

  endBtn = new EndButton(width*0.9, height/2, width/20, height/20);

  gameStarted=true;
}

function getNextFaceUp(arr){
  if(deckSize>0){
    if(arr===undefined){
      getNextFaceUp(hand);
    }else {
      if(showLogs)console.log("asked for a card (face up)");

      let card=deck[0];
      deck.splice(0, 1);
      card.faceUp=true;
      arr.push(card);

      deckSize=deckSize-1;
    }
  }
}

function getNextFaceDown(arr){
  if(deckSize>0){
    if(showLogs)console.log("asked for a card (face down)");

    let card=deck[0];
    deck.splice(0, 1);
    arr.push(card);

    deckSize=deckSize-1;
  }
}

function endTurn(){
  if(yourTurn && !displayChoice && !lindHandin){
    if(hand.length>MAXCARDS){
      //discard from hand because you dumped
      discarded=false;
      discardTime=true;
    }else {
      discardTime=false;
      yourTurn=false;
      if(ophand.length<5 && deckSize>0){
        deckSize=deckSize-1;
        drawToHand(ophand, new Card(deck[0].value, deck[0].suitIndex, getImage(deck[0].suitIndex,deck[0].value)));
        deck.splice(0, 1);
        realignHand(ophand, "ophand");
      }
      //initiate funny play actions here
    }
  }
}

//local display functions, make sure none communicate with server
function giveParty(id, card){
//prep data?
  let partysi = 0;
  let partyv = 0;
  let discardvs = [];
  if(funnySpecial){
    if(id==="left"){
      partysi=leftParty.suitIndex;
      partyv=leftParty.value;

      for(let i=1; i<=leftParty.value; i++){
        discardvs.push(i);
      }
    }else if(id==="middle"){
      partysi=middleParty.suitIndex;
      partyv=middleParty.value;
      for(let i=1; i<=middleParty.value; i++){
        discardvs.push(i);
      }
    }else if(id==="right"){
      partysi=rightParty.suitIndex;
      partyv=rightParty.value;
      for(let i=1; i<=rightParty.value; i++){
        discardvs.push(i);
      }
    }
    for(let i=0; i<discardvs.length; i++){
      giveDiscard(new Card(discardvs[i], partysi, getImage(partysi, discardvs[i])), false);
    }
  }
  funnySpecial=false;

//alter party
  let panelId = "party";
  if(card.value===1){
    if(id==="left"){
      if(leftParty.value!==0)panelId="action";
    }else if(id==="middle"){
      if(middleParty.value!==0)panelId="action";
    }else if(id==="right"){
      if(rightParty.value!==0)panelId="action";
    }
  }
  if(showLogs)console.log(id+' party received a '+getSuit(card.suitIndex)+card.value);

  let chimmied=false;
  if(card.value===5){
    tops=[];//shuffled, so tops are not the same
    chimmied=true;
    //deckSize=deckSize+5;
    //add party's cards here if necessary for the game

    if(shownChimmy){
      if(id==="left"){
        leftParty.clearCards();
      }else if(id==="middle"){
        middleParty.clearCards();
      }else if(data.partyId==="right"){
        rightParty.clearCards();
      }
    }
    
  }else{
    if(id==="left"){
      leftParty.serveCard(card, funnySpecial);
    }else if(id==="middle"){
      middleParty.serveCard(card, funnySpecial);
    }else if(id==="right"){
      rightParty.serveCard(card, funnySpecial);
    }
  }
  if(!yourTurn){
    removeFromHand(ophand, card.suitIndex, card.value);
    if(chimmied && deckSize>0 && shownChimmy){
      deckSize=deckSize-1;
      let card = new Card(deck[0].value, deck[0].suitIndex, getImage(deck[0].suitIndex, deck[0].value));
      drawToHand(ophand, card);
      chimmied=false;
    }
    //console.log('realigning');
    realignHand(ophand, "ophand");
    //console.log('ophandsize:'+ophand.length);
    let partypanel=new HistoryPanel(panelId, card.suitIndex, card.value, 'Funny');
  }else {
    let partypanel=new HistoryPanel(panelId, card.suitIndex, card.value, socket.id);
  }
  if(yourTurn && !shownSixer && chimmied){
    shownSixer=true;
    yourTurn=false;
  }
}

function giveRitual(card){
  if(card.value===0){
    let dumpCount = 0;
    if(yourTurn){
      if(showLogs)console.log('you dumped');
      dumpCount=ritual.cards.length;
      ritual.clearCards();
    }else {
      if(showLogs)console.log('your opponent dumped');
      dumpCount=opritual.cards.length;
      //console.log("ophandhascards:"+ophand.length);
      //console.log("oprithascards: "+opritual.cards.length);
      if(data.spliceCards){
        for(let i=0; i<opritual.cards.length; i++){
          if(deckSize>0){
            let card = new Card(0, 0, sleeveImg);
            drawToHand(ophand, card);
            //console.log("added card to ophand for dump");
            deckSize=deckSize-1;
          }
        }
      }
      //console.log("ophandhascards:"+ophand.length);
      //console.log("realigning");
      realignHand(ophand, "ophand");
      //console.log("ophandhascards:"+ophand.length);
      opritual.clearCards();
    }
    if(card.suitIndex!==0){
      if(yourTurn){
        let dumppanel=new HistoryPanel("dump", data.cardSuit, dumpCount, socket.id);
      }else {
        let dumppanel=new HistoryPanel("dump", data.cardSuit, dumpCount, 'Funny');
      }
    }
  }else{
    let rcard = new Card(card.value, card.suitIndex, getImage(card.suitIndex,card.value));
    if(yourTurn){
      if(!shownRitual){
        speech="You can do a lot of things with your ritual later.";
        shownRitual=true;
        yourTurn=false;
      }
      ritual.serveCard(rcard);
      if(showLogs)console.log('ritualed a '+getSuit(card.suitIndex)+card.value);
    }else {
      opritual.serveCard(rcard);
      if(showLogs)console.log('op ritualed a '+getSuit(card.suitIndex)+card.value);
      removeFromHand(ophand, card.suitIndex, card.value);
      realignHand(ophand, "ophand");
    }
    if(yourTurn){
      let ritualpanel=new HistoryPanel("ritual", card.suitIndex, card.value, socket.id);
    }else {
      let ritualpanel=new HistoryPanel("ritual", card.suitIndex, card.value, 'Funny');
    }
  }
  //console.log('ophandsize: '+ophand.length);
}

function giveDiscard(dcard, alterHand){
  if(alterHand===undefined)alterHand=true;
  let card = new Card(dcard.value, dcard.suitIndex, getImage(dcard.suitIndex,dcard.value));
  if(yourTurn && !shownDiscard){
    shownDiscard=true;
    yourTurn=false;
  }
  discard.serveCard(card);

  if(showLogs)console.log('discarded a '+getSuit(card.suitIndex)+card.value);
  //console.log('ophandsize: '+ophand.length);
  if(alterHand){
    if(yourTurn){
      let discpanel=new HistoryPanel("discard", card.suitIndex, card.value, socket.id);
    }else {
      let discpanel=new HistoryPanel("discard", card.suitIndex, card.value, 'Funny');
    }
  }
}

function giveFred(card, str){
  console.log(str+" fred got a "+getSuit(card.suitIndex));
  if(str===undefined){
    fred.cards.push(card);
  }else if(str==="op"){
    opfred.cards.push(card);
  }

  if(fred.cards.length===3){
    tutorialFinished=true;
    currentBubble=doneBubble;
    speech="TUTORIAL FINISHED";
  }
}

function giveHandAction(card){
  if(yourTurn){
    removeFromHand(hand, card.suitIndex, card.value);
    action.serveCard(card);
  }else {
    removeFromHand(ophand, card.suitIndex, card.value);
    opaction.serveCard(card);
  }
  for(let i=0; i<ophand.length; i++){
    ophand[i].faceUp=true;
  }
  let temp = ophand;
  ophand = hand;
  hand = temp;
  realignHand(ophand, "ophand");
  realignHand(hand, "hand");
  if(yourTurn && lindaVal===3){
    //console.log("in");
    lindaVal=4;
    yourTurn=false;
  }
}

function giveHandGimme(){
  let suits=[];
  let vals=[];
  for(let i=0; i<hand.length; i++){
    //console.log('sending over '+getSuit(hand[i].suitIndex)+hand[i].value+" for swap");
    suits.push(hand[i].suitIndex);
    vals.push(hand[i].value);
  }
  
}

function giveAction(acard, spliceCards){
  let card = new Card(acard.value, acard.suitIndex, getImage(acard.suitIndex,acard.value));
  if(card.value===2){
    displayChoice=true;
  }
  if(yourTurn){
    if(card.value===4)funnyDepressed=true;
    action.serveCard(card);
    if(showLogs)console.log('actioned a '+getSuit(card.suitIndex)+card.value);
  }else {
    opaction.serveCard(card);
    if(showLogs)console.log('op actioned a '+getSuit(card.suitIndex)+card.value);
    if(spliceCards)removeFromHand(ophand, card.suitIndex, card.value);
    realignHand(ophand, "ophand");
  }
  if(yourTurn){
    let actionpanel=new HistoryPanel("action", card.suitIndex, card.value, socket.id);
  }else {
    let actionpanel=new HistoryPanel("action", card.suitIndex, card.value, 'Funny');
  }

  if(card.value===2 && yourTurn && lindaVal===0){
    lindaVal=1;
    yourTurn=false;
  }
}

function giveDump(arr){
  let size=arr.length;
  ritual.cards=[];
  ritual.topCard=undefined;
  
    for(let i=0; i<size; i++)drawOneTo(hand);
    realignHand(hand, "hand");
  
  yourTurn=false;
}

function giveFredGet(ritual, str){
  ritual.cards=[];

  if(str==="op"){
    let fred = new Card(10, 1, getImage(1, 10));
    fred.faceUp=true;
    ophand.push(fred);
    let purchasepanel=new HistoryPanel("purchase", fred.suitIndex, 10, 'Funny');
  }
}

function giveGimmeDiscard(dcard){

}

function giveCball(){

}

function giveEye(){

}

function giveHand(){
  if(yourTurn && lindaVal===1){
    lindaVal=2;
    yourTurn=false;
  }
  displayDiscard=false;
  lindHandin=true;
  presentDiscard();
}

function drawOneTo(array, bool){
  if(deck.length>0){
    let card = new Card(deck[0].value, deck[0].suitIndex, getImage(deck[0].suitIndex, deck[0].value));
    if(yourTurn || bool)card.faceUp=true;
  deck.splice(0, 1);
  drawToHand(array, card);
  deckSize=deckSize-1;
  }else console.log("nodice");
  
}

function pushIn(dcard){
  if(yourTurn && lindaVal===2){
    yourTurn=false;
    lindaVal=3;
  }
  hand.push(dcard);
  realignHand(hand, "hand");
}

function removeFromHand(array, suitIndex, value){
  //removes card from hand when it is played, only used for ophand
  if(suitIndex===undefined || value===undefined || suitIndex===0 || value===0){
    array.splice(0, 1);
  }else {//passed known card, check hand for it
  let foundCard=false;
    for(let i=0; i<array.length; i++){
      if(array[i].suitIndex===suitIndex && array[i].value===value){
        if(showLogs)console.log("removed "+getSuit(suitIndex)+value+" from ophand");
        array.splice(i, 1);
        foundCard=true;
        break;
      }
    }
    if(!foundCard){
      for(let i=0; i<array.length; i++){
        if(array[i].value===0){//makes sure to discard an "unknown" rather than visible
          array.splice(i, 1);
          break;
        }
      }
    }
  }

  if(array.length===0 && !(!yourTurn && !shownRedraw)){//redraw hand if hand is empty
    for(let i=0; i<MAXCARDS; i++){
      if(deckSize>0){
        drawOneTo(array);
      }
    }
  }
}

//mode-specific functions
function funnyMove(){
  if(gameStarted && !yourTurn && tutorialTime<millis()){
    tutorialTick++;
    if(tutorialTick===1){
      speech="These are the silly parties.";
      highlight="party";
      tutorialTime=millis()+3000;
    }else if(tutorialTick===2){
      speech="You play cards to them in consectutive order.";
      tutorialTime=millis()+1000;
    }else if(tutorialTick===3){
      giveParty("left", ophand[0]);
      tutorialTime=millis()+1000;
    }else if(tutorialTick===4){
      giveParty("left", ophand[0]);
      tutorialTime=millis()+1000;
    }else if(tutorialTick===5){
      giveParty("left", ophand[0]);
      tutorialTime=millis()+1000;
    }else if(tutorialTick===6){
      giveParty("left", ophand[0]);
      highlight="none";
      tutorialTime=millis()+2000;
    }else if(tutorialTick===7){
      speech="These are the rituals.";
      highlight="ritual";
      tutorialTime=millis()+3000;
    }else if(tutorialTick===8){
      speech="You play cards of one color to them...";
      tutorialTime=millis()+3000;
    }else if(tutorialTick===9){
      giveRitual(ophand[0]);
      ritualed=true;
      tutorialTime=millis()+1000;
    }else if(tutorialTick===10){
      speech="...but they use up your special token.";
      arrowY=height/2 - 30;
      arrowX=infoTokenX+20;
      tutorialTime=millis()+3000;
    }else if(tutorialTick===11){
      highlight="none";
      arrowX=0;
      speech="This is a redraw.";
      tutorialTime=millis()+2000;
    }else if(tutorialTick===12){
      drawOneTo(ophand);
      realignHand(ophand, "ophand");
      tutorialTime=millis()+1000;
    }else if(tutorialTick===13){
      speech="When you have no cards left you redraw to 5.";
      drawOneTo(ophand);
      realignHand(ophand, "ophand");
      tutorialTime=millis()+1000;
    }else if(tutorialTick===14){
      drawOneTo(ophand);
      realignHand(ophand, "ophand");
      tutorialTime=millis()+1000;
    }else if(tutorialTick===15){
      drawOneTo(ophand);
      realignHand(ophand, "ophand");
      tutorialTime=millis()+1000;
    }else if(tutorialTick===16){
      drawOneTo(ophand);
      realignHand(ophand, "ophand");
      tutorialTime=millis()+1000;
    }else if(tutorialTick===17){
      speech="This is a chimmy.";
      ophand[0].faceUp=true;
      tutorialTime=millis()+3000;
    }else if(tutorialTick===18){
      speech="When you play one to a party you get to draw...";
      giveParty("left", ophand[0]);
      leftParty.topCard=getImage(3, 5);
      tutorialTime=millis()+2000;
    }else if(tutorialTick===19){
      drawOneTo(ophand);
      realignHand(ophand, "ophand");
      tutorialTime=millis()+1000;
    }else if(tutorialTick===20){
      speech="...and shuffle the party back into the deck!";
      leftParty.clearCards();
      tutorialTime=millis()+3000;
    }else if(tutorialTick===21){
      shownChimmy=true;
      speech="...";
      giveParty("left", ophand[0]);
      tutorialTime=millis()+1000;
    }else if(tutorialTick===22){
      giveParty("left", ophand[0]);
      tutorialTime=millis()+1000;
    }else if(tutorialTick===23){
      yourTurnCount=frameCount+90;//holds yourturn display for 90 frames
      ritualed=false;
      yourTurn=true;
      speech="Make sure you ritual!";
      highlight="pritual";
    }else if(tutorialTick===24){
      highlight="none";
      tutorialTime=millis()+3000;
    }else if(tutorialTick===25){
      highlight="discard";
      speech="I couldn't discard since I went first...";
      tutorialTime=millis()+3000;
    }else if(tutorialTick===26){
      speech="but you should always remember to discard!";
      arrowY=height/2 + 30;
      arrowX=infoTokenX+20;
      yourTurn=true;
    }else if(tutorialTick===27){
      arrowX=0;
      highlight="none";
      speech="Now play consecutive cards to the party...";
      yourTurn=true;
    }else if(tutorialTick===28){
      speech="and watch the magic happen!";
      tutorialTime=millis()+3000;
    }else if(tutorialTick===29){
      speech="Did you see that? You got six cards!";
      tutorialTime=millis()+3000;
    }else if(tutorialTick===30){
      speech="That's because chimmy gave you an extra.";
      tutorialTime=millis()+3000;
    }else if(tutorialTick===31){
      speech="Too bad he gave you more than 5...";
      tutorialTime=millis()+3000;
    }else if(tutorialTick===32){
      speech="now you have to discard.";
      yourTurn=true;
      endTurn();
    }else if(tutorialTick===33){
      speech="My turn!";
      giveDiscard(ophand[0], true);
      tutorialTime=millis()+1000;
    }else if(tutorialTick===34){
      speech="These are the action piles...";
      highlight="action";
      tutorialTime=millis()+3000;
    }else if(tutorialTick===35){
      speech="cards played here have special effects,";
      tutorialTime=millis()+3000;
    }else if(tutorialTick===36){
      speech="but they also use your special token.";
      arrowY=height/2 - 30;
      arrowX=infoTokenX+20;
      tutorialTime=millis()+3000;
    }else if(tutorialTick===38){
      speech="Hah, I peanutted you!";
      highlight="none";
      giveAction(ophand[0], true);
      tutorialTime=millis()+3000;
    }else if(tutorialTick===39){
      speech="Now you can't discard next turn.";
      arrowY=height/2 + 30;
      arrowX=infoTokenX+20;
      tutorialTime=millis()+3000;
    }else if(tutorialTick===40){
      speech="Nananabooboo! I have a fred";
      giveDiscard(ophand[0], true);
      tutorialTime=millis()+3000;
    }else if(tutorialTick===41){
      speech="You don't even get to draw";
      tutorialTime=millis()+3000;
    }else if(tutorialTick===42){
      speech="5 card hand, stupid dumdum";
      arrowX=0;
      yourTurnCount=frameCount+90;//holds yourturn display for 90 frames
      ritualed=false;
      discarded=true;
    }else if(tutorialTick===43){
      speech="PUT ME IN THE ACTION PILE!";
      currentImg=lindaImg;
      yourTurn=true;
    }else if(tutorialTick===44){
      speech="PICK SCROUNGER!";
      yourTurn=true;
    }else if(tutorialTick===45){
      speech="YUMMI! CHOOSE YUMMI!";
      yourTurn=true;
    }else if(tutorialTick===46){
      speech="ACTION IT! NOW!";
      yourTurn=true;
    }else if(tutorialTick===47){
      currentImg=funnyImg;
      speech="!@#$%^&*!@#$%^&*!@#$%^&*";
      yourTurn=true;
    }else if(tutorialTick===48){
      speech="I hate you.";
      tutorialTime=millis()+3000;
    }else if(tutorialTick===49){
      speech="Now I'm going to cheat.";
      tutorialTime=millis()+1000;
    }else if(tutorialTick===50){
      giveRitual(ophand[0]);
      tutorialTime=millis()+1000;
    }else if(tutorialTick===51){
      giveRitual(ophand[0]);
      tutorialTime=millis()+1000;
    }else if(tutorialTick===52){
      giveRitual(ophand[0]);
      tutorialTime=millis()+1000;
    }else if(tutorialTick===53){
      giveRitual(ophand[0]);
      tutorialTime=millis()+1000;
    }else if(tutorialTick===54){
      speech="There. 5 cards in the ritual...";
      tutorialTime=millis()+3000;
    }else if(tutorialTick===55){
      speech="of the same color of course.";
      tutorialTime=millis()+3000;
    }else if(tutorialTick===56){
      speech="Now I can purchase a fred of that color.";
      tutorialTime=millis()+3000;
    }else if(tutorialTick===57){
      speech="*drags ritual to fred pile*";
      highlight="fred";
      tutorialTime=millis()+3000;
    }else if(tutorialTick===58){
      giveFredGet(opritual, "op");
      realignHand(ophand, "ophand");
      tutorialTime=millis()+3000;
    }else if(tutorialTick===59){
      highlight="none";
      currentImg=lindaImg;
      speech="I sneaked a fred on top of the deck!";
      yourTurnCount=frameCount+90;//holds yourturn display for 90 frames
      tutorialTime=millis()+3000;
      drawOneTo(hand, true);
      realignHand(hand, "hand");
    }else if(tutorialTick===60){
      highlight="discard";
      speech="Go ahead and dump. (drag ritual to discard)";
      tutorialTime=millis()+3000;
    }else if(tutorialTick===61){
      speech="You'll get to draw 1 card (1 in ritual)";
      yourTurn=true;
      ritualed=false;
      discarded=false;
    }else if(tutorialTick===62){
      speech="You got it. heehee.";
      yourTurn=true;
    }else if(tutorialTick===63){
      currentImg=funnyImg;
      speech="There's no way you can win now.";
      tutorialTime=millis()+2000;
    }else if(tutorialTick===64){
      giveFred(ophand[1], "op");
      ophand.splice(1, 1);
      realignHand(ophand, "ophand");
      tutorialTime=millis()+1000;
    }else if(tutorialTick===65){
      speech="Just give up."
      tutorialTime=millis()+2000;
      yourTurnCount=frameCount+90;//holds yourturn display for 90 frames
    }else if(tutorialTick===66){
      currentImg=lindaImg;
      speech="Quick! play the fred to the fred pile!";
      highlight="fred";
      yourTurn=true;
      ritualed=false;
      discarded=false;
    }
  }
}

function loadCards(){//loads deck in predetermined pattern
  //funny's hand
  deck.push(new Card(1, 3, getImage(3, 1)));//blue 1
  deck.push(new Card(2, 3, getImage(3, 2)));//blue 2
  deck.push(new Card(3, 3, getImage(3, 3)));//blue 3
  deck.push(new Card(4, 3, getImage(3, 4)));//blue 4
  deck.push(new Card(3, 1, getImage(1, 3)));//red 3

  //player's hand
  deck.push(new Card(1, 1, getImage(1, 1)));//red 1
  deck.push(new Card(3, 3, getImage(3, 3)));//blue 3
  deck.push(new Card(3, 2, getImage(2, 3)));//yellow 3
  deck.push(new Card(4, 2, getImage(2, 4)));//yellow 4
  deck.push(new Card(5, 2, getImage(2, 5)));//yellow 5

  //funny's redrawn hand
  deck.push(new Card(5, 3, getImage(3, 5)));//blue 5
  deck.push(new Card(1, 2, getImage(2, 1)));//yellow 1
  deck.push(new Card(2, 2, getImage(2, 2)));//yellow 2
  deck.push(new Card(4, 1, getImage(1, 4)));//red 4
  deck.push(new Card(3, 3, getImage(3, 3)));//blue 3

  //funny's chimmy draw
  deck.push(new Card(5, 3, getImage(3, 5)));//blue 5

  //player's redrawn hand
  deck.push(new Card(4, 2, getImage(2, 4)));//yellow 4
  deck.push(new Card(2, 2, getImage(2, 2)));//yellow 2
  deck.push(new Card(5, 1, getImage(1, 5)));//red 5
  deck.push(new Card(4, 3, getImage(3, 4)));//blue 4
  deck.push(new Card(4, 1, getImage(1, 4)));//red 4
  deck.push(new Card(5, 2, getImage(2, 5)));//yellow 5

  //funny's normal draw
  deck.push(new Card(3, 3, getImage(3, 3)));//blue 3

  //rest
  
  deck.push(new Card(3, 3, getImage(3, 3)));
  deck.push(new Card(3, 3, getImage(3, 3)));
  deck.push(new Card(10, 3, getImage(3, 10)));
  deck.push(new Card(3, 3, getImage(3, 3)));
  deck.push(new Card(3, 3, getImage(3, 3)));

  deckSize=deck.length;
}

function keyPressed(){
  if(keyCode===32){//space
    tutorialTime=0;
  }
}

function setTimer(a, b){}
