var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

function checkBrowser(){
	var browser = "";	
	
	if(/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor))
		browser = "Chrome";
	
	if(/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor))
		browser = "Safari";
    
    if (navigator.userAgent.indexOf('Firefox') != -1 && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Firefox') + 8)) >= 3.6)
        browser = "Firefox";

	if(navigator.userAgent.toLowerCase().indexOf('msie') != -1 || navigator.appVersion.indexOf('Trident/') > 0){
		if(navigator.appVersion.indexOf("MSIE 6.") != -1) browser = "IE6";
		else if(navigator.appVersion.indexOf("MSIE 7.") != -1) browser = "IE7";
		else if(navigator.appVersion.indexOf("MSIE 8.") != -1) browser = "IE8";
        else if(navigator.appVersion.indexOf("MSIE 9.") != -1) browser = "IE9";
        else if(navigator.appVersion.indexOf('Trident/6.0') > 0) browser = "IE10";
        else if(navigator.appVersion.indexOf('Trident/7.0') > 0) browser = "IE11";
	}
	
	return browser;
}

//------------------------------ Language Switch(start) ------------------------------//
function switchLang(obj){
    localStorage.setItem("TCCLang", obj.getAttribute("alt"));
    
    var host = location.host;
    //var hostname = location.hostname;
    //var pathname = location.pathname;
    //var href = location.href;

    if(host == "" || host == "localhost")
        location.href = "../" + obj.getAttribute("alt") + "/index.html";
    else if(host.indexOf("192.168") >= 0)
        location.href = "http://" + host + "/" + obj.getAttribute("alt") + "/index.html";
    else
        location.href = "https://" + host + "/" + obj.getAttribute("alt") + "/index.html";
}

function chkLang(){
    var browserLang = (navigator.language || navigator.browserLanguage).toLowerCase();
    console.log("browserLang : " + browserLang);
    strEnd = location.pathname.lastIndexOf("/");
    midPath = location.pathname.substr(0, strEnd);
    
    if(     browserLang.indexOf("tw") >= 0 || browserLang.indexOf("hant") >= 0) browserLang = "tw";
    else if(browserLang.indexOf("cn") >= 0 || browserLang.indexOf("hans") >= 0) browserLang = "cn";
    else                                                                        browserLang = "en";
    
    if(browserLang == "cn" && midPath.indexOf("cn") == -1 )
        location.href = "https://" + location.host + midPath.replace(/tw|en/, "cn") + location.pathname.substr(strEnd);

            
//    var storageLang = localStorage.getItem("TCCLang");
//    var browserLang = navigator.language.toLowerCase();
//
//    strEnd = location.pathname.lastIndexOf("/");
//    midPath = location.pathname.substr(0, strEnd);
//    
//    if(storageLang != null && storageLang != undefined){
//        if(storageLang == "tw" && midPath.indexOf("tw") == -1 )
//            location.href = "https://" + location.hostname + midPath.replace(/cn|en/, "tw") + location.pathname.substr(strEnd);
//        if(storageLang == "cn" && midPath.indexOf("cn") == -1 )
//            location.href = "https://" + location.hostname + midPath.replace(/tw|en/, "cn") + location.pathname.substr(strEnd);
//        if(storageLang == "en" && midPath.indexOf("en") == -1 )
//            location.href = "https://" + location.hostname + midPath.replace(/tw|cn/, "en") + location.pathname.substr(strEnd);
//    }else{
//        if(browserLang.indexOf("tw") >= 0)      browserLang = "tw";
//        else if(browserLang.indexOf("cn") >= 0) browserLang = "cn";
//        else                                    browserLang = "en";
//
//        if(typeof(localStorage) != null && typeof(localStorage) != undefined){
//            localStorage.setItem("TCCLang", browserLang);
//        }
//        
//        if(browserLang == "tw" && midPath.indexOf("tw") == -1 )
//            location.href = "https://" + location.hostname + midPath.replace(/cn|en/, "tw") + location.pathname.substr(strEnd);
//        if(browserLang == "cn" && midPath.indexOf("cn") == -1 )
//            location.href = "https://" + location.hostname + midPath.replace(/tw|en/, "cn") + location.pathname.substr(strEnd);
//        if(browserLang == "en" && midPath.indexOf("en") == -1 )
//            location.href = "https://" + location.hostname + midPath.replace(/tw|cn/, "en") + location.pathname.substr(strEnd);
//    }
}
//------------------------------ Language Switch(end) ------------------------------//

//------------------------------ UI Ctrl(start) ------------------------------//
function getDomWidth(){
	return document.documentElement.clientWidth;
}

function getDomHeight(){
	return document.documentElement.clientHeight;
}

