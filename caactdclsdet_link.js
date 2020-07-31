var objForm = null;
var tmpAcctObjVal = null;
var tmpAcctObj = null;
var tmpCrncyCodeObjVal = null;
var tmpCrncyCodeObj = null;
var tmpRateCdVal = null;
var tmpRateCd = null;
var CLS_FUNC_CODE = "Z";
var TRL_CLS_FUNC_CODE = "L";
var XFER_OUT_FUNC_CODE = "T";
var VFY_FUNC_CODE = "V";
var CNCL_FUNC_CODE = "X";
var INQ_FUNC_CODE = "I";
var CD_DEP_TYPE = "C";
var ND_DEP_TYPE = "N";
var VAL_YES = "Y";
var VAL_NO = "N";
var ENABLE_IND = "E";
var DISABLE_IND = "D";
var HOME_CRNCY = "H";
var ACCT_CRNCY = "A";
var GEN_RATE_DTLS = "G";
var FEE_RATE_DTLS = "F";
var REP_IN_CASH = "C";
var REP_IN_BOTH_ACCT_CASH = "B";
var CUSTOMER_INDUCED = "N";
var CASH_RATE_DTLS = "C";
var TU_DEP_TYPE = "U";
var tmpRepymntAcctIdObj = null;

function fnOnLoad() {
    objForm = document.forms[0];
    document.title = sMenuTitle;
    initFocusHandler();
    objForm.TDAcctId.value = TDAcctId;
    if (funcCode == XFER_OUT_FUNC_CODE) {
        fnPopulateControlValuesForXferMode()
    } else {
        if (depType == TU_DEP_TYPE) {
            if (sMudPoolProdFlg != "Y") {
                fnPopulateControlValues()
            }
            if (sMudPoolProdFlg == "Y") {
                fnPopulateControlValuesForMud()
            }
        } else {
            fnPopulateControlValuesForTD()
        }
    }
    checkRadio(objForm.printReport, printReport);
    if (sMudPoolProdFlg != "Y") {
        checkRadio(objForm.collectPenalInt, collectPenalInt);
        checkRadio(objForm.satisfyLoanAcctflg, satisfyLoanAcctflg);
        checkRadio(objForm.addPrefToPenalRate, addPrefToPenalRate);
        checkRadio(objForm.feeCrCcy, feeCrCcy);
        checkRadio(objForm.calcOverdueInt, calcOverdueInt);
        if (getAmtInFloat(objForm.preClsFee.value) == 0) {
            objForm.preClsFee.value = ""
        }
        handleRateFlds()
    } else {
        checkRadio(objForm.satisfyLoanAcctflg, satisfyLoanAcctflg)
    }
    focusOnRadio(objForm.satisfyLoanAcctflg);
    fnEnableDisableRepCashFlds();
    if (isPreClsr == VAL_YES) {
        enableFields("collectPenalInt", "addPrefToPenalRate");
        if (funcCode == CLS_FUNC_CODE || funcCode == TRL_CLS_FUNC_CODE) {
            enableFields("intRate", "preClsIntTblCode", "preClsFee", "feeCrCcy", "feeCrRateCode", "feeCrRate", "feeTreasuryRefNo", "feeTreasuryRate", "absPenalIntAmt");
            if (sMudPoolProdFlg == "Y") {
                objForm.preClsFee.disabled = true
            }
            showImage("sLnk6");
            showImage("sLnk7");
            showImage("sLnk12")
        } else {
            if (funcCode == XFER_OUT_FUNC_CODE) {
                disableFields("intRate", "preClsIntTblCode", "preClsFee", "feeCrCcy", "feeCrRateCode", "feeCrRate", "feeTreasuryRefNo", "feeTreasuryRate");
                hideImage("sLnk6");
                hideImage("sLnk7");
                hideImage("sLnk12")
            }
        }
    } else {
        disableFields("collectPenalInt", "addPrefToPenalRate");
        if (depType == CD_DEP_TYPE || depType == ND_DEP_TYPE) {
            enableFields("intRate")
        } else {
            disableFields("intRate", "preClsIntTblCode", "absPenalIntAmt");
            hideImage("sLnk6");
            hideImage("sLnk7")
        }
    }
    if (productType == "K") {
        checkRadio(objForm.collectPenalInt, collectPenalInt);
        enableFields("intRate", "collectPenalInt")
    }
    if (minIntElgFlg == VAL_YES) {
        disableFields("intRate", "preClsIntTblCode", "absPenalIntAmt");
        hideImage("slnk6")
    }
    if (sMudPoolProdFlg != "Y") {
        if (wthDrwlAmtCrncy == homeCrncy) {
            disableFields("feeCrCcy", "feeCrRateCode", "feeCrRate", "feeTreasuryRefNo", "feeTreasuryRate");
            hideImage("sLnk7");
            hideImage("sLnk12")
        }
    }
    if (funcCode == TRL_CLS_FUNC_CODE) {
        fnEnableDisableRadioButtons(objForm.printReport, ENABLE_IND);
        checkRadio(objForm.printReport, printReport);
        if (sMudPoolProdFlg != "Y") {
            if (localeCode != "BE") {
                if (fnCompareDates(clsrValDate, BODDate)) {
                    enableFields("collectPenalInt", "addPrefToPenalRate")
                } else {
                    disableFields("collectPenalInt", "addPrefToPenalRate")
                }
            }
        }
    } else {
        fnEnableDisableRadioButtons(objForm.printReport, DISABLE_IND);
        objForm.printReport[0].setAttribute("fmnd", "N");
        objForm.printReport[1].setAttribute("fmnd", "N")
    }
    if (funcCode == VFY_FUNC_CODE) {
        checkRadio(objForm.printReport, VAL_YES)
    }
    if (sMudPoolProdFlg != "Y") {
        fnHandleFldsBasedOnRpmtAcctId()
    }
    if (funcCode == XFER_OUT_FUNC_CODE || funcCode == VFY_FUNC_CODE || funcCode == CNCL_FUNC_CODE) {
        disableFields("intRate", "preClsIntTblCode", "preClsFee", "feeCrCcy", "feeCrRateCode", "feeCrRate", "feeTreasuryRefNo", "feeTreasuryRate", "calcOverdueInt", "overdueIntCode");
        hideImage("sLnk6");
        hideImage("sLnk7");
        hideImage("sLnk12");
        hideImage("sLnk9")
    }
    if (objForm.printReport[0].disabled == false) {
        focusOnRadio(objForm.printReport)
    }
    if ((!isEmptyObjValue(isExcpExist) && isExcpExist == "Y" && isAcctFrozen != "Y") && funcCode != VFY_FUNC_CODE && funcCode != CNCL_FUNC_CODE) {
        fnDisableFormDataControls(INQ_FUNC_CODE, objForm, 11);
        showImage("sLnk1");
        objForm.Submit.disabled = true;
        objForm.Cancel.disabled = false
    }
    if (funcCode == VFY_FUNC_CODE || funcCode == CNCL_FUNC_CODE) {
        fnDisableFormDataControls(INQ_FUNC_CODE, objForm, 11);
        showImage("sLnk1");
        if ((objForm.Cancel != undefined) && (objForm.Cancel != null)) {
            objForm.Cancel.disabled = false
        }
        if ((objForm.Validate != undefined) && (objForm.Validate != null)) {
            objForm.Validate.disabled = true
        }
    }
    if (sMudPoolProdFlg != "Y") {
        sabsPenalCrncyCode = wthDrwlAmtCrncy;
        objForm.absPenalCrncyCode.value = wthDrwlAmtCrncy;
        stotPenalCrncyCode = wthDrwlAmtCrncy;
        objForm.totPenalCrncyCode.value = wthDrwlAmtCrncy;
        if (fetchRate == VAL_YES) {
            alert(finbranchResArr.get("FAT002025"))
        }
        if (depType == TU_DEP_TYPE) {
            newformatAmt(format, document.forms[0].totPenalAmt, stotPenalCrncyCode, "N")
        }
        newformatAmt(format, document.forms[0].absPenalIntAmt, sabsPenalCrncyCode, "N");
        enableOrDisableOverdueInFlag()
    }
    if (objForm.feeCrCcy.value == HOME_CRNCY) {
        enableFields("feeCrRateCode", "feeCrRate");
        showImage("sLnk7");
        showImage("sLnk12");
        objForm.feeCrRateCode.setAttribute("fmnd", "Y")
    } else {
        clearDescField("feeCrRateCode", "feeCrRate");
        disableFields("feeCrRateCode", "feeCrRate");
        hideImage("sLnk7");
        objForm.feeCrRateCode.setAttribute("fmnd", "N")
    }
    if (funcCode == CLS_FUNC_CODE || funcCode == TRL_CLS_FUNC_CODE) {
        enableFields("intRate")
    }
    if (localeCode == "BE") {
        if (fnCompareDates(clsrValDate, openEffectiveDate)) {
            objForm.preClsIntTblCode.value = "";
            objForm.overdueIntCode.value = "";
            checkRadio(objForm.collectPenalInt, "N");
            disableFields("collectPenalInt", "addPrefToPenalRate", "intRate", "preClsIntTblCode", "preClsFee", "feeCrCcy", "feeCrRateCode", "feeTreasuryRefNo", "absPenalIntAmt", "calcOverdueInt", "overdueIntCode");
            hideImage("sLnk6")
        }
    }
}

