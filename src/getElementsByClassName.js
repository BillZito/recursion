// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className, arr) {
	 var ans = arr || [];

	if (document.body.classList.value.indexOf(className) !== -1){
		console.log('body answer', document.body);
		ans.push(document.body);
	}
	//if the current children nodes contain a div, add it to the answer and return; 
	document.body.childNodes.forEach(function(item){
		//console.log("here", item, item.classList);
		if(item.classList !== undefined && item.classList.value.indexOf(className) !== -1){
			console.log("item ans", item);
			ans.push(item);
		}
	});
	console.log("full ans", ans);
	//if the current children have children nodes, check all of their children 
	//nodes by recursively calling function

	//return answer of all values
	return ans;
};

/*
var htmlStrings = [
  '<div class="targetClassName"></div>',
  '<div class="otherClassName targetClassName"></div>',
  '<div><div class="targetClassName"></div></div>',
  '<div><div class="targetClassName"><div class="targetClassName"></div></div></div>',
  '<div><div></div><div><div class="targetClassName"></div></div></div>',
  '<div><div class="targetClassName"></div><div class="targetClassName"></div></div>',
  '<div><div class="somediv"><div class="innerdiv"><span class="targetClassName">yay</span></div></div></div>'
];

/* answer:
line 2: [div.targetClassName,
line 3: div.targetClassName,
line 4: div.targetClassName,
line 5: div.targetClassName, div.targetClassName,
line 6: div.targetClassName,
line 7: div.targetClassName, div.targetClassName,
line 8: span.targetClassName]


describe('getElementsByClassName', function() {

  it('should match the results of calling the built-in function', function() {
    $('body').addClass('targetClassName');
    htmlStrings.forEach(function(htmlString) {
      var $rootElement = $(htmlString);
      $('body').append($rootElement);

      var result = getElementsByClassName('targetClassName');
      var expectedNodeList = document.getElementsByClassName('targetClassName');
      var expectedArray = Array.prototype.slice.apply(expectedNodeList);
      var equality = _.isEqual(result, expectedArray); // why can't we use `===` here?
      expect(equality).to.equal(true);

      $rootElement.remove();
    });
    $('body').removeClass('targetClassName');
  });
*/