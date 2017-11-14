import {observable, action, computed} from "mobx";
import toastr from 'toastr';
import constants from '../constants/constants';


export default class Store {
  defaultItem = {};
  @observable items = [];
  @observable item = this.defaultItem;
  loadPromise = undefined;

  constructor(api, defaultItem) {
    this.api = api;
    this.defaultItem = defaultItem;
    this.setItems();
  }

  @action
  setItems() {
    this.loadPromise = this.api.getAll().then(itemsResults => {
      this.items = itemsResults.results;
    });
  }

  @action
  setItem(ItemId) {

    this.loadPromise.then(() => {
      const item = this.items.filter(item => item.id === ItemId);
      if (item.length) {
        this.item = item[0];
      }
      else {
        this.item = this.defaultItem;
      }
    });
  }

  @action
  saveItem() {
    let promise = undefined;
    if (this.item.id) {
      promise = this.api.save(this.item).then(savedDataItem => {
        let index = this.items.findIndex(item => item.id === savedDataItem.id);
        this.items[index] = savedDataItem;
      });
    } else {
      promise = this.api.insert(this.item).then(savedDataItem => {
        this.items.push(savedDataItem);
      });
    }
    return promise.then(() => {
      return true;
    })
    .catch(error => {
      toastr.error(error);
      return false;
    });

  }

  @action
  changeItem(event) {
    const field = event.target.name;
    this.item[field] = event.target.value;
  }

  @action
  deleteItem(itemId) {
    let item = this.items.filter(item => item.id === itemId)[0];

    this.api.delete(item)
      .then(success => {
        if (success) {
          toastr.success("Course deleted");
          this.items = this.items.filter(author => author.id !== itemId);
        }
      })
      .catch(error => {
        if (error.message === constants.DELETE_FAILED) {
          toastr.error('Cannot delete, because author is active on one or more courses');
        } else {
          toastr.error(error);
        }

      });

  }
}
