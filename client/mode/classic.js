setInterval(refreshTime, 1000);

let ptime = "5:00";
let optime = "5:00";
let pdispTime = 5000*60;
let pbackTime = 5000*60;
let opdispTime = 5000*60;
let opbackTime = 5000*60;
//let plastTime = 5000*60;
//let oplastTime = 5000*60;
let lastTurnEnd = -1;
let timerSet = false;

function displayGame(){
  background(bgColor);
  //fill(255);
  //text("Welcome to Famous Fred's", width/2, height*0.2);
  //text("Monster Merchandise", width/2, height*0.25);

  if(deckSize>0)image(sleeveImg, deckX, deckY);//pseudo- deck display
  for(let i=0; i<ophand.length; i++){
    ophand[i].display();
  }
  for(let i=0; i<tops.length; i++){
    tops[i].display();
  }
  fill(bgColor);
  stroke(0);
  discard.display();
  for(let i=0; i<freds.length; i++){
    freds[i].display();
  }
  action.display();
  opaction.display();
  for(let i=0; i<rituals.length; i++){
    rituals[i].display();
  }
  for(let i=0; i<parties.length; i++){
    parties[i].display();
  }

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
  }
  let opconX = opaction.xPos + opaction.w + 30;

  if(mouseX>opconX-25 && mouseX<opconX+25 && mouseY>opaction.yPos-25 && mouseY<opaction.yPos+25){
    if(dispcball){
      //tooltip
      fill(40, 40, 40, 80);
      rect(mouseX+tooltipW/2, mouseY+tooltipH/2, tooltipW, tooltipH);
      fill(255);
      textSize(16);
      text(specIcons[0].title, mouseX+tooltipW/2, mouseY+tooltipH*0.35);
      textSize(12);
      text(specIcons[0].desc, mouseX+tooltipW/2, mouseY+tooltipH*0.65);
      //image
      image(specIcons[0].hoverimg, opconX, opaction.yPos);
    }else if(dispeye){
      //tooltip
      fill(40, 40, 40, 80);
      rect(mouseX+tooltipW/2, mouseY+tooltipH/2, tooltipW, tooltipH);
      fill(255);
      textSize(16);
      text(specIcons[1].title, mouseX+tooltipW/2, mouseY+tooltipH*0.35);
      textSize(12);
      text(specIcons[1].desc, mouseX+tooltipW/2, mouseY+tooltipH*0.65);
      //image
      image(specIcons[1].hoverimg, opconX, opaction.yPos);
    }else if(disphand){
      //tooltip
      fill(40, 40, 40, 80);
      rect(mouseX+tooltipW/2, mouseY+tooltipH/2, tooltipW, tooltipH);
      fill(255);
      textSize(16);
      text(specIcons[2].title, mouseX+tooltipW/2, mouseY+tooltipH*0.35);
      textSize(12);
      text(specIcons[2].desc, mouseX+tooltipW/2, mouseY+tooltipH*0.65);
      //image
      image(specIcons[2].hoverimg, opconX, opaction.yPos);
    }
  }else {
    if(dispcball)image(specIcons[0].img, opconX, opaction.yPos);
    if(dispeye)image(specIcons[1].img, opconX, opaction.yPos);
    if(disphand)image(specIcons[2].img, opconX, opaction.yPos);
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

  fill(0);
  text(ptime, endBtn.xPos, endBtn.yPos+50);
  text(optime, endBtn.xPos, endBtn.yPos-50);

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

  //loadCards();//pushes all number cards to deck
  //if(showLogs)console.log(deck);
  //deck=shuffle(deck);//shuffles
  //if(showLogs)console.log(deck);
  initCards=MAXCARDS;
  for(let i=0; i<MAXCARDS; i++){//deals cards to player hand
    getNextFaceUp();
  }
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
  opfred = new Fred(deckX, deckY-CARDH*1.5, "op");

  action = new Action(discardX, iconY, "p");
  opaction = new Action(discardX, deckY-CARDH*1.5, "op");

  discard = new Discard(discardX, deckY);

  cballbtn = new ImgButton(iconX, iconY-75, 50, 50, cballcon, cballhovercon, "cball");
  eyebtn = new ImgButton(iconX, iconY, 50, 50, eyecon, eyehovercon, "eye");
  handbtn = new ImgButton(iconX, iconY+75, 50, 50, handcon, handhovercon, "hand");

  endBtn = new EndButton(width*0.9, height/2, width/20, height/20);

  realignHand(ophand, "ophand");
}

