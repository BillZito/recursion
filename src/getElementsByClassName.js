// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };


// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className, curr, arr) {
	//if given, use same array to hold onto values or set as new empty array
	var ans = arr || [];
	var toCheck = curr || document.body;

	//if the node itself contains the value, push it
	if (toCheck.classList !== undefined && toCheck.classList.value.indexOf(className) !== -1){
		ans.push(toCheck);
	}
	
	//for each of it's children, run the function recursively to check them
	if (toCheck.childNodes){
		toCheck.childNodes.forEach(function(newOne){
			ans= getElementsByClassName(className, newOne, ans);
		});
	}

	//return answer array
	return ans;
};
