function showDialogLoading() {
	$('#divDialogLoading').modal({
		  backdrop: 'static',
		  keyboard: false,
		  show: true
	});
}

function displayPage(pageId, pageContent) {
	$("#"+pageId).html(pageContent);
}

function showDialogHelp(helpPage) { 
	if(helpPage === "") {
		swal("MSG_CLASS_ACTION_FAIL", "ACTION FAIL", "No Help File yet on this module");
	}
	else {
		/*$('#divDialog').html("<embed height='100%' width='100%' src='./files/help/" + helpPage + "' type='video/mp4'>").dialog({*/
		$('#divDialog').html("<embed height='100%' width='100%' src='" + helpPage + "' type='video/mp4'>").dialog({
			height: 600,
			width: 1000,
			modal: true
		});
	}
}       

function openLink(linkCode) {
	document.getElementById("txtSelectedLink").value = linkCode;
	document.getElementById("frmMain").action = "Web";
	document.getElementById("frmMain").enctype="application/x-www-form-urlencoded";
	document.getElementById("frmMain").encoding="application/x-www-form-urlencoded";
	document.getElementById("frmMain").submit();
}


function recordAction(recordId, linkCode) {
	document.getElementById("txtSelectedRecord").value = recordId;
	openLink(linkCode);
}

function toggleDisplay(ele) {
	var srcElement = document.getElementById(ele);
	if(srcElement!=null){
		if(srcElement.style.display == "none") {
			srcElement.style.display="block";
		}
		else {
			srcElement.style.display="none";
		}
	}
	return false;
}


function toggleEnable(ele){
	var srcElement = document.getElementById(ele);
	if(srcElement!=null){
		//srcElement.value = "";
		if(srcElement.disabled == true) {
			srcElement.disabled=false;
			//srcElement.focus();
		}
		else {
			srcElement.disabled=true;
		}
	}
	return false;
}

function hideFormElement(elementId) {
	document.getElementById(elementId).style.display = "none";
}

function showFormElement(elementId) {
	document.getElementById(elementId).style.display = "";
}

function setElementVal(elementId, val) {
	document.getElementById(elementId).value = val;
}

function setElementInnerHTML(elementId, val) {
	document.getElementById(elementId).innerHTML = val;
}

function setTd(rowIdStart, colIdStart, rowIdEnd, colIdEnd, label, borderStyle, backgroundStyle) {
	//deleting table cells ready for span
	for(row=rowIdStart; row<=rowIdEnd; row++) {
		rowStr = "row" + row;
		for(i=colIdStart+1;i<colIdEnd+1; i++) {
			document.getElementById(rowStr).deleteCell(i+1);
		}
	}

	//ploting of schedule
	rowColLabelStr = "";
	for(row=rowIdStart; row<=rowIdEnd; row++) {
		rowStr = "row" + row;
		rowColStr = row + "-" + colIdStart;
		document.getElementById(rowColStr).colSpan = (colIdEnd - colIdStart) + 1;
		if(row == rowIdStart) {
			document.getElementById(rowColStr).style.borderTop = borderStyle;
			document.getElementById(rowColStr).style.background = backgroundStyle;
			if(row == rowIdEnd) {
				document.getElementById(rowColStr).style.borderBottom = borderStyle;
				document.getElementById(rowColStr).style.background = backgroundStyle;
			}
			else {
				document.getElementById(rowColStr).style.borderBottom = "none";
			}
		}
		else if(row == rowIdEnd) {
			document.getElementById(rowColStr).style.borderBottom = borderStyle;
			document.getElementById(rowColStr).style.background = backgroundStyle;
			if(row != rowIdStart) {
				document.getElementById(rowColStr).style.borderTop = "none";
			}
		}
		else {
			document.getElementById(rowColStr).style.borderTop = "none";
			document.getElementById(rowColStr).style.borderBottom = "none";
		}
		document.getElementById(rowColStr).style.borderLeft = borderStyle;
		document.getElementById(rowColStr).style.borderRight = borderStyle;
		document.getElementById(rowColStr).style.background = backgroundStyle;
		
		rowLabel = 0;
		if(rowIdEnd == rowIdStart || (rowIdEnd -1) == rowIdStart) {
			rowLabel = rowIdStart;
		}
		else {
			rowLabel = rowIdStart + Math.floor(((rowIdEnd + 1) - rowIdStart) / 2 );
		}
		rowColLabelStr = rowLabel + "-" + colIdStart;
		document.getElementById(rowColStr).innerHTML = "";
	}
	document.getElementById(rowColLabelStr).innerHTML = label;
	document.getElementById(rowColLabelStr).style.textAlign="center";
	document.getElementById(rowColLabelStr).style.fontWeight = "900";
}

