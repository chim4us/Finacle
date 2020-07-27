<!--	This is getting executing on click of submit and validate button -->
var navButs= ["first","sec","third","fourth","fifth"];
var addClick = 0;
var acctCheck = "";
var eTableRecords = {};
var cifIdSelected = "";
var deDupClicked = "";
var DDNums = [];
var rmksAl = [];
var crncyArr = [];
var loaded = 0;
var objForm = document.forms[0];
var addCrncyCodeClicked = 0;

function fnValidateData() {
			//if ((document.getElementById("corpsearchYes").checked == false) && (document.getElementById("corpsearchNo").checked == false)){
			//alert("Corporate Search flag should be selected");
			//document.getElementById("corpsearchYes").focus();
			//return false;
			//}
			if ((document.getElementById("addrsearchYes").checked == false) && (document.getElementById("addrsearchNo").checked == false)){
			alert("Address Search flag should be selected");
			document.getElementById("addrsearchYes").focus();
			return false;
			}
			if ((document.getElementById("custExstYes").checked == false) && (document.getElementById("custExstNo").checked == false)){
				//document.getElementById("custExstNo").disabled = true;
				//alert("SELECT CIF ID IF EXIST AND CLICK YES, ELSE SUBMIT!!");
				//document.getElementById("custExstYes").focus();
				//return false;
			}

		if (!fnCheckMandatoryFields())
		{
			return false;
		}
		return true;
}

<!-- This function is added for formatting a particular MRH Row -->

function formatRowValue(Obj, colNumber) {

      return Obj;

       }

<!-- This function is added for formatting a particular MRH Row -->

function fnValidateForm(obj){
	//alert(obj.id);
	objForm = document.forms[0];

	return true;

}

function OrgNmFN(){
	var OrgNm = document.getElementById("OrgNm").value;
	if((OrgNm.toUpperCase() == "OTHER") || (OrgNm.toUpperCase() == "OTHERS")){
		document.getElementById("NwOrgNmFld").style.visibility="visible";
	}else{
		document.getElementById("NwOrgNmFld").style.visibility="hidden";
	}
}

function DisbCustExst(){
	var MinorYes = document.getElementById("MinorYes").checked;
	var MinorNo = document.getElementById("MinorNo").checked;
	var jtAcctFlgYes = document.getElementById("jtAcctFlgYes").checked;
	var jtAcctFlgNo = document.getElementById("jtAcctFlgNo").checked;
	var acctTypC = document.getElementById("acctTypC").checked;
	var acctTypR = document.getElementById("acctTypR").checked;
	
	if(MinorYes == true){
		document.getElementById("minRelnCifId").disabled = false;
	}else{
		document.getElementById("minRelnCifId").disabled = true;
	}
	
	if(acctTypC == true){
		document.getElementById("biometId").disabled = true;
		document.getElementById("firstNam").disabled = true;
		document.getElementById("midName").disabled = true;
		document.getElementById("lastNam").disabled = true;
		document.getElementById("corpName").disabled = false;
	}else if(acctTypR == true){
		document.getElementById("biometId").disabled = false;
		document.getElementById("firstNam").disabled = false;
		document.getElementById("midName").disabled = false;
		document.getElementById("lastNam").disabled = false;
		document.getElementById("corpName").disabled = true;
	}
	
	if((acctTypC == true) && (MinorYes == true)){
		alert("Corporate account cannot be a minor");
		document.getElementById("acctTypC").checked = false;
		document.getElementById("acctTypR").checked = false;
		document.getElementById("MinorYes").checked = false;
		document.getElementById("MinorNo").checked = false;
		document.getElementById("Minor").value = "";
	}
	if((acctTypC == true)|| (jtAcctFlgYes == true) || (MinorYes == true)){
		document.getElementById("salaryAcctFlgNo").checked = true;
		document.getElementById("salaryAcctFlg").value = "N";
		document.getElementById("salaryAcctFlgNo").disabled = true;
		document.getElementById("salaryAcctFlgYes").disabled = true;
	}else{
		document.getElementById("salaryAcctFlgNo").checked = false;
		document.getElementById("salaryAcctFlgYes").checked = false;
		document.getElementById("salaryAcctFlg").value = "";
		document.getElementById("salaryAcctFlgNo").disabled = false;
		document.getElementById("salaryAcctFlgYes").disabled = false;
	}
	
	
	if((MinorNo == true) && (jtAcctFlgNo == true) && (acctTypR == true)){
		document.getElementById("custExstNo").disabled = false;
		document.getElementById("custExstYes").disabled = false;
		document.getElementById("dSearch").disabled = false;
	}else{
		document.getElementById("custExstNo").disabled = true;
		document.getElementById("custExstYes").disabled = true;
		document.getElementById("dSearch").disabled = true;
	}
}

function MinorTypeFN(e){
	var MinorYes = document.getElementById("MinorYes").checked;
	var MinorNo = document.getElementById("MinorNo").checked;
	var DOB = document.getElementById("DOB").value;
	var jtAcctFlgYes = document.getElementById("jtAcctFlgYes").checked;
	if((MinorYes == true) && (jtAcctFlgYes == true)){
		alert("Minor account cannot be a joint Account");
		document.getElementById("MinorYes").focus();
		document.getElementById("jtAcctFlgYes").checked = false;
		return false;
	}
	if((DOB != "") && (MinorYes == true)){
		minorSnrCitz(DOB);
		var MinorYes = document.getElementById("MinorYes").checked;
		var MinorNo = document.getElementById("MinorNo").checked;
	}
	if ((MinorYes == true) && (MinorNo == false)){
		document.getElementById("Minor").value = "Y";
	}else if((MinorYes == false) && (MinorNo == true)){
		document.getElementById("Minor").value = "N";
	}
	DisbCustExst();
}

function salaryAcctFlgFN(){
	var salaryAcctFlgYes = document.getElementById("salaryAcctFlgYes").checked;
	var salaryAcctFlgNo = document.getElementById("salaryAcctFlgNo").checked;
	if ((salaryAcctFlgYes == true) && (salaryAcctFlgNo == false)){
		document.getElementById("salaryAcctFlg").value = "Y";
	}else if((salaryAcctFlgYes == false) && (salaryAcctFlgNo == true)){
		document.getElementById("salaryAcctFlg").value = "N";
	}
}

function CreAcctFlgFc(){
	var jtAcctFlgYes = document.getElementById("jtAcctFlgYes").checked;
	var CreAcctFlgNo = document.getElementById("CreAcctFlgNo").checked;
	if((CreAcctFlgNo == true) && (jtAcctFlgYes == true)){
		alert("Account creation is required for Joint account. System will change  Account creation flag to Yes");
		document.getElementById("CreAcctFlgNo").focus();
		document.getElementById("CreAcctFlgYes").checked = true;
		document.getElementById("CreAcctFlgNo").checked = false;
	}
	
	var CreAcctFlgYes = document.getElementById("CreAcctFlgYes").checked;
	var CreAcctFlgNo = document.getElementById("CreAcctFlgNo").checked;
	if ((CreAcctFlgYes == true) && (CreAcctFlgNo == false)){
		document.getElementById("CreAcctFlg").value = "Y";
	}else if((CreAcctFlgYes == false) && (CreAcctFlgNo == true)){
		document.getElementById("CreAcctFlg").value = "N";
	}
}

function customOrgNm(){
	var OrgNm = document.getElementById("OrgNm").value;
	//id = id.slice(0, -1);
	var inputNameValues = "OrgNm|"+OrgNm;
	var outputNames = "OrgNm|Code";
	var scrName = "gsimact_Orga.scr";
	var title = "LIST OF ORGANIZATION CODES AND THEIR NAME";
	var literalNames =  "ORGANIZATION NAME" + "|" + "CODE";
	var hyperLnks = "1";
	var retVal = fnExecuteScriptForList(inputNameValues,outputNames, scrName,title, literalNames, hyperLnks, false);
	document.getElementById("OrgNm").value = retVal.split("|")[0];
	//document.getElementById(id+"1").value = retVal.split("|")[0];
	//document.getElementById(id+"2").value = retVal.split("|")[1];
}

function jtAcctFlgFc(){
	var jtAcctFlgYes = document.getElementById("jtAcctFlgYes").checked;
	var CreAcctFlgNo = document.getElementById("CreAcctFlgNo").checked;
	if((CreAcctFlgNo == true) && (jtAcctFlgYes == true)){
		alert("Account creation is required for Joint account. System will change  Account creation flag to Yes");
		document.getElementById("CreAcctFlgYes").focus();
		document.getElementById("CreAcctFlgYes").checked = true;
		document.getElementById("CreAcctFlgNo").checked = false;
		document.getElementById("CreAcctFlg").value = "Y";
	}
	
	var jtAcctFlgYes = document.getElementById("jtAcctFlgYes").checked;
	var jtAcctFlgNo = document.getElementById("jtAcctFlgNo").checked;
	var MinorYes = document.getElementById("MinorYes").checked;
	var biometId = document.getElementById("biometId").value;
	if((MinorYes == true) && (jtAcctFlgYes == true)){
		alert("Minor account cannot be a joint Account");
		document.getElementById("MinorYes").focus();
		document.getElementById("jtAcctFlgYes").checked = false;
		return false;
	}
	acctType();
	if ((jtAcctFlgYes == true) && (jtAcctFlgNo == false)){
		document.getElementById("jtAcctFlg").value = "Y";
		//if((biometId != "") && (document.getElementById("biometId").disabled == true)){
		if(biometId != ""){
			document.getElementById("biometId").disabled = false;
			document.getElementById("firstNam").disabled = false;
			document.getElementById("midName").disabled = false;
			document.getElementById("lastNam").disabled = false;
			document.getElementById("fullNam").disabled = false;
			document.getElementById("DOB").disabled = false;
			document.getElementById("streetNo").disabled = false;
			document.getElementById("title").disabled = false;
			
			document.getElementById("biometId").value = "";
			document.getElementById("firstNam").value = "";
			document.getElementById("midName").value = "";
			document.getElementById("lastNam").value = "";
			document.getElementById("fullNam").value = "";
			document.getElementById("DOB").value = "";
			document.getElementById("streetNo").value = "";
			document.getElementById("title").value = "";
			//alert("Here");
		}
	}else if((jtAcctFlgYes == false) && (jtAcctFlgNo == true)){
		document.getElementById("jtAcctFlg").value = "N";
	}
}

function PopStateLga(){
	var nation1 = document.getElementById("nation1").value;
	var statOfOrig = document.getElementById("statOfOrig").value;
	if(nation1.toUpperCase() == "NIGERIAN"){
		var x = document.getElementById("lclGovt");
		var lt = x.length;
		if(lt > 0){
			for(i = 0; i <= lt; i++){
				x.remove(x.length[i]);
			}
		}
		
		var inputNameValues = "statOfOrig|" + statOfOrig;
		var outputNames = "occup";
		var scrName = "state_lga_map_01.scr";
		var retVal2 = appFnExecuteScript(inputNameValues,outputNames,scrName,false);
		var occupVals =retVal2.split("|")
		//alert(occupVals);
		occupBox4 = document.getElementById("lclGovt");
		document.getElementById("lclGovt").options.length = 0;
		
		var opt = document.createElement("option");
		opt.value= "";
		opt.innerHTML =  "--Select--";
		occupBox4.appendChild(opt); // whatever property it has
		
		var start = 3;
		var st = 1;
		for (i in occupVals){
			if (occupVals[i]!= ""){
				if (i==start){
					var opt = document.createElement("option");
					opt.value= occupVals[i];
					//opt.innerHTML = occupVals[i] + " - " + occupVals[start+2];
					opt.innerHTML = occupVals[start+2];
					occupBox4.appendChild(opt); // whatever property it has
					
					start +=6;
					st +=6;
				}
			}
		}
	}
}

function PopState(){
	var nation1 = document.getElementById("nation1").value;
	if(nation1.toUpperCase() == "NIGERIAN"){
		var x = document.getElementById("statOfOrig");
		var lt = x.length;
		if(lt > 0){
			for(i = 0; i <= lt; i++){
				x.remove(x.length[i]);
			}
		}
		var x = document.getElementById("lclGovt");
		var lt = x.length;
		if(lt > 0){
			for(i = 0; i <= lt; i++){
				x.remove(x.length[i]);
			}
		}
		
		var inputNameValues = "step|8";
		var outputNames = "occup";
		var scrName = "state_lga_map.scr";
		var retVal2 = appFnExecuteScript(inputNameValues,outputNames,scrName,false);
		var occupVals =retVal2.split("|")
		//alert(occupVals);
		occupBox4 = document.getElementById("statOfOrig");
		document.getElementById("statOfOrig").options.length = 0;
		
		var opt = document.createElement("option");
		opt.value= "";
		opt.innerHTML =  "--Select--";
		occupBox4.appendChild(opt); // whatever property it has
		
		var start = 3;
		var st = 1;
		for (i in occupVals){
			if (occupVals[i]!= ""){
				if (i==start){
					var opt = document.createElement("option");
					opt.value= occupVals[i];
					//opt.innerHTML = occupVals[i] + " - " + occupVals[start+2];
					opt.innerHTML = occupVals[start+2];
					occupBox4.appendChild(opt); // whatever property it has
					
					start +=6;
					st +=6;
				}
			}
		}
	}else{
		customerQDE();
	}
}

function SecChng(){
	document.getElementById("retSect").readOnly = true;
	document.getElementById("retSubSect").readOnly = true;
	document.getElementById("sect").readOnly = true;
	document.getElementById("subSect").readOnly = true;
	var occup = document.getElementById("occup").value;
	if(occup != ""){
		var inputNameValues = "occup|"+occup;
		var outputNames = "retSect,retSubSect";
		var scrName = "SectoSubFetch.scr";
		var retVal = appFnExecuteScript(inputNameValues,outputNames,scrName,false);
		document.getElementById("retSect").value = retVal.split("|")[1];
		document.getElementById("retSubSect").value = retVal.split("|")[3];
	}
	var natOfBiz = document.getElementById("natOfBiz").value;
	if(natOfBiz != ""){
		var inputNameValues = "natOfBiz|"+natOfBiz;
		var outputNames = "sect,subSect";
		var scrName = "CorpSectoSubFetch.scr";
		var retVal = appFnExecuteScript(inputNameValues,outputNames,scrName,false);
		document.getElementById("sect").value = retVal.split("|")[1];
		document.getElementById("subSect").value = retVal.split("|")[3];
	}
}

function fnOnLoad(){
	var funcCode = document.getElementById("funcCode").value;
	  var x = document.getElementById("gender");
 	  if (x.length-3> 0) {
 	  x.remove(x.length -1);
 	}
	document.getElementById("retSect").readOnly = true;
	document.getElementById("retSubSect").readOnly = true;
	document.getElementById("sect").readOnly = true;
	document.getElementById("subSect").readOnly = true;
	document.getElementById("solId").value = cSolId;
	document.getElementById("solId").readOnly = true;
	document.getElementById("creatDate_ui").value = BODDate;
	document.getElementById("creatDate").value = BODDate;
	if((funcCode != "V") && (funcCode != "X")){
	document.getElementById("creatDate").readOnly = true;
	document.getElementById("creatDate_ui").readOnly = true;
	}
	
	if (acctTyp == "C"){
	document.getElementById("occup").readOnly = true;
	document.getElementById("retSect").readOnly = true;
	document.getElementById("retSubSect").readOnly = true;
	document.getElementById("empType").readOnly = true;
	//document.getElementById("avgAnnIncm").readOnly = true;

	}
//hideAcctIdField();
      if(MinorYes ==false && MinorNo ==false){
			//alert("Please choose if account is for a Minor(Y/N)?")
			//document.getElementById("MinorYes").focus();
			//return false;
		}
	//alert(document.getElementById("solId").value);
	//alert(cSolId);
	//document.getElementById("creatDate_ui").value = BODDate;
	//document.getElementById("creatDate").value = BODDate;
	//document.getElementById("creatDate").readOnly = true;
	//document.getElementById("creatDate_ui").readOnly = true;
	//document.getElementById("solId").value = cSolId;
	//document.getElementById("solId").disabled = false;
	//document.getElementById("solId").readOnly = true;
	//alert(cSolId);
	document.getElementById("funcCode").focus();
	document.getElementById("custQDE").disabled = false;
	
	document.getElementById("minorDet").style.visibility = "hidden";
	document.getElementById("minorDet2").style.visibility = "hidden";
	document.getElementById("minorDet3").style.visibility = "hidden";
	document.getElementById("sLnk19").style.visibility = "hidden";
	document.getElementById("distaxIdNo2").style.visibility = "hidden";
	document.getElementById("taxIdNo2").style.visibility = "hidden";
	document.getElementById("smsAlrtYes").checked = true;
	document.getElementById("eStatmntYes").checked = true;
	document.getElementById("mobBankYes").checked = true;
	//document.getElementById("intBankYes").checked = true;
	document.getElementById("emailAlrtYes").checked = true;
	document.getElementById("dbtCardYes").checked = true;
	//document.getElementById("corpsearchYes").checked = false;
	//document.getElementById("corpsearchYes").readOnly = false;

	document.getElementById("addrsearchYes").checked = false;
	document.getElementById("addrsearchYes").readOnly = false;

	//document.getElementById("corpsearchNo").readOnly = false;
	//document.getElementById("addrsearchNo").readOnly = false;

	document.getElementById("addrsearchNo").checked = false;
	//document.getElementById("corpsearchNo").checked = true;

	document.getElementById("smsAlrtYes").readOnly = true;
	document.getElementById("mobBankYes").readOnly = true;
	//document.getElementById("intBankYes").readOnly = true;
	document.getElementById("emailAlrtYes").readOnly = true;
	document.getElementById("dbtCardYes").readOnly = true;
        //oge
	
	disableCustQDE();
	hideAcctIdField();
	
	/*
	//crncy
	var inputNameValues = "step|2";
	var outputNames = "crncyCode";
	var scrName = "simact002.scr";
	var retVal2 = appFnExecuteScript(inputNameValues,outputNames,scrName,false);					
	var crncyVals =retVal2.split("|")
	crncyCodeBox = document.getElementById("acctCcy");
	start = 1;
	for (i in crncyVals){
		if (crncyVals[i]!= ""){
			if (i==start){
			var opt = document.createElement("option");
			opt.value= crncyVals[i];
			opt.innerHTML = crncyVals[i] + " - " + crncyVals[start+2];
			crncyCodeBox.appendChild(opt); // whatever property it has
			start +=4;
			}
			
		}
		
	}
	
	//occu
	var inputNameValues = "step|3";
	var outputNames = "occup";
	var scrName = "simact002.scr";
	var retVal2 = appFnExecuteScript(inputNameValues,outputNames,scrName,false);					
	var occupVals =retVal2.split("|")
	occupBox = document.getElementById("occup");
	start = 1;
	for (i in occupVals){
		if (occupVals[i]!= ""){
			if (i==start){
			var opt = document.createElement("option");
			opt.value= occupVals[i];
			opt.innerHTML = occupVals[i] + " - " + occupVals[start+2];
			occupBox.appendChild(opt); // whatever property it has
			start +=4;
			}
			
		}
		
	}
	*/
	//document.getElementById("sumTbl").style.visibility="hidden";
	//document.getElementById("denomTable").style.visibility="hidden";
	
	if ((biometId != "") || (corpName != "") || (tempAcct != "") || (firstNam !="")){
		customerQDE();
		fnPopulateControlValues();
		checkOnLoad();
		DeDup();
		ptyDety(reltdPtyDetCnt,reltdPtyDet);
		valMinRel();
		if (funcCode == "V" || funcCode == "X"){
			disableAllField();
			disableCustQDE();
			document.getElementById("dSearch").disabled = true;
			document.getElementById("custQDE").disabled = true;
		}
	}
}

function checkOnLoad(){
	document.getElementById("creatDate_ui").value = BODDate;
	document.getElementById("solId").value = cSolId;
	document.getElementById("solId").readOnly = true;
	if (acctTyp == "R"){
		document.getElementById("acctTypR").checked = true;
		document.getElementById("addrsearchYes").disabled = false;
		document.getElementById("addrsearchNo").disabled = false;
		//document.getElementById("corpsearchYes").disabled = true;
		//document.getElementById("corpsearchNo").disabled = true;
		ptyDety.checked = true;
	}else{
			document.getElementById("acctTypC").checked = true;
			document.getElementById("addrsearchYes").disabled = false;
			document.getElementById("addrsearchNo").disabled = false;
			document.getElementById("occup").readOnly = true;
			document.getElementById("retSect").readOnly = true;
			document.getElementById("gender").readOnly = true;
			document.getElementById("retSubSect").readOnly = true;
			document.getElementById("empType").readOnly = true;
			//document.getElementById("avgAnnIncm").readOnly = true;
			//document.getElementById("avgAnnIncm").disabled = true;
			//document.getElementById("corpsearchYes").disabled = false;
			//document.getElementById("corpsearchNo").disabled = false;
	}
	acctType();

	if (Minor == "Y"){
			document.getElementById("MinorYes").checked = true;
	}else{
			document.getElementById("MinorNo").checked = true;
	}

	if (custExst == "Y"){
			document.getElementById("custExstYes").checked = true;
	}else{
			document.getElementById("custExstNo").checked = true;
	}
	if (jtAcctFlg == "Y"){
			document.getElementById("jtAcctFlgYes").checked = true;
	}else{
			document.getElementById("jtAcctFlgNo").checked = true;
	}
	if (nonResInd == "Y"){
			document.getElementById("nonResIndYes").checked = true;
			valNonRes(nonResInd,'turnNonRes_ui');
	}else{
			document.getElementById("nonResIndNo").checked = true;
			valNonRes(nonResInd,'turnNonRes_ui');
	}
	if (PEPFlg == "Y"){
			document.getElementById("PEPFlgYes").checked = true;
	}else{
			document.getElementById("PEPFlgNo").checked = true;
	}
	if (staffInd == "Y"){
			document.getElementById("staffIndYes").checked = true;
	}else{
			document.getElementById("staffIndNo").checked = true;
	}
	valStaffInd(staffInd,'relMngrId');
	if (equalOrGreater == "Y"){
			document.getElementById("equalOrGreaterYes").checked = true;
	}else{
			document.getElementById("equalOrGreaterNo").checked = true;
	}
	if (resOrCitiz == "Y"){
			document.getElementById("resOrCitizYes").checked = true;
	}else{
			document.getElementById("resOrCitizNo").checked = true;
	}
	if (eStatmnt == "Y"){
			document.getElementById("eStatmntYes").checked = true;
	}else{
			document.getElementById("eStatmntNo").checked = true;
	}
	estatmnt();
	if (intBank == "Y"){
			document.getElementById("intBankYes").checked = true;
			document.getElementById("intBankYes").readOnly = true;
	}else{
			document.getElementById("intBankNo").checked = false;
		        document.getElementById("intBankNo").readOnly = true;
	}
	if (mobBank == "Y"){
			document.getElementById("mobBankYes").checked = true;
			document.getElementById("mobBankYes").readOnly = true;
	}else{
			document.getElementById("mobBankNo").checked = false;
			document.getElementById("mobBankNo").readOnly = true;
	}
	if (smsAlrt == "Y"){
			document.getElementById("smsAlrtYes").checked = true;
			document.getElementById("smsAlrtYes").readOnly = true;
	}else{
			document.getElementById("smsAlrtNo").checked = false;
			document.getElementById("smsAlrtNo").readOnly = true;
	}
	if (emailAlrt == "Y"){
			document.getElementById("emailAlrtYes").checked = true;
			document.getElementById("emailAlrtYes").readOnly = true;
	}else{
			document.getElementById("emailAlrtNo").checked = false;
			document.getElementById("emailAlrtNo").readOnly = true;
	}
	if (dbtCard == "Y"){
			document.getElementById("dbtCardYes").checked = true;
			document.getElementById("dbtCardYes").readOnly = true;
	}else{
			document.getElementById("dbtCardNo").checked = false;
			document.getElementById("dbtCardNo").readOnly = true;
	}
	if (isAcctDocComp == "Y"){
			document.getElementById("isAcctDocCompYes").checked = true;
	}else{
			document.getElementById("isAcctDocCompNo").checked = true;
	}
	if (sHold == "Yes"){
		document.getElementById("sHold").checked = true;
	}
	if (sig == "Yes"){
		document.getElementById("sig").checked = true;
	}
	if (dir == "Yes"){
		document.getElementById("dir").checked = true;
	}
	if (acctHold == "Yes"){
		document.getElementById("acctHold").checked = true;
	}
	subSegmtList(segmnt1);
	document.getElementById("subSegmnt").value = subSegmnt;
	loadIDCode(typOfId);
	document.getElementById("typOfCode").value = typOfCode;
	document.getElementById("turnNonRes_ui").value = turnNonRes;
	document.getElementById("issuDate_ui").value = issuDate;
	document.getElementById("expDate_ui").value = expDate;
	if (document.getElementById("minorInd").value == "Y"){
		document.getElementById("minorDet").style.visibility = "Visible";
		document.getElementById("minorDet2").style.visibility = "Visible";
		document.getElementById("minorDet3").style.visibility = "Visible";
		document.getElementById("sLnk19").style.visibility = "Visible";
	}else{
		document.getElementById("sLnk19").style.visibility = "hidden";
	}
	ValCity(document.getElementById("plcOfIssu").value,"plcOfIssu");
}
var funcPrevSel="";
function funcVal(){
	
	var funcCode = document.getElementById("funcCode").value;
	if ((funcCode == "V") && (usrWkCls < 34)){
		alert("You do not have access to authorize transaction");
		document.getElementById("funcCode").value = "";
		return false;
	}
	if((funcCode != "V") && (funcCode != "X")){
		document.getElementById("creatDate").readOnly = true;
		document.getElementById("creatDate_ui").readOnly = true;
		
		document.getElementById("chqreqY").checked = false;
		document.getElementById("chqreqN").checked = true;
		document.getElementById("chqreqY").disabled = true;
		document.getElementById("chqreqN").disabled = true;
	}else{
		document.getElementById("creatDate").readOnly = false;
		document.getElementById("creatDate_ui").readOnly = false;
	}
	if (((funcCode == "J") || (funcCode == "M") || (funcCode == "D")) && (usrWkCls >= 34)){
		if (funcCode == "J"){
			alert("You do not have access to initiate transaction");
		}
		if (funcCode == "M"){
			alert("You do not have access to Modify transaction");
		}
		if (funcCode == "D"){
			alert("You do not have access to Delete transaction");
		}
		document.getElementById("funcCode").value = "";
		return false;
	}
	if (!fnIsNull(document.getElementById("tempAcct").value) || !fnIsNull(document.getElementById("corpName").value) || !fnIsNull(document.getElementById("biometId").value)){
			var conf = confirm("Changing Function Code results in loss of all entered data");
				if (conf == true){
					fnClear();
				}else{
					document.getElementById("funcCode").value = funcPrevSel;
					return false;
				}
	}
	if (funcCode == "J"){
		document.getElementById("tempAcct").disabled = true;
		document.getElementById("addValFrm").value = BODDate;
		document.getElementById("relStrtDate").value = BODDate;
		document.getElementById("creatDate_ui").value = BODDate;
		document.getElementById("priSolId").value = cSolId;
		document.getElementById("SolId").value = cSolId;
		solDesc(cSolId);
		//document.getElementById("acctTypR").checked = true;
		//acctType();
		document.getElementById("custExstNo").checked = false;
		document.getElementById("PEPFlgNo").checked = true;
		document.getElementById("PEPRltnshp").disabled = true;
		document.getElementById("occup").readOnly = true;
		//document.getElementById("avgAnnIncm").readOnly = true;
			document.getElementById("retSect").readOnly = true;
			document.getElementById("retSubSect").readOnly = true;
			document.getElementById("empType").readOnly = true;
			document.getElementById("occup").disabled = true;
			document.getElementById("retSect").disabled = true;
			document.getElementById("retSubSect").disabled = true;
			document.getElementById("empType").disabled = true;
			//document.getElementById("avgAnnIncm").disabled = true;
		document.getElementById("otherRltnshp").disabled = true;
		document.getElementById("smsAlrtYes").checked = true;
		document.getElementById("eStatmntYes").checked = true;
		document.getElementById("emailAlrtYes").checked = true;
		document.getElementById("dbtCardYes").checked = true;
                //oge
		document.getElementById("mobBankYes").checked = true;
		//document.getElementById("intBankYes").checked = true;

		document.getElementById("smsAlrtNo").disabled = true;
		document.getElementById("mobBankNo").disabled = true;
		//document.getElementById("intBankNo").disabled = true;
		document.getElementById("emailAlrtNo").disabled = true;
		document.getElementById("dbtCardNo").disabled = true;
		//document.getElementById("corpsearchYes").disabled = false;
		//document.getElementById("corpsearchNo").checked = true;
		//document.getElementById("corpsearchYes").checked = false;
		document.getElementById("addrsearchYes").disabled = false;
		document.getElementById("addrsearchNo").disabled = false;
		document.getElementById("addrsearchYes").checked = false;
		document.getElementById("addrsearchNo").checked = false;

		//document.getElementById("Accept").disabled = true;
		//document.getElementById("actlFee").readOnly = true;
		document.getElementById("creatDate_ui").readOnly = true;
		document.getElementById("sLnk1").style.visibility="hidden";
		
		var acctTypR = document.getElementById("acctTypR").checked;
		var acctTypC = document.getElementById("acctTypC").checked;
		if(acctTypR ==false && acctTypC ==false){
			alert("Account Type must be entered")
			document.getElementById("acctTypR").focus();
			return false;
		}
		loadDoc();
	}
	if (funcCode == "M"){
		document.getElementById("tempAcct").disabled = false;
		document.getElementById("addValFrm").value = BODDate;
		document.getElementById("relStrtDate").value = BODDate;
		document.getElementById("sLnk1").style.visibility="visible";			
	}
	if (funcCode == "X"){
		document.getElementById("tempAcct").disabled = false;
		document.getElementById("dSearch").disabled = true;
		document.getElementById("addValFrm").value = BODDate;
		document.getElementById("relStrtDate").value = BODDate;
		document.getElementById("tempAcct").readOnly = false;
		document.getElementById("sLnk1").style.visibility="visible";
		disableAllField();
	}
	if (funcCode == "V"){
		document.getElementById("tempAcct").disabled = false;
		document.getElementById("addValFrm").value = BODDate;
		document.getElementById("relStrtDate").value = BODDate;
		document.getElementById("priSolId").value = cSolId;
		document.getElementById("sLnk1").style.visibility="visible";
	
		//alert(document.getElementById("corpsearchYes").value);
		//alert(document.getElementById("addrsearchYes").value);
		//alert("checkingcoprsearch dem");
		//Oge
		//if (document.getElementById("corpsearchYes").value = true){	
		//document.getElementById("corpsearchYes").checked = true;
		//document.getElementById("addrsearchNo").checked = true;
		//document.getElementById("corpsearchNo").disabled = true;
		//document.getElementById("corpsearchYes").disabled = true;
		//document.getElementById("addrsearchYes").disabled = true;
		//document.getElementById("addrsearchNo").disabled = true;
		//}
		//else{
		//document.getElementById("corpsearchNo").checked = true;
		//document.getElementById("addrsearchNo").checked = true;
		//document.getElementById("addrsearchYes").disabled = true;
		//document.getElementById("addrsearchNo").disabled = true;
		//document.getElementById("corpsearchYes").disabled = true;
		//document.getElementById("corpsearchNo").disabled = true;
		//}
		if (document.getElementById("addrsearchYes").value = true){
		//document.getElementById("corpsearchNo").checked = true;
		document.getElementById("addrsearchYes").checked = true;
		//document.getElementById("corpsearchNo").disabled = true;
		//document.getElementById("corpsearchYes").disabled = true;
		document.getElementById("addrsearchYes").disabled = true;
		document.getElementById("addrsearchNo").disabled = true;
		}
		else{
		//document.getElementById("corpsearchNo").checked = true;
		//document.getElementById("addrsearchNo").checked = false;
		document.getElementById("addrsearchYes").disabled = true;
		document.getElementById("addrsearchNo").disabled = true;
		//document.getElementById("corpsearchYes").disabled = true;
		//document.getElementById("corpsearchNo").disabled = true;
		}
		//Oge
		disableAllField();
	}
	funcPrevSel = funcCode;
}

