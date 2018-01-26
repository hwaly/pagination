import Pagination from './Pagination';

document.addEventListener('DOMContentLoaded', _ => {
    const divs = document.querySelectorAll('div');

    new Pagination(divs[0], {
        current: 2,
        total: 21,
        size: 3
    });

    const pagination2 =  new Pagination(divs[1], {
        current: 134,
        total: 200,
        size: 7,
        href: '/',
        query: 'page=',
        onClick(e) {
            e.preventDefault();

            pagination2.setOptions({current: this.dataset.page * 1}).render();
        }
    });
});