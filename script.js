document.addEventListener('DOMContentLoaded', () => {
    function setupLabelInteractions(inputSelector) {
        const inputs = document.querySelectorAll(inputSelector);
    
        inputs.forEach(input => {
            const label = document.querySelector(`label[for="${input.id}"]`);
    
            if (label) {
                // Função para aplicar o estilo do hover/focus
                const applyHoverStyle = () => {
                    label.style.color = 'var(--content-brand)';
                };
    
                // Função para remover o estilo do hover/focus
                const removeHoverStyle = () => {
                    label.style.color = 'var(--content-secondary)';
                };
    
                // Eventos para foco e desfoco
                input.addEventListener('focus', applyHoverStyle);
                input.addEventListener('blur', removeHoverStyle);
    
                // Eventos para hover e saída do mouse
                input.addEventListener('mouseover', applyHoverStyle);
                input.addEventListener('mouseout', () => {
                    // Garante que a cor volta ao estado padrão apenas se não estiver em foco
                    if (document.activeElement !== input) {
                        removeHoverStyle();
                    }
                });
            }
        });
    }
    // Chamar a função para configurar os inputs
    setupLabelInteractions('.wrapper input')



    const form = document.querySelector('.sort-form')
    const appForm = document.querySelector('.app-form')

    function allowOnlyNumericInput(inputElement) {
        inputElement.addEventListener('input', (event) => {
            // Permitir apenas números, removendo qualquer caractere não numérico
            inputElement.value = inputElement.value.replace(/\D/g, '')  // \D corresponde a qualquer coisa que não seja número
        })
    }

    const numberInput = document.querySelector('#number')
    const fromInput = document.querySelector('#from')
    const toInput = document.querySelector('#to')

    // Permitir somente números nestes campos
    allowOnlyNumericInput(numberInput)
    allowOnlyNumericInput(fromInput)
    allowOnlyNumericInput(toInput)


    form.addEventListener('submit', (event) => {
        event.preventDefault()

        const noRepeat = document.querySelector('#toggle').checked;

        const quantity = parseInt(numberInput.value, 10)
        const min = parseInt(fromInput.value, 10)
        const max = parseInt(toInput.value, 10)

        // Validações básicas
        if (isNaN(quantity) || isNaN(min) || isNaN(max) || min >= max || quantity <= 0) {
            alert('Por favor, insira valores válidos!')
            return
        }

        // Gerar números
        const numbers = generateRandomNumbers(quantity, min, max, noRepeat)

        // Substituir conteúdo na div.app-form
        displayResults(numbers)
    });





    function generateRandomNumbers(quantity, min, max, noRepeat) {
        const result = []
        const range = max - min + 1

        if (noRepeat && quantity > range) {
            alert('Não é possível gerar números únicos com este intervalo e quantidade!');
            return [];
        }

        while (result.length < quantity) {
            const randomNum = Math.floor(Math.random() * range) + min;
            if (noRepeat) {
                if (!result.includes(randomNum)) {
                    result.push(randomNum)
                }
            } else {
                result.push(randomNum)
            }
        }

        return result
    }

    function displayResults(numbers) {
        if (numbers.length === 0) return

        // Substituir o conteúdo da div.app-form
        appForm.innerHTML = `
        <div class="results">
          <h2>RESULTADO DO SORTEIO</h2>
          <span>1º Resultado</span>
          <p>${numbers.join(' ')}</p>
          <button class="btn-reset">
            <span>SORTEAR NOVAMENTE</span>
            <img src="./img/replay.svg">
          </button>
        </div>
      `;

        // Adicionar evento ao botão de reset
        const resetButton = appForm.querySelector('.btn-reset')
        resetButton.addEventListener('click', () => {
            location.reload() // Recarrega a página para resetar o formulário
        });
    }
});