function solDesc(cSolId){
	var inputNameValues = "step|6|cSolId|"+cSolId;
	var outputNames = "crncyCode";
	var scrName = "simact002_2.scr";
	var retVal2 = appFnExecuteScript(inputNameValues,outputNames,scrName,false);
	if (retVal2.split("|")[0] == "Error"){
		//alert(retVal2.split("|")[1]);
		document.getElementById("priSolId").value = "";
		document.getElementById("smsAlrtYes").checked = true;
		document.getElementById("eStatmntYes").checked = true;
		document.getElementById("mobBankYes").checked = true;
		//document.getElementById("intBankYes").checked = true;
		document.getElementById("emailAlrtYes").checked = true;
		document.getElementById("dbtCardYes").checked = true;
		document.getElementById("smsAlrtNo").disabled = true;
		document.getElementById("mobBankNo").disabled = true;
		document.getElementById("intBankNo").disabled = true;
		document.getElementById("emailAlrtNo").disabled = true;
		//document.getElementById("corpsearchYes").disabled = false;
		//document.getElementById("corpsearchNo").disabled = false;
		document.getElementById("addrsearchYes").disabled = false;
		document.getElementById("addrsearchNo").disabled = false;
		//oge
	}else{
		document.getElementById("solName").value =retVal2.split("|")[1];
	}
}

function pepflg(){
	//alert("pepflg");
	if (document.getElementById("PEPFlgYes").checked == true){
		document.getElementById("PEPRltnshp").disabled = false;
	}else{
		document.getElementById("PEPRltnshp").value = "";
		document.getElementById("PEPRltnshp").disabled = true;
		//document.getElementById("occup").disabled = true;
		//document.getElementById("retSect").disabled = true;
		//document.getElementById("retSubSect").disabled = true;
		//document.getElementById("empType").disabled = true;
		//document.getElementById("avgAnnIncm").disabled = true;
	}
}

function valPepReln(relnVal){
	if (relnVal == "OTH") {
		document.getElementById("otherRltnshp").disabled = false;
	}else{
		document.getElementById("otherRltnshp").value = "";
		document.getElementById("otherRltnshp").disabled = true;
	}	
}

function valCustType(){
	if ((document.getElementById("sHold").checked == true) || (document.getElementById("sig").checked == true) || (document.getElementById("dir").checked == true)){
		 //document.getElementById("acctTypC").checked = true;
		//document.getElementById("acctTypR").checked = true;
		//document.getElementById("acctTypC").checked = false;
		document.getElementById("acctTypC").disabled = false;
		document.getElementById("acctTypR").disabled = false;

	}
	if(document.getElementById("acctHold").checked == true){
		document.getElementById("acctTypC").disabled = false;
	}
}

function shHolder(){
	valCustType();
		if (document.getElementById("sHold").checked == true){
			if ((document.getElementById("equalOrGreaterYes").checked == false) && (document.getElementById("equalOrGreaterNo").checked == false)){
				//document.getElementById("acctTypC").checked = true;
				alert("Answer the share holding and resident question")
				document.getElementById("equalOrGreaterYes").focus();
			}
		}
}

function estatmnt(){
		if (document.getElementById("eStatmntNo").checked == true){
			document.getElementById("freq").disabled = true;
		}else{
			document.getElementById("freq").disabled = false;
		}
}

function debitCard(){
		if (document.getElementById("dbtCardNo").checked == true){
			document.getElementById("prefNam").disabled = true;
		}else{
			document.getElementById("prefNam").disabled = false;
		}
}

function disableAllField(){
	if (document.getElementById("MinorNo").checked == true){
		document.getElementById("creatDate_ui").readOnly = true;
		document.getElementById("solId").readOnly = true;
		document.getElementById("funcCode").readOnly = true;
		document.getElementById("biometId").readOnly = true;
		document.getElementById("corpName").readOnly = true;
		document.getElementById("title").readOnly = true;
		document.getElementById("firstNam").readOnly = true;
		document.getElementById("DOB").readOnly = true;
		document.getElementById("midName").readOnly = true;
		document.getElementById("emailAdd").readOnly = false;
		document.getElementById("lastNam").readOnly = true;
		document.getElementById("phonNum1").readOnly = false;
		document.getElementById("phonNum2").readOnly = false;
		document.getElementById("phonNum3").readOnly = false;
		document.getElementById("fullNam").readOnly = true;
		document.getElementById("natId").readOnly = true;
		document.getElementById("sHold").readOnly = true;
		document.getElementById("sig").readOnly = true;
		document.getElementById("dir").readOnly = true;
		document.getElementById("acctHold").readOnly = true;
		document.getElementById("acctCcy").readOnly = true;
		document.getElementById("gender").readOnly = true;
		document.getElementById("maritStat").readOnly = true;
		document.getElementById("cntryOfRes1").readOnly = true;
		document.getElementById("cntryOfRes2").readOnly = true;
		document.getElementById("cntryOfBth1").readOnly = true;
		document.getElementById("cntryOfBth2").readOnly = true;
		document.getElementById("turnNonRes_ui").readOnly = true;
		document.getElementById("nation1").readOnly = true;
		document.getElementById("nation2").readOnly = true;
		document.getElementById("usPers").readOnly = true;
		document.getElementById("statOfOrig").readOnly = true;
		document.getElementById("lclGovt").readOnly = true;
		document.getElementById("PEPRltnshp").readOnly = true;
		//document.getElementById("occup").readOnly = true;
		//document.getElementById("retSect").readOnly = true;
		//document.getElementById("retSubSect").readOnly = true;
		//document.getElementById("empType").readOnly = true
		document.getElementById("KYCInd").readOnly = true;
		document.getElementById("otherRltnshp").readOnly = true;
		document.getElementById("relMngrId").readOnly = true;
		document.getElementById("shrtNam").readOnly = true;
		document.getElementById("minorInd").readOnly = true;
		document.getElementById("snrCitiz").readOnly = true;
		document.getElementById("priSolId").readOnly = true;
		document.getElementById("solName").readOnly = true;
		document.getElementById("addValFrm").readOnly = true;
		document.getElementById("relStrtDate").readOnly = true;
		document.getElementById("streetNo").disabled = false;
		//document.getElementById("occup").readOnly = true;
		document.getElementById("city1").readOnly = true;
		document.getElementById("city2").disabled = false;
		//document.getElementById("empType").readOnly = true;
		document.getElementById("state1").readOnly = true;
		document.getElementById("state2").readOnly = true;
		document.getElementById("segmnt1").readOnly = true;
		document.getElementById("segmnt2").readOnly = true;
		document.getElementById("cntry1").readOnly = true;
		document.getElementById("cntry2").disabled = false;
		document.getElementById("subSegmnt").readOnly = true;
		document.getElementById("pstCode").readOnly = true;
		document.getElementById("natOfBiz").readOnly = true;
		document.getElementById("typOfId").readOnly = true;
		document.getElementById("typOfCode").disabled = true;
		document.getElementById("taxIdNo").readOnly = true;
		document.getElementById("taxIdNo2").readOnly = true;
		document.getElementById("freq").readOnly = true;
		document.getElementById("plcOfIssu").readOnly = true;
		document.getElementById("rmId").readOnly = true;
		document.getElementById("issuDate_ui").readOnly = true;
		document.getElementById("expDate_ui").readOnly = true;
		document.getElementById("regNo").readOnly = true;
		document.getElementById("prefNam").readOnly = true;
		document.getElementById("prntCoy").readOnly = true;
		document.getElementById("sect").readOnly = true;
		document.getElementById("subSect").readOnly = true;
		document.getElementById("cntryOfInc").readOnly = true;
		//document.getElementById("avgAnnIncm").readOnly = true;
		document.getElementById("SCUMReg").readOnly = true;
		document.getElementById("CRMNo").readOnly = true;
		document.getElementById("acctTypR").disabled = true;
		document.getElementById("acctTypC").disabled = true;
		//kanmi
		document.getElementById("chqreqY").disabled = true;
		document.getElementById("chqreqN").disabled = true;
		document.getElementById("cheqbY").disabled = true;
		document.getElementById("cheqbN").disabled = true;
		document.getElementById("cardissY").disabled = true;
		document.getElementById("cardissN").disabled = true;
		document.getElementById("legalY").disabled = true;
		document.getElementById("legalN").disabled = true;
		document.getElementById("conleg").disabled = true;
		document.getElementById("concard").disabled = true;
		document.getElementById("conchq").disabled = true;
		document.getElementById("noOfLeaves").disabled = true;
		//kanmi
		document.getElementById("custExstYes").disabled = true;
		document.getElementById("custExstNo").disabled = true;
		document.getElementById("jtAcctFlgYes").disabled = true;
		document.getElementById("jtAcctFlgNo").disabled = true;
		document.getElementById("nonResIndYes").disabled = true;
		document.getElementById("nonResIndNo").disabled = true;
		document.getElementById("PEPFlgYes").disabled = true;
		document.getElementById("PEPFlgNo").disabled = true;
		document.getElementById("equalOrGreaterYes").disabled = true;
		document.getElementById("equalOrGreaterNo").disabled = true;
		document.getElementById("staffIndYes").disabled = true;
		document.getElementById("staffIndNo").disabled = true;
		document.getElementById("resOrCitizYes").disabled = true;
		document.getElementById("resOrCitizNo").disabled = true;
		//document.getElementById("intBankYes").disabled = true;
		//document.getElementById("intBankNo").disabled = true;
		document.getElementById("eStatmntYes").disabled = true;
		document.getElementById("eStatmntNo").disabled = true;
		document.getElementById("mobBankYes").disabled = true;
		document.getElementById("mobBankNo").disabled = true;
		document.getElementById("smsAlrtYes").disabled = true;
		document.getElementById("smsAlrtNo").disabled = true;
		document.getElementById("emailAlrtYes").disabled = true;
		document.getElementById("emailAlrtNo").disabled = true;
		document.getElementById("dbtCardYes").disabled = true;
		document.getElementById("dbtCardNo").disabled = true;
		//document.getElementById("corpsearchYes").disabled = false;
		//document.getElementById("corpsearchNo").disabled = false;
		document.getElementById("addrsearchYes").disabled = false;
		document.getElementById("addrsearchNo").disabled = false;
		document.getElementById("minRelnCifId").readOnly = true;
		document.getElementById("minReln").disabled = true;
		document.getElementById("minRelnGDCode").disabled = true;
		document.getElementById("riskRtg").disabled = true;
		//document.getElementById("avgAnnIncm").readOnly = true;
		//document.getElementById("avgAnnIncm").disabled = true;
	}
		
}

function disableCustQDE(){
	document.getElementById("sLnk1").style.visibility="hidden";
	document.getElementById("sLnk2").style.visibility="hidden";
	document.getElementById("sLnk3").style.visibility="hidden";
	document.getElementById("sLnk4").style.visibility="hidden";
	
	document.getElementById("sLnk5").style.visibility="hidden";
	document.getElementById("sLnk6").style.visibility="hidden";
	document.getElementById("sLnk7").style.visibility="hidden";
	document.getElementById("sLnk8").style.visibility="hidden";
	document.getElementById("sLnk9").style.visibility="hidden";
	document.getElementById("sLnk10").style.visibility="hidden";
	document.getElementById("sLnk11").style.visibility="hidden";
	document.getElementById("sLnk12").style.visibility="hidden";
	document.getElementById("sLnk13").style.visibility="hidden";
	document.getElementById("sLnk14").style.visibility="hidden";
	document.getElementById("sLnk15").style.visibility="hidden";
	document.getElementById("sLnk16").style.visibility="hidden";
	//document.getElementById("sLnk17").style.visibility="hidden";
	//document.getElementById("sLnk18").style.visibility="hidden";
	document.getElementById("sLnk19").style.visibility="hidden";
	//document.getElementById("natId").disabled = true;
	document.getElementById("sHold").disabled = true;
	document.getElementById("sig").disabled = true;
	document.getElementById("dir").disabled = true;
	document.getElementById("acctHold").disabled = true;
	document.getElementById("acctCcy").disabled = true;
	document.getElementById("gender").disabled = true;
	document.getElementById("maritStat").disabled = true;
	document.getElementById("cntryOfRes1").readOnly = true;
	document.getElementById("cntryOfRes2").readOnly = true;
	document.getElementById("cntryOfBth1").readOnly = true;
	document.getElementById("cntryOfBth2").readOnly = true;
	document.getElementById("turnNonRes_ui").readOnly = true;
	document.getElementById("nation1").readOnly = true;
	document.getElementById("nation2").readOnly = true;
	document.getElementById("usPers").disabled = true;
	document.getElementById("statOfOrig").disabled = true;
	document.getElementById("addType").disabled = true;
	document.getElementById("lclGovt").disabled = true;
	document.getElementById("PEPRltnshp").disabled = true;
	//document.getElementById("occup").disabled = true;
	//document.getElementById("retSect").disabled = true;
	//document.getElementById("retSubSect").disabled = true;
	//document.getElementById("empType").disabled = true;
	document.getElementById("KYCInd").disabled = true;
	document.getElementById("otherRltnshp").readOnly = true;
	document.getElementById("relMngrId").readOnly = true;
	document.getElementById("shrtNam").readOnly = true;
	document.getElementById("minorInd").readOnly = true;
	document.getElementById("snrCitiz").readOnly = true;
	document.getElementById("priSolId").readOnly = true;
	document.getElementById("solName").readOnly = true;
	document.getElementById("addValFrm").readOnly = true;
	document.getElementById("relStrtDate").readOnly = true;
	document.getElementById("streetNo").disabled = false;
	//document.getElementById("occup").disabled = true;
	document.getElementById("city1").readOnly = true;
	document.getElementById("city2").readOnly = true;
	//document.getElementById("empType").disabled = true;
	document.getElementById("state1").readOnly = true;
	document.getElementById("state2").readOnly = true;
	document.getElementById("segmnt1").readOnly = true;
	document.getElementById("segmnt2").readOnly = true;
	document.getElementById("cntry1").readOnly = true;
	document.getElementById("cntry2").readOnly = true;
	document.getElementById("subSegmnt").disabled = true;
	document.getElementById("pstCode").readOnly = true;
	document.getElementById("natOfBiz").disabled = true;
	document.getElementById("typOfId").disabled = true;
	document.getElementById("typOfCode").disabled = true;
	document.getElementById("taxIdNo").readOnly = true;
	document.getElementById("taxIdNo2").readOnly = true;
	document.getElementById("freq").disabled = true;
	document.getElementById("plcOfIssu").readOnly = true;
	document.getElementById("rmId").readOnly = true;
	document.getElementById("issuDate_ui").readOnly = true;
	document.getElementById("expDate_ui").readOnly = true;
	document.getElementById("regNo").readOnly = true;
	document.getElementById("prefNam").readOnly = true;
	document.getElementById("prntCoy").readOnly = true;
	document.getElementById("sect").readOnly = true;
	document.getElementById("subSect").readOnly = true;
	document.getElementById("cntryOfInc").disabled = true;
	//document.getElementById("avgAnnIncm").readOnly = true;
	document.getElementById("SCUMReg").readOnly = true;
	document.getElementById("CRMNo").readOnly = true;
	//document.getElementById("acctTypR").disabled = true;
	//document.getElementById("acctTypC").disabled = true;
	document.getElementById("minRelnCifId").readOnly = true;
	
	document.getElementById("minReln").disabled = true;
	document.getElementById("minRelnGDCode").disabled = true;
	document.getElementById("custExstYes").disabled = false;
	document.getElementById("custExstNo").disabled = true;
	document.getElementById("jtAcctFlgYes").disabled = true;
	document.getElementById("jtAcctFlgNo").disabled = true;
	document.getElementById("nonResIndYes").disabled = true;
	document.getElementById("nonResIndNo").disabled = true;
	document.getElementById("PEPFlgYes").disabled = true;
	document.getElementById("PEPFlgNo").disabled = true;
	document.getElementById("equalOrGreaterYes").disabled = true;
	document.getElementById("equalOrGreaterNo").disabled = true;
	document.getElementById("staffIndYes").disabled = true;
	document.getElementById("staffIndNo").disabled = true;
	document.getElementById("resOrCitizYes").disabled = true;
	document.getElementById("resOrCitizNo").disabled = true;
	//document.getElementById("intBankYes").disabled = false;
	//document.getElementById("intBankNo").disabled = true;
	document.getElementById("eStatmntYes").disabled = true;
	document.getElementById("eStatmntNo").disabled = true;
	document.getElementById("mobBankYes").disabled = false
	document.getElementById("mobBankNo").disabled = true;
	document.getElementById("smsAlrtYes").disabled = false;
	document.getElementById("smsAlrtNo").disabled = true;
	document.getElementById("emailAlrtYes").disabled = false;
	document.getElementById("emailAlrtNo").disabled = true;
	document.getElementById("dbtCardYes").disabled = false;
	document.getElementById("dbtCardNo").disabled = true;
        //document.getElementById("corpsearchYes").disabled = false;
	//document.getElementById("corpsearchNo").disabled = false;
	document.getElementById("addrsearchYes").disabled = false;
	document.getElementById("addrsearchNo").disabled = false;
	
	document.getElementById("schmCode").readOnly = true;
	document.getElementById("GSHCode").readOnly = true;
	document.getElementById("acctOfRef").readOnly = true;
	document.getElementById("isAcctDocCompYes").disabled = true;
	document.getElementById("isAcctDocCompNo").disabled = true;
	document.getElementById("add").disabled = true;
	document.getElementById("riskRtg").disabled = true;
	document.getElementById("addCrncy").disabled = true;
	document.getElementById("rmCrncy").disabled = true;
	document.getElementById("clrCrncy").disabled = true;
	/*//kanmi
	  document.getElementById("chqreqY").disabled = true;
	  document.getElementById("chqreqN").disabled = true;
	  document.getElementById("cheqbY").disabled = true;
	  document.getElementById("cheqbN").disabled = true;
	  document.getElementById("cardissY").disabled = true;
	  document.getElementById("cardissN").disabled = true;
	  document.getElementById("legalY").disabled = true;
	  document.getElementById("legalN").disabled = true;
	  document.getElementById("conleg").readOnly = true;
	  document.getElementById("concard").readOnly = true;
	  document.getElementById("conchq").readOnly = true;
	  document.getElementById("noOfLeaves").disabled = true;
			document.getElementById("sect").disabled = true;
			document.getElementById("subSect").disabled = true;
			document.getElementById("empType").disabled = true
			document.getElementById("occup").disabled = true;
			//document.getElementById("avgAnnIncm").disabled = true;
	//kanmi*/
}

function enableCustQDE(){
	//alert("enableCustQDE");
	document.getElementById("sLnk2").style.visibility="visible";
	document.getElementById("sLnk3").style.visibility="visible";
	document.getElementById("sLnk4").style.visibility="visible";
	if (document.getElementById("acctTypR").checked == true){
		document.getElementById("sLnk4").style.visibility="visible";
		//document.getElementById("sLnk17").style.visibility="hidden";
		//document.getElementById("sLnk18").style.visibility="hidden";
	}else{
		document.getElementById("sLnk4").style.visibility="hidden";
		//document.getElementById("sLnk17").style.visibility="visible";
		//document.getElementById("sLnk18").style.visibility="visible";
	}
	document.getElementById("sLnk5").style.visibility="visible";
	document.getElementById("sLnk6").style.visibility="visible";
	document.getElementById("sLnk7").style.visibility="visible";
	document.getElementById("sLnk8").style.visibility="visible";
	document.getElementById("sLnk9").style.visibility="visible";
	document.getElementById("sLnk10").style.visibility="visible";
	document.getElementById("sLnk11").style.visibility="visible";
	document.getElementById("sLnk12").style.visibility="visible";
	document.getElementById("sLnk13").style.visibility="visible";
	document.getElementById("sLnk14").style.visibility="visible";
	document.getElementById("sLnk15").style.visibility="visible";
	document.getElementById("sLnk16").style.visibility="visible";
	//document.getElementById("sLnk19").style.visibility="Visible";
	
	document.getElementById("natId").disabled = false;
	document.getElementById("sHold").disabled = false;
	document.getElementById("sig").disabled = false;
	document.getElementById("dir").disabled = false;
	document.getElementById("acctHold").disabled = false;
	document.getElementById("acctCcy").disabled = false;
	document.getElementById("gender").disabled = false;
	document.getElementById("maritStat").disabled = false;
	document.getElementById("cntryOfRes1").disabled = false;
	document.getElementById("cntryOfRes2").disabled = false;
	document.getElementById("cntryOfBth1").disabled = false;
	document.getElementById("cntryOfBth2").disabled = false;
	document.getElementById("turnNonRes_ui").readOnly = false;
	document.getElementById("nation1").disabled = false;
	document.getElementById("nation2").disabled = false;
	document.getElementById("usPers").disabled = false;
	document.getElementById("statOfOrig").disabled = false;
	document.getElementById("addType").disabled = false;
	document.getElementById("lclGovt").disabled = false;
	document.getElementById("PEPRltnshp").disabled = false;
	document.getElementById("KYCInd").disabled = false;
	document.getElementById("otherRltnshp").disabled = false;
	document.getElementById("relMngrId").disabled = false;
	document.getElementById("shrtNam").disabled = false;
	document.getElementById("minorInd").disabled = false;
	document.getElementById("snrCitiz").disabled = false;
	document.getElementById("priSolId").disabled = false;
	document.getElementById("solName").disabled = false;
	document.getElementById("addValFrm").disabled = false;
	document.getElementById("relStrtDate").disabled = false;
	document.getElementById("streetNo").disabled = false;
	document.getElementById("occup").disabled = false;
	document.getElementById("city1").disabled = false;
	document.getElementById("city2").disabled = false;
	document.getElementById("empType").disabled = false;
	document.getElementById("state1").disabled = false;
	document.getElementById("state2").disabled = false;
	document.getElementById("segmnt1").disabled = false;
	document.getElementById("segmnt2").disabled = false;
	document.getElementById("cntry1").disabled = false;
	document.getElementById("cntry2").disabled = false;
	document.getElementById("subSegmnt").disabled = false;
	document.getElementById("pstCode").disabled = false;
	document.getElementById("natOfBiz").disabled = false;
	document.getElementById("typOfId").disabled = false;
	document.getElementById("typOfCode").disabled = false;
	document.getElementById("taxIdNo").disabled = false;
	document.getElementById("taxIdNo2").disabled = false;
	document.getElementById("freq").disabled = false;
	document.getElementById("plcOfIssu").disabled = false;
	document.getElementById("rmId").disabled = false;
	document.getElementById("issuDate_ui").disabled = false;
	document.getElementById("expDate_ui").disabled = false;
	document.getElementById("regNo").disabled = false;
	document.getElementById("prefNam").disabled = false;
	document.getElementById("prntCoy").disabled = false;
	document.getElementById("sect").disabled = false;
	document.getElementById("subSect").disabled = false;
	document.getElementById("cntryOfInc").disabled = false;
	//document.getElementById("avgAnnIncm").readOnly = false;
	document.getElementById("SCUMReg").disabled = false;
	document.getElementById("CRMNo").disabled = false;
	//document.getElementById("acctTypR").disabled = false;
	//document.getElementById("acctTypC").disabled = false;
	document.getElementById("smsAlrtYes").checked = true;
	document.getElementById("eStatmntYes").checked = true;
	document.getElementById("mobBankYes").checked = true;
	//document.getElementById("intBankYes").checked = true;
	document.getElementById("emailAlrtYes").checked = true;
	document.getElementById("dbtCardYes").checked = true;
	document.getElementById("smsAlrtYes").readOnly = true;
	document.getElementById("mobBankYes").readOnly = true;
	//document.getElementById("intBankYes").readOnly = true;
	document.getElementById("emailAlrtYes").readOnly = true;
	document.getElementById("dbtCardYes").disabled = false;
	document.getElementById("custExstYes").disabled = false;
	document.getElementById("custExstNo").disabled = true;
	document.getElementById("jtAcctFlgYes").disabled = false;
	document.getElementById("jtAcctFlgNo").disabled = false;
	document.getElementById("nonResIndYes").disabled = false;
	document.getElementById("nonResIndNo").disabled = false;
	document.getElementById("PEPFlgYes").disabled = false;
	document.getElementById("PEPFlgNo").disabled = false;
	document.getElementById("equalOrGreaterYes").disabled = false;
	document.getElementById("equalOrGreaterNo").disabled = false;
	document.getElementById("staffIndYes").disabled = false;
	document.getElementById("staffIndNo").disabled = false;
	document.getElementById("resOrCitizYes").disabled = false;
	document.getElementById("resOrCitizNo").disabled = false;
	//document.getElementById("intBankYes").disabled = true;
	document.getElementById("intBankNo").disabled = true;
	document.getElementById("eStatmntYes").disabled = true;
	document.getElementById("eStatmntNo").disabled = true;
	document.getElementById("mobBankYes").disabled = true;
	document.getElementById("mobBankNo").disabled = true;
	document.getElementById("smsAlrtYes").disabled = true;
	document.getElementById("smsAlrtNo").disabled = true;
	document.getElementById("emailAlrtYes").disabled = true;
	document.getElementById("emailAlrtNo").disabled = true;
	document.getElementById("dbtCardYes").disabled = false;
	document.getElementById("dbtCardNo").disabled = false;
	
	document.getElementById("schmCode").readOnly = false;
	document.getElementById("GSHCode").readOnly = false;
	document.getElementById("acctOfRef").readOnly = false;
	document.getElementById("isAcctDocCompYes").disabled = false;
	document.getElementById("isAcctDocCompNo").disabled = false;
	document.getElementById("add").disabled = false;
	
	document.getElementById("minRelnCifId").readOnly = false;
	document.getElementById("minReln").disabled = false;
	document.getElementById("minRelnGDCode").disabled = false;
	document.getElementById("riskRtg").disabled = false;
	document.getElementById("addCrncy").disabled = false;
	document.getElementById("rmCrncy").disabled = false;
	document.getElementById("clrCrncy").disabled = false;
	//document.getElementById("corpsearchYes").disabled = true;
	//document.getElementById("corpsearchNo").disabled = true;
	document.getElementById("addrsearchYes").disabled = false;
	document.getElementById("addrsearchNo").disabled = false;
}

function addrsearchPop(){
	var addrsearchYes = document.getElementById("addrsearchYes").checked;
	var addrsearchNo = document.getElementById("addrsearchNo").checked;
	if((addrsearchYes == true) && (addrsearchNo == false)){
		document.getElementById("addrsearch").value = "Y";
	}else{
		document.getElementById("addrsearch").value = "N";
	}
}

