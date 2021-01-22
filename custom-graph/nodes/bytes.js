class Int2Bytes_Component extends FilterComponent{
  constructor() {
    super('Int-to-Bytes');
    this.registerInputs('num');
  }

  onBuild(node) {
    node.addInput(new Rete.Input('num', 'Integer Value', integerSocket));
    node.addOutput(new Rete.Output('byte0', 'Byte 0', byteSocket));
    node.addOutput(new Rete.Output('byte1', 'Byte 1', byteSocket));
    node.addOutput(new Rete.Output('byte2', 'Byte 2', byteSocket));
    node.addOutput(new Rete.Output('byte3', 'Byte 3', byteSocket));
  }

  onInput(node, inputs, outputs) {
    console.log("dec2bool",inputs);
    var n = inputs.num;
    var byteMask = 0xFF;
    for(var i=0;i<4;i++){
        var shift = (8*i);
        var mask = byteMask<<shift;
        var unshiftedValue = n & mask;
        var value = unshiftedValue>>shift;
        outputs["byte"+i]=value;
        //outputs["byte"+i]= (n&(1<<i)) >> i;
    }
  }
}


//------------------------------------

class Decimal2Bool_Component extends FilterComponent{
  constructor() {
    super('Byte-to-Bits');
    this.registerInputs('num');
  }

  onBuild(node) {
    node.addInput(new Rete.Input('num', 'Byte Value', byteSocket));
    node.addOutput(new Rete.Output('bit0', 'Bit 0', booleanSocket));
    node.addOutput(new Rete.Output('bit1', 'Bit 1', booleanSocket));
    node.addOutput(new Rete.Output('bit2', 'Bit 2', booleanSocket));
    node.addOutput(new Rete.Output('bit3', 'Bit 3', booleanSocket));
    node.addOutput(new Rete.Output('bit4', 'Bit 4', booleanSocket));
    node.addOutput(new Rete.Output('bit5', 'Bit 5', booleanSocket));
    node.addOutput(new Rete.Output('bit6', 'Bit 6', booleanSocket));
    node.addOutput(new Rete.Output('bit7', 'Bit 7', booleanSocket));
  }

  onInput(node, inputs, outputs) {
    console.log("dec2bool",inputs)
    var n = inputs.num;
    for(var i=0;i<8;i++) outputs["bit"+i]= (n&(1<<i)) >> i;
  }
}

class Bool2Decimal_Component extends FilterComponent{
  constructor() {
    super('Bits-to-Byte');
    this.registerInputs('bit0','bit1','bit2','bit3','bit4','bit5','bit6','bit7');
  }

  onBuild(node) {
    node.addOutput(new Rete.Output('num', 'Byte Value', byteSocket));
    node.addInput(new Rete.Input('bit0', 'Bit 0', booleanSocket));
    node.addInput(new Rete.Input('bit1', 'Bit 1', booleanSocket));
    node.addInput(new Rete.Input('bit2', 'Bit 2', booleanSocket));
    node.addInput(new Rete.Input('bit3', 'Bit 3', booleanSocket));
    node.addInput(new Rete.Input('bit4', 'Bit 4', booleanSocket));
    node.addInput(new Rete.Input('bit5', 'Bit 5', booleanSocket));
    node.addInput(new Rete.Input('bit6', 'Bit 6', booleanSocket));
    node.addInput(new Rete.Input('bit7', 'Bit 7', booleanSocket));
  }

  dbg_worker(node, inputs, outputs) {
      console.log("bool2dec worker",inputs)
  }
  onInput(node, inputs, outputs) {
      console.log("bool2dec",inputs)
        for(var i=0;i<8;i++){
            if(typeof inputs["bit"+i]==="undefined") inputs["bit"+i]=0;
        }
        var n = 0;
        for(var i=0;i<8;i++){
            n += inputs["bit"+i] << i;
        }
        console.log("bool2dec",inputs,n)
        outputs['num'] = n;
        return outputs;
    }
}
components.push(new Int2Bytes_Component);
components.push(new Decimal2Bool_Component);
components.push(new Bool2Decimal_Component);