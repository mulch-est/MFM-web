let showLogs=true;
let showHelpLogs=true;//"you have already ritualed this turn", etc.
let showErrorLogs=true;
let showInfo=false;//top left

let CARDEXT=".jpg";

let DUPENUMBER=4;//amount of duplicates per basic card in the deck
let FREDNUMBER=5;//amount of "fred merch" cards in the deck
let MAXSUIT=3;//maximum suit index
let MAXCARDS=5;//maximum number of cards in hand
let RITUALNUMBER=5;//minimum number of cards in ritual to fred-get
let LINDATOPNUMBER=3;//top X cards of deck revealed by linda cball

let CARDW=71;
let CARDH=96;
let HBLIMIT=12;//limit of panels in history bar

let deckX;
let deckY;
let hand = [];
let handY;
let ophand = [];
let ophandY;
let parties = [];
let partyX;
let partyY;
let leftParty;
let middleParty;
let rightParty;
let rituals = [];
let ritual;
let opritual;
let freds = [];
let iconX;
let iconY;
let hbX;
let hbY;
let infoTokenX;
let tooltipW;
let tooltipH;

let bgColor;
let redClr;
let blueClr;
let yellowClr;
let playerClr;
let opClr;
let winClr;
let loseClr;
let black;
let white;

let placeholderImg;
let sleeveImg;

let funnyImg;
let arrowImg;
let speechBubble;
let doneBubble;

function realignHand(array, str){//actual array, string location to pass to alignTo()
  for(let i=0; i<array.length; i++){
    array[i].alignTo(str, i, array.length);
  }
}

class Card extends Obj {
  constructor(value, suitIndex, cardFace){
    super(deckX, deckY, CARDW, CARDH);
    this.value=value; //int describing card number (10 if fred)
    this.suitIndex=suitIndex;
    this.suit=getSuit(suitIndex); //string describing card color
    this.cardBack=sleeveImg;
    this.cardFace=cardFace;
    this.faceUp=false;
    this.sel=false;
    this.snapX=0;
    this.snapY=0;
    this.repeats=0;
  }

  display(){
    rect(this.xPos, this.yPos, this.w, this.h);
    if(this.faceUp){
      image(this.cardFace, this.xPos, this.yPos);
    }else {
      image(this.cardBack, this.xPos, this.yPos);
    }
  }

  alignTo(str, i, fh){//str loc, hand index, future hand size
    let al = (fh-1)/2;//determines max offset from center
    let sa = CARDW + 10;//spacing amount in pixels between cards
    //if 0, -al, if 1, -al+1, etc.
    this.xPos=width/2+((i-al)*sa);//determines x based on leftmost point
    //console.log('alignTo xPos:'+this.xPos);
    if(str==="hand"){
      this.yPos=handY;
    }else if(str==="ophand"){
      this.yPos=ophandY;
    }else if(str==="tops"){
      this.xPos=deckX-((CARDW+10)*i);
      this.yPos=deckY;
    }else{
      if(showErrorLogs)console.log("Error assigning card alignment location: 002a");
    }
    this.setSnaps(this.xPos, this.yPos);
    this.refresh();
  }

  setSnaps(x, y){
    this.snapX=x;
    this.snapY=y;
  }

  snap(){
    this.xPos=this.snapX;
    this.yPos=this.snapY;
    this.refresh();
  }
}

function getSuit(suitIndex){
  if(suitIndex===0){
    return "none";
  }else if(suitIndex===1){
    return "red";
  }else if(suitIndex===2){
    return "yellow";
  }else if(suitIndex===3){
    return "blue";
  }else {
    if(showErrorLogs)console.log("Error setting card suit string: 001a");
    return "none";
  }
}

function getSuitIndex(suit){
  if(suit==="red"){
    return 1;
  }else if(suit==="yellow"){
    return 2;
  }else if(suit==="blue"){
    return 3;
  }else if(suit==="none"){
    return 0;
  }else {
    if(showErrorLogs)console.log("Error setting card suit index: 001b");
    return "none";
  }
}

function addToHand(suitIndex, value){
  let card = new Card(value, suitIndex, getImage(suitIndex, value));
  card.faceUp=true;
  drawToHand(hand, card);
  realignHand(hand, "hand");
}

class Party extends Obj {
  constructor(x, y, id){
    super(x, y, CARDW+10, CARDH+10);
    this.topCard;
    this.value=0;
    this.suitIndex=0;
    this.suit="none";
    this.id=id;

    parties.push(this);
  }

