// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

function oneString(obj){
  var ans = "";
  if (typeof obj === 'string'){
    ans = ans + '"' + obj + '"';
  } else if (typeof obj === 'number'){
    ans = obj;
  }else if (Array.isArray(obj)){
    ans = ans + "[";
    each(obj, function(a, i){
        ans = ans + oneString(a) + (i===(obj.length-1)? "":",");
    });
    ans = ans + "]";
  }
  return ans;
}

console.log(oneString("sup"));
console.log(oneString(["one", "two", "three"]));
console.log(oneString([1, 2, 3]));

var stringifyJSON = function(obj) {
  //stringify's JSON. 
  //base case: no more objects left, return string
  //could do case for array, obj, individ, etc. 
  return "'" + oneString(obj) + "'";
  
  //recursive case: return "one obj" + stringifyJSON(rest of obj)
};

console.log(stringifyJSON("sup"));
console.log(stringifyJSON(["one", "two", "three"]));

/* 
test answers

  '[]',
  '{"foo": ""}',
  '{}',
  '{"foo": "bar"}',
  '["one", "two"]',
  '{"a": "b", "c": "d"}',
  '[null,false,true]',
  '{"foo": true, "bar": false, "baz": null}',
  '[1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999]',
  '{"boolean, true": true, "boolean, false": false, "null": null }',
  
test cases
  9,
  null,
  true,
  false,
  'Hello world',
  [],
  [8],
  ['hi'],
  [8, 'hi'],
  [1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999],
  [8, [[], 3, 4]],
  [[[['foo']]]],
  {},
  {'a': 'apple'},
  {'foo': true, 'bar': false, 'baz': null},
  {'boolean, true': true, 'boolean, false': false, 'null': null },
  // basic nesting
  {'a': {'b': 'c'}},
  {'a': ['b', 'c']},
  [{'a': 'b'}, {'c': 'd'}],
  {'a': [], 'c': {}, 'b': true}

/*