function getHeader(){
    var browser = checkBrowser();
	var temp = '';
    
	temp += '<div class="headerLogo">';
	temp += '	<a href="index.html">';
    if(browser.indexOf("IE") >= 0) temp += '<img class="logo" src="img/logo1_ie.png" alt="台灣水泥">';
    else                           temp += '<img class="logo" src="img/logo1.png" alt="台灣水泥">';
	temp += '	</a>';
	temp +=	'</div>';

    temp += '<div class="headerFocus headerFocusL">';
    temp += '   <div class="block">';
    temp += '       <div class="gcse-search"></div>';
    // temp += '       <input id="keywordPC" type="text" placeholder="Search by Keywords" onkeypress="enterKeywordPC(event)" onfocus="enterKeywordPCFocus(\'.searchNotePC\')" onblur="enterKeywordPCBlur(\'.searchNotePC\')"/>';
    // temp += '       <i class="fas fa-search searchBtn" onclick="clickKeywordPC()"></i>';
    temp += '       <div class="clear"></div>';
    temp += '       <div class="searchNotePC">若要完整字串比對，可於輸入字串前後加上雙引號。</div>';
    temp += '   </div>';
    if((navigator.language || navigator.browserLanguage).toLowerCase().indexOf("cn") == -1){
    temp += '   <div class="block">';
    temp += '       <span class="switchLang" title="繁體中文" alt="tw" lang="zh-Hant-TW" onclick="switchLang(this)">繁體</span>';
    temp += '       <span class="divide">|</span>';
    temp += '       <span class="switchLang" title="簡體中文" alt="cn" lang="zh-Hans-CN" onclick="switchLang(this)">简体</span>';
    temp += '       <span class="divide">|</span>';
    temp += '       <span class="switchLang" title="English" alt="en" lang="en"         onclick="switchLang(this)">En</span>';
    temp += '   </div>';
    }
    temp += '</div>';
    
    temp += '<div class="headerFocus headerFocusR">';
    temp += '   <div class="block">';
    temp += '       <a class="hrPortalMenu" target="_blank" href="http://internal.taiwancement.com"><span class="contact">員工專區</span></a>';
    temp += '       <span class="divide">|</span>';
    temp += '       <a href="contact.html"><span class="contact">聯絡我們</span></a>';
    temp += '       <span class="divide">|</span>';
    temp += '       <a href="newsletter.html"><span class="paper">訂閱電子報</span></a>';
    temp += '   </div>';
    temp += '   <div class="block">';
    temp += '           <a class="socialIcon" target="_blank" title="台泥 FB" href="https://zh-tw.facebook.com/%E5%8F%B0%E6%B3%A5%E4%BC%81%E6%A5%AD%E5%9C%98-1659728604312270"><i class="fab fa-facebook-square"></i></a>';
    temp += '           <a class="socialIcon" target="_blank" title="台泥 IG" href="https://www.instagram.com/taiwan_cement/">';
    temp += '               <div class="igIcon">';
    temp += '                   <div class="rect1"></div>';
    temp += '                   <div class="rect2"></div>';
    temp += '                   <div class="dot"></div>';
    temp += '               </div>';
    temp += '           </a>';
    temp += '           <a class="socialIcon" target="_blank" title="台泥 Youtube" href="https://www.youtube.com/channel/UCLQ_ByRXJcBkHIqLFaXoq3Q"><i class="fab fa-youtube"></i></a>';
    temp += '           <a class="socialIcon" target="_blank" title="台泥微信">';
    temp += '               <i class="fab fa-weixin"></i>';
    temp += '               <img class="weixinQR" src="img/menu_weixinQR.jpg"/>';
    temp += '           </a>';
    temp += '   </div>';
    temp += '</div>';

	temp += '<div class="headerMenu">';
	temp += '	<ul>';
	temp += '		<li>';
	temp += '			<span>關於台泥</span>';
	temp += '			<ul>';
	temp += '				<a href="aboutHistory.html"><li>台泥歷史</li></a>';
    temp += '				<a href="aboutWordFromCompany.html"><li>經營者的話</li></a>';
    temp += '				<a href="aboutTccTalkArticleList.html"><li>TCC TALK</li></a>';
    temp += '				<a href="aboutManagementTeam.html"><li>經營團隊</li></a>';
    temp += '				<a href="aboutOperatingResults.html"><li>營運狀況</li></a>';
    temp += '				<a href="aboutOrganizational.html"><li>組織架構</li></a>';    
    temp += '				<a href="aboutChronicle.html"><li>台泥大事紀</li></a>';
    temp += '				<a href="aboutHumanRightsPolicy.html"><li>人權政策</li></a>';
    temp += '				<a href="aboutProduct.html"><li>我們的產品</li></a>';
    temp += '				<a href="aboutSupplier.html"><li>供應商專區</li></a>';
    temp += '				<a class="internalMenu" target="_blank" href="https://internal.taiwancement.com/internal/"><li>內部系統</li></a>';	
    temp += '			</ul>';
	temp += '		</li>';
	temp += '	</ul>';
	// temp += '	<ul>';
	// temp += '		<li>';
	// temp +=	'			<a href="circular1.html"><span>循環經濟</span></a>';
	// temp += '		</li>';
	// temp += '	</ul>';
	// temp += '	<ul>';
	// temp += '		<li>';
	// temp +=	'			<a href="green1.html"><span>綠能發展</span></a>';
	// temp += '		</li>';
    // temp += '	</ul>';
    temp += '	<ul>';
	temp += '		<li>';
	temp +=	'			<a target="_blank" href="https://www.tccdaka.com/"><span>台泥 DAKA</span></a>';
	temp += '		</li>';
    temp += '	</ul>';    
    temp += '	<ul>';
	temp += '		<li>';
	temp +=	'			<span>投資人專區</span>';
    temp += '			<ul>';
    temp += '               <li style="position:relative">';
    temp += '                   <span>財務資訊</span>';
    temp += '                   <ul>';
    temp += '				       <a href="investors1-1.html"><li>年報</li></a>';
    temp += '				       <a href="investors1-2.html"><li>每月營收報告</li></a>';
    temp += '				       <a href="investors1-3.html"><li>財務報表</li></a>';
    temp += '				       <a href="investors1-4.html"><li>財務行事曆</li></a>';
    temp += '				       <a href="investors1-5.html"><li>法說會報告</li></a>';
    temp += '				       <a href="investors1-6.html"><li>營運報告</li></a>';
    temp += '                   </ul>';
    temp += '               </li>';
    temp += '               <li style="position:relative">';
    temp += '                   <span>公司治理</span>';
    temp += '                   <ul>';
    temp += '				       <a href="investors2-1.html"><li>董事會</li></a>';
    temp += '				       <a href="investors2-2.html"><li>內部稽核</li></a>';
    temp += '				       <a href="investors2-3.html"><li>公司規章</li></a>';
    temp += '				       <a href="investors2-5.html"><li>公司治理情形</li></a>';
    temp += '				       <a href="investors2-4.html"><li>法律聲明</li></a>';
    temp += '                   </ul>';
    temp += '               </li>';
    temp += '               <li style="position:relative">';
    temp += '                   <span>股東專欄</span>';
    temp += '                   <ul>';
    temp += '				       <a href="investors3-1.html"><li>股價查詢</li></a>';
    temp += '				       <a href="investors3-2.html"><li>股東會</li></a>';
    temp += '				       <a href="investors3-3.html"><li>歷年股利分派</li></a>';
    temp += '				       <a href="investors3-4.html"><li>重大資訊公告</li></a>';
    temp += '				       <a href="investors3-5.html"><li>產業研究卷商</li></a>';
    temp += '				       <a href="investors3-6.html"><li>公開資訊觀測站</li></a>';
    temp += '				       <a href="investors3-7.html"><li>投資人服務</li></a>';
    temp += '                   </ul>';
    temp += '               </li>';
    temp += '				<a href="investors4.html"><li>問答集</li></a>';
	temp += '			</ul>';
	temp += '		</li>';
    temp += '	</ul>';
    temp += '	<ul>';
	temp += '		<li>';
    temp +=	'			<span>ESG</span>';
    temp +=	'			<ul>';
    temp += '               <li style="position:relative">';
    temp += '                   <div class="extendMenu">';
    temp += '                       <div class="mainTitle"><a href="esgIndex.html">ESG 績效與目標 |</a></div>';
    temp += '                       <div class="menuGroup">';
    temp += '                           <div class="cover"></div>';
    temp += '                           <div class="title"><a href="esgGhgCarbonEmissions.html">溫室氣體管理 |</a></div>';
    temp += '                           <a class="menu" href="esgGhgCarbonEmissions.html?anchor=1">碳排放</a>';
    temp += '                           <a class="menu" href="esgGhgCoProcessing.html?anchor=1">能源效率</a>';
    temp += '                           <a class="menu" href="esgGhgCoProcessing.html?anchor=2">再生能源</a>';
    temp += '                           <a class="menu" href="esgGhgCoProcessing.html?anchor=3">替代原燃料</a>';
    temp += '                       </div>';
    temp += '                       <div class="menuGroup">';
    temp += '                           <div class="cover"></div>';
    temp += '                           <div class="title"><a href="esgEnvironmentAirPollutant.html">環境 |</a></div>';
    temp += '                           <a class="menu" href="esgEnvironmentAirPollutant.html?anchor=1">空氣污染物</a>';
    temp += '                           <a class="menu" href="esgEnvironmentWasteAndWater.html?anchor=1">廢棄物/資源化再生</a>';
    temp += '                           <a class="menu" href="esgEnvironmentWasteAndWater.html?anchor=2">水</a>';
    temp += '                           <a class="menu" href="esgEnvironmentWasteAndWater.html?anchor=3">生物多樣性</a>';
    temp += '                       </div>';
    temp += '                       <div class="menuGroup">';
    temp += '                           <div class="cover"></div>';
    temp += '                           <div class="title"><a href="esgHealthAndSafety.html">安全 |</a></div>';
    temp += '                           <a class="menu" href="esgHealthAndSafety.html?anchor=1">工作環境管理</a>';
    temp += '                           <a class="menu" href="esgHealthAndSafety.html?anchor=2">職安績效與目標</a>';
    temp += '                       </div>';
    temp += '                       <div class="menuGroup">';
    temp += '                           <div class="cover"></div>';
    temp += '                           <div class="title"><a href="esgEmployeeStockAndSalary.html">員工 |</a></div>';
    temp += '                           <a class="menu" href="esgEmployeeStockAndSalary.html?anchor=1">股權計畫</a>';
    temp += '                           <a class="menu" href="esgEmployeeStockAndSalary.html?anchor=2">變動薪酬</a>';
    temp += '                           <a class="menu" href="esgEmployeeStockAndSalary.html?anchor=3">敬業度</a>';
    temp += '                           <a class="menu" href="esgEmployeeHumanRightsAndDiversified.html?anchor=1">人權</a>';
    temp += '                           <a class="menu" href="esgEmployeeHumanRightsAndDiversified.html?anchor=2">多元化</a>';    
    temp += '                       </div>';
    temp += '                       <div class="menuGroup">';
    temp += '                           <div class="cover"></div>';
    temp += '                           <div class="title"><a href="esgCorpGovernance.html">公司治理 |</a></div>';
    temp += '                           <a class="menu" href="esgCorpGovernance.html?anchor=1">董事會</a>';
    temp += '                           <a class="menu" href="esgCorpGovernance.html?anchor=2">風險管理</a>';
    temp += '                           <a class="menu" href="esgCorpGovernance.html?anchor=3">資訊安全</a>';
    temp += '                           <a class="menu" href="esgCorpGovernance.html?anchor=4">永續營建</a>';
    temp += '                           <a class="menu" href="esgCorpGovernance.html?anchor=5">供應商管理</a>';
    temp += '                       </div>';
    temp += '                       <div class="menuGroup">';
    temp += '                           <div class="cover"></div>';
    temp += '                           <div class="title"><a href="esgSocialEngagement.html">社會參與 |</a></div>';
    temp += '                           <a class="menu" href="esgSocialEngagement.html?anchor=1">社會參與政策</a>';
    temp += '                           <a class="menu" href="esgSocialEngagement.html?anchor=2">社會影響力</a>';
    temp += '                           <a class="menu" href="esgSocialEngagement.html?anchor=3">公益與慈善</a>';
    temp += '                           <a class="menu" href="esgSocialEngagement.html?anchor=4">永續公協會</a>';
    temp += '                       </div>';
    temp += '                   </div>';
    temp += '               </li>';
    temp +=	'			</ul>';
    temp += '		</li>';
    temp += '	</ul>';
	temp += '	<ul>';
	temp += '		<li>';
    temp +=	'			<span>企業永續發展</span>';
    temp += '			<ul>';
    temp += '		        <a href="csrIndex.html"><li>永續議題管理</li></a>';
    temp += '               <li style="position:relative">';
    temp += '                   <span>台泥永續實踐</span>';
    temp += '                   <ul>';
    temp += '				       <a href="csr0-1.html"><li>科學減碳</li></a>';
    temp += '				       <a href="csr0-2.html"><li>循環經濟</li></a>';
    temp += '				       <a href="csr0-3.html"><li>智慧生產</li></a>';
    temp += '				       <a href="csr0-4.html"><li>乾淨能源</li></a>';
    temp += '				       <a href="csr0-5.html"><li>開放工廠</li></a>';
    temp += '                   </ul>';
    temp += '               </li>';
    temp += '               <li style="position:relative">';
    temp += '                   <span>治理與風控</span>';
    temp += '                   <ul>';
    temp += '				       <a href="csr2-1.html"><li>全面風險控管</li></a>';
    temp += '				       <a href="csr2-2.html"><li>健全治理架構</li></a>';
    temp += '				       <a href="csr2-3.html"><li>優化客戶體驗</li></a>';
    temp += '				       <a href="csr2-4.html"><li>推動永續供應鏈</li></a>';
    temp += '                   </ul>';
    temp += '               </li>';
    temp += '               <li style="position:relative">';
    temp += '                   <span>社會與共融</span>';
    temp += '                   <ul>';
    temp += '				       <a href="csr3-1.html"><li>開展社會對話</li></a>';
    temp += '				       <a href="csr3-2.html"><li>宣揚品學教育</li></a>';
    temp += '				       <a href="csr3-3.html"><li>推動文化保種</li></a>';
    temp += '                      <a href="http://www.koo.org.tw"> <li>文化推廣 - 辜公亮文教基金會</li></a>';
    temp += '                      <a href="http://www.kbcc.org.tw"><li>植物的諾亞方舟 - 保種中心</li></a>';
	temp += '				       <a href="http://www.tcccare.org"><li>偏鄉助學 - 士敏學堂</li></a>';
    temp += '                   </ul>';
    temp += '               </li>';
    temp += '               <li style="position:relative">';
    temp += '                   <span>環境與低碳鏈</span>';
    temp += '                   <ul>';
    temp += '				       <a href="csr4-1.html"><li>深化碳管理</li></a>';
    temp += '				       <a href="csr4-2.html"><li>落實環境管理</li></a>';
    temp += '				       <a href="csr4-3.html"><li>循環經濟實踐</li></a>';
    temp += '                   </ul>';
    temp += '               </li>';
    temp += '               <li style="position:relative">';
    temp += '                   <span>生態與再生</span>';
    temp += '                   <ul>';
    temp += '				       <a href="csr5-1.html"><li>守護綠色環境</li></a>';
    temp += '				       <a href="csr5-2.html"><li>打造國際生態港</li></a>';
    temp += '				       <a href="csr5-3.html"><li>實踐保種紮根</li></a>';
    temp += '                   </ul>';
    temp += '               </li>';
    temp += '               <li style="position:relative">';
    temp += '                   <span>員工與福利</span>';
    temp += '                   <ul>';
    temp += '				       <a href="csr6-1.html"><li>培育永續人才</li></a>';
    temp += '				       <a href="csr6-2.html"><li>創造幸福職場</li></a>';
    temp += '				       <a href="csr6-3.html"><li>促進多元融合</li></a>';
    temp += '                   </ul>';
    temp += '               </li>';
    temp += '               <li style="position:relative">';
    temp += '                   <span>利害關係人溝通</span>';
    temp += '                   <ul>';
    temp += '				       <a href="csr1-1.html"><li>永續利害關係人</li></a>';
    temp += '				       <a href="csr1-2.html"><li>永續議題鑑別</li></a>';
    temp += '                   </ul>';
    temp += '               </li>';
    temp += '				<a href="csrAR.html"><li>AR 影音互動區</li></a>';
    temp += '				<li style="position:relative">';
    temp += '                   <span>報告書下載 / 認證</span>';
    temp += '				    <ul>';
    temp += '				        <a href="csrReport.html"><li>報告書下載</li></a>';
    temp += '				        <a target="_blank" href="report/csr/authenticate%20(SGS).pdf"><li>AA 1000</li></a>';
    temp += '				        <a target="_blank" href="report/csr/authenticate%20(DTTL).pdf"><li>ISAE 3000</li></a>';
    temp += '				    </ul>';
    temp += '				</li>';
    temp += '				<a href="csrQuest.html"><li>問卷調查</li></a>';
    temp += '           </ul>';
	temp += '		</li>';
	temp += '	</ul>';
	temp += '	<ul>';
	temp += '		<li>';
	temp +=	'			<span>人才招募</span>';
    temp += '			<ul>';
    temp += '				<a href="hr3.html"><li>加入台泥</li></a>';
    temp += '				<a target="_blank" href="https://recruit.taiwancement.com/"><li>線上預約面談</li></a>';
    temp += '				<a target="_blank" href="https://mamag.taiwancement.com/"><li>台灣 MA 計畫</li></a>';
    temp += '				<a href="hrChinaMA.html"><li>大陸飛鷹計畫</li></a>';
    temp += '				<a href="hr2.html"><li>薪酬福利</li></a>';
    temp += '				<a href="hr4.html"><li>員工安全與衛生</li></a>';
    temp += '				<a target="_blank" href="report/other/開放工廠.pdf""><li>開放工廠</li></a>';
	temp += '			</ul>';
	temp += '		</li>';
	temp += '	</ul>';
	temp += '	<ul>';
	temp += '		<li>';    
	temp +=	'			<span>最新消息</span>';
	temp += '			<ul>';
    temp += '               <a href="news.html"><li>新聞中心</li></a>';
    temp += '               <a target="_blank" href="projectHopingArchitectureCompetition.html"><li>和平開放工廠概念設計競賽</li></a>';
    temp += '               <a target="_blank" href="projectHopingDrawingCompetition.html"><li>兒童暨青少年繪畫比賽</li></a>';
	temp += '			</ul>';
	temp += '		</li>';    
	temp += '	</ul>';
    // temp += '	<ul>';
	// temp += '		<li>';
	// temp +=	'			<a class="hrPortalMenu" target="_blank" href="http://internal.taiwancement.com"><span>員工專區</span></a>';
	// temp += '		</li>';
	// temp += '	</ul>';
	temp += '</div>';
	
	temp += '<div class="phoneMenuField">';
    temp += '   <div class="hamburger" onclick="togglePhoneMenu()">';
    temp += '       <i class="hamburOpen  fas fa-bars"></i>';
    temp += '       <i class="hamburClose fas fa-times"></i>';
    temp += '   </div>';
    
    temp += '   <div id="phoneMenu">';
	temp += '      <div id="phoneAccordionMenu">';    
    temp += '           <h3>關於台泥</h3>';
    temp += '           <div>';
    temp += '               <a href="aboutHistory.html"><div>台泥歷史</div></a>';
    temp += '               <a href="aboutWordFromCompany.html"><div>經營者的話</div></a>';
    temp += '               <a href="aboutTccTalkArticleList.html"><div>TCC TALK</div></a>';
    temp += '               <a href="aboutManagementTeam.html"><div>經營團隊</div></a>';
    temp += '               <a href="aboutOperatingResults.html"><div>營運狀況</div></a>';
    temp += '               <a href="aboutOrganizational.html"><div>組織架構</div></a>';
    temp += '               <a href="aboutChronicle.html"><div>台泥大事紀</div></a>';
    temp += '				<a href="aboutHumanRightsPolicy.html"><div>人權政策</div></a>';
    temp += '               <a href="aboutProduct.html"><div>我們的產品</div></a>';
    temp += '               <a href="aboutSupplier.html"><div>供應商專區</div></a>';
    temp += '				<a class="internalMenu" target="_blank" href="https://internal.taiwancement.com/internal/"><div>內部系統</div></a>';
    temp += '           </div>'; 
    // temp += '           <h3 onclick="closeAccdordionExtend(this, \'_self\')" href="circular1.html">循環經濟</h3>';
    // temp += '           <div class="empty">';
    // temp += '           </div>';
    // temp += '           <h3 onclick="closeAccdordionExtend(this, \'_self\')" href="green1.html">綠能發展</h3>';
    // temp += '           <div class="empty">';
    // temp += '           </div>';
    temp += '           <h3 onclick="closeAccdordionExtend(this, \'_target\')" href="https://www.tccdaka.com/">台泥 DAKA</h3>';
    temp += '           <div class="empty">';
    temp += '           </div>';
    temp += '           <h3>投資人專區</h3>';
    temp += '           <div>';
    temp += '               <div class="subMenu">';
    temp += '                   <div class="title">財務資訊</div>';
    temp += '                   <a href="investors1-1.html"><div>年報</div></a>';
    temp += '                   <a href="investors1-2.html"><div>每月營收報告</div></a>';
    temp += '                   <a href="investors1-3.html"><div>財務報表</div></a>';
    temp += '                   <a href="investors1-4.html"><div>財務行事曆</div></a>';
    temp += '                   <a href="investors1-5.html"><div>法說會報告</div></a>';
    temp += '                   <a href="investors1-6.html"><div>營運報告</div></a>';
    temp += '                   <div class="clear"></div>';
    temp += '               </div>';    
    temp += '               <div class="subMenu">';
    temp += '                   <div class="title">公司治理</div>';
    temp += '                   <a href="investors2-1.html"><div>董事會</div></a>';
    temp += '                   <a href="investors2-2.html"><div>內部稽核</div></a>';
    temp += '                   <a href="investors2-3.html"><div>公司規章</div></a>';
    temp += '                   <a href="investors2-5.html"><div>公司治理情形</div></a>';
    temp += '                   <a href="investors2-4.html"><div>法律聲明</div></a>';
    temp += '                   <div class="clear"></div>';
    temp += '               </div>';    
    temp += '               <div class="subMenu">';
    temp += '                   <div class="title">股東專欄</div>';
    temp += '                   <a href="investors3-1.html"><div>股價查詢</div></a>';
    temp += '                   <a href="investors3-2.html"><div>股東會</div></a>';
    temp += '                   <a href="investors3-3.html"><div>歷年股利分派</div></a>';
    temp += '                   <a href="investors3-4.html"><div>重大資訊公告</div></a>';
    temp += '                   <a href="investors3-5.html"><div>產業研究卷商</div></a>';
    temp += '                   <a href="investors3-6.html"><div>公開資訊觀測站</div></a>';
    temp += '                   <a href="investors3-7.html"><div>投資人服務</div></a>';
    temp += '                   <div class="clear"></div>';
    temp += '               </div>';
    temp += '               <a href="investors4.html"><div>問答集</div></a>';
    temp += '           </div>';
    temp += '           <h3>ESG</h3>';
    temp += '           <div>';
    temp += '               <div class="subMenu">';
    temp += '                   <div class="title"><a href="esgIndex.html">ESG 績效與目標</a></div>';
    temp += '                   <div class="clear"></div>';
    temp += '               </div>';
    temp += '               <div class="subMenu">';
    temp += '                   <div class="title"><a href="esgGhgCarbonEmissions.html">溫室氣體管理</a></div>';
    temp += '                   <a href="esgGhgCarbonEmissions.html?anchor=1"><div>碳排放</div></a>';
    temp += '                   <a href="esgGhgCoProcessing.html?anchor=1"><div>能源效率</div></a>';
    temp += '                   <a href="esgGhgCoProcessing.html?anchor=2"><div>再生能源</div></a>';
    temp += '                   <a href="esgGhgCoProcessing.html?anchor=3"><div>替代原燃料</div></a>';
    temp += '                   <div class="clear"></div>';
    temp += '               </div>';    
    temp += '               <div class="subMenu">';
    temp += '                   <div class="title"><a href="esgEnvironmentAirPollutant.html">環境</a></div>';
    temp += '                   <a href="esgEnvironmentAirPollutant.html?anchor=1"><div>空氣污染物</div></a>';
    temp += '                   <a href="esgEnvironmentWasteAndWater.html?anchor=1"><div>廢棄物/資源再生</div></a>';
    temp += '                   <a href="esgEnvironmentWasteAndWater.html?anchor=2"><div>水</div></a>';
    temp += '                   <a href="esgEnvironmentWasteAndWater.html?anchor=3"><div>生物多樣性</div></a>';
    temp += '                   <div class="clear"></div>';
    temp += '               </div>';    
    temp += '               <div class="subMenu">';
    temp += '                   <div class="title"><a href="esgHealthAndSafety.html">安全</a></div>';
    temp += '                   <a href="esgHealthAndSafety.html?anchor=1"><div>工作環境管理</div></a>';
    temp += '                   <a href="esgHealthAndSafety.html?anchor=2"><div>職安績效與目標</div></a>';
    temp += '                   <div class="clear"></div>';
    temp += '               </div>';
    temp += '               <div class="subMenu">';
    temp += '                   <div class="title"><a href="esgEmployeeStockAndSalary.html">員工</a></div>';
    temp += '                   <a href="esgEmployeeStockAndSalary.html?anchor=1"><div>股權計畫</div></a>';
    temp += '                   <a href="esgEmployeeStockAndSalary.html?anchor=2"><div>變動薪酬</div></a>';
    temp += '                   <a href="esgEmployeeStockAndSalary.html?anchor=3"><div>敬業度</div></a>';
    temp += '                   <a href="esgEmployeeHumanRightsAndDiversified.html?anchor=1"><div>人權</div></a>';
    temp += '                   <a href="esgEmployeeHumanRightsAndDiversified.html?anchor=2"><div>多元化</div></a>';
    temp += '                   <div class="clear"></div>';
    temp += '               </div>';
    temp += '               <div class="subMenu">';
    temp += '                   <div class="title"><a href="esgCorpGovernance.html">公司治理</a></div>';
    temp += '                   <a href="esgCorpGovernance.html?anchor=1"><div>董事會</div></a>';
    temp += '                   <a href="esgCorpGovernance.html?anchor=2"><div>風險管理</div></a>';
    temp += '                   <a href="esgCorpGovernance.html?anchor=3"><div>資訊安全</div></a>';
    temp += '                   <a href="esgCorpGovernance.html?anchor=4"><div>永續營建</div></a>';
    temp += '                   <a href="esgCorpGovernance.html?anchor=5"><div>供應商管理</div></a>';
    temp += '                   <div class="clear"></div>';
    temp += '               </div>';
    temp += '               <div class="subMenu noBorder">';
    temp += '                   <div class="title"><a href="esgSocialEngagement.html">社會參與</a></div>';
    temp += '                   <a href="esgSocialEngagement.html?anchor=1"><div>社會參與政策</div></a>';
    temp += '                   <a href="esgSocialEngagement.html?anchor=2"><div>社會影響力</div></a>';
    temp += '                   <a href="esgSocialEngagement.html?anchor=3"><div>公益與慈善</div></a>';
    temp += '                   <a href="esgSocialEngagement.html?anchor=4"><div>永續公協會</div></a>';
    temp += '                   <div class="clear"></div>';
    temp += '               </div>';
    temp += '           </div>';
    temp += '           <h3>企業永續發展</h3>';
    temp += '           <div>';
    temp += '               <div class="subMenu">';
    temp += '                   <a href="csrIndex.html" style="float:none"><div class="title">永續議題管理</div></a>';
    temp += '                   <div class="clear"></div>';
    temp += '               </div>';
    temp += '               <div class="subMenu">';
    temp += '                   <div class="title">台泥永續實踐</div>';
    temp += '                   <a href="csr0-1.html"><div>科學減碳</div></a>';
    temp += '                   <a href="csr0-2.html"><div>循環經濟</div></a>';
    temp += '                   <a href="csr0-3.html"><div>智慧生產</div></a>';
    temp += '                   <a href="csr0-4.html"><div>乾淨能源</div></a>';
    temp += '                   <a href="csr0-5.html"><div>開放工廠</div></a>';
    temp += '                   <div class="clear"></div>';
    temp += '               </div>';
    temp += '               <div class="subMenu">';
    temp += '                   <div class="title">治理與風控</div>';
    temp += '                   <a href="csr2-1.html"><div>全面風險控管</div></a>';
    temp += '                   <a href="csr2-2.html"><div>健全治理架構</div></a>';
    temp += '                   <a href="csr2-3.html"><div>優化客戶體驗</div></a>';
    temp += '                   <a href="csr2-4.html"><div>推動永續供應鏈</div></a>';
    temp += '                   <div class="clear"></div>';
    temp += '               </div>';
    temp += '               <div class="subMenu">';
    temp += '                   <div class="title">社會與共融</div>';
    temp += '                   <a href="csr3-1.html"><div>開展社會對話</div></a>';
    temp += '                   <a href="csr3-2.html"><div>宣揚品學教育</div></a>';
    temp += '                   <a href="csr3-3.html"><div>推動文化保種</div></a>';
    temp += '                   <a href="http://www.koo.org.tw"><div>文化推廣 - 辜公亮文教基金會</div></a>';
    temp += '                   <a href="http://www.kbcc.org.tw"><div>植物的諾亞方舟 - 保種中心</div></a>';
    temp += '                   <a href="http://www.tcccare.org"><div>偏鄉助學 - 士敏學堂</div></a>';
    temp += '                   <div class="clear"></div>';
    temp += '               </div>';
    temp += '               <div class="subMenu">';
    temp += '                   <div class="title">環境與低碳鏈</div>';
    temp += '                   <a href="csr4-1.html"><div>深化碳管理</div></a>';
    temp += '                   <a href="csr4-2.html"><div>落實環境管理</div></a>';
    temp += '                   <a href="csr4-3.html"><div>循環經濟實踐</div></a>';
    temp += '                   <div class="clear"></div>';
    temp += '               </div>';
    temp += '               <div class="subMenu">';
    temp += '                   <div class="title">生態與再生</div>';
    temp += '                   <a href="csr5-1.html"><div>守護綠色環境</div></a>';
    temp += '                   <a href="csr5-2.html"><div>打造國際生態港</div></a>';
    temp += '                   <a href="csr5-3.html"><div>實踐保種紮根</div></a>';
    temp += '                   <div class="clear"></div>';
    temp += '               </div>';
    temp += '               <div class="subMenu">';
    temp += '                   <div class="title">員工與福利</div>';
    temp += '                   <a href="csr6-1.html"><div>培育永續人才</div></a>';
    temp += '                   <a href="csr6-2.html"><div>創造幸福職場</div></a>';
    temp += '                   <a href="csr6-3.html"><div>促進多元融合</div></a>';
    temp += '                   <div class="clear"></div>';
    temp += '               </div>';
    temp += '               <div class="subMenu">';
    temp += '                   <div class="title">利害關係人溝通</div>';
    temp += '                   <a href="csr1-1.html"><div>永續利害關係人</div></a>';
    temp += '                   <a href="csr1-2.html"><div>永續議題鑑別</div></a>';
    temp += '                   <div class="clear"></div>';
    temp += '               </div>';
    temp += '               <div class="subMenu">';
    temp += '                   <a href="csrAR.html" style="float:none"><div class="title">AR 影音互動區</div></a>';
    temp += '                   <div class="clear"></div>';
    temp += '               </div>';
    temp += '               <div class="subMenu">';
    temp += '                   <div class="title">檔案下載</div>';
    temp += '                   <a href="csrReport.html"><div>報告書下載</div></a>';
    temp += '                   <a target="_blank" href="report/csr/authenticate%20(SGS).pdf"><div>AA 1000</div></a>';
    temp += '                   <a target="_blank" href="report/csr/authenticate%20(DTTL).pdf"><div>ISAE 3000</div></a>';
    temp += '                   <div class="clear"></div>';
    temp += '               </div>';
    temp += '               <div class="subMenu noBorder">';
    temp += '				    <a href="csrQuest.html" style="float:none"><div class="title">問卷調查</div></a>';
    temp += '                   <div class="clear"></div>';
    temp += '               </div>';
    temp += '           </div>';
    temp += '           <h3>人才招募</h3>';
    temp += '           <div>';
    temp += '		        <a href="hr3.html"><div>加入台泥</div></a>';
    temp += '				<a target="_blank" href="https://recruit.taiwancement.com/"><div>線上預約面談</div></a>';
    temp += '				<a target="_blank" href="https://mamag.taiwancement.com/"><div>台灣 MA 計畫</div></a>';
    temp += '				<a href="hrChinaMA.html"><div>大陸飛鷹計畫</div></a>';
    temp += '		        <a href="hr2.html"><div>薪酬福利</div></a>';
    temp += '		        <a href="hr4.html"><div>員工安全與衛生</div></a>';
    temp += '		        <a target="_blank" href="report/other/開放工廠.pdf"><div>開放工廠</div></a>';
    temp += '           </div>';
    temp += '           <h3>最新消息</h3>';
    temp += '           <div>';
    temp += '               <a href="news.html"><div>新聞中心</div></a>';
    temp += '               <a target="_blank" href="projectHopingArchitectureCompetition.html"><div>和平開放工廠概念設計競賽</div></a>';
    temp += '               <a target="_blank" href="projectHopingDrawingCompetition.html"><div>兒童暨青少年繪畫比賽</div></a>';
    temp += '           </div>';
    temp += '           <h3 class="hrPortalMenu" onclick="closeAccdordionExtend(this, \'_blank\')" href="http://internal.taiwancement.com">員工專區</h3>';
    temp += '           <div class="empty">';
    temp += '           </div>';
	temp += '	     </div>';
    
    temp += '        <table id="phoneFn">';
    temp += '           <tr>';
    temp += '               <td colspan="3">';
    temp += '                   <input id="keywordMobi" type="text" placeholder="Search by Keywords" onkeypress="enterKeywordMobi(event)" onfocus="enterKeywordMobiFocus(\'.searchNoteMobi\')" onblur="enterKeywordMobiBlur(\'.searchNoteMobi\')"/>';
    temp += '                   <i class="fas fa-search searchBtn" onclick="clickKeywordMobi()"></i>';
    temp += '                   <div class="searchNoteMobi">若要完整字串比對，可於輸入字串前後加上雙引號。</div>';
    temp += '               </td>';
    temp += '           </tr>';
    if((navigator.language || navigator.browserLanguage).toLowerCase().indexOf("cn") == -1){
    temp += '           <tr>';
    temp += '               <td><a class="lang" alt="tw" lang="zh-Hant-TW" onclick="switchLang(this)">繁體</a></td>';
    temp += '               <td><a class="lang" alt="cn" lang="zh-Hans-CN" onclick="switchLang(this)">简体</a></td>';
    temp += '               <td><a class="lang" alt="en" lang="en"         onclick="switchLang(this)">Eng</a></td>';
    temp += '           </tr>';
    }
    temp += '           <tr>';
    temp += '               <td><a href="newsletter.html">訂閱電子報</a></td>';
    temp += '               <td><a href="contact.html">聯絡我們</a></td>';
    temp += '               <td></td>';
    temp += '           </tr>';
    temp += '           <tr>';
    temp += '               <td colspan="3">';
    temp += '                   <a target="_blank" href="https://zh-tw.facebook.com/%E5%8F%B0%E6%B3%A5%E4%BC%81%E6%A5%AD%E5%9C%98-1659728604312270"><i class="fab fa-facebook-square socialIcon"></i></a>';
    temp += '                   <a target="_blank" href="https://www.instagram.com/taiwan_cement/"><i class="fab fa-instagram-square socialIcon"></i></a>';
    temp += '                   <a target="_blank" href="https://www.youtube.com/channel/UCLQ_ByRXJcBkHIqLFaXoq3Q"><i class="fab fa-youtube socialIcon"></i></a>';
    temp += '                   <a target="_blank" href="http://weixin.qq.com/r/wDvz6_DEQr09raSI927S"><i class="fab fa-weixin socialIcon"></i></a>';
    temp += '                   <div class="clear"></div>';
    temp += '               </td>';
    temp += '           </tr>';
    temp += '       </table>';    
    temp +=	'   </div>';    
	temp +=	'</div>';
	
	temp += '<div class="clear"></div>';	
	return temp;
}