  display(){
    rect(this.xPos, this.yPos, this.w, this.h);
    if(this.topCard!==undefined){
      image(this.topCard, this.xPos, this.yPos);
    }
  }

  tryCard(card){
    if(card.value===(this.value+1) && ((card.suitIndex === this.suitIndex) || this.suitIndex===0))return true;
    if(card.value===1 && !ritualed)return true;//funny special
    return false;
  }

  acceptCard(card){
    if(showLogs)console.log(this.id+" party accepted a "+card.suit+" "+card.value);
    giveParty(card);
  }

  serveCard(card, fs){
    this.topCard=card.cardFace;
    this.value++;
    if(fs)this.value=1;
    this.suitIndex=card.suitIndex;
    this.suit=getSuit(this.suitIndex);
  }

  clearCards(){
    if(showLogs)console.log(this.id+" party was chimmy-shuffled");
    this.topCard=undefined;
    this.value=0;
    this.suitIndex=0;
    this.suit="none";
  }
}

class Ritual extends Obj {
  constructor(x, y){
    super(x, y, CARDW+10, CARDH+10);
    this.topCard;
    this.cards=[];
    this.suitIndex=0;
    this.suit="none";
    this.sel=false;

    rituals.push(this);
  }

  display(){
    rect(this.xPos, this.yPos, this.w, this.h);
    if(this.sel){
      for(let i=0; i<this.cards.length; i++){
        noFill();
        rect(mouseX, mouseY+(i*20), CARDW, CARDH);
        image(this.cards[i].cardFace, mouseX, mouseY+(i*20));
      }
    }else {
      for(let i=0; i<this.cards.length; i++){
        noFill();
        rect(this.xPos, this.yPos+(i*20), CARDW, CARDH);
        image(this.cards[i].cardFace, this.xPos, this.yPos+(i*20));
      }
    }
    fill(bgColor);
  }

  tryCard(card){
    if((card.suitIndex === this.suitIndex) || this.suitIndex===0)return true;
    return false;
  }

  acceptCard(card){
    if(showLogs)console.log("Ritual accepted a "+card.suit+" "+card.value);
    this.topCard=card.cardFace;
    this.cards.push(card);
    this.suitIndex=card.suitIndex;
    this.suit=getSuit(this.suitIndex);
  }

  serveCard(card){
    this.topCard=card.cardFace;
    this.cards.push(card);
    this.suitIndex=card.suitIndex;
    this.suit=getSuit(this.suitIndex);
  }

  clearCards(){
    if(showLogs)console.log("ritual was dumped/fredded");
    this.cards=[];
    this.topCard=undefined;
    this.suitIndex=0;
    this.suit="none";
  }

  dump(){
    if(showLogs)console.log("Dumped "+this.cards.length+" cards");
    for(let i=0; i<this.cards.length; i++){
      discard.acceptCard(this.cards[i]);
      getNextFaceUp();
    }
    this.cards=[];
    this.topCard=undefined;
    this.suitIndex=0;
    this.suit="none";
  }
}

class Discard extends Obj {
  constructor(x, y){
    super(x, y, CARDW+10, CARDH+10);
    this.topCard;
    this.cards=[];
  }

  display(){
    rect(this.xPos, this.yPos, this.w, this.h);
    if(this.topCard!==undefined){
      image(this.topCard, this.xPos, this.yPos);
    }
  }

  acceptCard(card){
    if(showLogs)console.log("Discard accepted a "+card.suit+" "+card.value);
    this.topCard=card.cardFace;
    this.cards.push(card);
  }

  serveCard(card){
    this.topCard=card.cardFace;
    this.cards.push(card);
  }
}

class Fred extends Obj {
  constructor(x, y, id){
    super(x, y, CARDW+10, CARDH+10);
    this.cards=[];
    this.id=id;

    freds.push(this);
  }

  display(){
    rect(this.xPos, this.yPos, this.w, this.h);
    for(let i=0; i<this.cards.length; i++){
      noFill();
      rect(this.xPos, this.yPos+(i*20), CARDW, CARDH);
      image(this.cards[i].cardFace, this.xPos, this.yPos+(i*20));
    }
    fill(bgColor);
  }

  tryCard(card){
    if(card.value===10 && !ritualed)return true;
    return false;
  }

