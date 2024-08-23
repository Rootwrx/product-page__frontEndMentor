import Model from "./model";
import View from "./views/View";

class Controler {
  constructor() {
    this.model = new Model();
    this.View = new View(this.model);

    this.init();
  }

  init() {
    console.log(this);
  }
}

export default Controler;