function getFooter(){
	var date = new Date();
	var temp = "";
	temp += '<div class="content">';
	temp += '	<div class="copyright">';
	temp += '		© ' + date.getFullYear() + ' <span> ALL RIGHTS RESERVED, TAIWAN CEMENT LTD.</span>';
    temp += '	    <div><a href="sitemap.html">SITE MAP</a></div>';
	temp += '	</div>';
	temp += '</div>';
	return temp;
}

function initHeadFoot(from){
    chkLang();    
    $("#header").html(getHeader());
    $("#footer").html(getFooter());
    
    $("#phoneAccordionMenu").accordion({
        collapsible: true,
        heightStyle: "content",
        create: function(event, ui) {
            chkInternalMenu();
        }
    });
    $("#phoneAccordionMenu h3:eq(0)").trigger("click");    
    adjPhoneMenuStyle();
    createGoogleCSE();
    
    setTimeout(function(){
        adjDesktopMenuOffset();
        chkInternalMenu();
    }, 100);
    
    if(from != "home")
        adjContainerHeight();
}

function createGoogleCSE() {

    if(location.href.indexOf("http://") >= 0 || location.href.indexOf("https://") >= 0) {
        $.getScript('https://cse.google.com/cse.js?cx=013667837666926698352:jy6swomwg5c', function() {
        });
        
        var changeOutline = setInterval(function(){
            $(".gsc-control-cse").css("padding", "0");
            $(".gsc-control-wrapper-cse").css("width", "170px");

            $(".gsc-search-box").css("margin", "0");
            $(".gsc-input").css("padding-right", "5px")
            $(".gsc-input-box").css("border", "none").css("border-bottom", "solid 1px #d0d0d0");
            $(".gsib_a").css("padding", "0");

            // $("#gsc-i-id1").attr("placeholder", "Search by Keyword");        
            // $("#gsc-i-id1").css("font-size", "14px");
            // $("#gsc-i-id1").css("background", "none");

            $(".gsst_a").css("padding", "0");
            $(".gsst_b").css("padding", "0");
            $(".gscb_a").css("display", "none");

            $(".gsc-search-button").css("margin", "0");
            $(".gsc-search-button").css("padding", "2px");
            $(".gsc-search-button").css("border", "none");
            $(".gsc-search-button").css("background", "none");
            $(".gsc-search-button").css("cursor", "pointer");
            $(".gsc-search-button svg").css("fill", "#c0c0c0");
        }, 100);
        //alert();

        // setTimeout(function(){
        //     clearInterval(changeOutline);
        // }, 60000);
    }
}