function acctType(){
//alert("acctType");
		var acctTypR = document.getElementById("acctTypR").checked;
		var acctTypC = document.getElementById("acctTypC").checked;
		var jtAcctFlgYes = document.getElementById("jtAcctFlgYes").checked;
		var jtAcctFlgNo = document.getElementById("jtAcctFlgNo").checked;
		var MinorNo = document.getElementById("MinorNo").checked;
		var MinorYes = document.getElementById("MinorYes").checked;
		var biometId = document.getElementById("biometId").value;
		if ((acctTypC == true) && (acctTypR == false)){
			document.getElementById("avgAnnIncm").readOnly = false;
			document.getElementById("avgAnnIncm").disabled = false;

			document.getElementById("biometId").value = "";
			document.getElementById("biometId").disabled = true;

			document.getElementById("dSearch").disabled = true;
			//document.getElementById("custQDE").disabled = true;
			document.getElementById("corpName").readOnly = false;
			document.getElementById("corpName").disabled = false;
			document.getElementById("gender").disabled = true;
			document.getElementById("gender").readOnly = true;

			//document.getElementById("title").value = "";
			document.getElementById("title").disabled = false;
			document.getElementById("firstNam").readOnly = true;
			document.getElementById("firstNam").value = "";
			document.getElementById("midName").value = "";
			document.getElementById("midName").readOnly = true;
			//document.getElementById("emailAdd").readOnly = true;
			//document.getElementById("emailAdd").value = "";
			document.getElementById("lastNam").readOnly = true;
			document.getElementById("lastNam").value = "";
			//document.getElementById("phonNum1").value = "";
			//document.getElementById("phonNum1").readOnly = true;
			//document.getElementById("phonNum2").value = "";
			//document.getElementById("phonNum2").readOnly = true;
			//document.getElementById("phonNum3").readOnly = true;
			//document.getElementById("phonNum3").value = "";
			//document.getElementById("fullNam").value = "";
			document.getElementById("fullNam").readOnly = true;
			//document.getElementById("natId").value = "";
			document.getElementById("natId").disabled = false;
			document.getElementById("minorInd").disabled = false;
			document.getElementById("snrCitiz").disabled = false;
			document.getElementById("maritStat").disabled = false;
			document.getElementById("gender").disabled = false;
			document.getElementById("occup").disabled = false;
			 document.getElementById("staffIndYes").disabled = false;
			//document.getElementById("staffIndNo").disabled = false;
			document.getElementById("staffIndNo").checked = false;
			valStaffInd('N','relMngrId');
			document.getElementById("empType").disabled = false;			
			document.getElementById("expDate_ui").disabled = false;
			document.getElementById("taxIdNo").readOnly = false;
			document.getElementById("segmnt1").disabled = false;
			document.getElementById("segmnt2").disabled = false;
			document.getElementById("subSegmnt").disabled = false;
			document.getElementById("plcOfIssu").disabled = false;
			document.getElementById("issuDate_ui").disabled = false;
			document.getElementById("corpName").disabled = false;
			document.getElementById("natOfBiz").disabled = false;
			document.getElementById("regNo").disabled = false;
			document.getElementById("prntCoy").disabled = false;
			document.getElementById("sect").disabled = false;
			document.getElementById("subSect").disabled = false;
			document.getElementById("cntryOfInc").disabled = false;
			//document.getElementById("avgAnnIncm").disabled = false;
			document.getElementById("SCUMReg").disabled = false;
			document.getElementById("CRMNo").disabled = false;
			document.getElementById("smsAlrtYes").checked = true;
			document.getElementById("eStatmntYes").checked = true;
			document.getElementById("mobBankYes").checked = true;
			//document.getElementById("intBankYes").checked = true;
			document.getElementById("emailAlrtYes").checked = true;
			document.getElementById("dbtCardYes").checked = true;
			document.getElementById("smsAlrtYes").readOnly = true;
			document.getElementById("mobBankYes").readOnly = true;
			//document.getElementById("intBankYes").readOnly = true;
			document.getElementById("emailAlrtYes").readOnly = true;
			document.getElementById("dbtCardYes").readOnly = true;
			document.getElementById("addrsearchYes").disabled = false;
			document.getElementById("addrsearchNo").disabled = false;
			//document.getElementById("occup").readOnly = true;
			//document.getElementById("retSect").readOnly = true;
			//document.getElementById("retSubSect").readOnly = true;
			//document.getElementById("empType").readOnly = true
			//document.getElementById("corpsearchYes").disabled = false;
			//document.getElementById("corpsearchNo").disabled = false;
			
			document.getElementById("sLnk6").style.visibility="hidden";
			//document.getElementById("sLnk17").style.visibility="visible";
			//document.getElementById("sLnk18").style.visibility="visible";
			
		}else{
			if ((jtAcctFlgYes == true) || (MinorYes == true)){
				document.getElementById("dSearch").disabled = false;
				document.getElementById("custQDE").disabled = false;
				document.getElementById("avgAnnIncm").readOnly = true;
				document.getElementById("avgAnnIncm").disabled = true;
				document.getElementById("corpName").value = "";
				document.getElementById("corpName").readOnly = true;
				document.getElementById("sHold").readOnly = true;
				document.getElementById("dir").readOnly = true;
				document.getElementById("avgAnnIncm").disabled = true;
				document.getElementById("sHold").disabled = true;
				document.getElementById("dir").disabled = true;
				document.getElementById("minorInd").disabled = false;
				document.getElementById("snrCitiz").disabled = false;
				document.getElementById("natOfBiz").disabled = true;
				document.getElementById("prntCoy").disabled = false;
				document.getElementById("cntryOfInc").disabled = false;
				document.getElementById("avgAnnIncm").disabled = true;
				document.getElementById("SCUMReg").disabled = false;
				document.getElementById("CRMNo").disabled = false;
				document.getElementById("firstNam").disabled = false;
				document.getElementById("midName").disabled = false;
				document.getElementById("lastNam").disabled = false;
				document.getElementById("fullNam").disabled = false;
				
				document.getElementById("biometId").disabled = false;
				document.getElementById("title").disabled = false;
				document.getElementById("firstNam").readOnly = false;
				document.getElementById("midName").readOnly = false;
				document.getElementById("emailAdd").disabled = false;
				document.getElementById("lastNam").readOnly = false;
				document.getElementById("phonNum1").readOnly = false;
				document.getElementById("phonNum2").readOnly = false;
				document.getElementById("phonNum3").readOnly = false;
				document.getElementById("fullNam").readOnly = false;
				document.getElementById("natId").disabled = false;
				document.getElementById("maritStat").disabled = false;
				document.getElementById("gender").disabled = false;
				document.getElementById("occup").disabled = false;
				document.getElementById("staffIndYes").disabled = false;
				document.getElementById("staffIndNo").disabled = false;
				document.getElementById("staffIndNo").checked = false;
				valStaffInd('Y','relMngrId');
				document.getElementById("empType").disabled = false;
				document.getElementById("segmnt1").disabled = false;
				document.getElementById("segmnt2").disabled = false;
				document.getElementById("subSegmnt").disabled = false;
				document.getElementById("plcOfIssu").disabled = false;
				document.getElementById("issuDate_ui").disabled = false;
				document.getElementById("expDate_ui").disabled = false;
				document.getElementById("taxIdNo2").readOnly = false;
				document.getElementById("regNo").disabled = false;
				document.getElementById("addrsearchYes").disabled = false;
				document.getElementById("addrsearchNo").disabled = false;
				
	
				document.getElementById("sLnk6").style.visibility="visible";
				//start here
				
			}else{
				document.getElementById("dSearch").disabled = false;
				document.getElementById("custQDE").disabled = false;
				document.getElementById("avgAnnIncm").readOnly = true;
				document.getElementById("avgAnnIncm").disabled = true;
				document.getElementById("corpName").value = "";
				document.getElementById("corpName").readOnly = true;
				document.getElementById("sHold").readOnly = true;
				document.getElementById("dir").readOnly = true;
				//document.getElementById("avgAnnIncm").readOnly = true;
				document.getElementById("avgAnnIncm").disabled = true;
				document.getElementById("sHold").disabled = true;
				document.getElementById("dir").disabled = true;
				//document.getElementById("corpName").disabled = false;
				document.getElementById("minorInd").disabled = false;
				document.getElementById("snrCitiz").disabled = false;
				document.getElementById("natOfBiz").disabled = false;
				document.getElementById("prntCoy").disabled = false;
				document.getElementById("cntryOfInc").disabled = false;
				document.getElementById("avgAnnIncm").disabled = false;
				document.getElementById("SCUMReg").disabled = false;
				document.getElementById("CRMNo").disabled = false;
				
				document.getElementById("biometId").disabled = false;
				document.getElementById("title").disabled = false;
				document.getElementById("firstNam").readOnly = true;
				document.getElementById("midName").readOnly = true;
				document.getElementById("emailAdd").disabled = false;
				document.getElementById("lastNam").readOnly = true;
				document.getElementById("phonNum1").readOnly = false;
				document.getElementById("phonNum2").readOnly = false;
				document.getElementById("phonNum3").readOnly = false;
				document.getElementById("fullNam").readOnly = true;
				document.getElementById("natId").disabled = false;
				document.getElementById("maritStat").disabled = false;
				document.getElementById("gender").disabled = false;
				document.getElementById("occup").disabled = false;
				document.getElementById("staffIndYes").disabled = false;
				document.getElementById("staffIndNo").disabled = false;
				document.getElementById("staffIndNo").checked = false;
				valStaffInd('Y','relMngrId');
				document.getElementById("empType").disabled = false;
				document.getElementById("segmnt1").disabled = false;
				document.getElementById("segmnt2").disabled = false;
				document.getElementById("subSegmnt").disabled = false;
				document.getElementById("plcOfIssu").disabled = false;
				document.getElementById("issuDate_ui").disabled = false;
				document.getElementById("expDate_ui").disabled = false;
				document.getElementById("taxIdNo2").readOnly = false;
				document.getElementById("regNo").disabled = false;
				document.getElementById("addrsearchYes").disabled = false;
				document.getElementById("addrsearchNo").disabled = false;
				//document.getElementById("corpsearchYes").disabled = true;
				//document.getElementById("corpsearchNo").disabled = true;
				
	
				document.getElementById("sLnk6").style.visibility="visible";
				//document.getElementById("sLnk17").style.visibility="hidden";
				//document.getElementById("sLnk18").style.visibility="hidden";
			}
			var docList = document.getElementById("docList").value;
			if(docList ==""){
				loadDoc();
			}
		}
		DisbCustExst();
		//kanmi
		hideAcctIdField();
		//kanmi
}
//kanmi
function hideAcctIdField()
{

	var acctTypR = document.getElementById("acctTypR").checked;
	var acctTypC = document.getElementById("acctTypC").checked;


	if ((acctTypC == true) && (acctTypR == false))
	{
      document.getElementById("chqreqY").disabled = false;
	  document.getElementById("chqreqN").disabled = false;
	  document.getElementById("cheqbY").disabled = false;
	  document.getElementById("cheqbN").disabled = false;
	  document.getElementById("cardissY").disabled = false;
	  document.getElementById("cardissN").disabled = false;
	  document.getElementById("legalY").disabled = false;
	  document.getElementById("legalN").disabled = false;
	  //document.getElementById("conleg").disabled = false;
	  document.getElementById("conleg").disabled = false;
	  //document.getElementById("conleg").value = "0.00";
	  //document.getElementById("concard").disabled = false;
	  document.getElementById("concard").disabled = false;
	 //// document.getElementById("concard").value = ".00";
	  //document.getElementById("conchq").disabled = false;
	  document.getElementById("conchq").disabled = false;
	  document.getElementById("noOfLeaves").disabled = false;
	  //document.getElementById("conchq").value = "0.00";
	
    }else{
      
	  document.getElementById("chqreqY").disabled = false;
	  document.getElementById("chqreqN").disabled = false;
	  document.getElementById("cheqbY").disabled = false;
	  document.getElementById("cheqbN").disabled = false;
	  document.getElementById("cardissY").disabled = false;
	  document.getElementById("cardissN").disabled = false;
	  document.getElementById("legalY").disabled = true;
	  document.getElementById("legalN").disabled = true;
	  document.getElementById("conleg").disabled = false;
	  document.getElementById("concard").disabled = false;
	  document.getElementById("conchq").disabled = false;
	  document.getElementById("noOfLeaves").disabled = false;
	  
	 
    }
}
//kanmi

function customerQDE(){
	
	var CreAcctFlgYes = document.getElementById("CreAcctFlgYes").checked;
	var CreAcctFlgNo = document.getElementById("CreAcctFlgNo").checked;
	var jtAcctFlgYes = document.getElementById("jtAcctFlgYes").checked;
	var jtAcctFlgNo = document.getElementById("jtAcctFlgNo").checked;
	var MinorYes = document.getElementById("MinorYes").checked;
	var MinorNo = document.getElementById("MinorNo").checked;
	if ((MinorYes == true) && (MinorNo == false)){
		document.getElementById("dSearch").disabled = true;
	}
	if((CreAcctFlgYes == false) && (CreAcctFlgNo == false)){
		alert("Please indicate if account will be created or not");
		document.getElementById("CreAcctFlgYes").focus();
		return false;
	}
	if((jtAcctFlgYes == false) && (jtAcctFlgNo == false)){
		alert("Please select if your creating joint account");
		document.getElementById("jtAcctFlgYes").focus();
		return false;
	}
	
	//alert("customerQDE");
	//emptyFields();
	enableCustQDE();
	acctType();
	pepflg();
	//populate shortName
	if (document.getElementById("acctTypR").checked == true){
		document.getElementById("shrtNam").value=document.getElementById("lastNam").value.substr(0,4).replace(/\s/gi,".")+document.getElementById("firstNam").value.charAt(0).replace(/\s/gi,".");
	}else{
		document.getElementById("shrtNam").value = document.getElementById("corpName").value.substr(0,5).replace(/\s/gi,".");
	}

	//ALL
	var inputNameValues = "step|8";
	var outputNames = "occup";
	var scrName = "simact002.scr";
	var retVal2 = appFnExecuteScript(inputNameValues,outputNames,scrName,false);
	var occupVals =retVal2.split("|");
	//alert(occupVals);
	document.getElementById("empType").options.length = 1;
	document.getElementById("PEPRltnshp").options.length = 1;
	document.getElementById("usPers").options.length = 1;
	document.getElementById("lclGovt").options.length = 1;
	document.getElementById("statOfOrig").options.length = 1;
	document.getElementById("natOfBiz").options.length = 1;
	document.getElementById("typOfId").options.length = 1;
	document.getElementById("occup").options.length = 1;
	document.getElementById("acctCcy").options.length = 1;
	document.getElementById("addType").options.length = 1;
	document.getElementById("cntryOfInc").options.length = 1;
	document.getElementById("gender").options.length = 1;
	document.getElementById("maritStat").options.length = 1;
	document.getElementById("minReln").options.length = 1;
	document.getElementById("minRelnGDCode").options.length = 1;
	document.getElementById("riskRtg").options.length = 1;
	occupBox = document.getElementById("empType");
	occupBox1 = document.getElementById("PEPRltnshp");
	occupBox2 = document.getElementById("usPers");
	occupBox3 = document.getElementById("lclGovt");
	occupBox4 = document.getElementById("statOfOrig");
	occupBox5 = document.getElementById("natOfBiz");
	occupBox6 = document.getElementById("typOfId");
	occupBox7 = document.getElementById("occup");
	occupBox8 = document.getElementById("acctCcy");
	occupBox9 = document.getElementById("addType");
	occupBox10 = document.getElementById("cntryOfInc");
	occupBox11 = document.getElementById("gender");
	occupBox12 = document.getElementById("maritStat");
	occupBox13 = document.getElementById("minReln");
	occupBox14 = document.getElementById("minRelnGDCode");
	occupBox15 = document.getElementById("riskRtg");	

	//####Added by Walex####

	if (document.getElementById("segmnt2").value == "STUDENTS"){
	if (document.getElementById("subSegmnt").value == "0103"){
		document.getElementById("minRelnCifId").value = "R004981265";
	}
	}
	//####Ended by Walex####
	
	start = 3;
	st = 1;
	for (i in occupVals){
		if (occupVals[i]!= ""){
			if (i==start){
				if (occupVals[st] == "ADDRESS_TYPE"){
					var opt = document.createElement("option");
					opt.value= occupVals[i];
					opt.innerHTML = occupVals[start+2];
					occupBox9.appendChild(opt); // whatever property it has
				}
				if (occupVals[st] == "CONTACT_OCCUPATION"){
					var opt = document.createElement("option");
					opt.value= occupVals[i];
					opt.innerHTML = occupVals[i] + " - " + occupVals[start+2];
					occupBox7.appendChild(opt); // whatever property it has
				}
				if (occupVals[st] == "COUNTRY"){
					var opt = document.createElement("option");
					opt.value= occupVals[i];
					opt.innerHTML = occupVals[i] + " - " + occupVals[start+2];
					occupBox10.appendChild(opt); // whatever property it has
				}
				if (occupVals[st] == "CURRENCY"){
					var opt = document.createElement("option");
					opt.value= occupVals[i];
					opt.innerHTML = occupVals[start+2];
					occupBox8.appendChild(opt); // whatever property it has
				}
				if (occupVals[st] == "EMPLOYMENT_STATUS"){
					var opt = document.createElement("option");
					opt.value= occupVals[i];
					opt.innerHTML = occupVals[start+2];
					occupBox.appendChild(opt); // whatever property it has
				}
				if (occupVals[st] == "FATCA_US"){
					var opt = document.createElement("option");
					opt.value= occupVals[i];
					opt.innerHTML = occupVals[start+2];
					occupBox2.appendChild(opt); // whatever property it has
				}
				if (occupVals[st] == "GENDER"){
					var opt = document.createElement("option");
					opt.value= occupVals[i];
					opt.innerHTML = occupVals[i] + " - " +occupVals[start+2];
					occupBox11.appendChild(opt); // whatever property it has
				}
				if (occupVals[st] == "LGA"){
					var opt = document.createElement("option");
					opt.value= occupVals[i];
					//opt.innerHTML = occupVals[i] + " - " + occupVals[start+2];
					opt.innerHTML = occupVals[start+2];
					occupBox3.appendChild(opt); // whatever property it has
				}
				if (occupVals[st] == "MARITAL_STATUS"){
					var opt = document.createElement("option");
					opt.value= occupVals[i];
					opt.innerHTML = occupVals[i] + " - " + occupVals[start+2];
					occupBox12.appendChild(opt); // whatever property it has
				}
				if (occupVals[st] == "PEP_REL"){
					var opt = document.createElement("option");
					opt.value= occupVals[i];
					opt.innerHTML = occupVals[start+2];
					occupBox1.appendChild(opt); // whatever property it has
				}
				if (occupVals[st] == "STATE"){
					var opt = document.createElement("option");
					opt.value= occupVals[i];
					//opt.innerHTML = occupVals[i] + " - " + occupVals[start+2];
					opt.innerHTML = occupVals[start+2];
					occupBox4.appendChild(opt); // whatever property it has
				}
				if (occupVals[st] == "UBA_BUSINESS_NATURE"){
					var opt = document.createElement("option");
					opt.value= occupVals[i];
					opt.innerHTML = occupVals[i] + " - " + occupVals[start+2];
					occupBox5.appendChild(opt); // whatever property it has
				}
				if (occupVals[st] == "DOCTYPE"){
					var opt = document.createElement("option");
					opt.value= occupVals[i];
					opt.innerHTML = occupVals[start+2];
					occupBox6.appendChild(opt); // whatever property it has
				}
				if (occupVals[st] == "RELATION"){
					var opt = document.createElement("option");
					opt.value= occupVals[i];
					opt.innerHTML = occupVals[start+2];
					occupBox13.appendChild(opt); // whatever property it has
				}
				if (occupVals[st] == "MINOR_GUARD_CODE"){
					var opt = document.createElement("option");
					opt.value= occupVals[i];
					opt.innerHTML = occupVals[start+2];
					occupBox14.appendChild(opt); // whatever property it has
				}
				if (occupVals[st] == "RISK_RATING"){
					var opt = document.createElement("option");
					opt.value= occupVals[i];
					opt.innerHTML = occupVals[start+2];
					occupBox15.appendChild(opt); // whatever property it has
				}
				start +=6;
				st +=6;
			}
		}
		
	}
	valMinRel();
	acctType();
	DisableFilds();
}

// Added by Frank To disable Fileds
function DisableFilds(){
	if (document.getElementById("acctTypC").checked == true){		
		document.getElementById("gender").disabled = true;
		document.getElementById("gender").readOnly = true;
		document.getElementById("maritStat").disabled = true;
		document.getElementById("maritStat").readOnly = true;
		document.getElementById("occup").disabled = true;
		document.getElementById("occup").readOnly = true;
		document.getElementById("empType").disabled = true;
		document.getElementById("empType").readOnly = true;
		
		var inputNameValues = "statOfOrig|3";
		var outputNames = "expDate,expDate_ui";
		var scrName = "FetGsimDate.scr";
		var retVal2 = appFnExecuteScript(inputNameValues,outputNames,scrName,false);
		//alert(retVal2);
		
		document.getElementById("expDate").value = retVal2.split("|")[1];
		document.getElementById("expDate_ui").value = retVal2.split("|")[3];
		document.getElementById("issuAuthort").value = "CAC";
		document.getElementById("issuDate").value = document.getElementById("creatDate").value;
		document.getElementById("issuDate_ui").value = document.getElementById("creatDate").value;
		document.getElementById("issuAuthort").disabled = true;
		document.getElementById("issuAuthort").readOnly = true;
		document.getElementById("issuDate").disabled = true;
		document.getElementById("issuDate").readOnly = true;
		document.getElementById("issuDate_ui").disabled = true;
		document.getElementById("issuDate_ui").readOnly = true;
		document.getElementById("expDate").disabled = true;
		document.getElementById("expDate").readOnly = true;
		document.getElementById("expDate_ui").disabled = true;
		document.getElementById("expDate_ui").readOnly = true;
		document.getElementById("sLnk4").style.visibility="hidden";
		document.getElementById("sLnk3").style.visibility="hidden";
		document.getElementById("sLnk20").style.visibility="hidden";
		
		/*document.getElementById("plcOfIssu").disabled = true;
		document.getElementById("plcOfIssu").readOnly = true;
		document.getElementById("issuAuthort").disabled = true;
		document.getElementById("issuAuthort").readOnly = true;
		document.getElementById("plcOfIssu2").disabled = true;
		document.getElementById("plcOfIssu2").readOnly = true;*/
		document.getElementById("RCNoCorpId").innerHTML = "RC Number";
	}else{
		document.getElementById("RCNoCorpId").innerHTML = "Registration No.";
	}
}
function valMinRel(){

	  var x = document.getElementById("gender");
 	  if (x.length- 3 > 0) {
 	  x.remove(x.length -1);
 	}
	//alert("valMinRel");
	var x = document.getElementById("riskRtg");
	//alert(x.length-4);
	if(x.length-4 > 0){
		if ((x.length-4 != "HIGH") || (x.length-4 != "LOW") || (x.length-4 != "MODERATE")){
	x.remove(x.length-4);
	x.remove(x.length-4);
	x.remove(x.length-4);
	x.remove(x.length-4);
	x.remove(x.length-4);
		}
	}

	if (document.getElementById("minorInd").value == "Y"){
		document.getElementById("minReln").value = "Guardian";
		document.getElementById("minReln").disabled = true;
	}
}

function cntryOfBrth(){
			var cntryOfBirth1 = document.getElementById("cntryOfBth1").value;
			var cntryOfBirth2 = document.getElementById("cntryOfBth2").value;
			if ((cntryOfBirth1 != "") && (cntryOfBirth2 != "")) {
			document.getElementById("nation1").value = cntryOfBirth1;
			document.getElementById("nation2").value = cntryOfBirth2;
			}
}

function formatAcct(acctNo){
 var inputNameValues = "step|3|acctNo|"+acctNo;
 var outputNames = "fAccount,Err1";
 var scrName = "simplify_submit3.scr";
 var retVal2 = appFnExecuteScript(inputNameValues,outputNames,scrName,false);     
 fAccount = retVal2.split("|")[1];
 //document.getElementById("opAcctId").value = fAccount;
 return fAccount
}

function fnClear(){
	//simact_det_ONCLICK3(document.getElementById("Cancel"),'Cancel');
	document.forms[0].reset();
	doSubmit("clear");
	return false;
}

function fieldTrimmer(object){
	value=object.value;
	value = value.replace(/\s/gi,"");
	object.value = value;
}


//====== Summary Table
function addeTable(numbs){
	var tbody='<table border=0>';
	var id = 1;
	for (i=1;i<=numbs;i++){
		if (i%2 == 1){
		tbody+='<tr id="'+String(id)+'" bgcolor="#BDD7EE">';
		}else{
		tbody+='<tr id="'+String(id)+'">';
		}
		//CIF ID
		tbody+='<td class="textfield" style="text-align:center;width: 100px" name="'+ subGroupName + '.issDet'+ String(id)+'1" id="issDet'+ String(id)+'1">';
		tbody+='</td>';
		
		//GCIF ID
		tbody+='<td class="textfield" style="text-align:center;width: 100px" name="'+ subGroupName + '.issDet'+ String(id)+'2" id="issDet'+ String(id)+'2" >';
		tbody+='</td>';
		
		//First Name
		tbody+='<td class="textfield" style="text-align:center;width: 150px" name="'+ subGroupName + '.issDet'+ String(id)+'3" id="issDet'+ String(id)+'3" >';
		tbody+='</td>';
		
		//Last Name
		tbody+='<td class="textfield" style="text-align:center;width: 150px" name="'+ subGroupName + '.issDet'+ String(id)+'4" id="issDet'+ String(id)+'4" >';
		tbody+='</td>';
		
		//DOB
		tbody+='<td class="textfield" style="text-align:center;width: 150px" name="'+ subGroupName + '.issDet'+ String(id)+'5" id="issDet'+ String(id)+'5" >';
		tbody+='</td>';
		
		//Bank Id/Country
		tbody+='<td class="textfield" style="text-align:center;width: 50px" name="'+ subGroupName + '.issDet'+ String(id)+'6" id="issDet'+ String(id)+'6">';
		tbody+='<input class="textfield" style="text-align:center;width: 1px" align="right">';
		tbody+='</td>';
		
		tbody+='</tr>';
		id +=1;
	}
	tbody+="</table>";
	document.getElementById("denomTable").tBodies[0].setAttribute("id","tableGenerate");
	body=document.getElementById("tableGenerate");
	var temp = body.ownerDocument.createElement("div");

	temp.innerHTML=tbody;
	body.parentNode.replaceChild(temp.firstChild.firstChild, body);	
}

function HandlerFetchDetails(data) {
    try {
        if (data.Error != undefined) {
            alert("Error");
            return false;
        }
		var responeVal = data.response;

        if (responeVal != "00") {
            alert("This BVN Is Not Valid!!");
			document.getElementById("firstNam").value = "";
			document.getElementById("midName").value = "";
			document.getElementById("lastNam").value = "";
			document.getElementById("fullNam").value = "";
			document.getElementById("DOB").value = "";
			document.getElementById("minorInd").value = "";
			document.getElementById("snrCitiz").value = "";
			MobilePhone = "";
			document.getElementById("firstNam").readOnly = false;
			document.getElementById("DOB").readOnly = false;
			document.getElementById("midName").readOnly = false;
			document.getElementById("lastNam").readOnly = false;
			document.getElementById("fullNam").readOnly = false;
			document.getElementById("shrtNam").readOnly = false;
			document.getElementById("minorInd").readOnly = false;
			document.getElementById("snrCitiz").readOnly = false;
			return false;
        } else {
			var custName = data.Lastname + " " + data.Middlename + " " + data.Firstname;
        
		document.getElementById("firstNam").value = data.Firstname;
		document.getElementById("midName").value = data.Middlename;
		document.getElementById("lastNam").value = data.Lastname;
		document.getElementById("fullNam").value = custName;
		var MobilePhone = data.Mobilephone
        url = null;
		var birthyr = changeDateFormat(data.DateOfBirth);
		document.getElementById("DOB").value = birthyr;
		minorSnrCitz(birthyr);
		/*
		document.getElementById("firstNam").readOnly = true;
		document.getElementById("DOB").readOnly = true;
		document.getElementById("midName").readOnly = true;
		document.getElementById("lastNam").readOnly = true;
		document.getElementById("fullNam").readOnly = true;
		document.getElementById("shrtNam").readOnly = true;
		*/
	}		
    } catch (x) {}
}

function GetConn() {
    try {
        return new ActiveXObject('Msxml2.XMLHTTP');
    } catch (e) {
        try {
            return new ActiveXObject('Microsoft.XMLHTTP');
        } catch (e) {
            try {
                return new XMLHttpRequest();
            } catch (e3) {
                return null;
            }
        }
    }
}

function biometricId(bvnCheck) {
	var funcCode = document.getElementById("funcCode").value;
	if (!fnIsNull(bvnCheck)){
	if (fnIsNull(funcCode)){
		alert("Enter the function code");
		document.getElementById("biometId").value = "";
		document.getElementById("funcCode").focus();
		document.getElementById("smsAlrtYes").checked = true;
		document.getElementById("eStatmntYes").checked = true;
		document.getElementById("mobBankYes").checked = true;
		//document.getElementById("intBankYes").checked = true;
		document.getElementById("emailAlrtYes").checked = true;
		document.getElementById("dbtCardYes").checked = true;
		document.getElementById("smsAlrtYes").readOnly = true;
		document.getElementById("mobBankYes").readOnly = true;
		//document.getElementById("intBankYes").readOnly = true;
		document.getElementById("emailAlrtYes").readOnly = true;
		document.getElementById("dbtCardYes").readOnly = true;
		return false;
	}
	
		//Added by Walex on 15-march2019 to display more fields for customers //
		var MinorNo = document.getElementById("MinorNo").checked;
		var MinorYes = document.getElementById("MinorYes").checked;
		var inputNameValues = "bvn|"+bvnCheck;
		var outputNames = "fAccount,Err1";
		var scrName = "simAcctCifval.scr";
		var retVal = appFnExecuteScript(inputNameValues,outputNames,scrName,false);     
		if (retVal.split("|")[0] == "Error"){
			alert(retVal.split("|")[1]);
			document.getElementById("biometId").value ="";
			document.getElementById("firstNam").value ="";
			document.getElementById("midName").value ="";
			document.getElementById("lastNam").value ="";
			document.getElementById("fullNam").value ="";
			document.getElementById("DOB").value ="";
			document.getElementById("phonNum2").value ="";
			document.getElementById("phonNum3").value ="";
			document.getElementById("emailAdd").value ="";
			document.getElementById("streetNo").value ="";
			document.getElementById("title").value ="";
			//document.getElementById("segmnt2").value ="";
		}else{
			//document.getElementById("segmnt1").value = retVal.split("|")[1];
			//document.getElementById("segmnt2").value = retVal.split("|")[3];
			//document.getElementById("biometId").value =retVal.split("|")[5];
			//alert(retVal.split("|")[1]);
			document.getElementById("firstNam").value =retVal.split("|")[1];
			document.getElementById("midName").value =retVal.split("|")[3];
			document.getElementById("lastNam").value =retVal.split("|")[5];
			document.getElementById("fullNam").value =retVal.split("|")[1]+" "+retVal.split("|")[3]+" "+retVal.split("|")[5];
			document.getElementById("DOB").value =retVal.split("|")[7];
			//document.getElementById("phonNum1").value ="234";
			//document.getElementById("phonNum2").value =retVal.split("|")[9];
			//document.getElementById("phonNum3").value =retVal.split("|")[11];
			//document.getElementById("emailAdd").value =retVal.split("|")[13];
			document.getElementById("streetNo").value =retVal.split("|")[15];
			//document.getElementById("title").value =retVal.split("|")[17];
			//document.getElementById("DOB").value =retVal.split("|")[7];
		
	if (MinorYes == false){
		//Added by Walex on 15-march2019 to grayed out some fields //
		document.getElementById("firstNam").disabled =true;
		document.getElementById("midName").disabled =true;
		document.getElementById("lastNam").disabled =true;
		document.getElementById("fullNam").disabled =true;
		document.getElementById("DOB").disabled =true;
		//document.getElementById("streetNo").disabled =true;		
		//minorSnrCitz(document.getElementById("DOB").value);
		document.getElementById("title").disabled =false;
		document.getElementById("biometId").disabled =true;			
		//Ended by Walex on 15-march2019 to display more fields //
	}else{
					document.getElementById("firstNam").disabled =false;
					document.getElementById("midName").disabled =false;
					document.getElementById("lastNam").disabled =false;
					document.getElementById("fullNam").disabled =false;
					document.getElementById("DOB").disabled =false;
					//document.getElementById("streetNo").disabled =false;
					document.getElementById("title").disabled =false;
					document.getElementById("biometId").disabled =false;
					//Ended by Walex on 10-Jun2019 to display more fields //
					
					document.getElementById("firstNam").value ="";
					document.getElementById("midName").value ="";
					document.getElementById("lastNam").value ="";
					document.getElementById("fullNam").value ="";
					document.getElementById("DOB").value ="";
					document.getElementById("streetNo").value ="";
					document.getElementById("title").value ="";
				}

		}

	}

	
    /*conn = GetConn();
    var url = "http://10.100.12.60:8080/BvnValidator.aspx?BvNumber=" + bvnCheck;
    conn.open("POST", url, true);
    conn.send();

    conn.onreadystatechange = function() {
        if (conn.readyState == 4) {
            if (conn.status == 200) {
                var resp = conn.responseText;
                var data = resp.indexOf('{');
                var data2 = resp.indexOf('}');
                var dataget = resp.substring(data - 1, data2 + 1);
				resp = "HandlerFetchDetails(" + dataget + ");";
                eval(resp);
                xmlDoc = conn.responseXML.xml;
				
            } else {
                alert("Could not Fetch BVN Details");
				return false;
            }
		} else {return false;}
    }*/
	}
