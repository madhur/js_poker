var game;
var server;
var targetSeat = 0;

testhand = {
  "PokerHand": {
    "Blinds": [
      {
        "Player": "TAP_OR_SNAP",
        "Type": "SmallBlind",
        "Amount": "5"
      },
      {
        "Player": "OsoWhisper",
        "Type": "BigBlind",
        "Amount": "10"
      }
    ],
    "HoleCards": [
      {
        "Rank": "King",
        "Suit": "Hearts"
      },
      {
        "Rank": "Jack",
        "Suit": "Clubs"
      }
    ],
    "Rounds": [
      {
        "Actions": [
          {
            "Player": "Sevillano720",
            "Type": "Fold"
          },
          {
            "Player": "LC1492",
            "Type": "Call",
            "Amount": "10"
          },
          {
            "Player": "Dodenburg",
            "Type": "Fold"
          },
          {
            "Player": "TeeJay5",
            "Type": "Raise",
            "Amount": "20"
          },
          {
            "Player": "TAP_OR_SNAP",
            "Type": "Call",
            "Amount": "15"
          },
          {
            "Player": "OsoWhisper",
            "Type": "Call",
            "Amount": "10"
          },
          {
            "Player": "LC1492",
            "Type": "Call",
            "Amount": "10"
          }
        ]
      },
      {
        "CommunityCards": [
          {
            "Rank": "Ten",
            "Suit": "Diamonds"
          },
          {
            "Rank": "Jack",
            "Suit": "Diamonds"
          },
          {
            "Rank": "Eight",
            "Suit": "Clubs"
          }
        ],
        "Actions": [
          {
            "Player": "TAP_OR_SNAP",
            "Type": "Bet",
            "Amount": "10"
          },
          {
            "Player": "OsoWhisper",
            "Type": "Raise",
            "Amount": "20"
          },
          {
            "Player": "LC1492",
            "Type": "Fold"
          },
          {
            "Player": "TeeJay5",
            "Type": "Call",
            "Amount": "20"
          },
          {
            "Player": "TAP_OR_SNAP",
            "Type": "Raise",
            "Amount": "20"
          },
          {
            "Player": "OsoWhisper",
            "Type": "Raise",
            "Amount": "20"
          },
          {
            "Player": "TeeJay5",
            "Type": "Fold"
          },
          {
            "Player": "TAP_OR_SNAP",
            "Type": "Call",
            "Amount": "10"
          }
        ]
      },
      {
        "CommunityCards": {
          "Rank": "Five",
          "Suit": "Spades"
        },
        "Actions": [
          {
            "Player": "TAP_OR_SNAP",
            "Type": "Check"
          },
          {
            "Player": "OsoWhisper",
            "Type": "Bet",
            "Amount": "20"
          },
          {
            "Player": "TAP_OR_SNAP",
            "Type": "Call",
            "Amount": "20"
          }
        ]
      },
      {
        "CommunityCards": {
          "Rank": "Nine",
          "Suit": "Clubs"
        },
        "Actions": [
          {
            "Player": "TAP_OR_SNAP",
            "Type": "Check"
          },
          {
            "Player": "OsoWhisper",
            "Type": "Bet",
            "Amount": "20"
          },
          {
            "Player": "TAP_OR_SNAP",
            "Type": "Call",
            "Amount": "20"
          }
        ]
      }
    ],
    "Context": {
      "Site": "PartyPoker",
      "Currency": "USD",
      "ID": "2229799540",
      "Table": "Table  12551 ",
      "TimeStamp": "2005-06-19T04:15:10",
      "Format": "CashGame",
      "Button": "1",
      "BigBlind": "10",
      "SmallBlind": "5",
      "BettingType": "FixedLimit",
      "PokerVariant": "TexasHoldEm"
    },
    "Results": [
      {
        "Player": "OsoWhisper",
        "HoleCards": [
          {
            "Rank": "Nine",
            "Suit": "Spades"
          },
          {
            "Rank": "Queen",
            "Suit": "Spades"
          }
        ],
        "WonPots": { "Amount": "258" }
      },
      {
        "Player": "TAP_OR_SNAP",
        "HoleCards": [
          {
            "Rank": "Nine",
            "Suit": "Diamonds"
          },
          {
            "Rank": "Ten",
            "Suit": "Hearts"
          }
        ]
      }
    ],
    "Players": [
      {
        "Name": "TeeJay5",
        "Stack": "526",
        "Seat": "1"
      },
      {
        "Name": "TAP_OR_SNAP",
        "Stack": "301",
        "Seat": "2"
      },
      {
        "Name": "OsoWhisper",
        "Stack": "177.77",
        "Seat": "3"
      },
      {
        "Name": "Sevillano720",
        "Stack": "742",
        "Seat": "4"
      },
      {
        "Name": "Dodenburg",
        "Stack": "458.5",
        "Seat": "6"
      },
      {
        "Name": "LC1492",
        "Stack": "641",
        "Seat": "5"
      }
    ],
    "Rake": "2.00",
    "Hero": "TeeJay5"
  }
};

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
  rank = rank.toLowerCase();
  if (rank == "two")
    rank = 2;
  else if (rank == "three")
    rank = 3;
  else if (rank == "four")
    rank = 4;
  else if (rank == "five")
    rank = 5;
  else if (rank == "six")
    rank = 6;
  else if (rank == "seven")
    rank = 7;
  else if (rank == "eight")
    rank = 8;
  else if (rank == "nine")
    rank = 9;
  else if (rank == "ten")
    rank = 10;
  return "url('static/images/" + rank + "_of_" + suit.toLowerCase() + ".png')";
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

