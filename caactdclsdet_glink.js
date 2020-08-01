function printBlock1() {
    writeHeader("caactdclsdet");
    with(document) {
        write('<input type="hidden" name="' + jsUtil.encodeChar(groupName) + '.flag" id="flag" value="' + jsUtil.encodeChar(flagVal) + '" >');
        write('<input type="hidden" name="' + jsUtil.encodeChar(groupName) + '.totPenalCrncyCode" id="totPenalCrncyCode" value="' + jsUtil.encodeChar(stotPenalCrncyCode) + '" >');
        write('<input type="hidden" name="' + jsUtil.encodeChar(groupName) + '.absPenalCrncyCode" id="absPenalCrncyCode" value="' + jsUtil.encodeChar(sabsPenalCrncyCode) + '" >');
        write('<input type="hidden" name="' + groupName + '.TDAcctId" id="TDAcctId" >');
        write('<table border="0" cellpadding="0" cellspacing="0" width="100%">');
        write("<tr>");
        write('<td valign="top">	<table width="100%" border="0" cellpadding="0" cellspacing="0" class="table">');
        write("<tr>");
        write('<td>	<table width="100%" border="0" cellpadding="0" cellspacing="0">');
        write("<tr>");
        write('<td>	<table width="100%" border="0" cellpadding="0" cellspacing="0" class="innertable">');
        write("<tr>");
        write('<td>	<table name="TABLE1" width="100%" border="0" cellpadding="0" cellspacing="0" class="innertabletop">');
        write('<tr class="innertabletop1">');
        write('<td colspan="5" align="right">	<table border="0" cellspacing="0" cellpadding="0">');
        write("<tr>");
        write('<td colspan="750"><spacer type="block" width="1" height="1"></spacer></td>');
        write('<td align="right">');
        write('<a id="sLnk1" href="javascript:showHelpFile(\'caactdclodet_help.htm\');">');
        write('<img src="../Renderer/images/' + applangcode + '/help.gif" width="47" height="21" vspace="1" border="0" hotKeyId="finHelp"></a>');
        write("</td>");
        write("</tr>");
        write("</table>");
        write("</td>");
        write("</tr>");
        write('<tr class="rowspacing">');
        write('<td colspan="5"><spacer type="block" width="1" height="1"></spacer></td>');
        write("</tr>");
        write("<tr>");
        write('<td class="textlabel">' + jspResArr.get("FLT019831") + "");
        write('<script>setMandatory("' + caactdclsProps.get("satisfyLoanAcctflg_MANDATORY") + '");<\/script></td>');
        write('<td class="textfield">');
        write('<input id="satisfyLoanAcctflg" name="' + groupName + '.satisfyLoanAcctflg" ' + caactdclsProps.get("satisfyLoanAcctflg_ENABLED") + ' type="radio" value="Y" checked fmnd="' + caactdclsProps.get("satisfyLoanAcctflg_MANDATORY") + '" fdt="default" fblk="defaultFblk1">');
        write("" + jspResArr.get("FLT002964") + "");
        write('<input id="satisfyLoanAcctflg" name="' + groupName + '.satisfyLoanAcctflg" ' + caactdclsProps.get("satisfyLoanAcctflg_ENABLED") + ' type="radio" value="N" fmnd="' + caactdclsProps.get("satisfyLoanAcctflg_MANDATORY") + '" fdt="default" fblk="defaultFblk1">');
        write("" + jspResArr.get("FLT002965") + "</td>");
        write('<td class="columnwidth">&nbsp;</td>');
        write('<td class="columnwidth">&nbsp;</td>');
        write('<td class="columnwidth">&nbsp;</td>');
        write("</tr>");
        write("<tr>");
        write('<td class="textlabel">' + jspResArr.get("FLT004705") + "");
        write('<script>setMandatory("' + caactdclsProps.get("printReport_MANDATORY") + '");<\/script></td>');
        write('<td class="textfielddisplaylabel">');
        write('<input id="printReport" name="' + groupName + '.printReport" ' + caactdclsProps.get("printReport_ENABLED") + ' type="radio" value="Y" checked fmnd="' + caactdclsProps.get("printReport_MANDATORY") + '" fmb="N" fdt="default" fblk="defaultFblk1">');
        write("" + jspResArr.get("FLT002964") + "");
        write('<input id="printReport" name="' + groupName + '.printReport" ' + caactdclsProps.get("printReport_ENABLED") + ' type="radio" value="N" fmnd="' + caactdclsProps.get("printReport_MANDATORY") + '" fmb="N" fdt="default" fblk="defaultFblk1">');
        write("" + jspResArr.get("FLT002965") + "</td>");
        write("<td>&nbsp;</td>");
        write('<td class="textlabel">' + jspResArr.get("FLT018357") + "");
        write('<script>setMandatory("Y");<\/script></td>');
        if (funcCode != "T") {
            write("<td>");
            write('<select id="closeMode" name="' + groupName + '.closeMode" ' + caactdclsProps.get("closeMode_ENABLED") + ' class="listboxfont" onchange="javascript:return caactdclsdet_ONCHANGE5(this);" fmnd="Y" fmb="N" fdt="default" fblk="fblk" >');
            writeComboFunction("writeCloseModeForClosure");
            write("</select>");
            write("</td>")
        }
        if (funcCode == "T") {
            write("<td>");
            write('<select id="closeMode" name="' + groupName + '.closeMode" ' + caactdclsProps.get("closeMode_ENABLED") + ' class="listboxfont" onchange="javascript:return caactdclsdet_ONCHANGE6(this);" fmnd="Y" fmb="N" fdt="default" fblk="fblk" >');
            writeComboFunction("writeCloseModeForXferOutClosure");
            write("</select>");
            write("</td>")
        }
        write("</tr>");
        write("<tr>");
        write('<td class="textlabel">' + jspResArr.get("FLT003223") + "");
        write('<script>setMandatory("' + caactdclsProps.get("repymntAcctId_MANDATORY") + '");<\/script></td>');
        write('<td colspan="4" class="textfield">');
        write('<input onBlur="javascript:return custom_ONBLUR(\'caactdclsdet\',this);" id="repymntAcctId" name="' + groupName + '.repymntAcctId" hotKeyId="search1" ' + caactdclsProps.get("repymntAcctId_ENABLED") + ' type="text" class="textfieldfont" size="25" maxlength="16" onChange="javascript:return caactdclsdet_ONCHANGE7(this,this);" fmnd="' + caactdclsProps.get("repymntAcctId_MANDATORY") + '" fmb="N" fdt="account" fblk="defaultFblk1">');
        write("&nbsp;");
        write('<a id="sLnk2" href="javascript:locShowAccountIdList(objForm.repymntAcctId,objForm.repymntAcctSolId,objForm.repymntAcctName,\'F\',objForm.repymntAcctCrncy)">');
        write('<img src="../images/' + applangcode + '/search_icon.gif" width="16" height="17" border="0" hotKeyId="search1"></a>');
        write("&nbsp;&nbsp;");
        write('<input onChange="javascript:return custom_ONCHANGE(\'caactdclsdet\',this);" onBlur="javascript:return custom_ONBLUR(\'caactdclsdet\',this);" id="repymntAcctCrncy" name="' + groupName + '.repymntAcctCrncy" type="text" disabled="true" class="labelwithoutwidth" size="3" maxlength="3" fdt="default" fblk="defaultFblk1" fds="Y">');
        write('<input onChange="javascript:return custom_ONCHANGE(\'caactdclsdet\',this);" onBlur="javascript:return custom_ONBLUR(\'caactdclsdet\',this);" id="repymntAcctSolId" name="' + groupName + '.repymntAcctSolId" type="text" disabled="true" class="labelwithoutwidth" size="8" maxlength="8" fdt="default" fblk="defaultFblk1" fds="Y">');
        write('<input onChange="javascript:return custom_ONCHANGE(\'caactdclsdet\',this);" onBlur="javascript:return custom_ONBLUR(\'caactdclsdet\',this);" id="repymntAcctName" name="' + groupName + '.repymntAcctName" type="text" disabled="true" class="label" size="25" maxlength="25" fdt="default" fblk="defaultFblk1" fds="Y">');
        write("</td>");
        write("</tr>");
        write("<tr>");
        write('<td class="textlabel">' + jspResArr.get("FLT004427") + "");
        write('<script>setMandatory("' + caactdclsProps.get("repymntFwContractNo_MANDATORY") + '");<\/script></td>');
        write('<td class="textfield">');
        write('<input onBlur="javascript:return custom_ONBLUR(\'caactdclsdet\',this);" id="repymntFwContractNo" name="' + groupName + '.repymntFwContractNo" hotKeyId="search2" ' + caactdclsProps.get("repymntFwContractNo_ENABLED") + ' type="text" class="twotextfieldsearchicon" size="9" maxlength="16" fmnd="' + caactdclsProps.get("repymntFwContractNo_MANDATORY") + '" fmb="N" fdt="default" fblk="defaultFblk1" onChange="javascript:return caactdclsdet_ONCHANGE8(this);">');
        write('<a id="sLnk10" target="_self" href="javascript:showFCListForRepymtAmt()">');
        write('<img src="../images/' + applangcode + '/search_icon.gif" width="16" height="17" border="0" hotKeyId="search2"></img></a>');
        write('<input onBlur="javascript:return custom_ONBLUR(\'caactdclsdet\',this);" id="repymntFwSolId" name="' + groupName + '.repymntFwSolId" hotKeyId="search3" ' + caactdclsProps.get("repymntFwSolId_ENABLED") + ' type="text" class="twotextfieldsearchicon" size="9" maxlength="9" fmnd="' + caactdclsProps.get("repymntFwSolId_MANDATORY") + '" fmb="N" fdt="default" fblk="defaultFblk1" onChange="javascript:return caactdclsdet_ONCHANGE9(this);">');
        write("<a id=\"sLnk11\" target=\"_self\" href=\"javascript:showSolId(document.forms[0].repymntFwSolId,'ctrl','F','');enableRateCodesForFwContract()\">");
        write('<img src="../images/' + applangcode + '/search_icon.gif" width="16" height="17" border="0" hotKeyId="search3"></img></a>');
        write("</td>");
        write("</tr>");
        if (sMudPoolProdFlg != "Y") {
            write("<tr>");
            write('<td class="textlabel">' + jspResArr.get("FLT018358") + "");
            write('<script>setMandatory("' + caactdclsProps.get("rateCode_MANDATORY") + '");<\/script></td>');
            write('<td class="textfield">');
            write('<input onBlur="javascript:return custom_ONBLUR(\'caactdclsdet\',this);" id="rateCode" name="' + groupName + '.rateCode" hotKeyId="search4" ' + caactdclsProps.get("rateCode_ENABLED") + ' type="text" class="twotextfieldsearchicon" size="9" maxlength="5" onChange="javascript:return caactdclsdet_ONCHANGE10(this,this,objForm.rate,objForm.genTreasuryRefNo,objForm.genTreasuryRate,\'G\');" fmnd="' + caactdclsProps.get("rateCode_MANDATORY") + '" fmb="N" fdt="default" fblk="defaultFblk1">');
            write("&nbsp;");
            write('<a id="sLnk3" href="javascript:locShowRateCodesCommon(objForm.rateCode,objForm.rate,objForm.genTreasuryRefNo,objForm.genTreasuryRate,\'G\')">');
            write('<img src="../images/' + applangcode + '/search_icon.gif" width="16" height="17" border="0" hotKeyId="search4"></a>');
            write("&nbsp;");
            write('<input onChange="javascript:return custom_ONCHANGE(\'caactdclsdet\',this);" onBlur="javascript:return custom_ONBLUR(\'caactdclsdet\',this);" id="rate" name="' + groupName + '.rate" ' + caactdclsProps.get("rate_ENABLED") + ' type="text" class="twotextfieldsearchicon" size="9" maxlength="12" fmnd="' + caactdclsProps.get("rate_MANDATORY") + '" fmb="N" fdt="frate" fblk="defaultFblk1">');
            write("<br>");
            write("</td>");
            write("<td>&nbsp;</td>");
            write('<td class="textlabel">' + jspResArr.get("FLT018359") + "");
            write('<script>setMandatory("' + caactdclsProps.get("genTreasuryRefNo_MANDATORY") + '");<\/script></td>');
            write('<td class="textfield">');
            write('<input onChange="javascript:return custom_ONCHANGE(\'caactdclsdet\',this);" onBlur="javascript:return custom_ONBLUR(\'caactdclsdet\',this);" id="genTreasuryRefNo" name="' + groupName + '.genTreasuryRefNo" hotKeyId="search5" ' + caactdclsProps.get("genTreasuryRefNo_ENABLED") + ' type="text" class="twotextfieldsearchicon" size="25" maxlength="16" fmnd="' + caactdclsProps.get("genTreasuryRefNo_MANDATORY") + '" fmb="N" fdt="default" fblk="defaultFblk1">');
            write("<a id=\"sLnk13\" href=\"javascript:showDynCritSearcher('HTREFNO','tr_ref_num=:document.forms[0].genTreasuryRefNo',':document.forms[0].genTreasuryRefNo=tr_ref_num|:document.forms[0].rateCode=ratecode|:document.forms[0].rate=cust_rate|:document.forms[0].genTreasuryRate=treasury_rate')\">");
            write('<img src="../images/' + applangcode + '/search_icon.gif" width="16" height="17" border="0" hotKeyId="search5"></img></a>');
            write('<input onChange="javascript:return custom_ONCHANGE(\'caactdclsdet\',this);" onBlur="javascript:return custom_ONBLUR(\'caactdclsdet\',this);" id="genTreasuryRate" name="' + groupName + '.genTreasuryRate" ' + caactdclsProps.get("genTreasuryRate_ENABLED") + ' type="text" class="twotextfieldsearchicon" size="25" maxlength="12" fmnd="' + caactdclsProps.get("genTreasuryRate_MANDATORY") + '" fmb="N" fdt="frate" fblk="defaultFblk1">');
            write("</td>");
            write("</tr>")
        }
        write("<tr>");
        if (funcCode != "T") {
            write('<td class="textlabel">' + jspResArr.get("FLT018363") + "");
            write('<script>setMandatory("' + caactdclsProps.get("cashCCYCode_MANDATORY") + '");<\/script></td>');
            write('<td class="textfield">');
            write('<input onBlur="javascript:return custom_ONBLUR(\'caactdclsdet\',this);" id="cashCCYCode" name="' + groupName + '.cashCCYCode" hotKeyId="search6" ' + caactdclsProps.get("cashCCYCode_ENABLED") + ' type="text" class="textfieldfont" size="25" maxlength="3" onchange="javascript:return caactdclsdet_ONCHANGE11(this);" fmnd="' + caactdclsProps.get("cashCCYCode_MANDATORY") + '" fmb="N" fdt="default" fblk="defaultFblk1">');
            write("&nbsp;");
            write("<a id=\"sLnk4\" href=\"javascript:locShowCurrency(objForm.cashCCYCode,'ctrl','F',objForm.cashCCYDesc,'N')\">");
            write('<img src="../images/' + applangcode + '/search_icon.gif" width="16" height="17" border="0" hotKeyId="search6"></a>');
            write('<input onChange="javascript:return custom_ONCHANGE(\'caactdclsdet\',this);" onBlur="javascript:return custom_ONBLUR(\'caactdclsdet\',this);" id="cashCCYDesc" name="' + groupName + '.cashCCYDesc" class="label" type="text" disabled="true" class="label" size="25" maxlength="25" fdt="default" fblk="defaultFblk1" fds="Y">');
            write("</td>");
            write("</tr>")
        }
        if (sMudPoolProdFlg != "Y") {
            if (funcCode != "T") {
                write("<tr>");
                write('<td class="textlabel">' + jspResArr.get("FLT018360") + "");
                write('<script>setMandatory("' + caactdclsProps.get("cashRateCode_MANDATORY") + '");<\/script></td>');
                write('<td class="textfield">');
                write('<input onBlur="javascript:return custom_ONBLUR(\'caactdclsdet\',this);" id="cashRateCode" name="' + groupName + '.cashRateCode" hotKeyId="search7" ' + caactdclsProps.get("cashRateCode_ENABLED") + ' type="text" class="twotextfieldsearchicon" size="9" maxlength="5" onChange="javascript:return caactdclsdet_ONCHANGE12(this,this,objForm.cashRate,objForm.cashTreasuryRefNo,objForm.cashTreasuryRate,\'C\');" fmnd="' + caactdclsProps.get("cashRateCode_MANDATORY") + '" fmb="N" fdt="default" fblk="defaultFblk1">');
                write("&nbsp;");
                write('<a id="sLnk5" href="javascript:locShowRateCodesCommon(objForm.cashRateCode,objForm.cashRate,objForm.cashTreasuryRefNo,objForm.cashTreasuryRate,\'C\')">');
                write('<img src="../images/' + applangcode + '/search_icon.gif" width="16" height="17" border="0" hotKeyId="search7"></a>');
                write('<input onChange="javascript:return custom_ONCHANGE(\'caactdclsdet\',this);" onBlur="javascript:return custom_ONBLUR(\'caactdclsdet\',this);" id="cashRate" name="' + groupName + '.cashRate" ' + caactdclsProps.get("cashRate_ENABLED") + ' type="text" class="twotextfieldsearchicon" size="9" maxlength="20" fmnd="' + caactdclsProps.get("cashRate_MANDATORY") + '" fmb="N" fdt="frate" fblk="defaultFblk1">');
                write("<br>");
                write("</td>");
                write("<td>&nbsp;</td>");
                write('<td class="textlabel">' + jspResArr.get("FLT018361") + "");
                write('<script>setMandatory("' + caactdclsProps.get("cashTreasuryRefNo_MANDATORY") + '");<\/script></td>');
                write('<td class="textfield">');
                write('<input onChange="javascript:return custom_ONCHANGE(\'caactdclsdet\',this);" onBlur="javascript:return custom_ONBLUR(\'caactdclsdet\',this);" id="cashTreasuryRefNo" name="' + groupName + '.cashTreasuryRefNo" hotKeyId="search8" ' + caactdclsProps.get("cashTreasuryRefNo_ENABLED") + ' type="text" class="Twotextfieldsearchicon" size="25" maxlength="16" fmnd="' + caactdclsProps.get("cashTreasuryRefNo_MANDATORY") + '" fmb="N" fdt="default" fblk="defaultFblk1">');
                write("<a id=\"sLnk14\" href=\"javascript:showDynCritSearcher('HTREFNO','tr_ref_num=:document.forms[0].cashTreasuryRefNo',':document.forms[0].cashTreasuryRefNo=tr_ref_num|:document.forms[0].cashRateCode=ratecode|:document.forms[0].cashRate=cust_rate|:document.forms[0].cashTreasuryRate=treasury_rate')\">");
                write('<img src="../images/' + applangcode + '/search_icon.gif" width="16" height="17" border="0" hotKeyId="search8"></img></a>');
                write('<input onChange="javascript:return custom_ONCHANGE(\'caactdclsdet\',this);" onBlur="javascript:return custom_ONBLUR(\'caactdclsdet\',this);" id="cashTreasuryRate" name="' + groupName + '.cashTreasuryRate" ' + caactdclsProps.get("cashTreasuryRate_ENABLED") + ' type="text" class="Twotextfieldsearchicon" size="25" maxlength="12" fmnd="' + caactdclsProps.get("cashTreasuryRate_MANDATORY") + '" fmb="N" fdt="frate" fblk="defaultFblk1">');
                write("</td>");
                write("</tr>")
            }
        }
        write("<tr>");
        write('<td class="textlabel">' + jspResArr.get("FLT018362") + "");
        write('<script>setMandatory("' + caactdclsProps.get("clsAmt_MANDATORY") + '");<\/script></td>');
        write('<td class="textfield">');
        write('<input onBlur="javascript:return custom_ONBLUR(\'caactdclsdet\',this);" id="clsAmt" name="' + groupName + '.clsAmt" ' + caactdclsProps.get("clsAmt_ENABLED") + ' type="text" class="textfieldinsidemultirec1" style="TEXT-ALIGN:right" size="5" maxlength="10" onChange="javascript:return caactdclsdet_ONCHANGE13(this,this);" fmnd="' + caactdclsProps.get("clsAmt_MANDATORY") + '" fmb="N" fdt="amount" fblk="defaultFblk1">');
        write('<select id="closureInd" name="' + groupName + '.closureInd" ' + caactdclsProps.get("closureInd_ENABLED") + ' class="twotextfieldamt" onChange="javascript:return caactdclsdet_ONCHANGE14(this,document.forms[0].clsAmt);" fmnd="' + caactdclsProps.get("closureInd_MANDATORY") + '" fmb="N" fdt="default" fblk="defaultFblk1" >');
        writeComboFunction("writeClosureIndForClosure");
        write("</select>");
        write("</td>");
        write("</tr>");
        if (sMudPoolProdFlg == "Y") {
            write("<tr>");
            write('<td class="textlabel">' + jspResArr.get("FLT021031") + "");
            write('<script>setMandatory("' + caactdclsProps.get("profitRate_MANDATORY") + '");<\/script></td>');
            write('<td class="textfield">');
            write('<input onChange="javascript:return custom_ONCHANGE(\'caactdclsdet\',this);" onBlur="javascript:return custom_ONBLUR(\'caactdclsdet\',this);" id="profitRate" name="' + groupName + '.profitRate" ' + caactdclsProps.get("profitRate_ENABLED") + ' type="text" maxlength="5" class="textfieldfont" fmnd="' + caactdclsProps.get("profitRate_MANDATORY") + '" fmb="Y" fdt="default" fblk="defaultFblk1">');
            write("</td>");
            write('<td colspan="5" class="rowspacing"><spacer type="block" width="1" height="1"></spacer></td>');
            write("</tr>")
        }
        if (sMudPoolProdFlg != "Y") {
            write("<tr>");
            write('<td class="textlabel">' + jspResArr.get("FLT017034") + "");
            write('<script>setMandatory("' + caactdclsProps.get("collectPenalInt_MANDATORY") + '");<\/script></td>');
            write('<td class="textfielddisplaylabel">');
            write('<input id="collectPenalInt" name="' + groupName + '.collectPenalInt" ' + caactdclsProps.get("collectPenalInt_ENABLED") + ' type="radio" value="Y" fmnd="' + caactdclsProps.get("collectPenalInt_MANDATORY") + '" fmb="N" fdt="default" fblk="defaultFblk1" onclick="collectPenalIntYes();">');
            write("" + jspResArr.get("FLT002964") + "");
            write('<input id="collectPenalInt" name="' + groupName + '.collectPenalInt" ' + caactdclsProps.get("collectPenalInt_ENABLED") + ' type="radio" value="N" checked fmnd="' + caactdclsProps.get("collectPenalInt_MANDATORY") + '" fmb="N" fdt="default" fblk="defaultFblk1" onclick="collectPenalIntNo();">');
            write("" + jspResArr.get("FLT002965") + "</td>");
            write("<td>&nbsp;</td>");
            write('<td class="textlabel">' + jspResArr.get("FLT017029") + "");
            write('<script>setMandatory("' + caactdclsProps.get("addPrefToPenalRate_MANDATORY") + '");<\/script></td>');
            write('<td class="textfielddisplaylabel">');
            write('<input id="addPrefToPenalRate" name="' + groupName + '.addPrefToPenalRate" ' + caactdclsProps.get("addPrefToPenalRate_ENABLED") + ' type="radio" value="A" fmnd="' + caactdclsProps.get("addPrefToPenalRate_MANDATORY") + '" fmb="N" fdt="default" fblk="defaultFblk1">');
            write("" + jspResArr.get("FLT009269") + "");
            write('<input id="addPrefToPenalRate" name="' + groupName + '.addPrefToPenalRate" ' + caactdclsProps.get("addPrefToPenalRate_ENABLED") + ' type="radio" value="N" fmnd="' + caactdclsProps.get("addPrefToPenalRate_MANDATORY") + '" fmb="N" fdt="default" fblk="defaultFblk1">');
            write("" + jspResArr.get("FLT009270") + "");
            write('<input id="addPrefToPenalRate" name="' + groupName + '.addPrefToPenalRate" ' + caactdclsProps.get("addPrefToPenalRate_ENABLED") + ' type="radio" value="Y" fmnd="' + caactdclsProps.get("addPrefToPenalRate_MANDATORY") + '" fmb="N" fdt="default" fblk="defaultFblk1">');
            write("Only if Non Zero</td>");
            write("</tr>")
        }
        write('<tr class="rowspacing">');
        write('<td colspan="5"><spacer type="block" width="1" height="1"></spacer></td>');
        write("</tr>");
        if (sMudPoolProdFlg != "Y") {
            write('<tr class="subhdrbg">');
            write('<td colspan="5" class="subhdr">' + jspResArr.get("FLT017048") + "</td>");
            write("</tr>");
            write('<tr class="rowspacing">');
            write('<td colspan="5"><spacer type="block" width="1" height="1"></spacer></td>');
            write("</tr>");
            write("<tr>");
            write('<td class="textlabel">' + jspResArr.get("FLT001584") + "");
            write('<script>setMandatory("' + caactdclsProps.get("intRate_MANDATORY") + '");<\/script></td>');
            write('<td class="textfield">');
            write('<input onChange="javascript:return custom_ONCHANGE(\'caactdclsdet\',this);" onBlur="javascript:return custom_ONBLUR(\'caactdclsdet\',this);" id="intRate" name="' + groupName + '.intRate" ' + caactdclsProps.get("intRate_ENABLED") + ' type="text" maxlength="10" class="amttxtField" fmnd="' + caactdclsProps.get("intRate_MANDATORY") + '" fmb="N" fdt="fpcnt" fblk="defaultFblk1">');
            write("</td>");
            write("<td>&nbsp;</td>");
            write('<td class="textlabel">' + jspResArr.get("FLT017060") + "");
            write('<script>setMandatory("' + caactdclsProps.get("preClsIntTblCode_MANDATORY") + '");<\/script></td>');
            write('<td class="textfield">');
            write('<input onBlur="javascript:return custom_ONBLUR(\'caactdclsdet\',this);" id="preClsIntTblCode" name="' + groupName + '.preClsIntTblCode" hotKeyId="search9" ' + caactdclsProps.get("preClsIntTblCode_ENABLED") + ' type="text" maxlength="5" class="textfieldfont" fmnd="' + caactdclsProps.get("preClsIntTblCode_MANDATORY") + '" fmb="N" fdt="default" fblk="defaultFblk1" onChange="javascript:return caactdclsdet_ONCHANGE15(this,\'preClsIntTblCodeDesc\');">');
            write("&nbsp;");
            write("<a id=\"sLnk6\" href=\"javascript:showIntTblCodeWithVersion(objForm.preClsIntTblCode,'T',objForm.preClsIntTblCodeDesc,'V','')\">");
            write('<img src="../images/' + applangcode + '/search_icon.gif" width="16" height="17" border="0" hotKeyId="search9"></a>');
            write("<br>");
            write('<input onChange="javascript:return custom_ONCHANGE(\'caactdclsdet\',this);" onBlur="javascript:return custom_ONBLUR(\'caactdclsdet\',this);" id="preClsIntTblCodeDesc" name="' + groupName + '.preClsIntTblCodeDesc" type="text" disabled="true" class="label" size="25" maxlength="25" fdt="default" fblk="defaultFblk1" fds="Y">');
            write("</td>");
            write("</tr>")
        }
        write("<tr>");
        write('<td height="23" class="textlabel">' + jspResArr.get("FLT017059") + "");
        write('<script>setMandatory("' + caactdclsProps.get("preClsFee_MANDATORY") + '");<\/script></td>');
        write('<td class="textfield">');
        write('<input onChange="javascript:return custom_ONCHANGE(\'caactdclsdet\',this);" id="preClsFee" name="' + groupName + '.preClsFee" ' + caactdclsProps.get("preClsFee_ENABLED") + ' type="text" maxlength="17" class="amttxtField" onBlur="javascript:return caactdclsdet_ONBLUR16(this,this);" fmnd="' + caactdclsProps.get("preClsFee_MANDATORY") + '" fmb="N" fdt="amount" fblk="defaultFblk1">');
        write("</td>");
        if (sMudPoolProdFlg != "Y") {
            write("<td>&nbsp;</td>");
            write('<td class="textlabel">' + jspResArr.get("FLT017040") + "");
            write('<script>setMandatory("' + caactdclsProps.get("feeCrCcy_MANDATORY") + '");<\/script></td>');
            write('<td class="textfielddisplaylabel">');
            write('<input id="feeCrCcy" name="' + groupName + '.feeCrCcy" ' + caactdclsProps.get("feeCrCcy_ENABLED") + ' type="radio" value="H" onClick="javascript:return caactdclsdet_ONCLICK17(this,this,this);" fmnd="' + caactdclsProps.get("feeCrCcy_MANDATORY") + '" fmb="N" fdt="default" fblk="defaultFblk1">');
            write("" + jspResArr.get("FLT002290") + "");
            write('<input id="feeCrCcy" name="' + groupName + '.feeCrCcy" ' + caactdclsProps.get("feeCrCcy_ENABLED") + ' type="radio" value="A" checked onClick="javascript:return caactdclsdet_ONCLICK18(this,this,this);" fmnd="' + caactdclsProps.get("feeCrCcy_MANDATORY") + '" fmb="N" fdt="default" fblk="defaultFblk1">');
            write("" + jspResArr.get("FLT009685") + "</td>")
        }
        write("</tr>");
        if (sMudPoolProdFlg != "Y") {
            write("<tr>");
            write('<td class="textlabel">' + jspResArr.get("FLT017041") + "");
            write('<script>setMandatory("' + caactdclsProps.get("feeCrRateCode_MANDATORY") + '");<\/script></td>');
            write('<td class="textfield">');
            write('<input onBlur="javascript:return custom_ONBLUR(\'caactdclsdet\',this);" id="feeCrRateCode" name="' + groupName + '.feeCrRateCode" hotKeyId="search10" ' + caactdclsProps.get("feeCrRateCode_ENABLED") + ' type="text" class="twotextfieldsearchicon" size="9" maxlength="5" onChange="javascript:return caactdclsdet_ONCHANGE19(this,this,objForm.feeCrRate,objForm.feeTreasuryRefNo,objForm.feeTreasuryRate,\'F\');" fmnd="' + caactdclsProps.get("feeCrRateCode_MANDATORY") + '" fmb="N" fdt="default" fblk="defaultFblk1">');
            write("&nbsp;");
            write('<a id="sLnk7" href="javascript:locShowRateCodesCommon(objForm.feeCrRateCode,objForm.feeCrRate,objForm.feeTreasuryRefNo,objForm.feeTreasuryRate,\'F\')">');
            write('<img src="../images/' + applangcode + '/search_icon.gif" width="16" height="17" border="0" hotKeyId="search10"></a>');
            write("&nbsp;");
            write('<input onChange="javascript:return custom_ONCHANGE(\'caactdclsdet\',this);" onBlur="javascript:return custom_ONBLUR(\'caactdclsdet\',this);" id="feeCrRate" name="' + groupName + '.feeCrRate" ' + caactdclsProps.get("feeCrRate_ENABLED") + ' type="text" class="twotextfieldsearchicon" size="9" maxlength="12" fmnd="' + caactdclsProps.get("feeCrRate_MANDATORY") + '" fmb="N" fdt="frate" fblk="defaultFblk1">');
            write("<br>");
            write("</td>");
            write("<td>&nbsp;</td>");
            write('<td class="textlabel">' + jspResArr.get("FLT014278") + "");
            write('<script>setMandatory("' + caactdclsProps.get("feeTreasuryRefNo_MANDATORY") + '");<\/script></td>');
            write('<td class="textfield">');
            write('<input onChange="javascript:return custom_ONCHANGE(\'caactdclsdet\',this);" onBlur="javascript:return custom_ONBLUR(\'caactdclsdet\',this);" id="feeTreasuryRefNo" name="' + groupName + '.feeTreasuryRefNo" hotKeyId="search11" ' + caactdclsProps.get("feeTreasuryRefNo_ENABLED") + ' type="text" class="twotextfieldsearchicon" size="25" maxlength="16" fmnd="' + caactdclsProps.get("feeTreasuryRefNo_MANDATORY") + '" fmb="N" fdt="default" fblk="defaultFblk1">');
            write("<a id=\"sLnk12\" href=\"javascript:showDynCritSearcher('HTREFNO','tr_ref_num=:document.forms[0].feeTreasuryRefNo',':document.forms[0].feeTreasuryRefNo=tr_ref_num|:document.forms[0].feeCrRateCode=ratecode|:document.forms[0].feeCrRate=cust_rate|:document.forms[0].feeTreasuryRate=treasury_rate')\">");
            write('<img src="../images/' + applangcode + '/search_icon.gif" width="16" height="17" border="0" hotKeyId="search11"></img></a>');
            write("&nbsp;");
            write('<input onChange="javascript:return custom_ONCHANGE(\'caactdclsdet\',this);" onBlur="javascript:return custom_ONBLUR(\'caactdclsdet\',this);" id="feeTreasuryRate" name="' + groupName + '.feeTreasuryRate" ' + caactdclsProps.get("feeTreasuryRate_ENABLED") + ' type="text" class="twotextfieldsearchicon" size="25" maxlength="12" fmnd="' + caactdclsProps.get("feeTreasuryRate_MANDATORY") + '" fmb="N" fdt="frate" fblk="defaultFblk1">');
            write("</td>");
            write("</tr>");
            write("<tr>");
            if (depType == "U") {
                write('<td class="textlabel">' + jspResArr.get("FLT018364") + "");
                write('<script>setMandatory("' + caactdclsProps.get("totPenalAmt_MANDATORY") + '");<\/script></td>');
                write('<td class="textfield">');
                write('<input onChange="javascript:return custom_ONCHANGE(\'caactdclsdet\',this);" id="totPenalAmt" name="' + groupName + '.totPenalAmt" explodeId="explode1" ' + caactdclsProps.get("totPenalAmt_ENABLED") + ' type="text" maxlength="10" class="textfieldfont" style="TEXT-ALIGN:right" onblur="javascript:return caactdclsdet_ONBLUR20(this,format,document.forms[0].totPenalAmt,stotPenalCrncyCode,\'N\');" fmnd="' + caactdclsProps.get("totPenalAmt_MANDATORY") + '" fmb="N" fdt="amount" fblk="defaultFblk1">');
                write("&nbsp;&nbsp;");
                write("<a id=\"sLnk8\" href=\"javascript:showDynSearcher('PENINTIQ','acct_id=:TDAcctId')\">");
                write('<img src="../images/' + applangcode + '/explode.gif" width="15" height="16" border="0" explodeId="explode1"></a>');
                write("</td>");
                write("<td>&nbsp;</td>")
            }
            write('<td class="textlabel">' + jspResArr.get("FLT018365") + "");
            write('<script>setMandatory("' + caactdclsProps.get("absPenalIntAmt_MANDATORY") + '");<\/script></td>');
            write('<td class="textfield">');
            write('<input onChange="javascript:return custom_ONCHANGE(\'caactdclsdet\',this);" id="absPenalIntAmt" name="' + groupName + '.absPenalIntAmt" ' + caactdclsProps.get("absPenalIntAmt_ENABLED") + ' type="text" maxlength="10" class="textfieldfont" style="TEXT-ALIGN:right" onblur="javascript:return caactdclsdet_ONBLUR21(this,format,document.forms[0].absPenalIntAmt,sabsPenalCrncyCode,\'N\');" fmnd="' + caactdclsProps.get("absPenalIntAmt_MANDATORY") + '" fmb="N" fdt="amount" fblk="defaultFblk1">');
            write("&nbsp;&nbsp;</td>");
            write("</tr>");
            write("<tr>");
            write('<td class="textlabel">' + jspResArr.get("FLT014321") + "");
            write('<script>setMandatory("' + caactdclsProps.get("calcOverdueInt_MANDATORY") + '");<\/script></td>');
            write('<td class="textfielddisplaylabel">');
            write('<input id="calcOverdueInt" name="' + groupName + '.calcOverdueInt" ' + caactdclsProps.get("calcOverdueInt_ENABLED") + ' type="radio" value="Y" fmnd="' + caactdclsProps.get("calcOverdueInt_MANDATORY") + '" fmb="N" fdt="default" fblk="defaultFblk1">');
            write("" + jspResArr.get("FLT002964") + "");
            write('<input id="calcOverdueInt" name="' + groupName + '.calcOverdueInt" ' + caactdclsProps.get("calcOverdueInt_ENABLED") + ' type="radio" value="N" checked fmnd="' + caactdclsProps.get("calcOverdueInt_MANDATORY") + '" fmb="N" fdt="default" fblk="defaultFblk1">');
            write("" + jspResArr.get("FLT002965") + "</td>");
            write("<td>&nbsp;</td>");
            write('<td class="textlabel">' + jspResArr.get("FLT014305") + "");
            write('<script>setMandatory("' + caactdclsProps.get("overdueIntCode_MANDATORY") + '");<\/script></td>');
            write('<td class="textfield">');
            write('<input onBlur="javascript:return custom_ONBLUR(\'caactdclsdet\',this);" id="overdueIntCode" name="' + groupName + '.overdueIntCode" hotKeyId="search12" ' + caactdclsProps.get("overdueIntCode_ENABLED") + ' type="text" maxlength="5" class="textfieldfont" fmnd="' + caactdclsProps.get("overdueIntCode_MANDATORY") + '" fmb="N" fdt="default" fblk="defaultFblk1" onChange="javascript:return caactdclsdet_ONCHANGE22(this,\'overdueIntCodeDesc\');">');
            write("&nbsp;");
            write("<a id=\"sLnk9\" href=\"javascript:showIntTblCodeWithVersion(objForm.overdueIntCode,'T',objForm.overdueIntCodeDesc,'V','')\">");
            write('<img src="../images/' + applangcode + '/search_icon.gif" width="16" height="17" border="0" hotKeyId="search12"></a>');
            write("<br>");
            write('<input onChange="javascript:return custom_ONCHANGE(\'caactdclsdet\',this);" onBlur="javascript:return custom_ONBLUR(\'caactdclsdet\',this);" id="overdueIntCodeDesc" name="' + groupName + '.overdueIntCodeDesc" type="text" disabled="true" class="label" size="25" maxlength="25" fdt="default" fblk="defaultFblk1" fds="Y">');
            write("</td>");
            write("</tr>")
        }
        write('<tr class="rowspacing">');
        write('<td colspan="5"><spacer type="block" width="1" height="1"></spacer></td>');
        write("</tr>");
        write("</table>");
        write("</td>");
        write("</tr>");
        write("</table>");
        write("</td>");
        write("</tr>");
        write("</table>");
        write("</td>");
        write("</tr>");
        write("</table>");
        write("</td>");
        write("</tr>");
        write("</table>");
        write("<table>");
        write('<tr class="rowspacing">');
        write('<td colspan="5"><spacer type="block" height="1" width="1"></spacer></td>');
        write("</tr>");
        write("</table>");
        write("</div>")
    }
}

