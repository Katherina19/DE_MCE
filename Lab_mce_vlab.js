// for mozilla 3.*:
// var console={
//     log: function () {}
// };

var Vlab = {
    div: null,
    readOnly: false,
    init: function () {
        this.div = document.getElementById("jsLab");
        this.div.style.width="100%";
        this.div.style.textAlign="left";
        mceUI.init(); // init styles
        var previousSolution = $("#previousSolution").val();
        previousSolution = '&lt;?xml version=&quot;1.0&quot; encoding=&quot;Windows&amp;minus;1251&quot;?&gt;&lt;ProgramEnvironment&gt;&lt;Variable input=&quot;true&quot; output=&quot;false&quot; inner=&quot;false&quot;&gt;&lt;Name&gt;&lt;!&amp;minus;&amp;minus;a&amp;minus;&amp;minus;&gt;&lt;/Name&gt;&lt;Type&gt;&lt;!&amp;minus;&amp;minus;3&amp;minus;&amp;minus;&gt;&lt;/Type&gt;&lt;Value N=&quot;0&quot;&gt;&lt;!&amp;minus;&amp;minus;0&amp;minus;&amp;minus;&gt;&lt;/Value&gt;&lt;Value N=&quot;1&quot;&gt;&lt;!&amp;minus;&amp;minus;&amp;minus;21&amp;minus;&amp;minus;&gt;&lt;/Value&gt;&lt;Value N=&quot;2&quot;&gt;&lt;!&amp;minus;&amp;minus;17&amp;minus;&amp;minus;&gt;&lt;/Value&gt;&lt;Value N=&quot;3&quot;&gt;&lt;!&amp;minus;&amp;minus;18&amp;minus;&amp;minus;&gt;&lt;/Value&gt;&lt;Value N=&quot;4&quot;&gt;&lt;!&amp;minus;&amp;minus;&amp;minus;16&amp;minus;&amp;minus;&gt;&lt;/Value&gt;&lt;Value N=&quot;5&quot;&gt;&lt;!&amp;minus;&amp;minus;19&amp;minus;&amp;minus;&gt;&lt;/Value&gt;&lt;Value N=&quot;6&quot;&gt;&lt;!&amp;minus;&amp;minus;11&amp;minus;&amp;minus;&gt;&lt;/Value&gt;&lt;Value N=&quot;7&quot;&gt;&lt;!&amp;minus;&amp;minus;13&amp;minus;&amp;minus;&gt;&lt;/Value&gt;&lt;Value N=&quot;8&quot;&gt;&lt;!&amp;minus;&amp;minus;&amp;minus;17&amp;minus;&amp;minus;&gt;&lt;/Value&gt;&lt;Value N=&quot;9&quot;&gt;&lt;!&amp;minus;&amp;minus;14&amp;minus;&amp;minus;&gt;&lt;/Value&gt;&lt;/Variable&gt;&lt;Variable input=&quot;false&quot; output=&quot;true&quot; inner=&quot;false&quot;&gt;&lt;Name&gt;&lt;!&amp;minus;&amp;minus;b&amp;minus;&amp;minus;&gt;&lt;/Name&gt;&lt;Type&gt;&lt;!&amp;minus;&amp;minus;3&amp;minus;&amp;minus;&gt;&lt;/Type&gt;&lt;Value N=&quot;0&quot;&gt;&lt;!&amp;minus;&amp;minus;0&amp;minus;&amp;minus;&gt;&lt;/Value&gt;&lt;Value N=&quot;1&quot;&gt;&lt;!&amp;minus;&amp;minus;0&amp;minus;&amp;minus;&gt;&lt;/Value&gt;&lt;Value N=&quot;2&quot;&gt;&lt;!&amp;minus;&amp;minus;0&amp;minus;&amp;minus;&gt;&lt;/Value&gt;&lt;Value N=&quot;3&quot;&gt;&lt;!&amp;minus;&amp;minus;0&amp;minus;&amp;minus;&gt;&lt;/Value&gt;&lt;Value N=&quot;4&quot;&gt;&lt;!&amp;minus;&amp;minus;0&amp;minus;&amp;minus;&gt;&lt;/Value&gt;&lt;Value N=&quot;5&quot;&gt;&lt;!&amp;minus;&amp;minus;0&amp;minus;&amp;minus;&gt;&lt;/Value&gt;&lt;Value N=&quot;6&quot;&gt;&lt;!&amp;minus;&amp;minus;0&amp;minus;&amp;minus;&gt;&lt;/Value&gt;&lt;Value N=&quot;7&quot;&gt;&lt;!&amp;minus;&amp;minus;0&amp;minus;&amp;minus;&gt;&lt;/Value&gt;&lt;Value N=&quot;8&quot;&gt;&lt;!&amp;minus;&amp;minus;0&amp;minus;&amp;minus;&gt;&lt;/Value&gt;&lt;Value N=&quot;9&quot;&gt;&lt;!&amp;minus;&amp;minus;0&amp;minus;&amp;minus;&gt;&lt;/Value&gt;&lt;/Variable&gt;&lt;Variable input=&quot;false&quot; output=&quot;false&quot; inner=&quot;true&quot;&gt;&lt;Name&gt;&lt;!&amp;minus;&amp;minus;min&amp;minus;&amp;minus;&gt;&lt;/Name&gt;&lt;Type&gt;&lt;!&amp;minus;&amp;minus;0&amp;minus;&amp;minus;&gt;&lt;/Type&gt;&lt;Value&gt;&lt;!&amp;minus;&amp;minus;0&amp;minus;&amp;minus;&gt;&lt;/Value&gt;&lt;/Variable&gt;&lt;Variable input=&quot;false&quot; output=&quot;false&quot; inner=&quot;true&quot;&gt;&lt;Name&gt;&lt;!&amp;minus;&amp;minus;i&amp;minus;&amp;minus;&gt;&lt;/Name&gt;&lt;Type&gt;&lt;!&amp;minus;&amp;minus;0&amp;minus;&amp;minus;&gt;&lt;/Type&gt;&lt;Value&gt;&lt;!&amp;minus;&amp;minus;0&amp;minus;&amp;minus;&gt;&lt;/Value&gt;&lt;/Variable&gt;&lt;Variable input=&quot;false&quot; output=&quot;false&quot; inner=&quot;true&quot;&gt;&lt;Name&gt;&lt;!&amp;minus;&amp;minus;j&amp;minus;&amp;minus;&gt;&lt;/Name&gt;&lt;Type&gt;&lt;!&amp;minus;&amp;minus;0&amp;minus;&amp;minus;&gt;&lt;/Type&gt;&lt;Value&gt;&lt;!&amp;minus;&amp;minus;0&amp;minus;&amp;minus;&gt;&lt;/Value&gt;&lt;/Variable&gt;&lt;Variable input=&quot;false&quot; output=&quot;false&quot; inner=&quot;true&quot;&gt;&lt;Name&gt;&lt;!&amp;minus;&amp;minus;f&amp;minus;&amp;minus;&gt;&lt;/Name&gt;&lt;Type&gt;&lt;!&amp;minus;&amp;minus;0&amp;minus;&amp;minus;&gt;&lt;/Type&gt;&lt;Value&gt;&lt;!&amp;minus;&amp;minus;0&amp;minus;&amp;minus;&gt;&lt;/Value&gt;&lt;/Variable&gt;&lt;Variable input=&quot;false&quot; output=&quot;false&quot; inner=&quot;true&quot;&gt;&lt;Name&gt;&lt;!&amp;minus;&amp;minus;tmp&amp;minus;&amp;minus;&gt;&lt;/Name&gt;&lt;Type&gt;&lt;!&amp;minus;&amp;minus;0&amp;minus;&amp;minus;&gt;&lt;/Type&gt;&lt;Value&gt;&lt;!&amp;minus;&amp;minus;0&amp;minus;&amp;minus;&gt;&lt;/Value&gt;&lt;/Variable&gt;&lt;Code style=&quot;cStyle&quot;&gt;&lt;!&amp;minus;&amp;minus;min = 1;&amp;lt;br/&amp;gt;f = 0;&amp;lt;br/&amp;gt;i = 0;&amp;lt;br/&amp;gt;//комментарий&amp;lt;br/&amp;gt;while(i&amp;lt;10){&amp;lt;br/&amp;gt;    if(a[i]&amp;gt;0){&amp;lt;br/&amp;gt;        if (f==0){&amp;lt;br/&amp;gt;            f = 1;&amp;lt;br/&amp;gt;            min = a[i];&amp;lt;br/&amp;gt;        }&amp;lt;br/&amp;gt;        if (f==1 &amp;amp;&amp;amp; a[i]&amp;lt;min){&amp;lt;br/&amp;gt;                min = a[i];&amp;lt;br/&amp;gt;        }&amp;lt;br/&amp;gt;    }&amp;lt;br/&amp;gt;    i = i+1;&amp;lt;br/&amp;gt;}&amp;lt;br/&amp;gt;/*комментарий b*/&amp;lt;br/&amp;gt;i = 0;&amp;lt;br/&amp;gt;while(i&amp;lt;10){&amp;lt;br/&amp;gt;    if (a[i]&amp;gt;=0){&amp;lt;br/&amp;gt;        b[i] = a[i] % min;&amp;lt;br/&amp;gt;    }&amp;lt;br/&amp;gt;    else {&amp;lt;br/&amp;gt;        b[i] = (&amp;amp;minus;1*a[i]) % min;&amp;lt;br/&amp;gt;    }&amp;lt;br/&amp;gt;    i = i+1;&amp;lt;br/&amp;gt;}&amp;lt;br/&amp;gt;/*комментарий*/&amp;lt;br/&amp;gt;i = 9;&amp;lt;br/&amp;gt;j = 0;&amp;lt;br/&amp;gt;tmp = 0;&amp;lt;br/&amp;gt;while (i&amp;gt;=0){&amp;lt;br/&amp;gt;    j=0;&amp;lt;br/&amp;gt;    while (j&amp;lt;i){&amp;lt;br/&amp;gt;        if(b[j]&amp;gt;b[j+1]){&amp;lt;br/&amp;gt;            tmp = b[j];&amp;lt;br/&amp;gt;            b[j] = b[j+1];&amp;lt;br/&amp;gt;            b[j+1] = tmp;&amp;lt;br/&amp;gt;        }&amp;lt;br/&amp;gt;        j=j+1;&amp;lt;br/&amp;gt;    }&amp;lt;br/&amp;gt;    i=i&amp;amp;minus;1;&amp;lt;br/&amp;gt;}&amp;lt;br/&amp;gt;&amp;minus;&amp;minus;&gt;&lt;/Code&gt;&lt;/ProgramEnvironment&gt;';
        if (previousSolution) this.mceLaboratory.setPreviousSolution(previousSolution);
    },

    calculateHandler: function (dataRaw) {
    },

    getResults: function () {
        var result = this.mceLaboratory.getResults();
        console.log(result);
        return result;
    },

    showHelp: function () {
    },

    calculate: function () {
    },

    getCondition: function () {
        return "";
    },

    setMode: function (val) {
        Vlab.readOnly = true;
    },

    window: function () {
        var self = this;
        var str = '';
        return str;
    },

    /*
     ______________________________________________________________________________________________
     ________________________________________MCE Laboratory________________________________________
     ______________________________________________________________________________________________
     */
    mceLaboratory: {

        labLang: "eng", // laboratory user interface language

        codeStyle: undefined, // currently selected code style
        userCode: "", // user's code from editor
        variablesCopy: undefined, // copy to work with
        currentStepLine: undefined, // active line for coloring
        currentErrorLine: undefined,
        debugMode: false, // debug flag to block the editor
        stepFlag: false, // to know if step had been used

        debug: {
            tree: undefined,
            vars: undefined,
            stepSequence: []
        },

        delete_comments: function(selectLang, code) {
            if (selectLang in mceTemplates){
                var escape_chars = /[\*\(\)\/\+\[\]]/g;
                if ('singleLineComment' in mceTemplates[selectLang].Comment) {
                    var start = mceTemplates[selectLang].Comment.singleLineComment.singleLineCommentStart;
                    var regex = new RegExp((start.replace(escape_chars, '\\$&') + '.*?(\n|$)'), 'g');
                    code = code.replace(regex, '\n')
                }

                if ('multiLineComment' in mceTemplates[selectLang].Comment) {
                    var start = mceTemplates[selectLang].Comment.multiLineComment.multiLineCommentStart;
                    var end = mceTemplates[selectLang].Comment.multiLineComment.multiLineCommentEnd;
                    var regex = new RegExp((start.replace(escape_chars, '\\$&') + '(.*?\n)*?.*?' + end.replace(escape_chars, '\\$&')), 'g');
                    var matches = code.match(regex) || [];

                    for (var i = 0; i < matches.length; i++){
                        var lines = matches[i].match(/\n/g) || [];
                        code = code.replace(matches[i], lines.join(''));
                    }
                }
            }

            return code;
        },

        runProgram: function() {
            var language = Vlab.mceLaboratory.codeStyle.toLowerCase();
            var selectLang = language.charAt(0).toUpperCase() + language.substr(1);
            var mceCode = mceUI.codeEditor.editor.getValue();

            mceCode = this.delete_comments(selectLang,mceCode);
            var vars = mceCopy(Vlab.mceLaboratory.variablesCopy);

            // var trees = {
            //     'C': mceTreeBuilder.build_tree_c,
            //     'Pascal': mceTreeBuilder.build_tree_pascal,
            //     'Basic': mceTreeBuilder.build_tree_basic
            // }

            if (selectLang == "Basic"){
                mceCode = mceCode + '\n';
            }

            var syntaxers = {
                'C': new mceSyntaxer(mceCode, mceTemplates.C.keyWords(), false),
                'Pascal': new mceSyntaxer(mceCode, mceTemplates.Pascal.keyWords(), false),
                'Basic': new mceSyntaxer(mceCode, mceTemplates.Basic.keyWords(), true)
            }

            var stopPress = false;
            $('.mce-stop-button').click(function(e) {
                stopPress = true;
            })

            var callback = function(result) {
                Vlab.mceLaboratory.variablesCopy = result;
                mceVariableProcessor.updateVariables(result);
                if(stopPress){
                    mceUI.messagesGrid.addRow('info', mceTranslate[Vlab.mceLaboratory.labLang].console.programStopped);
                } else {
                    mceUI.messagesGrid.addRow('info',mceTranslate[Vlab.mceLaboratory.labLang].console.programCompleted);
                }
                $('.mce-run-button').linkbutton('enable');
                $('.mce-debug-button').linkbutton('enable');
                $('.mce-step-button').linkbutton('enable');
                $('#mceVariablesEdit').linkbutton('enable');
                mceUI.codeEditor.editor.setOption("readOnly",false);
            }
            var result = mceProgramProcessor.run(mceBuildTree(LANG_RULES[selectLang], syntaxers[selectLang]), vars, callback);
        },

        startDebug: function() {
            // block editor
            this.debugMode = true;
            // clear error coloring
            if (Vlab.mceLaboratory.currentErrorLine) {
                mceUI.codeEditor.editor.setLineClass(Vlab.mceLaboratory.currentErrorLine, null, null);
                Vlab.mceLaboratory.currentErrorLine = undefined;
            }
            // start debugging
            var language = this.codeStyle.toLowerCase();
            var selectLang = language.charAt(0).toUpperCase() + language.substr(1);
            var mceCode = this.userCode;
            mceCode = this.delete_comments(selectLang,mceCode);
            var vars = mceCopy(Vlab.mceLaboratory.variablesCopy);
            var syntaxers = {
                'C': new mceSyntaxer(mceCode, mceTemplates.C.keyWords(), false),
                'Pascal': new mceSyntaxer(mceCode, mceTemplates.Pascal.keyWords(), false),
                'Basic': new mceSyntaxer(mceCode, mceTemplates.Basic.keyWords(), true)
            }
            if (selectLang == "Basic"){
                mceCode = mceCode + '\n';
            }

            this.debug.tree = mceBuildTree(LANG_RULES[selectLang], syntaxers[selectLang]);

            this.debug.vars = mceCopy(Vlab.mceLaboratory.variablesCopy);
            mceProgramProcessor.addNextById(0, this.debug.stepSequence);
        },

        stepDebug: function() {
            // Process (calculate, coloring, editor block)
            // clear coloring
            if (this.currentStepLine) mceUI.codeEditor.editor.setLineClass(this.currentStepLine, null, null);
            // calculate
            if (this.debug.stepSequence.length > 0){
                this.stepFlag = true;
                var result = mceProgramProcessor.processStep(this.debug.tree,this.debug.vars,this.debug.stepSequence);
                this.debug.vars = result.vars;
                this.debug.stepSequence = result.sequence;
                // set coloring
                // $('div.CodeMirror-gutter pre:nth-child('+ (result.line + 1) +')').css('color', 'red');
                this.currentStepLine = mceUI.codeEditor.editor.setLineClass(result.line, null, "mce-activeline");

                // update variables
                mceVariableProcessor.updateVariables(this.debug.vars);

                return result.line;
            }
            else {
                // release editor
                this.debugMode = false;
                mceUI.codeEditor.editor.setOption("readOnly",false);
                if (this.stepFlag) {
                    mceUI.messagesGrid.addRow('info','Program completed');
                    this.stepFlag = false;
                    $('.mce-run-button').linkbutton('enable');
                    $('.mce-debug-button').linkbutton('enable');
                    $('#mceVariablesEdit').linkbutton('enable');
                }
            }
        },

        /*
         ________________________________GET_RESULTS___________________________________
         */
        getResults: function () {
            var self = this;
            var configStr = '<?xml version="1.0" encoding="Windows-1251"?>';
            var xmlDocument = document.implementation.createDocument("", "", null);
            var xmlSerializer = new XMLSerializer();
            var vars = mceCopy(mceVariableProcessor.variableList);
            /**
             * Setting single node
             * @param name - node name
             * @param value - node value
             * @param parent - element for node to be appended to
             * @param doc - current context
             */
            var setSingleNode = function(name,value,parent, doc) {
                var elem = doc.createElement(name); // create element
                var comment = doc.createComment(value); // create comment (in order not to escape by browser)
                elem.appendChild(comment); // append comment
                parent.appendChild(elem); // append Name element
                return elem;
            }
            /**
             * Mask code ( &, <, > )
             */
            var maskCode = function (code) {
                return code.replace(/-/g, '&minus;')
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;');
            };

            // create main node ("ProgramEnvironment")
            var progEnv = xmlDocument.createElement("ProgramEnvironment");
            // create variables' nodes
            for (var key in vars) {
                var variable = xmlDocument.createElement("Variable");
                // set variable scope parameters
                variable.setAttribute("input", vars[key].input);
                variable.setAttribute("output", vars[key].output);
                variable.setAttribute("inner", mceVariableProcessor.isInner(vars[key]));
                // create Name node
                setSingleNode("Name", key, variable, xmlDocument);
                // create Type node
                setSingleNode("Type", mceVariableProcessor.getXMLType(vars[key].type), variable, xmlDocument);
                // create Value node(s)
                if (!$.isArray(vars[key].value) || vars[key].value.length == 0) {
                    setSingleNode("Value", vars[key].value, variable, xmlDocument);
                }
                else {
                    // create multiple Value nodes
                    for (var i in vars[key].value) {
                        if (vars[key].value[i] !== null) {
                            var element = setSingleNode("Value", vars[key].value[i], variable, xmlDocument);
                            element.setAttribute("N",i);
                        }
                    }
                }
                progEnv.appendChild(variable); // append Variable element
            }
            // create Code node
            var selectLang = self.codeStyle.charAt(0).toUpperCase() + self.codeStyle.substr(1);
            var codeStyle = self.codeStyle.toLowerCase() + "Style";
            var codeStr = self.userCode;
            codeStr = self.delete_comments(selectLang,codeStr);
            codeStr = codeStr.replace(/\n/g,"<br/>");
            codeStr = maskCode(codeStr);
            var code = setSingleNode("Code", codeStr, progEnv, xmlDocument);
            code.setAttribute("style",codeStyle);
            xmlDocument.appendChild(progEnv);

            var xmlString = configStr + xmlSerializer.serializeToString(xmlDocument);
            xmlString = maskCode(xmlString);
            return xmlString;
        },

        // Set previous solution
        setPreviousSolution: function(previousSolution) {
            var self = this;
            /**
             * Delete XML-comments
             */
            var deleteCommentTags = function(element) {
                return $(element).html().replace(/<!--/g,"").replace(/-->/g,"");
            }
            /**
             * Unmask code
             */
            var unmaskCode = function (code) {
                return code.replace(/&quot;/g, '"')
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')
                    .replace(/&amp;/g, '&')
                    .replace(/&minus;/g, '-');
            };
            // Unmask solution
            var solution = unmaskCode(previousSolution);
            // Parse XML
            var $xmlDocument = $($.parseXML(solution));
            // Process variables
            mceVariableProcessor.variableList = {};
            var variables = $xmlDocument.find("Variable");
            for (var i=0; i< variables.length; i++) {
                var varName = deleteCommentTags($(variables[i]).find("Name"));
                var varType = $(variables[i]).find("Type");
                varType = mceVariableProcessor.getTypeFromXML(Number(deleteCommentTags(varType)));
                var values = $(variables[i]).find("Value");
                var varValue;
                if (values.length > 1) {
                    varValue = [];
                    for (var j=0; j<values.length;j++) {
                        varValue[$(values[j]).attr("N")] = mceVariableProcessor.convertType(deleteCommentTags(values[j]), varType);
                    }
                }
                else if (values.length == 1) {
                    varValue = mceVariableProcessor.convertType(deleteCommentTags(values[0]), varType);
                }
                mceVariableProcessor.variableList[varName] = {
                    input: $(variables[i]).attr("input"),
                    output: $(variables[i]).attr("output"),
                    type: varType,
                    value: varValue,
                    length: values.length > 1 ? values.length : undefined
                };
            }
            // Update variables
            mceVariableProcessor.updateVariables();
            mceVariableProcessor.updateBaseCopy();
            // Process code and code style
            var code = $xmlDocument.find("Code");
            var language = $(code).attr("style");
            language = language.replace("Style","");
            language = language.charAt(0).toUpperCase() + language.substr(1);
            // Update code style
            self.codeStyle = language.toLowerCase();
            $('#mceCodeStyle').combobox("setValue",language);
            mceUI.messagesGrid.addRow('info', mceTranslate[Vlab.mceLaboratory.labLang].console.codeStyleUpdated + ': '+ language);
            if (mceUI.codeEditor.editor) {
                mceUI.codeEditor.editor.toTextArea(); // remove editor
                mceUI.codeEditor.init();
            }
            // Update code
            code = unmaskCode(deleteCommentTags(code));
            code = code.replace(/<br\/>/g,"\n");
            mceUI.codeEditor.editor.setValue(code);
            mceUI.codeEditor.editor.refresh();
        }

    }
};


