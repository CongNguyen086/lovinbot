var questions = [
    'Chào bạn, tôi là Lovinbot -  Trợ lý ảo tặng quà. '+
    'Bạn được tặng một món quà theo sở thích của bản thân. '+
    'Nếu đã sẵn sàng, hãy bắt đầu ngay...<br><br><span class="rich-text hu-st-italic">'+
    '(Đây là demo, lưu ý không có món quà nào được gửi đi sau khi hoàn thành)</span>',
    'Vui lòng cho biết tên của bạn nhé...',
    'Chào Công, chúc Công một ngày tốt lành.' +
    ' Công hãy chọn một mô tả dưới đây mà Công quan tâm nhất nhé...',
    'Đây là món quà mà Lovinbot muốn gợi ý cho Công' +
    '<br><br><div class="rich-text rich-text-noop">' +
    '<center><img src="https://www.lovinbot.com/other/image-chat/1.png" alt="Quà cho bạn">' +
    '</center></div>',
];

var topicOption = [
    'Tôi thường xuyên chụp hình và quay video',
    'Phụ kiện, đồ công nghệ là sở thích của tôi',
    'Sống lành mạnh và điều độ trong ăn uống',
    'Luôn quan tâm ngoại hình của bản thân',
    'Yêu thích khám phá những điều mới'
];

var extraSentence = [];
var num = 0;

var botMessage = $('#botMessage_0 p.hu-message-text');
var botMessagePar = $('#botMessage_0');
var giftOption = botMessagePar.find('div.hu-message-image');
var botOption = $('#botOption_0 span');
var userInput = $('#userInput'); 
var userMessage = $('#userMessage_0 p');
var chooseGift = $('#yesNo');

botMessage.html(questions[num]);
botOption.html('Tuyệt, hãy bắt đầu!');
chooseGift.hide();
$('#userMessage_0').hide();

currentTime('userMessage_0');
currentTime(botMessagePar.prop('id'));

function chat() {
  var input = userInput.html();

  if(input == '' && num == 1) {
    
  }else {
    if (num != 0) {
      var newUserId = newUserMessage();
      userMessage = $('#'+newUserId+' p');
    }
    switch (num) {
      case 0:
        userMessage.html(botOption.html());
        $('#hu-message-input.option').hide();
        $('#userMessage_0').show();
        ++num;
        setTimeout(typing(true), 1000);
        setTimeout(changeQuestion, 2000);
        break;
      case 1:
        $('#hu-message-input.input').remove();
        userMessage.html(input);
        typing(true);
        ++num;
        setTimeout(changeQuestion, 2000);
        break;
      case 2:
        $('#hu-message-input.option').hide();
        userMessage.html(botOption.html());
        typing(true);
        ++num;
        setTimeout(changeQuestion, 2000);
        break;
      case 3:
        giftOption.css('display','');
        botMessage.show();
        typing(true);
        ++num;
        setTimeout(changeQuestion, 2000);
        break;
      default:
        break;
    }  
  }
}

// function showResponse() {
//   var input = botMessage.value;

//   if(userInput.value == "") {
    
//   }else {
//   if(num == 0) {
//     userMessage.innerHTML = "";
//     botMessage.value = "";
//     botMessage.setAttribute("placeholder", "Wait for 2 secs");
//     ++num;
//     setTimeout(changeQuestion, 2000);
//   } else if(num == 1) {
//     userMessage.innerHTML = `${input} must be a good place`;
//     botMessage.value = "";
//     botMessage.setAttribute("placeholder", "Wait for 2 secs");
//     ++num;
//     setTimeout(changeQuestion, 2000);
//   } else if(num == 2) {
//     userMessage.innerHTML = `So you are ${2017 - input} born`;
//     botMessage.value = "";
//     botMessage.setAttribute("placeholder", "Wait for 2 secs");
//     ++num;
//     setTimeout(changeQuestion, 2000);
//   } else if(num == 3) {
//     userMessage.innerHTML = `Awesome ${input}`;
//     botMessage.value = "";
//     botMessage.setAttribute("placeholder", "Wait for 2 secs");
//     ++num;
//     setTimeout(changeQuestion, 2000);
//   }
//   }
// }

