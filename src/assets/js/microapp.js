/**
 * A boilerplate microapp for ayoba that implements a stub interface and debug logging on the page
 */
var debug = false;
var ready = false;
var context;
var appcontext
var globalUserName = "";
var latUser = "";
var lonUser = "";
var avatarUser = "";
// This is the magic line that pushes error event to the magic console
window.onerror = function(msg, url, line, col, error) { console.log(msg, url, line, col, error); };
console.log("Starting...");
var Ayoba = getAyoba();
// Let's wait for the page to load before doing anything
window.onload = function afterpagedLoad() {
  context = getURLParameter("context");
  debug = ("true" === getURLParameter("debug"));
  if (debug) {
    console.log("Debug mode: " + debug);
    document.getElementById("log-container").hidden = false;
    console.log("Hosted at: " + window.location.href);
  }
  if (Ayoba === null || Ayoba === 'unknown') {
    console.log("Looks like we're not inside ayoba, stubbinng the situation...");
    /*Ayoba = new AyobaStub();
    Ayoba.triggerAvatarChanged();
    Ayoba.triggerLocationChanged();
    Ayoba.triggerNicknameChanged();*/
  } else {
    console.log("Looks like we're in ayoba...");
  }
  console.log("List of methods available:");
  /*Object.getOwnPropertyNames(Ayoba).forEach((value) => {
      console.log(value);
  })*/
  //console.log(Object.getOwnPropertyNames(Ayoba));
  /*const copyButton = document.getElementById("btn_copy");
  copyButton.addEventListener('click', () => {
      copyMessage("logger");
  });
  console.log("Now let's wait till the presence is updated...");*/
};

/**
 * Checks if the microapp is running inside ayoba and on which OS
 * returns the OS name or null if not running inside ayoba
 */
function getAyoba() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return null;
  }

  if (/android/i.test(userAgent)) {
    try {
      return Android;
    } catch (error) {
      return null;
    }
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return null; // todo
  }

  return "unknown";
}

/**
 * This function is called when the microapp is loaded and ready to be used
 */
function start() {

  if (!Ayoba) {
    return;
  }
  //Now that presence is updated and Ayoba is initialised, let's try calling a few functions
  ready = true;
  console.log("Let's try calling available methods..")
  if (Object.getOwnPropertyNames(Ayoba).includes("getSelfJid")) {
    console.log("Calling getSelfJid()...");
    console.log("JID: " + getSelfJid());
  }
  if (Object.getOwnPropertyNames(Ayoba).includes("getMsisdn")) {
    console.log("Calling getMsisdn()...");
    console.log("MSISDN: " + getMsisdn());
    //alert("MSISDN: " + getMsisdn());
  }
  if (Object.getOwnPropertyNames(Ayoba).includes("getCountry")) {
    console.log("Country: " + getCountry());
  }
  if (Object.getOwnPropertyNames(Ayoba).includes("getLanguage")) {
    console.log("Language: " + getLanguage());
  }
}

/**
 * This function is called to close the microapp
 */
function finish() {
  console.log(Ayoba.finish());
}

function sendMessage() {
  Ayoba.sendMessage(document.getElementById("inputText").value);
}

function composeMessage() {
  Ayoba.composeMessage(document.getElementById("inputText").value);
}

function copyMessage(theIndex) {
  var strInputCode = document.getElementById(theIndex).innerHTML;
  var cleanText = strInputCode.replace(/<\/?[^>]+(>|$)/g, "\n");
  const el = document.createElement('textarea');
  el.value = cleanText;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

function sendMedia() {
  Ayoba.sendMedia('https://i.ytimg.com/vi/d5PP4vIX7P8/maxresdefault.jpg', 'image/jpg');
}

function sendLocation() {
  Ayoba.sendLocation(document.getElementById("inputTextLat").value, document.getElementById("inputTextLon").value);
}

function getCountry() {
  // var country = Ayoba.getCountry();
  //document.getElementById("countryText").textContent = country
  return Ayoba.getCountry()
}

function getMsisdn() {
  if (!Ayoba || Ayoba === 'unknown') {
    return null;
  }
  //var msisdn = Ayoba.getMsisdn();
  //document.getElementById("ayoba").textContent = msisdn
  return Ayoba.getMsisdn();
}

function getSelfJid() {
  if (!Ayoba || Ayoba === 'unknown') {
    return null;
  }
  //var jid = Ayoba.getSelfJid();
  //document.getElementById("selfjidText").textContent = jid
  return Ayoba.getSelfJid();
}

function getCanSendMessage() {
  //var canSendMessage = Ayoba.getCanSendMessage();
  //document.getElementById("cansendText").textContent = canSendMessage
  return Ayoba.getCanSendMessage();
}

function sendMessage(message) {
  Ayoba.sendMessage(message)
}

function getLanguage() {

  if (!Ayoba || Ayoba === 'unknown') {
    return null;
  }
  /*var language = Ayoba.getLanguage();
  document.getElementById("languageText").textContent = language*/
  return Ayoba.getLanguage();
}

function getURLParameter(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == sParam) {
      return sParameterName[1];
    }
  }
}

