
function catchUp() {
  // var round = testhand['PokerHand']['Rounds'].length - 1;

  setBoard();
  setHeroCards();
  setOpponentCards();
  setPlayerNames();
  setPlayerStacks();
  setPots();

  // curActions = testhand['PokerHand']['Rounds'][round]['Actions'];
  //curBets = [0,0,0,0,0,0,0];
  addCommittedAmounts(curActions, curBets, testhand);
  for (var i = 0; i < curBets.length; i++)
    setBet(curBets[i], i + 1);

  moveButton(targetSeat + 1);
  targetSeat = (targetSeat + 1) % 6;
}

function updateGameState() {
  var sidebar = $('#poker_table');
  var requestData = {
    url: sidebar.data('uid')
  };
  catchUp();
}

function setTimer(val) {
  var timer = $('#game-timer');
  timer.removeClass();
  if (val < 10)
    timer.addClass("timer-warning");
  else
    timer.addClass("timer-normal");

  if (val < 0)
    val = 0;

  timer.text(val + " seconds remaining.");
  timer.show();
}
function hideTimer() {
  $('#game-timer').hide();
}

function setPlayerNames(playerids) {
  players = playerids
  for (var i = 0; i < players.length; i++)
    setPlayerName(playerids[i], playerids[i]);
}

function setPlayerName(name, seat) {
  var namediv = $('#seat' + seat).children('.name-chips').children('.player-name');
  namediv.text(name);
}

function setPlayerStacks(hand) {
  committed = [0, 0, 0, 0, 0, 0, 0];
  blinds = hand['PokerHand']['Blinds'];
  addCommittedAmounts(blinds, committed, hand);

  // var rounds = hand['PokerHand']['Rounds'];
  // for (var i = 0; i < rounds.length; i++)
  //     addCommittedAmounts(rounds[i], committed, hand);

  // players = hand['PokerHand']['Players'];
  // for(var i = 0; i < players.length; i++){
  //     stack = parseFloat(players[i]['Stack']);
  //     seat = parseInt(players[i]['Seat']);
  //     setPlayerStack(stack - committed[seat], seat);
  // }
}

function setPlayerStack(amount, seat) {
  chipsdiv = $('#seat' + seat).children('.name-chips').children('.chips');
  if (amount == null)
    chipsdiv.text("");
  else
    chipsdiv.text("$" + amount);
}

function addCommittedAmounts(actions, committed, hand) {
  for (var aidx = 0; aidx < actions.length; aidx++) {
    var amt = actions[aidx]['Amount'];
    if (amt == null)
      continue;
    amt = parseFloat(amt);
    seat = findSeatNumber(actions[aidx]['Player'], hand);
    committed[seat] += amt;
  }
}

function getCardSrc(rank, suit) {
  let suit_words = null;
  if (suit === 0) {
    suit_words = "diamonds";
  }
  else if (suit === 1) {
    suit_words = "clubs";
  }
  else if (suit === 2) {
    suit_words = "hearts";
  }
  else if (suit === 3) {
    suit_words = "spades";
  }

  if (rank >= 0 && rank <= 8) {
    rank = rank + 2;
  }
  else if (rank == 9) {
    rank = "jack";
  }
  else if (rank == 10) {
    rank = "queen";
  }
  else if (rank == 11) {
    rank = "king";
  }
  else if (rank == 12) {
    rank = "ace";
  }
  // rank = rank.toLowerCase();
  // if (rank == "two")
  //   rank = 2;
  // else if (rank == "three")
  //   rank = 3;
  // else if (rank == "four")
  //   rank = 4;
  // else if (rank == "five")
  //   rank = 5;
  // else if (rank == "six")
  //   rank = 6;
  // else if (rank == "seven")
  //   rank = 7;
  // else if (rank == "eight")
  //   rank = 8;
  // else if (rank == "nine")
  //   rank = 9;
  // else if (rank == "ten")
  //   rank = 10;
  return "url('static/images/" + rank + "_of_" + suit_words.toLowerCase() + ".png')";
}

