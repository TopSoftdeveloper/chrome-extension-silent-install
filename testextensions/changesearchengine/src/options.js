/*
var options = {
  activeWidget: "activeWidget",
  backgroundColor: "backgroundColor",
  backgroundImage: "backgroundImage",
  temperatureUnit: "temperatureUnit",
  timeFormat: "timeFormat"
};

*/

//var FALLBACK_IMAGES_COUNT = 9;

/*
var OPTION_COLORS = [
  "F25252",
  "F27F52",
  "F2B052",
  "F2D052",
  "AFDC6C",
  "7AE280 ",
  "83DCBC",
  "6DC6E4",
  "6D8BE4",
  "896FE3",
  "000000",
  "FFFFFF"
];
*/

/*
var DEFAULT_OPTIONS = {
  activeWidget: "time",
  backgroundColor: "AAAAA",
  backgroundImage: "9",
  temperatureUnit: "F",
  timeFormat: 12
};
*/

var DEFAULT_SEARCH = {
  searchEngine: "se_yahoo",
  type: "web"
};

var SEARCH_ENGINES = {
  fallback: "https://www.bing.com/search?q={searchTerms}",
  se_google: {
    web: "https://www.google.com/search?q={searchTerms}",
    image: "https://www.google.com/search?q={searchTerms}&tbm=isch",
    video: "https://www.google.com/search?q={searchTerms}&tbm=vid",
    suggest:
      "http://google.com/complete/search?client=chrome-omni&q={searchTerms}"
  },
  se_yandex: {
    web: "https://www.yandex.ru/search/?text={searchTerms}",
    image: "https://yandex.ru/images/search?text={searchTerms}",
    video: "https://yandex.ru/video/search?text={searchTerms}",
    suggest: "https://api.bing.com/osjson.aspx?query={searchTerms}"
  },
  se_baidu: {
    web: "https://www.baidu.com/s?ie=utf-8&wd={searchTerms}",
    image:
      "https://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word={searchTerms}",
    video: "http://video.baidu.com/v?ie=utf-8&word={searchTerms}",
    suggest: "https://api.bing.com/osjson.aspx?query={searchTerms}"
  },
  se_bing: {
    web: "https://www.bing.com/search?q={searchTerms}",
    image: "https://www.bing.com/images/search?q={searchTerms}",
    video: "https://www.bing.com/videos/search?q={searchTerms}",
    suggest: "https://api.bing.com/osjson.aspx?query={searchTerms}"
  },
  se_yahoo: {
    web: "https://find.thesearchad.com/results.aspx?gd=SY1004015&searchsource=58&q={searchTerms}",
    image: "https://images.search.yahoo.com/search/images?p={searchTerms}",
    video: "https://video.search.yahoo.com/search/video?p={searchTerms}",
    suggest:
      "https://search.yahoo.com/sugg/chrome?output=fxjson&nresults=10&command={searchTerms}"
  },
  se_ask: {
    web: "http://www.ask.com/web?q={searchTerms}",
    image: "http://www.ask.com/web?q={searchTerms}",
    video: "http://www.ask.com/youtube?q={searchTerms}",
    suggest: "http://ss.ask.com/query?q={searchTerms}"
  }
};

//var SUGGEST_URL = "https://api.bing.com/osjson.aspx"; // MH - this feed is used for all engines

//var FLICKR_API = "";

// Module vars get setup in the call to `initialize`
//let userOptions = $.extend(true, {}, DEFAULT_OPTIONS); // clone

let userOptions = {};

// get from the storage or clone
let searchConfig = {};

chrome.storage.sync.get("searchConfig", items => {
  let savedOptions = items.searchConfig;
  if (savedOptions) {
    $.extend(true, searchConfig, savedOptions);
  } else {
    $.extend(true, searchConfig, DEFAULT_SEARCH);
  }
});

