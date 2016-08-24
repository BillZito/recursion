// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  return "'" + oneString(obj) + "'";
};

var oneString = function(obj){
  //base case: nothing given, will return empty string
  var ans = "";
  
  //from object, determine how quotes should be placed
  if (typeof obj === 'string'){
    ans = ans + '"' + obj + '"';
  } else if (typeof obj === 'number'){
    //if number, return the number itself
    ans = obj;
  }else if (Array.isArray(obj)){
    //if array, add brackets on left and right and recursively call 
    //oneString on contents
    ans = ans + "[";
    //for each item in object, add to string recursively
    each(obj, function(a, i){
      //only put comma if at end
        ans = ans + oneString(a) + (i===(obj.length-1)? "":",");
    });
    ans = ans + "]";
  }else if (obj !== undefined){
    ans = ans + "{";
    var temp = [];
    each(obj, function(a, key){
      temp.push(oneString(key) + ":" + oneString(a));
    });
    each(temp, function(a, i){
      ans = ans + a + (i===(temp.length-1)? "":",");
    });
    //ans = ans + oneString(temp);
    ans = ans + "}";
  }
  
  //return the stringified answer
  return ans;
};

var each = function(coll, func){
  if (Array.isArray(coll)){
    for (var i = 0; i < coll.length; i++){
      func(coll[i], i, coll);
    }
  } else {
    for (var key in coll){
      func(coll[key], key, coll);
    }
  }
};


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