function setHeroCards(hand) {
  var hero = hand['PokerHand']['Hero'];
  var seat = findSeatNumber(hero, hand);
  var hc = hand['PokerHand']['HoleCards'];
  setHoleCards(hc, seat);
}

function setOpponentCards(hand) {
  results = hand['PokerHand']['Results'];
  if (results == null)
    return;
  for (var i = 0; i < results.length; i++) {
    hc = results[i]['HoleCards'];
    if (hc == null)
      continue;
    setHoleCards(hc, findSeatNumber(results[i]['Player'], hand));
  }
}

function findSeatNumber(player, hand) {
  seats = hand['PokerHand']['Players']
  for (var i = 0; i < seats.length; i++) {
    if (seats[i]['Name'] == player)
      return parseInt(seats[i]['Seat'])
  }
  return -1;
}

function setHoleCards(seat, hc) {
  var holecards = $('#seat' + seat).children('.holecards');
  var card1 = holecards.children('.holecard1');
  var card2 = holecards.children('.holecard2');

  setCard(card1, hc[0]);
  setCard(card2, hc[1]);
}

function setBoard(hand) {
  // var round = testhand['PokerHand']['Rounds'].length - 1;
  // if (round >= 1){
  //     setFlop(testhand['PokerHand']['Rounds'][1]['CommunityCards']);
  //     if(round >= 2){
  //         setTurn(testhand['PokerHand']['Rounds'][2]['CommunityCards']);
  //         if(round >= 3){
  //             setRiver(testhand['PokerHand']['Rounds'][3]['CommunityCards']);
  //         }
  //     }         
  // }


}

function setFlop(flop) {
  setCard($('#flop1'), flop[0]);
  setCard($('#flop2'), flop[1]);
  setCard($('#flop3'), flop[2]);

  $('#flop1').show();
  $('#flop2').show();
  $('#flop3').show();

}

function setTurn(turn) {
  setCard($('#turn'), turn);
  $('#turn').show();
}

function setRiver(river) {
  setCard($('#river'), river);
  $('#river').show();
}

function setCard(div, card) {
  div.css('background-image', getCardSrc(card['rank'], card['suit']))
}

function setBet(bet, seat) {
  var betdiv = $('#seat' + seat).children('.bet');
  if (bet == null || bet == 0)
    betdiv.text('');
  else
    betdiv.text('$' + bet);
}

// function setPots(curPot, totalPot) {


//   setCurrentPot(curPot);
//   setTotalPot(totalPot);
// }

// function setTotalPot(amount) {
//   $('#total-pot').text('Total pot: $' + amount.toFixed(2));
// }

// function setCurrentPot(amount) {
//   if (amount == 0)
//     $('#current-pot').text("");
//   else
//     $('#current-pot').text('$' + amount.toFixed(2));
// }


function moveButton(seat) {
  var button = $('#button');
  button.removeClass();
  button.addClass('seat' + seat + '-button');
}

setupwebsocket();


// Global vars
var socket = null;
var user_id = null;
var table_id = null;
var hand_id = null;

// Global vars end