function enableOrDisableOverdueInFlag() {
    if (funcCode == VFY_FUNC_CODE || funcCode == CNCL_FUNC_CODE) {
        disableFields("calcOverdueInt", "overdueIntCode");
        hideImage("sLnk9")
    } else {
        if ((!fnCompareDates(clsrValDate, matDate)) && (isOdueDtlRqd == VAL_YES)) {
            enableFields("calcOverdueInt", "overdueIntCode");
            showImage("sLnk9")
        } else {
            disableFields("calcOverdueInt", "overdueIntCode");
            hideImage("sLnk9")
        }
    }
}

function handleRateFlds() {
    useRpmtAcctFlg = objForm.closeMode.value;
    if (useRpmtAcctFlg == VAL_YES || useRpmtAcctFlg == REP_IN_BOTH_ACCT_CASH || useRpmtAcctFlg == CUSTOMER_INDUCED) {
        var b = objForm.repymntAcctCrncy.value;
        if (!isEmptyObjValue(b) && b != wthDrwlAmtCrncy) {
            enableFields("repymntFwContractNo", "repymntFwSolId", "rateCode", "rate", "genTreasuryRefNo", "genTreasuryRate");
            showImage("sLnk3");
            showImage("sLnk10");
            showImage("sLnk11");
            showImage("sLnk13")
        } else {
            clearDescField("repymntFwContractNo", "repymntFwSolId", "rateCode", "rate", "genTreasuryRefNo", "genTreasuryRate");
            disableFields("repymntFwContractNo", "repymntFwSolId", "rateCode", "rate", "genTreasuryRefNo", "genTreasuryRate");
            hideImage("sLnk3");
            hideImage("sLnk10");
            hideImage("sLnk11");
            hideImage("sLnk13")
        }
    }
    if (useRpmtAcctFlg == REP_IN_CASH || useRpmtAcctFlg == REP_IN_BOTH_ACCT_CASH) {
        var a = objForm.cashCCYCode.value;
        objForm.cashCCYCode.value = a.toUpperCase();
        if (!isEmptyObjValue(objForm.cashCCYCode.value) && wthDrwlAmtCrncy != objForm.cashCCYCode.value) {
            enableFields("cashRateCode", "cashRate", "cashTreasuryRefNo", "cashTreasuryRate");
            showImage("sLnk5");
            showImage("sLnk14")
        } else {
            clearDescField("cashRateCode", "cashRate", "cashTreasuryRefNo", "cashTreasuryRate");
            disableFields("cashRateCode", "cashRate", "cashTreasuryRefNo", "cashTreasuryRate");
            hideImage("sLnk5");
            hideImage("sLnk14")
        }
    }
    checkAndInitializeRateFlds()
}

