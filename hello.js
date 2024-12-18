function encode(str) {
  var encoded = "";
  str = btoa(str);
  str = btoa(str);
  for (let i = 0; i < str.length; i++) {
    var a = str.charCodeAt(i);
    var b = a ^ 10; // bitwise XOR with any number, e.g. 123
    encoded = encoded + String.fromCharCode(b);
  }
  encoded = btoa(encoded);
  return encoded;
}

console.log(encode("HELLO WORLD"));
