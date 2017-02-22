(function($) {  //define jQuery $
  $(function() { //DOM Ready

    //Declare constants and global variables
    const ST_AMT = 100;
    var kitty = ST_AMT;
    const VICT = 200;
    var rounds = 0;
    
    var dieFaces = [
        {'face': 'Hearts', 'unicodeHtmlDec': '&#9829', 'color':'red', 'currentBet': 0 },
        {'face': 'Crown', 'unicodeHtmlDec': '&#9818', 'color':'red', 'currentBet': 0 },
        {'face': 'Diamonds', 'unicodeHtmlDec': '&#9830', 'color':'red', 'currentBet': 0 },
        {'face': 'Spades', 'unicodeHtmlDec': '&#9824', 'color':'black', 'currentBet': 0 },
        {'face': 'Anchor', 'unicodeHtmlDec': '&#9875', 'color':'black', 'currentBet': 0 }, 
        {'face': 'Clubs', 'unicodeHtmlDec': '&#9827', 'color':'black', 'currentBet': 0 }       
    ];
    const NUM_DICE = 3;
    var totalBet = 0;
 
    //event listeners for html-defined buttons
    $('#startbtn').on('click', function(e) {
      e.preventDefault();
      $('#resultstally').empty();
      $('#inner-thanks').remove();
      
      $('#welcome').addClass('mainscr');
      enterBets();
    });
    
   
 $('#quitbtn2').on('click', function(e) {
        e.preventDefault();
        $('#results').addClass('mainscr');
        $('#griddy').remove();
        $('#mainresults').remove();
        $('#amtsum').remove();
        $('#botsum').remove();
        $('.midsum').remove();
        $('#diceyroll').remove();
        thankYou();
 }); 

 $('#playagain').on('click', function(e) {
        e.preventDefault();
        $('#results').addClass('mainscr');
        $('#mainresults').remove();
        $('#griddy').remove();
        $('#amtsum').remove();
        $('#botsum').remove();
        $('.midsum').remove();
        $('#diceyroll').remove();
        enterBets();
        
 });

 $('#startbtn2').on('click', function(e) {
      e.preventDefault();
      $('#resultstally').empty();
      $('#inner-thanks').remove();
      $('#griddy').remove();0
      $('#amtsum').remove();
      $('#botsum').remove();
      $('.midsum').remove();
      $('#diceyroll').remove();
      $('#thanksthanks').remove();
      $('#results').addClass('mainscr');
      $('#thanks').addClass('mainscr');
      kitty = ST_AMT;
      rounds = 0;
      totalBet =0;
      enterBets();
    });

    $('#startbtn3').on('click', function(e) {
      e.preventDefault();
      $('#resultstally').empty();
      $('#inner-thanks').remove();
      $('#griddy').remove();
      $('#amtsum').remove();
      $('#botsum').remove();
      $('.midsum').remove();
      $('#diceyroll').remove();
      $('#results').addClass('mainscr');
      $('#thanks').addClass('mainscr');
      kitty = ST_AMT;
      rounds = 0;
      totalBet =0;
      enterBets();
    });
    
    //run script
    welcome();
    
 //Declare functions
    
 function welcome() {
   kitty = ST_AMT;
   rounds = 0;
   totalBet = 0;
   $('#resultstally').empty();
   $('#thanksthanks').remove();
   var newSidecont = '';
   newSidecont = '<figure><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Krone_und_Anker.jpg/1200px-Krone_und_Anker.jpg" alt="Photograph of a Crown and Anchor playing mat and dice" /><br /><figcaption>Crown and Anchor playing mat and dice.</figure>';
   $('#resultstally').append(newSidecont);
   $('#welcome').removeClass('mainscr');
   
 }
    
 function enterBets() {
   $('#placebets').removeClass('mainscr');
   var newContent = '<div class="row text-center" id="amtsum"><div class="col-md-4">Your Kitty: <span id="yourkitty">' + kitty + '</span></div>';
   newContent += '<div class="col-md-4">Total Bet: <span id="yourbet">0</span></div>';
   newContent += '<div class="col-md-4">Available to bet: <span id="availbet">' + kitty + '</span></div></div>';
   $('#placebets').append(newContent);
   drawGrid('placebets');
 }

 function betResults() {
     $('#results').removeClass('mainscr');
     
        var dieRoll = [];
        rounds++;
        
        
        //roll dice
        var rollResult = [];
        for (var i = 0; i < dieFaces.length; i++) {
            rollResult[i] = 0;
        }

        for (var i = 0; i < NUM_DICE; i++) {
            var roll;
            roll = randy(0,(dieFaces.length - 1));
            rollResult[roll]++;
            dieRoll[i] = {'face' :dieFaces[roll].face, 'unicodeHtmlDec' : dieFaces[roll].unicodeHtmlDec} ;
        }
        var net = 0;
        for (var i = 0; i < dieFaces.length; i++) {
            if (rollResult[i] > 0) {
                net += rollResult[i] * dieFaces[i].currentBet;
            } else {
                net -= dieFaces[i].currentBet;
            }
        }
        var kittyOld = kitty;
        kitty = kitty + net;

        //display results
        $('#results h2 span').text(rounds);
        var mainContent = '<div class="row text-center" id="diceyroll">';
        for (var i = 0; i < NUM_DICE; i++) {
            mainContent += '<div class="dieroll col-sm-4">Die ' + (i + 1) + ':<br /><span>' + dieRoll[i].unicodeHtmlDec + '</span><br />' + dieRoll[i].face + '</div>';
        }
        mainContent += '</div><h2 class="midsum">Results for round ' + rounds + ':</h2>';
        mainContent += '<p class="midsum">You ' + ((net < 0) ? 'lost ' : 'won ') + Math.abs(net) + ' pence. Your new kitty: ' + kitty + ' pence.</p><p class="text-center midsum">(Details of this round\'s results below the buttons)</p>';
        
        /* <p>You ' + ((net < 0) ? 'lost ' : 'won ') + Math.abs(net) + ' pence. Your new kitty: ' + kitty + ' pence.</p>'; */

         $('#results h2:first-child').after(mainContent);

        drawGrid('betresults', rollResult);
        
       

        var keepContent = '';

        if (kitty >= VICT || kitty <= 0) {

            $('#startbtn2').removeClass('mainscr');
            $('#playagain').addClass('mainscr');
            $('#quitbtn2').addClass('mainscr'); 

           keepContent += '<p id="thanksthanks">Thanks for playing! ';
            if (kitty >= VICT) {
                keepContent += 'You\'ve met or exceeded our ' + (VICT - ST_AMT) + ' pence maximum winnings limit and won the game, so congratulations. '
            } else if (kitty <= 0) {
                keepContent += 'Unfortunately, you have no more money left so the game has ended. Sorry. '
            }

            keepContent += 'If you would like to play again (with a new 100 pence), please click the button below or refresh the page.</p>';

            $('.btnrow').before(keepContent);

        } else {
            
            /* keepContent += '<p id="botsum" class="text-center">Please click one of the buttons below to keep playing or to walk away.</p>'; */
            $('#startbtn2').addClass('mainscr');
            $('#playagain').removeClass('mainscr');
            $('#quitbtn2').removeClass('mainscr'); 
        }
         
        
        //display on side

        var sideContent = '<h3>Round ' + rounds + ' results:</h3>';
        sideContent += '<p>Kitty at start of round: ' + kittyOld + ' pence</p>';
        sideContent += '<p>You ' + ((net < 0) ? 'lost ' : 'won ') + Math.abs(net) + ' pence.</p>';
        sideContent += '<p>Kitty at end of round: ' + kitty + ' pence.</p>';
        $('#resultstally').prepend(sideContent);

        totalBet = 0;
 }

 function thankYou() {
     $('#thanks').removeClass('mainscr');
     var newContent = '<div id="inner-thanks"><p>';
     if (kitty >= ST_AMT) {
         newContent += 'You won ' + (kitty - ST_AMT) + ' pence. Congratulations! ';
         if (kitty >= VICT) {
             newContent += 'You\'ve also met our ' + (VICT - ST_AMT) + ' pence maximum winnings limit. ';
         }
     } else if (kitty < ST_AMT && kitty >= 0) { 
         newContent += 'You lost ' + (ST_AMT - kitty) + ' pence. Sorry. ';
     }
         
         
        newContent += 'Click the button below to play again (with a new 100 pence), or refresh the page</p></div>';
        $('#thanks h2').after(newContent);
 }

  

//helper functions

//function to generate random number between m and n
function randy(m, n) {
    return Math.floor((n-m+1)* Math.random());
}

//function draws grid to match playing mat - used for placing bets screen and displaying results screen after dice roll
function drawGrid (pagey, rolRes) {
    var newGridcont = '<div id="griddy">';
    if (pagey === 'placebets') {
        newGridcont += '<form>';
    }  /* else if (pagey === 'betresults') {
        newGridcont += '<h2>Detailed results for round ' + rounds + ':</h2>';
    } */

    for (var i =0; i < dieFaces.length; i++) {
        if ((i%3) === 0) {
            newGridcont += '<div class="row text-center">';
        }
        newGridcont += '<div class="col-md-4 gridsquare"><p class="theglyph ' + dieFaces[i].color + '">' + dieFaces[i].unicodeHtmlDec + '</p>';  
        newGridcont += '<p class="facename">' + dieFaces[i].face + '</p>';

        if (pagey === 'placebets') {
            newGridcont += '<input class="spinny" type="number" value="0" min="0" max="' + kitty + '" name="' + dieFaces[i].face.toLowerCase() + '" /><p class="errormsg">&nbsp;</p></div>';
        } else if (pagey === 'betresults') {
            newGridcont += '<p>Your bet: ' + dieFaces[i].currentBet + '</p><p>Number of die rolled: ' + rolRes[i] + '</p><p>Result: ';
                if (dieFaces[i].currentBet > 0 && rolRes[i] >0) {
                    newGridcont += 'win ' + dieFaces[i].currentBet * rolRes[i] + ' pence';
                } else if (dieFaces[i].currentBet > 0 && rolRes[i] == 0) {
                    newGridcont += 'lose ' + dieFaces[i].currentBet + ' pence';
                } else {
                    newGridcont += 'no change - nothing bet';
                }
            newGridcont += '</p></div>'
        }
        
        
        if ((i%3) === 2) {
            newGridcont += '</div>';
        }  
    }

    if (pagey === 'placebets') {
        newGridcont += '</form><p class="text-center errormsg">&nbsp;</p><div id="betbuttons" class="text-center"><button class="btn btn-primary btn-lg" id="betbtn">Roll Dice</button><button class="btn btn-warning btn-lg" id="quitbtn">Walk Away</button></div></div>';
        $('#placebets').append(newGridcont);
    
    // place code for new dynamically generated input events here

    $('.spinny').on('blur', function(e) {
        var $this = $(this);

      

        if(Math.floor($this.val()) == $this.val() && $.isNumeric($this.val()) && $this.val() >= 0 && $this.val() <= kitty)
        {
            $this.next('p').html('&nbsp;');
        } else {
            $this.next('p').text('Invalid value. Please change.');
        }
       
        var total = 0;
      $('.spinny').each(function(){
        var $this = $(this);
        if(Math.floor($this.val()) == $this.val() && $.isNumeric($this.val()) && $this.val() >= 0 && $this.val() <= kitty)
        {
            total = total + Number($this.val());
        }

         
     });

     if (total > kitty) {
         //disable button
         //show warning message
        $('form').next('p').text('Total bet is too much. Please reduce the total amount of your bets above.'); 
        $('#yourbet').text('Too much');
        $('#availbet').text('0');
        $('#betbtn').addClass('disabled');
     } else {
         //enable button
         $('form').next('p').html('&nbsp;'); 
         $('#yourbet').text(total);
         $('#availbet').text(kitty - total);
         $('#betbtn').removeClass('disabled');
     }



    });
    //end dynamically generated input events
   
    //event listeners

    $('#betbtn').on('click', function(e) {
        e.preventDefault();
        
      $('.spinny').each(function(index){
        var $this = $(this);
        //test for numeric - if yes push val, if no push 0
            if(Math.floor($this.val()) == $this.val() && $.isNumeric($this.val()) && $this.val() >= 0 && $this.val() <= kitty)
            {
                //bets.push(Number($this.val()));
                dieFaces[index].currentBet = Number($this.val());
                totalBet += Number($this.val());
            } else {
                //bets.push(0);
                dieFaces[index].currentBet = 0;
            }
            $this.val(0);
        });

        
        //$('#betform').prev('p').remove();
        $('#placebets').addClass('mainscr');
       /* $('form').remove();
        $('#betbuttons').remove();
        $('#amtsum').remove(); */
        $('#griddy').remove();
        betResults();
    });

     $('#quitbtn').on('click', function(e) {
        e.preventDefault();
        $('#betform').prev('p').remove();
        $('.spinny').val(0);
        $('#placebets').addClass('mainscr');
  
        thankYou();
 });

     }  else if (pagey === 'betresults') {
         //put summary results here: total won or lost this round, new kitty
         newGridcont += '</div>';
         $('#results .btnrow').after(newGridcont);
     }


} //end drawGrid
    
   });
})(jQuery);