// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj){
  //base case: nothing given, will return empty string
  var ans = "";
  
  //from object, determine how quotes should be placed
  if (typeof obj === 'string'){
    ans = '"' + obj + '"';
    
  } else if (typeof obj === 'number'){
    //if number, return the number itself
    ans = obj.toString();
  } else if (typeof obj === 'boolean'){
    ans = obj.toString();
  } else if (typeof obj === 'function'){
    ans = "";
  } else if (Array.isArray(obj)){
    //if array, add brackets on left and right and recursively call 
    //oneString on contents
    ans = ans + "[";
    //for each item in object, add to string recursively
    each(obj, function(a, i){
      //only put comma if at end
        ans = ans + stringifyJSON(a) + (i===(obj.length-1)? "":",");
    });
    ans = ans + "]";
  }else if (obj ===null){
    ans = ans + "null";
  } else if(obj !== undefined){
    ans = ans + "{";
    var temp = [];
    each(obj, function(a, key){
      if (!((typeof a === "function") || (typeof a === "undefined"))){
      temp.push(stringifyJSON(key) + ":" + stringifyJSON(a));
      }
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