function checkAndInitializeRateFlds() {
    if (getAmtInFloat(objForm.rate.value) == 0) {
        objForm.rate.value = ""
    }
    if (getAmtInFloat(objForm.genTreasuryRate.value) == 0) {
        objForm.genTreasuryRate.value = ""
    }
    if (sMudPoolProdFlg != "Y") {
        if (getAmtInFloat(objForm.intRate.value) == 0) {
            objForm.intRate.value = ""
        }
        if (getAmtInFloat(objForm.feeCrRate.value) == 0) {
            objForm.feeCrRate.value = ""
        }
        if (getAmtInFloat(objForm.feeTreasuryRate.value) == 0) {
            objForm.feeTreasuryRate.value = ""
        }
    }
    if (funcCode != XFER_OUT_FUNC_CODE) {
        if (getAmtInFloat(objForm.cashRate.value) == 0) {
            objForm.cashRate.value = ""
        }
        if (getAmtInFloat(objForm.cashTreasuryRate.value) == 0) {
            objForm.cashTreasuryRate.value = ""
        }
    }
}

function locShowAccountIdList(e, c, d, a, b) {
    tmpAcctObjVal = e.value;
    tmpAcctObj = e;
    if (!window.showModalDialog) {
        callBackFn = "caactdclsdetCallBackFunc1"
    }
    showAccountIdList(e, c, d, a, b);
    if (window.showModalDialog) {
        if (!isEmptyObjValue(e.value)) {
            if (tmpAcctObjVal.toUpperCase() != e.value.toUpperCase()) {
                if (sMudPoolProdFlg != "Y") {
                    fnProcessAcctDtls(e)
                }
            }
        }
    }
}

function caactdclsdetCallBackFunc1() {
    if (!isEmptyObjValue(tmpAcctObj.value)) {
        if (tmpAcctObjVal.toUpperCase() != tmpAcctObj.value.toUpperCase()) {
            if (sMudPoolProdFlg != "Y") {
                fnProcessAcctDtls(tmpAcctObj)
            }
        }
    }
}

