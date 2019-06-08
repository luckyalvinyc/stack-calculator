const Sign = {
  POWER: '^',
  ADDITION: '+',
  SUBTRACTION: '-',
  DIVISION: '/',
  MULTIPLICATION: '*',
}

Array.prototype.isEmpty = function() {
  return this.length === 0
}

Array.prototype.top = function() {
  return this[this.length - 1]
}

function Infix2Postifx(exp) {
  this.exp = exp
  this.result = ''
}

Infix2Postifx.prototype.hasGreaterPriority = function(oprtr1, oprtr2) {
  return this.getPriority(oprtr1) >= this.getPriority(oprtr2)
}

Infix2Postifx.prototype.getPriority = function(oprtr) {
  switch (oprtr) {
    case Sign.POWER:
      return 4
    case Sign.MULTIPLICATION:
    case Sign.DIVISION:
      return 3
    case Sign.SUBTRACTION:
    case Sign.ADDITION:
      return 2
    default:
      return -1
  }
}

Infix2Postifx.prototype.isOperand = function(item) {
  return /\d/.test(item)
}

Infix2Postifx.prototype.isOperator = function(item) {
  switch (item) {
    case Sign.ADDITION:
    case Sign.SUBTRACTION:
    case Sign.MULTIPLICATION:
    case Sign.DIVISION:
    case Sign.POWER:
      return true
    default:
      return false
  }
}

Infix2Postifx.prototype.isOpeningParentheses = function(item) {
  return item == '('
}

Infix2Postifx.prototype.isClosingParentheses = function(item) {
  return item == ')'
}

Infix2Postifx.prototype.toPostfix = function() {
  let stack = []
  const arr = this.exp
  const len = arr.length

  for (let i = 0; i < len; i++) {
    const item = arr[i]
    const left = arr[i - 1]

    if (this.isOperand(item)) {
      this.result += item + ' '
    } else if (this.isOperator(item)) {
      while (
        !stack.isEmpty() &&
        this.hasGreaterPriority(stack.top(), item) &&
        !this.isOpeningParentheses(stack.top())
      ) {
        this.result += stack.pop() + ' '
      }

      stack.push(item)
    } else if (this.isOpeningParentheses(item)) {
      stack.push(item)
    } else if (this.isClosingParentheses(item)) {
      while (!stack.isEmpty() && !this.isOpeningParentheses(stack.top())) {
        this.result += stack.pop() + ' '
      }

      stack.pop()
    }
  } // End of for loop

  while (!stack.isEmpty()) {
    this.result += stack.pop() + ' '
  }

  return this.result
}

function CalculatePostfix(postFix) {
  this.postFix = postFix.split(' ')
  this.result = ''
}

CalculatePostfix.prototype.calculate = function() {
  let stack = []
  let _flag = false
  const len = this.postFix.length

  for (let i = 0; i < len; i++) {
    const item = this.postFix[i]
    const next = this.postFix[i + 1]

    if (this.isOperator(item)) {
      while (!stack.isEmpty()) {
        if (stack.length !== 1) {
          const operand1 = stack.pop()
          const operand2 = stack.pop()

          if (item == Sign.POWER) {
            let tmp = this.solvePower(operand2, operand1)

            if (operand1 < 0) tmp = 1 / tmp

            this.result = tmp
          } else {
            this.result = eval(`${operand2} ${item} ${operand1}`)
          }
        } else {
          if (item === Sign.SUBTRACTION && /\d/.test(next)) _flag = true

          if (item === Sign.SUBTRACTION) {
            const operand = stack.pop()
            this.result = eval(`${item}(${operand})`)
          }
        }

        stack.push(this.result)

        break
      }
    } else {
      stack.push(item)
    }
  }

  return _flag ? this.result * -1 : this.result
}

CalculatePostfix.prototype.isOperator = Infix2Postifx.prototype.isOperator

CalculatePostfix.prototype.solvePower = function(base, exp) {
  let result = 1
  exp = Math.abs(exp)

  if (exp == 0) {
    return result
  } else if (exp & 1) {
    return (result = base * this.solvePower(base, exp - 1))
  } else {
    const tmp = this.solvePower(base, exp / 2)
    return (result = tmp * tmp)
  }
}
