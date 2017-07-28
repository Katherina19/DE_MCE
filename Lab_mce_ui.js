function mceCopy(obj){
    return obj ? JSON.parse(JSON.stringify(obj)) : {};
}

var mceVariableProcessor = {
    variableList: {}, //Список переменных с свойствами
    engArray: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],

    setOrUpdateVariable: function(name,type,value,length,input,output) {
        var self = this;
        if (type.indexOf("array") >= 0){
            if (type.indexOf('symbol') != -1){
                for (var i = 0; i < value.length; i++) {
                    value[i] = String(value[i]);
                }
            } else {
                for (var i = 0; i < value.length; i++) {
                    value[i] = Number(value[i]);
                }
            }

        }
        // set variable properties
        this.variableList[name] = {
            input: input ? input : self.variableList[name].input,
            output: output ? output : self.variableList[name].output,
            type: type,
            value: value,
            length: length ? Number(length) : undefined
        };
        Vlab.mceLaboratory.variablesCopy = mceCopy(this.variableList);
        this.updateVariables();
    },

    updateBaseCopy: function() {
        Vlab.mceLaboratory.variablesCopy = mceCopy(this.variableList);
        this.updateVariables();
    },

    isType: function(value, type){
        // real может быть и целым
        if(((type.indexOf('int') != -1) || (type.indexOf('real') != -1)) && (Number(value) % 1 === 0) && !isNaN(Number(value))){
            return true;
        } else if((type.indexOf('real') != -1) && (Number(value) % 1 !== 0) && !isNaN(Number(value))){
            return true;
        } else if(type.indexOf('symbol') != -1){
            return true;
        } else {
            return false;
        }
    },

    convertType: function(value, type){
        if((type.indexOf('int') != -1) || (type.indexOf('real') != -1)){
            return Number(value);
        } else if (type.indexOf('symbol') != -1){
            return value;
        }
    },

    // check if variable is inner
    isInner: function(variable) {
        if ((variable.input != 'true') && (variable.output != 'true'))
            return true;
        else
            return false;
    },

    /**
     * Get type of the variable according to used specification of XML document for results
     * @param type - variable type to process
     */
    getXMLType: function(type){
        switch (type) {
            case 'int':
                return 0;
            case 'real':
                return 1;
            case 'int-array':
                return 3;
            case 'real-array':
                return 4;
            case 'symbol-array':
                return 5;
        }
    },

    /**
     * Get type of the variable according to used specification of XML document for results
     * @param type - variable type to process
     */
    getTypeFromXML: function(type){
        switch (type) {
            case 0:
                return 'int';
            case 1:
                return 'real';
            case 3:
                return 'int-array';
            case 4:
                return 'real-array';
            case 5:
                return 'symbol-array';
        }
    },

    updateVariables: function(vars) {
        var inputblock = $('.mce-input-vars-block');
        var outputblock = $('.mce-output-vars-block');
        var innerblock = $('.mce-inner-vars-block');
        inputblock.text('');
        outputblock.text('');
        innerblock.text('');
        var varList = vars ? vars : this.variableList;
        var appendBlock = function(block, name, type, value, length){
            if(type.indexOf('array') != -1) {
                for (var i = 0; i < length; i++){
                    block.append(name + '[' + i + '] = ' + value[i] + '<br/>')
                }
            } else {
                block.append(name + ' = ' + value + '<br/>')
            }
        }

        for (var name in varList){
            if(varList[name].input == 'true'){
                appendBlock(inputblock, name, varList[name].type, varList[name].value, varList[name].length)
            }
            if(varList[name].output == 'true'){
                appendBlock(outputblock, name, varList[name].type, varList[name].value, varList[name].length)
            }
            // if((varList[name].input != 'true') && (varList[name].output != 'true')){
            if (this.isInner(varList[name])){
                appendBlock(innerblock, name, varList[name].type, varList[name].value, varList[name].length)
            }
        }
    }
};