function fnProcessAcctDtls(a) {
    tmpRepymntAcctIdObj = a;
    if (!window.showModalDialog) {
        callBackFn_SDS = "fnProcessAcctDtlsCallBackFunc"
    }
    fetchAcctDtls(a, "repymntAcctName", "repymntAcctSolId", "repymntAcctCrncy", true, "VALACCTID");
    if (window.showModalDialog) {
        if (sMudPoolProdFlg != "Y") {
            clearDescField("repymntAcctCrncy", "repymntAcctSolId", "repymntAcctName", "rateCode", "rate", "genTreasuryRefNo", "genTreasuryRate");
            if (!isEmptyObjValue(a.value)) {
                if (!isEmptyObjValue(objForm.repymntAcctCrncy.value) && objForm.repymntAcctCrncy.value != wthDrwlAmtCrncy) {
                    enableFields("repymntFwContractNo", "repymntFwSolId", "rateCode", "rate", "genTreasuryRefNo", "genTreasuryRate");
                    showImage("sLnk3");
                    showImage("sLnk10");
                    showImage("sLnk11");
                    showImage("sLnk13")
                } else {
                    clearDescField("repymntFwContractNo", "repymntFwSolId", "rateCode", "rate", "genTreasuryRefNo", "genTreasuryRate");
                    disableFields("repymntFwContractNo", "repymntFwSolId", "rateCode", "rate", "genTreasuryRefNo", "genTreasuryRate");
                    hideImage("sLnk3");
                    hideImage("sLnk10");
                    hideImage("sLnk11");
                    hideImage("sLnk13")
                }
                doSubmit("GetAcctRateDtls")
            }
        }
    }
}

function fnProcessAcctDtlsCallBackFunc() {
    if (sMudPoolProdFlg != "Y") {
        clearDescField("repymntAcctCrncy", "repymntAcctSolId", "repymntAcctName", "rateCode", "rate", "genTreasuryRefNo", "genTreasuryRate");
        if (!isEmptyObjValue(tmpRepymntAcctIdObj.value)) {
            if (!isEmptyObjValue(objForm.repymntAcctCrncy.value) && objForm.repymntAcctCrncy.value != wthDrwlAmtCrncy) {
                enableFields("repymntFwContractNo", "repymntFwSolId", "rateCode", "rate", "genTreasuryRefNo", "genTreasuryRate");
                showImage("sLnk3");
                showImage("sLnk10");
                showImage("sLnk11");
                showImage("sLnk13")
            } else {
                clearDescField("repymntFwContractNo", "repymntFwSolId", "rateCode", "rate", "genTreasuryRefNo", "genTreasuryRate");
                disableFields("repymntFwContractNo", "repymntFwSolId", "rateCode", "rate", "genTreasuryRefNo", "genTreasuryRate");
                hideImage("sLnk3");
                hideImage("sLnk10");
                hideImage("sLnk11");
                hideImage("sLnk13")
            }
            doSubmit("GetAcctRateDtls")
        }
    }
}

function locShowRateCodesCommon(c, g, h, a, b) {
    tmpRateCdVal = c.value;
    tmpRateCd = c;
    var f = objForm.repymntAcctCrncy.value;
    var d = "";
    var e = getRadioValue(objForm.feeCrCcy);
    if (isEmptyObjValue(e)) {
        d = homeCrncy
    } else {
        if (e == HOME_CRNCY) {
            d = homeCrncy
        } else {
            if (e == ACCT_CRNCY) {
                d = wthDrwlAmtCrncy
            }
        }
    }
    if (!window.showModalDialog) {
        callBackFn = "caactdclsdetCallBackFunc4"
    }
    switch (b) {
        case GEN_RATE_DTLS:
            showRateCodesCommon(c, wthDrwlAmtCrncy, f, "", "B", g);
            break;
        case FEE_RATE_DTLS:
            if (sMudPoolProdFlg != "Y") {
                showRateCodesCommon(c, d, wthDrwlAmtCrncy, "", "B", g)
            }
            break;
        case CASH_RATE_DTLS:
            showRateCodesCommon(c, wthDrwlAmtCrncy, objForm.cashCCYCode.value, "", "B", g);
            break
    }
    if (window.showModalDialog) {
        if (!isEmptyObjValue(c.value)) {
            if (c.value != tmpRateCdVal) {
                fnProcessRateDtls(c, g, h, a, b)
            }
        }
    }
}

function caactdclsdetCallBackFunc4() {
    if (!isEmptyObjValue(tmpRateCd.value)) {
        if (tmpRateCd.value != tmpRateCdVal) {
            fnProcessRateDtls(rateCdObj, rateObj, treasRefNoObj, treasRateObj, rateCdType)
        }
    }
}

function fnProcessRateDtls(c, d, e, a, b) {
    if (isEmptyObjValue(c.value)) {
        clearDescField(d.id, e.id, a.id);
        return
    } else {
        switch (b) {
            case GEN_RATE_DTLS:
                doSubmit("GetGenRateDtls");
                break;
            case FEE_RATE_DTLS:
                doSubmit("GetFeeRateDtls");
                break;
            case CASH_RATE_DTLS:
                doSubmit("GetCashRateDtls");
                break
        }
    }
}