function loadUserSettings(doneCallback) {
  chrome.storage.sync.get("userOptions", items => {
    let savedOptions = items.userOptions;
    if (savedOptions) {
      $.extend(true, userOptions, savedOptions);
    }
    (doneCallback || $.noop)();
  });
}

function userOption(optionId, newValue) {
  if (typeof newValue !== "undefined") {
    userOptions[options[optionId]] = newValue;
    chrome.storage.sync.set({ userOptions });
  }
  return userOptions[options[optionId]] || "";
}

/*function startClock() {
  let hour12 = $(".hour12");
  let hour24 = $(".hour24");

  // load last used time display type
  if (userOption(options.timeFormat) !== 12) {
    hour12.toggle();
    hour24.toggle();
  }

  $(".time-widget").click(event => {
    toggleTimeFormat();
  });

  function zeroPad(value) {
    return value < 10 ? `0${value}` : `${value}`;
  }

  function formatTime(date, is24Hour) {
    let hours = date.getHours();
    if (!is24Hour) {
      hours = date.getHours() % 12;
      hours = hours ? hours : 12;
    }
    return `${is24Hour ? zeroPad(hours) : hours}:${zeroPad(date.getMinutes())}`;
  }

  function updateClock() {
    let now = new Date();

    // 12 hour time
    let meridiem = now.getHours() >= 12 ? "pm" : "am";
    hour12.find(".time").text(formatTime(now, false));
    $(".meridiem").text(meridiem);

    // 24 hour time
    hour24.find(".time").text(formatTime(now, true));
  }

  setInterval(updateClock, 1000);
  updateClock();
}*/

/*function getFallbackImageUrl(imageId) {
  imageId = imageId || Math.floor(Math.random() * FALLBACK_IMAGES_COUNT) + 1;
  return `../images/backgrounds/${imageId}.jpg`;
}

*/
/*
function toggleFlickrCredit(isVisible) {
  $(".flickr-credit").toggle(isVisible);
  $(".info-links")
    .toggleClass("col-xs-6", isVisible)
    .toggleClass("col-xs-12", !isVisible);
}
*/
/*

function changeBackgroundToFlickr() {
  if ($(".flickr-background").length > 0) {
    return; // already loaded
  }

  let daysSince1970 = Math.floor(new Date().getTime() / (1000 * 60 * 60 * 24));
  let imageToUse = FLICKR_IMAGES[daysSince1970 % FLICKR_IMAGES.length];

  function useFallBackImage() {
    $("body").css("background-image", `url("${getFallbackImageUrl()}")`);
  }

  let imageResource = `${FLICKR_API}/${imageToUse.type}/${imageToUse.id}`;
  $.ajax(`${imageResource}.json`)
    .done(function(apiData) {
      try {
        let metaData = JSON.parse(apiData);
        $("body").append(`
                    <div class="flickr-background" style="background-image: url('${imageResource}.jpg')"></div>
                `);
        $(".flickr-credit").append(`
                    <a href="${
                      metaData.pretty_url
                    }"  target="_blank">&ldquo;${metaData.title}&rdquo;</a> by
                    <a href="${
                      metaData.profile_url
                    }" target="_blank">${metaData.profile_name}</a>
                    <a href="${
                      metaData.license_url
                    }" target="_blank">(${metaData.license_name})</a>
                `);

        toggleFlickrCredit(true);
        $(".flickr-message").html(
          'Subscribed to daily images. <span class="glyphicon glyphicon-ok"></span>'
        );
        $(".flickr-button").prop("disabled", true);
      } catch (e) {
        useFallBackImage();
      }
    })
    .fail(useFallBackImage);
}

function disableFlickrBackground() {
  $(".flickr-message").html("Get a new image everyday!");
  $(".flickr-button").prop("disabled", false);
  $(".flickr-credit").empty();
  toggleFlickrCredit(false);
  $(".flickr-background").remove();
}

*/

