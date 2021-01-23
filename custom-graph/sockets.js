var booleanSocket = new Rete.Socket('Boolean');
var integerSocket = new Rete.Socket('Integer');
var stringSocket = new Rete.Socket('String');
var actionSocket = new Rete.Socket('Action');//control flow triggering
var byteSocket = new Rete.Socket('Byte');


//implicit conversion
actionSocket.combineWith(booleanSocket);//onoff -> 01
booleanSocket.combineWith(actionSocket);//01->onoff


actionSocket.combineWith(stringSocket);
byteSocket.combineWith(stringSocket);
booleanSocket.combineWith(stringSocket);//bit to string
integerSocket.combineWith(stringSocket);//int to string
//
//integerSocket.combineWith(byteSocket);//int to byte (WARNING: DATA LOSS!)
byteSocket.combineWith(integerSocket);//byte to int (wider type)
booleanSocket.combineWith(integerSocket);//bit to int (wider type)