function setHoleCards(hc, seat) {
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
}

function setTurn(turn) {
  setCard($('#turn'), turn);
}

function setRiver(river) {
  setCard($('#river'), river);
}

function setCard(div, card) {
  div.css('background-image', getCardSrc(card['Rank'], card['Suit']))
}

function setBet(bet, seat) {
  var betdiv = $('#seat' + seat).children('.bet');
  if (bet == null || bet == 0)
    betdiv.text('');
  else
    betdiv.text('$' + bet);
}

function setPots(curPot, totalPot) {


  setCurrentPot(curPot);
  setTotalPot(totalPot);
}

function setTotalPot(amount) {
  $('#total-pot').text('Total pot: $' + amount.toFixed(2));
}

function setCurrentPot(amount) {
  if (amount == 0)
    $('#current-pot').text("");
  else
    $('#current-pot').text('$' + amount.toFixed(2));
}

function getChipSrc(chipValue) {

}

function foldClicked() {

}

function callClicked() {

}

function raiseClicked() {

}

function resetTable() {

}

function moveButton(seat) {
  var button = $('#button');
  button.removeClass();
  button.addClass('seat' + seat + '-button');
}

setupwebsocket();


// Global vars
var socket = null;
var user_id = null;

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
    console.log("Incoming message", data);
    if (data.type === 'INITIALIZE_HAND') {
      handleHandInitMessage(data);
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

function handleHandInitMessage(handInitMessage) {
  $('.seat').hide();
  $('.seat').hide();
  handInitMessage.users.forEach(uid=>{
      $('#seat' + uid).show();
  });
  handInitMessage.users.forEach(uid=>{
    $('#seat' + uid  + ' chips').text(handInitMessage.initialAmounts[0])
  });
  handInitMessage.users.forEach(uid=>{
    $('#seat' + uid  + ' .bet').text("0")
  });
  var sbUserId, bbUserId, dealerUserId;
  sbUserId = handInitMessage.users[handInitMessage.smallBlindPosition];
  bbUserId = handInitMessage.users[handInitMessage.bigBlindPosition];
  dealerUserId = handInitMessage.users[handInitMessage.dealerPosition];

  moveButton(dealerUserId)
  let  sbplayerName = $('#seat' + sbUserId + ' .player-name').text();
  $('#seat' + sbUserId + ' .player-name').text(sbplayerName + " SB");

  let  bbplayerName = $('#seat' + bbUserId + ' .player-name').text();
  $('#seat' + bbUserId + ' .player-name').text(bbplayerName + " BB");

  $('#board').hide();
  $('#total-pot').text("0")

}


function start_game() {

  if (socket  == null) {
    console.error("Socket not connected");
    return;
  }

  socket.send(`{"type": "start_game", "sid": "test", "src": ${user_id}}\n`);

}