//}

function changeDateFormat(dateToBeFormated){
	var months = {'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04', 'may': '05', 'jun': '06', 'jul': '07', 'aug': '08', 'sep': '09', 'oct': '10', 'nov': '11', 'dec': '12'};
	var arr = dateToBeFormated.split('-'); // split based on '-'
	var year = '20'+ arr[2] ; // add '20' before year
	var currYear = BODDate.substr(BODDate.length - 4);
	if (Number(year) > Number(currYear)){
		year = Number(year) - 100;
	}
	var month = months[arr[1].toLowerCase()] ; // convert month into lower
	var day = arr[0] ;
	if (day.length == 1) day = "0" + day; // add '0' if date is less then 10.
	return [day,month,year].join('-'); // join value according to format.
}

function DeDup(){
	var CreAcctFlgYes = document.getElementById("CreAcctFlgYes").checked;
	var CreAcctFlgNo = document.getElementById("CreAcctFlgNo").checked;
	var jtAcctFlgYes = document.getElementById("jtAcctFlgYes").checked;
	var jtAcctFlgNo = document.getElementById("jtAcctFlgNo").checked;
	if((CreAcctFlgYes == false) && (CreAcctFlgNo == false)){
		alert("Please indicate if account will be created or not");
		document.getElementById("CreAcctFlgYes").focus();
		return false;
	}
	if((jtAcctFlgYes == false) && (jtAcctFlgNo == false)){
		alert("Joint account must be indicated");
		document.getElementById("jtAcctFlgYes").focus();
		return false;
	}
	//alert("herealso");
	var funcCode = document.getElementById("funcCode").value;
	if (fnIsNull(funcCode)){
		alert("Enter the function code");
		document.getElementById("funcCode").focus();
		return false;
	}
	var acctTypR = document.getElementById("acctTypR").checked;
	var acctTypC = document.getElementById("acctTypC").checked;
	if(acctTypR ==false && acctTypC ==false){
		alert("Account Type must be entered")
		document.getElementById("acctTypR").focus();
		return false;
	}
	//var acctTyp;
	if (document.getElementById("acctTypR").checked == true){
		var fName = document.getElementById("firstNam").value.toUpperCase();
		var lName = document.getElementById("lastNam").value.toUpperCase();
		var midName = document.getElementById("midName").value.toUpperCase();
		var DOB = formatFIDates(document.getElementById("DOB").value,"A");
		var phonNum1 = document.getElementById("phonNum1").value
		var phonNum2 = document.getElementById("phonNum2").value
		var phonNum3 = document.getElementById("phonNum3").value
		var natId = document.getElementById("natId").value
		var biometId = document.getElementById("biometId").value

		document.getElementById("smsAlrtYes").checked = true;
		document.getElementById("eStatmntYes").checked = true;
		document.getElementById("mobBankYes").checked = true;
		//document.getElementById("intBankYes").checked = true;
		document.getElementById("emailAlrtYes").checked = true;
		document.getElementById("dbtCardYes").checked = true;
		document.getElementById("smsAlrtYes").readOnly = true;
		document.getElementById("mobBankYes").readOnly = true;
		//document.getElementById("intBankYes").readOnly = true;
		document.getElementById("emailAlrtYes").readOnly = true;
		document.getElementById("dbtCardYes").readOnly = true;
		document.getElementById("addrsearchYes").disabled = false;
		document.getElementById("addrsearchNo").disabled = false;
		//document.getElementById("corpsearchYes").disabled = true;
		//document.getElementById("corpsearchNo").disabled = true;
		if (fnIsNull(fName)){
			alert("Enter the customer's first name");
			document.getElementById("firstNam").focus();
				return false;
		}
		if (fnIsNull(biometId)){
			alert("Enter the BVN number");
			document.getElementById("biometId").focus();
			return false;
		}
		if (fnIsNull(lName)){
			alert("Enter the customer's last name");
			document.getElementById("lastNam").focus();
			return false;
		}
		if (fnIsNull(DOB) || DOB =="--"){
			alert("Enter the customer's date of birth");
			document.getElementById("DOB").focus();
			return false;
		}
		if (fnIsNull(phonNum1)){
			alert("Enter the customer's phone number one");
			document.getElementById("phonNum1").focus();
			return false;
		}
		if (fnIsNull(phonNum2)){
			alert("Enter the customer's phone number two");
			document.getElementById("phonNum2").focus();
			return false;
		}
		if (fnIsNull(phonNum3)){
			alert("Enter the customer's phone number three");
			document.getElementById("phonNum3").focus();
			return false;
		}
		acctTyp = "R";
	}else{
		var fName = "";
		var lName = document.getElementById("corpName").value.toUpperCase();
		var emailAdd = document.getElementById("emailAdd").value;
		var midName = "";
		var DOB = formatFIDates(document.getElementById("DOB").value,"A");
		var phonNum1 = "";
		var phonNum2 = "";
		var phonNum3 = "";
		var natId = "";
		var biometId = "";
		document.getElementById("addrsearchYes").disabled = false;
		document.getElementById("addrsearchNo").disabled = false;
		//document.getElementById("corpsearchYes").disabled = false;
		//document.getElementById("corpsearchNo").disabled = false;
		if (fnIsNull(lName)){
			alert("Enter the customer's corporate name");
			document.getElementById("corpName").focus();
			return false;
		}
		if (fnIsNull(DOB) || DOB =="--"){
			alert("Enter the customer's date of birth");
			document.getElementById("DOB").focus();
			return false;
		}
		if (fnIsNull(emailAdd)){
			alert("Enter the Customer's Email Address");
			document.getElementById("emailAdd").focus();
			return false;
		}
		acctTyp = "C";
	}
	var natId = document.getElementById("natId").value.toUpperCase();
	if (document.getElementById("acctTypR").checked == true){
		if (!fnIsNull(biometId) && !fnIsNull(fName) && !fnIsNull(lName) && !fnIsNull(DOB) && !fnIsNull(phonNum1) && !fnIsNull(phonNum2) && !fnIsNull(phonNum3)){
			if (phonNum1.charAt(0) != "+"){
				phonNum1 = "+" + phonNum1;
			}
			var pNum = phonNum1+"("+phonNum2+")"+phonNum3
		}else{
			return false;
		}
	}
		//=============Calling scripts
		var inputNameValues = "biometId|"+biometId+"|fName|"+fName+"|lName|"+lName+"|DOB|"+DOB+"|pNum|"+pNum+"|midName|"+midName+"|acctTyp|"+acctTyp+"|natId|"+natId;
		var outputNames = "xmlCnt,xmlOut";
		var scrName ="DEDUP.scr";
		//var scrName ="simDeDup.scr";
		var retVal = appFnExecuteScript(inputNameValues,outputNames,scrName,false);
		xmlCnt = Number(retVal.split("|")[3]);
		if(xmlCnt > 0){
			eraseCookie("TblCntRc");
			createCookie("TblCntRc","Y",1);
		}else{
			eraseCookie("TblCntRc");
			createCookie("TblCntRc","N",1);
		}
		if (xmlCnt == 0){alert("No record matches the above information");}
		addeTable(xmlCnt);
		var t,d;
		//var r=5;
		var r=1;
		for(t=1; t<=xmlCnt; t++){
			xmlOut = retVal.split("|")[r];
			var f=0;
			for(d=1; d<=6; d++){
				if (d == 1){
					document.getElementById("issDet"+t+d).innerHTML=(xmlOut.split("^")[f] == "NA")?"":'<a href="javascript:loadDetails('+t+''+d+');">'+xmlOut.split("^")[f]+'</a>';
				}else{
					if (d == 5){
						document.getElementById("issDet"+t+d).innerHTML=(xmlOut.split("^")[f] == "NA")?"":formatFIDates(xmlOut.split("^")[f],"B");
					}else{
						document.getElementById("issDet"+t+d).innerHTML=(xmlOut.split("^")[f] == "NA")?"":xmlOut.split("^")[f];
					}
				}
				f++
			}
			r=r+2;
		}
		deDupClicked = "Yes";
		document.getElementById("custQDE").disabled = false;
		//==============added by oge========================
		//alert(document.getElementById("custExstYes").value);
		//document.getElementById("custExstNo").checked = false;
		//document.getElementById("custExstNo").disabled = true;
		//alert("this");
		if(custExstYes = "Yes"){
		//alert("CIO");
		//document.getElementById("custExstNo").disabled = true;	
		document.getElementById("smsAlrtYes").checked = true;
		document.getElementById("mobBankYes").checked = true;
		//document.getElementById("intBankYes").checked = true;
		document.getElementById("emailAlrtYes").checked = true;
		document.getElementById("dbtCardYes").checked = true;
		document.getElementById("smsAlrtYes").disable = true;
		document.getElementById("mobBankYes").disable = true;
		//document.getElementById("intBankYes").disable = true;
		document.getElementById("emailAlrtYes").disable = true;
		document.getElementById("dbtCardYes").disable = true;
		}
		else
		{
		document.getElementById("custExstNo").disabled = false;	
		document.getElementById("custExstYes").disabled = false;
		document.getElementById("custExstYes").readOnly = false;
		document.getElementById("smsAlrtYes").checked = true;
		document.getElementById("eStatmntYes").checked = true;
		document.getElementById("mobBankYes").checked = true;
		//document.getElementById("intBankYes").checked = true;
		document.getElementById("emailAlrtYes").checked = true;
		document.getElementById("dbtCardYes").checked = true;
		document.getElementById("smsAlrtYes").disable = true;
		document.getElementById("mobBankYes").disable = true;
		//document.getElementById("intBankYes").disable = true;
		document.getElementById("emailAlrtYes").disable = true;
		document.getElementById("dbtCardYes").disable = true;

}
}
function formatFIDates(dates,a){
	var arr = dates.split('-');
	if (a == "A"){
		var day = arr[0];
		var month = arr[1];
		var year = arr[2];
		dates = [year,month,day].join('-');
	}else{
		var day = arr[2];
		var month = arr[1];
		var year = arr[0];
		dates = [day,month,year].join('-');
	}
	
	return dates;
}

function valNumeric(arg,id){
	if (!fnIsNull(arg)){
		state=arg.match(/^[0-9]+$/);
		if ((state==null)){
			alert("Enter a valid integer");
			document.getElementById(id).value = "";
			document.getElementById(id).focus();
			return false;
		}else{
			if (id == "phonNum3"){
				document.getElementById(id).value = arg.substr(0,19);
			}
			valPhoneNum();
		}
	}
}

function valPhoneNum(){
	var p1 = document.getElementById("phonNum1").value;
	var p2 = document.getElementById("phonNum2").value;
	var p3 = document.getElementById("phonNum3").value;
	if (!fnIsNull(p1) && !fnIsNull(p2) && !fnIsNull(p3)){
		var pAll = p1+"("+p2+")"+p3;
		if (pAll.length > 25){
			alert("Invalid Phone number as the number exceed limit");
		}
	}
}

function loadDetails(cifId){
	//alert("loadDetails");
	eraseCookie("TblCntRc");
	createCookie("TblCntRc","N",1);
	cifId = stripHtml(document.getElementById("issDet"+cifId).innerHTML.toUpperCase());
	cifIdSelected = cifId;
	//=============Calling scripts
		var inputNameValues = "cifId|"+cifId+"|step|0";
		var outputNames = "signId,imgAcCode,userImgAcCode,add1,pNo,eMail";
		var scrName ="simact002.scr";
		var retVal = appFnExecuteScript(inputNameValues,outputNames,scrName,false);
		add1 = (retVal.split("|")[1] == "NA")?"":retVal.split("|")[1];
		pNo = (retVal.split("|")[3] == "NA")?"":retVal.split("|")[3];
		eMail = (retVal.split("|")[5] == "NA")?"":retVal.split("|")[5];
		signId = retVal.split("|")[7];
		imgAcCode = retVal.split("|")[9];
		signIdNum = Number(retVal.split("|")[11]);
		acctAcCode = retVal.split("|")[13];
		userAcCode = retVal.split("|")[15];
		userImgAcCode = retVal.split("|")[17];
		if (retVal.split("|")[0] == "Error"){
			//alert(retVal.split("|")[1]);
			document.getElementById("custExstYes").checked = true;
			document.getElementById("custExstNo").disabled = true;
			//alert(cifIdSelected);
			//return false;
		}else{
			//to load multiple image link
			document.getElementById("imgAdd").value=add1;
			document.getElementById("imgAdd").readOnly=true;
			document.getElementById("imgPhn").value=pNo;
			document.getElementById("imgPhn").readOnly=true;
			document.getElementById("imgEmail").value=eMail;
			document.getElementById("imgEmail").readOnly=true;
			document.getElementById("signId").value=signId;
			document.getElementById("imgAcCode").value=imgAcCode;
			document.getElementById("userImgAcCode").value=userImgAcCode;
			document.getElementById("acctAcCode").value = (acctAcCode=="null")?"NA":acctAcCode;
			document.getElementById("userAcCode").value = (userAcCode=="null")?"NA":userAcCode;
			var det = signId.split('-')[0];
			document.getElementById("firstMan").value = det;
			totalMan = "data:image/png;base64,";
			fetchMandates(det,"A");
			document.getElementById("imgTag").src = totalMan;
			if (signIdNum > 1){
				createNav(signIdNum);
				
			}
		}
getCustDet(cifId);
//document.getElementById("custExstYes").checked = true;
//document.getElementById("custExstNo").disabled = true;
}

function stripHtml(html){
    var temporalDivElement = document.createElement("div");
    temporalDivElement.innerHTML = html;
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
}

//===== Mandate Fetch
function fetchMandates(acctNo, a){	
	var modal = 1;
	var acctSignid = "signid";
	var inputNameValues = "acctNo|"+acctNo+"|acctSignid|"+acctSignid+"|modal|"+modal;
	var outputNames = "imgStringOut_1,Err1,remarks";
	var scrName = "simplify_submit4.scr";
	var retVal2 = appFnExecuteScript(inputNameValues,outputNames,scrName,false);		
				
	//Err1 = retVal2.split("|")[5];
	Err1 = retVal2.split("|")[3];
	if((Err1 == "Invalid account number")||(Err1 == 'Invalid account number')){
		alert(Err1);
		fnClear();
		return false;
	}
	
	if ((Err1 == 'No Mandates found for the account')||(Err1 == "No Mandates found for the account")){
		alert(Err1);
		document.getElementById("imgTag").src = "";
	}
	if ((Err1 == 'View is restricted')||(Err1 == "View is restricted")){
		document.getElementById("imgTag").alt = "View is restricted";
	}
	remarks = retVal2.split("|")[1];
	
	//var r = 3;
	var r = 1;
	for(var i=1; i<=5000; i=i+2){
		
		imgStringOut_1 = "";
		imgStringOut_1 = retVal2.split("|")[r];
		
		totalMan = totalMan + imgStringOut_1
		r = r + 2;
	}
					
	var html = '<br>';
	var fieldName = "account_No";						
	var name = fieldName;	
	if (a == "A"){
		html = html + '<a id="zoomImg" href="javascript:callHlafcm(\'A\')">Zoom Image</a>';
	}else{
		html = html + '<a id="zoomImg" href="javascript:callHlafcm(\'B\')">Zoom Image</a>';
	}
	if (!acctNo == ''){ 
	document.getElementById("zoomImg").innerHTML = html;
	}
}

function imgContl(arg){
	var userImgAcCode = document.getElementById("userImgAcCode").value;
	var imgAcCode = document.getElementById("imgAcCode").value.split("-")[Number(arg)-1];
	var r = 0;
	var userImgAcCodeCheck = "";
	var imgAcCodeContl = "";
	for(var i=1; i<=userImgAcCode.length; i=i+2){
		userImgAcCodeCheck = userImgAcCode.split("@#$")[r];
		if (imgAcCode === userImgAcCodeCheck){
			imgAcCodeContl = "Y";
		}
		r = r + 1;
	}
	return imgAcCodeContl;
}
/*
function FncorpSearch(){
alert("coming");
alert(document.getElementById("acctTypC").value);
if((document.getElementById("acctTypC").checked == true ) || (document.getElementById("acctTypR").checked == true)){
var corpsearchYes = document.getElementById("corpsearchYes").checked;
alert(corpsearchYes);
if (corpsearchYes == true){
alert(objForm.corpName.value);	
		var corpsearchYes = document.getElementById("corpsearchYes").value;
			var fullNam = objForm.corpName.value;
			var acctTypC = document.getElementById("acctTypC").value;
			var streetNo = document.getElementById("streetNo").value;
			var CSsolId = document.getElementById("priSolId").value;
			var lclGovt = document.getElementById("city2").value;
			var statOfOrig = document.getElementById("state2").value;
			var nation2 = document.getElementById("nation2").value;
			var creatDate_ui = document.getElementById("creatDate_ui").value;
			alert(CSsolId);
			alert(acctTypC);
			var inputNameValues = "corpsearchYes|"+corpsearchYes+"|acctTypC|"+acctTypC+"|fullNam|"+fullNam+"|streetNo|"+streetNo+"|CSsolId|"+CSsolId+"|lclGovt|"+lclGovt+"|statOfOrig|"+statOfOrig+"|nation2|"+nation2+"|creatDate_ui|"+creatDate_ui;
			var outputNames = "search";
			var scrName = "simactSearch.scr";
			var retVal = appFnExecuteScript(inputNameValues,outputNames,scrName,false); 
			var search =retVal2.split("|")
				search = document.getElementById("corpsearch");
				start = 1;
  }
}
}
*/
function FnAddressSearch(){
//alert("hee");
//alert(document.getElementById("acctTypR").value);
if((document.getElementById("acctTypC").checked == true) || (document.getElementById("acctTypR").checked == true)){
//if((document.getElementById("acctTypR").checked == true)){
var addrsearchYes = document.getElementById("addrsearchYes").checked;
//alert(addrsearchYes);
var addrsearchNo = document.getElementById("addrsearchNo").checked;
//alert(addrsearchNo);

//if((document.getElementById("addrsearchYes").checked == true) || (document.getElementById("addrsearchNo").checked == false)){
//if (addrsearchYes == true){
//alert(document.getElementById("fullNam").value);
		//alert("hee01");
			var addrsearchYes = document.getElementById("addrsearchYes").value;
			var addrsearchNo = document.getElementById("addrsearchNo").value;
			//alert(addrsearchNo);
			var acctTypR = document.getElementById("acctTypR").value;
			var fullNam = document.getElementById("fullNam").value;
			var streetNo = document.getElementById("streetNo").value;
			var CSsolId = document.getElementById("priSolId").value;
			var lclGovt = objForm.city2.value;
			var statOfOrig = document.getElementById("state2").value;
			var nation2 = document.getElementById("nation2").value;
			var schmCode = document.getElementById("schmCode").value;
			var creatDate_ui = document.getElementById("creatDate_ui").value;
			//alert(CSsolId);
			//alert(acctTypR);
			var inputNameValues = "addrsearchYes|"+addrsearchYes+"|addrsearchNo|"+addrsearchNo+"|acctTypR|"+acctTypR+"|fullNam|"+fullNam+"|streetNo|"+streetNo+"|CSsolId|"+CSsolId+"|lclGovt|"+lclGovt+"|statOfOrig|"+statOfOrig+"|nation2|"+nation2+"|creatDate_ui|"+creatDate_ui+"|schmCode|"+schmCode;
			var outputNames = "search";
			var scrName = "simactSearch.scr";
			var retVal = appFnExecuteScript(inputNameValues,outputNames,scrName,false); 
			var search =retVal.split("|")
				search = document.getElementById("addrsearch");
				start = 1;
  //}
	
}
}
function createNav(value,acctNo){
	var fieldName = "account_No";						
	var name = fieldName;
	var links = "";
	if (value > 1){
	var links='<br><a href="javascript:prev()" style="visibility:hidden" id="prev">'+'<<'+'</a>';
	for (var i=0;i<=4;i++){
		if (i==0){
			links+='<a id="first" href="javascript:callHlafcm('+acctNo+')">'+(i+1)+'</a>'
		}else{

			links+='&nbsp;<a href='+"javascript:getValue("+(i)+")"+ ' id="'+navButs[i]+'">'+(i+1)+'</a>'
			}

			if ((i+1)==value) break;
		
	}
	if (value>5){
		links+='&nbsp;<a href="javascript:next()" id="next">'+'>>'+'</a>';
		links+='&nbsp;<span id="rem">'+value+'</span>';
	}
	}
	
	//SVS Fetch
	//var links = links + '<a target="'+window.name+'" id="svsLnk_' + fieldName + '" href="javascript:svsFetch('+acctNo+');">';
	//links = links + '<img src="../Renderer/images/' + applangcode + '/sig_new1.gif" width="16" height="16" border="0"></a>&nbsp;&nbsp; ';
							
	document.getElementById("navButtons").innerHTML=links;
}

function hideImgDiv(){
	document.getElementById("imgDiv").style.visibility="hidden";
}

function callHlafcm(a) 
{
	var imgAcCodeContl = imgContl(1);
	if (imgAcCodeContl == "Y"){
		
	if (a == "A"){
		var acctNo = document.getElementById("firstMan").value.toUpperCase();
	}else{
		//var acctNo = document.getElementById("chrgAcctNo").value.toUpperCase();
	}
	//var img = document.getElementById("imgTag").src;
	var acctSignid = "signId";
	var modal = 0;

        simplify_URL = "../../finbranch/custom/jsp/simplify_img.jsp?imgScr="+acctNo+"&acctSignid="+acctSignid+"&modal="+modal+"&remarks="+remarks;
        sUrl = simplify_URL;
		var retval = window.showModalDialog(sUrl, "", "dialogWidth:45;dialogHeight:35;status=no;toolbar=no;menubar=no;resizable=yes;maximize:yes;minimize:yes;");
	}else{
		alert("User access can not view this mandate");
	}
 }
 
 function fetchImage(arg){
	var signId = document.getElementById("signId").value.split("-")[Number(arg)-1];
	var imgAcCodeContl = imgContl(arg);
	var modal = 1;
		
	var acctSignid = "signid";
	if (imgAcCodeContl == "Y"){
        simplify_URL = "../../finbranch/custom/jsp/simplify_img.jsp?imgScr="+signId+"&acctSignid="+acctSignid+"&modal="+modal;
        sUrl = simplify_URL;
		var retval = window.showModalDialog(sUrl, "", "dialogWidth:45;dialogHeight:35;status=no;toolbar=no;menubar=no;resizable=yes;maximize:yes;minimize:yes;");
	}else{
			alert("User access can not view the mandate");
			return false;
	}

}

 function getValue(idValue){
	idValue=Number(idValue);
	var value=document.getElementById(navButs[idValue]).innerHTML;
	fetchImage(value);
}

function next(){
	var fifth=Number(document.getElementById("fifth").innerHTML);
	var size=Number(document.getElementById("rem").innerHTML);
	

	if ((fifth<size) &&(fifth!=0)){
		document.getElementById("prev").style.visibility="visible";
		var rem=size-fifth;
		for(j=0;j<=4;j++){
			
			value=Number(document.getElementById(navButs[j]).innerHTML);
			value=((value+5)>size)?"":value+5;
			document.getElementById(navButs[j]).innerHTML=value;
			if (value>=size){
				document.getElementById("next").style.visibility="hidden";
			}
		}
	}else{
		document.getElementById("next").style.visibility="hidden";
	}

	
}
function prev(){
	
	if (Number(document.getElementById("first").innerHTML)==1){
		document.getElementById("prev").style.visibility="hidden";
	}else if(Number(document.getElementById("first").innerHTML)>1){
		for(j=0;j<=4;j++){
			var value=Number(document.getElementById(navButs[j]).innerHTML);
			
			value=((value-5)>0)?value-5:Number(document.getElementById(navButs[j-1]).innerHTML)+1;;
			document.getElementById(navButs[j]).innerHTML=value;
			if (Number(document.getElementById("first").innerHTML)==1){
				document.getElementById("prev").style.visibility="hidden";
				document.getElementById("next").style.visibility="visible";
			}
		}
	}
}

function getCustDet(id){
	//alert("getCustDet");
	if (id == "custExstNo"){
		emptyFields();
	}else{
		if (fnIsNull(deDupClicked)){
			alert("Confirm whether customer exist, Click on DEDUP search");
			document.getElementById("custExstYes").checked = true;
			document.getElementById("custExstNo").checked = false;
			document.getElementById("dSearch").focus();
			//popRetDet("R");
			return false;
		}
		if (fnIsNull(cifIdSelected)){
			alert("select aleast one cif ID");
			document.getElementById("custExstYes").checked = true;
			document.getElementById("custExstNo").checked = false;
			return false;
		}else{
			if (document.getElementById("acctTypR").checked == true){
				popRetDet("R");
			}else{
				popRetDet("C");
				//popCorpDet("C");
			}
			document.getElementById("cifIdSelected").value=cifIdSelected;
			alert(document.getElementById("cifIdSelected").value);
			alert(cifIdSelected);
		if (cifIdSelected != "" ){
			document.getElementById("custExstYes").checked = true;
			document.getElementById("custExstNo").disabled = true;
			}
			else
			{
			document.getElementById("custExstNo").checked = true;
			document.getElementById("custExstYes").disabled = true;
			}


		}
	}
}