  acceptCard(card){
    if(showLogs)console.log("Fred accepted a "+card.suit+" "+card.value);
    this.cards.push(card);
    ritualed=true;
    if(this.cards.length>=FREDNUMBER/2){
      if(this.id==="p"){
        win();
      }else if(this.id==="op"){
        lose();
      }else {
        if(showErrorLogs)console.log("Error setting Fred.id: 003a");
      }
    }
  }

  serveCard(card){
    if(showLogs)console.log("Fred was served a "+card.suit);
    this.cards.push(card);
    ritualed=true;
    if(this.cards.length>=FREDNUMBER/2){
      if(this.id==="p"){
        win();
      }else if(this.id==="op"){
        lose();
      }else {
        if(showErrorLogs)console.log("Error setting Fred.id: 003a");
      }
    }
  }
}

function win(){
  yourTurnCount=0; //removes yourturn popup
  draw();
  middleImg=get();
  socket.emit('leaveRoom',{
    srcRoom:currentRoom, 
    client:socket.id,
  });

  wonLastGame=true;
  middleClr=winClr;
  gamestate="middle";
  currentRoom="none";
  gameStarted=false;
  if(showLogs)console.log("You won");
}

function lose(){
  yourTurnCount=0; //removes yourturn popup
  draw();//makes sure last fred is drawn
  middleImg=get();
  socket.emit('leaveRoom',{
    srcRoom:currentRoom, 
    client:socket.id,
  });
  
  wonLastGame=false;
  middleClr=loseClr;
  gamestate="middle";
  currentRoom="none";
  gameStarted=false;
  if(showLogs)console.log("You lost")
}

class EndButton extends Obj {
  constructor(x, y, w, h){
    super(x, y, w, h);
    this.label="End";
  }

  click(){
    endTurn();
  }
}

class ImgButton extends Obj {
  constructor(x, y, w, h, img, hoverimg, id){
    super(x, y, w, h);
    this.img=img;
    this.hoverimg=hoverimg;
    this.id=id;

    if(this.id==="cball"){
      this.title="Thaumaturge";
      this.desc="Reveal the top 3 cards of the deck";
    }else if(this.id==="eye"){
      this.title="Rubbernecker";
      this.desc="Reveal your opponenet's hand";
    }else if(this.id==="hand"){
      this.title="Scrounger";
      this.desc="Take a card from the discard pile";
    }

    specIcons.push(this);
  }

  click(){
    displayChoice=false;
    if(this.id==="cball"){
      giveCball();
    }else if(this.id==="eye"){
      giveEye();
    }else if(this.id==="hand"){
      giveHand();
    }else {
      if(showErrorLogs)console.log("ImgButton received bad id: 004a");
    }
  }
}

class Action extends Obj {
  constructor(x, y, id){
    super(x, y, CARDW+10, CARDH+10);
    this.topCard;
    this.cards=[];
    this.id=id;
  }

  display(){
    rect(this.xPos, this.yPos, this.w, this.h);
    for(let i=0; i<this.cards.length; i++){
      noFill();
      rect(this.xPos, this.yPos+(i*20), CARDW, CARDH);
      image(this.cards[i].cardFace, this.xPos, this.yPos+(i*20));
    }
    fill(bgColor);
  }

  serveCard(card){
    //console.log(this.id+" action was served a "+card.value);
    if(card.value!==2){
      discard.serveCard(card);
      if(card.value===4 && this.id==="op"){//peanut
        if(!discarded && !yourTurn)discarded=true;
        nextTurnDepressed=true;
      }else if(card.value===3 && this.id==="op"){//yummi
        while(ophand.length>0){
          ophand.splice(0, 1);
        }
        while(ophand.length<hand.length){
          let xcard=new Card(0, 0, sleeveImg);
          ophand.push(xcard);
        }
      }
    }else {//linda
      this.topCard=card.cardFace;
      this.cards.push(card);
    }
  }

  tryCard(card){
    if(card.value===4 || card.value===3)return true;
    
    if(card.value===2){
      let ok=true;
      for(let i=0; i<this.cards.length; i++){
        if(this.cards[i].value===2){
          ok=false;
          break;
        }
      }
      if(ok)return true;
    }
    
    return false;
  }

  acceptCard(card){
    if(showLogs)console.log("Action accepted a "+card.suit+" "+card.value);
    this.topCard=card.cardFace;
    this.cards.push(card);
  }
}

class HistoryPanel {
  constructor(id, suitIndex, value, src){
    this.id=id;
    this.suitIndex=suitIndex;
    this.value=value;
    if(src===socket.id){
      this.src=playerId;
    }else this.src=0;

    historybar.push(this);
  }
}