function adjDesktopMenuOffset() {
    var headerFieldWidth = 0;
    var offset = 0;
    
    headerFieldWidth = parseInt($("#headerField").css("width"));
    offset = Math.ceil($(".headerMenu > ul:eq(3)").offset().left);

    if(checkBrowser().indexOf("IE") >= 0) 
        offset += 1;

    $(".headerMenu > ul:eq(3) li ul").css("width", headerFieldWidth + "px").css("left", (-1)*offset + "px");
}

function createAccordionUI(id){
    $("#" + id).accordion({
        collapsible: true,
        heightStyle: "content"
    });
//    $("#" + id + " h3:eq(0)").trigger("click");
}

function adjPhoneMenuStyle(){
    $("#phoneAccordionMenu").css("text-align", "center").css("font-size", "20px");
    $("#phoneAccordionMenu h3").css("padding", "12px 0").css("outline", "none").css("color", "#505050");
    $("#phoneAccordionMenu h3:last").css("padding", "12px 0 25px");
}

function adjNewsMenuStyle(){
    $("#newsList h3").css("padding", "12px 0").css("outline", "none").css("color", "#505050");    
    $("#newsList h3 .ui-accordion-header-icon").css("display", "none");
    $("#newsList h3 .date").css("font-family", "arial").css("color", "#c00000");
    $("#newsList h3 .title").css("font-size", "20px");
}

