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

$(function () {
  $('#my-file').on('click', function (event) {
    event.preventDefault();
    $('#sub-dropdown').toggle();
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
  });

  $('#toggleButtonList').on('click', function () {
    showCompactList();
  });

  data.forEach((element) => {
    const fileCardHTML = `<div class="file-card">
      <img src="${element.img}" alt="${element.name}">
      <div class="file-text">
        <p>${element.name.substring(0, 11) + '...'}</p> 
        <p>${element.date}</p>  
      </div>
    </div>`;
    $fileContainer.append(fileCardHTML);
  });

  data.forEach((element) => {
    $('#quick-access-card-grid-buttun').on('click', function () {
      $('#quick-access-container').show();
      $('#quick-access-container-compact').hide();
      $('.heading').show();
    });

    $('#quick-access-card-compact-button').on('click', function () {
      $('#quick-access-container').hide();
      $('#quick-access-container-compact').show();
      $('.heading').hide();
    });

    const fileCardHTML = `<div class="quick-access-card-compact">
      <div class="icons-compact">
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
        <p>Open</p>
        <p id="share-card">Share</p>
        <p>Delete</p>
      </div>
      <div class="start-date">
        <p>June, 24, 2024</p>
      </div>
      <div class="end-date">
        <p>June, 24, 2024</p>
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
            <p>Open</p>
            <p id="share-card">Share</p>
            <p>Delete</p>
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
            <img class="icon-file-compact" src="${element.img}" alt="file-img" />
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
            <p>Open</p>
            <p id="share-card">Share</p>
            <p>Delete</p>
          </div>
          <div class="start-date">
            <p>${element.date}</p>
          </div>
          <div class="end-date">
            <p>${element.date}</p>
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

  $('#quick-access-card-grid-buttun').on('click', function () {
    $('#quick-access-container').show();
    $('#quick-access-container-compact').hide();
    $('.heading').hide();
  });

  $('#quick-access-card-compact-button').on('click', function () {
    $('#quick-access-container').hide();
    $('#quick-access-container-compact').show();
    $('.heading').show();
  });
});

$(function () {
  $('#share-card').on('click', function () {
    $('#modal').css('display', 'block');
  });

  $('.close, #modal').on('click', function (event) {
    if (event.target === $('#modal')[0] || event.target === $('.close')[0]) {
      $('#modal').css('display', 'none');
    }
  });
});
