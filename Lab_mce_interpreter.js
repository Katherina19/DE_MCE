var mceRunSettings = {
    // translate to js
    functions_js: {
        'SQRT': Math.sqrt,
        'SIN': Math.sin,
        'COS': Math.cos,
        'TAN': Math.tan,
        'ASIN': Math.asin,
        'ACOS': Math.acos,
        'ATAN': Math.atan,
        'ROUND': Math.round
    },

    // debug parameters
    mceDebug: false,
    mceDebug_vars: []

};

function mceExpression(graph, vars){

    // check type compatibility
    var checkType = function (exp1, exp2) {
        if ((mceVariableProcessor.isType(exp1, 'int') || mceVariableProcessor.isType(exp1, 'real')) &&
            (mceVariableProcessor.isType(exp2, 'int') || mceVariableProcessor.isType(exp2, 'real'))) {
            return true;
        }
        else{
            return false;
        }
    };

    var checkCharType = function(exp1, exp2){
        return mceVariableProcessor.isType(exp1, 'symbol') && mceVariableProcessor.isType(exp2, 'symbol');
    }

    if (graph.c1 && !graph.c2) {
        graph = graph.c1;
    }

    switch (graph.type){
        case 'VAR':
            try {
                return vars[graph['var']].value;
            } catch (err) {
                throw {line: graph.line, err: "ERR002:002"};
            }

        case 'CHAR':
            try {
                return graph.value;
            } catch (err) {
                throw {line: graph.line, err: "ERR002:002"};
            }

        case 'ARRAY':
            try {
                return vars[graph['var']].value[mceExpression(graph.expr, vars)];
            } catch (err) {
                throw {line: graph.line, err: "ERR002:002"};
            }

        case 'INT':
            return parseInt(graph.value);

        case 'FLOAT':
            return parseFloat(graph.value);

        case 'PAR':
            return mceExpression(graph.c1, vars);

        case 'PLUS':
            var exp1 = mceExpression(graph.c1, vars);
            var exp2 = mceExpression(graph.c2, vars);
            if (checkType(exp1,exp2)) {
                return exp1 + exp2;
            } else {
                throw {line: graph.line, err: "ERR002:000"};
            }


        case 'MINUS':
            return (graph.c1?mceExpression(graph.c1, vars):0) - mceExpression(graph.c2, vars);

        case 'UNARY_MINUS':
            return -mceExpression(graph.c2, vars);

        case 'DIV':
            var exp1 = mceExpression(graph.c1, vars);
            var exp2 = mceExpression(graph.c2, vars);

            if(exp2 == 0) {
                throw {line: graph.line, err: "ERR002:001"};
            } else if (checkType(exp1,exp2)){
                return exp1 / exp2;
            } else {
                throw {line: graph.line, err: "ERR002:000"};
            }

        case 'MOD':
            var exp1 = mceExpression(graph.c1, vars);
            var exp2 = mceExpression(graph.c2, vars);

            if(exp2 == 0) {
                throw {line: graph.line, err: "ERR002:001"};
            } else if (checkType(exp1,exp2)){
                return exp1 % exp2;
            } else {
                throw {line: graph.line, err: "ERR002:000"};
            }

        case 'MULT':
            var exp1 = mceExpression(graph.c1, vars);
            var exp2 = mceExpression(graph.c2, vars);

            if (checkType(exp1,exp2)){
                return exp1 * exp2;
            } else {
                throw {line: graph.line, err: "ERR002:000"};
            }

        case 'LESS':
            var exp1 = mceExpression(graph.c1, vars);
            var exp2 = mceExpression(graph.c2, vars);

            if (checkType(exp1,exp2) || checkCharType(exp1, exp2)){
                return exp1 < exp2;
            } else {
                throw {line: graph.line, err: "ERR002:000"};
            }

        case 'MORE':
            var exp1 = mceExpression(graph.c1, vars);
            var exp2 = mceExpression(graph.c2, vars);

            if (checkType(exp1,exp2) || checkCharType(exp1, exp2)){
                return exp1 > exp2;
            } else {
                throw {line: graph.line, err: "ERR002:000"};
            }

        case 'EQUAL':
            var exp1 = mceExpression(graph.c1, vars);
            var exp2 = mceExpression(graph.c2, vars);

            if (checkType(exp1,exp2) || checkCharType(exp1, exp2)){
                return exp1 == exp2;
            } else {
                throw {line: graph.line, err: "ERR002:000"};
            }

        case 'NOTEQUAL':
            var exp1 = mceExpression(graph.c1, vars);
            var exp2 = mceExpression(graph.c2, vars);

            if (checkType(exp1,exp2) || checkCharType(exp1, exp2)){
                return exp1 != exp2;
            } else {
                throw {line: graph.line, err: "ERR002:000"};
            }

        case 'LESSEQUAL':
            var exp1 = mceExpression(graph.c1, vars);
            var exp2 = mceExpression(graph.c2, vars);

            if (checkType(exp1,exp2) || checkCharType(exp1, exp2)){
                return exp1 <= exp2;
            } else {
                throw {line: graph.line, err: "ERR002:000"};
            }

        case 'MOREEQUAL':
            var exp1 = mceExpression(graph.c1, vars);
            var exp2 = mceExpression(graph.c2, vars);

            if (checkType(exp1,exp2) || checkCharType(exp1, exp2)){
                return exp1 >= exp2;
            } else {
                throw {line: graph.line, err: "ERR002:000"};
            }

        case 'NOT':
            return !mceExpression(graph.c2, vars);

        case 'AND':
            var exp1 = mceExpression(graph.c1, vars);
            var exp2 = mceExpression(graph.c2, vars);

            if (checkType(exp1,exp2)){
                return exp1 && exp2;
            } else {
                throw {line: graph.line, err: "ERR002:000"};
            }

        case 'OR':
            var exp1 = mceExpression(graph.c1, vars);
            var exp2 = mceExpression(graph.c2, vars);

            if (checkType(exp1,exp2)){
                return exp1 || exp2;
            } else {
                throw {line: graph.line, err: "ERR002:000"};
            }

        case 'FUNC':
            return mceRunSettings.functions_js[graph.func](mceExpression(graph.expr, vars));
    }
}

