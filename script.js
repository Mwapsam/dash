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

  const $mainContent = $('.main-content');
  const $insideNav = $('#inside-nav');
  if (isOpen) {
    $mainContent.css('margin-left', '12rem');
    $insideNav.css('left', '5rem');
    $insideNav.css('width', '250px');
  } else {
    $insideNav.css('left', '18rem');
    $mainContent.css('margin-left', '18rem');
    $insideNav.css('width', '180px');
  }
});

$(window).on('resize', () => {
  if (window.innerWidth > 768) {
    $('.popup').each((_, el) => {
      el.close();
    });
  }
});

$(function () {
  $('#my-file').on('click', function (event) {
    event.preventDefault();
    $('#sub-dropdown').toggle();

    if ($('#sub-dropdown').is(':visible')) {
      $('#fa-play').hide();
      $('#fa-caret-down').show();
    } else {
      $('#fa-play').show();
      $('#fa-caret-down').hide();
    }
  });
});

$(function () {
  $('#file-mobile').on('click', function (event) {
    event.preventDefault();
    $('#sub-dropdown-mobile').toggle();
  });
  $('#sub-dropdown-mobile').on('click', '.sidebar_nav__link', function (event) {
    event.stopPropagation();
  });
});

const data = [
  {
    name: 'Finance.pdf',
    img: '/assets/files/docx1.png',
    date: 'June, 20, 2023',
  },
  {
    name: 'Study of rocks.pdf',
    img: '/assets/files/pdf1.png',
    date: 'June, 20, 2023',
  },
  {
    name: 'Sci-fi.pdf',
    img: '/assets/files/pdf1.png',
    date: 'June, 20, 2023',
  },
  {
    name: 'Machine learning.pdf',
    img: '/assets/files/docx1.png',
    date: 'June, 20, 2023',
  },
  {
    name: 'Artificial Inteligence.pdf',
    img: '/assets/files/docx1.png',
    date: 'June, 20, 2023',
  },
  {
    name: 'Robotic Fundamentals.docx1',
    img: '/assets/files/pdf1.png',
    date: 'June, 20, 2023',
  },
  {
    name: 'Mathematics.pdf',
    img: '/assets/files/docx1.png',
    date: 'June, 20, 2023',
  },
  {
    name: 'Study of the Past.pdf',
    img: '/assets/files/pdf1.png',
    date: 'June, 20, 2023',
  },
  {
    name: 'Social Sciences.pdf',
    img: '/assets/files/pdf1.png',
    date: 'June, 20, 2023',
  },
  {
    name: 'Animal farm.pdf',
    img: '/assets/files/docx1.png',
    date: 'June, 20, 2023',
  },
  {
    name: 'The Art of War.pdf',
    img: '/assets/files/pdf1.png',
    date: 'June, 20, 2023',
  },
  {
    name: 'Mathematics.pdf',
    img: '/assets/files/docx1.png',
    date: 'June, 20, 2023',
  },
];

$(function () {
  const $fileContainer = $('#file-container');
  const $compactList = $('#compact-list');
  const $heading = $('#heading');

  function hideAllContainers() {
    $fileContainer.hide();
    $compactList.hide();
    $heading.hide();
  }

  function showFileContainer() {
    hideAllContainers();
    $fileContainer.show();
  }

  function showCompactList() {
    hideAllContainers();
    $compactList.show();
    $heading.show();
  }

  showFileContainer();

  $('#toggleButtonGrid').on('click', function () {
    showFileContainer();
    $('#toggleButtonGrid i').attr('data-active', '');
    $('#toggleButtonList i').removeAttr('data-active');
  });

  $('#toggleButtonList').on('click', function () {
    showCompactList();
    $('#toggleButtonGrid i').removeAttr('data-active');
    $('#toggleButtonList i').attr('data-active', '');
  });

  data.forEach((element, i) => {
    const fileCardHTML = `<div class="file-card">
    <i class="fa fa-ellipsis-v elipsis" id=${`ellipsis-${i}`} aria-hidden="true"></i>

      <img src="${element.img}" alt="${element.name}">
      <div class="file-text">
        <p>${element.name.substring(0, 11) + '...'}</p> 
        <p>${element.date}</p>  
      </div>
      <div class="share-card-small" id=${`share-card-small-${i}`}>
        <a class="share-link">Open</a>
        <a class="share-link" id="share-card">Share</a>
        <a class="share-link">Delete</a>
      </div>
    </div>
    `;
    $fileContainer.append(fileCardHTML);
  });

  $('#quick-access-card-grid-buttun').on('click', function () {
    $('#quick-access-container').show();
    $('#quick-access-container-compact').hide();

    $('.heading').hide();
    $('#quick-access-card-grid-buttun i').attr('data-active', '');
    $('#quick-access-card-compact-button i').removeAttr('data-active');
  });

  $('#quick-access-card-compact-button').on('click', function () {
    $('#quick-access-container').hide();
    $('#quick-access-container-compact').show();
    $('.heading').show();
    $('#quick-access-card-grid-buttun i').removeAttr('data-active');
    $('#quick-access-card-compact-button i').attr('data-active', '');
  });

  data.forEach((element, i) => {
    const fileCardHTML = `<div class="quick-access-card-compact">
      <div class="icons-compact">
      <i class="fa fa-ellipsis-v share" id=${`ellipsis-${
        i + 10
      }`} aria-hidden="true"></i>

        <img
          class="icon-file-compact"
          src="${element.img}"
          alt="${element.name}"
        />
        <h4 class="icons-compact-h4">${element.name}</h4>

      </div>

      <div class="text-container-compact">
        <div class="card-text-compact">
          <h4>${element.name}</h4>
          <p>June, 24, 2024</p>
        </div>
        <span class="toggle-action-card" id="first-action">...</span>
      </div>
      <div class="action-card">
        <p class="share-link">Open</p>
        <p class="share-link" id="share-card">Share</p>
        <p class="share-link">Delete</p>
      </div>
      <div class="start-date">
        <p>June, 24, 2024</p>
      </div>
      <div class="end-date">
        <p>June, 24, 2024</p>
      </div>
      <div class="share-card-list" id=${`share-card-list-${i + 10}`}>
        <a class="share-link">Open</a>
        <a class="share-link" id="share-card-list">Share</a>
        <a class="share-link">Delete</a>
      </div>
    </div>`;
    $compactList.append(fileCardHTML);
  });
});

