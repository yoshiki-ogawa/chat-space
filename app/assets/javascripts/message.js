$(function(){

  function buildHTML(message){
    if (message.image){
      var html = 
        `<div class="main__messages__box">
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
        `<div class="main__messages__box">
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

});