function popRetDet(r){ 
	alert("r"+r);
	//alert("popRetDet");
	//=============Calling scripts
		var inputNameValues = "cifId|"+cifIdSelected.toUpperCase()+"|step|"+r;
		var outputNames = "signId,imgAcCode,userImgAcCode,add1,pNo,eMail";
		var scrName ="simact002.scr";
		var retVal = appFnExecuteScript(inputNameValues,outputNames,scrName,false);
		//alert(retVal);
		var arr = retVal.split('|');
		document.getElementById("gender").value=(arr[1] == "NA")?"":arr[1]
		if (arr[3] != "NA"){
			if (arr[3] == "N"){
				document.getElementById("nonResIndNo").checked = true;
			}else{
				document.getElementById("nonResIndYes").checked = true;
			}
		}
		document.getElementById("cntryOfBth1").value=(arr[5] == "NA")?"":arr[5];
		document.getElementById("cntryOfBth2").value=(arr[7] == "NA")?"":arr[7];
		if (arr[9] != "NA"){
			if (arr[9] == "N"){
				document.getElementById("staffIndNo").checked = true;
			}else{
				document.getElementById("staffIndYes").checked = true;
			}
			valStaffInd(arr[9],'relMngrId');
		}
		document.getElementById("shrtNam").value=(arr[11] == "NA")?"":arr[11];
		document.getElementById("minorInd").value=(arr[13] == "NA")?"":arr[13];
		document.getElementById("occup").value=(arr[15] == "NA")?"":arr[15];
		document.getElementById("natOfBiz").value=(arr[17] == "NA")?"":arr[17];
		//document.getElementById("acctCcy").value=(arr[19] == "NA")?"":arr[19];
		document.getElementById("title").value=(arr[21] == "NA")?"":arr[21];
		document.getElementById("cntryOfRes1").value=(arr[23] == "NA")?"":arr[23];
		document.getElementById("cntryOfRes2").value=(arr[25] == "NA")?"":arr[25];
		document.getElementById("rmId").value=(arr[27] == "NA")?"":arr[27];
		document.getElementById("snrCitiz").value=(arr[29] == "NA")?"":arr[29];
		if (arr[31] != "NA"){
			if (arr[31] == "N"){
				document.getElementById("jtAcctFlgNo").checked = true;
			}else{
				document.getElementById("jtAcctFlgYes").checked = false;
			}
		}
		document.getElementById("turnNonRes_ui").value=(arr[33] == "NA")?"":arr[33];
		document.getElementById("usPers").value=(arr[35] == "NA")?"":arr[35];
		document.getElementById("statOfOrig").value=(arr[37] == "NA")?"":arr[37];
		if (arr[39] != "NA"){
			if (arr[39] == "N"){
				document.getElementById("PEPFlgNo").checked = true;
			}else{
				document.getElementById("PEPFlgYes").checked = true;
			}
		}
		document.getElementById("lclGovt").value=(arr[41] == "NA")?"":arr[41];
		document.getElementById("PEPRltnshp").value=(arr[43] == "NA")?"":arr[43];
		document.getElementById("KYCInd").value=(arr[45] == "NA")?"":arr[45];
		document.getElementById("otherRltnshp").value=(arr[47] == "NA")?"":arr[47];
		document.getElementById("namOfPEP").value=(arr[49] == "NA")?"":arr[49];
		document.getElementById("segmnt1").value=(arr[51] == "NA")?"":arr[51];
		document.getElementById("segmnt2").value=(arr[53] == "NA")?"":arr[53];
		if (arr[51] != "NA"){
			subSegmtList(arr[51]);
		}
		document.getElementById("subSegmnt").value=(arr[55] == "NA")?"":arr[55];
		if (arr[57] != "NA"){
			if (arr[57] == "N"){
				document.getElementById("intBankNo").checked = true;
			}else{
				document.getElementById("intBankYes").checked = true;
			}
		}
		if (arr[59] != "NA"){
			if (arr[59] == "N"){
				document.getElementById("smsAlrtNo").checked = false;
			}else{
				document.getElementById("smsAlrtYes").checked = true;
			}
		}
			//if (arr[159] != "NA"){
			//if (arr[159] == "N"){
				//document.getElementById("corpsearchNo").checked = true;
			//}else{
				//document.getElementById("corpsearchYes").checked = false;
			//}
		//}
		if (arr[160] != "NA"){
			if (arr[160] == "N"){
				document.getElementById("addrsearchNo").checked = true;
			}else{
				document.getElementById("addrsearchYes").checked = false;
			}
		}
		document.getElementById("streetNo").value=(arr[61] == "NA")?"":arr[61];
		document.getElementById("city1").value=(arr[63] == "NA")?"":arr[63];
		document.getElementById("city2").value=(arr[65] == "NA")?"":arr[65];
		document.getElementById("state1").value=(arr[67] == "NA")?"":arr[67];
		document.getElementById("state2").value=(arr[69] == "NA")?"":arr[69];
		document.getElementById("pstCode").value=(arr[71] == "NA")?"":arr[71];
		document.getElementById("cntry1").value=(arr[73] == "NA")?"":arr[73];
		document.getElementById("cntry2").value=(arr[75] == "NA")?"":arr[75];
		document.getElementById("addType").value=(arr[77] == "NA")?"":arr[77];
		document.getElementById("typOfId").value=(arr[79] == "NA")?"":arr[79];
		if (arr[79] != "NA"){
			loadIDCode(arr[79]);
		}
		document.getElementById("typOfCode").value=(arr[71] == "NA")?"":arr[81];
		document.getElementById("plcOfIssu").value=(arr[83] == "NA")?"":arr[83];
		document.getElementById("plcOfIssu2").value=(arr[85] == "NA")?"":arr[85];
		document.getElementById("regNo").value=(arr[87] == "NA")?"":arr[87];
		document.getElementById("expDate_ui").value=(arr[89] == "NA")?"":arr[89];
		document.getElementById("issuAuthort").value=(arr[91] == "NA")?"":arr[91];
		//document.getElementById("plcOfIssuDesc").value=(arr[93] == "NA")?"":arr[93];
		document.getElementById("maritStat").value=(arr[95] == "NA")?"":arr[95];
		document.getElementById("nation1").value=(arr[97] == "NA")?"":arr[97];
		if (arr[97] != "NA"){valNation(arr[97]);}
		//document.getElementById("nation2").value=(arr[99] == "NA")?"":arr[99];
		//document.getElementById("residenceCoutry").value=(arr[101] == "NA")?"":arr[101];
		document.getElementById("empType").value=(arr[103] == "NA")?"":arr[103];
		document.getElementById("issuDate_ui").value=(arr[105] == "NA")?"":arr[105];
		document.getElementById("priSolId").value=(arr[107] == "NA")?"":arr[107];
		document.getElementById("solName").value=(arr[109] == "NA")?"":arr[109];
		if (r == "C"){
			//document.getElementById("solName").value=(arr[111] == "NA")?"":arr[111];
			document.getElementById("sect").value=(arr[113] == "NA")?"":arr[113];
			//document.getElementById("solName").value=(arr[115] == "NA")?"":arr[115];
			document.getElementById("subSect").value=(arr[117] == "NA")?"":arr[117];
			//document.getElementById("solName").value=(arr[119] == "NA")?"":arr[119];
			//document.getElementById("solName").value=(arr[121] == "NA")?"":arr[121];
			document.getElementById("cntryOfInc").value=(arr[123] == "NA")?"":arr[123];
			document.getElementById("avgAnnIncm").value=(arr[125] == "NA")?"":arr[125];
			document.getElementById("taxIdNo").value=(arr[127] == "NA")?"":arr[127];
			document.getElementById("acctOfRef").value=(arr[129] == "NA")?"":arr[129];
			document.getElementById("rmId").value=(arr[131] == "NA")?"":arr[131];
						
			document.getElementById("title").value = "";
			document.getElementById("cntryOfBth1").value=(arr[123] == "NA")?"":arr[123];
			if (arr[123] != "NA"){
				valCntry(arr[123],'cntryOfBth1');
			}
			if (arr[133] == "NA"){
				document.getElementById("eStatmntNo").checked = true;
				document.getElementById("eStatmntYes").checked = false;
			}else{
				document.getElementById("eStatmntNo").checked = false;
				document.getElementById("eStatmntYes").checked = true;
			}
			document.getElementById("freq").value=(arr[133] == "NA")?"":arr[133];
			document.getElementById("riskRtg").value=(arr[135] == "NA")?"":arr[135];
			var actCCY = (arr[137].slice(-1) == ",")?arr[137].substring(0,arr[137].length-1):arr[137];
			splitCCY(actCCY);
		}else{
			if (arr[111] == "NA"){
				document.getElementById("eStatmntNo").checked = true;
				document.getElementById("eStatmntYes").checked = false;
			}else{
				document.getElementById("eStatmntNo").checked = false;
				document.getElementById("eStatmntYes").checked = true;
			}
			document.getElementById("freq").value=(arr[111] == "NA")?"":arr[111];
			document.getElementById("riskRtg").value=(arr[113] == "NA")?"":arr[113];
			var actCCY = (arr[115].slice(-1) == ",")?arr[115].substring(0,arr[115].length-1):arr[115];
			splitCCY(actCCY);
		}
}

function gsimact_det_pre_ONCLICK(obj){
	var funcCode = document.getElementById("funcCode").value;
	if (obj.id == 'Cancel') {
		document.forms[0].reset();
		doSubmit("clear");
		return false;
	}
	
	if (obj.name == "Submit" || obj.name == "Validate") {
		if (fnIsNull(funcCode)){
			alert("Enter the function code");
			document.getElementById("funcCode").focus();
			return false;
		}
		
		if (funcCode == "M" || funcCode == "J") {	
			///---------------------------
			var acctTypR = document.getElementById("acctTypR").value;
			var acctTypC = document.getElementById("acctTypC").value;
			var biometId = document.getElementById("biometId").value;
			var corpName = document.getElementById("corpName").value;
			var title = document.getElementById("title").value;
			var DOB = document.getElementById("DOB").value;
			var emailAdd = document.getElementById("emailAdd").value;
			var phonNum1 = document.getElementById("phonNum1").value;
			var phonNum2 = document.getElementById("phonNum2").value;
			var phonNum3 = document.getElementById("phonNum3").value;
			//new for concession kanmi
			var conleg = document.getElementById("conleg").value;
			var concard = document.getElementById("concard").value;
			var conchq = document.getElementById("conchq").value;
			var noOfLeaves = document.getElementById("noOfLeaves").value;
			//var cheqb = document.getElementById("cheqb").value;
			var cheqbY = document.getElementById("cheqbY").value;
			var cheqbN = document.getElementById("cheqbN").value;
			//var cardiss = document.getElementById("cardiss").value;
			var cardissY = document.getElementById("cardissY").value;
			var cardissN = document.getElementById("cardissN").value;
			//var legal = document.getElementById("legal").value;
			var legalY = document.getElementById("legalY").value;
			var legalN = document.getElementById("legalN").value;
			//var chqreq = document.getElementById("chqreq").value;
			var chqreqY = document.getElementById("chqreqY").value;
			var chqreqN = document.getElementById("chqreqN").value;
			//new for concession kanmi
			var natId = document.getElementById("natId").value;
			var lclGovt = document.getElementById("lclGovt").value;
			var cntryOfBth1 = document.getElementById("cntryOfBth1").value;
			var cntryOfBth2 = document.getElementById("cntryOfBth2").value;
			var cntryOfRes1 = document.getElementById("cntryOfRes1").value;
			var cntryOfRes2 = document.getElementById("cntryOfRes2").value;
			var acctCcy = document.getElementById("acctCcy").value;
			var nation1 = document.getElementById("nation1").value;
			var nation2 = document.getElementById("nation2").value;
			var jtAcctFlgYes = document.getElementById("jtAcctFlgYes").value;
			var jtAcctFlgNo = document.getElementById("jtAcctFlgNo").value;
			var gender = document.getElementById("gender").value;
			var nonResIndYes = document.getElementById("nonResIndYes").value;
			var nonResIndNo = document.getElementById("nonResIndNo").value;
			var maritStat = document.getElementById("maritStat").value;
			var turnNonRes_ui = document.getElementById("turnNonRes_ui").value;
			var staffIndYes = document.getElementById("staffIndYes").value;
			var staffIndNo = document.getElementById("staffIndNo").value;
			var relMngrId = document.getElementById("relMngrId").value;
			var shrtNam = document.getElementById("shrtNam").value;
			
			var addType = document.getElementById("addType").value;
			var streetNo = document.getElementById("streetNo").value;
			var occup = document.getElementById("occup").value;
			var city1 = document.getElementById("city1").value;
			var city2 = document.getElementById("city2").value;
			var empType = document.getElementById("empType").value;
			var state1 = document.getElementById("state1").value;
			var state2 = document.getElementById("state2").value;
			var segmnt1 = document.getElementById("segmnt1").value;
			var segmnt2 = document.getElementById("segmnt2").value;
			var cntry1 = document.getElementById("cntry1").value;
			var cntry2 = document.getElementById("cntry2").value;
			var subSegmnt = document.getElementById("subSegmnt").value;
			var pstCode = document.getElementById("pstCode").value;
			var natOfBiz = document.getElementById("natOfBiz").value;
			
			var typOfId = document.getElementById("typOfId").value;
			var typOfCode = document.getElementById("typOfCode").value;
			var taxIdNo = document.getElementById("taxIdNo").value;
			var taxIdNo2 = document.getElementById("taxIdNo2").value;
			var plcOfIssu = document.getElementById("plcOfIssu").value;
			var issuDate_ui = document.getElementById("issuDate_ui").value;
			var expDate_ui = document.getElementById("expDate_ui").value;
			var issuAuthort = document.getElementById("issuAuthort").value;
			var regNo = document.getElementById("regNo").value;
			var rmId = document.getElementById("rmId").value;
			var dbtCardYes = document.getElementById("dbtCardYes").value;
			var dbtCardNo = document.getElementById("dbtCardNo").value;
			var prefNam = document.getElementById("prefNam").value;
			
			var schmCode = document.getElementById("schmCode").value;
			var GSHCode = document.getElementById("GSHCode").value;
			var acctOfRef = document.getElementById("acctOfRef").value;
			var isAcctDocCompYes = document.getElementById("isAcctDocCompYes").value;
			var isAcctDocCompNo = document.getElementById("isAcctDocCompNo").value;
			var cntryOfInc = document.getElementById("cntryOfInc").value;
			
			var minorInd = document.getElementById("minorInd").value;
			var minRelnCifId = document.getElementById("minRelnCifId").value;
			var minReln = document.getElementById("minReln").value;
			var minRelnGDCode = document.getElementById("minRelnGDCode").value;
			var riskRtg = document.getElementById("riskRtg").value;
			var acctCcy2 = document.getElementById("acctCcy2").value;
			var KYCInd = document.getElementById("KYCInd").value;
			var avgAnnIncm = document.getElementById("avgAnnIncm").value;
			var issuDate = document.getElementById("issuDate").value;
			var issuAuthort = document.getElementById("issuAuthort").value;
			var solId = document.getElementById("solId").value;
			var schmCode = document.getElementById("schmCode").value;
			var PartyCif = document.getElementById("PartyCif").value;
			var salaryAcctFlgYes = document.getElementById("salaryAcctFlgYes").checked;
			var salaryAcctFlgNo = document.getElementById("salaryAcctFlgNo").checked;
			var OrgNm = document.getElementById("OrgNm").value;
			var PartyCnt = document.getElementById("PartyCnt").value;
			var NwOrgNm = document.getElementById("NwOrgNm").value;
			var firstNam = document.getElementById("firstNam").value.toUpperCase();
			var midName = document.getElementById("midName").value.toUpperCase();
			var lastNam = document.getElementById("lastNam").value.toUpperCase();
			var Minor = document.getElementById("Minor").value;
			
			if (fnIsNull(DOB)){
				alert("Please provide Date of Birth/Incorporation Date");
				document.getElementById("DOB").focus();
				return false;
			}
			if (fnIsNull(Minor)){
				alert("Please indicate if customer is minor or not");
				document.getElementById("MinorYes").focus();
				return false;
			}
			if(document.getElementById("acctTypR").checked == true){
				if (fnIsNull(firstNam)){
					alert("Please provide First Name");
					document.getElementById("firstNam").focus();
					return false;
				}
				if (fnIsNull(lastNam)){
					alert("Please provide Last Name");
					document.getElementById("lastNam").focus();
					return false;
				}
			}
		
			if(document.getElementById("MinorYes").checked == true){
				if (fnIsNull(minRelnCifId)){
					alert("Please add related cif to this Minor account");
					document.getElementById("minRelnCifId").focus();
					return false;
				}
			}
			if(document.getElementById("salaryAcctFlgYes").checked == true){
				if((OrgNm.toUpperCase() == "OTHER") || (OrgNm.toUpperCase() == "OTHERS")){
					if(fnIsNull(NwOrgNm)){
						alert("Please provide the new organization name");
						document.getElementById("NwOrgNm").focus();
						return false;
					}
				}
			}
			if(document.getElementById("jtAcctFlgYes").checked == true){
				if(!fnIsNull(PartyCnt)){
					if(PartyCnt <= 1){
						alert("Joint account must have more than one signatory");
						document.getElementById("add").focus();
						return false;
					}
				}
			}
			if(document.getElementById("acctTypR").checked == true){
				if(document.getElementById("MinorNo").checked == true){
					if(document.getElementById("jtAcctFlgNo").checked == true){
					
						if (fnIsNull(biometId)){
							alert("Please provide the biometric number");
							document.getElementById("biometId").focus();
							return false;
						}
					}
				}
			}
			if(document.getElementById("acctTypR").checked == true){
				if(document.getElementById("MinorNo").checked == true){
					var inputNameValues = "DOB|"+DOB;
					var outputNames = "DOBYear,DOBMonth,DOBDay";
					var scrName = "simactGetAge.scr";
					var retVal2 = appFnExecuteScript(inputNameValues,outputNames,scrName,false);					
					var segmtVals =retVal2.split("|");
					document.getElementById("DOBYear").value = retVal2.split("|")[1];
					document.getElementById("DOBMonth").value = retVal2.split("|")[3];
					document.getElementById("DOBDay").value = retVal2.split("|")[5];
					
					var age = document.getElementById("DOBYear").value;
					
					if(age < 18){
						alert("For none Minor account, customer age must be above 18 years");
						document.getElementById("DOB").focus();
						return false;
					}
				}
			}
			if(document.getElementById("jtAcctFlgYes").checked == true){
				if (fnIsNull(PartyCif)){
					alert("Please add related cif to this joint account");
					document.getElementById("add").focus();
					return false;
				}
			}
		
			if(solId != "0999"){
				if((schmCode.toUpperCase() == "SBGSA") || (schmCode.toUpperCase() == "CALLG") || (schmCode.toUpperCase() == "CALDG") || (schmCode.toUpperCase() == "SGBND") || (schmCode.toUpperCase() == "AFUAN") || (schmCode.toUpperCase() == "AFUAS") || (schmCode.toUpperCase() == "TLUAS") || (schmCode.toUpperCase() == "CGREM") || (schmCode.toUpperCase() == "TLUAN") || (schmCode.toUpperCase() == "SGVBD") || (schmCode.toUpperCase() == "SGBD2") || (schmCode.toUpperCase() == "CAMCC") || (schmCode.toUpperCase() == "TAXCO") || (schmCode.toUpperCase() == "CAPUB") || (schmCode.toUpperCase() == "PUBRD") || (schmCode.toUpperCase() == "SAC72") || (schmCode.toUpperCase() == "CASPS") || (schmCode.toUpperCase() == "CAC07")){
					alert("GOVERNMENT ACCOUNT AND COLLECTION ACCOUNT CAN ONLY BE OPEN AT HEAD OFFICE");
					document.getElementById("schmCode").focus();
					return false;
				}
			}
		
			var TblCntRc = readCookie("TblCntRc");
			if (TblCntRc == "Y") {
				alert("Please Select A Cif As customer already have existing CIF");
				//document.getElementById("lclGovt").focus();
				return false;
			}
			
	if (document.getElementById("acctTypC").checked == true) {
		if(avgAnnIncm == ""){
			alert("Please Select Avg. Annual Income");
			document.getElementById("avgAnnIncm").focus();
			return false;
		}
		if(regNo == ""){
			alert("Please Provide the RC No");
			document.getElementById("regNo").focus();
			return false;
		}
		if(issuDate_ui == ""){
			alert("Please Provide Document Issue date");
			document.getElementById("issuDate_ui").focus();
			return false;
		}
		if(issuAuthort == ""){
			alert("Please Provide Issuing Authority");
			document.getElementById("issuAuthort").focus();
			return false;
		}
		if(typOfCode == "CPASS"){
			if(expDate_ui == ""){
				alert("Please Provide Expiry Date");
				document.getElementById("expDate_ui").focus();
				return false;
			}
		}
	}
	if (document.getElementById("acctTypR").checked == true) {
		/*if (minorInd == "N"){
			if (fnIsNull(biometId)){
				alert("Enter the Biometric Id");
				document.getElementById("biometId").focus();
				return false;
			}
		}*/
		if((salaryAcctFlgNo == false) && (salaryAcctFlgYes == false)){
			alert("Please indicate if account is a salary account");
			document.getElementById("salaryAcctFlgYes").focus();
			return false;
		}
		if((salaryAcctFlgYes == true) && (fnIsNull(OrgNm))){
			alert("Please provide the organization");
			document.getElementById("salaryAcctFlgYes").focus();
			return false;
		}
		if (fnIsNull(lclGovt)){
			alert("Enter the Local Government");
			document.getElementById("lclGovt").focus();
			return false;
        }
		if (fnIsNull(title)){
			alert("Enter the Title");
			document.getElementById("title").focus();
			return false;
		}
		if (fnIsNull(DOB)){
			alert("Enter the date of birth");
			document.getElementById("DOB").focus();
			return false;
		}
		if (!fnIsNull(emailAdd)){
			if (validateEmail(emailAdd) == "false"){
				alert("Invalid Email address");
				document.getElementById("emailAdd").focus();
				return false;
			}
		}
		//if (fnIsNull(emailAdd)){
		//	alert("Enter the Email Address");
		//	document.getElementById("emailAdd").focus();
		//	return false;
		//}else{
		//	if (validateEmail(emailAdd) == "false"){
		//		alert("Invalid Email address");
		//		document.getElementById("emailAdd").focus();
		//		return false;
		//	}
		//}
		if (fnIsNull(phonNum1)){
			alert("Enter the country dialing code");
			document.getElementById("phonNum1").focus();
			return false;
		}else{
			if (valNumeric(phonNum1,phonNum1) == "false"){
				alert("Field must be numeric");
				document.getElementById("phonNum1").focus();
				return false;
			}
		}
		if (fnIsNull(phonNum2)){
			alert("This field should not be empty ");
			document.getElementById("phonNum2").focus();
			return false;
		}else{
			if (valNumeric(phonNum2,phonNum2) == "false"){
				alert("Field must be numeric");
				document.getElementById("phonNum2").focus();
				return false;
			}
		}
		if (fnIsNull(phonNum3)){
			alert("Enter the Phone Number");
			document.getElementById("phonNum3").focus();
			return false;
		}else{
			if (valNumeric(phonNum3,phonNum3) == "false"){
				alert("Field must be numeric");
				document.getElementById("phonNum3").focus();
				return false;
			}
		}
		//if (fnIsNull(natId)){
		//	alert("Enter the National Id");
		//	document.getElementById("natId").focus();
		//	return false;
		//}
			
		if (fnIsNull(cntryOfBth1)){
			alert("Enter the country of birth");
			document.getElementById("cntryOfBth1").focus();
			return false;
		}
		if (fnIsNull(cntryOfBth2)){
			alert("Enter the country of birth");
			document.getElementById("cntryOfBth2").focus();
			return false;
		}
		if (fnIsNull(cntryOfRes1)){
			alert("Country of Residence should not be empty");
			document.getElementById("cntryOfRes1").focus();
			return false;
		}
		if (fnIsNull(cntryOfRes2)){
			alert("Country of Residence should not be empty");
			document.getElementById("cntryOfRes2").focus();
			return false;
		}
		if (fnIsNull(acctCcy) && fnIsNull(acctCcy2)){
			alert("Select the account currency");
			document.getElementById("acctCcy").focus();
			return false;
		}else{
			if (!fnIsNull(acctCcy)){
				addCrncyCode();
			}
		}
		if (fnIsNull(nation1)){
			alert("Nationality should not be empty");
			document.getElementById("nation1").focus();
			return false;
		}
		if (fnIsNull(nation2)){
			alert("Nationality should not be empty");
			document.getElementById("nation2").focus();
			return false;
		}
		if ((document.getElementById("jtAcctFlgYes").checked == false) && (document.getElementById("jtAcctFlgNo").checked == false)){
			alert("Joint account flag should be selected");
			document.getElementById("jtAcctFlgYes").focus();
			return false;
		}
		if (fnIsNull(gender)){
			alert("Select the Gender");
			document.getElementById("gender").focus();
			return false;
		}
		if ((document.getElementById("nonResIndYes").checked == false) && (document.getElementById("nonResIndNo").checked == false)){
			alert("Nonresident Indicator should be selected");
			document.getElementById("nonResIndYes").focus();
			return false;
		}else{
			if (document.getElementById("nonResIndYes").checked == true){
				if (fnIsNull(turnNonRes_ui)){
					alert("This field should not be empty");
					document.getElementById("turnNonRes_ui").focus();
					return false;
				}
				document.getElementById("turnNonRes_ui").disabled = false;
			}else{
				document.getElementById("turnNonRes_ui").disabled = true;
			}
		}
		if (fnIsNull(maritStat)){
			alert("Select the Marital Status");
			document.getElementById("maritStat").focus();
			return false;
		}
		if (fnIsNull(riskRtg)){
			alert("Select the Risk rating");
			document.getElementById("riskRtg").focus();
			return false;
		}
		if ((document.getElementById("staffIndYes").checked == false) && (document.getElementById("staffIndNo").checked == false)){
			alert("Staff Indicator should be selected");
			document.getElementById("staffIndYes").focus();
			return false;
		}else{
			if (document.getElementById("staffIndYes").checked == true){
				if (fnIsNull(relMngrId)){
					alert("Enter the Employee Id");
					document.getElementById("relMngrId").focus();
					return false;
				}
				document.getElementById("relMngrId").disabled = false;
			}else{
				document.getElementById("relMngrId").disabled = true;
			}
		}
		if (fnIsNull(shrtNam)){
			alert("This field should not be empty");
			document.getElementById("shrtNam").focus();
			return false;
		}
		
		if (fnIsNull(addType)){
			alert("Select the Address Type");
			document.getElementById("addType").focus();
			return false;
		}
		if (fnIsNull(streetNo)){
			alert("Enter the address");
			document.getElementById("streetNo").focus();
			return false;
		}
		if (fnIsNull(occup)){
			alert("Select the Occupation");
			document.getElementById("occup").focus();
			return false;
		}
		if (fnIsNull(city1)){
			alert("Enter the city");
			document.getElementById("city1").focus();
			return false;
		}
		if (fnIsNull(city2)){
			alert("Enter the city");
			document.getElementById("city2").focus();
			return false;
		}
		if (fnIsNull(empType)){
			alert("Select the Employment Type");
			document.getElementById("empType").focus();
			return false;
		}
		if (fnIsNull(state1)){
			alert("Enter the state");
			document.getElementById("state1").focus();
			return false;
		}
		if (fnIsNull(state2)){
			alert("Enter the state");
			document.getElementById("state2").focus();
			return false;
		}
		if (fnIsNull(segmnt1)){
			alert("Enter the segment");
			document.getElementById("segmnt1").focus();
			return false;
		}
		if (fnIsNull(segmnt2)){
			alert("Enter the segment");
			document.getElementById("segmnt2").focus();
			return false;
		}
		if (fnIsNull(cntry1)){
			alert("Enter the country");
			document.getElementById("cntry1").focus();
			return false;
		}
		if (fnIsNull(cntry2)){
			alert("Enter the country");
			document.getElementById("cntry2").focus();
			return false;
		}
		if (fnIsNull(subSegmnt)){
			alert("select the subsegment");
			document.getElementById("subSegmnt").focus();
			return false;
		}
		if (fnIsNull(pstCode)){
			alert("Enter the Postal Code");
			document.getElementById("pstCode").focus();
			return false;
		}
		//if ((document.getElementById("acctTypR").checked == true) && (document.getElementById("acctTypC").checked == false) && (fnIsNull(natOfBiz))){
		//	alert("Select the Nature of Business");
		//	document.getElementById("natOfBiz").focus();
		//	return false;
		//}
		
		//exception for low KYC
		if (KYCInd != "LOW"){
			if (fnIsNull(typOfId)){
				alert("Select the Type of Id");
				document.getElementById("typOfId").focus();
				return false;
			}
			if (fnIsNull(typOfCode)){
				alert("Enter the Type of Code");
				document.getElementById("typOfCode").focus();
				return false;
			}
			//if (fnIsNull(taxIdNo)){
				//alert("Enter the Customer/Tax ID No");
				//document.getElementById("taxIdNo").focus();
				//return false;
			//}
			//if (document.getElementById("acctTypC").checked == false) {
			if (fnIsNull(plcOfIssu)){
				alert("Enter the Place of Issue");
				document.getElementById("plcOfIssu").focus();
				return false;
			}
			//}
			//if (document.getElementById("acctTypC").checked == false) {
			if (fnIsNull(issuDate_ui)){
				alert("Enter the Issue Date");
				document.getElementById("issuDate_ui").focus();
				return false;
			}
			//}
			//if (fnIsNull(expDate_ui)){
			//	alert("Enter the Expiry Date");
			//	document.getElementById("expDate_ui").focus();
			//	return false;
			//}
			//if (document.getElementById("acctTypC").checked == false) {
			if (fnIsNull(issuAuthort)){
				alert("Enter the Issuing Authority");
				document.getElementById("issuAuthort").focus();
				return false;
			}
			//}
			//if (fnIsNull(regNo)){
			//	alert("Enter the Registration Number");
			//	document.getElementById("regNo").focus();
			//	return false;
			//}
		}
		if ((document.getElementById("intBankYes").checked == false) && (document.getElementById("intBankNo").checked == false)){
			alert("Internet banking flag should be selected");
			document.getElementById("intBankYes").focus();
			return false;
		}
		//if ((document.getElementById("corpsearchYes").checked == false) && (document.getElementById("corpsearchNo").checked == false)){
			//alert("Corporate Search flag should be selected");
			//document.getElementById("corpsearchYes").focus();
			//return false;
		//}
		if ((document.getElementById("addrsearchYes").checked == false) && (document.getElementById("addrsearchNo").checked == false)){
			alert("Address Search flag should be selected");
			document.getElementById("addrsearchYes").focus();
			return false;
		}
		if ((document.getElementById("custExstYes").checked == false) && (document.getElementById("custExstNo").checked == false)){
				//document.getElementById("custExstNo").disabled = true;
				//document.getElementById("custExstNo").checked = true;
				//alert("SELECT CIF ID IF EXIST AND CLICK YES, ELSE SUBMIT!!");
				//document.getElementById("custExstYes").focus();
				//return false;
		}
    // Added by Njideka 05-10-2018
        if ((document.getElementById("mobBankYes").checked == false) && (document.getElementById("mobBankNo").checked == false)){
               alert("Mobile banking flag should be selected");
                document.getElementById("mobBankYes").focus();
                return false;
  }
 // end 
		if (minorInd == "Y"){
			if (fnIsNull(minRelnCifId)){
				alert("Enter the minor Relationship CIF ID");
				document.getElementById("minRelnCifId").focus();
				return false;
			}
			if (fnIsNull(minReln)){
				alert("Enter the minor relationship");
				document.getElementById("minReln").focus();
				return false;
			}
			if (fnIsNull(minRelnGDCode)){
				alert("Enter the minor relationship Guard Code");
				document.getElementById("minRelnGDCode").focus();
				return false;
			}
		}
		if (fnIsNull(rmId)){
			alert("Enter the RM Id");
			document.getElementById("rmId").focus();
			return false;
		}
		//if ((fnIsNull(dbtCardNo)) && (!fnIsNull(dbtCardYes)) && (fnIsNull(prefNam))){
		//	alert("Enter the Preferred Name on Card");
		//	document.getElementById("prefNam").focus();
		//	return false;
		//}
		
		if (document.getElementById("acctHold").checked == true){
			if (fnIsNull(schmCode)){
				alert("Enter the Scheme Code");
				document.getElementById("schmCode").focus();
				return false;
			}
			if (fnIsNull(GSHCode)){
				alert("Enter the GL Sub head code");
				document.getElementById("GSHCode").focus();
				return false;
			}
			//if (fnIsNull(acctOfRef)){
			//	alert("Enter the Account of referral");
			//	document.getElementById("acctOfRef").focus();
			//	return false;
			//}
			if ((document.getElementById("isAcctDocCompYes").checked == false) && (document.getElementById("isAcctDocCompNo").checked == false)){
				alert("Answer the Account Documentation question");
				document.getElementById("isAcctDocCompYes").focus();
				return false;
			}
			//if ((document.getElementById("corpsearchYes").checked == false) && (document.getElementById("corpsearchNo").checked == false)){
				//alert("Corporate Search flag should be selected");
				//document.getElementById("corpsearchYes").focus();
				//return false;
			//}
			if ((document.getElementById("addrsearchYes").checked == false) && (document.getElementById("addrsearchNo").checked == false)){
				alert("Address Search flag should be selected");
				document.getElementById("addrsearchYes").focus();
				return false;
			}
			if ((document.getElementById("custExstYes").checked == false) && (document.getElementById("custExstNo").checked == false)){
				//document.getElementById("custExstNo").disabled = true;
				//document.getElementById("custExstNo").checked = true;
				//alert("SELECT CIF ID IF EXIST AND CLICK YES, ELSE SUBMIT!!");
				//document.getElementById("custExstYes").focus();
				//return false;
			}


		}
			
		}else{
			if (fnIsNull(corpName)){
				alert("Enter the Corporate Name");
				document.getElementById("corpName").focus();
				return false;
			}
			if (fnIsNull(DOB)){
				alert("Enter the date of incorporation");
				document.getElementById("DOB").focus();
				return false;
			}
			//email and phone number when not empty
				if (!fnIsNull(emailAdd)){
					if (validateEmail(emailAdd) == "false"){
						alert("Invalid Email address");
						document.getElementById("emailAdd").focus();
						return false;
					}
				}
				if (!fnIsNull(phonNum1)){
					if (valNumeric(phonNum1,phonNum1) == "false"){
						alert("Field must be numeric");
						document.getElementById("phonNum1").focus();
						return false;
					}
				}
				if (!fnIsNull(phonNum2)){
					if (valNumeric(phonNum2,phonNum2) == "false"){
						alert("Field must be numeric");
						document.getElementById("phonNum2").focus();
						return false;
					}
				}
				if (!fnIsNull(phonNum3)){
					if (valNumeric(phonNum3,phonNum3) == "false"){
						alert("Field must be numeric");
						document.getElementById("phonNum3").focus();
						return false;
					}
				}
				///new concession validation kanmi
				if (!fnIsNull(conleg)){
					if (valNumeric(conleg,conleg) == "false"){
						alert("Field must be numeric");
						document.getElementById("conleg").focus();
						return false;
					}
				}
				
				if (!fnIsNull(conchq)){
					if (valNumeric(conchq,conchq) == "false"){
						alert("Field must be numeric");
						document.getElementById("conchq").focus();
						return false;
					}
				}
				
				if (!fnIsNull(concard)){
					if (valNumeric(concard,concard) == "false"){
						alert("Field must be numeric");
						document.getElementById("concard").focus();
						return false;
					}
				}
				
				if ((document.getElementById("chqreqY").checked == false) && (document.getElementById("chqreqN").checked == false)){
					//alert(document.getElementById("noOfLeaves").value +"1");
					alert("Cheque required flag should be selected");
					document.getElementById("chqreqN").focus();
					return false;
                                }else{
					if (document.getElementById("chqreqY").checked == true){
						//alert(document.getElementById("noOfLeaves").value);
						if (document.getElementById("noOfLeaves").value == "0"){
								alert("Number of leaves Must Be greater than 0");
								document.getElementById("noOfLeaves").focus();
								return false;
							   }	
						if ((document.getElementById("cheqbY").checked == false) && (document.getElementById("cheqbN").checked == false)){
							alert("Cheque Book Fee required flag should be selected");
							document.getElementById("cheqbN").focus();
							return false;
							}else{
							  if (document.getElementById("cheqbY").checked == true){

								document.getElementById("conchq").disabled = false;
							   }else{
								document.getElementById("conchq").disabled = true;
							   }
							}
                             						
					 }
                }
				
                
				if ((document.getElementById("cardissY").checked == false) && (document.getElementById("cardissN").checked == false)){
								alert("Card Issuance Fee required flag should be selected");
								document.getElementById("cardissN").focus();
								return false;
				}else{
					 if (document.getElementById("cardissY").checked == true){

								document.getElementById("concard").disabled = false;
					 }else{
								document.getElementById("concard").disabled = true;
						  }
				}	
				
				if ((document.getElementById("legalY").checked == false) && (document.getElementById("legalN").checked == false)){
								alert("Legal Fee required flag should be selected");
								document.getElementById("legalN").focus();
								return false;
				}else{
					 if (document.getElementById("legalY").checked == true){

								document.getElementById("conleg").disabled = false;
					 }else{
								document.getElementById("conleg").disabled = true;
						  }
				}	
				
				
				
				
				///new concession validation kanmi
			//
			if (fnIsNull(acctCcy) && fnIsNull(acctCcy2)){
				alert("Select the account currency");
				document.getElementById("acctCcy").focus();
				return false;
			}else{
				if (!fnIsNull(acctCcy)){
					addCrncyCode();
				}
			}
			if ((document.getElementById("jtAcctFlgYes").checked == false) && (document.getElementById("jtAcctFlgNo").checked == false)){
				alert("Joint account flag should be selected");
				document.getElementById("jtAcctFlgYes").focus();
				return false;
			}
			if ((document.getElementById("nonResIndYes").checked == false) && (document.getElementById("nonResIndNo").checked == false)){
				alert("Nonresident Indicator should be selected");
				document.getElementById("nonResIndYes").focus();
				return false;
			}else{
				if (document.getElementById("nonResIndYes").checked == true){
					if (fnIsNull(turnNonRes_ui)){
						alert("This field should not be empty");
						document.getElementById("turnNonRes_ui").focus();
						return false;
					}
					document.getElementById("turnNonRes_ui").disabled = false;
				}else{
					document.getElementById("turnNonRes_ui").disabled = true;
				}
			}
			if (fnIsNull(cntryOfRes1)){
				alert("Country of Residence should not be empty");
				document.getElementById("cntryOfRes1").focus();
				return false;
			}
			if (fnIsNull(cntryOfRes2)){
				alert("Country of Residence should not be empty");
				document.getElementById("cntryOfRes2").focus();
				return false;
			}
			if (fnIsNull(cntryOfBth1)){
				alert("Enter the country of Incorporation");
				document.getElementById("cntryOfBth1").focus();
				return false;
			}
			if (fnIsNull(cntryOfBth2)){
				alert("Enter the country of Incorporation");
				document.getElementById("cntryOfBth2").focus();
				return false;
			}
			if (fnIsNull(nation1)){
				alert("Nationality should not be empty");
				document.getElementById("nation1").focus();
				return false;
			}
			if (fnIsNull(nation2)){
				alert("Nationality should not be empty");
				document.getElementById("nation2").focus();
				return false;
			}
			if (fnIsNull(riskRtg)){
				alert("Select the Risk rating");
				document.getElementById("riskRtg").focus();
				return false;
			}
			if (fnIsNull(shrtNam)){
				alert("This field should not be empty");
				document.getElementById("shrtNam").focus();
				return false;
			}
			if (fnIsNull(addType)){
				alert("Select the Address Type");
				document.getElementById("addType").focus();
				return false;
			}
			if (fnIsNull(streetNo)){
				alert("Enter the address");
				document.getElementById("streetNo").focus();
				return false;
			}
			if (fnIsNull(city1)){
				alert("Enter the city");
				document.getElementById("city1").focus();
				return false;
			}
			if (fnIsNull(city2)){
				alert("Enter the city");
				document.getElementById("city2").focus();
				return false;
			}
			if (fnIsNull(state1)){
				alert("Enter the state");
				document.getElementById("state1").focus();
				return false;
			}
			if (fnIsNull(state2)){
				alert("Enter the state");
				document.getElementById("state2").focus();
				return false;
			}
			if (fnIsNull(segmnt1)){
				alert("Enter the segment");
				document.getElementById("segmnt1").focus();
				return false;
			}
			if (fnIsNull(segmnt2)){
				alert("Enter the segment");
				document.getElementById("segmnt2").focus();
				return false;
			}
			if (fnIsNull(cntry1)){
				alert("Enter the country");
				document.getElementById("cntry1").focus();
				return false;
			}
			if (fnIsNull(cntry2)){
				alert("Enter the country");
				document.getElementById("cntry2").focus();
				return false;
			}
			if (fnIsNull(subSegmnt)){
				alert("select the subsegment");
				document.getElementById("subSegmnt").focus();
				return false;
			}
			if (fnIsNull(pstCode)){
				alert("Enter the Postal Code");
				document.getElementById("pstCode").focus();
				return false;
			}
			if ((document.getElementById("acctTypR").checked == false) && (document.getElementById("acctTypC").checked == true) && (fnIsNull(natOfBiz))){
				alert("Select the Nature of Business");
				document.getElementById("natOfBiz").focus();
				return false;
			}
			if (fnIsNull(typOfId)){
				alert("Select the Type of Id");
				document.getElementById("typOfId").focus();
				return false;
			}
			if (fnIsNull(typOfCode)){
				alert("Enter the Type of Code");
				document.getElementById("typOfCode").focus();
				return false;
			}
			if (fnIsNull(taxIdNo)){
				alert("Enter the Tax ID");
				document.getElementById("taxIdNo").focus();
				return false;
			}
			if (document.getElementById("acctTypC").checked == false) {
			if (fnIsNull(plcOfIssu)){
				alert("Enter the Place of Issue");
				document.getElementById("plcOfIssu").focus();
				return false;
			}
			}
			if (document.getElementById("acctTypC").checked == false) {
			if (fnIsNull(issuDate_ui)){
				alert("Enter the Issue Date");
				document.getElementById("issuDate_ui").focus();
				return false;
			}
			}
			
			if (document.getElementById("acctTypC").checked == false) {
			if (fnIsNull(issuAuthort)){
				alert("Enter the Issuing Authority");
				document.getElementById("issuAuthort").focus();
				return false;
			}
			}
			if (fnIsNull(cntryOfInc)){
				alert("Enter the Country of Incorporation/Affiliated Body");
				document.getElementById("cntryOfInc").focus();
				return false;
			}
			if (fnIsNull(regNo)){
				alert("Enter the Registration Number");
				document.getElementById("regNo").focus();
				return false;
			}
			if (fnIsNull(rmId)){
				alert("Enter the RM Id");
				document.getElementById("rmId").focus();
				return false;
			}
			//if ((fnIsNull(dbtCardNo)) && (!fnIsNull(dbtCardYes)) && (fnIsNull(prefNam))){
			//	alert("Enter the Preferred Name on Card");
			//	document.getElementById("prefNam").focus();
			//	return false;
			//}
			if (fnIsNull(schmCode)){
				alert("Enter the Scheme Code");
				document.getElementById("schmCode").focus();
				return false;
			}
			if (fnIsNull(GSHCode)){
				alert("Enter the GL Sub head code");
				document.getElementById("GSHCode").focus();
				return false;
			}
			//if (fnIsNull(acctOfRef)){
			//	alert("Enter the Account of referral");
			//	document.getElementById("acctOfRef").focus();
			//	return false;
			//}
			if ((document.getElementById("isAcctDocCompYes").checked == false) && (document.getElementById("isAcctDocCompNo").checked == false)){
				alert("Answer the Account Documentation question");
				document.getElementById("isAcctDocCompYes").focus();
				return false;
			}
			//if ((document.getElementById("corpsearchYes").checked == false) && (document.getElementById("corpsearchNo").checked == false)){
				//alert("Corporate Search flag should be selected");
				//document.getElementById("corpsearchYes").focus();
				//return false;
			//}
			if ((document.getElementById("addrsearchYes").checked == false) && (document.getElementById("addrsearchNo").checked == false)){
				alert("Address Search flag should be selected");
				document.getElementById("addrsearchYes").focus();
				return false;
			}
			if ((document.getElementById("custExstYes").checked == false) && (document.getElementById("custExstNo").checked == false)){
				//document.getElementById("custExstNo").disabled = true;
				//document.getElementById("custExstNo").checked = true;
				//alert("SELECT CIF ID IF EXIST AND CLICK YES, ELSE SUBMIT!!");
				//document.getElementById("custExstYes").focus();				
				//return false;
			}

			
		}
			///--------------------------------
			if (document.getElementById("acctTypR").checked == true){
				document.getElementById("acctTyp").value = "R";
			}else{
				document.getElementById("acctTyp").value = "C";
			}
			//kanmi
			
			if (document.getElementById("cardissY").checked == true){
				document.getElementById("cardiss").value = "Y";
			}else{
				document.getElementById("cardiss").value = "N";
			}

			if (document.getElementById("legalY").checked == true){
				document.getElementById("legal").value = "Y";
			}else{
				document.getElementById("legal").value = "N";
			}

			if (document.getElementById("cheqbY").checked == true){
				document.getElementById("cheqb").value = "Y";
			}else{
				document.getElementById("cheqb").value = "N";
			}

			if (document.getElementById("chqreqY").checked == true){
				document.getElementById("chqreq").value = "Y";
			}else{
				document.getElementById("chqreq").value = "N";
			}
			
			
			//kanmi
			if (document.getElementById("custExstYes").checked == true){
				document.getElementById("custExst").value = "Y";
			}else{
				document.getElementById("custExst").value = "N";
			}
			if (document.getElementById("jtAcctFlgYes").checked == true){
				document.getElementById("jtAcctFlg").value = "Y";
			}else{
				document.getElementById("jtAcctFlg").value = "N";
			}
			if (document.getElementById("nonResIndYes").checked == true){
				document.getElementById("nonResInd").value = "Y";
			}else{
				document.getElementById("nonResInd").value = "N";
			}
			if (document.getElementById("PEPFlgYes").checked == true){
				document.getElementById("PEPFlg").value = "Y";
			}else{
				document.getElementById("PEPFlg").value = "N";
			}
			if (document.getElementById("staffIndYes").checked == true){
				document.getElementById("staffInd").value = "Y";
			}else{
				document.getElementById("staffInd").value = "N";
			}
			if (document.getElementById("equalOrGreaterYes").checked == true){
				document.getElementById("equalOrGreater").value = "Y";
			}else{
				document.getElementById("equalOrGreater").value = "N";
			}
			if (document.getElementById("resOrCitizYes").checked == true){
				document.getElementById("resOrCitiz").value = "Y";
			}else{
				document.getElementById("resOrCitiz").value = "N";
			}
			if (document.getElementById("eStatmntYes").checked == true){
				document.getElementById("eStatmnt").value = "Y";
			}else{
				document.getElementById("eStatmnt").value = "N";
			}
			if (document.getElementById("intBankYes").checked == true){
				document.getElementById("intBank").value = "Y";
			}else{
				document.getElementById("intBank").value = "Y";
			}
			if (document.getElementById("mobBankYes").checked == true){
				document.getElementById("mobBank").value = "Y";
			}else{
				document.getElementById("mobBank").value = "Y";
			}
			if (document.getElementById("smsAlrtYes").checked == true){
				document.getElementById("smsAlrt").value = "Y";
			}else{
				document.getElementById("smsAlrt").value = "Y";
			}
			if (document.getElementById("emailAlrtYes").checked == true){
				document.getElementById("emailAlrt").value = "Y";
			}else{
				document.getElementById("emailAlrt").value = "Y";
			}
			if (document.getElementById("dbtCardYes").checked == true){
				document.getElementById("dbtCard").value = "Y";
			}else{
				document.getElementById("dbtCard").value = "Y";
			}
			if (document.getElementById("isAcctDocCompYes").checked == true){
				document.getElementById("isAcctDocComp").value = "Y";
			}else{
				document.getElementById("isAcctDocComp").value = "N";
			}
			minorSnrCitz(document.getElementById("DOB").value);
			if (valNumeric(document.getElementById("avgAnnIncm").value,document.getElementById("avgAnnIncm").id) == false){
				alert("Field must be numeric");
				document.getElementById("avgAnnIncm").focus();
				return false;
				}
			if ((document.getElementById("sHold").checked == false)&&(document.getElementById("sig").checked == false)&&(document.getElementById("dir").checked == false)&&(document.getElementById("acctHold").checked == false)){
				alert("select atleast one customer type");
				document.getElementById("sHold").focus();
				return false;
			}
			//if ((document.getElementById("corpsearchYes").checked == false) && (document.getElementById("corpsearchNo").checked == false)){
				//alert("Corporate Search flag should be selected");
				//document.getElementById("corpsearchYes").focus();
				//return false;
			//}
			if ((document.getElementById("addrsearchYes").checked == false) && (document.getElementById("addrsearchNo").checked == false)){
				alert("Address Search flag should be selected");
				document.getElementById("addrsearchYes").focus();
				return false;
			}
			if (document.getElementById("sHold").checked == false){
				document.getElementById("sHold").value = "";
			}else{
				document.getElementById("sHold").value = "Yes";
			}
			if (document.getElementById("sig").checked == false){
				document.getElementById("sig").value = "";
			}else{
				document.getElementById("sig").value = "Yes";
			}
			if (document.getElementById("dir").checked == false){
				document.getElementById("dir").value = "";
			}else{
				document.getElementById("dir").value = "Yes";
			}
			if (document.getElementById("acctHold").checked == false){
				document.getElementById("acctHold").value = "";
			}else{
				document.getElementById("acctHold").value = "Yes";
			}
		}	
	}
	if (obj.name == "Submit") {
		FnAddressSearch();
	}
	//alert("Done");
	
	if (document.getElementById("acctTypC").checked == true) {
		document.getElementById("issuDate").value  = document.getElementById("DOB").value;
	}
	//if (obj.name == "Submit") {
	//	alert(document.getElementById("minorInd").value);
	//	if (document.getElementById("MinorYes").checked == true){
	//		document.getElementById("minorInd").value = "Y";
	//	}else if  (document.getElementById("MinorNo").checked == true) {
	//		document.getElementById("minorInd").value = "N";
	//	}
	//	alert(document.getElementById("minorInd").value);
	//}
	if (obj.name == "Validate") {
		if (getRelatedPty() == false){return false;}
		if (valSegmt() == false){return false;}
		return false;
	}
	if (obj.name == "Submit") {
		if ((funcCode != "V") && (funcCode != "X")){
		if (getRelatedPty() == false){return false;}
		}
	}
}

