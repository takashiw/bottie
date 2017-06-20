
module.exports = function(skill, info, bot, message) {


  var fs = require('fs');

  var Train = require('../src/train');
  var Brain = require('../src/brain');
  var Ears = require('../src/ears');
  var builtinPhrases = require('../builtins');
  var Bottie = {
    Brain: new Brain(),
    Ears: new Ears(process.env.SLACK_TOKEN)
  };

  console.log('INVOCATION OF NON-CONFIGURED SKILL: ' + skill);
  bot.reply(message, 'Alrighty! Let us get started! ');
  bot.startConversation(message, function(err, convo) {
    convo.ask('What is your name?', [
      {
        pattern: '.*',
        callback: function(response, convo) {
          phraseName = response.text;
          convo.say('Hey there ' + phraseName + '!');
          convo.ask('You want to play a game of soccer with me?', [
            {
            pattern: '.*',
            callback: function(response, convo) {
              phrase = response.text;
              // if(phrase == 'Yes'){
                soccerGame(convo);
              // }
              convo.next();
            }
            }
          ]);

          convo.next();
        }
      }
    ]);

    function soccerGame(convo){
      score = 0;
      convo.say("Let's go!");
      convo.say("Its nearing the end of regulation in our championship match, the score is tied 0 -0.");
      convo.say("You have the ball at midfield with no defenders on you.");
      convo.ask('Do you want to dribble forward or pass forward to me?', [
        {
          pattern: '.*',
          callback: function(response, convo){
            // console.log('Bottie heard: ' + message.text);
            // var interpretation = Bottie.Brain.interpret(response.text);
            // console.log('Bottie interpretation: ', interpretation);
            // convo.say("Alright, let's " + interpretation);
            phrase = response.text.toLowerCase();
            didDribble = true;
            if(phrase == "dribble"){
              score += 2;
              didDribble = true
            } else {
              score += 1;
              didDribble = false;
            }
            convo.next();

            phraseToSay = "";

            console.log(didDribble);
            if(didDribble){
              convo.ask('A defender attacks you! Do you shake the defender and dribble forward or pass forward to me?', [
                {
                  pattern: '.*',
                  callback: function(response, convo){
                    phrase = response.text.toLowerCase();
                    if(phrase == "dribble"){
                      score += 2;
                      phraseToSay = "You make it to the goal box!";
                    } else {
                      score += 1;
                      didDribble = false;
                      phraseToSay = "I make it to the goal box and give and go the ball back to you!";
                      convo.next();
                    }
                    convo.next();
                  }
                }
              ]);
            } else {
              convo.ask('A defender attacks me! I need to pass, do you call for the ball or signal me to pass to our teammate?', [
                {
                  pattern: '.*',
                  callback: function(response, convo){
                    phrase = response.text.toLowerCase();
                    if(phrase == "call"){
                      score += 2;
                      phraseToSay = "You make it to the goal box!!";
                    } else {
                      score += 1;
                      didDribble = false;
                      phraseToSay = "Our teammate passes back to you in the goal box!";
                    }
                    convo.next();
                  }
                }
              ]);
            }

            convo.say(phraseToSay);

            convo.ask(phraseToSay + 'Now we are both in the goal box and you have the ball. The last defender is shading towards you, do you shoot now or pass to me to shoot?', [
              {
                pattern: '.*',
                callback: function(response, convo){
                  phrase = response.text.toLowerCase();
                  if(phrase == "shoot"){
                    score += 2;
                  } else {
                    score += 1;
                  }
                  convo.next();

                  convo.say("...");
                  convo.say("The ball is in the air");
                  convo.say("...");
                  convo.say("It's going to the top corner");
                  convo.say("...");
                  convo.say("...");
                  convo.say("GOAL!!!@!!!!!!");
                  console.log("Score" + score);

                }
              }
            ]);
          }
        }
      ]);
    }
    // convo.addMessage({text: 'We ready!?'},'default');
    // convo.addQuestion({text: 'What is your name?'},function(res, convo) {
    //   // name has been collected...
    //   convo.transitionTo('completed');
    //
    // },{key: 'name'},'default');
    //
    // convo.addMessage({text: 'I saved your name in the database'},'completed');

  })
  // speech.startConversation(message, function(err, convo) {
  //
  // })
};