/*
function changeBackgroundFromSettings() {
  let body = $("body");
  let bgColor = userOption(options.backgroundColor);
  let bgImage = userOption(options.backgroundImage);

  body.css("background-color", `#${bgColor}`);
  body.toggleClass("color-bg", bgColor && bgImage === "none");
  body.toggleClass("white-bg", bgColor === "FFFFFF" && bgImage === "none");

  if (bgImage === "flickr") {
    changeBackgroundToFlickr();
  } else {
    disableFlickrBackground();
  }

  if (bgImage === "none") {
    body.css("background-image", "none");
  } else if (bgImage !== "flickr") {
    body.css("background-image", `url("${getFallbackImageUrl(bgImage)}")`);
  }
}
*/

function makeEngineImageElement(engine) {
  return $(`<img class="search-engine-icon"
                   src="../images/brands/${engine}-color.svg"
              />`);
}

function formatSelectOption(data) {
  if (!data.id) {
    return data.text;
  }
  return $("<span></span>").append([
    makeEngineImageElement(data.element.value)
  ]);
}

/*function createOptionsPane() {
  let pane = $(".options-pane");
  let images = [];
  for (let imageId = 1; imageId <= FALLBACK_IMAGES_COUNT; imageId++) {
    images.push(
      `<a href="#" data-id="${imageId}"><img src="${getFallbackImageUrl(
        imageId
      )}" /></a>`
    );
  }
  $(".options-images").prepend(images);
  $(".options-colors").append(
    OPTION_COLORS.map(
      color =>
        `<a href="#" data-color="${color}" class="option-color ${color}" style="background: #${color}"></a>`
    )
  );
  $(".options-images a").click(function() {
    userOption(options.backgroundImage, $(this).data("id"));
    changeBackgroundFromSettings();
    pane.fadeOut();
  });
  $(".options-colors a").click(function() {
    userOption(options.backgroundImage, "none");
    userOption(options.backgroundColor, `${$(this).data("color")}`);
    changeBackgroundFromSettings();
    pane.fadeOut();
  });
  $(".flickr-button").click(() => {
    userOption(options.backgroundImage, "flickr");
    changeBackgroundFromSettings();
    pane.fadeOut();
  });
  $(".options-open, .options-close").click(() => pane.fadeToggle());
  $(document).mouseup(e => {
    let optionsButton = $(".options-open");
    if (
      pane.is(":visible") &&
      !pane.is(e.target) &&
      pane.has(e.target).length === 0 &&
      !optionsButton.is(e.target) &&
      optionsButton.has(e.target).length === 0
    ) {
      pane.fadeOut();
    }
  });
}*/

/*
function bindSearchTypeButtons() {
  let buttons = $(".search-types a");
  buttons.click(function(event) {
    let clickedButton = $(this);
    event.preventDefault();
    buttons.not(clickedButton).removeClass("active");
    clickedButton.addClass("active");
    searchConfig.type = clickedButton.data("type");
    chrome.storage.sync.set({ searchConfig });
  });
}
*/

function sortSearchEngines() {
  // Sort the options so the config search engine is first
  let searchEngineSelect = $(".search-engine select");
  let searchOpt = searchEngineSelect.children(
    `option[value="${DEFAULT_SEARCH.web}"]`
  );
  searchOpt.detach();
  searchEngineSelect.prepend(searchOpt);
}

function bindSearchEngineSelect() {
  $(".search-engine select")
    .change(function() {
      searchConfig.searchEngine = $(this).val();
      chrome.storage.sync.set({ searchConfig });
    })
    .select2({
      minimumResultsForSearch: Infinity,
      templateResult: formatSelectOption,
      templateSelection: formatSelectOption
    });
}

/*
function redirectSearch(query) {
  let searchUrl;
  try {
    searchUrl = SEARCH_ENGINES[searchConfig.searchEngine][searchConfig.type];
  } catch (e) {
    searchUrl = SEARCH_ENGINES.fallback;
  }

  window.location.href = searchUrl.replace(
    "{searchTerms}",
    encodeURIComponent(query)
  );
}

function performSearch(event) {
  event.preventDefault();
  let query = $(".search-query input").val();
  if (query.length > 0) {
    redirectSearch(query);
  }
}
*/