function removeOptions(selectbox, header, headerValue) {
	for(var i=selectbox.options.length-1; i>=0; i--) {
		selectbox.remove(0);
	}
	if(header != "") {
		var opt = document.createElement("option");
		opt.value = headerValue;
		opt.text = header;
		selectbox.appendChild(opt);
	}
}

function toggleCheckListByPrefixId(chkParent) {
	var element= document.getElementsByTagName("input");
    for (var i =0; i < element.length; i++){
        if (element[i].type == 'checkbox') {
        	if(element[i].id.includes(chkParent.id)) {
        		if(chkParent.checked) {
        			element[i].checked = true;
        		}
        		else {
        			element[i].checked = false;
        		}
        	}
        }
    } 
}

function toggleCheckParent(chkParent, chkChildrenCount) {
	var checkCount = 0;
	for (var i =0; i < chkChildrenCount; i++){
		var chkStr = chkParent + i;
		if(document.getElementById(chkStr).checked) {
			checkCount++;
		}
    } 
	if(checkCount == chkChildrenCount) {
		document.getElementById(chkParent).checked = true;
	}
	else {
		if(checkCount == 0) {
			document.getElementById(chkParent).checked = false;
		}
	}
}

function getPosX(obj) {
	var curleft = 0;
	if(obj.offsetParent) {
		while(1) {
			curleft += obj.offsetLeft;
			if(!obj.offsetParent)
				break;
			obj = obj.offsetParent;
	    }
	} 
	else if(obj.x) {
		curleft += obj.x;
	}
	obj.style.position = "static";

	return curleft;
}

function getPosY(obj) {
	var curtop = 0;
	if(obj.offsetParent) {
	    while(1) {
	    	curtop += obj.offsetTop;
	    	if(!obj.offsetParent)
	    		break;
	    	obj = obj.offsetParent;
	    }
	} 
	else if(obj.y) {
		curtop += obj.y;
	}
	return curtop;
}

function getCurrentCursorPosition(e) {
	var posX =0, posY = 0;
	if( !e ) { e = window.event; } if( !e || ( typeof( e.pageX ) != 'number' && typeof( e.clientX ) != 'number' ) ) { posX = 0; posY = 0; }
	if( typeof( e.pageX ) == 'number' ) { posX = e.pageX; posY = e.pageY; } else {
		var posX = e.clientX; var posY = e.clientY;
		if( !( ( window.navigator.userAgent.indexOf( 'Opera' ) + 1 ) || ( window.ScriptEngine && ScriptEngine().indexOf( 'InScript' ) + 1 ) || window.navigator.vendor == 'KDE' ) ) {
			if( document.documentElement && ( document.documentElement.scrollTop || document.documentElement.scrollLeft ) ) {
				posX += document.documentElement.scrollLeft; posY += document.documentElement.scrollTop;
			} 
			else if( document.body && ( document.body.scrollTop || document.body.scrollLeft ) ) {
				posX += document.body.scrollLeft; posY += document.body.scrollTop;
			}
		}
	}
	return [posX, posY];
}

function getStyle(oElm, strCssRule){
	var strValue = "";
	if(document.defaultView && document.defaultView.getComputedStyle){
		strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
	}
	else if(oElm.currentStyle){
		strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
			return p1.toUpperCase();
		});
		strValue = oElm.currentStyle[strCssRule];
	}
	return strValue;
}

function numbersonly(myField, e, dec, maxChar) {
	if(isWithinLength) {
		var key;
		var keychar;
		
		if (window.event)
			key = window.event.keyCode;
		else if (e)
			key = e.which;
		else
			return true;
			keychar = String.fromCharCode(key);
			//control keys
			if ((key==null) || (key==0) || (key==8) || (key==9) || (key==13) || (key==27) )
				return true;
			// numbers
			else if ((("-0123456789").indexOf(keychar) > -1) && myField.value.length<maxChar)
			   return true;
			// decimal point jump
			else if (dec && (keychar == ".")) {
				myField.form.elements[dec].focus();
			   return false;
			}
			else
			   return false;
	}
	else {
		return false;
	}
}

