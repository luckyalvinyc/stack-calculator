const OPERATORS = ['+', '-', '*', '/', '^']

const clean = expression =>
  expression
    .replace(/\s+/g, '')
    .replace(/%/g, '/')
    .trim()

const isDigit = token => /[+-]?(\d*\.)?\d+$/.test(token)

const isOperator = token => OPERATORS.indexOf(token) !== -1

const checkNext = item => {
  let tmp = ''
  let i = 0

  while (/[\d.]+/.test(item[i])) {
    tmp += item[i]
    i++
  }

  return tmp
}

function parz(expression) {
  let result = []
  const tokens = clean(expression)

  if (typeof tokens !== 'string') return

  const len = tokens.length

  for (let i = 0; i < len; i++) {
    const left = tokens[i - 1]
    const token = tokens[i]
    const right = tokens[i + 1]

    let tmp = token

    if (token == '-') {
      if (i == 0 || /[-+*/(^]/.test(left)) {
        if (isDigit(right)) {
          tmp += checkNext(tokens.substr(i + 1, len))

          i += tmp.length - 1
        }
      }
    } else if (token == '.') {
      tmp = '0' + tmp
      tmp += checkNext(tokens.substr(i + 1, len))

      i += tmp.length - 2
    } else if (isDigit(token)) {
      tmp += checkNext(tokens.substr(i + 1, len))

      i += tmp.length - 1
    } else if (token === '(' && !isOperator(left)) {
      result.push('*')
    }

    result.push(tmp)
  }

  return result
}