var mceUI = {

    init: function() {
        var self = this;
        // main UI
        var str = "<div style='border: 2px solid #d3d3d3;width:900px;'>" +
            "<div class='easyui-layout main-lab-container' style='width:900px;height:500px;'>" +
            "<div data-options=\"region:'center',split:true,collapsible:false,border:false\">" +
            "<div class='easyui-layout' data-options=\"fit:true,collapsible:false\">" +
            "<div data-options=\"region:'west',split:true,collapsible:false,border:false\" style='width:645px;max-width:700px;min-width:645px;'>" +
            "<div class='easyui-layout' data-options=\"fit:true, width:'100%'\">" +
            "<div data-options=\"region:'center',split:true,collapsible:false,border:false\" style='min-height:50px;'>" +
            "<div class='easyui-layout' data-options=\"fit:true\">" +
            "<div class='easyui-panel mce-input-vars-block' data-options=\"region:'west',split:false,collapsible:false,width:'30%',title:'" + mceTranslate[Vlab.mceLaboratory.labLang].variables.input + "'\" style='font-family:Courier;'>" +
            "</div>" +
            "<div class='easyui-panel mce-output-vars-block' data-options=\"region:'center',split:false,collapsible:false,width:'30%',title:'" + mceTranslate[Vlab.mceLaboratory.labLang].variables.output + "'\" style='font-family:Courier;'>" +
            "</div>" +
            "<div class='easyui-panel mce-inner-vars-block' data-options=\"region:'east',split:false,collapsible:false,width:'38%',title:'" + mceTranslate[Vlab.mceLaboratory.labLang].variables.inner + "',tools:'.mce-variables-edit'\" style='font-family:Courier;'>" +
            "</div>" +
            "<div class='mce-variables-edit' style='border: 1px solid #d3d3d3;border-width: 0 0 0 1px;'>" +
            "<a id='mceVariablesEdit' class='easyui-linkbutton' style='font-weight:bold;text-align:center;' data-options=\"width:50,height:16\" href='javascript:void(0)'>" + mceTranslate[Vlab.mceLaboratory.labLang].variables.edit + "</a>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<div class='mce-code-editor-container' data-options=\"region:'south',split:true,collapsible:false,border:true,title:'" + mceTranslate[Vlab.mceLaboratory.labLang].editorTitle + "'\" style='height:300px;min-height:100px;max-height:300px;'>" +
            "<textarea id='mceCodeEditor' style='display:none;'>" +
            "</textarea>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<div data-options=\"region:'center',split:true,collapsible:false,title:'" + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.title + "'\" style='min-width:200px;max-width:255px;width:255px;padding:5px;'>" +
            "<ul class='easyui-tree function-tree' data-options=\"animate:true\">" +
            "</ul>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<div data-options=\"region:'south',split:true,collapsible:false,title:'" + mceTranslate[Vlab.mceLaboratory.labLang].console.title + "'\" style='height:120px;min-height:100px;max-height:170px;'>" +
            "<div class='easyui-layout' data-options=\"fit:true,border:false\">" +
            "<div class='mce-console-container' data-options=\"region:'center',border:false\" style='padding:3px;'>" +
            "<table id='mceConsole' class='mce-console' style='width:100%;height:100%;'>" +
            "</table>" +
            "</div>" +
            "<div data-options=\"region:'south',split:false,collapsible:false,border:false\" style='background:#f8f8f8;'>" +
            "<div class='mce-run-buttons-container'>" +
            "<div class='mce-code-style'>" +
            mceTranslate[Vlab.mceLaboratory.labLang].console.codeStyleTitle + ": " +
            "<select id='mceCodeStyle'  name='code-style' class='easyui-combobox' style='width:130px;' data-options=\"panelHeight:'auto'\">" + //id='mceCodeStyle'  name='code-style' class='easyui-combobox' style='width:130px;' data-options=\"panelHeight:'auto'\"
            "<option value='C' selected='selected'>C</option>" +
            "<option value='Basic'>Basic</option>" +
            "<option value='Pascal'>Pascal</option>" +
            "</select>" +
            "<div class='mce-run-buttons'>" +
            "<a href='#' class='easyui-linkbutton mce-debug-button' style='width:65px;'>" + mceTranslate[Vlab.mceLaboratory.labLang].runButtons.debug + "</a>" +//data-options=\"iconCls:'icon-debug'\"
            "<a href='#' class='easyui-linkbutton mce-step-button' style='width:65px;'>" + mceTranslate[Vlab.mceLaboratory.labLang].runButtons.step + "</a>" + // data-options=\"iconCls:'icon-step'\"
            "<a href='#' class='easyui-linkbutton mce-run-button' style='width:65px;'>" + mceTranslate[Vlab.mceLaboratory.labLang].runButtons.run + "</a>" + // data-options=\"iconCls:'icon-run'\"
            "<a href='#' class='easyui-linkbutton mce-stop-button' style='width:65px;'>" + mceTranslate[Vlab.mceLaboratory.labLang].runButtons.stop + "</a>" + // data-options=\"iconCls:'icon-stop'\"
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>";

        // Add edit-variable dialogs
        str += "<div id='mceMainVarEditor' class='mce-main-var-editor'>" +
            "<table id='mceMainVarEditorGrid' class='mce-main-var-editor-grid' style='font-family:Courier;width:100%;height:100%;'>" +
            "</table>" +
            "</div>";
        str += "<div id='addVariableDialog' class='add-var-dialog'>" +
            "<form>" +
            "<table style='width:100%;'>" +
            "<tr>" +
            "<td>" + mceTranslate[Vlab.mceLaboratory.labLang].addVarDialog.name + "</td>" +
            "<td><input class='easyui-textbox variable-name' data-options=\"required:true,width:180,tipPosition:'bottom'\"/></td>" +
            "</tr>" +
            "<tr>" +
            "<td>" + mceTranslate[Vlab.mceLaboratory.labLang].addVarDialog.type + "</td>" +
            "<td>" +
            "<select class='easyui-combobox variable-type' data-options=\"required:true,width:180,panelHeight:'auto',prompt:'" + mceTranslate[Vlab.mceLaboratory.labLang].varTypes.prompt + "'\">" +
            "<option value='int'>" + mceTranslate[Vlab.mceLaboratory.labLang].varTypes.int + "</option>" +
            "<option value='real'>" + mceTranslate[Vlab.mceLaboratory.labLang].varTypes.real + "</option>" +
            "<option value='int-array'>" + mceTranslate[Vlab.mceLaboratory.labLang].varTypes.intArray + "</option>" +
            "<option value='real-array'>" + mceTranslate[Vlab.mceLaboratory.labLang].varTypes.realArray + "</option>" +
            "<option value='symbol-array'>" + mceTranslate[Vlab.mceLaboratory.labLang].varTypes.symbolArray + "</option>" +
            "</select>" +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<td>" + mceTranslate[Vlab.mceLaboratory.labLang].addVarDialog.len + "</td>" +
            "<td><input class='easyui-textbox variable-length' data-options=\"required:false,disabled:true,width:180,tipPosition:'bottom'\"/></td>" +
            "</tr>" +
            "<tr>" +
            "<td>" + mceTranslate[Vlab.mceLaboratory.labLang].addVarDialog.value + "</td>" +
            "<td><input class='easyui-textbox variable-value' data-options=\"required:true,width:180,tipPosition:'bottom'\"/></td>" +
            "</tr>" +
            "</table>" +
            "</form>" +
            "</div>";
        str += "<div id='mceArrayEditor' class='mce-array-editor'>" +
            "<table id='mceArrayEditorGrid' class='mce-array-editor-grid' style='font-family:Courier;width:100%;height:100%;'></table>" +
            "</div>";



        // set ui
        document.getElementById("jsLab").innerHTML = str;

        // jeasyui parse
        $.parser.parse("#jsLab");

        // set required message
        $("#addVariableDialog .variable-name").textbox({missingMessage: mceTranslate[Vlab.mceLaboratory.labLang].addVarDialog.required});
        $("#addVariableDialog .variable-type").combobox({missingMessage: mceTranslate[Vlab.mceLaboratory.labLang].addVarDialog.required});
        $("#addVariableDialog .variable-value").textbox({missingMessage: mceTranslate[Vlab.mceLaboratory.labLang].addVarDialog.required});

        // set messager properties
        $.messager.defaults.ok = mceTranslate[Vlab.mceLaboratory.labLang].messagerTexts.ok;
        $.messager.defaults.cancel = mceTranslate[Vlab.mceLaboratory.labLang].messagerTexts.cancel;

        // Set options for code-editor panel
        $('.mce-code-editor-container').panel({
            onResize: function(width, height) {
                // resize code editor on panel resize
                if (self.codeEditor.editor !== undefined) {
                    var h = $(".mce-code-editor-container").css("height");
                    $(self.codeEditor.editor.getScrollerElement()).css("height", h);
                    self.codeEditor.editor.refresh();
                }
            }
        });

        // Button click handlers
        $("#mceVariablesEdit").on('click',function(){
            // Проверка на то, можно ли нажать кнопку или нет
            if(!$('#mceVariablesEdit').linkbutton('options').disabled){
                self.variableEditMainDialog.open();
            }
            // mceUI.variableEditMainDialog.getAllName(); // Копирование всех имен
        });

        // set handler for code style selecting
        $('#mceCodeStyle').combobox({
            onSelect: function(record) {
                // confirm editor to be cleared
                $.messager.confirm(mceTranslate[Vlab.mceLaboratory.labLang].messagerTexts.confirm,
                    mceTranslate[Vlab.mceLaboratory.labLang].messagerTexts.clearEditor, function(res){
                        if (res){
                            // update current code style
                            Vlab.mceLaboratory.codeStyle = record.value.toLowerCase();
                            // add info-message
                            self.messagesGrid.addRow('info', mceTranslate[Vlab.mceLaboratory.labLang].console.codeStyleUpdated + ': '+ record.value);
                            // clear user's code and editor
                            if (self.codeEditor.editor) {
                                Vlab.mceLaboratory.userCode = ""; // clear user's code
                                self.codeEditor.editor.setValue(""); // clear content
                                self.codeEditor.editor.toTextArea(); // remove editor
                                self.codeEditor.init();
                            }
                        }
                        else {
                            var cSPrev = Vlab.mceLaboratory.codeStyle.charAt(0).toUpperCase() +
                                Vlab.mceLaboratory.codeStyle.slice(1);
                            $('#mceCodeStyle').combobox('setValue', cSPrev);
                        }
                    });
            },
        });

        // INIT dialogs and grids
        self.variableEditMainDialog.init(); // edit-variables dialog
        self.addVariableDialog.init(); // add-variables dialog
        self.arrayEditDialog.init(); // array-edit dialog
        self.messagesGrid.init(); // grid for messages-console

        // set starting code style
        var cS = $('#mceCodeStyle').combobox('getValue');
        Vlab.mceLaboratory.codeStyle = cS.toLowerCase();
        self.messagesGrid.addRow('info', mceTranslate[Vlab.mceLaboratory.labLang].console.codeStyleUpdated + ': ' + cS);

        // INIT Code editor
        self.codeEditor.init();

        $('.mce-run-button').click(function(e) {
            // Проверка на то, можно ли нажать кнопку или нет
            if(!$('.mce-run-button').linkbutton('options').disabled){
                mceProgramProcessor.stopExecution = false; // set stop-flag to false
                // clear error coloring
                if (Vlab.mceLaboratory.currentErrorLine) {
                    self.codeEditor.editor.setLineClass(Vlab.mceLaboratory.currentErrorLine, null, null);
                    Vlab.mceLaboratory.currentErrorLine = undefined;
                }
                e.preventDefault();
                try {
                    mceUI.codeEditor.editor.setOption("readOnly",true);
                    $('.mce-debug-button').linkbutton('disable');
                    $('.mce-run-button').linkbutton('disable');
                    $('.mce-step-button').linkbutton('disable');
                    $('#mceVariablesEdit').linkbutton('disable');
                    Vlab.mceLaboratory.runProgram();
                } catch (err){
                    mceErrorProcessor.catchErrorOnRun(err);
                }
            }
        });

        var refreshDebug = function() {
            Vlab.mceLaboratory.debug.tree = undefined;
            Vlab.mceLaboratory.debug.vars = undefined;
            Vlab.mceLaboratory.debug.stepSequence = [];
        }

        var scrollTo = function (line) {
            var t = mceUI.codeEditor.editor.charCoords({line: line, ch: 0}, "local").y;
            var middleHeight = mceUI.codeEditor.editor.getScrollerElement().offsetHeight / 2;
            mceUI.codeEditor.editor.scrollTo(null, t - middleHeight);
        }

        $('.mce-debug-button').click(function(e) {
            // Проверка на то, можно ли нажать кнопку или нет
            if(!$('.mce-debug-button').linkbutton('options').disabled){
                mceProgramProcessor.stopExecution = false; // set stop-flag to false
                e.preventDefault();
                try {
                    $('.mce-run-button').linkbutton('disable');
                    $('.mce-debug-button').linkbutton('disable');
                    $('#mceVariablesEdit').linkbutton('disable');
                    mceUI.codeEditor.editor.setOption("readOnly",true);
                    Vlab.mceLaboratory.startDebug();
                } catch (err){
                    $('.mce-run-button').linkbutton('enable');
                    $('.mce-debug-button').linkbutton('enable');
                    $('#mceVariablesEdit').linkbutton('enable');

                    mceErrorProcessor.displayError(err.line, err.err);
                    Vlab.mceLaboratory.debugMode = false;
                    Vlab.mceLaboratory.stepFlag = false;
                    refreshDebug();
                    if (err.err != 'ERR002:010'){
                        mceErrorProcessor.displayError(err.line, err.err);
                        if (Vlab.mceLaboratory.currentStepLine) mceUI.codeEditor.editor.setLineClass(Vlab.mceLaboratory.currentStepLine, null, null);
                    }
                    Vlab.mceLaboratory.currentErrorLine = self.codeEditor.editor.setLineClass(err.line, null, "mce-errorline"); // coloring error line
                }
            }
        });

        $('.mce-step-button').click(function(e) {
            // Проверка на то, можно ли нажать кнопку или нет
            if(!$('.mce-step-button').linkbutton('options').disabled){
                e.preventDefault();
                try {
                    var line = Vlab.mceLaboratory.stepDebug();
                    if (line >= 0) scrollTo(line);
                }
                catch (err) {
                    Vlab.mceLaboratory.debugMode = false;
                    Vlab.mceLaboratory.stepFlag = false;
                    refreshDebug();
                    if (err.err != 'ERR002:010'){
                        mceErrorProcessor.displayError(err.line, err.err);
                        if (Vlab.mceLaboratory.currentStepLine) mceUI.codeEditor.editor.setLineClass(Vlab.mceLaboratory.currentStepLine, null, null);
                    }
                    Vlab.mceLaboratory.currentErrorLine = self.codeEditor.editor.setLineClass(err.line, null, "mce-errorline"); // coloring error line
                }
            }
        });

        $('.mce-stop-button').click(function(e) {
            mceProgramProcessor.stopExecution = true; // flag to stop program execution (e.g. infinite loop in RUN-mode)
            if (Vlab.mceLaboratory.currentStepLine) {
                mceUI.codeEditor.editor.setLineClass(Vlab.mceLaboratory.currentStepLine, null, null);
                Vlab.mceLaboratory.currentStepLine = undefined;
            }
            // release editor
            Vlab.mceLaboratory.debugMode = false;
            self.codeEditor.editor.setOption("readOnly",false);
            // clear error coloring
            if (Vlab.mceLaboratory.currentErrorLine) {
                self.codeEditor.editor.setLineClass(Vlab.mceLaboratory.currentErrorLine, null, null);
                Vlab.mceLaboratory.currentErrorLine = undefined;
            }
            if (Vlab.mceLaboratory.stepFlag) {
                mceUI.messagesGrid.addRow('info', mceTranslate[Vlab.mceLaboratory.labLang].console.programStopped);
                Vlab.mceLaboratory.stepFlag = false;
            }
            // update debug state properties
            refreshDebug();
            // Разблокировка всех кнопок после нажатия stop
            $('.mce-run-button').linkbutton('enable');
            $('.mce-debug-button').linkbutton('enable');
            $('.mce-step-button').linkbutton('enable');
            $('#mceVariablesEdit').linkbutton('enable');
        });



    },

    images: {
        msgInfo: "<img src='ui/rsz_msg-info.png'/>",
        msgError: "<img src='ui/msg-error.png'/>",
        edit: "<img src='ui/edit-img.png'/>",
        checked: "<img src='ui/checkbox-checked.png' class='checkbox-checked' style='width:10px;'/>",
        unchecked: "<img src='ui/checkbox-unchecked.png' class='checkbox-unchecked' style='width:10px;'/>"
    },

    //
    // GRIDS
    //
    messagesGrid: {
        grid: "#mceConsole",
        init: function() {
            var self = mceUI;
            $(this.grid).datagrid({
                fitColumns:true,
                fit:true,
                border:false,
                showHeader: false,
                columns: [[
                    {
                        field:'messageType',
                        width: '3%',
                        border:false,
                        formatter: function(value,row,index){
                            var elem = "";
                            switch (value) {
                                case "info":
                                    elem = self.images.msgInfo;
                                    break;
                                case "error":
                                    elem = self.images.msgError;
                                    break;
                            }
                            return elem;
                        },
                        styler: function(value,row,index){
                            return "text-align:center;border-width:0px;";
                        }
                    },
                    {
                        field:'messageMsg',
                        width:'97%',
                        border:false,
                        styler: function(value,row,index){
                            return "border-width:0px;";
                        }
                    }
                ]],
                rowStyler: function(index,row){
                    return 'background-color:transparent;color:black;';
                }
            });
        },
        addRow: function(msgType,msg) {
            $(this.grid).datagrid('appendRow',{
                messageType: msgType,
                messageMsg: msg
            });
            var len = $(this.grid).datagrid('getRows').length;
            $(this.grid).datagrid('scrollTo',len-1);
        }
    },

    //
    // DIALOGS
    //
    variableEditMainDialog: {
        dialog: "#mceMainVarEditor",
        grid: "#mceMainVarEditorGrid",
        init: function(){
            var self = this;
            // init dialog
            $(this.dialog).dialog({
                // styles
                title: mceTranslate[Vlab.mceLaboratory.labLang].varEditDialog.title,
                resizable:false,
                closable:true,
                closed: true,
                modal:true,
                width: 550,
                height: 350,
                buttons: [{
                    text: mceTranslate[Vlab.mceLaboratory.labLang].varEditDialog.add,
                    handler:function(){
                        mceUI.addVariableDialog.open();
                    }
                },{
                    text: mceTranslate[Vlab.mceLaboratory.labLang].varEditDialog.edit,
                    handler:function(){
                        var row= $(self.grid).datagrid('getSelected');
                        if (row!=null && row.type.indexOf("array")>=0){
                            mceUI.arrayEditDialog.open(row);
                        }
                    }
                }, {
                    text: mceTranslate[Vlab.mceLaboratory.labLang].varEditDialog.del,
                    handler:function(){
                        self.deleteVariable();
                    }
                }, {
                    text: mceTranslate[Vlab.mceLaboratory.labLang].varEditDialog.save,
                    handler:function(){
                        self.saveVariables();
                    }
                }],
                onClose: function() {
                    mceVariableProcessor.updateBaseCopy();
                }
            });

            var predName;

            // init grid
            $(this.grid).edatagrid({
                fitColumns:true,
                fit:true,
                border:false,
                columns: [[
                    {
                        field:'name',
                        title: mceTranslate[Vlab.mceLaboratory.labLang].varEditDialog.name,
                        width: 20,
                        editor: 'textbox' // Редактирование имени переменной
                    },
                    {
                        field:'input',
                        title: mceTranslate[Vlab.mceLaboratory.labLang].varEditDialog.input,
                        width: 15,
                        editor: {
                            type: 'checkbox',
                            options: {
                                on: 'true',
                                off: 'false'
                            }
                        },
                        formatter: function (value,row,index){
                            if (value=='true') return mceUI.images.checked;
                            else return mceUI.images.unchecked;
                        }
                    },
                    {
                        field:'output',
                        title: mceTranslate[Vlab.mceLaboratory.labLang].varEditDialog.output,
                        width: 15,
                        editor: {
                            type: 'checkbox',
                            options: {
                                on: 'true',
                                off: 'false'
                            }
                        },
                        formatter: function (value,row,index){
                            if (value=='true') return mceUI.images.checked;
                            else return mceUI.images.unchecked;
                        }
                    },
                    {
                        field:'type',
                        title: mceTranslate[Vlab.mceLaboratory.labLang].varEditDialog.type,
                        width: 30,
                        formatter: function(value,row,index){
                            switch (value){
                                case 'int':
                                    return mceTranslate[Vlab.mceLaboratory.labLang].varTypes.int;
                                case 'real':
                                    return mceTranslate[Vlab.mceLaboratory.labLang].varTypes.real;
                                case 'int-array':
                                    return mceTranslate[Vlab.mceLaboratory.labLang].varTypes.intArray;
                                case 'real-array':
                                    return mceTranslate[Vlab.mceLaboratory.labLang].varTypes.realArray;
                                case 'symbol-array':
                                    return mceTranslate[Vlab.mceLaboratory.labLang].varTypes.symbolArray;
                            }
                        }
                    },
                    {
                        field:'value',
                        title: mceTranslate[Vlab.mceLaboratory.labLang].varEditDialog.value,
                        width: 15,
                        editor: 'textbox'
                    }
                ]],
                rowStyler: function(index,row){
                    return "font-family:Courier;"
                },
                onSave: function(index, row){
                    var type = mceVariableProcessor.variableList[row.name].type;
                    if (row.name in mceVariableProcessor.variableList){
                        if((type).indexOf('array') == -1){
                            var value = row.value;
                            value = mceVariableProcessor.convertType(value, type);
                            if(mceVariableProcessor.isType(value, type)){
                                mceVariableProcessor.setOrUpdateVariable(row.name,row.type,Number(row.value),undefined,row.input,row.output);
                            } else {
                                var rowIndex = $(self.grid).datagrid('getRowIndex',$(self.grid).datagrid('getSelected'));
                                $(self.grid).datagrid('updateRow',{
                                    index: rowIndex,
                                    row: {
                                        value: Number(mceVariableProcessor.variableList[row.name].value)
                                    }
                                });
                                $.messager.alert(mceTranslate[Vlab.mceLaboratory.labLang].messagerTexts.warning,
                                    mceTranslate[Vlab.mceLaboratory.labLang].messagerTexts.invalidVarType);
                            }
                        } else {
                            // update variables
                            mceVariableProcessor.setOrUpdateVariable(row.name,row.type,mceVariableProcessor.variableList[row.name].value,
                                mceVariableProcessor.variableList[row.name].length,row.input,row.output);
                        }
                    }
                    mceVariableProcessor.updateBaseCopy();
                },

                onBeginEdit: function(index, row) {
                    predName = row.name;
                },

                onEndEdit: function(index, row) {
                    if(row.name != predName) {
                        if(/^[a-z]+$/.test(row.name)){
                            mceVariableProcessor.variableList[row.name] = mceVariableProcessor.variableList[predName];
                            delete(mceVariableProcessor.variableList[predName]);
                        } else {
                            row.name = predName;
                            $.messager.alert(mceTranslate[Vlab.mceLaboratory.labLang].messagerTexts.warning,
                                mceTranslate[Vlab.mceLaboratory.labLang].messagerTexts.invalidVarName); //проверка
                        }
                    }
                }
            });
        },
        open: function(){
            $(this.dialog).dialog('open');
            $(this.grid).edatagrid('loadData', []);
            for (var name in mceVariableProcessor.variableList){
                this.addRow(name, mceVariableProcessor.variableList[name]);
            }
        },
        addRow: function(varName, varData) {
            var varType = varData.type;
            if(varType.indexOf('array') != -1){
                $(this.grid).edatagrid('appendRow',{
                    name: varName,
                    input: varData.input,
                    output: varData.output,
                    type: varData.type,
                    value: '...'
                });
            } else {
                $(this.grid).edatagrid('appendRow',{
                    name: varName,
                    input: varData.input,
                    output: varData.output,
                    type: varData.type,
                    value: varData.value
                });
            }
        },
        saveVariables: function(){
            var rowIndex = $(this.grid).datagrid('getRowIndex',$(this.grid).datagrid('getSelected'));
            $(this.grid).datagrid('endEdit',rowIndex);
            // update copy with base values
            mceVariableProcessor.updateBaseCopy();
        },
        deleteVariable: function() {
            var row = $(this.grid).datagrid('getSelected');
            if (row != null){
                delete(mceVariableProcessor.variableList[row.name]);
            }

            $(this.grid).datagrid('loadData',[]);
            for (var name in mceVariableProcessor.variableList){
                this.addRow(name, mceVariableProcessor.variableList[name]);
            }
        },
        getVariableName: function() {
            var row = $(this.grid).datagrid('getSelected');
            return row.name;
        },
        close: function(){
            $(this.dialog).dialog('close');
        }
    },

    arrayEditDialog: {
        dialog: "#mceArrayEditor",
        grid: "#mceArrayEditorGrid",
        init: function(){
            var self = this;
            // init dialog
            $(this.dialog).dialog({
                // styles
                title: mceTranslate[Vlab.mceLaboratory.labLang].arrayEditDialog.title,
                resizable:false,
                closable:true,
                closed: true,
                modal:true,
                width: 500,
                height: 300,
                buttons: [{
                    text: mceTranslate[Vlab.mceLaboratory.labLang].arrayEditDialog.add,
                    handler:function(){
                        self.addArrayElem();
                    }
                }, {
                    text: mceTranslate[Vlab.mceLaboratory.labLang].arrayEditDialog.del,
                    handler:function(){
                        self.deleteArrayElem();
                    }
                },{
                    text: mceTranslate[Vlab.mceLaboratory.labLang].arrayEditDialog.random,
                    handler:function(){
                        self.randomArrayElem();
                    }
                }, {
                    text: mceTranslate[Vlab.mceLaboratory.labLang].arrayEditDialog.save,
                    handler:function(){
                        self.saveVariables();
                        var name = mceUI.variableEditMainDialog.getVariableName();
                        if (mceVariableProcessor.variableList[name].length != 0){
                            // self.close();
                        } else {
                            $.messager.alert(mceTranslate[Vlab.mceLaboratory.labLang].messagerTexts.warning,
                                mceTranslate[Vlab.mceLaboratory.labLang].messagerTexts.emptyArray); //проверка
                        }
                    }
                }],
            });
            // init grid
            $(this.grid).edatagrid({
                fitColumns:true,
                fit:true,
                border:false,
                columns: [[
                    {
                        field:'element',
                        title: mceTranslate[Vlab.mceLaboratory.labLang].arrayEditDialog.element,
                        width: 30
                    },
                    {
                        field:'value',
                        title: mceTranslate[Vlab.mceLaboratory.labLang].arrayEditDialog.value,
                        editor: 'textbox',
                        width:70
                    }
                ]],
                rowStyler: function(index,row){
                    return "font-family:Courier;"
                },
                onSave: function(index, row){
                    var name = mceUI.variableEditMainDialog.getVariableName();
                    if(mceVariableProcessor.isType(row.value, mceVariableProcessor.variableList[name].type)){
                        if (mceVariableProcessor.variableList[name].type.indexOf('symbol') != -1){
                            mceVariableProcessor.variableList[name].value[index] = String(row.value[0]);
                            row.value = String(row.value[0]);
                        } else {
                            mceVariableProcessor.variableList[name].value[index] = Number(row.value);
                            row.value = Number(row.value);
                        };
                    } else {
                        if (mceVariableProcessor.variableList[name].type.indexOf('symbol') != -1){
                            $(self.grid).datagrid('updateRow',{
                                index: index,
                                row: {
                                    value: String(mceVariableProcessor.variableList[name].value[index])
                                }
                            });
                            $.messager.alert(mceTranslate[Vlab.mceLaboratory.labLang].messagerTexts.warning,
                                mceTranslate[Vlab.mceLaboratory.labLang].messagerTexts.invalidElemType);
                        } else {
                            $(self.grid).datagrid('updateRow',{
                                index: index,
                                row: {
                                    value: Number(mceVariableProcessor.variableList[name].value[index])
                                }
                            });
                            $.messager.alert(mceTranslate[Vlab.mceLaboratory.labLang].messagerTexts.warning,
                                mceTranslate[Vlab.mceLaboratory.labLang].messagerTexts.invalidElemType);
                        }

                    }
                },

                onBeginEdit: function(index, row) {
                    var rowEditor = $(self.grid).edatagrid('getEditor', {
                        index: index,
                        field: 'value'
                    });
                    $(rowEditor.target[0]).textbox('textbox').select();
                    var name = mceUI.variableEditMainDialog.getVariableName();
                    if (!mceVariableProcessor.variableList[name].type.indexOf('symbol') == -1){
                        row.value = Number(row.value);
                    } else {
                        row.value = String(row.value[0]);
                    }
                },

                onEndEdit: function(index, row) {
                    var name = mceUI.variableEditMainDialog.getVariableName();
                    if (mceVariableProcessor.variableList[name].type.indexOf('symbol') == -1){
                        row.value = Number(row.value);
                    } else {
                        row.value = String(row.value[0]);
                    }

                }
            }).edatagrid('enableEditing');
        },
        open: function(row){
            $(this.dialog).dialog('open');
            $(this.grid).datagrid('loadData',[]);
            var value;
            for (var i = 0; i < mceVariableProcessor.variableList[row.name].length; i++) {
                if (mceVariableProcessor.variableList[row.name].type.indexOf('symbol') == -1){
                    this.addRow(row.name+'['+i+']', mceVariableProcessor.variableList[row.name].value[i]);
                } else {
                    value = mceVariableProcessor.variableList[row.name].value[i];
                    if (value == 0){
                        this.addRow(row.name+'['+i+']', ' ');
                    } else {
                        this.addRow(row.name+'['+i+']', mceVariableProcessor.variableList[row.name].value[i]);
                    }
                }
            }
        },
        close: function(){
            $(this.dialog).dialog('close');
        },
        addRow: function(elem, val) {
            $(this.grid).edatagrid('appendRow',{
                element: elem,
                value: val
            });
        },
        saveVariables: function(){
            var rowIndex = $(this.grid).datagrid('getRowIndex',$(this.grid).datagrid('getSelected'));
            $(this.grid).datagrid('endEdit',rowIndex);
            mceVariableProcessor.updateBaseCopy();
        },
        deleteArrayElem: function(){
            var rowIndex = $(this.grid).datagrid('getRowIndex',$(this.grid).datagrid('getSelected'));
            var rows = $(this.grid).datagrid('getRows');
            var elem =  mceUI.variableEditMainDialog.getVariableName();
            var index = rowIndex+1;

            $(this.grid).datagrid('deleteRow', rowIndex);
            rows = $(this.grid).datagrid('getRows');

            mceVariableProcessor.variableList[elem].length = Number(mceVariableProcessor.variableList[elem].length)-1;

            var valueArray = [];
            for (var i = 0; i < mceVariableProcessor.variableList[elem].length; i++){
                if (mceVariableProcessor.variableList[elem].type.indexOf('symbol') != -1){
                    valueArray[i] = String(rows[i].value);
                } else {
                    valueArray[i] = Number(rows[i].value);
                }
            }
            mceVariableProcessor.variableList[elem].value = valueArray;

            $(this.grid).datagrid('loadData',[]);
            for(var i = 0; i < mceVariableProcessor.variableList[elem].length; i++){
                this.addRow(elem+'['+i+']', mceVariableProcessor.variableList[elem].value[i])
            }
        },
        randomArrayElem: function() {
            var rows = $(this.grid).datagrid('getRows');

            var elem = mceUI.variableEditMainDialog.getVariableName();
            var type = mceVariableProcessor.variableList[elem].type;

            var arrayLength = mceVariableProcessor.variableList[elem].length;

            var valueArray = [];

            if(type.indexOf('int') != -1){
                for (var i = 0; i < mceVariableProcessor.variableList[elem].length; i++){
                    valueArray[i] = Math.floor(Math.random() * (100 - 0 + 1));
                }
                mceVariableProcessor.variableList[elem].value = valueArray;
            } else if(type.indexOf('real') != -1){
                for (var i = 0; i < mceVariableProcessor.variableList[elem].length; i++){
                    valueArray[i] = Math.round(100*(Math.random() * (100 - 0 + 1)))/100;
                }
                mceVariableProcessor.variableList[elem].value = valueArray;
            } else if(type.indexOf('symbol') != -1){
                for (var i = 0; i < mceVariableProcessor.variableList[elem].length; i++){
                    valueArray[i] = mceVariableProcessor.engArray[Math.floor(Math.random() * (25 - 0 + 1))];
                }
                mceVariableProcessor.variableList[elem].value = valueArray;
            }

            $(this.grid).datagrid('loadData',[]);

            for(var i = 0; i < mceVariableProcessor.variableList[elem].length; i++){
                this.addRow(elem+'['+i+']', mceVariableProcessor.variableList[elem].value[i])
            }
        },
        addArrayElem: function() {
            var rows = $(this.grid).datagrid('getRows');

            var elem = mceUI.variableEditMainDialog.getVariableName();
            var type = mceVariableProcessor.variableList[elem].type;
            var length = Number(mceVariableProcessor.variableList[elem].length)+1;

            mceVariableProcessor.variableList[elem].length = length;

            var lengthElem = length-1;
            this.addRow(elem+'['+lengthElem+']', '');
            var value = rows[lengthElem].value;
            if(mceVariableProcessor.variableList[elem].value.indexOf('symbol') != -1){
                mceVariableProcessor.variableList[elem].value[lengthElem] = String(value);
            } else {
                mceVariableProcessor.variableList[elem].value[lengthElem] = Number(value);
            }
        }
    },

    addVariableDialog: {
        dialog: "#addVariableDialog",
        init: function(){
            var self = this;
            this.variableName = $(this.dialog).find('.variable-name');
            this.variableType = $(this.dialog).find('.variable-type');
            this.variableLength = $(this.dialog).find('.variable-length');
            this.variableValue = $(this.dialog).find('.variable-value');
            this.Form = $(this.dialog).find('form');
            this.nameRegExp = /^[a-z]+$/; // according to applet
            $(this.dialog).dialog({
                // styles
                title: mceTranslate[Vlab.mceLaboratory.labLang].addVarDialog.title,
                resizable:false,
                closable:true,
                closed: true,
                modal:true,
                width: 400,
                height: 200,
                buttons: [{
                    text: mceTranslate[Vlab.mceLaboratory.labLang].addVarDialog.cancel,
                    handler:function(){
                        //закрытие окна добавления переменных
                        self.close();
                    }
                }, {
                    text: mceTranslate[Vlab.mceLaboratory.labLang].addVarDialog.save,
                    handler:function(){
                        // mceUI.variableEditMainDialog.getAllName(); // Копирование всех имен
                        if (self.Form.form('validate')){
                            var name = self.variableName.textbox('getValue').replace(/ /g, '').toLowerCase();
                            var varType = self.variableType.combobox('getValue');
                            var varLength = self.variableLength.textbox('getValue').replace(/ /g, '');
                            var varValue = self.variableValue.textbox('getValue').replace(/ /g, '');

                            var setVarProperty = function(varInput, varOutput, varType, varValue, varLength) {
                                return {
                                    input: varInput,
                                    output: varOutput,
                                    type: varType,
                                    value: varValue,
                                    length: Number(varLength)
                                }
                            };


                            if ((varValue != '') && self.nameRegExp.test(name) && name.length <= 32){
                                // set to Number according to type
                                if (varType.indexOf('int') != -1 || varType.indexOf('real') != -1){
                                    varValue = Number(varValue);
                                }
                                // process
                                if (name in mceVariableProcessor.variableList) {
                                    $.messager.alert(mceTranslate[Vlab.mceLaboratory.labLang].messagerTexts.warning,
                                        mceTranslate[Vlab.mceLaboratory.labLang].messagerTexts.varExists); //проверка
                                } else {
                                    if(varType.indexOf('array') != -1){
                                        varLength = Number(varLength);
                                        if(/^[1-9][0-9]*$/.test(varLength) && varLength <= 100){
                                            varValue = mceVariableProcessor.convertType(varValue, varType);

                                            var valueArray = [];
                                            if(varType.indexOf('symbol') != -1){
                                                for (var i = 0; i < varLength; i++){
                                                    valueArray[i] = String(varValue[0]);
                                                }
                                            } else {
                                                for (var i = 0; i < varLength; i++){
                                                    valueArray[i] = Number(varValue);
                                                }
                                            }

                                            varValue = valueArray;

                                            if(mceVariableProcessor.isType(varValue[0], varType)){
                                                // update variables
                                                mceVariableProcessor.setOrUpdateVariable(name, varType, varValue, varLength,'false', 'false');
                                                mceUI.variableEditMainDialog.addRow(name, mceVariableProcessor.variableList[name]);
                                                self.close();
                                            } else {
                                                $.messager.alert(mceTranslate[Vlab.mceLaboratory.labLang].messagerTexts.warning,
                                                    mceTranslate[Vlab.mceLaboratory.labLang].messagerTexts.invalidVarType); //проверка
                                            }
                                        } else {
                                            $.messager.alert(mceTranslate[Vlab.mceLaboratory.labLang].messagerTexts.warning,
                                                mceTranslate[Vlab.mceLaboratory.labLang].messagerTexts.invalidArrayLength); //проверка
                                        }
                                    } else {
                                        if(mceVariableProcessor.isType(varValue, varType)){
                                            varValue = Number(varValue);
                                            // update variables
                                            mceVariableProcessor.setOrUpdateVariable(name, varType, mceVariableProcessor.convertType(varValue, varType), undefined, 'false', 'false');
                                            mceUI.variableEditMainDialog.addRow(name, mceVariableProcessor.variableList[name]);
                                            self.close();
                                        } else {
                                            $.messager.alert(mceTranslate[Vlab.mceLaboratory.labLang].messagerTexts.warning,
                                                mceTranslate[Vlab.mceLaboratory.labLang].messagerTexts.invalidVarType); //проверка
                                        }
                                    }
                                }
                            } else {
                                $.messager.alert(mceTranslate[Vlab.mceLaboratory.labLang].messagerTexts.warning,
                                    mceTranslate[Vlab.mceLaboratory.labLang].messagerTexts.invalidVarName); //проверка
                            }
                        }
                    }
                }],
            });

            // Type listener
            $(this.variableType).combobox({
                onChange: function(val, oldVal){
                    if (val.indexOf("array")>=0){
                        self.variableLength.textbox({
                            required: true,
                            disabled: false
                        });
                    }
                    else {
                        self.variableLength.textbox({
                            required: false,
                            disabled: true
                        });
                        self.variableLength.textbox('setValue','');
                    }
                }
            });
        },
        open: function(){
            this.variableName.textbox('clear'); // clear fields
            this.variableLength.textbox('clear');
            this.variableValue.textbox('clear');
            this.variableType.combobox('setValue', 'int');
            $(this.dialog).dialog('open');
            this.variableName.textbox('textbox').focus();
        },
        close: function(){
            $(this.dialog).dialog('close');
        }
    },

    functionsTree: {
        init: function(){
            var childrenControlArray = [];
            var childrenAssignArray = [];
            var childrenArithmeticArray = [];
            var childrenLogicalArray = [];
            var childrenComparisonArray = [];
            var childrenCommentsArray = [];
            var childrenMathArray = [];

            var arrayPush = function(childrenArray, name, insert){
                childrenArray.push({
                    text: name,
                    value: insert
                });
            };

            var selectLang = Vlab.mceLaboratory.codeStyle;
            selectLang = selectLang.charAt(0).toUpperCase() + selectLang.substr(1);

            var lang = mceTemplates[selectLang];

            for (var name in lang){
                if (name == 'Expression'){
                    for (var prop in lang[name]){
                        if(lang[name][prop].type == 'assign'){
                            arrayPush(childrenAssignArray, lang[name][prop].name, lang[name][prop].insert);
                        };
                        if(lang[name][prop].type == 'logical'){
                            arrayPush(childrenLogicalArray, lang[name][prop].name, lang[name][prop].insert);
                        };
                        if(lang[name][prop].type == 'comprasion'){
                            arrayPush(childrenComparisonArray, lang[name][prop].name, lang[name][prop].insert);
                        };
                        if(lang[name][prop].type == 'arithmetic'){
                            arrayPush(childrenArithmeticArray, lang[name][prop].name, lang[name][prop].insert);
                        };
                    }
                } else if (name == 'Comment'){
                    for (var prop in lang[name]){
                        if(lang[name][prop].type == 'comments'){
                            arrayPush(childrenCommentsArray, lang[name][prop].name, lang[name][prop].insert);
                        };
                    }
                } else if (name == 'MathFunctions'){
                    for (var prop in lang[name]){
                        if(lang[name][prop].type == 'math'){
                            arrayPush(childrenMathArray, lang[name][prop].name, lang[name][prop].insert);
                        };
                    }
                } else {
                    if(lang[name].type == 'control'){
                        arrayPush(childrenControlArray, lang[name].name, lang[name].insert);
                    };
                }
            }

            var tempData = [
                {
                    text: mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.control.title,
                    children: childrenControlArray
                },

                {
                    text: mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.assign.title,
                    children: childrenAssignArray
                },

                {
                    text: mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.arithmetic.title,
                    children: childrenArithmeticArray
                },

                {
                    text: mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.logical.title,
                    children: childrenLogicalArray
                },

                {
                    text: mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.comparison.title,
                    children: childrenComparisonArray
                },

                {
                    text: mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.comments.title,
                    children: childrenCommentsArray
                },

                {
                    text: mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.math.title,
                    children: childrenMathArray
                }
            ];

            $('.function-tree').tree({
                data: tempData,

                onDblClick: function(node){
                    if (!Vlab.mceLaboratory.debugMode){
                        var rgx = /^\s*/;
                        var selectLang = Vlab.mceLaboratory.codeStyle;
                        selectLang = selectLang.charAt(0).toUpperCase() + selectLang.substr(1);

                        var startKeyWord = mceTemplates[selectLang].startWord();
                        var value = mceUI.codeEditor.editor.getValue();
                        var indent = undefined;
                        var strSplit = value.split('\n');

                        var prevPos = mceUI.codeEditor.editor.getCursor(false);
                        indent = strSplit[prevPos.line].match(rgx)[0];

                        // insert block
                        var insert = node.value.replace(/<tab>/g, indent);
                        mceUI.codeEditor.editor.replaceSelection(insert);

                        // set cursor to the line
                        var linePos = insert.match(/\n/g) !== null ? prevPos.line + (insert.match(/\n/g)).length : prevPos.line;
                        var newPos = {
                            line: linePos,
                            ch: mceUI.codeEditor.editor.getLine(linePos).length
                        };
                        mceUI.codeEditor.editor.setCursor(newPos, null);
                        // focus on editor
                        mceUI.codeEditor.editor.focus();
                    }

                }
            });
        }
    },

    codeEditor: {

        editor: undefined,
        // caret: 0,
        tabFlag: false,

        init: function(){
            var self = this;

            mceUI.functionsTree.init();

            var mode = "";
            var language = Vlab.mceLaboratory.codeStyle.toLowerCase();
            switch (language) {
                case "c":
                    mode = "text/x-csrc";
                    break;
                default:
                    mode = language;
                    break;
            };

            var selectLang = language.charAt(0).toUpperCase() + language.substr(1);

            // init codemirror editor
            this.editor = CodeMirror.fromTextArea( document.getElementById("mceCodeEditor"), {
                lineNumbers: true,
                mode: mode,
                autofocus: true,
                indentUnit: 4,
                onChange: function(from, to, text) {
                    Vlab.mceLaboratory.userCode = self.editor.getValue();
                    if (Vlab.mceLaboratory.currentErrorLine) {
                        self.editor.setLineClass(Vlab.mceLaboratory.currentErrorLine, null, null);
                        Vlab.mceLaboratory.currentErrorLine = undefined;
                    }

                },
                smartIndent: true
            });

            // set height of the editor
            var h = $(".mce-code-editor-container").css("height");
            $(this.editor.getScrollerElement()).css("height", h);
            this.editor.refresh();
        }
    }

};