function adjNewsContStyle(idx){
    $("#newsList .accordionCont:eq(" + idx + ") p").each(function(){
        if($(this).find("img").length == 0){
            $(this).css("margin-top", "20px").css("line-height", "1.5em");
        }
    });
}

function adjContainerHeight(){
    var bodyH = getDomHeight();
    var headerH = document.getElementById("headerField").offsetHeight;
    var footerH = document.getElementById("footerField").offsetHeight;
    var topicCoverH = 0;
    
    if(document.querySelector(".topicCover") != null)
        topicCoverH = document.querySelector(".topicCover").offsetHeight;

    if(headerH + footerH + topicCoverH < bodyH)
        document.getElementById("container").style.minHeight = bodyH - headerH - footerH - topicCoverH - 3 + "px";
}

var menuAni = false;
var phoneMenuExtend = false;
function togglePhoneMenu(){
    if(menuAni)
        return;
    
    menuAni = true;
    var headerH = $("#headerField").outerHeight(true);
    var phoneMenuH = parseInt($("#phoneMenu").css("height"));
    //var adjPhoneMenuH = (phoneMenuH > getDomHeight()-headerH) ? phoneMenuH : getDomHeight()-headerH; //原有
    var adjPhoneMenuH = (phoneMenuH > getDomHeight()-headerH) ? phoneMenuH-(phoneMenuH-getDomHeight()+headerH) : getDomHeight()-headerH; //為了CSR首頁fullpage
    
    if(isMobile.iOS())
       $("#phoneMenu").css("margin", "-6px 0 0");
    
    if("none" == $("#phoneMenu").css("display") || "" == $("#phoneMenu").css("display")){
        phoneMenuExtend = true;        
        $("#phoneMenu").css("height", "0").css("display", "inline-block");
        $("#phoneMenu").animate({height : (adjPhoneMenuH) + "px"}, 500, function(){
            $("body").css("background", "#f0f0f0");
            $("#container").css("display", "none");
            menuAni = false;            
        });
        $(".hamburOpen").addClass("hamburOpenAni").animate({opacity:0}, 300);
        $(".hamburClose").addClass("hamburOpenAni").animate({opacity:1}, 300);
    }else{        
        phoneMenuExtend = false;
        $("body").css("background", "#fff");
        $("#container").css("display", "block");
        $("#phoneMenu").animate({height : "0"}, 500, function(){
            $("#phoneMenu").css("display", "none").css("height", "auto");
            menuAni = false;
        });
        $(".hamburOpen").addClass("hamburCloseAni").animate({opacity:1}, 300);
        $(".hamburClose").addClass("hamburCloseAni").animate({opacity:0}, 300);
        
        setTimeout(function(){
            $(".hamburOpen").removeClass("hamburOpenAni").removeClass("hamburCloseAni");
            $(".hamburClose").removeClass("hamburOpenAni").removeClass("hamburCloseAni");
        }, 300);
    }
}