function fnHandleFldsBasedOnRpmtAcctId() {
    if (!isEmptyObjValue(objForm.repymntAcctId.value)) {
        if (!isEmptyObjValue(objForm.repymntAcctCrncy.value) && objForm.repymntAcctCrncy.value != wthDrwlAmtCrncy) {
            enableFields("repymntFwContractNo", "repymntFwSolId", "rateCode", "rate", "genTreasuryRefNo", "genTreasuryRate");
            showImage("sLnk3");
            showImage("sLnk10");
            showImage("sLnk11");
            showImage("sLnk13");
            if (!fnIsNull(objForm.repymntFwContractNo.value)) {
                disableFields("rateCode", "rate", "genTreasuryRate");
                hideImage("sLnk3")
            }
        } else {
            clearDescField("repymntFwContractNo", "repymntFwSolId", "rateCode", "rate", "genTreasuryRefNo", "genTreasuryRate");
            disableFields("repymntFwContractNo", "repymntFwSolId", "rateCode", "rate", "genTreasuryRefNo", "genTreasuryRate");
            hideImage("sLnk3");
            hideImage("sLnk10");
            hideImage("sLnk11");
            hideImage("sLnk13")
        }
    }
}

function locFormatFeeAmt(a) {
    if (sMudPoolProdFlg != "Y") {
        var c = null;
        var b = getRadioValue(objForm.feeCrCcy);
        if (isEmptyObjValue(b)) {
            c = homeCrncy
        } else {
            if (b == HOME_CRNCY) {
                c = homeCrncy
            } else {
                if (b == ACCT_CRNCY) {
                    c = wthDrwlAmtCrncy
                }
            }
        }
        newformatAmt(amtFmt, a, c, "N")
    }
}

function reformatFeeAmt(b) {
    var a = getRadioValue(b);
    var c = null;
    if (!isEmptyObjValue(objForm.preClsFee.value)) {
        if (a == HOME_CRNCY) {
            c = homeCrncy
        } else {
            if (a == ACCT_CRNCY) {
                c = wthDrwlAmtCrncy
            }
        }
        newformatAmt(amtFmt, objForm.preClsFee, c, "N")
    }
}

function handleFeeRateFlds(a) {
    if (a.value == HOME_CRNCY) {
        enableFields("feeCrRateCode", "feeCrRate");
        showImage("sLnk7");
        showImage("sLnk12");
        objForm.feeCrRateCode.setAttribute("fmnd", "Y");
        objForm.feeCrRateCode.value = dfltRateCode;
        fnProcessRateDtls(objForm.feeCrRateCode, objForm.feeCrRate, objForm.feeTreasuryRefNo, objForm.feeTreasuryRate, "F")
    } else {
        disableFields("feeCrRateCode", "feeCrRate");
        clearDescField("feeCrRateCode", "feeCrRate");
        hideImage("sLnk7");
        objForm.feeCrRateCode.setAttribute("fmnd", "N")
    }
}

function fnOnButtonClick(a) {
    if (a.id != Const.ACTION_CANCEL) {
        if (funcCode != CNCL_FUNC_CODE) {
            if (!fnValidateForm()) {
                return false
            }
        }
    } else {
        formReset(objForm)
    }
    doSubmit(a.id)
}