/*function integeronly(e) {
	var key;
	var keychar;
	
	if (window.event)
		key = window.event.keyCode;
	else if (e)
		key = e.which;
	else
		return true;
		keychar = String.fromCharCode(key);
		//control keys
		if ((key==null) || (key==0) || (key==8) || (key==9) || (key==13) || (key==27) )
			return true;
		//numbers
		else if ((("0123456789").indexOf(keychar) > -1))
		   return true;
		//decimal point jump
		else
		   return false;
}*/

function getTimeByAddedMinutes(timeStr, minute) {
	var d1 = new Date(); 
	d1.setHours(timeStr.split(":")[0], timeStr.split(":")[1], 0, 0);

	var d2 = new Date();
	d2.setTime(d1.getTime() + (minute * 60 * 1000));

	var newTime = "";
	var hour = d2.getHours();
	var minute = d2.getMinutes();
	if(d2.getHours()<10) {
		hour = "0" + d2.getHours();
	}
	
	if(d2.getMinutes()<10) {
		minute = "0" + d2.getMinutes();
	}
	
	newTime = newTime.concat(hour, ":", minute);
	return newTime;
}

function integeronly(myField, e, maxChar) {
	var key;
	var keychar;
	
	if (window.event)
		key = window.event.keyCode;
	else if (e)
		key = e.which;
	else
		return true;
		keychar = String.fromCharCode(key);
		//control keys
		if ((key==null) || (key==0) || (key==8) || (key==9) || (key==13) || (key==27) )
			return true;
		//numbers
		else if ((("0123456789").indexOf(keychar) > -1) && myField.value.length<maxChar)
		   return true;
		//decimal point jump
		else
		   return false;
}

function lettersonly(e) {
	var key;
	var keychar;
	
	if (window.event)
		key = window.event.keyCode;
	else if (e)
		key = e.which;
	else
		return true;
		keychar = String.fromCharCode(key);
		//control keys
		if ((key==null) || (key==0) || (key==8) || (key==9) || (key==13) || (key==27) )
			return true;
		//letters
		else if ((("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ").indexOf(keychar) > -1))
		   return true;
		else
		   return false;
}

function isWithinLength(myField, e, maxChar) {
	var key;
	var keychar;
	
	if (window.event)
		key = window.event.keyCode;
	else if (e)
		key = e.which;
	else
		return true;
		keychar = String.fromCharCode(key);
		//control keys
		if ((key==null) || (key==0) || (key==8) || (key==9) || (key==13) || (key==27) )
			return true;
		//letters
		if(myField.value.length<maxChar) {
			return true;
		}
		else {
			return false;
		}
}

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}

String.prototype.ltrim = function() {
	return this.replace(/^\s+/,"");
}

String.prototype.rtrim = function() {
	return this.replace(/\s+$/,"");
}

function searchRecord(linkCode) {
	openLink(linkCode);
	if(document.getElementById("txtSearchValue") != null) {
		document.getElementById("txtSearchValue").focus(); 
	}
}


function getFileExtension(filename) {
  var ext = /^.+\.([^.]+)$/.exec(filename);
  return ext == null ? "" : ext[1];
}

function isFileExtensionExist(filename, fileExtensionList) {
	if(fileExtensionList === '') {
		return true;
	}
	else {
		var ext = getFileExtension(filename);
		for(i=0; i<fileExtensionList.length; i++) {
		   if(fileExtensionList[i].toUpperCase() == ext.toUpperCase()) {
			   return true;
		   }
		}
		return false;
	}
}

//select element content and copy to clipboard
function selectElementContents(elementId) {
	el = document.getElementById(elementId);
    var body = document.body, range, sel;
    if (document.createRange && window.getSelection) {
        range = document.createRange();
        sel = window.getSelection();
        sel.removeAllRanges();
        try {
            range.selectNodeContents(el);
            sel.addRange(range);
        } catch (e) {
            range.selectNode(el);
            sel.addRange(range);
        }
        document.execCommand("copy");

    } else if (body.createTextRange) {
        range = body.createTextRange();
        range.moveToElementText(el);
        range.select();
        range.execCommand("Copy");
    }
}

//Printing
function printContent(printableElementId, title) {
	var contentStr = document.getElementById(printableElementId).innerHTML;
	newwin=window.open('', '_blank', 'toolbar=0,location=0,menubar=0');
	newwin.document.write('<HTML>\n<HEAD>\n');
	newwin.document.write('<TITLE>Ready to Print - ' + title + '</TITLE>\n');
	newwin.document.write('</HEAD>\n');
	newwin.document.write('<BODY>\n');
	newwin.document.write("<font face='Courier New'>\n");
	newwin.document.write(contentStr);
	newwin.document.write("</font>\n");
	newwin.document.write('</BODY>\n');
	newwin.document.write('</HTML>\n');
	
	newwin.print();
	setTimeout(function(){newwin.close();}, 1);
}

