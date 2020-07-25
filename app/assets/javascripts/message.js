$(function(){
  
  function buildHTML(message){
    if (message.image){
      var html = 
        `<div class="main__messages__box" data-message-id=${message.id}>
           <div class="main__messages__box__info">
             <div class="main__messages__box__info__name">
               ${message.user_name}
             </div>
             <div class="main__messages__box__info__date-time">
               ${message.created_at}
             </div>
           </div>
           <div class="main__messages__box__message">
             <p class="main__messages__box__message__text">
               ${message.content}
             </p>
           </div>
           <img class=".main__messages__box__message__image" src=${message.image}>
         </div>`
      return html;   
    } else {
      var html =
        `<div class="main__messages__box" data-message-id=${message.id}>
           <div class="main__messages__box__info">
             <div class="main__messages__box__info__name">
               ${message.user_name}
             </div>
             <div class="main__messages__box__info__date-time">
               ${message.created_at}
             </div>
           </div>
           <div class="main__messages__box__message">
             <p class="main__messages__box__message__text">
               ${message.content}
             </p>
           </div>
        </div>`
      return html;  
    };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main__messages').append(html);
      $('.main__messages').animate({ scrollTop: $('.main__messages')[0].scrollHeight});
      $('.form__submit').prop('disabled', false);
      $('form')[0].reset();
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました")
      $('.form__submit').prop('disabled', false);
    })
  });

  var reloadMessages = function() {
    var last_message_id = $('.main__messages__box:last').data("message-id");
    
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })

    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main__messages').append(insertHTML);
        $('.main__messages').animate({ scrollTop: $('.main__messages')[0].scrollHeight});
      }
    })

    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});