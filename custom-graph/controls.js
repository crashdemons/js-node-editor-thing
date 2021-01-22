//notes:
// putData sets data[k]=v in the node for the control
var VueButtonControl = {
  props: ['readonly', 'emitter', 'ikey', 'getData', 'putData'],
  template: '<button :readonly="readonly" :value="value" @click="change($event)" @dblclick.stop="" @pointerdown.stop="" @pointermove.stop="">Button</button>',
  data() {
    return {
      value: 0,
    }
  },
  methods: {
    change(e){
      this.value = +e.target.value;
      this.update();
    },
    update() {
      if (this.ikey)
        this.putData(this.ikey, this.value)
      this.emitter.trigger('process');
    }
  },
  mounted() {
    this.value = this.getData(this.ikey);
  }
}


var VueTextControl = {
  props: ['readonly', 'emitter', 'ikey', 'getData', 'putData'],
  template: '<input type="text" :readonly="readonly" :value="value" @input="change($event)" @dblclick.stop="" @pointerdown.stop="" @pointermove.stop=""/>',
  data() {
    return {
      value: 0,
    }
  },
  methods: {
    change(e){
      this.value = e.target.value;
      this.update();
    },
    update() {
      if (this.ikey)
        this.putData(this.ikey, this.value)
      this.emitter.trigger('process');
    }
  },
  mounted() {
    this.value = this.getData(this.ikey);
  }
}

var VueNumControl = {
  props: ['readonly', 'emitter', 'ikey', 'getData', 'putData'],
  template: '<input type="number" min="-2147483648" max="2147483647" :readonly="readonly" :value="value" @input="change($event)" @dblclick.stop="" @pointerdown.stop="" @pointermove.stop=""/>',
  data() {
    return {
      value: 0,
    }
  },
  methods: {
    change(e){
      this.value = +e.target.value;
      this.update();
    },
    update() {
      if (this.ikey)
        this.putData(this.ikey, this.value)
      this.emitter.trigger('process');
    }
  },
  mounted() {
    this.value = this.getData(this.ikey);
  }
}


var VueSwitchControl = {
  props: ['readonly', 'emitter', 'ikey', 'getData', 'putData'],
  template: `<div><label for="radoff">Off</label><input :readonly="readonly" type="radio" id="radoff" name="drone" value="0" @input="change($event)" @dblclick.stop="" @pointerdown.stop="" @pointermove.stop="" checked>
<label for="radon">On</label><input :readonly="readonly" type="radio" id="radon" name="drone" value="1" @input="change($event)" @dblclick.stop="" @pointerdown.stop="" @pointermove.stop=""></div>`,
  data() {
    return {
      value: 0,
    }
  },
  methods: {
    change(e){
      this.value = +e.target.value;
        console.log("switch change ",e.target.value,this.value,e)
      this.update();
    },
    update() {
      if (this.ikey){
        console.log("switch setting ",this.ikey,this.value)
        this.putData(this.ikey, this.value)
      }
      this.emitter.trigger('process');
    }
  },
  mounted() {
    this.value = this.getData(this.ikey);
  }
}


class NumberControl extends Rete.Control {

  constructor(emitter, key, readonly) {
    super(key);
    this.component = VueNumControl;
    this.props = { emitter, ikey: key, readonly };
  }

  setValue(val) {
    this.vueContext.value = val;
  }
}

class MessageControl extends Rete.Control {

  constructor(emitter, key, readonly) {
    super(key);
    this.component = VueTextControl;
    this.props = { emitter, ikey: key, readonly };
  }

  setValue(val) {
    this.vueContext.value = val;
  }
}
class ButtonControl extends Rete.Control {

  constructor(emitter, key, readonly) {
    super(key);
    this.component = VueButtonControl;
    this.props = { emitter, ikey: key, readonly };
  }

  setValue(val) {
    this.vueContext.value = val;
  }
}
class SwitchControl extends Rete.Control {

  constructor(emitter, key, readonly) {
    super(key);
    this.component = VueSwitchControl;
    this.props = { emitter, ikey: key, readonly };
  }

  setValue(val) {
    this.vueContext.value = val;
  }
}