function toogleContainer(){
    if(getDomWidth() <= 1200 && phoneMenuExtend == true)
        document.getElementById("container").style.display = "none";
    else
        document.getElementById("container").style.display = "block";
}

function closeAccdordionExtend(obj, targetType){
    var url = obj.getAttribute("href");
    setTimeout(function(){
        $("#phoneAccordionMenu .empty").css("display", "none");
        if(url.indexOf("http") > -1)
            window.open(url, targetType);
        else
            location.href = url;
    }, 5);    
}

//function closeAccdordionExtend(url, targetType){
//    setTimeout(function(){
//        $("#phoneAccordionMenu .empty").css("display", "none");
//        if(url.indexOf("http") > -1)
//            window.open(url, targetType);
//        else
//            location.href = url;
//    }, 5);
//}

$(".goTop").click(function(){
    $("html, body").animate({scrollTop:0}, 1000);
});
            
$(".goBottom").click(function(){
    $("html, body").animate({scrollTop: parseInt($(document).height()) - getDomHeight()}, 1000);			
});

window.onresize = function(){
    if(getDomWidth() <= 1200 && phoneMenuExtend == true)
        document.getElementById("container").style.display = "none";
    else
        document.getElementById("container").style.display = "block";
    
    if(!isMobile.any()){        
        adjContainerHeight();
        adjDesktopMenuOffset();
    }
}

