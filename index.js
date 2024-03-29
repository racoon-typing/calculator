// Ноды
const calculatorList = document.querySelector('.calculator__list');
const outputContentNode = document.querySelector('.calculator__output-content');
let result;
let firstString = '';
let secondString = '';
let thirdString = '';

// Слушатель на нажатие
calculatorList.addEventListener('click', (e) => {

    // Очищает поля
    if (e.target.id === 'del') {
        result = 0;
        firstString = '';
        secondString = '';
        thirdString = '';
        outputContentNode.textContent = '';
        return;
    }

    // Проверка на пустую 3 строку
    if (thirdString !== '') {
        if (e.target.id === 'equals') {
            // 1-ое значение
            let firstComponent = Number(firstString);
            // 2-ое значение
            let secondComponent = Number(thirdString);

            if (secondString === 'divide') {
                result = firstComponent / secondComponent;
            } else if (secondString === 'multiply') {
                result = firstComponent * secondComponent;
            } else if (secondString === 'minus') {
                result = firstComponent - secondComponent;
            } else if (secondString === 'plus') {
                result = firstComponent + secondComponent;
            } 

            // Кол-во знаков после запятой у первого числа
            const decimalNumberfirstComponent = firstComponent.toString().match(/\.(\d+)/)?.[1].length

            // Проверка, если у первого числа один знак после запятой, то при делении будет 1 знак 
            if (decimalNumberfirstComponent === 1) {
                outputContentNode.textContent = result.toFixed(1);

                // Очистить поля
                firstString = '';
                secondString = '';
                thirdString = '';
                return;
            }

            // Кол-во знаков после запятой у результата
            const decimalNumber = result.toString().match(/\.(\d+)/)?.[1].length

            // Проверка на целочисленный результат
            if (decimalNumber >= 5) {
                outputContentNode.textContent = result.toFixed(5);

                // Очистить поля
                firstString = '';
                secondString = '';
                thirdString = '';
                return;
            } else if (decimalNumber >= 1 && decimalNumber < 5) {
                outputContentNode.textContent = result.toFixed(decimalNumber);

                // Очистить поля
                firstString = '';
                secondString = '';
                thirdString = '';
                return;
            } else {
                outputContentNode.textContent = result;

                // Очистить поля
                result = '';
                firstString = '';
                secondString = '';
                thirdString = '';
                return;
            }
        } else if (e.target.id === 'percent') {
            // 1-ое значение
            let firstComponent = Number(firstString);
            // 2-ое значение
            let secondComponent = Number(thirdString);

            if (secondString === 'multiply') {
                // Расчет n процентов от числа
                result = (secondComponent / firstComponent) * 100 ;

                // Кол-во знаков после запятой у результата
                const decimalNumber = result.toString().match(/\.(\d+)/)?.[1].length

                // Округление после запятой
                if (decimalNumber >= 5) {
                    outputContentNode.textContent = `${result.toFixed(5)}%`;
    
                    // Очистить поля
                    firstString = '';
                    secondString = '';
                    thirdString = '';
                    return;
                } else if (decimalNumber >= 1 && decimalNumber < 5) {
                    outputContentNode.textContent = `${result.toFixed(decimalNumber)}%`;

                    // Очистить поля
                    firstString = '';
                    secondString = '';
                    thirdString = '';
                    return;
                } else {
                    outputContentNode.textContent = `${result}%`;
    
                    // Очистить поля
                    firstString = '';
                    secondString = '';
                    thirdString = '';
                    return;
                }
            }
        }
    }


    // Добавить точку: true
    let addDotSecond = true;

    // Проверка на наличие знака во 2 строке
    if (secondString !== '') {
        if (e.target.id === 'divide' || e.target.id === 'multiply' || e.target.id === 'percent' || e.target.id === 'equals') {
            return;
        }

        if (e.target.id === 'minus') {
            thirdString = '-';
            outputContentNode.textContent = thirdString;
            return;
        } else if (e.target.id === 'plus') {
            thirdString = '';
            outputContentNode.textContent = thirdString;
            return;
        }

        if (e.target.id === 'dot' && addDotSecond) {
            // Целое число или нет
            const isPoint = thirdString.match(/\./);
            if (isPoint) {
                addDotSecond = false;
                return;
            }

            thirdString += '0.';
            outputContentNode.textContent = thirdString;
            return;
        }

        thirdString += e.target.id;
        outputContentNode.textContent = thirdString;
        return;
    }


    // Добавить точку: true
    let addDotFirst = true;

    // Проверка на пустую 1 строку
    if (e.target.id === 'divide' || e.target.id === 'multiply' || e.target.id === 'minus' || e.target.id === 'plus' || e.target.id === 'equals' || e.target.id === 'del' || e.target.id === 'root' || e.target.id === 'percent') {
        if (firstString === '' || firstString === '-') {
            // Если хотим написать отрицательное число 
            if (e.target.id === 'minus') {
                firstString = '-';
                outputContentNode.textContent = firstString;
                return;
            } else if (e.target.id === 'plus') {
                firstString = '';
                outputContentNode.textContent = firstString;
                return;
            }
            return;
        } else {
            if (e.target.id === 'root') {
                // Вычиляет вадратный корень числа
                let firstNumber = Number(firstString);
                let resultRoot = Math.sqrt(firstNumber);

                // Выводит квадратный корень
                outputContentNode.textContent = resultRoot;

                // Очистить поля
                firstString = '';
                secondString = '';
                return;
            }
            
            secondString = e.target.id;
            outputContentNode.textContent = '';
        }
    } else {
        // Добавляет 0 и точку
        if (e.target.id === 'dot' && addDotFirst) {
            // Чтобы появлялся ноль перед запятой
            if (firstString === '') {
                firstString += '0.';
                outputContentNode.textContent = firstString;
                return;
            } else if (firstString === '-') {
                firstString += '0.';
                outputContentNode.textContent = firstString;
                return;
            }

            // Целое число или нет
            const isPoint = firstString.match(/\./);
            if (isPoint) {
                addDotFirst = false;
                return;
            }

            firstString += '.';
            outputContentNode.textContent = firstString;
            return;
        }

        // Не дает писать 0 первым числом
        if (e.target.id === '0' && firstString === '') {
            firstString = '';
            return;
        }

        firstString += e.target.id;
        outputContentNode.textContent = firstString;
    }
});