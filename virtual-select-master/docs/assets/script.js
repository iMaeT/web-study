let config = {
  name: 'Virtual Select',
  repo: 'sa-si-dev/virtual-select',
};

let virtualSelectOptions = {
  options: getOptions(),
  zIndex: 99,
  dropboxWrapper: 'body',
};

let flagClasses = ['gu', 'mn', 'va', 'tibet', 'fo', 'th', 'tr', 'tl', 'kz', 'zm', 'uz', 'dk', 'scotland', 'gi', 'gy', 'bj', 'fr', 'mo', 'ir', 'io', 'tm', 'ch', 'mt', 'nl', 'gp', 'im', 'tv', 'mu', 'pe', 'vi', 'hn', 'ss', 'ae', 'td', 'pw', 'nu', 'bt', 'ms', 'cv', 'es', 'mh', 'la', 'vn', 'py', 'br', 'ye', 'ie', 'gh', 'cg', 'cu', 'hu', 'sg', 'at', 'lk', 'vu', 'bo', 'jo', 'er', 'za', 'rs', 'nr', 'ls', 'jm', 'tz', 'ki', 'sj', 'cz', 'pg', 'lv', 'do', 'lu', 'no', 'kw', 'mx', 'yt', 'ly', 'cy', 'ph', 'my', 'sm', 'et', 'ru', 'tj', 'ai', 'pl', 'kp', 'uy', 'gb', 'gs', 'kurdistan', 'rw', 'ec', 'mm', 'pa', 'wales', 'kg', 've', 'tk', 'ca', 'is', 'ke', 'ro', 'gq', 'pt', 'tf', 'ad', 'sk', 'pm', 'om', 'an', 'ws', 'sh', 'mp', 'gt', 'cf', 'zanzibar', 'mw', 'catalonia', 'ug', 'je', 'km', 'in', 'bf', 'mc', 'sy', 'sn', 'kr', 'eu', 'bn', 'st', 'england', 'lc', 'dm', 'be', 'ni', 'ua', 'mz', 'pf', 'tn', 'ee', 'xk', 'sx', 'sd', 'gd', 'ci', 'sz', 'cl', 'fi', 'ga', 'jp', 'de', 'np', 're', 'bg', 'sc', 'ng', 'qa', 'mk', 'aw', 'kn', 'al', 'bw', 'um', 'ky', 'tt', 'so', 'lt', 'by', 'bb', 'us', 'md', 'ag', 'hm', 'as', 'eg', 'sv', 'sl', 'fk', 'am', 'ck', 'tw', 'kh', 'to', 'se', 'cd', 'pn', 'gr', 'id', 'vc', 'somaliland', 'bi', 'pk', 'pr', 'bd', 'co', 'fm', 'bm', 'ar', 'bv', 'sb', 'mq', 'eh', 'bh', 'it', 'hr', 'sa', 'mv', 'mg', 'dz', 'gg', 'gm', 'af', 'li', 'sr', 'vg', 'cr', 'tc', 'ao', 'ma', 'mr', 'gn', 'ne', 'nf', 'wf', 'hk', 'gf', 'ps', 'ic', 'cw', 'ml', 'ax', 'gl', 'dj', 'cn', 'ht', 'lr', 'tg', 'ba', 'ge', 'bz', 'au', 'iq', 'cm', 'gw', 'az', 'na', 'fj', 'zw', 'bs', 'il', 'nz', 'me', 'si', 'nc', 'lb'];

window.$docsify = {
  name: config.name,
  repo: config.repo,
  themeColor: '#512DA8',
  homepage: 'get-started.md',
  topMargin: 50,
  loadSidebar: true,
  coverpage: true,
  auto2top: true,
  executeScript: true,
  copyCode: {
    buttonText: 'Copy',
  },
  plugins: [docsifyPlugin],
};

