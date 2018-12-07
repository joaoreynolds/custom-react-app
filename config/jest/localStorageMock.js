export default new class {
  store = {};
  setItem = (key, val) => (this.store[key] = val.toString());
  getItem = key => this.store[key];
  removeItem = key => { delete this.store[key]; };
  clear = () => (this.store = {});
}()
