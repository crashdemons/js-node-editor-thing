class IntegerComponent extends TogglableSourceComponent {
  constructor() {
    super('Integer');
  }

  onBuild(node) {
    var ctrl = new NumberControl(this.editor, "num", false);
    let out = new Rete.Output('num', 'Integer Value', integerSocket);
    node.addControl(ctrl);
    node.addOutput(out);
  }

  onGenerate(node, outputs) {
//      if(node.data.num>7) return;//disabled-output testing
    console.log("decimal",node,node.data.num)
    outputs['num'] = node.data.num;
  }
}
class Num2Component extends TogglableSourceComponent {
  constructor() {
    super('2Integers');
  }

  onBuild(node) {
    var ctrl = new NumberControl(this.editor, "num", false);
    let out = new Rete.Output('num', 'Integer Value', integerSocket);
    node.addControl(ctrl);
    node.addOutput(out);
  }

  onGenerate(node, outputs) {
    console.log("2decimal",node,node.data.num)
    outputs['num'] = [node.data.num,node.data.num];
  }
}



components.push(new IntegerComponent);
components.push(new Num2Component);