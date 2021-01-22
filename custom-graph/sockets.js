var booleanSocket = new Rete.Socket('Boolean');
var decimalSocket = new Rete.Socket('Decimal');
var stringSocket = new Rete.Socket('String');
var anySocket = new Rete.Socket('Any');

var byteSocket = new Rete.Socket('Byte');


var numSocket = new Rete.Socket('Number value');

//implicit conversion
booleanSocket.combineWith(anySocket);//bit to string
booleanSocket.combineWith(stringSocket);//bit to string
decimalSocket.combineWith(stringSocket);//bit to string