function fnValidateForm() {
    var b = objForm.elements;
    var a = b.length;
    var c = null;
    var d = null;
    if (objForm.closeMode.value == "B" && getAmtInFloat(objForm.clsAmt.value) <= 0) {
        alert(finbranchResArr.get("FAT000252"));
        objForm.clsAmt.focus();
        return false
    }
    if (!fnCheckNegativeAmt(objForm.preClsFee)) {
        return false
    }
    if (isEmptyObjValue(isExcpExist) || isExcpExist == "N") {
        if (fnValidateMandatoryFields()) {
            if (validateTypes(objForm)) {
                c = objForm.closeMode.value;
                if (c == VAL_YES || c == REP_IN_BOTH_ACCT_CASH) {
                    if (isEmptyObjValue(objForm.repymntAcctId.value)) {
                        alert(finbranchResArr.get("FAT000200"));
                        objForm.repymntAcctId.focus();
                        return false
                    }
                }
                if (c == REP_IN_CASH || c == REP_IN_BOTH_ACCT_CASH) {
                    if (isEmptyObjValue(objForm.cashCCYCode.value)) {
                        alert(finbranchResArr.get("FAT000200"));
                        objForm.cashCCYCode.focus();
                        return false
                    }
                }
                if (c == REP_IN_BOTH_ACCT_CASH) {
                    if (isEmptyObjValue(objForm.closureInd.value)) {
                        alert(finbranchResArr.get("FAT000200"));
                        objForm.closureInd.focus();
                        return false
                    }
                }
                if (c == REP_IN_BOTH_ACCT_CASH) {
                    if (isEmptyObjValue(objForm.clsAmt.value)) {
                        alert(finbranchResArr.get("FAT000200"));
                        objForm.clsAmt.focus();
                        return false
                    }
                }
                if (sMudPoolProdFlg != "Y") {
                    if (wthDrwlAmtCrncy != homeCrncy) {
                        if (!isEmptyObjValue(objForm.preClsFee.value)) {
                            if (isEmptyObjValue(getRadioValue(objForm.feeCrCcy))) {
                                alert(finbranchResArr.get("FAT000200"));
                                focusOnRadio(objForm.feeCrCcy);
                                return false
                            }
                        }
                    }
                }
                if (sMudPoolProdFlg != "Y") {
                    if (getRadioValue(objForm.collectPenalInt) == VAL_YES || depType == CD_DEP_TYPE || depType == ND_DEP_TYPE) {
                        if (!isValueEmptyOrZero(objForm.intRate.value) && !isValueEmptyOrZero(objForm.preClsIntTblCode.value)) {
                            alert(finbranchResArr.get("FAT001995"));
                            objForm.intRate.focus();
                            return false
                        }
                        if (!isValueEmptyOrZero(objForm.intRate.value) && !isValueEmptyOrZero(objForm.absPenalIntAmt.value)) {
                            alert(finbranchResArr.get("FAT002619"));
                            objForm.intRate.focus();
                            return false
                        }
                        if (!isValueEmptyOrZero(objForm.absPenalIntAmt.value) && !isValueEmptyOrZero(objForm.preClsIntTblCode.value)) {
                            alert(finbranchResArr.get("FAT002620"));
                            objForm.absPenalIntAmt.focus();
                            return false
                        }
                    } else {
                        if (getRadioValue(objForm.collectPenalInt) == VAL_NO) {
                            if (!isValueEmptyOrZero(objForm.intRate.value) || !isValueEmptyOrZero(objForm.preClsIntTblCode.value) || !isValueEmptyOrZero(objForm.absPenalIntAmt.value)) {
                                alert(finbranchResArr.get("FAT001994"));
                                focusOnRadio(objForm.collectPenalInt);
                                return false
                            }
                        }
                    }
                }
                if (sMudPoolProdFlg != "Y") {
                    if (getRadioValue(objForm.calcOverdueInt) == VAL_YES && isEmptyObjValue(objForm.overdueIntCode.value)) {
                        alert(finbranchResArr.get("FAT000200"));
                        objForm.overdueIntCode.focus();
                        return false
                    }
                }
            } else {
                return false
            }
        } else {
            return
        }
    }
    for (i = 0; i < a; i++) {
        if (b[i].type == "text") {
            b[i].disabled = false
        }
    }
    return true
}

function isValueEmptyOrZero(a) {
    if (!isEmptyObjValue(a)) {
        if (getAmtInFloat(a) == 0) {
            return true
        } else {
            return false
        }
    } else {
        return true
    }
}