function setupwebsocket() {


  const queryString = window.location.search;

  // Create a URLSearchParams object from the query string
  const params = new URLSearchParams(queryString);

  // Get the value of a specific parameter by its name
  user_id = params.get('user_id');

  if (!user_id) {
    console.log("user_id not found, returning")
    return;
  }

  socket = new WebSocket('ws://localhost:8080');



  // Interval for sending heartbeats (in milliseconds)
  const heartbeatInterval = 5000; // 5 seconds

  function sendHeartbeat() {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(`{"type": "heartbeatreq", "src": ${user_id}}\n`);
    }
  }

  function sendSetup() {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(`{"type": "setup", "sid": "test", "src": ${user_id}}\n`);
    }
  }

  $("#fold-button").click(function () {

    const playerAction = getPlayerActionObject();
    playerAction.action = "fold";
    sendMessage(playerAction);
    toggleActionsMenu(false);
    stopTimer();
  });

  $("#check-button").click(function () {

    const playerAction = getPlayerActionObject();
    playerAction.action = "check";
    sendMessage(playerAction);
    toggleActionsMenu(false);
    stopTimer();
  });

  function sendMessage(obj) {
    socket.send(JSON.stringify(obj));
    console.log("Message sent", obj);
  }

  $("#call-button").click(function () {

    const playerAction = getPlayerActionObject();
    playerAction.action = "call";
    sendMessage(playerAction);
    toggleActionsMenu(false);
    stopTimer();
  });

  $("#raise-button").click(function () {

    const playerAction = getPlayerActionObject();
    playerAction.action = "raise";
    const raiseValue = $('#raise-range').val();
    playerAction.bet = raiseValue;
    sendMessage(playerAction);
    toggleActionsMenu(false);
    stopTimer();
  });

  $("#allin-button").click(function () {

    const playerAction = getPlayerActionObject();
    playerAction.action = "ALL_IN";
    sendMessage(playerAction);
    toggleActionsMenu(false);
    stopTimer();
  });

  document.getElementById('raise-range').oninput = function () {
    document.getElementById('sliderValue').innerHTML = this.value;
  }

  function getPlayerActionObject() {

    return {
      "type": "PLAYER_ACTION",
      "tableId": table_id,
      "handId": hand_id,
      "sid": "test",
      "src": user_id,
      "action": null,
      "bet": null
    }
  }

  socket.addEventListener('open', function (event) {
    console.log('WebSocket connection established.');
    // Send the first heartbeat immediately upon connection

    sendSetup();
    sendHeartbeat();

    // Schedule sending heartbeats at regular intervals
    setInterval(sendHeartbeat, heartbeatInterval);
  });

  socket.addEventListener('message', function (event) {
    const data = JSON.parse(event.data);
    if (data.type === 'heartbeatresp') {
      return;
    }
    console.log("Incoming message", data);
    if (data.type === 'INITIALIZE_HAND') {
      handleHandInitMessage(data);
    }
    else if (data.type === 'HOLE_CARDS') {
      distributeHoleCards(data);
    }
    else if (data.type === 'PLAYER_TURN') {
      handlePlayerTurn(data);
    }
    else if (data.type === 'TURN_UPDATE_BROADCAST') {
      handleTurnUpdateBroadcast(data);
    }
    else if (data.type === 'NEW_ROUND') {
      handleNewRound(data);
    }
    else if (data.type === 'HAND_STRENGTH') {
      handleStrengths(data);
    }
  });

  socket.onclose = () => {
    console.log('WebSocket connection closed.');
  };

  // Event handler for WebSocket error event
  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  updateGameState();
}

function handleStrengths(data) {
  setStrength(user_id, data.handStrength);
}

function handleNewRound(data) {
  if (data.round === 'FLOP') {
    setFlop(data.cards);
  }
  else if (data.round === 'TURN') {
    setTurn(data.cards[3]);
  }
  else if (data.round === 'RIVER') {
    setRiver(data.cards[4]);
  }

  // We call the same method, since the metadata is same
  handleTurnUpdateBroadcast(data);

}

function handleHandInitMessage(handInitMessage) {
  $('.seat').hide();
  handInitMessage.users.forEach(user => {
    const playerId = user.playerId;
    $('#seat' + playerId).show();
    $('#seat' + playerId + ' .holecards').hide();

    $('#seat' + playerId + ' .chips').text(user.walletAmount)
    if (user.bet) {
      $('#seat' + playerId + ' .bet').text(user.bet)
    }
    else {
      $('#seat' + playerId + ' .bet').text("")
    }
    if (user.smallBlind) {
      let sbplayerName = $('#seat' + playerId + ' .player-name').text();
      $('#seat' + playerId + ' .player-name').text(sbplayerName + " SB");
    }
    else if (user.bigBlind) {
      let bbplayerName = $('#seat' + playerId + ' .player-name').text();
      $('#seat' + playerId + ' .player-name').text(bbplayerName + " BB");
    }
    else if (user.dealer) {
      moveButton(playerId);
    }
  });

  //$('#board').hide();
  hideCommunityCards();
  setPots(handInitMessage);

  $('#game-timer').hide();
  toggleActionsMenu(false);
  hideStrengths();
  hideStatus();

  // assign globals
  table_id = handInitMessage.tableId;
  hand_id = handInitMessage.handId;

}