function getNextFaceUp(){
  if(deckSize>0){
    if(showLogs)console.log("asked for a card");
    socket.emit('getCard', {
      room:currentRoom, 
      client:socket.id, 
    });
    deckSize=deckSize-1;
  }
}

function endTurn(){
  if(yourTurn && !displayChoice && !lindHandin){
    if(hand.length>MAXCARDS){
      //discard from hand because you accrued more than MAXCARDS cards
      discarded=false;
      discardTime=true;
    }else {
      discardTime=false;
      yourTurn=false;
      if(ophand.length<5 && deckSize>0){
        deckSize=deckSize-1;
        drawToHand(ophand, new Card(0, 0, sleeveImg));
        realignHand(ophand, "ophand");
      }
      socket.emit('finTurn', {
        room:currentRoom,
        client:socket.id,
      });
    }
  }
}

//card playing emits to server
function giveParty(id, card){
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
  }
  socket.emit('giveParty', {
    room:currentRoom,
    client:socket.id,
    cardSuit:card.suitIndex,
    cardVal:card.value,
    id:id,
    partySuit:partysi,
    partyVal:partyv,
    partyvList:discardvs,
    funyun:funnySpecial,
  });
  funnySpecial=false;
}

function giveRitual(card){
  socket.emit('giveRitual', {
    room:currentRoom,
    client:socket.id,
    cardSuit:card.suitIndex,
    cardVal:card.value,
  });
}

function giveDiscard(card){
  socket.emit('giveDiscard', {
    room:currentRoom,
    client:socket.id,
    cardSuit:card.suitIndex,
    cardVal:card.value,
  });
}

function giveFred(card){
  socket.emit('giveFred', {
    room:currentRoom,
    client:socket.id,
    cardSuit:card.suitIndex,
  });
}

function giveHandAction(card){
  let suits=[];
  let vals=[];
  let excludedOne = false;
  for(let i=0; i<hand.length; i++){
    if(hand[i].suitIndex===card.suitIndex && hand[i].value===card.value && !excludedOne){
      excludedOne=true;
    }else {
      //console.log('sending over '+getSuit(hand[i].suitIndex)+hand[i].value+" for swap");
      suits.push(hand[i].suitIndex);
      vals.push(hand[i].value);
    }
  }
  socket.emit('giveHandAction', {
    room:currentRoom,
    client:socket.id,
    suitIndexList:suits,
    valueList:vals,
    cardSuit:card.suitIndex,
    cardVal:card.value,
    initSwap:true,
  });
}

function giveHandGimme(){
  let suits=[];
  let vals=[];
  for(let i=0; i<hand.length; i++){
    //console.log('sending over '+getSuit(hand[i].suitIndex)+hand[i].value+" for swap");
    suits.push(hand[i].suitIndex);
    vals.push(hand[i].value);
  }
  socket.emit('giveHandGimme', {
    room:currentRoom,
    client:socket.id,
    suitIndexList:suits,
    valueList:vals,
  });
}

function giveAction(card){
  socket.emit('giveAction', {
    room:currentRoom,
    client:socket.id,
    cardSuit:card.suitIndex,
    cardVal:card.value,
  });
}

function giveDump(ritual){
  if(ritual.length>0){
    let suits=[];
    let vals=[];
    for(let i=0; i<ritual.length; i++){
      suits.push(ritual[i].suitIndex);
      vals.push(ritual[i].value);
      getNextFaceUp();
    }
    socket.emit('giveDump', {
      room:currentRoom,
      client:socket.id,
      suitIndexList:suits,
      valueList:vals,
    });
  }
}

function giveFredGet(ritual){
  if(ritual.length>0){
    let suits=[];
    let vals=[];
    for(let i=0; i<ritual.length; i++){
      suits.push(ritual[i].suitIndex);
      vals.push(ritual[i].value);
      //getNextFaceUp();
    }
    socket.emit('giveFredGet', {
      room:currentRoom,
      client:socket.id,
      suitIndexList:suits,
      valueList:vals,
    });
  }
}