function printFooterBlock() {
    with(document) {
        if ((sReferralMode == "I") || (sReferralMode == "S")) {
            write('<div class="ctable">');
            if (sReferralMode == "S") {
                write('<input type="button" class="Button" id="Submit" value="' + jspResArr.get("FLT000193") + '" onClick="javascript:return doRefSubmit(this);"	hotKeyId="Submit" >')
            }
            writeRefFooter();
            write('<input type="button" class="Button" id="_BackRef_" value="' + jspResArr.get("FLT000192") + '" onClick="javascript:return doSubmit(this.id);" hotKeyId="Cancel" >');
            write("</div>")
        } else {
            write('<div class="ctable">');
            write('<input id="Submit" name="Submit" type="button" class="button" onClick="javascript:return caactdclsdet_ONCLICK23(this,this);" value="' + jspResArr.get("FLT000193") + '" hotKeyId="Submit">');
            write('<input id="Validate" name="Validate" type="button" class="button" onClick="javascript:return caactdclsdet_ONCLICK24(this,this);" value="' + jspResArr.get("FLT000194") + '" hotKeyId="Validate">');
            write('<input id="Cancel" name="Cancel" type="button" class="button" onClick="javascript:return caactdclsdet_ONCLICK25(this,this);" value="' + jspResArr.get("FLT001721") + '" hotKeyId="Cancel">');
            writeFooter();
            write("</div>")
        }
    }
}