function printPreview(elementId, title){
	var contentStr=document.getElementById(elementId).innerHTML;
	newwin=window.open('','printwin');
	newwin.document.write('<HTML>\n<HEAD>\n');
	newwin.document.write("<meta charset='utf-8'>");
	newwin.document.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
	newwin.document.write("<meta http-equiv='X-UA-Compatible' content='IE=edge'>");		
	newwin.document.write("<link href='/static/inspinia/tp-icons/style.css' rel='stylesheet' />");	
	newwin.document.write("<link href='/static/inspinia/css/custom.css' rel='stylesheet'>");
	newwin.document.write("<link href='/static/inspinia/css/bootstrap.min.css' rel='stylesheet'>");
	newwin.document.write("<link href='/static/inspinia/font-awesome/css/font-awesome.css' rel='stylesheet'>");
	newwin.document.write("<link href='/static/inspinia/css/animate.css' rel='stylesheet'>");
	newwin.document.write("<link href='/static/inspinia/css/style.css' rel='stylesheet'>");
	newwin.document.write("<link href='/static/inspinia/footer/css/Footer-with-button-logo.css' rel='stylesheet'>");
	newwin.document.write("<script src='common/common.js'></script>");
	newwin.document.write("<script src='/static/inspinia/js/jquery-3.1.1.min.js'></script>");
	newwin.document.write("<script src='/static/inspinia/js/bootstrap.min.js'></script>");
	newwin.document.write("<script src='/static/inspinia/js/inspinia.js'></script>");
	newwin.document.write("<script src='/static/inspinia/js/plugins/pace/pace.min.js'></script>");
	newwin.document.write('<TITLE>Ready to Print - ' + title + '</TITLE>\n');
	newwin.document.write('</HEAD>\n');
	newwin.document.write('<BODY onload="window.print();">\n');
	newwin.document.write(contentStr);
	newwin.document.write('</BODY>\n');
	newwin.document.write('</HTML>\n');
	newwin.document.close();
}

// Quick and simple export target #table_id into a csv
function downloadTableAsCSV(table_id, filename) {
	separator = ',';
    // Select rows from table_id
    var rows = document.querySelectorAll('table#' + table_id + ' tr');
    // Construct csv
    var csv = [];
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll('td, th');
        for (var j = 0; j < cols.length; j++) {
            // Clean innertext to remove multiple spaces and jumpline (break csv)
            var data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ')
            // Escape double-quote with double-double-quote (see https://stackoverflow.com/questions/17808511/properly-escape-a-double-quote-in-csv)
            data = data.replace(/"/g, '""');
            // Push escaped string
            row.push('"' + data + '"');
        }
        csv.push(row.join(separator));
    }
    var csv_string = csv.join('\n');
    // Download it
    var link = document.createElement('a');
    link.style.display = 'none';
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string));
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function refreshAt(hours, minutes, seconds) {
    var now = new Date();
    var then = new Date();

    if(now.getHours() > hours ||
       (now.getHours() == hours && now.getMinutes() > minutes) ||
        now.getHours() == hours && now.getMinutes() == minutes && now.getSeconds() >= seconds) {
        then.setDate(now.getDate() + 1);
    }
    then.setHours(hours);
    then.setMinutes(minutes);
    then.setSeconds(seconds);

    var timeout = (then.getTime() - now.getTime());
    setTimeout(function() { window.location.reload(true); }, timeout);
}

function stopVideo() {
	const video = document.querySelector('#video');
	// A video's MediaStream object is available through its srcObject attribute
	const mediaStream = video.srcObject;
	// Through the MediaStream, you can get the MediaStreamTracks with getTracks():
	const tracks = mediaStream.getTracks();
	// Tracks are returned as an array, so if you know you only have one, you can stop it with: 
	tracks[0].stop();
	// Or stop all like so:
	//tracks.forEach(track => track.stop());
}

function startVideo() {
	var video = document.querySelector('#video');
	if(navigator.mediaDevices.getUserMedia) {       
		navigator.mediaDevices.getUserMedia({video: true}).then(
		function(stream) {
			video.srcObject = stream;
		}).catch(function(err0r) {
			console.log('Something went wrong!');
		});
	}
}