function docsifyPlugin(hook, vm) {
  hook.beforeEach(docsifyPluginBeforeEach);
  hook.doneEach(docsifyPluginDoneEach);
}

function docsifyPluginBeforeEach(content) {
  content = replacePlaceholders(content);

  return content;
}

function docsifyPluginDoneEach() {
  replacePlaceholdersForElement('.sidebar-nav');
  replacePlaceholdersForElement('.docsify-pagination-container');
}

function replacePlaceholdersForElement(selector) {
  var ele = document.querySelector(selector);

  if (!ele) {
    return;
  }

  ele.innerHTML = replacePlaceholders(ele.innerHTML);
}

function replacePlaceholders(content) {
  Object.keys(config).forEach(function (placeholder) {
    var value = config[placeholder];

    if (value) {
      var regexp = new RegExp('{{' + placeholder + '}}', 'g');
      content = content.replace(regexp, value);
    }
  });

  return content;
}

function getOptions(count, includeDesc) {
  if (!count) {
    count = 100000;
  }

  var optionsData = [];

  for (var i = 1; i <= count; i++) {
    let optionData = { value: i, label: 'Option ' + i };

    if (includeDesc) {
      optionData.description = 'Description ' + i;
    }

    optionsData.push(optionData);
  }

  return optionsData;
}

function getGroupOptions() {
  let optGroupData = [];

  for (let i = 1; i <= 3; i++) {
    let label = `Option group ${i}`;
    let options = [];

    for (let j = 1; j <= 3; j++) {
      let value = `${i}-${j}`;
      let label = `Option ${value}`;

      options.push({ value: value, label: label });
    }

    optGroupData.push({ label: label, options: options });
  }

  return optGroupData;
}

function onSampleServerSearch(searchValue, virtualSelect) {
  let newOptions = searchValue ? getOptions().filter((d) => d.label.toLowerCase().indexOf(searchValue) !== -1) : [];

  setTimeout(() => {
    virtualSelect.setServerOptions(newOptions);
  }, 300);
}

function sampleLabelRenderer(data) {
  let prefix = '';

  /** skipping options those are added newly by allowNewOption feature */
  if (!data.isCurrentNew && !data.isNew) {
    /** project developer has to add their own logic to create image/icon tag */
    let flagIndex = data.value % flagClasses.length;
    prefix = `<i class="flag flag-${flagClasses[flagIndex]}"></i>`;
  } else {
    /** common image/icon could be added for new options */
  }

  return `${prefix}${data.label}`;
}

function initPageGetStarted() {
  replacePlaceholdersForElement('.cover-main');

  VirtualSelect.init(
    Object.assign({}, virtualSelectOptions, {
      ele: '#single-select',
      search: true,
      placeholder: 'Select a single value',
    })
  );

  VirtualSelect.init(
    Object.assign({}, virtualSelectOptions, {
      ele: '#multiple-select',
      multiple: true,
      placeholder: 'Select multiple values',
    })
  );
}