function fnPopulateControlValues() {
    var a = document.forms[0];
    a.printReport.value = printReport;
    a.closeMode.value = closeMode;
    a.repymntAcctId.value = repymntAcctId;
    a.repymntAcctCrncy.value = repymntAcctCrncy;
    a.repymntAcctSolId.value = repymntAcctSolId;
    a.repymntAcctName.value = repymntAcctName;
    a.repymntFwContractNo.value = repymntFwContractNo;
    a.repymntFwSolId.value = repymntFwSolId;
    a.rateCode.value = rateCode;
    a.rate.value = rate;
    a.genTreasuryRefNo.value = genTreasuryRefNo;
    a.genTreasuryRate.value = genTreasuryRate;
    a.cashRateCode.value = cashRateCode;
    a.cashRate.value = cashRate;
    a.cashTreasuryRefNo.value = cashTreasuryRefNo;
    a.cashTreasuryRate.value = cashTreasuryRate;
    a.cashCCYCode.value = cashCCYCode;
    a.cashCCYDesc.value = cashCCYDesc;
    a.clsAmt.value = clsAmt;
    a.closureInd.value = closureInd;
    a.collectPenalInt.value = collectPenalInt;
    a.addPrefToPenalRate.value = addPrefToPenalRate;
    a.intRate.value = intRate;
    a.preClsIntTblCode.value = preClsIntTblCode;
    a.preClsFee.value = preClsFee;
    a.feeCrCcy.value = feeCrCcy;
    a.feeCrRateCode.value = feeCrRateCode;
    a.feeCrRate.value = feeCrRate;
    a.feeTreasuryRefNo.value = feeTreasuryRefNo;
    a.feeTreasuryRate.value = feeTreasuryRate;
    a.totPenalAmt.value = totPenalAmt;
    a.absPenalIntAmt.value = absPenalIntAmt;
    a.calcOverdueInt.value = calcOverdueInt;
    a.overdueIntCode.value = overdueIntCode;
    a.satisfyLoanAcctflg.value = satisfyLoanAcctflg;
    a.preClsIntTblCodeDesc.value = preClsIntTblCodeDesc;
    a.overdueIntCodeDesc.value = overdueIntCodeDesc;
    if ((sReferralMode == "I") || (sReferralMode == "S")) {
        fnDisableFormDataControls("V", a, 0)
    }
}