function fnEnableDisableRepCashFlds() {
    useRpmtAcctFlg = objForm.closeMode.value;
    if (isEmptyObjValue(useRpmtAcctFlg) && funcCode != XFER_OUT_FUNC_CODE) {
        if (sMudPoolProdFlg != "Y") {
            clearDescField("repymntAcctId", "rateCode", "rate", "genTreasuryRefNo", "genTreasuryRate", "cashRateCode", "cashRate", "cashTreasuryRefNo", "cashTreasuryRate", "cashCCYCode", "clsAmt", "closureInd");
            disableFields("repymntFwContractNo", "repymntFwSolId", "repymntAcctId", "rateCode", "rate", "genTreasuryRefNo", "genTreasuryRate", "cashRateCode", "cashRate", "cashTreasuryRefNo", "cashTreasuryRate", "cashCCYCode", "clsAmt", "closureInd");
            hideImage("sLnk2");
            hideImage("sLnk3");
            hideImage("sLnk4");
            hideImage("sLnk5");
            hideImage("sLnk10");
            hideImage("sLnk11");
            hideImage("sLnk13");
            hideImage("sLnk14")
        } else {
            disableFields("repymntAcctId", "clsAmt", "closureInd", "cashCCYCode");
            hideImage("sLnk2");
            hideImage("sLnk3");
            hideImage("sLnk4");
            hideImage("sLnk5");
            hideImage("sLnk14");
            hideImage("sLnk10");
            hideImage("sLnk11");
            hideImage("sLnk13")
        }
    }
    if (isEmptyObjValue(useRpmtAcctFlg) && funcCode == XFER_OUT_FUNC_CODE) {
        disableFields("repymntFwContractNo", "repymntFwSolId", "repymntAcctId", "rateCode", "rate", "genTreasuryRefNo", "genTreasuryRate", "clsAmt", "closureInd");
        hideImage("sLnk2");
        hideImage("sLnk3");
        hideImage("sLnk10");
        hideImage("sLnk11");
        hideImage("sLnk13")
    }
    if ((useRpmtAcctFlg == VAL_YES || useRpmtAcctFlg == CUSTOMER_INDUCED) && funcCode != XFER_OUT_FUNC_CODE) {
        enableFields("repymntAcctId");
        if (repymntAcctId != null) {
            objForm.repymntAcctId.value = repymntAcctId
        }
        showImage("sLnk2");
        if (sMudPoolProdFlg != "Y") {
            clearDescField("cashRateCode", "cashRate", "cashTreasuryRefNo", "cashTreasuryRate", "cashCCYCode", "cashCCYDesc", "clsAmt", "closureInd");
            disableFields("cashRateCode", "cashRate", "cashTreasuryRefNo", "cashTreasuryRate", "cashCCYCode", "clsAmt", "closureInd");
            hideImage("sLnk4");
            hideImage("sLnk5");
            hideImage("sLnk14");
            fnHandleFldsBasedOnRpmtAcctId()
        } else {
            clearDescField("clsAmt", "closureInd", "cashCCYCode", "cashCCYDesc");
            disableFields("clsAmt", "closureInd", "cashCCYCode", "cashCCYDesc");
            hideImage("sLnk4");
            hideImage("sLnk5");
            hideImage("sLnk14")
        }
    }
    if ((useRpmtAcctFlg == VAL_YES || useRpmtAcctFlg == CUSTOMER_INDUCED) && funcCode == XFER_OUT_FUNC_CODE) {
        enableFields("repymntAcctId");
        disableFields("clsAmt", "closureInd");
        showImage("sLnk2")
    }
    if (useRpmtAcctFlg == CUSTOMER_INDUCED) {
        hideImage("sLnk2");
        disableFields("repymntAcctId")
    }
    if (useRpmtAcctFlg == REP_IN_CASH) {
        if (sMudPoolProdFlg != "Y") {
            enableFields("cashCCYCode");
            showImage("sLnk4");
            clearDescField("repymntFwContractNo", "repymntFwSolId", "repymntAcctId", "repymntAcctCrncy", "repymntAcctSolId", "repymntAcctName", "rateCode", "rate", "genTreasuryRefNo", "genTreasuryRate", "clsAmt", "closureInd");
            disableFields("repymntFwContractNo", "repymntFwSolId", "repymntAcctId", "repymntAcctCrncy", "repymntAcctSolId", "repymntAcctName", "rateCode", "rate", "genTreasuryRefNo", "genTreasuryRate", "clsAmt", "closureInd");
            hideImage("sLnk2");
            hideImage("sLnk3");
            hideImage("sLnk10");
            hideImage("sLnk11");
            hideImage("sLnk13")
        } else {
            enableFields("cashCCYCode");
            showImage("sLnk4");
            clearDescField("repymntAcctId", "repymntAcctCrncy", "repymntAcctSolId", "repymntAcctName", "clsAmt", "closureInd");
            disableFields("repymntAcctId", "repymntAcctCrncy", "repymntAcctSolId", "repymntAcctName", "clsAmt", "closureInd")
        }
    }
    if (useRpmtAcctFlg == REP_IN_BOTH_ACCT_CASH) {
        if (repymntAcctId != null) {
            objForm.repymntAcctId.value = repymntAcctId
        }
        if (sMudPoolProdFlg != "Y") {
            enableFields("repymntAcctId", "cashCCYCode", "clsAmt", "closureInd");
            showImage("sLnk2");
            hideImage("sLnk5");
            hideImage("sLnk14");
            showImage("sLnk4")
        } else {
            showImage("sLnk2");
            showImage("sLnk4");
            enableFields("repymntAcctId", "clsAmt", "closureInd", "cashCCYCode")
        }
    }
}

function locShowCurrency(e, a, b, c, d) {
    tmpCrncyCodeObjVal = e.value;
    tmpCrncyCodeObj = e;
    if (!window.showModalDialog) {
        callBackFn = "caactdclsdetCallBackFunc2"
    }
    showCurrency(e, a, b, c, d);
    if (window.showModalDialog) {
        if (!isEmptyObjValue(e.value)) {
            if (tmpCrncyCodeObjVal.toUpperCase() != e.value.toUpperCase()) {
                fnOnChangeCrncyCode()
            }
        }
    }
}

function caactdclsdetCallBackFunc2() {
    if (!isEmptyObjValue(tmpCrncyCodeObj.value)) {
        if (tmpCrncyCodeObjVal.toUpperCase() != tmpCrncyCodeObj.value.toUpperCase()) {
            fnOnChangeCrncyCode()
        }
    }
}

function fnOnChangeCrncyCode() {
    var a = objForm.cashCCYCode.value;
    objForm.cashCCYCode.value = a.toUpperCase();
    if (isEmptyObjValue(objForm.cashCCYCode.value)) {
        clearDescField("cashCCYDesc", "cashRateCode", "cashRate", "cashTreasuryRefNo", "cashTreasuryRate");
        return
    } else {
        if (wthDrwlAmtCrncy != objForm.cashCCYCode.value) {
            enableFields("cashRateCode", "cashRate", "cashTreasuryRefNo", "cashTreasuryRate");
            showImage("sLnk5");
            showImage("sLnk14")
        } else {
            clearDescField("cashRateCode", "cashRate", "cashTreasuryRefNo", "cashTreasuryRate");
            disableFields("cashRateCode", "cashRate", "cashTreasuryRefNo", "cashTreasuryRate");
            hideImage("sLnk5");
            hideImage("sLnk14")
        }
    }
}

