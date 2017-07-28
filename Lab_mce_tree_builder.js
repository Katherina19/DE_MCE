function mceCopy(obj){
    return obj ? JSON.parse(JSON.stringify(obj)) : {};
}

(function () {
    var priorities = {
        'UNARY_MINUS': 0,
        'NOT': 0,
        'DIV': 1,
        'MOD': 1,
        'MULT': 2,
        'MINUS': 3,
        'PLUS': 4,
        'EQUAL': 5,
        'NOTEQUAL': 5,
        'LESSEQUAL': 5,
        'MOREEQUAL': 5,
        'LESS': 5,
        'MORE': 5,
        'AND': 6,
        'OR': 6
    };

    var operators = [];
    for(var k in priorities) operators.push(k);

    var syntaxer, rules, token, id;

    function next_token() {
        token = syntaxer.get_token();
    }

    function transformRule(sequence) {
        var new_rule = [];
        for (var i = 0; i < sequence.length; i++) {
            part = sequence[i];
            new_rule[i] = typeof part === 'string' ? part : part.func
        }

        return new_rule;
    }

    function transformRules(rules) {
        var new_rules = {};

        for (type in rules) {
            var part = rules[type][0],
                trigger = typeof part === 'string' ? part : part.trigger;

            new_rules[trigger] = {
                sequence: transformRule(rules[type]),
                type: type
            }
        }

        return new_rules;
    }

    function build(lang_rules, lang_syntaxer){
        syntaxer = lang_syntaxer;
        id = 0;
        next_token();
        rules = transformRules(lang_rules);

        return buildCommand(transformRule([COMMANDS('c1'), 'EOF']), 'PRG')
    }

    function cond(tokens, if_true, if_false) {
        if (typeof tokens === 'string') {
            tokens = [tokens];
        }

        return {
            func: function() {
                return transformRule(tokens.indexOf(token.key_word) > -1 ? if_true : if_false);
            }
        }
    }

    function opt(token) {
        return cond(token, [token], []);
    }

    function currentTokenEquals(str) {
        if (token.key_word === str) {
            return true;
        } else {
            throw {
                error: 'ERR001:001',
                token: token.key_word,
                expected: str,
                line: syntaxer.line,
            }
        }
    }


    // возвращает построенный узел дерева для команды
    function buildCommand(sequence, type){
        var node = {
            type: type,
            line: syntaxer.line,
            id: id++
        };

        // копия массива команд
        sequence = sequence.slice();

        while (sequence.length){
            var command_part = sequence.shift();
            if (typeof command_part === 'string') {
                if (currentTokenEquals(command_part)){
                    next_token();
                }
            } else {
                var command_line = syntaxer.line;
                var command = command_part();
                if ($.isArray(command)) {
                    // для функций типа opt и cond
                    sequence = command.concat(sequence);
                } else {
                    // для функций COMMANDS и EXPR
                    node[command.name] = command.node;
                    if (node[command.name] !== undefined)
                        node[command.name].line = node[command.name].line || command_line;
                }
            }
        }

        return node;
    }

    // Функции для последовательностей команд
    // должны возвращать name – имя ключа в объекте узла
    // node – сам включаемый узел
    function variableOrArray() {
        var rule = transformRule([VAR('var'), cond('LSQR', ['LSQR', EXPR('expr'), 'RSQR'], [])]),
            node = buildCommand(rule, 'VAR');
        node.type = node.expr ? 'ARRAY' : 'VAR';
        node.id = id++;

        return node;
    }

    function variable() {
        if (currentTokenEquals('VAR')) {
            var value = token.value;
            next_token();
            return value;
        }
    }

    function func() {
        var rule = transformRule([FUNC_NAME('func'), 'LPAR', EXPR('expr'), 'RPAR']),
            node = buildCommand(rule, 'FUNC');
        node.id = id++;

        return node;
    }

    function func_name() {
        if (currentTokenEquals('FUNC')) {
            var value = token.value;
            next_token();
            return value;
        }
    }

    function LITERAL(name, literal) {
        return {
            trigger: literal,
            func: function() {
                if (currentTokenEquals(literal)) {
                    var value = token.value;
                    next_token();
                    return {
                        name: name,
                        node: {
                            type: literal,
                            value: value,
                            id: id++
                        }
                    }
                }
            }
        }
    }

    function operations() {
        var operator = token.key_word;
        next_token();
        return operator;
    }

    function getExpression() {
        var optional_expr = cond(operators, [OPERATIONS('type'), EXPR('c2')], []),
            expr_rules = {
                'PAR': ['LPAR', EXPR('c1'), 'RPAR', optional_expr],
                'VAR': [VAR_OR_ARRAY('c1'), optional_expr],
                'FUNC': [FUNC('c1'), optional_expr],
                'UNARY_MINUS': ['MINUS', EXPR('c2')], //TODO update the interpreter
                'NOT': ['NOT', EXPR('c2')]
            },
            literals = ['INT', 'FLOAT', 'CHAR'],
            functions = ['SQRT', 'SIN', 'COS', 'TAN', 'ASIN', 'ACOS', 'ATAN', 'ROUND'];

        for (var i = 0; i < literals.length; i++) {
            expr_rules[literals[i]] = [LITERAL('c1', literals[i]), optional_expr];
        }

        expr_rules = transformRules(expr_rules);
        if (expr_rules[token.key_word]) {
            var node = buildCommand(expr_rules[token.key_word].sequence, expr_rules[token.key_word].type);
        } else {
            throw {
                error: 'ERR001:000',
                token: token.key_word,
                line: syntaxer.line,
            }
        }

        if (node.c2) {
            var first_node = node.c2;
            while (first_node.c1 && first_node.c1.type in priorities) {
                first_node = first_node.c1;
            }
            if (!(node.c2.type in priorities)) {
                node.c2 = node.c2.c1; //TODO after EXPR
            } else if (priorities[node.type] <= priorities[first_node.type]) {
                var new_node = {c1: node.c1, type:node.type, c2:first_node.c1, line:node.line, id:node.id};
                node = node.c2;
                first_node.c1 = new_node;
            }
        }

        return node;
    }

    function commands() {
        var node = undefined;
        while (token.key_word in rules) {
            node = {
                type: 'NODE',
                c1: node,
                c2: buildCommand(rules[token.key_word].sequence, rules[token.key_word].type),
                id: id++
            }
        }

        return node;
    }

    function buildingWrapper(func, trigger) {
        return function(name) {
            return {
                trigger: trigger,
                func: function() {
                    return {
                        name: name,
                        node: func()
                    }
                }
            }
        }
    }

    var EXPR = buildingWrapper(getExpression),
        COMMANDS = buildingWrapper(commands),
        VAR = buildingWrapper(variable, 'VAR'),
        VAR_OR_ARRAY = buildingWrapper(variableOrArray, 'VAR'),
        FUNC_NAME = buildingWrapper(func_name, 'FUNC'),
        FUNC = buildingWrapper(func, 'FUNC'),
        OPERATIONS = buildingWrapper(operations)

    window.mceBuildTree = build;
    window.LANG_RULES = {
        C: {
            'SET': [VAR_OR_ARRAY('var'), 'SET', EXPR('expr'), 'SEMICOLON'],

            'IF': [
                'IF', 'LPAR', EXPR('expr'), 'RPAR', 'LBRA',
                COMMANDS('then'),
                'RBRA', opt('SEMICOLON'), cond('ELSE', ['ELSE', 'LBRA',
                    COMMANDS('else'),
                    'RBRA'], []), opt('SEMICOLON')
            ],

            'DO': [
                'DO', 'LBRA',
                COMMANDS('block'),
                'RBRA', 'LPAR', EXPR('expr'), 'RPAR', opt('SEMICOLON')
            ],

            'WHILE': [
                'WHILE', 'LPAR', EXPR('expr'), 'RPAR', 'LBRA',
                COMMANDS('block'),
                'RBRA', opt('SEMICOLON')
            ]
        },
        Pascal: {
            'SET': [VAR_OR_ARRAY('var'), 'SET', EXPR('expr'), 'SEMICOLON'],

            'IF': [
                'IF', EXPR('expr'), 'THEN', 'BEGIN',
                COMMANDS('then'),
                cond('END', [], ['ELSE',
                    COMMANDS('else')]),
                'END', opt('SEMICOLON')
            ],

            'DO': [
                'REPEAT',
                COMMANDS('block'),
                'UNTIL', EXPR('expr'), 'SEMICOLON'
            ],

            'WHILE': [
                'WHILE', EXPR('expr'), 'DO', 'BEGIN',
                COMMANDS('block'),
                'END', opt('SEMICOLON')
            ]
        },
        Basic: {
            'SET': [VAR_OR_ARRAY('var'), 'EQUAL', EXPR('expr'), 'NEWLINE'],

            'IF': [
                'IF', EXPR('expr'), 'THEN', 'NEWLINE',
                COMMANDS('then'),
                cond('ELSE', ['ELSE', 'NEWLINE',
                    COMMANDS('else')], []),
                'ENDIF', 'NEWLINE'
            ],

            'DO': [
                'DO', 'NEWLINE',
                COMMANDS('block'),
                'LOOP', 'UNTIL', EXPR('expr'), 'NEWLINE'
            ],

            'WHILE': [
                'WHILE', EXPR('expr'), 'NEWLINE',
                COMMANDS('block'),
                'WEND', 'NEWLINE'
            ]
        }
    }
})();
