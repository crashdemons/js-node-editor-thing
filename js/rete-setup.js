
//==============================================
var container = document.querySelector('#rete');

var editor = new Rete.NodeEditor('tasksample@0.1.0', container);
//editor.use(AlightRenderPlugin);
editor.use(VueRenderPlugin.default);
editor.use(ConnectionPlugin.default);
//editor.use(ConnectionPlugin);
//
//editor.use(ContextMenuPlugin);
editor.use(ContextMenuPlugin.default,{
    searchBar: true, // true by default
    //searchKeep: title => true, // leave item when searching, optional. For example, title => ['Refresh'].includes(title)
    delay: 100,
    allocate(component) {
        return [component.categoryName];
        //return ['Submenu'];
    },
    rename(component) {
        return component.name;
    },
    items: {
        //'Click me'(){ console.log('Works!') }
    },
    nodeItems: {
        //'Click me'(){ console.log('Works for node!') },
        //'Delete': false, // don't show Delete item
        //'Clone': false // or Clone item
    },
});
//editor.use(TaskPlugin);

var engine = new Rete.Engine('tasksample@0.1.0');

//==============================================
async function compile(store=false) {
    await engine.abort();
    var json = editor.toJSON();
    if(store){
        storage_setData(json);
    }
    await engine.process(editor.toJSON());
}

function getMissingConnections(node){
    var connectionsMissing=[];
      
      if(node.inputs instanceof Map){
          for(var inputkey of node.inputs.keys()){
            console.log("key",inputkey)
            var input = node.inputs.get(inputkey);
            console.log("input",input)
            console.log("input conn",input.connections.toString())
            console.log("input connL",input.connections.length)
            if(input.connections.length<1) connectionsMissing.push(inputkey);
          }
      }else{
        for(var inputkey of Object.keys(node.inputs)){
           var input = node.inputs[inputkey];
           if(input.connections.length<1) connectionsMissing.push(inputkey);
        }
      }
      
      

      return connectionsMissing;
}


function setNodeEnabled(node, state=true){
    node.data.enabled=state;
    if(!node.vueContext) return;
    if(!node.vueContext.$el) return;
    var elem = node.vueContext.$el;
    console.log(node.name,state)
    if(state){
        elem.classList.remove("disabled");
        elem.classList.add("enabled");
    }else{
        elem.classList.add("disabled");
        elem.classList.remove("enabled");
    }
}
function updateNodeEnabled(node){
    if(node.inputConnectionsRequired){
        setNodeEnabled(node,node.data.enabled);
    }
}
async function updateNodeEnabledDelayed(node,delay=25){//this is a workaround - selecting/deselecting a node resets the classes, but it does it AFTER 'nodeselected' event...
    var nodeX = node;
    setTimeout(()=>{
        updateNodeEnabled(nodeX);
    },delay);
}

editor.on('process', ()=>{
  if(editor.silent) return;

  compile(false);//RUNS EVERYTHING ON EACH UPDATE
});
editor.on('connectioncreate connectionremove nodecreate noderemove', ()=>{
  if(editor.silent) return;
  compile(true);//RUNS EVERYTHING ON EACH UPDATE
});


editor.on('connectioncreate', (connectEvent)=>{
  console.log("creating connection",connectEvent)
  if(connectEvent.input){
      console.log("   hasinput",connectEvent.input)
      if(connectEvent.input.node.inputConnectionsRequired){
         console.log("    inputsRequired")
          var missingConnections = getMissingConnections(connectEvent.input.node);
          console.log("    node,missing",connectEvent,connectEvent.input.node,missingConnections)
          if(missingConnections.length<=1){//we're adding a connection when we're missing 1 connection, so enable the node
              console.log("     enabling reconnected node")
              setNodeEnabled(connectEvent.input.node,true);
          }
          
      }
  }
});


editor.on('connectionremove', (connectEvent)=>{
  if(connectEvent.input){
      if(connectEvent.input.node.inputConnectionsRequired){
          var missingConnections = getMissingConnections(connectEvent.input.node);
          console.log("destroying connection",connectEvent,connectEvent.input.node,missingConnections);
          console.log(" disabling disconnected node")
          setNodeEnabled(connectEvent.input.node,false);//we don't allow multiple connections, so the node is disabled if we remove an input
          
          
      }
  }
});

editor.on('nodecreate', (createNodeEvent)=>{
  console.log("createnodeevent",createNodeEvent)
});

editor.on('nodetranslated', (nodeEvent)=>{
  //console.log("nodetranslated",nodeEvent)
   updateNodeEnabled(nodeEvent.node);
});

var previousSelection = null;
editor.on('nodeselected', (node)=>{
   var abstractedEvent = {selectedNode: node, previousNode: previousSelection};
   previousSelection=node;
   onNodeSelected(abstractedEvent);
   
});


function onNodeSelected(event){
  console.log("nodeselected",event)
  updateNodeEnabledDelayed(event.selectedNode);
  if(event.previousNode){//something was deselected
        updateNodeEnabledDelayed(event.previousNode);
  }
}



var components=[];