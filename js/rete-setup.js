
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



editor.on('process', ()=>{
  if(editor.silent) return;

  compile(false);//RUNS EVERYTHING ON EACH UPDATE
});
editor.on('connectioncreate connectionremove nodecreate noderemove', ()=>{
  if(editor.silent) return;

  compile(true);//RUNS EVERYTHING ON EACH UPDATE
});

var components=[];