function initPageExamples() {
  VirtualSelect.init(
    Object.assign({}, virtualSelectOptions, {
      ele: '#single-select',
    })
  );

  VirtualSelect.init(
    Object.assign({}, virtualSelectOptions, {
      ele: '#single-search-select',
      search: true,
    })
  );

  VirtualSelect.init(
    Object.assign({}, virtualSelectOptions, {
      ele: '#sample-multi-select',
      multiple: true,
    })
  );

  VirtualSelect.init(
    Object.assign({}, virtualSelectOptions, {
      ele: '#multi-select-without-search',
      multiple: true,
      search: false,
    })
  );

  VirtualSelect.init(
    Object.assign({}, virtualSelectOptions, {
      ele: '#single-disabled-select',
      disabledOptions: [2, 6, 9],
    })
  );

  VirtualSelect.init(
    Object.assign({}, virtualSelectOptions, {
      ele: '#option-group-select',
      options: getGroupOptions(),
      multiple: true,
    })
  );

  VirtualSelect.init(
    Object.assign({}, virtualSelectOptions, {
      ele: '#preselect-single-select',
      selectedValue: 3,
    })
  );

  VirtualSelect.init(
    Object.assign({}, virtualSelectOptions, {
      ele: '#preselect-multiple-select',
      multiple: true,
      selectedValue: [3, 4],
    })
  );

  VirtualSelect.init(
    Object.assign({}, virtualSelectOptions, {
      ele: '#hide-clear-select',
      hideClearButton: true,
    })
  );

  VirtualSelect.init(
    Object.assign({}, virtualSelectOptions, {
      ele: '#custom-width-select',
      position: 'bottom right',
      dropboxWidth: '130px',
    })
  );

  VirtualSelect.init(
    Object.assign({}, virtualSelectOptions, {
      ele: '#new-option-select',
      options: getOptions(3),
      allowNewOption: true,
    })
  );

  VirtualSelect.init(
    Object.assign({}, virtualSelectOptions, {
      ele: '#mark-results-select',
      search: true,
      markSearchResults: true,
    })
  );

  VirtualSelect.init(
    Object.assign({}, virtualSelectOptions, {
      ele: '#selected-first-select',
      options: getOptions(30),
      multiple: true,
      showSelectedOptionsFirst: true,
    })
  );

  VirtualSelect.init(
    Object.assign({}, virtualSelectOptions, {
      ele: '#alias-select',
      options: [
        { label: 'Colors', value: 'colors', alias: 'Orange, Red' },
        { label: 'Fruits', value: 'fruits', alias: ['Orange', 'Apple'] },
        { label: 'Months', value: 'months', alias: 'January' },
        { label: 'Others', value: 'others' },
      ],
      search: true,
    })
  );

  VirtualSelect.init(
    Object.assign({}, virtualSelectOptions, {
      ele: '#keep-open-select',
      search: true,
      keepAlwaysOpen: true,
    })
  );

  VirtualSelect.init(
    Object.assign({}, virtualSelectOptions, {
      ele: '#max-values-select',
      multiple: true,
      maxValues: 4,
    })
  );

  VirtualSelect.init(
    Object.assign({}, virtualSelectOptions, {
      ele: '#with-description-select',
      options: getOptions(null, true),
      hasOptionDescription: true,
    })
  );

  VirtualSelect.init(
    Object.assign({}, virtualSelectOptions, {
      ele: '#single-show-as-popup-select',
      popupDropboxBreakpoint: '3000px',
      placeholder: 'Select a single value',
    })
  );

  VirtualSelect.init(
    Object.assign({}, virtualSelectOptions, {
      ele: '#multiple-show-as-popup-select',
      popupDropboxBreakpoint: '3000px',
      placeholder: 'Select multiple values',
      multiple: true,
    })
  );

  VirtualSelect.init(
    Object.assign({}, virtualSelectOptions, {
      ele: '#server-search-select',
      multiple: true,
      searchPlaceholderText: 'Type here for options',
      onServerSearch: onSampleServerSearch,
    })
  );

  VirtualSelect.init(
    Object.assign({}, virtualSelectOptions, {
      ele: '#options-on-search-select',
      showOptionsOnlyOnSearch: true,
      searchPlaceholderText: 'Type here for options',
    })
  );

  VirtualSelect.init(
    Object.assign({}, virtualSelectOptions, {
      ele: '#with-image-select',
      labelRenderer: sampleLabelRenderer,
    })
  );

  VirtualSelect.init(
    Object.assign({}, virtualSelectOptions, {
      ele: '#show-value-as-tags-select',
      multiple: true,
      showValueAsTags: true,
    })
  );

  VirtualSelect.init(
    Object.assign({}, virtualSelectOptions, {
      ele: '#direction-rtl-select',
      multiple: true,
      textDirection: 'rtl',
    })
  );
}