function caactdclsdet_ONKEYDOWN1(b, c) {
    var a = "";
    if (preEventCall("caactdclsdet", b, "ONKEYDOWN") == false) {
        return false
    }
    if (preEventCallForLocale("caactdclsdet", b, "ONKEYDOWN") == false) {
        return false
    }
    if ((a = fnKeyDownProcessor(c)) == false) {
        return false
    }
    if (postEventCallForLocale("caactdclsdet", b, "ONKEYDOWN") == false) {
        return false
    }
    if (postEventCall("caactdclsdet", b, "ONKEYDOWN") == false) {
        return false
    }
    return (a == undefined) ? true : a
}

function caactdclsdet_ONKEYUP2(b, c) {
    var a = "";
    if (preEventCall("caactdclsdet", b, "ONKEYUP") == false) {
        return false
    }
    if (preEventCallForLocale("caactdclsdet", b, "ONKEYUP") == false) {
        return false
    }
    if ((a = fnKeyUpProcessor(c)) == false) {
        return false
    }
    if (postEventCallForLocale("caactdclsdet", b, "ONKEYUP") == false) {
        return false
    }
    if (postEventCall("caactdclsdet", b, "ONKEYUP") == false) {
        return false
    }
    return (a == undefined) ? true : a
}

function caactdclsdet_ONLOAD3(c) {
    var b = "";
    var a = document.forms[0];
    if (pre_ONLOAD("caactdclsdet", c) == false) {
        return false
    }
    if (preEventCallForLocale("caactdclsdet", c, "ONLOAD") == false) {
        return false
    }
    if ((b = fnOnLoad()) == false) {
        return false
    }
    if (postEventCallForLocale("caactdclsdet", c, "ONLOAD") == false) {
        return false
    }
    fnPopUpExceptionWindow(a.actionCode);
    if (post_ONLOAD("caactdclsdet", c) == false) {
        return false
    }
    return (b == undefined) ? true : b
}

