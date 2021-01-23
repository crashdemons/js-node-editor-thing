function makeCollapseButton(update){
    var el = document.createElement('div');
    el.classList.add("node-collapse-button");
    el.onclick=()=>{
        collapseNodeFromButton(el);
        update();
    };
    return el;
}

function setButtonCollapsed(buttonElem,state=true){
    if(state){
        buttonElem.classList.add("node-collapsed");
    }else{
        buttonElem.classList.remove("node-collapsed");
    }
}
function getButtonCollapsed(buttonElem){
    return buttonElem.classList.contains("node-collapsed");
}
function isCollapsibleChild(childElem){
    return childElem.classList.contains("output") || childElem.classList.contains("input") || childElem.classList.contains("control");
}
function collapseChild(childElem,state){
    var collapsed = childElem.classList.contains("elem-collapsed");
    if(state===collapsed) return;
    if(state){
        childElem.classList.add("elem-collapsed");
    }else{
        childElem.classList.remove("elem-collapsed");
    }
}

function collapseNodeFromButton(buttonElem){
    var oldState = getButtonCollapsed(buttonElem);
    var newState = !oldState;
    setButtonCollapsed(buttonElem,newState);
    
    
    
    var titleElem = buttonElem.parentElement;
    var nodeElem = titleElem.parentElement;
    for(var childElem of nodeElem.children){
        if(isCollapsibleChild(childElem)) collapseChild(childElem,newState);
    }
}

async function makeNodeCollapsibleDelayed(node){
    var nodeX = node;
    setTimeout(()=>{
        makeNodeCollapsible(nodeX);
    },250);
}

function makeNodeCollapsible(node){
    var nodeX = node;
    var update = ()=>{ 
        console.log("update",nodeX)
        editor.trigger('nodetranslated',{node:nodeX,prev:nodeX.position});
    }
    
    
    console.log("make collapsible")
    if(!node.vueContext){ console.log("no vuecontext",node);return;}
    if(!node.vueContext.$el){ console.log("no elem");return; }
    var elem = node.vueContext.$el;
    console.log("got elem");
    
    var titles = elem.getElementsByClassName('title');
    var title = titles[0];
    console.log("got title")
    title.appendChild(makeCollapseButton(update));
    //title.innerHTML+="";
}