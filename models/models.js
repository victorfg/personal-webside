export class Blog {
    constructor(data) {
      this.data_blog = data;
    }
}

const getItemFromArray = (itemToFind, arrayToSearch) => {
    let indexItem = itemToFind.split('/').length;
    let getItem = itemToFind.split('/')[indexItem -1];
    return arrayToSearch.find(x => encodeURIComponent(x.title) === getItem);
}

export {getItemFromArray};