var mceProgramProcessor = {

    stopExecution: false, // flag to stop program execution

    /**
     *
     * Find node in tree by id
     *
     * @param nodeId - id to find
     * @param graph - current graph
     *
     * @return found node || false
     *
     */
    findNode: function(nodeId,graph){
        if (nodeId !== undefined) {
            if (graph && (typeof graph == 'object') ) {
                if (graph.id == nodeId) {
                    return graph;
                }
                else {
                    for (var g in graph) {
                        var res = this.findNode(nodeId, graph[g]);
                        if (res) {
                            return res;
                        }
                    }
                    return false;
                }
            }
        }
    },

    /**
     * Add next node to sequence
     *
     * @param id - node's id
     * @param sequence - sequence to add id to
     *
     */
    addNextById: function(id, sequence){
        sequence.push(id);
        return sequence;
    },

    /**
     * Processing 'NODE'-type for preventing terminal nodes
     *
     * @param graph - next possible node
     * @param sequence - sequence to add id to
     *
     */
    processNodeType: function(graph,sequence) {
        if (graph.type == "NODE") {
            if (graph.c2) return this.processNodeType(graph.c2, sequence);
            if (graph.c1) return this.processNodeType(graph.c1, sequence);
        }
        else sequence = this.addNextById(graph.id, sequence);
        return sequence;
    },

    /**
     * Add next node to sequence, checking 'NODE'-type
     *
     * @param graph - next possible node
     * @param sequence - sequence to add id to
     *
     */
    addNextByNode: function(graph, sequence){
        if (graph.type == "NODE") {
            if (graph.c2) sequence = this.addNextByNode(graph.c2, sequence);
            if (graph.c1) sequence = this.addNextByNode(graph.c1, sequence);
        }
        else sequence = this.addNextById(graph.id, sequence);
        return sequence;
    },

    /**
     * Process current node
     *
     * @param tree - code tree
     * @param vars - current variables
     * @param sequence - step sequence
     *
     * @return {vars - temporary processed variables,
    *           sequence - updated step sequence }
     *
     */
    processStep: function(tree, vars, sequence){
        var self = this;
        var lineIndex = sequence.length - 1;
        var seqElem = sequence.pop();
        var graph = !isNaN(Number(seqElem)) ? this.findNode(seqElem,tree) : seqElem;
        var graphLine = undefined;

        if (graph) {
            // add next nodes to sequence in inverse order
            if (graph.c2) sequence = this.addNextByNode(graph.c2, sequence);
            if (graph.c1) sequence = this.addNextByNode(graph.c1, sequence);

            // set line
            graphLine = graph.line;

            switch (graph.type) {
                case 'SET':
                    var exp = mceExpression(graph.expr,vars);
                    if (graph['var'].type == 'VAR') {
                        try {
                            vars[graph['var']['var']].value;
                        } catch (err) {
                            throw {line: graph.line, err: "ERR002:002"};
                        }

                        if (vars[graph['var']['var']].type == 'int' && mceVariableProcessor.isType(exp, 'int') ||
                            vars[graph['var']['var']].type == 'real' && (mceVariableProcessor.isType(exp, 'int') || mceVariableProcessor.isType(exp, 'real'))){

                            vars[graph['var']['var']].value = exp;
                        }
                        else {
                            throw {line: graph.line, err: "ERR002:000"};
                        }

                    } else if (graph['var'].type == 'ARRAY') {
                        try {
                            vars[graph['var']['var']].value[mceExpression(graph['var'].expr,vars)];
                        } catch (err) {
                            throw {line: graph.line, err: "ERR002:002"};
                        }
                        if (vars[graph['var']['var']].type == 'int-array' && mceVariableProcessor.isType(exp, 'int') ||
                            vars[graph['var']['var']].type == 'symbol-array' && mceVariableProcessor.isType(exp, 'symbol') ||
                            vars[graph['var']['var']].type == 'real-array' && (mceVariableProcessor.isType(exp, 'int') || mceVariableProcessor.isType(exp, 'real'))){

                            vars[graph['var']['var']].value[mceExpression(graph['var'].expr,vars)] = exp;
                        } else {
                            throw {line: graph.line, err: "ERR002:000"};
                        }
                    }
                    break;

                case 'IF':
                    if (mceExpression(graph.expr,vars)) {
                        if (graph.then && graph.then.c2) sequence = this.addNextByNode(graph.then.c2, sequence);
                        if (graph.then && graph.then.c1) sequence = this.addNextByNode(graph.then.c1, sequence);
                    } else {
                        if (graph.else && graph.else.c2) sequence = this.addNextByNode(graph.else.c2, sequence);
                        if (graph.else && graph.else.c1) sequence = this.addNextByNode(graph.else.c1, sequence);
                    }
                    break;

                case 'WHILE':
                    if (mceExpression(graph.expr,vars)) {
                        sequence = this.addNextById(graph.id, sequence);
                        if (graph.block && graph.block.c2) sequence = this.addNextByNode(graph.block.c2, sequence);
                        if (graph.block && graph.block.c1) sequence = this.addNextByNode(graph.block.c1, sequence);
                    }
                    break;

                case 'DO':
                    // process block
                    var s = [],
                        sCopy = [];
                    if (graph.block && graph.block.c2) s = this.addNextByNode(graph.block.c2, s);
                    if (graph.block && graph.block.c1) s = this.addNextByNode(graph.block.c1, s);
                    sCopy = mceCopy(s);
                    // loop block execution, save condition to check
                    var exprGraph = {};
                    exprGraph.expr = mceCopy(graph.expr);
                    exprGraph.doBlockId = graph.id;
                    exprGraph.type = 'DOEXPR';
                    sequence.push(exprGraph);
                    sequence = sequence.concat(sCopy);

                    // run first expression in 'DO'-block
                    var result = this.processStep(tree,vars,sequence);
                    vars = result.vars;
                    sequence = result.sequence;
                    graphLine = result.line;
                    break;

                case 'DOEXPR':
                    if (mceExpression(graph.expr,vars)) sequence = this.addNextById(graph.doBlockId,sequence);
                    graphLine = graph.expr.line;
                    break;

                case 'PRG':
                case 'NODE':
                    var result = this.processStep(tree,vars,sequence);
                    if (result != undefined && result.vars != undefined && result.sequence != undefined && result.line != undefined) {
                        vars = result.vars;
                        sequence = result.sequence;
                        graphLine = result.line;
                    }
                    break;
            }

            return {
                vars: vars,
                sequence: sequence,
                line: graphLine
            };

        }

    },

    /**
     * Run program
     *
     * @param tree - code tree
     * @param vars - current variables
     * @param callback - callback to Vlab
     *
     */
    run: function(tree, vars, callback){
        console.log(tree);
        var self = this;

        var sequence = []; // step sequence

        var programDeferred = $.Deferred(); // deferred object for the whole program

        sequence = self.addNextById(0,sequence);

        var runStep = function(){

            var def = $.Deferred(); // deferred object for executed expression
            var graph = self.findNode(sequence[sequence.length-1],tree);
            var execFurther = function (def) {
                var result = self.processStep(tree,vars,sequence);
                if (result && result.vars && result.sequence) {
                    vars = result.vars;
                    sequence = result.sequence;
                }
                def.resolve();
                return;
            }

            // stop if flag (button pressed)
            if (self.stopExecution) {
                sequence = [];
                programDeferred.resolve();
                return;
            }

            if (graph.type=="DO" || graph.type=="WHILE") {
                setTimeout(function(){
                    try {
                        execFurther(def);
                    }
                    catch (err) {
                        mceErrorProcessor.catchErrorOnRun(err);
                    }
                },1);
            }
            else {
                execFurther(def);
            }

            $.when($,def).done(function(){
                if (sequence.length > 0) return runStep(tree,vars,sequence);
                else {
                    programDeferred.resolve();
                }
            });

            return;
        }

        runStep(); // run program


        $.when($,programDeferred).done(function(){
            callback(vars);
        });

    }

};