$(function () {
  $(document).on('click', '.toggle-action-card', function (event) {
    event.stopPropagation();

    const clickedIndex = $(this).index('.toggle-action-card');
    const targetedSpans = $('.action-card');

    if (targetedSpans.length > 0) {
      const targetedSpan = targetedSpans.eq(clickedIndex);
      targetedSpan.toggle();
    }
  });

  $(document).on('click', function (event) {
    const targetedSpans = $('.action-card');

    if (targetedSpans.length > 0) {
      const isClickedInsideCard =
        $(event.target).closest('.action-card').length > 0;

      if (!isClickedInsideCard) {
        targetedSpans.hide();
      }
    }
  });
});

$(function () {
  $('#header-menu').on('click', function (event) {
    event.preventDefault();
    $('#mobile-nav').toggle();
    if ($('#mobile-nav').is(':visible')) {
      $('#content_area').css('filter', 'blur(5px)');
    } else {
      $('#content_area').css('filter', 'none');
    }
  });
});

$(function () {
  $('#sidebar_nav__mobile').on('click', function (event) {
    event.preventDefault();
    $('#mobile-nav').toggle();
    if ($('#mobile-nav').is(':visible')) {
      $('#content_area').css('filter', 'blur(5px)');
    } else {
      $('#content_area').css('filter', 'none');
    }
  });
});

$(function () {
  function renderQuickAccessCards(data, containerId) {
    const $quickAccessContainer = $(`#${containerId}`);
    $quickAccessContainer.empty();

    for (let i = 0; i < 3 && i < data.length; i++) {
      const element = data[i];
      const cardHTML = `
        <div class="quick-access-card">
          <div class="icons">
            <img class="icon-file" src="${element.img}" alt="file-img" />
            <img class="group-icons" src="/assets/files/group-cons.png" alt="group-cons" />
          </div>
          <div class="text-container">
            <div class="card-text">
              <h4>${element.name}</h4>
              <p>${element.date}</p>
            </div>
            <span class="toggle-action-card" id="action-${i}">...</span>
          </div>
          <div class="action-card">
            <p class="share-link">Open</p>
            <p class="share-link" id="share-card">Share</p>
            <p class="share-link">Delete</p>
          </div>
        </div>
      `;

      $quickAccessContainer.append(cardHTML);
    }
  }

  function renderQuickAccessCardsCompact(data, containerId) {
    const $quickAccessContainerCompact = $(`#${containerId}`);
    $quickAccessContainerCompact.empty();

    for (let i = 0; i < 3 && i < data.length; i++) {
      const element = data[i];
      const cardHTML = `
        <div class="quick-access-card-compact">
          <div class="icons-compact">
          <i class="fa fa-ellipsis-v share" id=${`ellipsis-${i}`} aria-hidden="true"></i>

            <img class="icon-file-compact" src="${
              element.img
            }" alt="file-img" />
            <h4 class="icons-compact-h4">${element.name}</h4>
          </div>
          <div class="text-container-compact">
            <div class="card-text-compact">
              <h4>${element.name}</h4>
              <p>${element.date}</p>
            </div>
            <span class="toggle-action-card" id="action-${i}">...</span>
          </div>
          <div class="action-card">
            <p class="share-link">Open</p>
            <p class="share-link" id="share-card">Share</p>
            <p class="share-link">Delete</p>
          </div>
          <div class="start-date">
            <p>${element.date}</p>
          </div>
          <div class="end-date">
            <p>${element.date}</p>
          </div>

          <div class="share-card-list" id=${`share-card-list-${i}`}>
            <a class="share-link">Open</a>
            <a class="share-link" id="share-card-list">Share</a>
            <a class="share-link">Delete</a>
          </div>
        </div>
      `;

      $quickAccessContainerCompact.append(cardHTML);
    }
  }

  renderQuickAccessCards(data, 'quick-access-container');
  renderQuickAccessCardsCompact(data, 'quick-access-container-compact');

  $('#quick-access-container-compact').hide();
  $('.heading').hide();
});

