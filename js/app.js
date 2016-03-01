Array.prototype.isEmpty = function() {
	return this.length === 0 ? true : false
}

Array.prototype.top = function() {
	return this[this.length - 1]
}

function Infix2Postifx(exp) {
	this.exp = exp
	this.result = ""
}

Infix2Postifx.prototype.hasGreaterPriority = function(oprtr1, oprtr2) {
	if (this.getPriority(oprtr1) >= this.getPriority(oprtr2)) {
		return true
	}
	return false
}

Infix2Postifx.prototype.getPriority = function(oprtr) {
	switch(oprtr) {
		case "^": return 4
		case "*":
		case "/": return 3
		case "-":
		case "+": return 2
		default : return -1
	}
}

Infix2Postifx.prototype.isOperand = function(item) {
	if (/\d/.test(item))
		return true
	return false
}

Infix2Postifx.prototype.isOperator = function(item) {
	switch(item) {
		case "+":
		case "-":
		case "*":
		case "/":
		case "^": return true
		default: return false
	}
}

Infix2Postifx.prototype.isOpeningParentheses = function(item) {
	return item == "(" ? true : false
}

Infix2Postifx.prototype.isClosingParentheses = function(item) {
	return item == ")" ? true : false
}

Infix2Postifx.prototype.toPostfix = function() {
	var arr = this.exp
	var stack = []

	for (var i = 0, len = arr.length; i < len; i++) {
		if (this.isOperand(arr[i]))
			this.result += arr[i] + " "
		else if (this.isOperator(arr[i])) {
			while(!stack.isEmpty() &&
					this.hasGreaterPriority(stack.top(), arr[i]) &&
					!this.isOpeningParentheses(stack.top()))
			{
				this.result += stack.top() + " "
				stack.pop()
			}
			stack.push(arr[i])
		}
		else if (this.isOpeningParentheses(arr[i]))
			stack.push(arr[i])
		else if(this.isClosingParentheses(arr[i])) {
			while(!stack.isEmpty() && !this.isOpeningParentheses(stack.top())) {
				this.result += stack.top() + " "
				stack.pop()
			}
			stack.pop()
		}
	} // End of for loop

	while(!stack.isEmpty()){
		this.result += stack.top() + " "
		stack.pop()
	}

	return this.result
}


function CalculatePostfix(postFix) {
	this.postFix = postFix
	this.result = ""
}

CalculatePostfix.prototype.calculate = function() {
	var arr = this.postFix.split(" ")
	var stack = []
	var _flag = false

	for (var i = 0, len = arr.length; i < len; i++) {
		if(this.isOperator(arr[i])) {
			while(!stack.isEmpty()) {

				if (stack.length != 1) {
					var operand1 = stack.pop(),
						operand2 = stack.pop()

					if (arr[i] == "^") {
						var tmp
						tmp = this.solvePower(operand2, operand1)
						if (operand1 < 0)
							tmp = 1/tmp
						this.result = tmp
					} else
						this.result = eval(`${operand2} ${arr[i]} ${operand1}`)

				} else {
					if (arr[i] == "-" && /\d/.test(arr[i+1]))
						_flag = true
					if (arr[i] == "-") {
						var operand = stack.pop()
						this.result = eval(`${arr[i]}(${operand})`)
					}
				}
				stack.push(this.result)

				break
			}
		}
		else {
			stack.push(arr[i])
		}
	};

	return _flag == true ? this.result * -1 : this.result
}

CalculatePostfix.prototype.isOperator = Infix2Postifx.prototype.isOperator

CalculatePostfix.prototype.solvePower = function(base, exp) {

	var result = 1
	exp = Math.abs(exp)

	if (exp == 0)
		return result
	else if (exp & 1) {
		return result =  base * this.solvePower(base, exp - 1)
	} else {
		var tmp = this.solvePower(base, exp/2)
		return result = tmp * tmp
	}
}
