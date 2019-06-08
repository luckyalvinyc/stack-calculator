const $input = $('#input-1')

let checker = true

$input.keypress(function(e) {
  if (e.which == 13 && checker && $input.val().length) {
    const parsed = parz($input.val())
    const infix2Postfix = new Infix2Postifx(parsed)
    const postfix = infix2Postfix.toPostfix()

    $('.result h3').html(postfix)

    const calculatePostfix = new CalculatePostfix(postfix.trim())
    const result = calculatePostfix.calculate()

    $('.result span').html(result)
  }
})

$input.focus(function() {
  $(this)
    .parent()
    .addClass('input--filled')
})

$input.blur(function() {
  if (!$input.val().length)
    $(this)
      .parent()
      .removeClass('input--filled')
})

$('#input-1').on('input', function() {
  const value = this.value
  const isValid = processParen(value)

  if (/[a-z]/i.test(value) || !isValid) {
    $(this)
      .next()
      .addClass('error-text')
    checker = false
  } else {
    $(this)
      .next()
      .removeClass('error-text')
    checker = true
  }
})

function processParen(exp) {
  let parenStack = []
  let len = exp.length

  for (var i = 0; i < len; i++) {
    if (exp[i] == '(') {
      parenStack.push(exp[i])
    } else if (exp[i] == ')') {
      if (
        !parenStack.length ||
        !isPair(parenStack[parenStack.length - 1], exp[i])
      ) {
        return false
      }

      parenStack.pop()
    }
  }

  return !parenStack.length
}

function isPair(char1, char2) {
  return char1 == '(' && char2 == ')'
}
