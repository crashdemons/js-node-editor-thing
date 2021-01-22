class NumComponent extends SourceComponent {
  constructor() {
    super('Number');
  }

  onBuild(node) {
    var ctrl = new NumberControl(this.editor, "num", false);
    let out = new Rete.Output('num', 'Decimal Value', decimalSocket);
    node.addControl(ctrl);
    node.addOutput(out);
  }

  onGenerate(node, outputs) {
//      if(node.data.num>7) return;//disabled-output testing
    console.log("decimal",node,node.data.num)
    outputs['num'] = node.data.num;
  }
}
class Num2Component extends SourceComponent {
  constructor() {
    super('2Number');
  }

  onBuild(node) {
    var ctrl = new NumberControl(this.editor, "num", false);
    let out = new Rete.Output('num', 'Decimal Value', decimalSocket);
    node.addControl(ctrl);
    node.addOutput(out);
  }

  onGenerate(node, outputs) {
    console.log("2decimal",node,node.data.num)
    outputs['num'] = [node.data.num,node.data.num];
  }
}

class Decimal2Bool_Component extends FilterComponent{
  constructor() {
    super('Decimal-to-Boolean');
    this.registerInputs('num');
  }

  onBuild(node) {
    node.addInput(new Rete.Input('num', 'Decimal Value', decimalSocket));
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
    super('Boolean-to-Decimal');
    this.registerInputs('bit0','bit1','bit2','bit3','bit4','bit5','bit6','bit7');
  }

  onBuild(node) {
    node.addOutput(new Rete.Output('num', 'Decimal Value', decimalSocket));
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


components.push(new NumComponent);
components.push(new Num2Component);
components.push(new Decimal2Bool_Component);
components.push(new Bool2Decimal_Component);