/*function toggleTimeFormat() {
  $(".hour12").toggle();
  $(".hour24").toggle();

  // save active time format
  let timeFormat = $(".hour12").is(":visible") ? 12 : 24;
  userOption(options.timeFormat, timeFormat);
}*/

// Replace all linked svg files (in img tags) with inline SVG so that the colour can be changed with CSS
/*function expandSVG() {
  $('img[src$=".svg"]').each((index, element) => {
    let $img = $(element);
    let imgID = $img.attr("id");
    let imgClass = $img.attr("class");
    let imgURL = $img.attr("src");

    $.get(
      imgURL,
      data => {
        // Get the SVG tag, ignore the rest
        let $svg = $(data).find("svg");

        // Add replaced image's ID to the new SVG
        if (typeof imgID !== "undefined") {
          $svg = $svg.attr("id", imgID);
        }

        // Add replaced image's classes to the new SVG
        if (typeof imgClass !== "undefined") {
          $svg = $svg.attr("class", imgClass);
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr("xmlns:a");

        // Replace image with new SVG
        $img.replaceWith($svg);
      },
      "xml"
    );
  });
}*/

/*function bindAutocomplete() {
  var AUTOCOMPLETE_MAX_COUNT = 4;
  var AUTOCOMPLETE_HEIGHT = 40;
  $(".search-query input").autocomplete({
    dataType: "json",
    maxHeight: AUTOCOMPLETE_MAX_COUNT * AUTOCOMPLETE_HEIGHT,
    onSearchStart: params => {
      $(".search-query input")
        .autocomplete()
        .setOptions({
          // tslint:disable:object-literal-sort-keys 
          params: {
            query: encodeURI(params.query)
          }
          // tslint:enable:object-literal-sort-keys 
        });
    },
    onSelect: suggestion => {
      redirectSearch(suggestion.value);
    },
    paramName: "query",
    serviceUrl: SUGGEST_URL,
    transformResult: response => {
      try {
        return {
          query: response[0],
          suggestions: response[1]
        };
      } catch (e) {
        return {
          suggestions: []
        };
      }
    },
    width: "465"
  });
}*/

function initializeUIStateFromSettings() {
  $(".search-engine select")
    .val([searchConfig.searchEngine])
    .trigger("change");
  $(`.search-types a[data-type="${searchConfig.type}"]`).click();
}

function onSelectOptionMouseEnter(event) {
  // Change the previously highlighted option back to color
  $(".select2-results__option").each((index, element) => {
    let option = $(element).find("img");
    let src = option.attr("src");
    option.attr("src", src.replace("white", "color"));
  });

  let option = $(event.currentTarget).find("img");
  let src = option.attr("src");
  option.attr("src", src.replace("color", "white"));
}

$(document).ready(() => {
  //createOptionsPane();
 // bindSearchTypeButtons();
  sortSearchEngines();
  bindSearchEngineSelect();
  //bindAutocomplete();
 // expandSVG();

  let optionsSource = "tab-click";
  // Check the query string to see whether the source is a options opened via extension-icon click.
  // This is set inside background.ts when opening the options via the icon click.
  if (window.location.search === "?icon-click") {
    optionsSource = "icon-click";
  }

 // $(".search-query input").focus();
 // $("form").submit(performSearch);
 // $(".search-go").click(performSearch);
 /*
  $(document).on(
    "mouseenter",
    ".select2-results__option",
    onSelectOptionMouseEnter
  );
*/

  loadUserSettings(() => {
    initializeUIStateFromSettings();
    //changeBackgroundFromSettings();
   // startClock();
  });
  

  /*$(".modal-footer .btn-primary").click(function(evt) {
    $(".options-open").trigger("click");
  });*/
});
