var mceTranslate = {
    "eng": {
        variables: {
            input: "Input variables",
            output: "Output variables",
            inner: "Inner variables",
            edit: "Edit",
        },
        varEditDialog: {
            title: "Edit variables",
            input: "Input",
            output: "Output",
            name: "Name",
            type: "Type",
            value: "Value",
            add: "Add",
            edit: "Edit",
            del: "Delete",
            save: "Save",
        },
        addVarDialog: {
            title: "Add new variable",
            required: "This field is required.",
            name: "Variable name",
            type: "Type",
            len: "Length",
            value: "Value",
            cancel: "Cancel",
            save: "Save"
        },
        varTypes: {
            prompt: "Variable type",
            int: "Integer",
            real: "Real",
            intArray: "Integer array",
            realArray: "Real array",
            symbolArray: "Symbol array"
        },
        arrayEditDialog: {
            title: "Edit array",
            element: "Element",
            value:  "Value",
            add: "Add",
            del: "Delete",
            random: "Random",
            save: "Save"
        },
        editorTitle: "Source code",
        console: {
            title: "Console",
            codeStyleUpdated: "Code style updated",
            programCompleted: "Program completed",
            programStopped: "Program stopped",
            codeStyleTitle: "Code style"
        },
        runButtons: {
            run: "Run",
            debug: "Debug",
            step: "Step",
            stop: "Stop"
        },
        functionsLib: {
            title: "Functions library",
            control: {
                title: "Control statements",
                ifSt: "If",
                ifElseSt: "If/else",
                preCondLoop: "Precondition loop",
                postCondLoop: "Postcondition loop"
            },
            assign: {
                title: "Assign statement"
            },
            arithmetic: {
                title: "Arithmetic operations"
            },
            logical: {
                title: "Logical operations",
                and: "AND",
                or: "OR",
                not: "NOT"
            },
            comparison: {
                title: "Comparison operations"
            },
            comments: {
                title: "Comments",
                single: "Single line",
                multi: "Multiline"
            },
            math: {
                title: "Math functions"
            },
            conditionInsert: "condition",
            argumentInsert: "argument",
            commentInsert: "comment"
        },
        messagerTexts: {
            ok: "Ok",
            cancel: "Cancel",
            confirm: "Confirm",
            warning: "Warning",
            clearEditor: "Code editor will be cleared. Would you like to change code style?",
            invalidVarType: "Invalid variable type!",
            invalidVarName: "Invalid variable name!",
            emptyArray: "Array can not be empty!",
            invalidArrayLength: "Invalid array length!",
            invalidElemType: "Invalid element type!",
            varExists: "Variable already exists!",
        },
        token_exceptions: {
            "NEWLINE": "line delimiter",
            "VAR": "variable",
            "INT": "integer value",
            "FLOAT": "float value",
        },
        errors: {
            // tree section
            "ERR001:000": function (token) {
              return 'Unexpected token "' + token + '".'
            },

            "ERR001:001": function(token, expected) {
              return 'Unexpected token "' + token + '" expected "' + expected + '".'
            },

            // interpreter section
            "ERR002:000": "Execution failed. Type mismatch", // TYPE ERROR
            "ERR002:001": "Execution failed. Invalid argument", // INVALID ARGUMENT
            "ERR002:002": "Execution failed. Variable is not defined", // VAR NOT DEFINED

            "ERR002:010": "Execution failed. Infinite loop found", // INFINITE LOOP

            // syntaxer section
            "ERR003:000": "Parsing failed. Invalid argument", // WRONG NUMBER
            "ERR003:001": "Parsing failed. Invalid argument", // WRONG SYMBOL
            "ERR003:002": "Parsing failed. Invalid argument", // WRONG KEYWORD
            "ERR003:003": "Parsing failed. Quot is missing", // CHAR NOT CLOSED
        }
    },
    "rus": {
        variables: {
            input: "Входные переменные",
            output: "Выходные переменные",
            inner: "Внутренние переменные",
            edit: "Ред.",
        },
        varEditDialog: {
            title: "Редактирование переменных",
            input: "Входная",
            output: "Выходная",
            name: "Имя",
            type: "Тип",
            value: "Значение",
            add: "Добавить",
            edit: "Редактировать",
            del: "Удалить",
            save: "Сохранить",
        },
        addVarDialog: {
            title: "Добавление новой переменной",
            required: "Обязательное поле.",
            name: "Имя переменной",
            type: "Тип",
            len: "Длина",
            value: "Значение",
            cancel: "Отмена",
            save: "Сохранить"
        },
        varTypes: {
            prompt: "Тип переменной",
            int: "Целое число",
            real: "Вещ. число",
            intArray: "Массив целых чисел",
            realArray: "Массив вещ. чисел",
            symbolArray: "Массив символов"
        },
        arrayEditDialog: {
            title: "Редактирование массива",
            element: "Элемент",
            value:  "Значение",
            add: "Добавить",
            del: "Удалить",
            random: "Случайно",
            save: "Сохранить"
        },
        editorTitle: "Исходный код",
        console: {
            title: "Консоль",
            codeStyleUpdated: "Стиль кодирования изменен",
            programCompleted: "Программа выполнена",
            programStopped: "Программа остановлена",
            codeStyleTitle: "Стиль кодирования"
        },
        runButtons: {
            run: "Запуск",
            debug: "Отладка",
            step: "Шаг",
            stop: "Стоп"
        },
        functionsLib: {
            title: "Библиотека функций",
            control: {
                title: "Управляющие конструкции",
                ifSt: "Если",
                ifElseSt: "Если/иначе",
                preCondLoop: "Цикл с предусловием",
                postCondLoop: "Цикл с постусловием"
            },
            assign: {
                title: "Оператор присваивания"
            },
            arithmetic: {
                title: "Арифметические операторы"
            },
            logical: {
                title: "Логические операторы",
                and: "И",
                or: "ИЛИ",
                not: "НЕ"
            },
            comparison: {
                title: "Операторы сравнения"
            },
            comments: {
                title: "Комментарии",
                single: "Однострочный",
                multi: "Многострочный"
            },
            math: {
                title: "Математические функции"
            },
            conditionInsert: "условие",
            argumentInsert: "аргумент",
            commentInsert: "комментарий"
        },
        messagerTexts: {
            ok: "Ок",
            cancel: "Отмена",
            confirm: "Подтвердить",
            warning: "Предупреждение",
            clearEditor: "Редактор кода будет очищен. Вы действительно хотите изменить стиль кодирования?",
            invalidVarType: "Неверный тип переменной!",
            invalidVarName: "Неверное имя переменной!",
            emptyArray: "Массив не должен быть пустым!",
            invalidArrayLength: "Неверное значение длины массива!",
            invalidElemType: "Несоответствие типов!",
            varExists: "Переменная с таким именем уже объявлена!",
        },
        token_exceptions: {
            "NEWLINE": "перенос строки",
        },
        errors: {
            // tree section
            "ERR001:000": "Ошибка компиляции. Недостающая фигурная скобка", // MISSING RBRA
            "ERR001:001": "Ошибка компиляции. Неверное построение конструкции", // NOT CLOSED PAR
            "ERR001:002": "Ошибка компиляции. Недостающая квадратная скобка", // NOT CLOSED SQUARE

            "ERR001:010": "Ошибка компиляции. Неверное построение выражения", // BAD EXPRESSION
            "ERR001:011": "Ошибка компиляции. Неверное построение условной конструкции", // BAD IF
            "ERR001:012": "Ошибка компиляции. Неверное построение конструкции цикла", // BAD WHILE
            "ERR001:013": "Ошибка компиляции. Неверное построение конструкции цикла", // BAD DO

            "ERR001:020": "Ошибка компиляции. Ожидается разделитель строк", // EXPECTING SEMICOLON && ERROR(NEWLINE)

            "ERR001:030": "Ошибка компиляции. Переменная не объявлена", // UNEXPECTED VAR

            "ERR001:040": "Ошибка компиляции. Неизвестная ошибка", // !

            // interpreter section
            "ERR002:000": "Ошибка запуска кода. Несоответствие типов", // TYPE ERROR
            "ERR002:001": "Ошибка запуска кода. Неверный аргумент", // INVALID ARGUMENT
            "ERR002:002": "Ошибка запуска кода. Переменная не определена", // VAR NOT DEFINED

            "ERR002:010": "Ошибка запуска кода. Найден бесконечный цикл", // INFINITE LOOP

            // syntaxer section
            "ERR003:000": "Ошибка компиляции. Неверный аргумент", // WRONG NUMBER
            "ERR003:001": "Ошибка компиляции. Неверный аргумент", // WRONG SYMBOL
            "ERR003:002": "Ошибка компиляции. Неверный аргумент", // WRONG KEYWORD
            "ERR003:003": "Ошибка компиляции. Недостающая кавычка", // CHAR NOT CLOSED

            "STOP": "Выполнение программы остановлено"
        }
    }
};
