var $input = $("#input-1")

var tempArr = []
var parenStack = []

var isValid = false
var checker = true



$input.keypress(function(e) {
	if(e.which == 13 && checker && $input.val().length != 0) {
		var infix = parz($input.val())
		var Infix = new Infix2Postifx(infix)
		var result = Infix.toPostfix()
		$(".result h3").html(result)

		var Postfix = new CalculatePostfix(result.trim())
		var resultPostfix = Postfix.calculate()

		$(".result span").html(resultPostfix)
	}

})



$input.focus(function() {
	$(this).parent().addClass("input--filled")
})

$input.blur(function() {
	if ($input.val().length == 0)
		$(this).parent().removeClass("input--filled")
})

$("#input-1").on("input", function() {
	var $input = this.value
	isValid = processParen($input)

	if (/[a-z]/i.test($input) || !isValid) {
		$(this).next().addClass("error-text")
		checker = false
	} else {
		$(this).next().removeClass("error-text")
		checker = true
	}
})

function processParen(exp) {
	parenStack = []
	for (var i = 0 ,len = exp.length; i < len; i++) {
		if (exp[i] == "(")
			parenStack.push(exp[i])
		else if (exp[i] == ")"){
			if (parenStack.length == 0 || !isPair(parenStack[parenStack.length-1], exp[i]))
				return false
			else
				parenStack.pop()
		}
	}
	if (parenStack.length == 0)
		return true
	else
		return false
}

function isPair(char1, char2) {
	if (char1 == "(" && char2 == ")")
		return true
	else
		return false
}