function emptyFields(){
	var ObjForm = document.forms[0];
	ObjForm.acctHold.value = "";
	ObjForm.acctCcy.value = "";
	ObjForm.jtAcctFlgYes.checked = false;
	ObjForm.jtAcctFlgNo.checked = false;
	ObjForm.gender.value = "";
	ObjForm.nonResIndYes.checked = false;
	ObjForm.nonResIndNo.checked = false;
	ObjForm.maritStat.value = "";
	ObjForm.cntryOfRes1.value = "";
	ObjForm.cntryOfRes2.value = "";
	ObjForm.cntryOfBth1.value = "";
	ObjForm.cntryOfBth2.value = "";
	ObjForm.turnNonRes_ui.value = "";
	ObjForm.nation1.value = "";
	ObjForm.nation2.value = "";
	ObjForm.usPers.value = "";
	ObjForm.statOfOrig.value = "";
	ObjForm.PEPFlgYes.checked = false;
	ObjForm.PEPFlgNo.checked = true;
	ObjForm.lclGovt.value = "";
	ObjForm.PEPRltnshp.value = "";
	ObjForm.KYCInd.value = "";
	ObjForm.otherRltnshp.value = "";
	ObjForm.equalOrGreaterYes.checked = false;
	ObjForm.equalOrGreaterNo.checked = false;
	ObjForm.staffIndYes.checked = false;
	ObjForm.staffIndNo.checked = false;
	ObjForm.resOrCitizYes.checked = false;
	ObjForm.resOrCitizNo.checked = false;
	ObjForm.relMngrId.value = "";
	//----------------------------------------------------
	ObjForm.shrtNam.value = "";
	ObjForm.minorInd.value = "";
	ObjForm.snrCitiz.value = "";
	ObjForm.priSolId.value = cSolId;
	ObjForm.solName.value = "";
	ObjForm.addValFrm.value = BODDate;
	ObjForm.relStrtDate.value = BODDate;
	//---------------------------------------------------------
	ObjForm.streetNo.value = "";
	ObjForm.occup.value = "";
	ObjForm.city1.value = "";
	ObjForm.city2.value = "";
	ObjForm.empType.value = "";
	ObjForm.state1.value = "";
	ObjForm.state2.value = "";
	ObjForm.segmnt1.value = "";
	ObjForm.segmnt2.value = "";
	ObjForm.cntry1.value = "";
	ObjForm.cntry2.value = "";
	ObjForm.subSegmnt.value = "";
	ObjForm.pstCode.value = "";
	ObjForm.natOfBiz.value = "";
	//----------------------------------------------------------
	ObjForm.typOfId.value = "";
	ObjForm.typOfCode.value = "";
	//ObjForm.intBankYes.checked = true;
	//ObjForm.intBankNo.checked = false;
	ObjForm.eStatmntYes.checked = true;
	ObjForm.eStatmntNo.checked = false;
	//ObjForm.corpsearchYes.checked = false;
	//ObjForm.corpsearchNo.checked = false;
	//ObjForm.addrsearchYes.checked = false;
	//ObjForm.addrsearchNo.checked = false;
	ObjForm.taxIdNo.value = "";
	ObjForm.taxIdNo2.value = "";
	ObjForm.mobBankYes.checked = true;
	ObjForm.mobBankNo.checked = false;
	ObjForm.freq.value = "";
	ObjForm.plcOfIssu.value = "";
	ObjForm.smsAlrtYes.checked = true;
	ObjForm.smsAlrtNo.checked = false;
	ObjForm.rmId.value = "";
	ObjForm.issuDate_ui.value = "";
	ObjForm.emailAlrtYes.checked = true;
	ObjForm.emailAlrtNo.checked = false;
	ObjForm.expDate_ui.value = "";
	ObjForm.dbtCardYes.checked = true;
	ObjForm.dbtCardNo.checked = false;
	ObjForm.regNo.value = "";
	ObjForm.prefNam.value = "";
	//-----------------------------------------
	ObjForm.resPermNo.value = "";
	ObjForm.namOfPEP.value = "";
	ObjForm.addType.value = "";
	ObjForm.issuAuthort.value = "";
	ObjForm.schmCode.value = "";
	ObjForm.GSHCode.value = "";
	ObjForm.acctOfRef.value = "";
	ObjForm.isAcctDocCompYes.checked = false;
	ObjForm.isAcctDocCompNo.checked = false;
	//--------------------------------------------
	ObjForm.prntCoy.value = "";
	ObjForm.sect.value = "";
	ObjForm.subSect.value = "";
	ObjForm.cntryOfInc.value = "";
	ObjForm.avgAnnIncm.value = "";
	ObjForm.SCUMReg.value = "";
	ObjForm.CRMNo.value = "";	
	ObjForm.riskRtg.value = "";	
	ObjForm.ccyLength.value = "";	
	ObjForm.acctCcy2.value = "";
}

function retDet(){
	if (document.getElementById("custExstNo").checked == true){
		addeTable(0);
		document.getElementById("custExstYes").checked = false;
		document.getElementById("custExstNo").checked = true;
		deDupClicked = "";
		//emptyFields();
		solDesc(document.getElementById("priSolId").value);
	}
}

function customSegment(){
	objForm = document.forms[0];
	var acctSel;
	if (document.getElementById("acctTypR").checked == true){
		acctSel = "R";
	}else{
		acctSel = "C";
	}
	var inputNameValues = "step|4|acctSel|"+acctSel;
	var outputNames = "segment|segmentDesc";
	var scrName = "simact002.scr";
	var title = "LIST OF SEGMENTS AND THEIR DESCRIPTIONS";
	var literalNames = "SEGMENT" + "|" + "DESCRIPTION";
	var hyperLnks = "1";
	var retVal = fnExecuteScriptForList(inputNameValues,outputNames, scrName,title, literalNames, hyperLnks, false);
	document.getElementById("segmnt1").value = retVal.split("|")[0];
	document.getElementById("segmnt2").value = retVal.split("|")[1];
	document.getElementById("segmnt2").disabled = true;
	//subSegmtList(retVal.split("|")[0]);
}

function subSegmtList(segmt){
	//segmt
	if (!fnIsNull(segmt)){
		var acctSel;
		if (document.getElementById("acctTypR").checked == true){
			acctSel = "R";
		}else{
			acctSel = "C";
		}
		var inputNameValues = "step|5|segmt|"+segmt+"|acctSel|"+acctSel;
		var outputNames = "segmt";
		var scrName = "simact002.scr";
		var retVal2 = appFnExecuteScript(inputNameValues,outputNames,scrName,false);					
		var segmtVals =retVal2.split("|");
		document.getElementById("segmnt2").value = retVal2.split("|")[1];
		//alert(segmtVals);
		document.getElementById("subSegmnt").options.length = 1;
		segmtBox = document.getElementById("subSegmnt");
		start = 3;
		for (i in segmtVals){
			if (segmtVals[i]!= ""){
				if (i==start){
				var opt = document.createElement("option");
				opt.value= segmtVals[i];
				//opt.innerHTML = segmtVals[i] + " - " + segmtVals[start+2];
				opt.innerHTML = segmtVals[start+2];
				segmtBox.appendChild(opt); // whatever property it has
				start +=4;
				}
			}
		}
	}
	valSegmt();
}

function minorSnrCitz(birthyr){
	var cDay = BODDate.split("-");
	
	var MinorYes = document.getElementById("MinorYes").checked;
	var MinorNo = document.getElementById("MinorNo").checked;
	
	var birthyrMn = birthyr;
	
	var lastFour = cDay[2];
	var CurrMnth = cDay[1];
	var CurrDy = cDay[0];
	var birthDy = birthyr.split("-")[0];
	var birthMnth = birthyr.split("-")[1];
	var birthyr = birthyr.split("-")[2];
	
	if (birthyr.length != 4){
		alert("Invalid date format (dd-mm-yyyy)");
		document.getElementById("DOB").value = "";
		return false;
	}
	
	var inputNameValues = "DOB|"+birthyrMn;
	var outputNames = "DOBYear,DOBMonth,DOBDay";
	var scrName = "simactGetAge.scr";
	var retVal2 = appFnExecuteScript(inputNameValues,outputNames,scrName,false);					
	var segmtVals =retVal2.split("|");
	document.getElementById("DOBYear").value = retVal2.split("|")[1];
	document.getElementById("DOBMonth").value = retVal2.split("|")[3];
	document.getElementById("DOBDay").value = retVal2.split("|")[5];
	
	var age = document.getElementById("DOBYear").value;
	
	if((MinorYes == true) && (age > 18)){
		alert("Date of birth set for this minor account is above 18 system will change the minor flag to NO");
		//Customer is above 18 years system will change minor flag to No
		document.getElementById("MinorYes").checked = false;
		document.getElementById("MinorNo").checked = true;
	}
	
	//var age = lastFour - birthyr;
	//Minor flag
	if(MinorYes == true){
		if (age < 18){
			//document.getElementById("minorInd").value = "Y";
			document.getElementById("minorDet").style.visibility = "visible";
			document.getElementById("minorDet2").style.visibility = "visible";
			document.getElementById("minorDet3").style.visibility = "visible";
			document.getElementById("sLnk19").style.visibility = "visible";
			//document.getElementById("minReln").value = "Guardian";
			//document.getElementById("minReln").disabled = true;
		}else{
			//document.getElementById("minorInd").value = "N";
			document.getElementById("biometId").disabled = true;
			document.getElementById("minorDet").style.visibility = "hidden";
			document.getElementById("minorDet2").style.visibility = "hidden";
			document.getElementById("minorDet3").style.visibility = "hidden";
			document.getElementById("sLnk19").style.visibility = "hidden";
			document.getElementById("minRelnCifId").value = "";
			document.getElementById("minReln").value = "";
			document.getElementById("minRelnGDCode").value = "";
		}
	}
	//Senior citizen
	if (age < 60) {
		document.getElementById("snrCitiz").value = "N";
	}else{
		document.getElementById("snrCitiz").value = "Y";
	}
	document.getElementById("minorInd").readOnly = true;
	document.getElementById("snrCitiz").readOnly = true;
}

function customSchmCode(){
	var seg = document.getElementById("segmnt1").value;
	var subSeg = document.getElementById("subSegmnt").value;
	var kycInd = document.getElementById("KYCInd").value;
	var acctCCY = document.getElementById("acctCcy2").value;
	var biometId = document.getElementById("biometId").value;
	//alert(biometId);
	if (fnIsNull(acctCCY)){
		alert("Enter the currency code");
		document.getElementById("acctCcy").focus();
		//return false;
	}else{
		var actCCYCnt = String(acctCCY).split(",").length - 1;
		if (actCCYCnt == null){
			acctCCY = acctCCY;
		}else{
			acctCCY = String(acctCCY).split(",")[0];
		}
	}
	if (fnIsNull(seg)){
		alert("Enter the segment code");
		document.getElementById("segmnt1").focus();
		//return false;
	}
	if (fnIsNull(subSeg)){
		alert("Enter the sub segment code");
		document.getElementById("subSegmnt").focus();
		//return false;
	}
	if (fnIsNull(kycInd)){
		alert("Enter the KYC Indicator code");
		document.getElementById("acctCcy").focus();
		//return false;
	}
	//if (seg != "" && subSeg !="" && kycInd != "" && acctCcy != ""){
		var inputNameValues = "step|6|seg|"+seg+"|subSeg|"+subSeg+"|kycInd|"+kycInd+"|acctCCY|"+acctCCY+"|biometId|"+biometId; 
		var outputNames = "schmCode|schmDesc";
		var scrName = "simact002.scr";
		var title = "LIST OF SCHEME CODES AND THEIR DESCRIPTIONS BASED ON SEGMENT";
		var literalNames = "SCHEME CODE" + "|" + "DESCRIPTION";
		var hyperLnks = "1";
		var retVal = fnExecuteScriptForList(inputNameValues,outputNames, scrName,title, literalNames, hyperLnks, false);
		document.getElementById("schmCode").value = retVal.split("|")[0];
	//}
}

