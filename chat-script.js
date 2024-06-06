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

  if (isOpen) {
    $('.chat-search-icons').css('display', 'none');
  } else {
    $('.chat-search-icons').css('display', 'flex');
  }
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
            <span id='options-modal'>
              <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
            </span>
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
    $('.profile-component').css('display', 'flex');
    $('.chat-layout').css('display', 'grid');
  }

  function createOptionsModal() {
    $('#options-modal').click(function () {
      $('#optionsModal').css('display', 'block');
    });

    $('.close').click(function () {
      $('#optionsModal').css('display', 'none');
    });

    $(window).click(function (event) {
      if (event.target == $('#optionsModal')[0]) {
        $('#optionsModal').css('display', 'none');
      }
    });
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

    createOptionsModal();
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

let addedUserNames = [];

$(document).ready(function () {
  function fetchUsers() {
    return $.getJSON('users.json');
  }

  function renderUsers(users) {
    const userList = $('.user-list');
    userList.empty();
    users.forEach((user) => {
      const userItem = $(`
        <li>
          <div class="image-card">
            <img src="${user.img}" alt="${user.name}" />
            <span>${user.name}</span>
          </div>
          <input type="checkbox" class="user-checkbox" />
        </li>
      `);
      userList.append(userItem);
    });
  }

  function addUserCards(selectedUsers) {
    const container = $('.container');
    selectedUsers.forEach((user) => {
      if (!addedUserNames.includes(user.name)) {
        const userCard = $(`
          <div class="user-card">
            <img src="${user.img}" alt="${user.name}" />
          </div>
        `);
        container.append(userCard);
        addedUserNames.push(user.name);
      }
    });
  }

  const modal = $('#invite-modal');
  const btn = $('.invite-button');
  const span = $('.close');

  btn.click(function () {
    fetchUsers().done(function (users) {
      renderUsers(users);
      modal.show();
    });
  });

  span.click(function () {
    modal.hide();
  });

  $(window).click(function (event) {
    if ($(event.target).is(modal)) {
      modal.hide();
    }
  });

  $('#selectAll').change(function () {
    const isChecked = $(this).is(':checked');
    $('.user-checkbox').prop('checked', isChecked);
  });

  $('#createBtn').click(function () {
    const selectedUsers = $('.user-checkbox:checked')
      .map(function () {
        const userCard = $(this).siblings('.image-card');
        return {
          name: userCard.find('span').text(),
          img: userCard.find('img').attr('src'),
        };
      })
      .get();
    addUserCards(selectedUsers);
    modal.hide();
  });
});

const storedMediaFiles = [];

$(document).ready(function () {
  function renderMediaModal() {
    const mediaFiles = [
      './assets/user1.png',
      './assets/user2.png',
      './assets/user3.png',
      './assets/user4.png',
      './assets/user5.png',
    ];

    let mediaModalContent = '';
    for (let i = 0; i < 10; i++) {
      mediaFiles.forEach((file) => {
        mediaModalContent += `
          <div class="media-file-card">
            <img src="${file}" alt="image" />
            <input type="checkbox" class="media-checkbox" data-file="${file}" />
          </div>
        `;
      });
    }

    $('.media-files-container').html(mediaModalContent);
  }

  function updateSelectedMedia() {
    const selectedCount = $('.media-checkbox:checked').length;
    $('.media-modal-header span').text(`(${selectedCount} Selected)`);
  }

  function renderSelectedMedia(selectedFiles) {
    let selectedMediaContent = '';
    selectedFiles.forEach((file, index) => {
      selectedMediaContent += `
        <div class="chat-input-image-card" data-file="${file}">
          <img src="${file}" alt="Selected image" />
          <i class="fa fa-times-circle remove-icon" aria-hidden="true" data-index="${index}"></i>
        </div>
      `;
    });

    $('#chat-input-image-container').html(selectedMediaContent);
  }

  renderMediaModal();

  $('#toggle-media-modal').click(function () {
    $('#media-modal').toggle();
  });

  $(document).on('change', '.media-checkbox', function () {
    const file = $(this).data('file');

    if ($(this).is(':checked')) {
      storedMediaFiles.push(file);
    } else {
      const index = storedMediaFiles.indexOf(file);
      if (index > -1) {
        storedMediaFiles.splice(index, 1);
      }
    }

    updateSelectedMedia();
    renderSelectedMedia(storedMediaFiles);
  });

  $(document).on('click', '.remove-icon', function () {
    const file = $(this).closest('.chat-input-image-card').data('file');
    const index = storedMediaFiles.indexOf(file);
    if (index > -1) {
      storedMediaFiles.splice(index, 1);
    }

    $(`.media-checkbox[data-file="${file}"]`).prop('checked', false);

    updateSelectedMedia();
    renderSelectedMedia(storedMediaFiles);
  });

  $(window).click(function (event) {
    if (!$(event.target).closest('#media-modal, #toggle-media-modal').length) {
      $('#media-modal').hide();
    }
  });
});

const selectedFiles = [];

$(document).ready(function () {
  function fetchFiles() {
    return $.getJSON('files.json');
  }

  function renderFileCards(files) {
    const fileCardsContainer = $('#file-cards-container');
    fileCardsContainer.empty();

    files.forEach((file, index) => {
      const fileCard = `
        <div class="file-card">
          <div class="file-content">
            <img src="${file.icon}" alt="file" />
            <span>${file.name}</span>
          </div>
          <input type="checkbox" class="file-checkbox" data-index="${index}" data-name="${file.name}" data-icon="${file.icon}" />
        </div>
      `;
      fileCardsContainer.append(fileCard);
    });

    $('#file-count').text(files.length);
  }

  function renderSelectedFiles() {
    const fileContainer = $('#chat-input-file-container');
    fileContainer.empty();

    selectedFiles.forEach((file, index) => {
      const isActive = $('.chat-input-file-card')
        .eq(index)
        .hasClass('active-file-card');
      const activeClass = isActive ? 'active-file-card' : '';

      const fileCard = `
        <div class="chat-input-file-card ${activeClass}" data-index="${index}">
          <div>
            <img src="${file.icon}" alt="file" />
            <span>${file.name}</span>
          </div>
          <i class="fa fa-times-circle remove-file-icon" aria-hidden="true"></i>
        </div>
      `;
      fileContainer.append(fileCard);
    });
  }

  $('#open-modal-btn').click(function () {
    fetchFiles().done(function (files) {
      renderFileCards(files);
      $('#file-modal').toggle();
    });
  });

  $(document).on('change', '.file-checkbox', function () {
    const fileName = $(this).data('name');
    const fileIcon = $(this).data('icon');
    const fileCard = $(this).closest('.file-card');

    if ($(this).is(':checked')) {
      selectedFiles.push({ name: fileName, icon: fileIcon });
      fileCard.addClass('selected-file-card');
    } else {
      const index = selectedFiles.findIndex((file) => file.name === fileName);
      if (index > -1) {
        selectedFiles.splice(index, 1);
      }
      fileCard.removeClass('selected-file-card');
    }

    $('.file-modal-header span').text(`(${selectedFiles.length} Selected)`);
    renderSelectedFiles();
  });

  $(document).on('click', '.remove-file-icon', function (event) {
    event.stopPropagation();

    const $fileCard = $(this).closest('.chat-input-file-card');
    const fileName = $fileCard.find('span').text();
    const index = selectedFiles.findIndex((file) => file.name === fileName);
    if (index > -1) {
      selectedFiles.splice(index, 1);
    }

    $(`.file-checkbox[data-name="${fileName}"]`).prop('checked', false);

    $('.file-modal-header span').text(`(${selectedFiles.length} Selected)`);
    renderSelectedFiles();
  });

  $(document).on('click', '.chat-input-file-card', function (event) {
    event.stopPropagation();
    $(this).toggleClass('active-file-card');
  });

  $(window).click(function (event) {
    if (
      !$(event.target).closest(
        '#file-modal, #open-modal-btn, .remove-file-icon'
      ).length
    ) {
      $('#file-modal').hide();
    }
  });
});

$(document).ready(function () {
  function fetchLinks() {
    return $.getJSON('links.json');
  }

  function renderLinkCards(links) {
    const linkCardsContainer = $('#link-cards-container');
    linkCardsContainer.empty();

    links.forEach((link) => {
      const linkCard = `
        <div class="link-card">
          <div class="link-content">
            <img src="${link.icon}" alt="file" />
            <span>${link.name}</span>
          </div>
          <input type="checkbox" class="link-checkbox" />
        </div>
      `;
      linkCardsContainer.append(linkCard);
    });
  }

  $('#open-link-modal-btn').click(function () {
    fetchLinks().done(function (links) {
      console.log(links);
      if (links) {
        renderLinkCards(links);
        $('#link-modal').toggle();
      }
    });
  });

  $(document).on('change', '.link-checkbox', function () {
    let selectedCount = $('.link-checkbox:checked').length;
    $('.link-modal-header span').text(`(${selectedCount} Selected)`);
  });

  $(window).click(function (event) {
    if (!$(event.target).closest('#link-modal, #open-link-modal-btn').length) {
      $('#link-modal').hide();
    }
  });
});

$(document).ready(function () {
  $('.file-icon-card').click(function () {
    $('.file-icon-card').removeClass('active');
    $(this).addClass('active');
  });
});

$(document).ready(function () {
  var modal = $('#createGroupModal');
  var btn = $('#openGroupModal');
  var span = $('.close');
  var cancelBtn = $('.cancel');
  var uploadContainer = $('#uploadContainer');
  var fileInput = $('#groupImage');
  var imagePreview = $('#imagePreview');

  // Open the modal
  btn.click(function () {
    modal.show();
  });

  // Close the modal when the user clicks on <span> (x)
  span.click(function () {
    modal.hide();
  });

  // Close the modal when the user clicks on "Cancel" button
  cancelBtn.click(function () {
    modal.hide();
  });

  // Close the modal when the user clicks anywhere outside of the modal
  $(window).click(function (event) {
    if ($(event.target).is(modal)) {
      modal.hide();
    }
  });

  // Form submission handler (for demonstration purposes)
  $('#createGroupForm').submit(function (event) {
    event.preventDefault();
    alert('Group created!');
    modal.hide();
  });

  // Drag and Drop functionality
  uploadContainer.on('dragover', function (event) {
    event.preventDefault();
    event.stopPropagation();
    $(this).addClass('dragover');
  });

  uploadContainer.on('dragleave', function (event) {
    event.preventDefault();
    event.stopPropagation();
    $(this).removeClass('dragover');
  });

  uploadContainer.on('drop', function (event) {
    event.preventDefault();
    event.stopPropagation();
    $(this).removeClass('dragover');
    var files = event.originalEvent.dataTransfer.files;
    fileInput.prop('files', files);

    // Trigger the file input change event
    fileInput.change();
  });

  // Handle file input change
  fileInput.change(function () {
    var files = this.files;
    imagePreview.empty(); // Clear previous previews
    if (files.length > 0) {
      $.each(files, function (index, file) {
        var reader = new FileReader();
        reader.onload = function (e) {
          var img = $('<img>').attr('src', e.target.result);
          imagePreview.append(img);
        };
        reader.readAsDataURL(file);
      });
      imagePreview.show();
    }
  });
});
