class UnaryOperator extends FilterComponent{
  constructor(socket, name,category=null) {
    super(name,category);
    this.socket = socket;
    this.registerInputs('num1');
  }

  onBuild(node) {
    node.addInput(new Rete.Input('num1', this.socket.name, this.socket));
    node.addOutput(new Rete.Output('numOut', this.socket.name, this.socket));
  }

  onInput(node, inputs, outputs) {
    console.log("unaryop",inputs)
    outputs["numOut"] = this.operationCollected(inputs.num1);
    console.log("unaryop-o", outputs["numOut"]);
  }
  
  operation(num1){
      return null;
  }


  operationCollected(num1){
    var num1Copy = [...num1];
    return num1Copy.map((n)=>this.operation(n));
  }
}
class BinaryOperator extends UnaryOperator{
  constructor(socket, name,category=null) {
    super(socket, name,category);
    this.registerInputs('num1','num2');
  }

  onBuild(node) {
    node.addInput(new Rete.Input('num1', this.socket.name, this.socket));
    node.addInput(new Rete.Input('num2', this.socket.name, this.socket));
    node.addOutput(new Rete.Output('numOut', this.socket.name, this.socket));
  }

  onInput(node, inputs, outputs) {
    console.log("binaryop",inputs)
    outputs["numOut"] = this.operationCollected(inputs.num1,inputs.num2);
    console.log("binaryop-o", outputs["numOut"])
  }
  operation(num1,num2){
      return null;
  }
  

  operationCollected(num1,num2){
    var length = Math.max(num1.length,num2.length);
    var finished1=false;
    var finished2=false;
    var output = Array.apply(null, Array(length)).map(function () {});
    for(var i=0;i<length;i++){
        var i1 = i%num1.length;
        var i2 = i%num2.length;
        output[i]=this.operation(num1[i1],num2[i2]);
    }
    return output;
  }
}