function customGLSUBHead(){
	var schmCode = document.getElementById("schmCode").value;
	var acctCCY = document.getElementById("acctCcy2").value;
	if (fnIsNull(acctCCY)){
		alert("Enter the currency code");
		document.getElementById("acctCcy").focus();
		//return false;
	}else{
		var actCCYCnt = String(acctCCY).split(",").length - 1;
		if (actCCYCnt == null){
			acctCCY = acctCCY;
		}else{
			acctCCY = String(acctCCY).split(",")[0];
		}
	}
	if (fnIsNull(schmCode)){
		alert("Enter the scheme code");
		document.getElementById("schmCode").focus();
		//return false;
	}
	//if ((schmCode != "") && (acctCcy != "")){
		//objForm = document.forms[0];
		var inputNameValues = "step|7|cSolId|"+cSolId+"|schmCode|"+schmCode+"|acctCCY|"+acctCCY;
		var outputNames = "glSubHeadCode|glSubHeadCodeDesc";
		var scrName = "simact002.scr";
		var title = "LIST OF GL SUB HEADS ATTACHED TO THE SELECTED SCHMEME CODES AND THEIR DESCRIPTIONS";
		var literalNames = "GL SUB HEADS" + "|" + "DESCRIPTION";
		var hyperLnks = "1";
		var retVal = fnExecuteScriptForList(inputNameValues,outputNames, scrName,title, literalNames, hyperLnks, false);
		document.getElementById("GSHCode").value = retVal.split("|")[0];
	//}
}

function valSchmCode(schmCode){
	if (!fnIsNull(schmCode)){
	//=============Calling scripts
		var inputNameValues = "schmCode|"+schmCode.toUpperCase()+"|step|0";
		var outputNames = "schmCode";
		var scrName ="simact002_2.scr";
		var retVal = appFnExecuteScript(inputNameValues,outputNames,scrName,false);
		if (retVal.split("|")[0] == "Error"){
			//alert(retVal.split("|")[1]);
			document.getElementById("schmCode").value ="";
		}
//---added by Uche on Request by Retail Liabilities to allow Minors open Account--------------------------------------- 

                 if(((objForm.schmCode.value.toUpperCase()=="SBTBL")||(objForm.schmCode.value.toUpperCase()=="SBTBS")) && (document.getElementById("minorInd").value == "Y")) 
		{
                 document.getElementById("minRelnCifId").value = "R004981265";
                 document.getElementById("minReln").value = "Guardian";
                 document.getElementById("minRelnGDCode").value = "O";
                        
                 }
//-----Customization ended--------------------------
	}
}

function valGHSCode(GHSCode){
	var schmCode = document.getElementById("schmCode").value;
	if (fnIsNull(schmCode)){
		alert("Enter Scheme code");
	}else{
		if (!fnIsNull(GHSCode)){
	//=============Calling scripts
			var inputNameValues = "GHSCode|"+GHSCode.toUpperCase()+"|step|1|schmCode|"+schmCode.toUpperCase();
			var outputNames = "schmCode";
			var scrName ="simact002_2.scr";
			var retVal = appFnExecuteScript(inputNameValues,outputNames,scrName,false);
			if (retVal.split("|")[0] == "Error"){
				alert(retVal.split("|")[1]);
				document.getElementById("GSHCode").value ="";
			}
		}
	}
}

function customSect(){
	var inputNameValues = "step|2|category|SECTOR_CODE|type|Sector";
	var outputNames = "sector|sectorDesc";
	var scrName = "simact002_2.scr";
	var title = "LIST OF SECTOR CODES AND THEIR DESCRIPTIONS";
	var literalNames = "SECTOR" + "|" + "DESCRIPTION";
	var hyperLnks = "1";
	var retVal = fnExecuteScriptForList(inputNameValues,outputNames, scrName,title, literalNames, hyperLnks, false);
	document.getElementById("sect").value = retVal.split("|")[0];
}

function customsubSect(){
	var inputNameValues = "step|2|category|SUB_SECTOR_CODE|type|Sector";
	var outputNames = "sector|sectorDesc";
	var scrName = "simact002_2.scr";
	var title = "LIST OF SUB SECTOR CODES AND THEIR DESCRIPTIONS";
	var literalNames = "SUB SECTOR" + "|" + "DESCRIPTION";
	var hyperLnks = "1";
	var retVal = fnExecuteScriptForList(inputNameValues,outputNames, scrName,title, literalNames, hyperLnks, false);
	document.getElementById("subSect").value = retVal.split("|")[0];
}

function valSect(sector){
	if (!fnIsNull(sector)){
	//=============Calling scripts
		var inputNameValues = "variable|"+sector.toUpperCase()+"|step|3|category|SECTOR_CODE|type|Sector";
		var outputNames = "sector";
		var scrName ="simact002_2.scr";
		var retVal = appFnExecuteScript(inputNameValues,outputNames,scrName,false);
		if (retVal.split("|")[0] == "Error"){
			alert(retVal.split("|")[1]);
			document.getElementById("sect").value ="";
		}
	}
}

function valSubSect(subSector){
	if (!fnIsNull(subSector)){
	//=============Calling scripts
		var inputNameValues = "variable|"+subSector.toUpperCase()+"|step|3|category|SUB_SECTOR_CODE|type|Sub Sector";
		var outputNames = "subSector";
		var scrName ="simact002_2.scr";
		var retVal = appFnExecuteScript(inputNameValues,outputNames,scrName,false);
		if (retVal.split("|")[0] == "Error"){
			alert(retVal.split("|")[1]);
			document.getElementById("subSect").value ="";
		}
	}
}

function customCntry(id){
	id = id.slice(0, -1);
	var inputNameValues = "step|2|category|COUNTRY|type|Country";
	var outputNames = "sector|sectorDesc";
	var scrName = "simact002_2.scr";
	var title = "LIST OF COUNTRIES CODES AND THEIR DESCRIPTIONS";
	var literalNames = "COUNTRY" + "|" + "DESCRIPTION";
	var hyperLnks = "1";
	var retVal = fnExecuteScriptForList(inputNameValues,outputNames, scrName,title, literalNames, hyperLnks, false);
	document.getElementById(id+"1").value = retVal.split("|")[0];
	document.getElementById(id+"2").value = retVal.split("|")[1];
}

function customNation(){
	var inputNameValues = "step|2|category|NATIONALITY|type|Nationality";
	var outputNames = "sector|sectorDesc";
	var scrName = "simact002_2.scr";
	var title = "LIST OF NATIONALITIES CODES AND THEIR DESCRIPTIONS";
	var literalNames = "NATIONALITY" + "|" + "DESCRIPTION";
	var hyperLnks = "1";
	var retVal = fnExecuteScriptForList(inputNameValues,outputNames, scrName,title, literalNames, hyperLnks, false);
	document.getElementById("nation1").value = retVal.split("|")[0];
	document.getElementById("nation2").value = retVal.split("|")[1];
}

function customState(){
	var inputNameValues = "step|2|category|STATE|type|State";
	var outputNames = "sector|sectorDesc";
	var scrName = "simact002_2.scr";
	var title = "LIST OF STATES CODES AND THEIR DESCRIPTIONS";
	var literalNames = "STATE" + "|" + "DESCRIPTION";
	var hyperLnks = "1";
	var retVal = fnExecuteScriptForList(inputNameValues,outputNames, scrName,title, literalNames, hyperLnks, false);
	document.getElementById("state1").value = retVal.split("|")[0];
	document.getElementById("state2").value = retVal.split("|")[1];
}

function customTitle(){
	var inputNameValues = "step|2|category|PERSONSALUTATION|type|Title";
	var outputNames = "sector|sectorDesc";
	var scrName = "simact002_2.scr";
	var title = "LIST OF TITLE CODES AND THEIR DESCRIPTIONS";
	var literalNames = "TITLE" + "|" + "DESCRIPTION";
	var hyperLnks = "1";
	var retVal = fnExecuteScriptForList(inputNameValues,outputNames, scrName,title, literalNames, hyperLnks, false);
	document.getElementById("title").value = retVal.split("|")[0];
}

function customCity(id){
	var inputNameValues = "step|2|category|CITY|type|City";
	var outputNames = "sector|sectorDesc";
	var scrName = "simact002_2.scr";
	var title = "LIST OF CITY CODES AND THEIR DESCRIPTIONS";
	var literalNames = "CITY" + "|" + "DESCRIPTION";
	var hyperLnks = "1";
	var retVal = fnExecuteScriptForList(inputNameValues,outputNames, scrName,title, literalNames, hyperLnks, false);
	if (id == "city1"){
		document.getElementById("city1").value = retVal.split("|")[0];
		document.getElementById("city2").value = retVal.split("|")[1];
	}else{
		document.getElementById("plcOfIssu").value = retVal.split("|")[0];	
	}
}

function valCntry(cntryCode,id){
	if (!fnIsNull(cntryCode)){
		id = id.slice(0, -1);
		//=============Calling scripts
		var inputNameValues = "variable|"+cntryCode.toUpperCase()+"|step|3|category|COUNTRY|type|Country";
		var outputNames = "cntryCode";
		var scrName ="simact002_2.scr";
		var retVal = appFnExecuteScript(inputNameValues,outputNames,scrName,false);
		if (retVal.split("|")[0] == "Error"){
			alert(retVal.split("|")[1]);
			document.getElementById(id+"1").value ="";
			document.getElementById(id+"2").value = ""
		}else{
			document.getElementById(id+"2").value = retVal.split("|")[1];
		}
	}
}

function valState(stateCode){
	if (!fnIsNull(stateCode)){
	//=============Calling scripts
		var inputNameValues = "variable|"+stateCode.toUpperCase()+"|step|3|category|STATE|type|State";
		var outputNames = "stateCode";
		var scrName ="simact002_2.scr";
		var retVal = appFnExecuteScript(inputNameValues,outputNames,scrName,false);
		if (retVal.split("|")[0] == "Error"){
			alert(retVal.split("|")[1]);
			document.getElementById("state1").value ="";
			document.getElementById("state2").value ="";
		}else{
			document.getElementById("state2").value = retVal.split("|")[1];
		}
	}
}


//Added by Oluwasola Adesola to auto default segment and sub segment based on document selected for customers
function getAge(dateString) {

    var dates = dateString.split("-");
    var d = new Date();

    var userday = dates[0];
    var usermonth = dates[1];
    var useryear = dates[2];

    var curday = d.getDate();
    var curmonth = d.getMonth()+1;
    var curyear = d.getFullYear();

    var age = curyear - useryear;

    if((curmonth < usermonth) || ( (curmonth == usermonth) && curday < userday   )){

        age--;

    }

    return age;
}


function empMap1(empType){
	//document.getElementById("gender").onchange();
	//var segmnt1 = document.getElementById("segmnt1").value
	var docList = document.getElementById("docList").value
	if(docList !=""){
		empMap();
	}
}

function loadDoc(){
	var acctTypR = document.getElementById("acctTypR").checked;
	var acctTypC = document.getElementById("acctTypC").checked;
	var funcCode = document.getElementById("funcCode").value;
	if(funcCode !=""){
		if(funcCode =="J"){
			if(acctTypR ==true){
				var docList = document.getElementById("docList").value
				simplify_URL = "../../finbranch/custom/jsp/simactdoc.jsp?bvn="+docList;
				sUrl = simplify_URL;
				var retval = window.showModalDialog(sUrl, "", "dialogWidth:60;dialogHeight:35;status=no;toolbar=no;menubar=no;resizable=yes;maximize:yes;minimize:yes;");
			//	alert(retval);
				if (!retval || (retval=='undefined') || (retval=="undefined")){
					//loadDoc();
				}
				document.getElementById("docList").value=retval
			}
		}
	}else{
		alert("Function must be entered");
			
		return false;
	}
	//alert(document.getElementById("docList").value)
	
}
function empMap(empType){

	//=============Calling scripts
	var birthday = document.getElementById("DOB").value
	var docList = document.getElementById("docList").value
	var date = birthday.substring(0,2);
	var month = birthday.substring(3,5);
	var year = birthday.substring(6,10);
	var dob1 = date +"-"+ month +"-"+ year
	//var age = calculateAge(date, month, year);
	var age = getAge(dob1);
	//str.replace(/blue/g, "red");
	//alert(age);
//} 
	if (!docList || (docList=='undefined') || (docList=="undefined")){
		//document list is empty
		//alert("Empty doc list")
		
	}else{
		var inputNameValues = "variable|"+empType+"|age|"+age;
		inputNameValues = inputNameValues +"|"+ docList;
		//alert(inputNameValues)
		var outputNames = "stateCode";
		var scrName ="segMapmn001.scr";
		var retVal = appFnExecuteScript(inputNameValues,outputNames,scrName,false);
		if (retVal.split("|")[0] == "Error"){
			alert(retVal.split("|")[1]);
			//alert(retVal.split("|")[3]);
			/*var lego = retVal.split("|")[3];
			if(lego == "Y"){
				loadDoc();	
				empMap();
			}*/
			document.getElementById("segmnt1").value ="";
			document.getElementById("segmnt2").value ="";
			document.getElementById("subSegmnt").value ="";
			//document.getElementById("segmnt2").value ="";
		}else{
			document.getElementById("segmnt1").value = retVal.split("|")[1];
			document.getElementById("segmnt2").value = retVal.split("|")[3];
			document.getElementById("segmnt1").onchange();
			//alert(retVal.split("|")[5])
			document.getElementById("subSegmnt").value = retVal.split("|")[5];
			var disField = retVal.split("|")[9];
			//alert(disField)
			document.getElementById("KYCInd").value = retVal.split("|")[11];
			document.getElementById("KYCInd").disabled=true;
			document.getElementById("segmnt1").disabled=true;
			document.getElementById("segmnt2").disabled=true;
			if(disField=="Y"){
				document.getElementById("subSegmnt").disabled=true;
				hideImage("sLnk12");
			}else{
				document.getElementById("subSegmnt").disabled=false;
				hideImage("sLnk12");
			}
		}
	}
}

function DisGendddd(){
	if (document.getElementById("acctTypC").checked == true) {
		document.getElementById("gender").disable = true;
	}else{
		document.getElementById("gender").disable = false;
	}
}
//Added by Oluwasola Adesola to auto default segment and sub segment based on document selected for customers
function valNation(NationCode){
	//PopState();
	if (!fnIsNull(NationCode)){
	//=============Calling scripts
		var inputNameValues = "variable|"+NationCode.toUpperCase()+"|step|3|category|NATIONALITY|type|Nationality";
		var outputNames = "stateCode";
		var scrName ="simact002_2.scr";
		var retVal = appFnExecuteScript(inputNameValues,outputNames,scrName,false);
		if (retVal.split("|")[0] == "Error"){
			alert(retVal.split("|")[1]);
			document.getElementById("nation1").value ="";
			document.getElementById("nation2").value ="";
		}else{
			document.getElementById("nation2").value = retVal.split("|")[1];
		}
	}
}

function valTitle(TitleCode){
	if (!fnIsNull(TitleCode)){
	//=============Calling scripts
		var inputNameValues = "variable|"+TitleCode.toUpperCase()+"|step|3|category|PERSONSALUTATION|type|Title";
		var outputNames = "stateCode";
		var scrName ="simact002_2.scr";
		var retVal = appFnExecuteScript(inputNameValues,outputNames,scrName,false);
		if (retVal.split("|")[0] == "Error"){
			alert(retVal.split("|")[1]);
			document.getElementById("title").value ="";
		}
	}
}

function ValCity(cityCode,id){
	if (!fnIsNull(cityCode)){
		//=============Calling scripts
		var inputNameValues = "variable|"+cityCode.toUpperCase()+"|step|3|category|CITY|type|City";
		var outputNames = "cityCode";
		var scrName ="simact002_2.scr";
		var retVal = appFnExecuteScript(inputNameValues,outputNames,scrName,false);
		if (retVal.split("|")[0] == "Error"){
			alert(retVal.split("|")[1]);
			if (id == "plcOfIssu"){
				document.getElementById("plcOfIssu").value ="";
			}else{
				document.getElementById("city1").value ="";
				document.getElementById("city2").value ="";
			}
		}else{
			if (id == "plcOfIssu"){
				document.getElementById("plcOfIssu").value = cityCode;
				document.getElementById("plcOfIssu2").value = retVal.split("|")[1];
			}else{
				document.getElementById("city2").value = retVal.split("|")[1];
			}
		}
	}
}

function loadIDCode(idType){
	var acctTyp;
	if (document.getElementById("acctTypR").checked == true){
		acctTyp = "Retail";
	}else{
		acctTyp = "Corporate";
	}
	var inputNameValues = "step|4|idType|"+idType+"|acctTyp|"+acctTyp;
	var outputNames = "crncyCode";
	var scrName = "simact002_2.scr";
	var retVal2 = appFnExecuteScript(inputNameValues,outputNames,scrName,false);					
	var crncyVals =retVal2.split("|")
	document.getElementById("typOfCode").options.length = 1;
	idTypeBox = document.getElementById("typOfCode");
	start = 1;
	for (i in crncyVals){
		if (crncyVals[i]!= ""){
			if (i==start){
			var opt = document.createElement("option");
			opt.value= crncyVals[i];
			opt.innerHTML = crncyVals[start+2];
			idTypeBox.appendChild(opt); // whatever property it has
			start +=4;
			}
			
		}
		
	}
}

function fetchForVerify(tempAcctNo){
	if (!fnIsNull(tempAcctNo)){
		customerQDE();
		
		var funcCode = document.getElementById("funcCode").value;
		var createDate = document.getElementById("creatDate_ui").value;
		var inputNameValues = "step|5|tempAcctNo|"+tempAcctNo.toUpperCase().replace(/\s/gi,"")+"|funcCode|"+funcCode+"|createDate|"+createDate;
		var outputNames = "crncyCode";
		var scrName = "simact002_2.scr";
		var retVal = appFnExecuteScript(inputNameValues,outputNames,scrName,false);
		//alert(retVal);
		var arr = retVal.split("|");
		if (arr[0] == "Error"){
			alert(arr[1]);
			document.getElementById("tempAcct").value = "";
			return false;
		}
		if (arr[3] != "NA"){
			if (arr[3] == "R"){
				document.getElementById("acctTypR").checked = true;
				document.getElementById("taxIdNo").value = (arr[141] == "NA")?"":arr[141];
			}else{
				document.getElementById("acctTypC").checked = true;
				document.getElementById("taxIdNo").value = (arr[141] == "NA")?"":arr[141];
			}
		}else{
			document.getElementById("acctTypR").checked = false;
			document.getElementById("acctTypC").checked = false;
		}
		if (arr[33] != "NA"){
			document.getElementById("sHold").checked = true;
		}else{
			document.getElementById("sHold").checked = false;
		}
		if (arr[37] != "NA"){
			document.getElementById("sig").checked = true;
		}else{
			document.getElementById("sig").checked = false;
		}
		if (arr[39] != "NA"){
			document.getElementById("dir").checked = true;
		}else{
			document.getElementById("dir").checked = false;
		}
		if (arr[41] != "NA"){
			document.getElementById("acctHold").checked = true;
		}else{
			document.getElementById("acctHold").checked = false;
		}
		
		document.getElementById("biometId").value = (arr[5] == "NA")?"":arr[5];
		document.getElementById("corpName").value = (arr[9] == "NA")?"":arr[9];
		document.getElementById("title").value = (arr[11] == "NA")?"":arr[11];
		document.getElementById("firstNam").value = (arr[13] == "NA")?"":arr[13];
		document.getElementById("DOB").value = (arr[15] == "NA")?"":arr[15];
		document.getElementById("midName").value = (arr[17] == "NA")?"":arr[17];
		document.getElementById("emailAdd").value = (arr[19] == "NA")?"":arr[19];
		document.getElementById("lastNam").value = (arr[21] == "NA")?"":arr[21];
		document.getElementById("phonNum1").value = (arr[23] == "NA")?"":arr[23];
		document.getElementById("phonNum2").value = (arr[25] == "NA")?"":arr[25];
		document.getElementById("phonNum3").value = (arr[27] == "NA")?"":arr[27];
		document.getElementById("fullNam").value = (arr[29] == "NA")?"":arr[29];
		document.getElementById("natId").value = (arr[31] == "NA")?"":arr[31];
		if(arr[43] == "NA"){
			document.getElementById("acctCcy").value = "";
		}else{
			var actCCY = (arr[43].slice(-1) == ",")?arr[43].substring(0,arr[43].length-1):arr[43];
			splitCCY(actCCY);
		}	
		document.getElementById("gender").value = (arr[47] == "NA")?"":arr[47];
		document.getElementById("maritStat").value = (arr[51] == "NA")?"":arr[51];
		document.getElementById("cntryOfRes1").value = (arr[53] == "NA")?"":arr[53];
		document.getElementById("cntryOfRes2").value = (arr[55] == "NA")?"":arr[55];
		document.getElementById("cntryOfBth1").value = (arr[57] == "NA")?"":arr[57];
		document.getElementById("cntryOfBth2").value = (arr[59] == "NA")?"":arr[59];
		document.getElementById("turnNonRes_ui").value = (arr[61] == "NA")?"":arr[61];
		document.getElementById("nation1").value = (arr[63] == "NA")?"":arr[63];
		document.getElementById("nation2").value = (arr[65] == "NA")?"":arr[65];
		document.getElementById("usPers").value = (arr[67] == "NA")?"":arr[67];
		document.getElementById("statOfOrig").value = (arr[69] == "NA")?"":arr[69];
		PopStateLga();
		document.getElementById("lclGovt").value = (arr[73] == "NA")?"":arr[73];
		document.getElementById("PEPRltnshp").value = (arr[75] == "NA")?"":arr[75];
		document.getElementById("KYCInd").value = (arr[77] == "NA")?"":arr[77];
		document.getElementById("otherRltnshp").value = (arr[79] == "NA")?"":arr[79];
		document.getElementById("relMngrId").value = (arr[87] == "NA")?"":arr[87];
		document.getElementById("shrtNam").value = (arr[89] == "NA")?"":arr[89];
		document.getElementById("minorInd").value = (arr[91] == "NA")?"":arr[91];
		if (arr[91] == "Y"){
			document.getElementById("minorDet").style.visibility = "Visible";
			document.getElementById("minorDet2").style.visibility = "Visible";
			document.getElementById("minorDet3").style.visibility = "Visible";
			document.getElementById("sLnk19").style.visibility = "Visible";
			valMinRel();
		}else{
			document.getElementById("sLnk19").style.visibility = "hidden";
		}
		document.getElementById("snrCitiz").value = (arr[93] == "NA")?"":arr[93];
		document.getElementById("priSolId").value = (arr[95] == "NA")?"":arr[95];
		document.getElementById("solName").value = (arr[97] == "NA")?"":arr[97];
		document.getElementById("addValFrm").value = (arr[99] == "NA")?"":arr[99];
		document.getElementById("relStrtDate").value = (arr[101] == "NA")?"":arr[101];
		document.getElementById("streetNo").value = (arr[105] == "NA")?"":arr[105];
		document.getElementById("occup").value = (arr[107] == "NA")?"":arr[107];
		document.getElementById("city1").value = (arr[109] == "NA")?"":arr[109];
		document.getElementById("city2").value = (arr[111] == "NA")?"":arr[111];
		document.getElementById("empType").value = (arr[113] == "NA")?"":arr[113];
		document.getElementById("state1").value = (arr[115] == "NA")?"":arr[115];
		document.getElementById("state2").value = (arr[117] == "NA")?"":arr[117];
		document.getElementById("segmnt1").value = (arr[119] == "NA")?"":arr[119];
		document.getElementById("segmnt2").value = (arr[121] == "NA")?"":arr[121];
		document.getElementById("cntry1").value = (arr[123] == "NA")?"":arr[123];
		document.getElementById("cntry2").value = (arr[125] == "NA")?"":arr[125];
		subSegmtList(document.getElementById("segmnt1").value);
		document.getElementById("subSegmnt").value = (arr[127] == "NA")?"":arr[127];
		document.getElementById("pstCode").value = (arr[129] == "NA")?"":arr[129];
		document.getElementById("natOfBiz").value = (arr[131] == "NA")?"":arr[131];
		document.getElementById("typOfId").value = (arr[133] == "NA")?"":arr[133];
		loadIDCode(document.getElementById("typOfId").value);
		document.getElementById("typOfCode").value = (arr[135] == "NA")?"":arr[135];
		document.getElementById("freq").value = (arr[145] == "NA")?"":arr[145];
		document.getElementById("plcOfIssu").value = (arr[147] == "NA")?"":arr[147];
		ValCity(document.getElementById("plcOfIssu").value,"plcOfIssu");
		document.getElementById("rmId").value = (arr[151] == "NA")?"":arr[151];
		document.getElementById("issuDate_ui").value = (arr[153] == "NA")?"":arr[153];
		document.getElementById("expDate_ui").value = (arr[157] == "NA")?"":arr[157];
		document.getElementById("regNo").value = (arr[161] == "NA")?"":arr[161];
		document.getElementById("prefNam").value = (arr[163] == "NA")?"":arr[163];
		document.getElementById("prntCoy").value = (arr[165] == "NA")?"":arr[165];
		document.getElementById("sect").value = (arr[167] == "NA")?"":arr[167];
		document.getElementById("subSect").value = (arr[169] == "NA")?"":arr[169];
		document.getElementById("cntryOfInc").value = (arr[171] == "NA")?"":arr[171];
		document.getElementById("avgAnnIncm").value = (arr[173] == "NA")?"":arr[173];
		document.getElementById("SCUMReg").value = (arr[175] == "NA")?"":arr[175];
		document.getElementById("CRMNo").value = (arr[177] == "NA")?"":arr[177];
		
		document.getElementById("resPermNo").value = (arr[179] == "NA")?"":arr[179];
		document.getElementById("namOfPEP").value = (arr[181] == "NA")?"":arr[181];
		document.getElementById("addType").value = (arr[103] == "NA")?"":arr[103];
		document.getElementById("issuAuthort").value = (arr[183] == "NA")?"":arr[183];
		document.getElementById("schmCode").value = (arr[185] == "NA")?"":arr[185];
		document.getElementById("GSHCode").value = (arr[187] == "NA")?"":arr[187];
		document.getElementById("acctOfRef").value = (arr[189] == "NA")?"":arr[189];
										
		if (arr[35] != "NA"){
			if (arr[35] == "Y"){
				document.getElementById("custExstYes").checked = true;
			}else{
				document.getElementById("custExstNo").checked = true;
			}
			acctType();
		}else{
			document.getElementById("custExstYes").checked = false;
			document.getElementById("custExstNo").checked = false;
		}
		if (arr[45] != "NA"){
			if (arr[45] == "Y"){
				document.getElementById("jtAcctFlgYes").checked = true;
			}else{
				document.getElementById("jtAcctFlgNo").checked = true;
			}
		}else{
			document.getElementById("jtAcctFlgYes").checked = false;
			document.getElementById("jtAcctFlgNo").checked = false;
		}
		if (arr[49] != "NA"){
			if (arr[49] == "Y"){
				document.getElementById("nonResIndYes").checked = true;
			}else{
				document.getElementById("nonResIndNo").checked = true;
			}
		}else{
			document.getElementById("nonResIndYes").checked = false;
			document.getElementById("nonResIndNo").checked = false;
		}
		if (arr[71] != "NA"){
			if (arr[71] == "Y"){
				document.getElementById("PEPFlgYes").checked = true;
			}else{
				document.getElementById("PEPFlgNo").checked = true;
			}
		}else{
			document.getElementById("PEPFlgYes").checked = false;
			document.getElementById("PEPFlgNo").checked = false;
		}
		if (arr[81] != "NA"){
			if (arr[81] == "Y"){
				document.getElementById("equalOrGreaterYes").checked = true;
			}else{
				document.getElementById("equalOrGreaterNo").checked = true;
			}
		}else{
			document.getElementById("equalOrGreaterYes").checked = false;
			document.getElementById("equalOrGreaterNo").checked = false;
		}
		if (arr[83] != "NA"){
			if (arr[83] == "Y"){
				document.getElementById("staffIndYes").checked = true;
			}else{
				document.getElementById("staffIndNo").checked = true;
			}
			valStaffInd(arr[83],'relMngrId');
		}else{
			document.getElementById("staffIndYes").checked = false;
			document.getElementById("staffIndNo").checked = false;
		}
		if (arr[85] != "NA"){
			if (arr[85] == "Y"){
				document.getElementById("resOrCitizYes").checked = true;
			}else{
				document.getElementById("resOrCitizNo").checked = true;
			}
		}else{
			document.getElementById("resOrCitizYes").checked = false;
			document.getElementById("resOrCitizNo").checked = false;
		}
		if (arr[137] != "NA"){
			if (arr[137] == "Y"){
				document.getElementById("intBankYes").checked = true;
			}else{
				document.getElementById("intBankNo").checked = false;
			}
		}else{
			document.getElementById("intBankYes").checked = true;
			document.getElementById("intBankNo").checked = false;
		}
		if (arr[139] != "NA"){
			if (arr[139] == "Y"){
				document.getElementById("eStatmntYes").checked = true;
			}else{
				document.getElementById("eStatmntNo").checked = true;
			}
			estatmnt();
		}else{
			document.getElementById("eStatmntYes").checked = false;
			document.getElementById("eStatmntNo").checked = false;
		}
		if (arr[143] != "NA"){
			if (arr[143] == "Y"){
				document.getElementById("mobBankYes").checked = true;
			}else{
				document.getElementById("mobBankNo").checked = false;
			}
		}else{
			document.getElementById("mobBankYes").checked = true;
			document.getElementById("mobBankNo").checked = false;
		}
		if (arr[149] != "NA"){
			if (arr[149] == "Y"){
				document.getElementById("smsAlrtYes").checked = true;
			}else{
				document.getElementById("smsAlrtNo").checked = false;
			}
		}else{
			document.getElementById("smsAlrtYes").checked = true;
			document.getElementById("smsAlrtNo").checked = false;
		}
		if (arr[155] != "NA"){
			if (arr[155] == "Y"){
				document.getElementById("emailAlrtYes").checked = true;
			}else{
				document.getElementById("emailAlrtNo").checked = false;
			}
		}else{
			document.getElementById("emailAlrtYes").checked = true;
			document.getElementById("emailAlrtNo").checked = false;
		}
		if (arr[159] != "NA"){
			if (arr[159] == "Y"){
				document.getElementById("dbtCardYes").checked = true;
			}else{
				document.getElementById("dbtCardNo").checked = false;
			}
		}else{
			document.getElementById("dbtCardYes").checked = true;
			document.getElementById("dbtCardNo").checked = false;
		}
		if (arr[191] != "NA"){
			if (arr[191] == "Y"){
				document.getElementById("isAcctDocCompYes").checked = true;
			}else{
				document.getElementById("isAcctDocCompNo").checked = true;
			}
		}else{
			document.getElementById("isAcctDocCompYes").checked = false;
			document.getElementById("isAcctDocCompNo").checked = false;
			}
		//if (arr[249] != "NA"){
			//if (arr[249] == "Y"){
				//document.getElementById("corpsearchYes").checked = false;
			//}else{
				//document.getElementById("corpsearchNo").checked = true;
			//}
		//}else{
			//document.getElementById("corpsearchYes").checked = false;
			//document.getElementById("corpsearchNo").checked = false;
		//}
		if (arr[250] != "NA"){
			if (arr[250] == "Y"){
				document.getElementById("addrsearchYes").checked = false;
			}else{
				document.getElementById("addrsearchNo").checked = false;
			}
		}else{
			document.getElementById("addrsearchYes").checked = true;
			document.getElementById("addrsearchNo").checked = true;
		}
		document.getElementById("reltdPtyDetCnt").value = (arr[193] == "NA")?"0":arr[193];
		document.getElementById("reltdPtyDet").value = (arr[195] == "NA")?"0":arr[195];
		ptyDety(arr[193],arr[195]);
		document.getElementById("minReln").value = (arr[197] == "NA")?"0":arr[197];
		document.getElementById("minRelnGDCode").value = (arr[190] == "NA")?"0":arr[199];
		
		document.getElementById("riskRtg").value = (arr[203] == "NA")?"":arr[203];
		//Disable all fields for delete
		//kanmi
		if (arr[205] != "NA"){
			if (arr[205] == "Y"){
				document.getElementById("chqreqY").checked = true;
			}else{
				document.getElementById("chqreqN").checked = true;
				
			}
		}else{
				document.getElementById("chqreqY").checked = false;
				document.getElementById("chqreqN").checked = false;
		}
		if (arr[207] != "NA"){
			if (arr[207] == "Y"){
				document.getElementById("legalY").checked = true;
			}else{
				document.getElementById("legalN").checked = true;
				
			}
		}else{
				document.getElementById("legalY").checked = false;
				document.getElementById("legalN").checked = false;
		}
		if (arr[209] != "NA"){
			if (arr[209] == "Y"){
				document.getElementById("cardissY").checked = true;
			}else{
				document.getElementById("cardissN").checked = true;
				
			}
		}else{
				document.getElementById("cardissY").checked = false;
				document.getElementById("cardissN").checked = false;
		}
		if (arr[211] != "NA"){
			if (arr[211] == "Y"){
				document.getElementById("cheqbY").checked = true;
			}else{
				document.getElementById("cheqbY").checked = true;
				
			}
		}else{
				document.getElementById("cheqbY").checked = false;
				document.getElementById("cheqbN").checked = false;
		}
		document.getElementById("conleg").value = (arr[213] == "NA")?"0":arr[213];
		document.getElementById("conchq").value = (arr[215] == "NA")?"0":arr[215];
		document.getElementById("concard").value = (arr[217] == "NA")?"0":arr[217];
		document.getElementById("noOfLeaves").value = (arr[219] == "NA")?"0":arr[219];
		//kanmi
		//Frank
		if (arr[221] != "NA"){
			if (arr[221] == "Y"){
				document.getElementById("addrsearchYes").checked = true;
				document.getElementById("addrsearchNo").checked = false;
			}else{
				document.getElementById("addrsearchNo").checked = true;
				document.getElementById("addrsearchYes").checked = false;
			}
		}else{
				document.getElementById("addrsearchYes").checked = false;
				document.getElementById("addrsearchNo").checked = false;
		}
		if (arr[223] != "NA"){
			if (arr[223] == "Y"){
				document.getElementById("salaryAcctFlgYes").checked = true;
				document.getElementById("salaryAcctFlgNo").checked = false;
			}else{
				document.getElementById("salaryAcctFlgNo").checked = true;
				document.getElementById("salaryAcctFlgYes").checked = false;
			}
		}else{
				document.getElementById("salaryAcctFlgYes").checked = false;
				document.getElementById("salaryAcctFlgNo").checked = false;
		}
		document.getElementById("OrgNm").value = (arr[225] == "NA")?"":arr[225];
		
		if (arr[227] != "NA"){
			if (arr[227] == "Y"){
				document.getElementById("CreAcctFlgYes").checked = true;
				document.getElementById("CreAcctFlgNo").checked = false;
			}else{
				document.getElementById("CreAcctFlgNo").checked = true;
				document.getElementById("CreAcctFlgYes").checked = false;
			}
		}else{
				document.getElementById("CreAcctFlgYes").checked = false;
				document.getElementById("CreAcctFlgNo").checked = false;
		}
		//Frank
		document.getElementById("minRelnCifId").value = (arr[201] == "NA")?"0":arr[201];
		if (arr[201] != "NA"){
			popCifDet('minRelnCifId',arr[201]);
		}
		if (funcCode == "X" || funcCode == "V"){
			disableAllField();
			disableCustQDE();
			document.getElementById("dSearch").disabled = true;
			document.getElementById("custQDE").disabled = true;
			document.getElementById("addCrncy").style.display = "none";
			document.getElementById("rmCrncy").style.display = "none";
			document.getElementById("clrCrncy").style.display = "none";			
			//document.getElementById("corpsearchYes").disabled = true;
			//document.getElementById("corpsearchNo").disabled = true;
			document.getElementById("addrsearchYes").disabled = true;
			document.getElementById("addrsearchNo").disabled = true;

			}else{
			//valKYCInd(document.getElementById("KYCInd").value);
		}
	}
}  