var mceTemplates = {
    C: {
        If: {
            ifToken: 'if',
            conditionStart: '(',
            conditionEnd: ')',
            blockStart: '{',
            blockEnd: '}',
            insert: 'if( <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.conditionInsert + '> ){\n<tab>};\n',
            name: mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.control.ifSt,
            type: 'control',
            keyWord: 'IF'
        },

        IfElse: {
            ifToken: 'if',
            conditionStart: '(',
            conditionEnd: ')',
            blockStart: '{',
            blockEnd: '}',
            // elseifToken: 'else if',
            elseToken: 'else',
            insert: 'if( <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.conditionInsert + '> ){\n<tab>}; else{\n<tab>};\n',
            name: mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.control.ifElseSt,
            type: 'control',
            keyWord: 'ELSE'
        },

        Precondition: {
            whileToken: 'while',
            conditionStart: '(',
            conditionEnd: ')',
            blockStart: '{',
            blockEnd: '}',
            insert: 'while( <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.conditionInsert + '> ){\n<tab>};\n',
            name: mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.control.preCondLoop,
            type: 'control',
            keyWord: 'WHILE'
        },

        Postcondition: {
            doToken: 'do',
            blockStart: '{',
            blockEnd: '}',
            whileToken: 'while',
            conditionStart: '(',
            conditionEnd: ')',
            insert: 'do{\n<tab>} while( <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.conditionInsert + '> );\n',
            name: mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.control.postCondLoop,
            type: 'control',
            keyWord: 'DO'
        },

        Expression: {
            assign: {
                name: ':=',
                insert: '=',
                type: 'assign',
                keyWord: 'SET'
            },

            and: {
                name: mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.logical.and,
                insert: '&&',
                type: 'logical',
                keyWord: 'AND'
            },

            or: {
                name: mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.logical.or,
                insert: '||',
                type: 'logical',
                keyWord: 'OR'
            },

            not: {
                name: mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.logical.not,
                insert: '!',
                type: 'logical',
                keyWord: 'NOT'
            },

            eq: {
                name: '=',
                insert: '==',
                type: 'comprasion',
                keyWord: 'EQUAL'
            },

            neq: {
                name: '&lt;&gt;',
                insert: '!=',
                type: 'comprasion',
                keyWord: 'NOTEQUAL'
            },

            lt: {
                name: '&lt;',
                insert: '<',
                type: 'comprasion',
                keyWord: 'LESS'
            },

            gt: {
                name: '&gt;',
                insert: '>',
                type: 'comprasion',
                keyWord: 'MORE'
            },

            lte: {
                name: '&lt;=',
                insert: '<=',
                type: 'comprasion',
                keyWord: 'LESSEQUAL'
            },

            gte: {
                name: '&gt;=',
                insert: '>=',
                type: 'comprasion',
                keyWord: 'MOREEQUAL'
            },

            add: {
                name: '+',
                insert: '+',
                type: 'arithmetic',
                keyWord: 'PLUS'
            },

            sub: {
                name: '-',
                insert: '-',
                type: 'arithmetic',
                keyWord: 'MINUS'
            },

            mul: {
                name: '*',
                insert: '*',
                type: 'arithmetic',
                keyWord: 'MULT'
            },

            div: {
                name: '/',
                insert: '/',
                type: 'arithmetic',
                keyWord: 'DIV'
            },

            mod: {
                name: 'mod',
                insert: '%',
                type: 'arithmetic',
                keyWord: 'MOD'
            }

        },

        Comment: {
            singleLineComment: {
                singleLineCommentStart: '//',
                insert: '//<' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.commentInsert + '>',
                name: mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.comments.single,
                type: 'comments'
            },

            multiLineComment: {
                multiLineCommentStart: '/*',
                multiLineCommentEnd: '*/',
                insert: '/*\n<' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.commentInsert + '>\n*/',
                name: mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.comments.multi,
                type: 'comments'
            }
        },

        MathFunctions: {
            sqrt: {
                funcSqrt: 'sqrt',
                funcSqrtIns: '()',
                insert: 'sqrt( <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.argumentInsert + '> )',
                name: 'SQRT',
                type: 'math'
            },

            sin: {
                funcSin: 'sin',
                funcSinIns: '()',
                insert: 'sin( <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.argumentInsert + '> )',
                name: 'SIN',
                type: 'math'
            },

            cos: {
                funcCos: 'cos',
                funcCosIns: '()',
                insert: 'cos( <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.argumentInsert + '> )',
                name: 'COS',
                type: 'math'
            },

            tan: {
                funcTan: 'tan',
                funcTanIns: '()',
                insert: 'tan( <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.argumentInsert + '> )',
                name: 'TAN',
                type: 'math'
            },

            asin: {
                funcAsin: 'asin',
                funcAsinIns: '()',
                insert: 'asin( <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.argumentInsert + '> )',
                name: 'ASIN',
                type: 'math'
            },

            acos: {
                funcAcos: 'acos',
                funcAcosIns: '()',
                insert: 'acos( <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.argumentInsert + '> )',
                name: 'ACOS',
                type: 'math'
            },

            atan: {
                funcAtan: 'atan',
                funcAtanIns: '()',
                insert: 'atan( <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.argumentInsert + '> )',
                name: 'ATAN',
                type: 'math'
            },

            round: {
                funcRound: 'round',
                funcRoundIns: '()',
                insert: 'round( <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.argumentInsert + '> )',
                name: 'ROUND',
                type: 'math'
            }
        },


        arrIndexStart: '[',
        arrIndexEnd: ']',

        groupStart: '(',
        groupEnd: ')',

        blockEnd: ';',

        singleQuote: '\'',
        doubleQuote: '"',

        startWord: function(){
            return ['{'];
        },

        endWord: function(){
            return ['}'];
        },

        keyWords: function(){
            return {
                'if': 'IF', 'while': 'WHILE', 'do': 'DO', 'else': 'ELSE', '%': 'MOD', '{': 'LBRA', '}': 'RBRA', '(': 'LPAR', ')': 'RPAR', '[': 'LSQR', ']': 'RSQR', '==': 'EQUAL',
                ';': 'SEMICOLON', '/': 'DIV', '*': 'MULT', '-': 'MINUS', '<': 'LESS', '>': 'MORE', '!=': 'NOTEQUAL', '=': 'SET', '>=': 'MOREEQUAL', '<=': 'LESSEQUAL',
                '+': 'PLUS', '&&': 'AND', '||': 'OR', '!': 'NOT', "'": 'QUOTE',

                'sqrt': 'SQRT', 'sin': 'SIN', 'cos': 'COS', 'tan': 'TAN', 'asin': 'ASIN', 'acos': 'ACOS', 'atan': 'ATAN', 'round': 'ROUND'
            }
        }

    },

    Basic: {
        If: {
            ifToken: 'if',
            thenToken: 'then',
            blockEnd: 'endif',
            insert: 'if <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.conditionInsert + '> then\n<tab>endif\n',
            name: mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.control.ifSt,
            type: 'control'
        },

        IfElse: {
            ifToken: 'if',
            thenToken: 'then',
            blockEnd: 'endif',
            elseToken: 'else',
            insert: 'if <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.conditionInsert + '> then\n<tab>else\n<tab>endif\n',
            name: mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.control.ifElseSt,
            type: 'control'
        },

        Precondition: {
            whileToken: 'while',
            blockEnd: 'wend',
            insert: 'while <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.conditionInsert + '>\n<tab>wend\n',
            name: mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.control.preCondLoop,
            type: 'control'
        },

        Postcondition: {
            doToken: 'do',
            loopToken: 'loop',
            untilToken: 'until',
            insert: 'do\n<tab>loop until <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.conditionInsert + '>\n',
            name: mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.control.postCondLoop,
            type: 'control'
        },

        Expression: {
            assign: {
                name: ':=',
                insert: '=',
                type: 'assign'
            },

            and: {
                name: mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.logical.and,
                insert: 'and',
                type: 'logical'
            },

            or: {
                name: mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.logical.or,
                insert: 'or',
                type: 'logical'
            },

            not: {
                name: mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.logical.not,
                insert: 'not',
                type: 'logical'
            },

            eq: {
                name: '=',
                insert: '=',
                type: 'comprasion'
            },

            neq: {
                name: '&lt;&gt;',
                insert: '<>',
                type: 'comprasion'
            },

            lt: {
                name: '&lt;',
                insert: '<',
                type: 'comprasion'
            },

            gt: {
                name: '&gt;',
                insert: '>',
                type: 'comprasion'
            },

            lte: {
                name: '&lt;=',
                insert: '<=',
                type: 'comprasion'
            },

            gte: {
                name: '&gt;=',
                insert: '>=',
                type: 'comprasion'
            },

            add: {
                name: '+',
                insert: '+',
                type: 'arithmetic'
            },

            sub: {
                name: '-',
                insert: '-',
                type: 'arithmetic'
            },

            mul: {
                name: '*',
                insert: '*',
                type: 'arithmetic'
            },

            div: {
                name: '/',
                insert: '/',
                type: 'arithmetic'
            },

            mod: {
                name: 'mod',
                insert: 'mod',
                type: 'arithmetic'
            }

        },

        Comment: {
            singleLineComment: {
                singleLineCommentStart: '\'',
                insert: '\' <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.commentInsert + '>',
                name: mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.comments.single,
                type: 'comments'
            }
        },

        MathFunctions: {
            sqrt: {
                funcSqrt: 'sqrt',
                funcSqrtIns: '()',
                insert: 'sqrt( <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.argumentInsert + '> )',
                name: 'SQRT',
                type: 'math'
            },

            sin: {
                funcSin: 'sin',
                funcSinIns: '()',
                insert: 'sin( <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.argumentInsert + '> )',
                name: 'SIN',
                type: 'math'
            },

            cos: {
                funcCos: 'cos',
                funcCosIns: '()',
                insert: 'cos( <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.argumentInsert + '> )',
                name: 'COS',
                type: 'math'
            },

            tan: {
                funcTan: 'tan',
                funcTanIns: '()',
                insert: 'tan( <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.argumentInsert + '> )',
                name: 'TAN',
                type: 'math'
            },

            asin: {
                funcAsin: 'asin',
                funcAsinIns: '()',
                insert: 'asin( <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.argumentInsert + '> )',
                name: 'ASIN',
                type: 'math'
            },

            acos: {
                funcAcos: 'acos',
                funcAcosIns: '()',
                insert: 'acos( <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.argumentInsert + '> )',
                name: 'ACOS',
                type: 'math'
            },

            atan: {
                funcAtan: 'atan',
                funcAtanIns: '()',
                insert: 'atan( <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.argumentInsert + '> )',
                name: 'ATAN',
                type: 'math'
            },

            round: {
                funcRound: 'round',
                funcRoundIns: '()',
                insert: 'round( <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.argumentInsert + '> )',
                name: 'ROUND',
                type: 'math'
            }
        },


        arrIndexStart: '[',
        arrIndexEnd: ']',

        groupStart: '(',
        groupEnd: ')',

        blockEnd: ';',

        singleQuote: '\'',
        doubleQuote: '"',

        startWord: function(){
            return ['while', 'then', 'else', 'do'];
        },

        endWord: function(){
            return ['endif', 'wend', 'loop'];
        },

        keyWords: function(){
            return {
                'if': 'IF', 'while': 'WHILE', 'endif': 'ENDIF', 'do': 'DO', 'then': 'THEN', 'loop': 'LOOP', 'until': 'UNTIL', 'wend': 'WEND', 'else': 'ELSE', 'mod': 'MOD',
                '{': 'LBRA', '}': 'RBRA', '(': 'LPAR', ')': 'RPAR', '[': 'LSQR', ']': 'RSQR', ';': 'SEMICOLON', '/': 'DIV', '*': 'MULT', '-': 'MINUS', '<': 'LESS',
                '>': 'MORE', '<>': 'NOTEQUAL', '=': 'EQUAL', '>=': 'MOREEQUAL', '<=': 'LESSEQUAL', '+': 'PLUS', 'and': 'AND', 'or': 'OR', 'not': 'NOT', '"': 'QUOTE',

                'sqrt': 'SQRT', 'sin': 'SIN', 'cos': 'COS', 'tan': 'TAN', 'asin': 'ASIN', 'acos': 'ACOS', 'atan': 'ATAN', 'round': 'ROUND'
            }
        }

    },

    Pascal: {
        If: {
            ifToken: 'if',
            thenToken: 'then',
            blockStart: 'begin',
            blockEnd: 'end',
            insert: 'if <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.conditionInsert + '> then begin\n<tab>end;\n',
            name: mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.control.ifSt,
            type: 'control'
        },

        IfElse: {
            ifToken: 'if',
            thenToken: 'then',
            blockStart: 'begin',
            blockEnd: 'end',
            elseToken: 'else',
            insert: 'if <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.conditionInsert + '> then begin\n<tab>else\n<tab>end;\n',
            name: mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.control.ifElseSt,
            type: 'control'
        },

        Precondition: {
            whileToken: 'while',
            doToken: 'do',
            blockStart: 'begin',
            blockEnd: 'end',
            insert: 'while <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.conditionInsert + '> do begin\n<tab>end;\n',
            name: mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.control.preCondLoop,
            type: 'control'
        },

        Postcondition: {
            repeatToken: 'repeat',
            untilToken: 'until',
            insert: 'repeat\n<tab>until <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.conditionInsert + '>;\n',
            name: mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.control.postCondLoop,
            type: 'control'
        },

        Expression: {
            assign: {
                name: ':=',
                insert: ':=',
                type: 'assign'
            },

            and: {
                name: mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.logical.and,
                insert: 'and',
                type: 'logical'
            },

            or: {
                name: mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.logical.or,
                insert: 'or',
                type: 'logical'
            },

            not: {
                name: mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.logical.not,
                insert: 'not',
                type: 'logical'
            },

            eq: {
                name: '=',
                insert: '=',
                type: 'comprasion'
            },

            neq: {
                name: '&lt;&gt;',
                insert: '<>',
                type: 'comprasion'
            },

            lt: {
                name: '&lt;',
                insert: '<',
                type: 'comprasion'
            },

            gt: {
                name: '&gt;',
                insert: '>',
                type: 'comprasion'
            },

            lte: {
                name: '&lt;=',
                insert: '<=',
                type: 'comprasion'
            },

            gte: {
                name: '&gt;=',
                insert: '>=',
                type: 'comprasion'
            },

            add: {
                name: '+',
                insert: '+',
                type: 'arithmetic'
            },

            sub: {
                name: '-',
                insert: '-',
                type: 'arithmetic'
            },

            mul: {
                name: '*',
                insert: '*',
                type: 'arithmetic'
            },

            div: {
                name: '/',
                insert: '/',
                type: 'arithmetic'
            },

            mod: {
                name: 'mod',
                insert: 'mod',
                type: 'arithmetic'
            }

        },

        Comment: {
            singleLineComment: {
                singleLineCommentStart: '--',
                insert: '-- <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.commentInsert + '>',
                name: mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.comments.single,
                type: 'comments'
            },

            multiLineComment: {
                multiLineCommentStart: '{',
                multiLineCommentEnd: '}',
                insert: '{\n<' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.commentInsert + '>\n}',
                name: mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.comments.multi,
                type: 'comments'
            }
        },

        MathFunctions: {
            sqrt: {
                funcSqrt: 'sqrt',
                funcSqrtIns: '()',
                insert: 'sqrt( <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.argumentInsert + '> )',
                name: 'SQRT',
                type: 'math'
            },

            sin: {
                funcSin: 'sin',
                funcSinIns: '()',
                insert: 'sin( <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.argumentInsert + '> )',
                name: 'SIN',
                type: 'math'
            },

            cos: {
                funcCos: 'cos',
                funcCosIns: '()',
                insert: 'cos( <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.argumentInsert + '> )',
                name: 'COS',
                type: 'math'
            },

            tan: {
                funcTan: 'tan',
                funcTanIns: '()',
                insert: 'tan( <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.argumentInsert + '> )',
                name: 'TAN',
                type: 'math'
            },

            asin: {
                funcAsin: 'asin',
                funcAsinIns: '()',
                insert: 'asin( <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.argumentInsert + '> )',
                name: 'ASIN',
                type: 'math'
            },

            acos: {
                funcAcos: 'acos',
                funcAcosIns: '()',
                insert: 'acos( <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.argumentInsert + '> )',
                name: 'ACOS',
                type: 'math'
            },

            atan: {
                funcAtan: 'atan',
                funcAtanIns: '()',
                insert: 'atan( <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.argumentInsert + '> )',
                name: 'ATAN',
                type: 'math'
            },

            round: {
                funcRound: 'round',
                funcRoundIns: '()',
                insert: 'round( <' + mceTranslate[Vlab.mceLaboratory.labLang].functionsLib.argumentInsert + '> )',
                name: 'ROUND',
                type: 'math'
            }
        },


        arrIndexStart: '[',
        arrIndexEnd: ']',

        groupStart: '(',
        groupEnd: ')',

        blockEnd: ';',

        singleQuote: '\'',
        doubleQuote: '"',

        startWord: function(){
            return ['begin', 'else', 'repeat'];
        },

        endWord: function(){
            return ['end', 'else', 'until'];
        },

        keyWords: function(){
            return{
                'if': 'IF', 'while': 'WHILE', 'begin': 'BEGIN', 'do': 'DO', 'then': 'THEN', 'until': 'UNTIL', 'end': 'END', 'repeat': 'REPEAT', 'else': 'ELSE',
                'mod': 'MOD', '{': 'LBRA', '}': 'RBRA', '(': 'LPAR', ')': 'RPAR', '[': 'LSQR', ']': 'RSQR', '=': 'EQUAL', ';': 'SEMICOLON', '/': 'DIV',
                '*': 'MULT', '-': 'MINUS', '<': 'LESS', '>': 'MORE', '<>': 'NOTEQUAL', ':=': 'SET', '>=': 'MOREEQUAL', '<=': 'LESSEQUAL', '+': 'PLUS',
                'and': 'AND', 'or': 'OR', 'not': 'NOT', "'": 'QUOTE',

                'sqrt': 'SQRT', 'sin': 'SIN', 'cos': 'COS', 'tan': 'TAN', 'asin': 'ASIN', 'acos': 'ACOS', 'atan': 'ATAN', 'round': 'ROUND'
            }
        }

    }
}