var mceErrorProcessor = {

    displayError: function(line,errorCode) {
        var errMsg;
        if (errorCode.error) {
            var language = Vlab.mceLaboratory.codeStyle.toLowerCase();
            var selectLang = language.charAt(0).toUpperCase() + language.substr(1);

            var keywords = mceTemplates[selectLang].keyWords();
            var reverse_keywords = {};
            for (k in keywords) {
                reverse_keywords[keywords[k]] = k;
            }

            var exps = mceTranslate[Vlab.mceLaboratory.labLang].token_exceptions;
            var errFunc = mceTranslate[Vlab.mceLaboratory.labLang].errors[errorCode.error];
            errMsg = errFunc(exps[errorCode.token] || reverse_keywords[errorCode.token],
                exps[errorCode.expected] || reverse_keywords[errorCode.expected])
        } else {
            // process error
            errMsg = mceTranslate[Vlab.mceLaboratory.labLang].errors[errorCode.err];
        }

        if (line != "undefined"){
            var errorLine = line + 1;
            errMsg += " in line: " + errorLine;
        }

        // display
        mceUI.messagesGrid.addRow("error",errMsg);
    },

    catchErrorOnRun: function (err) {
        mceUI.codeEditor.editor.setOption("readOnly",false);
        $('.mce-run-button').linkbutton('enable');
        $('.mce-debug-button').linkbutton('enable');
        $('.mce-step-button').linkbutton('enable');
        $('#mceVariablesEdit').linkbutton('enable');
        mceErrorProcessor.displayError(err.line, err);
        // coloring error line
        Vlab.mceLaboratory.currentErrorLine = mceUI.codeEditor.editor.setLineClass(err.line, null, "mce-errorline");
    }
};