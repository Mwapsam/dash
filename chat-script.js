const $headerDropdown = $('.header_dropdown');

$(document).on('click', '#suggestions_expand', (event) => {
  const $el = $(event.currentTarget);

  const list = $el.parent().find('ul');
  const isExpanded = list.attr('aria-expanded') === 'true';
  list.css('--item-count', list.children().length);
  list.attr('aria-expanded', isExpanded ? 'false' : 'true');
});

$(document).on('click', '.popup_trigger', (event) => {
  const $el = $(event.currentTarget);
  const $target = $($el.attr('data-popup-target'));
  const dialog = $target.get(0);

  if (!dialog) return;
  const isOpen = dialog.open;

  if (isOpen) {
    $target.removeClass('open');
    setTimeout(() => dialog.close(), 200);
  } else {
    dialog.show();
    setTimeout(() => $target.addClass('open'), 1);
  }

  $el.attr('data-active', isOpen);
});

$(document).on('click', '.sidebar_trigger', (event) => {
  const $sidebar = $('#sidebar');
  const isOpen = $sidebar.attr('aria-expanded') === 'true';
  $sidebar.attr('aria-expanded', !isOpen);
});

$(window).on('resize', () => {
  if (window.innerWidth > 768) {
    $('.popup').each((_, el) => {
      el.close();
    });
  }
});

// File upload popup
$(document).ready(function () {
  $('#attachment-icon').click(function () {
    $('#popup-menu').toggle();
  });

  $(document).click(function (event) {
    if (!$(event.target).closest('#popup-menu, #attachment-icon').length) {
      $('#popup-menu').hide();
    }
  });
});

// Imoji popup
$(document).ready(function () {
  $('#imoji-attachment').click(function () {
    $('#emoji-popup').toggle();
  });

  $(document).click(function (event) {
    if (!$(event.target).closest('#emoji-popup, #imoji-attachment').length) {
      $('#emoji-popup').hide();
    }
  });

  $('#close-moji').click(function () {
    $('#emoji-popup').hide();
  });
});

$(document).ready(function () {
  function createChatItem(chat) {
    if (chat.messages && chat.messages.length > 0) {
      let latestConversation = chat.messages[chat.messages.length - 1];
      let latestMessage =
        latestConversation.messages[latestConversation.messages.length - 1];

      return `
        <div class="chat-item" data-name="${chat.name}">
          <img src="${chat.avatar}" alt="${chat.name}" class="avatar" />
          <div class="chat-details">
            <div class="chat-header">
            <div class="name-time-card">
              <span class="chat-name">
                ${chat.name}
              </span>
              <div class="chat-time">${latestMessage.time}</div>
            </div>

              <span class="chat-count">${chat.count}</span>
            </div>
            <div class="chat-message-side">
              <div class="chat-message">${latestMessage.message}</div>
            </div>
          </div>
        </div>
      `;
    }
    return '';
  }

  function createChatConversation(chat) {
    let conversationHtml = chat.messages
      .map((conversation) =>
        conversation.messages
          .map((message, index) => {
            const isSender =
              index % 2 === 0 || (index === 0 && !conversation.recipient);
            const messageClass = isSender ? 'sender' : 'recipient';
            const avatar = isSender
              ? conversation.sender?.avatar || chat.avatar
              : conversation.recipient?.avatar || chat.avatar;
            const name = isSender
              ? conversation.sender?.name || chat.name
              : conversation.recipient?.name || chat.name;

            return `
              <div class="chat-message ${messageClass}">
                <img src="${avatar}" alt="${name}" class="avatar" />
                <div>
                  <div class="message-content">
                    <p>${message.message}</p>
                  </div>
                  <span class="message-time">${message.time}</span>
                </div>
              </div>
            `;
          })
          .join('')
      )
      .join('');

    $('#chat-box').html(conversationHtml);
    $('#chat-box').show();
    $('.welcome-text').hide();
    $('.chat-container').css('display', 'flex');
  }

  $.getJSON('chats.json', function (data) {
    var $chatList = $('#chat-list');
    $chatList.empty();
    data.forEach(function (chat) {
      let chatItemHtml = createChatItem(chat);
      if (chatItemHtml) {
        $chatList.append(chatItemHtml);
      }
    });

    $chatList.on('click', '.chat-item', function () {
      var chatName = $(this).data('name');
      var chat = data.find((c) => c.name === chatName);
      if (chat) {
        createChatConversation(chat);
      }
    });
  });

  $('#chat-box').hide();
});

$(document).ready(function () {
  $('#openModal').click(function () {
    $('#myModal').show();
  });

  $('#cancelBtn').click(function () {
    $('#myModal').hide();
  });

  $('#createBtn').click(function () {
    alert('Chat created!');
    $('#myModal').hide();
  });

  $('#selectAll').change(function () {
    $('.user-checkbox').prop('checked', $(this).prop('checked'));
  });

  $('.user-checkbox').change(function () {
    if (!$(this).prop('checked')) {
      $('#selectAll').prop('checked', false);
    } else if (
      $('.user-checkbox:checked').length === $('.user-checkbox').length
    ) {
      $('#selectAll').prop('checked', true);
    }
  });
});

$(document).ready(function () {
  function checkSidebar() {
    if ($('#sidebar').attr('aria-expanded') === 'false') {
      $('.welcome-text .img').css({
        'max-width': '15%',
        height: 'auto',
      });
    } else {
      $('.welcome-text .img').css({
        'max-width': '20%',
        height: 'auto',
      });
    }
  }

  checkSidebar();

  const sidebar = document.getElementById('sidebar');
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'aria-expanded') {
        checkSidebar();
      }
    });
  });

  observer.observe(sidebar, { attributes: true });
});

$(document).ready(function () {
  var modal = $('#invite-modal');

  var btn = $('.invite-button');

  var span = $('.close');

  btn.click(function () {
    modal.show();
  });

  span.click(function () {
    modal.hide();
  });

  $(window).click(function (event) {
    if ($(event.target).is(modal)) {
      modal.hide();
    }
  });
});