function hideStatus() {
  $('.status').hide();
}

function hideStrengths() {

  $(".handstrength").hide();
  $(".handrank").hide();
}

function hideCommunityCards() {
  $('#flop1').hide();
  $('#flop2').hide();
  $('#flop3').hide();
  $('#turn').hide();
  $('#river').hide();
}

function distributeHoleCards(data) {
  setHoleCards(user_id, data.cards)
  setStrength(user_id, data.handStrength);
  data.activePlayers.forEach(user => {
    $('#seat' + user + ' .holecards').show();
  });
}

function setStrength(user_id, handStrength) {
  $('#seat' + user_id + ' #handstrength').attr('value', handStrength.handValue);
  $('#seat' + user_id + ' #handrank').text(handStrength.handStrength);

  $('#seat' + user_id + ' #handstrength').show();
  $('#seat' + user_id + ' #handrank').show();
}



function handleTurnUpdateBroadcast(data) {

  setPots(data);

  data.users.forEach(user => {
    const playerId = user.playerId;
    $('#seat' + playerId + ' .chips').text(user.walletAmount)
    $('#seat' + playerId + ' .bet').text(user.totalBet);

    if (user.status) {
      $('#seat' + playerId + ' .status').text(user.status);
      $('#seat' + playerId + ' .status').show();
    }
    else {
      $('#seat' + playerId + ' .status').text("");
    }
  });
}

function setPots(data) {
  let i = 1;
  $('.pot').text("");
  data.pots.forEach(pot => {
    $('#total-pot' + i).text(pot.pot);
    i++;
  });
}

function handlePlayerTurn(data) {
  data.actionMenu.forEach(action => {
    if (action.action === 'fold') {
      $("#fold-button").show();
    }
    else if (action.action === 'check') {
      $("#check-button").show();
    }
    else if (action.action === 'call') {
      $("#call-button").show();
      $('#call-button').text('Call ' + action.bet);
    }
    else if (action.action === 'raise') {
      $("#raise-button").show();
      $("#raise-range").show();
      $('#raise-range').attr('min', action.minBet);
      $('#raise-range').attr('max', action.maxBet);
    }
    else if (action.action === 'all_in') {
      $("#allin-button").show();
      $('#allin-button').text('AllIn ' + action.bet);
    }

  });
  startTimer(user_id);

}

function toggleActionsMenu(show) {
  if (show) {
    $('#action-options').show();
  }
  else {
    $("#fold-button").hide();
    $("#check-button").hide();
    $("#call-button").hide();
    $("#raise-button").hide();
    $('#raise-range').hide();
    $("#allin-button").hide();
  }
}


function start_game() {

  if (socket == null) {
    console.error("Socket not connected");
    return;
  }

  socket.send(`{"type": "start_game", "sid": "test", "src": ${user_id}}\n`);

}

function stopTimer() {
  clearInterval(existing_timer);
  existing_timer = null;
  current_turn_user = null;
}

function startTimer(userId) {
  
  if (existing_timer != null) {
    clearInterval(existing_timer);
  }

  current_turn_user = userId;
  existing_timer = setInterval(blink_text, 1000);
}

var current_turn_user = null;
var existing_timer = null;

function blink_text() {
  $('#seat' + current_turn_user + ' .player-name').fadeOut(500);
  $('#seat' + current_turn_user + ' .player-name').fadeIn(500);
}