function caactdclsdet_ONSUBMIT4(b) {
    var a = "";
    if (preEventCall("caactdclsdet", b, "ONSUBMIT") == false) {
        return false
    }
    if (preEventCallForLocale("caactdclsdet", b, "ONSUBMIT") == false) {
        return false
    }
    if ((a = false)) {
        return false
    }
    if (postEventCallForLocale("caactdclsdet", b, "ONSUBMIT") == false) {
        return false
    }
    if (postEventCall("caactdclsdet", b, "ONSUBMIT") == false) {
        return false
    }
    return (a == undefined) ? true : a
}

function caactdclsdet_ONCHANGE5(b) {
    var a = "";
    if (preEventCall("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    if (preEventCallForLocale("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    if ((a = fnEnableDisableRepCashFlds()) == false) {
        return false
    }
    if (postEventCallForLocale("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    if (postEventCall("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    return (a == undefined) ? true : a
}

function caactdclsdet_ONCHANGE6(b) {
    var a = "";
    if (preEventCall("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    if (preEventCallForLocale("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    if ((a = fnEnableDisableRepCashFlds()) == false) {
        return false
    }
    if (postEventCallForLocale("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    if (postEventCall("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    return (a == undefined) ? true : a
}

function caactdclsdet_ONCHANGE7(b, c) {
    var a = "";
    if (preEventCall("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    if (preEventCallForLocale("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    if ((a = fnProcessAcctDtls(c)) == false) {
        return false
    }
    if (postEventCallForLocale("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    if (postEventCall("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    return (a == undefined) ? true : a
}

function caactdclsdet_ONCHANGE8(b) {
    var a = "";
    if (preEventCall("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    if (preEventCallForLocale("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    if ((a = enableRateCodesForFwContract()) == false) {
        return false
    }
    if (postEventCallForLocale("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    if (postEventCall("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    return (a == undefined) ? true : a
}

function caactdclsdet_ONCHANGE9(b) {
    var a = "";
    if (preEventCall("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    if (preEventCallForLocale("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    if ((a = enableRateCodesForFwContract()) == false) {
        return false
    }
    if (postEventCallForLocale("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    if (postEventCall("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    return (a == undefined) ? true : a
}

function caactdclsdet_ONCHANGE10(f, g, e, c, b, a) {
    var d = "";
    if (preEventCall("caactdclsdet", f, "ONCHANGE") == false) {
        return false
    }
    if (preEventCallForLocale("caactdclsdet", f, "ONCHANGE") == false) {
        return false
    }
    if ((d = fnProcessRateDtls(g, e, c, b, a)) == false) {
        return false
    }
    if (postEventCallForLocale("caactdclsdet", f, "ONCHANGE") == false) {
        return false
    }
    if (postEventCall("caactdclsdet", f, "ONCHANGE") == false) {
        return false
    }
    return (d == undefined) ? true : d
}

function caactdclsdet_ONCHANGE11(b) {
    var a = "";
    if (preEventCall("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    if (preEventCallForLocale("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    if ((a = fnOnChangeCrncyCode()) == false) {
        return false
    }
    if (postEventCallForLocale("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    if (postEventCall("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    return (a == undefined) ? true : a
}

function caactdclsdet_ONCHANGE12(f, g, e, c, b, a) {
    var d = "";
    if (preEventCall("caactdclsdet", f, "ONCHANGE") == false) {
        return false
    }
    if (preEventCallForLocale("caactdclsdet", f, "ONCHANGE") == false) {
        return false
    }
    if ((d = fnProcessRateDtls(g, e, c, b, a)) == false) {
        return false
    }
    if (postEventCallForLocale("caactdclsdet", f, "ONCHANGE") == false) {
        return false
    }
    if (postEventCall("caactdclsdet", f, "ONCHANGE") == false) {
        return false
    }
    return (d == undefined) ? true : d
}

function caactdclsdet_ONCHANGE13(b, c) {
    var a = "";
    if (preEventCall("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    if (preEventCallForLocale("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    if ((a = locFormatClsAmt(c)) == false) {
        return false
    }
    if (postEventCallForLocale("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    if (postEventCall("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    return (a == undefined) ? true : a
}

function caactdclsdet_ONCHANGE14(b, c) {
    var a = "";
    if (preEventCall("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    if (preEventCallForLocale("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    if ((a = locFormatClsAmt(c)) == false) {
        return false
    }
    if (postEventCallForLocale("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    if (postEventCall("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    return (a == undefined) ? true : a
}

function caactdclsdet_ONCHANGE15(b, c) {
    var a = "";
    if (preEventCall("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    if (preEventCallForLocale("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    if ((a = clearDescField(c)) == false) {
        return false
    }
    if (postEventCallForLocale("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    if (postEventCall("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    return (a == undefined) ? true : a
}

function caactdclsdet_ONBLUR16(b, c) {
    var a = "";
    if (preEventCall("caactdclsdet", b, "ONBLUR") == false) {
        return false
    }
    if (preEventCallForLocale("caactdclsdet", b, "ONBLUR") == false) {
        return false
    }
    if ((a = locFormatFeeAmt(c)) == false) {
        return false
    }
    if (postEventCallForLocale("caactdclsdet", b, "ONBLUR") == false) {
        return false
    }
    if (postEventCall("caactdclsdet", b, "ONBLUR") == false) {
        return false
    }
    return (a == undefined) ? true : a
}

function caactdclsdet_ONCLICK17(c, d, b) {
    var a = "";
    if (preEventCall("caactdclsdet", c, "ONCLICK") == false) {
        return false
    }
    if (preEventCallForLocale("caactdclsdet", c, "ONCLICK") == false) {
        return false
    }
    if ((a = handleFeeRateFlds(d)) == false) {
        return false
    }
    if ((a = reformatFeeAmt(b)) == false) {
        return false
    }
    if (postEventCallForLocale("caactdclsdet", c, "ONCLICK") == false) {
        return false
    }
    if (postEventCall("caactdclsdet", c, "ONCLICK") == false) {
        return false
    }
    return (a == undefined) ? true : a
}

function caactdclsdet_ONCLICK18(c, d, b) {
    var a = "";
    if (preEventCall("caactdclsdet", c, "ONCLICK") == false) {
        return false
    }
    if (preEventCallForLocale("caactdclsdet", c, "ONCLICK") == false) {
        return false
    }
    if ((a = handleFeeRateFlds(d)) == false) {
        return false
    }
    if ((a = reformatFeeAmt(b)) == false) {
        return false
    }
    if (postEventCallForLocale("caactdclsdet", c, "ONCLICK") == false) {
        return false
    }
    if (postEventCall("caactdclsdet", c, "ONCLICK") == false) {
        return false
    }
    return (a == undefined) ? true : a
}

function caactdclsdet_ONCHANGE19(f, g, e, c, b, a) {
    var d = "";
    if (preEventCall("caactdclsdet", f, "ONCHANGE") == false) {
        return false
    }
    if (preEventCallForLocale("caactdclsdet", f, "ONCHANGE") == false) {
        return false
    }
    if ((d = fnProcessRateDtls(g, e, c, b, a)) == false) {
        return false
    }
    if (postEventCallForLocale("caactdclsdet", f, "ONCHANGE") == false) {
        return false
    }
    if (postEventCall("caactdclsdet", f, "ONCHANGE") == false) {
        return false
    }
    return (d == undefined) ? true : d
}

function caactdclsdet_ONBLUR20(e, f, d, b, a) {
    var c = "";
    if (preEventCall("caactdclsdet", e, "ONBLUR") == false) {
        return false
    }
    if (preEventCallForLocale("caactdclsdet", e, "ONBLUR") == false) {
        return false
    }
    if ((c = newformatAmt(f, d, b, a)) == false) {
        return false
    }
    if (postEventCallForLocale("caactdclsdet", e, "ONBLUR") == false) {
        return false
    }
    if (postEventCall("caactdclsdet", e, "ONBLUR") == false) {
        return false
    }
    return (c == undefined) ? true : c
}

function caactdclsdet_ONBLUR21(e, f, d, b, a) {
    var c = "";
    if (preEventCall("caactdclsdet", e, "ONBLUR") == false) {
        return false
    }
    if (preEventCallForLocale("caactdclsdet", e, "ONBLUR") == false) {
        return false
    }
    if ((c = newformatAmt(f, d, b, a)) == false) {
        return false
    }
    if (postEventCallForLocale("caactdclsdet", e, "ONBLUR") == false) {
        return false
    }
    if (postEventCall("caactdclsdet", e, "ONBLUR") == false) {
        return false
    }
    return (c == undefined) ? true : c
}

function caactdclsdet_ONCHANGE22(b, c) {
    var a = "";
    if (preEventCall("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    if (preEventCallForLocale("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    if ((a = clearDescField(c)) == false) {
        return false
    }
    if (postEventCallForLocale("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    if (postEventCall("caactdclsdet", b, "ONCHANGE") == false) {
        return false
    }
    return (a == undefined) ? true : a
}

function caactdclsdet_ONCLICK23(b, c) {
    var a = "";
    if (preEventCall("caactdclsdet", b, "ONCLICK") == false) {
        return false
    }
    if (preEventCallForLocale("caactdclsdet", b, "ONCLICK") == false) {
        return false
    }
    if ((a = fnOnButtonClick(c)) == false) {
        return false
    }
    if (postEventCallForLocale("caactdclsdet", b, "ONCLICK") == false) {
        return false
    }
    if (postEventCall("caactdclsdet", b, "ONCLICK") == false) {
        return false
    }
    return (a == undefined) ? true : a
}

function caactdclsdet_ONCLICK24(b, c) {
    var a = "";
    if (preEventCall("caactdclsdet", b, "ONCLICK") == false) {
        return false
    }
    if (preEventCallForLocale("caactdclsdet", b, "ONCLICK") == false) {
        return false
    }
    if ((a = fnOnButtonClick(c)) == false) {
        return false
    }
    if (postEventCallForLocale("caactdclsdet", b, "ONCLICK") == false) {
        return false
    }
    if (postEventCall("caactdclsdet", b, "ONCLICK") == false) {
        return false
    }
    return (a == undefined) ? true : a
}

function caactdclsdet_ONCLICK25(b, c) {
    var a = "";
    if (preEventCall("caactdclsdet", b, "ONCLICK") == false) {
        return false
    }
    if (preEventCallForLocale("caactdclsdet", b, "ONCLICK") == false) {
        return false
    }
    if ((a = fnOnButtonClick(c)) == false) {
        return false
    }
    if (postEventCallForLocale("caactdclsdet", b, "ONCLICK") == false) {
        return false
    }
    if (postEventCall("caactdclsdet", b, "ONCLICK") == false) {
        return false
    }
    return (a == undefined) ? true : a
}

function writeCloseModeForClosure() {
    with(document) {
        write('<OPTION SELECTED VALUE="">' + jspResArr.get("FLT012410") + "</OPTION>");
        write('<OPTION VALUE="C">' + jspResArr.get("FLT018379") + "</OPTION>");
        write('<OPTION VALUE="B">' + jspResArr.get("FLT012018") + "</OPTION>");
        write('<OPTION VALUE="Y">' + jspResArr.get("FLT018380") + "</OPTION>");
        write('<OPTION VALUE="N">' + jspResArr.get("FLT018391") + "</OPTION>")
    }
}

function writeCloseModeForXferOutClosure() {
    with(document) {
        write('<OPTION SELECTED VALUE="">' + jspResArr.get("FLT012410") + "</OPTION>");
        write('<OPTION VALUE="Y">' + jspResArr.get("FLT018380") + "</OPTION>");
        write('<OPTION VALUE="N">' + jspResArr.get("FLT018391") + "</OPTION>")
    }
}

function writeClosureIndForClosure() {
    with(document) {
        write('<OPTION SELECTED VALUE="">' + jspResArr.get("FLT012410") + "</OPTION>");
        write('<OPTION VALUE="C">' + jspResArr.get("FLT012038") + "</OPTION>");
        write('<OPTION VALUE="T">' + jspResArr.get("FLT013028") + "</OPTION>")
    }
};