$(document).ready(function () {
  var currentPageUrl = window.location.href;

  var sidebarLinks = $('.sidebar_nav__link');

  sidebarLinks.each(function () {
    var linkUrl = $(this).attr('href');
    if (currentPageUrl.includes(linkUrl)) {
      $(this).attr('data-active', '');
    }
  });
});

$(document).ready(function () {
  $('#select-all').on('click', function () {
    var isChecked = $(this).prop('checked');

    $('.modal-content input[type="checkbox"]').prop('checked', isChecked);
  });
});

$(document).ready(function () {
  const profiles = [
    {
      name: 'Wade Warren',
      img: 'https://source.unsplash.com/random/50x50/?person',
    },
    {
      name: 'Jenny Wilson',
      img: 'https://source.unsplash.com/random/50x50/?person',
    },
    {
      name: 'Cameron Williamson',
      img: 'https://source.unsplash.com/random/50x50/?person',
    },
    {
      name: 'Esther Howard',
      img: 'https://source.unsplash.com/random/50x50/?person',
    },
  ];

  const followers = [
    {
      name: 'Mwape John',
      img: 'https://source.unsplash.com/random/50x50/?person',
    },
    {
      name: 'Dave Samuel',
      img: 'https://source.unsplash.com/random/50x50/?person',
    },
    {
      name: 'Mercy Gabby',
      img: 'https://source.unsplash.com/random/50x50/?person',
    },
    {
      name: 'Sharon Mathews',
      img: 'https://source.unsplash.com/random/50x50/?person',
    },
  ];

  function generateProfileCards(cardId, data) {
    const $card = $(`#${cardId}`);
    $card.empty();
    data.forEach((item) => {
      const cardHtml = `
        <li>
          <div class="profile-card">
            <div class="modal-profile">
              <img style="border-radius: 50%; height: 1.5rem; width: 1.5rem" loading="lazy" src="${item.img}" />
              <span>${item.name}</span>
            </div>
            <div>
              <input type="checkbox" />
            </div>
          </div>
        </li>
      `;
      $card.append(cardHtml);
    });
  }

  // Generate profile cards initially
  generateProfileCards('modal-profiles', profiles);

  // Handle click on "Following" button
  $('.menu-nav span:contains("Following")').on('click', function () {
    generateProfileCards('modal-profiles', profiles);
  });

  // Handle click on "Followers" button
  $('.menu-nav span:contains("Followers")').on('click', function () {
    generateProfileCards('modal-profiles', followers);
  });
});

$(document).ready(function () {
  $('.elipsis').on('click', function (e) {
    e.stopPropagation();
    const index = $(this).attr('id').split('-')[1];
    const shareCard = $(`#share-card-small-${index}`);
    if (shareCard.css('display') === 'flex') {
      shareCard.css('display', 'none');
    } else {
      shareCard.css('display', 'flex');
    }
  });

  $(document).on('click', function (e) {
    const shareCards = $('.share-card-small');
    if (!shareCards.is(e.target) && shareCards.has(e.target).length === 0) {
      shareCards.css('display', 'none');
    }
  });
});

$(document).ready(function () {
  $('.share').on('click', function (e) {
    e.stopPropagation();
    const index = $(this).attr('id').split('-')[1];
    const shareCard = $(`#share-card-list-${index}`);
    if (shareCard.css('display') === 'flex') {
      shareCard.css('display', 'none');
    } else {
      console.log(index);
      shareCard.css('display', 'flex');
      $('.share-card-small').css('display', 'none');
    }
  });

  $(document).on('click', function (e) {
    const shareCards = $('.share-card-list');
    if (!shareCards.is(e.target) && shareCards.has(e.target).length === 0) {
      shareCards.css('display', 'none');
    }
  });
});

$(function () {
  $(document).on('click', '.share-link', function () {
    $('#modal').css('display', 'block');
  });

  $(document).on('click', function (event) {
    if (
      $(event.target).closest('#modal').length === 0 &&
      !$(event.target).is('.share-link')
    ) {
      $('#modal').css('display', 'none');
    }
  });

  $('.close-modal').on('click', function () {
    $('#modal').css('display', 'none');
  });
});