function ptyDety(detCnt,detDet){
	if (Number(detCnt) > 0){
		var t;
		for(t=1;t<=Number(detCnt);t++){
			addPartyTable();
		}
		loadPtyDetl(detDet,Number(detCnt));
	}
}

function loadPtyDetl(det,cnt){
	var funcCode = document.getElementById("funcCode").value;
	var t;
	var h=0;
	var lpDet;
	for(t=1;t<=cnt;t++){
		lpDet = det.split("@#$")[h];
		lpDet = lpDet.split("^");
		document.getElementById("partyDet"+t+"-1").value = lpDet[0];
		popCifDet("partyDet"+t+"-1",lpDet[0]);
		document.getElementById("partyDet"+t+"-5").value = lpDet[1];
		if (funcCode == "V" || funcCode == "X"){
			document.getElementById("partyDet"+t+"-1").readOnly = true;
			document.getElementById("partyDet"+t+"-5").disabled = true;				
			//document.getElementById("corpsearchYes").disabled = true;
			//document.getElementById("corpsearchNo").disabled = true;
			document.getElementById("addrsearchYes").disabled = true;
			document.getElementById("addrsearchNo").disabled = true;
			//document.getElementById("corpsearchYes").readOnly = true;
			document.getElementById("addrsearchYes").readOnly = true;
		}
		h++
	}
}

//Related Party Table
function addPartyTable(){
	addClick++
	var id=addClick;
	if (addClick == 1){
		document.getElementById("PartyCnt").value = "1";
		var tbody='<table border=0>';
	}else{
		document.getElementById("PartyCnt").value = id;
		tbody='';
	}
	var element = document.getElementById("partyDet"+String(id)+"1");
	if(typeof(element) != 'undefined' && element != null){
		document.getElementById("partyDet" + String(addClick) + "1").style.visibility = 'visible';
		document.getElementById("partyDet" + String(addClick)+"-"+"1").style.visibility = 'visible';
		document.getElementById("partyDet" + String(addClick) + "5").style.visibility = 'visible';
		document.getElementById("partyDet" + String(addClick)+"-"+"5").style.visibility = 'visible';
		document.getElementById("partyDet" + String(addClick) + "5").style.visibility = 'visible';
		
		document.getElementById("partyDet" + String(addClick) + "1").value = "";
		document.getElementById("partyDet" + String(addClick)+"-"+"1").value = "";
		document.getElementById("partyDet" + String(addClick) + "5").value = "";
		document.getElementById("partyDet" + String(addClick)+"-"+"5").value = "";
		document.getElementById("partyDet" + String(addClick) + "5").value = "";
		document.getElementById(String(addClick)).style.visibility = 'visible';
	}else{
		
	if (addClick%2 == 1){
		tbody+='<tr id="'+String(id)+'" bgcolor="#BDD7EE">';
	}else{
		tbody+='<tr id="'+String(id)+'">';
	}
		
		//CIF ID
		tbody+='<td class="textfield" style="width: 10%" >';
		tbody+='<input type="hidden" id="partyDet'+String(id)+'1" name="' + subGroupName + '.partyDet'+String(id)+'1">';
		tbody+='<input style="text-align:center;width:100%" type="text" name="'+ subGroupName + '.partyDet'+ String(id)+'-'+'1" id="partyDet'+ String(id)+'-'+'1" onchange="popCifDetJt(this.id,this.value);HoldCifVal('+String(id)+',this.value)"/>';
		tbody+='</td>';
		
		//First Name
		tbody+='<td class="textfield" style="text-align:center;width: 25%" name="'+ subGroupName + '.partyDet'+ String(id)+'-'+'2" id="partyDet'+ String(id)+'-'+'2" >';
		tbody+='</td>';
		
		//Middle Name
		tbody+='<td class="textfield" style="text-align:center;width: 25%" name="'+ subGroupName + '.partyDet'+ String(id)+'-'+'3" id="partyDet'+ String(id)+'-'+'3" >';
		tbody+='</td>';
		
		//Last Name
		tbody+='<td class="textfield" style="text-align:center;width: 30%" name="'+ subGroupName + '.partyDet'+ String(id)+'-'+'4" id="partyDet'+ String(id)+'-'+'4" >';
		tbody+='</td>';
		
		//acctNum
		//Relationship to Entity
		tbody+='<input type="hidden" id="partyDet'+String(id)+'-'+'5" name="' + subGroupName + '.partyDet'+String(id)+'-'+'5">';
		tbody+='<td class="textfield" style="text-align:center;width: 10%" >';
		tbody+='<input type="text" class="textfieldfont" id="partyDet'+String(id)+''+'5"  name="' + subGroupName + '.partyDet'+ String(id)+''+'5" onchange="PartyCntHld();" />';
		//tbody+='&nbsp;<a href="javascript:showRefCode(objForm.partyDet'+ String(id)+'-'+'5,\'04\',\'N\',\'F\',objForm.partyDet'+ String(id)+'-'+'5);document.getElementById(\'partyDet'+ String(id)+'-'+'5\').onchange();">';
		//tbody+='&nbsp;<a href="javascript:showRefCode(objForm.partyDet'+ String(id)+'-'+'5,\'04\',\'N\',\'F\');document.getElementById(\'partyDet'+ String(id)+'-'+'5\').onchange();">';
		tbody+='&nbsp;<a href="javascript:showRefCode(document.forms[0].partyDet'+ String(id)+''+'5,\'04\',\'N\',\'F\');document.getElementById(\'partyDet'+ String(id)+''+'5\').onchange();">';
		tbody+='<img id="sLnk19" border="0" height="17" hotKeyId="search1" src="../Renderer/images/'+applangcode+'/search_icon.gif" width="16">';
		tbody+='</a>';
		
		//tbody+='<select style="text-align:center;width: 100%" name="'+ subGroupName + '.partyDet'+ String(id)+'-'+'5" id="partyDet'+String(id)+'-'+'5" size="1" >';
		//tbody+='<option  value="">--SELECT--</option>';
		//tbody+='<option  value="A">Signatory</option>';
		//tbody+='<option  value="O">Director</option>';
		//tbody+='<option  value="O">Shareholder</option>';
		//tbody+='</select>';
		tbody+='</td>';
		
		tbody+='</tr>';
	if(addClick == 1){
		tbody+="</table>";
		document.getElementById("denomTable2").tBodies[0].setAttribute("id","tableGenerate2");
		body=document.getElementById("tableGenerate2");
		var temp = body.ownerDocument.createElement("div");
		temp.innerHTML=tbody;
		body.parentNode.replaceChild(temp.firstChild.firstChild, body);
	}else{
		document.getElementById("denomTable2").tBodies[0].setAttribute("id","tableGenerate2");
		var body=document.getElementById("tableGenerate2");
		var output ="<table>" +body.innerHTML+tbody+"</table>";
		var temp = body.ownerDocument.createElement("div");
		temp.innerHTML=output;
		body.parentNode.replaceChild(temp.firstChild.firstChild, body);
	}
	}
}

function PartyCntHld(){
	var h;
	document.getElementById("PartyCnt").value = addClick;
	var PartyCif = "";
	for(h=1;h<=addClick;h++){
		var cifId = document.getElementById("partyDet"+h+"-1").value;
		if(fnIsNull(PartyCif)){
			PartyCif = cifId;
		}else{
			PartyCif = PartyCif + ";" + cifId;
		}
	}
	document.getElementById("PartyCif").value = PartyCif;
	
	var PartyCd = "";
	for(h=1;h<=addClick;h++){
		var RelID = document.getElementById("partyDet"+ h+""+"5").value;
		if(fnIsNull(PartyCd)){
			PartyCd = RelID;
		}else{
			PartyCd = PartyCd + ";" + RelID;
		}
	}
	document.getElementById("PartyCd").value = PartyCd;
}

function delPartyTable(){
	if(addClick <= 0){
		alert("No record to delete")
	}else{
		document.getElementById("partyDet" + String(addClick) + "1").style.visibility = 'hidden';
		document.getElementById("partyDet" + String(addClick)+"-"+"1").style.visibility = 'hidden';
		document.getElementById("partyDet" + String(addClick) + "5").style.visibility = 'hidden';
		document.getElementById("partyDet" + String(addClick)+"-"+"5").style.visibility = 'hidden';
		document.getElementById("partyDet" + String(addClick) + "5").style.visibility = 'hidden';
		document.getElementById(String(addClick)).style.visibility = 'hidden';
		addClick--
	}
}

function HoldVal(id,RelID){
	var PartyCd = document.getElementById("PartyCd").value;
	if(fnIsNull(PartyCd)){
		PartyCd = RelID;
	}else{
		PartyCd = PartyCd + ";" + RelID;
	}
	document.getElementById("PartyCd").value = PartyCd;
}

function HoldCifVal(id,RelID){
	document.getElementById("partyDet"+id+"1").value = RelID;
}
   
function popCifDet(id,cifId){
	if(!fnIsNull(cifId)){
			//=============Calling scripts
			var inputNameValues = "cifId|"+cifId+"|step|7";
			var outputNames = "firstname,middlename,lastname,Err";
			var scrName ="simact002_2.scr";
			var retVal = appFnExecuteScript(inputNameValues,outputNames,scrName,false);
			firstname = retVal.split("|")[1];
			middlename = retVal.split("|")[3];
			lastname = retVal.split("|")[5];
			Err = retVal.split("|")[0];
			if (Err == "Error"){
				alert(retVal.split("|")[1]);
				document.getElementById(id).value= "";
				document.getElementById(id).focus();
				return false;
			}
			if (cifId == "minRelnCifId"){
				return false;
			}
			var arrId = id.split("-")[0];
			document.getElementById(arrId+"-2").innerHTML= (firstname == "NA")?"":firstname;
			document.getElementById(arrId+"-3").innerHTML= (middlename == "NA")?"":middlename;
			document.getElementById(arrId+"-4").innerHTML= (lastname == "NA")?"":lastname;
			var PartyCif = document.getElementById("PartyCif").value;
			if(fnIsNull(PartyCif)){
				PartyCif = cifId;
			}else{
				PartyCif = PartyCif + ";" + cifId;
			}
			document.getElementById("PartyCif").value = PartyCif;
	}else{
		if (cifId == "minRelnCifId"){
				return false;
			}
		var arrId = id.split("-")[0];
		document.getElementById(arrId+"-1").value="";
		document.getElementById(arrId+"-2").innerHTML="";
		document.getElementById(arrId+"-3").innerHTML="";
		document.getElementById(arrId+"-4").innerHTML="";
		document.getElementById(arrId+"-5").value="";
	}
}

function popCifDetJt(id,cifId){
	if(!fnIsNull(cifId)){
			var PartyCif = document.getElementById("PartyCif").value;
			var inputNameValues = "HoldCif|"+PartyCif+"|NewCif|"+cifId;
			var outputNames = "Err";
			var scrName ="CheckExisCif.scr";
			var retVal = appFnExecuteScript(inputNameValues,outputNames,scrName,false);
			Err = retVal.split("|")[0];
			if (Err == "Error"){
				alert(retVal.split("|")[1]);
				document.getElementById(id).value= "";
				document.getElementById(id).focus();
				return false;
			}
			
			//=============Calling scripts
			var inputNameValues = "cifId|"+cifId+"|step|7";
			var outputNames = "firstname,middlename,lastname,Err";
			var scrName ="simact002_2.scr";
			var retVal = appFnExecuteScript(inputNameValues,outputNames,scrName,false);
			firstname = retVal.split("|")[1];
			middlename = retVal.split("|")[3];
			lastname = retVal.split("|")[5];
			Err = retVal.split("|")[0];
			if (Err == "Error"){
				alert(retVal.split("|")[1]);
				document.getElementById(id).value= "";
				document.getElementById(id).focus();
				return false;
			}
			PartyCntHld();
			if (cifId == "minRelnCifId"){
				return false;
			}
			var arrId = id.split("-")[0];
			document.getElementById(arrId+"-2").innerHTML= (firstname == "NA")?"":firstname;
			document.getElementById(arrId+"-3").innerHTML= (middlename == "NA")?"":middlename;
			document.getElementById(arrId+"-4").innerHTML= (lastname == "NA")?"":lastname;
			
	}else{
		if (cifId == "minRelnCifId"){
				return false;
			}
		var arrId = id.split("-")[0];
		document.getElementById(arrId+"-1").value="";
		document.getElementById(arrId+"-2").innerHTML="";
		document.getElementById(arrId+"-3").innerHTML="";
		document.getElementById(arrId+"-4").innerHTML="";
		document.getElementById(arrId+"-5").value="";
	}
}

function getRelatedPty(){
	var h;
	var q =0;
	var retdPtyDet = "";
	var funcCode = document.getElementById("funcCode").value;
	for(h=1;h<=addClick;h++){
		if (fnIsNull(document.getElementById("partyDet"+h+"5").value)){
			alert("Provide relationship type");
			document.getElementById("reltdPtyDet").value = "";
			document.getElementById("partyDet"+h+"5").focus();
			if(funcCode != "V"){
			return false;
			}
		}
		if (fnIsNull(document.getElementById("partyDet"+h+"1").value)){
			alert("Provide relationship cif id partyDet"+h+"1");
			document.getElementById("reltdPtyDet").value = "";
			document.getElementById("partyDet"+h+"1").focus();
			if(funcCode != "V"){
			return false;
			}
		}
		if (!fnIsNull(document.getElementById("partyDet"+h+"-1").value)){
			retdPtyDet = retdPtyDet + document.getElementById("partyDet"+h+"-1").value +"^"+document.getElementById("partyDet"+h+"-5").value+"@#$";
			q++
		}
	}
	document.getElementById("reltdPtyDet").value = retdPtyDet;
	document.getElementById("reltdPtyDetCnt").value = q;
}

function valNonRes(a,b){
	if (a == "Y"){
		document.getElementById(b).value = "";
		document.getElementById(b).readOnly = false;
		document.getElementById("resPermNo").readOnly = false;
		document.getElementById("sLnk2").style.visibility = "visible";
	}else{
		document.getElementById(b).value = "";
		document.getElementById(b).readOnly = true;
		document.getElementById("resPermNo").readOnly = true;
		document.getElementById("sLnk2").style.visibility = "hidden";
	}
}

function valStaffInd(a,b){
	//Change the element to broker
	if (a == "Y"){
		document.getElementById(b).readOnly = false;
		document.getElementById("relMngrIdLabel").innerHTML = "Employee ID"
	}else{
		document.getElementById(b).readOnly = false;
		document.getElementById("relMngrIdLabel").innerHTML = "Broker Code"
	}
		
}

function valKYCInd(a){
	if (a == "LOW"){
		document.getElementById("typOfId").value = "IDPRF";
		loadIDCode("IDPRF");
		if (document.getElementById("acctTypR").checked == true){
			document.getElementById("typOfCode").value = "RNAT";
		}else{
			document.getElementById("typOfCode").value = "CNAT";
		}
		document.getElementById("taxIdNo").value = "DUMMY";
		document.getElementById("plcOfIssu").value = "000";
		document.getElementById("plcOfIssu2").value = "OTHERS";
		document.getElementById("issuAuthort").value = "FGN";
		document.getElementById("issuDate_ui").value = BODDate;
		document.getElementById("expDate_ui").value = "";
		document.getElementById("regNo").value = "DUMMY";
		
		document.getElementById("typOfId").disabled = true;
		document.getElementById("typOfCode").disabled = true;
		document.getElementById("taxIdNo").readOnly = true;
		document.getElementById("plcOfIssu").readOnly = true;
		document.getElementById("plcOfIssu2").readOnly = true;
		document.getElementById("issuAuthort").readOnly = true;
		document.getElementById("issuDate_ui").readOnly = true;
		document.getElementById("expDate_ui").readOnly = true;
		document.getElementById("regNo").readOnly = true;
		
		document.getElementById("sLnk3").style.visibility="hidden";
		document.getElementById("sLnk4").style.visibility="hidden";
		document.getElementById("sLnk14").style.visibility="hidden";
	}else{
		document.getElementById("typOfId").value = "";
		document.getElementById("typOfCode").value = "";
		document.getElementById("taxIdNo").value = "";
		document.getElementById("plcOfIssu").value = "";
		document.getElementById("plcOfIssu2").value = "";
		document.getElementById("issuAuthort").value = "";
		document.getElementById("issuDate_ui").value = "";
		document.getElementById("expDate_ui").value = "";
		document.getElementById("regNo").value = "";
		
		document.getElementById("typOfId").disabled = false;
		document.getElementById("typOfCode").disabled = false;
		document.getElementById("taxIdNo").readOnly = false;
		document.getElementById("plcOfIssu").readOnly = false;
		document.getElementById("plcOfIssu2").readOnly = false;
		document.getElementById("issuAuthort").readOnly = false;
		document.getElementById("issuDate_ui").readOnly = false;
		document.getElementById("expDate_ui").readOnly = false;
		document.getElementById("regNo").readOnly = false;
		
		document.getElementById("sLnk3").style.visibility="visible";
		document.getElementById("sLnk4").style.visibility="visible";
		document.getElementById("sLnk14").style.visibility="visible";
	}
	DisableFilds();
}

function valAcctRef(refAcctNo,id){
	if(!fnIsNull(refAcctNo)){
		if (refAcctNo.length > 16){
			alert("Invalid Referral Account number");
			document.getElementById(id).focus();
			return false;
		}
		//=============Calling scripts
		var inputNameValues = "refAcctNo|"+refAcctNo+"|step|8";
		var outputNames = "refAcctNo,Err";
		var scrName ="simact002_2.scr";
		var retVal = appFnExecuteScript(inputNameValues,outputNames,scrName,false);
		Err = retVal.split("|")[0];
		if (Err == "Error"){
			alert(retVal.split("|")[1]);
			document.getElementById(id).value= "";
			document.getElementById(id).focus();
			return false;
		}
	}
}

function validateEmail(email) {
	if (!fnIsNull(email)){
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		//var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		var valEmail = re.test(String(email).toLowerCase());
		if (valEmail == true){
			//document.getElementById("emailAdd").value = String(valEmail).toLowerCase();
			document.getElementById("emailAdd").value = String(email).toLowerCase();
		}else{
			alert("Invalid Email address");
		}
		return re.test(String(email).toLowerCase());
	}
}

function valStaffID(a,b){
	if(!fnIsNull(a)){
		var staffIndicator;
		if (document.getElementById("staffIndYes").checked == true){
			staffIndicator = "Y";
		}
		if (document.getElementById("staffIndNo").checked == true){
			staffIndicator = "N";
		}
		//=============Calling scripts
		var inputNameValues = "staffId|"+a.replace(/\s/gi,"").toUpperCase()+"|step|9|staffInd|"+staffIndicator;
		var outputNames = "staffId,Err";
		var scrName ="simact002_2.scr";
		var retVal = appFnExecuteScript(inputNameValues,outputNames,scrName,false);
		Err = retVal.split("|")[0];
		if (Err == "Error"){
			alert(retVal.split("|")[1]);
			document.getElementById(b).value= "";
			document.getElementById(b).focus();
			return false;
		}
	}
}

function valRMID(a,b){
	if(!fnIsNull(a)){
		//=============Calling scripts
		var inputNameValues = "staffId|"+a.replace(/\s/gi,"").toUpperCase()+"|step|10";
		var outputNames = "staffId,Err";
		var scrName ="simact002_2.scr";
		var retVal = appFnExecuteScript(inputNameValues,outputNames,scrName,false);
		Err = retVal.split("|")[0];
		if (Err == "Error"){
			alert(retVal.split("|")[1]);
			document.getElementById(b).value= "";
			document.getElementById(b).focus();
			return false;
		}
	}
}

function splitCCY(actCCY){
	var stt;
	var actCCYCnt = String(actCCY).split(",").length - 1;
	if (actCCYCnt == null){
		document.getElementById("acctCcy2").value = actCCY;
	}else{
		actCCY = String(actCCY).split(",");
		for (stt=0;stt<=actCCYCnt;stt++){
			crncyArr.push(actCCY[stt]);
			addCrncyCodeClicked++;
		} 
		document.getElementById("acctCcy2").value = crncyArr;
		document.getElementById("ccyLength").value = addCrncyCodeClicked;
	}
}

function clrCrncyCode(){
	document.getElementById("acctCcy2").value = "";
	crncyArr = [];
}

function rmCrncyCode(){
	var crncy = document.getElementById("acctCcy").value.toUpperCase();
	if (!fnIsNull(crncy)){
		var valArr = crncyArr.indexOf(crncy);
		if (valArr >= 0){
			crncyArr.splice(valArr, 1);
		}else{
			alert("Currency not previously selected");
			return false;
			
		}
		document.getElementById("acctCcy2").value = crncyArr;
		document.getElementById("acctCcy").value = "";
		addCrncyCodeClicked--;
		document.getElementById("ccyLength").value = addCrncyCodeClicked;
	}
}
function addCrncyCode(){
	var crncy = document.getElementById("acctCcy").value.toUpperCase();
	var crncy2 = document.getElementById("acctCcy2").value.toUpperCase();
	var emailAdd = document.getElementById("emailAdd").value;
	if (!fnIsNull(crncy)){
		var valArr = crncyArr.indexOf(crncy);
		if (valArr >= 0){
			alert("Currency already selected");
			return false;
		}else{
			if(crncyArr.length == 0){
				if((crncy != homeCrncyCode) && (fnIsNull(emailAdd))){
					alert("Email Address is mandatory for the selected currency");
					document.getElementById("acctCcy").value = "";
					document.getElementById("emailAdd").focus();
					return false;
				}
				var conF = confirm("This account will be opened in currency "+crncy+" \n\n Click OK to continue");
				if (conF == false){return false;}
			}
			crncyArr.push(crncy);
		}
		document.getElementById("acctCcy2").value = crncyArr;
		addCrncyCodeClicked++;
	}
	document.getElementById("acctCcy").value = "";
	document.getElementById("ccyLength").value = addCrncyCodeClicked;
}
if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}

function customIssOrg(id){
	var inputNameValues = "step|2|category|IDISSUEDORG|type|issuAuthort";
	var outputNames = "sector|sectorDesc";
	var scrName = "simact002_2.scr";
	var title = "LIST OF ISSUED ORGANIZATION CODES AND THEIR DESCRIPTIONS";
	var literalNames = "ISSUED ORGANIZATIONS" + "|" + "DESCRIPTION";
	var hyperLnks = "1";
	var retVal = fnExecuteScriptForList(inputNameValues,outputNames, scrName,title, literalNames, hyperLnks, false);
	document.getElementById("issuAuthort").value = retVal.split("|")[0];	
}

function ValIssuOrg(issAuthCode){
	if (!fnIsNull(issAuthCode)){
		issAuthCode = issAuthCode.toUpperCase();
		document.getElementById("issuAuthort").value = issAuthCode;
	//=============Calling scripts
		var inputNameValues = "variable|"+issAuthCode+"|step|3|category|IDISSUEDORG|type|issuAuthort";
		var outputNames = "stateCode";
		var scrName ="simact002_2.scr";
		var retVal = appFnExecuteScript(inputNameValues,outputNames,scrName,false);
		if (retVal.split("|")[0] == "Error"){
			alert(retVal.split("|")[1]);
			document.getElementById("issuAuthort").value ="";
		}
	}
}

function valSegmt(){
	var segmnt1 = document.getElementById("segmnt1").value;
	var subSegmnt = document.getElementById("subSegmnt").value;
	var emailAdd = document.getElementById("emailAdd").value;

	if (fnIsNull(emailAdd)){
		if((segmnt1 == "005") || (segmnt1 == "006") || (segmnt1 == "008") || (subSegmnt == "081") || (subSegmnt == "082") || (subSegmnt == "009") || (subSegmnt == "011") || (subSegmnt == "005")){
			alert("Email Address is mandatory for the selected segment");
			document.getElementById("segmnt1").value = "";
			document.getElementById("subSegmnt").value = "";
			document.getElementById("emailAdd").focus();
			return false;
		}
	}	
}

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}


function eraseCookie(name) {
    createCookie(name, "", -1);
}