function giveGimmeDiscard(dcard){
  socket.emit('giveGimmeDiscard', {
    client:socket.id,
    room:currentRoom,
    cardSuit:dcard.suitIndex,
    cardVal:dcard.value,
  });
}

function giveCball(){
  //look at top 3 of deck
  if(showLogs)console.log("chose look at top 3");
  socket.emit('giveGimmeTops', {
    room:currentRoom,
    client:socket.id,
  });
}

function giveEye(){
  //look at op hand
  if(showLogs)console.log("chose look at op hand");
  socket.emit('giveGimmeHand', {
    room:currentRoom,
    client:socket.id,
  });
}

function giveHand(){
  //get card from discard
  if(showLogs)console.log("chose get from discard");
  if(discard.cards.length>0){
    displayDiscard=false;
    lindHandin=true;
    presentDiscard();
  }else {
    if(showLogs)console.log("discard is empty, did nothing");
    socket.emit('clearLindShow', {
      room:currentRoom,
      client:socket.id,
    });
  }
}

function pushIn(dcard){
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

  if(array.length===0){//redraw hand if hand is empty
    for(let i=0; i<MAXCARDS; i++){
      if(deckSize>0){
        let card = new Card(0, 0, sleeveImg);
        drawToHand(array, card);
        deckSize=deckSize-1;
      }
    }
  }
}

//timer functions
function refreshTime(){//called every second to show timer ticking
  console.log("called reftime");
  if(gameStarted){
    if(pdispTime-1000<=0){//you ran out of time
      //lose();//this may cause weird disconnect-related unsure of win states
    }

    if(yourTurn){
      formatTime(socket.id, pdispTime-1000);
    }else{
      formatTime('op', opdispTime-1000);
    }
  }
}

function formatTime(id, timer){//formats ms value for normal viewer
  let seconds = Math.floor(timer/1000);
  let minutes=0;

  while (seconds>=60){
    minutes++;
    seconds-=60;
  }
  while (seconds<0){
    minutes--;
    seconds+=60;
  }

  if(id===socket.id){
    if(seconds>=10){
      ptime=minutes+":"+seconds;
    }else {
      ptime=minutes+":0"+seconds;
    }
  }else{
    if(seconds>=10){
      optime=minutes+":"+seconds;
    }else {
      optime=minutes+":0"+seconds;
    }
  }
  if(yourTurn){
    pdispTime=timer;
  }else {
    opdispTime=timer;
  }
}

function setTimer(id, date){//called by server on turn start of any player in room
  if(!timerSet){
    if(yourTurn){//sets time to correct ms value using server time
      pbackTime=pbackTime-(date-lastTurnEnd);
      pdispTime=pbackTime;
    }else {//may need to be flipped since this is called before yourTurn is set
      opbackTime=opbackTime-(date-lastTurnEnd);
      opdispTime=opbackTime;
    }
  }else {//here to record first lastTurnEnd
    timerSet=true;
  }

  lastTurnEnd=date;//both clients register this time for backTime manip
}

/*og 
function refreshTime(){
  console.log("called reftime");
  if(gameStarted){
    if(plastTime-1000<=0){//you ran out of time
      lose();//these may cause weird disconnect-related unsure of win states
    }else if(oplastTime-1000<=0){//opponent ran out of time
      win();
    }
    if(yourTurn){
      setTimer(socket.id, 0, plastTime-1000);
    }else{
      setTimer('op', 0, oplastTime-1000);
    }
  }
}

function setTimer(id, date, time){
  let timer=time;
  if(date!==0){
    lastTurnEnd=date;
    if(yourTurn){
      timer=plastTime;
    }else {
      timer=oplastTime;
    }
  }
  let seconds;
  if(timerSet){
    seconds = Math.floor(timer/1000);
  }else {
    seconds = 5*60;
    timerSet=true;
  }
  
  let minutes=0;
  while (seconds>=60){
    minutes++;
    seconds-=60;
  }
  while (seconds<0){
    minutes--;
    seconds+=60;
  }
  if(id===socket.id){
    if(seconds>9){
      ptime=minutes+":"+seconds;
    }else {
      ptime=minutes+":0"+seconds;
    }
  }else{
    if(seconds>9){
      optime=minutes+":"+seconds;
    }else {
      optime=minutes+":0"+seconds;
    }
  }
  if(yourTurn){
    plastTime=timer;
  }else {
    oplastTime=timer;
  }
}
*/