function fnPopulateControlValuesForTD() {
    var a = document.forms[0];
    a.printReport.value = printReport;
    a.closeMode.value = closeMode;
    a.repymntAcctId.value = repymntAcctId;
    a.repymntAcctCrncy.value = repymntAcctCrncy;
    a.repymntAcctSolId.value = repymntAcctSolId;
    a.repymntAcctName.value = repymntAcctName;
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
    a.absPenalIntAmt.value = absPenalIntAmt;
    a.calcOverdueInt.value = calcOverdueInt;
    a.overdueIntCode.value = overdueIntCode;
    a.repymntFwContractNo.value = repymntFwContractNo;
    a.repymntFwSolId.value = repymntFwSolId;
    if ((sReferralMode == "I") || (sReferralMode == "S")) {
        fnDisableFormDataControls("V", a, 0)
    }
}

function locFormatClsAmt(b) {
    var a = null;
    a = acctCrncy;
    newformatAmt(format, b, a, "N")
}

function fnPopulateControlValuesForXferMode() {
    var a = document.forms[0];
    a.printReport.value = printReport;
    a.closeMode.value = closeMode;
    a.repymntAcctId.value = repymntAcctId;
    a.repymntAcctCrncy.value = repymntAcctCrncy;
    a.repymntAcctSolId.value = repymntAcctSolId;
    a.repymntAcctName.value = repymntAcctName;
    a.rateCode.value = rateCode;
    a.rate.value = rate;
    a.genTreasuryRefNo.value = genTreasuryRefNo;
    a.genTreasuryRate.value = genTreasuryRate;
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
    if (depType == TU_DEP_TYPE) {
        a.totPenalAmt.value = totPenalAmt
    }
    a.absPenalIntAmt.value = absPenalIntAmt;
    a.calcOverdueInt.value = calcOverdueInt;
    a.overdueIntCode.value = overdueIntCode;
    if ((sReferralMode == "I") || (sReferralMode == "S")) {
        fnDisableFormDataControls("V", a, 0)
    }
}

function fnPopulateControlValuesForMud() {
    var a = document.forms[0];
    a.printReport.value = printReport;
    a.closeMode.value = closeMode;
    a.repymntAcctId.value = repymntAcctId;
    a.repymntAcctCrncy.value = repymntAcctCrncy;
    a.repymntAcctSolId.value = repymntAcctSolId;
    a.repymntAcctName.value = repymntAcctName;
    a.clsAmt.value = clsAmt;
    a.cashCCYCode.value = cashCCYCode;
    a.cashCCYDesc.value = cashCCYDesc;
    a.closureInd.value = closureInd;
    a.profitRate.value = profitRate;
    if ((sReferralMode == "I") || (sReferralMode == "S")) {
        fnDisableFormDataControls("V", a, 0)
    }
}

function fetchAcctDtls(f, d, c, a, b, e) {
    if (!window.showModalDialog) {
        genericCallBackFn_SDS = "fetchAcctDtlsCallBackFunc1"
    }
    retVal = fnCommonFetchAcctDtls(f, d, c, a, b, e);
    if (window.showModalDialog) {
        if (retVal == false) {
            fnSetFocusOnFirstField(objForm.Cancel);
            return false
        }
    }
}

function fetchAcctDtlsCallBackFunc1(a) {
    if (a == "false") {
        fnSetFocusOnFirstField(objForm.Cancel)
    }
}

function showFCListForRepymtAmt() {
    var a;
    if (!window.showModalDialog) {
        callBackFn = "caactdclsdetCallBackFunc3"
    }
    showFCList(objForm.repymntFwContractNo, objForm.repymntFwSolId, objForm.rateCode, objForm.rate, objForm.genTreasuryRate, a, TDAcctId, objForm.repymntAcctCrncy.value, acctCrncy, "PURCHASE");
    if (window.showModalDialog) {
        caactdclsdetCallBackFunc3()
    }
}

function caactdclsdetCallBackFunc3() {
    if (!fnIsNull(objForm.repymntFwContractNo.value)) {
        disableFields("rateCode", "rate", "genTreasuryRate");
        hideImage("sLnk3")
    }
}

function enableRateCodesForFwContract() {
    if (!fnIsNull(objForm.repymntFwContractNo.value)) {
        clearDescField("rateCode", "rate", "genTreasuryRate");
        if (!fnIsNull(objForm.repymntFwSolId.value)) {
            sendDataToServer("myframe", "FCNUM", "F", "repymntFwContractNo|repymntFwSolId", "rateCode|rate|genTreasuryRate")
        }
    }
    if (fnIsNull(objForm.repymntFwContractNo.value)) {
        enableFields("rateCode", "rate", "genTreasuryRate");
        showImage("sLnk3")
    } else {
        disableFields("rateCode", "rate", "genTreasuryRate");
        hideImage("sLnk3")
    }
};
