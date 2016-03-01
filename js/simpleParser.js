function parz(item) {
    var item = item.replace(/\s+/g, "").trim()
    var result = []
    var tmp = ""

    if(typeof(item) !== "string")
       return

    for (var i = 0, len = item.length; i < len; i++) {

        var currItem = item[i]
        tmp += currItem

        if (currItem == "-") {
            if (i == 0 || /[+\-*/(^]/.test(item[i-1])) {
                if (/[\d.]+/.test(item[i+1])) {
                    tmp += checkNext(item.substr(i+1, len))
                    i += (tmp.length-1)
                }
            }
        } else if (currItem == ".") {
            tmp = "0" + tmp
            // var initialLength = tmp.length //tmp.length = 2
            tmp += checkNext(item.substr(i+1, len))
            i += (tmp.length-2)
        } else if (/\d+/.test(item[i])) {
    		tmp += checkNext(item.substr(i+1, len))
			i += (tmp.length-1)
        }

        result.push(tmp)
        tmp = ""
    }
    return result
}


function checkNext(item) {
    var tmp = ""
    var i = 0
    while(/[\d.]+/.test(item[i])) {
        tmp += item[i]
        i++
    }
    return tmp
}