window.onload = function(){
    if(checkBrowser() == "IE6" || checkBrowser() == "IE7" || checkBrowser() == "IE8"){
        alert("您使用的瀏覽器為 " + checkBrowser() + "，請使用 IE9(含) 以上版本的瀏覽器");
    }
}
//------------------------------ UI Ctrl(end) ------------------------------//

//------------------------------ tools(start) ------------------------------//
function clickKeywordPC(){
	var txt = document.getElementById("keywordPC").value;
	window.location = "fullIndexSearch.html?keyword=" + encodeURI(txt);
}

function enterKeywordPC(e){
    if (e.keyCode == 13) {
		clickKeywordPC();
    }	
	return false;
}

function enterKeywordPCFocus(id){
    document.querySelector(id).style.display = "block";
}

function enterKeywordPCBlur(id){
    document.querySelector(id).style.display = "none";
}

function clickKeywordMobi(){
	var txt = document.getElementById("keywordMobi").value;
	window.location = "fullIndexSearch.html?keyword=" + encodeURI(txt);
}

function enterKeywordMobi(e){
    if (e.keyCode == 13) {
		clickKeywordMobi();
    }	
	return false;
}

function enterKeywordMobiFocus(id){
    document.querySelector(id).style.display = "block";
}

function enterKeywordMobiBlur(id){
    document.querySelector(id).style.display = "none";
}

function GetUrlString(str){
	var reg = new RegExp("(^|&)"+str+"=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);

	if(r!=null) 
		return(r[2]);
		
	return "";
}

function toThousands(num){
    var num = (num || 0).toString(), result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }
    return result;
}
//------------------------------ tools(end) ------------------------------//

//------------------------------ obj(start) ------------------------------//
function fadeShow(obj) {
    this.obj = obj;
    this.objOffsetTop = this.obj.offset().top;
    this.animated = false;    
    
    var _this = this;
    $(window).scroll(function(){
        if(!_this.animated) {
            if($(window).scrollTop() > _this.objOffsetTop - getDomHeight() + 100) {
                _this.animated = true;
                _this.obj.animate({opacity:1}, 500);                
            }
        }
    });
}

function sloganShow(obj) {
    this.obj = obj;
    this.objOffsetTop = this.obj.offset().top;
    this.animated = false;
    this.txt = this.obj.text().split("");    
    
    this.obj.html("");

    var _this = this;
    $.each(this.txt, function(k,v){
        _this.obj.append('<span class="aniTxt" style="opacity:0">' + v + '</span>');
    });
}

