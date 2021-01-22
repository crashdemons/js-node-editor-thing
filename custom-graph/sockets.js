var booleanSocket = new Rete.Socket('Boolean');
var decimalSocket = new Rete.Socket('Decimal');
var stringSocket = new Rete.Socket('String');

var byteSocket = new Rete.Socket('Byte');


var numSocket = new Rete.Socket('Number value');

//implicit conversion
booleanSocket.combineWith(stringSocket);//bit to string
decimalSocket.combineWith(stringSocket);//bit to string



var actionSocket = new Rete.Socket('Action');//control flow triggering