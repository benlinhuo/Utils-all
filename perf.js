(function() {
    var Perf = function() {
        this.sitePn = {"aifang": ["Aifang_Web_Loupan_View_PhotosIndexPage", "Aifang_Web_Loupan_View_IndexPage", "Aifang_Web_Kft_ViewPage", "Aifang_Web_Loupan_View_InfoPage", "Aifang_Web_Props_SearchOrigAnjukePage", "Aifang_Web_Props_NewViewAnjukePage", "Aifang_Web_Loupan_List_ListIndexPage", "Aifang_Web_Tuangou_ListNewPage", "Aifang_Web_Tuangou_IndexPage", "Aifang_Web_Props_ListPage"],"broker": ["Broker_AccountmanagementPage", "User_Broker_BrokerHomePage", "Manage_ProplistPage"],"ershoufang": ["Ershou_Web_Property_ViewPage", "Ershou_Web_Home_HomePage", "Findingv2_SaleFilterPage", "Listing_Communitynew_SearchPage", "Ershou_Web_Community_CommViewPage", "Community_V2_PropListPage", "Map3_IndexPage", "Listing_V2_IndexPage_All", "Zufang_Web_Rent_Yep_ViewPage", "QA_QuestionMainPage", "QA_QuestionDetailPage", "QA_QuestionListPage", "Market_V3_HomePage", "Ershou_Web_Seo_Fangjia_ViewPage", "Office_ViewVer2Page", "Shop_DetailPage"],"aifangtw": ["Xinfang_Fangyuan", "Xinfang_Fangyuan_List", "Xinfang_Fangyuan_View", "Xinfang_Home", "Xinfang_Loupan_List", "Xinfang_Loupan_View", "Daogou_list"],"ershoutouch": ["Anjuke_Home", "Anjuke_Prop_List", "Anjuke_Prop_View", "Rental_Home", "Rent_List", "Rent_View"],"ershoupad": ["Home_HomePadPage", "Map2_IndexPadPage", "Finding_SaleFilterPadPage", "Listing_Community_SearchPadPage"]};
        this.serverUrl = 'http://sh.fang.anjuke.com/performance/collect/';
        this.config = {"navigationStart": "ns","unloadEventStart": "uls","unloadEventEnd": "ele","redirectStart": "rs","redirectEnd": "re","fetchStart": "fs","domainLookupStart": "ls","domainLookupEnd": "le","connectStart": "cs","connectEnd": "ce","secureConnectionStart": "scs","requestStart": "rqs","responseStart": "rps","responseEnd": "rpe","domLoading": "dl","domInteractive": "di","domContentLoadedEventStart": "cls","domContentLoadedEventEnd": "cle","domComplete": "dc","loadEventStart": "lds","loadEventEnd": "lde","ip": "ip","guid": "guid","terminal": "terminal","pageName": "pn","cityId": "cityId","siteName": "sn"};
        if (this.isReady()) {
            this.send()
        }
    };
    Perf.prototype = {
        constructor: Perf,
        isReady: function() {
            return window.performance && window.performance.timing && typeof window.perfConfig == "object" && window.perfConfig.pageName && window.perfConfig.siteName && this.checkPageName()
        },
        checkPageName: function() {
            var pn = this.getPageName();
            var sn = this.getSiteName();
            if (typeof this.sitePn[sn] == "object" && this.isArray(this.sitePn[sn])) {
                for (var i = 0; i < this.sitePn[sn].length; i++) {
                    if (this.sitePn[sn][i] == pn) {
                        return true;
                        break
                    }
                }
            }
            return false
        },
        isArray: function(arg) {
            return Object.prototype.toString.call(arg) === "[object Array]"
        },
        getTerminal: function() {
            var u = navigator.userAgent;
            if (typeof navigator == "object" && typeof navigator.userAgent == "string") {
                var terminal = {trident: u.indexOf("Trident") > -1,presto: u.indexOf("Presto") > -1,webKit: u.indexOf("AppleWebKit") > -1,gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1,mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/),ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1,iPhone: u.indexOf("iPhone") > -1 || u.indexOf("Mac") > -1,iPad: u.indexOf("iPad") > -1,webApp: u.indexOf("Safari") == -1}, bool = "ontouchstart" in window;
                if (bool && (terminal.mobile || terminal.iPhone || terminal.android || terminal.iPad)) {
                    return "mobile"
                } else {
                    return "pc"
                }
            }
            return "pc"
        },
        getPageName: function() {
            return window.perfConfig.pageName
        },
        getSiteName: function() {
            return window.perfConfig.siteName
        },
        getCookie: function(check_name) {
            var a_all_cookies = document.cookie.split(";"), a_temp_cookie = "", cookie_name = "", cookie_value = "", b_cookie_found = false;
            for (i = 0; i < a_all_cookies.length; i++) {
                a_temp_cookie = a_all_cookies[i].split("=");
                cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, "");
                if (cookie_name == check_name) {
                    b_cookie_found = true;
                    if (a_temp_cookie.length > 1) {
                        cookie_value = decodeURIComponent(a_temp_cookie[1].replace(/^\s+|\s+$/g, ""))
                    }
                    return cookie_value;
                    break
                }
                a_temp_cookie = null;
                cookie_name = ""
            }
            if (!b_cookie_found) {
                return null
            }
        },
        buildUrl: function() {
            var params = this.getParams(), src = [];
            for (var i in params) {
                if (this.config[i]) {
                    src.push(this.config[i] + "=" + params[i])
                }
            }
            return src.join("&")
        },
        getParams: function() {
            var performance = window.performance.timing;
            performance.cityId = this.getCookie("ctid");
            performance.guid = this.getCookie("aQQ_ajkguid");
            performance.pageName = this.getPageName();
            performance.siteName = this.getSiteName();
            performance.terminal = this.getTerminal();
            return performance
        },
        send: function() {
            var script = document.createElement("img");
            script.src = this.serverUrl + "?" + this.buildUrl();
            script.style.height = "1px";
            script.style.width = "1px";
            script.style.display = "none";
            document.body.appendChild(script)
        }};
    if (window.performance && window.performance.timing && window.addEventListener) {
        window.addEventListener("load", function() {
            setTimeout(function() {
                new Perf()
            }, 1000)
        })
    }
})(window);