sloganShow.prototype.show = function(scrollTop) {
    var _this = this;
    if(!_this.animated) {
        if(scrollTop > _this.objOffsetTop - getDomHeight() + 100) {
            _this.animated = true;
            _this.obj.find(".aniTxt").each(function(i){
                
                setTimeout(function(){
                    _this.obj.find(".aniTxt:eq(" + i + ")").animate({opacity:1}, 500);
                }, i*250);
                
            });            
        }
    }
}

sloganShow.prototype.isAnimated = function(){
    return this.animated;
}

function runNumber(obj, endNum, runTime, addType) {
    var re = /,/g;
    
    this.obj = obj;
    this.startNum = parseFloat(this.obj.text().replace(re, ""));
    this.endNum = parseFloat(endNum.replace(re, ""));
    this.objOffsetTop = this.obj.offset().top;
    this.animated = false;
    this.add = (this.endNum - this.startNum) / (runTime*10);

    this.toThousands = function(num){
        var num = (num || 0).toString(), result = '';
        while (num.length > 3) {
            result = ',' + num.slice(-3) + result;
            num = num.slice(0, num.length - 3);
        }
        if (num) { result = num + result; }
        return result;
    }

    var run, _this = this, output = 0;
    clearInterval(run);

    $(window).scroll(function(){
        if(!_this.animated) {

            if($(window).scrollTop() > _this.objOffsetTop - getDomHeight() + 200) {
                _this.animated = true;

                run = setInterval(function(){
                    _this.obj.addClass("runNumColor");
                    _this.startNum = _this.startNum + _this.add;
                    output = _this.startNum;
                    output = (addType == "int") ? this.toThousands(Math.round(output)) : (Math.ceil(output*100)/100).toFixed(2);

                    if(_this.add > 0){
                        if(_this.startNum > _this.endNum){
                            clearInterval(run);
                            _this.obj.text(endNum);
//                            _this.obj.addClass("runNumZoomIn");
                        }else{
                            _this.obj.text(output);
                        }
                    }else{
                        if(_this.startNum < _this.endNum){
                            clearInterval(run);
                            _this.obj.text(endNum);
//                            _this.obj.addClass("runNumZoomIn");
                        }else{
                            _this.obj.text(output);
                        }
                    }
                }, 100);
            }
        }
    });
}
//------------------------------ obj(end) ------------------------------//

//------------------------------ chk Internal and HR Portal(start) ------------------------------//
function chkInternalMenu(){    
    var url = '';
    if(location.href.indexOf("http://") >= 0 || location.href.indexOf("https://") >= 0)
        url = '/tccweb-services/service/urlService/isPrivateIP'
    else
        url = 'http://www.taiwancement.com/tccweb-services/service/urlService/isPrivateIP'
    
    $.ajax({
            url: url
    }).done(function(data){
        console.log("clientIp : " + data.clientIp);
        console.log("isPrivateIp : " + data.isPrivateIp);
        
        if(!data.isPrivateIp){
            $(".internalMenu").remove();
            $(".hrPortalMenu").attr("href", "http://hrportal.taiwancement.com");
        }
    });
}
//------------------------------ chk Internal and HR Portal(end) ------------------------------//

//------------------------------ Full Index Search(start) ------------------------------//
function createFullIndexSearchDetail(id){
    var url = '';
    if(location.href.indexOf("http://") >= 0 || location.href.indexOf("https://") >= 0)
        url = '/tccweb-services/service/pubs/' + id + '?lang=C'
    else
        url = 'http://www.taiwancement.com/tccweb-services/service/pubs/' + id + '?lang=C'
        //url = 'http://192.168.203.50/tccweb-services/service/pubs/' + id + '?lang=C'
    
    $.ajax({
        url: url
    }).then(function(data){
        var html = '';
        if(data.id == undefined){
            html += '<br><br><br><center><h2>無資料</h2></center>';
        }else{
            html += '<div class="date">' + data.dataDateStr + '</div>';
            html += '<div class="title">' + data.title + '</div>';
            html += '<div class="contents">' + data.contents + '</div>';
        }
        $("#searchDetail").html(html);
    })
}
//------------------------------ Full Index Search(end) ------------------------------//

//------------------------------ news(start) ------------------------------//
//新的
function getNewsListURL(){
    if(location.href.indexOf("http://") >= 0 || location.href.indexOf("https://") >= 0)
        return '/tccweb-services/service/pubs/pubsInType/N?lang=C';
    else    
        return 'http://www.taiwancement.com/tccweb-services/service/pubs/pubsInType/N?lang=C';
        //return 'http://192.168.203.50/tccweb-services/service/pubs/pubsInType/N?lang=C';
}

function getNewsURL(id){
    if(location.href.indexOf("http://") >= 0 || location.href.indexOf("https://") >= 0)
        return '/tccweb-services/service/pubs/' + id + '?lang=C';
    else
        return 'http://www.taiwancement.com/tccweb-services/service/pubs/' + id + '?lang=C';
        //return 'http://192.168.203.50/tccweb-services/service/pubs/' + id + '?lang=C';
}

////舊的
//function getNewsListURLX(){
//    var date = new Date();    
//    var startYear = date.getFullYear() - 4;
//    var endYear = date.getFullYear();    
//    return 'http://www.taiwancement.com/tccweb-services/service/tccNewsService/listAllReleasedNews?fromYY=' + startYear + '&toYY=' + endYear + '&orderBy=0';
////    return 'http://192.168.203.50/tccweb-services/service/tccNewsService/listAllReleasedNews?fromYY=' + startYear + '&toYY=' + endYear + '&orderBy=0';
//}
//
//function getNewsURLX(){    
//    return 'http://www.taiwancement.com/tccweb-services/service/tccNewsService/findNewsById?newsId=';
////    return 'http://192.168.203.50/tccweb-services/service/tccNewsService/findNewsById?newsId=';
//}


// function createNewsList(objID){
//     $.ajax({
//         url: '' + getNewsListURL()
//     }).then(function(data){
//         var html = '';
//         $.each(data.list, function(i, elem){            
//             html += '<h3 objIdx=' + i + ' newsID=' + elem.id + '>';
//             html += '   <div class="date">' + elem.dataDateStr + '</div>';
//             html += '   <div class="title">' + elem.title + '</div>';
//             html += '</h3>';
//             html += '<div class="accordionCont">';
//             html += '   <br><center><img src="img/loading.svg"/></center><br>';
//             html += '</div>';

//             if(i == data.list.length - 1){
//                 $("#newsList").html(html);
//                 createAccordionUI(objID);
//                 adjNewsMenuStyle();
//                 getFirstNews();
//             }
//         });        
//     })
// }
//
// function getFirstNews(){
//     var newsID = $("#newsList h3:eq(0)").attr("newsID");
//
//     $.ajax({
//         url: '' + getNewsURL(newsID)
//     }).then(function(data){
//         $(".accordionCont:eq(0)").html(data.contents);
//         setTimeout(function(){
//             adjNewsContStyle(0);
//             bindNewsClick();
//         }, 200);
//     })
// }            
//
// function bindNewsClick(){
//     $("#newsList").on("click", "h3", function(){
//         var objIdx = $(this).attr("objIdx");
//         var newsID = $(this).attr("newsID");
//
//         $.ajax({
//             url: '' + getNewsURL(newsID)
//         }).then(function(data){
//             $(".accordionCont:eq(" + objIdx + ")").html(data.contents);
//             setTimeout(function(){
//                 adjNewsContStyle(objIdx);
//             }, 200);
//         })
//     });
// }
//------------------------------ news(end) ------------------------------//