function getSelfJidFromUrl() {
  /*var selfJid = getURLParameter("jid")
  document.getElementById("selfjidText").textContent = selfJid*/
  return getURLParameter("jid")
}

/*
 * The Ayoba native interface calls this method every time
 * the app receives a new location event.
 *
 * Remember this listener will only be called when the native
 * permission is accepted by the user.
 *
 * In some border cases, also can receive lat=0.0, lon=0.0. Most of
 * cases, will mean Ayoba cannot retrieve the GPS coordinates.
 */
function onLocationChanged(lat, lon) {
  // document.getElementById("locationInputText").textContent = lat + ", " + lon;
  console.log("Event: location changed, lat: " + lat + ", lon: " + lon);

  latUser = lat;
  lonUser = lon
}

/*
 * The Ayoba native interface calls this method every time
 * the user profile changes (nickname or avatar)
 */
function onProfileChanged(nickname, avatarPath) {
  /*document.getElementById("nicknameInputText").textContent = nickname
  document.getElementById("avatarImage").src = avatarPath*/
  console.log("Event: profile changed, nickname: " + nickname + ", avatar path: " + avatarPath);
}

/*
 * The Ayoba native interface calls this method every time
 * the user nickname changes (infact, always online)
 */
function onNicknameChanged(nickname) {
  globalUserName = nickname;
  //localStorage.setItem("globalUserName", nickname);
  //Only call start the 1st time the app is loaded
  if (!ready) {
    start();
  }
}

/*
 * The Ayoba native interface calls this method every time
 * the user presence changes (infact, always online)
 */
function onPresenceChanged(presence) {
  //document.getElementById("presenceInputText").textContent = presence
  console.log("Event: presence changed: " + presence);
}

/*
 * The Ayoba native interface calls this method every time
 * the user avatar changes (infact, always online)
 */
function onAvatarChanged(avatar) {
  //document.getElementById("avatarImage").src = avatar

  avatarUser = avatar;
  console.log("Event: avatar changed: " + avatar);
}

/*
 * This method should be implemented to retrieve the "sendMedia(...)" result
 *
 * @param {int} responseCode: result code
 *  0: the location could not be sent
 *  1: the location has been sent successfully
 * @param encodedUrl: Base64 encoded media file’s url
 */
function onMediaSentResponse(responseCode, encodedUrl) {
  //document.getElementById("inputText").value = responseCode + " - " + encodedUrl;
  console.log("Event: media sent, response code: " + responseCode + " URL: " + encodedUrl);
}

/*
 * This method should be implemented to retrieve the "sendLocation(...)" result
 *
 * @param {int} responseCode: result code
 *  0: the location could not be sent
 *  1: the location has been sent successfully
 */
function onLocationSentResponse(responseCode) {
  //document.getElementById("inputText").value = responseCode
}

function getContactJid() {
  //var contactJid = getURLParameter("contactjid")
  //document.getElementById("inputText").value = contactJid
  return getURLParameter("contactjid")
}

function getContactName() {
  // var contactName = getURLParameter("contactname")
  //document.getElementById("inputText").value = contactName
  return getURLParameter("contactname")
}

function getContacts() {
  //var contactsJson = Ayoba.getContacts();
  //document.getElementById("inputText").value = contactsJson
  return Ayoba.getContacts();
}

function takePicture() {
  //var responseCode = Ayoba.takePicture();
  return Ayoba.takePicture();
}

/*
 * This method should be implemented to retrieve the "sendPicture(...)" result
 *
 * @param {int} responseCode: result code
 *  0: the picture could not be taken
 *  1: the picture has been taken successfully
 */
function onPictureRetrievedResponse(responseCode, picturePath) {
  //document.getElementById("inputText").value = responseCode
  //document.getElementById("pictureRetrieved").src = picturePath
}

/*
 * Starts a conversation with a user using his JID
 */
function startConversation(jid) {
  Ayoba.startConversation(jid);
}

function getFile() {
  //var responseCode = Ayoba.getFile();
  return Ayoba.getFile();
}




/*
 * This method should be implemented to retrieve the "sendFileRetrievedResponse(...)" result
 *
 * @param {int} responseCode: result code
 *  -1: the file could not be retrieved
 *  1: the file has retrieved successfully
 * @param {String} filePath: user selected files paths array
 */
function onFileRetrievedResponse(responseCode, filePath) {

  //document.getElementById("inputText").value = responseCode.concat(" - ").concat(filePath)
  //document.getElementById("pictureRetrieved").src = filePath
}
