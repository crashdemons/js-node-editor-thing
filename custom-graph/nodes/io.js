class ButtonComponent extends SourceComponent {//TODO: fix to not always be on
  constructor() {
    super('Button');
  }

  onBuild(node) {
    var ctrl = new ButtonControl(this.editor, "pressed");
    
    node.addControl(ctrl);
      
    let out = new Rete.Output('pressed', 'Pressed', actionSocket);

    node.addOutput(out);
  }

  worker(node, inputs, outputs) {
    outputs['pressed'] = 1;
  }
}
class SwitchComponent extends SourceComponent {//TODO: fix to not always be on
  constructor() {
    super('Switch');
  }

  onBuild(node) {
    var ctrl = new SwitchControl(this.editor, "switched");
    
    node.addControl(ctrl);
      
    let out = new Rete.Output('switched', 'Switched', actionSocket);

    node.addOutput(out);
  }

  onGenerate(node, outputs) {
    outputs['switched'] = node.data.switched;
      console.log("switch output",outputs)
  }
}


class ConsoleComponent extends OutputComponent {
  constructor() {
    super('Console');
    this.registerInputs('msg');
  }

  onBuild(node) {
    node.addInput(new Rete.Input('msg', 'Data', stringSocket));
  }

  onInput(node, inputs) {
    console.log(inputs)
    if(inputs.length===0) return;
    if(inputs.msg.length==0) return;
    //var input_msg = inputs.msg[0];
    //console.log('ConsoleIn', node, inputs);
    for(var value of inputs.msg) console.log("CONSOLE-OUTPUT",value);
 }
}


class TextOutComponent extends OutputComponent {
  constructor() {
    super('Text');
    this.registerInputs('msg');
  }

  onBuild(node) {
    var ctrl = new MessageControl(this.editor,"msg","0");
    node.addControl(ctrl);
    node.addInput(new Rete.Input('msg', 'Data', stringSocket));
  }

  onInput(node, inputs) {
    if(inputs.length===0) return;
    if(inputs.msg.length==0) return;
    var nodeDetail = this.editor.nodes.find(n => n.id === node.id);
    console.log("textcomponent input",inputs,node,nodeDetail)
    
    var out = this.reduceInput(inputs.msg);
    
    nodeDetail.controls.get("msg").setValue(out);
    node.data.msg = out;
    
 }
}

components.push(new SwitchComponent);

components.push(new ButtonComponent);
components.push(new ConsoleComponent);
components.push(new TextOutComponent);