
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