function changeQuestion() {
  typing(false);
  botMessage.html(questions[num]);
  botMessagePar.after($('#hu-message-input.option'));
  if (num == 1) {
    botMessagePar.after($('#hu-message-input.input'));
    $('#hu-message-input.input').addClass('hu-display-block');
    $('#userInput').focus();
  } else if (num == 2) {
    $('#hu-message-input.option').show();
    $.each(topicOption, function(index, option){
      if(index == 0) {
        content('botOption_0',option);
      } else {
        var optionId = createBotOption(option);
        clickOption('#'+optionId);
      }
    });
  } else if (num == 3) {
    botMessage.hide();
    giftOption = botMessagePar.find('div.hu-message-image');
    giftOption.css('display','inline-block');
    giftOption.find('p').html(questions[num]);
  }
}

// Typing effect
function typing(state){
  if(state == true){
    var newBotId = newBotMessage();
    botMessagePar = $('#'+newBotId);
    botMessage = $('#'+newBotId+' p.hu-message-text');
    botMessagePar.find('.typing-spinner').css('opacity','unset')
  } else {
    botMessagePar.find('.typing-spinner').css('opacity',0)
  }
}

// Generate random ID
// function guidGenerator() {
//   var S4 = function() {
//      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
//   };
//   return ("-"+S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
// }

// Create bot messages
function newBotMessage(){
  // Get the last DIV which ID starts with ^= "botMessage_"
  var botId = $('div[id^="botMessage_"]:last');

  // Read the Number from that DIV's ID (i.e: 3 from "klon3")
  // And increment that number by 1
  var increment = parseInt(botId.prop('id').match(/\d+/g), 10) + 1;

  // Clone it and assign the new ID
  var newId = 'botMessage_'+increment;
  var newBotMessage = botId.clone().prop('id', newId);

  // Insert new bot message
  $('div[id^="userMessage_"]:last').after(newBotMessage);
  $('#'+newId).find('p').html('');

  // Add current time
  currentTime(newId);

  // Return new id
  return newId;
}

// Create user messages
function newUserMessage(){
  // Get the last DIV which ID starts with ^= "botMessage_"
  var userId = $('div[id^="userMessage_"]:last');

  // Read the Number from that DIV's ID (i.e: 3 from "klon3")
  // And increment that number by 1
  var increment = parseInt(userId.prop('id').match(/\d+/g), 10) + 1;

  // Clone it and assign the new ID
  var newId = 'userMessage_'+increment;
  var newUserMessage = userId.clone().prop('id', newId);

  // Insert new user message
  $('div[id^="botMessage_"]:last').after(newUserMessage);
  $('#'+newId).find('p').html('');

  // Add current time
  currentTime(newId);

  // Return new id
  return newId;
}

// Get current time
function currentTime(span){
  var dt = new Date();
  var time = dt.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  $('#'+span).find('span:first').html(time);
}

// Create bot options
function createBotOption(option){
  // Get the last A which ID starts with ^= "botMessage_"
  var botOptId = $('a[id^="botOption_"]:last');
  // Read the Number from that A's ID (i.e: 3 from "klon3")
  // And increment that number by 1
  var increment = parseInt(botOptId.prop('id').match(/\d+/g), 10) + 1;

  // Clone it and assign the new ID
  var newId = 'botOption_'+increment;
  var newOption = botOptId.clone().prop('id', newId);

  // Insert new option
  botOptId.after(newOption);
  content(newId,option);
  return newId;
}

// Add content to option
function content(optionId,option) {
  $('#'+optionId).find('span').html(option);
};

function clickOption(a) {
  $(a).click(function() {
    botOption.html($(a).find('span').html());
    chat();
  });
}

$(document).ready(function() {
  // $('a.hu-input-menu_button').click(chat);
  clickOption('#botOption_0');
});

$(document).on('keypress', function(e) {
  if(e.which == 13) {
    chat();
  }
})